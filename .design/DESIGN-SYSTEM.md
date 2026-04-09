# Amplifier Masterclass Design System

| | |
|---|---|
| **Version** | 2.0 |
| **Date** | 2026-04-01 |
| **Applies to** | `amplifier-masterclass-final.html` (dual-mode educational site + presentation) |

This document is the single source of truth for every visual decision in the Amplifier Masterclass. It defines colors, typography, spacing, components, layout, motion, and interaction — all with exact values. Companion file `tokens.css` implements these values as CSS custom properties. If this document and `tokens.css` disagree, this document wins.

The aesthetic is editorial and technical — a well-designed engineering textbook, not a marketing site. The Lookbook "AETHON" template (18-futuristic-saas) provides the foundation; the Amplifier brand palette and serif/sans-serif pairing provide the identity.

---

## How to Use This File

1. **Read this first.** The spec explains *why* each decision was made. The tokens file just gives you the values.
2. **Reference `tokens.css` during implementation.** Every token name in this document maps 1:1 to a CSS custom property in `tokens.css`.
3. **Component Patterns (§8) are copy-paste ready.** Each includes a CSS block with `/* resolved value */` comments and an ASCII layout diagram.
4. **Do/Don't (§13) is a quick-check summary.** It has no rationale — rationale lives in the earlier sections where each rule is introduced.

---

## Table of Contents

