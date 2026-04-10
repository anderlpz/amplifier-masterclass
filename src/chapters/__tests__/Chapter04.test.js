/**
 * Structural tests for Chapter04.astro
 * Tests spec requirements: transcribe .design/sections/04-the-kernel.md
 * into ChapterEntry, Prose, CodeBlock, Callout, and VignettePlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter04.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter04.astro'
);

describe('Chapter04.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter04.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter04.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ────────────────────────────────────────────────────────
  test('imports and uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('imports and uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  test('imports and uses CodeBlock component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /CodeBlock/, 'Expected CodeBlock component import and usage');
  });

  test('imports and uses Callout component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Callout/, 'Expected Callout component import and usage');
  });

  test('imports and uses VignettePlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /VignettePlaceholder/, 'Expected VignettePlaceholder component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={4} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{4\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry passes title prop or uses hardcoded "The Kernel" title', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="The Kernel"|title='The Kernel'/,
      'Expected title prop on ChapterEntry (from props or hardcoded)'
    );
  });

  test('ChapterEntry has lead "Five things live in the kernel. Nothing else."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Five things live in the kernel\. Nothing else\./,
      'Expected lead text from spec'
    );
  });

  // ── Opening prose ──────────────────────────────────────────────────────────
  test('Prose contains opening paragraph about amplifier-core being Rust and Python', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Rust.*Python|amplifier-core.*Rust|amplifier-core.*Python/,
      'Expected opening paragraph about amplifier-core being Rust + Python'
    );
  });

  // ── Section headings (5 kernel components) ────────────────────────────────
  test('contains h2 heading "Session Lifecycle"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Session Lifecycle.*<\/h2>/s,
      'Expected <h2> for "Session Lifecycle"'
    );
  });

  test('contains h2 heading for Contracts', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Contracts.*<\/h2>/s,
      'Expected <h2> for "Contracts"'
    );
  });

  test('contains h2 heading "Module Loader"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Module Loader.*<\/h2>/s,
      'Expected <h2> for "Module Loader"'
    );
  });

  test('contains h2 heading "The Coordinator"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Coordinator.*<\/h2>/s,
      'Expected <h2> for "The Coordinator"'
    );
  });

  test('contains h2 heading for Hooks', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Hooks.*<\/h2>/s,
      'Expected <h2> for "Hooks"'
    );
  });

  // ── CodeBlock ─────────────────────────────────────────────────────────────
  test('CodeBlock contains mount contract signature', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /async def mount|mount.*coordinator.*config/i,
      'Expected mount contract signature in CodeBlock'
    );
  });

  // ── VignettePlaceholder ───────────────────────────────────────────────────
  test('VignettePlaceholder has rationale from spec frontmatter', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Animating the 5 components appearing one by one/,
      'Expected VignettePlaceholder rationale from frontmatter'
    );
  });

  // ── Callout ───────────────────────────────────────────────────────────────
  test('Callout references Rust/Python boundary or implementation note', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<Callout/,
      'Expected Callout component usage for Rust/Python boundary note'
    );
  });

  // ── Excluded content ──────────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter04 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter04 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter04 should not have placeholder "coming soon" text'
    );
  });
});
