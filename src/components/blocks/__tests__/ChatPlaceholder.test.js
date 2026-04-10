/**
 * Structural tests for ChatPlaceholder.astro
 * Tests spec requirements from DESIGN-SYSTEM.md §7.8
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/components/blocks/__tests__/ChatPlaceholder.test.js
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const COMPONENT_PATH = resolve(
  import.meta.dirname,
  '../ChatPlaceholder.astro'
);

describe('ChatPlaceholder.astro — structural spec (DESIGN-SYSTEM §7.8)', () => {
  // Read the component source once; shared across all tests below.
  let src;
  before(() => {
    src = readFileSync(COMPONENT_PATH, 'utf8');
  });

  // ── Pre-condition ─────────────────────────────────────────────────────────
  test('file exists at src/components/blocks/ChatPlaceholder.astro', () => {
    assert.ok(
      existsSync(COMPONENT_PATH),
      `Expected ChatPlaceholder.astro to exist at ${COMPONENT_PATH}`
    );
  });

  // ── Props ─────────────────────────────────────────────────────────────────
  test('defines a prompt prop (optional string)', () => {
    assert.match(src, /prompt/, 'Expected prompt prop defined');
  });

  test('prompt prop has default value "Have a question about this chapter?"', () => {
    assert.match(
      src,
      /Have a question about this chapter\?/,
      'Expected default prompt text "Have a question about this chapter?"'
    );
  });

  // ── Container element ─────────────────────────────────────────────────────
  test('container has classes "chat-placeholder" and "width-reading"', () => {
    assert.match(src, /chat-placeholder/, 'Expected class "chat-placeholder" on container');
    assert.match(src, /width-reading/, 'Expected class "width-reading" on container');
  });

  test('container has margin-bottom using --space-12', () => {
    assert.match(
      src,
      /margin-bottom\s*:\s*var\(--space-12\)/,
      'Expected margin-bottom: var(--space-12)'
    );
  });

  // ── Card div ──────────────────────────────────────────────────────────────
  test('card has border 1px solid --border-default', () => {
    assert.match(
      src,
      /border\s*:\s*1px\s+solid\s+var\(--border-default\)/,
      'Expected border: 1px solid var(--border-default)'
    );
  });

  test('card uses --radius-md for border-radius', () => {
    assert.match(src, /--radius-md/, 'Expected --radius-md for card border-radius');
  });

  test('card has padding using --space-6', () => {
    assert.match(src, /--space-6/, 'Expected --space-6 for card padding');
  });

  test('card uses display flex with flex-direction column', () => {
    assert.match(src, /display\s*:\s*flex/, 'Expected display: flex on card');
    assert.match(src, /flex-direction\s*:\s*column/, 'Expected flex-direction: column on card');
  });

  test('card has gap using --space-4', () => {
    assert.match(src, /--space-4/, 'Expected --space-4 for card gap');
  });

  // ── Prompt text ───────────────────────────────────────────────────────────
  test('prompt text uses --font-sans', () => {
    assert.match(src, /--font-sans/, 'Expected --font-sans for prompt text');
  });

  test('prompt text uses --text-base', () => {
    assert.match(src, /--text-base/, 'Expected --text-base for prompt text');
  });

  test('prompt text uses --text-secondary', () => {
    assert.match(src, /--text-secondary/, 'Expected --text-secondary for prompt text');
  });

  test('prompt text has max-width none', () => {
    assert.match(src, /max-width\s*:\s*none/, 'Expected max-width: none for prompt text');
  });

  // ── Input row ─────────────────────────────────────────────────────────────
  test('input row uses display flex with align-items center', () => {
    assert.match(src, /align-items\s*:\s*center/, 'Expected align-items: center on input row');
  });

  test('input row has gap using --space-3', () => {
    assert.match(src, /--space-3/, 'Expected --space-3 for input row gap');
  });

  // ── Input element ─────────────────────────────────────────────────────────
  test('input has type="text"', () => {
    assert.match(src, /type\s*=\s*['"]text['"]/, 'Expected type="text" on input');
  });

  test('input has placeholder="Ask a question..."', () => {
    assert.match(
      src,
      /placeholder\s*=\s*['"]Ask a question\.\.\.['"]/, 
      'Expected placeholder="Ask a question..."'
    );
  });

  test('input has disabled attribute', () => {
    assert.match(src, /\bdisabled\b/, 'Expected disabled attribute on input');
  });

  test('input has aria-disabled="true"', () => {
    assert.match(
      src,
      /aria-disabled\s*=\s*['"]true['"]/,
      'Expected aria-disabled="true" on input'
    );
  });

  test('input has flex: 1', () => {
    assert.match(src, /flex\s*:\s*1/, 'Expected flex: 1 on input');
  });

  test('input padding uses --space-2 and --space-4', () => {
    assert.match(src, /--space-2/, 'Expected --space-2 in input padding');
  });

  test('input border uses --border-default', () => {
    // The border: 1px solid var(--border-default) is shared; verify it appears
    assert.match(src, /--border-default/, 'Expected --border-default on input border');
  });

  test('input uses --radius-sm for border-radius', () => {
    assert.match(src, /--radius-sm/, 'Expected --radius-sm on input border-radius');
  });

  test('input uses --bg-muted for background', () => {
    assert.match(src, /--bg-muted/, 'Expected --bg-muted for input background');
  });

  test('input uses --text-muted for color', () => {
    assert.match(src, /--text-muted/, 'Expected --text-muted for input color');
  });

  test('input uses --text-sm', () => {
    assert.match(src, /--text-sm/, 'Expected --text-sm for input font size');
  });

  test('input has cursor: not-allowed', () => {
    assert.match(src, /cursor\s*:\s*not-allowed/, 'Expected cursor: not-allowed on input');
  });

  test('input has opacity 0.6', () => {
    assert.match(src, /opacity\s*:\s*0\.6/, 'Expected opacity: 0.6 on input');
  });

  // ── "Coming soon" badge ───────────────────────────────────────────────────
  test('includes "Coming soon" text', () => {
    assert.match(src, /Coming soon/, 'Expected "Coming soon" badge text');
  });

  test('"Coming soon" badge uses --font-mono', () => {
    assert.match(src, /--font-mono/, 'Expected --font-mono for "Coming soon" badge');
  });

  test('"Coming soon" badge uses --text-xs', () => {
    assert.match(src, /--text-xs/, 'Expected --text-xs for "Coming soon" badge');
  });

  test('"Coming soon" badge uses --text-muted', () => {
    // --text-muted is used (shared with input color)
    assert.match(src, /--text-muted/, 'Expected --text-muted for "Coming soon" badge');
  });

  test('"Coming soon" badge has white-space: nowrap', () => {
    assert.match(src, /white-space\s*:\s*nowrap/, 'Expected white-space: nowrap on badge');
  });
});
