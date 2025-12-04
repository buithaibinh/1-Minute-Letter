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
        <template v-if="letter">
          <LetterDisplay
            :letter="letter"
            :generated-at="generatedAt"
          />

          <!-- Show feeling text below letter (if user provided one) -->
          <div v-if="feeling.trim()" class="feeling-context">
            <p class="feeling-context-label">What you shared:</p>
            <p class="feeling-context-text">{{ feeling }}</p>
          </div>
        </template>

        <!-- Initial State: Button to generate with optional feeling input -->
        <div v-else-if="!loading && !error" class="initial-state">
          <!-- Optional feeling input - gentle invitation -->
          <FeelingInput
            v-model="feeling"
            class="mb-8"
          />

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
const feeling = ref<string>('');

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
    // Pass feeling (can be empty string) to generateLetter
    const response = await generateLetter(feeling.value.trim());

    letter.value = response.letter;
    generatedAt.value = response.generatedAt;

    // Save to localStorage (feeling is NOT saved - only used for generation)
    saveLetter(response.letter, response.generatedAt);

    // Keep feeling in state - user can read letter while still seeing their feeling text
    // Feeling will be cleared on page reload
    // This allows user to "stay with their feeling a bit longer, not be 'reset' too quickly"
    // No "Receive another letter" button - one quiet moment is enough

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

.feeling-context {
  @apply mt-8 pt-8;
  @apply border-t border-gray-200;
  @apply max-w-2xl mx-auto px-4;
}

.feeling-context-label {
  @apply text-xs text-gray-500;
  @apply font-serif mb-2;
}

.feeling-context-text {
  @apply text-sm text-gray-600;
  @apply font-serif italic;
  @apply leading-relaxed;
}
</style>

