# Aesthetic Guide: Technical Illustrations & Diagrams

**Applies to:** Amplifier Masterclass — all 13 chapters
**Created:** 2026-04-10
**Status:** Active — authoritative visual language for every diagram produced
**Companion to:** `AESTHETIC-GUIDE.md` (overall visual strategy), `DESIGN-SYSTEM.md` (tokens)

---

## The Premise

The Amplifier Masterclass adapts the makingsoftware.com blueprint illustration language — engineering drawings with the precision of technical manuals — into the Paper Frame v3.0 design system. The result: diagrams that look like they belong in a beautifully printed engineering textbook, not a SaaS marketing page.

**What we take from makingsoftware.com:**
- Monochromatic blueprint rendering — one accent color doing all the work
- Monospaced ALL CAPS labels with leader-line annotations
- Structure celebrated, not hidden — visible grids, dotted frames, figure numbers
- Monoline stroke discipline — single weight for most lines
- Generous breathing room — diagrams are never cramped or inline

**What we adapt to our system:**
- Their cream/charcoal/electric-blue maps to our warm stone/ink/azure
- Their pixel-art brand font → our Space Grotesk (precision voice)
- Their serif reading content → our Lora (not used inside diagrams)
- Their cold cream → our warm stone #EDEBE6
- We add semantic color for specific teaching moments (tools/hooks, cascade)

---

## 1. The Three-Color Rule (Adapted)

makingsoftware.com enforces a strict three-color palette: cream + charcoal + electric blue. We honor this discipline but map it through our warmer palette.

### Default Diagram Palette

Every diagram uses exactly three chromatic values unless a documented exception applies.

| Role | Value | Token | Notes |
|------|-------|-------|-------|
| **Ground** | `#FFFFFF` | `--bg-card` | Diagrams sit on the white card. The warm stone canvas is visible only at the page level. |
| **Ink** | `#1A1815` | `--text-primary` | All structural lines, primary labels, node outlines. Warm near-black, not cool charcoal. |
| **Blueprint** | `#0082EB` | `--accent` | All functional/active fills, flow lines, connection arrows, highlighted regions. The "working" color. |

### Supporting Values (Not Additional Colors)

These are tonal variations of the three primaries, not new hues:

| Role | Value | Usage |
|------|-------|-------|
| **Ink light** | `#6B6560` / `--text-secondary` | Secondary labels, annotation text |
| **Ink muted** | `#9C9590` / `--text-muted` | Figure numbers, grid lines, de-emphasized elements |
| **Blueprint wash** | `rgba(0, 130, 235, 0.08)` / `--accent-bg` | Fill for active/functional regions (azure at 8% opacity) |
| **Blueprint mid** | `rgba(0, 130, 235, 0.20)` | Fill for secondary functional regions |
| **Blueprint line** | `rgba(0, 130, 235, 0.60)` | Connection lines, flow arrows (azure at 60%) |
| **Structure wash** | `#F7F5F0` / `--bg-muted` | Fill for structural/passive regions (warm off-white) |
| **Grid** | `rgba(0, 0, 0, 0.04)` | Fine background grid lines |
| **Frame** | `rgba(0, 0, 0, 0.12)` | Dotted border frame |

### When Semantic Color Is Permitted

The three-color rule breaks **only** when the diagram's teaching purpose is about a categorical distinction. This is not decoration — it's pedagogy.

**Permitted semantic color contexts:**

