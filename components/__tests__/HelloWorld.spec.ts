// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import HelloWorld from "@/components/HelloWorld.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

describe("HelloWorld", async () => {
  it("render peoperly", async () => {
    const wrapper = await mountSuspended(HelloWorld);
    expect(wrapper.html()).toContain("Hello, World!");
  });
});
