# Environment Setup & Secrets Management Guide — PRIMEORA SOLUTIONS

This document specifies the authoritative environment variables, security configuration procedures, and transactional email (SMTP) setup required for local development and Netlify production deployments.

---

## 1. Zero Plaintext Secrets Policy

- **No Secrets in Source Code:** Do not hardcode database connection strings, JWT signing secrets, service-role tokens, or passwords anywhere in the repository.
- **Git Protection:** `.gitignore` strictly protects `.env`, `.env.local`, `.env.production`, `.env.staging`, and temporary credential slips.
- **Framework Variable Scoping:** Any variable prefixed with `NEXT_PUBLIC_` is included in the client JavaScript bundle and is publicly visible in the browser. Only public endpoints (site URL, anon keys, GA measurement ID) may carry this prefix.
- **Server-Only Secrets:** Variables without `NEXT_PUBLIC_` (e.g. `ADMIN_JWT_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`) are accessible solely in Next.js Server Components, API Route Handlers, and serverless edge functions.

---

## 2. Environment Variables Specification

| Variable Name | Scope | Required? | Purpose & Description | Safe Format / Production Setting |
| :--- | :--- | :--- | :--- | :--- |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | **Yes** | Canonical base URL used for Open Graph, XML sitemap, and redirects. | `https://primeora-solutions.netlify.app` |
| `NEXT_PUBLIC_SITE_NAME` | Client & Server | **Yes** | Brand display name. | `PRIMEORA SOLUTIONS` |
| `NEXT_PUBLIC_SITE_TAGLINE` | Client & Server | **Yes** | Brand positioning tagline. | `ARCHITECTURE. INTEGRATION. SCALE.` |
| `ADMIN_JWT_SECRET` | Server-Only | **Yes** | 32+ character high-entropy key for HMAC-SHA256 signing of admin session cookies. | `openssl rand -base64 32` |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | **Yes** | Dedicated Supabase Project API URL. | `https://dvhxcukgxgoptzprolfe.supabase.co` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | **Yes** | Supabase Anonymous Client Key (governed by Row Level Security). | `eyJhbGciOi...` |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | **Yes** | Supabase Service Role Key for privileged server-side administrative actions. | `eyJhbGciOi...` |
| `ALLOW_LOCAL_STORAGE_FALLBACK` | Server-Only | Dev/Test | Fallback mode allowing in-memory/mock storage if Supabase is temporarily unreachable. | `false` (in production) |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client-Only | Optional | Google Analytics 4 Measurement ID (gated by user cookie consent). | `G-XXXXXXXXXX` |
| `ENQUIRY_NOTIFICATION_EMAIL` | Server-Only | Optional | Internal email recipient for new customer lead alerts. | `contact@primeorasolutions.com` |
| `DISCORD_LEAD_WEBHOOK_URL` | Server-Only | Optional | Discord or Slack webhook URL for real-time lead alerts. | `https://discord.com/api/webhooks/...` |

---

## 3. Production Transactional Email Setup (Supabase Custom SMTP)

By default, Supabase Auth utilizes a shared built-in email service with strict rate limits (30 emails/hour) suitable only for initial testing. For reliable production delivery of password recovery codes and onboarding invites from `@primeorasolutions.com`, a dedicated custom SMTP provider is required.

### 3.1 Recommended Providers & Settings

