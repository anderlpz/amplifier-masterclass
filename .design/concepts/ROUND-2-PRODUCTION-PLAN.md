# Round 2 Illustrations — Production Plan

**Date:** 2026-04-12
**Scope:** 11 illustrations (s2, s3, s4, s5, s6, s7, s8, s9, s10, s11, s12)
**Target:** Replace current inline SVGs in `amplifier-masterclass.html` sections 2.1–12.1
**Concept sources:** `.design/concepts/round-2/*.png` + `ROUND-2-CONCEPT-BRIEFS.md`

---

## Current Site Constraints (Measured)

| Property | Value | Source |
|---|---|---|
| Content column | `720px` (`--content-width`) | `.page-wrapper` |
| Reading measure | `650px` (`--measure-reading`) | `tokens.css` |
| Wide breakout | `1100px` (`--measure-wide`) | `tokens.css` |
| `.section-diagram` desktop | `calc(100% + 160px)` → ~880px | Line 1030 |
| `.section-diagram` mobile | `calc(100% + 32px)` → ~375px | Line 1045 |
| Existing SVG viewBox | `0 0 720 240` | Inline SVGs |
| SVG scaling | `width: 100%; height: auto` | `.section-diagram svg` |
| Diagram spacing | 40px above, 40px below | `.section-diagram` margin |
| Border treatment | `1.5px solid #BFA16C` | `.section-diagram` |
| Background | `#FFFFFF` (card surface) | `.section-diagram` |
| Container padding | `40px` desktop → `20px` mobile | `--container-pad` |

### Existing SVG Pattern (Baseline)

Current diagrams are pure hand-crafted SVGs: `<rect>`, `<line>`, `<circle>`, `<polygon>`, `<text>`. No external images. No CSS animations. Fonts loaded via inline `font-family` attributes. The Round 2 illustrations are richer — they include illustrated building scenes — so the production approach must **layer raster imagery under SVG structure under HTML/CSS responsiveness**.

---

## A. Per-Illustration Breakdown

### 1. §2.1 — Bird's-Eye City Map (`s2-city-map.png`)

**What it proves:** The concentric dependency structure — outer depends on inner, never reverse.

#### CODE (HTML/CSS)
- Outer diagram frame with dotted border, figure number `FIG. 02a`
- Responsive container that centers content and handles breakpoints
- Caption block below: "The architecture as a city. Outer layers depend on inner layers."
- Optional: hover overlays that highlight a zone with its label (CSS `:hover` on SVG groups)

#### SVG
- Road network grid (blue orthogonal paths connecting zones)
- Concentric zone boundaries (nested rectangles: kernel → modules → outer)
- Kernel boundary (2px emphasis stroke)
- All connection lines and arrows
- Label containers: KERNEL, ORCHESTRATOR, PROVIDERS, TOOLS, HOOK HANDLERS, CONTEXT MANAGERS, FOUNDATION, BUNDLES, APPLICATIONS, COMMUNITY
- Leader lines from labels to zones
- "AVAILABLE" signs with dashed outlines in Community zone
- Dot grid background pattern (`<pattern>` element)

#### GENERATED IMAGE (raster asset)
- Building cluster illustrations within each zone (civic center buildings, storefronts, tower, houses)
- Underground cross-section texture for Foundation corridor
- Planning office building with blueprint scrolls
- Terminal/post office and Browser/library building facades
- Small decorative elements (trees, flags, architectural detail)

**Asset strategy:** One master raster layer at 2200px wide (2x for retina at 1100px wide breakout). Exported as optimized PNG with transparency. SVG overlays the raster using `<image>` element or CSS `background-image` on the container, with SVG labels/lines/structure on top.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full wide breakout. All zones visible with labels. |
| Tablet (768px) | Scales down proportionally via viewBox. Labels remain readable at 11px minimum. |
| Mobile (375px) | Simplify: hide leader lines and secondary labels. Keep zone names + kernel. Consider a vertically-stacked simplified version showing zones as a list with small icons. |

---

### 2. §3 — Design Philosophy: Mechanism, Not Policy (`s3-philosophy-square.png`)

**What it proves:** The kernel has no opinion — it fires events, never instructions.

#### CODE (HTML/CSS)
- Three-column CSS Grid layout (`grid-template-columns: 1fr 1fr 1fr`)
- Column headers: "MECHANISM, NOT POLICY" / "THE CENTER STAYS STILL" / "RUTHLESS SIMPLICITY"
- Column footers/captions as styled text blocks
- Vertical divider lines between columns (CSS borders)
- Responsive stacking: columns → rows on mobile

