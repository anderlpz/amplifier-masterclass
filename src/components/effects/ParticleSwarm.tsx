/**
 * ParticleSwarm.tsx
 *
 * Canvas 2D atmospheric swarm — the living presence underlying the masterclass.
 * 10,000 particles on desktop, 4,000 on mobile, using boids-algorithm flocking
 * (separation, alignment, cohesion) with per-section attractor formations.
 *
 * Visual narrative: Pre-flock → Strata → Silence → Dense core → Branching
 * streams → THE VORTEX → Split schools → Spawning tree → Nested rings →
 * Bridge span → Convergence → Silence (reprise) → Fading embers
 *
 * Placed via: <ParticleSwarm client:only="react" />
 * Position: fixed, z-index 0, pointer-events none — behind all section content.
 */

import { useEffect, useRef } from 'react';

// ─────────────────────────────────────────────────────────────────────────────
// Constants
// ─────────────────────────────────────────────────────────────────────────────

const DESKTOP_COUNT = 10_000;
const MOBILE_COUNT = 4_000;
const MOBILE_BP = 768;

// Particle appearance
const BASE_ALPHA = 0.10;        // base draw opacity (on dark sections)
const PARTICLE_PX = 1.5;        // radius in canvas pixels

// Physics
const MAX_SPEED = 1.5;          // px / frame
const MIN_SPEED = 0.15;         // prevents full stop
const DAMPING = 0.985;          // velocity decay per frame
const MAX_FORCE = 0.055;        // clamp acceleration magnitude

// Boids radii (px)
const SEP_RADIUS = 18;
const ALN_RADIUS = 45;
const COH_RADIUS = 45;
const SEP_RADIUS2 = SEP_RADIUS * SEP_RADIUS;
const ALN_RADIUS2 = ALN_RADIUS * ALN_RADIUS;
const COH_RADIUS2 = COH_RADIUS * COH_RADIUS;
const BOID_MAX_RADIUS2 = Math.max(ALN_RADIUS2, COH_RADIUS2);

// Boids weights
const SEP_WEIGHT = 1.5;
const ALN_WEIGHT = 1.0;
const COH_WEIGHT = 0.8;

// Spatial hash
const CELL_SIZE = 50;           // must be ≥ ALN_RADIUS for 3×3 coverage

// Timing
const TRANSITION_MS = 2000;     // section-switch blend duration
const ALPHA_FADE_MS = 1200;     // dissolve/reconstitute duration

// Cursor repulsion (desktop only)
const CURSOR_RADIUS = 120;
const CURSOR_RADIUS2 = CURSOR_RADIUS * CURSOR_RADIUS;
const CURSOR_FORCE = 0.08;

// Stable group slots per particle (LCM of all attractor arities)
const NUM_GROUPS = 30;

// ─────────────────────────────────────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────────────────────────────────────

type AttractorType =
  | 'scatter' | 'layers' | 'dissolve' | 'core' | 'radiate'
  | 'vortex' | 'split' | 'tree' | 'nested' | 'bridge' | 'converge';

interface SectionConfig {
  type: AttractorType;
  strength: number;
  layers?: number;
  radius?: number;
  streams?: number;
  rings?: number;
  foci?: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  /** Stable integer 0–29 for group membership across all attractor arities */
  group: number;
  /** Stable float 0–1 for intra-group positional spread */
  offset: number;
}

/** All mutable simulation state lives here — never in React state. */
interface SimState {
  particles: Particle[];
  // Spatial hash
  grid: number[][];   // flat cell array, cell i = grid[i]
  gridW: number;
  gridH: number;
  // Viewport
  W: number;
  H: number;
  // Animation
  frameIndex: number;
  rafId: number;
  // Section transition
  activeSection: string;
  prevSection: string;
  transitionStart: number;  // performance.now() when transition began
  transitionT: number;      // eased 0→1 progress
  // Opacity (dissolve / reconstitute for parchment sections)
  targetAlpha: number;      // 1 = dark sections, 0 = parchment
  currentAlpha: number;
  alphaStart: number;       // timestamp
  // Cursor
  mouseX: number;
  mouseY: number;
  mouseActive: boolean;
}

// ─────────────────────────────────────────────────────────────────────────────
// Section Configurations
// ─────────────────────────────────────────────────────────────────────────────

