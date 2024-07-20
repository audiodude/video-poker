<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';
import { useGameStore, GameState } from '@/stores/game';

import Card from '@/components/card.vue';
import { Card as CardModel } from '@/lib/card';

const cards = useCardsStore();
const game = useGameStore();

function onHoldClick(card: CardModel, isHeld: boolean) {
  if (isHeld) {
    cards.held.push(card);
  } else {
    cards.held = cards.held.filter((c) => c !== card);
  }
}

function isHeld(card: CardModel) {
  return cards.held.includes(card);
}
</script>

<template>
  <div class="flex mx-auto w-[86.125rem]">
    <Card
      :card="c"
      v-for="c of game.currentCards"
      :held="isHeld(c)"
      :onHoldClick="onHoldClick"
    ></Card>
  </div>
</template>

<style lang="scss">
@use 'src/styles/cards';
</style>
