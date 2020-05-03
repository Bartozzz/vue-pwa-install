<template>
  <div id="app">
    <h1>Vue PWA Install – mixin</h1>

    <button v-if="deferredPrompt" @onClick="promptInstall">
      Add to home screen
    </button>
  </div>
</template>

<script>
import { VuePwaInstallMixin } from "vue-pwa-install";

export default {
  name: "App",
  mixins: [VuePwaInstallMixin],

  data() {
    return {
      deferredPrompt: null,
    };
  },

  methods: {
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
    },
  },

  created() {
    this.$on("canInstall", (event) => {
      // Prevent Chrome 67 and earlier from automatically showing the prompt:
      event.preventDefault();

      // Stash the event so it can be triggered later:
      this.deferredPrompt = event;
    });
  },
};
</script>