#### SVG
- Panel 1 (left): Notice board frame, event notice cards (TOOL:PRE, SESSION:START, PROVIDER:RESPONSE), the "zero opinions" label
- Panel 2 (center): Three stacked city-square outlines (identical square, changing surroundings indicator)
- Panel 3 (right): Connection lines between building modules, "ZERO STORAGE" label

#### GENERATED IMAGE (raster asset)
- Panel 1: Wooden signpost illustration with characters (blocking/observing/ignoring figures)
- Panel 2: Three small isometric city scenes showing evolution (past/present/future)
- Panel 3: Building illustrations (log archive, file vault, config office)

**Asset strategy:** Three separate raster assets (one per panel), each ~366px × 400px at 2x. This allows independent loading and column reflow.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Three columns side by side at full wide breakout. |
| Tablet (768px) | Three columns still work but tighter. Reduce padding. |
| Mobile (375px) | Stack vertically. Each panel becomes a full-width card. Column headers become section labels above each panel. |

---

### 3. §4 — The Kernel: Civic Center Floor Plan (`s4-kernel-floorplan.png`)

**What it proves:** The kernel contains exactly five components — countable, austere, zero file I/O.

#### CODE (HTML/CSS)
- Diagram container with dot-grid background (CSS `radial-gradient` pattern)
- Figure number and caption
- Interactive: hovering a room highlights it and shows its description tooltip

#### SVG
- Main building outline (thick 2px ink rectangle)
- Five room partitions (horizontal/vertical divider lines)
- Room labels: SESSION LIFECYCLE, CONTRACTS, MODULE LOADER, COORDINATOR, HOOKS
- EVENT BUS corridor (horizontal band with azure fill)
- Door openings (gaps in partition lines)
- Connection dots on the event bus
- "FILE I/O: ZERO" signpost (rectangle + text on right side)
- Caption text at bottom

#### GENERATED IMAGE (raster asset)
- Room interior illustrations: circular arrow (session lifecycle), plug icons (contracts), download arrow (module loader), bookshelf/filing cabinet (coordinator), hook racks (hooks)
- These are small icon-like illustrations placed within SVG-defined room boundaries

**Asset strategy:** Individual small PNG sprites per room illustration (~100×80px at 2x), positioned via SVG `<image>` elements at fixed coordinates within the floor plan. Alternatively, these are simple enough to draw as SVG `<path>` elements — **this diagram is the strongest candidate for 100% SVG** because the existing site already has a pure-SVG version of this diagram (viewBox `0 0 720 240`).

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full floor plan at wide breakout. All rooms labeled. |
| Tablet (768px) | Scales via viewBox, all content visible. |
| Mobile (375px) | Floor plan scales to fit. Room labels may need to drop to abbreviations or use a numbered key below the diagram. |

---

### 4. §5 — Module System: Neighborhood Directory (`s5-modules-neighborhoods.png`)

**What it proves:** Six module types with plug-in contract. Remove one, add another — neighbors don't notice.

#### CODE (HTML/CSS)
- Diagram container with dot-grid background
- Figure number and caption
- Optional: CSS animation for the crane "swap" on scroll-trigger (crane lifts one module, lowers another)

#### SVG
- Central kernel circle/zone
- Five radiating connection paths (thick azure lines connecting kernel to districts)
- District boundary outlines
- Numbered loading order circles (①–⑤)
- Labels: ORCHESTRATOR DISTRICT, PROVIDER QUARTER, CONTEXT DISTRICT, TOOL QUARTER, HOOK WARD
- Annotation text: "RUNTIME ACCESS", "REMOVE ONE, ADD ANOTHER..."
- Crane outline (geometric: vertical mast + horizontal boom + cable)

#### GENERATED IMAGE (raster asset)
- Isometric building clusters for each of the five districts
- The crane illustration (detailed mechanical drawing)
- Building being lifted/lowered
- Background texture (subtle parchment/dot grid)

**Asset strategy:** One large raster background (2200px wide at 2x) with all isometric buildings. SVG overlay provides all labels, connection lines, numbered markers, and the crane outline.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full isometric view at wide breakout. |
| Tablet (768px) | Proportional scale-down. District labels remain. |
| Mobile (375px) | Significant simplification needed. Consider a non-isometric version: a simple radial diagram with the kernel at center and five labeled boxes around it, each with a small icon. The isometric beauty is desktop-only. |

---

