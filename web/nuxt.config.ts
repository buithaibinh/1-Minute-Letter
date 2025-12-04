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
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: '/favicon.svg'
        }
      ],
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content: 'A quiet letter from your future self'
        },
        // OpenGraph tags for link sharing
        {
          property: 'og:title',
          content: '1 Minute Letter'
        },
        {
          property: 'og:description',
          content: 'A quiet letter from your future self'
        },
        {
          property: 'og:image',
          content: '/og-image.svg'
        },
        {
          property: 'og:type',
          content: 'website'
        }
      ]
    }
  }
})

