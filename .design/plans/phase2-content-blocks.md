# Phase 2: Content Block Components — The Toolbox

> **Execution:** Use the subagent-driven-development workflow to implement this plan.
> **Provider constraint:** Use only Anthropic Claude Opus and Sonnet models for all agent delegations during execution.

**Goal:** Build every content block component in the toolbox. After this phase, all the building blocks exist for composing chapters in Phase 3.

**Architecture:** The masterclass content model uses a toolbox of reusable block components, each responsible for one visual pattern. Chapters compose these blocks editorially. The block components handle their own width (reading/wide/full), spacing, and typography. Each component accepts content via Astro slots or props. No React, no client-side framework. Pure Astro components with scoped CSS and optional vanilla JS for interactivity.

**Tech Stack:** Astro 6 components (.astro files), scoped CSS, CSS custom properties from `src/styles/tokens.css`, vanilla TypeScript for scroll-reveal.

**Prerequisites:** Phase 1 must be complete. The project should have:
- Paper frame layout (`ChapterLayout.astro`) with warm canvas + white card
- NavBar and TOCOverlay components
- Chapter routing (`src/pages/chapters/[chapter].astro`)
- v3 tokens in `src/styles/tokens.css`
- Rewritten `src/styles/global.css` with width utilities (`.width-reading`, `.width-wide`, `.width-full`)

**Design System Reference:** All visual specs come from `.design/DESIGN-SYSTEM.md`. Token values come from `.design/tokens.css` (already installed as `src/styles/tokens.css`).

---

### Task 1: Create WidthContainer.astro

**Files:**
- Create: `src/components/blocks/WidthContainer.astro`

**Step 1: Create the blocks directory and component**
```bash
mkdir -p ~/projects/amplifier-masterclass/src/components/blocks
```

Create `src/components/blocks/WidthContainer.astro`:

```astro
---
/**
 * WidthContainer.astro — Three-width column utility
 *
 * Wraps content in the appropriate max-width container.
 * - reading: 650px (default, prose column)
 * - wide:    1100px (diagrams, tables, comparisons)
 * - full:    100% (hero moments, scrollytelling, rare)
 *
 * Uses the global .width-reading / .width-wide / .width-full classes
 * defined in global.css for consistent centering.
 */

interface Props {
  width?: 'reading' | 'wide' | 'full';
  class?: string;
}

const { width = 'reading', class: className } = Astro.props;

const widthClass = `width-${width}`;
const classes = [widthClass, className].filter(Boolean).join(' ');
---

<div class={classes}>
  <slot />
</div>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build. (The component is created but not yet imported anywhere.)

---

### Task 2: Create ChapterEntry.astro

**Files:**
- Create: `src/components/blocks/ChapterEntry.astro`

**Step 1: Create the component**

This is the chapter opening pattern: eyebrow ("Chapter 6"), title ("The Orchestrator"), and lead sentence. See DESIGN-SYSTEM.md section 7.3 for the exact spec.

Create `src/components/blocks/ChapterEntry.astro`:

```astro
---
/**
 * ChapterEntry.astro — Chapter opening pattern
 *
 * Renders the standardized chapter entry:
 *   Eyebrow: "Chapter 6" — Space Grotesk 400, --text-xs, uppercase
 *   Title:   "The Orchestrator" — Lora 600, --text-4xl
 *   Lead:    One-sentence thesis — Inter 400, --text-lg, --text-secondary
 *
 * Spec: DESIGN-SYSTEM.md §7.3
 */

interface Props {
  chapterNumber: number;
  title: string;
  lead: string;
}

const { chapterNumber, title, lead } = Astro.props;
---

<header class="chapter-entry width-reading">
  <p class="chapter-entry__eyebrow">Chapter {chapterNumber}</p>
  <h1 class="chapter-entry__title">{title}</h1>
  <p class="chapter-entry__lead">{lead}</p>
</header>

