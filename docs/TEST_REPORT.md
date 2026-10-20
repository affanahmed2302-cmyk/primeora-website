# Test Report — Primeora Solutions

## 1. Summary of Test Execution
- **Date & Timestamp**: 20 October 2026, 22:46 IST
- **Target Application**: Next.js 15+ App Router (`primeora-website`)
- **Environment**: Node.js v24.14.1, React 19, TypeScript 5.7.3, PostgreSQL (Supabase Mumbai)
- **Suite**: `tests/e2e_verify.py`
- **Total Test Cases**: 34
- **Passed**: 34
- **Failed**: 0
- **Pass Rate**: 100.0%

---

## 2. Test Execution Details

### 2.1 Public Routing & HTTP 200 Verification
| Route | Name / Description | HTTP Status | Result |
| :--- | :--- | :--- | :--- |
| `/` | Homepage with HeroCanvas & React Bits | 200 OK | PASS |
| `/services` | Six Service Pillars Overview | 200 OK | PASS |
| `/about` | Firm & Leadership Team | 200 OK | PASS |
| `/process` | Four-Step Engineering Methodology | 200 OK | PASS |
| `/work` | System Architecture Demonstrations | 200 OK | PASS |
| `/readiness` | Digital Readiness Diagnostic Mini-App | 200 OK | PASS |
| `/insights` | Knowledgebase & AEO Guidance | 200 OK | PASS |
| `/contact` | Project Consultation & Enquiry Form | 200 OK | PASS |
| `/privacy` | Privacy Policy & Data Protection | 200 OK | PASS |
| `/terms` | Entity Governance & Terms of Use | 200 OK | PASS |
| `/cookie-preferences` | Cookie Preferences Management | 200 OK | PASS |
| `/sitemap.xml` | Search Engine XML Sitemap | 200 OK | PASS |
| `/robots.txt` | Crawler Directives | 200 OK | PASS |

### 2.2 CMS & Database Verification (`/api/team`)
- **Published Members Returned**: Exactly 3 members.
- **Draft & Inactive Gating**: Unauthenticated public visitors receive only published team profiles; draft or inactive members are omitted.
- **Profiles Verified**:
  1. Affan Ahmed Shariff — Founder, Business Development (`https://www.linkedin.com/in/affan-ahmed-shariff`, `https://affanahmed2302-cmyk.github.io/`)
  2. Akarsh P. Thodaskar — Founder, Technology & Development (`https://www.linkedin.com/in/akarsh-p-6963b5397?utm_source=share_via&utm_content=profile&utm_medium=member_android`)
  3. Dhananjaya G.R. — Founder, Business Strategy & Systems (`https://www.linkedin.com/in/dhananjaya-gr`)

### 2.3 Security & Unauthenticated Guards
- `GET /api/admin/session` &rarr; HTTP 401 Unauthorized (PASS)
- `GET /api/admin/enquiries` &rarr; HTTP 401 Unauthorized (PASS)
- `GET /api/admin/team` &rarr; HTTP 401 Unauthorized (PASS)
- `POST /api/admin/team` &rarr; HTTP 401 Unauthorized (PASS)
- `DELETE /api/admin/team?id=fake_id` &rarr; HTTP 401 Unauthorized (PASS)
- `Tampered Session Signature` &rarr; HTTP 401 Unauthorized (PASS)

### 2.4 Enquiry Pipeline Hardening
- **Empty Payload Rejection**: HTTP 400 Bad Request (PASS)
- **Honeypot Trap**: Silently discards bot submission without logging to database (PASS)
- **Sub-Second Timing**: Rejects submissions completed in < 1.5 seconds as automated spam (PASS)
- **Oversized Payload (>32KB)**: Rejects payload with HTTP 413 Payload Too Large (PASS)
- **Valid Submission**: Generates unique persistent ID and stores enquiry (PASS)
- **Deduplication Window**: Rejects identical duplicate submissions within a 10-minute sliding window (PASS)

### 2.5 Role-Based Access Control (RBAC)
- **Content Editor Session**: Authenticates successfully with role `content_editor`.
- **Editor Enquiry Access**: Denied with HTTP 403 Forbidden (restricted to `super_admin`).
- **Super Admin Enquiry Access**: Successfully retrieves private enquiry log.
- **Editor Member Deletion**: Denied with HTTP 403 Forbidden.
- **Editor Member Creation & Update**: Permitted for published content workflows.
- **Super Admin Member Deletion**: Successfully executes deletion.

### 2.6 Headers & Technical SEO
- `X-Frame-Options: DENY` (Clickjacking defense) (PASS)
- `X-Content-Type-Options: nosniff` (MIME sniffing defense) (PASS)
- `Referrer-Policy: strict-origin-when-cross-origin` (PASS)
- `robots.txt`: Directs search engine crawlers while strictly disallowing `/admin/` and `/api/` (PASS)
