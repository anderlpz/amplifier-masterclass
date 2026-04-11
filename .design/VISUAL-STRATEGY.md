# Amplifier Masterclass — Visual Strategy & Artifact Manifest

**Created:** 2026-04-10
**Status:** Active — master plan for all visual asset production
**Companion to:** `AESTHETIC-GUIDE-DIAGRAMS.md` (art direction), `DESIGN-SYSTEM.md` (tokens)
**Reference inspiration:** makingsoftware.com (blueprint illustration language)

---

## Executive Summary

The Amplifier Masterclass has 13 chapters of dense technical content. Currently, 5 SVG diagrams exist (all dark-themed, broken on the white card), 11+ diagram placeholders are declared in `chapters.ts` but unbuilt, and multimedia stubs (vignettes, chat, audio) are all "Coming soon."

This document defines:
1. **Every location** in the content where a visual asset should exist
2. **Art direction** grounding (summarized; full guide in `AESTHETIC-GUIDE-DIAGRAMS.md`)
3. **Detailed artifact manifest** — 38 visual assets across 13 chapters
4. **Production pipeline** — how to create each asset type systematically

---

## Part 1: Content Audit — Where Visuals Are Needed

### Methodology

Every section of the masterclass was evaluated for visual opportunity using three criteria:
- **Does the concept have spatial/structural relationships?** → Diagram
- **Is the concept a comparison or contrast?** → Side-by-side or comparison panel
- **Is the concept a process or sequence?** → Flow diagram or scrollytelling
- **Does the concept use a metaphor that could be illustrated?** → Illustrated metaphor

Sections that are pure prose explanation (e.g., "Why mechanism over policy matters") do NOT get diagrams. The proof test applies: if you can't state what the diagram proves, delete it.

### Chapter-by-Chapter Visual Audit

#### Chapter 1: Introduction
**Current state:** Prose only, no visuals.
**Opportunities:**
- **1a — The Harness Metaphor** (§Abstract/1.0): The "harness" concept (climbing harness, electrical harness, AI harness) is the masterclass's anchor metaphor. An illustrated triptych showing three harness types → converging into "AI harness" would ground the entire document's central analogy. *Type: Illustrated concept.*
- **1b — What This Document Covers** (§1.2): The chapter list reads as a linear outline. A visual roadmap showing the 12 sections as a path/journey map would orient the reader. *Type: Navigation/roadmap.*

#### Chapter 2: Architecture Map
**Current state:** Has `architecture-stack.svg` (dark-themed, broken). Declares 2 diagram blocks.
**Opportunities:**
- **2a — The Six-Layer Stack** (§2.1): THE definitive architecture diagram. Six concentric rings/layers. Kernel at center, ecosystem at edge. Must be the single most polished diagram in the entire masterclass. *Type: Architecture (§2.2 of art guide). Priority: P0.*
- **2b — Interactive Architecture Explorer** (§2.1 end): The "city map" before walking the streets. A full-width interactive version where hovering/clicking reveals layer details. *Type: Interactive/scrollytelling. Priority: P2 (stretch).*

#### Chapter 3: Design Philosophy
**Current state:** Prose only. Declares 1 diagram block.
**Opportunities:**
- **3a — Mechanism vs Policy** (§3.1): The OS kernel analogy. Left: kernel (mechanism — fires events, collects results). Right: modules (policy — safety, logging, compliance). The structural parallel IS the teaching. *Type: Concept/comparison (§2.4). Priority: P0.*
- **3b — The Center Stays Still** (§3.2): Concentric rings where the outer rings rotate/change while the inner ring is fixed. "New model? Provider module. New tools? Tool module. Kernel unchanged." *Type: Concept. Priority: P1.*

#### Chapter 4: The Kernel
**Current state:** Prose + code block. Declares 1 diagram + vignette stub.
**Opportunities:**
- **4a — Five Kernel Components** (§4.0): The five things that live in the kernel: Session Lifecycle, Contracts, Module Loader, Coordinator, Hooks. Nothing else. An architecture diagram showing the kernel as a contained space with exactly five labeled components. *Type: Architecture (§2.2). Priority: P0.*
- **4b — Session Lifecycle Flow** (§4.1): Four phases: Create → Initialize → Execute → Cleanup. Linear flow with the Execute phase showing a loop-back arrow (repeatable). Cleanup in a `finally` block. *Type: Flow (§2.3). Priority: P0.*
- **4c — The Mount Contract** (§4.2/4.5): The universal `mount(coordinator, config) -> cleanup_fn` contract shown as a schematic. All six module types converging on the same interface. *Type: Concept. Priority: P1.*

