<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';

const cards = useCardsStore();
</script>

<template>
  <div class="mt-10 text-right">
    <button
      class="py-4 px-6 mr-8 border cursor-pointer text-[4rem]"
      type="button"
      @click="cards.deal"
    >
      Deal
    </button>
  </div>
</template>
