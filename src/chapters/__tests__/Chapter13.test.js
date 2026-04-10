/**
 * Structural tests for Chapter13.astro
 * Tests spec requirements: transcribe .design/sections/13-appendix-methodology.md
 * into ChapterEntry and Prose blocks (prose-only chapter).
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter13.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter13.astro'
);

describe('Chapter13.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter13.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter13.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ────────────────────────────────────────────────
  test('imports and uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('imports and uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={13} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{13\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Appendix: Research Methodology"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Appendix: Research Methodology"|title='Appendix: Research Methodology'/,
      'Expected title on ChapterEntry'
    );
  });

  test('ChapterEntry has a lead string', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /lead="/,
      'Expected lead prop on ChapterEntry'
    );
  });

  // ── Prose content ──────────────────────────────────────────────────
  test('Prose contains Parallax Discovery methodology mention', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Parallax\s+Discovery/i,
      'Expected Parallax Discovery mention'
    );
  });

  test('Prose contains 7 investigators across 4 teams', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Seven independent investigators|7 independent investigators/i,
      'Expected 7 investigators mention'
    );
    assert.match(
      src,
      /four teams|4 teams/i,
      'Expected 4 teams mention'
    );
  });

  test('Prose contains 805-line reconciliation document', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /805-line/,
      'Expected 805-line reconciliation document mention'
    );
  });

  test('Prose contains 37 verified claims', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /37 verified claims/,
      'Expected 37 verified claims mention'
    );
  });

  test('Prose contains 4 identified discrepancies', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /4 identified discrepancies/,
      'Expected 4 identified discrepancies mention'
    );
  });

  test('Prose contains 8 consolidated unknowns', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /8 consolidated unknowns/,
      'Expected 8 consolidated unknowns mention'
    );
  });

  test('Prose contains source repos: amplifier-core and amplifier-foundation', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /amplifier-core/,
      'Expected amplifier-core source mention'
    );
    assert.match(
      src,
      /amplifier-foundation/,
      'Expected amplifier-foundation source mention'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter13 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter13 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter13 should not have placeholder "coming soon" text'
    );
  });
});
