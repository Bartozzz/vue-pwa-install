import Vue, { PluginObject } from "vue";

/**
 * The BeforeInstallPromptEvent is fired at the Window.onbeforeinstallprompt
 * handler before a user is prompted to "install" a web site to a home screen
 * on mobile.
 *
 * @see   https://stackoverflow.com/a/51847335
 * @see   https://developer.mozilla.org/en-US/docs/Web/API/BeforeInstallPromptEvent
 */
export interface BeforeInstallPromptEvent extends Event {
  /**
   * Returns an array of DOMString items containing the platforms on which the
   * event was dispatched. This is provided for user agents that want to present
   * a choice of versions to the user such as, for example, "web" or "play"
   * which would allow the user to chose between a web version or an Android
   * version.
   */
  readonly platforms: Array<string>;

  /**
   * Returns a Promise that resolves to a DOMString containing either "accepted"
   * or "dismissed".
   */
  readonly userChoice: Promise<{
    outcome: "accepted" | "dismissed";
    platform: string;
  }>;

  /**
   * Allows a developer to show the install prompt at a time of their own
   * choosing. This method returns a Promise.
   */
  prompt(): Promise<void>;
}

function isBeforeInstallPromptEvent(e: Event): e is BeforeInstallPromptEvent {
  return Boolean(e) && "prompt" in e;
}

export const VueInstallMixin = Vue.extend({
  mounted() {
    if (typeof window !== undefined) {
      const installHandler = (event: Event) => {
        if (isBeforeInstallPromptEvent(event)) {
          this.$emit("canInstall", event);
        }
      };

      window.addEventListener("beforeinstallprompt", installHandler);

      this.$once("hook:beforeDestroy", () => {
        window.removeEventListener("beforeinstallprompt", installHandler);
      });
    }
  },
});

export const VuePwaInstallPlugin: PluginObject<void> = {
  install(Vue) {
    Vue.mixin(VueInstallMixin);
  },
};

export default VuePwaInstallPlugin;
