# 1 Minute Letter - MVP Implementation Plan

**Author:** Binh (Lead Developer)
**Date:** 2025-12-03
**Status:** ✅ **IMPLEMENTED** (2025-12-03)
**Tech Stack:** Nuxt 3 + TypeScript + TailwindCSS + OpenAI GPT-4o + Vercel
**Timebox:** 3-5 days

**Source Documents:**
- `docs/prd.md` - Product Requirements
- `docs/mvp-scope.md` - MVP Scope (strict constraints)

**Implementation Status:** ✅ Complete - All files created in `web/` directory. Ready for testing and deployment.

---

## 1. Project Architecture

### Directory Structure

```
1-minute-letter/
├── docs/                   # Documentation
├── web/                    # Web application (Nuxt 3)
│   ├── .env                # Environment variables (OPENAI_API_KEY)
│   ├── .gitignore
│   ├── nuxt.config.ts      # Nuxt configuration
│   ├── package.json
│   ├── tsconfig.json
│   │
│   ├── server/
│   │   └── api/
│   │       └── letter.post.ts  # API endpoint: Generate letter
│   │
│   ├── pages/
│   │   ├── index.vue       # Main page: Letter display
│   │   └── about.vue        # About page: Transparency info
│   │
│   ├── components/
│   │   ├── LetterDisplay.vue  # Letter content display
│   │   ├── LoadingState.vue   # "Generating letter..." state
│   │   └── TransparencyFooter.vue  # AI transparency statement
│   │
│   ├── composables/
│   │   ├── useLetter.ts    # Letter generation logic
│   │   └── useLocalStorage.ts  # localStorage utilities
│   │
│   ├── utils/
│   │   └── date.ts         # Date utilities (check daily limit)
│   │
│   └── public/
│       └── (empty - no static assets needed)
│
└── README.md               # Root README
```

### Architecture Decisions

**Frontend:**
- Nuxt 3 SPA mode (no SSR needed for MVP)
- TypeScript for type safety
- TailwindCSS for minimal styling
- Composables for business logic

**Backend:**
- Nuxt Nitro serverless functions (auto-deployed to Vercel)
- Single API endpoint: `/api/letter`
- OpenAI API key stored in environment variables

**State Management:**
- localStorage only (no Pinia/Vuex needed)
- Store: `lastLetterDate`, `letterContent`, `letterDate`

**No:**
- Database
- Authentication
- Notifications
- Analytics (beyond basic Vercel analytics)

---

## 2. Backend API Endpoints

### POST `/api/letter`

**Purpose:** Generate a letter from "future self" using OpenAI

**Method:** POST

**Request:**
```typescript
// No request body needed for MVP
// Optional: Could add timestamp to prevent caching
{
  timestamp?: number  // Optional: current timestamp
}
```

**Response:**
```typescript
{
  letter: string,           // Generated letter content
  generatedAt: string,      // ISO timestamp
  model: string             // "gpt-4o" (for transparency)
}
```

**Error Response:**
```typescript
{
  error: string,            // Error message
  code?: string            // Optional error code
}
```

**Implementation Notes:**
- Use OpenAI GPT-4o API
- Prompt template: "Write a short, quiet letter from the perspective of the user's future self. Focus on acknowledgment and companionship, not advice. Keep it under 200 words. Tone: gentle, understanding, non-judgmental."
- No user context needed (generic "future self" perspective)
- Rate limiting: None for MVP (Vercel handles basic rate limiting)
- Caching: None (generate fresh each time)

**File:** `server/api/letter.post.ts`

---

## 3. Frontend Components

### `pages/index.vue` (Main Page)

**Purpose:** Main entry point - displays letter or generation button

**State:**
- `letter: string | null` - Current letter content
- `loading: boolean` - Generation in progress
- `error: string | null` - Error message

**Flow:**
1. On mount: Check localStorage for today's letter
2. If exists: Display letter
3. If not: Show "Receive a letter" button
4. On click: Call API, show loading, display letter, save to localStorage

**UI Elements:**
- Title: "1 Minute Letter"
- Subtitle: "A quiet letter from your future self"
- Button: "Receive a letter" (only if no letter today)
- Letter display area (when letter exists)
- Transparency footer (always visible)

**File:** `pages/index.vue`

---

### `components/LetterDisplay.vue`

**Purpose:** Display letter content in readable format

**Props:**
```typescript
{
  letter: string,      // Letter content
  generatedAt?: string // Optional timestamp
}
```

**Styling:**
- Max width: 600px (readable line length)
- Typography: System serif font (Georgia, Times, etc.)
- Font size: 18px (comfortable reading)
- Line height: 1.6
- Padding: 2rem
- No animations, no distractions

**File:** `components/LetterDisplay.vue`

---

### `components/LoadingState.vue`

**Purpose:** Show loading state during letter generation

**Props:**
```typescript
{
  message?: string  // Default: "Generating letter..."
}
```

**Styling:**
- Simple text, no spinner
- Centered, minimal
- Same typography as letter

**File:** `components/LoadingState.vue`

---

### `components/TransparencyFooter.vue`

