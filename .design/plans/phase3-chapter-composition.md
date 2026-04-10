# Phase 3: Chapter Composition — Wiring Up All 13 Chapters

> **Execution:** Use the subagent-driven-development workflow to implement this plan.
> **Provider constraint:** Use only Anthropic Claude Opus and Sonnet models for all agent delegations during execution.

**Goal:** Wire up all 13 chapters with their unique block compositions using the content from `.design/sections/*.md`. After this phase, the complete masterclass is readable end-to-end with proper typography, diagrams, tables, code blocks, callouts, stubs, and chapter navigation.

**Architecture:** Each chapter gets its own composition in the dynamic route `src/pages/chapters/[chapter].astro`. The route imports all block components and selects which ones to render based on the chapter number. The prose content comes from the `.design/sections/*.md` files and is transcribed directly into the Astro components as HTML. The block components built in Phase 2 handle all visual styling. This phase is pure composition work: no new components, no new CSS, just assembling existing blocks with real content.

**Tech Stack:** Astro 6 components, the Phase 2 block components, content from `.design/sections/*.md`.

**Prerequisites:** Phase 1 and Phase 2 must be complete. The project should have:
- Paper frame layout with chapter routing (Phase 1)
- All block components in `src/components/blocks/` (Phase 2)
- 5 SVG diagrams in `public/diagrams/` (kept from v2)

**Content Source:** The authoritative content is in `.design/sections/*.md`. Each file has YAML frontmatter declaring which blocks it uses, followed by the chapter prose. The prose is written in markdown. For the Astro pages, transcribe the markdown into HTML within the block components.

**Important pattern:** Each chapter is composed as a unique sequence of block components inside the `[chapter].astro` dynamic route. The approach is: the `[chapter].astro` page imports all block components, then uses a switch/conditional on `chapter.number` to render the unique composition for that chapter. Alternatively, each chapter can be a separate Astro component imported by the route.

**Recommended approach:** Create individual chapter composition files at `src/chapters/Chapter01.astro` through `src/chapters/Chapter13.astro`, then dynamically import the correct one in `[chapter].astro`. This keeps each chapter's composition readable and independently editable.

---

### Task 1: Set up the chapter composition system

**Files:**
- Create: `src/chapters/` directory
- Modify: `src/pages/chapters/[chapter].astro`

**Step 1: Create the chapters composition directory**
```bash
mkdir -p ~/projects/amplifier-masterclass/src/chapters
```

**Step 2: Update the dynamic route to load chapter compositions**

Rewrite `src/pages/chapters/[chapter].astro` to import individual chapter composition components. Each chapter file will be an Astro component that uses the block components to compose its unique content.

Replace the entire content of `src/pages/chapters/[chapter].astro` with:

