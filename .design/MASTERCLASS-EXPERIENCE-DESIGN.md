# Amplifier Masterclass Experience Design

**Version:** 3.0
**Date:** 2026-04-09
**Status:** Strategic brief for multi-modal chapter-based learning experience

---

## What This Is

The Amplifier Masterclass is a multi-modal, chapter-based learning experience that teaches the Amplifier framework's architecture. The same curriculum (13 chapters) is consumable through reading, listening, watching, and conversing. The visual frame exists to make the content authoritative and to create room for multiple media types, not to be the spectacle itself.

This is not a documentation site. Not a marketing page. Not a choose-your-own-adventure. It is an opinionated editorial flow through 13 chapters, with multiple ways to digest each chapter's content.

## Why This Exists

The masterclass content is excellent: 13 chapters covering the full Amplifier architecture, written in an authoritative but accessible voice. Previous versions packaged this content as a dark-mode atmospheric scroll site with particle effects and glass surfaces. The visual craft was high but the frame was wrong. A polished document is still a document. Someone scrolls, reads, and leaves.

The v3 reframe asks: what if the content met people however they want to engage with it? The same concepts, available as:

- **Prose** you read at your own pace (the foundation)
- **Diagrams** that show spatial relationships text can't convey
- **Video vignettes** that animate concepts too dynamic for static media
- **Audio narration** you can listen to while doing other things
- **A conversational tutor** you can ask questions of when stuck

The static reading experience is the base. Everything else layers on.

---

## Design Philosophy

### Content Authority Through Typography, Not Effects

The previous direction used dark backgrounds, particle swarms, glass surfaces, and atmospheric washes to create visual authority. The v3 direction inverts this: authority comes from the typography, the whitespace, and the quality of the content itself. The frame is a clean white card on a warm canvas. The design disappears; the content speaks.

### Media Woven Into Narrative, Not Bolted On

Media types (vignettes, audio, diagrams, chat) are not in separate tabs or side panels. They appear inline within the reading flow at moments where that media type teaches better than prose. A diagram appears where spatial relationships need to be seen. A vignette appears where watching movement teaches faster than reading description. A chat prompt appears where the reader might have questions.

This follows the NYT interactive pattern: compression (narrow prose) and expansion (wide diagram, full-width scrollytelling) as a rhythm. The width changes ARE the section transitions.

### Opinionated, Not Customizable

The reader doesn't choose a "reading track" vs "listening track." The editorial flow is singular and opinionated. Within that flow, different media types serve different moments. The authoring team decides which chapter uses which media based on what the content demands. Some chapters are pure prose. Some are vignette-heavy. The toolbox is consistent; the composition is editorial.

---

## The Frame

### Visual Frame: Paper + iyo + NYT

Three reference sources, each contributing a specific quality:

| Reference | Contribution |
|-----------|--------------|
| **XOR Paper UI** | White card on canvas, serif-dominant typography, hidden-by-default navigation, authority through restraint |
| **iyo.ai** | Product-narrative polish, clean section entries, every element earns its place |
| **NYT Interactives** | Media woven into reading rhythm, compression/expansion between narrow text and wide/full-width media, scrollytelling |

### Navigation Frame: Chapter-Based

The 13 sections are now 13 chapters, each its own view/route. No infinite scroll. The reader is on "Chapter 6: The Orchestrator." They navigate between chapters via the nav bar.

**The nav bar** is persistent at the top. It shows the current chapter ("4 · The Kernel ☰"), expands the full TOC when tapped, and hosts audio playback controls on the right. The reader always knows where they are.

### Column System

| Width | Size | Usage |
|-------|------|-------|
| **Reading column** | ~650px | Default. Prose, inline code, small media. |
| **Wide breakout** | ~1100px | Diagrams, tables, annotated illustrations. |
| **Full-width** | Edge to edge | Hero moments, immersive scrollytelling, key vignettes. Rare (2-3 times total). |

The reading column is the resting state. Breakouts are earned moments of expansion.

---

## The Content Model

### 13 Chapters

Each chapter has its own view/route. Each is composed from a toolbox of content blocks. The composition is editorial, declared per chapter in frontmatter.

| Chapter | Title | Primary Content |
|---------|-------|-----------------|
| 1 | Introduction | Prose, overview |
| 2 | Architecture Map | Diagram (interactive), prose |
| 3 | Design Philosophy | Prose, principles |
| 4 | The Kernel | Prose, diagram, code |
| 5 | Module System | Prose, table, code, diagram |
| 6 | The Orchestrator | Prose, diagram (scrollytelling candidate), code |
| 7 | Tools vs Hooks | Prose, comparison layout, diagram, cascade visualization |
| 8 | Sessions | Prose, timeline, table |
| 9 | Bundles & Configuration | Prose, code, diagram |
| 10 | Foundation Bridge | Prose, diagram, code |
| 11 | Agents, Context, Recipes | Prose, tabs/sections |
| 12 | Complete Picture | Prose, layer stack, diagram |
| 13 | Appendix | Prose, reference |

