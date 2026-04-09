# Style Seed — Amplifier Masterclass (LOCKED)

**Locked:** 2026-04-08
**Status:** APPROVED — design token ground truth extracted from AESTHETIC-GUIDE.md and approved strips
**Source of truth:** `.design/AESTHETIC-GUIDE.md` (984 lines)

---

## 1. Color Tokens

### Backgrounds

| Token | Value | Name | Usage |
|-------|-------|------|-------|
| `--bg-void` | `#0F0F13` | Void | Primary dark ground. Cool near-black with faint blue undertone. S01, S02, S04, S06, S08, S10, S13. |
| `--bg-slate` | `#161619` | Slate | Secondary dark ground. Barely distinguishable from void. S05, S07, S09, S11. |
| `--bg-parchment` | `#F5F3EC` | Parchment | Warm cream. Palette-break sections only. S03, S12. |

### Accents

| Token | Value | Name | Usage | Restriction |
|-------|-------|------|-------|-------------|
| `--accent-azure` | `#0082EB` | Signal | Interactive/navigation: TOC active, progress bar, links, technical eyebrows | Technical sections only. NEVER with copper. |
| `--accent-copper` | `#C87B60` | Warmth | Conceptual section eyebrows, pull-quote marks, principle markers | Conceptual sections only (S01, S03, S12). NEVER buttons, NEVER hover. |

### Text

| Token | Value | Name | Usage |
|-------|-------|------|-------|
| `--text-bright` | `#FAFAF8` | Bright | Headlines on dark backgrounds |
| `--text-warm` | `#E8E6DC` | Warm | Body text on dark backgrounds. Warmth prevents eye strain over 10k+ words. |
| `--text-muted` | `rgba(255,255,255,0.4)` | Muted | Inactive TOC items, tertiary text on dark |
| `--text-on-break` | `#1A1815` | Ink | Headlines and body on parchment. Ink-on-paper feel. |
| `--text-on-break-body` | `rgba(26,24,21,0.8)` | Ink (body) | Body text on parchment at 80% opacity |

### Glass

| Token | Value | Usage |
|-------|-------|-------|
| `--glass-bg` | `rgba(255,255,255,0.04)` | Glass surface background (barely visible) |
| `--glass-border` | `rgba(255,255,255,0.07)` | Glass border (hair-thin, neutral white, NOT blue-tinted) |
| `--glass-blur` | `10px` | Backdrop blur (subtle depth, not frosted) |
| `--glass-radius-card` | `8px` | Content/sub-section cards |
| `--glass-radius-nav` | `12px` | Navigation containers (top nav, TOC) |
| `--glass-radius-small` | `4px` | Small interactive elements |
| `--glass-bg-inverted` | `rgba(0,0,0,0.04)` | Glass on parchment sections |
| `--glass-border-inverted` | `rgba(0,0,0,0.07)` | Glass border on parchment |

### Diagram

| Token | Value | Usage |
|-------|-------|-------|
| `--diagram-node-border` | `rgba(255,255,255,0.06-0.10)` | Glass-edge node borders |
| `--diagram-flow` | `#0082EB` at 60-80% opacity | Azure connection lines and arrows |
| `--diagram-shadow-primary` | `0 2px 8px -2px rgba(0,0,0,0.3), 0 12px 32px -8px rgba(0,0,0,0.2)` | Primary node depth |
| `--diagram-divider` | `rgba(255,255,255,0.15)` | Comparison split center line (S07) |
| `--diagram-ink` | `#1A1815` | Diagram lines on parchment (D10 only) |
| `--diagram-ink-accent` | `#C87B60` | Copper accent dots on parchment diagram (D10 only) |

### Grain

| Token | Value | Usage |
|-------|-------|-------|
| `--grain-opacity` | `0.02-0.03` | Film grain overlay. Present on S01 (conceptual) and S13 (bookend). Absent on technical and parchment. |

### Gradient Wash (atmospheric)

| Token | Value | Usage |
|-------|-------|-------|
| `--wash-opacity` | `0.03-0.06` | Radial/elliptical CSS gradient. Always offset (never centered). Varies per section. |

---

## 2. Typography Tokens

### Font Families

| Token | Value | Semantic Role |
|-------|-------|--------------|
| `--font-ideas` | `'Lora', Georgia, serif` | The Voice of Ideas. Section headlines, lead paragraphs, pull quotes. |
| `--font-structure` | `'Inter', system-ui, sans-serif` | The Voice of Structure. Body text, nav, labels, technical sub-headings. |
| `--font-precision` | `'Space Grotesk', 'SF Mono', monospace` | The Voice of Precision. Eyebrow labels, code identifiers, technical terms. |

### Type Scale

