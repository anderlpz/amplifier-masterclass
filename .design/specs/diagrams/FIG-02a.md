# FIG.02a — Six-Layer Architecture

## Proof Statement
Amplifier's architecture is six concentric layers where each layer depends only on the one below it,
and the kernel at center depends on nothing.

## What the Reader Loses Without It
The entire masterclass is structured as an outside-in walk through these layers. Without this map,
the reader has no spatial model to anchor each chapter's content. This is the "city map before you
walk the streets."

## Diagram Type
Architecture (AESTHETIC-GUIDE-DIAGRAMS.md §2.2)

## Width
Wide (`--measure-wide: 1100px`)

## Semantic Color
Azure tints only — three opacity levels to differentiate ring depth.
No green/red semantic color (this is not a tools-vs-hooks diagram).

## Grid Background
Yes — fine dot grid. This is the signature architecture diagram.

## Figure Number
FIG. 02

## Caption
FIG. 02 — The architecture as concentric layers. Each layer depends only on the one below it.
The kernel at center depends on nothing.

## Nodes

### Layer 1 — Kernel (innermost ring)
- Ring label: KERNEL
- Inner components (5 nodes):
  - SESSION LIFECYCLE
  - CONTRACTS
  - MODULE LOADER
  - COORDINATOR
  - HOOKS
- Boundary: 2px emphasis stroke (this is THE most important boundary)
- Fill: blueprint wash (rgba(0,130,235,0.08))

### Layer 2 — Modules (middle ring)
- Ring label: MODULES
- Inner components (5 nodes):
  - ORCHESTRATOR
  - PROVIDERS
  - TOOLS
  - CONTEXT MANAGERS
  - HOOK HANDLERS
- Boundary: 1px ink
- Fill: white

### Layer 3 — Bundles
- Ring label: BUNDLES
- Description annotation: "Text files. No code required."
- Boundary: 1px ink
- Fill: structure wash (#F7F5F0)

### Layer 4 — Foundation
- Ring label: FOUNDATION
- Description annotation: "Turns bundles into running sessions"
- Boundary: 1px ink
- Fill: structure wash (#F7F5F0)

### Layer 5 — Applications
- Ring label: APPLICATIONS
- Description annotation: "CLI, web, IDE, voice"
- Boundary: 1px ink
- Fill: structure wash (#F7F5F0)

### Layer 6 — Community & Ecosystem (outermost ring)
- Ring label: COMMUNITY
- Description annotation: "Third-party modules, bundles, recipes"
- Boundary: 1px ink
- Fill: structure wash (#F7F5F0)

## Edges

- Dependency arrows (blueprint line, 1.5px) pointing INWARD:
  - Modules → Kernel
  - Bundles → Modules (reference by name)
  - Foundation → Kernel (code dependency) + Foundation → Bundles (reads them)
  - Applications → Foundation
  - Community → all inner layers (open at every level)

## Layout Notes

- Nested rectangles, NOT literal circles. Rectangles are cleaner in the flat blueprint style.
- Kernel at center, largest breathing room.
- Layers 3-6 can be narrower vertical bands since they have fewer internal components.
- The visual should emphasize the ASYMMETRY described in the text:
  "Everything depends on the kernel. The kernel depends on nothing."
- Consider a slight left-heavy layout where the kernel and modules occupy ~60% of the diagram
  and the outer layers stack on the right or wrap around.

## Design Notes

- This diagram appears in Chapter 2 and is echoed (with full detail) in Chapter 12 as FIG.12a.
- FIG.02a should be the SIMPLER version — neighborhood-level, not building-level.
- FIG.12a will add more internal detail to each layer after the reader has seen all 12 chapters.
- Keep node count under 15 in FIG.02a. The 5 kernel components + 5 module types + 4 outer ring
  labels = 14 nodes. That's right at the limit.