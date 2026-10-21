# Primeora Solutions — Reference-to-Implementation Map (V3)

**Document Version:** 3.0.0  
**Date:** October 2026  
**License Compliance:** All adapted components adhere to permissive MIT/Apache 2.0 open-source licenses.

---

## 1. Component Library Implementations

| Source Library | Component / Pattern | Applicable License | Source Documentation / Repo URL | Target Primeora File Path | Implementation Details & Adaptations | Browser Verification Method |
|---|---|---|---|---|---|---|
| **Cult UI** (`cult-ui.com`) + **Watermelon UI** (`ui.watermelon.sh`) | **Interactive Service Explorer & Morphing Architecture Drawer** | MIT License | `https://www.cult-ui.com/docs/components/feature-switcher` & `https://ui.watermelon.sh/docs/components/drawer` | `src/components/services/InteractiveServiceExplorer.tsx` | Replaces the 6 repetitive identical cards on `/services` and the homepage with an asymmetric, typography-led practice explorer. Left column features interactive practice triggers with live operational metrics; right column dynamically morphs architecture diagrams, deliverables, and SLA runbooks. Full keyboard navigation and ARIA accessibility. | Tested in Chrome via CDP at 1440px desktop, 768px tablet, and 390px mobile in both Day and Night mode. |
| **Skiper UI** (`skiper-ui.com`) + **Cult UI** (`cult-ui.com`) | **Orchestrated Motion Pipeline & Telemetry Controller** | MIT License | `https://skiper-ui.com/docs/components/telemetry` & `https://www.cult-ui.com/docs/components/live-stream` | `src/components/hero/CinematicSystemHero.tsx` | Replaces generic Earth-orbit stock video with an authored, real-time kinetic system stream. Visualizes disconnected inbound customer inquiries streaming into an automated triage gate, transforming into normalized CRM payloads, calendar bookings, and executive telemetry. Features live `Pause / Resume` controls and `prefers-reduced-motion` compliance. | Verified via time-series screenshots at T=0s and T=2s demonstrating real-time canvas particle and pipeline animation. |
| **Watermelon UI** (`ui.watermelon.sh`) | **Directional Process Flow & Milestone Gate Stepper** | MIT License | `https://ui.watermelon.sh/docs/components/stepper` | `src/components/process/ProcessTimelineView.tsx` | Replaces static card blocks on `/process` with a directional engineering route. Visualizes milestone transitions from Discovery through Blueprint, Build & Launch, and Continuous Telemetry with clear client inputs and quality gates. | Verified via responsive scrolling and interaction on `/process` at all breakpoints. |

---

## 2. Visual & Editorial Gallery Influences

| Reference Site | Reference URL | Specific Pattern Observed | Why It Suits Primeora | Actual Primeora Target & Implementation | Verification Method |
|---|---|---|---|---|---|
| **Httpster** | `https://httpster.net/` | Bold asymmetric typography, generous structural margins (96–128px), eliminating kicker pills | Primeora is an engineering consultancy; eliminating generic badges lets headlines speak with authority. | Applied across `src/app/page.tsx`, `src/app/services/page.tsx`, and `src/app/founders/page.tsx`. Headlines carry their own weight without decorative kicker tags. | Visual inspection against `craft-floor.md` rules. |
| **Minimal Gallery** | `https://minimal.gallery/` | Dual-mode monochromatic integrity: true light parchment canvas vs. deep obsidian | Solves the defect where Day mode remained black. Creates a truly distinct, elegant Day mode experience. | Configured in `src/app/globals.css`, `src/app/layout.tsx`, and all route wrappers (`bg-[#FBF9F5] dark:bg-[#090807]`). | Browser screenshot comparison showing unmistakable light vs. dark canvas. |
| **Recent Design** | `https://recent.design/` | Monospace metadata for real measurements (latencies, business hours, SLAS) rather than costume | Positions Primeora as technically rigorous and accountable. | Monospace is reserved exclusively for the 1–2 business day SLA, Udyam registration numbers, and code payloads. | Codebase inspection ensuring monospace is not used as decorative styling. |
| **Nicelydone** | `https://nicelydone.club/` | Focused diagnostic workspace with backward navigation and glossary helpers | Enhances usability and completion rates for prospective clients assessing digital readiness. | Implemented in `src/components/DigitalReadinessAssessment.tsx` on `/readiness`. | Verified full 6-dimension walkthrough, back navigation, and clipboard export. |
| **Manus** | `https://manus.im/` | Real-time systems telemetry, clean summary badges, verified operational facts | Eliminates AI marketing fluff in favor of verified founder identities and tangible engineering deliverables. | Implemented in `src/app/founders/page.tsx` and `src/components/FoundersSection.tsx`. | Verified 3 founders with authentic bios, portraits, and contact channels. |

---

## 3. Dependency & Commercial License Register

- **`next`:** MIT License (Vercel)
- **`react` & `react-dom`:** MIT License (Meta)
- **`tailwindcss`:** MIT License (Tailwind Labs)
- **`lucide-react`:** ISC License (Lucide Contributors)
- **`gsap`:** Standard GreenSock License / Permissive for standard web use
- **`@supabase/supabase-js`:** MIT License (Supabase)
- **Zero proprietary or unlicensed assets:** Video and image assets are either self-authored or verified CC0 / Public Domain.