#### Chapter 5: Module System
**Current state:** Prose + table + code block. Declares 1 diagram + vignette stub.
**Opportunities:**
- **5a — Six Module Types** (§5.1): The module taxonomy. Already has a table, but a visual showing the six types with their cardinality and required/optional status would reinforce the taxonomy. Key distinction: Tools (AI-visible) vs Hooks (AI-invisible). *Type: Architecture. Priority: P1.*
- **5b — Loading Order** (§5.3): Five steps in fixed sequence: ① Orchestrator → ② Context Manager → ③ Providers → ④ Tools → ⑤ Hook Handlers. First two required (hard stop), last three optional (warn and continue). *Type: Flow (§2.3). Priority: P0.*
- **5c — Module Exploded View** (§5.0): A module shown as an exploded isometric assembly — the mount function at center, inputs (coordinator, config) entering, the module self-registering into the coordinator slot. *Type: Exploded/Assembly (§2.5). Priority: P1.*

#### Chapter 6: The Orchestrator
**Current state:** Has `reasoning-loop.svg` (dark-themed, broken). Declares diagram + scrollytelling + vignette + chat stubs.
**Opportunities:**
- **6a — The Privilege Gap** (§6.1): Every module gets the Coordinator once at mount. The Orchestrator gets it again at runtime. A diagram showing the single arrow (mount) for all modules vs the double arrow (mount + runtime) for the Orchestrator. *Type: Concept. Priority: P0.*
- **6b — One Turn of Conversation** (§6.2): THE scrollytelling moment. A step-by-step flow of what happens when you send a message: message arrives → hooks fire → orchestrator fetches context → provider calls model → model wants tool → hooks check → tool executes → hooks inject feedback → response returned. *Type: Flow/Scrollytelling (§2.3 + §9). Priority: P0.*
- **6c — The Orchestrator Loop** (§6.3): OODA-style cycle: Think → Act → Observe → Decide. Orchestrator at center. Rectangular cycle diagram. *Type: Flow/Cycle (§2.3). Priority: P1.*

#### Chapter 7: Tools vs Hooks
**Current state:** Has `tools-vs-hooks.svg` (dark-themed, broken). Has ComparisonLayout and CascadeVisualization components. Declares 3 diagrams + vignette + chat stubs. **Most visually dense chapter.**
**Opportunities:**
- **7a — Tools vs Hooks Comparison** (§7.0/7.1/7.2): THE definitive comparison panel. Two columns: Tools (green, AI-visible, intentional) vs Hooks (red, AI-invisible, automatic). The existing `ComparisonLayout` component handles the structure. *Type: Concept/Comparison (§2.4). Priority: P0.*
- **7b — The Code Quality Problem** (§7.3): Two approaches side by side: "As a tool" (AI might forget) vs "As a hook" (guaranteed every time). Shows the unreliability of the tool approach vs the certainty of the hook approach. *Type: Concept/Comparison. Priority: P1.*
- **7c — Priority Cascade** (§7.4): Five priority levels: Deny → Ask User → Inject Context → Modify → Continue. Waterfall from highest to lowest authority. The existing `CascadeVisualization` component handles this. *Type: Concept (§2.4, cascade variant). Priority: P0.*
- **7d — inject_context Flow** (§6.2/7.0): How a hook places a message into the conversation that the AI reads naturally. The most powerful hook action visualized as a flow where the hook inserts into the message stream. *Type: Flow (§2.3). Priority: P1.*
- **7e — Events and Dispatch** (§7.5): The unified dispatch mechanism: event fires → registered hooks respond → results collected. Show the 41 canonical events organized by namespace (session:*, tool:*, provider:*, prompt:*, context:*). *Type: Architecture. Priority: P2.*

