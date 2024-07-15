<script setup lang="ts">
import { defineProps } from 'vue';
import { ref } from 'vue';

import { Card } from '@/lib/card';

defineProps<{ card: Card; held: boolean; onHoldClick: (card: Card, isHeld: boolean) => void }>();
</script>

<template>
  <div class="flex flex-col ml-8 first:ml-0">
    <div
      :class="`c-${card.rank}${card.suit}`"
      class="w-[15.625rem] h-[22.6875rem] bg-contain bg-no-repeat"
    >
      <div class="flex flex-col h-full text-center justify-center" v-if="held">
        <div class="text-[3rem] text-zinc-200 bg-red-700/75">held</div>
      </div>
    </div>
    <div
      class="mt-8 p-4 rounded-2xl text-3xl text-center cursor-pointer bg-yellow-500 text-zinc-200"
      :class="{ 'bg-red-500': held }"
      @click="onHoldClick(card, !held)"
    >
      <div v-if="!held">Hold</div>
      <div v-else>Held</div>
    </div>
  </div>
</template>
