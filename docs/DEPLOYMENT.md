# Deployment Guide — Primeora Solutions

## 1. Hosting Architecture Overview
- **Platform**: Netlify (Serverless Next.js Functions + Edge CDN)
- **Framework**: Next.js 15+ App Router (`@netlify/plugin-nextjs`)
- **Site Name / ID**: `primeora-solutions` (`8cb70aac-e601-4086-983a-e7fcb1b8cf79`)
- **Primary Preview URL**: `https://primeora-solutions.netlify.app`
- **Database Backend**: Supabase PostgreSQL (`dvhxcukgxgoptzprolfe`, Region: `ap-south-1` Mumbai, India)
- **Database Connection Pooler**: AWS ap-south-1 pooler on port 6543 with transaction pooling

---

## 2. Environment Variables Configuration

Configure the following variables in the Netlify Site Settings (`Site configuration > Environment variables`):

| Variable Name | Required | Description | Example / Notes |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL | `https://primeora-solutions.netlify.app` |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Site brand title | `PRIMEORA SOLUTIONS` |
| `NEXT_PUBLIC_SITE_TAGLINE` | Yes | Brand tagline | `ARCHITECTURE. INTEGRATION. SCALE.` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase endpoint URL | `https://dvhxcukgxgoptzprolfe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public Supabase anon key | Client-safe API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Elevated service role key | Elevated server-only key for API route mutations |
| `ADMIN_JWT_SECRET` | Yes | 32+ char secret for HMAC session signing | Generate with `crypto.randomBytes(32)` |
| `ALLOW_LOCAL_STORAGE_FALLBACK` | No | Fallback storage switch | Must be `false` in production |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID | e.g. `G-XXXXXXXXXX` |
| `ENQUIRY_NOTIFICATION_EMAIL` | Optional | Internal email recipient | `contact@primeorasolutions.com` |
| `DISCORD_LEAD_WEBHOOK_URL` | Optional | Notification webhook | Inbound webhook URL |

---

## 3. Database Migration Deployment

Before deploying code changes to production, ensure all SQL migrations are applied against the Supabase database:

```bash
# Apply migration to Supabase PostgreSQL pooler
# supabase/migrations/20261021_founder_temp_passwords_and_recovery.sql
```

This migration provisions:
- `must_change_password`, `temp_password_active`, `temp_password_expires_at` columns in `public.admin_profiles`.
- `public.auth_audit_logs` security table with Row Level Security.
- Indices on `auth_audit_logs(user_id)`, `auth_audit_logs(event_type)`, and `auth_audit_logs(created_at)`.

---

## 4. Temporary Credential Provisioning Procedure

For founder onboarding with forced password changes:
```bash
# Provision 24-hour temporary passwords for founders
$env:SUPABASE_SERVICE_ROLE_KEY="<SERVICE_KEY>"
node scripts/provision_temp_credentials.js
```

Each founder receives a private delivery slip and must log in at `/admin/login`, where the system immediately redirects or locks access until a permanent 10+ character password is configured at `/admin/update-password`.

---

## 5. Deployment Procedure

```bash
# 1. Run local test suite
python tests/e2e_verify.py

# 2. Build production assets cleanly
npm run build

# 3. Deploy preview using Netlify CLI
npx netlify deploy --build --site 8cb70aac-e601-4086-983a-e7fcb1b8cf79

