/**
 * Structural tests for Chapter03.astro
 * Tests spec requirements: transcribe .design/sections/03-design-philosophy.md
 * into ChapterEntry + Prose + Callout blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter03.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter03.astro'
);

describe('Chapter03.astro — content transcription spec', () => {
  // ── Pre-condition ────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter03.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter03.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ──────────────────────────────────────────────────────
  test('uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  test('imports and uses Callout component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Callout/, 'Expected Callout component import and usage');
  });

  // ── ChapterEntry props ───────────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={3} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{3\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry passes title prop or uses hardcoded "Design Philosophy" title', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    // Either passes title from props or hardcodes the correct title
    assert.match(
      src,
      /title=\{title\}|title="Design Philosophy"|title='Design Philosophy'/,
      'Expected title prop on ChapterEntry (from props or hardcoded)'
    );
  });

  test('ChapterEntry has lead "Three ideas shape how Amplifier is built."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Three ideas shape how Amplifier is built/,
      'Expected lead text from spec'
    );
  });

  // ── Opening prose ────────────────────────────────────────────────────────
  test('Prose contains opening paragraph about principles emerging from code', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /emerged from the code|emerged.*code/,
      'Expected opening paragraph about principles emerging from code'
    );
  });

  // ── Section headings ─────────────────────────────────────────────────────
  test('contains h2 heading "Mechanism, not policy"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Mechanism.*not policy.*<\/h2>/s,
      'Expected <h2> for "Mechanism, not policy"'
    );
  });

  test('contains h2 heading "The center stays still"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*The center stays still.*<\/h2>/s,
      'Expected <h2> for "The center stays still"'
    );
  });

  test('contains h2 heading "Ruthless simplicity"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Ruthless simplicity.*<\/h2>/s,
      'Expected <h2> for "Ruthless simplicity"'
    );
  });

  // ── Section content ──────────────────────────────────────────────────────
  test('contains mechanism-policy content with tool:pre event reference', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /tool:pre|mechanism.*policy|kernel.*fires/i,
      'Expected mechanism vs policy content with event reference'
    );
  });

  test('contains "center stays still" content about new models', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /provider module|new model|new AI model/i,
      'Expected content about new models and provider modules'
    );
  });

  test('contains ruthless simplicity content about kernel and modules', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /kernel.*write|file.writ|zero match/i,
      'Expected ruthless simplicity content about kernel not writing files'
    );
  });

  // ── Callout ──────────────────────────────────────────────────────────────
  test('Callout has label="Key Fact"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /label="Key Fact"|label='Key Fact'/,
      'Expected Callout with label="Key Fact"'
    );
  });

  test('Callout contains grep/amplifier-core/zero matches content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Grep.*amplifier-core|amplifier-core.*file write|Zero matches|zero matches/i,
      'Expected Callout with grep amplifier-core zero matches content'
    );
  });

  // ── Excluded content ─────────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter03 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter03 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /coming soon/i,
      'Chapter03 should not have placeholder "coming soon" text'
    );
  });
});
