# RITKARA VEYRA — Strategy & Technology Consultancy

> **MAKE COMPLEXITY WORK.**  
> A premium, production-minded website, secure database-backed Team CMS, Digital Readiness Diagnostic, and technical SEO/AEO platform.

Ritkara Veyra is the working brand of **Primeora Solutions** (Udyam Registered MSME: `UDYAM-KR-03-0732181`, Bangalore, Karnataka).

---

## 1. Key Architectural Features

- **Next.js 15+ App Router**: High-performance static site generation (SSG) and server-side route handlers with TypeScript.
- **Architectural Design System**: Clean typography, bespoke brand tokens (`#183B35` Forest Green, `#0F827A` Muted Teal, `#F4EFE3` Warm Ivory, `#B77B4B` Muted Copper, `#24252B` Charcoal), and high WCAG AAA contrast (12.4:1).
- **Six Connected Service Pillars**:
  1. *Digital Presence* (Bespoke websites, e-commerce, digital identity, GBP setup)
  2. *Customer Acquisition* (Local SEO, Answer Engine Optimization, content workflows, scoped ads)
  3. *Lead & Sales System* (CRM pipelines, WhatsApp Business API triage, booking engines)
  4. *Operations & Automation* (Process automations, GST billing connections, inventory sync)
  5. *Analytics & Insights* (Executive BI dashboards, attribution tracking, KPI reporting)
  6. *Ongoing Management* (Security upkeep, dependency audits, continuous optimization)
- **Database-Backed Team CMS (`/admin/team`)**:
  - Add, edit, reorder, preview, and publish team profiles in real time without writing code.
  - Role-based access control (`super_admin` vs `content_editor`) with server-side validation.
  - Supabase PostgreSQL schema with Row Level Security (RLS) + built-in local persistent store fallback.
- **Accessible Project Enquiry Pipeline (`/api/enquiry`)**:
  - Client-side & server-side validation, input sanitization, honeypot bot trap, rate limiting, and duplicate submission prevention.
  - Inbound submissions review queue in `/admin`.
- **Interactive Digital Readiness Assessment (`/readiness`)**:
  - Native, non-sensitive operational self-assessment diagnosing business bottlenecks and suggesting tailored service priorities.
- **Technical SEO, GEO & AEO**:
  - Schema.org JSON-LD structured data (`Organization`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`).
  - Dynamic XML sitemap (`/sitemap.xml`) and search engine crawler instructions (`/robots.txt`).
- **Privacy-First Cookie Consent**:
  - Accessible banner with granular preferences (Essential vs Analytics), persistent `localStorage`, and footer trigger.
  - Google Analytics 4 integration gated by affirmative user consent.
- **DevOps & Netlify Ready**:
  - `netlify.toml` with strict security headers (CSP, X-Frame-Options, X-Content-Type-Options, Referrer-Policy) and preview `noindex` gates.

---

## 2. Getting Started (Local Development)

### Prerequisites
- Node.js v20+ or v24+
- npm v10+ or v11+

### Installation
```bash
# Clone the repository (if not already cloned)
git clone https://github.com/affanahmed2302-cmyk/primeora-website.git
cd primeora-website

# Install dependencies
npm install
```

### Environment Configuration
```bash
cp .env.example .env.local
```
*(See `docs/ENV_SETUP.md` for secret generation and variable specifications).*

### Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 3. Production Build & Verification

```bash
# Production compile & type-check
npm run build

# Start production server
npm run start

# Run end-to-end automated test harness (24 tests)
python scratch_test.py
```

---

## 4. Administrative Console & Team Management

- **Admin Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin`
- **Team Directory CMS**: `http://localhost:3000/admin/team`

**Security & Credential Provisioning**:
- Zero default passwords: In accordance with production security standards, all administrative access is strictly managed via Supabase Auth (invitation-only) or provisioned via secure server environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`).
- Privileged operations fail closed if authentication or durable database storage is unconfigured.
- See [`docs/ENV_SETUP.md`](./docs/ENV_SETUP.md) for full configuration instructions.

---

## 5. Comprehensive Documentation

Detailed specifications and compliance guides are maintained in the [`docs/`](./docs) directory:
- [`docs/TOOL_AUDIT.md`](./docs/TOOL_AUDIT.md) — Official tool documentation, license checks, and verification outcomes.
- [`docs/BUILD_PLAN.md`](./docs/BUILD_PLAN.md) — Phased architectural roadmap and audit findings.
- [`DESIGN.md`](./DESIGN.md) — Visual tokens, typography scale, spatial grid, motion, and accessibility rules.
- [`PRODUCT.md`](./PRODUCT.md) — Durable product specification, six pillars, packages, and methodology.
- [`docs/ENV_SETUP.md`](./docs/ENV_SETUP.md) — Environment variables, secrets policy, and setup guides.
- [`docs/TEST_REPORT.md`](./docs/TEST_REPORT.md) — Automated test results and evidence verification.
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Netlify deployment, plugins, and rollback procedures.
- [`docs/CONTENT_NEEDED.md`](./docs/CONTENT_NEEDED.md) — Catalog of verified assets vs items needed from the owner.
- [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md) — Production readiness gates and release checklist.

---

## 6. Legal & Enterprise Governance

Ritkara Veyra is a working brand of **Primeora Solutions** (Udyam Registered MSME: `UDYAM-KR-03-0732181`, NIC Code: 62011). All formal client proposals, master services agreements, and invoices are executed under Primeora Solutions.
