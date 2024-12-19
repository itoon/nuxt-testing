import { describe, expect, test } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VICTORY_MESSAGE, DEFAT_MESSAGE } from "@/settings";

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

  test("a defat message appears if the user makes a guess that is incorrect", async () => {
    // Arrange
    const wrapper = await mountSuspended(WordleBoard, {
      props: { wordOfTheDay: "WORLD" },
    });
    // Act
    const guessInput = wrapper.find("input[type=text]");
    await guessInput.setValue("WRONG");
    const form = wrapper.find("form");
    await form.trigger("submit");
    // Assert
    expect(wrapper.html()).toContain(DEFAT_MESSAGE);
  });

  test("no end-of-game message appears if the user has not yet made a guess", async () => {
    // Arrange
    const wrapper = await mountSuspended(WordleBoard, {
      props: { wordOfTheDay: "WORLD" },
    });
    // Act
    // Assert
    expect(wrapper.html()).not.toContain(VICTORY_MESSAGE);
    expect(wrapper.html()).not.toContain(DEFAT_MESSAGE);
  });
});
