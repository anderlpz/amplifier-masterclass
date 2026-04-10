# Phase 1: Foundation — Strip, Reframe, and First Chapter

> **Execution:** Use the subagent-driven-development workflow to implement this plan.
> **Provider constraint:** Use only Anthropic Claude Opus and Sonnet models for all agent delegations during execution.

**Goal:** Strip the v2 dark-mode infrastructure, build the paper UI frame, and get one chapter rendering end-to-end with navigation.

**Architecture:** The Astro project is being rebuilt from a single-page dark-mode scroll site into a chapter-based, light-theme paper UI. This phase removes all React/GSAP/Lenis dependencies, replaces the dark token system with a light paper palette, builds the new layout (white card on warm canvas), creates chapter-based routing, and wires up the nav bar with TOC overlay. By the end, Chapter 1 loads at `/masterclass-preview/chapters/1/` with full navigation to all 13 chapters.

**Tech Stack:** Astro 6 (static output), vanilla TypeScript/JS, CSS custom properties, self-hosted fonts (Lora, Inter, Space Grotesk in `/public/fonts/`).

**What exists currently:**
- Astro 6 project at `~/projects/amplifier-masterclass`
- 13 section `.astro` files in `src/sections/` (will be deleted, replaced by dynamic route)
- React integrations: `@astrojs/react`, `ParticleSwarm.tsx`, `ScrollProvider.tsx`
- GSAP (`gsap`), Lenis (`lenis`), Phosphor Icons (`@phosphor-icons/react`)
- Dark-mode tokens in `src/styles/tokens.css` (void/slate/parchment system)
- 11 self-hosted font files in `public/fonts/` (kept)
- 5 SVG diagrams in `public/diagrams/` (kept)
- Base path: `/masterclass-preview/`
- Build command: `npx astro build`
- Deploy command: `rsync -a --delete dist/ ~/masterclass-preview/`

---

### Task 1: Remove React and animation dependencies

**Files:**
- Modify: `package.json`
- Modify: `astro.config.mjs`
- Modify: `tsconfig.json`

**Step 1: Strip dependencies from package.json**

Open `package.json`. Remove these dependencies:
- `@astrojs/react`
- `@phosphor-icons/react`
- `@types/react`
- `@types/react-dom`
- `gsap`
- `lenis`
- `react`
- `react-dom`

The `dependencies` block should only contain:
```json
"dependencies": {
  "astro": "^6.1.3",
  "typescript": "^5.9.3"
}
```

**Step 2: Remove React integration from astro.config.mjs**

Replace the entire file with:
```js
import { defineConfig } from 'astro/config';

export default defineConfig({
  output: 'static',
  base: '/masterclass-preview/',
  devToolbar: { enabled: false },
  server: {
    host: '0.0.0.0',
    port: 4322,
  },
  vite: {
    server: {
      allowedHosts: process.env.ALLOWED_HOSTS?.split(',') ?? [],
    },
  },
});
```

The `import react` line and `integrations: [react()]` are removed.

**Step 3: Remove React JSX from tsconfig.json**

Replace the entire file with:
```json
{
  "extends": "astro/tsconfigs/strict"
}
```

The `"jsx": "react-jsx"` and `"jsxImportSource": "react"` lines are removed since we no longer use React.

**Step 4: Reinstall dependencies**
```bash
cd ~/projects/amplifier-masterclass && rm -rf node_modules && npm install 2>&1 | tail -5
```
Expected: clean install with no React packages.

**Step 5: Verify build still works**

We cannot build yet because `src/pages/index.astro` imports the layout which imports React components. This is expected. We'll fix imports in the next task. For now, verify the config is clean:
```bash
cd ~/projects/amplifier-masterclass && cat package.json | grep -E "react|gsap|lenis|phosphor"
```
Expected: no matches.

---

### Task 2: Delete retired components and scripts

**Files:**
- Delete: `src/components/effects/ParticleSwarm.tsx`
- Delete: `src/components/scroll/ScrollProvider.tsx`
- Delete: `src/components/content/GlassCard.astro`
- Delete: `src/components/content/BlurReveal.astro`
- Delete: `src/components/content/FloatingVisual.astro`
- Delete: `src/components/content/NumberedRow.astro`
- Delete: `src/components/content/UpNextTeaser.astro`
- Delete: `src/components/content/Eyebrow.astro`
- Delete: `src/components/navigation/SidebarTOC.astro`
- Delete: `src/components/navigation/ProgressBar.astro`
- Delete: `src/components/navigation/TopNav.astro`
- Delete: `src/components/sections/Section.astro`
- Delete: `src/scripts/scroll-animations.ts`
- Delete: all 13 files in `src/sections/` (S01Introduction.astro through S13Appendix.astro)

