<template>
  <h1>Wordle</h1>
  <ul>
    <li
      v-for="i in MAX_ATTEMPTS - guessSubmit.length"
      :key="`remaining-guess-${i}`"
    >
      <GuessView guesses="" />
    </li>
    <li v-for="(word, index) in guessSubmit" :key="`remaining-guess-${index}`">
      <GuessView :guesses="word" />
    </li>
  </ul>

  <GuessInput @submitGuess="handleSubmit" :disabled="isEndGame" />
  <div>
    <p
      class="end-of-game-message"
      v-if="
        guessSubmit &&
        guessSubmit[guessSubmit.length - 1] === props.wordOfTheDay
      "
    >
      {{ VICTORY_MESSAGE }}
    </p>
    <p
      class="end-of-game-message"
      v-else-if="guessSubmit.length == MAX_ATTEMPTS"
    >
      {{ DEFEAT_MESSAGE }}
    </p>
  </div>
</template>

<script setup lang="ts">
import GuessInput from "@/components/GuessInput.vue";
import GuessView from "@/components/GuessView.vue";
import {
  VICTORY_MESSAGE,
  DEFEAT_MESSAGE,
  WORD_SIZE,
  MAX_ATTEMPTS,
} from "@/settings";
import englishWords from "@/data/englishWordsWith5Letters.json";

const guessSubmit = ref<string[]>([]);
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

const handleSubmit = (guessInput: string) => {
  guessSubmit.value?.push(guessInput);
};

const isEndGame = computed(() => {
  return (
    guessSubmit.value.length === MAX_ATTEMPTS ||
    guessSubmit.value[guessSubmit.value.length - 1] === props.wordOfTheDay
  );
});
</script>

<style lang="css" scoped>
.end-of-game-message {
  font-size: 3rem;
  animation: end-of-game-message-animation 700ms forwards;
  white-space: nowrap;
  text-align: center;
}
@keyframes end-of-game-message-animation {
  0% {
    opacity: 0;
    transform: rotateZ(0);
  }
  100% {
    opacity: 1;
    transform: translateY(2rem);
  }
}
</style>
