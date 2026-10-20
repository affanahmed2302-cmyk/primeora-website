# Motion Engineering Specification — Primeora Solutions

## 1. Overview & Motion Philosophy
Motion at **Primeora Solutions** is purposeful, physics-grounded, and performance-minded. Animations exist to reinforce spatial hierarchy, guide attention, provide immediate feedback on user interactions, and establish high-tech credibility without causing cognitive fatigue or performance degradation.

---

## 2. Core Motion Stack

### 2.1 Smooth Scrolling: Lenis (`lenis`)
- **Package**: `lenis` (installed via npm).
- **Architecture**: Implemented as a root-level client wrapper: `src/components/motion/SmoothScrollProvider.tsx`.
- **Configuration**:
  ```ts
  const lenis = new Lenis({
    duration: 1.1,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    syncTouch: false,
  });
  ```
- **GSAP Integration**: Connected directly via `lenis.on('scroll', ScrollTrigger.update)`. Animation frame driven via `requestAnimationFrame(raf)`.
- **Reduced Motion Handling**: Bypassed immediately if `window.matchMedia('(prefers-reduced-motion: reduce)').matches`.
- **Cleanup**: `cancelAnimationFrame` and `lenis.destroy()` on component unmount.

### 2.2 Kinetic Hero Background: `HeroCanvas.tsx`
- **Concept**: Dynamic WebGL/Canvas particle constellation representing interconnected digital systems, API nodes, and data streams.
- **Node Palette**: `#4D7CFF` (Electric Azure), `#3D6EF5` (Cobalt), `#7C5CFF` (Violet), `#9E85FF`.
- **Interactive Proximity**: Tracks mouse pointer coordinates within `140px` radius. Particles gently accelerate away from the pointer, simulating magnetic deflection.
- **Connecting Vectors**: Vectors draw between particles when distance is under `130px`, with alpha scaled proportionally to proximity.
- **Ambient Radial Shader**: Canvas background draws an ambient radial gradient spotlight in `#3D6EF5` and `#7C5CFF` at 5% to 8% opacity.
- **Fallback**: When `prefers-reduced-motion` is active, particle physics and loop loops are halted; a static ambient spotlight is drawn once.

### 2.3 Character Decryption: React Bits `DecryptedText.tsx`
- **Source**: Authentic official React Bits component pattern (`src/components/react-bits/DecryptedText.tsx`).
- **Behavior**: Scrambles characters sequentially at `40ms–50ms` intervals using a high-tech alphanumeric and symbol alphabet until settling on final text.
- **Triggers**:
  - `animateOn="view"`: Triggers via `IntersectionObserver` when scrolled into view.
  - `animateOn="hover"`: Scrambles on mouse enter and re-settles on exit.
- **Accessibility**: Includes `<span className="sr-only">{text}</span>` and `aria-hidden="true"` on animated characters so screen readers read the clean text without stutter.

### 2.4 Timeline Sequencing: GSAP & `@gsap/react`
- **Setup**: `useGSAP` hook scoped to container refs.
- **Hero Entrance**:
  - `badgeRef`: `opacity: 0, y: -16, duration: 0.6`
  - `headlineRef`: `opacity: 0, y: 28, duration: 0.8` (offset `-=0.3s`)
  - `subtextRef`: `opacity: 0, y: 20, duration: 0.7` (offset `-=0.4s`)
  - `ctaRef`: `opacity: 0, y: 18, duration: 0.6` (offset `-=0.4s`)
  - `cardsRef.children`: `opacity: 0, y: 24, stagger: 0.15s, duration: 0.8s` (offset `-=0.3s`)
- **Process Step Timeline**:
  - Uses `ScrollTrigger` to animate 4 lifecycle steps sequentially as user scrolls down to `#process`.
- **Easing**: Exponential and cubic deceleration (`power3.out`).

---

## 3. Performance & Resource Verification

- **Frame Rate**: Constant 60 FPS verified during active scrolling and mouse interaction.
- **CPU Overhead**: Canvas particle calculation capped at 65 nodes on desktop and 30 nodes on mobile devices.
- **Memory Footprint**: All event listeners (`resize`, `mousemove`, `mouseleave`) and animation frame loops are cancelled upon unmount.
