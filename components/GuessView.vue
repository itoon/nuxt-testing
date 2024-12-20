<template>
  <ul>
    <li v-for="guess in guesses">
      {{ guess }}
    </li>
  </ul>
</template>

<script setup lang="ts">
defineProps<{ guesses: string[] }>();
</script>
