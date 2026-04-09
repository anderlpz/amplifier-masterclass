# Amplifier Masterclass — Phase 1: Foundation Implementation Plan

> **Execution:** Use the subagent-driven-development workflow to implement this plan.

**Goal:** Stand up a new Astro project at `~/projects/amplifier-masterclass/` with the design system, navigation shell, scroll infrastructure, and one section (Introduction) rendering end-to-end as proof of concept.

**Architecture:** Standalone Astro project with React islands for client-side interactivity (scroll engine, TOC active-state tracking). Static output targeting GitHub Pages. Content copied from the `_learnings/dotgraphs/.design/sections/` drafting area into the project as source of truth.

**Tech Stack:** Astro 6, React 19, GSAP 3.14, Lenis 1.3, TypeScript, CSS Custom Properties (no Tailwind), Phosphor Icons (React), self-hosted Google Fonts (Lora, Inter, Space Grotesk).

**Design Reference:** `.design/MASTERCLASS-EXPERIENCE-DESIGN.md`

---

## Section Map (for TOC data)

These are the 13 sections the sidebar TOC must list. Only s1 (Introduction) is built in Phase 1 — the rest appear in the TOC as non-interactive placeholders.

| ID | Label | Background |
|----|-------|-----------|
| s1 | Introduction | primary-dark |
| s2 | Architecture Map | primary-dark |
| s3 | Design Philosophy | palette-break |
| s4 | The Kernel | primary-dark |
| s5 | Module System | secondary-dark |
| s6 | The Orchestrator | primary-dark |
| s7 | Tools vs Hooks | secondary-dark |
| s8 | Sessions | primary-dark |
| s9 | Bundles & Configuration | secondary-dark |
| s10 | Foundation Bridge | primary-dark |
| s11 | Agents, Context Files & Recipes | secondary-dark |
| s12 | The Complete Picture | palette-break |
| s13 | Appendix & Methodology | primary-dark |

---

### Task 1: Scaffold the Astro project

**Files:**
- Create: `~/projects/amplifier-masterclass/package.json`
- Create: `~/projects/amplifier-masterclass/astro.config.mjs`
- Create: `~/projects/amplifier-masterclass/tsconfig.json`
- Create: `~/projects/amplifier-masterclass/.gitignore`

**Step 1: Create the project directory and initialize git**

```bash
mkdir -p ~/projects/amplifier-masterclass
cd ~/projects/amplifier-masterclass
git init
```

**Step 2: Create `package.json`**

Create the file `package.json` at the project root with these exact contents:

```json
{
  "name": "amplifier-masterclass",
  "type": "module",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "astro dev --host 0.0.0.0",
    "build": "astro build",
    "preview": "astro preview"
  },
  "dependencies": {
    "@astrojs/react": "^5.0.2",
    "@phosphor-icons/react": "^2.1.7",
    "@types/react": "^19.2.14",
    "@types/react-dom": "^19.2.3",
    "astro": "^6.1.3",
    "gsap": "^3.14.2",
    "lenis": "^1.3.21",
    "react": "^19.2.4",
    "react-dom": "^19.2.4",
    "typescript": "^5.9.3"
  }
}
```

> **Note on d3/d3-graphviz:** These are Phase 3 dependencies (interactive graph explorer). Do not install them now — it keeps the initial bundle lean and avoids unnecessary complexity.

**Step 3: Create `astro.config.mjs`**

```js
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

export default defineConfig({
  output: 'static',
  integrations: [react()],
  server: {
    host: '0.0.0.0',
    port: 4321,
  },
});
```

**Step 4: Create `tsconfig.json`**

```json
{
  "extends": "astro/tsconfigs/strict",
  "compilerOptions": {
    "jsx": "react-jsx",
    "jsxImportSource": "react"
  }
}
```

**Step 5: Create `.gitignore`**

```
node_modules/
dist/
.astro/
.DS_Store
```

**Step 6: Create the directory structure**

```bash
cd ~/projects/amplifier-masterclass
mkdir -p src/layouts
mkdir -p src/components/navigation
mkdir -p src/components/sections
mkdir -p src/components/content
mkdir -p src/components/scroll
mkdir -p src/pages
mkdir -p src/styles
mkdir -p src/data
mkdir -p public/fonts
```

**Step 7: Install dependencies**

```bash
cd ~/projects/amplifier-masterclass
npm install
```

Run: `npm install`
Expected: Clean install with no errors. The `node_modules/` directory is created. You should see packages like `astro`, `react`, `gsap`, `lenis` in the output.

**Step 8: Verify Astro runs**

Create a minimal placeholder page so `astro dev` has something to serve. Create `src/pages/index.astro`:

```astro
---
// Placeholder — replaced in Task 13
---
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Amplifier Masterclass</title>
</head>
<body>
  <h1>Amplifier Masterclass — scaffolding works</h1>
</body>
</html>
```

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds. Output in `dist/` directory. Terminal shows something like `▶ Built in X.XXs`.

**Step 9: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add -A
git commit -m "feat: scaffold Astro project with React integration"
```

---

### Task 2: Download and self-host fonts

**Files:**
- Create: `public/fonts/lora-v35-latin-regular.woff2` (and 3 more Lora weights)
- Create: `public/fonts/inter-v18-latin-regular.woff2` (and 2 more Inter weights)
- Create: `public/fonts/space-grotesk-v16-latin-regular.woff2` (and 3 more Space Grotesk weights)

**Step 1: Download all font files**

Use the [google-webfonts-helper](https://gwfh.mranftl.com/fonts) API or download directly from Google Fonts. The easiest approach is to use `curl` against the google-webfonts-helper API:

```bash
cd ~/projects/amplifier-masterclass/public/fonts

# Lora — weights: 400, 500, 600, 700
curl -L -o lora-v35-latin-regular.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787weuxJBkq0.woff2"
curl -L -o lora-v35-latin-500.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787wsuxJBkq0.woff2"
curl -L -o lora-v35-latin-600.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787zAvBJBkq0.woff2"
curl -L -o lora-v35-latin-700.woff2 "https://fonts.gstatic.com/s/lora/v35/0QI6MX1D_JOuGQbT0gvTJPa787z5vBJBkq0.woff2"

# Inter — weights: 400, 500, 600
curl -L -o inter-v18-latin-regular.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuLyfAZ9hjQ.woff2"
curl -L -o inter-v18-latin-500.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuI6fAZ9hjQ.woff2"
curl -L -o inter-v18-latin-600.woff2 "https://fonts.gstatic.com/s/inter/v18/UcCO3FwrK3iLTeHuS_nVMrMxCp50SjIw2boKoduKmMEVuGKYAZ9hjQ.woff2"

# Space Grotesk — weights: 400, 500, 600, 700
curl -L -o space-grotesk-v16-latin-regular.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj62UUsjNsFjTDJK.woff2"
curl -L -o space-grotesk-v16-latin-500.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj6oUUsjNsFjTDJK.woff2"
curl -L -o space-grotesk-v16-latin-600.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7EXksjNsFjTDJK.woff2"
curl -L -o space-grotesk-v16-latin-700.woff2 "https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-gOoraIAEj7EXksjNsFjTDJK.woff2"
```

> **If the Google Fonts URLs have changed or return 404:** Go to https://gwfh.mranftl.com/fonts, search each font name, select the weights listed above, choose "Modern Browsers" (woff2 only), and download the zip. Extract the `.woff2` files into `public/fonts/`. The exact filenames don't matter as long as the `@font-face` declarations in Task 4 point to the correct files.

**Step 2: Verify files exist**

Run: `ls -la ~/projects/amplifier-masterclass/public/fonts/`
Expected: 11 `.woff2` files totaling roughly 200-400KB combined. Each file should be non-zero size (at least 10KB each).

If any file is 0 bytes or an HTML error page, the URL was wrong. Use the manual download approach from https://gwfh.mranftl.com/fonts instead.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add public/fonts/
git commit -m "feat: self-host Lora, Inter, Space Grotesk fonts (woff2)"
```

---

