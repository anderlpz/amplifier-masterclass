# Layout Strategy — Amplifier Masterclass (LOCKED)

**Locked:** 2026-04-08
**Status:** APPROVED — global CSS layout model for single-page scroll site

---

## 1. Single-Page Scroll Structure

The entire masterclass is one HTML page. No routing, no page transitions. The DOM is a linear stack of 13 `<section>` elements inside a scroll container.

```html
<body>
  <canvas id="swarm" class="fixed inset-0 z-[-1]" />  <!-- Particle swarm — Layer 0.5 -->
  <nav class="top-nav fixed top-0 z-50" />              <!-- Top nav — Layer 2 -->
  <div class="progress-bar fixed top-0 z-60" />          <!-- Progress bar — highest z -->
  <aside class="sidebar-toc fixed left-0 z-40" />        <!-- Sidebar TOC — Layer 2 -->

  <main>
    <section id="s01" class="section section--void section--conceptual">...</section>
    <section id="s02" class="section section--void section--technical">...</section>
    <section id="s03" class="section section--parchment section--conceptual section--palette-break">...</section>
    <section id="s04" class="section section--void section--technical">...</section>
    <section id="s05" class="section section--slate section--technical">...</section>
    <section id="s06" class="section section--void section--technical">...</section>
    <section id="s07" class="section section--slate section--technical">...</section>
    <section id="s08" class="section section--void section--technical">...</section>
    <section id="s09" class="section section--slate section--technical">...</section>
    <section id="s10" class="section section--void section--technical">...</section>
    <section id="s11" class="section section--slate section--technical">...</section>
    <section id="s12" class="section section--parchment section--conceptual section--palette-break">...</section>
    <section id="s13" class="section section--void section--technical">...</section>
  </main>
</body>
```

---

## 2. Section Wrapper Pattern (Section.astro)

Every section uses a shared wrapper component that handles:
- Background color (via `--void`, `--slate`, `--parchment` variant)
- Mode class (conceptual vs technical)
- Entry viewport spacing
- Content width constraints
- Parallax reveal z-index for palette-break transitions

### Background Variants

```css
.section--void      { background: var(--bg-void, #0F0F13); }
.section--slate     { background: var(--bg-slate, #161619); }
.section--parchment { background: var(--bg-parchment, #F5F3EC); }
```

### Palette-Break Parallax Z-Index

For the dark→parchment transitions (S02→S03, S11→S12):

```css
/* Dark sections before a palette-break scroll OVER the parchment */
.section--before-break {
  position: relative;
  z-index: 1;
}

/* Parchment sections use sticky positioning — they hold in place
   while the dark section scrolls past, then are revealed */
.section--palette-break {
  position: sticky;
  top: 0;
  z-index: 0;
}

/* Dark sections after a palette-break are normal flow */
.section--after-break {
  position: relative;
  z-index: 1;
}
```

**Void gap:** The dark section before a palette-break ends with 48-64px of pure background (`--bg-void`) after the UpNextTeaser. This is the "held breath" between dark and light.

---

## 3. The iyo-Clean Entry Viewport Pattern

Every section's first 100vh contains exactly 3 elements occupying ~15% of the viewport height. The remaining ~85% is negative space (ground color).

### Entry Viewport Anatomy

```
┌─────────────────────────────────────────────────────┐
│                                                     │  ← ~35-40% from top
│         EYEBROW                                     │     Space Grotesk 500, 11px
│                              ← 32px gap             │     uppercase, tracked wide
│                                                     │
│         HEADLINE                                    │     Lora 600, clamp(2.5rem, 4vw, 4rem)
│                              ← 24px gap             │
│                                                     │
│         LEAD SENTENCE                               │     Inter 400, 1.125rem, 60% opacity
│                                                     │
│                                                     │
│                                                     │  ← remaining ~50-60% is ground
│                                                     │
└─────────────────────────────────────────────────────┘
```

### CSS for Entry Viewport

```css
.section__entry {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;       /* Vertically center the 3-group cluster */
  padding-top: 10vh;             /* Shift cluster slightly above true center */
  padding-bottom: 0;
}

.section__entry .eyebrow {
  margin-bottom: var(--space-4); /* 32px */
}

.section__entry .headline {
  margin-bottom: var(--space-3); /* 24px */
}

.section__entry .lead {
  opacity: 0.6;
  max-width: 55ch;
}
```

### Density Increase Below Entry

| Scroll depth | Content | Spacing |
|-------------|---------|---------|
| 0–100vh | Entry viewport only (3 elements, 85% negative space) | Maximum breathing room |
| 100–150vh | First body paragraph fades in | Generous |
| 150vh+ | Full density: body, diagrams, glass cards, sub-sections | Standard section spacing |
| Final ~50vh | UpNextTeaser appears | Exhale before next entry |

---

## 4. Content Widths

Three width tiers, all centered horizontally within the section (offset by sidebar on desktop):

| Tier | Width | CSS Variable | Use |
|------|-------|-------------|-----|
| **Body** | 720px | `--content-max` | Body copy, lead paragraphs. ~60-65ch at body text size. |
| **Wide** | 960px | `--content-wide` | Diagrams, card grids, comparison layouts. |
| **Full** | 1200px | `--content-full` | Maximum width including sidebar offset. Nothing wider. |

```css
.content-body { max-width: var(--content-max, 720px); margin-inline: auto; }
.content-wide { max-width: var(--content-wide, 960px); margin-inline: auto; }
.content-full { max-width: var(--content-full, 1200px); margin-inline: auto; }
```