### The Toolbox of Content Blocks

These are the available block types. Each chapter uses whatever combination serves its content. No fixed template.

| Block Type | Width | Description | Status |
|------------|-------|-------------|--------|
| **Prose** | Reading | Serif-oriented editorial text. The default. | Ready |
| **Diagram** | Wide or Full | SVG or interactive graph. Print-editorial style on light background. | Ready (needs new styling) |
| **Table** | Wide | Clean horizontal-rule style. Headers in Inter 600. | Ready |
| **Code** | Reading | Light gray background, monospace, syntax highlighted. | Ready |
| **Vignette** | Wide or Full | 30-60 second narrated motion graphic. Plays inline. | **Stub** |
| **Audio** | Nav bar | Chapter narration. Play/pause in the nav bar. | **Stub** |
| **Chat prompt** | Reading | Inline invitation to ask questions. Expands to chat interface. | **Stub** |
| **Scrollytelling** | Full | Sticky visual + scrolling text cards. For 1-2 climactic concepts. | Ready (needs implementation) |

### Per-Chapter Frontmatter

Each section file in `.design/sections/` has YAML frontmatter declaring which blocks the chapter uses, where they appear, and which are stubs:

```yaml
---
title: "The Orchestrator"
chapter: 6
blocks:
  - type: prose
  - type: diagram
    id: reasoning-loop
    width: wide
    placement: after-intro
  - type: vignette
    id: ooda-loop-explainer
    width: full
    placement: after-diagram
    status: stub
    rationale: "The 4-phase cycle animation would teach faster than text"
  - type: audio
    status: stub
---
```

---

## The Multimedia Pipeline (Designed, Not Built)

### Audio Narration (Stub)

Each chapter can have an audio version: a narrated reading adapted for the listening format. Generated via TTS (ElevenLabs, OpenAI TTS, or Google Cloud TTS) from the chapter's prose content, edited for conversational tone. Output: static MP3 per chapter. The nav bar's audio controls play the current chapter's narration.

### Video Vignettes (Stub)

A vignette is a 30-60 second narrated motion graphic explaining one concept. Not screen recordings. Not AI-generated video (Veo/Runway/etc. cannot produce clean diagrams or text). Instead: programmatic animation + TTS narration.

**Pipeline:**
1. LLM reads the chapter markdown
2. Generates a narration script + animation code (Manim or Motion Canvas)
3. ElevenLabs generates voiceover with word-level timestamps
4. The animation framework renders video synced to narration
5. Optional: Veo generates atmospheric B-roll composited as backgrounds
6. Human reviews and tweaks (~15-30 min per 60s piece)
7. Output: MP4 per vignette

**Placement:** Determined by editorial scan of all 13 chapters for where watching movement teaches faster than reading description. Not every chapter needs a vignette.

**Candidates (initial assessment):**
- Chapter 6: The orchestrator's THINK→DECIDE→ACT→OBSERVE cycle (loop animation)
- Chapter 5: Module mount lifecycle (sequence diagram animation)
- Chapter 8: Session spawning tree (parent→child branching)
- Chapter 7: The hook priority cascade (waterfall animation)

### Chat / Q&A (Stub)

Inline chat prompts at natural break points within chapters. When the reader engages, a chat interface expands inline. The LLM has the current chapter's content (plus surrounding context) as grounding material.

**Two implementation options:**
- **WebLLM** (browser-only): Gemma/Phi/Llama running entirely in-browser. No API key, no backend, works offline. Lower quality but zero infrastructure.
- **API-backed** (Anthropic/OpenAI/Google): Higher quality, requires a key. Could be offered as an upgrade path.

---

## What Ships First (The Base)

The base is the paper UI frame with the 13 chapters of masterclass content, navigable by chapter. The reading experience. Clean, authoritative, complete.

### Base includes:
- White card on warm canvas, single reading column (~650px)
- Chapter-based navigation via nav bar with TOC
- Each chapter is its own view/route
- Content blocks: prose, diagrams, tables, code
- The typography system from the paper UI
- Compression/expansion rhythm for media blocks
- Scrollytelling for 1-2 climactic concepts (if time permits)

