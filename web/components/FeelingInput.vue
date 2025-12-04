<template>
  <div class="feeling-input-container">
    <!-- Optional feeling input - gentle invitation, not requirement -->
    <div class="feeling-section">
      <label class="feeling-label">
        <span class="label-text">If you'd like, you can share how you're feeling right now</span>
        <span class="optional-badge">(optional)</span>
      </label>

      <textarea
        v-model="localFeeling"
        @input="handleInput"
        class="feeling-textarea"
        :placeholder="placeholderText"
        rows="3"
        maxlength="300"
      />

      <div class="feeling-footer">
        <p class="transparency-note">
          This is only used to create your letter. It's not saved or analyzed.
        </p>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

interface Props {
  modelValue?: string;
}

interface Emits {
  (e: 'update:modelValue', value: string): void;
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ''
});

const emit = defineEmits<Emits>();

const localFeeling = ref(props.modelValue || '');

// Sync with prop changes (e.g., when cleared after generation)
watch(() => props.modelValue, (newValue) => {
  localFeeling.value = newValue || '';
});

const placeholderText = 'A few words about how you feel... or leave it empty';

function handleInput(event: Event) {
  const target = event.target as HTMLTextAreaElement;
  localFeeling.value = target.value;
  emit('update:modelValue', localFeeling.value);
}
</script>

<style scoped>
.feeling-input-container {
  @apply w-full max-w-2xl mx-auto;
}

.feeling-section {
  @apply mb-8;
  @apply border-t border-gray-200 pt-8;
}

.feeling-label {
  @apply block mb-3;
  @apply text-sm font-serif text-gray-700;
  @apply leading-relaxed;
}

.label-text {
  @apply block;
}

.optional-badge {
  @apply inline-block ml-2;
  @apply text-xs text-gray-500;
  @apply font-normal;
  @apply italic;
}

.feeling-textarea {
  @apply w-full;
  @apply px-4 py-3;
  @apply border border-gray-300;
  @apply rounded-none;
  @apply font-serif text-base;
  @apply text-gray-900;
  @apply bg-white;
  @apply resize-none;
  @apply transition-colors;
  @apply focus:outline-none focus:border-gray-500;
  @apply placeholder:text-gray-400;
}

.feeling-textarea:focus {
  @apply border-gray-500;
}

.feeling-footer {
  @apply mt-2;
}

.transparency-note {
  @apply text-xs text-gray-500;
  @apply font-serif;
  @apply leading-relaxed;
}

/* Mobile adjustments */
@media (max-width: 640px) {
  .feeling-label {
    @apply text-xs;
  }

  .feeling-textarea {
    @apply text-sm;
  }

  .transparency-note {
    @apply text-xs;
  }

}
</style>