### Task 3: Author `tokens.css`

**Files:**
- Create: `src/styles/tokens.css`

This is the design token system from the design doc — the charcoal/azure/cream palette, IYO product page register. It replaces the old navy-blue tokens from the previous `_learnings/dotgraphs/.design/tokens.css`.

**Step 1: Create `src/styles/tokens.css`**

```css
/* =============================================================================
   tokens.css — Amplifier Masterclass Design System
   Version: 3.0 — Charcoal/Azure/Cream (IYO product page register)
   
   All custom properties live under :root.
   This file is the shared bridge between the masterclass and withamplifier.com.
   ============================================================================= */

:root {

  /* ===========================================================================
     § 1.1 · COLORS — Background Tones
     Three-tone structured dark system (IYO product page approach).
     Predominantly dark. Pearl-grey used sparingly (1-2 conceptual sections).
     =========================================================================== */

  --bg-primary:   #242426;   /* Default canvas — most sections              */
  --bg-secondary: #3d3d40;   /* Rhythm variation — alternating tech sections */
  --bg-break:     #e0e1e6;   /* Pearl-grey — rare conceptual punctuation     */

  /* ===========================================================================
     § 1.2 · COLORS — Accent
     Azure is precious: TOC indicator, interactive affordances, key labels only.
     =========================================================================== */

  --accent:          #0082EB;
  --accent-hover:    #0092F3;
  --accent-glow:     rgba(0, 130, 235, 0.30);
  --accent-tint:     rgba(0, 130, 235, 0.15);
  --accent-subtle:   rgba(0, 130, 235, 0.06);

  /* ===========================================================================
     § 1.3 · COLORS — Text
     Cream body for sustained reading comfort on dark. White headlines for pop.
     =========================================================================== */

  /* On dark backgrounds */
  --text-headline:   #FAFAF8;                      /* Bright white headlines  */
  --text-body:       #E8E6DC;                      /* Warm cream body text    */
  --text-muted:      #87867F;                      /* Muted labels, captions  */
  --text-dimmed:     rgba(255, 255, 255, 0.4);     /* De-emphasized content   */

  /* On palette-break (pearl-grey) backgrounds */
  --text-headline-on-light: #1a1a1c;              /* Near-black headlines    */
  --text-body-on-light:     #3d3d40;              /* Dark grey body text     */
  --text-muted-on-light:    #87867F;              /* Same muted tone         */

  /* ===========================================================================
     § 1.4 · COLORS — Borders & Dividers
     Hairline dividers are the default surface language for sequential content.
     =========================================================================== */

  --border-hairline:       rgba(255, 255, 255, 0.10);  /* 1px dividers on dark  */
  --border-hairline-hover: rgba(255, 255, 255, 0.18);  /* Hover state           */
  --border-on-light:       rgba(0, 0, 0, 0.08);        /* Dividers on pearl-grey */

  /* ===========================================================================
     § 2.1 · GLASS — IYO-style frosted cards
     Reserved for collections of parallel items only. Never for prose.
     backdrop-filter: blur needs textured background behind to look premium.
     =========================================================================== */

  --glass-bg:      rgba(33, 33, 33, 0.35);
  --glass-border:  rgba(169, 194, 242, 0.10);
  --glass-blur:    blur(15px);
  --glass-radius:  28px;

  /* ===========================================================================
     § 3.1 · TYPOGRAPHY — Font Families
     Lora = READ (headlines). Inter = LEARN (body). Space Grotesk = REFERENCE (labels).
     =========================================================================== */

  --font-serif: 'Lora', Georgia, 'Times New Roman', serif;
  --font-sans:  'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  --font-mono:  'Space Grotesk', 'SF Mono', 'Fira Code', monospace;

  /* ===========================================================================
     § 3.2 · TYPOGRAPHY — Type Scale (fluid via clamp)
     Viewport-fluid headlines for monumental presence on large screens.
     Body stays fixed for readability.
     =========================================================================== */

  --text-xs:   0.75rem;                          /*  12px — small labels       */
  --text-sm:   0.875rem;                         /*  14px — captions, eyebrows */
  --text-base: 1rem;                             /*  16px — body text          */
  --text-lg:   1.125rem;                         /*  18px — lead paragraphs    */
  --text-xl:   1.25rem;                          /*  20px — subheadings        */
  --text-2xl:  clamp(1.5rem, 2vw, 1.75rem);     /*  24–28px — h3              */
  --text-3xl:  clamp(1.875rem, 3vw, 2.25rem);   /*  30–36px — h2              */
  --text-4xl:  clamp(2.25rem, 4vw, 3rem);       /*  36–48px — h1              */
  --text-5xl:  clamp(2.75rem, 5vw, 3.75rem);    /*  44–60px — hero headline   */

  /* ===========================================================================
     § 3.3 · TYPOGRAPHY — Line Heights
     =========================================================================== */

  --leading-tight:  1.15;   /* Headlines                */
  --leading-snug:   1.35;   /* Subheadings              */
  --leading-normal: 1.65;   /* Body text (reading ease) */
  --leading-loose:  1.80;   /* Conceptual sections      */

  /* ===========================================================================
     § 4.1 · SPACING — 8px base grid
     Every value is a multiple of 8 (except --space-xs = 4px for tight gaps).
     =========================================================================== */

  --space-xs:      4px;
  --space-sm:      8px;
  --space-md:      16px;
  --space-lg:      24px;
  --space-xl:      32px;
  --space-2xl:     48px;
  --space-3xl:     64px;
  --space-4xl:     80px;
  --space-section: 120px;

  /* ===========================================================================
     § 4.2 · LAYOUT
     =========================================================================== */

  --content-max:    720px;    /* Main content column max width             */
  --container-max:  1200px;   /* Overall container max width               */
  --sidebar-width:  240px;    /* TOC sidebar on desktop                    */
  --container-pad:  40px;     /* Horizontal padding (desktop)              */

  /* ===========================================================================
     § 5 · BORDER RADIUS
     =========================================================================== */

  --radius-sm:   6px;
  --radius-md:   12px;
  --radius-lg:   16px;
  --radius-xl:   24px;
  --radius-full: 9999px;

  /* ===========================================================================
     § 6 · MOTION — Duration & Easing
     Entrance-only and hover-reactive. No loops. No auto-animation.
     =========================================================================== */

  --duration-fast:   150ms;
  --duration-base:   250ms;
  --duration-slow:   400ms;
  --duration-reveal: 700ms;

  /* IYO-inspired spring easing — subtle overshoot for entrances */
  --ease-spring:  cubic-bezier(.625, .05, 0, 1);
  /* Settle easing — for elements coming to rest */
  --ease-settle:  cubic-bezier(.22, 1, .36, 1);
  /* Default out easing — for reveals */
  --ease-out:     cubic-bezier(0.16, 1, 0.3, 1);

  --stagger-delay: 80ms;

  /* ===========================================================================
     § 7 · Z-INDEX LAYERS
     Managed scale. No ad-hoc z-index values outside this table.
     =========================================================================== */

  --z-base:       1;
  --z-content:    5;
  --z-card:       10;
  --z-sidebar:    50;
  --z-nav:        100;
  --z-progress:   150;
  --z-overlay:    1000;
}

/* =============================================================================
   § 8 · RESPONSIVE OVERRIDES
   ============================================================================= */

@media (max-width: 1024px) {
  :root {
    --container-pad: 24px;
    --sidebar-width: 200px;
  }
}

@media (max-width: 768px) {
  :root {
    --space-section: 64px;
    --container-pad: 20px;
    --sidebar-width: 0px;  /* Sidebar hidden on mobile */
  }
}

@media (max-width: 480px) {
  :root {
    --space-section: 48px;
    --container-pad: 16px;
  }
}

/* =============================================================================
   § 9 · REDUCED MOTION
   Zero all durations. Content always visible — animation is enhancement.
   ============================================================================= */

@media (prefers-reduced-motion: reduce) {
  :root {
    --duration-fast:   0.01ms;
    --duration-base:   0.01ms;
    --duration-slow:   0.01ms;
    --duration-reveal: 0.01ms;
  }

  *,
  *::before,
  *::after {
    transition-duration: 0.01ms !important;
    animation-duration:  0.01ms !important;
  }
}
```

