/**
 * Compile-time and structural validation for chapters.ts.
 * This file will FAIL to compile (RED) if chapters.ts does not exist.
 * After chapters.ts is created, it should compile cleanly (GREEN).
 */
import { chapters } from './chapters';
import type { Chapter, ChapterBlock } from './chapters';

// --- Compile-time type assertions ---

// chapters must be assignable to Chapter[]
const _typed: Chapter[] = chapters;

// ChapterBlock.type must include all required values
const _blockTypeProse: ChapterBlock['type'] = 'prose';
const _blockTypeDiagram: ChapterBlock['type'] = 'diagram';
const _blockTypeTable: ChapterBlock['type'] = 'table';
const _blockTypeCode: ChapterBlock['type'] = 'code';
const _blockTypeVignette: ChapterBlock['type'] = 'vignette';
const _blockTypeAudio: ChapterBlock['type'] = 'audio';
const _blockTypeChat: ChapterBlock['type'] = 'chat';
const _blockTypeScrollytelling: ChapterBlock['type'] = 'scrollytelling';

// ChapterBlock.width must include all required values
const _widthReading: ChapterBlock['width'] = 'reading';
const _widthWide: ChapterBlock['width'] = 'wide';
const _widthFull: ChapterBlock['width'] = 'full';

// ChapterBlock.status must allow 'stub'
const _statusStub: ChapterBlock['status'] = 'stub';

// Suppress unused variable warnings
void _typed;
void _blockTypeProse; void _blockTypeDiagram; void _blockTypeTable;
void _blockTypeCode; void _blockTypeVignette; void _blockTypeAudio;
void _blockTypeChat; void _blockTypeScrollytelling;
void _widthReading; void _widthWide; void _widthFull;
void _statusStub;

// --- Runtime structural checks (run via: node --loader ts-node/esm src/data/chapters.validate.ts) ---

function assertChaptersStructure(): void {
  if (chapters.length !== 13) {
    throw new Error(`Expected exactly 13 chapters, got ${chapters.length}`);
  }

  const requiredNumbers = Array.from({ length: 13 }, (_, i) => i + 1);
  for (const expected of requiredNumbers) {
    const ch = chapters.find((c: Chapter) => c.number === expected);
    if (!ch) throw new Error(`Missing chapter number ${expected}`);
    if (!ch.title) throw new Error(`Chapter ${expected} missing title`);
    if (!ch.slug) throw new Error(`Chapter ${expected} missing slug`);
    if (!ch.lead) throw new Error(`Chapter ${expected} missing lead`);
    if (!Array.isArray(ch.blocks) || ch.blocks.length === 0) {
      throw new Error(`Chapter ${expected} missing blocks array`);
    }
    // Every chapter must have a prose block
    const hasProse = ch.blocks.some((b: ChapterBlock) => b.type === 'prose');
    if (!hasProse) throw new Error(`Chapter ${expected} missing prose block`);
  }

  console.log('✓ chapters.ts validation passed: 13 chapters, all required fields present');
}

assertChaptersStructure();
