/**
 * Structural tests for Chapter11.astro
 * Tests spec requirements: transcribe .design/sections/11-agents-context-recipes.md
 * into ChapterEntry, Prose, Diagram, and VignettePlaceholder blocks.
 *
 * Uses Node.js built-in test runner (node:test).
 * Run with: node --test src/chapters/__tests__/Chapter11.test.js
 */

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve } from 'node:path';

const CHAPTER_PATH = resolve(
  import.meta.dirname,
  '../Chapter11.astro'
);

describe('Chapter11.astro — content transcription spec', () => {
  // ── Pre-condition ──────────────────────────────────────────────────
  test('file exists at src/chapters/Chapter11.astro', () => {
    assert.ok(
      existsSync(CHAPTER_PATH),
      `Expected Chapter11.astro to exist at ${CHAPTER_PATH}`
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

  test('imports and uses VignettePlaceholder component', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(src, /VignettePlaceholder/, 'Expected VignettePlaceholder component import and usage');
  });

  // ── ChapterEntry props ─────────────────────────────────────────────
  test('ChapterEntry receives chapterNumber={11} or chapterNumber={number}', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /chapterNumber=\{11\}|chapterNumber=\{number\}/,
      'Expected chapterNumber prop on ChapterEntry'
    );
  });

  test('ChapterEntry has title "Agents, Context Files, Skills, and Recipes"', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /title=\{title\}|title="Agents, Context Files, Skills, and Recipes"/,
      'Expected title on ChapterEntry'
    );
  });

  test('ChapterEntry has lead from spec', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /each one is built from pieces you have already seen/i,
      'Expected lead text from spec'
    );
  });

  // ── Agents section ─────────────────────────────────────────────────
  test('Prose contains agents-are-bundles content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Agents.*are.*bundles|agents.*are.*bundles/i,
      'Expected agents-are-bundles content'
    );
  });

  test('Prose contains meta: vs bundle: frontmatter key distinction', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /bundle:/,
      'Expected bundle: key mention'
    );
    assert.match(
      src,
      /meta:/,
      'Expected meta: key mention'
    );
  });

  test('Prose explains kernel has no concept of agents', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /kernel has no concept of.*agents|kernel.*no concept.*agents/i,
      'Expected kernel-no-agents explanation'
    );
  });

  // ── Context files section ──────────────────────────────────────────
  test('Prose contains context files content about separation of concerns', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /separation of concerns/i,
      'Expected separation of concerns mention'
    );
  });

  test('Prose explains context files as Markdown documents loaded each turn', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Markdown document.*loaded|context file.*Markdown/i,
      'Expected context file as Markdown document explanation'
    );
  });

  // ── Recipes section ────────────────────────────────────────────────
  test('Prose contains recipes content about sequential steps', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /sequence of steps|sequential/i,
      'Expected sequential steps content'
    );
  });

  test('Prose contains approval gates content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Approval gates/i,
      'Expected approval gates content'
    );
  });

  test('Prose contains resumability/checkpoint content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Resumability|checkpoint/i,
      'Expected resumability/checkpoint content'
    );
  });

  // ── Skills section ─────────────────────────────────────────────────
  test('Prose contains three-level progressive disclosure for skills', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /Level 1.*Metadata|Level 1:/i,
      'Expected Level 1 metadata mention'
    );
    assert.match(
      src,
      /Level 2.*Full content|Level 2:/i,
      'Expected Level 2 full content mention'
    );
    assert.match(
      src,
      /Level 3.*Companion|Level 3:/i,
      'Expected Level 3 companion files mention'
    );
  });

  test('Prose contains fork execution content', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /fork execution/i,
      'Expected fork execution mention'
    );
  });

  // ── Modes and model routing section ────────────────────────────────
  test('Prose contains modes content about behavior overlay and tool policies', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /behavior overlay|runtime behavior overlay/i,
      'Expected modes behavior overlay content'
    );
    assert.match(
      src,
      /tool-level/i,
      'Expected tool-level policies mention'
    );
    assert.match(
      src,
      /<code>safe<\/code>/,
      'Expected safe tool policy level'
    );
    assert.match(
      src,
      /<code>block<\/code>/,
      'Expected block tool policy level'
    );
  });

  test('Prose contains model routing content about semantic roles', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /routing matrix/i,
      'Expected routing matrix mention'
    );
    assert.match(
      src,
      /coding.*reasoning.*critique|type of thinking/i,
      'Expected semantic role examples'
    );
  });

  // ── Diagram ────────────────────────────────────────────────────────
  test('Diagram uses recipe-pipeline.svg', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /recipe-pipeline\.svg/,
      'Expected recipe-pipeline.svg in Diagram src'
    );
  });

  // ── VignettePlaceholder ────────────────────────────────────────────
  test('VignettePlaceholder has rationale about recipe workflow animation', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.match(
      src,
      /recipe.*animation|3-step recipe|workflow pattern/i,
      'Expected VignettePlaceholder rationale about recipe workflow animation'
    );
  });

  // ── Excluded content ───────────────────────────────────────────────
  test('does NOT contain Presentation Slides section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Presentation Slides/,
      'Chapter11 should not render the Presentation Slides section'
    );
  });

  test('does NOT contain Speaker Notes section', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Speaker Notes/,
      'Chapter11 should not render the Speaker Notes section'
    );
  });

  test('does NOT contain placeholder "coming soon" text from old stub', () => {
    const src = readFileSync(CHAPTER_PATH, 'utf8');
    assert.doesNotMatch(
      src,
      /Full chapter content coming soon/i,
      'Chapter11 should not have placeholder "coming soon" text'
    );
  });
});