**Step 2: Verify the file has no syntax errors**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds. (The tokens file isn't imported yet, but this confirms no breaking changes.)

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/styles/tokens.css
git commit -m "feat: design token system — charcoal/azure/cream palette"
```

---

### Task 4: Author `global.css`

**Files:**
- Create: `src/styles/global.css`

This file contains `@font-face` declarations pointing to the self-hosted font files, a CSS reset, base dark styles, scrollbar hiding, and the focus indicator.

**Step 1: Create `src/styles/global.css`**

```css
/* =============================================================================
   global.css — Amplifier Masterclass Base Styles
   Imports tokens.css. Defines @font-face, reset, base dark styles.
   ============================================================================= */

/* ---------------------------------------------------------------------------
   § 1 · FONT FACES — Self-hosted from /fonts/
   --------------------------------------------------------------------------- */

/* Lora — Serif — Headlines */
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/lora-v35-latin-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/lora-v35-latin-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/lora-v35-latin-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Lora';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/lora-v35-latin-700.woff2') format('woff2');
}

/* Inter — Sans-serif — Body */
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/inter-v18-latin-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/inter-v18-latin-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Inter';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/inter-v18-latin-600.woff2') format('woff2');
}

/* Space Grotesk — Mono-heritage sans — Labels & technical */
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 400;
  font-display: swap;
  src: url('/fonts/space-grotesk-v16-latin-regular.woff2') format('woff2');
}
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 500;
  font-display: swap;
  src: url('/fonts/space-grotesk-v16-latin-500.woff2') format('woff2');
}
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 600;
  font-display: swap;
  src: url('/fonts/space-grotesk-v16-latin-600.woff2') format('woff2');
}
@font-face {
  font-family: 'Space Grotesk';
  font-style: normal;
  font-weight: 700;
  font-display: swap;
  src: url('/fonts/space-grotesk-v16-latin-700.woff2') format('woff2');
}

/* ---------------------------------------------------------------------------
   § 2 · RESET
   --------------------------------------------------------------------------- */

*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-rendering: optimizeLegibility;
}

/* ---------------------------------------------------------------------------
   § 3 · BASE STYLES — Dark canvas default
   --------------------------------------------------------------------------- */

body {
  background-color: var(--bg-primary);
  color: var(--text-body);
  font-family: var(--font-sans);
  font-size: var(--text-base);
  line-height: var(--leading-normal);
  overflow-x: hidden;
}

/* ---------------------------------------------------------------------------
   § 4 · SCROLLBAR — Hidden for Lenis smooth scroll feel
   --------------------------------------------------------------------------- */

html {
  scrollbar-width: none;           /* Firefox */
}
html::-webkit-scrollbar {
  display: none;                   /* Chrome, Safari, Edge */
}

/* ---------------------------------------------------------------------------
   § 5 · TYPOGRAPHY DEFAULTS
   --------------------------------------------------------------------------- */

h1, h2, h3, h4, h5, h6 {
  font-family: var(--font-serif);
  color: var(--text-headline);
  line-height: var(--leading-tight);
  font-weight: 600;
}

h1 { font-size: var(--text-5xl); }
h2 { font-size: var(--text-4xl); }
h3 { font-size: var(--text-3xl); }
h4 { font-size: var(--text-2xl); }

p {
  margin-bottom: var(--space-lg);
}

a {
  color: var(--accent);
  text-decoration: none;
  transition: color var(--duration-fast) var(--ease-out);
}
a:hover {
  color: var(--accent-hover);
}

/* ---------------------------------------------------------------------------
   § 6 · FOCUS INDICATORS — keyboard navigation
   --------------------------------------------------------------------------- */