```astro
---
/**
 * [chapter].astro — Dynamic route for individual chapters
 *
 * getStaticPaths returns 13 paths (one per chapter).
 * Each path renders through ChapterLayout with the chapter's
 * unique composition component (src/chapters/ChapterNN.astro).
 */

import ChapterLayout from '../../layouts/ChapterLayout.astro';
import { chapters } from '../../data/chapters';
import type { Chapter } from '../../data/chapters';

/* Import all chapter compositions */
import Chapter01 from '../../chapters/Chapter01.astro';
import Chapter02 from '../../chapters/Chapter02.astro';
import Chapter03 from '../../chapters/Chapter03.astro';
import Chapter04 from '../../chapters/Chapter04.astro';
import Chapter05 from '../../chapters/Chapter05.astro';
import Chapter06 from '../../chapters/Chapter06.astro';
import Chapter07 from '../../chapters/Chapter07.astro';
import Chapter08 from '../../chapters/Chapter08.astro';
import Chapter09 from '../../chapters/Chapter09.astro';
import Chapter10 from '../../chapters/Chapter10.astro';
import Chapter11 from '../../chapters/Chapter11.astro';
import Chapter12 from '../../chapters/Chapter12.astro';
import Chapter13 from '../../chapters/Chapter13.astro';

const chapterComponents: Record<number, any> = {
  1: Chapter01, 2: Chapter02, 3: Chapter03, 4: Chapter04,
  5: Chapter05, 6: Chapter06, 7: Chapter07, 8: Chapter08,
  9: Chapter09, 10: Chapter10, 11: Chapter11, 12: Chapter12,
  13: Chapter13,
};

export function getStaticPaths() {
  return chapters.map((ch) => ({
    params: { chapter: ch.slug },
    props: { chapter: ch },
  }));
}

interface Props {
  chapter: Chapter;
}

const { chapter } = Astro.props;
const ChapterContent = chapterComponents[chapter.number];

/* Previous/next for bottom navigation */
const currentIndex = chapters.findIndex((c) => c.number === chapter.number);
const prevChapter = currentIndex > 0 ? chapters[currentIndex - 1] : null;
const nextChapter = currentIndex < chapters.length - 1 ? chapters[currentIndex + 1] : null;
const base = import.meta.env.BASE_URL;
---

<ChapterLayout
  title="Amplifier Masterclass"
  chapterNumber={chapter.number}
  chapterTitle={chapter.title}
>
  <ChapterContent />

  <!-- Chapter Navigation (prev/next) -->
  <footer class="chapter-nav width-reading">
    {prevChapter && (
      <a href={`${base}chapters/${prevChapter.slug}/`} class="chapter-nav__link chapter-nav__link--prev">
        <span class="chapter-nav__direction">&larr; Previous</span>
        <span class="chapter-nav__label">{prevChapter.number} &middot; {prevChapter.title}</span>
      </a>
    )}
    {nextChapter && (
      <a href={`${base}chapters/${nextChapter.slug}/`} class="chapter-nav__link chapter-nav__link--next">
        <span class="chapter-nav__direction">Next &rarr;</span>
        <span class="chapter-nav__label">{nextChapter.number} &middot; {nextChapter.title}</span>
      </a>
    )}
  </footer>
</ChapterLayout>

<style>
  .chapter-nav {
    display: flex;
    justify-content: space-between;
    gap: var(--space-8);
    padding-top: var(--space-16);
    border-top: 1px solid var(--border-default);
    margin-top: var(--space-24);
  }

  .chapter-nav__link {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
    text-decoration: none;
    padding: var(--space-3);
    margin: calc(-1 * var(--space-3));
    border-radius: var(--radius-sm);
    transition: background var(--duration-fast) var(--ease-default);
  }

  .chapter-nav__link:hover {
    background: var(--bg-muted);
  }

  .chapter-nav__link--next {
    margin-left: auto;
    text-align: right;
  }

  .chapter-nav__direction {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
  }

  .chapter-nav__label {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--accent);
  }

  @media (max-width: 480px) {
    .chapter-nav {
      flex-direction: column;
    }
    .chapter-nav__link--next {
      text-align: left;
    }
  }
</style>
```

**Step 3: Create a minimal stub for all 13 chapters so the build works**

We need all 13 files to exist before the build will succeed. Create minimal stubs that we'll fill in one by one:

```bash
cd ~/projects/amplifier-masterclass/src/chapters
for i in $(seq -w 1 13); do
  num=$(echo $i | sed 's/^0//')
  cat > "Chapter${i}.astro" << 'STUB'
---
import ChapterEntry from '../components/blocks/ChapterEntry.astro';
import Prose from '../components/blocks/Prose.astro';
import { chapters } from '../data/chapters';
const chapter = chapters[CHAPTER_INDEX];
---
<ChapterEntry chapterNumber={chapter.number} title={chapter.title} lead={chapter.lead} />
<Prose><p>Content coming soon.</p></Prose>
STUB
  # Replace CHAPTER_INDEX with the actual index (0-based)
  sed -i '' "s/CHAPTER_INDEX/$((num - 1))/" "Chapter${i}.astro"
done
```