**Purpose:** Always-visible transparency statement about AI

**Content:**
- "This letter is generated by AI, not written by a human"
- Link to `/about` page

**Styling:**
- Small text, bottom of page
- Subtle color (gray)
- Not intrusive

**File:** `components/TransparencyFooter.vue`

---

### `pages/about.vue` (About Page)

**Purpose:** Explain how the letter is created

**Content:**
- "This is an AI-generated letter from the perspective of your future self"
- "It's designed to offer quiet companionship, not advice or therapy"
- "No data is stored. No tracking. Just a moment of reflection."
- Brief explanation of OpenAI GPT-4o

**File:** `pages/about.vue`

---

## 4. Core Files to Create (Priority Order)

### Day 1: Setup & Infrastructure

1. **`package.json`**
   - Nuxt 3, TypeScript, TailwindCSS dependencies
   - OpenAI SDK (optional - can use fetch)

2. **`nuxt.config.ts`**
   - SPA mode configuration
   - TailwindCSS module
   - Environment variables setup

3. **`tsconfig.json`**
   - TypeScript configuration for Nuxt 3

4. **`server/api/letter.post.ts`**
   - OpenAI API integration
   - Prompt template
   - Error handling

5. **`.env`** (local) / Vercel Environment Variables (production)
   - `OPENAI_API_KEY`

### Day 2: Core Experience

6. **`pages/index.vue`**
   - Main page with letter display logic
   - Button to generate letter
   - localStorage integration

7. **`composables/useLetter.ts`**
   - `generateLetter()` - Call API endpoint
   - `getTodayLetter()` - Check localStorage
   - `saveLetter()` - Save to localStorage

8. **`composables/useLocalStorage.ts`**
   - `getItem()`, `setItem()` with TypeScript types
   - Date-based key management

9. **`utils/date.ts`**
   - `isToday(date: string): boolean` - Check if date is today
   - `getTodayKey(): string` - Generate localStorage key

10. **`components/LetterDisplay.vue`**
    - Letter content display
    - Typography styling

11. **`components/LoadingState.vue`**
    - Loading message

12. **`components/TransparencyFooter.vue`**
    - AI transparency statement

### Day 3: Polish & Transparency

13. **`pages/about.vue`**
    - About page with explanation

14. **`app.vue`** (if needed)
    - Root layout
    - Global styles

15. **`tailwind.config.js`**
    - Custom typography settings
    - Color palette (minimal)

16. **Error handling**
    - Update `pages/index.vue` with error states
    - Update `server/api/letter.post.ts` with proper error responses

---

## 5. Implementation Details

### localStorage Schema

```typescript
// Key: "1minletter:letter:YYYY-MM-DD"
// Value: {
//   letter: string,
//   generatedAt: string,
//   date: string
// }
```

**Example:**
```json
{
  "letter": "I know you're reading this...",
  "generatedAt": "2025-12-03T10:30:00Z",
  "date": "2025-12-03"
}
```

### OpenAI Prompt Template

```
You are writing a short, quiet letter from the perspective of the reader's future self.

Guidelines:
- Keep it under 200 words
- Focus on acknowledgment and companionship, not advice
- Tone: gentle, understanding, non-judgmental
- Write as if you (the future self) have been where they are now
- Avoid giving solutions or telling them what to do
- Simply acknowledge their current state and offer quiet presence
- No motivational language, no "you should", no "you can do it"
- Just understanding and companionship

Write the letter now:
```

### API Error Handling