### Stubbed for later:
- Vignette blocks: rendered as placeholder cards
- Audio controls in nav: present but inactive
- Chat prompts: present but non-functional
- The generative pipeline (Manim + TTS + compositing)
- WebLLM or API-backed chat

The stubs are visible in the UI with clear "coming soon" treatment so the multi-modal architecture is evident even before the media is produced.

---

## Technology Stack

### Framework: Astro

Astro 6, stripped back from the v2 build. No React islands for particle effects. The frame is HTML + CSS + minimal JS for:
- Chapter routing (Astro pages or client-side navigation)
- TOC toggle and chapter indicator
- Scroll-reveal animations (vanilla IntersectionObserver)
- Scrollytelling (vanilla JS + CSS position:sticky)
- Audio playback controls (native `<audio>` element)

### What's Removed from v2:
- React (ParticleSwarm.tsx, ScrollProvider.tsx)
- GSAP + Lenis scroll engine
- Particle swarm canvas
- Atmospheric gradient washes
- Glass card backdrop-filter effects
- Dark mode backgrounds and the void/slate/parchment system

### What's Preserved from v2:
- Astro project structure
- Self-hosted fonts (Lora, Inter, Space Grotesk)
- CSS custom property token system (rewritten for new palette)
- 13 section content files (`.design/sections/*.md`)

### Future Additions (Not in Base):
- Manim or Motion Canvas for vignette generation
- ElevenLabs or similar for TTS
- WebLLM for in-browser chat
- Veo for atmospheric B-roll (optional)

---

## Content Structure

| # | Chapter | Content Type | Blocks Used |
|---|---------|-------------|-------------|
| 1 | Introduction | Conceptual | Prose |
| 2 | Architecture Map | Orientational | Prose, Diagram (interactive) |
| 3 | Design Philosophy | Conceptual | Prose |
| 4 | The Kernel | Technical | Prose, Diagram, Code |
| 5 | Module System | Technical | Prose, Table, Code, Diagram |
| 6 | The Orchestrator | Technical | Prose, Diagram, Code, Vignette (stub), Scrollytelling |
| 7 | Tools vs Hooks | Technical | Prose, Comparison, Diagram, Cascade |
| 8 | Sessions | Technical | Prose, Timeline, Table |
| 9 | Bundles & Configuration | Technical | Prose, Code, Diagram |
| 10 | Foundation Bridge | Technical | Prose, Diagram, Code |
| 11 | Agents, Context, Recipes | Technical | Prose, Tabs/Sections |
| 12 | Complete Picture | Conceptual | Prose, Layer Stack, Diagram |
| 13 | Appendix | Reference | Prose |

---

## Error Handling & Graceful Degradation

- **JS disabled:** All content visible and readable. Scroll reveals don't fire (content is visible by default). TOC works via anchor links.
- **Audio fails to load:** Nav bar audio controls hidden. Reading experience unaffected.
- **Vignette fails to load:** Placeholder card remains. Caption describes what the vignette would show.
- **Chat fails to initialize:** Chat prompt stays visible but input is disabled with "unavailable" message.
- **Fonts fail to load:** System font stack fallback (Georgia for Lora, system sans for Inter, SF Mono for Space Grotesk).

---

## Testing Strategy

### Visual Verification
- Each chapter renders cleanly at 375px, 768px, 1024px, 1440px
- Card-on-canvas relationship is visible on desktop, card-as-page on mobile
- Three column widths (reading, wide, full) work correctly
- Typography hierarchy is clear: chapter titles > section headings > body > captions
- Diagrams are legible on light backgrounds (the new editorial style)

### Navigation Testing
- Nav bar shows correct chapter on every route
- TOC overlay opens, navigates, closes correctly
- Chapter transitions are clean (no flash of unstyled content)
- Audio controls (stubbed) are present and don't break layout

### Accessibility Testing
- All text passes WCAG AA contrast ratios
- Focus indicators visible on keyboard navigation
- Reduced motion preference disables all animations
- Screen reader can navigate via heading hierarchy and landmarks
- All images/diagrams have alt text

### Performance
- Static Astro build produces valid HTML/CSS/JS
- No React bundle shipped (Astro renders to static HTML)
- Core Web Vitals: LCP under 2.0s, CLS under 0.05
- Total page weight under 500KB per chapter (excluding fonts)

---

## Reference Sites

| Site | What We Took |
|------|-------------|
| XOR Paper UI | The frame: white card on canvas, serif-dominant typography, hidden-by-default navigation, authority through restraint |
| iyo.ai | Product-narrative polish: clean section entries, every element earns its place, editorial density discipline |
| NYT Interactives (Artemis II) | Media woven into reading: compression/expansion rhythm, scrollytelling, inline video, width changes as transitions |
