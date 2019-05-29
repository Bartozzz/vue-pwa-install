import * as tslib_1 from "tslib";
import { Vue, Component } from "vue-property-decorator";
/**
 * Type guard which checks if a given Event is BeforeInstallPromptEvent.
 *
 * @param   {Event}     event
 * @return  {boolean}   If event is of type BeforeInstallPromptEvent
 */
function isBeforeInstallPromptEvent(event) {
    return "prompt" in event;
}
let VueInstallMixin = class VueInstallMixin extends Vue {
    constructor() {
        super(...arguments);
        this.installHandler = (event) => {
            if (isBeforeInstallPromptEvent(event)) {
                this.$emit("canInstall", event);
            }
        };
    }
    mounted() {
        // Check in case we are server-side rendering:
        if (typeof window !== undefined) {
            window.addEventListener("beforeinstallprompt", this.installHandler);
            // See: https://vuejs.org/v2/guide/instance.html#Instance-Lifecycle-Hooks
            this.$once("hook:beforeDestroy", () => {
                window.removeEventListener("beforeinstallprompt", this.installHandler);
            });
        }
    }
};
VueInstallMixin = tslib_1.__decorate([
    Component
], VueInstallMixin);
export { VueInstallMixin };
const InstallPlugin = {
    install(Vue, options = { mixin: true }) {
        if (options.mixin) {
            Vue.mixin(VueInstallMixin);
        }
    }
};
export default InstallPlugin;
//# sourceMappingURL=index.js.map