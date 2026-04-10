/**
 * Structural tests for Chapter05.astro
 * Tests spec requirements: transcribe .design/sections/05-module-system.md
 * into ChapterEntry, Prose, DataTable, CodeBlock, and VignettePlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter05.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter05.astro'
);

describe('Chapter05.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter05.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter05.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ───────────────────────────────────────────────────────
  test('imports and uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('imports and uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  test('imports and uses DataTable component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /DataTable/, 'Expected DataTable component import and usage');
  });

  test('imports and uses CodeBlock component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /CodeBlock/, 'Expected CodeBlock component import and usage');
  });

  test('imports and uses VignettePlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /VignettePlaceholder/, 'Expected VignettePlaceholder component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={5} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{5\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Module System"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Module System"|title='Module System'/,
      'Expected title "Module System" on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "Everything outside the kernel is a module."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Everything outside the kernel is a module\./,
      'Expected lead text from spec'
    );
  });

  // ── DataTable ─────────────────────────────────────────────────────────────
  test('DataTable has caption "Module Types"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /caption="Module Types"|caption='Module Types'/,
      'Expected caption="Module Types" on DataTable'
    );
  });

  test('DataTable has column headers: Type, Role, Required, Cardinality', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Type/, 'Expected "Type" column header');
    assert.match(src, /Role/, 'Expected "Role" column header');
    assert.match(src, /Required/, 'Expected "Required" column header');
    assert.match(src, /Cardinality/, 'Expected "Cardinality" column header');
  });

  test('DataTable contains all 6 module types', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Orchestrator/, 'Expected Orchestrator row in DataTable');
    assert.match(src, /Provider/, 'Expected Provider row in DataTable');
    assert.match(src, /Tool/, 'Expected Tool row in DataTable');
    assert.match(
      src,
      /Context\s*Manager|ContextManager/,
      'Expected Context Manager row in DataTable'
    );
    assert.match(
      src,
      /Hook\s*Handler|HookHandler/,
      'Expected Hook Handler row in DataTable'
    );
    assert.match(src, /Resolver/, 'Expected Resolver row in DataTable');
  });

  // ── CodeBlock ─────────────────────────────────────────────────────────────
  test('CodeBlock has filename="mount contract"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /filename="mount contract"|filename='mount contract'/,
      'Expected filename="mount contract" on CodeBlock'
    );
  });

  test('CodeBlock contains mount contract signature', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /async def mount.*coordinator.*config/s,
      'Expected mount contract signature in CodeBlock'
    );
  });

  test('CodeBlock contains Optional[cleanup_fn] return type', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Optional\[cleanup_fn\]/,
      'Expected Optional[cleanup_fn] in mount signature'
    );
  });

  // ── Prose content ─────────────────────────────────────────────────────────
  test('Prose contains loading order content (Orchestrator first)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /loading order|Orchestrator first|fixed order/i,
      'Expected loading order prose content'
    );
  });

  // ── VignettePlaceholder ───────────────────────────────────────────────────
  test('VignettePlaceholder has rationale about animating mount lifecycle', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /mount lifecycle|Animating the mount/i,
      'Expected VignettePlaceholder rationale about mount lifecycle'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter05 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter05 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter05 should not have placeholder "coming soon" text'
    );
  });
});
