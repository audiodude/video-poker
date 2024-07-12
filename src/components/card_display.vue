<script setup lang="ts">
import { useCardsStore } from '@/stores/cards';

// access the `store` variable anywhere in the component ✨
const store = useCardsStore();
</script>

<template>
  <div>
    <h1>Card Display</h1>
  </div>
</template>
