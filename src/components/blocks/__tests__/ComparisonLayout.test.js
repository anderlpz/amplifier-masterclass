/**
 * Structural tests for ComparisonLayout.astro
 * Tests spec requirements from DESIGN-SYSTEM.md §1.6 (semantic colors)
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/components/blocks/__tests__/ComparisonLayout.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPONENT_PATH = resolve(
  import.meta.dirname,
  '../ComparisonLayout.astro'
);

describe('ComparisonLayout.astro — structural spec (DESIGN-SYSTEM §1.6)', () => {
  // ── Pre-condition ──────────────────────────────────────────────────────────
  test('file exists at src/components/blocks/ComparisonLayout.astro', () => {
    assert.ok(
      existsSync(COMPONENT_PATH),
      `Expected ComparisonLayout.astro to exist at ${COMPONENT_PATH}`
    );
  });

  // ── Container element ──────────────────────────────────────────────────────
  test('renders a <div> as the outer container', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<div/, 'Expected <div> element');
  });

  test('container has class "comparison"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /class=[^>]*comparison/, 'Expected class "comparison" on container');
  });

  test('container has class "width-wide"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /class=[^>]*width-wide/, 'Expected class "width-wide" on container');
  });

  // ── Container styles ───────────────────────────────────────────────────────
  test('container uses display grid', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /display\s*:\s*grid/, 'Expected display: grid');
  });

  test('container has grid-template-columns 1fr 1fr', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /grid-template-columns\s*:\s*1fr\s+1fr/, 'Expected grid-template-columns: 1fr 1fr');
  });

  test('container uses --space-6 for gap', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /gap\s*:\s*var\(--space-6\)/, 'Expected gap: var(--space-6)');
  });

  test('container has margin-bottom using --space-12', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /margin-bottom\s*:\s*var\(--space-12\)/, 'Expected margin-bottom: var(--space-12)');
  });

  // ── Column base styles ─────────────────────────────────────────────────────
  test('columns have border-radius using --radius-md', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--radius-md/, 'Expected --radius-md for border-radius');
  });

  test('columns have padding using --space-6', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /padding\s*:\s*var\(--space-6\)/, 'Expected padding: var(--space-6)');
  });

  test('columns have border-top 3px solid', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /border-top\s*:\s*3px\s+solid/, 'Expected border-top: 3px solid');
  });

  // ── Tools column styles ────────────────────────────────────────────────────
  test('tools column uses --color-tools-bg for background', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-tools-bg/, 'Expected --color-tools-bg for tools background');
  });

  test('tools column uses --color-tools-border for border-color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-tools-border/, 'Expected --color-tools-border for tools border');
  });

  // ── Hooks column styles ────────────────────────────────────────────────────
  test('hooks column uses --color-hooks-bg for background', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-hooks-bg/, 'Expected --color-hooks-bg for hooks background');
  });

  test('hooks column uses --color-hooks-border for border-color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-hooks-border/, 'Expected --color-hooks-border for hooks border');
  });

  // ── Column heading styles ──────────────────────────────────────────────────
  test('headings use --font-sans', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-sans/, 'Expected --font-sans for heading font-family');
  });

  test('headings use --text-sm for font-size', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-sm/, 'Expected --text-sm for heading font-size');
  });

  test('headings have font-weight 600', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-weight\s*:\s*600/, 'Expected font-weight: 600 for headings');
  });

  test('headings have text-transform uppercase', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /text-transform\s*:\s*uppercase/, 'Expected text-transform: uppercase for headings');
  });

  test('headings have letter-spacing 0.04em', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /letter-spacing\s*:\s*0\.04em/, 'Expected letter-spacing: 0.04em for headings');
  });

  test('headings have margin-bottom using --space-4', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-4/, 'Expected --space-4 for heading margin-bottom');
  });

  test('tools heading uses --color-tools-text', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-tools-text/, 'Expected --color-tools-text for tools heading color');
  });

  test('hooks heading uses --color-hooks-text', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--color-hooks-text/, 'Expected --color-hooks-text for hooks heading color');
  });

  // ── Body styles ────────────────────────────────────────────────────────────
  test('body uses --text-secondary color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-secondary/, 'Expected --text-secondary for body color');
  });

  test('body uses --leading-normal for line-height', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--leading-normal/, 'Expected --leading-normal for line-height');
  });

  // ── Body :global(p) ────────────────────────────────────────────────────────
  test('body :global(p) has margin-bottom --space-3', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(p\)/, 'Expected :global(p) selector');
    assert.match(src, /--space-3/, 'Expected --space-3 in :global(p)');
  });

  test('body :global(p) has max-width none', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /max-width\s*:\s*none/, 'Expected max-width: none for body paragraphs');
  });

  test('body :global(p:last-child) or last-child has margin-bottom 0', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /last-child/, 'Expected last-child rule');
  });

  // ── Body :global(strong) ──────────────────────────────────────────────────
  test('body :global(strong) uses --text-primary color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(strong\)/, 'Expected :global(strong) selector');
    assert.match(src, /--text-primary/, 'Expected --text-primary for strong');
  });

  test('body :global(strong) has font-weight 600', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // font-weight: 600 already checked in heading, but verifying strong also sets it
    assert.match(src, /:global\(strong\)[\s\S]*?font-weight\s*:\s*600|font-weight\s*:\s*600[\s\S]*?:global\(strong\)/, 'Expected font-weight: 600 for strong');
  });

  // ── Body :global(ul) ──────────────────────────────────────────────────────
  test('body :global(ul) has padding-left 1.25em', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(ul\)/, 'Expected :global(ul) selector');
    assert.match(src, /padding-left\s*:\s*1\.25em/, 'Expected padding-left: 1.25em for ul');
  });

  test('body :global(ul) has margin-bottom --space-3', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-3/, 'Expected --space-3 in :global(ul)');
  });

  // ── Body :global(li) ──────────────────────────────────────────────────────
  test('body :global(li) has margin-bottom --space-1', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(li\)/, 'Expected :global(li) selector');
    assert.match(src, /--space-1/, 'Expected --space-1 for li margin-bottom');
  });

  // ── Named slots ───────────────────────────────────────────────────────────
  test('has named slot "tools" for left column', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /slot=['"](name=)?tools['"]|name=['"](slot=)?tools['"]|<slot\s[^>]*name=['"]tools['"]|<slot\s[^>]*tools/, 'Expected named slot "tools"');
  });

  test('has named slot "hooks" for right column', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /slot=['"](name=)?hooks['"]|name=['"](slot=)?hooks['"]|<slot\s[^>]*name=['"]hooks['"]|<slot\s[^>]*hooks/, 'Expected named slot "hooks"');
  });

  // ── Props ──────────────────────────────────────────────────────────────────
  test('defines leftTitle prop with default "Tools"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /leftTitle/, 'Expected leftTitle prop');
    assert.match(src, /Tools/, 'Expected default value "Tools" for leftTitle');
  });

  test('defines rightTitle prop with default "Hooks"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /rightTitle/, 'Expected rightTitle prop');
    assert.match(src, /Hooks/, 'Expected default value "Hooks" for rightTitle');
  });

  // ── Heading element semantics ───────────────────────────────────────────────────
  test('column headings use <h3> element (not <p>) for screen-reader navigation', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<h3[^>]*col-heading/, 'Expected <h3> element for column headings, not <p>');
    assert.doesNotMatch(src, /<p[^>]*col-heading/, 'Expected col-heading on <h3>, not <p>');
  });

    // ── Mobile responsive ──────────────────────────────────────────────────────
  test('has @media max-width 768px breakpoint', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /@media[^{]*max-width[^{]*768px/, 'Expected @media (max-width: 768px)');
  });

  test('mobile breakpoint sets grid-template-columns to 1fr', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Check that somewhere after a 768px media query, we set grid-template-columns: 1fr
    const mediaIdx = src.search(/@media[^{]*max-width[^{]*768px/);
    assert.ok(mediaIdx !== -1, 'Expected @media max-width 768px');
    const afterMedia = src.slice(mediaIdx);
    assert.match(afterMedia, /grid-template-columns\s*:\s*1fr(?!\s+1fr)/, 'Expected grid-template-columns: 1fr (single column) in 768px breakpoint');
  });
});