| Context | Colors | Tokens | Chapter |
|---------|--------|--------|---------|
| Tools vs Hooks comparison | Green (#1B7A3D) + Red (#B91C1C) | `--color-tools-text`, `--color-hooks-text` | 7 |
| Hook Priority Cascade | Red → Amber → Blue → Purple → Green | `--cascade-deny` through `--cascade-continue` | 7 |
| Concentric ring differentiation | Azure tints at 3 opacity levels | Derived from `--accent` | 2 |

**Rules for semantic color:**
1. Never more than 2 semantic hues in a single diagram (cascade is the sole exception)
2. Semantic fills are always washed (6-10% opacity). Semantic text is full saturation.
3. Labels still use ink or the semantic text color — never a third color
4. The moment a diagram doesn't *need* the color distinction to teach, drop back to three-color

---

## 2. Illustration Style Rules

### 2.1 Shared Visual Grammar

Every diagram in the masterclass shares these traits regardless of type:

**Stroke discipline:**
- Primary stroke: 1px solid, ink color (`#1A1815`) — used for all node borders, containment boxes, static structure
- Flow stroke: 1.5px solid, blueprint color (`#0082EB` at 60-80% opacity) — used for connections, arrows, data flow
- Emphasis stroke: 2px solid, ink or blueprint — used sparingly for the single most important boundary in a diagram (e.g., the kernel boundary)
- No other stroke weights. Three weights total. This is the monoline discipline.

**Fill discipline:**
- White (`#FFFFFF`) — default node fill, structural/passive regions
- Blueprint wash (`rgba(0, 130, 235, 0.08)`) — functional/active nodes, regions the text is discussing
- Structure wash (`#F7F5F0`) — background grouping regions, containment zones
- No gradients. No patterns. No textures. Flat fills only.

**Arrow conventions:**
- Arrowhead: 6px equilateral triangle, filled with the stroke color
- Arrow lines: straight segments with 90° bends (Manhattan routing), or single straight lines
- No curved bezier arrows. No swooping arcs. Clean orthogonal routing.
- Arrow direction = dependency or data-flow direction. Always labeled if ambiguous.

**Corner treatment:**
- Nodes: 4px radius (subtle softening, not rounded)
- Containment groups: 0px radius (sharp rectangles — these are structural, not interactive)
- Exception: circular nodes for small status indicators or loop markers only

**Depth:**
- Flat. No drop shadows on nodes. No 3D perspective on standard diagrams.
- Depth is communicated through containment (nesting) and connection (lines), not visual elevation.
- Exception: isometric/exploded views (§2.5) use controlled axonometric projection.

---

### 2.2 Architecture Diagrams (Layer Stacks, Component Relationships)

**Used in:** Chapter 2 (Architecture Map), Chapter 4 (Kernel), Chapter 10 (Foundation Bridge), Chapter 12 (Complete Picture)

**Visual approach:** Concentric containment with nested rectangles. The architecture is rings — kernel at center, modules in the middle, ecosystem outside. Render as nested rectangles, not literal circles.

**Specific rules:**

```
┌─── OUTER RING (ecosystem) ────────────────────────────────┐
│  fill: --bg-muted (#F7F5F0)                               │
│  border: 1px solid rgba(0,0,0,0.08)                       │
│                                                            │
│  ┌─── MIDDLE RING (modules) ────────────────────────────┐  │
│  │  fill: white                                         │  │
│  │  border: 1px solid rgba(0,0,0,0.12)                  │  │
│  │                                                      │  │
│  │  ┌─── KERNEL ─────────────────────────────────────┐  │  │
│  │  │  fill: rgba(0, 130, 235, 0.08)                │  │  │
│  │  │  border: 2px solid #1A1815  ← emphasis stroke  │  │  │
│  │  │                                                │  │  │
│  │  │  [Coordinator]  [Hooks]  [Loader]              │  │  │
│  │  │  [Session]  [Contracts]                        │  │  │
│  │  │                                                │  │  │
│  │  └────────────────────────────────────────────────┘  │  │
│  │                                                      │  │
│  │  [Orchestrator]  [Providers]  [Tools]                │  │
│  │  [Context Managers]  [Hook Handlers]                 │  │
│  │                                                      │  │
│  └──────────────────────────────────────────────────────┘  │
│                                                            │
│  [Foundation]  [Bundles]  [Apps]  [Community]              │
│                                                            │
└────────────────────────────────────────────────────────────┘
```

- The kernel boundary gets the emphasis stroke (2px ink). It's the most important boundary in the system.
- Inner nodes are simple rectangles: 1px ink border, white fill, label centered.
- Active/functional nodes get blueprint wash fill when they're being discussed.
- Connection arrows between layers use blueprint line color.
- Ring labels are Space Grotesk 500 UPPERCASE, positioned at the top-left of each ring.

---

### 2.3 Flow Diagrams (Request Flows, Session Lifecycle, Orchestrator Loop)

**Used in:** Chapter 4 (Session Lifecycle), Chapter 6 (Orchestrator Loop, Message Flow), Chapter 8 (Sessions)

**Visual approach:** Linear left-to-right or top-to-bottom sequences with explicit step numbering. For cycles (the orchestrator loop), a rectangular loop with labeled phases on each side.

**Linear flows:**

```
  ①              ②              ③              ④
┌──────┐      ┌──────┐      ┌──────┐      ┌──────┐
│CREATE│─────▶│ INIT │─────▶│ EXEC │─────▶│CLEAN │
└──────┘      └──────┘      └──────┘      └──────┘
                                ▲    │
                                └────┘
                              repeatable
```

- Step numbers: Space Grotesk 500, circled (1px ink border circle, 20px diameter), positioned above or to the left of each node
- Flow arrows: blueprint line color, 1.5px, filled arrowheads
- Loop-back arrows: dashed blueprint line (4px dash, 4px gap) to distinguish from primary flow
- Decision diamonds: 45° rotated squares, ink border, blueprint wash fill for the "yes" path

**Cycle diagrams (orchestrator loop):**

```
         ┌──── THINK ────┐
         │                │
         │                ▼
      OBSERVE          DECIDE
         ▲                │
         │                │
         └──── ACT ───────┘
```

- Render as a rectangle with phases on each side, flow arrows connecting them clockwise
- The Orchestrator sits at center as a labeled node with blueprint wash fill
- Phase labels: Space Grotesk 500, UPPERCASE, positioned on the midpoint of each side
- Arrows flow clockwise with 90° turns at corners

---

### 2.4 Concept Diagrams (Mechanism vs Policy, Tools vs Hooks)

**Used in:** Chapter 3 (Design Philosophy), Chapter 7 (Tools vs Hooks), Chapter 9 (Bundles)

**Visual approach:** Side-by-side comparison panels. Two columns, each with its own border treatment, separated by a vertical divider or gap. This is where semantic color is permitted.

**Tools vs Hooks (Chapter 7):**

```
┌─── TOOLS ──────────────────┐    ┌─── HOOKS ──────────────────┐
│  border-left: 3px #1B7A3D  │    │  border-left: 3px #B91C1C  │
│  fill: rgba(34,163,74,0.06)│    │  fill: rgba(220,53,53,0.06)│
│                             │    │                             │
│  AI-VISIBLE                 │    │  AI-INVISIBLE               │
│  Model decides when to call │    │  Code decides when to run   │
│                             │    │                             │
│  ┌─────────────────┐       │    │  ┌─────────────────┐       │
│  │  read_file       │       │    │  │  tool:pre event  │       │
│  │  search_web      │       │    │  │  tool:post event │       │
│  │  run_command      │       │    │  │  session:start   │       │
│  └─────────────────┘       │    │  └─────────────────┘       │
│                             │    │                             │
└─────────────────────────────┘    └─────────────────────────────┘
```

- Each column gets its semantic color as a left accent border (3px) and a light wash fill (6%)
- Column headers: Space Grotesk 500, UPPERCASE, in the semantic text color
- Interior content: Inter 400, `--text-secondary`
- The structural parallel between columns IS the teaching — make them identical in layout

**Priority Cascade (Chapter 7):**

```
     DENY         ████████████████████████  ← highest authority
     ASK USER     ██████████████████████
     INJECT       ████████████████████
     MODIFY       ██████████████████
     CONTINUE     ████████████████         ← lowest authority
```

- Vertical waterfall, each level indented slightly or narrower than the one above
- Each level uses its cascade color for text and a 6% wash fill
- Labels: Space Grotesk 500, UPPERCASE, in cascade color
- Descriptions: Inter 400, `--text-secondary`, right of each bar
- The sole diagram permitted to use 5 semantic colors simultaneously

---

### 2.5 Exploded / Assembly Views (Bundle Composition, Module Loading)

**Used in:** Chapter 5 (Module System), Chapter 9 (Bundles & Configuration)

**Visual approach:** Isometric/axonometric projection showing components separated vertically to reveal internal composition. This is the most direct adaptation from makingsoftware.com's exploded assembly drawings.

**Specific rules:**
- Projection: 30° isometric (standard engineering axonometric). All lines at 0°, 30°, 90°, or 150°.
- No perspective (parallel projection only — lines don't converge)
- Components float above their assembled position with leader lines connecting them back
- Fill: blueprint wash for functional pieces, white for structural pieces (same as makingsoftware.com's blue-fills-for-functional, white-for-structural)
- Stroke: 1px ink for all edges. No hidden-line removal needed (these are schematic, not photorealistic)
- Vertical separation between exploded layers: consistent (use a visual "gap" of ~24-32px at diagram scale)

**Bundle composition exploded view:**

```
                    ┌──────────────┐
                    │  BUNDLE.YAML │  ← configuration (white fill)
                    └──────┬───────┘
                           │  ← leader line (1px ink, dashed)
                    ┌──────┴───────┐
                    │ ORCHESTRATOR │  ← module (blueprint wash fill)
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              │            │            │
        ┌─────┴────┐ ┌────┴─────┐ ┌────┴─────┐
        │  TOOLS   │ │ HOOKS    │ │ CONTEXT  │  ← modules (blueprint wash)
        └──────────┘ └──────────┘ └──────────┘
```

- Layer labels: Space Grotesk 500, UPPERCASE, with leader-line annotations pointing to each piece
- Assembly arrows: dashed ink lines showing where pieces slot together
- The assembled state can appear as a smaller reference at top-right ("assembled" vs "exploded")

---

### 2.6 Cross-Section Views (Internal Mechanism)

**Used in:** Chapter 4 (Kernel internals), Chapter 6 (What happens inside one turn)

**Visual approach:** A single container shown as if cut open, revealing internal data flow. Adapted from makingsoftware.com's cross-section technique.

**Specific rules:**
- The "cut" boundary: 2px ink stroke with a dashed "section line" indicator (standard engineering section-line notation: long dash, short dash, long dash)
- Internal structure visible behind the cut plane
- Data flowing through the mechanism shown as blueprint-colored arrows
- Internal components labeled with leader lines

---

## 3. Typography in Diagrams

Three fonts, three roles. This mirrors makingsoftware.com's serif/monospace split, adapted to our typeface triad.

### The Split

| Font | Role in Diagrams | Treatment | Usage |
|------|-----------------|-----------|-------|
| **Space Grotesk 500** | Labels, identifiers, node names | UPPERCASE, tracked (0.06-0.08em) | Everything that names a thing: node labels, step numbers, figure numbers, ring labels |
| **Inter 400** | Annotations, descriptions | Sentence case, normal tracking | Everything that explains: annotation callouts, brief descriptions on leader lines |
| **Inter 500** | Emphasis annotations | Sentence case | Rare — only for a single critical annotation per diagram |
| **Lora** | NOT USED in diagrams | — | Lora is the reading voice. Diagrams are reference objects, not reading content. Lora stays in the prose. |

### Sizing

| Context | Font | Size | Line Height |
|---------|------|------|-------------|
| Node labels (primary) | Space Grotesk 500 | 12-13px | 1.0 |
| Node labels (secondary) | Space Grotesk 400 | 11px | 1.0 |
| Annotation text | Inter 400 | 12-13px | 1.3 |
| Figure numbers | Space Grotesk 400 | 11px | 1.0 |
| Ring/group labels | Space Grotesk 500 | 11-12px | 1.0 |
| Step numbers (in circles) | Space Grotesk 500 | 12px | 1.0 |

### Letter Spacing

| Context | Tracking |
|---------|----------|
| UPPERCASE labels (node names, ring labels) | `0.06em` |
| UPPERCASE figure numbers | `0.08em` |
| Sentence-case annotations | `0` (natural) |

### The Cardinal Rule

**Every text element inside a diagram must be either Space Grotesk UPPERCASE (naming something) or Inter sentence case (explaining something).** There is no third option. If you can't classify a text element as "naming" or "explaining," the text doesn't belong in the diagram.

---

## 4. Annotation and Labeling System

### 4.1 Leader Lines

Leader lines connect labels to the parts they describe. They are the annotation backbone.

**Construction:**
- Stroke: 1px solid, `--text-muted` (#9C9590) — lighter than structural lines to avoid competing
- Path: straight horizontal or vertical segment + one 90° turn + short horizontal landing. Never diagonal. Never curved.
- Terminal: small filled circle (3px radius) at the part being labeled. No arrowhead on leader lines (arrowheads are for flow).
- Landing: the text sits at the end of the horizontal landing, left-aligned

```
  COORDINATOR ──── ●
                   │
                   │  ← vertical segment
                   │
  [node being      ← the node the leader line points to
   labeled]
```

**Rules:**
- Leader lines never cross each other. Reroute or reposition labels to prevent crossings.
- Maximum leader line length: 120px at diagram scale. If longer, the label should be repositioned.
- Leader lines are always lighter than structural elements — they annotate, they don't compete.

### 4.2 Figure Numbers

Adapted from makingsoftware.com's FIG.001 convention. Every diagram gets a figure number.

**Format:** `FIG. 01` through `FIG. 13` (one per chapter, more if needed: `FIG. 07a`, `FIG. 07b`)

**Numbering scheme:** Figure numbers follow chapter numbers. Chapter 2's main diagram is FIG. 02. If Chapter 7 has three diagrams: FIG. 07a (Tools vs Hooks comparison), FIG. 07b (inject_context flow), FIG. 07c (Priority Cascade).

**Typographic treatment:**
- Font: Space Grotesk 400, 11px
- Color: `--text-muted` (#9C9590)
- Tracking: 0.08em (wider than normal — this is a structural label)
- Transform: UPPERCASE

**Placement:**
- Positioned at top-left of the diagram frame, outside the dotted border
- Vertically oriented (rotated 90° counter-clockwise) in the left margin when space allows
- Horizontally above the frame when the diagram is at reading-column width

### 4.3 Diagram Titles

Each diagram has a short title that names what it proves.

**Treatment:**
- Font: Space Grotesk 500, 13px, UPPERCASE, tracked 0.06em
- Color: `--text-primary`
- Position: top-left inside the diagram frame, or directly above it
- Never centered. Left-aligned with the diagram's left edge.

### 4.4 Captions

Below each diagram, a caption provides context for readers who encounter the diagram before reading the surrounding prose.

**Treatment:**
- Font: Inter 400, 14px (--text-sm)
- Color: `--text-secondary`
- Position: below the diagram container, left-aligned with the diagram's left edge
- Max width: `--measure-reading` (650px) even if the diagram is at wide breakout
- Margin-top from diagram: `--space-4` (16px)

**Caption format:**
> FIG. 02 — The architecture as concentric rings. Outer layers depend on inner layers, never the reverse.

The figure number is repeated in the caption in `--text-muted` followed by an em dash, then the caption text in `--text-secondary`.

---

## 5. Container Treatment

### 5.1 The Diagram Frame

Every diagram sits inside a frame. The frame signals "this is a technical figure, not a decoration."

**Construction:**

```
  FIG. 02
  ┊┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┊
  ┊                                                          ┊
  ┊  ╔══════════════════════════════════════════════════╗    ┊
  ┊  ║  ARCHITECTURE OVERVIEW                          ║    ┊
  ┊  ║                                                 ║    ┊
  ┊  ║           [diagram content]                     ║    ┊
  ┊  ║                                                 ║    ┊
  ┊  ╚══════════════════════════════════════════════════╝    ┊
  ┊                                                          ┊
  ┊┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┊

  FIG. 02 — The architecture as concentric rings.
```

**Outer frame (dotted border):**
- Border: 1px dotted, `rgba(0, 0, 0, 0.12)` — visible but quiet
- Radius: 0px (sharp corners — this is an engineering drawing border, not a card)
- Padding: `--space-8` (32px) on all sides
- Background: white (`--bg-card`) — same as the card it sits on (no additional background color by default)

**Optional grid background:**
- For blueprint-style diagrams (architecture, exploded views): a fine dot grid
- Grid: 1px dots at 16px intervals, `rgba(0, 0, 0, 0.04)` — barely visible, adds precision feel
- Not for flow diagrams or comparison diagrams — grid only where the "technical drawing" feeling adds value

### 5.2 Placement Within the Card

Diagrams are content blocks within the white card. They follow the three-width system:

| Width | When | Measurement |
|-------|------|-------------|
| **Reading column** | Simple flows, the priority cascade, small concept diagrams | `--measure-reading` (650px) |
| **Wide breakout** | Architecture diagrams, comparison panels, annotated flows | `--measure-wide` (1100px) |
| **Full-width** | Interactive graph explorer (Chapter 2 end), scrollytelling sticky diagram | `100%` (edge of card or edge of viewport) |

**The expansion rule:** A diagram at reading width expands to wide breakout by growing its margins. The content within the dotted frame gains horizontal room. The caption stays at reading width. This preserves the compression/expansion rhythm described in `AESTHETIC-GUIDE.md`.

**Vertical spacing:**
- Above diagram: `--space-12` (48px) from preceding prose paragraph
- Below caption: `--space-12` (48px) before next prose paragraph
- Diagrams breathe. They never appear immediately after a heading or immediately before another diagram without intervening prose.

### 5.3 Diagram on Canvas (Full-Width Moments)

For the rare full-width moment (interactive architecture explorer, scrollytelling), the diagram breaks out of the card entirely onto the warm stone canvas.

**Treatment:**
- Background: `--bg-canvas` (#EDEBE6) — the diagram sits directly on the warm stone
- Frame: dotted border changes to `rgba(0, 0, 0, 0.08)` (softer, since the canvas is darker than the card)
- Grid dots adjust to `rgba(0, 0, 0, 0.03)` for the same reason
- The diagram title and caption return to reading-column width within the full-width container

---

## 6. Diagram Types by Chapter

Quick reference for which visual treatment applies where.

| Ch. | Diagram | Type (§2.x) | Width | Semantic Color? | Grid BG? |
|-----|---------|-------------|-------|-----------------|----------|
| 2 | Architecture overview | §2.2 Architecture | Wide | Azure tints only | Yes |
| 2 | Interactive explorer | §2.2 Architecture | Full | Azure tints only | Yes |
| 3 | Mechanism vs Policy | §2.4 Concept | Wide | No | No |
| 4 | Kernel components | §2.2 Architecture | Wide | No | Yes |
| 4 | Session lifecycle | §2.3 Flow | Wide | No | No |
| 5 | Module system / loading | §2.5 Exploded | Wide | No | Yes |
| 6 | Orchestrator loop | §2.3 Flow (cycle) | Wide | No | No |
| 6 | One turn of conversation | §2.3 Flow (scrollytelling) | Full | No | No |
| 7 | Tools vs Hooks | §2.4 Concept | Wide | Yes (green/red) | No |
| 7 | inject_context flow | §2.3 Flow | Wide | No | No |
| 7 | Priority cascade | §2.4 Concept | Reading | Yes (5 colors) | No |
| 8 | Session states | §2.3 Flow | Wide | No | No |
| 9 | Bundle composition | §2.5 Exploded | Wide | No | Yes |
| 10 | Foundation bridge | §2.6 Cross-section | Wide | No | Yes |
| 12 | Complete picture | §2.2 Architecture | Wide/Full | Azure tints only | Yes |

---

## 7. SVG Production Rules

All diagrams are SVG. This is non-negotiable for a print-quality editorial experience.

### Structure

- All text as `<text>` elements with web fonts loaded, not outlined paths (enables accessibility, screen reader support, and text search)
- Viewbox defined for each diagram. Responsive scaling via `width: 100%; height: auto;`
- Semantic grouping: `<g>` elements with descriptive IDs (`g-kernel`, `g-flow-arrows`, `g-annotations`)
- `role="img"` and `aria-label` on the root `<svg>` for accessibility
- `<title>` and `<desc>` elements inside the SVG for screen readers

### Color Application in SVG

```css
/* Node borders — ink */
.node { stroke: #1A1815; stroke-width: 1; fill: #FFFFFF; }

/* Active/functional nodes — blueprint wash */
.node--active { fill: rgba(0, 130, 235, 0.08); }

/* Connection lines — blueprint */
.flow { stroke: rgba(0, 130, 235, 0.60); stroke-width: 1.5; }

/* Emphasis boundary — ink heavy */
.boundary--emphasis { stroke: #1A1815; stroke-width: 2; }

/* Leader lines — muted */
.leader { stroke: #9C9590; stroke-width: 1; }

/* Grid — barely visible */
.grid-dot { fill: rgba(0, 0, 0, 0.04); }

/* Frame — dotted border */
.frame { stroke: rgba(0, 0, 0, 0.12); stroke-dasharray: 3 3; fill: none; }
```

### Font Embedding

```css
/* Inside SVG <style> block */
@import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500&family=Inter:wght@400;500&display=swap');

.label { font-family: 'Space Grotesk', sans-serif; font-weight: 500;
         text-transform: uppercase; letter-spacing: 0.06em; }
.annotation { font-family: 'Inter', sans-serif; font-weight: 400; }
```

---

## 8. Anti-Patterns — What to AVOID

These patterns would violate the editorial-paper aesthetic or produce AI slop.

### Never Do This

| Anti-Pattern | Why It Fails | Instead |
|-------------|-------------|---------|
| **Gradient fills on nodes** | Reads as SaaS marketing, not engineering drawing | Flat fills: white, blueprint wash, or structure wash |
| **Drop shadows on nodes** | Creates false depth hierarchy. Contradicts our flat discipline | Containment and connection communicate depth |
| **Rounded everything (12px+)** | Reads as app UI, not technical illustration | 4px max on nodes. 0px on containment groups |
| **Multiple accent colors without semantic purpose** | Violates the three-color rule. Visual noise | One hue (azure) unless teaching requires distinction |
| **Curved bezier arrows** | Reads as Figma mockup, not engineering schematic | Straight orthogonal routing with 90° bends |
| **Decorative icons inside nodes** | AI slop signal. Adds visual noise, not information | Text labels only. The label IS the content |
| **3D perspective on flat diagrams** | Inconsistent with the monoline/flat discipline | Save isometric for §2.5 exploded views only |
| **Dark background on diagrams** | Contradicts the paper frame. Explicitly retired in v3 | White or warm-stone background only |
| **Infographic style (big numbers, pie charts, pictograms)** | Wrong genre. This is engineering documentation, not a dashboard | Structural diagrams with precise labels |
| **Inline diagrams wrapping text** | Violates the three-width system. Diagrams breathe | Diagrams are block-level, always width-appropriate |
| **Emoji or pictographic labels** | Undermines the precision voice | Space Grotesk UPPERCASE text only |
| **Inconsistent stroke weights** | Breaks monoline discipline. Reads as hastily assembled | Three weights: 1px (standard), 1.5px (flow), 2px (emphasis) |
| **Color-coding without a legend** | Semantic color must be self-documenting or explicitly labeled | Every color that carries meaning must be labeled |
| **Diagrams without figure numbers** | Untraceable. Violates the "structure celebrated" principle | Every diagram gets FIG. XX |
| **Labels in mixed case inside diagrams** | Breaks the typography split rule | UPPERCASE for naming, sentence case for explaining — no third option |
| **Arrows without clear direction** | Ambiguous flow. The whole point is clarity | Every arrow has a filled arrowhead. Bidirectional gets arrowheads on both ends |
| **More than ~15 nodes in a single view** | Cognitive overload. A diagram should prove one thing | Break complex systems into focused sub-diagrams |
| **Stock illustration or clip art** | Immediate AI slop signal. Destroys editorial authority | Hand-drawn-quality vector elements or nothing |

### The Proof Test (Preserved from AESTHETIC-GUIDE.md)

**Every diagram must pass this test: if you can't state what it proves, delete it.**

Before creating any diagram, answer:
1. What single concept does this diagram prove?
2. What would the reader lose if this diagram didn't exist?
3. Could a sentence replace this diagram? (If yes, use the sentence.)

### The Slop Test

**Could this diagram have been produced by a generic diagramming AI for any technical product?** If yes, it lacks the editorial precision this system demands. Specific signals of slop:

- Nodes with generic icons (cloud, gear, database cylinder) instead of specific labels
- Rainbow color gradients or arbitrary color assignment
- Decorative connecting lines that don't represent real relationships
- Text that restates the obvious ("This is the kernel" on a box already labeled KERNEL)
- Symmetry for its own sake — real architectures are asymmetric

---

## 9. Scrollytelling Diagram Treatment

For the 1-2 scrollytelling moments (Chapter 6 is the primary candidate), the diagram becomes a sticky visual.

### How It Works with This Style System

- The sticky diagram follows all rules above: three-color, monoline, Space Grotesk labels
- As text cards scroll past, the diagram's state changes:
  - Nodes transition from white fill → blueprint wash fill when their step is active
  - Flow arrows transition from `rgba(0,130,235,0.20)` → `rgba(0,130,235,0.80)` when active
  - Step number circles fill with azure when their step is current
  - Previous steps dim to `--text-muted` opacity (completed, no longer active)
- The diagram NEVER adds new elements during scrollytelling. All nodes, arrows, and labels are present from the start. Scrolling only changes fill/stroke opacity.
- Text cards: white background, `--shadow-card`, Inter body text, positioned at reading-column width on the right 35% of the viewport

### Reduced Motion

When `prefers-reduced-motion: reduce` is active:
- All state transitions are instant (no animation)
- The diagram becomes a series of static snapshots, one per step, stacked vertically
- Each snapshot is labeled with its step number and description
- No sticky positioning — content flows normally

---

## 10. Producing Diagrams — Practical Workflow

### Source Format

Diagrams are authored as hand-crafted SVG or generated from DOT/Graphviz source with post-processing to match this style guide. The DOT-to-SVG pipeline:

1. **Write DOT source** — captures structure and relationships
2. **Render to SVG** — using `dot` or `neato` layout engine
3. **Post-process** — apply this guide's colors, fonts, stroke widths, and frame treatment
4. **Validate** — check against the anti-pattern list above

### Quality Checklist (Before Shipping a Diagram)

- [ ] Three-color rule followed (or documented semantic exception)
- [ ] All text is Space Grotesk UPPERCASE (naming) or Inter sentence case (explaining)
- [ ] Stroke weights are exactly 1px, 1.5px, or 2px — no other values
- [ ] No gradients, no shadows on nodes, no 3D on flat diagrams
- [ ] Figure number assigned (FIG. XX format)
- [ ] Caption written (states what the diagram proves)
- [ ] Diagram placed at correct width (reading/wide/full)
- [ ] Vertical spacing: 48px above, 48px below caption
- [ ] All arrows have filled arrowheads and clear direction
- [ ] No more than ~15 nodes visible at once
- [ ] `aria-label`, `<title>`, and `<desc>` present in SVG
- [ ] Passes the proof test: can state what it proves in one sentence
- [ ] Passes the slop test: could NOT have been produced by a generic AI for any product

---

## Evolution

**2026-04-10 (v1 — this version):** Initial creation. Synthesizes makingsoftware.com blueprint illustration language with Paper Frame v3.0 design system. Defines color adaptation (three-color rule + semantic exceptions), four diagram types with specific visual rules, typography split (Space Grotesk names, Inter explains, Lora stays in prose), annotation system (leader lines, figure numbers, captions), container treatment (dotted frame, optional grid, three-width placement), and comprehensive anti-pattern catalog.

**What does NOT change without deliberate discussion:**
- The three-color default (ink + blueprint + white)
- The typography split (Space Grotesk UPPERCASE / Inter sentence case / no Lora in diagrams)
- The monoline stroke discipline (1px / 1.5px / 2px)
- The proof test requirement
- The prohibition on gradients, shadows, and decorative elements in diagrams
- Accessibility requirements (SVG text, aria-labels, reduced motion fallbacks)

---

*A reader looks at a diagram in this masterclass and thinks: "This was drawn by someone who understands both the system and the craft of technical illustration." Not generated. Not decorated. Drawn with intent.*