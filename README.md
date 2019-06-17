# Vue PWA Install

This library allows you to listen for [`beforeinstallprompt` event](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) painlessly in your Vue.js application. It comes handy when you're building offline-first Progressive Web Apps and want to [display a custom "_Add to home screen_" banner](https://developers.google.com/web/fundamentals/app-install-banners/) on you web app. Adds `canInstall` event via a global mixin. Exposes useful TypeScript definitions.

- [Installation](#installation)
- [Usage](#usage)

## Installation

You can install `vue-pwa-install` with with the following command:

```
$ npm install --save vue-pwa-install
```

Then, use it in your application as shown:

```js
import VueInstall from "vue-pwa-install";

Vue.use(VueInstall);
```

## Usage

```html
<template>
  <div id="app">
    <div id="install-banner" v-if="deferredPrompt">
      <button @onClick="promptInstall">Add to home screen</button>
    </div>

    <router-view></router-view>
  </div>
</template>

<script lang="ts">
  import { Component, Vue } from "vue-property-decorator";
  import { BeforeInstallPromptEvent } from "vue-pwa-install";

  @Component({})
  export default class App extends Vue {
    deferredPrompt: BeforeInstallPromptEvent | void;

    promptInstall() {
      // Show the prompt:
      this.deferredPrompt.prompt();

      // Wait for the user to respond to the prompt:
      this.deferredPrompt.userChoice.then(choiceResult => {
        if (choiceResult.outcome === "accepted") {
          console.log("User accepted the install prompt");
        } else {
          console.log("User dismissed the install prompt");
        }

        this.deferredPrompt = null;
      });
    }

    created() {
      this.$on("canInstall", (event: BeforeInstallPromptEvent) => {
        // Prevent Chrome 67 and earlier from automatically showing the prompt:
        event.preventDefault();

        // Stash the event so it can be triggered later:
        this.deferredPrompt = event;
      });
    }
  }
</script>
```

By default `VueInstallMixin` is injected into every component. You can disable this behavior by setting plugin option `mixin` to `false`, as follows:

```js
Vue.use(VueInstall, {
  mixin: false
});
```

You can still inject `VueInstallMixin` manually directly into your components:

```js
import { VueInstallMixin } from "vue-pwa-install";

export default {
  mixins: [VueInstallMixin]
};
```
