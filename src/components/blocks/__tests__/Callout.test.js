/**
 * Structural tests for Callout.astro
 * Tests spec requirements from DESIGN-SYSTEM.md §7.5
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/components/blocks/__tests__/Callout.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPONENT_PATH = resolve(
  import.meta.dirname,
  '../Callout.astro'
);

describe('Callout.astro — structural spec (DESIGN-SYSTEM §7.5)', () => {
  // ── Pre-condition ───────────────────────────────────────────────────────────
  test('file exists at src/components/blocks/Callout.astro', () => {
    assert.ok(
      existsSync(COMPONENT_PATH),
      `Expected Callout.astro to exist at ${COMPONENT_PATH}`
    );
  });

  // ── Container element ───────────────────────────────────────────────────────
  test('renders an <aside> element as the outer container', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<aside/, 'Expected <aside> element');
  });

  test('aside has role="note"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /role=['"]note['"]/, 'Expected role="note" on aside');
  });

  test('aside has class "callout"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /callout/, 'Expected class "callout" on aside');
  });

  test('aside has class "width-reading"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /width-reading/, 'Expected class "width-reading" on aside');
  });

  // ── Container styles ────────────────────────────────────────────────────────
  test('uses --bg-muted for background', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--bg-muted/, 'Expected var(--bg-muted) for background');
  });

  test('has left accent border using --accent (3px)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /border-left\s*:\s*3px/, 'Expected border-left: 3px ...');
    assert.match(src, /--accent/, 'Expected --accent in border-left');
  });

  test('uses --radius-sm for border-radius', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--radius-sm/, 'Expected --radius-sm in border-radius');
  });

  test('has border-radius shaped as 0 --radius-sm --radius-sm 0 (no left rounding)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Pattern: border-radius: 0 var(--radius-sm) var(--radius-sm) 0
    assert.match(
      src,
      /border-radius\s*:\s*0\s+var\(--radius-sm\)\s+var\(--radius-sm\)\s+0/,
      'Expected border-radius: 0 var(--radius-sm) var(--radius-sm) 0'
    );
  });

  test('has padding using --space-6 and --space-8', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-6/, 'Expected --space-6 in padding');
    assert.match(src, /--space-8/, 'Expected --space-8 in padding or margin-bottom');
  });

  test('has margin-bottom using --space-8', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /margin-bottom\s*:\s*var\(--space-8\)/, 'Expected margin-bottom: var(--space-8)');
  });

  // ── Optional label ──────────────────────────────────────────────────────────
  test('defines a label prop', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /label/, 'Expected label prop defined');
  });

  test('conditionally renders label when provided', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Should have a conditional like {label && ...} or {label ? ... : ...}
    assert.match(
      src,
      /\{label\s*&&|\{label\s*\?/,
      'Expected conditional rendering of label'
    );
  });

  test('label uses --font-mono', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-mono/, 'Expected --font-mono for label');
  });

  test('label uses --text-xs', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-xs/, 'Expected --text-xs for label font-size');
  });

  test('label is uppercase', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /text-transform\s*:\s*uppercase/, 'Expected text-transform: uppercase for label');
  });

  test('label has letter-spacing 0.06em', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /letter-spacing\s*:\s*0\.06em/, 'Expected letter-spacing: 0.06em for label');
  });

  test('label uses --accent color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // --accent is used for label color
    assert.match(src, /color\s*:\s*var\(--accent\)/, 'Expected color: var(--accent) for label');
  });

  test('label has margin-bottom using --space-3', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-3/, 'Expected --space-3 for label margin-bottom');
  });

  test('label has max-width none', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /max-width\s*:\s*none/, 'Expected max-width: none for label');
  });

  // ── Body div styles ─────────────────────────────────────────────────────────
  test('body div uses --font-serif (Lora)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-serif/, 'Expected --font-serif for body text');
  });

  test('body div has font-style italic', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-style\s*:\s*italic/, 'Expected font-style: italic for body');
  });

  test('body div uses --text-secondary color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-secondary/, 'Expected --text-secondary for body color');
  });

  test('body div uses --leading-normal for line-height', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--leading-normal/, 'Expected --leading-normal for line-height');
  });

  // ── Body paragraph styles ───────────────────────────────────────────────────
  test('body :global(p) has max-width 55ch', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(p\)/, 'Expected :global(p) selector');
    assert.match(src, /55ch/, 'Expected max-width: 55ch for body paragraphs');
  });

  test('body :global(p) has margin-bottom --space-3', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Should have margin-bottom: var(--space-3) for p
    assert.match(src, /--space-3/, 'Expected --space-3 for paragraph spacing');
  });

  test('body :global(p:last-child) has margin-bottom 0', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /p:last-child|last-child/, 'Expected p:last-child rule');
  });

  // ── Strong element ──────────────────────────────────────────────────────────
  test('body :global(strong) uses --text-primary color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /:global\(strong\)/, 'Expected :global(strong) selector');
    assert.match(src, /--text-primary/, 'Expected --text-primary for strong');
  });

  test('body :global(strong) has font-weight 600', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-weight\s*:\s*600/, 'Expected font-weight: 600 for strong');
  });

  test('body :global(strong) has font-style normal', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // strong overrides the italic with normal
    assert.match(src, /font-style\s*:\s*normal/, 'Expected font-style: normal for strong to override italic');
  });

  // ── Slot ────────────────────────────────────────────────────────────────────
  test('has a <slot /> for body content', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<slot\s*\/>|<slot>/, 'Expected <slot /> for body content');
  });
});
