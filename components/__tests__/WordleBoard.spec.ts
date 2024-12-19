import { describe, it, expect, test } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";

const VICTORY_MESSAGE = "You won!";
describe("WordleBoard", async () => {
  test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
    // Arrange
    const wrapper = await mountSuspended(WordleBoard, {
      props: { wordOfTheDay: "World" },
    });
    // Act
    const guessInput = wrapper.find("input[type=text]");
    await guessInput.setValue("World");
    const form = wrapper.find("form");
    await form.trigger("submit");
    // Assert
    expect(wrapper.html()).toContain(VICTORY_MESSAGE);
  });
});
