# Implementation Map — Primeora Solutions

## 1. Brand & Architecture Mapping

| Layer / Domain | Location | Technology & Status | Description |
| :--- | :--- | :--- | :--- |
| **Brand Config** | `src/config/brand.ts` | TypeScript Config | Central brand definitions: name "PRIMEORA SOLUTIONS", MSME registration `UDYAM-KR-03-0732181`, contact email `primeorasolutions.in@gmail.com`, 6 pillars, 4 steps, 3 tiers. |
| **Authentic Logo & Emblem** | `src/components/brand/PrimeoraLogo.tsx`<br>`public/brand/primeora-emblem.png`<br>`public/brand/primeora-logo-dark.png`<br>`public/brand/primeora-logo-light.png` | Authentic Brand Assets | Faceted geometric "P" mark (`#1065FF`) and horizontal wordmarks extracted directly from `Logo_assets/Logo_SA.png` and `Horizontal_dark.png`. |
| **Theme & Tokens** | `tailwind.config.ts`<br>`src/app/globals.css` | Tailwind CSS 3 | Deep Midnight Canvas (`#040D1A`), Architectural Surface (`#08152B`), Cobalt Blue (`#166CFF` / `#1065FF`), Optical White (`#F8FAFC`), Slate Gray (`#94A3B8`). |
| **Ambient Mesh Motion** | `src/components/motion/HeroBackground.tsx` | Three.js + Vanta.js (FOG) | Restrained Three.js ambient background mesh running with authentic cobalt palette (`0x166cff`, `0x08152b`, `0x040d1a`). Strict `prefers-reduced-motion` CSS fallback. |
| **Smooth Scrolling** | `src/components/motion/SmoothScrollProvider.tsx` | Lenis v1.3.27 | Client layout provider ensuring 60fps smooth scrolling with reduced-motion bypass. |
| **Typography Reveal** | `src/components/react-bits/DecryptedText.tsx` | React Bits (Official) | Client-side progressive character decrypting animation on the hero studio category badge. |
| **Navigation & Header** | `src/components/Navbar.tsx`<br>`src/components/Footer.tsx` | Next.js Client Components | Sticky glassmorphic navbar with active route indicators, 8-link desktop menu, responsive mobile drawer, and high-contrast "Discuss a Project" CTA. |
| **Public Homepage** | `src/app/page.tsx` | Next.js 15 App Router | Concise 9-section landing page: Hero, "Discuss a Project" CTA, 6 Pillars Grid, 4-Step Process Overview, 3 Founders Showcase, Illustrative Work, Readiness Teaser, Concise FAQs, and Final Consultation CTA. |
| **Practice Overview & Packages** | `src/app/services/page.tsx` | Next.js Server Component | Comprehensive overview of the 6 core practices, complete Launch, Grow, and Complete Partner package matrices. |
| **Dedicated Service Subroutes** | `src/app/services/[slug]/page.tsx` | Next.js Dynamic SSG | 6 statically prerendered routes: `/services/digital-presence`, `/services/customer-acquisition`, `/services/lead-sales-systems`, `/services/operations-automation`, `/services/analytics-insights`, `/services/ongoing-management`. |
| **Dedicated Leadership Directory** | `src/app/team/page.tsx` | Next.js Server Component | Dedicated leadership route detailing the 3 founding partners (Affan, Akarsh, Dhananjaya), backgrounds, operational responsibilities, and governance notes. |
| **Methodology & Process** | `src/app/process/page.tsx` | Next.js Server Component | Detailed 4-stage engineering blueprint (Discovery, Blueprint, Build & Launch, Grow & Optimize). |
| **Case Studies** | `src/app/work/page.tsx` | Next.js Server Component | Illustrative workflow demonstrations with architecture schematics and compliance notices. |
| **Readiness Diagnostic** | `src/app/readiness/page.tsx`<br>`src/components/DigitalReadinessAssessment.tsx` | React Client State | Complete interactive 5-step maturity diagnostic with score calculator and tailored pillar recommendation. |
| **AEO Knowledge Base** | `src/app/insights/page.tsx` | Next.js Server Component | Educational technical articles optimized for AI search agents and answer engines. |
| **Consultation & Enquiry** | `src/app/contact/page.tsx`<br>`src/components/EnquiryForm.tsx` | React Client + SSR | Immediate static HTML form rendering (no suspense fallback spinners), honeypot trap, sub-second bot timing traps, 32KB payload check, and duplicate submission suppression. |
| **Admin & CMS** | `src/app/admin/**/page.tsx`<br>`src/app/api/admin/**/route.ts` | Next.js Dynamic Routes | Supabase-backed team member and enquiry management with strict RBAC (`super_admin` vs `content_editor`), signed HMAC session tokens, and security headers. |
| **Technical SEO & Sitemap** | `src/app/sitemap.ts`<br>`src/app/robots.ts` | Next.js Metadata API | Dynamic XML sitemap indexing all 20 public routes; robots directive disallowing `/admin/` and `/api/`. |

---

## 2. Route & Component Status Matrix

| Route | Primary Components | Brand Consistency | Status |
| :--- | :--- | :--- | :--- |
| `/` | `HeroSection`, `ServicePillarsSection`, `ProcessSection`, `FoundersSection`, `FaqSection`, `EnquiryForm` | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services` | `ServicePillarsSection`, `PackagesSection`, `EnquiryForm` | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/digital-presence` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/customer-acquisition` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/lead-sales-systems` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/operations-automation` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/analytics-insights` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/services/ongoing-management` | Service detail page, Deliverables, Inclusions | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/about` | Firm overview, Leadership preview, Governance | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/team` | Full Leadership Directory, Monogram cards, Bio & Deliverables | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/process` | 4-Stage Methodology, Timeline, Quality gates | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/work` | Illustrative Demonstrations, Architectural blueprints | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/readiness` | 5-step Interactive Digital Readiness Diagnostic | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/insights` | 3 In-depth Technical Articles, AEO Q&A | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/contact` | Full Consultation Form, Direct contact box | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/privacy` | Privacy Policy disclosures (DPDP / GDPR) | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/terms` | Commercial Terms & Disclosures (MSME Udyam) | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/cookie-preferences` | Cookie preference toggles & storage controls | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/sitemap.xml` | Complete XML Sitemap (20 routes) | Verified Authentic Primeora | Live & Tested (HTTP 200) |
| `/robots.txt` | Robots.txt directives | Verified Authentic Primeora | Live & Tested (HTTP 200) |