const SECTION_CONFIGS: Record<string, SectionConfig> = {
  s1:  { type: 'scatter',  strength: 0.001 },
  s2:  { type: 'layers',   strength: 0.003, layers: 5 },
  s3:  { type: 'dissolve', strength: 0 },
  s4:  { type: 'core',     strength: 0.005, radius: 0.15 },
  s5:  { type: 'radiate',  strength: 0.004, streams: 6 },
  s6:  { type: 'vortex',   strength: 0.006, radius: 0.25 },
  s7:  { type: 'split',    strength: 0.004 },
  s8:  { type: 'tree',     strength: 0.003 },
  s9:  { type: 'nested',   strength: 0.004, rings: 3 },
  s10: { type: 'bridge',   strength: 0.003 },
  s11: { type: 'converge', strength: 0.005, foci: 2 },
  s12: { type: 'dissolve', strength: 0 },
  s13: { type: 'scatter',  strength: 0.0005 },
};

const DEFAULT_CONFIG = SECTION_CONFIGS['s1'];

/** Sections rendered on parchment — swarm fully dissolves here */
const PARCHMENT_SECTIONS = new Set(['s3', 's12']);

// Tree cluster positions (fraction of viewport)
const TREE_CLUSTERS: ReadonlyArray<[number, number]> = [
  [0.50, 0.22],   // parent
  [0.30, 0.50],   // child left
  [0.70, 0.50],   // child right
  [0.18, 0.76],   // grandchild far-left
  [0.50, 0.76],   // grandchild center
  [0.82, 0.76],   // grandchild far-right
];

// ─────────────────────────────────────────────────────────────────────────────
// Spatial Hash Utilities
// ─────────────────────────────────────────────────────────────────────────────

function buildGrid(W: number, H: number): { grid: number[][]; gridW: number; gridH: number } {
  const gridW = Math.ceil(W / CELL_SIZE) + 2;  // +2 for edge buffer
  const gridH = Math.ceil(H / CELL_SIZE) + 2;
  const total = gridW * gridH;
  const grid: number[][] = new Array(total);
  for (let i = 0; i < total; i++) grid[i] = [];
  return { grid, gridW, gridH };
}

function clearGrid(state: SimState): void {
  const len = state.grid.length;
  for (let i = 0; i < len; i++) state.grid[i].length = 0;
}

