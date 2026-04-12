# Architecture: Amplifier Education Pipeline

**Created:** 2026-04-12
**Status:** Design — ready for implementation
**Consulted:** amplifier:amplifier-expert

---

## Vision

A reusable Amplifier system where someone can point it at a repo or document and the system produces a complete multi-modal education product: informational site, presentation deck, voiceover narration, and visual assets — all from a single source of truth. Editions are updateable with one command.

---

## Architecture Decision: Bundle + Recipes

**This is a Bundle + Recipes system — not a module.** Specifically:

- **A bundle** (`amplifier-bundle-education`) — provides agents, context, and design artifacts that define the education pipeline's capabilities
- **A set of recipes** — orchestrate the multi-step workflows (discovery → content shaping → asset generation → deliverable production)
- **The section markdown files** — are the content model, living in the workspace, not inside the bundle

This aligns with Amplifier's mechanism/policy principle: the bundle provides capabilities (specialized agents), the recipes provide orchestration (what order), the workspace provides policy (what subject, what design direction).

---

## Bundle Structure

```
amplifier-bundle-education/
├── bundle.md                          ← thin, includes foundation + behavior
│
├── behaviors/
│   education.yaml                     ← agents + context + tools
│
├── agents/
│   content-strategist.md              ← voice, tone, section planning
│   section-author.md                  ← writes section markdown
│   visual-director.md                 ← art direction, diagram specs
│   asset-builder.md                   ← SVG/code-drawn diagram production
│   deck-composer.md                   ← presentation condensation
│   narration-adapter.md               ← prose → listening adaptation
│   edition-manager.md                 ← change detection + update planning
│
├── context/
│   education-instructions.md          ← consolidated instructions
│   content-model.md                   ← block types, frontmatter schema
│   deliverable-specs.md               ← HTML site / deck / audio specs
│
├── recipes/
│   full-edition.yaml                  ← the "one command" orchestrator
│   discover.yaml                      ← Phase 1: Parallax → reconciliation
│   shape-content.yaml                 ← Phase 2: strategy → sections
│   generate-assets.yaml               ← Phase 3: visual pipeline (staged)
│   produce-deliverables.yaml          ← Phase 4: site + deck + audio
│   update-edition.yaml                ← incremental update workflow
│
├── templates/
│   content-strategy.md                ← starter content strategy
│   design-system.md                   ← starter design system
│   section-template.md                ← section markdown template
│
└── docs/
    GUIDE.md                           ← how to use this bundle
```

---

## The Pipeline (Source → Finished Product)

### Phase 1: Content Discovery
- Input: repo path or document
- Tool: Parallax Discovery recipe
- Output: reconciliation document with verified claims
- Agent: leverages existing discovery-orchestrator

### Phase 2: Content Shaping
- Input: reconciliation document
- Agents: content-strategist → section-author
- Output: content strategy doc + 13 section markdown files with YAML frontmatter
- Human override: edit any section markdown, content strategy, or block composition

### Phase 3: Visual Asset Generation (Staged — has approval gate)
- Input: section markdown with block composition
- Agents: visual-director → asset-builder
- Workflow: read aesthetic guide → generate concept images → approval gate → build production SVGs
- Output: SVG diagrams, styled assets in public/diagrams/
- Human override: edit aesthetic guide, replace concept images, hand-edit SVGs

### Phase 4: Deliverable Production
- Input: section markdown + visual assets
- Agents: section-author (HTML), deck-composer (slides), narration-adapter (audio scripts)
- Output: HTML site, presentation deck, voiceover scripts + MP3s
- Human override: edit any deliverable directly

---

## Content Model

### Section Frontmatter Schema

```yaml
---
title: string              # Section display title
chapter: integer           # Chapter number
blocks:                    # Ordered list of content blocks
  - type: prose | diagram | table | code | comparison | callout | audio | chat | vignette
    status: draft | ready | stub
    variant: null | annotated | wide | interactive
    asset_ref: null | string        # Reference to generated asset (e.g., "FIG-02a")
source_claims: [string]    # VC-XX references to verified claims
depends_on: [integer]      # Chapter numbers this section builds on
---
```

### Workspace Layout

