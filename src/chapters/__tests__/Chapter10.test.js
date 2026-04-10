/**
 * Structural tests for Chapter10.astro
 * Tests spec requirements: transcribe .design/sections/10-foundation-bridge.md
 * into ChapterEntry, Prose, and Diagram blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter10.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter10.astro'
);

describe('Chapter10.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter10.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter10.astro to exist at ${CHAPTER_PATH}`
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

  test('imports and uses Diagram component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Diagram/, 'Expected Diagram component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={10} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{10\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "The Foundation Bridge"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="The Foundation Bridge"|title='The Foundation Bridge'/,
      'Expected title on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "Foundation is how we use the kernel. It is not the only way."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Foundation is how we use the kernel\. It is not the only way\./,
      'Expected lead text from spec'
    );
  });

  // ── Prose content ──────────────────────────────────────────────────
  test('Prose contains PreparedBundle section with four parts', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /PreparedBundle/,
      'Expected PreparedBundle heading'
    );
    assert.match(
      src,
      /mount plan/,
      'Expected mount plan mention'
    );
    assert.match(
      src,
      /resolver/,
      'Expected resolver mention'
    );
  });

  test('Prose contains 8-step preparation pipeline', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Compile mount plan/,
      'Expected step 1: Compile mount plan'
    );
    assert.match(
      src,
      /Install required Python packages/,
      'Expected step 3: Install required Python packages'
    );
    assert.match(
      src,
      /Package into PreparedBundle/,
      'Expected step 8: Package into PreparedBundle'
    );
  });

  test('Prose contains System Prompt Factory section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /System Prompt Factory/,
      'Expected System Prompt Factory heading'
    );
    assert.match(
      src,
      /every single turn|every turn/i,
      'Expected "every turn" mention'
    );
    assert.match(
      src,
      /SHA-256/,
      'Expected SHA-256 deduplication mention'
    );
  });

  test('Prose contains BundleModuleResolver section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /BundleModuleResolver/,
      'Expected BundleModuleResolver heading'
    );
    assert.match(
      src,
      /on demand during module loading/i,
      'Expected on-demand loading mention'
    );
  });

  test('Prose contains runtime relationship section about callbacks and independence', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Connected at runtime through callbacks/i,
      'Expected runtime callback connection mention'
    );
    assert.match(
      src,
      /Independent at compile time/i,
      'Expected compile-time independence mention'
    );
  });

  test('Prose contains Foundation as convenience layer explanation', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /convenience layer/i,
      'Expected convenience layer explanation'
    );
    assert.match(
      src,
      /kernel does not need it|kernel doesn't need/i,
      'Expected kernel independence mention'
    );
  });

  // ── Diagrams ───────────────────────────────────────────────────────
  test('Diagram uses preparation-pipeline.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /preparation-pipeline\.svg/,
      'Expected preparation-pipeline.svg in Diagram src'
    );
  });

  test('Diagram uses two-callbacks.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /two-callbacks\.svg/,
      'Expected two-callbacks.svg in Diagram src'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter10 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter10 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter10 should not have placeholder "coming soon" text'
    );
  });
});
