import { beforeEach, describe, expect, test, vi } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from "@/settings";

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

    test("a defeat message appears if the user makes a guess that is incorrect", async () => {
      await playerSubmitGuess("WRONG");
      expect(wrapper.html()).toContain(DEFEAT_MESSAGE);
    });

    test("no end-of-game message appears if the user has not yet made a guess", async () => {
      expect(wrapper.html()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.html()).not.toContain(DEFEAT_MESSAGE);
    });
  });

  describe("Rule for defining the word of the day", async () => {
    beforeEach(() => {
      console.warn = vi.fn();
    });
    test.each([
      {
        wordOfTheDay: "FLY",
        reason: "word-of-the-day must have 5 characters",
      },
      {
        wordOfTheDay: "world",
        reason: "word-of-the-day must be all in uppercase",
      },
      {
        wordOfTheDay: "QWERT",
        reason: "word-of-the-day must be a valid English word",
      },
    ])(
      "Since $reason $wordOfTheDay is invalid, therefore a warning is emiited",
      async ({ wordOfTheDay }) => {
        await mountSuspended(WordleBoard, {
          props: { wordOfTheDay: wordOfTheDay },
        });
        expect(console.warn).toHaveBeenCalled();
      }
    );
    test("no warning is emitted if the word of the day provided is a real uppercase English word with 5 chars", async () => {
      await mountSuspended(WordleBoard, {
        props: { wordOfTheDay: "WORLD" },
      });
      expect(console.warn).not.toHaveBeenCalled();
    });
  });

  describe("Player input", async () => {
    test(`player guesses are limited to ${WORD_SIZE} characters`, async () => {
      await playerSubmitGuess(wordOfTheDay + "EXTRA");
      expect(wrapper.text()).toContain(VICTORY_MESSAGE);
    });

    test("player guesses can only be submitted if they are real word", async () => {
      await playerSubmitGuess("QWERT");
      expect(wrapper.html()).not.toContain(VICTORY_MESSAGE);
      expect(wrapper.html()).not.toContain(DEFEAT_MESSAGE);
    });

    test("player guesses can are not case-sensitive", async () => {
      await playerSubmitGuess(wordOfTheDay.toLowerCase());
      expect(wrapper.html()).toContain(VICTORY_MESSAGE);
    });

    test("player guesses can only contain letters", async () => {
      await playerSubmitGuess("WR@!2");
      expect(wrapper.find("input[type=text]").element.value).toEqual("WR");
    });

    test("non-letter characters do not render on the screen while being typed", async () => {
      await playerSubmitGuess("333");
      await playerSubmitGuess("223");
      expect(wrapper.find("input[type=text]").element.value).toEqual("");
    });
  });
});