```
project/
├── .design/
│   ├── CONTENT-STRATEGY.md        ← generated, human-reviewable
│   ├── DESIGN-SYSTEM.md           ← generated or hand-authored
│   ├── AESTHETIC-GUIDE.md          ← art direction (human override point)
│   ├── VISUAL-STRATEGY.md         ← asset manifest
│   ├── reconciliation.md          ← Parallax Discovery output
│   └── sections/
│       ├── 01-introduction.md     ← generated section content
│       ├── 02-architecture.md
│       └── ...
├── .edition/
│   ├── manifest.json              ← edition metadata, hashes, timestamps
│   ├── source-hashes.json         ← for change detection
│   ├── section-hashes.json
│   ├── asset-hashes.json
│   └── reconciliation.md          ← frozen copy of last reconciliation
├── public/
│   └── diagrams/                  ← generated SVG assets
├── audio/
│   ├── ch01-introduction.mp3
│   └── ch01-introduction.txt      ← voiceover script
├── site.html                      ← deliverable: full site
└── deck.html                      ← deliverable: presentation
```

---

## Visual Asset Pipeline (Staged Recipe)

### Automation vs Human Override

| Step | Automated | Human Override Point |
|------|-----------|---------------------|
| Identify sections needing diagrams | Yes — from block frontmatter | Edit section frontmatter |
| Generate concept images | Yes — nano-banana + aesthetic guide | Replace concept image |
| Extract style from concept | Yes — agent analysis | Edit aesthetic guide |
| Build production SVG | Yes — code-drawn from spec | Hand-edit SVG |
| Insert into HTML | Yes — template + asset ref | Edit HTML template |

**Key pattern:** Every automated step writes to a file that a human can edit before the next step reads it. All intermediate artifacts are human-readable, human-editable files.

---

## Edition Management

### Hash-Based Change Detection

```
.edition/
├── manifest.json              ← current edition metadata
├── source-hashes.json         ← SHA256 of each source file at last build
├── section-hashes.json        ← SHA256 of each section markdown
├── asset-hashes.json          ← SHA256 of each visual asset
└── reconciliation.md          ← frozen copy of last reconciliation
```

### Update Flow

1. Hash current source files, compare against source-hashes.json
2. For changed files, determine which verified claims are affected
3. Map affected claims → affected sections (via source_claims in frontmatter)
4. Map affected sections → affected assets (via asset_ref in frontmatter)
5. Build update plan as structured JSON
6. **Approval gate** — human reviews the plan
7. Update each affected section (foreach)
8. Regenerate each affected asset (foreach)
9. Rebuild affected deliverables
10. Update all hash files for next run

**One command:** `amplifier recipe execute education:recipes/update-edition.yaml with source_repo=/path/to/repo`

---

## Recipe Structure

### Master Recipe: full-edition.yaml

```yaml
name: "full-edition"
description: "Produce a complete education edition from source content"

context:
  source_repo: ""           # Required: path or URL
  subject_name: ""          # Required: e.g., "Amplifier Framework"
  edition: "1"

steps:
  - id: "discover"
    type: "recipe"
    recipe: "discover.yaml"

  - id: "shape-content"
    type: "recipe"
    recipe: "shape-content.yaml"

  - id: "generate-assets"
    type: "recipe"
    recipe: "generate-assets.yaml"      # staged, has approval gate

  - id: "produce-deliverables"
    type: "recipe"
    recipe: "produce-deliverables.yaml"

  - id: "record-edition"
    type: "bash"
    command: "# Write edition manifest"
```

### Update Recipe: update-edition.yaml (Staged)

```yaml
name: "update-edition"
description: "Detect changes and update affected sections/assets/deliverables"

stages:
  - name: "detect-changes"
    steps:
      - id: "diff-source"
        agent: "education:edition-manager"
      - id: "plan-updates"
        agent: "education:edition-manager"
    approval:
      required: true
      prompt: "Review the update plan before proceeding."

  - name: "execute-updates"
    steps:
      - id: "update-sections"
        foreach: "{{update_plan.affected_sections}}"
        agent: "education:section-author"
      - id: "regenerate-assets"
        foreach: "{{update_plan.affected_assets}}"
        agent: "education:asset-builder"
      - id: "rebuild-deliverables"
        agent: "education:edition-manager"
      - id: "bump-edition"
        type: "bash"
```

---

## Seven Agents

