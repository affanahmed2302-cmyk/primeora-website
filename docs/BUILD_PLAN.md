# Phased Build Plan — RITKARA VEYRA
**Date**: 20 October 2026  
**Status**: In Implementation  
**Working Branch**: `feat/ritkara-veyra-transformation`

---

## 1. Initial Audit Findings

### 1.1 Current Repository Status
- **Git Remote**: `https://github.com/affanahmed2302-cmyk/primeora-website.git`
- **Current Branch**: `main` (now branched to `feat/ritkara-veyra-transformation`).
- **Existing Files**: Only 3 files existed in the root:
  - `README.md` (92 bytes, minimal headline)
  - `script.js` (1.5 KB, basic mobile menu toggle and IntersectionObserver)
  - `styles.css` (11.8 KB, legacy dark-blue CSS)
- **Framework**: None. No `package.json`, no routing, no TypeScript, no build step.
- **Original Files Preserved**: Moved to `legacy/` (`README_original.md`, `script_original.js`, `styles_original.css`) to maintain complete audit history.

### 1.2 Live Website Review (`https://primeora-website-primeora.vercel.app/`)
- A single static HTML page with dark navy/blue aesthetics, heavy generic gradients, and floating cards.
- Contains unsubstantiated claims flagged in the master brief: "Founded by IITians", "80+ brands", "50+ businesses generating Rs 2L+ extra revenue every month", "Ready to grow 2x–5x?".
- Navigation points to in-page hash anchors; no dedicated service pages or deep routing.
- No enquiry form; CTA buttons link directly to an Instagram profile (`@primeorasolutions`) or a `mailto:` link.
- No admin panel or editable team management.
- Missing structured data (JSON-LD), no canonical URLs, no sitemap, no cookie consent.

### 1.3 Verified Business Assets & Documents
- **Master Logo**: `Ritkara Veyra primary logo.png` (2000x2000 PNG, 3-part architectural geometric emblem + wordmark).
  - Clean cropped assets generated: `public/brand/ritkara-veyra-logo.png`, `public/brand/ritkara-veyra-cropped.png`, `public/brand/emblem.png`, and `public/brand/emblem-transparent.png`.
- **Udyam Certificate**: `Print _ Udyam Registration Certificate.pdf` decoded:
  - Enterprise Name: `PRIMEORA SOLUTIONS`
  - Registration Number: `UDYAM-KR-03-0732181`
  - Classification: Micro enterprise (NIC 62011: Computer programming, software, systems).
  - Location: Bangalore, Karnataka (PIN 560023).
- **Working Brand**: `RITKARA VEYRA`. Tagline: `MAKE COMPLEXITY WORK.`
- **Founders & Confirmed Roles**:
  - Affan Ahmed Shariff — Founder, Business Development
  - Akarsh P. Thodaskar — Founder, Technology & Development
  - Dhananjaya G.R. — Founder, Business Strategy & Systems

---

## 2. Technical Stack Decision

To satisfy the requirements of rich SEO, multi-page routing, server-side form validation, role-based admin CMS, and Netlify deployment, we adopt **Next.js 15+ (App Router) with TypeScript and Tailwind CSS**:

- **Framework**: Next.js 15+ (App Router, Server Components + Client Components where interactivity is needed).
- **Language**: TypeScript (strict mode).
- **Styling**: Tailwind CSS v3/v4 configured with the approved provisional design tokens.
- **Animation**: GSAP + `@gsap/react` with strict `prefers-reduced-motion` compliance; selective React Bits components.
- **Icons**: Lucide React.
- **Admin CMS**: Protected `/admin` routes with session verification, CSRF protection, and support for Supabase Auth/RLS alongside an immediate local persistent fallback.
- **Deployment**: Netlify via `netlify.toml` with strict security headers, redirects, and environment variable configuration.

---

## 3. Phased Implementation Roadmap

- [x] **Phase 1: Repository Inspection & Branch Isolation**
  - Inspected existing files, preserved originals into `legacy/`, created branch `feat/ritkara-veyra-transformation`.
- [x] **Phase 2: Official Tool Research & Verification**
  - Audited and installed Gravitas Core and Impeccable skills; compiled `docs/TOOL_AUDIT.md`.
- [ ] **Phase 3: Scaffold Next.js Application & Dependencies**
  - Initialize `package.json`, TypeScript, Tailwind CSS, GSAP, Lucide, and build configuration.
- [ ] **Phase 4: Brand Configuration, Design Tokens, & Global Theme**
  - Create `src/config/brand.ts` with central brand switches, provisional colors (`#183B35`, `#0F827A`, `#F4EFE3`, `#B77B4B`, `#24252B`), and legal disclosures.
  - Create `PRODUCT.md` and `DESIGN.md`.
- [ ] **Phase 5: Public Pages & 6 Service Pillars**
  - Home (`/`) with editorial hero, 6 service pillars, 4-step process, founder cards, FAQ, and enquiry CTA.
  - Services Overview (`/services`) and dedicated pillar pages / deep sections:
    - Digital Presence
    - Customer Acquisition
    - Lead & Sales System
    - Operations & Automation
    - Analytics & Insights
    - Ongoing Management
  - About (`/about`), Process (`/process`), Work (`/work` with transparent demo tag), Insights (`/insights`), Contact (`/contact`).
  - Legal Pages: Privacy Policy (`/privacy`), Terms & Conditions (`/terms`), Cookie Preferences (`/cookie-preferences`).
  - Custom 404 (`/not-found`).
- [ ] **Phase 6: Founders & Editable Team Directory CMS**
  - Admin login (`/admin/login`), Dashboard (`/admin`), Team management (`/admin/team`).
  - Add/edit profiles, bio, title, department, responsibilities, photo upload, LinkedIn/portfolio URLs, reordering, draft/published status.
  - Server-side role checks (`super_admin` vs `content_editor`).
  - Supabase SQL schema + local persistent storage adapter.
- [ ] **Phase 7: Project Enquiry Workflow & Lead Handling**
  - Accessible form with field validation, sanitization, honeypot spam protection, rate limiting, and admin notification / review queue.
- [ ] **Phase 8: Digital Readiness Assessment Mini-App**
  - Native, accessible questionnaire matching business needs to service pillars with 0 external tracking.
- [ ] **Phase 9: Cookie Consent & Analytics**
  - Granular banner (Accept, Reject, Preferences), persistent localStorage, footer trigger, Google Analytics 4 stub.
- [ ] **Phase 10: Technical SEO, AEO, & Structured Data**
  - JSON-LD schemas (`Organization`, `WebSite`, `Service`, `FAQPage`, `BreadcrumbList`), Open Graph, dynamic sitemap (`sitemap.ts`), `robots.ts` (staging noindex).
- [ ] **Phase 11: Security, Netlify Configuration, & Build Verification**
  - `netlify.toml`, security headers (CSP, HSTS, frame guard), `.env.example`, type checks, linting, production build test.
- [ ] **Phase 12: Handover Documentation & Reviewable Netlify Preview**
  - Complete `docs/ENV_SETUP.md`, `docs/CONTENT_NEEDED.md`, `docs/TEST_REPORT.md`, `docs/DEPLOYMENT.md`, `docs/LAUNCH_CHECKLIST.md`, and update `README.md`.