**Step 4: Build to verify the routing works**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -10
```
Expected: clean build with 14 pages.

**Step 5: Verify a chapter loads correctly**
```bash
grep "Chapter 7" ~/projects/amplifier-masterclass/dist/chapters/7/index.html | head -2
```
Expected: "Chapter 7" appears in the output.

---

### Task 2: Compose Chapter 1 — Introduction

**Files:**
- Rewrite: `src/chapters/Chapter01.astro`

**Content source:** `.design/sections/01-introduction.md`
**Blocks used:** ChapterEntry, Prose (prose-heavy chapter, minimal blocks)

**Step 1: Write the chapter composition**

Read `.design/sections/01-introduction.md` for the full content. Transcribe the markdown into HTML within the block components. Stop at the `## Presentation Slides` section (presentation content is not rendered).

Replace the entire content of `src/chapters/Chapter01.astro` with the chapter entry, followed by the chapter's prose content wrapped in `<Prose>` blocks. The content should include:

1. **ChapterEntry** with: number=1, title="Introduction", lead="Amplifier is a framework for building your AI harness."
2. **Prose** block containing the introduction prose: the harness metaphor, the OS analogy, the "what this document covers" list
3. All headings from the markdown rendered as `<h2>` or `<h3>` elements
4. All paragraphs as `<p>` elements
5. Inline code references (like `amplifier-core`) wrapped in `<code>`
6. The bullet list of topics covered

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```

**Step 3: Verify the content renders**
```bash
grep "AI harness" ~/projects/amplifier-masterclass/dist/chapters/1/index.html | head -1
grep "amplifier-core" ~/projects/amplifier-masterclass/dist/chapters/1/index.html | head -1
```
Expected: both the lead sentence and the inline code reference appear.

---

### Task 3: Compose Chapter 2 — Architecture Map

**Files:**
- Rewrite: `src/chapters/Chapter02.astro`

**Content source:** `.design/sections/02-architecture-map.md`
**Blocks used:** ChapterEntry, Prose, Diagram (architecture-stack.svg, wide breakout)

**Step 1: Write the chapter composition**

Read `.design/sections/02-architecture-map.md`. This chapter uses:
1. **ChapterEntry**: number=2, title="The Architecture Map", lead="A map of the territory before we walk through it."
2. **Prose**: the introductory text about neighborhoods and zones
3. **Diagram**: the architecture-stack.svg at wide breakout width, with caption
4. **Prose**: any remaining explanatory text

The existing SVG is at `public/diagrams/architecture-stack.svg`. Use the Diagram component with `src="/diagrams/architecture-stack.svg"`, `width="wide"`, `alt="Architecture overview showing kernel, modules, and ecosystem layers"`, and an appropriate caption.

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "architecture-stack.svg" ~/projects/amplifier-masterclass/dist/chapters/2/index.html
```
Expected: the SVG image path appears in the built HTML.

---

### Task 4: Compose Chapter 3 — Design Philosophy

**Files:**
- Rewrite: `src/chapters/Chapter03.astro`

**Content source:** `.design/sections/03-design-philosophy.md`
**Blocks used:** ChapterEntry, Prose, Callout

**Step 1: Write the chapter composition**

Read `.design/sections/03-design-philosophy.md`. This chapter covers three principles:
1. Mechanism, not policy
2. The center stays still
3. Ruthless simplicity

