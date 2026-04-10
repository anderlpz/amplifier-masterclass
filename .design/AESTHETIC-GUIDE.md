# Aesthetic Guide: Amplifier Masterclass v3

**Created:** 2026-04-08
**Revised:** 2026-04-09 — Complete rewrite for multi-modal chapter-based direction
**Status:** Active — authoritative visual strategy for all implementation work

---

## The Reframe

The previous version of this guide described a dark-mode, particle-swarm, atmospheric-effects scroll experience. That direction produced visual craft but the wrong frame: a beautifully polished *document* that was still just a document. The v3 direction starts from a different premise.

**The masterclass is a multi-modal educational product, not a website.** The same curriculum (13 chapters about Amplifier's architecture) should be consumable through reading, listening, watching, and conversing. The visual frame exists to make the *content* authoritative and to create room for media to be woven into the narrative — not to be the spectacle itself.

---

## Three Reference Sources

The visual identity draws from three references. Each contributes a specific quality.

### The Paper UI — Authority Through Typography

The XOR paper prototype established the frame: white card on light canvas, single reading column, hidden-by-default navigation, a dual-typeface system (serif reads, sans orients, mono for code). Zero decoration. The authority comes from the typography and the whitespace, not from effects.

**What we take:** The card-on-canvas frame. The typographic hierarchy. The restraint. The hidden-nav-reveals-on-demand pattern. The feeling of reading a well-produced academic paper.

### iyo.ai — Product-Narrative Polish

iyo.ai demonstrates how a product page can feel editorial: clean entry viewports, deliberate pacing, every visual element earning its presence. The information density is low per viewport but the experience compounds across the scroll.

**What we take:** The discipline of "earn every visual element." The clean section entries. The feeling that someone art-directed each viewport rather than filling a template. The product-narrative polish applied to educational content.

### NYT Interactives — Media Woven Into Reading

The New York Times interactive pieces (like the Artemis II moon mission article) demonstrate the compression/expansion pattern: narrow serif prose, then a diagram breaks wide, then a scrollytelling sequence anchors while text cards scroll past, then back to narrow prose. The media isn't decoration. It's pacing.

**What we take:** The compression/expansion rhythm. The principle that media blocks are earned moments that break out of the reading column. The scrollytelling pattern for 1-2 climactic concepts. Full-width moments for spectacle.

---

## What This Site IS

- A multi-modal chapter-based learning experience with the production value of a published paper
- Typographically confident — the writing and type carry 90% of the authority
- Light, clean, and quiet — a reading environment that respects extended attention
- Media-native — vignettes, audio, diagrams, and chat are woven into the narrative, not bolted on
- Chapter-based — each of 13 chapters is its own view, not a position in a long scroll

## What This Site Is NOT

- **Not a dark-mode atmospheric experience.** The previous direction (particles, grain, glass, void backgrounds) is explicitly retired. The paper frame is light, clean, and warm.
- **Not a marketing page.** No hero CTA, no feature grid, no conversion funnel.
- **Not a docs site.** No persistent sidebar-with-main-content layout. The reading column IS the content.
- **Not a choose-your-own-adventure.** The editorial flow is opinionated. There are multiple media formats, not multiple paths. The same curriculum, different ways to consume each chapter.
- **Not effects-driven.** No particle swarms, no atmospheric washes, no glass surfaces, no gradient borders. The frame is quiet so the media can be loud.

---

## Color Philosophy

### Restraint Is the Strategy

The palette is minimal because the content is rich. When you have vignettes, diagrams, audio, and chat woven into the flow, the frame needs to disappear. Color is used to orient, not to decorate.

| Role | Value | Name | Reasoning |
|------|-------|------|-----------|
| **Canvas** | `#EDEBE6` | Warm stone | The page background. Not pure gray (institutional) or pure white (sterile). A warm, slightly creamy stone that reads as "paper." Everything sits on this. |
| **Card** | `#FFFFFF` | White | The reading surface. The card is pure white against the warm canvas. The contrast is subtle but creates a clear "this is where you read" zone. |
| **Text primary** | `#1A1815` | Ink | Near-black with warmth. Not pure black (#000, too harsh for extended reading). Not cool gray (reads as digital). This reads as printed ink on paper. |
| **Text secondary** | `#6B6560` | Warm gray | Body text, descriptions. High enough contrast for WCAG AA (5.8:1 (WCAG AA) against white). Warm enough to feel editorial. |
| **Text muted** | `#9C9590` | Stone | Captions, metadata, chapter numbers. Passes AA for large text only. |
| **Accent** | `#0082EB` | Azure | Carried from the Amplifier brand. Used for: links, active nav state, interactive elements, audio play button. One accent color everywhere. Precious. |
| **Accent deep** | `#005AA0` | Deep azure | For accent text on white backgrounds where the standard azure is too light for WCAG AA body text contrast. |
| **Border** | `rgba(0, 0, 0, 0.08)` | Hairline | Card edges, dividers, table rules. Barely visible. Structure through whitespace, borders only where whitespace isn't enough. |

### What We Explicitly Reject

- **Dark backgrounds.** No void, no slate, no charcoal. The entire experience is light.
- **Gradient accents.** No blue-to-purple gradient. One flat accent color.
- **Copper/warm accents.** The previous guide's conceptual-mode copper is gone. Azure is the only accent.
- **Glass surfaces.** No frosted panels, no backdrop-filter, no transparency effects.
- **Glow effects.** No box-shadow glow on hover. Depth through elevation (subtle shadow), not luminance.
- **Multiple background tones.** No void/slate/parchment rotation. Canvas + card. That's it.

---

## Typography Strategy

### The Dual-Typeface System

The type system has three families, each with a specific cognitive signal. They come directly from the paper UI.

**Lora (serif)** — The Reading Voice

When you see Lora, you're reading. Chapter titles, section headings, pull quotes. Lora signals "this is the editorial content — absorb it." Weight 400 for body-adjacent uses, 600 for headings. Never bold (700) — the stroke contrast at 400/600 provides enough authority.

- Used for: chapter titles, section headings (h1-h3), pull quotes, callout text
- NOT used for: navigation, labels, metadata, code

**Inter (sans-serif)** — The Working Voice

Inter is the body text and UI typeface. It signals "this is the functional layer — understand it." Body paragraphs, nav labels, chapter indicators, buttons.

- Used for: all body text, navigation, UI elements, chapter indicators, metadata
- NOT used for: display headlines, code references

**Space Grotesk (mono-heritage)** — The Precision Voice

Space Grotesk is for technical identifiers and structural labels. It signals "this is a specific, named thing."

- Used for: inline code references, chapter numbers in nav, eyebrow labels, the "Amplifier" wordmark
- NOT used for: body text, headlines, anything longer than a short phrase

### Typography Per Context

**The reading column (default):**
- Body: Inter 400, 1rem (16px), line-height 1.7, measure ~65ch
- Headlines: Lora 600, fluid scale (clamp), line-height 1.15, letter-spacing -0.02em
- Code inline: Space Grotesk 400, 0.9em, with background pill

**The nav bar:**
- Chapter indicator: Space Grotesk 500, 0.8125rem (13px), uppercase, tracked 0.06em
- Wordmark: Space Grotesk 500, 0.875rem (14px), lowercase or title case

**Wide breakout (diagrams, tables):**
- Labels: Space Grotesk 400, 0.75rem-0.875rem
- Annotations: Inter 400, 0.8125rem

---

## The Column System

The single most important spatial concept. The reading column is the resting state. Breakouts are earned.

### Reading Column (~650px)

The default. Prose, inline code, small media players, chat prompts. Centered on the card. Produces ~65 characters per line at body text size — within the optimal 50-75 character range for sustained reading.

### Wide Breakout (~1100px)

For content that needs horizontal room: diagrams, tables, annotated illustrations, comparison layouts. Breaks out of the reading column but stays within the card. The expansion signals "look at this" without leaving the reading context.

### Full-Width (edge to edge)

For earned spectacle moments: hero openings, immersive scrollytelling, key vignettes, major visual beats. Breaks out of the card entirely. The canvas becomes the surface. Used sparingly — maybe 2-3 times across 13 chapters.

### The Compression/Expansion Rhythm (from NYT)

The column width changes communicate section transitions. Media type changes signal pacing. The reader doesn't need decorative dividers because the width shift IS the divider.

```
Reading column (prose)
  ↓ text ends, diagram begins
Wide breakout (diagram with annotations)
  ↓ diagram ends, prose resumes
Reading column (explanation of diagram)
  ↓ climactic concept, scrollytelling begins
Full-width (sticky diagram, scrolling text cards)
  ↓ scrollytelling ends, prose resumes
Reading column (synthesis)
```

---

## The Nav Bar

### Design

Slightly wider than the paper UI's minimal `☰ Contents` button. Persistent at the top. Serves two purposes: **orientation** (where am I) and **media controls** (listen to this chapter).

| Zone | Content |
|------|---------|
| Left | Chapter indicator: "4 · The Kernel ☰" — chapter number + title, always visible. Tapping opens the full TOC overlay. |
| Right | Audio controls — play/pause for the current chapter's narrated audio (stubbed initially). |

The chapter indicator doubles as the TOC toggle. You always know where you are without opening anything.

### Visual Treatment

- Background: white or near-white, with a subtle bottom border (`rgba(0,0,0,0.06)`)
- Fixed to the top of the viewport
- Height: 52px
- The chapter indicator uses Space Grotesk 500, uppercase, with the chapter number as a visual anchor
- Transitions smoothly when navigating between chapters

### TOC Overlay

When the chapter indicator is tapped, the full 13-chapter TOC expands below the nav. Clean list, current chapter highlighted with azure accent. Tapping a chapter navigates there and closes the overlay. Simple, functional, no animation flourish.

---

## Media Integration Principles

Each media type in the toolbox has a visual treatment that earns its space in the flow.

### Prose Blocks

The default. Serif-oriented, reading-column width. No container needed — the text IS the surface. This is where 70% of the experience lives.

### Diagram Blocks

Wide breakout or full-width depending on complexity. Clean SVG on white background (not dark void). Labels in Space Grotesk. Annotations in Inter. Minimal color — use azure for flow/connections, ink for labels, muted for secondary elements. The diagram should look like it belongs in a well-designed print textbook.

### Table Blocks

Wide breakout. Horizontal-rule style (NYT editorial tables, not data-grid UI). Clean hairline borders, generous cell padding. Headers in Inter 600.

### Code Blocks

Reading-column width. Light gray background (`--bg-code`) with subtle border. Monospace font (SF Mono / Fira Code / Cascadia Code). Not dark-on-light reverse — light background keeps the reading context consistent.

### Vignette Blocks (Stubbed)

30-60 second narrated motion graphic. Plays inline at reading-column or wide-breakout width. Poster frame visible by default. Simple play button overlay. When playing, the vignette takes focus but doesn't leave the page flow.

### Audio Blocks (Stubbed)

Integrated into the nav bar, not inline. The nav bar's right zone shows play/pause for the current chapter's narration. The reader can listen while reading or just listen. No inline audio player cluttering the prose.

### Chat Prompt Blocks (Stubbed)

Appear at natural break points within chapters (after complex concepts, at chapter end). A simple invitation: "Have a question about the orchestrator loop?" with a text input. Expands inline into a minimal chat interface. Scoped to the current chapter's content.

---

## Motion Philosophy

### Principle: Stillness by Default

The paper UI's authority comes from stillness. Content is present and readable without any animation. Motion is used only for:

1. **Chapter transitions** — a clean crossfade or slide when navigating between chapters
2. **Scroll reveals** — content fades in gently as you scroll to it (one-shot, 20px translate, 600ms)
3. **Media state changes** — vignette play/pause, chat expand/collapse
4. **Hover feedback** — links, nav items

Motion is NOT used for:
- Atmospheric effects
- Looping animations
- Parallax (except in the 1-2 scrollytelling moments)
- Attention-grabbing entrance sequences
- Any animation that fires while the reader is mid-sentence

### Reduced Motion

`prefers-reduced-motion: reduce` disables all transition animations. Content appears immediately. Scrollytelling becomes static stacked content. The site loses nothing essential.

---

## Scrollytelling (Sparingly)

For 1-2 climactic concepts across the entire masterclass. The pattern: a diagram or visual anchors (sticky) while text cards scroll past it, each card highlighting a different aspect of the visual. The orchestrator's THINK→DECIDE→ACT→OBSERVE cycle is a strong candidate.

### How It Works

- Full-width container
- Sticky visual on the left or center (~60% width)
- Text cards scroll on the right (~35% width)
- Each text card triggers a state change in the visual (highlight, animate, annotate)
- When the last card scrolls past, the sticky element releases and scrolls normally

### When to Use It

Only when the concept has:
1. A visual representation with distinct phases or components
2. Text that explains each phase separately
3. A benefit from seeing the whole while learning the parts

If the concept can be explained with a diagram and a paragraph, don't scrollytell it.

---

## Chapter Entry Pattern

Each chapter opens cleanly. Not the iyo-clean 85%-negative-space entry viewport from the previous guide (that was for a dark full-bleed scroll). Instead, a chapter opens with:

1. **Chapter number** — Space Grotesk, muted, small. "Chapter 6"
2. **Chapter title** — Lora 600, large. "The Orchestrator"
3. **Lead sentence** — Inter 400, slightly larger than body, secondary color. The one-sentence thesis.
4. **Body content begins** — Normal body text starts after a generous `margin-top`.

No eyebrow/headline/lead animation sequence. No atmospheric entrance. The content is simply there, like turning a page in a book.

---

## Diagram Visual Language (Revised)

The previous guide defined a 10-diagram family with glass edges, azure flows, void backgrounds, and depth shadows. That vocabulary was designed for dark mode. The new vocabulary is designed for print-editorial clarity on light backgrounds.

### Shared Traits

| Trait | Specification |
|-------|--------------|
| **Background** | White (same as card) or very light gray for contrast against the card |
| **Node borders** | 1px solid `rgba(0,0,0,0.15)` — visible but quiet |
| **Node fills** | White or very subtle tints (azure at 5%, warm at 5%) for grouping only |
| **Connection lines** | Azure (#0082EB) at 60-80% opacity. 1-2px stroke. Directional arrows 6px. |
| **Labels** | Space Grotesk 400-500, 11-13px. Component names, not descriptions. |
| **Text annotations** | Inter 400, 12-14px, secondary text color. Brief, not paragraphs. |
| **Depth** | Flat. No shadows on nodes. No 3D. Depth is communicated through containment and connection, not visual elevation. |
| **Width** | Wide breakout (~1100px) for relationship diagrams. Reading column for simple flows. |

### The Proof Standard (Preserved)

Every diagram must pass the proof test: **if you can't state what it proves, delete it.** This standard carries forward unchanged from the previous guide.

---

## What Changed from v2

| v2 (Previous) | v3 (Current) | Why |
|---------------|--------------|-----|
| Dark mode (void/slate backgrounds) | Light mode (warm canvas + white card) | The paper UI frame requires light backgrounds for typographic authority |
| Particle swarm atmospheric layer | No atmospheric effects | Media blocks replace particles as the source of visual richness |
| Glass cards with frosted blur | Clean bordered cards (if cards at all) | Glass requires dark backgrounds; the paper frame uses whitespace for separation |
| 48,000px infinite scroll | Chapter-based navigation (13 views) | Readers need breathing room between concepts; chapters provide structural breaks |
| Gradient accents (blue→purple) | Single flat accent (azure) | Restraint; one color doing one job everywhere |
| Copper conceptual accent | No secondary accent | Simplification; azure + ink hierarchy is sufficient |
| Section-mode system (void/slate/parchment) | Uniform light frame | No mode-shifting needed; all chapters share the same visual treatment |
| GSAP + Lenis scroll engine | Minimal vanilla JS | The chapter-based format doesn't need heavy scroll libraries |
| 10-diagram dark-mode family | Print-editorial diagram vocabulary | Diagrams on light backgrounds use different visual language |

---

## Evolution

**2026-04-08 (v1-v4):** Original aesthetic guide for the dark-mode atmospheric scroll experience. Defined particle swarm storyline, glass surfaces, mode-shifting between void/slate/parchment, iyo-clean entry viewports, and 10-diagram dark-mode family.

**2026-04-09 (v5 — this version):** Complete rewrite. The user directed a fundamental reframe: the masterclass is a multi-modal educational product, not a scroll website. The visual frame shifts from dark-mode atmospheric effects to a paper UI aesthetic (light, typographic, chapter-based). Three new reference sources: the XOR paper UI (authority through typography), iyo.ai (product-narrative polish), and NYT Interactives (media woven into reading rhythm). Particle swarm, glass surfaces, dark backgrounds, gradient accents, and mode-shifting are all explicitly retired. The column system (reading → wide → full-width) replaces the previous spatial strategy. Multimedia modalities (vignettes, audio, chat) are designed into the frame as first-class citizens, stubbed for later implementation.

**What does NOT change without deliberate discussion:**
- The three-typeface system (Lora reads, Inter works, Space Grotesk references)
- The proof standard for diagrams (if you can't state what it proves, delete it)
- The principle of content authority through restraint
- The prohibition on decorative imagery
- Accessibility requirements (WCAG AA, reduced motion, focus indicators)

---

*The goal: A reader finishes this masterclass and thinks, "That was the most carefully produced technical learning experience I've ever encountered." Not because it was flashy — because every visual decision and every media choice helped them understand.*
