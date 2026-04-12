# Round 2 — Illustration Concept Briefs

**Date:** 2026-04-12
**Scope:** Sections 2.1, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 12.1
**Unifying thread:** City/neighborhood metaphor, derived from the text's own language in §2.1
**Palette:** Warm amber/cream ground + ink (#1A1815) + blueprint azure (#0082EB) + monospaced UPPERCASE labels
**Previous round:** Round 1 explored technical schematics (event bus, mount rail, pipeline, flow diagrams, stacked bars). All are competent but disconnected — each section has its own visual idiom. Round 2 proposes a *connected visual world* that the reader walks through section by section.

---

## What Round 1 Already Tried (for context)

| Section | R1 File | R1 Direction | Assessment |
|---------|---------|-------------|------------|
| s4 | s4-kernel.png | Sepia blueprint schematic, event bus block diagram | Good technical clarity; no metaphor; feels generic |
| s5 | s5-modules.png | Mounting rail / bus system, color-coded cartridges | Clever "plug-in" physicality; doesn't connect to other sections |
| s6 | s6-orchestrator.png | Privilege gap diagram (dashed vs solid connections) | Accurately shows the concept; minimal visual identity |
| s7 | s7-tools-hooks.png | Two-column green/red comparison, hand-sketched | Best of R1 — the duality reads immediately |
| s8 | s8-sessions.png | Linear flowchart, four color-coded phases | Functional but reads like any lifecycle diagram |
| s9 | s9-bundles.png | Layered stacking, "last wins" merge | Clear merge visualization; generic diagram style |
| s10 | s10-foundation.png | Pipeline bridge, 8-step assembly | Correct mapping; loses the "stays alive at runtime" insight |
| s11 | s11-agents.png | Three-column triptych (agents/skills/recipes) | Informative catalog; no unified metaphor |
| s12 | s12-complete.png | Vertical stacked bars with dependency arrows | Accurate but interchangeable with any layered architecture |

For FIG-02a (architecture overview), 18+ concepts were explored: car cutaway, planet, rocket, signal chain, solid-state, spaceship (cross-section + exploded), space station, studio rack, tube amp, watch, plus several abstract isometric views. The watch and station were most promising but each had metaphor-fit problems at the edges.

---

## The Unifying Metaphor: A City You Walk Through

The text itself says it in §2.1:

> "Think of it as a city map before you walk the streets. You don't need to know every building. You need the neighborhoods."

This isn't decoration — it's the author's chosen pedagogical frame. The architecture IS presented as a city map. Every subsequent section is a "walk" through one neighborhood. Round 2 leans into this: every illustration is a view of the same city, seen from different vantage points and zoom levels.

### The City Mapping

| Amplifier Concept | City Equivalent | Why It Works |
|-------------------|-----------------|-------------|
| **Kernel** | Town square / civic center | The oldest, most stable part. Everything radiates from it. It doesn't change when new buildings go up. |
| **Modules** | Neighborhoods / districts | Each has its own character (Provider District, Tool Quarter, Hook Ward) but they all share the same streets and address system. |
| **Orchestrator** | The mayor's office / traffic control | The one entity with a live view of the whole city. Everyone else only knows their own block. |
| **Bundles** | Blueprints / zoning plans | Text documents that say what gets built where. No physical presence — just instructions that produce physical results. |
| **Foundation** | City infrastructure — roads, utilities, plumbing | You don't see it, but it connects everything. It was built by the city planning authority (Amplifier team) but the city works without it if you bring your own. |
| **Applications** | The buildings people enter — shops, offices, clinics | CLI = the post office. Web interface = the library. IDE integration = the workshop. |
| **Community** | Open land at the edges | Zoned for expansion. Anyone can build here. The city code applies but the city doesn't dictate what goes up. |
| **Sessions** | A visitor's day in the city | You arrive (Create), get oriented (Initialize), do your business (Execute — can repeat), and leave (Cleanup). Self-contained; your visit doesn't change anyone else's. |
| **Tools** | City services with public signage | The visitor (AI) can see the signs: "LIBRARY", "POST OFFICE", "REPAIR SHOP". They choose which to enter. |
| **Hooks** | Invisible city ordinances / building inspectors | The visitor never sees them. Inspectors check every construction (tool call) automatically. They can stop work (deny), request a permit (ask_user), post a notice (inject_context), or modify plans (modify). |
| **@mentions** | Street addresses | Point to specific locations. Resolved fresh every time someone asks for directions. |
| **Events** | The city PA system | 41 channels. When something happens, an announcement goes out. Anyone listening on that channel hears it. |

### What the metaphor does NOT cover well

- **Structural subtyping** (§5.2) — "if your class has the right methods, it qualifies." This is more like a guild system than a building code. Brief acknowledges where the metaphor should step aside.
- **Cancellation** (§8.4) — cooperative flag-checking doesn't map cleanly to city life. Keep it as a small technical inset.
- **Model routing** (§11.5) — abstract enough to stay as a simple labeled diagram.

---

## Brief 1 — §2.1 Architecture Map: "A Map of the Territory"

### Text Metaphor (extracted)
> "Think of it as a city map before you walk the streets. You don't need to know every building. You need the neighborhoods."
> "The most important cluster is at the center: amplifier-core. Everything else depends on it; it depends on nothing. That asymmetry is the architecture in one sentence."

### Concept: Bird's-Eye City Map
An overhead city plan, rendered as a warm-toned cartographic illustration. Concentric zones radiate outward from a dense, strongly outlined civic center (kernel) through increasingly open districts.

**Visual structure:**
- **Center:** A compact cluster of 5 buildings around a small square, labeled in monospaced caps: COORDINATOR, HOOKS, LOADER, SESSION, CONTRACTS. Heavy 2px ink border around this block. This is the town square — clearly the oldest, most solid part of the map.
- **Middle ring:** Five distinct neighborhood blocks surround the center: ORCHESTRATOR (the largest, with a line connecting it back to the center — the only neighborhood with a direct line), PROVIDERS, TOOLS, CONTEXT MANAGERS, HOOK HANDLERS. Each block has a slightly different footprint shape but all share the same street grid.
- **Outer ring:** Three zones separated by roads: FOUNDATION (a utility corridor with visible pipes/conduits running underground in cross-section), BUNDLES (a planning office with blueprint scrolls visible through the window), APPLICATIONS (varied building facades — a terminal/post office, a browser/library), COMMUNITY (open lots with dotted boundary lines and "AVAILABLE" signs).
- **Style:** Cartographic/plan view. Cream paper background with fine dot grid. Blueprint azure for the streets and connectors. All labels in Space Grotesk UPPERCASE. Leader lines from labels to buildings.

### What It Teaches
1. The concentric dependency structure — outer depends on inner, never the reverse
2. The *asymmetry* — the kernel depends on nothing; everything depends on it
3. The relative density: kernel is compact (5 things), modules are diverse (6 types), ecosystem is open-ended
4. The Orchestrator's special position (connected to center at runtime — the only neighborhood with a persistent road to the square)

### Palette Notes
- Ground: cream/white (#FFFFFF card ground)
- All structure lines: ink (#1A1815)
- Streets, connectors, active zones: blueprint azure at varying opacities
- Kernel boundary: 2px ink (emphasis stroke per aesthetic guide)
- Outer community zone: dashed border (open/extensible)

---

## Brief 2 — §3 Design Philosophy: "Mechanism, Not Policy"

### Text Metaphor (extracted)
> "The kernel fires a tool:pre event before every tool call. A safety module decides whether to block it. A logging module records it. The kernel has no opinion about what should happen."
> "The center stays still so the edges can move at any speed."
> "Search the entire amplifier-core codebase for file-writing operations: zero matches."

### Concept: The Unchanging Square
A split-panel illustration. **Left panel:** The town square in three different eras — same buildings, same layout, but the surrounding neighborhoods change dramatically (new buildings, different signage, expansion). The square is drawn identically all three times. **Right panel:** A zoomed-in view of the square's notice board — events are posted (tool:pre, session:start) but no instructions are attached. The board says WHAT HAPPENED, never WHAT TO DO.

**Visual structure:**
- Left panel: Three small elevation sketches stacked vertically, sharing the same central square outline. The square buildings are ink-only (no fill) in all three. The surrounding buildings change: v1 has a few simple structures, v2 has more complex ones, v3 has a whole skyline — but the square is pixel-identical. A caption: "THE CENTER STAYS STILL."
- Right panel: Close-up of a civic notice board. Three event notices pinned: "TOOL:PRE — A TOOL CALL WILL HAPPEN", "SESSION:START — A SESSION IS BEGINNING", "PROVIDER:RESPONSE — A MODEL REPLIED". Each is a plain announcement. No instructions, no opinions. Below the board: "41 CANONICAL EVENTS. ZERO OPINIONS."

**Alternative direction (simpler):** A single illustration showing the town square with roads leading out in every direction. On each road, a different kind of vehicle (representing different modules/policies) — but the square itself has no vehicles, no traffic signals, no rules. It's just the intersection. The roads decide the rules.

### What It Teaches
1. Mechanism vs policy — the kernel provides infrastructure (roads, notice boards) but never decides what happens on them
2. "The center stays still" — visual proof that the kernel doesn't change when everything around it does
3. "Zero file I/O" — the kernel is aggressively empty; it's an absence, not just a small presence

### Palette Notes
- The square rendered in ink only (no fill) to emphasize its emptiness/stability
- Surrounding neighborhoods in blueprint wash to show activity/change
- Notice board text in monospaced caps

---

## Brief 3 — §4 The Kernel: "Five Things, Nothing Else"

### Text Metaphor (extracted)
> "Five things live in the kernel. Nothing else."
> "Think of [the Coordinator] as a phone book."
> "The kernel writes zero bytes to disk."

### Concept: The Civic Center Floor Plan
An architectural floor plan of the town square's civic center — a single building with exactly five rooms, each labeled. The building has thick walls (2px emphasis stroke). Each room is spare, almost austere. The floor plan style emphasizes that there is *nothing else here* — no storage rooms, no closets, no hidden wings.

**Visual structure:**
- A rectangular floor plan with five clearly labeled rooms:
  - **SESSION LIFECYCLE** — the entrance hall. Four doors labeled CREATE → INIT → EXEC → CLEAN. A small loop arrow on EXEC ("repeatable").
  - **CONTRACTS** — a room with six identical frames on the wall (the six module type contracts). Each frame has the same simple text: `mount(coordinator, config)`.
  - **MODULE LOADER** — a receiving dock. Modules arrive, get `mount()` called, and self-place into the Coordinator.
  - **COORDINATOR** — the phone book room. A shelf with labeled slots: one for each module type. Nothing else. Caption: "A SHELF, NOT A BRAIN."
  - **HOOKS** — the PA system room. A control panel with 41 channels. Wires run out through the walls to every other building in the city.
- Outside the building: an empty lot labeled "FILE I/O: ZERO". Nothing is written. The ground is bare.
- The blueprint grid background applies here (per aesthetic guide: architecture diagrams get grid).

### What It Teaches
1. The kernel contains exactly five components — the floor plan makes this countable
2. The Coordinator is passive (a shelf, not a brain) — the room has shelves but no desk, no chair
3. The mount contract is universal — every contract frame on the wall is identical
4. Zero file I/O — the empty lot outside is the visual punchline
5. Hooks are the nervous system — the wires running out of the building to everywhere

### Palette Notes
- Building outline: 2px ink emphasis stroke
- Room interiors: white fill (austere emptiness)
- Hook wires: blueprint azure at 60% opacity
- Labels: Space Grotesk UPPERCASE with leader lines

---

## Brief 4 — §5 The Module System: "Remove One, Add Another"

### Text Metaphor (extracted)
> "Everything outside the kernel is a module."
> "Remove one, add another. The rest of the system doesn't notice."
> "If your class has the right methods with the right signatures, it qualifies as that module type. You don't need to declare 'I am a Tool.'"

### Concept: The Neighborhood Directory
An isometric/axonometric view of five distinct neighborhood blocks arranged around the civic center from Brief 3. Each neighborhood has a different character but the same address format. One building is being lifted out by a crane; another is being lowered into an empty lot. The surrounding buildings are undisturbed.

**Visual structure:**
- **Central reference:** The civic center from Brief 3, small but recognizable, at the center of the composition.
- **Five neighborhoods radiating outward:**
  - ORCHESTRATOR — the largest building, closest to the center. A thick connection line runs to the civic center (foreshadowing the privilege gap in §6). Label: "EXACTLY ONE. REQUIRED."
  - PROVIDERS — a row of buildings with satellite dishes/antennas, each labeled with a different name. Label: "MULTIPLE ALLOWED."
  - TOOLS — a commercial strip with storefronts, each with a visible sign (name + description). The signs face outward — visible to visitors (the AI).
  - CONTEXT MANAGERS — a single building with a large ledger visible through the window. Label: "EXACTLY ONE. REQUIRED."
  - HOOK HANDLERS — buildings with no external signage. Windowless. Connected to the PA wires from the civic center. Label: "INVISIBLE."
- **The crane action:** One Tool building being lifted away, another being set down. Neighboring buildings are completely static. This is the key teaching moment: "Remove one, add another. The rest doesn't notice."
- **Loading order:** Small circled numbers (①–⑤) on each neighborhood in the order they were built: Orchestrator, Context Manager, Providers, Tools, Hook Handlers.

### What It Teaches
1. Six module types with different roles but the same plug-in contract
2. Cardinality constraints — which are "exactly one" vs "multiple allowed"
3. Tools are visible (storefronts with signs); hooks are invisible (no signage)
4. The hot-swap property — removing/adding modules doesn't affect neighbors
5. Fixed loading order — which neighborhood was built first matters

### Palette Notes
- 30° isometric projection per aesthetic guide §2.5
- Parallel projection, no perspective convergence
- Blueprint wash for active/functional buildings
- White fill for structural elements
- Leader lines with dashed ink for the crane/swap action

---

## Brief 5 — §6 The Orchestrator: "The Privilege Gap"

### Text Metaphor (extracted)
> "One module gets live access to the full system at runtime. Every other module is isolated after setup."
> "The Orchestrator can, at any moment during execution, reach into the registry and access any module."
> "No other module can do this."
> The orchestrator loop: "think, act, observe, repeat."

### Concept: The Mayor's Tower
A cross-section view (per aesthetic guide §2.6) of the Orchestrator building — the tallest structure in the city. The cross-section reveals that it has a live switchboard connecting to every other building. All other buildings have a single disconnected wire — they were connected once (at mount time) and then cut.

**Visual structure:**
- **Central element:** Cross-section of the Orchestrator tower showing its internal mechanism — a switchboard room with active lines running to: Coordinator, every Provider, every Tool, every Hook Handler, the Context Manager. Lines are solid blueprint azure ("MOUNT + RUNTIME").
- **Surrounding buildings:** Each has a small stub of wire ending in an X mark. Caption: "MOUNT-TIME ONLY." These buildings can't see each other and can't see the full system.
- **The loop:** Around the tower, a rectangular cycle diagram (per aesthetic guide §2.3 cycle): THINK → DECIDE → ACT → OBSERVE, with the Orchestrator at the center. Arrows flow clockwise.
- **Key contrast:** The thick solid line from Orchestrator to Center vs. the cut/dashed lines from every other module to Center. The privilege gap is the visual star of this illustration.

### What It Teaches
1. The privilege gap — one module has runtime access; all others are isolated after setup
2. Why the Orchestrator is special — it's the only entity that can reach any module at any time
3. The agent loop (think/act/observe/repeat) lives in this module, not in the kernel
4. The loop is replaceable — a different Orchestrator would implement a different strategy

### Palette Notes
- Cross-section cut line: 2px ink with dashed section-line notation
- Active lines: solid blueprint azure, 1.5px
- Cut/dead lines: dashed ink, 1px, with X terminals
- Loop arrows: blueprint azure, clockwise flow

---

## Brief 6 — §7 Tools vs Hooks: "The AI Decides / Code Decides"

### Text Metaphor (extracted)
> "Tools are capabilities you hand to the AI. Hooks are policies you enforce around it."
> "Use tools when you want the AI to decide. Use hooks when you need the outcome to be guaranteed."
> The code quality problem: tool approach (AI might forget) vs hook approach (runs every time).

### Concept: The Storefront vs The Inspector
A street-level split scene. **Left side:** A commercial street — storefronts with clear signage (READ_FILE, SEARCH_WEB, RUN_COMMAND). A visitor (representing the AI) is walking down the street, reading signs, choosing which shop to enter. Everything is visible, public, signed. **Right side:** Behind the buildings, in the alley — building inspectors checking every construction project. The visitor cannot see the alley. The inspectors have clipboards with five possible stamps arranged vertically: DENY (red), ASK USER (amber), INJECT (blue), MODIFY (purple), CONTINUE (green).

**Visual structure:**
- **Split composition** with a building wall as the divider (not an abstract line — the physical back wall of the storefronts IS the boundary between the two worlds)
- **Left (Tools):** Street view. 3 storefronts with signs. Visitor looking at signs. Caption: "AI-VISIBLE · AI DECIDES"
- **Right (Hooks):** Alley view. 2-3 inspectors at work. No signs. No visitor. One inspector stamps DENY on a clipboard. Caption: "AI-INVISIBLE · CODE DECIDES"
- **The code quality teaching moment:** A small inset below shows two scenarios: (1) "AS A TOOL: Shop sign says CODE CHECKER. Visitor might walk past." (2) "AS A HOOK: Inspector checks every building automatically. 100% coverage."
- **Priority cascade** can appear as the inspector's stamp authority hierarchy — a vertical stack on the clipboard.

### What It Teaches
1. The fundamental distinction: tools are visible choices; hooks are invisible enforcement
2. When to use which — the code quality problem makes it concrete
3. The priority cascade — hooks resolve in a strict order when multiple respond
4. Tools extend capability; hooks govern behavior

### Palette Notes
- Semantic color permitted here per aesthetic guide: green (#1B7A3D) for tools side, red (#B91C1C) for hooks side
- Left accent borders (3px) on each half
- 6% wash fills for each zone
- Priority cascade uses the five cascade colors (only diagram allowed to do this)

---

## Brief 7 — §8 Sessions: "A Visitor's Day in the City"

### Text Metaphor (extracted)
> "A session is the container around one instance of the system running."
> "In the CLI, a session is a conversation. In a pipeline runner, a single batch execution."
> Four phases: Create, Initialize, Execute, Cleanup. "Cleanup runs in a finally block. Always."
> Parent-child: "Set parent_id. That is the only link."

### Concept: A Day Pass
A visitor's journey through the city, rendered as a linear path on the city map. Four distinct zones along the path, each gated. The path is a one-way route with one loop.

**Visual structure:**
- **The path:** A horizontal route across the city map, passing through four gates:
  - Gate ① CREATE — "TICKET OFFICE." Visitor arrives, receives a day pass (session ID) and a map (configuration). Nothing is open yet.
  - Gate ② INITIALIZE — "CITY ORIENTATION." Buildings open in fixed order: Orchestrator first, then Context Manager, then Providers, then Tools, then Hook Handlers. If the Orchestrator or Context Manager is closed, the visit is cancelled. Sign: "REQUIRED: ORCHESTRATOR + CONTEXT MANAGER."
  - Gate ③ EXECUTE — "THE CITY IS OPEN." The visitor moves freely. This zone has a loop arrow: the visitor can re-enter this zone repeatedly (each turn of conversation). Sign: "REPEATABLE."
  - Gate ④ CLEANUP — "EXIT." A `session:end` announcement on the PA. Buildings close in reverse. The gate has a heavy frame and the label: "ALWAYS RUNS. EVEN AFTER ERRORS." Rendered with emphasis stroke.
- **Parent-child inset:** Two day passes side by side. One has "PARENT_ID: ___" blank. The other has "PARENT_ID: abc123". Caption: "THAT IS THE ONLY LINK. NO SHARED MODULES. NO SHARED MEMORY."
- **File output note:** Outside the city boundary, a small building labeled "TRANSCRIPT.JSONL" with a hook handler's wire running to it. Caption: "THE KERNEL DIDN'T WRITE THIS. A HOOK DID."

### What It Teaches
1. The four session phases as a concrete, walkable sequence
2. Which modules are required vs optional (and what happens if required ones fail)
3. Execute is repeatable — the only phase that loops
4. Cleanup always runs — the "finally block" guarantee
5. Parent-child sessions share nothing by default — the ID is the only link
6. File output comes from modules, not the kernel

### Palette Notes
- Path: blueprint azure line on the city map
- Gates: ink rectangles with circled step numbers
- The CLEANUP gate: emphasis stroke (2px) to show its unconditional nature
- Loop arrow on EXECUTE: dashed blueprint (per aesthetic guide for loop-backs)

---

## Brief 8 — §9 Bundles: "Blueprints for the City"

### Text Metaphor (extracted)
> "If modules are the building blocks, bundles are the packaging."
> "Think of bundles like npm packages for AI capabilities."
> "Most users will never write a module. They'll write a bundle — a text file."
> Composition: "A base bundle... A team bundle includes the base... A project bundle includes the team bundle..."
> @mentions: references that resolve to file paths.

### Concept: The City Planning Office
An exploded/assembly view (per aesthetic guide §2.5) of a bundle being assembled from its components. The visual language is architectural blueprints being layered on a drafting table.

**Visual structure:**
- **Central element:** A drafting table in isometric view, with three blueprint sheets stacked:
  - Bottom sheet: "BASE BUNDLE" — lists standard tools and safety hooks. Drawn in light ink.
  - Middle sheet: "TEAM BUNDLE" — includes the base, adds team-specific tools. Adds new elements in azure.
  - Top sheet: "PROJECT BUNDLE" — includes the team bundle, overrides the model. Override text in emphasized ink.
  - Caption: "EACH LAYER SPECIFIES ONLY WHAT IT CHANGES. LAST WINS."
- **Exploded components floating above the table:**
  - YAML frontmatter (configuration rectangle, white fill)
  - Markdown body (instruction text, blueprint wash fill — this becomes what the AI reads)
  - @mention references (small address cards with "@PROJECT:STANDARDS.MD" text, connected by leader lines to external files)
- **Live re-reading annotation:** A small clock icon next to the @mention cards: "RE-READ ON EVERY TURN. NOT CACHED."
- **Two format examples** at the side: a small Markdown-with-frontmatter card and a pure YAML card. Both minimal.

### What It Teaches
1. Bundles are text files — no code required (the drafting table makes this tactile)
2. Composition through layering — base → team → project, each overriding
3. The two-part structure: YAML (config) + Markdown (instructions for the AI)
4. @mentions as live-resolved references — they're addresses, read fresh every time
5. "Most users will never write a module" — bundles are the primary user interface to the architecture

### Palette Notes
- 30° isometric projection for the drafting table
- Blueprint sheets: increasingly saturated azure wash from base (lightest) to project (most saturated)
- Exploded components float above with dashed leader lines
- @mention address cards: small, monospaced text

---

## Brief 9 — §10 The Foundation Bridge: "Roads and Utilities"

### Text Metaphor (extracted)
> "Foundation turns text bundle files into running sessions."
> "Think of Foundation as a convenience layer."
> "The kernel doesn't need Foundation."
> "Foundation doesn't just set up a session. It sustains it."
> "Connected at runtime through callbacks. Independent at compile time through interfaces."

### Concept: The Underground Infrastructure Cross-Section
A cross-section view (per aesthetic guide §2.6) of a city street, cut to reveal the underground infrastructure. Above ground: the city functions normally — buildings, visitors, activity. Below ground: roads, utility lines, plumbing — all installed by the city planning authority (Foundation). The crucial detail: two utility lines are visibly *active* (glowing azure) even during normal city operation, not just during construction.

**Visual structure:**
- **Above ground (the "session"):** A slice of the city in operation. Orchestrator tower, a few module buildings, a visitor walking.
- **Cut line:** A dashed section line across the middle (standard engineering section notation per aesthetic guide §2.6).
- **Below ground (Foundation):** Eight-step pipeline shown as sequential utility conduits:
  ① Compile mount plan → ② Set up environment → ③ Install packages → ④ Collect module specs → ⑤ Download modules → ⑥ Persist state → ⑦ Create resolver → ⑧ Package PreparedBundle
- **Two live channels:** Two utility lines colored in bright azure that run from below ground back UP through the cut line into the active city:
  - "SYSTEM PROMPT FACTORY — called every turn" (a pipeline running to the PA system)
  - "BUNDLE MODULE RESOLVER — called during loading" (a pipeline running to the module loader)
- **Caption:** "CONNECTED AT RUNTIME. INDEPENDENT AT COMPILE TIME."
- **The "optional" note:** A small sign at the edge of the underground section: "THE CITY WORKS WITHOUT THIS. BRING YOUR OWN INFRASTRUCTURE."

### What It Teaches
1. Foundation is infrastructure — invisible but essential for convenience
2. The 8-step preparation pipeline that turns text into running sessions
3. The two live callbacks — Foundation stays active at runtime, not just at setup
4. The kernel doesn't depend on Foundation — the city works without city-provided utilities
5. The relationship: "connected at runtime through callbacks, independent at compile time"

### Palette Notes
- Cross-section cut: 2px ink, dashed section-line notation
- Underground: structure wash (#F7F5F0) fill
- Active utility lines: blueprint azure at 80% opacity (these are the visual star)
- Above-ground: normal city rendering from previous briefs
- Pipeline step numbers: circled, Space Grotesk

---

## Brief 10 — §11 Agents, Skills, and Recipes: "Roles in the City"

### Text Metaphor (extracted)
> "Agents are bundles. Same file format."
> Skills: "Sometimes what [an agent] needs is knowledge." Progressive disclosure (3 levels).
> Recipes: "Sometimes a task is too complex for a single agent conversation." Sequential steps with checkpoints.
> "Every feature in this section uses sessions, bundles, and modules. No new kernel support was added."

### Concept: Three City Functions
A triptych showing three ways the city's existing infrastructure gets used — no new buildings required, just different patterns of using what's already there.

**Visual structure:**
- **Panel 1 — AGENTS:** A building with two nameplates on the door: "BUNDLE" (old plate, slightly worn) and "AGENT" (new plate, placed over it). Same building inside. Caption: "SAME FORMAT. DIFFERENT NAMEPLATE. THE KERNEL HAS NO CONCEPT OF 'AGENTS.'" The interior is identical to a bundle from Brief 8 but the door now says "meta:" instead of "bundle:".

- **Panel 2 — SKILLS:** A city library with three floors, each progressively more detailed:
  - Floor 1 (lobby): A directory board listing skill names + one-line descriptions. Label: "~100 TOKENS. ALWAYS VISIBLE."
  - Floor 2 (reading room): Full documents. Label: "~1-5K TOKENS. ON DEMAND."
  - Floor 3 (archives): Code examples, templates, reference materials. Label: "0 TOKENS UNTIL ACCESSED."
  - Caption: "PROGRESSIVE DISCLOSURE. PAY ONLY FOR WHAT YOU READ."

- **Panel 3 — RECIPES:** A city tour route marked on a small map. The route passes through multiple buildings (sessions) in sequence, with outputs carried from one to the next. Approval gates appear as manned checkpoints where a person reviews before the tour continues. Checkpoint flags mark resumption points. Caption: "STEP N OUTPUT → STEP N+1 INPUT. CHECKPOINTS FOR RESUMABILITY."

### What It Teaches
1. Agents are literally bundles with a different YAML key — no new primitive
2. Skills use progressive disclosure to manage token cost — three levels of detail
3. Recipes chain multiple sessions with human approval gates and checkpoints
4. None of this required new kernel support — it's all built from existing primitives

### Palette Notes
- Three equal-width panels (concept diagram type per aesthetic guide §2.4)
- No semantic color needed — stick to three-color rule
- Blueprint wash for active/functional elements in each panel
- Each panel internally uses leader-line annotations

---

## Brief 11 — §12 The Complete Picture: "The City Charter"

### Text Metaphor (extracted)
> "Each layer depends only on the one below it. Replace anything at one layer without affecting the others."
> "The most interesting parts of this system are the ones that haven't been built yet."

### Concept: The Full City, Revealed
A return to the bird's-eye city map from Brief 1, but now fully populated. Every building the reader has visited is present and labeled. The illustration rewards the reader's journey — they recognize every neighborhood from the sections they've read.

**Visual structure:**
- The same cartographic layout as Brief 1, but now dense with detail:
  - Every building from Briefs 3-10 appears at its location
  - The underground infrastructure from Brief 9 is shown in a small inset cross-section
  - The planning office from Brief 8 is visible in its district
  - The mayor's tower from Brief 5 stands tallest
  - The storefronts from Brief 6 line the Tool Quarter
- **New element: the "WHERE NEW THINGS GO" legend.** A callout table at the bottom:
  - "NEW AI MODEL → LAYER 2, PROVIDER MODULE" (arrow pointing to Provider District)
  - "NEW SAFETY RULE → LAYER 2, HOOK HANDLER" (arrow pointing to Hook Ward)
  - "NEW CONFIGURATION → LAYER 3, BUNDLE" (arrow pointing to Planning Office)
  - "NEW INTERFACE → LAYER 5, APPLICATION" (arrow pointing to App buildings)
- **Open land:** The Community zone at the edges is clearly marked as available. Dotted boundaries. "THE MOST INTERESTING PARTS HAVEN'T BEEN BUILT YET."

### What It Teaches
1. The complete architecture as a coherent, navigable system — not an abstract stack
2. Where new things go — the decision matrix becomes geographic intuition
3. The open ecosystem — community land is genuinely open at every level
4. The payoff of the journey — every section the reader has walked through is now a recognizable landmark

### Palette Notes
- Same palette as Brief 1 but richer density
- Community zone: dashed boundaries, lighter wash
- "Where new things go" arrows: blueprint azure
- This is the widest diagram — may use full-width treatment per aesthetic guide §5.3

---

## Brief 12 — §12.1 Six Layers: "The City Elevation"

### Text Metaphor (extracted)
> Layer 1 — Kernel: "The unchanging center. Everything above depends on it. Nothing here depends on anything above."
> Layer 2 — Modules: "The actual capabilities. Depend on kernel contracts."
> Layer 3 — Bundles: "Text files. No code required."
> Layer 4 — Foundation: "Turns bundles into running sessions."
> Layer 5 — Applications: "The things people use."
> Layer 6 — Community: "Open at every level. Anyone can build here."

### Concept: City Elevation / Cross-Section Stack
A side-elevation view of the city showing its six layers as literal strata — from bedrock (kernel) to skyline (community). This is the one illustration where the vertical stack metaphor works perfectly because the text explicitly describes layers.

**Visual structure:**
- **Layer 1 (bedrock/foundation stone):** Dense, solid. The civic center buildings in profile. Heavily outlined. Label: "KERNEL · AMPLIFIER-CORE". Five components visible.
- **Layer 2 (ground floor):** The neighborhoods in profile — varied building shapes representing the six module types. Label: "MODULES · PROVIDERS · TOOLS · HOOKS · ORCHESTRATOR · CONTEXT · RESOLVERS"
- **Layer 3 (mezzanine):** The planning office. Blueprint scrolls visible. No physical buildings — just paper. Label: "BUNDLES · TEXT FILES · NO CODE"
- **Layer 4 (infrastructure level):** Visible utility conduits connecting layer 3 to layer 2. The two active lines glow. Label: "FOUNDATION · TURNS BUNDLES INTO SESSIONS"
- **Layer 5 (upper floors):** Distinct building facades — terminal, browser, IDE workshop. Label: "APPLICATIONS · CLI · WEB · IDE"
- **Layer 6 (skyline/open air):** Open sky with cranes and construction scaffolding. Dotted building outlines (future/possible). Label: "COMMUNITY · OPEN AT EVERY LEVEL"
- **Dependency arrows:** Each layer has a single downward arrow to the layer below. Caption: "EACH LAYER DEPENDS ONLY ON THE ONE BELOW IT."

### What It Teaches
1. The six-layer hierarchy as a physical, memorable structure
2. Dependency direction — always downward, never upward
3. The character of each layer — bedrock (stable), ground (capable), paper (configurable), infrastructure (connecting), facades (usable), skyline (open)
4. Replace any layer without affecting others — each stratum is independently removable

### Palette Notes
- Layer 1: 2px emphasis stroke, blueprint wash fill
- Layers 2-5: 1px ink stroke, white fill, with blueprint wash on active elements
- Layer 6: dashed outlines, lightest treatment
- Dependency arrows: blueprint azure, 1.5px, filled arrowheads pointing down
- Azure tints at three opacity levels permitted for concentric ring differentiation (per aesthetic guide §1)

---

## Execution Notes for All Briefs

### Consistency Thread
Every illustration should feel like a different view of the *same city*. The civic center from Brief 3 should be recognizable when it appears small in Brief 4, in cross-section in Brief 5, and as part of the full map in Brief 11. Building footprints, relative positions, and label styles should remain consistent.

### What to Generate First
1. **Brief 1 (§2.1)** and **Brief 12 (§12.1)** — establish the city at its most zoomed-out. These anchor the visual language.
2. **Brief 3 (§4)** — establish the civic center detail. Everything references this.
3. **Brief 6 (§7)** — the storefront/inspector split is the most visually distinctive. Good test of whether the metaphor carries conceptual weight.
4. Remaining briefs in reading order.

### Generation Strategy
For nano-banana prompts: describe the scene in architectural/cartographic terms. Reference the warm cream + ink + azure palette explicitly. Specify "technical illustration style, like an engineering textbook diagram" and "monospaced ALL CAPS labels." Avoid any mention of photorealistic rendering, 3D perspective (except isometric where noted), gradients, or decorative elements.

### Where the Metaphor Steps Aside
- §7 Priority Cascade: Keep the existing waterfall bar format from the aesthetic guide. The inspector's clipboard can reference it but the cascade itself should stay abstract.
- §8 Cancellation: A small technical inset (flag with three states) rather than forcing a city analogy.
- §11 Modes and Model Routing: Simple labeled diagrams. The city metaphor doesn't add clarity here.
- Structural subtyping (§5.2): Better explained with the contract frames (identical frames on the wall) than with a building metaphor.
