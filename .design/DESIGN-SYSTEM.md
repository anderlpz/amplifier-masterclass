# Amplifier Masterclass Design System

| | |
|---|---|
| **Version** | 3.0 |
| **Date** | 2026-04-09 |
| **Applies to** | Multi-modal chapter-based Astro site |

This document is the single source of truth for every visual decision in the Amplifier Masterclass. It defines colors, typography, spacing, components, layout, and interaction. Companion file `tokens.css` implements these values as CSS custom properties. If this document and `tokens.css` disagree, this document wins.

The aesthetic is editorial and typographic: a well-designed educational paper, not a dark-mode product page. The frame borrows from three sources: the XOR paper UI (authority through typography), iyo.ai (product-narrative polish), and NYT Interactives (media woven into reading rhythm).

---

## 1. Color System

**Guiding principle:** Minimal palette. The content is rich (prose, diagrams, vignettes, audio, chat). The frame is quiet. Color orients; it does not decorate.

### 1.1 Backgrounds

| Token | Value | Purpose |
|---|---|---|
| `--bg-canvas` | `#EDEBE6` | Page background. Warm stone. Everything sits on this. |
| `--bg-card` | `#FFFFFF` | Reading surface. The white card against warm canvas. |
| `--bg-code` | `#F5F3EE` | Code block backgrounds. Warm light gray. |
| `--bg-muted` | `#F7F5F0` | Subtle background for callouts, blockquotes. |

**Usage rules:**
- `--bg-canvas` is the ground plane. The visible surface between and behind cards.
- `--bg-card` is the reading surface. Each chapter's content sits on a white card.
- No dark backgrounds anywhere. No dark mode.

### 1.2 Text Colors

| Token | Value | Against bg-card | Purpose |
|---|---|---|---|
| `--text-primary` | `#1A1815` | 15.2:1 (AAA) | Headlines, emphasis |
| `--text-secondary` | `#6B6560` | 5.8:1 (AA) | Body text, descriptions |
| `--text-muted` | `#9C9590` | 3.2:1 (AA large) | Captions, chapter numbers, metadata |
| `--text-inverse` | `#FFFFFF` | N/A | Text on accent backgrounds (rare) |

**Usage rules:**
- Body text uses `--text-secondary`. It passes WCAG AA against white.
- `--text-muted` is for non-essential metadata only: captions, dates, chapter numbers. It passes AA at large text sizes (18px+ or 14px bold).
- Headlines use `--text-primary`. It passes AAA.

### 1.3 Accent

| Token | Value | Purpose |
|---|---|---|
| `--accent` | `#0082EB` | Links, active nav state, interactive elements, audio play button |
| `--accent-hover` | `#006BC4` | Hover/active state for accent elements |
| `--accent-deep` | `#005AA0` | Accent text on light backgrounds where standard azure lacks contrast (5.4:1 vs white) |
| `--accent-bg` | `rgba(0, 130, 235, 0.08)` | Subtle accent background tint for active states |

**Usage rules:**
- `--accent` is the only chromatic color in the entire palette. It means "interactive" everywhere.
- No second accent color. No gradients. No blue-to-purple.

### 1.4 Borders

| Token | Value | Purpose |
|---|---|---|
| `--border-default` | `rgba(0, 0, 0, 0.08)` | Card edges, dividers, table rules |
| `--border-strong` | `rgba(0, 0, 0, 0.15)` | Diagram node borders, stronger separation |
| `--border-accent` | `rgba(0, 130, 235, 0.25)` | Active/selected borders |

**Usage rules:**
- All borders are 1px solid. No 2px borders except callout left accent (3px).
- Borders are supplementary. Whitespace handles most separation.

### 1.5 Shadows

| Token | Value | Purpose |
|---|---|---|
| `--shadow-card` | `0 1px 3px rgba(0, 0, 0, 0.04), 0 4px 12px rgba(0, 0, 0, 0.03)` | Card elevation against canvas |
| `--shadow-nav` | `0 1px 2px rgba(0, 0, 0, 0.06)` | Nav bar elevation |

**Usage rules:**
- Shadows are extremely subtle. The card-on-canvas relationship is primarily communicated through color difference, not shadow.
- No glow effects. No colored shadows.

