# 1 Minute Letter

A quiet emotional AI experience - receive a short letter from your future self.

## Project Structure

```
.
├── web/              # Web application (Nuxt 3)
├── docs/             # Documentation (PRD, MVP Scope, Implementation Plan)
└── README.md         # This file
```

## Web Application

The web application is built with Nuxt 3 and located in the `web/` directory.

### Tech Stack

- **Frontend:** Nuxt 3 + TypeScript + TailwindCSS (SPA)
- **Backend:** Nuxt Nitro serverless functions
- **AI:** OpenAI GPT-4o
- **Deploy:** Vercel

### Setup

1. **Navigate to web directory:**
   ```bash
   cd web
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   ```bash
   cp .env.example .env
   # Edit .env and add your OPENAI_API_KEY
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Build for production:**
   ```bash
   npm run build
   ```

### Deployment to Vercel

1. Push code to GitHub
2. Connect repository to Vercel
3. Set root directory to `web/` in Vercel settings
4. Add environment variable: `OPENAI_API_KEY`
5. Deploy

## Documentation

- `docs/prd.md` - Product Requirements Document
- `docs/mvp-scope.md` - MVP Scope (strict constraints)
- `docs/implementation-plan.md` - Implementation plan

## Constraints

This MVP explicitly excludes:
- ❌ Login/authentication
- ❌ Notifications
- ❌ Streaks/gamification
- ❌ Social sharing
- ❌ Engagement optimization
- ❌ Monetization

## License

Private project
