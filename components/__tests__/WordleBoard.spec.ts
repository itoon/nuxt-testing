import { beforeEach, describe, expect, test, vi } from "vitest";
import WordleBoard from "~/components/WordleBoard.vue";
import { mountSuspended } from "@nuxt/test-utils/runtime";
import { VICTORY_MESSAGE, DEFAT_MESSAGE } from "@/settings";

describe("WordleBoard", async () => {
  const wordOfTheDay = "World";
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

  test("a victory message appears when the user makes a guess that matches the word of the day", async () => {
    await playerSubmitGuess("World");
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

  // add rule
  test("If a word of the day provide does not have exatly 5 characters, a warning is emiited", async () => {
    // const spy = vi.spyOn(console, "warn");
    console.warn = vi.fn();
    await mountSuspended(WordleBoard, {
      props: { wordOfTheDay: "FLY" },
    });
    expect(console.warn).toHaveBeenCalled();
  });
});
