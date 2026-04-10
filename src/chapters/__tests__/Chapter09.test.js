/**
 * Structural tests for Chapter09.astro
 * Tests spec requirements: transcribe .design/sections/09-bundles-and-configuration.md
 * into ChapterEntry, Prose, CodeBlock, and Diagram blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter09.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter09.astro'
);

describe('Chapter09.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter09.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter09.astro to exist at ${CHAPTER_PATH}`
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

  test('imports and uses CodeBlock component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /CodeBlock/, 'Expected CodeBlock component import and usage');
  });

  test('imports and uses Diagram component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Diagram/, 'Expected Diagram component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={9} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{9\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Bundles and Configuration"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Bundles and Configuration"|title='Bundles and Configuration'/,
      'Expected title on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "Bundles are how you package and distribute capabilities."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Bundles are how you package and distribute capabilities\./,
      'Expected lead text from spec'
    );
  });

  // ── Prose content ──────────────────────────────────────────────────
  test('Prose contains two formats explanation (Markdown with YAML frontmatter and Pure YAML)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Markdown with YAML frontmatter/,
      'Expected two formats prose content'
    );
    assert.match(
      src,
      /Pure YAML/,
      'Expected Pure YAML format mention'
    );
  });

  test('Prose contains composition section with merge strategies', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /deep-merged|deep.merge/i,
      'Expected session settings deep-merge mention'
    );
    assert.match(
      src,
      /merge by key/i,
      'Expected module lists merge-by-key mention'
    );
    assert.match(
      src,
      /replaced entirely/i,
      'Expected instruction text replacement mention'
    );
  });

  test('Prose contains @mentions section with recursive resolution and SHA-256', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /@namespace:path\/to\/file\.md/,
      'Expected @mention syntax example'
    );
    assert.match(
      src,
      /SHA-256/,
      'Expected SHA-256 deduplication mention'
    );
    assert.match(
      src,
      /recursive.*three levels|three levels.*recursive|up to three levels/i,
      'Expected recursive resolution mention'
    );
  });

  test('Prose contains live re-reading section about System Prompt Factory', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /re-read.*every.*turn|re-read on every single turn/i,
      'Expected live re-reading content'
    );
    assert.match(
      src,
      /System Prompt Factory/,
      'Expected System Prompt Factory mention'
    );
  });

  // ── CodeBlock ──────────────────────────────────────────────────────
  test('CodeBlock contains minimal bundle example with bundle: key', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /bundle:/,
      'Expected bundle: key in code example'
    );
    assert.match(
      src,
      /tools:/,
      'Expected tools: in code example'
    );
    assert.match(
      src,
      /hooks:/,
      'Expected hooks: in code example'
    );
  });

  test('CodeBlock contains instruction body prose', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /You are a helpful coding assistant/,
      'Expected instruction body in bundle example'
    );
  });

  // ── Diagrams ───────────────────────────────────────────────────────
  test('Diagram uses composition-layers.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /composition-layers\.svg/,
      'Expected composition-layers.svg in Diagram src'
    );
  });

  test('Diagram uses mention-resolution.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /mention-resolution\.svg/,
      'Expected mention-resolution.svg in Diagram src'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter09 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter09 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter09 should not have placeholder "coming soon" text'
    );
  });
});