| Token | Value | Usage |
|-------|-------|-------|
| `--text-display` | `clamp(2.5rem, 4vw, 4rem)` | Section headlines (Lora 600) |
| `--text-h2` | `clamp(2rem, 3vw, 3rem)` | Technical section headlines (Lora 600) |
| `--text-h3` | `clamp(1.25rem, 2vw, 1.5rem)` | Sub-section titles (Inter 600-700) |
| `--text-body` | `clamp(0.9375rem, 1.2vw, 1.0625rem)` | Body copy (~15-17px) (Inter 400) |
| `--text-lead` | `1.125rem` | Lead sentences (Inter 400, 60% opacity) |
| `--text-eyebrow` | `11px` | Eyebrow labels (Space Grotesk 500, uppercase, tracked wide) |
| `--text-code` | `0.9em` | Inline code (Space Grotesk 400) |
| `--text-toc` | `13px` | Sidebar TOC items (Inter 400) |
| `--text-nav` | `12px` | Top nav wordmark (Space Grotesk 500, small caps) |

### Font Weights

| Token | Value | Usage |
|-------|-------|-------|
| `--weight-regular` | `400` | Body text (Inter), lead body (Lora), inline code (Space Grotesk) |
| `--weight-medium` | `500` | Labels (Inter), eyebrow labels (Space Grotesk), nav text |
| `--weight-semibold` | `600` | Headlines (Lora), sub-headings (Inter) |
| `--weight-bold` | `700` | Category headers (Space Grotesk), strong sub-headings (Inter) |

### Line Height

| Token | Value | Usage |
|-------|-------|-------|
| `--leading-tight` | `1.15` | Display headlines |
| `--leading-normal` | `1.6` | Body text in technical sections |
| `--leading-relaxed` | `1.8` | Body text in conceptual sections (wider = more breathing room for mental model building) |

### Tracking (Letter Spacing)

| Token | Value | Usage |
|-------|-------|-------|
| `--tracking-tight` | `-0.02em` | Display headlines (Lora) |
| `--tracking-normal` | `0` | Body text |
| `--tracking-wide` | `0.1em` | Eyebrow labels (Space Grotesk uppercase) |

### Measure (Line Length)

| Token | Value | Usage |
|-------|-------|-------|
| `--measure-conceptual` | `55-60ch` | Conceptual section body. Wider leading + moderate measure = deep reading. |
| `--measure-technical` | `60-65ch` | Technical section body. Tighter leading + wider measure = structural reading. |

### Typography Per Mode (Summary)

| Property | Conceptual (S01, S03, S12) | Technical (S02, S04-S11, S13) |
|----------|---------------------------|-------------------------------|
| Headlines | Lora 600, `--text-display` | Lora 600, `--text-h2` |
| Sub-headings | — (no sub-sections) | Inter 600-700, `--text-h3` |
| Body | Inter 400, `--leading-relaxed` (1.8) | Inter 400, `--leading-normal` (1.6) |
| Eyebrow | Space Grotesk 500, copper | Space Grotesk 500, azure |
| `<em>` rendering | Lora italic | Inter italic |

---

## 3. Spacing Tokens

| Token | Value | Usage |
|-------|-------|-------|
| `--space-1` | `8px` | Micro gap (icon to label, tight items) |
| `--space-2` | `16px` | Small gap (between list items, internal card padding) |
| `--space-3` | `24px` | Between paragraphs, between glass cards |
| `--space-4` | `32px` | Eyebrow-to-headline gap, between major elements (technical) |
| `--space-5` | `40px` | Card internal horizontal padding |
| `--space-6` | `48px` | Between major elements (conceptual), hairline divider padding |
| `--space-8` | `64px` | Diagram vertical padding (above + below) |
| `--space-16` | `128px` | Before technical sections (continuity gap) |
| `--space-24` | `192px` | Before conceptual sections (chapter break gap) |

### Content Widths

| Token | Value | Usage |
|-------|-------|-------|
| `--content-max` | `720px` | Body copy. ~60-65ch at body text size. |
| `--content-wide` | `960px` | Diagrams, card grids, comparison layouts. |
| `--content-full` | `1200px` | Maximum including sidebar offset. |

---

## 4. Motion Tokens

### Durations

| Token | Value | Usage |
|-------|-------|-------|
| `--duration-fast` | `150ms` | Hover states, micro-interactions |
| `--duration-normal` | `250ms` | Navigation transitions (top nav show/hide, TOC active state) |
| `--duration-slow` | `500ms` | Mode shift transitions (background color changes) |
| `--duration-reveal` | `800ms` | Content reveal on scroll (fade + translate) |

### Easings

| Token | Value | Usage |
|-------|-------|-------|
| `--ease-spring` | `cubic-bezier(0.34, 1.56, 0.64, 1)` | Subtle overshoot. TOC active state transitions. |
| `--ease-settle` | `cubic-bezier(0.16, 1, 0.3, 1)` | Smooth deceleration. Content reveals on scroll. |
| `--ease-default` | `cubic-bezier(0.4, 0, 0.2, 1)` | Standard ease-out. Hover states. |