<style>
  .chapter-entry {
    margin-bottom: var(--space-16);
  }

  .chapter-entry__eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
    max-width: none;
  }

  .chapter-entry__title {
    /* h1 styles (Lora 600, --text-4xl) inherited from global.css */
    margin-bottom: var(--space-6);
  }

  .chapter-entry__lead {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    max-width: 55ch;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 3: Create Prose.astro

**Files:**
- Create: `src/components/blocks/Prose.astro`

**Step 1: Create the component**

Prose is the most-used block. It wraps slot content in reading-width and applies editorial typography: serif headings, sans body, proper paragraph spacing, list styles.

Create `src/components/blocks/Prose.astro`:

```astro
---
/**
 * Prose.astro — Reading-width editorial text block
 *
 * The default block type. Wraps content in the reading column (650px).
 * Applies editorial typography:
 *   - h2, h3: Lora 600 (inherited from global)
 *   - p: Inter 400, 1.7 line-height, --text-secondary
 *   - ul/ol: Inter 400, proper indent and spacing
 *   - strong: --text-primary weight
 *   - Paragraph spacing: --space-6
 *   - Heading spacing: --space-12 above, --space-4 below
 */

interface Props {
  class?: string;
}

const { class: className } = Astro.props;
const classes = ['prose', 'width-reading', className].filter(Boolean).join(' ');
---

<div class={classes}>
  <slot />
</div>

<style>
  .prose {
    /* Paragraph spacing */
    :global(p) {
      margin-bottom: var(--space-6);
      max-width: 65ch;
    }

    :global(p:last-child) {
      margin-bottom: 0;
    }

    /* Heading spacing */
    :global(h2) {
      margin-top: var(--space-16);
      margin-bottom: var(--space-4);
    }

    :global(h3) {
      margin-top: var(--space-12);
      margin-bottom: var(--space-4);
    }

    /* First heading in a prose block needs no top margin */
    :global(h2:first-child),
    :global(h3:first-child) {
      margin-top: 0;
    }

    /* Lists */
    :global(ul),
    :global(ol) {
      margin-bottom: var(--space-6);
      padding-left: 1.5em;
      max-width: 65ch;
    }

    :global(li) {
      margin-bottom: var(--space-2);
      line-height: var(--leading-normal);
    }

    :global(li:last-child) {
      margin-bottom: 0;
    }

    /* Nested lists */
    :global(li ul),
    :global(li ol) {
      margin-top: var(--space-2);
      margin-bottom: 0;
    }

    /* Strong text */
    :global(strong) {
      color: var(--text-primary);
      font-weight: 600;
    }

    /* Emphasis */
    :global(em) {
      font-style: italic;
    }

    /* Horizontal rule as section divider */
    :global(hr) {
      border: none;
      border-top: 1px solid var(--border-default);
      margin: var(--space-12) 0;
    }

    /* Blockquote */
    :global(blockquote) {
      border-left: 3px solid var(--accent);
      padding-left: var(--space-6);
      margin: var(--space-8) 0;
      font-family: var(--font-serif);
      font-style: italic;
      color: var(--text-secondary);
    }

    :global(blockquote p) {
      max-width: 55ch;
    }
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 4: Create CodeBlock.astro

**Files:**
- Create: `src/components/blocks/CodeBlock.astro`

**Step 1: Create the component**

Code blocks render in the reading column with a light gray background, subtle border, and monospace font. An optional filename label appears in the top-right corner.

Create `src/components/blocks/CodeBlock.astro`:

```astro
---
/**
 * CodeBlock.astro — Light-theme code container
 *
 * Reading-width code block with:
 *   - Background: --bg-code (#F5F3EE)
 *   - Border: 1px solid --border-default
 *   - Border-radius: --radius-md (8px)
 *   - Padding: --space-6 (24px)
 *   - Font: --font-code, --text-sm (14px)
 *   - Optional filename label top-right
 *
 * Spec: DESIGN-SYSTEM.md §7.4
 */

interface Props {
  filename?: string;
  lang?: string;
}

const { filename, lang } = Astro.props;
---

<div class="code-block width-reading">
  {filename && <span class="code-block__filename">{filename}</span>}
  <pre class="code-block__pre"><code class:list={[lang && `language-${lang}`]}><slot /></code></pre>
</div>

<style>
  .code-block {
    position: relative;
    background: var(--bg-code);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    margin-bottom: var(--space-8);
    overflow-x: auto;
  }

  .code-block__filename {
    position: absolute;
    top: var(--space-3);
    right: var(--space-4);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 400;
    color: var(--text-muted);
    user-select: none;
  }

  .code-block__pre {
    margin: 0;
    padding: 0;
    overflow-x: auto;
  }

  .code-block__pre code {
    font-family: var(--font-code);
    font-size: var(--text-sm);
    line-height: 1.6;
    color: var(--text-primary);
    /* Reset inline-code styles from global.css */
    background: none;
    padding: 0;
    border-radius: 0;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 5: Create Diagram.astro

**Files:**
- Create: `src/components/blocks/Diagram.astro`

**Step 1: Create the component**

Diagrams break out to wide or full width. They render an image or inline SVG with an optional caption below.

Create `src/components/blocks/Diagram.astro`:

```astro
---
/**
 * Diagram.astro — Wide or full-width diagram container
 *
 * Configurable width (wide or full) via prop.
 * Renders an <img> from src prop, or inline SVG via slot.
 * Optional figcaption below in Space Grotesk muted.
 *
 * The 5 existing SVGs in public/diagrams/ should work with this:
 *   architecture-stack.svg, reasoning-loop.svg, session-tree.svg,
 *   tools-vs-hooks.svg, request-flow.svg
 *
 * Spec: DESIGN-SYSTEM.md §8.2, AESTHETIC-GUIDE.md "Diagram Visual Language"
 */

interface Props {
  src?: string;
  alt?: string;
  caption?: string;
  width?: 'reading' | 'wide' | 'full';
}

const { src, alt = '', caption, width = 'wide' } = Astro.props;
const widthClass = `width-${width}`;
const base = import.meta.env.BASE_URL;
---

<figure class:list={['diagram', widthClass]}>
  <div class="diagram__container">
    {src ? (
      <img
        src={src.startsWith('/') ? `${base}${src.slice(1)}` : src}
        alt={alt}
        class="diagram__img"
        loading="lazy"
        decoding="async"
      />
    ) : (
      <div class="diagram__inline">
        <slot />
      </div>
    )}
  </div>
  {caption && (
    <figcaption class="diagram__caption">{caption}</figcaption>
  )}
</figure>

<style>
  .diagram {
    margin-bottom: var(--space-12);
  }

  .diagram__container {
    background: var(--bg-card);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
    padding: var(--space-6);
    overflow: hidden;
  }

  .diagram__img {
    width: 100%;
    height: auto;
    display: block;
  }

  .diagram__inline {
    width: 100%;
  }

  .diagram__inline :global(svg) {
    width: 100%;
    height: auto;
    display: block;
  }

  .diagram__caption {
    margin-top: var(--space-3);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 400;
    color: var(--text-muted);
    text-align: center;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 6: Create DataTable.astro

**Files:**
- Create: `src/components/blocks/DataTable.astro`

**Step 1: Create the component**

Editorial tables use the wide breakout, horizontal-rule style, no vertical borders. Pass HTML table content as the slot.

Create `src/components/blocks/DataTable.astro`:

```astro
---
/**
 * DataTable.astro — Wide-width editorial table
 *
 * No vertical borders, hairline horizontal separators.
 * Headers: Inter 600, small, uppercase.
 * Body: Inter 400. Generous cell padding.
 *
 * Pass an HTML <table> as the slot content.
 * The wrapper applies the editorial styling.
 *
 * Spec: DESIGN-SYSTEM.md "Table Blocks", AESTHETIC-GUIDE.md "Table Blocks"
 */

interface Props {
  caption?: string;
}

const { caption } = Astro.props;
---

<div class="data-table width-wide">
  {caption && <p class="data-table__caption">{caption}</p>}
  <div class="data-table__wrapper">
    <slot />
  </div>
</div>

<style>
  .data-table {
    margin-bottom: var(--space-12);
  }

  .data-table__caption {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
    max-width: none;
  }

  .data-table__wrapper {
    overflow-x: auto;
  }

  .data-table__wrapper :global(table) {
    width: 100%;
    border-collapse: collapse;
    font-family: var(--font-sans);
    font-size: var(--text-sm);
  }

  .data-table__wrapper :global(thead) {
    border-bottom: 2px solid var(--border-default);
  }

  .data-table__wrapper :global(th) {
    font-weight: 600;
    font-size: var(--text-xs);
    text-transform: uppercase;
    letter-spacing: 0.04em;
    color: var(--text-muted);
    text-align: left;
    padding: var(--space-3) var(--space-4);
    white-space: nowrap;
  }

  .data-table__wrapper :global(td) {
    padding: var(--space-3) var(--space-4);
    border-bottom: 1px solid var(--border-default);
    color: var(--text-secondary);
    vertical-align: top;
    line-height: 1.5;
  }

  .data-table__wrapper :global(tbody tr:last-child td) {
    border-bottom: none;
  }

  .data-table__wrapper :global(tbody tr:hover) {
    background: var(--bg-muted);
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 7: Create Callout.astro

**Files:**
- Create: `src/components/blocks/Callout.astro`

**Step 1: Create the component**

A reading-width callout with left accent border, muted background, and Lora italic text.

Create `src/components/blocks/Callout.astro`:

```astro
---
/**
 * Callout.astro — Reading-width accent callout
 *
 * Left accent border (3px --accent), --bg-muted background.
 * Text in Lora 400 italic for editorial pull-quote feel.
 * Used for "key fact" or "remember this" moments.
 *
 * Spec: DESIGN-SYSTEM.md §7.5
 */

interface Props {
  label?: string;
}

const { label } = Astro.props;
---

<aside class="callout width-reading" role="note">
  {label && <p class="callout__label">{label}</p>}
  <div class="callout__body">
    <slot />
  </div>
</aside>

<style>
  .callout {
    background: var(--bg-muted);
    border-left: 3px solid var(--accent);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
    padding: var(--space-6) var(--space-8);
    margin-bottom: var(--space-8);
  }

  .callout__label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--accent);
    margin-bottom: var(--space-3);
    max-width: none;
  }

  .callout__body {
    font-family: var(--font-serif);
    font-weight: 400;
    font-style: italic;
    color: var(--text-secondary);
    line-height: var(--leading-normal);
  }

  .callout__body :global(p) {
    max-width: 55ch;
    margin-bottom: var(--space-3);
  }

  .callout__body :global(p:last-child) {
    margin-bottom: 0;
  }

  .callout__body :global(strong) {
    color: var(--text-primary);
    font-weight: 600;
    font-style: normal;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 8: Create ComparisonLayout.astro

**Files:**
- Create: `src/components/blocks/ComparisonLayout.astro`

**Step 1: Create the component**

A wide-width two-column grid for the Tools vs Hooks comparison (Chapter 7 only). Left column is green-tinted (tools), right is red-tinted (hooks).

Create `src/components/blocks/ComparisonLayout.astro`:

```astro
---
/**
 * ComparisonLayout.astro — Wide two-column comparison grid
 *
 * Left: Tools (green tint via --color-tools-*)
 * Right: Hooks (red tint via --color-hooks-*)
 *
 * Each column accepts slot content via named slots.
 * Only used in Chapter 7: Tools vs Hooks.
 *
 * Spec: DESIGN-SYSTEM.md §1.6 (semantic colors)
 */

interface Props {
  leftTitle?: string;
  rightTitle?: string;
}

const { leftTitle = 'Tools', rightTitle = 'Hooks' } = Astro.props;
---

<div class="comparison width-wide">
  <div class="comparison__col comparison__col--tools">
    <h3 class="comparison__heading comparison__heading--tools">{leftTitle}</h3>
    <div class="comparison__body">
      <slot name="tools" />
    </div>
  </div>
  <div class="comparison__col comparison__col--hooks">
    <h3 class="comparison__heading comparison__heading--hooks">{rightTitle}</h3>
    <div class="comparison__body">
      <slot name="hooks" />
    </div>
  </div>
</div>

<style>
  .comparison {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: var(--space-6);
    margin-bottom: var(--space-12);
  }

  .comparison__col {
    border-radius: var(--radius-md);
    padding: var(--space-6);
    border-top: 3px solid;
  }

  .comparison__col--tools {
    background: var(--color-tools-bg);
    border-color: var(--color-tools-border);
  }

  .comparison__col--hooks {
    background: var(--color-hooks-bg);
    border-color: var(--color-hooks-border);
  }

  .comparison__heading {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.04em;
    margin-bottom: var(--space-4);
  }

  .comparison__heading--tools {
    color: var(--color-tools-text);
  }

  .comparison__heading--hooks {
    color: var(--color-hooks-text);
  }

  .comparison__body {
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: var(--leading-normal);
  }

  .comparison__body :global(p) {
    margin-bottom: var(--space-3);
    max-width: none;
  }

  .comparison__body :global(p:last-child) {
    margin-bottom: 0;
  }

  .comparison__body :global(strong) {
    color: var(--text-primary);
    font-weight: 600;
  }

  .comparison__body :global(ul) {
    padding-left: 1.25em;
    margin-bottom: var(--space-3);
  }

  .comparison__body :global(li) {
    margin-bottom: var(--space-1);
  }

  @media (max-width: 768px) {
    .comparison {
      grid-template-columns: 1fr;
    }
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 9: Create CascadeVisualization.astro

**Files:**
- Create: `src/components/blocks/CascadeVisualization.astro`

**Step 1: Create the component**

The 5-level hook priority cascade with color-coded left borders. Only used in Chapter 7.

Create `src/components/blocks/CascadeVisualization.astro`:

```astro
---
/**
 * CascadeVisualization.astro — Hook Priority Cascade
 *
 * 5 priority rows with colored left borders:
 *   1. Deny      — red    (#DC2626)
 *   2. AskUser   — amber  (#D97706)
 *   3. Inject    — blue   (#2563EB)
 *   4. Modify    — purple (#7C3AED)
 *   5. Continue  — green  (#16A34A)
 *
 * Each row: priority level, action name, description.
 * Only used in Chapter 7: Tools vs Hooks.
 *
 * Spec: DESIGN-SYSTEM.md §1.6 (cascade tokens)
 */

interface CascadeLevel {
  priority: number;
  action: string;
  description: string;
  colorVar: string;
}

const levels: CascadeLevel[] = [
  {
    priority: 1,
    action: 'Deny',
    description: 'Short-circuits immediately. No further handlers execute. Fail-closed security posture.',
    colorVar: 'var(--cascade-deny)',
  },
  {
    priority: 2,
    action: 'AskUser',
    description: 'Pauses for human decision. First one wins. Cannot merge approvals.',
    colorVar: 'var(--cascade-ask-user)',
  },
  {
    priority: 3,
    action: 'InjectContext',
    description: 'Accumulated across handlers, merged. The AI reads injected context on its next turn.',
    colorVar: 'var(--cascade-inject)',
  },
  {
    priority: 4,
    action: 'Modify',
    description: 'Chains data through handlers. Each sees modified data from the previous handler.',
    colorVar: 'var(--cascade-modify)',
  },
  {
    priority: 5,
    action: 'Continue',
    description: 'Default. No-op. Let it pass.',
    colorVar: 'var(--cascade-continue)',
  },
];
---

<div class="cascade width-wide">
  <p class="cascade__heading">Hook Action Priority Cascade</p>
  <div class="cascade__list">
    {levels.map((level) => (
      <div class="cascade__row" style={`--cascade-color: ${level.colorVar}`}>
        <span class="cascade__priority">{level.priority}</span>
        <div class="cascade__content">
          <span class="cascade__action">{level.action}</span>
          <span class="cascade__desc">{level.description}</span>
        </div>
      </div>
    ))}
  </div>
</div>

<style>
  .cascade {
    margin-bottom: var(--space-12);
  }

  .cascade__heading {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
    max-width: none;
  }

  .cascade__list {
    display: flex;
    flex-direction: column;
    gap: var(--space-2);
  }

  .cascade__row {
    display: flex;
    align-items: flex-start;
    gap: var(--space-4);
    padding: var(--space-4) var(--space-6);
    background: var(--bg-muted);
    border-left: 4px solid var(--cascade-color);
    border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  }

  .cascade__priority {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--cascade-color);
    min-width: 1.5em;
    flex-shrink: 0;
  }

  .cascade__content {
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .cascade__action {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--cascade-color);
  }

  .cascade__desc {
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--text-secondary);
    line-height: 1.5;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 10: Create VignettePlaceholder.astro

**Files:**
- Create: `src/components/blocks/VignettePlaceholder.astro`

**Step 1: Create the component**

A wide-width stub with 16:9 aspect ratio, muted background, play icon, and "coming soon" text. The `rationale` prop renders as a small note explaining what the vignette would show.

Create `src/components/blocks/VignettePlaceholder.astro`:

```astro
---
/**
 * VignettePlaceholder.astro — Stub for future video vignettes
 *
 * Wide-width placeholder with 16:9 aspect ratio.
 * Shows a play icon and "Video explainer coming soon".
 * Optional rationale prop explains what the vignette would show.
 *
 * Spec: DESIGN-SYSTEM.md §7.7
 */

interface Props {
  rationale?: string;
  width?: 'wide' | 'full';
}

const { rationale, width = 'wide' } = Astro.props;
const widthClass = `width-${width}`;
---

<div class:list={['vignette-placeholder', widthClass]}>
  <div class="vignette-placeholder__frame">
    <div class="vignette-placeholder__content">
      <span class="vignette-placeholder__icon" aria-hidden="true">&#9654;</span>
      <p class="vignette-placeholder__text">Video explainer</p>
      <p class="vignette-placeholder__badge">Coming soon</p>
    </div>
  </div>
  {rationale && (
    <p class="vignette-placeholder__rationale">{rationale}</p>
  )}
</div>

<style>
  .vignette-placeholder {
    margin-bottom: var(--space-12);
  }

  .vignette-placeholder__frame {
    background: var(--bg-muted);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-lg);
    aspect-ratio: 16 / 9;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .vignette-placeholder__content {
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--space-2);
  }

  .vignette-placeholder__icon {
    font-size: 2rem;
    color: var(--text-muted);
    opacity: 0.5;
  }

  .vignette-placeholder__text {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--text-muted);
    max-width: none;
  }

  .vignette-placeholder__badge {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--text-muted);
    opacity: 0.6;
    max-width: none;
  }

  .vignette-placeholder__rationale {
    margin-top: var(--space-3);
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    font-style: italic;
    color: var(--text-muted);
    text-align: center;
    max-width: 60ch;
    margin-inline: auto;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 11: Create ChatPlaceholder.astro

**Files:**
- Create: `src/components/blocks/ChatPlaceholder.astro`

**Step 1: Create the component**

A reading-width stub with a conversational prompt and disabled input.

Create `src/components/blocks/ChatPlaceholder.astro`:

```astro
---
/**
 * ChatPlaceholder.astro — Stub for future inline chat
 *
 * Reading-width bordered card with a conversational prompt
 * and a disabled text input. "Coming soon" badge.
 *
 * Spec: DESIGN-SYSTEM.md §7.8
 */

interface Props {
  prompt?: string;
}

const { prompt = 'Have a question about this chapter?' } = Astro.props;
---

<div class="chat-placeholder width-reading">
  <div class="chat-placeholder__card">
    <p class="chat-placeholder__prompt">{prompt}</p>
    <div class="chat-placeholder__input-row">
      <input
        type="text"
        class="chat-placeholder__input"
        placeholder="Ask a question..."
        disabled
        aria-disabled="true"
      />
      <span class="chat-placeholder__badge">Coming soon</span>
    </div>
  </div>
</div>

<style>
  .chat-placeholder {
    margin-bottom: var(--space-12);
  }

  .chat-placeholder__card {
    border: 1px solid var(--border-default);
    border-radius: var(--radius-md);
    padding: var(--space-6);
    display: flex;
    flex-direction: column;
    gap: var(--space-4);
  }

  .chat-placeholder__prompt {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    color: var(--text-secondary);
    max-width: none;
  }

  .chat-placeholder__input-row {
    display: flex;
    align-items: center;
    gap: var(--space-3);
  }

  .chat-placeholder__input {
    flex: 1;
    padding: var(--space-2) var(--space-4);
    border: 1px solid var(--border-default);
    border-radius: var(--radius-sm);
    background: var(--bg-muted);
    color: var(--text-muted);
    font-size: var(--text-sm);
    cursor: not-allowed;
    opacity: 0.6;
  }

  .chat-placeholder__badge {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    color: var(--text-muted);
    white-space: nowrap;
    opacity: 0.6;
  }
</style>
```

**Step 2: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 12: Create scroll-reveal.ts

**Files:**
- Create: `src/scripts/scroll-reveal.ts`
- Modify: `src/layouts/ChapterLayout.astro`

**Step 1: Create the scroll-reveal script**

A vanilla IntersectionObserver that finds all `[data-reveal]` elements and applies a one-shot fade+translate animation. Respects `prefers-reduced-motion`.

Create `src/scripts/scroll-reveal.ts`:

```typescript
/**
 * scroll-reveal.ts — Vanilla IntersectionObserver scroll reveals
 *
 * Finds all elements with [data-reveal] attribute.
 * Applies a one-shot animation: opacity 0→1, translateY 20px→0, 600ms.
 * Uses CSS custom properties for duration and easing from tokens.css.
 *
 * Respects prefers-reduced-motion: if enabled, all elements are
 * immediately visible with no animation.
 *
 * Usage: add data-reveal to any element you want to fade in on scroll.
 */

function initScrollReveal(): void {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (elements.length === 0) return;

  if (prefersReducedMotion) {
    // Make everything visible immediately
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Set initial hidden state
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = `opacity var(--duration-reveal) var(--ease-out), transform var(--duration-reveal) var(--ease-out)`;
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          observer.unobserve(el); // one-shot: don't re-trigger
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // trigger slightly before fully visible
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
```

**Step 2: Create the scripts directory**
```bash
mkdir -p ~/projects/amplifier-masterclass/src/scripts
```

**Step 3: Wire the script into ChapterLayout.astro**

Add this at the bottom of `src/layouts/ChapterLayout.astro`, just before the closing `</html>` tag but after the `</style>` tag:

```html
<script>
  import '../scripts/scroll-reveal';
</script>
```

**Step 4: Build to verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build.

---

### Task 13: Build a test page, verify all blocks, then delete it

**Files:**
- Create (temporary): `src/pages/test-blocks.astro`
- Delete (after verification): `src/pages/test-blocks.astro`

**Step 1: Create a test page that renders every component**

Create `src/pages/test-blocks.astro`:

```astro
---
import ChapterLayout from '../layouts/ChapterLayout.astro';
import ChapterEntry from '../components/blocks/ChapterEntry.astro';
import Prose from '../components/blocks/Prose.astro';
import CodeBlock from '../components/blocks/CodeBlock.astro';
import Diagram from '../components/blocks/Diagram.astro';
import DataTable from '../components/blocks/DataTable.astro';
import Callout from '../components/blocks/Callout.astro';
import ComparisonLayout from '../components/blocks/ComparisonLayout.astro';
import CascadeVisualization from '../components/blocks/CascadeVisualization.astro';
import VignettePlaceholder from '../components/blocks/VignettePlaceholder.astro';
import ChatPlaceholder from '../components/blocks/ChatPlaceholder.astro';
import WidthContainer from '../components/blocks/WidthContainer.astro';
---

<ChapterLayout title="Block Test" chapterNumber={0} chapterTitle="Component Test">

  <ChapterEntry chapterNumber={99} title="Test Chapter" lead="This page tests all block components." />

  <Prose>
    <h2>Prose Block</h2>
    <p>This is a paragraph in the prose block. It uses Inter 400, reading column width (~650px), and has proper line height at 1.7. The text should feel like reading a well-produced educational paper.</p>
    <h3>Sub-heading</h3>
    <p>Another paragraph with <strong>bold text</strong> and <em>italic text</em> and some <code>inline code</code> references. Lists follow:</p>
    <ul>
      <li>First item in an unordered list</li>
      <li>Second item with more detail</li>
      <li>Third item</li>
    </ul>
    <blockquote><p>This is a blockquote with editorial styling.</p></blockquote>
  </Prose>

  <CodeBlock filename="example.py">async def mount(coordinator, config) -> Optional[cleanup_fn]:
    coordinator.register("my-tool", tool_instance)
    return cleanup</CodeBlock>

  <Diagram src="/diagrams/architecture-stack.svg" alt="Architecture stack diagram" caption="The Amplifier architecture stack showing kernel, modules, and ecosystem layers." />

  <DataTable caption="Module Types">
    <table>
      <thead>
        <tr><th>Type</th><th>Role</th><th>Required</th><th>Cardinality</th></tr>
      </thead>
      <tbody>
        <tr><td>Orchestrator</td><td>Drives the agent loop</td><td>Yes</td><td>1</td></tr>
        <tr><td>Provider</td><td>Connects to AI model</td><td>Yes</td><td>1+</td></tr>
        <tr><td>Tool</td><td>AI-callable action</td><td>No</td><td>0+</td></tr>
        <tr><td>ContextManager</td><td>Conversation memory</td><td>Yes</td><td>1</td></tr>
        <tr><td>HookHandler</td><td>Event reactor</td><td>No</td><td>0+</td></tr>
        <tr><td>Resolver</td><td>Module path mapper</td><td>No</td><td>0-1</td></tr>
      </tbody>
    </table>
  </DataTable>

  <Callout label="Key Fact">
    <p>The kernel contains zero file-writing code. All persistence is delegated to hook modules.</p>
  </Callout>

  <ComparisonLayout>
    <Fragment slot="tools">
      <p><strong>AI-decided.</strong> The model sees tools in its context and chooses when to call them.</p>
      <p>Visible, intentional, under the model's control.</p>
    </Fragment>
    <Fragment slot="hooks">
      <p><strong>Code-decided.</strong> The AI has no concept that hooks exist. They fire automatically.</p>
      <p>Invisible to the model, triggered by system events.</p>
    </Fragment>
  </ComparisonLayout>

  <CascadeVisualization />

  <VignettePlaceholder rationale="This would animate the orchestrator OODA loop with each phase lighting up." />

  <ChatPlaceholder prompt="Have a question about this test page?" />

</ChapterLayout>
```

**Step 2: Build and verify**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -10
```
Expected: clean build with 15 pages (13 chapters + index + test-blocks).

**Step 3: Check the test page HTML for all components**
```bash
cd ~/projects/amplifier-masterclass
grep -c "chapter-entry" dist/test-blocks/index.html     # ChapterEntry
grep -c "prose" dist/test-blocks/index.html              # Prose
grep -c "code-block" dist/test-blocks/index.html         # CodeBlock
grep -c "diagram" dist/test-blocks/index.html            # Diagram
grep -c "data-table" dist/test-blocks/index.html         # DataTable
grep -c "callout" dist/test-blocks/index.html            # Callout
grep -c "comparison" dist/test-blocks/index.html         # ComparisonLayout
grep -c "cascade" dist/test-blocks/index.html            # CascadeVisualization
grep -c "vignette-placeholder" dist/test-blocks/index.html  # VignettePlaceholder
grep -c "chat-placeholder" dist/test-blocks/index.html   # ChatPlaceholder
```
Expected: each grep returns a count > 0, confirming all components render.

**Step 4: Delete the test page**
```bash
rm -f ~/projects/amplifier-masterclass/src/pages/test-blocks.astro
```

**Step 5: Rebuild to confirm clean state**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -5
```
Expected: clean build with 14 pages (13 chapters + index).

---

### Task 14: Commit Phase 2

**Step 1: Stage and commit all changes**
```bash
cd ~/projects/amplifier-masterclass
git add -A
git status
```

Review the status. It should show new files:
- `src/components/blocks/WidthContainer.astro`
- `src/components/blocks/ChapterEntry.astro`
- `src/components/blocks/Prose.astro`
- `src/components/blocks/CodeBlock.astro`
- `src/components/blocks/Diagram.astro`
- `src/components/blocks/DataTable.astro`
- `src/components/blocks/Callout.astro`
- `src/components/blocks/ComparisonLayout.astro`
- `src/components/blocks/CascadeVisualization.astro`
- `src/components/blocks/VignettePlaceholder.astro`
- `src/components/blocks/ChatPlaceholder.astro`
- `src/scripts/scroll-reveal.ts`
- Modified: `src/layouts/ChapterLayout.astro` (scroll-reveal script import)

```bash
git commit -m "feat: phase 2 — content block components (the toolbox)

- WidthContainer: reading/wide/full three-width system
- ChapterEntry: eyebrow + title + lead opening pattern
- Prose: reading-width editorial text with full typography
- CodeBlock: light-theme code container with optional filename
- Diagram: wide/full breakout with img/SVG and caption
- DataTable: editorial horizontal-rule table
- Callout: accent-bordered aside for key facts
- ComparisonLayout: two-column tools-vs-hooks grid
- CascadeVisualization: 5-level hook priority cascade
- VignettePlaceholder: stub for future video explainers
- ChatPlaceholder: stub for future inline Q&A
- scroll-reveal.ts: vanilla IntersectionObserver reveals"
```
