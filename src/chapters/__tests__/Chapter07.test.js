/**
 * Structural tests for Chapter07.astro
 * Tests spec requirements: transcribe .design/sections/07-tools-vs-hooks.md
 * into ChapterEntry, Prose, ComparisonLayout, Diagram (tools-vs-hooks.svg),
 * CascadeVisualization, VignettePlaceholder, and ChatPlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter07.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter07.astro'
);

describe('Chapter07.astro — content transcription spec', () => {
  // ── Pre-condition ────────────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter07.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter07.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ──────────────────────────────────────────────────────────
  test('imports and uses ChapterEntry component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChapterEntry/, 'Expected ChapterEntry component usage');
  });

  test('imports and uses Prose component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Prose/, 'Expected Prose component usage');
  });

  test('imports and uses ComparisonLayout component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ComparisonLayout/, 'Expected ComparisonLayout component import and usage');
  });

  test('imports and uses Diagram component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /Diagram/, 'Expected Diagram component import and usage');
  });

  test('imports and uses CascadeVisualization component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /CascadeVisualization/, 'Expected CascadeVisualization component import and usage');
  });

  test('imports and uses VignettePlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /VignettePlaceholder/, 'Expected VignettePlaceholder component import and usage');
  });

  test('imports and uses ChatPlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChatPlaceholder/, 'Expected ChatPlaceholder component import and usage');
  });

  // ── ChapterEntry props ───────────────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={7} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{7\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Tools vs Hooks"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Tools vs Hooks"|title='Tools vs Hooks'/,
      'Expected title "Tools vs Hooks" on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "The critical distinction in the system."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /The critical distinction in the system\./,
      'Expected lead text from spec'
    );
  });

  // ── ComparisonLayout content ─────────────────────────────────────────────────
  test('ComparisonLayout has Tools slot content about AI-decided / visible / intentional', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /AI-decided|AI decides|model.*sees|visible.*intentional|intentional.*visible/i,
      'Expected Tools slot content about AI-decided / visible / intentional'
    );
  });

  test('ComparisonLayout has Hooks slot content about Code-decided / invisible / automatic', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Code-decided|code decides|Invisible to the model|fire automatically/i,
      'Expected Hooks slot content about Code-decided / invisible / automatic'
    );
  });

  // ── Diagram ──────────────────────────────────────────────────────────────────
  test('Diagram uses tools-vs-hooks.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /tools-vs-hooks\.svg/,
      'Expected tools-vs-hooks.svg in Diagram src'
    );
  });

  // ── CascadeVisualization ─────────────────────────────────────────────────────
  test('CascadeVisualization component is used (self-contained, no props)', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /<CascadeVisualization\s*\/>/,
      'Expected <CascadeVisualization /> self-closing tag'
    );
  });

  // ── Prose content ────────────────────────────────────────────────────────────
  test('Prose contains content about both being modules but in different realms', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Both are modules|both are modules/i,
      'Expected opening prose about both being modules'
    );
  });

  test('Prose contains tools explanation mentioning model choosing / tool calls in history', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chooses|tool call|system prompt|model.*sees|visible/i,
      'Expected tools explanation prose'
    );
  });

  test('Prose contains hooks explanation mentioning inject_context', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /inject_context|inject context/i,
      'Expected inject_context prose content'
    );
  });

  test('Prose contains 41 canonical events content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /41 canonical|41 events/i,
      'Expected 41 canonical events prose content'
    );
  });

  test('Prose contains error handling / non-fatal hook errors content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /error.*swallowed|non-fatal|hook.*error|error.*hook|crashed.*hook|hook.*crash/i,
      'Expected hook error handling prose content'
    );
  });

  // ── VignettePlaceholder ──────────────────────────────────────────────────────
  test('VignettePlaceholder has rationale about animating the cascade', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /animat|cascade.*flow|flow.*cascade/i,
      'Expected VignettePlaceholder rationale about animating the cascade'
    );
  });

  // ── ChatPlaceholder ──────────────────────────────────────────────────────────
  test('ChatPlaceholder has correct prompt from spec', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Not sure whether something should be a tool or a hook\? Ask here\./,
      'Expected ChatPlaceholder prompt from spec'
    );
  });

  // ── Excluded content ─────────────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter07 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter07 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter07 should not have placeholder "coming soon" text'
    );
  });
});
