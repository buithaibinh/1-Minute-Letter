// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },

  // SPA mode - no SSR needed for MVP
  ssr: false,

  // Modules
  modules: ['@nuxtjs/tailwindcss'],

  // Runtime config for environment variables
  runtimeConfig: {
    // Private keys (only available on server-side)
    openaiApiKey: process.env.OPENAI_API_KEY,

    // Public keys (exposed to client-side)
    public: {
      // No public config needed for MVP
    }
  },

  // App config
  app: {
    head: {
      title: '1 Minute Letter',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A quiet letter from your future self'
        }
      ]
    }
  }
})

