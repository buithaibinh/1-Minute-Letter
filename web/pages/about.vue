<template>
  <div class="min-h-screen bg-white">
    <main class="container mx-auto px-4 py-12 max-w-2xl">
      <!-- Header -->
      <header class="mb-8">
        <NuxtLink to="/" class="back-link">← Back</NuxtLink>
        <h1 class="text-3xl font-serif text-gray-900 mt-4 mb-2">
          About
        </h1>
      </header>

      <!-- Content -->
      <div class="about-content">
        <section class="mb-8">
          <p class="text-lg leading-relaxed font-serif text-gray-900 mb-4">
            This is an AI-generated letter from the perspective of your future self.
          </p>
          <p class="text-lg leading-relaxed font-serif text-gray-900 mb-4">
            It's designed to offer quiet companionship, not advice or therapy.
          </p>
          <p class="text-lg leading-relaxed font-serif text-gray-900 mb-4">
            No data is stored. No tracking. Just a moment of reflection.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-serif text-gray-900 mb-4">
            How it works
          </h2>
          <p class="text-base leading-relaxed font-serif text-gray-700 mb-4">
            When you request a letter, we use OpenAI's GPT-4o to generate a short, quiet letter written from the perspective of your future self. The AI is prompted to focus on acknowledgment and companionship, not advice or solutions.
          </p>
          <p class="text-base leading-relaxed font-serif text-gray-700 mb-4">
            The letter is generated fresh each time (or once per day, stored locally in your browser). We don't store any data on our servers. Everything stays in your browser's localStorage.
          </p>
        </section>

        <section class="mb-8">
          <h2 class="text-xl font-serif text-gray-900 mb-4">
            What this is not
          </h2>
          <ul class="list-disc list-inside text-base leading-relaxed font-serif text-gray-700 space-y-2">
            <li>This is not therapy or professional mental health support</li>
            <li>This is not written by a human</li>
            <li>This is not a productivity tool or habit tracker</li>
            <li>This is not designed to create dependency or habits</li>
          </ul>
        </section>

        <section>
          <h2 class="text-xl font-serif text-gray-900 mb-4">
            Privacy
          </h2>
          <p class="text-base leading-relaxed font-serif text-gray-700 mb-4">
            We don't collect any personal information. No accounts, no login, no tracking. The letters are stored only in your browser's localStorage and are never sent to our servers.
          </p>
          <p class="text-base leading-relaxed font-serif text-gray-700">
            If you want to clear your data, simply clear your browser's localStorage for this site.
          </p>
        </section>
      </div>

      <!-- Footer -->
      <footer class="mt-12 pt-8 border-t border-gray-200">
        <p class="text-sm text-gray-500 text-center">
          Created with respect for emotional autonomy and quiet companionship.
        </p>
      </footer>
    </main>
  </div>
</template>

<script setup lang="ts">
// No logic needed - static page
</script>

<style scoped>
.back-link {
  @apply text-gray-600;
  @apply hover:text-gray-900;
  @apply transition-colors;
  @apply font-serif;
}

.about-content {
  @apply space-y-8;
}
</style>