Compose as:
1. **ChapterEntry**: number=3, title="Design Philosophy", lead="Three ideas shape how Amplifier is built."
2. **Prose**: opening paragraph about principles emerging from code
3. **Prose** with `<h2>` for "Mechanism, not policy" and its explanation
4. **Prose** with `<h2>` for "The center stays still" and its explanation
5. **Prose** with `<h2>` for "Ruthless simplicity" and its explanation
6. **Callout** with label="Key Fact": "Grep the entire amplifier-core codebase for file writes. Zero matches." (from the content strategy)

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "Mechanism" ~/projects/amplifier-masterclass/dist/chapters/3/index.html | head -1
```

---

### Task 5: Compose Chapter 4 — The Kernel

**Files:**
- Rewrite: `src/chapters/Chapter04.astro`

**Content source:** `.design/sections/04-the-kernel.md`
**Blocks used:** ChapterEntry, Prose, CodeBlock, Callout, VignettePlaceholder

**Step 1: Write the chapter composition**

Read `.design/sections/04-the-kernel.md`. This chapter covers 5 kernel components:
1. Session Lifecycle
2. Contracts (Protocols)
3. Module Loader
4. The Coordinator
5. Hooks/Events

Compose as:
1. **ChapterEntry**: number=4, title="The Kernel", lead="Five things live in the kernel. Nothing else."
2. **Prose**: opening paragraph about amplifier-core being Rust + Python
3. **Prose** blocks for each of the 5 components (as `<h2>` sections)
4. **CodeBlock** for the mount contract signature (if code appears in the content)
5. **VignettePlaceholder** with rationale from frontmatter: "Animating the 5 components appearing one by one with brief descriptions would orient faster than reading a list"
6. **Callout** for the Rust/Python boundary note

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "Session Lifecycle" ~/projects/amplifier-masterclass/dist/chapters/4/index.html | head -1
grep "vignette-placeholder" ~/projects/amplifier-masterclass/dist/chapters/4/index.html | head -1
```
Expected: both the section heading and the vignette stub appear.

---

### Task 6: Compose Chapter 5 — Module System

**Files:**
- Rewrite: `src/chapters/Chapter05.astro`

**Content source:** `.design/sections/05-module-system.md`
**Blocks used:** ChapterEntry, Prose, DataTable, CodeBlock, VignettePlaceholder

**Step 1: Write the chapter composition**

Read `.design/sections/05-module-system.md`. Compose as:
1. **ChapterEntry**: number=5, title="Module System", lead="Everything outside the kernel is a module."
2. **Prose**: introduction to the 6 module types
3. **DataTable** with caption="Module Types": table with columns Type, Role, Required, Cardinality for the 6 types (Orchestrator, Provider, Tool, ContextManager, HookHandler, Resolver)
4. **Prose**: the universal mount contract explanation
5. **CodeBlock** with filename="mount contract": the `async def mount(coordinator, config) -> Optional[cleanup_fn]` signature
6. **Prose**: loading order (fixed sequence)
7. **VignettePlaceholder** with rationale about animating the mount lifecycle

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "data-table" ~/projects/amplifier-masterclass/dist/chapters/5/index.html | head -1
grep "mount" ~/projects/amplifier-masterclass/dist/chapters/5/index.html | head -1
```

---

### Task 7: Compose Chapter 6 — The Orchestrator

**Files:**
- Rewrite: `src/chapters/Chapter06.astro`

**Content source:** `.design/sections/06-orchestrator-and-loop.md`
**Blocks used:** ChapterEntry, Prose, Diagram (reasoning-loop.svg), VignettePlaceholder, ChatPlaceholder

**Step 1: Write the chapter composition**

Read `.design/sections/06-orchestrator-and-loop.md`. Compose as:
1. **ChapterEntry**: number=6, title="The Orchestrator", lead="One module gets live access to the full system at runtime."
2. **Prose**: the orchestrator's uniquely privileged position
3. **Diagram**: reasoning-loop.svg at wide width, with caption about the OODA loop
4. **Prose**: the agent loop description, the `str` return boundary
5. **VignettePlaceholder**: width="wide", rationale from frontmatter
6. **ChatPlaceholder**: prompt="Have a question about how the orchestrator drives the agent loop?"

The existing SVG is at `public/diagrams/reasoning-loop.svg`.

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "reasoning-loop.svg" ~/projects/amplifier-masterclass/dist/chapters/6/index.html | head -1
grep "chat-placeholder" ~/projects/amplifier-masterclass/dist/chapters/6/index.html | head -1
```

---

### Task 8: Compose Chapter 7 — Tools vs Hooks

**Files:**
- Rewrite: `src/chapters/Chapter07.astro`

**Content source:** `.design/sections/07-tools-vs-hooks.md`
**Blocks used:** ChapterEntry, Prose, ComparisonLayout, Diagram (tools-vs-hooks.svg), CascadeVisualization, VignettePlaceholder, ChatPlaceholder

This is the richest chapter in terms of block variety. It uses almost every block type.

**Step 1: Write the chapter composition**