### 5. §6 — The Orchestrator: Mayor's Tower (`s6-orchestrator-tower.png`)

**What it proves:** One module gets live runtime access — every other is isolated after setup.

#### CODE (HTML/CSS)
- Diagram container
- Optional: the THINK → DECIDE → ACT → OBSERVE cycle as a standalone CSS-animated loop (four boxes with clockwise arrows, blueprint azure)

#### SVG
- Tower cross-section outline (tall rectangle, cut line notation)
- Live switchboard box inside tower
- Connection lines from tower to surrounding buildings:
  - Solid azure lines = live runtime connections (Orchestrator)
  - Dashed ink lines with X terminals = mount-time-only (all others)
- Label boxes: PROVIDER, TOOL, CONTEXT MANAGER, HOOK HANDLER, RESOLVER
- THINK/DECIDE/ACT/OBSERVE cycle diagram (rectangle with phase labels on each side, clockwise arrows)
- "KERNEL" zone at base
- "COORDINATOR REGISTRY" label

#### GENERATED IMAGE (raster asset)
- Tower building illustration (cross-section showing rooms, stairs, internal detail)
- Cityscape illustration on the left (row of buildings)
- Switchboard interior illustration (person at desk, server racks)
- Filing cabinet/shelf details in coordinator section

**Asset strategy:** Main tower illustration as one raster asset (~600×800px at 2x). Surrounding diagram elements (connection lines, labels, cycle diagram) as SVG overlay. The cycle diagram (THINK/DECIDE/ACT/OBSERVE) is 100% SVG — four rectangles with arrow paths.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full cross-section view. Tower + cityscape + cycle diagram. |
| Tablet (768px) | Scale down. Cycle diagram may move below the tower. |
| Mobile (375px) | Split into two stacked views: (1) simplified tower diagram showing solid vs dashed connections, (2) cycle diagram below. The detailed illustration may be replaced with a schematic version. |

---

### 6. §7 — Tools vs Hooks: Storefront vs Inspector (`s7-tools-hooks-street.png`)

**What it proves:** Tools are visible choices (AI decides); hooks are invisible enforcement (code decides).

#### CODE (HTML/CSS)
- **Two-column CSS grid** — this is the most CSS-heavy illustration
- Left column: green accent border (`3px #1B7A3D`), green wash background (`rgba(34,163,74,0.06)`)
- Right column: red accent border (`3px #B91C1C`), red wash background (`rgba(220,53,53,0.06)`)
- Column headers: "AI DECIDES" / "CODE DECIDES" in semantic colors
- Tool name labels as styled inline code blocks: `READ_FILE`, `SEARCH_WEB`, `RUN_COMMAND`
- "DENIED" stamp label
- Responsive: columns stack on mobile

#### SVG
- Tool sign outlines (green-bordered rectangles above storefronts)
- Dividing line between the two worlds
- Priority cascade bars (if included as inset): five horizontal bars in cascade colors

#### GENERATED IMAGE (raster asset)
- Left: Street scene with storefront facades, windows showing activity, man in green jacket
- Right: Alley scene with inspector characters in hard hats, restricted atmosphere
- Window contents (books, globe, computer)

**Asset strategy:** Two separate raster images (left scene, right scene), each ~550×600px at 2x. CSS handles the column layout, borders, headers. Raster scenes sit inside the columns. SVG overlays the tool sign labels.

This is the diagram with the **most natural CSS-first approach** because the two-column split, semantic borders, and text labels are all standard CSS. The illustrations are the artistic layer.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Side-by-side columns. Full street scene illustrations. |
| Tablet (768px) | Still side-by-side but tighter. |
| Mobile (375px) | Stack vertically. "AI DECIDES" card on top, "CODE DECIDES" below. Each gets full width. Illustrations scale down but remain meaningful. |

---

### 7. §8 — Sessions: A Visitor's Day Pass (`s8-sessions-journey.png`)

**What it proves:** Four session phases as a walkable sequence — Create, Initialize, Execute (repeatable), Cleanup (always runs).

#### CODE (HTML/CSS)
- Horizontal scroll container on mobile (overflow-x: auto with snap points)
- Figure number and caption
- Gate labels as styled blocks
- "REPEATABLE" and "ALWAYS RUNS" callout badges (CSS pill shapes)

#### SVG
- Linear horizontal path (thick azure line)
- Four gate archways (geometric arcs or rectangles)
- Gate labels: ① CREATE, ② INITIALIZE, ③ EXECUTE, ④ CLEANUP
- Loop-back arrow on Execute (dashed azure)
- Module loading order markers (①–⑤ on conveyor belt section)
- parent_id connection line (two passes side by side with linking arrow)
- Step markers (circled numbers)
- "ALWAYS RUNS, EVEN AFTER ERRORS" emphasis badge
- Arrows and flow direction indicators

