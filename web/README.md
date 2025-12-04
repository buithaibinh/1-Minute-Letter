# 1 Minute Letter - Web Application

Nuxt 3 web application for 1 Minute Letter.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OPENAI_API_KEY
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```
web/
├── server/api/       # API endpoints
├── pages/            # Vue pages
├── components/       # Vue components
├── composables/      # Vue composables
└── utils/            # Utility functions
```

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key (required)

## Deployment

This app is configured for Vercel deployment. Set the root directory to `web/` in Vercel project settings.

