# PRIMEORA SOLUTIONS — SECURITY POLICY & INCIDENTIAL RESPONSE GUIDE

This document establishes the security architecture, authentication policies, secret management, incident response workflows, and operational procedures for Primeora Solutions (`primeora-solutions.netlify.app`).

---

## 1. Security Architecture & Threat Model

### 1.1 Core Components
- **Hosting & Edge Delivery:** Netlify Edge network with automatic HTTPS, HTTP/2, DNS-level DDoS mitigation, and `@netlify/plugin-nextjs`.
- **Application Framework:** Next.js 15 App Router, TypeScript, React 19, Tailwind CSS.
- **Administrative Portal:** `/admin` and `/api/admin/*` protected by Next.js Edge Middleware (`src/middleware.ts`) and server-side HMAC-SHA256 token validation.
- **Backend Persistence:** Supabase PostgreSQL with Row Level Security (RLS) policies, PostgREST HTTPS API, and Supabase Storage for team media assets.
- **Public Ingestion:** Enquiry submission API (`/api/enquiry`) with multi-layered bot defenses, honeypots, execution timing analysis, payload bounds, and durable sliding-window rate limiting.

### 1.2 Authentication & Session Model
- **Token Signing:** Sessions are signed with HMAC-SHA256 using a minimum 32-character high-entropy secret (`ADMIN_JWT_SECRET`).
- **Cookie Security:** The administrative session cookie (`admin_session`) is strictly configured with:
  - `HttpOnly`: Inaccessible to client-side JavaScript, mitigating session theft via XSS.
  - `Secure`: Transmitted only over encrypted TLS (HTTPS).
  - `SameSite=Lax`: Mitigates Cross-Site Request Forgery (CSRF).
  - `Path=/`: Scoped across administrative pathways.
  - `Max-Age=28800`: 8-hour deterministic session lifecycle.
- **Edge Middleware Enforcement:**
  - Every unauthenticated request to `/admin/*` is intercepted at the Edge and immediately redirected (HTTP 307) to `/admin/login`.
  - Every unauthenticated request to `/api/admin/*` is intercepted at the Edge and returns HTTP 401 Unauthorized.
  - Cross-origin state-changing mutations (`POST`, `PUT`, `PATCH`, `DELETE`) are verified against allowed origins; untrusted origins receive HTTP 403 Forbidden.
  - Request body sizes are capped at 64KB for standard APIs and 5MB for portrait uploads; oversized payloads receive HTTP 413 Payload Too Large.

---

## 2. Environment Variables & Secret Separation

Secrets are strictly partitioned between server-only variables and public client bundles:

| Environment Variable | Scope | Description | Exposure Risk Mitigation |
| :--- | :--- | :--- | :--- |
| `ADMIN_JWT_SECRET` | Server-Only | High-entropy secret for HMAC-SHA256 session tokens | Never prefixed with `NEXT_PUBLIC_`. Excluded from client bundles. |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-Only | Privileged Supabase key for administrative server actions | Never committed or bundled. Used strictly in server route handlers. |
| `NEXT_PUBLIC_SUPABASE_URL` | Client & Server | Supabase project endpoint URL | Public domain identifier. Restricted by RLS and API schemas. |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Client & Server | Public anonymous key for client interactions | Subject to strict RLS policies. No direct table mutations permitted. |
| `NEXT_PUBLIC_SITE_URL` | Client & Server | Canonical site URL | Used for SEO metadata and OpenGraph. |
| `NEXT_PUBLIC_GA_MEASUREMENT_ID` | Client & Server | Google Analytics 4 Measurement ID | Public analytics tracking identifier. |

> [!IMPORTANT]
> PostgreSQL direct database connection strings (`postgresql://...`) must never be stored in application runtime code or client-side bundles. The application communicates exclusively with Supabase via PostgREST HTTPS endpoints.

---

## 3. Secret Rotation Procedures

### 3.1 Rotating `ADMIN_JWT_SECRET`
Rotating `ADMIN_JWT_SECRET` immediately invalidates all active administrative sessions across all devices:
1. Generate a new cryptographically random 256-bit key:
   ```bash
   node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
   ```
2. Update the environment variable in Netlify:
   - Navigate to **Netlify Dashboard** -> **Site configuration** -> **Environment variables** -> `ADMIN_JWT_SECRET`.
   - Update value and trigger a fresh deployment.
3. Update `.env.local` for local development.

### 3.2 Rotating Supabase Service Role Key
1. Navigate to **Supabase Dashboard** -> **Project Settings** -> **API**.
2. Generate a new `service_role` secret.
3. Update `SUPABASE_SERVICE_ROLE_KEY` in Netlify environment variables.
4. Redeploy the application.

### 3.3 Rotating PostgreSQL Database Password
1. Navigate to **Supabase Dashboard** -> **Project Settings** -> **Database**.
2. Click **Reset Database Password** and enter a secure high-entropy password.
3. Note: The web application uses Supabase HTTPS APIs and does not consume the direct TCP PostgreSQL connection string, ensuring zero downtime during database password rotation.

---

## 4. Founder Access Recovery & Abuse Mitigation

### 4.1 Founder Account Hierarchy
- Authorized founder accounts:
  - `primeorasolutions.in@gmail.com` (`super_admin`)
  - Additional authorized founding partners mapped in `INITIAL_FOUNDERS`
- Roles:
  - `super_admin`: Full privileges including team management, enquiry triage, and deletion.
  - `content_editor`: Restricted to publishing and editing content; cannot view customer enquiries or delete records.

### 4.2 Recovery Procedure
1. Request password recovery via `/admin/forgot-password`.
2. Supabase Auth issues a one-time OTP recovery code or signed magic link.
3. Verify OTP via `/admin/reset-password` (rate-limited to 5 attempts per 15 minutes to prevent brute-force attacks).
4. Supply a strong password conforming to complexity requirements (minimum 10 characters, uppercase, lowercase, numbers, symbols).
5. A fresh session is issued upon successful reset.

### 4.3 Brute-Force & Credential Stuffing Defenses
- **Sliding-Window IP Rate Limiting:** 5 failed login attempts per 15-minute rolling window per IP.
- **Account-Level Lockout Defense:** Account lockouts are temporary (15 minutes) and progressive; permanent account lockout is deliberately avoided to prevent anonymous attackers from denying service to legitimate founders.
- **User Enumeration Protection:** Generic failure messages (`Invalid administrative credentials.`) and identical neutral responses for recovery requests ensure attacker cannot confirm account existence.
- **Audit Logging:** All recovery attempts and login failures are logged to `auth_audit_logs` with SHA-256 hashed identifiers for privacy-conscious review.

---

## 5. Vulnerability Disclosure Policy

If you discover a security vulnerability in Primeora Solutions, please report it privately:
- **Email:** `primeorasolutions.in@gmail.com`
- **Response Target:** 24–48 hours for triage and acknowledgment.
- **Scope:** Web application code, administrative endpoints, authentication architecture, and data exposure.
- Please do not perform destructive actions, high-volume stress testing, or expose private client data.
