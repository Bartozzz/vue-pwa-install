import Vue from "vue";
import VuePwaInstall from "vue-pwa-install";
import App from "./App.vue";

Vue.config.productionTip = false;
Vue.use(VuePwaInstall);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
