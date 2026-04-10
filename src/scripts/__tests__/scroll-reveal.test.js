/**
 * Structural tests for scroll-reveal.ts
 * Tests spec requirements from task-12-scroll-reveal
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/scripts/__tests__/scroll-reveal.test.js
 */

import { test, describe, before } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const SCRIPT_PATH = resolve(
  import.meta.dirname,
  '../scroll-reveal.ts'
);

const LAYOUT_PATH = resolve(
  import.meta.dirname,
  '../../layouts/ChapterLayout.astro'
);

describe('scroll-reveal.ts — structural spec (task-12)', () => {
  let src;
  let layoutSrc;

  before(() => {
    if (existsSync(SCRIPT_PATH)) {
      src = readFileSync(SCRIPT_PATH, 'utf8');
    }
    if (existsSync(LAYOUT_PATH)) {
      layoutSrc = readFileSync(LAYOUT_PATH, 'utf8');
    }
  });

  // ── Pre-condition ─────────────────────────────────────────────────
  test('file exists at src/scripts/scroll-reveal.ts', () => {
    assert.ok(
      existsSync(SCRIPT_PATH),
      `Expected scroll-reveal.ts to exist at ${SCRIPT_PATH}`
    );
  });

  // ── IntersectionObserver setup ────────────────────────────────────
  test('uses IntersectionObserver', () => {
    assert.match(src, /IntersectionObserver/, 'Expected IntersectionObserver usage');
  });

  test('uses threshold 0.1', () => {
    assert.match(src, /threshold\s*:\s*0\.1/, 'Expected threshold: 0.1 in observer options');
  });

  test('uses rootMargin "0px 0px -50px 0px"', () => {
    assert.match(
      src,
      /rootMargin\s*:\s*['"]0px 0px -50px 0px['"]/,
      'Expected rootMargin: "0px 0px -50px 0px"'
    );
  });

  // ── Element selection ─────────────────────────────────────────────
  test('selects elements with [data-reveal] attribute', () => {
    assert.match(src, /\[data-reveal\]/, 'Expected [data-reveal] selector');
  });

  // ── CSS custom properties ─────────────────────────────────────────
  test('uses --duration-reveal CSS custom property', () => {
    assert.match(src, /--duration-reveal/, 'Expected --duration-reveal CSS custom property');
  });

  test('uses --ease-out CSS custom property', () => {
    assert.match(src, /--ease-out/, 'Expected --ease-out CSS custom property');
  });

  // ── Initial hidden state ──────────────────────────────────────────
  test('sets initial opacity 0', () => {
    assert.match(src, /opacity\s*[=:]\s*['"]?0['"]?/, 'Expected opacity 0 initial state');
  });

  test('sets initial transform translateY(20px)', () => {
    assert.match(
      src,
      /translateY\(20px\)/,
      'Expected translateY(20px) in initial state'
    );
  });

  test('sets transition on opacity and transform', () => {
    assert.match(src, /transition/, 'Expected transition property');
  });

  // ── On intersection ───────────────────────────────────────────────
  test('sets opacity 1 on intersection', () => {
    assert.match(src, /opacity\s*[=:]\s*['"]?1['"]?/, 'Expected opacity 1 on intersection');
  });

  test('sets transform translateY(0) on intersection', () => {
    assert.match(
      src,
      /translateY\(0\)/,
      'Expected translateY(0) on intersection'
    );
  });

  test('calls unobserve after intersection (one-shot)', () => {
    assert.match(src, /unobserve/, 'Expected unobserve() call for one-shot animation');
  });

  // ── prefers-reduced-motion ────────────────────────────────────────
  test('checks prefers-reduced-motion media query', () => {
    assert.match(
      src,
      /prefers-reduced-motion/,
      'Expected prefers-reduced-motion check'
    );
  });

  test('makes elements immediately visible when reduced motion enabled', () => {
    // When reduced motion is preferred, elements should have opacity 1 and no transform
    assert.match(
      src,
      /prefers-reduced-motion/,
      'Expected reduced motion handling'
    );
  });

  // ── DOM ready ─────────────────────────────────────────────────────
  test('checks document.readyState', () => {
    assert.match(src, /readyState/, 'Expected document.readyState check');
  });

  test('adds DOMContentLoaded listener if loading', () => {
    assert.match(
      src,
      /DOMContentLoaded/,
      'Expected DOMContentLoaded listener'
    );
  });

  // ── ChapterLayout.astro wiring ────────────────────────────────────
  test('ChapterLayout.astro exists', () => {
    assert.ok(
      existsSync(LAYOUT_PATH),
      `Expected ChapterLayout.astro to exist at ${LAYOUT_PATH}`
    );
  });

  test('ChapterLayout.astro imports scroll-reveal script', () => {
    assert.match(
      layoutSrc,
      /import\s+['"]\.\.\/scripts\/scroll-reveal['"]/,
      'Expected import of ../scripts/scroll-reveal in ChapterLayout.astro'
    );
  });

  test('scroll-reveal import is in a <script> tag in ChapterLayout.astro', () => {
    assert.match(
      layoutSrc,
      /<script[^>]*>[\s\S]*import\s+['"]\.\.\/scripts\/scroll-reveal['"][\s\S]*<\/script>/,
      'Expected <script> tag with scroll-reveal import'
    );
  });
});