### Reveal Animation

| Property | Value | Notes |
|----------|-------|-------|
| Transform | `translateY(20-30px)` → `translateY(0)` | 20px for text, 30px for diagrams. NOT 50px — too dramatic for a reading environment. |
| Opacity | `0` → `1` | Combined with translate |
| Behavior | **One-shot** | Fade in once, then permanent. No exit animations. No parallax drift. |

---

## 5. Particle Swarm Configuration

### Global Parameters

| Parameter | Value | Notes |
|-----------|-------|-------|
| Particle count | 10,000 minimum, 15,000 target | Fallback to 3,000-5,000 if frame time > 8ms |
| Particle size | 2-3px | Square (not circle — faster fill, indistinguishable at 2px) |
| Particle color | white | `rgba(255,255,255,opacity)` where opacity varies per section |
| Base opacity | 0.08-0.15 | The swarm is a texture, not a feature |
| Motion speed | 0.5-2px per frame at 60fps | Imperceptible as "animation," registered as "alive" |
| Canvas | `position: fixed; inset: 0; z-index: -1` | Behind everything. Full viewport. |
| Cursor repulsion | 100-150px radius, soft (10-20 frames) | Optional. Disabled on touch devices. |
| Reduced motion | Static scatter pattern (frozen positions) | `prefers-reduced-motion: reduce` |
| High contrast | Hidden entirely | `prefers-contrast: more` |

### Per-Section Swarm Config

| Section | Config Key | Behavior | Density | Opacity | Gradient Wash |
|---------|-----------|----------|---------|---------|---------------|
| S01 | `preFlock` | Scattered, individual drift, no pattern | ~60% visible | 0.08-0.15 | Warm amber-white, 0.04, lower-left |
| S02 | `strata` | Horizontal bands, aligned within each | Full | 0.08-0.15 | Cool azure-white, 0.03, upper-right |
| S03 | `silence` | No particles | Zero | 0 | None |
| S04 | `denseCore` | Dense central cluster, small orbits | Full, concentrated in 40% of viewport | 0.08-0.15 | Neutral cool, 0.03, centered |
| S05 | `branching` | 5-6 radiating streams from center | Full, distributed across streams | 0.08-0.15 | Slightly warmer, offset |
| S06 | `vortex` | Circular flow filling viewport (THE SIGNATURE) | Full, flowing with density variation | 0.08-0.15 | Azure-tinted, 0.04, radiating from center |
| S07 | `bilateralSplit` | Two fields, left/right, opposite directions | Full, split 50/50 | 0.08-0.15 | Two competing washes, 0.03 each |
| S08 | `spawning` | Parent cluster budding child clusters | Full, uneven (parent densest) | 0.08-0.15 | Cool, top-heavy |
| S09 | `nestedRings` | Concentric rings at different speeds | Full, distributed across rings | 0.08-0.15 | Neutral, slate-matching |
| S10 | `bridge` | Two clusters + flowing bridge between | Full, three-part distribution | 0.08-0.15 | Cool, even, wide |
| S11 | `convergence` | Multiple clusters migrating to center | Full, periphery thinning | 0.08-0.15 | Slightly warmer than other slate |
| S12 | `silence` | No particles (reprise) | Zero | 0 | None |
| S13 | `fadingEmbers` | Sparse, aimless, minimal energy | 20-30% of full count | 0.04-0.08 | Faint warm, 0.03, lower-right |

### Swarm Interpolation

Section transitions interpolate between adjacent configs over 100-150vh centered on the boundary. Two exceptions:
- **S05→S06 (Branching→Vortex):** 200vh interpolation. The signature transition needs time to read.
- **Dark→Parchment (S02→S03, S11→S12):** Swarm dissolves over final 75vh of dark section. Not interpolation — one-directional fadeout.

---

## 6. Invariants (What NEVER Changes)

These are locked design decisions from the aesthetic guide. They do not change without deliberate discussion:

1. The three-mode system: conceptual / technical / orientational
2. Progressive disclosure of complexity (density increases as content deepens)
3. Copper restricted to conceptual sections; azure restricted to interactive elements; they NEVER appear together
4. No decorative imagery (zero photographs, illustrations, stock art)
5. The iyo-clean entry pattern (3 elements, 85% negative space on section entries)
6. Glass is semantic ("I am a tool") — body text NEVER sits on glass
7. The throxy standard for diagrams (if you can't state what it proves, delete it)
8. Particle swarm vanishes on parchment palette-breaks
9. One-shot reveals: content fades in once, then stays. No exit animations.
10. The reader's eyes must never chase moving text.
