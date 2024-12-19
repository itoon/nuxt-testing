<template>
  <h1>{{ wordOfTheDay }}</h1>
  <form @submit="handleSubmit">
    <input type="text" v-model="guess" />
  </form>
  <p v-if="isCorrect">You win</p>
  <p>You win</p>
</template>

<script setup lang="ts">
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