function insertParticle(state: SimState, idx: number): void {
  const { x, y } = state.particles[idx];
  const cx = Math.floor(x / CELL_SIZE);
  const cy = Math.floor(y / CELL_SIZE);
  if (cx >= 0 && cx < state.gridW && cy >= 0 && cy < state.gridH) {
    state.grid[cy * state.gridW + cx].push(idx);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// Attractor System
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Returns the acceleration [ax, ay] to apply for this particle's attractor.
 * Vortex is handled separately (position-dependent, needs current p.x/p.y).
 */
function attractorForce(
  cfg: SectionConfig,
  p: Particle,
  W: number,
  H: number,
  frame: number,
  weight: number,   // 0–1 blend weight
): [number, number] {
  if (weight <= 0 || cfg.strength <= 0) return [0, 0];
  if (cfg.type === 'scatter' || cfg.type === 'dissolve') return [0, 0];

  const cx = W * 0.5;
  const cy = H * 0.5;
  const minDim = Math.min(W, H);
  const s = cfg.strength * weight;

  let tx: number;
  let ty: number;

  switch (cfg.type) {
    case 'layers': {
      // Five horizontal strata — particles assigned by group, spread via offset
      const layers = cfg.layers ?? 5;
      const layer = p.group % layers;
      tx = cx + (p.offset - 0.5) * W * 0.9;
      ty = (layer + 0.5) * H / layers;
      break;
    }

    case 'core': {
      // Dense central mass — tight scatter around center
      const jitter = (cfg.radius ?? 0.15) * minDim;
      tx = cx + (p.offset - 0.5) * jitter * 0.6;
      ty = cy + ((p.group / NUM_GROUPS) - 0.5) * jitter * 0.6;
      break;
    }

    case 'radiate': {
      // Six streams radiating from center
      const streams = cfg.streams ?? 6;
      const stream = p.group % streams;
      const angle = (stream / streams) * Math.PI * 2;
      const distMin = 0.08 * minDim;
      const distMax = 0.46 * minDim;
      const dist = distMin + p.offset * (distMax - distMin);
      tx = cx + Math.cos(angle) * dist;
      ty = cy + Math.sin(angle) * dist;
      break;
    }

    case 'vortex': {
      // Orbital — target is a point ahead of particle on the orbit circle
      const r = (cfg.radius ?? 0.25) * minDim;
      const dx = p.x - cx;
      const dy = p.y - cy;
      const angle = Math.atan2(dy, dx);
      // Inner groups orbit faster (more variation = more organic texture)
      const angSpeed = 0.007 + (p.group / NUM_GROUPS) * 0.007;
      const targetAngle = angle + angSpeed;
      tx = cx + Math.cos(targetAngle) * r;
      ty = cy + Math.sin(targetAngle) * r;
      // Additionally pull radially toward target radius (corrects drift in/out)
      const dist = Math.sqrt(dx * dx + dy * dy) || 0.001;
      const radErr = dist - r;
      const rx = (dx / dist) * radErr * s * 0.4;
      const ry = (dy / dist) * radErr * s * 0.4;
      return [(tx - p.x) * s - rx, (ty - p.y) * s - ry];
    }

    case 'split': {
      // Bilateral — left half and right half, opposite vertical flows
      const side = p.group % 2;
      tx = side === 0 ? W * 0.25 : W * 0.75;
      ty = cy + (p.offset - 0.5) * H * 0.82;
      break;
    }

    case 'tree': {
      // Parent + child clusters arranged in a branching tree
      const [rx, ry] = TREE_CLUSTERS[p.group % TREE_CLUSTERS.length];
      tx = rx * W;
      ty = ry * H;
      break;
    }

    case 'nested': {
      // Three concentric orbiting rings — inner rings orbit faster
      const rings = cfg.rings ?? 3;
      const ring = p.group % rings;
      const rMin = 0.09 * minDim;
      const rMax = 0.40 * minDim;
      const r = rings === 1 ? rMin : rMin + (ring / (rings - 1)) * (rMax - rMin);
      const speed = 0.0035 - ring * 0.0008;   // inner orbits faster
      const angle = p.offset * Math.PI * 2 + frame * speed;
      tx = cx + Math.cos(angle) * r;
      ty = cy + Math.sin(angle) * r;
      break;
    }

    case 'bridge': {
      // Two endpoint clusters with a live conduit between them
      const zone = p.group % 3;
      if (zone === 0) {
        // Left cluster
        tx = W * 0.13;
        ty = cy + (p.offset - 0.5) * H * 0.50;
      } else if (zone === 2) {
        // Right cluster
        tx = W * 0.87;
        ty = cy + (p.offset - 0.5) * H * 0.50;
      } else {
        // Bridge stream — particles target positions along the span
        tx = W * 0.13 + p.offset * W * 0.74;
        ty = cy + Math.sin(p.offset * Math.PI) * H * 0.06;
      }
      break;
    }

    case 'converge': {
      // Multiple clusters converging toward shared focal points
      const foci = cfg.foci ?? 2;
      const f = p.group % foci;
      if (foci === 2) {
        tx = f === 0 ? W * 0.36 : W * 0.64;
        ty = cy + (p.offset - 0.5) * H * 0.25;
      } else {
        const angle = (f / foci) * Math.PI * 2;
        tx = cx + Math.cos(angle) * W * 0.22;
        ty = cy + Math.sin(angle) * H * 0.22;
      }
      break;
    }

    default:
      return [0, 0];
  }

  return [(tx - p.x) * s, (ty - p.y) * s];
}

// ─────────────────────────────────────────────────────────────────────────────
// Easing
// ─────────────────────────────────────────────────────────────────────────────

function easeInOut(t: number): number {
  return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
}

// ─────────────────────────────────────────────────────────────────────────────
// Particle Initialization
// ─────────────────────────────────────────────────────────────────────────────

function createParticles(count: number, W: number, H: number): Particle[] {
  const particles: Particle[] = new Array(count);
  for (let i = 0; i < count; i++) {
    const angle = Math.random() * Math.PI * 2;
    const speed = 0.2 + Math.random() * 0.8;
    particles[i] = {
      x: Math.random() * W,
      y: Math.random() * H,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      group: i % NUM_GROUPS,
      offset: Math.random(),
    };
  }
  return particles;
}

// ─────────────────────────────────────────────────────────────────────────────
// Simulation Step
// ─────────────────────────────────────────────────────────────────────────────

function simulate(state: SimState, now: number): void {
  const { particles, W, H } = state;
  const N = particles.length;

  // Update transition progress
  const rawT = Math.min(1, (now - state.transitionStart) / TRANSITION_MS);
  state.transitionT = easeInOut(rawT);
  const t = state.transitionT;

  // Update alpha (dissolve/reconstitute)
  const alphaRaw = Math.min(1, (now - state.alphaStart) / ALPHA_FADE_MS);
  if (state.currentAlpha !== state.targetAlpha) {
    const prevAlpha = state.targetAlpha === 0
      ? 1 - alphaRaw   // fading out
      : alphaRaw;      // fading in
    state.currentAlpha = Math.max(0, Math.min(1, prevAlpha));
  }

  // Lookup current and previous section configs
  const curCfg = SECTION_CONFIGS[state.activeSection] ?? DEFAULT_CONFIG;
  const prevCfg = SECTION_CONFIGS[state.prevSection] ?? DEFAULT_CONFIG;

  // Rebuild spatial hash
  clearGrid(state);
  for (let i = 0; i < N; i++) insertParticle(state, i);

  // Update each particle
  for (let i = 0; i < N; i++) {
    const p = particles[i];
    let ax = 0;
    let ay = 0;

    // ── Boids: find neighbors ────────────────────────────────────────────
    let sepX = 0, sepY = 0, sepN = 0;
    let alnVX = 0, alnVY = 0, alnN = 0;
    let cohX = 0, cohY = 0, cohN = 0;

    const pcx = Math.floor(p.x / CELL_SIZE);
    const pcy = Math.floor(p.y / CELL_SIZE);

    for (let dcy = -1; dcy <= 1; dcy++) {
      for (let dcx = -1; dcx <= 1; dcx++) {
        const nx = pcx + dcx;
        const ny = pcy + dcy;
        if (nx < 0 || nx >= state.gridW || ny < 0 || ny >= state.gridH) continue;
        const cell = state.grid[ny * state.gridW + nx];
        const cellLen = cell.length;

        for (let ci = 0; ci < cellLen; ci++) {
          const j = cell[ci];
          if (j === i) continue;
          const q = particles[j];
          const dx = p.x - q.x;
          const dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;

          // Skip anything beyond the largest boid radius (avoid sqrt)
          if (d2 > BOID_MAX_RADIUS2 || d2 === 0) continue;

          const d = Math.sqrt(d2);

          if (d2 < SEP_RADIUS2) {
            // Separation: push away, weighted inversely by distance
            const inv = 1 / d;
            sepX += dx * inv;
            sepY += dy * inv;
            sepN++;
          }
          if (d2 < ALN_RADIUS2) {
            alnVX += q.vx;
            alnVY += q.vy;
            alnN++;
          }
          if (d2 < COH_RADIUS2) {
            cohX += q.x;
            cohY += q.y;
            cohN++;
          }
        }
      }
    }

    // ── Apply boid forces ────────────────────────────────────────────────
    if (sepN > 0) {
      let fx = sepX / sepN;
      let fy = sepY / sepN;
      const mag = Math.sqrt(fx * fx + fy * fy);
      if (mag > MAX_FORCE) { const inv = MAX_FORCE / mag; fx *= inv; fy *= inv; }
      ax += fx * SEP_WEIGHT;
      ay += fy * SEP_WEIGHT;
    }

    if (alnN > 0) {
      let dvx = alnVX / alnN - p.vx;
      let dvy = alnVY / alnN - p.vy;
      const mag = Math.sqrt(dvx * dvx + dvy * dvy);
      if (mag > MAX_FORCE) { const inv = MAX_FORCE / mag; dvx *= inv; dvy *= inv; }
      ax += dvx * ALN_WEIGHT;
      ay += dvy * ALN_WEIGHT;
    }

    if (cohN > 0) {
      let steerX = cohX / cohN - p.x;
      let steerY = cohY / cohN - p.y;
      const mag = Math.sqrt(steerX * steerX + steerY * steerY);
      if (mag > MAX_FORCE) { const inv = MAX_FORCE / mag; steerX *= inv; steerY *= inv; }
      ax += steerX * COH_WEIGHT;
      ay += steerY * COH_WEIGHT;
    }

    // ── Attractor forces (blended between prev and current section) ──────
    // Previous section fades out as t → 1
    if (t < 1) {
      const [fax, fay] = attractorForce(prevCfg, p, W, H, state.frameIndex, 1 - t);
      ax += fax;
      ay += fay;
    }
    // Current section fades in as t → 1
    {
      const [fax, fay] = attractorForce(curCfg, p, W, H, state.frameIndex, t);
      ax += fax;
      ay += fay;
    }

    // ── Cursor repulsion ─────────────────────────────────────────────────
    if (state.mouseActive) {
      const mdx = p.x - state.mouseX;
      const mdy = p.y - state.mouseY;
      const md2 = mdx * mdx + mdy * mdy;
      if (md2 < CURSOR_RADIUS2 && md2 > 0) {
        const md = Math.sqrt(md2);
        const strength = (1 - md / CURSOR_RADIUS) * CURSOR_FORCE;
        ax += (mdx / md) * strength;
        ay += (mdy / md) * strength;
      }
    }

    // ── Integrate ────────────────────────────────────────────────────────
    let nvx = (p.vx + ax) * DAMPING;
    let nvy = (p.vy + ay) * DAMPING;

    const spd2 = nvx * nvx + nvy * nvy;
    if (spd2 > MAX_SPEED * MAX_SPEED) {
      const inv = MAX_SPEED / Math.sqrt(spd2);
      nvx *= inv;
      nvy *= inv;
    } else if (spd2 < MIN_SPEED * MIN_SPEED && spd2 > 0) {
      const inv = MIN_SPEED / Math.sqrt(spd2);
      nvx *= inv;
      nvy *= inv;
    } else if (spd2 === 0) {
      nvx = (Math.random() - 0.5) * MIN_SPEED;
      nvy = (Math.random() - 0.5) * MIN_SPEED;
    }

    p.vx = nvx;
    p.vy = nvy;
    p.x += nvx;
    p.y += nvy;

    // ── Wrap at viewport edges ───────────────────────────────────────────
    if (p.x < -4) p.x += W + 4;
    else if (p.x > W + 4) p.x -= W + 4;
    if (p.y < -4) p.y += H + 4;
    else if (p.y > H + 4) p.y -= H + 4;
  }

  state.frameIndex++;
}

// ─────────────────────────────────────────────────────────────────────────────
// Render
// ─────────────────────────────────────────────────────────────────────────────

function render(ctx: CanvasRenderingContext2D, state: SimState): void {
  const { particles, W, H, currentAlpha } = state;

  ctx.clearRect(0, 0, W, H);

  if (currentAlpha < 0.005) return;   // fully dissolved — skip draw entirely

  const alpha = BASE_ALPHA * currentAlpha;
  ctx.fillStyle = `rgba(250, 250, 248, ${alpha.toFixed(4)})`;

  // Batch all particle rects into a single path for efficiency
  ctx.beginPath();
  const N = particles.length;
  const size = PARTICLE_PX * 2;
  for (let i = 0; i < N; i++) {
    const { x, y } = particles[i];
    ctx.rect(x - PARTICLE_PX, y - PARTICLE_PX, size, size);
  }
  ctx.fill();
}

// ─────────────────────────────────────────────────────────────────────────────
// React Component
// ─────────────────────────────────────────────────────────────────────────────

export default function ParticleSwarm() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stateRef = useRef<SimState | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: true });
    if (!ctx) return;

    // ── Reduced motion: render one static frame and stop ─────────────────
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // ── Canvas sizing ─────────────────────────────────────────────────────
    function resizeCanvas() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    resizeCanvas();

    // ── Determine particle count based on viewport ────────────────────────
    const isMobile = window.innerWidth < MOBILE_BP;
    const particleCount = isMobile ? MOBILE_COUNT : DESKTOP_COUNT;

    // ── Initial state ─────────────────────────────────────────────────────
    const W = canvas.width;
    const H = canvas.height;
    const { grid, gridW, gridH } = buildGrid(W, H);

    const state: SimState = {
      particles: createParticles(particleCount, W, H),
      grid,
      gridW,
      gridH,
      W,
      H,
      frameIndex: 0,
      rafId: 0,
      activeSection: 's1',
      prevSection: 's1',
      transitionStart: 0,
      transitionT: 1,          // start "settled" so first section is instant
      targetAlpha: 1,
      currentAlpha: 1,
      alphaStart: 0,
      mouseX: -9999,
      mouseY: -9999,
      mouseActive: false,
    };
    stateRef.current = state;

    // ── Section detection via IntersectionObserver ────────────────────────
    const sectionEls = document.querySelectorAll<HTMLElement>('[data-section]');
    const sectionVisibility = new Map<string, number>();

    // Initialise all sections at zero visibility
    sectionEls.forEach((el) => {
      const id = el.dataset.section;
      if (id) sectionVisibility.set(id, 0);
    });

    function getTopSection(): string {
      let best = 's1';
      let bestRatio = -1;
      sectionVisibility.forEach((ratio, id) => {
        if (ratio > bestRatio) {
          bestRatio = ratio;
          best = id;
        }
      });
      return best;
    }

    function onSectionChange(newSection: string) {
      if (newSection === state.activeSection) return;
      const now = performance.now();
      state.prevSection = state.activeSection;
      state.activeSection = newSection;
      state.transitionStart = now;
      state.transitionT = 0;

      // Handle parchment dissolve / dark reconstitute
      const isParchment = PARCHMENT_SECTIONS.has(newSection);
      const newTargetAlpha = isParchment ? 0 : 1;
      if (newTargetAlpha !== state.targetAlpha) {
        state.targetAlpha = newTargetAlpha;
        state.alphaStart = now;
        // Snap currentAlpha to the "other end" so fade direction is correct
        state.currentAlpha = isParchment ? 1 : 0;
      }
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const id = (entry.target as HTMLElement).dataset.section;
          if (id) sectionVisibility.set(id, entry.intersectionRatio);
        });
        const top = getTopSection();
        onSectionChange(top);
      },
      {
        // Multiple thresholds for smoother detection
        threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1.0],
      }
    );

    sectionEls.forEach((el) => observer.observe(el));

    // ── Mouse tracking (desktop cursor repulsion) ─────────────────────────
    function onMouseMove(e: MouseEvent) {
      state.mouseX = e.clientX;
      state.mouseY = e.clientY;
      state.mouseActive = true;
    }
    function onMouseLeave() {
      state.mouseActive = false;
    }

    if (!isMobile) {
      window.addEventListener('mousemove', onMouseMove, { passive: true });
      document.addEventListener('mouseleave', onMouseLeave);
    }

    // ── Resize handler (debounced) ────────────────────────────────────────
    let resizeTimer = 0;
    function onResize() {
      clearTimeout(resizeTimer);
      resizeTimer = window.setTimeout(() => {
        resizeCanvas();
        if (!canvas) return;
        const newW = canvas.width;
        const newH = canvas.height;
        state.W = newW;
        state.H = newH;
        const rebuilt = buildGrid(newW, newH);
        state.grid = rebuilt.grid;
        state.gridW = rebuilt.gridW;
        state.gridH = rebuilt.gridH;
        // Clamp particles inside new bounds
        for (const p of state.particles) {
          p.x = Math.min(p.x, newW);
          p.y = Math.min(p.y, newH);
        }
      }, 200);
    }
    window.addEventListener('resize', onResize);

    // ── Reduced motion: one static scatter frame ──────────────────────────
    if (prefersReduced) {
      // Draw the initial scatter and stop — no RAF loop
      ctx.fillStyle = `rgba(250, 250, 248, ${(BASE_ALPHA * 0.6).toFixed(4)})`;
      const size = PARTICLE_PX * 2;
      ctx.beginPath();
      for (const p of state.particles) {
        ctx.rect(p.x - PARTICLE_PX, p.y - PARTICLE_PX, size, size);
      }
      ctx.fill();

      // Cleanup for reduced-motion path
      return () => {
        observer.disconnect();
        window.removeEventListener('resize', onResize);
        clearTimeout(resizeTimer);
      };
    }

    // ── Animation loop ────────────────────────────────────────────────────
    function loop(now: number) {
      simulate(state, now);
      render(ctx!, state);
      state.rafId = requestAnimationFrame(loop);
    }

    state.rafId = requestAnimationFrame(loop);

    // ── Cleanup ───────────────────────────────────────────────────────────
    return () => {
      cancelAnimationFrame(state.rafId);
      observer.disconnect();
      window.removeEventListener('resize', onResize);
      clearTimeout(resizeTimer);
      if (!isMobile) {
        window.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseleave', onMouseLeave);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        pointerEvents: 'none',
        display: 'block',
      }}
    />
  );
}
