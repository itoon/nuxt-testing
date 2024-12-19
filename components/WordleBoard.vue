<template>
  <h1>Wordle</h1>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="formattedGuessInput" :maxlength="WORD_SIZE" />
  </form>
  <div v-if="isGuessed">
    {{ guess === props.wordOfTheDay ? VICTORY_MESSAGE : DEFEAT_MESSAGE }}
  </div>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE, DEFEAT_MESSAGE, WORD_SIZE } from "@/settings";
import englishWords from "@/data/englishWordsWith5Letters.json";
const guess = ref<string | null>();
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
  get: () => guess.value ?? "",
  set: (rawValue: string) => {
    guess.value = rawValue
      .slice(0, WORD_SIZE)
      .toUpperCase()
      .replace(/[^A-Z]+/gi, "");

    triggerRef(formattedGuessInput);
  },
});
const handleSubmit = () => {
  if (!englishWords.includes(formattedGuessInput.value)) {
    return;
  }
  isGuessed.value = true;
};
</script>