**Step 1: Delete all retired files**
```bash
cd ~/projects/amplifier-masterclass

# React components
rm -f src/components/effects/ParticleSwarm.tsx
rm -f src/components/scroll/ScrollProvider.tsx

# v2 content components
rm -f src/components/content/GlassCard.astro
rm -f src/components/content/BlurReveal.astro
rm -f src/components/content/FloatingVisual.astro
rm -f src/components/content/NumberedRow.astro
rm -f src/components/content/UpNextTeaser.astro
rm -f src/components/content/Eyebrow.astro

# v2 navigation components
rm -f src/components/navigation/SidebarTOC.astro
rm -f src/components/navigation/ProgressBar.astro
rm -f src/components/navigation/TopNav.astro

# v2 section wrapper
rm -f src/components/sections/Section.astro

# v2 animation script
rm -f src/scripts/scroll-animations.ts

# v2 section pages (all 13)
rm -f src/sections/S01Introduction.astro
rm -f src/sections/S02ArchitectureMap.astro
rm -f src/sections/S03DesignPhilosophy.astro
rm -f src/sections/S04Kernel.astro
rm -f src/sections/S05ModuleSystem.astro
rm -f src/sections/S06Orchestrator.astro
rm -f src/sections/S07ToolsVsHooks.astro
rm -f src/sections/S08Sessions.astro
rm -f src/sections/S09Bundles.astro
rm -f src/sections/S10FoundationBridge.astro
rm -f src/sections/S11AgentsRecipes.astro
rm -f src/sections/S12CompletePicture.astro
rm -f src/sections/S13Appendix.astro

# Clean up empty directories
rmdir src/components/effects 2>/dev/null
rmdir src/components/scroll 2>/dev/null
rmdir src/components/content 2>/dev/null
rmdir src/components/sections 2>/dev/null
rmdir src/sections 2>/dev/null
rmdir src/scripts 2>/dev/null
```

**Step 2: Verify deletions**
```bash
cd ~/projects/amplifier-masterclass && find src -name "*.tsx" -o -name "*.astro" | sort
```
Expected output should only show:
```
src/layouts/MasterclassLayout.astro
src/pages/index.astro
```

---

### Task 3: Replace tokens.css with v3 light-theme tokens

**Files:**
- Replace: `src/styles/tokens.css`

**Step 1: Replace tokens.css**

Copy the v3 token file from the design directory over the v2 token file:
```bash
cd ~/projects/amplifier-masterclass && cp .design/tokens.css src/styles/tokens.css
```

**Step 2: Verify tokens are the v3 paper frame version**
```bash
cd ~/projects/amplifier-masterclass && head -5 src/styles/tokens.css
```
Expected: should show `Version: 3.0 — Paper Frame` in the header comment.

```bash
grep "bg-canvas" src/styles/tokens.css
```
Expected: `--bg-canvas:   #EDEBE6;` (the warm stone canvas, not any dark color).

---

### Task 4: Rewrite global.css

**Files:**
- Rewrite: `src/styles/global.css`

**Step 1: Write the new global.css**

The new global.css keeps the @font-face declarations (lines 33-121 of the old file) and the CSS reset (lines 127-149 of the old file). Everything else is deleted and replaced with the new paper frame base styles.

Replace the entire `src/styles/global.css` with:

