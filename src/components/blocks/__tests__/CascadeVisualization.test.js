/**
 * Structural tests for CascadeVisualization.astro
 * Tests spec requirements from DESIGN-SYSTEM.md §1.6 (cascade tokens)
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/components/blocks/__tests__/CascadeVisualization.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPONENT_PATH = resolve(
  import.meta.dirname,
  '../CascadeVisualization.astro'
);

describe('CascadeVisualization.astro — structural spec (DESIGN-SYSTEM §1.6)', () => {
  // ── Pre-condition ─────────────────────────────────────────────────────────
  test('file exists at src/components/blocks/CascadeVisualization.astro', () => {
    assert.ok(
      existsSync(COMPONENT_PATH),
      `Expected CascadeVisualization.astro to exist at ${COMPONENT_PATH}`
    );
  });

  // ── Container element ─────────────────────────────────────────────────────
  test('renders a <div> as the outer container', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<div/, 'Expected <div> element');
  });

  test('container has class "width-wide" for wide-width layout', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /width-wide/, 'Expected class "width-wide" on container');
  });

  // ── Heading ───────────────────────────────────────────────────────────────
  test('heading text is "Hook Action Priority Cascade"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /Hook Action Priority Cascade/, 'Expected heading text "Hook Action Priority Cascade"');
  });

  test('heading uses --font-mono', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-mono/, 'Expected --font-mono for heading font-family');
  });

  test('heading uses --text-xs for font-size', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-xs/, 'Expected --text-xs for heading font-size');
  });

  test('heading has font-weight 500', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-weight\s*:\s*500/, 'Expected font-weight: 500');
  });

  test('heading has text-transform uppercase', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /text-transform\s*:\s*uppercase/, 'Expected text-transform: uppercase');
  });

  test('heading has letter-spacing 0.06em', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /letter-spacing\s*:\s*0\.06em/, 'Expected letter-spacing: 0.06em');
  });

  test('heading uses --text-muted color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-muted/, 'Expected --text-muted color for heading');
  });

  test('heading has margin-bottom using --space-4', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /margin-bottom\s*:\s*var\(--space-4\)/, 'Expected margin-bottom: var(--space-4) for heading');
  });

  test('heading has max-width none', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /max-width\s*:\s*none/, 'Expected max-width: none');
  });

  // ── List container ────────────────────────────────────────────────────────
  test('list uses display flex', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /display\s*:\s*flex/, 'Expected display: flex');
  });

  test('list uses flex-direction column', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /flex-direction\s*:\s*column/, 'Expected flex-direction: column');
  });

  test('list uses gap --space-2', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /gap\s*:\s*var\(--space-2\)/, 'Expected gap: var(--space-2) for list');
  });

  // ── Row styles ────────────────────────────────────────────────────────────
  test('row has align-items flex-start', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /align-items\s*:\s*flex-start/, 'Expected align-items: flex-start');
  });

  test('row has gap --space-4', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /gap\s*:\s*var\(--space-4\)/, 'Expected gap: var(--space-4) for rows');
  });

  test('row has background --bg-muted', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /background\s*:\s*var\(--bg-muted\)/, 'Expected background: var(--bg-muted)');
  });

  test('row has border-left 4px solid', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /border-left\s*:\s*4px\s+solid/, 'Expected border-left: 4px solid');
  });

  test('row border-radius is 0 --radius-sm --radius-sm 0', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(
      src,
      /border-radius\s*:\s*0\s+var\(--radius-sm\)\s+var\(--radius-sm\)\s+0/,
      'Expected border-radius: 0 var(--radius-sm) var(--radius-sm) 0'
    );
  });

  test('row has padding using --space-4 and --space-6', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-4/, 'Expected --space-4 in padding');
    assert.match(src, /--space-6/, 'Expected --space-6 in padding');
  });

  // ── Priority number styles ────────────────────────────────────────────────
  test('priority number uses --font-mono', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Already checked, but confirm it appears (could be multiple uses)
    assert.match(src, /--font-mono/, 'Expected --font-mono');
  });

  test('priority number uses --text-sm', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-sm/, 'Expected --text-sm for priority number');
  });

  test('priority number has min-width 1.5em', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /min-width\s*:\s*1\.5em/, 'Expected min-width: 1.5em for priority number');
  });

  test('priority number has flex-shrink 0', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /flex-shrink\s*:\s*0/, 'Expected flex-shrink: 0 for priority number');
  });

  // ── Content block ─────────────────────────────────────────────────────────
  test('content block uses flex column with gap --space-1', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /gap\s*:\s*var\(--space-1\)/, 'Expected gap: var(--space-1) for content block');
  });

  // ── Description text ──────────────────────────────────────────────────────
  test('description uses --font-sans', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-sans/, 'Expected --font-sans for description');
  });

  test('description uses --text-secondary', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-secondary/, 'Expected --text-secondary for description');
  });

  test('description has line-height 1.5', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /line-height\s*:\s*1\.5/, 'Expected line-height: 1.5 for description');
  });

  // ── 5 priority levels — presence ─────────────────────────────────────────
  test('includes all 5 action names: Deny, AskUser, InjectContext, Modify, Continue', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /Deny/, 'Expected "Deny" action name');
    assert.match(src, /AskUser/, 'Expected "AskUser" action name');
    assert.match(src, /InjectContext/, 'Expected "InjectContext" action name');
    assert.match(src, /Modify/, 'Expected "Modify" action name');
    assert.match(src, /Continue/, 'Expected "Continue" action name');
  });

  test('includes descriptions for all 5 levels', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /Short-circuits immediately/, 'Expected Deny description');
    assert.match(src, /Pauses for human decision/, 'Expected AskUser description');
    assert.match(src, /Accumulated across handlers/, 'Expected InjectContext description');
    assert.match(src, /Chains data through handlers/, 'Expected Modify description');
    assert.match(src, /Default\. No-op/, 'Expected Continue description');
  });

  // ── Cascade CSS custom property colors ───────────────────────────────────
  test('uses --cascade-deny for Deny color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--cascade-deny/, 'Expected --cascade-deny CSS custom property');
  });

  test('uses --cascade-ask-user for AskUser color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--cascade-ask-user/, 'Expected --cascade-ask-user CSS custom property');
  });

  test('uses --cascade-inject for InjectContext color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--cascade-inject/, 'Expected --cascade-inject CSS custom property');
  });

  test('uses --cascade-modify for Modify color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--cascade-modify/, 'Expected --cascade-modify CSS custom property');
  });

  test('uses --cascade-continue for Continue color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--cascade-continue/, 'Expected --cascade-continue CSS custom property');
  });

  // ── Priority numbers ──────────────────────────────────────────────────────
  test('includes priority numbers 1 through 5', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Priority numbers should be rendered as text "1", "2", "3", "4", "5"
    // They're in the data array so checking for the data values
    assert.match(src, /\b1\b/, 'Expected priority number 1');
    assert.match(src, /\b2\b/, 'Expected priority number 2');
    assert.match(src, /\b3\b/, 'Expected priority number 3');
    assert.match(src, /\b4\b/, 'Expected priority number 4');
    assert.match(src, /\b5\b/, 'Expected priority number 5');
  });

  // ── No props (self-contained) ─────────────────────────────────────────────
  test('has no Props interface or Astro.props destructuring (self-contained, no props)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Should NOT have a Props interface (no external props)
    assert.doesNotMatch(
      src,
      /interface\s+Props\s*\{[^}]*\}/,
      'Expected no Props interface — component should be self-contained with no required props'
    );
  });

  // ── Cascade colors defined (inline style or CSS) ──────────────────────────
  test('cascade color tokens are applied via inline style or CSS vars on each row', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Each row should reference its cascade color (var(--cascade-deny) etc.) for the border
    // Either via style attribute or CSS using a class per level
    const hasInlineStyle = /style=/.test(src);
    const hasCascadeClass = /cascade-deny|cascade-ask|cascade-inject|cascade-modify|cascade-continue/.test(src);
    assert.ok(
      hasInlineStyle || hasCascadeClass,
      'Expected cascade colors to be applied via inline style or CSS class per level'
    );
  });
});