:focus-visible {
  outline: 2px solid var(--accent);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

/* ---------------------------------------------------------------------------
   § 7 · SELECTION
   --------------------------------------------------------------------------- */

::selection {
  background: var(--accent-tint);
  color: var(--text-headline);
}
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/styles/global.css
git commit -m "feat: global styles — font-face, reset, base dark typography"
```

---

### Task 5: Build `Section.astro`

**Files:**
- Create: `src/components/sections/Section.astro`

The base section wrapper. Every section in the masterclass is wrapped in this component. It handles: correct background color based on a variant prop, vertical padding, centered content column, and a `data-section` attribute for IntersectionObserver.

**Step 1: Create `src/components/sections/Section.astro`**

```astro
---
/**
 * Section.astro — Base section wrapper
 *
 * Every masterclass section is wrapped in this. It provides:
 * - Background color (primary-dark | secondary-dark | palette-break)
 * - Vertical section padding
 * - Centered content column with max-width
 * - data-section attribute for TOC IntersectionObserver
 */

interface Props {
  /** Unique section ID, used for anchor links and TOC tracking (e.g., "s1", "s2") */
  id: string;
  /** Eyebrow label shown above the section heading (e.g., "INTRODUCTION") */
  label: string;
  /** Background tone variant */
  background?: 'primary-dark' | 'secondary-dark' | 'palette-break';
}

const { id, label, background = 'primary-dark' } = Astro.props;
---

<section
  id={id}
  class:list={['section', `section--${background}`]}
  data-section={id}
  data-section-label={label}
>
  <div class="section__inner">
    <slot />
  </div>
</section>

<style>
  .section {
    position: relative;
    padding: var(--space-section) 0;
    min-height: 60vh;
  }

  .section--primary-dark {
    background-color: var(--bg-primary);
    color: var(--text-body);
  }

  .section--secondary-dark {
    background-color: var(--bg-secondary);
    color: var(--text-body);
  }

  .section--palette-break {
    background-color: var(--bg-break);
    color: var(--text-body-on-light);
  }

  /* Headlines flip color on palette-break */
  .section--palette-break :global(h1),
  .section--palette-break :global(h2),
  .section--palette-break :global(h3),
  .section--palette-break :global(h4) {
    color: var(--text-headline-on-light);
  }

  .section__inner {
    max-width: var(--content-max);
    margin: 0 auto;
    padding: 0 var(--container-pad);
  }
</style>
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/sections/Section.astro
git commit -m "feat: Section wrapper component with background variants"
```

---

### Task 6: Build `ScrollProvider.tsx`

**Files:**
- Create: `src/components/scroll/ScrollProvider.tsx`

This is a React island (`client:only="react"`) that initializes Lenis smooth scroll driven by GSAP's ticker. Ported from the production-quality pattern in `(internal reference)`. Key behaviors: `autoRaf: false` (GSAP ticker drives Lenis), `lenis.on('scroll')` fires `ScrollTrigger.update()`, `gsap.ticker.lagSmoothing(0)`, respects `prefers-reduced-motion`.

**Step 1: Create `src/components/scroll/ScrollProvider.tsx`**

```tsx
/**
 * ScrollProvider.tsx — React island for Lenis + GSAP scroll engine
 *
 * Usage in Astro:
 *   <ScrollProvider client:only="react">
 *     <slot />
 *   </ScrollProvider>
 *
 * Ported from withamplifier/lib/scroll.ts.
 * Key: autoRaf:false — GSAP ticker drives Lenis so scrub animations stay in sync.
 */

import { useEffect, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

interface ScrollProviderProps {
  children?: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
  useEffect(() => {
    // Always register ScrollTrigger — needed for scrub/pin even with native scroll
    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    let lenis: Lenis | null = null;
    let tickerCb: ((time: number) => void) | null = null;

    if (!prefersReducedMotion) {
      // autoRaf: false is required when driving Lenis via GSAP's ticker.
      // Without it Lenis also runs its own RAF loop, causing double-frame stepping
      // that makes scroll feel broken/doubled.
      lenis = new Lenis({ autoRaf: false });

      // Keep ScrollTrigger's scroll position in sync with Lenis interpolated value
      lenis.on('scroll', () => ScrollTrigger.update());

      // Drive Lenis from GSAP's unified ticker so scrub animations stay in sync.
      // GSAP time is in seconds; Lenis.raf expects DOMHighResTimeStamp (ms).
      tickerCb = (time: number) => lenis!.raf(time * 1000);
      gsap.ticker.add(tickerCb);

      // Disable GSAP lag-smoothing so Lenis never receives a jumpy time delta
      gsap.ticker.lagSmoothing(0);
    }

    // Cleanup on unmount
    return () => {
      if (tickerCb) {
        gsap.ticker.remove(tickerCb);
      }
      lenis?.destroy();
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  return <>{children}</>;
}
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds. The React island won't hydrate until it's used in a page with `client:only="react"`, but the module should compile cleanly.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/scroll/ScrollProvider.tsx
git commit -m "feat: ScrollProvider — Lenis + GSAP ticker integration (React island)"
```

---

### Task 7: Build `SidebarTOC.astro`

**Files:**
- Create: `src/data/sections.ts`
- Create: `src/components/navigation/SidebarTOC.astro`

The persistent left sidebar TOC (Glasswing-inspired). Fixed position, outside content column. Renders all 13 section links. Client-side JS uses IntersectionObserver to track the active section. Active state: brighter text + 8px azure dot that scales in over 250ms. Fades out at the hero.

**Step 1: Create the section data file `src/data/sections.ts`**

This is the single source of truth for all section metadata. The TOC, TopNav, and future section components all read from here.

```ts
/**
 * sections.ts — Single source of truth for masterclass section metadata.
 *
 * Every component that needs section info (TOC, TopNav, progress bar,
 * section components) imports from here. Add/remove/reorder sections
 * in one place and navigation updates everywhere.
 */

export interface SectionMeta {
  /** Unique ID used as the HTML id attribute and anchor target (e.g., "s1") */
  id: string;
  /** Display label in the TOC and top nav */
  label: string;
  /** Background tone for the Section component */
  background: 'primary-dark' | 'secondary-dark' | 'palette-break';
  /** Whether this section is built yet (Phase 1: only s1) */
  implemented: boolean;
}

export const sections: SectionMeta[] = [
  { id: 's1',  label: 'Introduction',                      background: 'primary-dark',   implemented: true  },
  { id: 's2',  label: 'Architecture Map',                  background: 'primary-dark',   implemented: false },
  { id: 's3',  label: 'Design Philosophy',                 background: 'palette-break',  implemented: false },
  { id: 's4',  label: 'The Kernel',                        background: 'primary-dark',   implemented: false },
  { id: 's5',  label: 'Module System',                     background: 'secondary-dark', implemented: false },
  { id: 's6',  label: 'The Orchestrator',                  background: 'primary-dark',   implemented: false },
  { id: 's7',  label: 'Tools vs Hooks',                    background: 'secondary-dark', implemented: false },
  { id: 's8',  label: 'Sessions',                          background: 'primary-dark',   implemented: false },
  { id: 's9',  label: 'Bundles & Configuration',           background: 'secondary-dark', implemented: false },
  { id: 's10', label: 'Foundation Bridge',                  background: 'primary-dark',   implemented: false },
  { id: 's11', label: 'Agents, Context Files & Recipes',   background: 'secondary-dark', implemented: false },
  { id: 's12', label: 'The Complete Picture',               background: 'palette-break',  implemented: false },
  { id: 's13', label: 'Appendix & Methodology',            background: 'primary-dark',   implemented: false },
];
```

**Step 2: Create `src/components/navigation/SidebarTOC.astro`**

```astro
---
/**
 * SidebarTOC.astro — Persistent left sidebar table of contents
 *
 * Glasswing-inspired: no border, no background, just floating text + dot indicator.
 * Scroll-synced via IntersectionObserver (inline <script>).
 * Fades out when hero/top of page is visible, fades in when content begins.
 * On mobile (< 768px): hidden entirely — TopNav handles mobile navigation.
 */

import { sections } from '../../data/sections';
---

<nav class="sidebar-toc" id="sidebar-toc" aria-label="Table of contents">
  <ol class="sidebar-toc__list">
    {sections.map((section) => (
      <li class="sidebar-toc__item" data-toc-target={section.id}>
        <a
          href={section.implemented ? `#${section.id}` : undefined}
          class:list={[
            'sidebar-toc__link',
            { 'sidebar-toc__link--disabled': !section.implemented }
          ]}
          aria-disabled={!section.implemented ? 'true' : undefined}
        >
          <span class="sidebar-toc__dot" aria-hidden="true"></span>
          <span class="sidebar-toc__label">{section.label}</span>
        </a>
      </li>
    ))}
  </ol>
</nav>

<script>
  /**
   * TOC active-state tracking via IntersectionObserver.
   * Observes every element with [data-section]. When a section enters the viewport
   * (top 30% threshold), its matching TOC item gets the --active class.
   */
  function initTOC() {
    const tocItems = document.querySelectorAll<HTMLElement>('[data-toc-target]');
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    const sidebar = document.getElementById('sidebar-toc');

    if (!tocItems.length || !sections.length || !sidebar) return;

    // Track the active section
    let currentActive: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the most-visible section
        let bestEntry: IntersectionObserverEntry | null = null;
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry;
            }
          }
        }

        if (bestEntry) {
          const sectionId = (bestEntry.target as HTMLElement).dataset.section;
          if (sectionId && sectionId !== currentActive) {
            currentActive = sectionId;

            // Update TOC active states
            tocItems.forEach((item) => {
              const isActive = item.dataset.tocTarget === sectionId;
              item.classList.toggle('sidebar-toc__item--active', isActive);
            });
          }
        }
      },
      {
        // Trigger when 20% of the section is visible, biased toward top of viewport
        threshold: [0, 0.2, 0.4],
        rootMargin: '-10% 0px -60% 0px',
      }
    );

    sections.forEach((section) => observer.observe(section));

    // Fade sidebar based on scroll position (hide when near top/hero)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const fadeThreshold = window.innerHeight * 0.3;
      sidebar.style.opacity = scrollY > fadeThreshold ? '1' : '0';
      sidebar.style.pointerEvents = scrollY > fadeThreshold ? 'auto' : 'none';
    };

    // Use 'scroll' event (Lenis dispatches native scroll events)
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Set initial state
  }

  // Run on page load
  document.addEventListener('DOMContentLoaded', initTOC);
  // Also run on Astro page transitions if added later
  document.addEventListener('astro:page-load', initTOC);
</script>

<style>
  .sidebar-toc {
    position: fixed;
    top: 50%;
    left: var(--space-xl);
    transform: translateY(-50%);
    z-index: var(--z-sidebar);
    width: var(--sidebar-width);

    /* Start invisible — fade in on scroll */
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--duration-slow) var(--ease-out);
  }

  .sidebar-toc__list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .sidebar-toc__item {
    margin-bottom: var(--space-xs);
  }

  .sidebar-toc__link {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    padding: var(--space-xs) 0;
    text-decoration: none;
    color: var(--text-muted);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    font-weight: 400;
    transition: color var(--duration-base) var(--ease-out);
    cursor: pointer;
  }

  .sidebar-toc__link:hover {
    color: var(--text-body);
  }

  .sidebar-toc__link--disabled {
    cursor: default;
    opacity: 0.4;
  }
  .sidebar-toc__link--disabled:hover {
    color: var(--text-muted);
  }

  /* The indicator dot */
  .sidebar-toc__dot {
    flex-shrink: 0;
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background-color: var(--text-muted);
    transform: scale(0.5);
    transition:
      transform var(--duration-base) var(--ease-spring),
      background-color var(--duration-base) var(--ease-out);
  }

  /* Active state */
  .sidebar-toc__item--active .sidebar-toc__link {
    color: var(--text-headline);
    font-weight: 500;
  }

  .sidebar-toc__item--active .sidebar-toc__dot {
    background-color: var(--accent);
    transform: scale(1);
  }

  /* Hidden on mobile — TopNav handles navigation */
  @media (max-width: 768px) {
    .sidebar-toc {
      display: none;
    }
  }
