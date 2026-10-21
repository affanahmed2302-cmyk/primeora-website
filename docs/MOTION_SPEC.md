# Motion Engineering Specification — Primeora Solutions

## 1. Overview & Motion Philosophy
Motion at **Primeora Solutions** is purposeful, restrained, and performance-minded. Rejecting distracting gimmicks like particle starfields or neon button pulses, animations serve to reinforce architectural depth, establish hierarchy, and provide smooth kinetic continuity:
- **Hero Composition**: Interactive **Procedural Architecture Matrix** (`SystemSchematicHero.tsx`) with subtle 3D tilt, telemetry status indicators, and live systems flow.
- **Kinetic Typography**: Subtle character decryption via React Bits `DecryptedText` on the hero eyebrow badge.
- **Scroll Continuity**: Inertial smooth scrolling via Lenis, synchronized with window scroll events.
- **Day/Night Theme Motion**: Tactile Sun/Moon morphing toggle with smooth micro-interactions.
- **Non-blocking Entrances**: GSAP entrance timelines that enhance perceived performance without hiding critical content from crawlers or headless capture.
- **Accessibility Guarantee**: Strict, universal `prefers-reduced-motion` compliance across all animation controllers.

---

## 2. Core Motion Stack

### 2.1 Kinetic Architecture Matrix: `SystemSchematicHero.tsx`
- **Location**: `src/components/motion/SystemSchematicHero.tsx`.
- **Composition**:
  - 3 Interconnected Architectural Layers:
    1. *Intake & Discovery*: Multi-Channel Lead Ingestion, Webhook Validation, Anti-Bot Verification.
    2. *Conversion & Workflow*: CRM Routing & Sync, Automated Notifications, Calendar & WhatsApp Bridge.
    3. *Intelligence & Oversight*: Real-Time Attribution, Analytics Warehouse, Executive Dashboards.
  - Interactive 3D Perspective Tilt: subtle `rotateX` and `rotateY` responding smoothly to cursor movement.
  - Active telemetry pulse with live operational metrics (`99.98% uptime`, `<1.8s response`, `0 lost leads`).
- **Reduced-Motion & Static Fallback**:
  - Listens to `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - When active, 3D tilt is disabled, pulsing animations are removed, and a crisp, high-contrast schematic renders instantaneously.

### 2.2 Smooth Scrolling: Lenis (`lenis`)
- **Package**: `lenis` v1.3.27.
- **Location**: `src/components/motion/SmoothScrollProvider.tsx`.
- **Configuration**:
  ```ts
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  ```
- **Reduced Motion Handling**: Bypassed immediately if `prefers-reduced-motion` is active.
- **Cleanup**: `cancelAnimationFrame` and `lenis.destroy()` executed upon unmount.

### 2.3 Character Decryption: React Bits `DecryptedText.tsx`
- **Source**: Authentic React Bits component pattern (`src/components/react-bits/DecryptedText.tsx`).
- **Behavior**: Scrambles characters sequentially at `35ms` intervals using alphanumeric characters, smoothly resolving to the target text.
- **Placement**: Featured on the Hero eyebrow badge (`PRIMEORA SOLUTIONS`).
- **Accessibility**: Includes `<span className="sr-only">{text}</span>` for screen readers; animated spans carry `aria-hidden="true"`. Bypasses animation immediately when reduced motion is requested.

### 2.4 Tactile Theme Switcher: `ThemeToggle.tsx`
- **Location**: `src/components/ThemeToggle.tsx`.
- **Behavior**: Accessible toggle button transitioning between Day Mode (Sun icon) and Night Mode (Moon icon).
- **Anti-FOUC Implementation**: Inline `<script>` in `<head>` ensures Day Mode is the zero-flash initial default for new visitors, persisting user preference in `localStorage.getItem('primeora-theme')`.
- **Motion**: Subtle scale and rotation transition on the icon without layout shift.

### 2.5 Timeline Sequencing: GSAP & `@gsap/react`
- **Hook**: `useGSAP` scoped to section refs.
- **Entrance Philosophy**: Non-blocking `fromTo` transitions starting at `opacity: 0.4` with subtle vertical displacement (`6px–10px`), ensuring elements are never locked at `opacity: 0` for headless testing or search engine spiders.
- **Process Timeline**: Staggered milestone progression in `ProcessSection.tsx` triggered on scroll with ScrollTrigger.
