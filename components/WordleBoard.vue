<template>
  <h1>{{ wordOfTheDay }}</h1>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="guess" />
  </form>
  <div v-if="isGuessed">
    <p v-if="isCorrect">{{ VICTORY_MESSAGE }}</p>
    <p v-else>{{ DEFAT_MESSAGE }}Better luck next time</p>
  </div>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE, DEFAT_MESSAGE } from "@/settings";
const guess = ref("");
const props = defineProps({
  wordOfTheDay: String,
});
const isCorrect = ref(false);
const isGuessed = ref(false);
const handleSubmit = () => {
  isGuessed.value = true;
  if (guess.value == props.wordOfTheDay) {
    isCorrect.value = true;
  }
};
</script>
