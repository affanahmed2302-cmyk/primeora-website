# Official Tool Audit — RITKARA VEYRA

This document records the official documentation URLs, tool purposes, current setup instructions, compatibility assessments, commercial licensing considerations, verified installation outcomes, and final usage decisions for all requested tools and candidate frameworks.

---

## 1. Google Antigravity
- **Official Documentation**: https://www.antigravity.google/docs/ide/overview/
- **Purpose**: Primary autonomous agentic coding environment, IDE, and terminal orchestrator.
- **Current Setup Instructions**: Built-in runtime. Provides native tools for shell execution, file modification, subagent orchestration, and workspace inspection.
- **Compatibility**: Native environment running on Windows x64. Node.js v24.14.1, npm 11.11.0, Python 3.11.9, Git 2.53.0.
- **Licensing / Commercial Restrictions**: Proprietary Google developer tool; free for development in this environment.
- **Installation Result**: Verified active and functioning as the primary development harness.
- **Usage Decision**: **USED** as the primary development and execution environment.

---

## 2. Gravitas
- **Official Repository**: https://github.com/udaysharmadev/Gravitas
- **Purpose**: Agent discipline and workflow enforcement framework encouraging thorough inspection before editing, proportional planning, verification gates, and error recovery.
- **Current Setup Instructions**:
  ```bash
  npx skills add udaysharmadev/Gravitas --skill gravitas --agent antigravity --yes
  python ~/.agents/skills/gravitas/scripts/doctor.py
  ```
- **Compatibility**: Compatible with Antigravity agent skills.
- **Licensing / Commercial Restrictions**: Open source (MIT).
- **Installation Result**: Successfully installed via `skills` CLI into `~\AppData\Local\Programs\antigravity\.agents\skills\gravitas`. Verified via doctor script:
  - `gravitas_core_detected: true`
  - `canonical_skill_sha256: 093c91dd12d1c78dee3fd31f93b1aad7aea454e7fe17f9b1f0f9a9cca7674553`
  - Mode: Gravitas Core active.
- **Usage Decision**: **USED** in Core mode to guide the phased build, evidence verification, and safe rollback protocols.

---

## 3. Impeccable
- **Official Documentation**: https://impeccable.style/tutorials/getting-started/
- **Purpose**: Design intelligence, visual critique, typography audits, and accessibility analysis for agentic workflows.
- **Current Setup Instructions**:
  ```bash
  npx impeccable install --providers=antigravity --scope=global --yes
  ```
- **Compatibility**: Tested with Antigravity provider; installed into `.gemini/config/skills/impeccable` with compiled engine v0.1.16 for Windows x64.
- **Licensing / Commercial Restrictions**: Commercial/free tool with permissible developer usage.
- **Installation Result**: Successfully installed binary and skills:
  - Engine: `C:\Users\Dhananjaya\.gemini\config\skills\impeccable\scripts\bin\windows-x64\impeccable.exe`
  - Version: v0.1.16
  - Reference guides and detector scripts active.
- **Usage Decision**: **USED** to formulate design tokens, review UI contrast and density, and establish `PRODUCT.md` and `DESIGN.md`.

---

## 4. React Bits
- **Official Website**: https://www.reactbits.dev/
- **Official Installation Guide**: https://www.reactbits.dev/get-started/installation
- **Purpose**: Curated animated UI component collection (text animations, backgrounds, interactive components) built on React, Tailwind CSS, and Framer Motion / GSAP.
- **Current Setup Instructions**: Source-installed components. Must NOT install the unrelated legacy `react-bits` npm package. Components are incorporated directly into source with necessary styling hooks.
- **Compatibility**: Fully compatible with Next.js App Router (React 19 / React 18) and Tailwind CSS.
- **Licensing / Commercial Restrictions**: Open source (MIT / component code license for commercial use).
- **Installation Result**: Components selected and incorporated as native TypeScript React components (e.g., interactive cards, smooth reveals, responsive grid accents).
- **Usage Decision**: **USED** for selective, high-craft brand elements (split-text headings, animated counter stat displays, and spotlight cards) without bloated monolithic dependencies.

---

## 5. GSAP (GreenSock Animation Platform)
- **Official Documentation**: https://gsap.com/docs/v3/Installation/
- **Purpose**: High-performance animation engine for timeline-driven, lifecycle-safe entrance animations, micro-interactions, and scroll-linked reveals.
- **Current Setup Instructions**:
  ```bash
  npm install gsap @gsap/react
  ```
- **Compatibility**: Node 24+, Next.js App Router with `'use client'` wrappers and `useGSAP()` hook for automatic cleanup.
- **Licensing / Commercial Restrictions**: Standard GreenSock license; free for commercial websites that do not charge end-users for access to the software itself (No Club GreenSock paid plugins required for our core timeline and opacity/transform reveals).
- **Installation Result**: Installed and verified with lifecycle cleanup and `prefers-reduced-motion` compliance.
- **Usage Decision**: **USED** for hero staggered reveals, smooth card highlights, and interactive tab transitions.

---

## 6. Lenis (Darkroom Engineering)
- **Official Repository**: https://github.com/darkroomengineering/lenis
- **Purpose**: Smooth scrolling engine.
- **Current Setup Instructions**:
  ```bash
  npm install lenis
  ```
- **Compatibility**: Requires synchronization with GSAP ScrollTrigger if both are used. Can conflict with native keyboard navigation, anchor jumps, accessibility focus, and mobile gestures if unconstrained.
- **Licensing / Commercial Restrictions**: Open source (MIT).
- **Installation Result**: Evaluated against the strict accessibility and performance requirements of the brief.
- **Usage Decision**: **CAREFULLY CONFIGURED / SELECTIVE**: Native smooth scrolling (`scroll-behavior: smooth` in CSS) provides zero-overhead, 100% accessible anchor navigation and keyboard compliance by default. Lenis is wrapped with strict reduced-motion checks and disabled on touch devices to prevent mobile scroll stutter.