#### GENERATED IMAGE (raster asset)
- Ticket booth illustration (Gate 1)
- Orientation Center building (Gate 2)
- City hub buildings (Gate 3 — inside the Execute zone)
- Character figures (visitor with backpack, ticket seller, module representatives)
- Megaphone at Gate 4

**Asset strategy:** Long horizontal raster (2200×600px at 2x) as the illustrated background layer. SVG overlay for the path, gates, markers, labels, and arrows. This is similar to a "journey map" format.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full horizontal journey. All four gates visible simultaneously. |
| Tablet (768px) | Scales down proportionally. Still horizontal. |
| Mobile (375px) | **Vertical reflow.** Convert to a vertical timeline: four stacked cards (CREATE → INIT → EXEC → CLEANUP), each with a small gate icon and description. The loop arrow on EXEC becomes a visible badge. Horizontal journey illustration replaced with a simplified vertical flow. |

---

### 8. §9 — Bundles: City Planning Office (`s9-bundles-planning-office.png`)

**What it proves:** Bundles are text files. Composition through layering (base → team → project). Last wins.

#### CODE (HTML/CSS)
- Stacked-card visual: three overlapping cards showing bundle layers
- Each card has a slightly different azure saturation (lightest for base, richest for project)
- "LAST WINS" badge (CSS pill)
- @mention reference cards as small code-styled blocks
- "LIVE RE-READING" annotation
- "TEXT FILES. NO CODE REQUIRED." footer text

#### SVG
- Three stacked rectangles (bundle layers) with slight offset to show depth
- Leader lines connecting bundles to their included items
- Arrow showing "TOP" / override direction
- @mention file path boxes with connection lines to file cabinet drawers
- "TOOLS" / "HOOKS" / "MODELS" drawer labels
- Recycling icon in project bundle

#### GENERATED IMAGE (raster asset)
- Drafting table / room illustration (wooden table, windows, wall blueprints)
- File cabinet illustration
- Isometric city illustrations within each bundle layer (showing what the bundle produces)

**Asset strategy:** Room scene as one raster background (2200×800px at 2x). The three bundle cards can be either raster-within-SVG or 100% CSS cards with text — strongly recommend **CSS cards** because they contain structured text (YAML keys) that should be selectable and readable by screen readers.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full drafting room scene with overlapping bundles. |
| Tablet (768px) | Scale proportionally. Bundle cards still stack. |
| Mobile (375px) | Drop the room illustration. Show only the three bundle cards stacked vertically as styled CSS cards with their YAML contents. Add an arrow showing the override direction. Pure structural — no raster needed on mobile. |

---

### 9. §10 — Foundation: Underground Infrastructure (`s10-foundation-underground.png`)

**What it proves:** Foundation turns text files into running sessions. Two live callbacks persist at runtime.

#### CODE (HTML/CSS)
- Diagram container split into two zones: above-ground and below-ground
- Section cut line (CSS horizontal rule with dashed pattern and "CUT LINE" label)
- Pipeline step containers: eight numbered boxes in a horizontal flow

#### SVG
- Eight pipeline step boxes (rounded rectangles with numbered labels)
- Pipeline flow lines (thick gray pipes with flow arrows)
- Two highlighted azure utility lines that cross from below to above ground
- "SYSTEM PROMPT FACTORY" and "MODULE RESOLVER" labels with connection to above-ground
- "BUNDLE TEXT FILE" icon with arrow into pipeline
- "RUNNING SESSION" endpoint label
- "KERNEL" label at bottom
- Section cut line (dashed engineering notation)
- "CONNECTED AT RUNTIME. INDEPENDENT AT COMPILE TIME." caption

#### GENERATED IMAGE (raster asset)
- Underground earth cross-section (layered soil texture, warm browns)
- Above-ground city skyline (buildings, streetlights)
- Pipe textures and flanges (detailed mechanical illustration)

**Asset strategy:** Two raster layers: (1) underground texture/earth cross-section, (2) above-ground cityscape. SVG overlay handles all pipeline boxes, connection lines, labels, and the two highlighted azure utility lines.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full horizontal pipeline view. 8 steps flow left to right. |
| Tablet (768px) | Scale down. Pipeline steps may wrap to two rows (4+4). |
| Mobile (375px) | Vertical pipeline: 8 numbered steps as a vertical list/flow. Two highlighted lines called out as badges. Drop the illustration, keep the schematic. |