| Agent | Role | Inputs | Outputs |
|-------|------|--------|---------|
| **content-strategist** | Voice, tone, depth calibration, section planning | Reconciliation doc | CONTENT-STRATEGY.md, section outline |
| **section-author** | Writes section markdown from outline + claims | Strategy + claims | .design/sections/*.md |
| **visual-director** | Art direction, diagram specifications | Section content + aesthetic guide | Concept images, asset specs |
| **asset-builder** | Produces code-drawn SVGs from specs | Asset specs + design tokens | public/diagrams/*.svg |
| **deck-composer** | Condenses sections into presentation slides | Section markdown | deck.html |
| **narration-adapter** | Adapts prose for listening format | Section markdown | audio/*.txt voiceover scripts |
| **edition-manager** | Change detection, update planning, edition bookkeeping | Source repo + previous hashes | Update plan, rebuilt deliverables |

---

## Existing Patterns to Reuse

| Pattern | Source | How We Use It |
|---------|--------|---------------|
| Thin Bundle + Behavior | amplifier-bundle-recipes | Bundle stays minimal, behavior has the value |
| Staged Recipes | Recipe schema | Visual pipeline and update workflow |
| Sub-Recipe Composition | Recipe best practices | full-edition calls discover, shape, generate, produce |
| Foreach + Collect | Recipe schema | Process each section, asset, chapter |
| Parallax Discovery | parallax-investigation skill | Phase 1 content discovery |
| nano-banana | Foundation tool | Concept generation and style extraction |
| dot_graph | Foundation tool | Architecture diagrams |

---

## Anti-Patterns to Avoid

1. **Fat Bundle** — Don't put content in the bundle. Bundle = capability, workspace = content.
2. **Inline Instructions** — Don't put content strategy rules inline in agents. Use context/ files with @mentions.
3. **Monolithic Recipe** — Compose 4-5 focused sub-recipes, not one 40-step recipe.
4. **Over-Automating Art Direction** — Approval gates exist for human judgment. Don't fully automate aesthetics.
5. **Context Poisoning** — Write content rules once in context/, reference everywhere.
6. **Hardcoded Chapter Count** — Make chapter count emergent from content strategy step.

---

## Implementation Roadmap

| Phase | What | Depends On |
|-------|------|-----------|
| 1 | Bundle skeleton: thin bundle.md, behavior YAML, agent stubs | Nothing |
| 2 | Discovery recipe: package Parallax Discovery as discover.yaml | Phase 1 |
| 3 | Content shaping: content-strategist + section-author agents | Phase 2 |
| 4 | Asset generation: visual-director + asset-builder, staged recipe | Phase 3 |
| 5 | Deliverable production: HTML site, deck, audio | Phase 3 |
| 6 | Edition management: hash-based change detection | Phase 5 |
| 7 | Master recipe: wire full-edition.yaml | All phases |

---

## What Was Already Built (Masterclass Project)

The amplifier-masterclass project serves as the **reference implementation** for this bundle. Everything produced there informs the agents and recipes:

### Deliverables produced:
- Standalone HTML site (5,400 lines, 13 chapters, interactive diagrams)
- Presentation deck (16 slides with speaker notes)
- 13 chapter voiceover narrations (MP3 + scripts)
- Componentized Astro site (11 reusable block components)

### Design artifacts that become bundle templates:
- CONTENT-STRATEGY.md → template for content-strategist agent
- DESIGN-SYSTEM.md → template for visual-director agent
- AESTHETIC-GUIDE-DIAGRAMS.md → context for asset-builder agent
- VISUAL-STRATEGY.md → pattern for visual-director's asset manifest
- Section markdown with YAML frontmatter → content-model.md schema

### Workflow that becomes recipes:
- Parallax Discovery → discover.yaml
- Content shaping from reconciliation → shape-content.yaml
- Concept generation → style extraction → code-drawn SVGs → generate-assets.yaml
- HTML/deck/audio production → produce-deliverables.yaml

### Process insights that become agent instructions:
- Concept-first visual workflow (generate target image, then build production toward it)
- The "makingsoftware.com meets our palette" style convergence process
- The "3 connection types" architectural accuracy approach
- Edition-aware content (source_claims traceability to verified facts)

---

*This architecture was designed in consultation with amplifier:amplifier-expert based on the complete amplifier-masterclass reference implementation.*