/**
 * Structural tests for Chapter02.astro
 * Tests spec requirements: transcribe .design/sections/02-architecture-map.md
 * into ChapterEntry + Prose + Diagram blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter02.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter02.astro'
);

describe('Chapter02.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter02.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter02.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ────────────────────────────────────────────────────
  test('uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  test('imports Diagram component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Diagram/, 'Expected Diagram component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────────
  test('ChapterEntry receives number=2 or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{2\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry passes title prop or uses hardcoded title', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    // Either passes title from props or hardcodes the correct title
    assert.match(
      src,
      /title=\{title\}|title="The Architecture Map"|title='The Architecture Map'/,
      'Expected title prop on ChapterEntry (from props or hardcoded)'
    );
  });

  test('ChapterEntry has lead "A map of the territory before we walk through it."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /A map of the territory before we walk through it/,
      'Expected lead text from spec'
    );
  });

  // ── Diagram block ──────────────────────────────────────────────────────
  test('Diagram references architecture-stack.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /architecture-stack\.svg/,
      'Expected architecture-stack.svg reference in Diagram component'
    );
  });

  test('Diagram has width="wide"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /width="wide"|width=\{["']wide["']\}/,
      'Expected width="wide" on Diagram component'
    );
  });

  test('Diagram has appropriate alt text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Architecture overview showing kernel/,
      'Expected alt text describing architecture overview with kernel reference'
    );
  });

  test('Diagram has a caption', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /caption=/,
      'Expected caption prop on Diagram component'
    );
  });

  // ── Prose content ──────────────────────────────────────────────────────
  test('Prose contains city map neighborhoods metaphor', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /neighborhoods|city map/,
      'Expected city map / neighborhoods metaphor from spec'
    );
  });

  test('Prose contains kernel description', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /kernel/,
      'Expected kernel description in Prose'
    );
  });

  test('Prose contains amplifier-core reference', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /amplifier-core/,
      'Expected amplifier-core reference in Prose'
    );
  });

  // ── Presentation slides NOT included ───────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter02 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter02 should not render the Speaker Notes section'
    );
  });
});
