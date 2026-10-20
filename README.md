# PRIMEORA SOLUTIONS — Digital Systems Engineering & Technology Consultancy

> **Digital Systems Engineered for Measurable Growth**  
> A premium, production-minded website, secure database-backed Team CMS, Digital Readiness Diagnostic, and technical SEO/AEO platform.

Primeora Solutions (Udyam Registered MSME: `UDYAM-KR-03-0732181`, Bangalore, Karnataka, India).

---

## 1. Key Architectural Features

- **Next.js 15+ App Router**: High-performance static site generation (SSG) and server-side route handlers with TypeScript and React 19.
- **Deep Tech Design System**: Authentic Primeora brand identity featuring obsidian background (`#07090F`), electric azure (`#3D6EF5` / `#4D7CFF`), vibrant violet (`#7C5CFF`), and high WCAG AAA contrast (17.8:1).
- **Motion Engineering Stack**:
  - `lenis`: High-performance smooth scrolling synchronized with GSAP ScrollTrigger.
  - `HeroCanvas`: Custom 60fps WebGL particle constellation engine with interactive pointer acceleration and reduced-motion fallback.
  - `@gsap/react` `useGSAP`: Staggered timeline sequencing for hero entrance and process steps.
  - React Bits `DecryptedText`: Character decryption reveal animation for key brand headings.
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
  - Pre-seeded with confirmed founding partners: **Affan Ahmed Shariff**, **Akarsh P. Thodaskar**, and **Dhananjaya G.R.**
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
# Clone the repository
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

# Run end-to-end automated test harness
python tests/e2e_verify.py
```

---

## 4. Administrative Console & Team Management

- **Admin Login**: `http://localhost:3000/admin/login`
- **Dashboard**: `http://localhost:3000/admin`
- **Team Directory CMS**: `http://localhost:3000/admin/team`

**Security & Credential Provisioning**:
- Zero default passwords: All administrative access is strictly managed via Supabase Auth (invitation-only) or provisioned via secure server environment variables (`ADMIN_EMAIL`, `ADMIN_PASSWORD_HASH`, `ADMIN_PASSWORD_SALT`).
- Privileged operations fail closed if authentication or durable database storage is unconfigured.
- See [`docs/ENV_SETUP.md`](./docs/ENV_SETUP.md) for full configuration instructions.

---

## 5. Comprehensive Documentation

Detailed specifications and compliance guides are maintained in the [`docs/`](./docs) directory:
- [`DESIGN.md`](./DESIGN.md) — Visual tokens, typography scale, spatial grid, motion, and accessibility rules.
- [`PRODUCT.md`](./PRODUCT.md) — Durable product specification, six pillars, packages, and methodology.
- [`docs/VISUAL_AUDIT.md`](./docs/VISUAL_AUDIT.md) — Visual audit and brand correction baseline.
- [`docs/MOTION_SPEC.md`](./docs/MOTION_SPEC.md) — Motion engineering architecture (Lenis, React Bits, GSAP, Canvas).
- [`docs/IMPLEMENTATION_MAP.md`](./docs/IMPLEMENTATION_MAP.md) — Implementation mapping across all components and routes.
- [`docs/TOOL_AUDIT.md`](./docs/TOOL_AUDIT.md) — Official tool documentation, license checks, and verification outcomes.
- [`docs/ENV_SETUP.md`](./docs/ENV_SETUP.md) — Environment variables, secrets policy, and setup guides.
- [`docs/TEST_REPORT.md`](./docs/TEST_REPORT.md) — Automated test results and evidence verification.
- [`docs/DEPLOYMENT.md`](./docs/DEPLOYMENT.md) — Netlify deployment, plugins, and rollback procedures.
- [`docs/CONTENT_NEEDED.md`](./docs/CONTENT_NEEDED.md) — Catalog of verified assets vs items needed from the owner.
- [`docs/LAUNCH_CHECKLIST.md`](./docs/LAUNCH_CHECKLIST.md) — Production readiness gates and release checklist.

---

## 6. Legal & Enterprise Governance

**Primeora Solutions** is a registered Micro Enterprise (Udyam Registration Number: `UDYAM-KR-03-0732181`, NIC Code: 62011) located in Bangalore, Karnataka, India. All formal client proposals, master services agreements, and invoices are executed under Primeora Solutions.