```css
/*
 * Global Stylesheet — Amplifier Masterclass v3
 * Paper Frame: light, typographic, chapter-based
 *
 * 1. Design Tokens (import)
 * 2. Font Face Declarations (11 total: 4 Lora, 3 Inter, 4 Space Grotesk)
 * 3. Minimal Modern CSS Reset
 * 4. Base Styles (paper frame: warm canvas, white card)
 * 5. Typography Defaults
 * 6. Width Utilities (reading / wide / full)
 * 7. Inline Code
 * 8. Links
 * 9. Selection & Focus
 */


/* ─────────────────────────────────────────────────
 * 1. Design Tokens
 * ───────────────────────────────────────────────── */
@import './tokens.css';


/* ─────────────────────────────────────────────────
 * 2. Font Faces
 *
 * 11 files total. All local, all woff2, swap display.
 * Font paths use the Astro base path via /fonts/ which
 * resolves to /masterclass-preview/fonts/ in the build.
 * ───────────────────────────────────────────────── */

/* Lora — Reading Voice (4 weights) */
@font-face {
  font-family: 'Lora';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/lora-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/lora-500.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/lora-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Lora';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/lora-700.woff2') format('woff2');
}

/* Inter — Working Voice (3 weights) */
@font-face {
  font-family: 'Inter';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/inter-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/inter-500.woff2') format('woff2');
}

@font-face {
  font-family: 'Inter';
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/inter-600.woff2') format('woff2');
}

/* Space Grotesk — Precision Voice (4 weights) */
@font-face {
  font-family: 'Space Grotesk';
  font-weight: 400;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/space-grotesk-400.woff2') format('woff2');
}

@font-face {
  font-family: 'Space Grotesk';
  font-weight: 500;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/space-grotesk-500.woff2') format('woff2');
}

@font-face {
  font-family: 'Space Grotesk';
  font-weight: 600;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/space-grotesk-600.woff2') format('woff2');
}

@font-face {
  font-family: 'Space Grotesk';
  font-weight: 700;
  font-style: normal;
  font-display: swap;
  src: url('/fonts/space-grotesk-700.woff2') format('woff2');
}


/* ─────────────────────────────────────────────────
 * 3. Minimal Modern Reset
 * ───────────────────────────────────────────────── */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-text-size-adjust: 100%;
  text-size-adjust: 100%;
  scroll-behavior: smooth;
}

img, picture, video, canvas, svg {
  display: block;
  max-width: 100%;
}

input, button, textarea, select {
  font: inherit;
}

p, h1, h2, h3, h4, h5, h6 {
  overflow-wrap: break-word;
}


/* ─────────────────────────────────────────────────
 * 4. Base Styles — Paper Frame
 *
 * Warm canvas background. White card reading surface.
 * The body sets the canvas; the card is applied by
 * ChapterLayout.astro's .chapter-card container.
 * ───────────────────────────────────────────────── */
body {
  background-color: var(--bg-canvas);
  color: var(--text-secondary);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}


/* ─────────────────────────────────────────────────
 * 5. Typography Defaults
 *
 * h1, h2 — Lora (Reading Voice): chapter titles, section headings
 * h3     — Lora (Reading Voice): sub-section headings
 * Body   — Inter (Working Voice): inherited from body
 *
 * All headings use --text-primary (#1A1815 ink).
 * Body text uses --text-secondary (#6B6560 warm gray).
 * ───────────────────────────────────────────────── */
h1, h2 {
  font-family: var(--font-serif);
  font-weight: 600;
  line-height: var(--leading-tight);
  letter-spacing: -0.02em;
  color: var(--text-primary);
}

h1 {
  font-size: var(--text-4xl);
}

h2 {
  font-size: var(--text-3xl);
  line-height: var(--leading-snug);
  letter-spacing: -0.015em;
}

h3 {
  font-family: var(--font-serif);
  font-size: var(--text-2xl);
  font-weight: 600;
  line-height: var(--leading-snug);
  letter-spacing: -0.015em;
  color: var(--text-primary);
}

p {
  max-width: 65ch;
}


/* ─────────────────────────────────────────────────
 * 6. Width Utilities
 *
 * Three-width column system:
 *   .width-reading — 650px, default prose column
 *   .width-wide    — 1100px, diagrams and tables
 *   .width-full    — 100%, edge-to-edge spectacle
 *
 * All are centered via margin-inline: auto.
 * ───────────────────────────────────────────────── */
.width-reading {
  max-width: var(--measure-reading);
  margin-inline: auto;
}

.width-wide {
  max-width: var(--measure-wide);
  margin-inline: auto;
}

.width-full {
  max-width: 100%;
  margin-inline: auto;
}


/* ─────────────────────────────────────────────────
 * 7. Inline Code
 *
 * Monospace pill with warm background.
 * Uses --font-mono (Space Grotesk) for inline references.
 * Code blocks (pre code) reset the background.
 * ───────────────────────────────────────────────── */
code:not(pre code) {
  font-family: var(--font-mono);
  font-size: 0.9em;
  background: var(--bg-code);
  padding: 2px 6px;
  border-radius: var(--radius-sm);
  color: var(--text-primary);
}

pre code {
  background: none;
  padding: 0;
  border-radius: 0;
  font-size: inherit;
}


/* ─────────────────────────────────────────────────
 * 8. Links
 * ───────────────────────────────────────────────── */
a {
  color: var(--accent);
  text-decoration: underline;
  text-decoration-thickness: 1px;
  text-underline-offset: 2px;
  transition: color var(--duration-fast) var(--ease-default);
}

a:hover {
  color: var(--accent-hover);
}


/* ─────────────────────────────────────────────────
 * 9. Selection & Focus
 * ───────────────────────────────────────────────── */
::selection {
  background-color: var(--accent-bg);
  color: var(--text-primary);
}
```

**Step 2: Verify the file was written correctly**
```bash
cd ~/projects/amplifier-masterclass && wc -l src/styles/global.css && grep "bg-canvas" src/styles/global.css
```
Expected: ~230 lines, and `background-color: var(--bg-canvas);` for the body.

---

### Task 5: Create the chapters data file

**Files:**
- Delete: `src/data/sections.ts`
- Create: `src/data/chapters.ts`

