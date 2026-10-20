# Netlify Deployment & DevOps Guide — RITKARA VEYRA

This guide details the deployment architecture, configuration files, Git-connected continuous integration workflow, and rollback procedures for hosting **RITKARA VEYRA** on Netlify.

---

## 1. Deployment Architecture Summary

- **Platform**: Netlify (Global Edge CDN + Next.js Serverless Runtime).
- **Framework**: Next.js 15+ App Router with TypeScript.
- **Build Command**: `npm run build`
- **Publish Directory**: `.next`
- **Plugin**: `@netlify/plugin-nextjs` (Automated serverless edge function generation for API routes and dynamic SSR).
- **Configuration File**: `netlify.toml` in repository root.

---

## 2. Configuration (`netlify.toml`) Highlights

```toml
[build]
  command = "npm run build"
  publish = ".next"

[[plugins]]
  package = "@netlify/plugin-nextjs"

# Security Headers applied across all responses
[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
    Permissions-Policy = "camera=(), microphone=(), geolocation=(), browsing-topics=()"
    X-DNS-Prefetch-Control = "on"

# Staging & Deploy Preview Noindex Protection
# Prevents unapproved working brand/preview content from leaking into search indexes
[[headers]]
  for = "/*"
  [context.deploy-preview.headers.values]
    X-Robots-Tag = "noindex, nofollow"
  [context.branch-deploy.headers.values]
    X-Robots-Tag = "noindex, nofollow"

# Administrative section protection
[[headers]]
  for = "/admin/*"
  [headers.values]
    X-Robots-Tag = "noindex, nofollow"
    Cache-Control = "no-store, no-cache, must-revalidate, proxy-revalidate"
```

---

## 3. Step-by-Step Deployment Instructions

### Step 3.1: Connect Repository to Netlify
1. Log in to your Netlify account at [https://app.netlify.com](https://app.netlify.com).
2. Click **Add new site > Import an existing project**.
3. Select **GitHub** and authorize access to `affanahmed2302-cmyk/primeora-website`.
4. Select the repository and choose branch `main` (or deploy preview branch `feat/ritkara-veyra-transformation`).

### Step 3.2: Verify Build Settings
Netlify will automatically detect `netlify.toml`:
- **Base directory**: (Leave blank for root)
- **Build command**: `npm run build`
- **Publish directory**: `.next`

### Step 3.3: Set Environment Variables
In the Netlify Site Configuration screen, enter:
- `ADMIN_JWT_SECRET`: Generate a secure 32+ character random string (e.g. `openssl rand -base64 32`).
- `NEXT_PUBLIC_SITE_URL`: Set to your Netlify URL (e.g. `https://ritkara-veyra.netlify.app`).
- `NEXT_PUBLIC_GA_MEASUREMENT_ID`: (Optional: leave blank until GA4 is active).
- `SUPABASE_SERVICE_ROLE_KEY`: (Optional: if connecting cloud Supabase).

### Step 3.4: Deploy Site
Click **Deploy Site**. Netlify will run `npm run build`, bundle serverless functions for `/api/enquiry` and `/api/admin/*`, and distribute static assets to its global CDN.

---

## 4. Rollback and Disaster Recovery

1. **Instant Rollback via Netlify UI**:
   - In Netlify, navigate to **Deploys**.
   - Select any previous successful deploy.
   - Click **Publish deploy** to instantly revert production traffic to that version with 0 downtime.
2. **Git Rollback**:
   - If rolling back via source control:
     ```bash
     git checkout main
     git revert <commit_hash>
     git push origin main
     ```
   - Netlify will automatically trigger a new clean production build.
