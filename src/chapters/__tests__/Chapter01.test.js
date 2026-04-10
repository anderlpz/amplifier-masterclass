/**
 * Structural tests for Chapter01.astro
 * Tests spec requirements: transcribe .design/sections/01-introduction.md
 * into ChapterEntry + Prose blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter01.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter01.astro'
);

describe('Chapter01.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter01.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter01.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ────────────────────────────────────────────────────────
  test('uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────────────
  test('ChapterEntry receives number=1 or chapterNumber', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    // Either hardcoded 1 or uses the number prop
    assert.match(
      src,
      /chapterNumber=\{1\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has AI harness lead text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /AI harness/,
      'Expected "AI harness" text in ChapterEntry lead or Prose'
    );
  });

  // ── Prose content ──────────────────────────────────────────────────────────
  test('Prose contains harness metaphor paragraph', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /That sentence is deliberately simple/,
      'Expected harness metaphor paragraph in Prose'
    );
  });

  test('Prose contains OS analogy heading', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h3>.*[Tt]he design borrows from operating systems/,
      'Expected OS analogy heading as <h3>'
    );
  });

  test('Prose contains OS analogy content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /operating system/,
      'Expected OS analogy content in Prose'
    );
  });

  test('Prose contains amplifier-core inline code reference', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<code>amplifier-core<\/code>/,
      'Expected <code>amplifier-core</code> inline code reference'
    );
  });

  test('Prose contains "What this document covers" heading', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<h3>.*[Ww]hat this document covers/,
      'Expected "What this document covers" heading as <h3>'
    );
  });

  test('Prose contains bullet list of topics', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /<ul>/, 'Expected <ul> element for bullet list');
    assert.match(src, /<li>/, 'Expected <li> elements in list');
  });

  test('Prose contains Architecture map list item', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Architecture map/,
      'Expected "Architecture map" in bullet list'
    );
  });

  test('Prose contains Design philosophy list item', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Design philosophy/,
      'Expected "Design philosophy" in bullet list'
    );
  });

  // ── Presentation slides NOT included ──────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter01 should not render the Presentation Slides section'
    );
  });
});
