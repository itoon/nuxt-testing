<template>
  <h1>{{ wordOfTheDay }}</h1>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="guess" />
  </form>
  <p v-if="isCorrect">{{ VICTORY_MESSAGE }}</p>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE } from "@/settings";
const guess = ref("");
const props = defineProps({
  wordOfTheDay: String,
});
const isCorrect = ref(false);

const handleSubmit = () => {
  if (guess.value == props.wordOfTheDay) {
    isCorrect.value = true;
  }
};
</script>
