# Deployment Guide — Primeora Solutions

## 1. Hosting Architecture Overview
- **Platform**: Netlify (Serverless Functions + Edge CDN)
- **Framework**: Next.js 15+ App Router (`@netlify/plugin-nextjs`)
- **Site Name / ID**: `primeora-solutions` (`8cb70aac-e601-4086-983a-e7fcb1b8cf79`)
- **Primary Preview URL**: `https://primeora-solutions.netlify.app`
- **Database Backend**: Supabase PostgreSQL (`dvhxcukgxgoptzprolfe`, Region: `ap-south-1` Mumbai)

---

## 2. Environment Variables Configuration

Configure the following variables in the Netlify Site Settings (`Site configuration > Environment variables`):

| Variable Name | Required | Description | Example / Notes |
| :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Yes | Canonical site URL | `https://primeorasolutions.com` or preview URL |
| `NEXT_PUBLIC_SITE_NAME` | Yes | Site brand title | `PRIMEORA SOLUTIONS` |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes | Supabase endpoint URL | `https://dvhxcukgxgoptzprolfe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes | Public Supabase anon key | Client-safe API key |
| `SUPABASE_SERVICE_ROLE_KEY` | Yes | Elevated service role key | Elevated server-only key for API route mutations |
| `ADMIN_JWT_SECRET` | Yes | 32+ char secret for HMAC session signing | Generate with `crypto.randomBytes(32)` |
| `ADMIN_EMAIL` | Optional | Admin fallback login email | e.g. `affan@primeorasolutions.com` |
| `ADMIN_PASSWORD_HASH` | Optional | PBKDF2 sha512 hash | Generated via `docs/ENV_SETUP.md` |
| `ADMIN_PASSWORD_SALT` | Optional | 16-byte random hex salt | Generated via `docs/ENV_SETUP.md` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Optional | Google Analytics 4 ID | e.g. `G-XXXXXXXXXX` |
| `SLACK_LEAD_WEBHOOK_URL` | Optional | Slack webhook for enquiries | Incoming webhook URL |

---

## 3. Deployment Procedure

```bash
# 1. Ensure working directory is clean and tests pass
python tests/e2e_verify.py

# 2. Build production assets
npm run build

# 3. Deploy preview using Netlify CLI
npx netlify deploy --build --auth <NETLIFY_TOKEN> --site 8cb70aac-e601-4086-983a-e7fcb1b8cf79

# 4. Deploy to production (when ready)
npx netlify deploy --prod --build --auth <NETLIFY_TOKEN> --site 8cb70aac-e601-4086-983a-e7fcb1b8cf79
```

---

## 4. Rollback & Failover Procedures

- **Netlify Instant Rollback**:
  In Netlify Dashboard &rarr; `Deploys`, any previous successful deploy can be published instantly in 1 click without rebuilding.
- **Database Snapshot**:
  Supabase provides automated daily backups and point-in-time recovery for the `dvhxcukgxgoptzprolfe` project.
- **Fail-Closed Architecture**:
  If Supabase becomes temporarily unreachable, public cached team profiles remain served via edge cache headers, while administrative mutations fail closed securely.