Read `.design/sections/07-tools-vs-hooks.md`. Compose as:
1. **ChapterEntry**: number=7, title="Tools vs Hooks", lead="The critical distinction in the system."
2. **Prose**: opening paragraph about both being modules but in different realms
3. **ComparisonLayout**: Tools (left/green) vs Hooks (right/red). Extract the key comparison points from the content:
   - Tools slot: "AI-decided. The model sees tools in its context. It chooses when to call them. Visible, intentional."
   - Hooks slot: "Code-decided. The AI has no concept that hooks exist. They fire automatically. Invisible to the model."
4. **Prose**: detailed explanation of tools
5. **Prose**: detailed explanation of hooks and the inject_context mechanism
6. **CascadeVisualization**: the 5-level priority cascade (component has the data built in)
7. **VignettePlaceholder**: rationale about animating the cascade
8. **Prose**: the 41 canonical events, error handling, infrastructure stamps
9. **ChatPlaceholder**: prompt="Not sure whether something should be a tool or a hook? Ask here."

The existing SVG is at `public/diagrams/tools-vs-hooks.svg`.

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "comparison" ~/projects/amplifier-masterclass/dist/chapters/7/index.html | head -1
grep "cascade" ~/projects/amplifier-masterclass/dist/chapters/7/index.html | head -1
```

---

### Task 9: Compose Chapter 8 — Sessions

**Files:**
- Rewrite: `src/chapters/Chapter08.astro`

**Content source:** `.design/sections/08-sessions.md`
**Blocks used:** ChapterEntry, Prose, DataTable

**Step 1: Write the chapter composition**

Read `.design/sections/08-sessions.md`. Compose as:
1. **ChapterEntry**: number=8, title="Sessions", lead="A session is a container."
2. **Prose**: what a session is (container for one running instance)
3. **Prose**: the four phases with `<h2>` (Create, Initialize, Execute, Cleanup)
4. **DataTable** with caption="Parent-Child Sessions: Expectations vs Reality": a comparison table showing what you might expect vs what Amplifier actually does for parent-child session behavior
5. **Prose**: cancellation (cooperative, three states), cleanup order

Use the Diagram component if the session-tree.svg is relevant to this chapter:
- `public/diagrams/session-tree.svg` is available for the session lifecycle or parent-child tree

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "session" ~/projects/amplifier-masterclass/dist/chapters/8/index.html | head -3
```

---

### Task 10: Compose Chapter 9 — Bundles and Configuration

**Files:**
- Rewrite: `src/chapters/Chapter09.astro`

**Content source:** `.design/sections/09-bundles-and-configuration.md`
**Blocks used:** ChapterEntry, Prose, CodeBlock

**Step 1: Write the chapter composition**

Read `.design/sections/09-bundles-and-configuration.md`. Compose as:
1. **ChapterEntry**: number=9, title="Bundles and Configuration", lead="Bundles are how you package and distribute capabilities."
2. **Prose**: introduction to bundles as packaging
3. **Prose** with `<h2>`: "Two formats" (Markdown with YAML frontmatter, Pure YAML)
4. **CodeBlock** with filename="agent.md": a minimal bundle example showing YAML frontmatter + markdown instruction
5. **Prose** with `<h2>`: "Composition" (includes, merge order, merge strategies)
6. **Prose** with `<h2>`: "@mentions" (references, resolution, live re-reading)

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "code-block" ~/projects/amplifier-masterclass/dist/chapters/9/index.html | head -1
```

---

### Task 11: Compose Chapter 10 — Foundation Bridge

**Files:**
- Rewrite: `src/chapters/Chapter10.astro`

**Content source:** `.design/sections/10-foundation-bridge.md`
**Blocks used:** ChapterEntry, Prose, Callout

**Step 1: Write the chapter composition**

Read `.design/sections/10-foundation-bridge.md`. Compose as:
1. **ChapterEntry**: number=10, title="The Foundation Bridge", lead="Foundation is how we use the kernel. It is not the only way."
2. **Prose**: Foundation as convenience layer, PreparedBundle
3. **Callout** with label="Key Fact": "Foundation is optional. The kernel works independently with a raw config dict."
4. **Prose** with `<h2>`: "The 8-step preparation pipeline" (listed but not deep-dived)
5. **Prose** with `<h2>`: "Two persistent callback channels" (System Prompt Factory, BundleModuleResolver)

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "Foundation" ~/projects/amplifier-masterclass/dist/chapters/10/index.html | head -2
```