</style>
```

**Step 3: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 4: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/data/sections.ts src/components/navigation/SidebarTOC.astro
git commit -m "feat: SidebarTOC — Glasswing-style persistent sidebar with scroll tracking"
```

---

### Task 8: Build `ProgressBar.astro`

**Files:**
- Create: `src/components/navigation/ProgressBar.astro`

A thin 2px bar at the very top of the viewport. Fixed position, highest z-index. Width scales from 0% to 100% as the user scrolls down the page. Azure accent color.

**Step 1: Create `src/components/navigation/ProgressBar.astro`**

```astro
---
/**
 * ProgressBar.astro — Page-level scroll progress indicator
 *
 * 2px azure bar at the top of the viewport.
 * Width tracks scroll progress (0% at top, 100% at bottom).
 * Uses scroll event listener (works with Lenis — Lenis dispatches native scroll).
 */
---

<div class="progress-bar" id="progress-bar" aria-hidden="true">
  <div class="progress-bar__fill" id="progress-bar-fill"></div>
</div>

<script>
  function initProgressBar() {
    const fill = document.getElementById('progress-bar-fill');
    if (!fill) return;

    const updateProgress = () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      fill.style.width = `${Math.min(progress, 100)}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress(); // Set initial state
  }

  document.addEventListener('DOMContentLoaded', initProgressBar);
  document.addEventListener('astro:page-load', initProgressBar);
</script>

<style>
  .progress-bar {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 2px;
    z-index: var(--z-progress);
    background: transparent;
    pointer-events: none;
  }

  .progress-bar__fill {
    height: 100%;
    width: 0%;
    background-color: var(--accent);
    transition: width 100ms linear;
    will-change: width;
  }
</style>
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/navigation/ProgressBar.astro
git commit -m "feat: ProgressBar — 2px azure scroll progress indicator"
```

---

### Task 9: Build `TopNav.astro`

**Files:**
- Create: `src/components/navigation/TopNav.astro`

Compact sticky top bar. Contains: left = "Amplifier" text logo (links to withamplifier.com); center = current section name in Space Grotesk uppercase (updated via IntersectionObserver — shares tracking with sidebar); right = "Presentation Mode · 72 slides" label. On mobile, adds a "Contents" toggle that opens a dropdown with the full section list (replacing the hidden sidebar).

**Step 1: Create `src/components/navigation/TopNav.astro`**

```astro
---
/**
 * TopNav.astro — Compact sticky top navigation bar
 *
 * Desktop: logo | current section name | presentation mode label
 * Mobile: logo | current section name | contents toggle (dropdown TOC)
 *
 * Current section name updates via the same IntersectionObserver as SidebarTOC.
 * The observer in SidebarTOC also updates the #topnav-section-label element.
 */

import { sections } from '../../data/sections';
---

<header class="topnav" id="topnav">
  <div class="topnav__inner">
    <!-- Left: Logo -->
    <a href="https://withamplifier.com" class="topnav__logo" target="_blank" rel="noopener">
      Amplifier
    </a>

    <!-- Center: Current section name -->
    <span class="topnav__section" id="topnav-section-label">
      Masterclass
    </span>

    <!-- Right: Actions -->
    <div class="topnav__actions">
      <span class="topnav__presentation">
        Presentation Mode · 72 slides
      </span>

      <!-- Mobile: Contents toggle -->
      <button
        class="topnav__contents-toggle"
        id="topnav-contents-toggle"
        aria-expanded="false"
        aria-controls="topnav-dropdown"
      >
        Contents
      </button>
    </div>
  </div>

  <!-- Mobile dropdown TOC -->
  <nav
    class="topnav__dropdown"
    id="topnav-dropdown"
    aria-label="Table of contents"
    hidden
  >
    <ol class="topnav__dropdown-list">
      {sections.map((section) => (
        <li class="topnav__dropdown-item" data-mobile-toc-target={section.id}>
          <a
            href={section.implemented ? `#${section.id}` : undefined}
            class:list={[
              'topnav__dropdown-link',
              { 'topnav__dropdown-link--disabled': !section.implemented }
            ]}
          >
            {section.label}
          </a>
        </li>
      ))}
    </ol>
  </nav>
</header>

<script>
  function initTopNav() {
    const toggle = document.getElementById('topnav-contents-toggle');
    const dropdown = document.getElementById('topnav-dropdown');
    const sectionLabel = document.getElementById('topnav-section-label');
    const topnav = document.getElementById('topnav');

    if (!toggle || !dropdown || !topnav) return;

    // Toggle mobile dropdown
    toggle.addEventListener('click', () => {
      const isExpanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', String(!isExpanded));
      dropdown.hidden = isExpanded;
    });

    // Close dropdown when a link is clicked
    dropdown.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        toggle.setAttribute('aria-expanded', 'false');
        dropdown.hidden = true;
      });
    });

    // Update the center section label when the active section changes
    // This watches for class changes on sidebar TOC items set by SidebarTOC's observer
    const tocItems = document.querySelectorAll<HTMLElement>('[data-toc-target]');
    const mobileTocItems = document.querySelectorAll<HTMLElement>('[data-mobile-toc-target]');

    const updateSectionLabel = () => {
      const activeItem = document.querySelector('.sidebar-toc__item--active [data-toc-target]') as HTMLElement
        || document.querySelector('.sidebar-toc__item--active') as HTMLElement;

      if (activeItem && sectionLabel) {
        const targetId = activeItem.dataset.tocTarget;
        if (targetId) {
          const section = document.querySelector(`[data-section="${targetId}"]`) as HTMLElement;
          if (section) {
            sectionLabel.textContent = section.dataset.sectionLabel || 'Masterclass';
          }
        }
      }

      // Also sync mobile TOC active states
      mobileTocItems.forEach((item) => {
        const targetId = item.dataset.mobileTocTarget;
        const sidebarItem = document.querySelector(`[data-toc-target="${targetId}"]`);
        const isActive = sidebarItem?.classList.contains('sidebar-toc__item--active') ?? false;
        item.classList.toggle('topnav__dropdown-item--active', isActive);
      });
    };

    // Poll for changes — simpler than MutationObserver for this case
    // Runs every 200ms, lightweight
    setInterval(updateSectionLabel, 200);

    // Show/hide topnav based on scroll position (appear after hero)
    const handleScroll = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const threshold = window.innerHeight * 0.15;
      topnav.classList.toggle('topnav--visible', scrollY > threshold);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  document.addEventListener('DOMContentLoaded', initTopNav);
  document.addEventListener('astro:page-load', initTopNav);
</script>

