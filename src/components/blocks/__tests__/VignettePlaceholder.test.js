/**
 * Structural tests for VignettePlaceholder.astro
 * Tests spec requirements from DESIGN-SYSTEM.md §7.7
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/components/blocks/__tests__/VignettePlaceholder.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPONENT_PATH = resolve(
  import.meta.dirname,
  '../VignettePlaceholder.astro'
);

describe('VignettePlaceholder.astro — structural spec (DESIGN-SYSTEM §7.7)', () => {
  // ── Pre-condition ─────────────────────────────────────────────────────────────
  test('file exists at src/components/blocks/VignettePlaceholder.astro', () => {
    assert.ok(
      existsSync(COMPONENT_PATH),
      `Expected VignettePlaceholder.astro to exist at ${COMPONENT_PATH}`
    );
  });

  // ── Props ─────────────────────────────────────────────────────────────────────
  test('defines a rationale prop (optional string)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /rationale/, 'Expected rationale prop defined');
  });

  test('defines a width prop (optional)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /width/, 'Expected width prop defined');
  });

  test('width prop accepts "wide" and "full" values', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /['"]wide['"]/, 'Expected "wide" as a valid width value');
    assert.match(src, /['"]full['"]/, 'Expected "full" as a valid width value');
  });

  test('default width is "wide"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(
      src,
      /width\s*=\s*['"]wide['"]/,
      'Expected default width to be "wide"'
    );
  });

  // ── Container element ─────────────────────────────────────────────────────────
  test('renders a <div> as the outer container', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /<div/, 'Expected <div> element');
  });

  test('container has class "vignette-placeholder"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /vignette-placeholder/, 'Expected class "vignette-placeholder" on container');
  });

  test('container includes dynamic width class (width-${width})', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(
      src,
      /width-\$\{width\}|`width-\$\{width\}`|width-wide/,
      'Expected dynamic width class like width-${width}'
    );
  });

  // ── Container styles ──────────────────────────────────────────────────────────
  test('container has margin-bottom using --space-12', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /margin-bottom\s*:\s*var\(--space-12\)/, 'Expected margin-bottom: var(--space-12)');
  });

  // ── Frame div ─────────────────────────────────────────────────────────────────
  test('frame uses --bg-muted for background', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--bg-muted/, 'Expected var(--bg-muted) for frame background');
  });

  test('frame has border 1px solid --border-default', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /border\s*:\s*1px\s+solid\s+var\(--border-default\)/, 'Expected border: 1px solid var(--border-default)');
  });

  test('frame uses --radius-lg for border-radius', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--radius-lg/, 'Expected --radius-lg for border-radius');
  });

  test('frame has aspect-ratio 16/9', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /aspect-ratio\s*:\s*16\s*\/\s*9/, 'Expected aspect-ratio: 16/9');
  });

  test('frame uses display: flex', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /display\s*:\s*flex/, 'Expected display: flex on frame');
  });

  test('frame uses align-items: center', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /align-items\s*:\s*center/, 'Expected align-items: center on frame');
  });

  test('frame uses justify-content: center', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /justify-content\s*:\s*center/, 'Expected justify-content: center on frame');
  });

  // ── Content div ───────────────────────────────────────────────────────────────
  test('content div uses text-align: center', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /text-align\s*:\s*center/, 'Expected text-align: center on content div');
  });

  test('content div uses flex-direction: column', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /flex-direction\s*:\s*column/, 'Expected flex-direction: column on content div');
  });

  test('content div uses align-items: center', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // align-items: center is required (appears at least twice)
    assert.match(src, /align-items\s*:\s*center/, 'Expected align-items: center');
  });

  test('content div has gap using --space-2', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-2/, 'Expected --space-2 for content gap');
  });

  // ── Play icon ─────────────────────────────────────────────────────────────────
  test('includes play icon ▶ (Unicode 9654 / &#9654; or ▶)', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // Accept Unicode literal ▶ or HTML entity &#9654; or ▶
    assert.match(src, /▶|&#9654;|\\u25b6/i, 'Expected play icon ▶ (Unicode 9654)');
  });

  test('play icon has aria-hidden="true"', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /aria-hidden\s*=\s*['"]{1}true['"]{1}/, 'Expected aria-hidden="true" on play icon');
  });

  test('play icon has font-size: 2rem', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-size\s*:\s*2rem/, 'Expected font-size: 2rem for play icon');
  });

  test('play icon uses --text-muted for color', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-muted/, 'Expected --text-muted for play icon color');
  });

  test('play icon has opacity 0.5', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /opacity\s*:\s*0\.5/, 'Expected opacity: 0.5 for play icon');
  });

  // ── "Video explainer" text ────────────────────────────────────────────────────
  test('includes "Video explainer" text', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /Video explainer/, 'Expected "Video explainer" text');
  });

  test('"Video explainer" uses --font-mono', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-mono/, 'Expected --font-mono for "Video explainer"');
  });

  test('"Video explainer" uses --text-sm', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-sm/, 'Expected --text-sm for "Video explainer"');
  });

  test('"Video explainer" has font-weight 500', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-weight\s*:\s*500/, 'Expected font-weight: 500 for "Video explainer"');
  });

  // ── "Coming soon" badge ───────────────────────────────────────────────────────
  test('includes "Coming soon" text', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /Coming soon/, 'Expected "Coming soon" badge text');
  });

  test('"Coming soon" uses --font-sans', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--font-sans/, 'Expected --font-sans for "Coming soon"');
  });

  test('"Coming soon" uses --text-xs', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--text-xs/, 'Expected --text-xs for "Coming soon"');
  });

  test('"Coming soon" has opacity 0.6', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /opacity\s*:\s*0\.6/, 'Expected opacity: 0.6 for "Coming soon"');
  });

  // ── Optional rationale ────────────────────────────────────────────────────────
  test('conditionally renders rationale when provided', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(
      src,
      /\{rationale\s*&&|\{rationale\s*\?/,
      'Expected conditional rendering of rationale'
    );
  });

  test('rationale has margin-top using --space-3', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /--space-3/, 'Expected --space-3 for rationale margin-top');
  });

  test('rationale uses --font-sans', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    // --font-sans is used (might share with "Coming soon" but must be present)
    assert.match(src, /--font-sans/, 'Expected --font-sans for rationale');
  });

  test('rationale has font-style italic', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /font-style\s*:\s*italic/, 'Expected font-style: italic for rationale');
  });

  test('rationale has text-align: center', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /text-align\s*:\s*center/, 'Expected text-align: center');
  });

  test('rationale has max-width 60ch', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /60ch/, 'Expected max-width: 60ch for rationale');
  });

  test('rationale has margin-inline: auto', () => {
    const src = readFileSync(COMPONENT_PATH, 'utf8');
    assert.match(src, /margin-inline\s*:\s*auto/, 'Expected margin-inline: auto for rationale');
  });
});
