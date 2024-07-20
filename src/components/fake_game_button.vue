<script setup lang="ts">
import { useGameStore } from '@/stores/game';

const game = useGameStore();
</script>

<template>
  <div class="mt-10 text-right">
    <button
      class="py-4 px-6 mr-8 border cursor-pointer text-[4rem]"
      type="button"
      @click="game.next"
    >
      Deal
    </button>
  </div>
</template>