#### Chapter 8: Sessions
**Current state:** Has `session-tree.svg` (dark-themed, broken). Declares 1 diagram + table.
**Opportunities:**
- **8a — Session Four Phases** (§8.1): Extends 4b with more detail specific to sessions. Create → Initialize → Execute → Cleanup. Show what happens in each phase. *Type: Flow (§2.3). Priority: P1 (may merge with 4b).*
- **8b — Parent and Child Sessions** (§8.2): The session tree. Parent session spawns child sessions. Key insight: `parent_id` is the ONLY link — no shared modules, memory, or config. Each session fully self-contained. *Type: Architecture/Tree. Priority: P0.*
- **8c — Cancellation States** (§8.4): Three states: No cancellation → Graceful → Immediate. Cooperative, not preemptive. The Orchestrator must check the flag. *Type: Flow (§2.3, simple). Priority: P2.*

#### Chapter 9: Bundles and Configuration
**Current state:** Prose + code block. Declares 2 diagram blocks.
**Opportunities:**
- **9a — Bundle Composition** (§9.2): THE exploded view moment. A bundle shown as layers: base bundle → team bundle → project bundle. Each layer specifying only what it changes. "Last wins" merge strategy. *Type: Exploded/Assembly (§2.5). Priority: P0.*
- **9b — @mention Resolution** (§9.3): How @namespace:path resolves. Recursive resolution up to 3 levels. SHA-256 deduplication. Show the chain: bundle instruction → @mention → file on disk → content in system prompt. *Type: Flow (§2.3). Priority: P1.*
- **9c — The Two Formats** (§9.1): Markdown+YAML vs pure YAML. A minimal visual showing the anatomy of each format. *Type: Concept. Priority: P2.*

#### Chapter 10: The Foundation Bridge
**Current state:** Prose only. Declares 2 diagram blocks.
**Opportunities:**
- **10a — The Preparation Pipeline** (§10.2): Eight steps from text file to running session. Foundation's practical work. *Type: Flow (§2.3). Priority: P1.*
- **10b — Two Live Channels** (§10.3-10.6): Foundation's two runtime callbacks: System Prompt Factory (every turn) and BundleModuleResolver (on demand). Cross-section view showing the kernel calling into Foundation at runtime without code dependency. *Type: Cross-section (§2.6). Priority: P0.*
- **10c — PreparedBundle Structure** (§10.1): Four-part output: mount plan, resolver, original bundle, package paths. *Type: Architecture (simple). Priority: P2.*

#### Chapter 11: Agents, Context Files, Skills & Recipes
**Current state:** Prose only. Declares 1 diagram + vignette stub.
**Opportunities:**
- **11a — Agents = Bundles** (§11.1): Side-by-side showing a bundle file and an agent file. One difference: `bundle:` vs `meta:` in frontmatter. Everything else identical. *Type: Concept/Comparison. Priority: P1.*
- **11b — Skills Progressive Disclosure** (§11.4): Three-level stack: Level 1 (metadata, ~100 tokens, always visible) → Level 2 (full content, ~1-5k tokens, on demand) → Level 3 (companion files, 0 tokens until accessed). *Type: Architecture/Stack. Priority: P1.*
- **11c — Recipe Pipeline** (§11.3): Steps chained together, each running its own session. Output → Input. Approval gates between steps. Checkpoint indicators. *Type: Flow (§2.3). Priority: P1.*
- **11d — Modes & Model Routing** (§11.5): The routing matrix concept: agents declare roles (coding, reasoning, critique) → matrix maps to concrete models. *Type: Concept. Priority: P2.*

#### Chapter 12: The Complete Picture
**Current state:** Has `request-flow.svg` (dark-themed, broken). Declares 2 diagram blocks + chat stub.
**Opportunities:**
- **12a — The Full Six-Layer Stack** (§12.1): The culminating diagram. All six layers with full detail. This is 2a but complete — after 11 chapters, every element is now familiar. *Type: Architecture (§2.2). Priority: P0.*
- **12b — Where New Things Go** (§12.2): A decision tree or routing table: "If you want to add a new AI model → Layer 2, Provider module." Shows where each new capability belongs. *Type: Concept/Table. Priority: P1.*
- **12c — Single Request Flow** (§12.0): One user message flowing through all six layers, top to bottom. The complete journey. *Type: Flow (§2.3, vertical). Priority: P0.*

