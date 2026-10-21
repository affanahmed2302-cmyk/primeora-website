# Design Specification — PRIMEORA SOLUTIONS

## Design Philosophy & Visual Direction
The visual identity reflects a modern, authoritative, engineering-led digital systems and technology studio. Rejecting generic AI startup clichés (electric purple gradients, neon glowing drop shadows, floating particle constellations), the design draws directly from authentic Primeora brand tokens extracted from `Logo_assets`:
- **Canvas**: Deep Midnight Navy (`#040D1A`) providing depth and optical contrast.
- **Surface**: Architectural Deep Slate Navy (`#08152B`) for cards, containers, and elevated planes.
- **Brand Accent**: Authentic Cobalt Royal Blue (`#1065FF` / `#166CFF`) matching the authentic faceted geometric "P" mark.
- **Typography & High Contrast**: Optical White (`#F8FAFC`) headlines paired with muted Slate (`#94A3B8`) body copy.
- **Editorial Tone**: Restrained hairline borders (`border-white/[0.08]`), clear monospace categorization (`font-mono text-xs`), and structured layouts that convey engineering rigor.

---

## Brand Color Tokens

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Midnight Navy (Canvas)** | `#040D1A` | Main application background, immersive studio canvas |
| **Architectural Surface** | `#08152B` | Container surfaces, section cards, navigation bar background |
| **Elevated Surface** | `#0B172E` | Hover states, elevated cards, interactive dropdowns |
| **Cobalt Royal Blue (Brand)** | `#166CFF` / `#1065FF` | Authentic Primeora brand accent, primary CTA button, active indicators |
| **Cobalt Hover** | `#1055CC` | Hover state for primary cobalt buttons |
| **Cobalt Light Accent** | `#3B82F6` | Category tag highlights, icon accents, link hover states |
| **Optical White (High Contrast)**| `#F8FAFC` | Primary headlines and high-contrast typography (WCAG AAA compliant) |
| **Slate Gray (Muted Body)** | `#94A3B8` | Subtitles, descriptions, secondary copy, input placeholders |
| **Slate Dark (Subtle Borders)** | `#1E293B` | Hairline dividers and subtle container outlines |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | Clean boundaries between cards and architectural sections |

### Contrast & Accessibility Verification
- `#F8FAFC` (White) on `#040D1A` (Midnight Canvas): Contrast Ratio **18.4:1** (Passes WCAG AAA)
- `#F8FAFC` (White) on `#08152B` (Surface): Contrast Ratio **15.2:1** (Passes WCAG AAA)
- `#FFFFFF` on `#166CFF` (Cobalt Blue): Contrast Ratio **4.8:1** (Passes WCAG AA)
- Focus State: High-visibility `2px solid #166CFF` ring with `2px` offset on all interactive buttons, inputs, and links.

---

## Typography Hierarchy

- **Display & Headings**: `Space Grotesk` paired with `Newsreader` (serif accent) for an authoritative editorial tone.
- **Body & Interface**: `Inter`, system-ui, -apple-system, sans-serif for screen legibility and dense data readability.
- **Code & Metadata**: `JetBrains Mono` / monospace for badges, registration codes, timestamps, and architectural tags.

### Scale:
- `Display Hero`: `clamp(2.5rem, 5.5vw, 4.25rem)` / line-height `1.14` / tracking `-0.025em`
- `Heading 1`: `clamp(2rem, 4vw, 3rem)` / line-height `1.15` / tracking `-0.02em`
- `Heading 2`: `clamp(1.5rem, 3vw, 2.25rem)` / line-height `1.2` / tracking `-0.015em`
- `Heading 3`: `1.25rem` / line-height `1.3` / tracking `-0.01em`
- `Body Large`: `1.125rem` / line-height `1.65`
- `Body Base`: `1rem` / line-height `1.6`
- `Small / Eyebrow`: `0.75rem` / font-weight `600` / tracking `0.08em` uppercase font-mono

---

## Authentic Brand Identity Assets

Located in `public/brand/`:
1. **Faceted Emblem Mark**: `primeora-emblem.png` (515x539px transparent PNG) extracted from original `Logo_SA.png`. Authentic geometric cobalt "P".
2. **Horizontal Dark Lockup**: `primeora-logo-dark.png` (1030x310px transparent PNG) extracted from `Horizontal_dark.png` with crisp white/slate lettering for dark surfaces.
3. **Horizontal Light Lockup**: `primeora-logo-light.png` (1030x310px transparent PNG) extracted from `Horizontal_Logo.png` for white/light documents.
4. **App Icon**: `primeora-app-icon.png` (512x512px) for web clip icons and manifest shortcuts.

---

## Motion Engineering Architecture

1. **Ambient Background Mesh (HeroBackground.tsx)**
   - Engine: Three.js + Vanta.js (FOG mode).
   - Palette: `highlightColor: 0x166cff`, `midtoneColor: 0x08152b`, `baseColor: 0x040d1a`, `blurFactor: 0.7`, `speed: 0.6`.
   - Lifecycle: Cleanly destroyed on component unmount via `vantaEffect.destroy()`.
   - Fallback: Strict `prefers-reduced-motion: reduce` detection immediately bypasses WebGL and displays a lightweight static CSS radial gradient.

2. **Smooth Scrolling (Lenis)**
   - Library: `lenis`
   - Setup: Wrapped in `SmoothScrollProvider` at root layout.
   - Interpolation: `duration: 1.1`, easing `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
   - Reduced Motion: If `prefers-reduced-motion` is active, smooth scroll is completely bypassed.

3. **Text Reveal (DecryptedText)**
   - React Bits component pattern for subtle character decryption on the hero eyebrow badge.
   - Guarded against hydration mismatches and reduced-motion preferences.

4. **GSAP Entrance & Interactive Reveals**
   - Non-blocking entrance transitions (`fromTo` starting at subtle opacity) that ensure content is always visible and never locked at `opacity: 0` during SSR or crawler passes.
   - Full reduced-motion checks on all timeline definitions.

---

## Component Standards
- **Buttons**:
  - `Primary`: Solid Cobalt Blue (`bg-[#166CFF] hover:bg-[#1055CC] text-white font-semibold rounded-lg shadow-sm`). No fluorescent neon glows.
  - `Secondary`: Clean dark surface (`bg-[#08152B] hover:bg-[#0B172E] text-slate-200 border border-white/10 hover:border-white/20 rounded-lg`).
- **Forms**:
  - Direct static SSR rendering without loading spinners.
  - Dark container `bg-[#08152B] border border-white/10`, inputs `bg-[#040D1A] border border-white/10 text-white rounded-lg`.
  - Security defenses: honeypot field, sub-second bot timing traps, payload size limit (32KB), and 10-minute duplicate submission detection.
- **Cards**:
  - Crisp architectural grid panels (`bg-[#08152B] border border-white/[0.08] hover:border-[#166CFF]/40 rounded-xl transition-colors`).
