/**
 * Structural tests for Chapter06.astro
 * Tests spec requirements: transcribe .design/sections/06-orchestrator-and-loop.md
 * into ChapterEntry, Prose, Diagram (reasoning-loop.svg), VignettePlaceholder,
 * and ChatPlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter06.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter06.astro'
);

describe('Chapter06.astro — content transcription spec', () => {
  // ── Pre-condition ────────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter06.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter06.astro to exist at ${CHAPTER_PATH}`
    );
  });

  // ── Block structure ──────────────────────────────────────────────────
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

  test('imports and uses VignettePlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /VignettePlaceholder/, 'Expected VignettePlaceholder component import and usage');
  });

  test('imports and uses ChatPlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /ChatPlaceholder/, 'Expected ChatPlaceholder component import and usage');
  });

  // ── ChapterEntry props ───────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={6} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{6\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "The Orchestrator"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="The Orchestrator"|title='The Orchestrator'/,
      'Expected title "The Orchestrator" on ChapterEntry'
    );
  });

  test('ChapterEntry has lead "One module gets live access to the full system at runtime."', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /One module gets live access to the full system at runtime\./,
      'Expected lead text from spec'
    );
  });

  // ── Diagram ──────────────────────────────────────────────────────────
  test('Diagram uses reasoning-loop.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /reasoning-loop\.svg/,
      'Expected reasoning-loop.svg in Diagram src'
    );
  });

  test('Diagram has width="wide"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /width="wide"|width='wide'/,
      'Expected width="wide" on Diagram'
    );
  });

  test('Diagram has caption mentioning OODA loop', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /OODA|THINK.*ACT.*OBSERVE|think.*act.*observe/i,
      'Expected OODA loop reference in Diagram caption'
    );
  });

  // ── Prose content ────────────────────────────────────────────────────
  test('Prose contains privilege gap content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /privilege gap|Coordinator.*runtime|runtime.*Coordinator/i,
      'Expected privilege gap prose content'
    );
  });

  test('Prose contains agent loop / str return boundary content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /plain string|str\b|return.*string|string.*return/i,
      'Expected str return boundary prose content'
    );
  });

  // ── VignettePlaceholder ──────────────────────────────────────────────
  test('VignettePlaceholder has width="wide"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    // Already checked width="wide" above; here confirm VignettePlaceholder specifically has it
    assert.match(
      src,
      /VignettePlaceholder[\s\S]{0,100}width="wide"|VignettePlaceholder[\s\S]{0,100}width='wide'/,
      'Expected width="wide" on VignettePlaceholder'
    );
  });

  test('VignettePlaceholder has rationale about 4-phase cycle animation', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /4-phase cycle|4 phase cycle|loop with each phase|Animation of the loop/i,
      'Expected VignettePlaceholder rationale about 4-phase cycle animation'
    );
  });

  // ── ChatPlaceholder ──────────────────────────────────────────────────
  test('ChatPlaceholder has correct prompt', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Have a question about how the orchestrator drives the agent loop\?/,
      'Expected ChatPlaceholder prompt from spec'
    );
  });

  // ── Excluded content ─────────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter06 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter06 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter06 should not have placeholder "coming soon" text'
    );
  });
});