**Step 1: Delete the old sections data**
```bash
rm -f ~/projects/amplifier-masterclass/src/data/sections.ts
```

**Step 2: Create src/data/chapters.ts**

This is the single data source for all chapter metadata. The `blocks` arrays come from the YAML frontmatter in `.design/sections/*.md`. They describe which content blocks each chapter uses and their placement order.

Create `src/data/chapters.ts`:

```typescript
export interface ChapterBlock {
  type: 'prose' | 'diagram' | 'table' | 'code' | 'vignette' | 'audio' | 'chat' | 'scrollytelling';
  id?: string;
  width?: 'reading' | 'wide' | 'full';
  placement?: string;
  status?: 'stub';
  rationale?: string;
  prompt?: string;
}

export interface Chapter {
  number: number;
  title: string;
  slug: string;
  lead: string;
  blocks: ChapterBlock[];
}

export const chapters: Chapter[] = [
  {
    number: 1,
    title: 'Introduction',
    slug: '1',
    lead: 'Amplifier is a framework for building your AI harness.',
    blocks: [
      { type: 'prose' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 2,
    title: 'The Architecture Map',
    slug: '2',
    lead: 'A map of the territory before we walk through it.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'architecture-overview', width: 'wide', placement: 'after-intro' },
      { type: 'diagram', id: 'architecture-interactive', width: 'full', placement: 'end-of-chapter' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 3,
    title: 'Design Philosophy',
    slug: '3',
    lead: 'Three ideas shape how Amplifier is built.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'mechanism-vs-policy-flow', width: 'wide', placement: 'after-hook-example' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 4,
    title: 'The Kernel',
    slug: '4',
    lead: 'Five things live in the kernel. Nothing else.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'kernel-components', width: 'wide', placement: 'after-intro' },
      { type: 'code', placement: 'mount-contract' },
      { type: 'vignette', id: 'kernel-five-things', width: 'wide', placement: 'after-component-list', status: 'stub', rationale: 'Animating the 5 components appearing one by one with brief descriptions would orient faster than reading a list' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 5,
    title: 'Module System',
    slug: '5',
    lead: 'Everything outside the kernel is a module.',
    blocks: [
      { type: 'prose' },
      { type: 'table', id: 'module-types', width: 'wide', placement: 'after-intro' },
      { type: 'code', placement: 'mount-contract' },
      { type: 'diagram', id: 'loading-order', width: 'wide', placement: 'after-loading-order' },
      { type: 'vignette', id: 'module-mount-lifecycle', width: 'wide', placement: 'after-mount-contract', status: 'stub', rationale: 'Animating the mount lifecycle would show the sequence that text describes linearly' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 6,
    title: 'The Orchestrator',
    slug: '6',
    lead: 'One module gets live access to the full system at runtime.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'reasoning-loop', width: 'wide', placement: 'after-privilege-gap' },
      { type: 'scrollytelling', id: 'one-turn-of-conversation', width: 'full', placement: 'after-flow-description' },
      { type: 'vignette', id: 'orchestrator-loop-explainer', width: 'wide', placement: 'after-diagram', status: 'stub', rationale: 'The 4-phase cycle is hard to grasp from text alone' },
      { type: 'chat', placement: 'end-of-chapter', status: 'stub', prompt: 'Have a question about how the orchestrator drives the agent loop?' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 7,
    title: 'Tools vs Hooks',
    slug: '7',
    lead: 'The critical distinction in the system.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'tools-vs-hooks-comparison', width: 'wide', placement: 'after-intro' },
      { type: 'diagram', id: 'inject-context-flow', width: 'wide', placement: 'after-code-quality-example' },
      { type: 'diagram', id: 'priority-cascade', width: 'reading', placement: 'after-cascade-description' },
      { type: 'vignette', id: 'hook-cascade-animation', width: 'wide', placement: 'after-cascade-diagram', status: 'stub', rationale: 'Animating the cascade with events flowing through deny/askuser/inject/modify/continue' },
      { type: 'chat', placement: 'end-of-chapter', status: 'stub', prompt: 'Not sure whether something should be a tool or a hook? Ask here.' },
    ],
  },
  {
    number: 8,
    title: 'Sessions',
    slug: '8',
    lead: 'A session is a container.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'session-lifecycle-timeline', width: 'wide', placement: 'after-four-phases' },
      { type: 'table', id: 'parent-child-comparison', width: 'wide', placement: 'after-parent-child' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 9,
    title: 'Bundles and Configuration',
    slug: '9',
    lead: 'Bundles are how you package and distribute capabilities.',
    blocks: [
      { type: 'prose' },
      { type: 'code', placement: 'minimal-bundle-example' },
      { type: 'diagram', id: 'composition-layers', width: 'wide', placement: 'after-composition' },
      { type: 'diagram', id: 'mention-resolution', width: 'wide', placement: 'after-mentions' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 10,
    title: 'The Foundation Bridge',
    slug: '10',
    lead: 'Foundation is how we use the kernel. It is not the only way.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'preparation-pipeline', width: 'wide', placement: 'after-pipeline-description' },
      { type: 'diagram', id: 'two-callbacks', width: 'wide', placement: 'after-callback-channels' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 11,
    title: 'Agents, Context Files, Skills, and Recipes',
    slug: '11',
    lead: 'Agents, skills, recipes: each one is built from pieces you have already seen.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'recipe-pipeline', width: 'wide', placement: 'after-recipes' },
      { type: 'vignette', id: 'recipe-workflow-animation', width: 'wide', placement: 'after-recipe-diagram', status: 'stub', rationale: 'Animating a 3-step recipe with data flowing between steps and an approval gate' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 12,
    title: 'The Complete Picture',
    slug: '12',
    lead: 'Each layer depends only on the one below it.',
    blocks: [
      { type: 'prose' },
      { type: 'diagram', id: 'six-layer-stack', width: 'wide', placement: 'after-layer-descriptions' },
      { type: 'diagram', id: 'full-system-flow', width: 'reading', placement: 'after-where-things-go' },
      { type: 'chat', placement: 'end-of-chapter', status: 'stub', prompt: 'Finished the masterclass. Have questions about any concept?' },
      { type: 'audio', status: 'stub' },
    ],
  },
  {
    number: 13,
    title: 'Appendix: Research Methodology',
    slug: '13',
    lead: 'How these facts were established.',
    blocks: [
      { type: 'prose' },
      { type: 'audio', status: 'stub' },
    ],
  },
];
```

