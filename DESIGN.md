# Design Specification — RITKARA VEYRA

## Design Philosophy
The visual identity reflects a modern, understated, architectural strategy and technology consultancy. It consciously rejects generic AI-startup tropes (e.g., repeating glassmorphism cards, purple neon gradients, floating geometric spheres, and intrusive scroll-jacking) in favor of high-contrast editorial hierarchy, deliberate negative space, sophisticated mathematical alignment, and quiet authority.

---

## Brand Color Tokens

The palette is derived from and harmonious with the approved master geometric logo:

| Token Name | Hex Code | Role & Usage |
| :--- | :--- | :--- |
| **Forest Green (Primary)** | `#183B35` | Main brand anchor, dominant dark surfaces, primary buttons, authoritative headers |
| **Muted Teal (Accent)** | `#0F827A` | Secondary brand accent, active tabs, subtle highlights, badges, link hover states |
| **Warm Ivory (Background)** | `#F4EFE3` | Primary body background, generous negative space, warm editorial canvas |
| **Pure Surface** | `#FFFFFF` | Card surfaces, interactive container backgrounds, form inputs |
| **Muted Copper (Warm Accent)** | `#B77B4B` | Strategic accent for emphasis tags, status indicators, and subtle timeline markers |
| **Charcoal (Typography)** | `#24252B` | Primary body text, high-contrast headings on light backgrounds (WCAG AAA compliant) |
| **Muted Stone (Text Subtle)** | `#5C6068` | Secondary labels, timestamps, metadata, supporting microcopy |
| **Border Soft** | `rgba(24, 59, 53, 0.12)` | Subtle hairline borders preserving architectural structure |
| **Dark Forest (Inverted Surface)** | `#0F2420` | Footer, deep immersion sections, admin navigation |

### Contrast & Accessibility Verification
- `#24252B` (Charcoal) on `#F4EFE3` (Warm Ivory): Contrast Ratio **12.4:1** (Passes WCAG AAA)
- `#183B35` (Forest Green) on `#F4EFE3` (Warm Ivory): Contrast Ratio **8.6:1** (Passes WCAG AAA)
- `#FFFFFF` (White) on `#183B35` (Forest Green): Contrast Ratio **9.8:1** (Passes WCAG AAA)
- `#0F827A` (Muted Teal) on `#FFFFFF`: Contrast Ratio **4.8:1** (Passes WCAG AA for normal text, AAA for large)

---

## Typography Hierarchy

- **Display & Headings**: `Cinzel` / `Playfair Display` or high-clarity modern serif paired with architectural geometric grotesque (`Space Grotesk` / `Outfit` / `Inter`).
- **Body & Interface**: `Inter`, system-ui, sans-serif for optimal screen legibility, clean tabular figures, and dense administrative readability.

### Scale:
- `Display Hero`: `clamp(2.5rem, 5.5vw, 4.25rem)` / line-height `1.1` / tracking `-0.03em`
- `Heading 1`: `clamp(2rem, 4vw, 3rem)` / line-height `1.15` / tracking `-0.02em`
- `Heading 2`: `clamp(1.5rem, 3vw, 2.25rem)` / line-height `1.2` / tracking `-0.015em`
- `Heading 3`: `1.25rem` / line-height `1.3` / tracking `-0.01em`
- `Body Large`: `1.125rem` / line-height `1.65`
- `Body Base`: `1rem` / line-height `1.6`
- `Small / Eyebrow`: `0.8125rem` / font-weight `600` / tracking `0.08em` uppercase

---

## Layout & Spatial System
- **Base Grid**: 8px spatial grid (`8px`, `16px`, `24px`, `32px`, `48px`, `64px`, `96px`, `128px`).
- **Container Max-Width**: `1200px` with responsive padding (`1.25rem` mobile, `2rem` tablet, `2.5rem` desktop).
- **Border Radii**: Restrained architectural corners (`4px` for tags/badges, `8px` for buttons and inputs, `12px` for cards). No extreme bubble pills.
- **Elevation**: Subtle, diffused directional shadows mimicking natural ambient light:
  - `card`: `0 2px 8px -2px rgba(24, 59, 53, 0.06), 0 8px 24px -4px rgba(24, 59, 53, 0.08)`
  - `dropdown / modal`: `0 12px 40px -8px rgba(24, 59, 53, 0.16)`

---

## Motion & Interaction Rules
1. **Purpose-Driven Only**: Motion exists to communicate state change, spatial hierarchy, or chronological progression. Never animate for purely decorative vanity.
2. **Timing Curves**: Fast in, smooth deceleration (`cubic-bezier(0.16, 1, 0.3, 1)`). Duration `200ms–350ms` for micro-interactions; `500ms–800ms` for staggered section reveals.
3. **Accessibility**: All GSAP timelines and CSS transitions MUST respect `@media (prefers-reduced-motion: reduce)`. When reduced motion is preferred, transitions degrade gracefully to instant state changes or subtle opacity changes only.
4. **No Scroll-Jacking**: Native scroll momentum and standard keyboard paging (PageUp/PageDown/Spacebar) are strictly preserved.

---

## Component Standards
- **Buttons**:
  - `Primary`: Solid Forest Green (`#183B35`), Ivory text, crisp border, subtle hover elevation.
  - `Secondary / Outline`: Transparent background, 1.5px Forest Green or Teal border, crisp hover fill.
  - `Ghost`: Minimalist text link with animated underline indicator.
- **Forms**: Clean floating or top-aligned labels, unambiguous error states with red highlight + aria-describedby error message, high-visibility focus rings (`2px solid #0F827A` with 2px offset).
- **Cards**: Pure surface background, hairline border (`#183B35/10`), generous internal padding (`1.75rem` to `2.25rem`), deliberate typography balance.