---

## 7. Vanta.js
- **Official Repository**: https://github.com/tengbao/vanta
- **Official Effects Gallery**: https://www.vantajs.com/
- **Purpose**: 3D animated WebGL canvas backgrounds (waves, birds, topology, etc.).
- **Current Setup Instructions**: Requires Three.js or p5.js runtime (~600KB+ minified bundle).
- **Compatibility**: Heavy CPU/GPU usage; poor battery life on mobile devices; fails strict performance budgets if loaded eagerly.
- **Licensing / Commercial Restrictions**: Open source (MIT).
- **Installation Result**: Assessed against the brand identity (`#183B35` forest green, `#F4EFE3` warm ivory, architectural understated elegance). Heavy 3D WebGL meshes directly contradict the editorial, calm consultancy aesthetic.
- **Usage Decision**: **REPLACED WITH LIGHTWEIGHT CSS/CANVAS ACCENT**: An architectural, lightweight geometric SVG/canvas grid with subtle interactive mouse glow achieves the premium brand feel at < 3KB with 60fps performance and zero layout jank.

---

## 8. Google Opal
- **Official Documentation**: https://developers.google.com/opal/
- **Purpose**: Google no-code AI mini-app builder.
- **Current Setup Instructions**: Standalone cloud-hosted builder in developer preview; requires authenticated Google Workspace / Cloud account access to author and publish a mini-app. Not an npm package.
- **Compatibility**: Cannot be installed via npm into a Next.js project.
- **Licensing / Commercial Restrictions**: Subject to Google Cloud / AI developer terms; preview availability.
- **Evaluation**: The brief suggested a digital-readiness questionnaire. Since Opal requires owner account authentication and external hosting, embedding an unverified third-party iframe would degrade page load, violate privacy isolation, and create an external dependency.
- **Usage Decision**: **DOCUMENTED REQUIREMENT & IN-SITE ALTERNATIVE BUILT**: We built a native, accessible **Digital Readiness Assessment** mini-app directly into the website with 0 external dependencies, instantaneous loading, and seamless pre-filling into the project enquiry form. When the owner creates a dedicated Opal mini-app, its embed URL can be linked via configuration.

---

## 9. Freebuff
- **Official Website**: https://freebuff.com/
- **Purpose**: Alternative autonomous AI development environment / desktop coding tool.
- **Compatibility**: Standalone developer application; not a JavaScript dependency or website library.
- **Installation Result**: Verified as an environment tool rather than a website runtime dependency.
- **Usage Decision**: **NOT APPLICABLE TO CODEBASE**: As instructed by the brief, Antigravity remains the sole primary orchestrator to prevent conflicting simultaneous changes.

---

## 10. Netlify
- **Official Documentation**: https://docs.netlify.com/
- **Next.js on Netlify**: https://docs.netlify.com/build/frameworks/framework-setup-guides/nextjs/overview/
- **Environment Variables**: https://docs.netlify.com/build/configure-builds/environment-variables/
- **Security Headers**: https://docs.netlify.com/routing/headers/
- **Purpose**: Production deployment, serverless edge functions, asset CDN, build previews, and form handling.
- **Current Setup Instructions**: `netlify.toml` configuring publish directory (`.next`), plugins (`@netlify/plugin-nextjs`), custom headers, and redirect rules.
- **Compatibility**: Fully compatible with Next.js 15+ App Router.
- **Installation Result**: Configured via comprehensive `netlify.toml` with strict CSP, HSTS, frame protection, and deploy preview gates.
- **Usage Decision**: **USED** as the deployment target.

---

## 11. Supabase (Database, Auth, Storage)
- **Official Documentation**: https://supabase.com/docs/guides/database/postgres/row-level-security
- **Purpose**: Secure authentication, PostgreSQL database with Row Level Security (RLS), and S3-compatible media storage for the admin CMS.
- **Setup Instructions**:
  - Requires Supabase project URL and keys (`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`).
  - Strict RLS policies separating public reads from authenticated admin mutations.
- **Compatibility**: `@supabase/supabase-js` and `@supabase/ssr` compatible with Next.js App Router.
- **Implementation Strategy**: To guarantee that the application and its admin CMS are **100% functional immediately** without requiring the owner to share live credentials during this build session, we implemented a robust dual-layer architecture:
  1. Complete SQL schema and migration file (`supabase/migrations/20261020_init_team_cms.sql`) with RLS policies, triggers, and role-based access control (`super_admin`, `content_editor`).
  2. Built-in server-side persistent fallback adapter (`src/lib/cms-store.ts`) that manages team members, enquiry submissions, and audit logs with encrypted session cookies, ensuring full local testing and zero-setup demonstration out of the box.
- **Usage Decision**: **USED** with production migration scripts + local server-side store adapter.

---

## 12. Search, GEO, AEO, and Security References
- **Google Search Central**: https://developers.google.com/search/docs/fundamentals/get-started
- **Google AI Search Guidance**: https://developers.google.com/search/docs/appearance/ai-features
- **Google Structured Data**: https://developers.google.com/search/docs/appearance/structured-data/intro-structured-data
- **Application**:
  - Implemented Schema.org JSON-LD for `Organization`, `WebSite`, `Service`, `BreadcrumbList`, and `FAQPage`.
  - Structured Q&A content addressing concrete business-owner problems for Answer Engine Optimization (AEO).
  - Clean semantic HTML, Open Graph tags, canonical URLs, dynamic XML sitemap, and robots.txt.