**Step 3: Verify the data file compiles**
```bash
cd ~/projects/amplifier-masterclass && npx tsc --noEmit src/data/chapters.ts 2>&1
```
Expected: no errors. (Note: this may produce module resolution warnings in strict mode, which is fine as Astro handles imports at build time.)

---

### Task 6: Create NavBar.astro

**Files:**
- Create: `src/components/NavBar.astro`

**Step 1: Create the file**

Create `src/components/NavBar.astro`:

```astro
---
/**
 * NavBar.astro — Persistent top navigation bar
 *
 * 52px fixed bar at the top of every chapter page.
 * Left: chapter indicator ("4 · The Kernel") + hamburger toggle (☰)
 * Right: audio stub ("▶ Listen", disabled)
 *
 * The hamburger toggles the TOCOverlay via a custom event.
 * Chapter indicator uses Space Grotesk 500, uppercase.
 */

interface Props {
  chapterNumber: number;
  chapterTitle: string;
}

const { chapterNumber, chapterTitle } = Astro.props;
---

<nav class="navbar" role="navigation" aria-label="Chapter navigation">
  <div class="navbar__inner">
    <button
      class="navbar__chapter-toggle"
      type="button"
      aria-expanded="false"
      aria-controls="toc-overlay"
      aria-label="Open table of contents"
    >
      <span class="navbar__chapter-indicator">
        <span class="navbar__chapter-number">{chapterNumber}</span>
        <span class="navbar__chapter-sep">&middot;</span>
        <span class="navbar__chapter-title">{chapterTitle}</span>
      </span>
      <span class="navbar__hamburger" aria-hidden="true">&#9776;</span>
    </button>

    <div class="navbar__audio-stub" aria-disabled="true">
      <span class="navbar__audio-icon" aria-hidden="true">&#9654;</span>
      <span class="navbar__audio-label">Listen</span>
    </div>
  </div>
</nav>

<style>
  .navbar {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 52px;
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-default);
    box-shadow: var(--shadow-nav);
    z-index: var(--z-nav);
    display: flex;
    align-items: center;
  }

  .navbar__inner {
    width: 100%;
    max-width: var(--measure-container);
    margin-inline: auto;
    padding-inline: var(--container-pad);
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 100%;
  }

  .navbar__chapter-toggle {
    display: flex;
    align-items: center;
    gap: var(--space-3);
    background: none;
    border: none;
    cursor: pointer;
    padding: var(--space-2) var(--space-3);
    margin: calc(-1 * var(--space-2)) calc(-1 * var(--space-3));
    border-radius: var(--radius-sm);
    transition: background var(--duration-fast) var(--ease-default);
  }

  .navbar__chapter-toggle:hover {
    background: var(--bg-muted);
  }

  .navbar__chapter-indicator {
    display: flex;
    align-items: center;
    gap: 0.5em;
    font-family: var(--font-mono);
    font-weight: 500;
    font-size: var(--text-sm);
    text-transform: uppercase;
    letter-spacing: 0.06em;
    color: var(--text-primary);
  }

  .navbar__chapter-number {
    color: var(--text-muted);
  }

  .navbar__chapter-sep {
    color: var(--text-muted);
  }

  .navbar__hamburger {
    font-size: 1.25rem;
    color: var(--text-muted);
    line-height: 1;
  }

  .navbar__audio-stub {
    display: flex;
    align-items: center;
    gap: var(--space-2);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--text-muted);
    opacity: 0.5;
    cursor: not-allowed;
    user-select: none;
  }

  .navbar__audio-icon {
    font-size: 0.75rem;
  }

  .navbar__audio-label {
    font-weight: 400;
  }
</style>

<script>
  const toggle = document.querySelector('.navbar__chapter-toggle');
  if (toggle) {
    toggle.addEventListener('click', () => {
      const expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!expanded));
      document.dispatchEvent(new CustomEvent('toc-toggle', { detail: { open: !expanded } }));
    });

    // Listen for TOC close events to sync the aria-expanded state
    document.addEventListener('toc-close', () => {
      toggle.setAttribute('aria-expanded', 'false');
    });
  }
</script>
```