---

### Task 12: Compose Chapter 11 — Agents, Context, Recipes

**Files:**
- Rewrite: `src/chapters/Chapter11.astro`

**Content source:** `.design/sections/11-agents-context-recipes.md`
**Blocks used:** ChapterEntry, Prose, VignettePlaceholder

**Step 1: Write the chapter composition**

Read `.design/sections/11-agents-context-recipes.md`. This chapter covers 4 topics: Agents, Context Files, Recipes, and Skills. Compose as:
1. **ChapterEntry**: number=11, title="Agents, Context Files, Skills, and Recipes", lead="Agents, skills, recipes: each one is built from pieces you have already seen."
2. **Prose**: opening paragraph about all features using sessions, bundles, and modules
3. **Prose** with `<h2>` sections for each of the 4 topics: Agents, Context Files, Skills, Recipes
4. **VignettePlaceholder** after the Recipes section: rationale about animating a 3-step recipe workflow

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "Recipes" ~/projects/amplifier-masterclass/dist/chapters/11/index.html | head -2
```

---

### Task 13: Compose Chapter 12 — The Complete Picture

**Files:**
- Rewrite: `src/chapters/Chapter12.astro`

**Content source:** `.design/sections/12-complete-picture.md`
**Blocks used:** ChapterEntry, Prose, Diagram (request-flow.svg), ChatPlaceholder

**Step 1: Write the chapter composition**

Read `.design/sections/12-complete-picture.md`. Compose as:
1. **ChapterEntry**: number=12, title="The Complete Picture", lead="Each layer depends only on the one below it."
2. **Prose**: the 6-layer stack description (Kernel, Modules, Bundles, Foundation, Applications, Community)
3. **Prose** with `<h2>`: "Where new things go" (examples of where different changes land)
4. **Diagram**: request-flow.svg at reading width (it shows a single request flowing through all layers), with caption
5. **Prose**: closing thought about mechanism vs policy
6. **ChatPlaceholder**: prompt="Finished the masterclass. Have questions about any concept?"

The existing SVG is at `public/diagrams/request-flow.svg`.

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "request-flow.svg" ~/projects/amplifier-masterclass/dist/chapters/12/index.html | head -1
grep "chat-placeholder" ~/projects/amplifier-masterclass/dist/chapters/12/index.html | head -1
```

---

### Task 14: Compose Chapter 13 — Appendix

**Files:**
- Rewrite: `src/chapters/Chapter13.astro`

**Content source:** `.design/sections/13-appendix-methodology.md`
**Blocks used:** ChapterEntry, Prose (shortest chapter, prose only)

**Step 1: Write the chapter composition**

Read `.design/sections/13-appendix-methodology.md`. This is the shortest chapter. Compose as:
1. **ChapterEntry**: number=13, title="Appendix: Research Methodology", lead="How these facts were established."
2. **Prose**: the methodology description (Parallax Discovery, 7 agents, 37 verified claims, 4 discrepancies, 8 unknowns)

Do NOT include the "Presentation Slides" section from the markdown.

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
grep "verified claims" ~/projects/amplifier-masterclass/dist/chapters/13/index.html | head -1
```

---

### Task 15: Full integration verification and commit

**Step 1: Final build**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -15
```
Expected: clean build with 14 pages, no errors.

**Step 2: Deploy**
```bash
cd ~/projects/amplifier-masterclass && rsync -a --delete dist/ ~/masterclass-preview/
```

**Step 3: Verify all 13 chapters have real content (not stubs)**
```bash
cd ~/projects/amplifier-masterclass
for i in $(seq 1 13); do
  WORD_COUNT=$(wc -w < dist/chapters/$i/index.html)
  echo "Chapter $i: $WORD_COUNT words"
done
```
Expected: every chapter has significantly more words than the stub (~100+). Chapter 7 (Tools vs Hooks) should be the largest.

