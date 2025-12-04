<template>
  <div class="letter-display">
    <div class="letter-content">
      {{ letter }}
    </div>
  </div>
</template>

<script setup lang="ts">
interface Props {
  letter: string;
  generatedAt?: string;
}

defineProps<Props>();
</script>

<style scoped>
.letter-display {
  @apply w-full max-w-2xl mx-auto px-4 py-8;
}

.letter-content {
  @apply text-lg leading-relaxed;
  @apply font-serif;
  @apply text-gray-900;
  @apply whitespace-pre-wrap;
  @apply break-words;
}

/* Ensure readability on mobile */
@media (max-width: 640px) {
  .letter-content {
    @apply text-base;
  }
}
</style>

