# Primeora Solutions — Visual Redesign Audit V3

**Date:** October 2026  
**Auditor:** Creative Director & Principal Frontend Architect  
**Scope:** Visual Experience, Theming Architecture, Layout Diversity, Hero Motion, and Route Information Architecture  
**Test URL:** `http://localhost:3000` & Live Netlify Preview

---

## 1. Executive Summary & Defect Ledger

An empirical browser inspection was conducted across desktop (1440px) and mobile (390px) viewports in both Night Mode and Day Mode. The previous implementation suffered from fundamental aesthetic, architectural, and information-density defects:

| Defect Area | Empirical Finding | Root Cause | Required Remedy V3 |
|---|---|---|---|
| **Day / Night Theming** | In Day Mode, the canvas remained **100% pitch black (`#090807`)** on Home, Services, Founders, and Process. Only the top navbar switched to white, producing a jarring, broken visual contrast. | Components hardcoded utility classes `bg-[#090807]` and `bg-[#141312]` without `dark:` conditional scoping, overriding `:root` CSS variables. | Refactor all pages and layout wrappers to use CSS custom properties (`var(--bg-canvas)`, `var(--bg-surface)`) or explicit `bg-[#FBF9F5] dark:bg-[#090807]`. Day mode must be a genuinely warm, light ivory/parchment canvas. |
| **Hero Motion & Concept** | The hero featured public domain Earth orbit footage (`hero-motion.webm`). While the video file was loaded and could be toggled, cosmic satellite footage is completely disconnected from Primeora's value proposition (business systems, lead pipelines, automation). | Relying on generic external stock footage rather than authoring an original visual narrative representing Primeora's actual domain. | Replace the orbital video with a bespoke motion-picture experience: a choreographed, interactive simulation representing **"Fragmented Digital Chaos → Automated Enquiry Pipeline → Unified Intelligence"**. |
| **Homepage Information Density** | The homepage contained **8 consecutive heavy sections**: Hero, 6 large Service cards, 4 Process steps, 3 Founder profiles, an Illustrative Scenario blueprint, a Readiness Assessment teaser, 10 FAQ accordions, and a full Enquiry form. | The homepage was treated as an exhaustive company manual rather than a sharp, cinematic introduction. | Streamline the homepage to 5 concise sections: 1) Cinematic Hero, 2) The Problem & The System, 3) Visual Services Teaser (linking to `/services`), 4) Engineered Method Preview (linking to `/process`), 5) Founders & Consultation Invitation. Move deep specs to dedicated routes. |
| **Layout Uniformity & Lack of Visual Worlds** | Every page (Home, Services, Process, Founders, Work) repeated the exact same visual structure: 3-column rounded rectangle cards with an icon at the top, a headline, description, and bullet points on a black background. | Lack of distinct art direction per route; reliance on uniform card grids. | Engineer distinct visual worlds: `/services` becomes an editorial exploratory index with interactive preview drawers; `/founders` features generous portrait framing; `/process` becomes a directional timeline system; `/readiness` becomes a focused diagnostic workspace. |
| **Navigation Complexity** | Top navbar contained 7 links (Services, Process, Work, About, Founders, Readiness, Insights) plus CTA, crowding the desktop bar. | Flat information architecture without clear primary vs supporting hierarchy. | Streamline primary nav to 5 destinations: **Services · Work · Founders · Insights · Contact** (+ "Discuss a Project" button). Process is linked contextually through Services, Home, and Footer. |
| **Copy & Unsupported Claims** | Certain copy made absolute claims (e.g. "guarantee zero-downtime production outcomes", "sub-second FCP guarantee"). | Over-promising without empirical qualification. | Qualify claims: focus on disciplined engineering standards, measured SLA commitments ("We aim to respond to enquiries within 1–2 business days"), and verified architectural runbooks. |

---

## 2. Empirical Browser Evidence

Screenshots were captured via Chromium Developer Protocol directly from the rendered DOM:
- `baseline-day-home.png`: Shows top navbar in light ivory, but the hero background and all downstream content completely black (`#090807`).
- `baseline-day-founders.png`: Shows `/founders` completely black in Day Mode, proving failure of theme cascading.
- `baseline-day-services.png`: Shows `/services` completely black in Day Mode.
- `baseline-night-home-t0.png` vs `baseline-night-home-t2.png`: Shows satellite orbital movement, confirming technical video playback but highlighting the creative disconnect from enterprise software consulting.

---

## 3. Plan of Execution for V3

1. **Theme Engine Overhaul:** Enforce true Day (`#FBF9F5` warm ivory, `#191817` ink text, `#FFFFFF` cards, `#E5DDD0` borders) and Night (`#090807` obsidian, `#FBF9F5` ivory text, `#141312` charcoal cards, `#242220` borders) across the entire application tree.
2. **Original Motion-Picture Hero:** Engineer an authored, high-framerate dynamic interactive system stream showing inbound inquiries flowing into automated triage and CRM pipelines.
3. **Homepage Streamlining:** Eliminate 60% of repetitive homepage copy; preserve deep technical specifications exclusively on their dedicated routes.
4. **Distinct Visual Worlds:** Create unique, tailored layouts for `/services`, `/process`, `/founders`, `/work`, `/readiness`, and `/insights`.
5. **Component Library Integration:** Adapt tested interactive primitives from Cult UI and Watermelon UI for the services drawer and interactive telemetry.
6. **Navigation Streamlining:** 5 primary destinations in top navigation.