---

### 10. §11 — Agents, Skills, Recipes: Three City Functions (`s11-agents-city-functions.png`)

**What it proves:** Agents = bundles with different nameplate. Skills = progressive disclosure. Recipes = chained sessions.

#### CODE (HTML/CSS)
- Three-panel CSS Grid (`grid-template-columns: 1fr 1fr 1fr`)
- Panel headers: "AGENTS" / "SKILLS" / "RECIPES"
- Panel footers with descriptive captions
- Shared footer: "NO NEW KERNEL SUPPORT. BUILT FROM SESSIONS, BUNDLES, AND MODULES."
- Panel borders (subtle 1px ink)

#### SVG
- Panel 1: Two nameplate rectangles on building door ("BUNDLE:" and "META:")
- Panel 1: Address card boxes
- Panel 2: Three floor level indicators with token count labels
- Panel 2: "LEVEL 1: ~100 TOKENS", "LEVEL 2: ~1-5K TOKENS", "LEVEL 3: 0 TOKENS UNTIL READ"
- Panel 3: Route markers (S1, S2, S3), flow arrows between them
- Panel 3: Approval gate indicator, "HUMAN REVIEW" checkpoint

#### GENERATED IMAGE (raster asset)
- Panel 1: Corner building illustration with windows and door
- Panel 2: Three-story library building with visible bookshelves
- Panel 3: Isometric map with route, gatehouse, and figures

**Asset strategy:** Three separate raster images (one per panel), each ~366×500px at 2x. Identical to the §3 philosophy triptych pattern.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Three columns side by side. |
| Tablet (768px) | Three columns, tighter padding. |
| Mobile (375px) | Stack vertically. Each panel becomes a full-width card. |

---

### 11. §12/12.1 — The Complete Picture: City Elevation (`s12-city-elevation.png`)

**What it proves:** Six-layer hierarchy — each depends only on the one below it.

#### CODE (HTML/CSS)
- Six horizontal band containers, stacked vertically
- Each band gets its layer color from the existing layer tokens (`--layer-kernel-soft`, `--layer-modules-soft`, etc.)
- Layer labels styled with their semantic colors
- "BUILD HERE" dotted-border zones in the top layer
- Dependency arrows between layers (could be CSS pseudo-elements or SVG)

#### SVG
- Six horizontal layer bands (rectangles with distinct fills)
- Downward dependency arrows between each layer (blueprint azure, filled arrowheads)
- Layer labels: KERNEL · AMPLIFIER-CORE, MODULES · PROVIDERS · TOOLS · HOOKS..., BUNDLES · TEXT FILES · NO CODE, FOUNDATION · TURNS BUNDLES INTO SESSIONS, APPLICATIONS · CLI · WEB · IDE, COMMUNITY · OPEN AT EVERY LEVEL
- Component labels within each layer (cloud shapes in bedrock, rectangles in ground floor)
- Dotted outlines for "BUILD HERE" zones
- "EACH LAYER DEPENDS ONLY ON THE ONE BELOW IT." caption

#### GENERATED IMAGE (raster asset)
- Building silhouettes in the upper layers (Applications, Community)
- Construction scaffolding and cranes in Community layer
- Blueprint scrolls in Bundles layer
- Filing cabinets in Foundation layer
- City buildings in profile in Modules layer

**Asset strategy:** This diagram has the most synergy with the **existing interactive layer diagram** on the site (which already uses `data-layer` attributes with layer colors). The production version should enhance that existing CSS-driven diagram with illustrated building silhouettes added as decorative raster images within each layer band. The structural layout stays as HTML/CSS with SVG arrows.

#### Responsive Strategy
| Breakpoint | Behavior |
|---|---|
| Desktop (≥1100px) | Full six-layer elevation at wide breakout. Illustrated buildings visible. |
| Tablet (768px) | Proportional scale. Layer labels stack within bands. |
| Mobile (375px) | The existing layer diagram already handles mobile well (stacked cards). Enhance with small icons per layer instead of full building illustrations. The dependency arrows simplify to a single downward arrow between each card. |

---

## B. Shared Component Architecture

### Reusable Pieces Across All 11 Illustrations