<style>
  .topnav {
    position: fixed;
    top: 2px; /* Below the progress bar */
    left: 0;
    width: 100%;
    z-index: var(--z-nav);
    background: rgba(36, 36, 38, 0.85);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border-hairline);

    /* Start hidden, appear on scroll */
    opacity: 0;
    transform: translateY(-100%);
    transition:
      opacity var(--duration-slow) var(--ease-out),
      transform var(--duration-slow) var(--ease-out);
    pointer-events: none;
  }

  .topnav--visible {
    opacity: 1;
    transform: translateY(0);
    pointer-events: auto;
  }

  .topnav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    max-width: var(--container-max);
    margin: 0 auto;
    padding: var(--space-sm) var(--container-pad);
    height: 48px;
  }

  .topnav__logo {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 600;
    color: var(--text-headline);
    text-decoration: none;
    letter-spacing: 0.02em;
    text-transform: uppercase;
  }
  .topnav__logo:hover {
    color: var(--accent);
  }

  .topnav__section {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .topnav__actions {
    display: flex;
    align-items: center;
    gap: var(--space-md);
  }

  .topnav__presentation {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--text-muted);
  }

  .topnav__contents-toggle {
    display: none; /* Hidden on desktop */
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-body);
    text-transform: uppercase;
    letter-spacing: 0.05em;
    background: none;
    border: 1px solid var(--border-hairline);
    border-radius: var(--radius-sm);
    padding: var(--space-xs) var(--space-sm);
    cursor: pointer;
    transition: border-color var(--duration-fast) var(--ease-out);
  }
  .topnav__contents-toggle:hover {
    border-color: var(--border-hairline-hover);
  }

  /* Mobile dropdown */
  .topnav__dropdown {
    background: rgba(36, 36, 38, 0.95);
    backdrop-filter: blur(15px);
    -webkit-backdrop-filter: blur(15px);
    border-top: 1px solid var(--border-hairline);
    padding: var(--space-md) var(--container-pad);
    max-height: 60vh;
    overflow-y: auto;
  }

  .topnav__dropdown-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .topnav__dropdown-item {
    margin-bottom: 2px;
  }

  .topnav__dropdown-link {
    display: block;
    padding: var(--space-sm) var(--space-md);
    font-family: var(--font-sans);
    font-size: var(--text-sm);
    color: var(--text-muted);
    text-decoration: none;
    border-radius: var(--radius-sm);
    transition: color var(--duration-fast) var(--ease-out);
  }
  .topnav__dropdown-link:hover {
    color: var(--text-body);
  }
  .topnav__dropdown-link--disabled {
    opacity: 0.4;
    cursor: default;
  }

  .topnav__dropdown-item--active .topnav__dropdown-link {
    color: var(--text-headline);
    font-weight: 500;
  }

  /* Mobile adjustments */
  @media (max-width: 768px) {
    .topnav__presentation {
      display: none;
    }
    .topnav__contents-toggle {
      display: block;
    }
  }
</style>
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/navigation/TopNav.astro
git commit -m "feat: TopNav — sticky bar with section tracking and mobile dropdown"
```

---

### Task 10: Build `MasterclassLayout.astro`

**Files:**
- Create: `src/layouts/MasterclassLayout.astro`

The shell layout composing all pieces: imports `tokens.css` and `global.css`, renders `ScrollProvider` wrapping everything, `ProgressBar` at top, `TopNav` below it, `SidebarTOC` on the left, and a `<main>` slot for content in the center-right column.

**Step 1: Create `src/layouts/MasterclassLayout.astro`**

```astro
---
/**
 * MasterclassLayout.astro — The shell layout for the masterclass
 *
 * Composes: tokens.css + global.css, ScrollProvider, ProgressBar, TopNav, SidebarTOC.
 * Content goes in the <slot /> which renders inside the <main> element.
 *
 * Layout grid (desktop):
 *   [sidebar 240px] [main content — centered, max-width 720px] [rest]
 *
 * On mobile (< 768px):
 *   Sidebar hidden. TopNav handles navigation. Full-width content.
 */

import '../styles/tokens.css';
import '../styles/global.css';
import ProgressBar from '../components/navigation/ProgressBar.astro';
import TopNav from '../components/navigation/TopNav.astro';
import SidebarTOC from '../components/navigation/SidebarTOC.astro';
import ScrollProvider from '../components/scroll/ScrollProvider';
---

<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="A comprehensive educational walkthrough of Amplifier — a framework for building AI harnesses with predictable structure." />
  <title>Amplifier Masterclass</title>
</head>
<body>
  <ScrollProvider client:only="react">
    <!-- This wrapper exists so React can wrap children. The actual nav
         components are rendered outside React's tree (Astro islands). -->
  </ScrollProvider>

  <ProgressBar />
  <TopNav />
  <SidebarTOC />

  <main class="masterclass-main" id="masterclass-content">
    <slot />
  </main>
</body>
</html>

<style is:global>
  /* Layout: sidebar offset on desktop, centered content */
  .masterclass-main {
    position: relative;
    /* On desktop, shift content right to make room for the fixed sidebar */
    padding-left: calc(var(--sidebar-width) + var(--space-3xl));
  }

  @media (max-width: 768px) {
    .masterclass-main {
      padding-left: 0;
    }
  }
</style>
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds. (The placeholder `index.astro` doesn't use this layout yet — that's Task 13.)

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/layouts/MasterclassLayout.astro
git commit -m "feat: MasterclassLayout — shell composing nav, scroll, and content slot"
```

---

### Task 11: Build content components

**Files:**
- Create: `src/components/content/Eyebrow.astro`
- Create: `src/components/content/NumberedRow.astro`
- Create: `src/components/content/FloatingVisual.astro`
- Create: `src/components/content/UpNextTeaser.astro`

These are the content primitives needed for the Introduction section. Each is a small, focused Astro component.

**Step 1: Create `src/components/content/Eyebrow.astro`**

The section eyebrow label — small, dimmer text with bullet prefix (e.g., `• INTRODUCTION`). This is the first element in every section opening per the IYO information density pattern: eyebrow → headline → paragraph.

```astro
---
/**
 * Eyebrow.astro — Section eyebrow label
 *
 * Small, dimmer text with bullet prefix. Establishes context before the headline.
 * Pattern: • THE KERNEL, • MODULE SYSTEM, etc.
 */

interface Props {
  /** The label text (will be uppercased via CSS) */
  label: string;
}

const { label } = Astro.props;
---

<p class="eyebrow">
  <span class="eyebrow__bullet" aria-hidden="true">•</span>
  <span class="eyebrow__text">{label}</span>
</p>

<style>
  .eyebrow {
    display: flex;
    align-items: center;
    gap: var(--space-sm);
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.12em;
    margin-bottom: var(--space-lg);
  }

  .eyebrow__bullet {
    font-size: var(--text-sm);
    line-height: 1;
  }
</style>
```

**Step 2: Create `src/components/content/NumberedRow.astro`**

A horizontal row showing a number, label, and description with a hairline divider below. Used for listing items within sections (e.g., Kernel's 5 components, module types).

```astro
---
/**
 * NumberedRow.astro — Numbered item row with hairline divider
 *
 * Renders: 01 | Label | Description
 * Hairline divider (1px rgba) below each row.
 * Number in azure, label in white, description in cream.
 */

interface Props {
  /** The number to display (e.g., "01", "02") */
  number: string;
  /** The item label (displayed prominently) */
  label: string;
  /** The description text */
  description: string;
}

const { number, label, description } = Astro.props;
---

<div class="numbered-row">
  <span class="numbered-row__number">{number}</span>
  <div class="numbered-row__content">
    <span class="numbered-row__label">{label}</span>
    <p class="numbered-row__description">{description}</p>
  </div>
</div>

<style>
  .numbered-row {
    display: flex;
    gap: var(--space-lg);
    padding: var(--space-lg) 0;
    border-bottom: 1px solid var(--border-hairline);
    align-items: baseline;
  }

  .numbered-row:last-child {
    border-bottom: none;
  }

  .numbered-row__number {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--accent);
    flex-shrink: 0;
    min-width: 2ch;
  }

  .numbered-row__content {
    flex: 1;
  }

  .numbered-row__label {
    display: block;
    font-family: var(--font-sans);
    font-size: var(--text-base);
    font-weight: 600;
    color: var(--text-headline);
    margin-bottom: var(--space-xs);
  }

  .numbered-row__description {
    font-size: var(--text-sm);
    color: var(--text-body);
    line-height: var(--leading-normal);
    margin-bottom: 0;
  }
</style>
```

**Step 3: Create `src/components/content/FloatingVisual.astro`**

An image/visual that floats on the background with no container, border, or card. Optional caption below in small muted text. For atmospheric visuals and diagrams.

```astro
---
/**
 * FloatingVisual.astro — Image floating on the background
 *
 * No container, no border, no card. The visual IS the surface.
 * Optional caption in small muted text below.
 */

interface Props {
  /** Path to the image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Optional caption displayed below the image */
  caption?: string;
  /** Max width constraint (default: 100%) */
  maxWidth?: string;
}

const { src, alt, caption, maxWidth = '100%' } = Astro.props;
---

<figure class="floating-visual" style={`max-width: ${maxWidth};`}>
  <img
    class="floating-visual__img"
    src={src}
    alt={alt}
    loading="lazy"
    decoding="async"
  />
  {caption && (
    <figcaption class="floating-visual__caption">{caption}</figcaption>
  )}