1. [Color System](#1-color-system)
2. [Typography](#2-typography)
3. [Spacing](#3-spacing)
4. [Border Radius](#4-border-radius)
5. [Shadows & Elevation](#5-shadows--elevation)
6. [Motion & Transitions](#6-motion--transitions)
7. [Z-Index Layers](#7-z-index-layers)
8. [Component Patterns](#8-component-patterns)
9. [Layout](#9-layout)
10. [Interaction](#10-interaction)
11. [Accessibility](#11-accessibility)
12. [Icons](#12-icons)
13. [Do / Don't Reference](#13-do--dont-reference)

---

## 1. Color System

**Guiding principle:** One accent hue (blue → purple gradient). No second accent. No semantic color system — this is an educational document, not an application. Semantic colors appear only in two scoped visualizations (§1.6).

### 1.1 Dark Palette

Most sections use the dark palette. The base is a deep navy, not pure black — pure black reads as cheap on screens and creates harsh contrast that fatigues the eye.

| Token | Value | Purpose |
|---|---|---|
| `--dark` | `#0f172a` | Primary section background. The default. |
| `--dark-deep` | `#080f1e` | Hero, full-bleed sections, code block interiors |
| `--dark-card` | `#1e293b` | Solid card backgrounds (alternative to glass) |
| `--dark-card-hover` | `#263348` | Solid card hover state |

**Usage rules:**
- `var(--dark)` is the ground plane. Every dark section starts here.
- `var(--dark-deep)` sits *below* the ground — use for recessed areas (code blocks, graph containers) and hero backgrounds.
- `var(--dark-card)` is the opaque alternative to glassmorphism. Use when `backdrop-filter` is unavailable or unnecessary.
- Never use `#000000`. It lacks the blue undertone that ties the palette to the brand gradient.

**Critical note — color choice:** `#0f172a` is Tailwind's `slate-900`. Dark enough to feel immersive, light enough to render text crisply. The subtle blue undertone complements the brand gradient.

### 1.2 Light Palette

Light sections break rhythm every 2–3 dark sections. They provide visual rest and prevent the dark palette from becoming monotonous.

| Token | Value | Purpose |
|---|---|---|
| `--surface` | `#f8f9fa` | Light section background |
| `--surface-card` | `#ffffff` | Cards on light sections |
| `--white` | `#ffffff` | Pure white (text on dark, card backgrounds) |

**Usage rules:**
- Light sections are accent sections, not the default. The document is predominantly dark.
- Never place a glass card on a light background. Use `var(--surface-card)` with a solid border instead.

### 1.3 Brand Accent

The Amplifier gradient (blue → purple) is the only color accent. No second hue. No red, green, or orange as design accents — they appear only in the scoped semantic colors (§1.6).

| Token | Value | Purpose |
|---|---|---|
| `--amp-blue` | `#0092F3` | Gradient start. Flat accent for links on light. |
| `--amp-azure` | `#0082EB` | Primary flat accent: links, inline emphasis, borders on hover |
| `--amp-mid` | `#0066E0` | Mid-range for hover states |
| `--amp-blue-purple` | `#234FE7` | Transition point in gradient |
| `--amp-violet` | `#5A24D7` | Towards purple end |
| `--amp-purple` | `#7C17D3` | Gradient end |
| `--amp-deep` | `#002D79` | Deep accent for text on light backgrounds |

| Token | Value | Purpose |
|---|---|---|
| `--amp-gradient` | `linear-gradient(135deg, #0092F3, #7C17D3)` | CTAs, hero highlights, section label dots, icon containers, gradient-border cards |
| `--amp-gradient-subtle` | `linear-gradient(135deg, rgba(0,146,243,0.15), rgba(124,23,211,0.15))` | Background tints |
| `--amp-gradient-text` | `linear-gradient(135deg, #0092F3, #7C17D3)` | For `background-clip: text` effects |

| Token | Value | Purpose |
|---|---|---|
| `--amp-glow` | `rgba(0, 146, 243, 0.30)` | Box-shadow glow on hover/focus |
| `--amp-tint` | `rgba(0, 146, 243, 0.15)` | Tag backgrounds, icon circles, subtle highlights |
| `--amp-subtle` | `rgba(0, 146, 243, 0.06)` | Card hover tints, section background variations |

**Usage rules:**
- `var(--amp-azure)` is the default flat accent — use for links, icon fills, and hover border transitions.
- `var(--amp-gradient)` is the premium treatment — use for the section label dot, gradient-border cards, and hero highlights. Not for body links.
- `var(--amp-deep)` is the only accent that works as text on light backgrounds with sufficient contrast (WCAG AA: 7.2:1 against `--surface`).

### 1.4 Text Colors

| Token | Value | Context | Contrast vs bg |
|---|---|---|---|
| `--text-bright` | `#ffffff` | Headlines on dark | 15.4:1 vs `--dark` |
| `--text-body-dark` | `rgba(255, 255, 255, 0.6)` | Body on dark | 7.1:1 vs `--dark` — passes AA |
| `--text-muted-dark` | `rgba(255, 255, 255, 0.4)` | Captions on dark | 4.8:1 vs `--dark` — passes AA for large text only |
| `--text-primary` | `#111827` | Headlines on light | 16.0:1 vs `--surface` |
| `--text-body` | `#4B5563` | Body on light | 7.5:1 vs `--surface` — passes AA |
| `--text-muted` | `#9CA3AF` | Captions on light | 3.0:1 vs `--surface` — large text only |

**Usage rules:**
- Body text must always pass WCAG AA (4.5:1). `var(--text-body-dark)` and `var(--text-body)` both pass.
- Muted text (`--text-muted-dark`, `--text-muted`) is reserved for non-essential metadata: captions, dates, section numbers. It passes AA only at large text sizes (18px+ or 14px bold).
- Never set body copy in `var(--text-muted-dark)` or `var(--text-muted)`.

### 1.5 Borders

| Token | Value | Context |
|---|---|---|
| `--border-dark` | `rgba(255, 255, 255, 0.08)` | Card/element borders on dark backgrounds |
| `--border-dark-hover` | `rgba(255, 255, 255, 0.14)` | Hover state on dark |
| `--border-light` | `rgba(0, 0, 0, 0.07)` | Card/element borders on light backgrounds |
| `--border-light-hover` | `rgba(0, 0, 0, 0.12)` | Hover state on light |

**Usage rules:**
- All borders are 1px solid. No 2px borders except the callout left accent (3px) and cascade left accent (4px).
- Border transitions use `var(--duration-base)` (250ms) with `ease` timing.

### 1.6 Semantic Colors (Scoped)

These colors are **not** part of the general palette. They appear in exactly two places: the Tools vs Hooks comparison panel and the Hook Priority Cascade waterfall. Do not use them anywhere else.

**Tools vs Hooks (Section 7 comparison panel):**

| Token | Value | Purpose |
|---|---|---|
| `--color-tools-border` | `rgba(34, 197, 94, 0.20)` | Green border — Tools panel |
| `--color-tools-bg` | `rgba(34, 197, 94, 0.05)` | Green tint — Tools panel background |
| `--color-tools-text` | `rgba(34, 197, 94, 0.70)` | Green — Tools label text |
| `--color-hooks-border` | `rgba(239, 68, 68, 0.20)` | Red border — Hooks panel |
| `--color-hooks-bg` | `rgba(239, 68, 68, 0.05)` | Red tint — Hooks panel background |
| `--color-hooks-text` | `rgba(239, 68, 68, 0.70)` | Red — Hooks label text |

**Hook Priority Cascade (Section 7 waterfall):**

| Token | Value | Action | Rationale |
|---|---|---|---|
| `--cascade-deny` | `#EF4444` | Deny | Stop. Fail-closed. |
| `--cascade-ask-user` | `#F59E0B` | AskUser | Pause. Human decision. |
| `--cascade-inject` | `#3B82F6` | InjectContext | Information flowing in. |
| `--cascade-modify` | `#8B5CF6` | Modify | Transformation. |
| `--cascade-continue` | `#22C55E` | Continue | Go. Default. |

**Rule:** Assign each cascade token to a local `--cascade-color` property per level. These tokens never appear outside the cascade component.

---

## 2. Typography

**Guiding principle:** Typography creates the editorial quality. The serif/sans-serif pairing is what makes this read like a well-set engineering publication. Get it wrong, and the entire design collapses into a generic landing page.

### 2.1 Font Stacks

| Token | Value | Fallback |
|---|---|---|
| `--font-serif` | `'Lora', serif` | System serif |
| `--font-sans` | `'Inter', sans-serif` | System sans |
| `--font-mono` | `'Space Grotesk', sans-serif` | System sans (not monospace — see §2.2) |
| `--font-code` | `'SF Mono', 'Fira Code', 'Cascadia Code', monospace` | System monospace |

**Google Fonts load:**

```html
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Lora:ital,wght@0,400;1,400&family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet">
```

### 2.2 Font Roles

**Rule of thumb:** Lora for what you READ. Inter for what you LEARN. Space Grotesk for what you REFERENCE.

| Font | Role | Weights | Where |
|---|---|---|---|
| Lora (serif) | Editorial voice — headlines | 400, 400i | All h1, h2, h3. Section titles. Closing thought. Callout text. |
| Inter (sans-serif) | Workhorse — body text | 400, 500, 600 | Body paragraphs, descriptions, explanations, speaker notes |
| Space Grotesk | Technical voice — labels | 400, 500, 700 | Section labels (all-caps), numbers/stats, code labels, "Amplifier" wordmark |
| Code stack | Actual code | 400 | Code blocks, inline code, YAML/Python snippets |

**Critical note — Lora weight:** Always 400 (regular). **Never bold.** Lora at 400 has enough stroke contrast to command attention at large sizes. Bold Lora looks heavy and clumsy. The restraint of weight 400 is what gives it editorial quality.

**Critical note — Space Grotesk vs Code:** `--font-mono` is Space Grotesk, a geometric sans-serif with monospace *heritage* — it reads as "technical" without being a code font. For actual code (Python snippets, YAML blocks), use `--font-code`.

### 2.3 Type Scale

All sizes use `clamp()` for fluid scaling between 375px (mobile) and 1200px+ (desktop). No breakpoint-based jumps — type scales smoothly.

| Token | Value | Computed range | Usage |
|---|---|---|---|
| `--text-xs` | `0.75rem` | 12px | Small labels, metadata |
| `--text-sm` | `0.875rem` | 14px | Captions, footnotes |
| `--text-base` | `1rem` | 16px | Body text |
| `--text-lg` | `1.125rem` | 18px | Lead paragraphs, card text |
| `--text-xl` | `1.25rem` | 20px | Subheadings |
| `--text-2xl` | `clamp(1.5rem, 2vw, 1.75rem)` | 24–28px | h3 section titles |
| `--text-3xl` | `clamp(1.875rem, 3vw, 2.25rem)` | 30–36px | h2 section titles |
| `--text-4xl` | `clamp(2.25rem, 4vw, 3rem)` | 36–48px | h1 major section titles |
| `--text-5xl` | `clamp(2.75rem, 5vw, 3.75rem)` | 44–60px | Hero headline (one per page) |

### 2.4 Letter Spacing & Line Height

| Context | Font | Letter spacing | Line height |
|---|---|---|---|
| Headlines (h1–h3) | Lora 400 | `-0.02em` | `1.15` |
| Body text | Inter 400 | `0` | `1.6` |
| Subheadings | Inter 500 | `0` | `1.3` |
| Section labels (all-caps) | Space Grotesk 500 | `0.08em` | Inherited |
| Wordmark ("Amplifier") | Space Grotesk 700 | `-0.01em` | `1` |
| Inline numbers/stats | Space Grotesk 400 | `0` | Inherited |

**Usage rules:**
- Lora gets tight tracking (`-0.02em`) because editorial convention tightens serif display text.
- Inter gets native spacing (`0`) because its metrics are already optimized for screen.
- Space Grotesk all-caps labels get wide tracking (`0.08em`) for readability at small sizes.

---

## 3. Spacing

**Guiding principle:** 8px base unit. Everything is a multiple of 8. This creates visual rhythm without requiring conscious calculation.

### 3.1 Scale

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | `4px` | Tight gaps: icon + inline text |
| `--space-sm` | `8px` | Base unit. Label gaps, small padding. |
| `--space-md` | `16px` | Grid gaps, element margins |
| `--space-lg` | `24px` | Card internal padding (compact) |
| `--space-xl` | `32px` | Card internal padding (standard) |
| `--space-2xl` | `48px` | Below headlines, between content blocks |
| `--space-3xl` | `64px` | Between major content groups within a section |
| `--space-4xl` | `80px` | Hero-level spacing only |
| `--space-section` | `120px` | Vertical section padding (top and bottom) |

### 3.2 Layout Constants

| Token | Value | Purpose |
|---|---|---|
| `--container-max` | `1200px` | Maximum content width |
| `--container-pad` | `40px` | Horizontal padding (desktop) |
| `--grid-gap` | `16px` | Default gap for card grids and asymmetric layouts |

**Rule:** `--container-pad` changes at breakpoints (see §9.3). The other values are constant.

### 3.3 Section Rhythm

Whitespace is generous. It prevents the dense, wall-of-text feeling.

| Relationship | Token | Value |
|---|---|---|
| Section label → Headline | `--space-md` | 16px |
| Headline → First paragraph | `--space-2xl` | 48px |
| Paragraph → Paragraph | `--space-lg` | 24px |
| Content block → Content block | `--space-3xl` | 64px |
| Card grid → Next content | `--space-2xl` | 48px |

**Usage rules:**
- On mobile (< 768px), `--space-section` reduces to `64px` and `--space-2xl` to `32px`.
- On small mobile (< 480px), `--space-section` reduces to `48px`.

---

## 4. Border Radius

Subtle. Not toy-like. Rounded enough to feel modern, sharp enough to feel technical.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `6px` | Buttons, tags, small interactive elements |
| `--radius-md` | `12px` | Cards, code blocks |
| `--radius-lg` | `16px` | Feature cards, large panels |
| `--radius-xl` | `24px` | Hero-level cards (use sparingly) |
| `--radius-full` | `9999px` | Pills, icon circles |

**Usage rules:**
- The default card radius is `var(--radius-md)` (12px). Don't mix card radii within a section.
- `var(--radius-xl)` is reserved for hero elements. If used more than twice on the page, it stops looking special.

---

## 5. Shadows & Elevation

### 5.1 Dark Mode (Luminance Stepping)

**Guiding principle:** On dark backgrounds, traditional box-shadows are invisible — you cannot darken what is already dark. Depth is created through **luminance stepping**: lighter surfaces sit "above" darker surfaces.

| Level | Token | Value | Feels like |
|---|---|---|---|
| Ground | `--dark` | `#0f172a` | The section itself |
| Raised | `--glass-soft` | `rgba(255, 255, 255, 0.04)` | A resting card |
| Elevated | `--glass-strong` | `rgba(255, 255, 255, 0.08)` | A hovered card |
| Highlighted | `--amp-subtle` | `rgba(0, 146, 243, 0.06)` | Active/selected state |

**Rule:** Do not apply `box-shadow` for depth on dark backgrounds. It renders as invisible nothing. Use luminance stepping.

### 5.2 Light Mode

| Token | Value | Usage |
|---|---|---|
| `--shadow-light` | `0 1px 3px rgba(0, 0, 0, 0.06)` | Card resting state |
| `--shadow-light-hover` | `0 4px 12px rgba(0, 0, 0, 0.10)` | Card hover state |

### 5.3 Glassmorphism

Used for cards on dark backgrounds. Creates a frosted-glass effect that catches background elements (glow blobs, grid overlays).

| Token | Value | Purpose |
|---|---|---|
| `--glass-soft` | `rgba(255, 255, 255, 0.04)` | Glass card resting background |
| `--glass-strong` | `rgba(255, 255, 255, 0.08)` | Glass card hover background |
| `--glass-blur` | `blur(20px)` | `backdrop-filter` value |

**Critical note — performance:** `backdrop-filter` is GPU-accelerated on modern browsers but can cause jank on older mobile devices. The glass effect is progressive enhancement — the card is readable without it. Test on Safari iOS before shipping.

### 5.4 Glow Effects

Accent color diffusion. Used as `box-shadow` on dark backgrounds where traditional shadows fail.

| Token | Value | Usage |
|---|---|---|
| `--shadow-glow` | `0 0 30px rgba(0, 146, 243, 0.30)` | Card hover glow |
| `--shadow-glow-strong` | `0 0 60px rgba(0, 146, 243, 0.30), 0 0 120px rgba(0, 146, 243, 0.10)` | Gradient-border card hover |

**Usage rules:**
- Glow is hover-only. Never resting-state glow.
- `var(--shadow-glow-strong)` appears only on gradient-border cards (max 3 per page — see §8.4).

---

## 6. Motion & Transitions

**Guiding principle:** All motion is entrance-only and hover-reactive. Nothing loops, pulses, or auto-animates. Motion serves comprehension (drawing attention to entering content) and feedback (confirming interactions). It never serves decoration.

### 6.1 Duration Tokens

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Micro-interactions: buttons, toggles |
| `--duration-base` | `250ms` | Standard transitions: hover, focus, border color |
| `--duration-slow` | `400ms` | Deliberate transitions: panels, modals |
| `--duration-reveal` | `700ms` | Scroll-reveal entrance (fade + translateY) |

### 6.2 Easing Functions

| Token | Value | Character |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Fast start, natural deceleration. Default for reveals. |
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Slight overshoot. Button lift only. |

**Usage rules:**
- `var(--ease-out)` is the default for all entrance animations and scroll reveals.
- `var(--ease-spring)` is reserved for the button `translateY(-1px)` lift. Nowhere else.

### 6.3 GPU Acceleration Rule

**Rule:** Apply `will-change: transform, opacity` or `transform: translateZ(0)` to any element with an active transition. Remove the hint when idle.

```css
/* Example: card with transition */
.glass-card {
  will-change: transform, opacity;   /* Hint during transition */
  transition: all var(--duration-base) ease;
}
```

### 6.4 Reduced Motion

Respect `prefers-reduced-motion`. Zero all duration tokens so every consumer gets instant transitions for free.

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:   0.01ms;
    --duration-base:   0.01ms;
    --duration-slow:   0.01ms;
    --duration-reveal: 0.01ms;
  }
  .reveal {
    transition: none;
    opacity: 1;
    transform: none;
  }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
  }
}
```

**Critical note — reduced motion:** This is non-negotiable. The belt-and-suspenders approach (token override + universal selector) ensures nothing slips through. Tested against: scroll reveal, card hover, button lift, presentation slide transitions.

---

## 7. Z-Index Layers

Managed scale. No ad-hoc `z-index` values outside this table.

| Token | Value | Usage |
|---|---|---|
| `--z-base` | `1` | Default elevated content |
| `--z-card` | `10` | Cards on hover (lift above siblings) |
| `--z-sticky` | `100` | Sticky nav elements |
| `--z-overlay` | `1000` | Fullscreen graph overlay, presentation mode |

**Rule:** Every `z-index` in the codebase must reference a token. If you need a new layer, add it to the scale here first.

---

## 8. Component Patterns

Every component below includes: an ASCII box-drawing layout diagram, a copy-paste-ready CSS block with `/* resolved value */` comments after every `var()` reference, and usage rules.

### 8.1 Section (Dark / Light)

The fundamental layout unit. Each content section is a full-width band with consistent vertical padding and a centered container.

```
┌──────────────────────────────────────────────────────────────────────┐
│  section  (full viewport width, bg: --dark or --surface)            │
│  padding: 120px 0                                                   │
│  ┌────────────────────────────────────────────────────────────────┐  │
│  │  .container  (max-width: 1200px, margin: 0 auto)              │  │
│  │  padding: 0 40px                                              │  │
│  │                                                               │  │
│  │  ┌─ .section-label ──────────────────────────────┐            │  │
│  │  │  ● icon  SECTION TITLE                        │            │  │
│  │  └───────────────────────────────────────────────┘            │  │
│  │  ↕ 16px                                                       │  │
│  │  ┌─ h2 ─────────────────────────────────────────┐             │  │
│  │  │  Headline in Lora 400                         │             │  │
│  │  └──────────────────────────────────────────────┘             │  │
│  │  ↕ 48px                                                       │  │
│  │  ┌─ content ────────────────────────────────────┐             │  │
│  │  │  Body text, cards, code blocks, diagrams...  │             │  │
│  │  └──────────────────────────────────────────────┘             │  │
│  └────────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────────┘
```

```css
.section {
  padding: var(--space-section) 0;         /* 120px 0 */
  width: 100%;
}
.section.dark {
  background: var(--dark);                 /* #0f172a */
  color: var(--text-bright);              /* #ffffff */
}
.section.light {
  background: var(--surface);              /* #f8f9fa */
  color: var(--text-primary);             /* #111827 */
}
.section .container {
  max-width: var(--container-max);         /* 1200px */
  margin: 0 auto;
  padding: 0 var(--container-pad);         /* 0 40px */
}
```

**Usage rules:**
- Sections alternate dark/light. Pattern: 2–3 dark sections, then 1 light section, repeat.
- Some dark sections include a faint CSS grid overlay background (1px lines at `rgba(255,255,255,0.02)`) or decorative glow blobs (radial gradients at low opacity). These are progressive enhancement — content works without them.

### 8.2 Glass Card

The default card on dark backgrounds. Transparent with a frosted-glass effect.

```
┌─────────────────────────────────────────┐
│  1px solid rgba(255,255,255,0.08)       │
│  ┌───────────────────────────────────┐  │
│  │  padding: 32px                    │  │
│  │  backdrop-filter: blur(20px)      │  │
│  │                                   │  │
│  │  [icon]  Title                    │  │
│  │                                   │  │
│  │  Description text in Inter 400    │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│  background: rgba(255,255,255,0.04)     │
└─────────────────────────────────────────┘
```

```css
.glass-card {
  background: var(--glass-soft);           /* rgba(255,255,255,0.04) */
  border: 1px solid var(--border-dark);    /* rgba(255,255,255,0.08) */
  border-radius: var(--radius-md);         /* 12px */
  backdrop-filter: var(--glass-blur);      /* blur(20px) */
  -webkit-backdrop-filter: var(--glass-blur); /* blur(20px) — Safari */
  padding: var(--space-xl);               /* 32px */
  transition: background var(--duration-base) ease,
              border-color var(--duration-base) ease,
              box-shadow var(--duration-base) ease;
                                           /* 250ms ease */
}
.glass-card:hover {
  background: var(--glass-strong);         /* rgba(255,255,255,0.08) */
  border-color: var(--border-dark-hover);  /* rgba(255,255,255,0.14) */
  box-shadow: var(--shadow-glow);          /* 0 0 30px rgba(0,146,243,0.30) */
}
```

**Usage rules:**
- Glass cards appear only on dark sections. Never on light sections.
- Include `-webkit-backdrop-filter` for Safari support.
- Hover glow (`--shadow-glow`) is optional — omit for less-prominent cards.

### 8.3 Bordered Card (Light)

Clean, minimal card for light sections.

```
┌─────────────────────────────────────────┐
│  1px solid rgba(0,0,0,0.07)             │
│  ┌───────────────────────────────────┐  │
│  │  padding: 32px                    │  │
│  │  background: #ffffff              │  │
│  │                                   │  │
│  │  Title                            │  │
│  │                                   │  │
│  │  Description text                 │  │
│  │                                   │  │
│  └───────────────────────────────────┘  │
│  shadow: 0 1px 3px rgba(0,0,0,0.06)    │
└─────────────────────────────────────────┘
```

```css
.light-card {
  background: var(--surface-card);         /* #ffffff */
  border: 1px solid var(--border-light);   /* rgba(0,0,0,0.07) */
  border-radius: var(--radius-md);         /* 12px */
  padding: var(--space-xl);               /* 32px */
  box-shadow: var(--shadow-light);         /* 0 1px 3px rgba(0,0,0,0.06) */
  transition: border-color var(--duration-base) ease,
              box-shadow var(--duration-base) ease;
                                           /* 250ms ease */
}
.light-card:hover {
  border-color: var(--border-light-hover); /* rgba(0,0,0,0.12) */
  box-shadow: var(--shadow-light-hover);   /* 0 4px 12px rgba(0,0,0,0.10) */
}
```

**Usage rules:**
- Bordered cards appear only on light sections.
- No `backdrop-filter`. No glassmorphism.
- The resting shadow (`--shadow-light`) is intentionally subtle — the border does most of the visual separation.

### 8.4 Gradient-Border Card

The premium treatment. Reserved for the 2–3 most architecturally significant elements on the page: the Orchestrator card, the `inject_context` callout, and the System Prompt Factory.

```
┌═══════════════════════════════════════════┐
│  gradient border (blue → purple)          │
│  via background-clip: padding-box +       │
│       background: gradient on border-box  │
│  ┌─────────────────────────────────────┐  │
│  │  padding: 32px                      │  │
│  │  backdrop-filter: blur(20px)        │  │
│  │                                     │  │
│  │  [gradient icon]  Title             │  │
│  │                                     │  │
│  │  This is important enough for a     │  │
│  │  gradient border.                   │  │
│  │                                     │  │
│  └─────────────────────────────────────┘  │
│  hover: glow-strong (60px + 120px)        │
└═══════════════════════════════════════════┘
```

```css
.glow-card {
  border: 1px solid transparent;
  border-radius: var(--radius-md);         /* 12px */
  backdrop-filter: var(--glass-blur);      /* blur(20px) */
  -webkit-backdrop-filter: var(--glass-blur); /* blur(20px) — Safari */
  padding: var(--space-xl);               /* 32px */
  /* Gradient border via background-clip trick */
  background:
    linear-gradient(var(--dark-card), var(--dark-card)) padding-box,
                                           /* #1e293b inner fill */
    var(--amp-gradient) border-box;        /* blue→purple border */
  transition: box-shadow var(--duration-base) ease;
                                           /* 250ms ease */
}
.glow-card:hover {
  box-shadow: var(--shadow-glow-strong);   /* 0 0 60px ..., 0 0 120px ... */
}
```

**Usage rules:**
- **Maximum 3 gradient-border cards on the entire page.** If everything glows, nothing does.
- The three candidates: Orchestrator, `inject_context`, System Prompt Factory.
- Never combine with the regular glass card hover glow. The gradient border is the entire visual statement.

### 8.5 Section Label

The wayfinding system. Every section has a label above its headline.

```
● icon  THE KERNEL
│ │      │
│ │      └── Space Grotesk 500, uppercase, 0.08em tracking, --text-xs (12px)
│ └── Phosphor Bold, sized to match text, --amp-azure color
└── 8px gradient dot (--amp-gradient background)
    Gaps: 8px between each element
```

```css
.section-label {
  display: flex;
  align-items: center;
  gap: var(--space-sm);                    /* 8px */
  margin-bottom: var(--space-md);          /* 16px — before headline */
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-weight: 500;
  font-size: var(--text-xs);              /* 0.75rem = 12px */
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: var(--text-muted-dark);           /* rgba(255,255,255,0.4) — on dark */
}
.section-label .dot {
  width: 8px;
  height: 8px;
  border-radius: var(--radius-full);       /* 9999px */
  background: var(--amp-gradient);         /* blue→purple */
  flex-shrink: 0;
}
.section-label i {
  color: var(--amp-azure);                 /* #0082EB */
  font-size: inherit;
}
```

**Usage rules:**
- On light sections, color changes to `var(--text-muted)` (`#9CA3AF`).
- The gradient dot and icon always appear. Never omit one for layout convenience.

### 8.6 Code Block

For YAML examples, Python snippets, the mount contract, and inline configuration.

```
┌─────────────────────────────────────────────────────────┐
│  background: #080f1e                    [bundle.md]  ←── context label
│  1px solid rgba(255,255,255,0.08)                       │
│  border-radius: 12px                                    │
│  ┌───────────────────────────────────────────────────┐  │
│  │  padding: 24px                                    │  │
│  │  font: 'SF Mono', 14px, line-height: 1.6         │  │
│  │  color: rgba(255,255,255,0.6)                     │  │
│  │                                                   │  │
│  │  async def mount(coordinator, config):            │  │
│  │      return cleanup                               │  │
│  │                                                   │  │
│  └───────────────────────────────────────────────────┘  │
│  overflow-x: auto                                       │
└─────────────────────────────────────────────────────────┘
```

```css
.code-block {
  position: relative;
  background: var(--dark-deep);            /* #080f1e */
  border: 1px solid var(--border-dark);    /* rgba(255,255,255,0.08) */
  border-radius: var(--radius-md);         /* 12px */
  padding: var(--space-lg);               /* 24px */
  font-family: var(--font-code);           /* 'SF Mono', 'Fira Code', ... */
  font-size: var(--text-sm);              /* 0.875rem = 14px */
  line-height: 1.6;
  color: var(--text-body-dark);            /* rgba(255,255,255,0.6) */
  overflow-x: auto;
}
.code-block .code-label {
  position: absolute;
  top: var(--space-sm);                    /* 8px */
  right: var(--space-md);                  /* 16px */
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-size: var(--text-xs);              /* 0.75rem = 12px */
  color: var(--text-muted-dark);           /* rgba(255,255,255,0.4) */
}
```

**Usage rules:**
- The context label (top-right) is optional but encouraged when the code has a filename or language context (e.g., "bundle.md", "Python", "YAML").
- Code blocks sit inside dark sections natively. On light sections, they create their own dark context (the `--dark-deep` background provides enough contrast).
- No syntax highlighting in this version. Color via token `--text-body-dark` for all code text.

### 8.7 Callout / Aside

For important notes that deserve visual separation from body text. Not for every fact — only for things the reader should remember.

```
┌───────────────────────────────────────────────────┐
│ ┃  padding: 24px 32px                             │
│ ┃  background: rgba(0,146,243,0.06)               │
│ ┃                                                 │
│ ┃  Callout text in Lora 400 italic.               │
│ ┃  This is something worth remembering.           │
│ ┃                                                 │
│ ┃  3px left border in #0082EB                     │
└───────────────────────────────────────────────────┘
```

```css
.callout {
  border-left: 3px solid var(--amp-azure); /* #0082EB */
  padding: var(--space-lg) var(--space-xl); /* 24px 32px */
  background: var(--amp-subtle);           /* rgba(0,146,243,0.06) */
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
                                           /* 0 6px 6px 0 */
  font-style: italic;
  font-family: var(--font-serif);          /* 'Lora' italic */
}
```

**Usage rules:**
- **Maximum 1–2 callouts per section.** If everything is called out, nothing is.
- The Lora italic gives callouts a distinct editorial voice — they feel like a sidebar in a textbook.
- On light sections, change `background` to `rgba(0,130,235,0.04)` for subtlety against the lighter ground.

### 8.8 Comparison Panel (Tools vs Hooks)

Two side-by-side panels with distinct color coding. **Used once**, in Section 7.

```
┌── Tools ───────────────────┐  ┌── Hooks ───────────────────┐
│  border: green (0.20)      │  │  border: red (0.20)        │
│  bg: green (0.05)          │  │  bg: red (0.05)            │
│  radius: 12px              │  │  radius: 12px              │
│  padding: 32px             │  │  padding: 32px             │
│                            │  │                            │
│  TOOLS                     │  │  HOOKS                     │
│  label: green text (0.70)  │  │  label: red text (0.70)    │
│                            │  │                            │
│  Content describing        │  │  Content describing        │
│  what tools are...         │  │  what hooks are...         │
│                            │  │                            │
└────────────────────────────┘  └────────────────────────────┘
         1fr                      gap: 16px           1fr
```

```css
.comparison-panel {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-md);                    /* 16px */
}
.panel-tools {
  border: 1px solid var(--color-tools-border);
                                           /* rgba(34,197,94,0.20) */
  background: var(--color-tools-bg);       /* rgba(34,197,94,0.05) */
  border-radius: var(--radius-md);         /* 12px */
  padding: var(--space-xl);               /* 32px */
}
.panel-tools .panel-label {
  color: var(--color-tools-text);          /* rgba(34,197,94,0.70) */
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-weight: 500;
  font-size: var(--text-xs);              /* 12px */
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
.panel-hooks {
  border: 1px solid var(--color-hooks-border);
                                           /* rgba(239,68,68,0.20) */
  background: var(--color-hooks-bg);       /* rgba(239,68,68,0.05) */
  border-radius: var(--radius-md);         /* 12px */
  padding: var(--space-xl);               /* 32px */
}
.panel-hooks .panel-label {
  color: var(--color-hooks-text);          /* rgba(239,68,68,0.70) */
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-weight: 500;
  font-size: var(--text-xs);              /* 12px */
  text-transform: uppercase;
  letter-spacing: 0.08em;
}
```

**Usage rules:**
- Stacks vertically on mobile: `grid-template-columns: 1fr` below 768px.
- The green/red semantic colors are scoped to this component. They do not leak into the rest of the design.

### 8.9 Priority Cascade

A vertical waterfall of color-coded action levels. **Used once**, in Section 7.

```
┌─ Deny ───────────────────────────────────────────┐
│ ┃  4px left border: #EF4444 (red)                │
│ ┃  Deny          Stop processing. Fail-closed.   │
│ ┃                                                │
├─ AskUser ────────────────────────────────────────┤
│ ┃  4px left border: #F59E0B (amber)              │
│ ┃  AskUser       Pause. Human decision needed.   │
│ ┃                                                │
├─ InjectContext ──────────────────────────────────┤
│ ┃  4px left border: #3B82F6 (blue)               │
│ ┃  InjectContext  Add context to the turn.        │
│ ┃                                                │
├─ Modify ─────────────────────────────────────────┤
│ ┃  4px left border: #8B5CF6 (purple)             │
│ ┃  Modify         Transform the request.         │
│ ┃                                                │
├─ Continue ───────────────────────────────────────┤
│ ┃  4px left border: #22C55E (green)              │
│ ┃  Continue       Go. No-op.                     │
│ ┃                                                │
└──────────────────────────────────────────────────┘
```

```css
.cascade-level {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);                    /* 16px */
  padding: var(--space-lg);               /* 24px */
  border-left: 4px solid var(--cascade-color);
                                           /* set per-level via inline style */
  background: var(--glass-soft);           /* rgba(255,255,255,0.04) */
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
                                           /* 0 6px 6px 0 */
  margin-bottom: var(--space-sm);          /* 8px gap between levels */
}
.cascade-level .action-name {
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-weight: 500;
  font-size: var(--text-base);            /* 16px */
  min-width: 140px;
  flex-shrink: 0;
  color: var(--cascade-color);             /* matches the border */
}
.cascade-level .action-desc {
  font-family: var(--font-sans);           /* 'Inter' */
  font-weight: 400;
  font-size: var(--text-base);            /* 16px */
  color: var(--text-body-dark);            /* rgba(255,255,255,0.6) */
  line-height: 1.6;
}
```

**Usage rules:**
- The `--cascade-color` is set per-level via inline `style` attribute or CSS variable override.
- Levels are ordered top-to-bottom: Deny → AskUser → InjectContext → Modify → Continue. This order reflects priority — highest authority first.
- On mobile, reduce `min-width` on `.action-name` to `100px`.

### 8.10 Ecosystem Stack

Six horizontal layers stacked vertically, each building on the previous. **Used once**, in Section 12.

```
┌─────────────────────────────────────────────┐
│  Layer 6: Your Agent                        │   darkest (top)
├─────────────────────────────────────────────┤
│  Layer 5: Recipes                           │
├─────────────────────────────────────────────┤
│  Layer 4: Bundles & Configuration           │
├─────────────────────────────────────────────┤
│  Layer 3: Modules (Tools, Hooks, etc.)      │
├─────────────────────────────────────────────┤
│  Layer 2: Kernel (Coordinator)              │
├─────────────────────────────────────────────┤
│  Layer 1: Foundation (Rust)                 │   lightest (bottom)
└─────────────────────────────────────────────┘
```

```css
.stack-layer {
  padding: var(--space-lg) var(--space-xl); /* 24px 32px */
  border: 1px solid var(--border-dark);    /* rgba(255,255,255,0.08) */
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.stack-layer:first-child {
  border-radius: var(--radius-md) var(--radius-md) 0 0;
                                           /* 12px top corners */
}
.stack-layer:last-child {
  border-radius: 0 0 var(--radius-md) var(--radius-md);
                                           /* 12px bottom corners */
}
.stack-layer .layer-name {
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-weight: 500;
  font-size: var(--text-base);            /* 16px */
  color: var(--text-bright);              /* #ffffff */
}
.stack-layer .layer-desc {
  font-family: var(--font-sans);           /* 'Inter' */
  font-size: var(--text-sm);              /* 14px */
  color: var(--text-muted-dark);           /* rgba(255,255,255,0.4) */
}
```

**Usage rules:**
- Each layer background gets progressively more opaque from bottom to top, using increments of `rgba(255,255,255,0.02)`. Bottom: `0.02`. Top: `0.12`. This creates depth through luminance stepping (§5.1).
- Borders between layers collapse (no double-border). Use `border-bottom` only except on the first child.

### 8.11 Interactive Graph Container

Two modes: compact in-page preview and fullscreen overlay.

**Compact preview:**

```
┌────────────────────────────────────────────────────────────┐
│  background: #080f1e                                       │
│  border: 1px solid rgba(255,255,255,0.08)                  │
│  border-radius: 16px                                       │
│  aspect-ratio: 16/9                                        │
│  overflow: hidden                                          │
│                                                            │
│         [d3-graphviz rendered SVG — static preview]        │
│                                                            │
│                                           ┌─────────────┐  │
│                                           │ Expand  ↗   │  │
│                                           └─────────────┘  │
└────────────────────────────────────────────────────────────┘
```

```css
.graph-compact {
  background: var(--dark-deep);            /* #080f1e */
  border: 1px solid var(--border-dark);    /* rgba(255,255,255,0.08) */
  border-radius: var(--radius-lg);         /* 16px */
  overflow: hidden;
  aspect-ratio: 16 / 9;
  cursor: pointer;
  position: relative;
}
.graph-compact .expand-hint {
  position: absolute;
  bottom: var(--space-md);                 /* 16px */
  right: var(--space-md);                  /* 16px */
  font-family: var(--font-mono);           /* 'Space Grotesk' */
  font-size: var(--text-xs);              /* 12px */
  color: var(--text-muted-dark);           /* rgba(255,255,255,0.4) */
  background: var(--glass-soft);           /* rgba(255,255,255,0.04) */
  padding: var(--space-xs) var(--space-sm); /* 4px 8px */
  border-radius: var(--radius-sm);         /* 6px */
}
```

**Fullscreen overlay:**

```
┌══════════════════════════════════════════════════════════════════════┐
║  position: fixed; inset: 0                                         ║
║  z-index: 1000                                                     ║
║  background: #080f1e                                               ║
║                                                              [✕]   ║
║                                                                    ║
║           [d3-graphviz rendered SVG — zoom/pan/highlight]          ║
║                                                                    ║
║                                                                    ║
║                                                                    ║
╚══════════════════════════════════════════════════════════════════════╝
```

```css
.graph-fullscreen {
  position: fixed;
  inset: 0;                                /* Full window — not a modal */
  z-index: var(--z-overlay);               /* 1000 */
  background: var(--dark-deep);            /* #080f1e */
}
.graph-fullscreen .close-btn {
  position: absolute;
  top: var(--space-lg);                    /* 24px */
  right: var(--space-lg);                  /* 24px */
  z-index: 1001;                           /* Above graph SVG */
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-full);       /* 9999px — circle */
  background: var(--glass-soft);           /* rgba(255,255,255,0.04) */
  border: 1px solid var(--border-dark);    /* rgba(255,255,255,0.08) */
  color: var(--text-bright);              /* #ffffff */
  cursor: pointer;
}
```

**Usage rules:**
- Compact preview is **non-interactive** — no zoom, no pan, no click. It's a static preview that invites a click to expand.
- Fullscreen overlay is **fully interactive** — zoom (scroll wheel via `d3.zoom`), pan (click-drag), click-to-highlight (click a node → all others dim to 20% opacity → clicked node and direct connections highlight in `--amp-azure`).
- Close fullscreen via close button or Escape key.
- The overlay takes the **full window** (`inset: 0`), not a floating modal.
- Libraries: `d3.js v7` + `d3-graphviz v5.6.0` (which uses `@hpcc-js/wasm` for client-side Graphviz rendering). The DOT source is embedded in a hidden `<script type="text/x-dot">` element.
- Zoom range: `zoomScaleExtent([0.05, 20])` — 5% (full graph) to 2000% (individual nodes).

---

## 9. Layout

### 9.1 Container

```css
.container {
  max-width: var(--container-max);         /* 1200px */
  margin: 0 auto;
  padding: 0 var(--container-pad);         /* 0 40px (desktop) */
}
```

### 9.2 Grid Patterns

**Guiding principle:** Asymmetric by default. Content-heavy layouts use `2fr 1fr` or `3fr 2fr`, not equal columns. Equal columns create brochures. Asymmetric columns create editorial hierarchy — the larger column leads, the smaller supports.

**Asymmetric grid (prose + sidebar):**

```css
.grid-asymmetric {
  display: grid;
  grid-template-columns: 2fr 1fr;
  gap: var(--grid-gap);                    /* 16px */
  align-items: start;
}
```

**Card grid (auto-fit responsive):**

```css
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--grid-gap);                    /* 16px */
}
```

**Two-column comparison (equal — Tools vs Hooks only):**

```css
.grid-compare {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--grid-gap);                    /* 16px */
}
```

**Usage rules:**
- Use `grid-asymmetric` for most content layouts.
- Use `card-grid` when showing 3+ equal-weight cards.
- Use `grid-compare` only for the Tools vs Hooks comparison panel.
- All grids collapse to single-column on tablet (< 1024px).

### 9.3 Breakpoints

Three breakpoints. Test every layout at 375px width.

| Name | Max width | Changes |
|---|---|---|
| Tablet | `1024px` | `--container-pad: 24px`. All multi-column grids → single column. |
| Mobile | `768px` | `--space-section: 64px`. `--container-pad: 20px`. Card grids → single column. Comparison panels → stacked. |
| Small mobile | `480px` | `--space-section: 48px`. `--container-pad: 16px`. |

```css
@media (max-width: 1024px) {
  :root { --container-pad: 24px; }
  .grid-asymmetric { grid-template-columns: 1fr; }
}
@media (max-width: 768px) {
  :root { --space-section: 64px; --container-pad: 20px; }
  .card-grid { grid-template-columns: 1fr; }
  .comparison-panel { grid-template-columns: 1fr; }
}
@media (max-width: 480px) {
  :root { --space-section: 48px; --container-pad: 16px; }
}
```

**Critical note — mobile viewport:** Use `min-height: 100dvh` not `100vh`. The `dvh` unit accounts for mobile browser chrome (URL bar, bottom nav). `100vh` causes content to be obscured behind the chrome on iOS Safari.

### 9.4 Section Rhythm

Sections alternate dark and light. The pattern creates visual breathing:

```
dark  →  dark  →  light  →  dark  →  dark  →  dark  →  light  →  ...
```

**Rule:** Never place more than 3 dark sections consecutively without a light section break. Never place 2 light sections consecutively.

---

## 10. Interaction

### 10.1 Scroll Reveal

Content enters from below as the user scrolls. Triggered by `IntersectionObserver` at `threshold: 0.1`.

```css
.reveal {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity var(--duration-reveal) var(--ease-out),
              transform var(--duration-reveal) var(--ease-out);
                                           /* 700ms cubic-bezier(0.16,1,0.3,1) */
}
.reveal.visible {
  opacity: 1;
  transform: translateY(0);
}
```

```javascript
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });
document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
```

**Staggered reveals:** Cards in a grid get `transition-delay: calc(var(--stagger-index) * 80ms)` where `--stagger-index` is set via inline style (0, 1, 2, ...).

**Usage rules:**
- Every content block within a section gets `.reveal`.
- The section itself does not get `.reveal` — only its children.
- Observer fires once (`entry.isIntersecting` adds class but never removes it). Content doesn't re-hide on scroll-up.

### 10.2 Presentation Mode

Activated by a floating "Present" button in the bottom-right corner. Transforms the scrolling site into a slide-by-slide presentation.

| Step | Action |
|---|---|
| Enter | Click "Present" → `body.presenting` class → first slide visible → Fullscreen API |
| Navigate | Arrow keys (left/right) move between slides |
| Counter | "7 / 42" in bottom-right corner |
| Exit | Escape key or close button → remove class → return to scroll view |

**Implementation approach:** Same DOM, different CSS. In presenting mode, sections are hidden and `.slide` elements within each section are shown one at a time.

```css
body.presenting .section {
  display: none;
}
body.presenting .slide {
  display: flex;
  position: fixed;
  inset: 0;
  align-items: center;
  justify-content: center;
  padding: var(--space-4xl);               /* 80px */
  background: var(--dark);                 /* #0f172a */
}
body.presenting .slide:not(.active) {
  display: none;
}
```

**Usage rules:**
- A section that is one scroll page in site mode may become 2–8 slides in presentation mode. Slide count is dictated by content, not a fixed cap.
- Slides inherit the section's dark/light styling.
- Speaker notes are stored in `data-notes` attributes, displayed in a bottom panel or separate window.

### 10.3 Graph Zoom / Pan / Highlight

Active only in fullscreen overlay mode (§8.11). Not available in compact preview.

| Action | Mechanism |
|---|---|
| Zoom | Scroll wheel / trackpad pinch → `d3.zoom()` transform |
| Pan | Click-and-drag on background → `d3.zoom()` translate |
| Highlight | Click node → all others dim to `opacity: 0.2` → clicked node + direct connections at `opacity: 1` in `var(--amp-azure)` |
| Reset | Click background or press Escape (when highlight active) |
| Close | Click close button or Escape (when no highlight active) |

**Zoom range:** `zoomScaleExtent([0.05, 20])` — 5% sees the full graph, 2000% shows individual node detail.

### 10.4 Hover States

| Element | Property | Resting | Hover | Duration | Easing |
|---|---|---|---|---|---|
| Glass card | `background` | `var(--glass-soft)` | `var(--glass-strong)` | 250ms | `ease` |
| Glass card | `border-color` | `var(--border-dark)` | `var(--border-dark-hover)` | 250ms | `ease` |
| Glass card | `box-shadow` | `none` | `var(--shadow-glow)` | 250ms | `ease` |
| Bordered card | `border-color` | `var(--border-light)` | `var(--border-light-hover)` | 250ms | `ease` |
| Bordered card | `box-shadow` | `var(--shadow-light)` | `var(--shadow-light-hover)` | 250ms | `ease` |
| Button | `transform` | `none` | `translateY(-1px)` | 150ms | `var(--ease-spring)` |
| Link (underline) | `opacity` | `0` | `1` | 150ms | `ease` |

---

## 11. Accessibility

### 11.1 Contrast Compliance

All body text passes WCAG AA (4.5:1 minimum). Contrast ratios are documented inline with text color tokens (§1.4).

| Pair | Ratio | Compliance |
|---|---|---|
| `--text-bright` on `--dark` | 15.4:1 | AAA |
| `--text-body-dark` on `--dark` | 7.1:1 | AA |
| `--text-muted-dark` on `--dark` | 4.8:1 | AA (large text only) |
| `--text-primary` on `--surface` | 16.0:1 | AAA |
| `--text-body` on `--surface` | 7.5:1 | AA |
| `--text-muted` on `--surface` | 3.0:1 | AA (large text only) |
| `--amp-deep` on `--surface` | 7.2:1 | AA |
| `--amp-azure` on `--dark` | 5.1:1 | AA |

**Rule:** Muted text is permitted only for non-essential metadata (captions, section numbers, code labels) at sizes ≥ 18px or ≥ 14px bold. Never for body copy.

### 11.2 Focus Indicators

All interactive elements show a visible focus ring when navigated via keyboard.

```css
:focus-visible {
  outline: 2px solid var(--amp-azure);     /* #0082EB */
  outline-offset: 2px;
  border-radius: var(--radius-sm);         /* 6px */
}
```

**Rule:** Never apply `outline: none` without providing a visible alternative. The `:focus-visible` selector ensures mouse users don't see the ring; keyboard users always do.

### 11.3 Touch Targets

All tappable elements must meet a minimum 44×44px touch target (WCAG 2.5.5).

| Element | Minimum size |
|---|---|
| Close button (graph overlay) | 40×40px content + 4px outline-offset = 48×48px total |
| Present button | 44px height minimum |
| Expand hint (graph) | Entire `.graph-compact` is the tap target (aspect-ratio: 16/9) |

### 11.4 Reduced Motion (cross-ref)

Fully specified in §6.4. Summary: all duration tokens zero to `0.01ms`, scroll reveals become instant, universal `transition-duration: 0.01ms !important` catch-all.

---

## 12. Icons

### Phosphor Icons

Phosphor Bold weight, loaded via CDN. **Never emojis.** No exceptions.

```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/bold/style.css">
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@phosphor-icons/web@2.1.2/src/fill/style.css">
```

| Context | Weight | Size | Color |
|---|---|---|---|
| Section labels | Bold | Match text size (12px) | `var(--amp-azure)` |
| Inside cards | Bold | 24px | `var(--amp-azure)`, inside a 40px circle with `var(--amp-tint)` background |
| Standalone emphasis | Fill | 32px | `var(--amp-gradient)` via `background-clip: text` wrapper |

### Section Icon Mapping

| Section | Icon class |
|---|---|
| 01 — Introduction | `ph-bold ph-compass` |
| 02 — Architecture Map | `ph-bold ph-tree-structure` |
| 03 — Design Philosophy | `ph-bold ph-scales` |
| 04 — The Kernel | `ph-bold ph-cpu` |
| 05 — Module System | `ph-bold ph-puzzle-piece` |
| 06 — The Orchestrator | `ph-bold ph-play-circle` |
| 07 — Tools vs Hooks | `ph-bold ph-bell-ringing` |
| 08 — Agent Loop | `ph-bold ph-flow-arrow` |
| 09 — Sessions | `ph-bold ph-arrows-clockwise` |
| 10 — Bundles | `ph-bold ph-package` |
| 11 — Foundation Bridge | `ph-bold ph-bridge` |
| 12 — Complete Picture | `ph-bold ph-stack` |
| 13 — Appendix | `ph-bold ph-list-checks` |

### Logo

| Element | Specification |
|---|---|
| Icon | Base64-embedded PNG (from `icons/icon-512.png`, displayed at 32–40px) |
| Wordmark | "Amplifier" in Space Grotesk 700, `letter-spacing: -0.01em` |
| Pairing | Icon left, wordmark right, `var(--space-sm)` gap (8px), vertically centered |
| On dark | White wordmark (`var(--text-bright)`), icon as-is |
| On light | Dark wordmark (`var(--text-primary)`), icon as-is |

---

## 13. Do / Don't Reference

Rationale for each rule lives in earlier sections. This is a quick-check summary.

### Color

| Do | Don't |
|---|---|
| Use `--dark` (`#0f172a`) for all dark backgrounds | Use `#000000` (pure black) |
| Use one accent hue (blue → purple gradient) | Introduce a second accent hue |
| Use semantic colors only in their scoped components | Use `--cascade-deny` red as a general error color |
| Use `--amp-deep` for accent text on light backgrounds | Use `--amp-blue` for text on light (insufficient contrast) |

### Typography

| Do | Don't |
|---|---|
| Use Lora 400 for all headlines | Use Lora bold (too heavy) |
| Use Inter for body text | Use Lora for body text (serif fatigues at length) |
| Use Space Grotesk for labels and stats | Use Inter for all-caps labels (lacks technical voice) |
| Use `--font-code` for code blocks | Use Space Grotesk for code (not monospaced) |

### Spacing

| Do | Don't |
|---|---|
| Use the 8px scale for all spacing | Invent ad-hoc values like `13px` or `27px` |
| Reduce `--space-section` on mobile | Keep desktop section padding on small screens |
| Leave generous whitespace between content blocks | Pack content densely to "fill the space" |
| Use `100dvh` for viewport height | Use `100vh` (obscured by mobile browser chrome) |

### Components

| Do | Don't |
|---|---|
| Use glass cards on dark backgrounds | Put glass cards on light backgrounds |
| Limit gradient-border cards to 3 per page | Put gradient borders on every card |
| Limit callouts to 1–2 per section | Put a callout around every important sentence |
| Use the cascade waterfall for hook priorities | Reuse cascade styling for other ordered lists |

### Motion

| Do | Don't |
|---|---|
| Use entrance-only animations (scroll reveal) | Add looping, pulsing, or auto-advancing animation |
| Respect `prefers-reduced-motion` | Ignore the reduced-motion media query |
| Use `--ease-spring` for button lifts only | Apply spring easing to content reveals |
| Stagger card reveals at 80ms intervals | Reveal all cards simultaneously |

### Layout

| Do | Don't |
|---|---|
| Use asymmetric grids (`2fr 1fr`) by default | Use equal columns for all content layouts |
| Alternate dark/light sections (2–3 dark, 1 light) | Place more than 3 dark sections consecutively |
| Test every layout at 375px width | Design for desktop only |
| Collapse grids to single-column on tablet (< 1024px) | Leave multi-column grids on narrow viewports |

---

## File Inventory

| File | Size | Description |
|---|---|---|
| `.design/DESIGN-SYSTEM.md` | ~42 KB | This file. Human-readable specification. |
| `.design/tokens.css` | ~14 KB | CSS custom properties. Machine-readable implementation. |
| `.design/CONTENT-STRATEGY.md` | ~33 KB | Writing style guide, content outline, audience calibration. |
| `.design/sections/*.md` | ~150 KB total | 13 individual section content files (prose + slides + speaker notes). |
