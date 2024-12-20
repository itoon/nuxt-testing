<template>
  <ul class="word">
    <li v-for="(letter, index) in guesses" :data-letter="letter">
      {{ letter }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ guesses: string }>();
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
  border: 1px solid #d5d5d5;
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
