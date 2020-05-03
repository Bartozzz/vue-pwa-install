<div align="center">
  <h1>Vue PWA Install</h1>

[![Default CI/CD](https://github.com/Bartozzz/vue-pwa-install/workflows/Default%20CI/CD/badge.svg)](https://github.com/Bartozzz/vue-pwa-install/actions)
[![Known Vulnerabilities](https://snyk.io/test/github/Bartozzz/vue-pwa-install/badge.svg?targetFile=package.json)](https://snyk.io/test/github/Bartozzz/vue-pwa-install?targetFile=package.json)
[![npm version](https://img.shields.io/npm/v/vue-pwa-install.svg)](https://www.npmjs.com/package/vue-pwa-install)
[![npm dependency Status](https://david-dm.org/Bartozzz/vue-pwa-install.svg)](https://www.npmjs.com/package/vue-pwa-install)
[![npm downloads](https://img.shields.io/npm/dt/vue-pwa-install.svg)](https://www.npmjs.com/package/vue-pwa-install)
<br>

This library allows you to listen for [`beforeinstallprompt` event](https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent) painlessly in your Vue.js application. It comes handy when you're building offline-first Progressive Web Apps and want to [display a custom "_Add to home screen_" banner](https://developers.google.com/web/fundamentals/app-install-banners/) on you web app. Adds `canInstall` event via a global mixin. Exposes useful TypeScript definitions.

</div>

## Installation

```bash
$ npm install vue-pwa-install
```

## Usage

### As a plugin

`VuePwaInstallMixin` will be injected into every component.

```js
import VuePwaInstallPlugin from "vue-pwa-install";

Vue.use(VuePwaInstallPlugin);
```

### As a mixin

You can inject `VuePwaInstallMixin` manually directly into your components.

```js
import { VuePwaInstallMixin } from "vue-pwa-install";

export default {
  mixins: [VuePwaInstallMixin],
};
```

### Inside a component

```html
<template>
  <button v-if="deferredPrompt" @onClick="promptInstall">
    Add to home screen
  </button>
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
      this.deferredPrompt.userChoice.then((choiceResult) => {
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