### 1.6 Semantic Colors (Scoped)

Component-scoped tokens for the Tools vs Hooks comparison (Section 7) and Hook Priority Cascade. Do not use outside their scoped components.

**Tools vs Hooks comparison:**

| Token | Value | Purpose |
|---|---|---|
| `--color-tools-border` | `rgba(34, 163, 74, 0.25)` | Tools column border |
| `--color-tools-bg` | `rgba(34, 163, 74, 0.06)` | Tools column background |
| `--color-tools-text` | `#1B7A3D` | Tools column text |
| `--color-hooks-border` | `rgba(220, 53, 53, 0.25)` | Hooks column border |
| `--color-hooks-bg` | `rgba(220, 53, 53, 0.06)` | Hooks column background |
| `--color-hooks-text` | `#B91C1C` | Hooks column text |

**Hook Priority Cascade:**

| Token | Value | Purpose |
|---|---|---|
| `--cascade-deny` | `#DC2626` | Deny action (red) |
| `--cascade-ask-user` | `#D97706` | Ask-user action (amber) |
| `--cascade-inject` | `#2563EB` | Inject action (blue) |
| `--cascade-modify` | `#7C3AED` | Modify action (purple) |
| `--cascade-continue` | `#16A34A` | Continue action (green) |

---

## 2. Typography

**Guiding principle:** Typography creates the editorial quality. The serif/sans/mono triad from the paper UI carries the entire visual identity.

### 2.1 Font Stacks

| Token | Value | Role |
|---|---|---|
| `--font-serif` | `'Lora', Georgia, 'Times New Roman', serif` | Reading voice: headlines, chapter titles |
| `--font-sans` | `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif` | Working voice: body text, UI |
| `--font-mono` | `'Space Grotesk', 'SF Mono', monospace` | Precision voice: labels, code references, nav |
| `--font-code` | `'SF Mono', 'Fira Code', 'Cascadia Code', monospace` | Actual code in code blocks |

### 2.2 Font Roles

| Font | Role | Weights | Where |
|---|---|---|---|
| Lora (serif) | Editorial voice | 400, 600 | Chapter titles, section headings (h1-h3), pull quotes, callout text |
| Inter (sans-serif) | Workhorse | 400, 500, 600 | Body text, navigation, UI elements, metadata |
| Space Grotesk | Technical labels | 400, 500 | Chapter numbers in nav, eyebrow labels, inline code references, wordmark |
| Code stack | Actual code | 400 | Code blocks, YAML/Python snippets |

