# Amplifier Masterclass Visual Overhaul — Session Report

**Session ID:** `146925dc-4210-4400-8035-5a342212d627`
**Project:** `amplifier-masterclass`
**Date:** 2026-04-10 / 2026-04-11
**Duration:** ~16 hours
**Turns:** 28 user turns, 163 tool calls, 26 sub-agents spawned

---

## 1. Session Overview

This was a deep, collaborative design session to create a comprehensive visual identity and illustration system for the Amplifier Masterclass — a 13-chapter technical education site explaining the Amplifier AI agent framework's architecture.

**Starting state:** The site was a 2,968-line standalone HTML file with dense technical prose, 5 broken dark-themed SVGs (invisible on the white background), 10 tiny "you are here" minimap widgets, 4 basic circle-based flow diagrams, and many "Coming soon" stubs.

**Goal:** Identify every place visuals should exist, establish art direction inspired by makingsoftware.com, create a detailed artifact manifest, build a production pipeline, and begin producing and inserting visual assets into the live site.

**Ending state:** Two comprehensive design documents authored. 20 concept images generated through creative exploration. All 10 minimaps removed. An interactive D3-powered dotgraph viewer inserted for §2. Animated philosophy cards built for §3. Nine code-drawn technical diagrams inserted for §4–§12. All committed to git.

---

## 2. Key Decisions Made (Chronological)