#### 1. `IllustrationContainer` (HTML/CSS)
```css
.illustration {
  position: relative;
  width: calc(100% + 160px);     /* wide breakout */
  margin: 40px -80px;
  background: var(--bg-card);
  border: 1px dotted rgba(0, 0, 0, 0.12);
  padding: var(--space-8);
  overflow: hidden;
}

.illustration__figure-num {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--text-muted);
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.illustration__caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  max-width: var(--measure-reading);
  margin-top: var(--space-4);
}

@media (max-width: 600px) {
  .illustration {
    width: calc(100% + 32px);
    margin: 20px -16px 24px;
    padding: var(--space-4);
  }
}
```

#### 2. `DotGridBackground` (CSS)
```css
.illustration--grid {
  background-image: radial-gradient(
    circle, rgba(0, 0, 0, 0.04) 1px, transparent 1px
  );
  background-size: 16px 16px;
}
```

#### 3. `TriptychLayout` (CSS) — Used by §3, §7, §11
```css
.triptych {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-4);
}

.triptych__panel {
  border: 1px solid var(--border-default);
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
}

.triptych__panel-header {
  font-family: var(--font-mono);
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.06em;
  margin-bottom: var(--space-3);
}

.triptych__panel-image {
  width: 100%;
  height: auto;
  flex: 1;
  object-fit: contain;
}

.triptych__panel-caption {
  font-family: var(--font-sans);
  font-size: var(--text-sm);
  color: var(--text-secondary);
  margin-top: var(--space-3);
}

@media (max-width: 768px) {
  .triptych {
    grid-template-columns: 1fr;
    gap: var(--space-6);
  }
}
```

#### 4. `SplitComparison` (CSS) — Used by §7
```css
.split-comparison {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0;
}

.split-comparison__side--tools {
  border-left: 3px solid var(--color-tools-text);
  background: var(--color-tools-bg);
}

.split-comparison__side--hooks {
  border-left: 3px solid var(--color-hooks-text);
  background: var(--color-hooks-bg);
}

@media (max-width: 768px) {
  .split-comparison { grid-template-columns: 1fr; }
}
```

#### 5. `LayeredRasterSVG` (Pattern) — Used by §2, §5, §6, §8, §10
```html
<!-- Pattern: raster illustration base + SVG overlay -->
<div class="illustration illustration--grid" role="img" aria-label="...">
  <div class="illustration__fig-num">FIG. 02a</div>
  <div class="illustration__canvas" style="position: relative;">
    <!-- Raster base layer -->
    <picture>
      <source srcset="img/s2-city-map-2x.webp" type="image/webp">
      <source srcset="img/s2-city-map-2x.png" type="image/png">
      <img src="img/s2-city-map-1x.png" alt="" role="presentation"
           width="1100" height="600" loading="lazy">
    </picture>
    <!-- SVG overlay for labels, lines, interactive zones -->
    <svg viewBox="0 0 1100 600" class="illustration__overlay">
      <!-- Labels, connection lines, zone boundaries -->
    </svg>
  </div>
  <p class="illustration__caption">FIG. 02a — The architecture as a city...</p>
</div>
```

#### 6. `CityLabel` (SVG reusable text component)
```svg
<!-- Reusable label pattern across all city diagrams -->
<g class="city-label">
  <rect x="0" y="0" width="120" height="22" rx="0" fill="white" stroke="#1A1815" stroke-width="1"/>
  <text x="60" y="15" text-anchor="middle"
        font-family="'Space Grotesk', sans-serif" font-weight="500"
        font-size="11" fill="#1A1815" letter-spacing="0.06em"
        text-transform="uppercase">KERNEL</text>
</g>
```