#### Chapter 13: Appendix — Research Methodology
**Current state:** Prose only.
**Opportunities:**
- **13a — Investigation Summary** (§A): The Parallax Discovery methodology: 7 investigators, 4 teams, 37 verified claims. A compact infographic-style summary of the research stats. *Type: Data summary. Priority: P2.*

---

## Part 2: Art Direction Summary

Full art direction is in `AESTHETIC-GUIDE-DIAGRAMS.md`. Key principles summarized here for reference:

### The Three-Color Rule
- **Ground:** White (#FFFFFF) — diagrams sit on the white card
- **Ink:** #1A1815 — all structural lines, primary labels, node outlines
- **Blueprint:** #0082EB (Amplifier Azure) — all functional/active fills, flow lines, arrows
- Semantic color (green/red for tools/hooks, cascade palette) ONLY when the diagram teaches a categorical distinction

### Typography in Diagrams
- **Space Grotesk 500 UPPERCASE** — names things (node labels, step numbers, figure numbers)
- **Inter 400 sentence case** — explains things (annotations, descriptions)
- **Lora NEVER appears in diagrams** — it's the reading voice, stays in prose

### Four Diagram Families
1. **Architecture** — nested containment rectangles, kernel boundary gets emphasis stroke
2. **Flow** — linear sequences with step numbers, cycle rectangles for loops
3. **Concept** — side-by-side comparison panels, semantic color permitted
4. **Exploded/Assembly** — 30° isometric projection, separated components with leader lines

### Container Treatment
- Dotted border frame (1px dotted, rgba(0,0,0,0.12))
- Optional dot-grid background for architecture and exploded views
- Figure numbers: `FIG. XX` format, Space Grotesk 400, muted color
- Captions below: Inter 400, states what the diagram proves

---

## Part 3: Complete Artifact Manifest

### Priority Levels
- **P0** — Essential. The chapter is incomplete without this visual. Ship before launch.
- **P1** — Important. Significantly improves comprehension. Ship in first revision.
- **P2** — Enhancement. Nice to have. Can wait for future iteration.

### Master Artifact List

| ID | Chapter | Title | Type | Art Guide § | Width | Priority | Semantic Color? | Grid BG? | Status |
|----|---------|-------|------|-------------|-------|----------|-----------------|----------|--------|
| `FIG.01a` | 1 | The Harness Metaphor | Illustrated concept | — | Wide | P1 | No | No | Not started |
| `FIG.01b` | 1 | Document Roadmap | Navigation/roadmap | — | Wide | P2 | No | No | Not started |
| `FIG.02a` | 2 | Six-Layer Architecture | Architecture | §2.2 | Wide | P0 | Azure tints | Yes | Needs rework (dark SVG exists) |
| `FIG.02b` | 2 | Interactive Explorer | Interactive | §2.2+§9 | Full | P2 | Azure tints | Yes | Not started |
| `FIG.03a` | 3 | Mechanism vs Policy | Concept/comparison | §2.4 | Wide | P0 | No | No | Not started |
| `FIG.03b` | 3 | The Center Stays Still | Concept | §2.4 | Wide | P1 | No | No | Not started |
| `FIG.04a` | 4 | Five Kernel Components | Architecture | §2.2 | Wide | P0 | No | Yes | Not started |
| `FIG.04b` | 4 | Session Lifecycle Flow | Flow | §2.3 | Wide | P0 | No | No | Not started |
| `FIG.04c` | 4 | The Mount Contract | Concept | §2.4 | Reading | P1 | No | No | Not started |
| `FIG.05a` | 5 | Six Module Types | Architecture | §2.2 | Wide | P1 | No | No | Not started |
| `FIG.05b` | 5 | Loading Order | Flow | §2.3 | Wide | P0 | No | No | Not started |
| `FIG.05c` | 5 | Module Exploded View | Exploded/Assembly | §2.5 | Wide | P1 | No | Yes | Not started |
| `FIG.06a` | 6 | The Privilege Gap | Concept | §2.4 | Wide | P0 | No | No | Not started |
| `FIG.06b` | 6 | One Turn of Conversation | Flow/Scrollytelling | §2.3+§9 | Full | P0 | No | No | Not started |
| `FIG.06c` | 6 | Orchestrator Loop | Flow/Cycle | §2.3 | Wide | P1 | No | No | Needs rework (dark SVG exists) |
| `FIG.07a` | 7 | Tools vs Hooks | Concept/comparison | §2.4 | Wide | P0 | Green/Red | No | Needs rework (dark SVG exists) |
| `FIG.07b` | 7 | Code Quality Problem | Concept/comparison | §2.4 | Wide | P1 | No | No | Not started |
| `FIG.07c` | 7 | Priority Cascade | Concept/cascade | §2.4 | Reading | P0 | 5 cascade colors | No | Not started |
| `FIG.07d` | 7 | inject_context Flow | Flow | §2.3 | Wide | P1 | No | No | Not started |
| `FIG.07e` | 7 | Events & Dispatch | Architecture | §2.2 | Wide | P2 | No | No | Not started |
| `FIG.08a` | 8 | Session Phases | Flow | §2.3 | Wide | P1 | No | No | Not started |
| `FIG.08b` | 8 | Parent-Child Sessions | Architecture/Tree | §2.2 | Wide | P0 | No | Yes | Needs rework (dark SVG exists) |
| `FIG.08c` | 8 | Cancellation States | Flow | §2.3 | Reading | P2 | No | No | Not started |
| `FIG.09a` | 9 | Bundle Composition | Exploded/Assembly | §2.5 | Wide | P0 | No | Yes | Not started |
| `FIG.09b` | 9 | @mention Resolution | Flow | §2.3 | Wide | P1 | No | No | Not started |
| `FIG.09c` | 9 | Two Bundle Formats | Concept | §2.4 | Reading | P2 | No | No | Not started |
| `FIG.10a` | 10 | Preparation Pipeline | Flow | §2.3 | Wide | P1 | No | No | Not started |
| `FIG.10b` | 10 | Two Live Channels | Cross-section | §2.6 | Wide | P0 | No | Yes | Not started |
| `FIG.10c` | 10 | PreparedBundle Structure | Architecture | §2.2 | Reading | P2 | No | No | Not started |
| `FIG.11a` | 11 | Agents = Bundles | Concept/comparison | §2.4 | Wide | P1 | No | No | Not started |
| `FIG.11b` | 11 | Skills Progressive Disclosure | Architecture/Stack | §2.2 | Wide | P1 | No | No | Not started |
| `FIG.11c` | 11 | Recipe Pipeline | Flow | §2.3 | Wide | P1 | No | No | Not started |
| `FIG.11d` | 11 | Model Routing Matrix | Concept | §2.4 | Wide | P2 | No | No | Not started |
| `FIG.12a` | 12 | Full System Stack | Architecture | §2.2 | Wide/Full | P0 | Azure tints | Yes | Not started |
| `FIG.12b` | 12 | Where New Things Go | Concept/Table | §2.4 | Wide | P1 | No | No | Not started |
| `FIG.12c` | 12 | Single Request Flow | Flow (vertical) | §2.3 | Wide | P0 | No | No | Needs rework (dark SVG exists) |
| `FIG.13a` | 13 | Research Summary | Data summary | — | Reading | P2 | No | No | Not started |

### Summary by Priority

| Priority | Count | Description |
|----------|-------|-------------|
| **P0** | 15 | Essential — ship before launch |
| **P1** | 15 | Important — first revision |
| **P2** | 8 | Enhancement — future iteration |
| **Total** | **38** | |

### Summary by Status

| Status | Count | Notes |
|--------|-------|-------|
| **Not started** | 33 | New assets to create |
| **Needs rework** | 5 | Existing dark-themed SVGs to adapt to light theme |
| **Total** | **38** | |

### Summary by Type

| Type | Count |
|------|-------|
| Architecture | 10 |
| Flow | 13 |
| Concept/Comparison | 11 |
| Exploded/Assembly | 2 |
| Cross-section | 1 |
| Illustrated/Other | 1 |

---

## Part 4: Production Pipeline

### Pipeline Overview

Each diagram goes through a **six-stage pipeline**. Some stages can be parallelized across diagrams.

```
STAGE 1        STAGE 2         STAGE 3         STAGE 4         STAGE 5          STAGE 6
Spec Sheet  →  DOT Source   →  SVG Render   →  Style Pass   →  Review Gate  →  Integration
(what it       (structure)     (raw layout)    (art direction)  (quality)       (into site)
 proves)
```

### Stage 1: Spec Sheet

Before any diagram is drawn, write a spec sheet answering:

1. **What does this diagram prove?** (One sentence. If you can't state it, delete the diagram.)
2. **What would the reader lose without it?** (Justification)
3. **What type is it?** (Architecture / Flow / Concept / Exploded / Cross-section)
4. **What nodes and edges exist?** (Exhaustive list)
5. **What labels are needed?** (Naming labels in Space Grotesk UPPERCASE, explaining labels in Inter)
6. **What width?** (Reading / Wide / Full)
7. **Semantic color?** (Yes/No — if yes, which tokens)
8. **Grid background?** (Yes/No)
9. **Figure number?** (FIG.XX format)
10. **Caption text?** (One sentence stating what it proves)

**Tool:** Create spec sheets as markdown files in `.design/specs/diagrams/FIG-XXx.md`

**Agent:** Use `foundation:zen-architect` in ANALYZE mode to validate that each spec sheet's "what it proves" actually matches the content being taught.

### Stage 2: DOT Source

Convert the spec sheet into a DOT/Graphviz source file that captures the structure.

**Why DOT first:** DOT captures relationships and hierarchy without visual styling. This forces structural correctness before aesthetic choices. The DOT source is also diffable, versionable, and machine-analyzable.

**Tool:** `dot_graph` tool for validation and rendering
**Agent:** `dot-graph:dot-author` for DOT creation — it carries full DOT syntax knowledge and pattern libraries
**Output:** `.dot` files in `tools/dotgraph/sources/FIG-XXx.dot`

**DOT conventions for this project:**
- Use `rankdir=TB` for flows (top-to-bottom), `rankdir=LR` for comparisons
- Use `subgraph cluster_X` for containment grouping
- Node labels are the UPPERCASE names from the spec sheet
- Edge labels are annotation text from the spec sheet
- Do NOT apply visual styling in DOT — that's Stage 4

### Stage 3: SVG Render

Render the DOT source to SVG using the Graphviz layout engine.

**Tool:** `dot_graph(operation="render", options={format: "svg"})`
**Layout engines:**
- `dot` — hierarchical layouts (flows, trees, layer stacks). Default.
- `neato` — spring-model layouts (clusters, networks). For session trees (FIG.08b).
- `fdp` — force-directed. For the interactive explorer concept (FIG.02b).

**Output:** Raw SVG in `tools/dotgraph/rendered/FIG-XXx.raw.svg`

This SVG will have default Graphviz styling — wrong fonts, wrong colors, wrong strokes. That's expected. Stage 4 fixes it.

### Stage 4: Style Pass

Apply the art direction from `AESTHETIC-GUIDE-DIAGRAMS.md` to the raw SVG.

**This is the most labor-intensive stage.** Each diagram gets hand-finished to match the blueprint aesthetic.

**Operations:**
1. **Replace fonts:** Graphviz default → Space Grotesk 500 UPPERCASE for labels, Inter 400 for annotations
2. **Apply color tokens:** Replace default fills/strokes with ink (#1A1815), blueprint (#0082EB), blueprint wash (rgba(0,130,235,0.08))
3. **Set stroke widths:** 1px (standard), 1.5px (flow), 2px (emphasis)
4. **Add container frame:** Dotted border, optional grid background
5. **Add figure number:** FIG.XX in muted Space Grotesk, positioned per art guide
6. **Add caption:** Below frame, Inter 400, states what it proves
7. **Ensure accessibility:** `role="img"`, `aria-label`, `<title>`, `<desc>`
8. **Embed fonts:** @import in SVG `<style>` block

**For diagrams that need hand-crafting (exploded views, cross-sections):**
The DOT→SVG pipeline won't produce isometric projection. These diagrams are authored directly in SVG or in a vector tool (Figma/Illustrator) following the art guide rules.

**Agent:** Use `foundation:modular-builder` for systematic SVG transformation when patterns are repetitive, or `self` delegation for hand-crafting each diagram.

**Output:** Styled SVG in `public/diagrams/FIG-XXx.svg`

### Stage 5: Review Gate

Every diagram must pass review before shipping.

**Checklist (from AESTHETIC-GUIDE-DIAGRAMS.md §10):**
- [ ] Three-color rule followed (or documented semantic exception)
- [ ] All text is Space Grotesk UPPERCASE (naming) or Inter sentence case (explaining)
- [ ] Stroke weights are exactly 1px, 1.5px, or 2px
- [ ] No gradients, no shadows on nodes, no 3D on flat diagrams
- [ ] Figure number assigned (FIG. XX format)
- [ ] Caption written (states what the diagram proves)
- [ ] Placed at correct width (reading/wide/full)
- [ ] All arrows have filled arrowheads and clear direction
- [ ] No more than ~15 nodes visible at once
- [ ] Accessibility: `aria-label`, `<title>`, `<desc>` present
- [ ] Passes proof test: can state what it proves in one sentence
- [ ] Passes slop test: could NOT be produced by a generic AI for any product

**Visual review:** Use `nano-banana(operation="analyze")` to check the rendered diagram against the art direction. Does it feel like a blueprint illustration? Or does it feel like a generic SaaS diagram?

**Agent:** `dot-graph:diagram-reviewer` for structural DOT review. Use `design-intelligence-enhanced:design-check` for visual consistency with design context.

### Stage 6: Integration

Place the finished SVG into the Astro site.

**Operations:**
1. Copy styled SVG to `public/diagrams/FIG-XXx.svg`
2. Update `src/data/chapters.ts` — set the diagram block's `src` to the new file, change `status` from `'stub'` to `'ready'`
3. Verify the `Diagram.astro` component renders it correctly in the white card context
4. Check responsive behavior at mobile/tablet/desktop
5. Verify `[data-reveal]` scroll animation works (if the attribute has been added to Diagram blocks)

**The SVG color bug:** The existing 5 SVGs use white text on transparent backgrounds (designed for dark contexts). These need the full Stage 4 treatment — not a quick color swap. Rework them from their conceptual content, not by trying to invert the existing SVG.

---

### Production Sequence (Recommended Order)

**Phase 1: P0 Foundation (15 diagrams)**
Start with the diagrams that appear in the most critical chapters and establish the visual vocabulary.

```
Batch 1 — Architecture anchors (establish the style):
  FIG.02a  Six-Layer Architecture    (THE definitive diagram)
  FIG.04a  Five Kernel Components
  FIG.12a  Full System Stack          (bookend — mirrors 2a with full detail)

Batch 2 — Flow diagrams (establish the flow language):
  FIG.04b  Session Lifecycle Flow
  FIG.05b  Loading Order
  FIG.06b  One Turn of Conversation  (scrollytelling — most complex)
  FIG.12c  Single Request Flow

Batch 3 — Concept diagrams (establish the comparison language):
  FIG.03a  Mechanism vs Policy
  FIG.06a  The Privilege Gap
  FIG.07a  Tools vs Hooks
  FIG.07c  Priority Cascade

Batch 4 — Remaining P0:
  FIG.08b  Parent-Child Sessions
  FIG.09a  Bundle Composition         (exploded view — establish the isometric language)
  FIG.10b  Two Live Channels          (cross-section — new technique)
```

**Phase 2: P1 Enhancement (15 diagrams)**
Fill in supporting diagrams that deepen comprehension.

```
Batch 5 — Chapter 1, 3, 4 supplements:
  FIG.01a  The Harness Metaphor
  FIG.03b  The Center Stays Still
  FIG.04c  The Mount Contract

Batch 6 — Module & Orchestrator supplements:
  FIG.05a  Six Module Types
  FIG.05c  Module Exploded View
  FIG.06c  Orchestrator Loop
  FIG.07b  Code Quality Problem
  FIG.07d  inject_context Flow

Batch 7 — Sessions, Bundles, Foundation, Agents:
  FIG.08a  Session Phases
  FIG.09b  @mention Resolution
  FIG.10a  Preparation Pipeline
  FIG.11a  Agents = Bundles
  FIG.11b  Skills Progressive Disclosure
  FIG.11c  Recipe Pipeline
  FIG.12b  Where New Things Go
```

**Phase 3: P2 Stretch (8 diagrams)**
Enhancements for completeness.

```
Batch 8 — Remaining:
  FIG.01b  Document Roadmap
  FIG.02b  Interactive Explorer
  FIG.07e  Events & Dispatch
  FIG.08c  Cancellation States
  FIG.09c  Two Bundle Formats
  FIG.10c  PreparedBundle Structure
  FIG.11d  Model Routing Matrix
  FIG.13a  Research Summary
```

---

### Toolchain Summary

| Stage | Primary Tool | Agent | Output |
|-------|-------------|-------|--------|
| 1. Spec | Markdown writing | `zen-architect` (validation) | `.design/specs/diagrams/FIG-XXx.md` |
| 2. DOT | `dot_graph` tool | `dot-graph:dot-author` | `tools/dotgraph/sources/FIG-XXx.dot` |
| 3. Render | `dot_graph(render)` | — (automated) | `tools/dotgraph/rendered/FIG-XXx.raw.svg` |
| 4. Style | SVG editing | `modular-builder` or manual | `public/diagrams/FIG-XXx.svg` |
| 5. Review | `nano-banana(analyze)` | `diagram-reviewer` + `design-check` | Pass/Fail verdict |
| 6. Integrate | File ops + chapters.ts update | `modular-builder` | Live in Astro site |

### Parallelization Strategy

- **Stages 1-2 can be batched:** Write all spec sheets for a batch, then create all DOT sources
- **Stage 3 is automated:** All DOT→SVG renders happen in parallel
- **Stage 4 is the bottleneck:** Each diagram needs individual attention. However, diagrams of the same type share styling patterns:
  - All Architecture diagrams share containment rectangle + ring label treatment
  - All Flow diagrams share step number + arrow conventions
  - All Concept diagrams share comparison panel structure
  - Template SVG fragments can be reused across same-type diagrams
- **Stage 5 can be parallel:** Multiple diagrams reviewed simultaneously
- **Stage 6 is sequential per chapter:** But chapters are independent

### Estimated Effort

| Type | Per diagram | Notes |
|------|-----------|-------|
| Architecture | 30-45 min | Containment nesting, careful label placement |
| Flow | 20-30 min | DOT handles most of the layout |
| Concept/Comparison | 25-40 min | Two-panel layout, semantic color attention |
| Exploded/Assembly | 45-60 min | Hand-crafted isometric, most labor-intensive |
| Cross-section | 45-60 min | New technique, establish the pattern |
| Scrollytelling | 2-3 hours | Includes animation state definitions |

**Total estimated effort for P0 (15 diagrams):** ~8-12 hours
**Total estimated effort for P0+P1 (30 diagrams):** ~18-24 hours
**Total estimated effort for all 38:** ~24-32 hours

---

## Appendix: Existing Asset Rework Plan

The 5 existing SVGs in `public/diagrams/` were authored for a dark background context. They need complete rework, not color inversion.

| Current File | Maps To | Action |
|-------------|---------|--------|
| `architecture-stack.svg` | FIG.02a | Rework from content spec. New layout following §2.2 Architecture rules. |
| `reasoning-loop.svg` | FIG.06c | Rework from content spec. Rectangular cycle per §2.3 Cycle rules. |
| `tools-vs-hooks.svg` | FIG.07a | Rework from content spec. Comparison panel per §2.4 Concept rules. |
| `session-tree.svg` | FIG.08b | Rework from content spec. Tree layout per §2.2 Architecture rules. |
| `request-flow.svg` | FIG.12c | Rework from content spec. Vertical flow per §2.3 Flow rules. |

**Do not attempt to "fix" these SVGs.** Create new ones following the full pipeline. Delete the old files after the new ones ship.

---

*This strategy was built from: complete ingestion of the 13-chapter masterclass content, 38 screenshots of makingsoftware.com reference site with detailed visual analysis, the existing Paper Frame v3.0 design system, and the AESTHETIC-GUIDE-DIAGRAMS.md art direction synthesized from all sources.*