</figure>

<style>
  .floating-visual {
    margin: var(--space-3xl) auto;
  }

  .floating-visual__img {
    width: 100%;
    height: auto;
    display: block;
    border-radius: var(--radius-md);
  }

  .floating-visual__caption {
    font-family: var(--font-sans);
    font-size: var(--text-xs);
    color: var(--text-muted);
    text-align: center;
    margin-top: var(--space-sm);
    line-height: var(--leading-normal);
  }
</style>
```

**Step 4: Create `src/components/content/UpNextTeaser.astro`**

Section transition element at the bottom of a section. Shows "Next: {section}" and a teaser sentence. Subtle, not attention-grabbing — provides narrative continuity for linear readers.

```astro
---
/**
 * UpNextTeaser.astro — Section transition element
 *
 * Placed at the bottom of each section. Provides narrative continuity.
 * Subtle styling — muted, not a big interstitial.
 * Linear-journey users see the thread; random-access users skip via TOC.
 */

interface Props {
  /** The name of the next section */
  nextSection: string;
  /** A one-sentence teaser about the next section */
  teaser: string;
  /** The anchor ID to link to (e.g., "s2") */
  nextId: string;
}

const { nextSection, teaser, nextId } = Astro.props;
---

<div class="up-next">
  <a href={`#${nextId}`} class="up-next__link">
    <span class="up-next__label">Next</span>
    <span class="up-next__title">{nextSection}</span>
  </a>
  <p class="up-next__teaser">{teaser}</p>
</div>

<style>
  .up-next {
    margin-top: var(--space-4xl);
    padding-top: var(--space-xl);
    border-top: 1px solid var(--border-hairline);
  }

  .up-next__link {
    display: flex;
    align-items: baseline;
    gap: var(--space-sm);
    text-decoration: none;
    margin-bottom: var(--space-sm);
  }

  .up-next__label {
    font-family: var(--font-mono);
    font-size: var(--text-xs);
    font-weight: 500;
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
  }

  .up-next__title {
    font-family: var(--font-serif);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--text-headline);
    transition: color var(--duration-fast) var(--ease-out);
  }

  .up-next__link:hover .up-next__title {
    color: var(--accent);
  }

  .up-next__teaser {
    font-size: var(--text-sm);
    color: var(--text-muted);
    line-height: var(--leading-normal);
    margin-bottom: 0;
  }
</style>
```

**Step 5: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 6: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/content/
git commit -m "feat: content components — Eyebrow, NumberedRow, FloatingVisual, UpNextTeaser"
```

---

### Task 12: Build `S01Introduction.astro`

**Files:**
- Create: `src/components/sections/S01Introduction.astro`

The Introduction section with real content from `01-introduction.md`. Uses the Conceptual section treatment: generous spacing, editorial density, eyebrow → headline → paragraph pattern. Primary-dark background. Includes an UpNextTeaser pointing to Architecture Map.

**Content source:** `.design/sections/01-introduction.md`

The content from that file (excluding presentation slides and speaker notes, which are for Presentation Mode — deferred to Phase 2/3):

- Opening: "Amplifier is a framework for building AI agents."
- The harness metaphor
- The operating system parallel
- Reading this document guidance

**Step 1: Create `src/components/sections/S01Introduction.astro`**

```astro
---
/**
 * S01Introduction.astro — Section 1: Introduction
 *
 * Content mode: Conceptual (generous spacing, editorial density, serif-forward)
 * Background: primary-dark
 *
 * Content from: _learnings/dotgraphs/.design/sections/01-introduction.md
 * Presentation slides/speaker notes are NOT included here (deferred to Phase 2/3).
 */

import Section from './Section.astro';
import Eyebrow from '../content/Eyebrow.astro';
import UpNextTeaser from '../content/UpNextTeaser.astro';
---

<Section id="s1" label="Introduction" background="primary-dark">
  <div class="intro">
    <Eyebrow label="Introduction" />

    <h1 class="intro__headline">
      A framework for building<br />AI agents.
    </h1>

    <div class="intro__body">
      <p class="intro__lead">
        That sentence is deliberately plain. The thing it describes is not.
      </p>

      <p>
        An AI agent — a program that reasons about a task, takes actions, observes
        results, and decides what to do next — is hard to build well. The model
        (Claude, GPT, Gemini, whatever ships next month) handles reasoning.
        Everything else, from tools and memory to rules and connections to the
        outside world, needs structure. Amplifier provides that structure.
      </p>

      <p>
        The project calls itself an <em>agentic harness</em>. The word harness is
        precise. A climbing harness channels gravity into controlled movement. An
        electrical harness routes power where it needs to go. Amplifier does the
        same for an AI model: it wraps around the model and gives it a controlled
        way to interact with the world.
      </p>
    </div>

    <div class="intro__divider" aria-hidden="true"></div>

    <h2 class="intro__subhead">The operating system parallel</h2>

    <div class="intro__body">
      <p>
        You already know how this works, because you've used a computer. Your
        operating system has a kernel, tiny relative to everything else. The kernel
        handles fundamentals: memory management, task scheduling, hardware
        communication. The web browser, the file manager, every app runs on top of
        the kernel through well-defined interfaces.
      </p>

      <p>
        Amplifier applies this same architecture to AI agents. A small, unchanging
        core at the center handles fundamentals: loading modules, dispatching events,
        managing sessions. Everything else — which AI model to use, what tools the
        agent can access, how conversations are stored, what rules the agent
        follows — plugs in as a module from the outside.
      </p>

      <p>
        New AI model? Write a provider module. Safety rules? Add a hook module.
        Different reasoning strategy? Swap the orchestrator. The kernel stays
        unchanged. It provides infrastructure; modules provide behavior.
      </p>
    </div>

    <div class="intro__divider" aria-hidden="true"></div>

    <h2 class="intro__subhead">Reading this document</h2>

    <div class="intro__body">
      <p>
        This walkthrough covers the full architecture front-to-back. It starts with
        a map of the system, then works through each major piece. Sections build on
        each other, but each one also stands alone. Jump to hooks if that's what you
        need.
      </p>

      <p>
        The architecture diagram in the next section is a reference map. You'll
        return to it.
      </p>
    </div>

    <UpNextTeaser
      nextSection="Architecture Map"
      teaser="The whole system at a glance — a reference map you'll return to."
      nextId="s2"
    />
  </div>
</Section>

<style>
  .intro {
    /* Conceptual mode: generous spacing, editorial feel */
  }

  .intro__headline {
    font-size: var(--text-5xl);
    font-weight: 600;
    line-height: var(--leading-tight);
    margin-bottom: var(--space-3xl);
    max-width: 14ch; /* Constrain for dramatic line breaks */
  }

  .intro__lead {
    font-size: var(--text-lg);
    color: var(--text-body);
    line-height: var(--leading-loose);
    margin-bottom: var(--space-xl);
  }

  .intro__body {
    max-width: 65ch; /* Optimal reading width */
    line-height: var(--leading-loose);
  }

  .intro__body p {
    margin-bottom: var(--space-xl);
  }

  .intro__body em {
    font-style: italic;
    color: var(--text-headline);
  }

  .intro__divider {
    width: 48px;
    height: 1px;
    background-color: var(--border-hairline);
    margin: var(--space-3xl) 0;
  }

  .intro__subhead {
    font-size: var(--text-3xl);
    font-weight: 600;
    margin-bottom: var(--space-xl);
  }
</style>
```

**Step 2: Verify build**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds.

**Step 3: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add src/components/sections/S01Introduction.astro
git commit -m "feat: S01Introduction — Introduction section with real content"
```

---

### Task 13: Wire `index.astro` and end-to-end verification

**Files:**
- Modify: `src/pages/index.astro` (replace the placeholder from Task 1)

This is the integration task. Wire the layout, the Introduction section, and all navigation components together. Then verify everything works end-to-end in the browser.

**Step 1: Replace `src/pages/index.astro` with the full page**

Overwrite the file completely with:

```astro
---
/**
 * index.astro — Amplifier Masterclass entry page
 *
 * Phase 1: Renders the MasterclassLayout shell with S01Introduction.
 * The sidebar TOC shows all 13 sections but only s1 is clickable/present.
 * Remaining sections are added in Phase 2.
 */