#### 7. Shared Raster Style Guide (for nano-banana prompts)
All generated images must follow:
- **Palette:** Warm cream ground + ink (#1A1815) + blueprint azure (#0082EB)
- **Style:** "Technical illustration, engineering textbook quality, monochromatic blueprint rendering with one accent color (azure), warm cream paper background, monospaced ALL CAPS labels"
- **NOT:** No photorealistic rendering, no gradients, no glossy effects, no dark backgrounds
- **Resolution:** Generate at 2048px minimum width for retina quality
- **Format pipeline:** Generate PNG → optimize → export WebP + PNG fallback

---

## C. Production Order

Build in this order to establish patterns early, then accelerate:

### Phase 1: Establish Patterns (Build 3, validate approach)

| Order | Illustration | Why First |
|---|---|---|
| **1** | §4 Kernel Floor Plan | Closest to existing pure-SVG diagrams. Establishes the SVG structure pattern. Low raster dependency — potentially 100% SVG. Validates labeling, font embedding, container sizing. |
| **2** | §7 Tools vs Hooks | Establishes the CSS-first split-comparison pattern. Most CSS, least SVG. Validates the `SplitComparison` component and semantic color usage. |
| **3** | §12 City Elevation | Extends the existing interactive layer diagram. Validates the `LayeredRasterSVG` pattern with real illustrated assets. Establishes the raster-under-SVG technique. |

### Phase 2: Core Pieces (4 illustrations)

| Order | Illustration | Pattern Reused |
|---|---|---|
| **4** | §3 Philosophy (Triptych) | Reuses `TriptychLayout` |
| **5** | §11 Agents/Skills/Recipes (Triptych) | Reuses `TriptychLayout` |
| **6** | §8 Sessions Journey | New pattern (horizontal journey). Complex — benefits from Phase 1 lessons. |
| **7** | §2 City Map | The anchor piece. Most complex. By now all patterns are proven. |

### Phase 3: Remaining (4 illustrations)

| Order | Illustration | Notes |
|---|---|---|
| **8** | §5 Modules Neighborhoods | Isometric — hardest raster-SVG alignment |
| **9** | §6 Orchestrator Tower | Cross-section + cycle diagram composite |
| **10** | §9 Bundles Planning Office | CSS cards over raster background |
| **11** | §10 Foundation Underground | Horizontal pipeline with cross-section |

### Estimated Effort Per Phase
- **Phase 1:** ~3 sessions (1 per illustration) — slow, deliberate, pattern-setting
- **Phase 2:** ~4 sessions — faster, patterns reused
- **Phase 3:** ~4 sessions — full speed, all patterns proven

---

## D. Responsive Strategy (System-Wide)

### Three Rendering Tiers

| Tier | Breakpoint | Strategy |
|---|---|---|
| **Full** | ≥1024px | All raster imagery + SVG overlays + interactive hover. Wide breakout width. |
| **Compact** | 768–1023px | Same content, proportionally scaled via SVG viewBox. Tighter padding. |
| **Simplified** | <768px | Structural simplification. Drop isometric views for flat schematics. Triptychs stack vertically. Horizontal journeys become vertical timelines. Raster details may be replaced by small icons or omitted entirely. |

### Implementation Techniques

1. **`<picture>` with art direction:** Use different raster crops per breakpoint if the full illustration doesn't scale well.
   ```html
   <picture>
     <source media="(min-width: 1024px)" srcset="img/s2-full-2x.webp">
     <source media="(min-width: 768px)" srcset="img/s2-compact-2x.webp">
     <img src="img/s2-simple.png" alt="Architecture overview">
   </picture>
   ```

2. **CSS `display: none` for detail layers:** Non-essential SVG groups hidden on mobile.
   ```css
   @media (max-width: 768px) {
     .illustration__overlay .leader-lines,
     .illustration__overlay .secondary-labels { display: none; }
   }
   ```

3. **Vertical reflow for horizontal diagrams:** §8 (Sessions) and §10 (Foundation) have horizontal flows that must become vertical on mobile. Build both orientations into the SVG with CSS class toggles.

4. **Minimum text size guarantee:** No SVG text below 11px rendered size at any breakpoint. Test by checking `getBoundingClientRect()` on text elements at 375px viewport.

5. **`loading="lazy"`** on all raster `<img>` elements since most diagrams are below the fold.

---

## E. Quality Gate Process

### Per-Illustration Pipeline

```
CONCEPT IMAGE (reference)
    │
    ▼
┌─────────────────────┐
│  1. STRUCTURE        │  Build HTML/CSS container + SVG skeleton
│     (no raster yet)  │  Validate: responsive reflow, font loading,
│                      │  label readability at all 3 breakpoints
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  2. RASTER ASSETS   │  Generate illustrations via nano-banana
│                      │  Match concept palette + style
│                      │  Export at 2x, optimize (WebP + PNG)
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  3. INTEGRATION      │  Combine: raster base + SVG overlay
│                      │  Verify alignment at all breakpoints
│                      │  Check label-over-illustration readability
└──────────┬──────────┘
           │
           ▼
┌─────────────────────┐
│  4. CONVERGENCE      │  nano-banana compare:
│     CHECK            │    concept image vs production screenshot
│                      │  Structured rubric (see below)
└──────────┬──────────┘
           │
      ┌────┴────┐
      │ PASS?   │
      ├── YES ──┤──▶  Ship to site
      └── NO ───┘──▶  Iterate (return to step that needs work)
```

### Convergence Check Rubric (nano-banana compare)

For each illustration, run:
```
nano-banana compare(
  image1_path="concepts/round-2/sN-concept.png",
  image2_path="screenshots/sN-production.png",
  prompt="""
  Compare concept (IMAGE 1) to production (IMAGE 2) on these criteria:
  
  1. LAYOUT FIDELITY: Does the spatial arrangement match?
     (zone positions, hierarchy, reading order)
  
  2. LABEL ACCURACY: Are all concept labels present in production?
     Any missing? Any added?
  
  3. COLOR COMPLIANCE: Does production use only ink/azure/white
     (or documented semantic exceptions)?
  
  4. METAPHOR INTEGRITY: Does the city/neighborhood metaphor
     come through in the production version?
  
  5. INFORMATION PRESERVED: Does every teaching point from the
     concept survive in production?
  
  6. CRAFT QUALITY: Does production look intentionally designed,
     not generated? Passes the slop test?
  
  Score each 1-5. Overall PASS requires all criteria ≥3
  and average ≥3.5.
  """
)
```

### Pre-Ship Checklist (per illustration)

- [ ] Figure number assigned (FIG. XXx format)
- [ ] Caption written (states what the diagram proves)
- [ ] Three-color rule followed (or documented semantic exception)
- [ ] All text is Space Grotesk UPPERCASE (naming) or Inter sentence case (explaining)
- [ ] Stroke weights are exactly 1px, 1.5px, or 2px
- [ ] `aria-label` and alt text present
- [ ] Responsive at 375px: content readable, no horizontal overflow
- [ ] Responsive at 768px: layout intact, labels readable
- [ ] Responsive at 1100px: full illustration rendered
- [ ] `loading="lazy"` on raster images below the fold
- [ ] WebP + PNG fallback provided
- [ ] nano-banana convergence check: all criteria ≥3, average ≥3.5
- [ ] Concept image archived as reference in `.design/concepts/round-2/`

---

## Appendix: Asset Inventory

### Raster Images to Generate (22 total)

| # | Illustration | Asset | Dimensions (2x) | Priority |
|---|---|---|---|---|
| 1 | §2 City Map | Full city cartographic illustration | 2200×1200 | Phase 2 |
| 2 | §3 Philosophy P1 | Notice board + characters | 732×800 | Phase 2 |
| 3 | §3 Philosophy P2 | Three city evolution scenes | 732×800 | Phase 2 |
| 4 | §3 Philosophy P3 | Building modules + connections | 732×800 | Phase 2 |
| 5 | §4 Kernel | Room interior icons (6 small sprites) | 200×160 each | Phase 1 |
| 6 | §5 Modules | Full isometric neighborhood view | 2200×1200 | Phase 3 |
| 7 | §6 Tower | Tower cross-section illustration | 1200×1600 | Phase 3 |
| 8 | §6 Tower | Cityscape row | 600×400 | Phase 3 |
| 9 | §7 Tools | Street scene (tools side) | 1100×1200 | Phase 1 |
| 10 | §7 Hooks | Alley scene (hooks side) | 1100×1200 | Phase 1 |
| 11 | §8 Sessions | Full journey panorama | 2200×1200 | Phase 2 |
| 12 | §9 Bundles | Drafting room scene | 2200×1600 | Phase 3 |
| 13 | §10 Foundation | Underground earth cross-section | 2200×600 | Phase 3 |
| 14 | §10 Foundation | Above-ground cityscape | 2200×400 | Phase 3 |
| 15 | §11 Agents P1 | Corner building with nameplates | 732×1000 | Phase 2 |
| 16 | §11 Skills P2 | Three-story library | 732×1000 | Phase 2 |
| 17 | §11 Recipes P3 | Isometric route map | 732×1000 | Phase 2 |
| 18 | §12 Elevation | Building silhouettes per layer (6) | 2200×200 each | Phase 1 |
| — | — | **Total unique raster assets** | **~22** | — |

### SVG Components to Build (11 total, one per illustration)

Each SVG contains labels, connection lines, boundaries, and interactive zones. Average complexity: 50-150 elements per SVG.

### CSS Components to Build (7 shared)

1. `IllustrationContainer` — universal wrapper
2. `DotGridBackground` — blueprint grid pattern
3. `TriptychLayout` — three-panel grid (§3, §11)
4. `SplitComparison` — semantic two-column (§7)
5. `HorizontalJourney` — scrollable path (§8)
6. `VerticalPipeline` — mobile fallback for flows (§8, §10)
7. `LayerStack` — six-layer elevation enhancement (§12)
