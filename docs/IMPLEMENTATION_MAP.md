# Implementation Map — Primeora Solutions

## 1. Brand & Architecture Mapping

| Layer / Domain | Location | Technology & Status | Description |
| :--- | :--- | :--- | :--- |
| **Brand Config** | `src/config/brand.ts` | TypeScript Config | Central brand definitions: name "PRIMEORA SOLUTIONS", MSME registration, contact email `primeorasolutions.in@gmail.com`, 6 pillars, 4 steps, 3 tiers. |
| **Logo & Emblem** | `src/components/brand/PrimeoraLogo.tsx`<br>`public/brand/primeora-emblem.svg`<br>`public/brand/primeora-logo.svg` | Vector SVG + PNG | Vector emblem with dynamic faceted "P" prism and gradient text lockup. |
| **Theme & Tokens** | `tailwind.config.ts`<br>`src/app/globals.css` | Tailwind CSS 3 | Deep obsidian (`#07090F`), navy surfaces (`#0B0F1A`), electric azure (`#3D6EF5`), violet (`#7C5CFF`), platinum (`#F0F2F7`). |
| **Smooth Scrolling** | `src/components/motion/SmoothScrollProvider.tsx` | Lenis v1.1.20 | Root wrapper providing buttery smooth scrolling synchronized with GSAP ScrollTrigger. |
| **Hero Motion** | `src/components/motion/HeroCanvas.tsx`<br>`src/components/react-bits/DecryptedText.tsx` | HTML5 Canvas + React Bits | 60fps dynamic constellation canvas with mouse deflection; sequential cyber text decryption. |
| **Navigation** | `src/components/Navbar.tsx`<br>`src/components/Footer.tsx` | React 19 Client | Dark frosted glass navbar with active route indicators and primary CTA; detailed footer with MSME registration. |
| **Public Routes** | `src/app/**/page.tsx` | Next.js 15 App Router | All 9 public pages: `/`, `/services`, `/about`, `/process`, `/work`, `/readiness`, `/insights`, `/contact`, `/privacy`, `/terms`, `/cookie-preferences`. |
| **Team Management** | `src/app/admin/team/page.tsx`<br>`src/app/api/team/route.ts` | Supabase / PostgreSQL | CMS for adding, editing, ordering, and publishing team profiles. 3 real founders seeded. |
| **Enquiry Pipeline** | `src/components/EnquiryForm.tsx`<br>`src/app/api/enquiry/route.ts` | Next.js API + Supabase | Honeypot trap, client timestamp verification, rate limiting, and persistent database storage. |
| **Diagnostic Tool** | `src/components/DigitalReadinessAssessment.tsx`<br>`src/app/readiness/page.tsx` | React Client State | 4-step interactive maturity diagnostic calculating score and recommending primary pillar. |
| **SEO & Structured Data** | `src/components/StructuredData.tsx`<br>`src/app/sitemap.ts`<br>`src/app/robots.ts` | Schema.org JSON-LD | Organization, WebSite, Service, and FAQPage schemas formatted for Google, Perplexity, and ChatGPT. |

---

## 2. Route & Component Status Matrix

| Route | Primary Components | Brand Consistency | Motion Integration |
| :--- | :--- | :--- | :--- |
| `/` | `HeroSection`, `ServicePillarsSection`, `PackagesSection`, `ProcessSection`, `FoundersSection`, `FaqSection`, `EnquiryForm` | Verified Primeora Solutions | HeroCanvas + DecryptedText + GSAP timelines |
| `/services` | `ServicePillarsSection`, `EnquiryForm` | Verified Primeora Solutions | Tab switching, hover state elevation |
| `/about` | `FoundersSection`, Governance box | Verified Primeora Solutions | Team card hover animations, verified links |
| `/process` | `ProcessSection`, Blueprint details | Verified Primeora Solutions | GSAP staggered entrance |
| `/work` | Case models grid, Compliance note | Verified Primeora Solutions | Relabeled as Illustrative Workflow Demonstrations |
| `/readiness` | `DigitalReadinessAssessment` | Verified Primeora Solutions | Interactive 4-step diagnostic state |
| `/insights` | Knowledgebase articles, Q&A | Verified Primeora Solutions | Hover micro-interactions |
| `/contact` | `EnquiryForm`, Direct contact box | Verified Primeora Solutions | Dark input focus rings, honeypot validation |
| `/privacy` | Privacy Policy disclosures | Verified Primeora Solutions | DPDP/GDPR compliance |
| `/terms` | Commercial Terms & Disclosures | Verified Primeora Solutions | MSME Udyam governance |
| `/cookie-preferences` | Preference toggles, local storage | Verified Primeora Solutions | Instant save dispatch & modal toggle |