**Step 2: Verify the file exists**
```bash
ls -la ~/projects/amplifier-masterclass/src/components/NavBar.astro
```

---

### Task 7: Create TOCOverlay.astro

**Files:**
- Create: `src/components/TOCOverlay.astro`

**Step 1: Create the file**

Create `src/components/TOCOverlay.astro`:

```astro
---
/**
 * TOCOverlay.astro — Full chapter table of contents dropdown
 *
 * Hidden by default. Toggled by NavBar's hamburger button.
 * Lists all 13 chapters. Current chapter highlighted with --accent.
 * Click navigates to the chapter and closes the overlay.
 */

import { chapters } from '../data/chapters';

interface Props {
  currentChapter: number;
}

const { currentChapter } = Astro.props;
const base = import.meta.env.BASE_URL;
---

<div id="toc-overlay" class="toc-overlay" role="dialog" aria-label="Table of contents" aria-hidden="true">
  <div class="toc-overlay__backdrop"></div>
  <div class="toc-overlay__panel">
    <p class="toc-overlay__heading">Contents</p>
    <ol class="toc-overlay__list">
      {chapters.map((ch) => (
        <li class:list={['toc-overlay__item', { 'toc-overlay__item--active': ch.number === currentChapter }]}>
          <a href={`${base}chapters/${ch.slug}/`} class="toc-overlay__link">
            <span class="toc-overlay__number">{ch.number}</span>
            <span class="toc-overlay__title">{ch.title}</span>
          </a>
        </li>
      ))}
    </ol>
  </div>
</div>

<style>
  .toc-overlay {
    position: fixed;
    inset: 0;
    z-index: var(--z-toc-overlay);
    pointer-events: none;
    opacity: 0;
    transition: opacity var(--duration-slow) var(--ease-out);
  }

  .toc-overlay[aria-hidden="false"] {
    pointer-events: auto;
    opacity: 1;
  }

  .toc-overlay__backdrop {
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.2);
  }

  .toc-overlay__panel {
    position: absolute;
    top: 52px; /* below nav bar */
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    max-width: var(--measure-container);
    padding: var(--space-6) var(--container-pad);
    background: var(--bg-card);
    border-bottom: 1px solid var(--border-default);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
    max-height: calc(100vh - 52px);
    overflow-y: auto;
  }

  .toc-overlay__heading {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    text-transform: uppercase;
    letter-spacing: 0.08em;
    color: var(--text-muted);
    margin-bottom: var(--space-4);
  }

  .toc-overlay__list {
    list-style: none;
    display: flex;
    flex-direction: column;
    gap: var(--space-1);
  }

  .toc-overlay__link {
    display: flex;
    align-items: baseline;
    gap: var(--space-3);
    padding: var(--space-2) var(--space-3);
    border-radius: var(--radius-sm);
    text-decoration: none;
    color: var(--text-secondary);
    transition: background var(--duration-fast) var(--ease-default),
                color var(--duration-fast) var(--ease-default);
  }

  .toc-overlay__link:hover {
    background: var(--bg-muted);
    color: var(--text-primary);
  }

  .toc-overlay__number {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--text-muted);
    min-width: 1.5em;
  }

  .toc-overlay__title {
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: 400;
  }

  .toc-overlay__item--active .toc-overlay__link {
    color: var(--accent);
    background: var(--accent-bg);
  }

  .toc-overlay__item--active .toc-overlay__number {
    color: var(--accent);
  }

  @media (max-width: 768px) {
    .toc-overlay__panel {
      padding: var(--space-4) var(--container-pad);
    }
  }
</style>

<script>
  const overlay = document.getElementById('toc-overlay');
  const backdrop = overlay?.querySelector('.toc-overlay__backdrop');

  function openTOC() {
    overlay?.setAttribute('aria-hidden', 'false');
  }

  function closeTOC() {
    overlay?.setAttribute('aria-hidden', 'true');
    document.dispatchEvent(new CustomEvent('toc-close'));
  }

  // Listen for NavBar toggle events
  document.addEventListener('toc-toggle', ((e: CustomEvent) => {
    if (e.detail.open) {
      openTOC();
    } else {
      closeTOC();
    }
  }) as EventListener);

  // Close when clicking the backdrop
  backdrop?.addEventListener('click', closeTOC);

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay?.getAttribute('aria-hidden') === 'false') {
      closeTOC();
    }
  });
</script>
```

