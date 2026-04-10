/**
 * Structural tests for Chapter08.astro
 * Tests spec requirements: transcribe .design/sections/08-sessions.md
 * into ChapterEntry, Prose, DataTable, and Diagram blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter08.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter08.astro'
);

describe('Chapter08.astro — content transcription spec', () => {
  // ── Pre-condition ────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter08.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter08.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ──────────────────────────────────────────────────────
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

  test('imports and uses Diagram component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Diagram/, 'Expected Diagram component import and usage');
  });

  // ── ChapterEntry props ───────────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={8} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{8\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Sessions"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Sessions"|title='Sessions'/,
      'Expected title "Sessions" on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "A session is a container."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /A session is a container\./,
      'Expected lead text "A session is a container." from spec'
    );
  });

  // ── Prose: what a session is ─────────────────────────────────────────────
  test('Prose contains what-a-session-is explanation (one running instance)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /container.*one.*instance|one.*running.*instance|container.*running|session.*container/i,
      'Expected prose explaining a session as container for one running instance'
    );
  });

  // ── Prose: four phases ───────────────────────────────────────────────────
  test('Prose contains h2 heading for Create phase', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Create.*<\/h2>/,
      'Expected <h2> heading for Create phase'
    );
  });

  test('Prose contains h2 heading for Initialize phase', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Initialize.*<\/h2>/,
      'Expected <h2> heading for Initialize phase'
    );
  });

  test('Prose contains h2 heading for Execute phase', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Execute.*<\/h2>/,
      'Expected <h2> heading for Execute phase'
    );
  });

  test('Prose contains h2 heading for Cleanup phase', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h2[^>]*>.*Cleanup.*<\/h2>/,
      'Expected <h2> heading for Cleanup phase'
    );
  });

  // ── DataTable ────────────────────────────────────────────────────────────
  test('DataTable has caption "Parent-Child Sessions: Expectations vs Reality"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Parent-Child Sessions.*Expectations vs Reality|Parent.Child Sessions.*Expectations/i,
      'Expected DataTable caption from spec'
    );
  });

  test('DataTable has column headers for "What you might expect" and "What Amplifier does"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /What you might expect/i,
      'Expected "What you might expect" column header in DataTable'
    );
    assert.match(
      src,
      /What Amplifier does/i,
      'Expected "What Amplifier does" column header in DataTable'
    );
  });

  test('DataTable contains parent_id row content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /parent_id/,
      'Expected parent_id in the DataTable comparison rows'
    );
  });

  test('DataTable contains "no shared modules" row content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /[Nn]o shared modules|No shared.*modules/,
      'Expected "no shared modules" content in DataTable'
    );
  });

  test('DataTable contains "self-contained" row content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /self.contained/i,
      'Expected "self-contained" content in DataTable'
    );
  });

  // ── Prose: cancellation ──────────────────────────────────────────────────
  test('Prose contains cancellation section content (cooperative)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /[Cc]ancellation.*cooperative|cooperative.*cancellation|[Cc]ancellation is cooperative/i,
      'Expected prose about cancellation being cooperative'
    );
  });

  test('Prose contains three cancellation states', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    // Check for mentions of the three states
    assert.match(
      src,
      /[Gg]raceful|[Ii]mmediate.*cancellation|[Nn]o cancellation/i,
      'Expected prose about cancellation states (No cancellation / Graceful / Immediate)'
    );
  });

  test('Prose contains cleanup order content (session:end, finally block)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /session:end|finally|cleanup.*order|cleanup.*always/i,
      'Expected prose about cleanup order'
    );
  });

  // ── Diagram ──────────────────────────────────────────────────────────────
  test('Diagram uses session-tree.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /session-tree\.svg/,
      'Expected session-tree.svg in Diagram src'
    );
  });

  // ── Excluded content ─────────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter08 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter08 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter08 should not have placeholder "coming soon" text'
    );
  });
});
