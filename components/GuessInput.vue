<template>
  <ul class="word">
    <li
      v-for="(letter, index) in formattedGuessInput"
      :key="index"
      :data-letter="letter"
    >
      {{ letter }}
    </li>
  </ul>
  <form id="submit" @submit.prevent="handleSubmit">
    <input
      type="text"
      v-model="formattedGuessInput"
      :maxlength="WORD_SIZE"
      autofocus
      @blur="({target}) => (target as HTMLInputElement).focus()"
      style="opacity: 0; position: absolute"
    />
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
  formattedGuessInput.value = "";
};
</script>

<style scoped>
ul.word {
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
}
ul.word li {
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 2rem;
  margin: 0 2px;
  text-align: center;
  width: 3rem;
  height: 3rem;
  border: 1px solid #000;
  font-weight: bolder;
}
li:not([data-letter=""]) {
  animation: pop 100ms;
}

@keyframes pop {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.4);
  }
}
</style>