---

### Task 8: Create ChapterLayout.astro

**Files:**
- Delete: `src/layouts/MasterclassLayout.astro`
- Create: `src/layouts/ChapterLayout.astro`

**Step 1: Delete the old layout**
```bash
rm -f ~/projects/amplifier-masterclass/src/layouts/MasterclassLayout.astro
```

**Step 2: Create src/layouts/ChapterLayout.astro**

```astro
---
/**
 * ChapterLayout.astro — Root layout for the paper-frame masterclass
 *
 * Structure:
 *   <body>          — warm canvas background (--bg-canvas)
 *     <NavBar>      — fixed 52px top bar with chapter indicator
 *     <TOCOverlay>  — hidden dropdown with all 13 chapters
 *     <main>        — white card container (--bg-card)
 *       <slot>      — chapter content goes here
 *     </main>
 *
 * The card is the reading surface. On desktop it floats on the canvas
 * with margins, shadow, and rounded corners. On mobile (<768px)
 * the card goes full-width — no visible canvas.
 */

import '../styles/global.css';
import NavBar from '../components/NavBar.astro';
import TOCOverlay from '../components/TOCOverlay.astro';

interface Props {
  title?: string;
  chapterNumber: number;
  chapterTitle: string;
}

const {
  title = 'Amplifier Masterclass',
  chapterNumber,
  chapterTitle,
} = Astro.props;
---

<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <meta name="description" content="An educational walkthrough of the Amplifier AI agent framework." />
  <title>{`${chapterTitle} — ${title}`}</title>
  <link rel="icon" type="image/png" sizes="32x32" href={`${import.meta.env.BASE_URL}favicon.png`} />
  <link rel="apple-touch-icon" sizes="180x180" href={`${import.meta.env.BASE_URL}apple-touch-icon.png`} />
  <link rel="icon" type="image/png" sizes="192x192" href={`${import.meta.env.BASE_URL}icon-192.png`} />
</head>
<body>
  <NavBar chapterNumber={chapterNumber} chapterTitle={chapterTitle} />
  <TOCOverlay currentChapter={chapterNumber} />

  <main class="chapter-card">
    <article class="chapter-content">
      <slot />
    </article>
  </main>
</body>
</html>

<style>
  .chapter-card {
    max-width: var(--measure-container);
    margin-inline: auto;
    margin-top: calc(52px + var(--space-8)); /* below fixed nav + breathing room */
    margin-bottom: var(--space-16);
    background: var(--bg-card);
    border-radius: var(--radius-md);
    box-shadow: var(--shadow-card);
    padding: var(--space-24) var(--container-pad);
    min-height: 80vh;
  }

  .chapter-content {
    /* Content blocks handle their own widths via .width-reading, .width-wide, etc. */
    width: 100%;
  }

  /* Mobile: card becomes the page */
  @media (max-width: 768px) {
    .chapter-card {
      margin-top: 52px; /* just below the nav, no extra gap */
      margin-bottom: 0;
      border-radius: 0;
      box-shadow: none;
      padding: var(--space-12) var(--container-pad);
      min-height: calc(100vh - 52px);
    }
  }
</style>
```

---

### Task 9: Create the dynamic chapter route

**Files:**
- Rewrite: `src/pages/index.astro`
- Create: `src/pages/chapters/[chapter].astro`

**Step 1: Create the chapters directory**
```bash
mkdir -p ~/projects/amplifier-masterclass/src/pages/chapters
```

**Step 2: Create src/pages/chapters/[chapter].astro**

This is a proof-of-concept page that renders the chapter title and lead sentence. In Phase 3, this will be expanded to render full chapter content with block components.