**Critical notes:**
- Lora at 600, not bold (700). The weight 600 provides enough authority at display sizes without heaviness.
- Space Grotesk is NOT used for code blocks (it's not monospaced). For code, use `--font-code`.

### 2.3 Type Scale

Fluid scaling via `clamp()` for headlines. Fixed sizes for body and below.

| Token | Value | Computed | Usage |
|---|---|---|---|
| `--text-xs` | `0.75rem` | 12px | Small labels, metadata |
| `--text-sm` | `0.875rem` | 14px | Captions, nav text |
| `--text-base` | `1rem` | 16px | Body text |
| `--text-lg` | `1.125rem` | 18px | Lead paragraphs |
| `--text-xl` | `1.25rem` | 20px | Subheadings |
| `--text-2xl` | `clamp(1.5rem, 2vw, 1.75rem)` | 24-28px | h3 |
| `--text-3xl` | `clamp(1.875rem, 3vw, 2.25rem)` | 30-36px | h2 |
| `--text-4xl` | `clamp(2.25rem, 4vw, 3rem)` | 36-48px | h1 chapter titles |

### 2.4 Line Height & Letter Spacing

| Context | Font | Letter spacing | Line height | Token |
|---|---|---|---|---|
| Chapter titles (h1) | Lora 600 | `-0.02em` | `1.15` | `--leading-tight` |
| Section headings (h2-h3) | Lora 600 | `-0.015em` | `1.2` | `--leading-snug` |
| Body text | Inter 400 | `0` | `1.7` | `--leading-normal` |
| Lead paragraphs | Inter 400 | `0` | `1.7` |
| Nav chapter indicator | Space Grotesk 500 | `0.06em` | `1` |
| Eyebrow labels | Space Grotesk 500 | `0.08em` | `1` |
| Inline code | Space Grotesk 400 | `0` | inherited |

**Key decision:** Body line-height is 1.7 (generous). This is a reading-first experience. Extended text at 1.5 or 1.6 feels cramped for educational content.

---

## 3. Spacing

**Guiding principle:** 8px base unit. Generous. This is an educational document, not a dashboard.

### 3.1 Scale

| Token | Value | Usage |
|---|---|---|
| `--space-1` | `4px` | Tight gaps: icon + inline text |
| `--space-2` | `8px` | Base unit. Small padding, label gaps. |
| `--space-3` | `12px` | Minor gaps |
| `--space-4` | `16px` | Grid gaps, element margins |
| `--space-6` | `24px` | Paragraph spacing, card padding (compact) |
| `--space-8` | `32px` | Card padding (standard), section sub-gaps |
| `--space-12` | `48px` | Between content blocks within a chapter |
| `--space-16` | `64px` | Between major sections within a chapter |
| `--space-24` | `96px` | Chapter top/bottom padding |

### 3.2 Reading Measure

| Token | Value | Purpose |
|---|---|---|
| `--measure-reading` | `650px` | Reading column max-width. ~65ch at 16px body. |
| `--measure-wide` | `1100px` | Wide breakout for diagrams, tables. |
| `--measure-container` | `1200px` | Outer container max-width (includes card margins). |
| `--container-pad` | `40px` → `24px` → `20px` → `16px` | Horizontal padding. Desktop 40px, tablet (≤1024px) 24px, mobile (≤768px) 20px, small mobile (≤480px) 16px. |

---

## 4. Border Radius

Minimal. The paper UI aesthetic is clean and rectangular. Slight rounding softens without becoming friendly/playful.

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `4px` | Code inline pills, small interactive elements |
| `--radius-md` | `8px` | Cards, code blocks, callouts |
| `--radius-lg` | `12px` | Media containers (vignette, diagram with background) |
| `--radius-full` | `9999px` | Audio play button, pills |

**Usage rules:**
- The default card radius is `--radius-md` (8px). Clean but not sharp.
- No 24px+ radii. That reads as "app UI," not "editorial."

---

## 5. Motion & Transitions

### 5.1 Duration

| Token | Value | Usage |
|---|---|---|
| `--duration-fast` | `150ms` | Hover states, micro-interactions |
| `--duration-normal` | `250ms` | Nav transitions, chapter indicator updates |
| `--duration-slow` | `400ms` | Chapter transitions, overlay open/close |
| `--duration-reveal` | `600ms` | Scroll-reveal content entrance |

### 5.2 Easing

| Token | Value | Usage |
|---|---|---|
| `--ease-out` | `cubic-bezier(0.16, 1, 0.3, 1)` | Default for reveals and entrances |
| `--ease-default` | `ease` | Hover states, simple transitions |

### 5.3 Reduced Motion

```css
@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:   0.01ms;
    --duration-normal: 0.01ms;
    --duration-slow:   0.01ms;
    --duration-reveal: 0.01ms;
  }
  *, *::before, *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
  }
}
```

---

## 6. Z-Index Layers

| Token | Value | Usage |
|---|---|---|
| `--z-base` | `1` | Default content |
| `--z-card` | `10` | Card hover states |
| `--z-nav` | `100` | Nav bar |
| `--z-toc-overlay` | `200` | TOC dropdown overlay |
| `--z-media-overlay` | `500` | Fullscreen vignette, diagram zoom |
| `--z-chat` | `600` | Inline chat interface |

---

## 7. Component Patterns

### 7.1 The Card (Chapter Container)

Each chapter renders as a white card on the warm canvas. The card provides the reading surface.

```
┌──── canvas (--bg-canvas) ─────────────────────────────────┐
│                                                            │
│  ┌──── card (--bg-card) ──────────────────────────────┐   │
│  │  max-width: --measure-container                     │   │
│  │  padding: --space-24 --space-8                      │   │
│  │  border-radius: --radius-md                         │   │
│  │  box-shadow: --shadow-card                          │   │
│  │                                                     │   │
│  │  ┌── reading column (--measure-reading) ──────┐    │   │
│  │  │  Prose, inline code, small media           │    │   │
│  │  └────────────────────────────────────────────┘    │   │
│  │                                                     │   │
│  │  ┌── wide breakout (--measure-wide) ──────────────┐│   │
│  │  │  Diagrams, tables, comparison layouts          ││   │
│  │  └────────────────────────────────────────────────┘│   │
│  │                                                     │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

### 7.2 The Nav Bar

```
┌─────────────────────────────────────────────────────────────┐
│  4 · The Kernel  ☰              ▶ Listen                    │
│  [chapter indicator]            [audio controls]            │
│  Space Grotesk 500, uppercase   Inter 400, --text-muted     │
│  --text-primary                                             │
│                                                             │
│  height: 52px                                               │
│  background: --bg-card                                      │
│  border-bottom: 1px solid --border-default                  │
│  position: fixed; top: 0;                                   │
│  z-index: --z-nav                                           │
└─────────────────────────────────────────────────────────────┘
```

### 7.3 Chapter Entry

```
┌── reading column ────────────────────────────────────┐
│                                                       │
│  Chapter 6                                            │
│  Space Grotesk 400, --text-xs, --text-muted           │
│  uppercase, letter-spacing: 0.08em                    │
│                                                       │
│  ↕ --space-4                                          │
│                                                       │
│  The Orchestrator                                     │
│  Lora 600, --text-4xl, --text-primary                 │
│  letter-spacing: -0.02em                              │
│                                                       │
│  ↕ --space-6                                          │
│                                                       │
│  One module gets live access to the full              │
│  system at runtime.                                   │
│  Inter 400, --text-lg, --text-secondary               │
│                                                       │
│  ↕ --space-12                                         │
│                                                       │
│  [Body content begins]                                │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### 7.4 Code Block

```
┌─────────────────────────────────────────────────────┐
│  background: --bg-code                 [bundle.md]  │
│  border: 1px solid --border-default                 │
│  border-radius: --radius-md                         │
│  padding: --space-6                                 │
│                                                     │
│  async def mount(                                   │
│      coordinator, config                            │
│  ) -> Optional[cleanup_fn]:                         │
│                                                     │
│  font: --font-code, --text-sm                       │
│  color: --text-primary                              │
└─────────────────────────────────────────────────────┘
```

### 7.5 Callout / Aside

```
┌─────────────────────────────────────────────────────┐
│ ┃  background: --bg-muted                           │
│ ┃  border-left: 3px solid --accent                  │
│ ┃  padding: --space-6 --space-8                     │
│ ┃  border-radius: 0 --radius-sm --radius-sm 0       │
│ ┃                                                   │
│ ┃  Callout text in Lora 400 italic.                 │
│ ┃  Something worth remembering.                     │
│ ┃                                                   │
└─────────────────────────────────────────────────────┘
```

### 7.6 Inline Code

```css
code:not(pre code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-code);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}
```

### 7.7 Vignette Placeholder (Stubbed)

```
┌── wide breakout ─────────────────────────────────────┐
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  background: --bg-muted                         │ │
│  │  border: 1px solid --border-default             │ │
│  │  border-radius: --radius-lg                     │ │
│  │  aspect-ratio: 16/9                             │ │
│  │  display: flex; align-items: center;            │ │
│  │  justify-content: center;                       │ │
│  │                                                 │ │
│  │  ▶  Video explainer                             │ │
│  │     (coming soon)                               │ │
│  │                                                 │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
└───────────────────────────────────────────────────────┘
```

### 7.8 Chat Prompt Placeholder (Stubbed)

```
┌── reading column ────────────────────────────────────┐
│                                                       │
│  ┌─────────────────────────────────────────────────┐ │
│  │  border: 1px solid --border-default             │ │
│  │  border-radius: --radius-md                     │ │
│  │  padding: --space-6                             │ │
│  │                                                 │ │
│  │  Have a question about the orchestrator loop?   │ │
│  │  Inter 400, --text-secondary                    │ │
│  │                                                 │ │
│  │  [Ask a question...]                            │ │
│  │  (coming soon)                                  │ │
│  │                                                 │ │
│  └─────────────────────────────────────────────────┘ │
│                                                       │
└───────────────────────────────────────────────────────┘
```

---

## 8. Layout

### 8.1 Chapter-Based Navigation

Each chapter is its own route/view. No infinite scroll. The reader is on "Chapter 6: The Orchestrator" and navigates between chapters via the nav bar's TOC.

### 8.2 The Three Widths

| Width | Token | Value | Usage |
|---|---|---|---|
| Reading | `--measure-reading` | `650px` | Default. Prose, inline code, small media. |
| Wide | `--measure-wide` | `1100px` | Diagrams, tables, comparison layouts. |
| Full | `100%` | Edge-to-edge | Hero moments, scrollytelling, key vignettes (rare). |

All three widths are centered within the card container. The reading column is the default; wide and full break out of it.

### 8.3 Breakpoints

| Name | Max width | Changes |
|---|---|---|
| Desktop | No max | Default layout. Card + reading column. |
| Tablet | `1024px` | Card padding tightens. Wide breakouts become full card width. |
| Mobile | `768px` | Card becomes full-width (no canvas visible). Reading column fills card. Nav simplifies. |
| Small mobile | `480px` | Further padding reduction. Type scale floor applies. |

### 8.4 Responsive Card Behavior

On desktop: the card has margins on the canvas, shadow, border-radius. The canvas is visible.

On mobile (< 768px): the card goes full-width. The canvas disappears. The card IS the page. Border-radius goes to 0. Shadow goes to 0. This is standard editorial responsive: phone readers don't need the "paper on desk" metaphor.

---

## 9. Accessibility

### 9.1 Contrast Compliance

| Pair | Ratio | Compliance |
|---|---|---|
| `--text-primary` on `--bg-card` | 15.2:1 | AAA |
| `--text-secondary` on `--bg-card` | 5.8:1 | AA |
| `--text-muted` on `--bg-card` | 3.2:1 | AA (large text only) |
| `--accent` on `--bg-card` | 4.6:1 | AA (large text); supplemented with underline for body links |
| `--accent-deep` on `--bg-card` | 5.4:1 | AA |

### 9.2 Focus Indicators

```css
:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}
```

### 9.3 Touch Targets

All tappable elements meet 44x44px minimum (WCAG 2.5.5).

### 9.4 Reduced Motion

See Section 5.3. All duration tokens zero. All animations disabled. Content immediately visible.

### 9.5 Screen Reader

- Semantic HTML throughout (nav, main, article, section, figure, figcaption)
- All diagrams have text alternatives
- All media blocks have descriptive labels
- Chapter navigation is via landmarks and heading hierarchy

---

## 10. Do / Don't Reference

### Color

| Do | Don't |
|---|---|
| Use `--bg-canvas` for page background | Use any dark background color |
| Use `--accent` for all interactive elements | Introduce a second accent hue |
| Use `--text-secondary` for body text | Use `--text-muted` for body text |

### Typography

| Do | Don't |
|---|---|
| Use Lora 600 for chapter titles | Use Lora 700 (too heavy) |
| Use Inter for body text | Use Lora for body text |
| Use Space Grotesk for code references and labels | Use Space Grotesk for body text |
| Use `--font-code` for code blocks | Use Space Grotesk for code blocks |

### Spacing

| Do | Don't |
|---|---|
| Use the 4/8px base scale | Invent ad-hoc values |
| Leave generous whitespace | Pack content to "fill space" |
| Use `--measure-reading` for prose | Let prose stretch to full card width |

### Components

| Do | Don't |
|---|---|
| Use the three-width system (reading/wide/full) | Mix arbitrary widths |
| Use wide breakout for diagrams | Force complex diagrams into reading column |
| Limit full-width to 2-3 moments across 13 chapters | Make every media block full-width |
| Stub multimedia blocks with clear "coming soon" treatment | Leave empty containers |

### Motion

| Do | Don't |
|---|---|
| Use entrance-only scroll reveals | Add looping or pulsing animations |
| Respect `prefers-reduced-motion` | Ignore the reduced-motion query |
| Keep transitions under 600ms | Use slow, dramatic entrance sequences |
