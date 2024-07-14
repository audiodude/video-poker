<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';

const cards = useCardsStore();
</script>

<template>
  <div class="flex justify-around my-4">
    <div class="w-20 h-20 p-4 border border-black text-center" v-for="card of cards.dealt">
      {{ card.rank }}{{ card.suit }}
    </div>
  </div>
</template>
