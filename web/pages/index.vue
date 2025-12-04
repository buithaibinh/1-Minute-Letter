<template>
  <div class="min-h-screen bg-white">
    <main class="container mx-auto px-4 py-12">
      <!-- Header -->
      <header class="text-center mb-12">
        <h1 class="text-3xl font-serif text-gray-900 mb-2">
          1 Minute Letter
        </h1>
        <p class="text-gray-600 font-serif">
          A quiet letter from your future self
        </p>
      </header>

      <!-- Main Content -->
      <div class="max-w-2xl mx-auto">
        <!-- Loading State -->
        <LoadingState v-if="loading" />

        <!-- Error State -->
        <div v-else-if="error" class="error-state">
          <p class="error-text">{{ error }}</p>
          <button
            @click="handleGenerateLetter"
            class="error-button"
          >
            Try again
          </button>
        </div>

        <!-- Letter Display -->
        <LetterDisplay
          v-else-if="letter"
          :letter="letter"
          :generated-at="generatedAt"
        />

        <!-- Initial State: Button to generate -->
        <div v-else class="initial-state">
          <button
            @click="handleGenerateLetter"
            class="generate-button"
            :disabled="loading"
          >
            Receive a letter
          </button>
        </div>
      </div>

      <!-- Transparency Footer -->
      <TransparencyFooter />
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { getTodayLetter, generateLetter, saveLetter } from '~/composables/useLetter';
import type { LetterData } from '~/composables/useLocalStorage';

const letter = ref<string | null>(null);
const generatedAt = ref<string | null>(null);
const loading = ref(false);
const error = ref<string | null>(null);

/**
 * Check for today's letter on mount
 */
onMounted(() => {
  const todayLetter = getTodayLetter();
  if (todayLetter) {
    letter.value = todayLetter.letter;
    generatedAt.value = todayLetter.generatedAt;
  }
});

/**
 * Generate a new letter
 */
async function handleGenerateLetter() {
  loading.value = true;
  error.value = null;

  try {
    const response = await generateLetter();

    letter.value = response.letter;
    generatedAt.value = response.generatedAt;

    // Save to localStorage
    saveLetter(response.letter, response.generatedAt);

  } catch (err: any) {
    error.value = err.message || 'Unable to generate letter. Please try again.';
  } finally {
    loading.value = false;
  }
}
</script>

<style scoped>
.initial-state {
  @apply text-center py-12;
}

.generate-button {
  @apply px-8 py-3;
  @apply bg-gray-900 text-white;
  @apply font-serif text-lg;
  @apply rounded-none;
  @apply border-2 border-gray-900;
  @apply transition-colors;
  @apply hover:bg-gray-800;
  @apply disabled:opacity-50 disabled:cursor-not-allowed;
}

.error-state {
  @apply text-center py-12;
}

.error-text {
  @apply text-gray-600 mb-4;
  @apply font-serif;
}

.error-button {
  @apply px-6 py-2;
  @apply bg-gray-900 text-white;
  @apply font-serif;
  @apply rounded-none;
  @apply border-2 border-gray-900;
  @apply transition-colors;
  @apply hover:bg-gray-800;
}
</style>

