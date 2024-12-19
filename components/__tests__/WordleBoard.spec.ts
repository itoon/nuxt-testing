// @vitest-environment nuxt
import { describe, it, expect } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

describe("WordleBoard", async () => {
  it("render peoperly", async () => {
    const wrapper = await mountSuspended(WordleBoard);
    expect(wrapper.html()).toContain("Hello, World!");
  });
});