**Step 4: Verify nav bar updates per chapter**
```bash
grep "navbar__chapter-title" dist/chapters/1/index.html | head -1
grep "navbar__chapter-title" dist/chapters/7/index.html | head -1
grep "navbar__chapter-title" dist/chapters/13/index.html | head -1
```
Expected: each shows the correct chapter title ("Introduction", "Tools vs Hooks", "Appendix: Research Methodology").

**Step 5: Verify TOC overlay is present on every chapter**
```bash
for i in 1 7 13; do
  COUNT=$(grep -c "toc-overlay__item" dist/chapters/$i/index.html)
  echo "Chapter $i TOC items: $COUNT"
done
```
Expected: each chapter page has 13 TOC items.

**Step 6: Verify diagrams render in their chapters**
```bash
grep "architecture-stack.svg" dist/chapters/2/index.html | head -1   # Ch.2
grep "reasoning-loop.svg" dist/chapters/6/index.html | head -1       # Ch.6
grep "request-flow.svg" dist/chapters/12/index.html | head -1        # Ch.12
```
Expected: each diagram SVG path appears in its chapter's HTML.

**Step 7: Verify stubs render**
```bash
grep "vignette-placeholder" dist/chapters/4/index.html | head -1     # Ch.4 vignette
grep "vignette-placeholder" dist/chapters/7/index.html | head -1     # Ch.7 vignette
grep "chat-placeholder" dist/chapters/6/index.html | head -1         # Ch.6 chat
grep "chat-placeholder" dist/chapters/7/index.html | head -1         # Ch.7 chat
grep "chat-placeholder" dist/chapters/12/index.html | head -1        # Ch.12 chat
```
Expected: stubs appear in the correct chapters.

**Step 8: Verify prev/next navigation**
```bash
# Chapter 1 should only have "Next" (no "Previous")
grep "Previous" dist/chapters/1/index.html | head -1   # Should find nothing or no match
grep "Next" dist/chapters/1/index.html | head -1       # Should find "Next →"

# Chapter 7 should have both
grep "Previous" dist/chapters/7/index.html | head -1
grep "Next" dist/chapters/7/index.html | head -1

# Chapter 13 should only have "Previous" (no "Next")
grep "Next →" dist/chapters/13/index.html | wc -l   # Should be 0 (account for HTML encoding)
grep "Previous" dist/chapters/13/index.html | head -1
```

**Step 9: Commit all Phase 3 work**
```bash
cd ~/projects/amplifier-masterclass
git add -A
git status
```

Review the status. It should show:
- New: `src/chapters/Chapter01.astro` through `src/chapters/Chapter13.astro`
- Modified: `src/pages/chapters/[chapter].astro` (updated to import chapter compositions)

```bash
git commit -m "feat: phase 3 — all 13 chapters composed with real content

- Chapter 1: Introduction (prose)
- Chapter 2: Architecture Map (prose + diagram)
- Chapter 3: Design Philosophy (prose + callout)
- Chapter 4: The Kernel (prose + code + vignette stub)
- Chapter 5: Module System (prose + table + code + vignette stub)
- Chapter 6: The Orchestrator (prose + diagram + vignette stub + chat stub)
- Chapter 7: Tools vs Hooks (prose + comparison + cascade + vignette stub + chat stub)
- Chapter 8: Sessions (prose + table)
- Chapter 9: Bundles & Configuration (prose + code)
- Chapter 10: Foundation Bridge (prose + callout)
- Chapter 11: Agents/Context/Recipes (prose + vignette stub)
- Chapter 12: Complete Picture (prose + diagram + chat stub)
- Chapter 13: Appendix (prose)
- Dynamic route imports per-chapter compositions
- All diagrams wired to correct chapters
- All stubs visible with rationale"
```

**Step 10: Push to GitHub**
```bash
cd ~/projects/amplifier-masterclass && git push origin master
```
