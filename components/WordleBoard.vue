<template>
  <h1>Wordle</h1>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="formattedGuessInput" maxlength="5" />
  </form>
  <div v-if="isGuessed">
    {{ guess === props.wordOfTheDay ? VICTORY_MESSAGE : DEFAT_MESSAGE }}
  </div>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE, DEFAT_MESSAGE, WORD_SIZE } from "@/settings";
import englishWords from "@/data/englishWordsWith5Letters.json";
const guess = ref("");
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

const isGuessed = ref(false);
const formattedGuessInput = computed({
  get: () => guess.value,
  set: (rawValue: string) => {
    guess.value = rawValue.slice(0, WORD_SIZE).toUpperCase();
  },
});
const handleSubmit = () => {
  if (!englishWords.includes(guess.value)) {
    return;
  }
  isGuessed.value = true;
};
</script>
