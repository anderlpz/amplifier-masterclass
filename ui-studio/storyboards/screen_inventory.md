# Screen Inventory — Amplifier Masterclass (LOCKED)

**Locked:** 2026-04-08
**Status:** APPROVED — authoritative section inventory for all implementation work
**Primary Reference:** `ui-studio/storyboards/storyboard_final.png` (strip-1-opening: S01→S02→S03)

---

## Navigation Model

**Single-page scroll** — all 13 sections are scroll zones on one continuous page. No routing. No page transitions. The sidebar TOC, top nav, and progress bar are persistent across the entire experience.

---

## Persistent Navigation Chrome

| Element | Position | Treatment | Behavior |
|---------|----------|-----------|----------|
| **Progress Bar** | Fixed top, full width, z-index highest | 2px solid azure (#0082EB), fills left→right | Continuous 0%→100% based on scroll position |
| **Top Nav** | Fixed top, full width, below progress bar | Glass surface (rgba(255,255,255,0.04), 1px border, 10px blur, 12px radius). "AMPLIFIER" wordmark (Space Grotesk 500, small caps). Current section name (Inter 400, fades on change). | Hides on scroll-down, reappears on scroll-up. Inverts to dark glass on parchment sections. |
| **Sidebar TOC** | Fixed left, vertically centered | Floating text, NO background, NO glass container. 13 section names in Inter 400, 13px. Active: azure + 4px dot. Inactive: rgba(255,255,255,0.4). | IntersectionObserver-synced. Click to smooth-scroll. Fades to reduced opacity on parchment. Hidden on mobile (hamburger in top nav). |

---

## Complete Section Inventory

| # | Section | Mode | Background | Eyebrow Accent | Swarm State | Diagram | Sub-sections | Grain |
|---|---------|------|------------|---------------|-------------|---------|-------------|-------|
| S01 | Introduction | Conceptual | Void (#0F0F13) | Copper (#C87B60) | Pre-Flock (scattered, individual drift) | None | 0 | Yes (2-3%) |
| S02 | Architecture Map | Technical | Void (#0F0F13) | Azure (#0082EB) | Strata Forming (horizontal bands) | D01: Architecture Stack (5-layer vertical) | 5 (NumberedRows 01-05) | No |
| S03 | Design Philosophy | Conceptual (palette-break) | **Parchment (#F5F3EC)** | Copper (#C87B60) | **Silence** (particles dissolved) | None | 4 (principles) | No |
| S04 | The Kernel | Technical | Void (#0F0F13) | Azure (#0082EB) | Dense Core (bees clustering center) | D02: Kernel Responsibilities (asymmetric cluster) | 5 (glass cards) | No |
| S05 | Module System | Technical | Slate (#161619) | Azure (#0082EB) | Branching Streams (starlings splitting) | D03: Module Type Catalog (asymmetric taxonomy) | 6 (module type entries) | No |
| S06 | The Orchestrator | Technical | Void (#0F0F13) | Azure (#0082EB) | **THE VORTEX** (circular murmuration) | D04: Reasoning Loop (cinematic centerpiece) | 4 (loop phases) | No |
| S07 | Tools vs Hooks | Technical | Slate (#161619) | Azure (#0082EB) | Bilateral Split (two schools passing) | D05: Comparison Split (viewport diptych) | 2 (Tools column + Hooks column) | No |
| S08 | Sessions | Technical | Void (#0F0F13) | Azure (#0082EB) | Spawning (cells dividing) | D06: Session Tree (top-down genealogy) | 3 (parent/child/isolation) | No |
| S09 | Bundles | Technical | Slate (#161619) | Azure (#0082EB) | Nested Formations (swarms within swarms) | D07: Composition Nesting (matryoshka) | 3 (composition, includes, thin-bundle) | No |
| S10 | Foundation Bridge | Technical | Void (#0F0F13) | Azure (#0082EB) | The Bridge (spanning formation) | D08: Bridge Diagram (horizontal span) | 3 (kernel-side, bridge, app-side) | No |
| S11 | Agents & Recipes | Technical | Slate (#161619) | Azure (#0082EB) | Convergence (bees returning to hive) | D09: Dual Mechanism (funnel + pipeline) | 2 (Agents card + Recipes card) | No |
| S12 | Complete Picture | Conceptual (palette-break) | **Parchment (#F5F3EC)** | Copper (#C87B60) | **Silence** (reprise — particles dissolved) | D10: Full System Flow (vertical descent, ink+copper on parchment) | 0 (contemplative prose) | No |
| S13 | Appendix | Technical | Void (#0F0F13) | Azure (#0082EB) | Fading Embers (sparse, settling) | None | 4 (reference categories) | Yes (2-3%) |

---

## Section Entry Pattern (iyo-clean)

Every section begins with an entry viewport (first 100vh) containing exactly 3 elements and 85% negative space:

1. **Eyebrow** — Space Grotesk 500, 11px, uppercase, tracked wide. Copper on conceptual, azure on technical.
2. **Headline** — Lora 600, clamp(2.5rem, 4vw, 4rem). Single line or two lines max.
3. **Lead Sentence** — Inter 400, 1.125rem, 60% opacity. One to two lines. The thesis of the section.

Content density increases below the entry viewport (100vh+). Diagrams appear at ~130vh after an orienting paragraph.

---

## Transition Map

### Major Mode Shifts (dramatic)

| From | To | Mechanism | Swarm Role |
|------|-----|-----------|------------|
| S02 → S03 | Dark → Parchment | **Parallax reveal**: dark section scrolls over parchment (z-index stacking). Void gap (48-64px) between. | Strata dissolve over final 75vh. Particles reach zero before background reveals. |
| S03 → S04 | Parchment → Dark | **Hard cut**: clean horizontal boundary, no gradient, no overlap. Immediate. | Particles reconstitute already clustered (dense core). 50vh fade-in. |
| S11 → S12 | Dark → Parchment | **Parallax reveal** (same mechanism as S02→S03). | Converging swarm compresses, holds, then scatters and dissolves. Earned resolution. |
| S12 → S13 | Parchment → Dark | **Hard cut** (same mechanism as S03→S04). | Particles return as sparse embers. Minimal energy. |

### Minor Transitions (subtle)

| From | To | Background Shift |
|------|-----|-----------------|
| S01 → S02 | Conceptual → Technical | Void → Void (grain fades, spacing tightens) |
| S04 → S05 | Void → Slate | Barely perceptible background darkening |
| S05 → S06 | Slate → Void | Barely perceptible background lightening |
| S06 → S07 | Void → Slate | Subtle |
| S07 → S08 | Slate → Void | Subtle |
| S08 → S09 | Void → Slate | Subtle |
| S09 → S10 | Slate → Void | Subtle |
| S10 → S11 | Void → Slate | Subtle |

---

## Diagram Catalog

| ID | Section | Name | Family Role | What It Proves | Width |
|----|---------|------|-------------|----------------|-------|
| D01 | S02 | Architecture Stack | The Patriarch | 5 dependency layers, dependencies flow strictly downward | 960px |
| D02 | S04 | Kernel Responsibilities | The Cluster | Kernel owns exactly 5 distinct but interconnected responsibilities | 960px |
| D03 | S05 | Module Type Catalog | The Taxonomy | 6 module types with hierarchy; Agent breaks the pattern | 960px |
| D04 | S06 | Reasoning Loop | The Cinematic Centerpiece | THINK→ACT→OBSERVE→DECIDE cycle repeats until completion | 960px |
| D05 | S07 | Comparison Split | The Diptych | Tools and Hooks differ in who decides when they fire | Full viewport |
| D06 | S08 | Session Tree | The Genealogy | Sessions form parent/child hierarchies with isolation boundaries | 720px |
| D07 | S09 | Composition Nesting | The Matryoshka | Bundles compose recursively without inheritance | 720px |
| D08 | S10 | Bridge Diagram | The Span | Foundation sits between kernel and apps, serving both | 960px |
| D09 | S11 | Dual Mechanism | The Dual Mechanism | Agents compress context (funnel); Recipes chain steps (pipeline) | 960px |
| D10 | S12 | Full System Flow | The Synthesis | A request flows through every layer — on parchment, in ink+copper | 720px |

---

## Swarm Narrative Arc

```
S01  Pre-Flock       · ·  · ·       Scattered, individual, open potential
S02  Strata          ≋ ≋ ≋ ≋        Particles organize into horizontal bands
S03  Silence         (empty)        FIRST PALETTE-BREAK: swarm dissolves
S04  Dense Core      ⊛              Swarm compresses to center — bees clustering
S05  Branching       ✱→ →↗ ↑        Core explodes into radiating streams
S06  THE VORTEX      ↻↻↻↻↻          KEY MOMENT: streams merge into spiral — bait ball
S07  Split Schools   ↓↓ | ↑↑        Two swarms, opposite directions, void between
S08  Spawning        ⊛→⊙→○          Parent cluster buds child clusters
S09  Nested Rings    ◎⊚⊙            Concentric formations — fractal flocking
S10  The Bridge      ⊛≈≈≈≈≈⊛        Two clusters, living conduit between
S11  Convergence     →⊛←            Clusters returning, gathering toward center
S12  Silence         (empty)        SECOND PALETTE-BREAK: swarm completes & dissolves
S13  Fading Embers   · ·            Sparse, slow, settling — the murmuration disperses
```

---

## Visual Reference Strips (Approved)

| Strip | Sections | File |
|-------|----------|------|
| Strip 1: Opening | S01 → S02 → S03 | `strips-v2/strip-1-opening.png` |
| Strip 2: Core to Vortex | S04 → S05 → S06 | `strips-v2/strip-2-core-to-vortex.png` |
| Strip 3: Middle | S07 → S08 → S09 | `strips-v2/strip-3-middle.png` |
| Strip 4: Ending | S10 → S11 → S12 → S13 | `strips-v2/strip-4-ending.png` |

### Concept Renders

| Concept | File |
|---------|------|
| S01 Swarm Entry | `concepts-v3/s01-swarm-entry.png` |
| S06 Vortex | `concepts-v3/s06-vortex.png` |
| S04→S05→S06 Transition | `concepts-v3/transition-core-to-vortex.png` |
