<template>
  <h1>Wordle</h1>
  <GuessInput @submitGuess="handleSubmit" />
  <div v-if="isGuess">
    {{ guessSubmit === props.wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
  </div>
</template>

<script setup lang="ts">
import GuessInput from "@/components/GuessInput.vue";
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from "@/settings";
import englishWords from "@/data/englishWordsWith5Letters.json";

const guessSubmit = ref<string | null>();
const props = defineProps({
  wordOfTheDay: {
    type: String,
    request: true,
    validator: (wordGiven: string) =>
      wordGiven.length === WORD_SIZE &&
      wordGiven.toLocaleUpperCase() === wordGiven &&
      englishWords.includes(wordGiven),
  },
});

const isGuess = ref(false);
const handleSubmit = (guessInput: string) => {
  isGuess.value = true;
  guessSubmit.value = guessInput;
};
</script>