**OpenAI API Errors:**
- Rate limit: Return 429 with message
- API key invalid: Return 500 with generic message (don't expose key)
- Network error: Return 503
- Other: Return 500 with generic message

**Client Error Handling:**
- Show simple error message: "Unable to generate letter. Please try again."
- No retry logic for MVP
- User can refresh page to retry

### Daily Limit Logic

```typescript
// Check if letter exists for today
const todayKey = getTodayKey(); // "1minletter:letter:2025-12-03"
const stored = localStorage.getItem(todayKey);

if (stored) {
  const data = JSON.parse(stored);
  if (isToday(data.date)) {
    // Show existing letter
    return data.letter;
  }
}

// Generate new letter
```

---

## 6. Constraints Compliance Checklist

### ✅ NO LOGIN
- No authentication code
- No user accounts
- No session management
- localStorage only

### ✅ NO NOTIFICATIONS
- No push notification code
- No email service
- No SMS service
- No browser notification API calls

### ✅ NO STREAKS
- No streak counters
- No "days in a row" tracking
- No badges
- No progress indicators

### ✅ NO SOCIAL SHARING
- No share buttons
- No social media integration
- No Web Share API
- No community features

### ✅ NO ENGAGEMENT OPTIMIZATION
- No analytics tracking (beyond Vercel basic)
- No A/B testing
- No retention tactics
- No "you've been away" messages

### ✅ NO MONETIZATION
- No payment systems
- No subscriptions
- No ads
- No premium features

### ✅ TRANSPARENCY
- Always visible AI statement
- About page explains how it works
- No illusion of human writing

### ✅ ZERO PRESSURE
- No required interactions
- No buttons after reading
- No prompts or reminders
- User controls by visiting/not visiting

---

## 7. Development Workflow

### Day 1: Setup
1. Create `web/` directory
2. Initialize Nuxt 3 project in `web/`
3. Install dependencies (TailwindCSS, TypeScript)
4. Set up Vercel project (set root directory to `web/`)
5. Create API endpoint skeleton
6. Test OpenAI API connection

### Day 2: Core Features
1. Implement letter generation API
2. Create main page with letter display
3. Implement localStorage logic
4. Add loading and error states
5. Test end-to-end flow

### Day 3: Polish
1. Add transparency components
2. Create About page
3. Refine typography and styling
4. Test on mobile devices
5. Fix any bugs

### Day 4-5: Validation
1. Deploy to Vercel
2. Test with 5-10 users
3. Gather qualitative feedback
4. Document findings
5. Iterate if needed

---

## 8. File Creation Checklist

### Configuration Files
- [ ] `package.json`
- [ ] `nuxt.config.ts`
- [ ] `tsconfig.json`
- [ ] `tailwind.config.js`
- [ ] `.env` (local)
- [ ] `.gitignore`

### Backend
- [ ] `server/api/letter.post.ts`

### Frontend Pages
- [ ] `pages/index.vue`
- [ ] `pages/about.vue`

### Components
- [ ] `components/LetterDisplay.vue`
- [ ] `components/LoadingState.vue`
- [ ] `components/TransparencyFooter.vue`

### Composables
- [ ] `composables/useLetter.ts`
- [ ] `composables/useLocalStorage.ts`

### Utils
- [ ] `utils/date.ts`

### Root
- [ ] `app.vue` (if needed)

---

## 9. Key Implementation Notes

### Nuxt 3 SPA Mode
```typescript
// nuxt.config.ts
export default defineNuxtConfig({
  ssr: false,  // SPA mode
  // ...
})
```

### Environment Variables
```typescript
// server/api/letter.post.ts
const apiKey = process.env.OPENAI_API_KEY;
// Vercel automatically provides env vars
```

### TypeScript Types
```typescript
// types/letter.ts (optional, can inline)
export interface Letter {
  letter: string;
  generatedAt: string;
  date: string;
}
```

### TailwindCSS Typography
```css
/* Focus on readability */
.letter-content {
  @apply max-w-2xl mx-auto;
  @apply text-lg leading-relaxed;
  @apply font-serif;
  @apply text-gray-900;
}
```

---

## 10. Testing Strategy

### Manual Testing Checklist

**Core Flow:**
- [ ] First visit: Button appears, click generates letter
- [ ] Letter displays correctly
- [ ] Refresh page: Same letter shows (from localStorage)
- [ ] Next day: New letter generates
- [ ] Error handling: API failure shows error message

**UI/UX:**
- [ ] Typography is readable
- [ ] No distractions or animations
- [ ] Transparency footer always visible
- [ ] About page accessible
- [ ] Mobile responsive

**Constraints:**
- [ ] No login prompts
- [ ] No notifications
- [ ] No streaks or counters
- [ ] No social sharing buttons
- [ ] No engagement tactics

**Emotional Validation:**
- [ ] Users feel no pressure
- [ ] Users feel in control
- [ ] Users understand it's AI
- [ ] Users can forget about it without guilt

---

## 11. Deployment

### Vercel Setup

1. Connect GitHub repo to Vercel
2. **Set root directory to `web/` in Vercel project settings**
3. Set environment variable: `OPENAI_API_KEY`
4. Deploy (auto-deploys on push)
5. Verify API endpoint works
6. Test production build

### Environment Variables (Vercel)
- `OPENAI_API_KEY` - Your OpenAI API key

### Build Command
```bash
cd web
npm run build
```

### Output Directory
```
web/.output/public
```

---

## 12. Success Criteria (Technical)

**MVP is Complete When:**
- ✅ Letter generates successfully via API
- ✅ Letter displays on page
- ✅ localStorage saves/loads correctly
- ✅ Daily limit works (one letter per day)
- ✅ Error handling works
- ✅ Transparency statements visible
- ✅ About page accessible
- ✅ Deployed to Vercel
- ✅ No login/auth code
- ✅ No notification code
- ✅ No analytics beyond basic
- ✅ No social sharing code

**MVP is Ready for User Testing When:**
- ✅ All technical success criteria met
- ✅ Manual testing complete
- ✅ Mobile responsive
- ✅ Error states handled gracefully

---

## 13. Post-MVP Considerations (NOT in MVP)

**Do NOT implement these in MVP:**
- Letter history/storage
- Frequency selection
- Pause/stop controls
- Data export
- Offline support
- Advanced accessibility
- Custom fonts
- Animations
- Analytics beyond basic

**These are explicitly excluded:**
- Login/authentication
- Notifications
- Streaks/gamification
- Social sharing
- Engagement optimization
- Monetization

---

_This plan focuses on the absolute minimum to validate the core emotional experience. Every line of code should serve the goal: quiet companionship without pressure, dependency, or manipulation._

