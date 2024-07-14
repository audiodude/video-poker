<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';

const cards = useCardsStore();
</script>

<template>
  <div class="flex justify-around mx-auto w-[82.125rem]">
    <div
      :class="`c-${card.rank}${card.suit}`"
      class="ml-4 first:ml-0 w-[15.625rem] h-[22.6875rem] bg-contain bg-no-repeat"
      v-for="card of cards.dealt"
    ></div>
  </div>
</template>

<style lang="scss">
@use 'src/styles/cards';
</style>
