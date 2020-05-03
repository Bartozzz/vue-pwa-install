import { shallowMount, createLocalVue } from "@vue/test-utils";
import MixinComponent from "./MixinComponent";
import PluginComponent from "./PluginComponent";
import VuePwaInstallPlugin, { VuePwaInstallMixin } from "../src/index";

const eventMock = { prompt() {} };
const eventMap = {};

window.addEventListener = jest.fn((event, cb) => {
  if (event in eventMap) {
    eventMap[event].push(cb);
  } else {
    eventMap[event] = [cb];
  }
});

function triggerWindowEvent(event, payload) {
  if (event in eventMap) {
    eventMap[event].forEach((callback) => callback(payload));
  }
}

describe("Plugin", () => {
  const localVue = createLocalVue();
  localVue.use(VuePwaInstallPlugin);

  it("emits 'canInstall' on 'beforeinstallprompt' event", async () => {
    const wrapper = shallowMount(PluginComponent, {
      localVue,
    });

    triggerWindowEvent("beforeinstallprompt", eventMock);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("canInstall")).toBeTruthy();
    expect(wrapper.emitted("canInstall").length).toBe(1);
    expect(wrapper.emitted("canInstall")[0]).toStrictEqual([eventMock]);
  });
});

describe("Mixin", () => {
  it("emits 'canInstall' on 'beforeinstallprompt' event", async () => {
    const wrapper = shallowMount(MixinComponent, {
      mixins: [VuePwaInstallMixin],
    });

    triggerWindowEvent("beforeinstallprompt", eventMock);

    await wrapper.vm.$nextTick();
    expect(wrapper.emitted("canInstall")).toBeTruthy();
    expect(wrapper.emitted("canInstall").length).toBe(1);
    expect(wrapper.emitted("canInstall")[0]).toStrictEqual([eventMock]);
  });
});
