# Test Report — Primeora Solutions

## 1. Summary of Test Execution
- **Date & Timestamp**: 21 October 2026, 10:50 IST
- **Target Application**: Next.js 15+ App Router (`primeora-website`)
- **Environment**: Node.js v24.14.1, React 19, TypeScript 5.7.3, PostgreSQL (Supabase `ap-south-1` Mumbai)
- **Test Suite**: `tests/e2e_verify.py`
- **Total Test Cases**: 59
- **Passed**: 59
- **Failed**: 0
- **Pass Rate**: 100.0%

---

## 2. Test Execution Details

### 2.1 Public Routing & HTTP 200 Verification
| Route | Name / Description | HTTP Status | Result |
| :--- | :--- | :--- | :--- |
| `/` | Homepage with Hero Canvas & Motion | 200 OK | PASS |
| `/services` | Six Service Pillars Overview | 200 OK | PASS |
| `/services/digital-presence` | Digital Presence Pillar Detail | 200 OK | PASS |
| `/services/customer-acquisition` | Customer Acquisition Pillar Detail | 200 OK | PASS |
| `/services/lead-sales-systems` | Lead & Sales Systems Pillar Detail | 200 OK | PASS |
| `/services/operations-automation` | Operations & Automation Pillar Detail | 200 OK | PASS |
| `/services/analytics-insights` | Analytics & Insights Pillar Detail | 200 OK | PASS |
| `/services/ongoing-management` | Ongoing Management Pillar Detail | 200 OK | PASS |
| `/about` | Firm & Team Leadership | 200 OK | PASS |
| `/team` | Dedicated Leadership Directory | 200 OK | PASS |
| `/process` | Strategic Methodology | 200 OK | PASS |
| `/work` | System Architecture Demonstrations | 200 OK | PASS |
| `/readiness` | Digital Readiness Diagnostic Mini-App | 200 OK | PASS |
| `/insights` | Knowledgebase & AEO Guidance | 200 OK | PASS |
| `/contact` | Project Consultation & Enquiry Form | 200 OK | PASS |
| `/privacy` | DPDP Act 2023 & Statutory Privacy Notice | 200 OK | PASS |
| `/terms` | Entity Governance & Contractual Terms | 200 OK | PASS |
| `/cookie-preferences` | Cookie Preferences Management Portal | 200 OK | PASS |
| `/admin/update-password` | Founder Secure Password Setup | 200 OK | PASS |
| `/admin/forgot-password` | Self-Service Password Recovery Portal | 200 OK | PASS |
| `/admin/reset-password` | Verified Credential Reset Screen | 200 OK | PASS |
| `/sitemap.xml` | Search Engine XML Sitemap | 200 OK | PASS |
| `/robots.txt` | Crawler Directives | 200 OK | PASS |

### 2.2 Brand & Founder Headshots
- `GET /brand/primeora-logo-dark.png` &rarr; 200 OK (PASS)
- `GET /brand/primeora-emblem.png` &rarr; 200 OK (PASS)
- `GET /brand/primeora-app-icon.png` &rarr; 200 OK (PASS)
- `GET /team/dhananjaya-gr.jpg` &rarr; 200 OK (55.3 KB, 512x512) (PASS)
- `GET /team/akarsh-thodaskar.jpg` &rarr; 200 OK (54.0 KB, 512x512) (PASS)
- `GET /team/affan-ahmed-shariff.jpg` &rarr; 200 OK (12.8 KB, 512x512) (PASS)
- **Homepage Brand Integrity**: Verified pure Primeora Solutions branding, zero Ritkara mentions, authentic emblem mark loaded.

### 2.3 CMS & Database Verification (`/api/team`)
- **Published Members Returned**: Exactly 3 co-founders.
- **Draft & Inactive Gating**: Unauthenticated public visitors receive only published profiles.
- **Profiles Verified**:
  1. Affan Ahmed Shariff — Founder, Business Development
  2. Akarsh P. Thodaskar — Founder, Technology & Development
  3. Dhananjaya G.R. — Founder, Business Strategy & Systems

### 2.4 Security & Unauthenticated Guards
- `GET /api/admin/session` &rarr; HTTP 401 Unauthorized (PASS)
- `GET /api/admin/enquiries` &rarr; HTTP 401 Unauthorized (PASS)
- `GET /api/admin/team` &rarr; HTTP 401 Unauthorized (PASS)
- `POST /api/admin/team` &rarr; HTTP 401 Unauthorized (PASS)
- `DELETE /api/admin/team?id=fake_id` &rarr; HTTP 401 Unauthorized (PASS)
- `Tampered Session Signature` &rarr; HTTP 401 Unauthorized (PASS)

### 2.5 Enquiry Pipeline Hardening
- **Empty Payload Rejection**: HTTP 400 Bad Request (PASS)
- **Honeypot Trap**: Silently discards bot submission without saving (PASS)
- **Sub-Second Timing**: Rejects submissions completed in < 1.5 seconds (PASS)
- **Oversized Payload (>32KB)**: Rejects payload with HTTP 413 (PASS)
- **Valid Submission**: Generates persistent UUID in Supabase PostgreSQL (PASS)
- **Deduplication Window**: Rejects identical duplicate submissions within 10 minutes (PASS)

### 2.6 Role-Based Access Control (RBAC) & Forced Password Change
- **Content Editor Session**: Authenticates successfully with role `content_editor` (PASS)
- **Editor Enquiry Access**: Denied with HTTP 403 Forbidden (PASS)
- **Super Admin Enquiry Access**: Permitted to retrieve private leads (PASS)
- **Editor Member Deletion**: Denied with HTTP 403 Forbidden (PASS)
- **Editor Member Creation & Update**: Permitted for published content workflows (PASS)
- **Super Admin Member Deletion**: Permitted (PASS)
- **Temporary Password Lockout (Enquiries API)**: Denied with HTTP 403 Forbidden (`mustChangePassword: true`) (PASS)
- **Temporary Password Lockout (Team API)**: Denied with HTTP 403 Forbidden (`mustChangePassword: true`) (PASS)

### 2.7 Forgot Password & Recovery API Security
- **Empty Forgot Password Payload**: HTTP 400 Bad Request (PASS)
- **User Enumeration Defense**: Unregistered email returns HTTP 200 with neutral message (PASS)
- **Empty Verify OTP Payload**: HTTP 400 Bad Request (PASS)
- **Missing Token on Reset Password**: HTTP 401 Unauthorized (PASS)
- **Rate-Limiting**: Max 3 recovery requests per 15 minutes, 5-attempt lockout on OTP verification (PASS)

### 2.8 DevOps Security & Technical SEO
- `X-Frame-Options: DENY` (Clickjacking defense) (PASS)
- `X-Content-Type-Options: nosniff` (MIME sniffing defense) (PASS)
- `Referrer-Policy: strict-origin-when-cross-origin` (PASS)
- `robots.txt`: Directs search engine crawlers while disallowing `/admin/` and `/api/` (PASS)
