<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';

const cards = useCardsStore();
</script>

<template>
  <div>
    <button class="border cursor-pointer" type="button" @click="cards.deal">Deal Cards</button>
  </div>
</template>

<style scoped>
/* Your component's CSS styles go here */
</style>
