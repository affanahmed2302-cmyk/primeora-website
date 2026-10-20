# Design Specification — PRIMEORA SOLUTIONS

## Design Philosophy
The visual identity reflects a modern, authoritative, engineering-led digital systems and technology studio. Grounded in the authentic Primeora aesthetic extracted from the firm's foundational brand tokens and portfolio presence, the design combines a deep obsidian background (`#07090F`) with high-voltage electric azure (`#3D6EF5` / `#4D7CFF`), vibrant violet gradients (`#7C5CFF`), and ultra-crisp typography (`Space Grotesk` headings paired with `Inter` body text).

---

## Brand Color Tokens

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Obsidian (Primary Dark)** | `#07090F` | Main application background, canvas, immersive dark space |
| **Obsidian Surface** | `#0B0F1A` | Secondary surface, page header backgrounds, navigation background |
| **Card Surface** | `#101524` | Interactive container surfaces, cards, form inputs |
| **Card Elevated** | `#171E33` | Hover states, elevated modal surfaces, active cards |
| **Electric Azure (Primary Accent)** | `#3D6EF5` | Primary brand accent, button gradients, active states, key icons |
| **Azure Light / Bright** | `#4D7CFF` | Vector vectors, highlight borders, badge pings, interactive focus rings |
| **Electric Violet (Secondary Gradient)** | `#7C5CFF` | Secondary gradient anchor, category badges, prism facets |
| **Platinum (High-Contrast Text)** | `#F0F2F7` | Primary headlines and high-contrast typography (WCAG AAA compliant) |
| **Slate Gray (Muted Body)** | `#94A3B8` | Subtitles, descriptions, secondary copy, input placeholders |
| **Hairline Border** | `rgba(255, 255, 255, 0.08)` | Architectural boundary lines, card borders, table dividers |
| **Active Glow Border** | `rgba(77, 124, 255, 0.35)` | Interactive hover glow, selected cards, focus states |

### Contrast & Accessibility Verification
- `#F0F2F7` (Platinum) on `#07090F` (Obsidian): Contrast Ratio **17.8:1** (Passes WCAG AAA)
- `#4D7CFF` (Azure Bright) on `#07090F` (Obsidian): Contrast Ratio **5.2:1** (Passes WCAG AA for normal text, AAA for large/UI components)
- `#FFFFFF` (White) on `#3D6EF5` (Azure): Contrast Ratio **4.6:1** (Passes WCAG AA)
- Focus State: Visible `2px solid #4D7CFF` ring with `3px` offset on all interactive buttons and inputs.

---

## Typography Hierarchy

- **Display & Headings**: `Space Grotesk`, sans-serif. Geometric, high-character grotesque with distinct letterforms and tight tracking (`-0.02em` to `-0.03em`).
- **Body & Interface**: `Inter`, system-ui, -apple-system, sans-serif for optimal screen legibility and dense data readability.
- **Code & Metadata**: `JetBrains Mono` / monospace for badges, registration codes, timestamps, and architectural tags.

### Scale:
- `Display Hero`: `clamp(2.5rem, 5.5vw, 4.25rem)` / line-height `1.12` / tracking `-0.025em`
- `Heading 1`: `clamp(2rem, 4vw, 3rem)` / line-height `1.15` / tracking `-0.02em`
- `Heading 2`: `clamp(1.5rem, 3vw, 2.25rem)` / line-height `1.2` / tracking `-0.015em`
- `Heading 3`: `1.25rem` / line-height `1.3` / tracking `-0.01em`
- `Body Large`: `1.125rem` / line-height `1.65`
- `Body Base`: `1rem` / line-height `1.6`
- `Small / Eyebrow`: `0.75rem` / font-weight `600` / tracking `0.1em` uppercase font-mono

---

## Motion Engineering Architecture

1. **Smooth Scrolling (Lenis)**
   - Library: `lenis`
   - Setup: Wrapped in `SmoothScrollProvider` at root layout.
   - Interpolation: `duration: 1.1`, easing `t => Math.min(1, 1.001 - Math.pow(2, -10 * t))`.
   - Synchronization: Connected to GSAP `ScrollTrigger.update`.
   - Reduced Motion: If `prefers-reduced-motion` is active, smooth scroll is completely disabled.

2. **Hero Interactive WebGL Particle Network (HeroCanvas)**
   - Custom high-efficiency 60fps canvas engine rendering dynamic node vectors with mouse proximity acceleration.
   - Node colors: `#4D7CFF`, `#3D6EF5`, `#7C5CFF`.
   - Fallback: Renders a static radial gradient ambient spotlight when reduced motion is detected.

3. **Text Reveal (React Bits DecryptedText)**
   - Official React Bits component pattern for cyber/tech character decryption.
   - Used for the hero company badge and key section anchors.

4. **GSAP Entrance & Scroll Timelines**
   - `@gsap/react` `useGSAP` hook used in `HeroSection` and `ProcessSection`.
   - Timeline sequencing with staggered reveals (`stagger: 0.15s`, `ease: 'power3.out'`).
   - All timelines guard against reduced motion preferences.

---

## Component Standards
- **Buttons**:
  - `Primary`: `bg-gradient-to-r from-azure to-violet`, white text, rounded-xl, hover elevation and box shadow glow (`0 4px 25px rgba(61,110,245,0.4)`).
  - `Secondary`: `bg-white/5 border border-white/10`, white/platinum text, rounded-xl, hover `bg-white/10 hover:border-azure/40`.
- **Forms**:
  - Dark container `bg-[#0B0F1A]/90`, dark inputs `bg-[#101524] border border-white/10 text-white`, explicit honeypot bot trap, submission timestamp verification, unambiguous red error messages.
- **Cards**:
  - High-performance glassmorphism (`bg-[#0B0F1A]/80 backdrop-blur-xl border border-white/10 hover:border-azure/40 hover:-translate-y-1 transition-all duration-300`).