#### Option A: Resend (Recommended for Next.js / Developer Ecosystems)
1. Register a verified domain at [resend.com](https://resend.com) for `primeorasolutions.com`.
2. Generate an API Key with sending permissions.
3. In Supabase Dashboard: **Authentication > Email Settings > Custom SMTP**:
   - **Sender Email:** `auth@primeorasolutions.com` or `no-reply@primeorasolutions.com`
   - **Sender Name:** `Primeora Solutions Security`
   - **Host:** `smtp.resend.com`
   - **Port:** `465` (SSL) or `587` (TLS)
   - **Username:** `resend`
   - **Password:** `[Your Resend API Key: re_...]`

#### Option B: Amazon Simple Email Service (AWS SES) — Mumbai Region
1. Verify `primeorasolutions.com` in AWS SES console in the `ap-south-1` (Mumbai) region.
2. In Supabase Dashboard: **Authentication > Email Settings > Custom SMTP**:
   - **Sender Email:** `security@primeorasolutions.com`
   - **Host:** `email-smtp.ap-south-1.amazonaws.com`
   - **Port:** `587` (STARTTLS)
   - **Username:** `[AWS SES SMTP Username]`
   - **Password:** `[AWS SES SMTP Password]`

---

### 3.2 DNS Authentication Records (Mandatory for Inbox Deliverability)

Add the following DNS records with your domain registrar (e.g. Cloudflare, Namecheap, Google Domains) to prevent email spoofing, spam filtering, and guarantee delivery to Gmail / Google Workspace:

| Record Type | Name / Host | Target / Value | Purpose |
|---|---|---|---|
| **TXT** | `@` | `v=spf1 include:amazonses.com include:_spf.google.com ~all` | **SPF Record:** Authorizes SES and Google Workspace to send on behalf of the domain. |
| **CNAME** | `[token]._domainkey` | `[token].dkim.amazonses.com` | **DKIM Record:** Cryptographically signs email headers to prevent tampering. |
| **TXT** | `_dmarc` | `v=DMARC1; p=quarantine; pct=100; rua=mailto:dmarc@primeorasolutions.com` | **DMARC Policy:** Instructs receiving MTAs to quarantine unauthenticated messages. |

---

### 3.3 Supabase Auth Recovery Template Configuration

In **Supabase Dashboard > Authentication > Email Templates > Reset Password**:

- **Subject Line:** `Reset Your Primeora Solutions Administrator Password`
- **Body HTML:**
  ```html
  <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 540px; margin: 0 auto; padding: 32px 24px; color: #191817; background-color: #FBF9F5; border: 1px solid #E5DDD0; border-radius: 12px;">
    <div style="margin-bottom: 24px;">
      <h2 style="margin: 0; font-size: 20px; font-weight: 700; color: #191817;">Primeora Solutions</h2>
      <p style="margin: 4px 0 0 0; font-size: 11px; text-transform: uppercase; letter-spacing: 0.05em; color: #7C7469; font-family: monospace;">Administrative Security</p>
    </div>
    <p style="font-size: 14px; line-height: 1.6; color: #5A544E;">
      A password reset request was initiated for your administrator account. Use the one-time 8-digit verification code below to proceed:
    </p>
    <div style="background-color: #FFFFFF; border: 1px solid #DDD5C7; border-radius: 8px; padding: 16px; text-align: center; margin: 24px 0;">
      <span style="font-size: 28px; font-weight: 700; letter-spacing: 0.2em; font-family: monospace; color: #C25E38;">{{ .Token }}</span>
    </div>
    <p style="font-size: 12px; color: #7C7469; line-height: 1.5;">
      This code is valid for <strong>15 minutes</strong>. Enter this code on the recovery screen or click the direct recovery link below:
    </p>
    <p style="text-align: center; margin: 16px 0;">
      <a href="{{ .ConfirmationURL }}" style="display: inline-block; padding: 10px 20px; background-color: #C25E38; color: #FFFFFF; text-decoration: none; border-radius: 6px; font-weight: 600; font-size: 13px;">Reset Password Directly</a>
    </p>
    <p style="font-size: 11px; color: #7C7469; line-height: 1.4;">
      If you did not initiate this request, no action is required; your account remains secure.
    </p>
    <div style="margin-top: 32px; padding-top: 16px; border-top: 1px solid #E5DDD0; font-size: 10px; color: #A0988C; font-family: monospace;">
      Primeora Solutions &middot; Bangalore North, Karnataka 560023 &middot; UDYAM-KR-03-0732181
    </div>
  </div>
  ```

---

### 3.4 Supabase URL Configuration (Site URL & Redirect Allowlist)

Navigate to **Supabase Dashboard > Authentication > URL Configuration**:

- **Site URL:**
  `https://primeora-solutions.netlify.app`
- **Redirect URLs (Allowlist):**
  - `https://primeora-solutions.netlify.app/**`
  - `https://primeora-solutions.netlify.app/admin/reset-password`
  - `https://*.netlify.app/**`
  - `http://localhost:3000/**`
  - `http://localhost:3000/admin/reset-password`


---

## 4. Local Development Setup

1. Copy `.env.example` to create your local development file:
   ```bash
   cp .env.example .env.local
   ```
2. Populate required values:
   ```env
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   NEXT_PUBLIC_SITE_NAME=PRIMEORA SOLUTIONS
   NEXT_PUBLIC_SITE_TAGLINE=ARCHITECTURE. INTEGRATION. SCALE.
   ADMIN_JWT_SECRET=[paste newly generated 32-byte secret]
   NEXT_PUBLIC_SUPABASE_URL=https://dvhxcukgxgoptzprolfe.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=[your_anon_key]
   SUPABASE_SERVICE_ROLE_KEY=[your_service_role_key]
   ```
3. Install dependencies and start development server:
   ```bash
   npm install
   npm run dev
   ```

---

## 5. Netlify Production Configuration

To deploy to Netlify:
1. Navigate to Netlify Dashboard: **Site configuration > Environment variables**.
2. Add all server and public environment variables listed in Section 2.
3. Ensure `ADMIN_JWT_SECRET` is set to an independent 64-character hex secret for production.
4. Set `ALLOW_LOCAL_STORAGE_FALLBACK=false` to guarantee fail-closed security.
