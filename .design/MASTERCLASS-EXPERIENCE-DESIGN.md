# Amplifier Masterclass Experience Design

## Goal

Transform the Amplifier Masterclass from a well-styled documentation page into a premium educational experience where someone finishes understanding what Amplifier is, has a deep reference they'll return to, and the execution feels like it belongs to the withamplifier.com family.

## Background

The Amplifier Masterclass currently exists as a single 1.4MB HTML file (`amplifier-masterclass-v2.html`) with 13 sections, a presentation mode (72 slides), and an interactive d3-graphviz architecture graph. The content is solid — 13 sections covering the full Amplifier architecture — but the storytelling, interaction design, and visual execution need a fundamental uplevel.

The masterclass will live at **withamplifier.com/learn**. The withamplifier.com homepage is a cinematic 3D experience introducing Amplifier. The masterclass is the substance behind the spectacle — same family, different register. The homepage seduces; the masterclass educates. Both should feel like the same hand made them.

**Primary visual reference:** [iyo.ai/iyo-one](https://www.iyo.ai/iyo-one) (the product page, not the homepage). The product page shifts from the homepage's infinite black void to structured charcoal with rooms — same family, different purpose: "We're real now. There's substance here." That's the exact relationship we want between the homepage and the masterclass.

### What's Good Today

- Dark aesthetic and glass cards are polished — not a template
- Typography is well-chosen: Lora serif headlines, Inter body, Space Grotesk mono labels
- The section-label system (blue Phosphor icon + monospace uppercase) is consistent
- Presentation mode (72 slides with speaker notes) is a genuinely impressive feature
- Content itself is thorough across 13 sections

### What's Broken Today

- The "WHAT THIS DOCUMENT COVERS" card looks like a clickable TOC — none of it is interactive. A broken UX promise.
- The TOC dropdown has no active state. You can't tell where you are.
- No narrative thread between sections. No "now that you understand X, let's look at Y."
- Architecture Map is placed at section 2, before the reader has vocabulary for what they're seeing. The page literally says "Don't try to memorize this" — an admission the placement doesn't work.
- The Present button is unexplained — a gradient pill in the corner with no label.

**Core problem:** The site knows what it wants to teach, but it's styled like an experience while behaving like a document. The gap is in storytelling, navigation intelligence, and interaction honesty.

## Audience

Informed technical professionals who work with AI and engineering. They may not know Amplifier specifically, but they have context for understanding it. This is a level-500 college course in content depth.

## Approach

Hybrid navigation — a linear journey the first time through, and a random-access reference afterward. A single experience designed so well that the linear flow feels natural but navigation is never locked. No login, no tracking. The choreography *invites* linear reading; the TOC *permits* jumping. The design serves the educational outcome, period.

The IYO product page register is the north star: structured charcoal backgrounds, frosted glass cards used selectively, hairline dividers for sequential content, floating visuals, eyebrow-headline-paragraph information hierarchy. Premium but purposeful — every design choice serves learning.

---

## Architecture

### Framework: Astro

The masterclass is built as an **Astro project**. Rationale:

- withamplifier.com is a **GitHub Pages site** — Astro generates static output natively
- The masterclass is content-heavy, mostly static, with **islands of interactivity** (d3-graphviz, presentation mode, card sliders, scroll animations)
- Astro's island architecture ships static HTML with JS hydrating only interactive components — perfect for content-first with selective interactivity
- The `withAmp-v2` cinematic prototype already proved Astro works for the homepage direction
- The existing `withamplifier` Next.js project migrates to Astro, with the masterclass as the first major section built in the new framework

### Deployment

Static output to GitHub Pages — same as today, no infrastructure changes.

### Project Structure

```
/learn
├── layout/
│   ├── SidebarTOC          — persistent left sidebar, scroll-synced
│   ├── TopNav              — mobile collapsed TOC + presentation mode trigger
│   └── ProgressBar         — thin azure bar, top of viewport
├── sections/
│   ├── Section             — base wrapper (dark/grey background, entry animation)
│   ├── ConceptualSection   — mode 1: generous spacing, atmospheric visual, serif-forward
│   ├── TechnicalSection    — mode 2: structured density, numbered rows, diagrams
│   └── InteractiveSection  — mode 3: fullscreen graph explorer, hands-on elements
├── components/
│   ├── GlassCard           — frosted card with per-card accent glow (collections only)
│   ├── NumberedRow         — 01 / Label / Description with hairline divider
│   ├── StickyStack         — sub-components that layer on scroll
│   ├── InlineDiagram       — SVG diagram with scroll-triggered path drawing
│   ├── FloatingVisual      — atmospheric/diagrammatic visual, no container
│   ├── UpNextTeaser        — section transition element
│   ├── CardSlider          — horizontal drag-scroll for parallel card collections
│   └── PresentationMode    — existing 72-slide system, ported
├── graph/
│   ├── SimplifiedDiagram   — per-section inline diagrams (static SVG)
│   └── FullExplorer        — d3-graphviz fullscreen interactive view
├── scroll/
│   ├── LenisProvider       — smooth scroll initialization
│   ├── ScrollTrigger       — GSAP section entrance orchestration
│   └── StickyController    — manages sticky-stack scroll behavior
└── assets/
    ├── atmospheric/        — generated concept visuals (mode 1)
    ├── diagrams/           — explanatory SVG diagrams (mode 2)
    └── tokens.css          — design tokens shared with withamplifier.com
```

### Shared Design System

`tokens.css` is the bridge between homepage and masterclass:

- Same typography families and scale
- Same color tokens (charcoal palette, azure accent, cream text)
- Same spacing scale (8px base)
- Same glass treatment values (blur, opacity, border)
- Same easing curves

Both homepage and `/learn` import from the same token source. Homepage applies them cinematically. Masterclass applies them educationally.

### Migration Path

1. 13 sections of content migrate from single HTML into individual section components
2. Content (text, structure) stays — container, navigation, and visual treatment change
3. Presentation mode (72 slides) ports as its own component
4. d3-graphviz integration ports into graph module
5. Visual assets (atmospheric + diagrams) are a new production workstream
6. withamplifier migrates from Next.js to Astro, with the masterclass as the first major section

---

## Components

### Navigation & Orientation System

#### Persistent Sidebar TOC (Glasswing-Inspired)

Replace the current dropdown TOC with a persistent left-sidebar TOC visible on desktop at all times:

- **No border, no background, no box** — just floating text and a small indicator dot
- **Active section highlighted** — current section gets brighter text and the dot blooms in (8px indicator that scales from `0.5→1.0` over 250ms). Inactive sections stay in muted gray.
- **Scroll-synced via IntersectionObserver** — tracks position automatically as user scrolls
- **Fades out at the hero, fades in when content begins** — `opacity:0` with `pointer-events:none` above the content area
- **Clickable for random access** — every item is an anchor link with smooth scroll. This is the reference-mode navigation for returning users.
- **Two-level hierarchy** — top-level shows 13 sections; sections with numbered sub-components (Kernel's 5 components, Module System's 6 types) show sub-items indented beneath when that section is active. Collapsed when not active, so it never overwhelms.
- **Mobile/tablet:** collapses into top-nav dropdown WITH active state indicator (currently missing)

#### Remove the Fake TOC

The "WHAT THIS DOCUMENT COVERS" glass card in the introduction is removed entirely. Its content is redundant with the sidebar TOC, and its current form is a broken UX promise (it looks clickable, it isn't). The introduction section focuses on what Amplifier is — the navigation system handles wayfinding.

#### Section Transitions

At the end of each section, a lightweight "Up next" element shows the next section's name and a one-sentence teaser. Not a full-bleed interstitial — a subtle footer within the current section providing narrative continuity:

> **Next: The Kernel** — Five components that do everything by providing nothing.

Linear-journey users get a thread to follow. Random-access users (via TOC) never see it because they jump directly.

#### Progress Indicators

Two levels:

- **Page-level:** thin progress bar at top of viewport (2px, azure accent color)
- **Section-level:** within sections with numbered sub-components, a "3 / 5" indicator near the section heading showing progress through sub-items

### Content Modes

The masterclass contains three distinct types of information, each deserving different visual treatment and visual artifact register.

#### Mode 1: Conceptual / Philosophical

**Sections:** Introduction, Design Philosophy, Complete Picture

The "why" sections — principles, mental models, big-picture thinking. Prose-heavy, essayistic.

**Layout treatment:** More generous spacing, larger typography, fewer UI components. Lora serif headlines get room to breathe. Full-width text without competing elements. Closer to typographic confidence — the content carries itself, the design steps back.

**Visual artifact register — Atmospheric:** Generated concept visuals that make you *feel* the idea. A visualization of "the center stays still so the edges can move fast." A spatial rendering of the six-layer stack. One strong visual per section, floating on the background without a containing box. These are produced visuals (nano-banana / concept art pipeline), not UI components.

#### Mode 2: Technical / Structural

**Sections:** The Kernel, Module System, Orchestrator, Tools vs Hooks, Sessions, Bundles, Foundation Bridge, Agents & Recipes

The "what and how" sections — components, mechanisms, relationships, types.

**Layout treatment:** Tighter spacing, more visual structure. Numbered rows for component breakdowns. Side-by-side comparisons. Inline diagrams. Space Grotesk monospace labels anchor the technical identity. Purpose-built layouts per content type.

**Visual artifact register — Diagrammatic:** Clean, minimal, Throxy-style diagrams that prove mechanisms:

- The orchestrator loop as a flow diagram: LLM → tool call → response → back to LLM
- The 5 kernel components as a spatial relationship diagram showing what touches what
- Tools vs Hooks as a side-by-side comparison showing the triggering difference (LLM-decided vs code-decided)
- Module types as a structured visual showing the 6 types with their shapes/colors from the dot graph vocabulary
- Session lifecycle as a timeline/flow

Same color vocabulary as the dot graph. Inline with content at 50/50 or full-width. Scroll-triggered SVG path drawing for animated diagrams (paths wipe in as you scroll into view).

#### Mode 3: Interactive / Orientational

**Section:** Architecture Map (graph explorer)

The "where am I" content — spatial understanding of the whole system.

**Layout treatment:** The full d3-graphviz interactive graph is a reference companion, not a linear section. Available from the TOC at any time. Progressive simplified diagrams appear inline within each section (just the relevant sub-system), building toward the full picture.

**Visual artifact register — Interactive:** Zoom, pan, click, explore.

### Visual System

#### Color System — Structured Dark

Three background tones rotating through sections (IYO product page approach):

| Tone | Hex Range | Use |
|---|---|---|
| Primary dark | `#242426` | Default canvas — most sections |
| Secondary dark | `#3d3d40` | Rhythm variation — alternating technical sections |
| Palette break | `#e0e1e6` | Pearl-grey, used sparingly (1-2 conceptual sections only) |

Predominantly dark. The pearl-grey is a deliberate, rare punctuation mark — not an alternating pattern.

- **Azure accent** (`#0082EB`) — precious, used only on TOC active indicator, interactive affordances, and key section labels
- **Body text** — warm cream (`#E8E6DC` range) rather than pure white, for sustained reading comfort on dark
- **Headlines** — bright white for contrast

#### Typography

Three families (shared with withamplifier.com homepage via `tokens.css`):

| Family | Role | Application |
|---|---|---|
| **Lora** | Serif | Headlines and section titles |
| **Inter** | Sans-serif | Body text and UI elements |
| **Space Grotesk** | Monospace | Technical labels and code-adjacent content |

Applied with IYO's information density discipline:

- **Eyebrow → Headline → One short paragraph** per section opening. Never more than 3 sentences of body text before a visual break.
- **Eyebrow label pattern:** small, dimmer text with bullet prefix (• THE KERNEL, • MODULE SYSTEM) establishing context before the big headline
- **Viewport-fluid headline sizing** (vw-based scaling) for monumental presence on large screens

#### Surface Language

**Hairline dividers** (`1px`, `rgba(255,255,255,0.1)`) — the default for sequential/structured content. Numbered component breakdowns, spec-style rows, step-by-step explanations.

**Glass cards** — reserved for **collections of parallel items only**, things that sit side-by-side inviting comparison:

- **Treatment:** true frosted glass (`backdrop-filter: blur(15px)`, `rgba(33,33,33,0.35)` background, ~28px border-radius, hairline blue-tinted border at 10% opacity)
- **Per-card accent glow** — a unique subtle color from the dot graph's existing vocabulary (providers = one color, tools = another, hooks = another). Not a different card background — same glass treatment, different glow.
- **Cards float over textured dark backgrounds** so `backdrop-filter: blur` has visual material to work with. Plain dark + glass looks flat; atmospheric texture + glass looks premium.
- **Use cases:** the 6 module types as a card collection, Tools vs Hooks as two comparison cards, agents in the Agents & Recipes section

**No cards for prose** — conceptual content, explanatory text, and the narrative thread sit directly on the background.

**Floating visuals** — diagrams and generated concept art float on the dark background with no containing box, no card, no border. The visual IS the surface.

#### Spacing & Density

Two densities matching content modes, same base spacing scale (8px grid), different multipliers:

| Density | Content Mode | Character |
|---|---|---|
| Editorial | Conceptual sections | Generous margins, max-width constrained, single-column |
| Structured | Technical sections | Tighter spacing, multi-column where needed (comparisons, card grids) |

### Interaction Patterns

#### Scroll System

**Lenis smooth scroll** replaces native scrolling — same as IYO, same as withamplifier.com homepage. No visible scrollbars. Physical, weighted feel. This is one of the strongest "same family" signals between homepage and masterclass.

**GSAP ScrollTrigger** for all content entrances:

- **Section entry sequence:** Eyebrow fades in first → headline lands with slight translate-up → body text follows → visuals/cards stagger in. Every section announces itself in a choreographed sequence.
- **Custom spring easing:** `cubic-bezier(.625,.05,0,1)` with subtle overshoot for element entrances. Nothing moves with CSS defaults.

**Sticky-stack for sub-components:** Sections with numbered parallel items (Kernel's 5 components, Module System's 6 types) use sticky layering — each sub-item slides over the previous as you scroll, creating a "pages turning" feel.

#### The Architecture Graph (Revised Approach)

The current placement (section 2, before the reader has vocabulary) doesn't work. Revised:

- **Inline simplified diagram at Architecture Map section** — a designed, legible illustration of the high-level layers (Kernel → Modules → Bundles → Apps). Not the full d3-graphviz graph. A diagram that teaches at a glance.
- **Full interactive graph available from TOC at any time** — a dedicated "Architecture Explorer" entry in the sidebar that opens the fullscreen d3-graphviz view as a reference companion, accessible whenever the reader is ready for it.
- **Progressive sub-diagrams within sections** — each technical section gets its own focused inline diagram of just the relevant sub-system. By Complete Picture, the reader has seen all the parts.

#### Presentation Mode

The existing 72-slide presentation mode with speaker notes is kept but made discoverable:

- Clear label: **"Presentation Mode · 72 slides"** instead of an unlabeled gradient pill
- Positioned in the top nav or as a persistent but unobtrusive element
- Feature itself (slides, notes, keyboard navigation) remains unchanged

#### Inline Diagrams

Explanatory diagrams integrate as:

- Inline with content — full-width or 50/50 split with explanatory text
- Same color vocabulary as the dot graph — consistent visual language
- Floating on the dark background without containing cards
- Scroll-triggered SVG path drawing for animated diagrams (paths wipe in as you scroll into view)

---

## Data Flow

### Content Pipeline

```
Content (prose, structure)  →  Section Components  →  Astro Static Build  →  GitHub Pages
                                     ↑
Visual Assets (atmospheric + diagrams)
                                     ↑
Design Tokens (tokens.css shared with homepage)
```

Content is authored as section components within Astro. Each section component imports the shared design tokens and renders content using the appropriate content mode template (conceptual, technical, or interactive). Visual assets are produced separately and referenced by sections.

### Scroll Data Flow

```
User Scroll  →  Lenis (smooth physics)  →  GSAP ScrollTrigger (entrance choreography)
                                         →  IntersectionObserver (TOC sync)
                                         →  StickyController (sub-component stacking)
                                         →  ProgressBar (page-level position)
```

### Navigation Data Flow

```
Sidebar TOC click  →  smooth scroll to section anchor
Section scroll     →  IntersectionObserver fires  →  TOC active state updates
Sub-component scroll →  Section progress indicator updates ("3 / 5")
Page scroll        →  Top progress bar width updates
```

---

## Content Structure

The 13-section structure is settled. Content within sections is being refined in a separate workstream (per April 6 team meeting: reframing to "AI harness," reordering kernel components, removing language-specific references, etc.). The design system accommodates content changes without breaking.

| # | Section | Content Mode | Background | Visual Artifacts |
|---|---------|-------------|------------|------------------|
| s1 | Introduction | Conceptual | Primary dark | Atmospheric concept visual |
| s2 | Architecture Map | Interactive | Primary dark | Simplified layer diagram + full graph explorer |
| s3 | Design Philosophy | Conceptual | Palette break (pearl-grey) | Atmospheric concept visual |
| s4 | The Kernel | Technical | Primary dark | Component relationship diagram, sticky-stack |
| s5 | Module System | Technical | Secondary dark | 6-type card collection, module shape diagram |
| s6 | The Orchestrator | Technical | Primary dark | Orchestrator loop flow diagram |
| s7 | Tools vs Hooks | Technical | Secondary dark | Side-by-side comparison diagram/cards |
| s8 | Sessions | Technical | Primary dark | Session lifecycle timeline |
| s9 | Bundles | Technical | Secondary dark | Bundle composition diagram |
| s10 | Foundation Bridge | Technical | Primary dark | Bridge layer diagram |
| s11 | Agents & Recipes | Technical | Secondary dark | Agent card collection |
| s12 | Complete Picture | Conceptual | Palette break (pearl-grey) | Full architecture atmospheric visual |
| s13 | Appendix | Technical | Primary dark | Reference diagrams |

---

## Error Handling

### Graceful Degradation

- **Lenis fails to load:** native browser scroll takes over seamlessly — content is never blocked by scroll library
- **GSAP fails:** content renders statically without entrance animations — all content visible by default with animations as enhancement
- **d3-graphviz fails:** the simplified static SVG diagrams inline in sections still convey the architecture; the full explorer shows a fallback static image
- **Glass card backdrop-filter unsupported:** cards fall back to solid dark backgrounds — functional but less premium
- **Fonts fail to load:** system font stack fallback (sans-serif for Inter, serif for Lora, monospace for Space Grotesk)

### Content Resilience

The design system is built to accommodate content changes without breaking:

- Section components accept content as props/slots, not hardcoded
- Visual treatments are tied to content mode (conceptual/technical/interactive), not specific section content
- Adding, removing, or reordering sections updates the TOC automatically via the section manifest
- The sidebar TOC hierarchy is data-driven, not manually maintained

---

## Testing Strategy

### Visual Verification

- Screenshot comparison against IYO product page reference for glass card fidelity, background tones, and typography hierarchy
- Verify the three content modes are visually distinct when scrolling through the full page
- Verify sidebar TOC tracks correctly across all 13 sections with sub-item expansion
- Mobile responsive verification — TOC collapse, card reflow, readable typography at small viewports

### Interaction Testing

- Lenis scroll behavior feels physical and weighted (not default browser scroll)
- GSAP entrance animations fire at correct scroll positions and don't re-trigger on scroll back
- Sticky-stack sections layer correctly and unstick on scroll-past
- TOC click → smooth scroll lands at correct section with correct active state
- Progress bar tracks page position accurately
- Presentation mode launches correctly from the discoverable trigger

### Cross-Browser / Performance

- Static Astro build produces valid HTML/CSS/JS for GitHub Pages
- Lighthouse performance score maintains acceptable threshold despite Lenis + GSAP
- Core Web Vitals: LCP under 2.5s, CLS under 0.1 (critical for scroll-driven animations)
- Verify glass card `backdrop-filter` renders correctly in Safari, Chrome, Firefox
- Test with JS disabled — all content visible and readable (progressive enhancement)

### Content Mode Coverage

- Each of the three background tones renders with correct hex values and sufficient text contrast (WCAG AA minimum on both dark tones and palette break)
- Atmospheric visuals display without containing boxes on conceptual sections
- Diagrams render inline at correct sizes with scroll-triggered SVG path animation
- Glass cards appear only for collection/comparison content, never for prose

---

## Resolved Decisions

1. **Visual asset production pipeline** → **Nano Banana.** Both atmospheric concept visuals (mode 1) and explanatory diagrams (mode 2) are generated using the nano-banana tool (Gemini VLM). Atmospheric visuals use nano-banana's generate operation with style prompts derived from the design system. Diagrams use a hybrid approach — nano-banana generation for initial compositions, with hand-refined SVG for precision where needed.

2. **Harness builder interactive** → **Yes, future scope.** The Starlink-inspired "outfit your spaceship" interactive for explaining module composition is confirmed as a feature. It is not in the initial build but is part of the vision.

3. **Presentation mode content sync** → **Yes, later workstream.** Presentation mode will sync with masterclass content, but this is a later workstream. Initial build focuses on the scroll experience. Presentation mode ports as-is and gets synced after the core experience is solid.

4. **Mobile experience** → **Full treatment.** Mobile gets the full Lenis + GSAP + glass card experience — not a simplified version. Responsive design is a first-class concern, not a degraded fallback.

5. **Migration scope** → **Learn (`/learn`) first.** The masterclass is built as the first Astro section. The homepage and other routes (`/stories`, etc.) migrate afterward, unless the team determines a full simultaneous pivot is feasible (reskinning existing pages to match the updated design system at the same time).

---

## Reference Sites

| Site | What We Took | URL |
|---|---|---|
| iyo.ai/iyo-one | **Primary visual direction** — structured charcoal, glass cards for collections, numbered rows, floating visuals, eyebrow→headline hierarchy, Lenis + GSAP | https://www.iyo.ai/iyo-one |
| anthropic.com/glasswing | Sidebar TOC pattern — persistent, scroll-synced, structurally invisible, dot indicator animation | https://www.anthropic.com/glasswing |
| mazehq.com | Scroll-triggered SVG drawing, dimensional particle reveals | https://mazehq.com/ |
| throxy.com | Minimal inline diagrams — prove mechanisms, 50/50 layouts, controlled vocabulary | https://throxy.com/ |
| jobyaviation.com | Content-mode shifting — cinematic vs structured based on content type | https://www.jobyaviation.com/ |
| mantis.works | Typographic confidence, restraint as authority signal | https://www.mantis.works/ |
| iyo.ai (homepage) | GPGPU particles, glass nav, full-viewport ownership, custom spring easings | https://www.iyo.ai/ |
