# Implementation Map — Primeora Solutions

## 1. Brand & Architecture Mapping

| Layer / Domain | Location | Technology & Status | Description |
| :--- | :--- | :--- | :--- |
| **Brand Config** | `src/config/brand.ts` | TypeScript Config | Central brand definitions: name "PRIMEORA SOLUTIONS", MSME registration `UDYAM-KR-03-0732181`, contact email `primeorasolutions.in@gmail.com`, 6 pillars, 4 steps, 3 tiers. |
| **Authentic Logo & Emblem** | `src/components/brand/PrimeoraLogo.tsx`<br>`public/brand/primeora-emblem.png`<br>`public/brand/primeora-logo-dark.png`<br>`public/brand/primeora-logo-light.png` | Authentic Brand Assets | Faceted geometric "P" mark (`#1065FF`) and dual-mode horizontal wordmarks. Pure CSS switching (`block dark:hidden` vs `hidden dark:block`) eliminating hydration flicker. |
| **Theme & Tokens** | `tailwind.config.ts`<br>`src/app/globals.css`<br>`src/components/ThemeToggle.tsx` | Tailwind CSS 3 (Day/Night) | Warm Ivory Canvas (`#FBF9F5` / `#121110`), Deep Charcoal Ink (`#191817` / `#F5F2EB`), Burnt Terracotta Copper (`#C25E38` / `#E07A5F`), Soft Borders (`#E5DDD0` / `#2C2926`). Day Mode default for new users with anti-FOUC `<head>` script. |
| **Kinetic Architecture Matrix** | `src/components/motion/SystemSchematicHero.tsx` | React + SVG + CSS 3D | Procedural 3-layer architecture matrix (Intake, Conversion, Intelligence) with subtle 3D perspective mouse tilt, live status telemetry, and reduced-motion fallback. |
| **Smooth Scrolling** | `src/components/motion/SmoothScrollProvider.tsx` | Lenis v1.3.27 | Client layout provider ensuring 60fps smooth scrolling with reduced-motion bypass. |
| **Typography Reveal** | `src/components/react-bits/DecryptedText.tsx` | React Bits (Official) | Client-side progressive character decrypting animation on the hero studio category badge. |
| **Navigation & Header** | `src/components/Navbar.tsx`<br>`src/components/Footer.tsx` | Next.js Client Components | Sticky glassmorphic navbar with active route indicators, theme toggle, responsive mobile drawer, and high-contrast "Discuss a Project" CTA. |
| **Founding Partners** | `src/components/FoundersSection.tsx`<br>`src/app/team/page.tsx`<br>`public/team/affan-ahmed-shariff.jpg` | Next.js + Real Photography | Affan Ahmed Shariff displayed with verified photograph; Akarsh P. Thodaskar and Dhananjaya G.R. with custom monogram crests, LinkedIn profiles, and "Portrait pending submission" badges—strictly NO AI faces. |
| **Enquiry Operations Inbox** | `src/app/admin/enquiries/page.tsx`<br>`src/app/api/admin/enquiries/route.ts`<br>`src/app/api/admin/enquiries/retry-notification/route.ts` | Next.js + Supabase SQL | Complete triage portal with status filters (`new`, `in_progress`, `contacted`, `qualified`, `won`, `closed`, `archived`), full-text search, detail drawer, internal notes editor, and notification retry dispatcher. |
| **Transactional Notifications** | `src/lib/notifications.ts`<br>`src/app/api/enquiry/route.ts` | Resend / SMTP / Webhook | Background notification dispatcher with HTML/plaintext emails, error capture, and Supabase retry status tracking. |
| **Public Homepage** | `src/app/page.tsx` | Next.js 15 App Router | Concise 9-section landing page: Hero with Schematic, "Discuss a Project" CTA, 6 Pillars Grid, 4-Step Process Overview, 3 Founders Showcase, Illustrative Work, Readiness Teaser, Concise FAQs, and Final Consultation CTA. |
| **Practice Overview & Packages** | `src/app/services/page.tsx` | Next.js Server Component | Comprehensive overview of the 6 core practices, complete Launch, Grow, and Complete Partner package matrices. |
| **Dedicated Service Subroutes** | `src/app/services/[slug]/page.tsx` | Next.js Dynamic SSG | 6 statically prerendered routes: `/services/digital-presence`, `/services/customer-acquisition`, `/services/lead-sales-systems`, `/services/operations-automation`, `/services/analytics-insights`, `/services/ongoing-management`. |
| **Methodology & Process** | `src/app/process/page.tsx` | Next.js Server Component | Detailed 4-stage engineering blueprint (Discovery, Blueprint, Build & Launch, Grow & Optimize). |
| **Case Studies** | `src/app/work/page.tsx` | Next.js Server Component | Illustrative workflow demonstrations with architecture schematics and compliance notices. |
| **Readiness Diagnostic** | `src/app/readiness/page.tsx`<br>`src/components/DigitalReadinessAssessment.tsx` | React Client State | Complete interactive 5-step maturity diagnostic with score calculator and tailored pillar recommendation. |
| **AEO Knowledge Base** | `src/app/insights/page.tsx` | Next.js Server Component | Educational technical articles optimized for AI search agents and answer engines. |
| **Consultation & Enquiry** | `src/app/contact/page.tsx`<br>`src/components/EnquiryForm.tsx` | React Client + SSR | Immediate static HTML form rendering (no suspense fallback spinners), honeypot trap, sub-second bot timing traps, 32KB payload check, and duplicate submission suppression. |
| **Admin & CMS** | `src/app/admin/**/page.tsx`<br>`src/app/api/admin/**/route.ts` | Next.js Dynamic Routes | Supabase-backed team member and enquiry management with strict RBAC (`super_admin` vs `content_editor`), signed HMAC session tokens, and security headers. |
| **Technical SEO & Sitemap** | `src/app/sitemap.ts`<br>`src/app/robots.ts` | Next.js Metadata API | Dynamic XML sitemap indexing all 20 public routes; robots directive disallowing `/admin/` and `/api/`. |