```astro
---
/**
 * [chapter].astro — Dynamic route for individual chapters
 *
 * getStaticPaths returns 13 paths (one per chapter).
 * Each page renders through ChapterLayout.
 *
 * For Phase 1, this is a minimal proof of concept:
 * chapter entry (eyebrow + title + lead) and a placeholder body.
 * Phase 2 adds block components. Phase 3 composes full chapters.
 */

import ChapterLayout from '../../layouts/ChapterLayout.astro';
import { chapters } from '../../data/chapters';
import type { Chapter } from '../../data/chapters';

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

// Determine previous/next chapters for navigation
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
  <!-- Chapter Entry -->
  <header class="chapter-entry width-reading">
    <p class="chapter-entry__eyebrow">Chapter {chapter.number}</p>
    <h1 class="chapter-entry__title">{chapter.title}</h1>
    <p class="chapter-entry__lead">{chapter.lead}</p>
  </header>

  <!-- Placeholder body — replaced in Phase 3 -->
  <div class="chapter-body width-reading">
    <p>Chapter content will be composed here using block components (Phase 2 &amp; 3).</p>
  </div>

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
  /* ── Chapter Entry ── */
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
    margin-bottom: var(--space-6);
  }

  .chapter-entry__lead {
    font-size: var(--text-lg);
    color: var(--text-secondary);
    max-width: 55ch;
  }

  /* ── Placeholder Body ── */
  .chapter-body {
    margin-bottom: var(--space-24);
  }

  .chapter-body p {
    color: var(--text-muted);
    font-style: italic;
  }

  /* ── Chapter Navigation ── */
  .chapter-nav {
    display: flex;
    justify-content: space-between;
    gap: var(--space-8);
    padding-top: var(--space-16);
    border-top: 1px solid var(--border-default);
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

**Step 3: Rewrite src/pages/index.astro to redirect to Chapter 1**

```astro
---
/**
 * index.astro — Redirects to Chapter 1
 *
 * The root URL sends the reader to the first chapter.
 * This is a zero-JS redirect using Astro's built-in redirect.
 */

return Astro.redirect(`${import.meta.env.BASE_URL}chapters/1/`);
---
```

---

### Task 10: Build and verify

**Step 1: Build the project**
```bash
cd ~/projects/amplifier-masterclass && npx astro build 2>&1 | tail -15
```
Expected: successful build generating 14 pages (index redirect + 13 chapter pages).

**Step 2: Deploy**
```bash
cd ~/projects/amplifier-masterclass && rsync -a --delete dist/ ~/masterclass-preview/
```

**Step 3: Verify the built output**
```bash
# Check that chapter 1 HTML exists
ls -la ~/projects/amplifier-masterclass/dist/chapters/1/index.html

# Verify the chapter entry structure
grep -o "Chapter 1" ~/projects/amplifier-masterclass/dist/chapters/1/index.html | head -3

# Verify the nav bar renders
grep "navbar" ~/projects/amplifier-masterclass/dist/chapters/1/index.html | head -3

# Verify the TOC overlay has all 13 chapters
grep -c "toc-overlay__item" ~/projects/amplifier-masterclass/dist/chapters/1/index.html
```
Expected: the file exists, "Chapter 1" appears, navbar renders, and 13 TOC items exist.

**Step 4: Verify another chapter exists**
```bash
grep "Chapter 6" ~/projects/amplifier-masterclass/dist/chapters/6/index.html | head -2
grep "The Orchestrator" ~/projects/amplifier-masterclass/dist/chapters/6/index.html | head -2
```
Expected: both the chapter number and title appear.

---

### Task 11: Commit Phase 1

**Step 1: Stage and commit all changes**
```bash
cd ~/projects/amplifier-masterclass
git add -A
git status
```

Review the status. It should show:
- Deleted: all v2 components, sections, scripts, old layout
- Modified: `package.json`, `astro.config.mjs`, `tsconfig.json`, `src/styles/tokens.css`, `src/styles/global.css`
- New: `src/data/chapters.ts`, `src/components/NavBar.astro`, `src/components/TOCOverlay.astro`, `src/layouts/ChapterLayout.astro`, `src/pages/chapters/[chapter].astro`, `src/pages/index.astro` (rewritten)

```bash
git commit -m "feat: phase 1 — paper frame foundation with chapter routing

- Remove React, GSAP, Lenis, Phosphor Icons
- Delete all v2 components (ParticleSwarm, GlassCard, BlurReveal, etc.)
- Delete all v2 section pages (S01-S13)
- Replace dark-mode tokens with v3 paper-frame tokens
- Rewrite global.css for light theme (warm canvas, white card)
- Create chapters.ts data source (13 chapters with block declarations)
- Create NavBar.astro (52px fixed bar with chapter indicator)
- Create TOCOverlay.astro (dropdown with all 13 chapters)
- Create ChapterLayout.astro (paper frame: canvas + card + nav)
- Create dynamic chapter route [chapter].astro with prev/next nav
- Redirect index.astro to Chapter 1"
```
