# Environment Setup & Secret Management Guide — RITKARA VEYRA

This document specifies the environment variables, configuration procedures, and strict secret-handling standards for both local development and Netlify production deployments.

---

## 1. Zero Secrets in Version Control Policy

- **No Secrets in Source Code**: Do not hardcode database connection strings, JWT signing keys, service-role tokens, or credentials anywhere in the repository.
- **Git Protection**: `.gitignore` strictly protects `.env`, `.env.local`, `.env.production`, and `.env.staging`.
- **Framework Variable Prefixes**: Any variable prefixed with `NEXT_PUBLIC_` is baked into the client JavaScript bundle and is publicly visible in the browser. Only public endpoints (e.g. site URL, anon keys, GA measurement ID) may carry this prefix.
- **Server-Only Secrets**: Variables without `NEXT_PUBLIC_` (e.g. `ADMIN_JWT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`) are accessible solely in Next.js Server Components, API Route Handlers, and serverless edge functions.

---

## 2. Environment Variables Specification

| Variable Name | Environment | Required? | Purpose & Description | Safe Example / Format |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Public | Yes | Canonical base URL used for Open Graph, XML sitemap, and redirects. | `http://localhost:3000` (dev) / `https://ritkaraveyra.netlify.app` (preview) |
| `NEXT_PUBLIC_SITE_NAME` | Public | Yes | Brand display name. | `RITKARA VEYRA` |
| `NEXT_PUBLIC_SITE_TAGLINE` | Public | Yes | Working brand tagline. | `MAKE COMPLEXITY WORK.` |
| `ADMIN_JWT_SECRET` | Server-only | Yes | 32+ character high-entropy key for HMAC-SHA256 signing of admin session cookies. | `openssl rand -base64 32` |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Public | Optional | Google Analytics 4 Measurement ID. Gated by user cookie consent. | `G-XXXXXXXXXX` |
| `NEXT_PUBLIC_SUPABASE_URL` | Public | Optional | Supabase Project URL if connecting cloud database. | `https://xyzproject.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Public | Optional | Supabase Anonymous Client Key (governed by Row Level Security). | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-only | Optional | Supabase Service Role Key for privileged server-side administrative queries. | `eyJhbGciOi...` |
| `ENQUIRY_NOTIFICATION_EMAIL` | Server-only | Optional | Target email to receive instant alerts when a lead submits the form. | `hello@primeorasolutions.com` |
| `DISCORD_LEAD_WEBHOOK_URL` | Server-only | Optional | Instant notification webhook for inbound project enquiries. | `https://discord.com/api/webhooks/...` |

---

## 3. Local Development Setup

1. Copy `.env.example` to create your local environment file:
   ```bash
   cp .env.example .env.local
   ```
2. Generate a secure random string for `ADMIN_JWT_SECRET`:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
3. Set your `ADMIN_JWT_SECRET` in `.env.local`.
4. Initial Admin Credentials (local testing default):
   - Email: `admin@primeorasolutions.com`
   - Initial Password: `ChangeMeInProd2026!`
   *(You can create additional administrator accounts or change credentials via the admin console)*.

---

## 4. Netlify Production Configuration

To configure environment variables on Netlify:
1. Log in to your Netlify Dashboard at https://app.netlify.com.
2. Select the site `ritkara-veyra` (or current linked site).
3. Navigate to **Site configuration > Environment variables**.
4. Add the following variables:
   - `NEXT_PUBLIC_SITE_URL`: `https://<your-custom-domain-or-subdomain>.netlify.app`
   - `ADMIN_JWT_SECRET`: `[paste a newly generated 64-character hex key]`
   - `NEXT_PUBLIC_GA_MEASUREMENT_ID`: `[optional: provide once GA4 property is created]`
   - `SUPABASE_SERVICE_ROLE_KEY`: `[optional: provide once Supabase project is created]`
5. Set scope to **All scopes** or separate **Production** from **Deploy Previews**.
6. Trigger a new deployment to apply the environment changes.