---

## 2. Route & Component Status Matrix

| Route | Primary Components | Theme Support | Status |
| :--- | :--- | :--- | :--- |
| `/` | `HeroSection`, `SystemSchematicHero`, `ServicePillarsSection`, `ProcessSection`, `FoundersSection`, `FaqSection`, `EnquiryForm` | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services` | `ServicePillarsSection`, `PackagesSection`, `EnquiryForm` | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/digital-presence` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/customer-acquisition` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/lead-sales-systems` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/operations-automation` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/analytics-insights` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/services/ongoing-management` | Service detail page, Deliverables, Inclusions | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/about` | Firm overview, Leadership preview, Governance | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/team` | Full Leadership Directory, Real Photo + Monograms | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/process` | 4-Stage Methodology, Timeline, Quality gates | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/work` | Illustrative Demonstrations, Architectural blueprints | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/readiness` | 5-step Interactive Digital Readiness Diagnostic | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/insights` | In-depth Technical Articles, AEO Q&A | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/contact` | Full Consultation Form, Direct contact box | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/privacy` | Privacy Policy disclosures (DPDP / GDPR) | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/terms` | Commercial Terms & Disclosures (MSME Udyam) | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/cookie-preferences` | Cookie preference toggles & storage controls | Day (Default) & Night | Live & Tested (HTTP 200) |
| `/admin` | Admin Portal Dashboard, Session verification | Day & Night | Live & Tested (HTTP 200) |
| `/admin/enquiries` | Enquiry Operations Inbox, Triage, Notes | Day & Night | Live & Tested (HTTP 200) |
| `/admin/team` | Team Member CMS, RBAC guards | Day & Night | Live & Tested (HTTP 200) |
| `/sitemap.xml` | Complete XML Sitemap (20 routes) | N/A | Live & Tested (HTTP 200) |
| `/robots.txt` | Robots.txt directives | N/A | Live & Tested (HTTP 200) |