import MasterclassLayout from '../layouts/MasterclassLayout.astro';
import S01Introduction from '../components/sections/S01Introduction.astro';
---

<MasterclassLayout>
  <!-- Hero spacer — gives the page breathing room at the top
       and ensures the TOC/TopNav fade-in works (they appear after scrolling past this) -->
  <div class="hero-spacer" aria-hidden="true">
    <div class="hero-spacer__content">
      <p class="hero-spacer__eyebrow">Amplifier</p>
      <h1 class="hero-spacer__title">Masterclass</h1>
      <p class="hero-spacer__subtitle">The complete architecture, explained.</p>
    </div>
  </div>

  <S01Introduction />

  <!-- Placeholder for remaining sections (Phase 2) -->
  <div class="coming-soon" aria-hidden="true">
    <p class="coming-soon__text">12 more sections coming in Phase 2</p>
  </div>
</MasterclassLayout>

<style>
  .hero-spacer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    padding: var(--space-section) var(--container-pad);
    text-align: center;
    background-color: var(--bg-primary);
  }

  .hero-spacer__eyebrow {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    font-weight: 500;
    color: var(--accent);
    text-transform: uppercase;
    letter-spacing: 0.15em;
    margin-bottom: var(--space-lg);
  }

  .hero-spacer__title {
    font-family: var(--font-serif);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--text-headline);
    line-height: var(--leading-tight);
    margin-bottom: var(--space-lg);
  }

  .hero-spacer__subtitle {
    font-family: var(--font-sans);
    font-size: var(--text-lg);
    color: var(--text-muted);
    margin-bottom: 0;
  }

  .coming-soon {
    padding: var(--space-section) var(--container-pad);
    text-align: center;
    background-color: var(--bg-secondary);
    min-height: 30vh;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .coming-soon__text {
    font-family: var(--font-mono);
    font-size: var(--text-sm);
    color: var(--text-muted);
    text-transform: uppercase;
    letter-spacing: 0.08em;
    margin-bottom: 0;
  }
</style>
```

**Step 2: Build and verify no errors**

Run: `cd ~/projects/amplifier-masterclass && npx astro build`
Expected: Build succeeds with zero errors. Output files appear in `dist/`.

**Step 3: Start the dev server and verify in browser**

Run: `cd ~/projects/amplifier-masterclass && npx astro dev --host 0.0.0.0`

Open the browser to `http://localhost:4321`. Verify the following checklist:

| # | What to check | Expected behavior |
|---|---------------|-------------------|
| 1 | **Page loads** | Dark charcoal background (#242426). No white flash. |
| 2 | **Hero spacer visible** | "Amplifier / Masterclass" centered in the viewport, full-height. |
| 3 | **Fonts rendering** | Lora for "Masterclass" headline, Inter for body text, Space Grotesk for "AMPLIFIER" eyebrow. If fonts didn't download correctly in Task 2, you'll see system fallbacks — fix the font files. |
| 4 | **Scrollbar hidden** | No visible scrollbar on the right side of the viewport. |
| 5 | **Smooth scroll** | Scrolling feels physical and weighted (Lenis). If `prefers-reduced-motion` is enabled in your OS, scroll will be native — that's correct. |
| 6 | **Progress bar** | Thin 2px azure bar at the very top grows from left to right as you scroll down. |
| 7 | **TopNav appears** | After scrolling ~15% past the hero, a translucent dark bar slides in at the top with "AMPLIFIER" on the left and "Masterclass" in the center. |
| 8 | **TopNav section label updates** | When the Introduction section is in view, the center label changes to "Introduction". |
| 9 | **Sidebar TOC** | After scrolling past 30% of the hero viewport, the sidebar fades in on the left. All 13 section names listed vertically. Introduction has a bright white label and a blue dot. Other sections are dimmed/muted. |
| 10 | **TOC active tracking** | The "Introduction" item in the sidebar has the blue dot indicator (active). Other items remain muted gray. |
| 11 | **Introduction content** | The section shows: eyebrow (• INTRODUCTION in azure), headline ("A framework for building AI agents."), body text with the harness metaphor, the OS parallel, and reading guidance. |
| 12 | **Typography** | Headlines are Lora serif. Body is Inter sans. Eyebrow is Space Grotesk mono. |
| 13 | **UpNextTeaser** | At the bottom of the Introduction section: "Next Architecture Map" with teaser text, separated by a hairline divider. |
| 14 | **Coming soon placeholder** | Below the Introduction, a secondary-dark block shows "12 more sections coming in Phase 2". |
| 15 | **Mobile (resize to <768px)** | Sidebar disappears. "Contents" button appears in the TopNav. Tapping it opens a dropdown with all 13 section names. |

> **If Lenis/GSAP don't hydrate:** The ScrollProvider uses `client:only="react"` which means it only runs in the browser, never during SSR. Check the browser console for JavaScript errors. The most common issue is GSAP's ScrollTrigger not finding a scrollable element — make sure the `<html>` element doesn't have `overflow: hidden`.

**Step 4: Commit**

```bash
cd ~/projects/amplifier-masterclass
git add -A
git commit -m "feat: wire index.astro — full shell with Introduction section end-to-end"
```

---

## Phase 1 Complete — What You Have

After completing all 13 tasks, the project at `~/projects/amplifier-masterclass/` contains:

```
amplifier-masterclass/
├── package.json
├── astro.config.mjs
├── tsconfig.json
├── .gitignore
├── public/
│   └── fonts/                              # 11 self-hosted woff2 files
├── src/
│   ├── styles/
│   │   ├── tokens.css                      # Charcoal/azure/cream design tokens
│   │   └── global.css                      # Font-face, reset, base dark styles
│   ├── data/
│   │   └── sections.ts                     # 13-section metadata (single source of truth)
│   ├── layouts/
│   │   └── MasterclassLayout.astro         # Shell: scroll + nav + sidebar + content slot
│   ├── components/
│   │   ├── navigation/
│   │   │   ├── SidebarTOC.astro            # Persistent left sidebar, scroll-synced
│   │   │   ├── ProgressBar.astro           # 2px azure bar at top
│   │   │   └── TopNav.astro                # Sticky bar with mobile dropdown
│   │   ├── sections/
│   │   │   ├── Section.astro               # Base wrapper (background variants)
│   │   │   └── S01Introduction.astro       # Introduction section with real content
│   │   ├── content/
│   │   │   ├── Eyebrow.astro               # Section eyebrow label
│   │   │   ├── NumberedRow.astro           # Numbered item with hairline divider
│   │   │   ├── FloatingVisual.astro        # Image without container
│   │   │   └── UpNextTeaser.astro          # Section transition element
│   │   └── scroll/
│   │       └── ScrollProvider.tsx           # React island: Lenis + GSAP
│   └── pages/
│       └── index.astro                     # Entry page: hero + Introduction
└── dist/                                   # Static build output
```

**Verified behaviors:**
- Astro builds to static HTML (GitHub Pages compatible)
- Lenis smooth scroll with GSAP ticker integration
- Glasswing-style sidebar TOC with active section tracking
- Progress bar tracking scroll position
- TopNav with section label updates and mobile dropdown
- Introduction section rendering with IYO-register typography and spacing
- Dark charcoal background system working across components
- Self-hosted fonts loading correctly

---

## What Comes Next

**Phase 2: Components + Content** — Build the remaining 12 sections, GlassCard, StickyStack, CardSlider, InlineDiagram components, and the ConceptualSection/TechnicalSection specialized wrappers.

**Phase 3: Polish + Integration** — d3-graphviz interactive explorer, nano-banana visual generation, full GSAP entrance choreography, presentation mode port, responsive pass, and withamplifier.com Astro migration.
