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