# 4. Deploy to production (when approved)
npx netlify deploy --prod --build --site 8cb70aac-e601-4086-983a-e7fcb1b8cf79
```

---

## 6. Rollback & Failover Procedures

- **Netlify Instant Rollback**: In Netlify Dashboard &rarr; `Deploys`, any previous successful deploy can be published instantly in 1 click without rebuilding.
- **Database Snapshot**: Supabase provides automated daily backups and point-in-time recovery for the `dvhxcukgxgoptzprolfe` project.
- **Fail-Closed Architecture**: If Supabase becomes temporarily unreachable, public cached team profiles remain served via edge cache headers, while administrative mutations fail closed securely.

---

## 7. Vercel Migration Evaluation & Commercial Assessment

### 7.1. Commercial Licensing & Terms of Service Assessment
* **Legal Policy Constraint:** Primeora Solutions is a commercial business registered under the Ministry of MSME, Government of India (UDYAM-KR-03-0732181), offering digital systems engineering and management consulting.
* **Vercel Hobby Terms:** Section 2.1 of the [Vercel Terms of Service](https://vercel.com/legal/terms) explicitly states that the **Hobby Plan is restricted to personal, non-commercial use only**. Hosting a commercial consultancy on the Hobby plan violates Vercel Terms of Service and creates immediate risk of automated domain suspension or account takedown.
* **Required Vercel Plan:** **Vercel Pro** ($20 per team member / seat per month, billed annually at $240/user/yr or $24/user/mo billed monthly).
  * For 3 active founders with deployment/dashboard access: **$60 / month ($720 / year)**.
  * For 1 centralized deployment account: **$20 / month ($240 / year)**.

### 7.2. Platform Comparison Matrix

| Feature / Criteria | Netlify (Current Deployment) | Vercel Pro | Vercel Hobby (Prohibited) |
| :--- | :--- | :--- | :--- |
| **Commercial Use Permitted** | **Yes** (Free Starter & Pro tiers allow commercial use) | **Yes** | **NO** (Strictly prohibited by ToS Section 2.1) |
| **Monthly Cost** | **$0 / month** (within 100 GB bandwidth & 300 build mins) | **$20 – $60 / month** | $0 (Terms violation) |
| **Next.js 15 App Router Support** | Fully supported via `@netlify/plugin-nextjs` (OpenNext) | Native first-party support | Native first-party support |
| **Edge Network in India** | Mumbai & Chennai edge cache nodes | Mumbai edge cache nodes | Mumbai edge cache nodes |
| **Deployment Preview URLs** | Automatic branch previews + instant rollbacks | Automatic branch previews + instant rollbacks | Automatic branch previews |
| **Database Latency** | Direct HTTPS/WSS to Supabase (`ap-south-1` Mumbai) | Direct HTTPS/WSS to Supabase (`ap-south-1` Mumbai) | Direct HTTPS/WSS |
| **Build Time** | ~45 seconds on Netlify CI | ~35 seconds on Vercel CI | ~35 seconds |

### 7.3. Architectural Recommendation
1. **Immediate Recommendation:** Maintain current production deployment on **Netlify**. It delivers 100% compliant, zero-cost commercial hosting, robust Next.js 15 SSG/SSR execution, full environment secret isolation, and instant 1-click rollback capabilities.
2. **When to Migrate to Vercel Pro:** Consider migrating to Vercel Pro if Primeora requires advanced Next.js features such as Vercel Web Analytics with custom event funnels, Edge Middleware KV acceleration, or deeper GitHub team integration once monthly retainer revenue justifies the $240–$720/year overhead.

### 7.4. Turnkey Migration Blueprint (If Transitioning to Vercel Pro)

Should the leadership decide to migrate to Vercel Pro, execute the following steps:

```bash
# 1. Install official Vercel CLI
npm install -g vercel

# 2. Authenticate with Vercel account
vercel login

# 3. Link the repository to a new Vercel Project under a Pro team
vercel link

# 4. Import all environment variables to Vercel
vercel env add NEXT_PUBLIC_SITE_URL production
# (Enter https://primeora-solutions.vercel.app or custom domain)
vercel env add NEXT_PUBLIC_SITE_NAME production
vercel env add NEXT_PUBLIC_SUPABASE_URL production
vercel env add NEXT_PUBLIC_SUPABASE_ANON_KEY production
vercel env add SUPABASE_SERVICE_ROLE_KEY production
vercel env add ADMIN_JWT_SECRET production

# 5. Update Supabase Auth URL Configuration
# Add https://primeora-solutions.vercel.app/** to Redirect URLs allowlist

# 6. Deploy Preview & Production
vercel
vercel --prod
```
