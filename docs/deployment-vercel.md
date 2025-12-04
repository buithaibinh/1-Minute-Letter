# Deployment Guide - Vercel

**Project:** 1 Minute Letter
**Platform:** Vercel
**Framework:** Nuxt 3 (SPA mode)
**Last Updated:** 2025-12-03

---

## Prerequisites

Before deploying, ensure you have:

- ✅ GitHub repository with code pushed
- ✅ Vercel account (sign up at [vercel.com](https://vercel.com))
- ✅ OpenAI API key (get from [platform.openai.com](https://platform.openai.com))

---

## Step 1: Prepare Repository

### 1.1 Push Code to GitHub

```bash
# Ensure all changes are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

### 1.2 Verify Project Structure

Your repository should have this structure:

```
1-minute-letter/
├── web/                    # Application root (Vercel will use this)
│   ├── package.json
│   ├── nuxt.config.ts
│   ├── server/
│   │   └── api/
│   │       └── letter.post.ts
│   └── ...
├── docs/
└── README.md
```

---

## Step 2: Create Vercel Project

### 2.1 Import Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Select the repository: `1-minute-letter`

### 2.2 Configure Project Settings

**⚠️ CRITICAL: Set Root Directory**

1. In **"Configure Project"** section, click **"Root Directory"**
2. Click **"Edit"**
3. Set root directory to: `web`
4. Click **"Continue"**

**Project Settings:**
- **Framework Preset:** Nuxt.js (auto-detected)
- **Root Directory:** `web` ⚠️ **MUST SET THIS**
- **Build Command:** `npm run build` (auto-detected)
- **Output Directory:** `.output/public` (auto-detected for Nuxt SPA)
- **Install Command:** `npm install` (auto-detected)

---

## Step 3: Environment Variables

### 3.1 Add Environment Variable

1. In project settings, go to **"Environment Variables"**
2. Click **"Add"**
3. Add the following:

**Variable Name:** `OPENAI_API_KEY`
**Value:** Your OpenAI API key (starts with `sk-...`)
**Environment:** Production, Preview, Development (select all)

4. Click **"Save"**

### 3.2 Verify Environment Variable

- ✅ Variable name is exactly: `OPENAI_API_KEY` (case-sensitive)
- ✅ Value is your valid OpenAI API key
- ✅ Applied to all environments (Production, Preview, Development)

---

## Step 4: Deploy

### 4.1 Initial Deployment

1. Click **"Deploy"** button
2. Wait for build to complete (usually 1-3 minutes)
3. Check build logs for any errors

### 4.2 Verify Deployment

After deployment completes:

1. Click on the deployment URL (e.g., `1-minute-letter.vercel.app`)
2. Verify the app loads correctly
3. Test letter generation:
   - Click "Receive a letter"
   - Verify letter generates successfully
   - Check that letter is in correct language (based on browser language)

---

## Step 5: Custom Domain (Optional)

### 5.1 Add Custom Domain

1. Go to project **"Settings"** → **"Domains"**
2. Click **"Add"**
3. Enter your domain (e.g., `1minuteletter.com`)
4. Follow DNS configuration instructions
5. Wait for DNS propagation (can take up to 24 hours)

---

## Build Configuration

### Automatic Detection

Vercel automatically detects Nuxt 3 and configures:

- **Build Command:** `npm run build`
- **Output Directory:** `.output/public` (for SPA mode)
- **Install Command:** `npm install`

### Manual Override (if needed)

If auto-detection fails, manually set in **"Settings"** → **"General"**:

```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".output/public",
  "installCommand": "npm install",
  "framework": "nuxtjs"
}
```

---

## Environment Variables Reference

### Required Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `OPENAI_API_KEY` | OpenAI API key for letter generation | `sk-...` |

### Where Variables Are Used

- **`OPENAI_API_KEY`**: Used in `web/server/api/letter.post.ts` for OpenAI API calls
- Accessible only on server-side (via `useRuntimeConfig()`)

---

## Troubleshooting

### Build Fails

**Error: "Cannot find module"**
- ✅ Ensure `Root Directory` is set to `web`
- ✅ Verify `package.json` exists in `web/` directory
- ✅ Check build logs for missing dependencies

**Error: "Build command failed"**
- ✅ Check `package.json` has correct build script: `"build": "nuxt build"`
- ✅ Verify all dependencies are listed in `package.json`
- ✅ Check build logs for specific error messages

### Runtime Errors

**Error: "OpenAI API key not configured"**
- ✅ Verify `OPENAI_API_KEY` environment variable is set
- ✅ Check variable name is exactly `OPENAI_API_KEY` (case-sensitive)
- ✅ Ensure variable is added to Production environment
- ✅ Redeploy after adding environment variable

**Error: "Failed to generate letter"**
- ✅ Check OpenAI API key is valid and has credits
- ✅ Verify API key has access to GPT-4o model
- ✅ Check Vercel function logs for detailed error

### Deployment Issues

**App shows 404 or blank page**
- ✅ Verify `Root Directory` is set to `web`
- ✅ Check `nuxt.config.ts` has `ssr: false` (SPA mode)
- ✅ Ensure build completed successfully

**API endpoint returns 500**
- ✅ Check server function logs in Vercel dashboard
- ✅ Verify `OPENAI_API_KEY` is set correctly
- ✅ Test API endpoint directly: `https://your-domain.vercel.app/api/letter`

---

## Post-Deployment Checklist

After successful deployment, verify:

- [ ] App loads at deployment URL
- [ ] Favicon displays correctly
- [ ] Page title shows "1 Minute Letter"
- [ ] "Receive a letter" button works
- [ ] Letter generates successfully
- [ ] Letter is in correct language (matches browser language)
- [ ] Feeling input works (optional feature)
- [ ] About page accessible
- [ ] Transparency footer visible
- [ ] No console errors in browser
- [ ] Mobile responsive (test on phone)

---

## Continuous Deployment

### Automatic Deployments

Vercel automatically deploys when you:

- Push to `main` branch → **Production** deployment
- Push to other branches → **Preview** deployment
- Open Pull Request → **Preview** deployment

### Manual Deployment

1. Go to Vercel dashboard
2. Select your project
3. Click **"Deployments"** tab
4. Click **"Redeploy"** on any deployment

---

## Monitoring

### View Logs

1. Go to project dashboard
2. Click on a deployment
3. Click **"Functions"** tab
4. Click on function (e.g., `api/letter`)
5. View real-time logs

### Check Function Performance

- Go to **"Analytics"** tab
- View function execution times
- Monitor error rates
- Check API usage

---

## Rollback

If deployment has issues:

1. Go to **"Deployments"** tab
2. Find previous working deployment
3. Click **"..."** menu
4. Click **"Promote to Production"**

---

## Cost Considerations

### Vercel Free Tier

- ✅ 100GB bandwidth/month
- ✅ Unlimited serverless function executions
- ✅ Automatic HTTPS
- ✅ Custom domains

### OpenAI API Costs

- GPT-4o pricing: ~$0.01-0.03 per letter (depending on length)
- Monitor usage at [platform.openai.com/usage](https://platform.openai.com/usage)
- Set usage limits if needed

---

## Security Notes

### Environment Variables

- ✅ Never commit `OPENAI_API_KEY` to repository
- ✅ Use Vercel environment variables only
- ✅ Rotate API key if exposed

### API Security

- ✅ API endpoint is public (no authentication by design)
- ✅ Rate limiting handled by Vercel (free tier: reasonable limits)
- ✅ No user data stored (privacy-first design)

---

## Support

### Vercel Documentation

- [Vercel Docs](https://vercel.com/docs)
- [Nuxt Deployment Guide](https://nuxt.com/docs/getting-started/deployment#vercel)

### Project Documentation

- `docs/prd.md` - Product Requirements
- `docs/implementation-plan.md` - Implementation details
- `web/README.md` - Local setup guide

---

## Quick Reference

### Deployment URL Format

```
https://[project-name].vercel.app
```

### API Endpoint

```
POST https://[project-name].vercel.app/api/letter
```

### Environment Variable

```
OPENAI_API_KEY=sk-...
```

---

**Last Updated:** 2025-12-03
**Status:** ✅ Ready for Production Deployment

