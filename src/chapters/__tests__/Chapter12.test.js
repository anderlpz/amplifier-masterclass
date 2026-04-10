/**
 * Structural tests for Chapter12.astro
 * Tests spec requirements: transcribe .design/sections/12-complete-picture.md
 * into ChapterEntry, Prose, Diagram, and ChatPlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter12.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter12.astro'
);

describe('Chapter12.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter12.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter12.astro to exist at ${CHAPTER_PATH}`
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

  test('imports and uses ChatPlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChatPlaceholder/, 'Expected ChatPlaceholder component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={12} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{12\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "The Complete Picture"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="The Complete Picture"|title='The Complete Picture'/,
      'Expected title on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "Each layer depends only on the one below it."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Each layer depends only on the one below it\./,
      'Expected lead text from spec'
    );
  });

  // ── Prose content: Six layers ──────────────────────────────────────
  test('Prose contains Layer 1: Kernel content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 1.*Kernel|Layer 1: Kernel/i,
      'Expected Layer 1 Kernel content'
    );
    assert.match(
      src,
      /amplifier-core/,
      'Expected amplifier-core mention'
    );
  });

  test('Prose contains Layer 2: Modules content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 2.*Modules|Layer 2: Modules/i,
      'Expected Layer 2 Modules content'
    );
  });

  test('Prose contains Layer 3: Bundles content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 3.*Bundles|Layer 3: Bundles/i,
      'Expected Layer 3 Bundles content'
    );
  });

  test('Prose contains Layer 4: Foundation content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 4.*Foundation|Layer 4: Foundation/i,
      'Expected Layer 4 Foundation content'
    );
  });

  test('Prose contains Layer 5: Applications content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 5.*Applications|Layer 5: Applications/i,
      'Expected Layer 5 Applications content'
    );
  });

  test('Prose contains Layer 6: Community content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Layer 6.*Community|Layer 6: Community/i,
      'Expected Layer 6 Community content'
    );
  });

  // ── Prose content: Where new things go ─────────────────────────────
  test('Prose contains "where new things go" section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Where new things go/i,
      'Expected "where new things go" heading'
    );
  });

  test('Prose contains new model example (provider module)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /new AI model|provider module/i,
      'Expected new model as provider module example'
    );
  });

  test('Prose contains hook example (blocking file modifications)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /tool:pre/,
      'Expected tool:pre hook example'
    );
  });

  // ── Prose content: Closing ─────────────────────────────────────────
  test('Prose contains closing line about mechanism and policy', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /kernel provides mechanism.*Modules provide policy/i,
      'Expected closing line about mechanism and policy'
    );
  });

  test('Prose contains forward-looking close about what has not been built', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /most interesting parts/i,
      'Expected "most interesting parts" closing phrase'
    );
    assert.match(
      src,
      /haven't been\s+built yet/i,
      'Expected "haven\'t been built yet" closing'
    );
  });

  test('Prose contains tutorial link', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /amplifier-tutorial/i,
      'Expected Amplifier Tutorial link'
    );
  });

  // ── Diagrams ───────────────────────────────────────────────────────
  test('Diagram uses six-layer-stack.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /six-layer-stack\.svg/,
      'Expected six-layer-stack.svg in Diagram src'
    );
  });

  test('Diagram uses full-system-flow.svg with reading width', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /full-system-flow\.svg/,
      'Expected full-system-flow.svg in Diagram src'
    );
    assert.match(
      src,
      /width="reading"/,
      'Expected reading width on full-system-flow diagram'
    );
  });

  // ── ChatPlaceholder ────────────────────────────────────────────────
  test('ChatPlaceholder has correct prompt from spec', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Finished the masterclass\. Have questions about any concept\?/,
      'Expected ChatPlaceholder prompt from spec'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter12 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter12 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter12 should not have placeholder "coming soon" text'
    );
  });
});
