<template>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="formattedGuessInput" :maxlength="WORD_SIZE" />
  </form>
</template>

<script setup lang="ts">
import { WORD_SIZE } from "@/settings";
import englishWords from "@/data/englishWordsWith5Letters.json";

const emit = defineEmits<{
  submitGuess: [guess: string];
}>();
const guess = ref<string | null>();

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
  emit("submitGuess", formattedGuessInput.value);
};
</script>
