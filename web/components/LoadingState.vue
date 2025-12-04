<template>
  <div class="loading-state">
    <p class="loading-text">{{ message }}</p>
  </div>
</template>

<script setup lang="ts">
interface Props {
  message?: string;
}

withDefaults(defineProps<Props>(), {
  message: 'Generating letter...'
});
</script>

<style scoped>
.loading-state {
  @apply w-full max-w-2xl mx-auto px-4 py-8;
  @apply text-center;
}

.loading-text {
  @apply text-lg;
  @apply font-serif;
  @apply text-gray-600;
}
</style>