| # | Decision | Context |
|---|----------|---------|
| 1 | **makingsoftware.com as primary aesthetic reference** | User identified this site's blueprint illustration style as the target. Floppy disk exploded views, monospaced labels, flat fills, no gradients. |
| 2 | **Three-color rule: white + ink (#1A1815) + azure (#0082EB)** | Mapped from makingsoftware.com's cream/charcoal/electric-blue to the masterclass's warm stone/ink/azure palette. Semantic color only when teaching categorical distinctions. |
| 3 | **Typography split: Space Grotesk (naming) / Inter (explaining)** | Diagrams contain two text types — things that name (uppercase, tracked) and things that explain (sentence case). Lora stays in prose only. |
| 4 | **Four diagram families** | Architecture (nested containment), Flow (step sequences), Concept (side-by-side), Exploded/Assembly (isometric). Each with specific rules. |
| 5 | **Concept-first workflow** | After discovering DOT→SVG was structurally correct but aesthetically weak (6/10), and nano-banana concepts nailed the style but dropped structural details, the team adopted a hybrid: generate visual targets first, then build production SVGs toward them. |
| 6 | **Metaphorical illustrations over basic diagrams** | User explicitly rejected standard architecture diagrams in favor of objects-as-lessons (planet cross-sections, watches, spaceships, cars, amplifiers). |
| 7 | **Tube amp "fragile" correction** | User caught that describing vacuum tubes as "fragile" contradicted the kernel's nature as indestructible. Led to solid-state amp and studio rack alternatives. |
| 8 | **Abstract AI OS direction** | After exploring 6 metaphor families (13 concept images), user landed on "isometric exploded view of the actual system rendered as tangible hardware." |
| 9 | **Connection accuracy matters** | User pushed for architecturally accurate connections, triggering a deep content re-read that mapped 3 distinct connection types. |
| 10 | **Kill ALL minimaps** | User decided the 200×120 minimap widgets were fundamentally wrong — every replacement should be reading/wide/full width. |
| 11 | **makingsoftware.com figure interaction model** | Hover → subtle border, click → frosted-glass lightbox, 2-up grid layout, figure numbers only in lightbox. |
| 12 | **CPU-style SVG animations** | Subtle animations incorporated into philosophy cards (rotating concentric rings). |
| 13 | **Three philosophy cards as typographic feature boxes** | Bespoke SVG illustrations as card heroes, not icons. Each philosophy gets a visual symbol. |
| 14 | **Generated images over hand-drawn SVGs for section openers** | After first SVG openers felt "too schematic," redirected to nano-banana-generated illustrations matching the makingsoftware.com shader chapter style. |
| 15 | **Style convergence: makingsoftware fonts + masterclass colors** | Monospaced technical labels with warm amber/cream palette. |
| 16 | **Code-drawn SVG final production** | Once visual target was established via generated concepts, all 9 section diagrams redrawn as code (inline SVG). |

---

## 3. What Was Produced

### Design Documents

| File | Lines | Description |
|------|-------|-------------|
| `.design/AESTHETIC-GUIDE-DIAGRAMS.md` | 665 | Complete art direction — color rules, typography, four diagram families, stroke discipline, container system, 18 anti-patterns |
| `.design/VISUAL-STRATEGY.md` | 485 | Full visual strategy — content audit, 38-asset artifact manifest, production pipeline, batch sequencing |
| `.design/specs/diagrams/FIG-02a.md` | 104 | Detailed spec sheet for the Six-Layer Architecture hero diagram |

### Concept Images (20 total)

**Architecture Concepts (14):** Blueprint nested layers (v1, v2), planet cross-section, pocket watch, space station, spaceship (3 variants), rocket, classic car (2 variants), tube amp (2 variants), signal chain, solid-state amp, studio rack, AI OS (4 variants).

**Section Renders (9):** s4-kernel, s5-modules, s6-orchestrator, s7-tools-hooks, s8-sessions, s9-bundles, s10-foundation, s11-agents, s12-complete — all in makingsoftware.com shader chapter style with warm amber palette.

### DOT Pipeline Artifacts

| File | Description |
|------|-------------|
| `tools/dotgraph/sources/FIG-02a.dot` | 346-line DOT source, 14 nodes, 18 edges, 6 clusters |
| `tools/dotgraph/rendered/FIG-02a.raw.svg` | Raw Graphviz render |
| `tools/dotgraph/rendered/FIG-02a.raw.png` | PNG export |
| `public/diagrams/FIG-02a.svg` | Styled production SVG (28KB) |

### HTML Changes

**Removed:**
- Entire minimap system: CSS, JavaScript (MINIMAP_CFG, MINIMAP_LAYERS, LAYER_COLORS, buildMinimapSVG, injectMinimaps), all 10 runtime-injected SVG widgets

**Added:**

| Element | Chapter | Description |
|---------|---------|-------------|
| D3 Dotgraph Viewer | §2 | Interactive architecture graph — dark background, color-coded clusters, click-to-expand fullscreen, zoom/pan, node highlighting |
| Philosophy Cards | §3 | 3-card wide grid with bespoke SVGs: mechanism hub-and-spoke, animated concentric rings, struck-through icons + "0" |
| Section Diagram | §4 | 5 component blocks connected to EVENT BUS rail |
| Section Diagram | §5 | 6 cartridges on shared mount rail |
| Section Diagram | §6 | Privilege gap — dashed severed vs thick live wire |
| Section Diagram | §7 | Green/red split panel with eye/crossed-eye icons |
| Section Diagram | §8 | 4-phase pipeline with loop-back + child session |
| Section Diagram | §9 | 3 cascading config sheets → assembled result |
| Section Diagram | §10 | 8-step pipeline with 2 callback wires to kernel |
| Section Diagram | §11 | 3-column assembly from primitives |
| Section Diagram | §12 | 6 tapered bars, Community→Kernel |

---

## 4. Exploration & Iteration

### Phase 1: Pipeline Testing (Turns 2–4)
DOT→SVG→style-pass pipeline tested on FIG.02a. Structure 10/10 but aesthetic 6/10. Established that DOT is great for structure but insufficient for beauty.

### Phase 2: Concept-First Workflow (Turns 4–5)
Generated visual targets with nano-banana. 9/10 on style but dropped structural details. Established the "complementary strengths" insight: nano-banana for style, DOT for structure.

### Phase 3: Metaphor Exploration (Turns 5–9)
User rejected basic diagrams. Generated 13 metaphor concepts across 6 categories (planet, watch, space station, spaceship, car, amplifier) in ~2 hours. User caught "fragile" kernel mismatch. Creative peak of the session.

### Phase 4: Abstract AI OS (Turns 10–12)
Converged on "actual system rendered as tangible hardware." Deep content re-read extracted 3 connection types. Hero FIG.02a parked for later.

### Phase 5: Full Scope Refocus (Turns 13–17)
User pulled back to assess full site. 23-screenshot audit. Research into makingsoftware.com interaction model. Discovery of 21st.dev animation components.

### Phase 6: Production (Turns 18–28)
Built philosophy cards → first SVG openers (rejected as "too schematic") → generated images in shader style → iterated on s4 kernel style → code-drawn final diagrams → full insertion and verification.

---

## 5. Agents Used

| Agent | Count | Role |
|-------|-------|------|
| self (claude-opus-4-6) | 8 | Research, coding, HTML assembly |
| browser-tester:visual-documenter | 8 | 94+ screenshots, verification |
| foundation:modular-builder | 3 | Philosophy cards, section openers, code diagrams |
| foundation:explorer | 1 | Project structural inventory |
| design-intelligence-enhanced:art-director | 1 | Art direction synthesis |
| dot-graph:dot-author | 1 | FIG-02a DOT source |
| browser-tester:browser-researcher | 1 | 21st.dev component analysis |
| browser-tester:browser-operator | 1 | DOM inspection |
| foundation:git-ops | 1 | Commit |
| foundation:session-analyst | 1 | This report |

---

## 6. Current State

### Live on the site

- **§2:** Interactive D3 dotgraph viewer
- **§3:** Three animated philosophy cards
- **§4–§12:** Nine code-drawn SVG technical diagrams
- **Minimaps:** Completely removed
- **Page size:** 5,096 lines (up from 2,968)
- **Zero JS errors, all SVGs rendering, page scrolls cleanly**

### Git Commits

| Hash | Message |
|------|---------|
| `f471ace` | HTML changes (diagrams, cards, dotgraph viewer, minimap removal) |
| `a23d360` | Design artifacts and diagram assets |

**Branch:** master, 2 commits ahead of origin/master.

---

## 7. Open Items

| Status | Count | Details |
|--------|-------|---------|
| **Implemented** | 12 | §2 dotgraph + §3 cards (3) + §4–§12 diagrams (9) |
| **Concept explored** | 1 | FIG.02a (20 concepts, not finalized) |
| **Not started (P0)** | ~14 | Hero illustrations, scrollytelling, flow reworks |
| **Not started (P1)** | ~13 | Supporting diagrams |
| **Not started (P2)** | ~8 | Stretch goals |

### Key Remaining Work

1. **FIG.02a hero illustration** — 20 concepts explored but no final production asset
2. **Figure interaction system** — Hover/lightbox/2-up researched but not implemented
3. **SVG animations** — Proven on philosophy cards but not applied to section diagrams
4. **Section diagrams are placeholders** — Accurate but not the rich generated illustrations ultimately wanted
5. **5 existing dark-themed SVGs** need rework
6. **Push to origin** — 2 commits local only

---

## 8. Lessons Learned

### What Worked

1. **Concept-first workflow** — Generating visual targets before production SVGs saved time
2. **Rapid metaphor exploration** — 13 concepts in ~2 hours let the user discover preferences through reaction
3. **Browser agent verification** — Every insertion verified by screenshot. Caught the minimap JS still injecting.
4. **Content-accuracy deep dives** — Extracting exact connection maps from source produced honest visuals
5. **User-driven creative pivots** — Best moments came from user corrections ("fragile?", "too schematic", "find a happy middle")

### What Didn't Work

1. **Going deep on one diagram before scoping** — Spent 10 turns on FIG.02a before assessing full needs
2. **First SVG openers too simple** — Rejected as "too schematic"
3. **DOT→SVG pipeline has a ceiling** — Aesthetically limited for hero illustrations
4. **Font embedding in standalone SVGs fragile** — @import unreliable across renderers

### Do Differently Next Time

1. **Scope first, depth second** — Full replacement map before going deep on any single asset
2. **Generate ALL visual targets early** — One batch of concepts for every section before production
3. **Build figure component system first** — Reusable hover/lightbox/2-up before individual illustrations
4. **Separate exploration from production** — Creative exploration session then production session