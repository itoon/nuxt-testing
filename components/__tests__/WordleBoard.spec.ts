import { describe, it, expect, test } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

describe("WordleBoard", async () => {
  // it("render peoperly", async () => {
  //   const wrapper = await mountSuspended(WordleBoard, {
  //     props: { word: "World" },
  //   });
  //   expect(wrapper.html()).toContain("Hello, World!");
  // });
  test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
    // Arrange
    const wrapper = await mountSuspended(WordleBoard, {
      props: { wordOfTheDay: "World" },
    });
    // Act
    const guessInput = wrapper.find("input[type=text]");
    await guessInput.setValue("World");
    await guessInput.trigger("keydown.enter");
    // Assert
    expect(wrapper.html()).toContain("You win");
  });
});
