<script setup lang="ts">
import CardDisplay from '@/components/card_display.vue';
import FakeGameButton from '@/components/fake_game_button.vue';
import { onMounted } from 'vue';

function calculateFontSize() {
  const el = document.getElementsByClassName('wrapper')[0];
  const length = el.getBoundingClientRect().width;
  const fontSize = length / 100;
  document.documentElement.style.fontSize = `${fontSize}px`;
}

window.addEventListener('resize', calculateFontSize);
onMounted(calculateFontSize);
</script>

<template>
  <div class="wrapper">
    <CardDisplay />
    <FakeGameButton />
  </div>
</template>

<style scoped>
.wrapper {
  height: 75vw;
  width: 100vw;

  max-height: 100vh;
  max-width: 100vw;

  background-color: green;
}

@media (min-width: 133.33vh) {
  .wrapper {
    height: 100vh;
    width: 133.33vh;
  }
}
</style>
