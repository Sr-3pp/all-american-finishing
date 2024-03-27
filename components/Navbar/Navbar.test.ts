import { describe, test, expect, vi, beforeEach } from "vitest";
import { flushPromises, RouterLinkStub, mount } from "@vue/test-utils";
import { setup, $fetch } from "@nuxt/test-utils";
import Navbar from "./index.vue";
import SrPicture from "sr-content/components/Img/index.vue";
import SrContainer from "sr-content/components/Container.vue";
import SrActions from "sr-content/components/Actions.vue";

vi.mock("vue-router", () => ({ useRoute: vi.fn() }));

const mountComponent = async () => {
  vi.mocked(useRoute).mockReturnValue({ name: "index" } as any);

  const wrapper: any = await mount(Navbar, {
    global: {
      components: {
        SrPicture,
        SrContainer,
        SrActions,
      },
    },
  });

  return wrapper;
};

describe("Navbar", async () => {
  await setup({});

  test("Render Logo", async () => {
    const wrapper = await mountComponent();
    const image = await wrapper.find(".sr-img img"); // Find the image element
    expect(image.exists()).toBe(true); // Check if the image element exists
    expect(Boolean(image.element.src)).toBe(true); // Check if the image element exists
  });

  test("Nav Items", async () => {
    const navItems = await $fetch("/api/content?getNav=true"); // Fetch the navItems
    expect(Boolean(Object.keys(navItems).length)).toBe(true); // Check if the image element exists
  });
});
