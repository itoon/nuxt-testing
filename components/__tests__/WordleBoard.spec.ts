import { beforeEach, describe, expect, test, vi } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VICTORY_MESSAGE, DEFAT_MESSAGE } from "@/settings";

describe("WordleBoard", async () => {
  const wordOfTheDay = "WORLD";
  let wrapper: ReturnType<typeof mountSuspended>;
  beforeEach(async () => {
    wrapper = await mountSuspended(WordleBoard, {
      props: { wordOfTheDay },
    });
  });

  const playerSubmitGuess = async (guessValue: string) => {
    const guessInput = wrapper.find("input[type=text]");
    await guessInput.setValue(guessValue);
    const form = wrapper.find("form");
    await form.trigger("submit");
  };

  describe("End if the game message", async () => {
    test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
      await playerSubmitGuess("WORLD");
      expect(wrapper.html()).toContain(VICTORY_MESSAGE);
    });

    test("a defat message appears if the user makes a guess that is incorrect", async () => {
      await playerSubmitGuess("WRONG");
      expect(wrapper.html()).toContain(DEFAT_MESSAGE);
    });

    test("no end-of-game message appears if the user has not yet made a guess", async () => {
      expect(wrapper.html()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.html()).not.toContain(DEFAT_MESSAGE);
    });
  });

  describe("Rule for defining the word of the day", async () => {
    test.each(["FLY", "world", "QWERT"])(
      "If a '%s' of the day provide, a warning is emiited",
      async (wordOfTheDay) => {
        console.warn = vi.fn();
        await mountSuspended(WordleBoard, {
          props: { wordOfTheDay: wordOfTheDay },
        });
        expect(console.warn).toHaveBeenCalled();
      }
    );
    test("no warning is emitted if the word of the day provided is a real uppercase English word with 5 chars", async () => {
      console.warn = vi.fn();
      await mountSuspended(WordleBoard, {
        props: { wordOfTheDay: "WORLD" },
      });
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("Player input", async () => {
    test.todo("player guesses are limited to 5 characters");
    test.todo("player guesses can only be submitted if they are real word");
    test.todo("player guesses can are not case-sensitive");
    test.todo("player guesses can only contain letters");
  });
});
