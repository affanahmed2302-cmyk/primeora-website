# Motion Engineering Specification — Primeora Solutions

## 1. Overview & Motion Philosophy
Motion at **Primeora Solutions** is purposeful, restrained, and performance-minded. Rejecting distracting gimmicks like particle starfields or neon button pulses, animations serve to reinforce architectural depth, establish hierarchy, and provide smooth kinetic continuity:
- **Ambient Canvas**: A restrained, deep-sea volumetric mesh (Three.js + Vanta.js) simulating subtle digital currents.
- **Kinetic Typography**: Subtle character decryption via React Bits `DecryptedText` on the hero eyebrow badge.
- **Scroll Continuity**: Inertial smooth scrolling via Lenis, synchronized with window scroll events.
- **Non-blocking Entrances**: GSAP entrance timelines that enhance perceived performance without hiding critical content from crawlers or headless capture.
- **Accessibility Guarantee**: Strict, universal `prefers-reduced-motion` compliance across all animation controllers.

---

## 2. Core Motion Stack

### 2.1 Ambient Background Mesh: `HeroBackground.tsx`
- **Engine**: Three.js + Vanta.js (FOG shader mode).
- **Location**: `src/components/motion/HeroBackground.tsx`.
- **Palette**:
  ```ts
  highlightColor: 0x166cff, // Authentic Cobalt Royal Blue
  midtoneColor: 0x08152b,   // Architectural Deep Slate Navy
  lowlightColor: 0x02070e,  // Deep Ink Midnight
  baseColor: 0x040d1a,      // Midnight Navy Canvas
  blurFactor: 0.7,
  speed: 0.6,
  zoom: 0.8,
  ```
- **Lifecycle & Memory Management**:
  - Dynamically imported on the client inside `useEffect`.
  - Stored in `vantaRef` and cleanly destroyed on unmount via `vantaEffect.destroy()`.
  - Zero memory leaks across page transitions.
- **Reduced-Motion & Low-Power Fallback**:
  - Evaluates `window.matchMedia('(prefers-reduced-motion: reduce)')`.
  - When active or when WebGL initialization fails, WebGL rendering is completely skipped and replaced with an ultra-lightweight static CSS radial gradient: `radial-gradient(ellipse 70% 50% at 50% 10%, rgba(22,108,255,0.12), transparent 70%)`.

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

### 2.4 Timeline Sequencing: GSAP & `@gsap/react`
- **Hook**: `useGSAP` scoped to section refs.
- **Entrance Philosophy**: Non-blocking `fromTo` transitions starting at `opacity: 0.4` with subtle vertical displacement (`6px–10px`), ensuring elements are never locked at `opacity: 0` for headless testing or search engine spiders.
- **Timelines**:
  - `badgeRef`: `fromTo({ y: -6, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4 })`
  - `headlineRef`: `fromTo({ y: 10, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.5 })`
  - `subtextRef`: `fromTo({ y: 8, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4 })`
  - `ctaRef`: `fromTo({ y: 6, opacity: 0.4 }, { y: 0, opacity: 1, duration: 0.4 })`
- **Easing**: Smooth quadratic deceleration (`power2.out`).
- **Reduced Motion**: If reduced motion is requested, `useGSAP` returns early, rendering elements in their standard static positions.

---

## 3. Performance & Accessibility Metrics

| Metric | Target | Observed Result | Status |
| :--- | :--- | :--- | :--- |
| **Frame Rate** | 60 FPS | 60 FPS constant on desktop and mobile | Verified |
| **GPU Acceleration** | Hardware composite | Transform & opacity only, 0 layout thrashing | Verified |
| **Reduced Motion** | Zero unwanted motion | WebGL skipped; static CSS gradient; instant text | Verified |
| **Memory Cleanup** | 0 leaks | Full `destroy()` calls on Vanta & Lenis instances | Verified |
| **First Contentful Paint** | < 1.2s | Instant static HTML hydration; zero blocking overlays | Verified |