---

## 5. Sidebar TOC Offset

On desktop (≥1024px), the sidebar TOC occupies the left margin. Content is offset to accommodate it.

### Desktop Layout (≥1024px)

```
┌──────────────────────────────────────────────────────────────┐
│  64px   │  200px  │  64px  │        content area        │   │
│  margin │  TOC    │  gap   │  (720/960/1200px centered)  │   │
│         │         │        │                              │   │
└──────────────────────────────────────────────────────────────┘
```

```css
@media (min-width: 1024px) {
  .sidebar-toc {
    position: fixed;
    left: var(--sidebar-margin, 64px);
    top: 50%;
    transform: translateY(-50%);
    width: 200px;
  }

  main {
    padding-left: calc(
      var(--sidebar-margin, 64px) +   /* Left margin */
      200px +                           /* TOC width */
      var(--sidebar-gap, 64px)          /* Gap between TOC and content */
    ); /* Total: 328px left offset */
  }
}
```

### Mobile Layout (<1024px)

```css
@media (max-width: 1023px) {
  .sidebar-toc {
    display: none; /* Replaced by hamburger menu in top nav */
  }

  main {
    padding-left: var(--mobile-margin, 20px);
    padding-right: var(--mobile-margin, 20px);
  }
}
```

---

## 6. Glass Card Treatment (Technical Sub-sections)

Glass cards group related items in technical sections (S04: 5 kernel responsibilities, S05: 6 module types, S11: Agents + Recipes).

### Glass Card CSS

```css
.glass-card {
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.07);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 8px;
  padding: var(--space-4) var(--space-5); /* 32px 40px */
}

/* On parchment sections, glass inverts */
.section--parchment .glass-card {
  background: rgba(0, 0, 0, 0.04);
  border: 1px solid rgba(0, 0, 0, 0.07);
}
```

### Glass Card Layout Rules

- Glass cards are **stacked vertically** with `--space-3` (24px) gaps between them
- Each card contains: Inter 600 sub-heading + body text + optional Space Grotesk code terms
- Cards may be arranged **asymmetrically** (S04: 2+1+2 pattern, not uniform stack)
- Body text NEVER sits on glass. Glass is for sub-section containers, not paragraph wrappers.

---

## 7. Parallax Reveal Mechanism (Dark → Light Transitions)

The most important layout mechanism. Used at S02→S03 and S11→S12.

### How It Works

The parchment section is positioned BELOW the dark section in the DOM. The dark section has `z-index: 1` and scrolls normally. The parchment section has `z-index: 0` and `position: sticky; top: 0`, so it holds in place. As the dark section scrolls off the top, the parchment section is revealed underneath — like pulling a curtain off a window.

### The Reverse (Light → Dark)

S03→S04 and S12→S13 use a **hard cut** — no parallax, no overlap. Clean horizontal boundary. The parchment section scrolls up normally. The dark section appears immediately below. This asymmetry is intentional: entering light is an unveiling; entering dark is a decisive dive.

### Z-Index Stack

| Layer | Z-Index | Element |
|-------|---------|---------|
| Progress bar | 60 | Always on top |
| Top nav | 50 | Below progress bar |
| Sidebar TOC | 40 | Below nav |
| Dark sections (before break) | 1 | Scrolls over parchment |
| Parchment sections | 0 | Revealed underneath |
| Particle swarm canvas | -1 | Behind everything |

---

## 8. Responsive Breakpoints

| Breakpoint | Name | Layout Changes |
|-----------|------|----------------|
| ≥1440px | **Wide desktop** | Full sidebar + generous margins. Content widths at max. |
| ≥1024px | **Desktop** | Sidebar TOC visible. Content offset by 328px left. Standard widths. |
| ≥768px | **Tablet** | Sidebar hidden. Content centered with 40px margins. Diagrams scale down. |
| <768px | **Mobile** | Sidebar hidden, hamburger nav. 20px margins. Diagrams stack vertically if needed. Glass cards go full-width. Comparison layout (S07) stacks vertically. |

### Mobile-Specific Adjustments

```css
@media (max-width: 767px) {
  /* Entry viewport headlines scale down */
  .section__entry .headline {
    font-size: clamp(1.75rem, 5vw, 2.5rem);
  }

  /* Glass cards go edge-to-edge */
  .glass-card {
    border-radius: 0;
    margin-inline: calc(-1 * var(--mobile-margin));
    padding-inline: var(--mobile-margin);
  }

  /* Comparison split (S07) stacks vertically */
  .comparison-split {
    flex-direction: column;
  }

  /* Diagrams constrain to viewport width */
  .diagram {
    max-width: 100vw;
    overflow-x: auto;
  }
}
```

---

## 9. Section Spacing Summary

| Context | Spacing | CSS Token |
|---------|---------|-----------|
| Before conceptual section | 192px | `--space-24` |
| Before technical section | 128px | `--space-16` |
| Between major elements (conceptual) | 48px | `--space-6` |
| Between major elements (technical) | 32-48px | `--space-4` to `--space-6` |
| Between paragraphs | 24px | `--space-3` |
| Between glass cards | 24px | `--space-3` |
| Hairline divider padding (above + below) | 48px | `--space-6` |
| Diagram vertical padding (above + below) | 64px | `--space-8` |
| Void gap before palette-break | 48-64px | `--space-6` to `--space-8` |
