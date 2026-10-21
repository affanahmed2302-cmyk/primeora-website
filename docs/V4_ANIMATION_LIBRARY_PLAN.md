# PRIMEORA SOLUTIONS — V4 ANIMATION LIBRARY RESEARCH & IMPLEMENTATION PLAN
**Creative Reset V4: Animmaster Lib, Aceternity UI & Skiper UI Integration**

---

## 1. Library Evaluation & Component Selection

### A. Animmaster Lib (`animmasterlib.dev`)
- **Focus Area:** Kinetic typography, split-character reveals, magnetic interactive physics, and smooth scroll sequencing.
- **Licensing & Rights:** Open-source architectural patterns implemented cleanly in vanilla React/GSAP without proprietary external dependencies.
- **Selected Component:** `KineticTextReveal` + `MagneticWrapper`
- **Source URL:** https://animmasterlib.dev/components/text-animations
- **Motion Provided:** Staggered character/word translation along the Y-axis with cubic-bezier easing (`power3.out`), masked overflow, and interactive magnetic attraction on primary call-to-actions.
- **Problem Solved:** Eliminates lifeless typography and generic template fade-ins. Provides an authoritative editorial voice for headlines across Home, Founders, and Services.
- **Target Integration:** `src/components/motion/KineticTextReveal.tsx`, `src/components/motion/MagneticWrapper.tsx`.

---

### B. Aceternity UI (`ui.aceternity.com`)
- **Focus Area:** Spatial depth, scroll-linked multi-layer perspective, and SVG tracing lines.
- **Licensing & Rights:** MIT License. Custom styled and rewritten to avoid generic neon gradients and AI-cliché glowing borders.
- **Selected Components:**
  1. `HeroParallax` (adapted as `ArchitecturalHeroParallax.tsx`)
     - **Source URL:** https://ui.aceternity.com/components/hero-parallax
     - **Motion Provided:** Scroll-linked 3D isometric perspective transformation (`rotateX`, `rotateZ`, `skewX`, `translateY`) across three stratified rows of authentic digital system architecture blueprints.
     - **Problem Solved:** Completely replaces the rejected abstract particle canvas and stock space video with inspectable, high-fidelity system blueprints (Performance infrastructure, CRM webhook automation, Executive KPI dashboard, AEO knowledge graph).
     - **Target Integration:** `src/components/hero/ArchitecturalHeroParallax.tsx`.
  2. `TracingBeam` / `Timeline` (adapted as `ArchitecturalTracingTimeline.tsx`)
     - **Source URL:** https://ui.aceternity.com/components/tracing-beam
     - **Motion Provided:** Precision SVG path drawing synchronized with viewport scroll progress, illuminating milestone gates and technical deliverables.
     - **Problem Solved:** Eradicates the 4-card horizontal process box. Replaces it with an editorial engineering ledger.
     - **Target Integration:** `src/components/process/ArchitecturalTracingTimeline.tsx`.

---

### C. Skiper UI (`skiper-ui.com`)
- **Focus Area:** Spatial motion, fluid state transitions, and unconventional typographic navigation.
- **Licensing & Rights:** MIT License. Free component patterns adapted cleanly with `motion/react`.
- **Selected Component:** `SpatialPracticeLedger.tsx`
- **Source URL:** https://skiper-ui.com/components/interactive-list
- **Motion Provided:** Full-width typographic accordion ledger with physical spring transitions (`stiffness: 300, damping: 30`), revealing system specifications, architectural schemas, and handover deliverables without wrapping into cards.
- **Problem Solved:** Destroys the ubiquitous 6-card grid on `/services` and the homepage, replacing it with an asymmetric, senior consulting ledger.
- **Target Integration:** `src/components/services/SpatialPracticeLedger.tsx`.

---

## 2. Implementation & Testing Register

| Component | Originating Library | Primary File | Pages Utilizing | Browser Verification Test |
|---|---|---|---|---|
| **KineticTextReveal** | Animmaster Lib | `src/components/motion/KineticTextReveal.tsx` | `/`, `/founders`, `/services` | Verify character-level CSS transform matrix without layout shift |
| **MagneticWrapper** | Animmaster Lib | `src/components/motion/MagneticWrapper.tsx` | Global CTA buttons & Nav links | Verify pointermove delta translation & spring return |
| **ArchitecturalHeroParallax** | Aceternity UI | `src/components/hero/ArchitecturalHeroParallax.tsx` | `/` (Homepage Hero) | Verify 3D scroll matrix transform, pause button, and reduced motion fallback |
| **SpatialPracticeLedger** | Skiper UI | `src/components/services/SpatialPracticeLedger.tsx` | `/services`, `/` | Verify smooth row expansion, keyboard accessibility, and dual-theme tokens |
| **ArchitecturalTracingTimeline** | Aceternity UI | `src/components/process/ArchitecturalTracingTimeline.tsx` | `/process`, `/` | Verify SVG pathLength interpolation and active milestone triggers |

---

## 3. Brand Theme & Token Synchronization

All components strictly honor the dual-theme design system:
- **Night Mode (Default):** Obsidian `#090807` background, Titanium `#141312` surfaces, Copper `#E07A5F` accents, Cobalt `#1065FF` highlights, `#F5F2EB` text.
- **Day Mode:** Warm Ivory `#FBF9F5` canvas, White `#FFFFFF` surfaces, Terracotta `#C25E38` accents, Royal Cobalt `#1065FF` highlights, Charcoal `#191817` text.
- **Craft Floor Discipline:** Zero kicker pills, zero pulse dots, zero AI neon borders, zero text gradients.
