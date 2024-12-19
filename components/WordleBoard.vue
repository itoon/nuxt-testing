<template>
  <h1>{{ wordOfTheDay }}</h1>
  <form id="submit" @submit.prevent="handleSubmit">
    <input type="text" v-model="guess" />
  </form>
  <div v-if="isGuessed">
    {{ guess === props.wordOfTheDay ? VICTORY_MESSAGE : DEFAT_MESSAGE }}
  </div>
</template>

<script setup lang="ts">
import { VICTORY_MESSAGE, DEFAT_MESSAGE } from "@/settings";
const guess = ref("");
const props = defineProps<{
  wordOfTheDay: string;
}>();

const isGuessed = ref(false);
const message = ref("");
const handleSubmit = () => {
  isGuessed.value = true;
  // if (guess.value == props.wordOfTheDay) {
  //   message.value = VICTORY_MESSAGE;
  // } else {
  //   message.value = DEFAT_MESSAGE;
  // }
};
</script>
