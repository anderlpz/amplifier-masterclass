# Aesthetic Brief

> Generated from 8 references (7 sites, 8 screenshots). Review and edit before using in /storyboard.

## One-Line Direction

Dark cinematic scroll site with typographic authority — iyo.ai's glass-and-particle production value applied to deep educational content, not product marketing.

---

## Palette

Extracted colors across all 8 references:

```
#0C0C10  #F5F3EC  #C87B60  #29B6F6  #E0E0E0
(deep black) (warm cream) (copper) (electric blue) (silver)
```

- **Background (dark):** #0C0C10 — near-black with a faint cool undertone. 6 of 8 references are dark-dominant. The existing token `--bg-primary: #242426` is too gray and warm — it should drop to #0F0F13 or similar. The secondary background (`--bg-secondary: #3d3d40`) should also darken to ~#1A1A1E to maintain contrast without feeling like a different site.
- **Background (palette-break):** #F5F3EC — warm cream, not cool gray. The existing `--bg-break: #e0e1e6` (pearl-grey) feels institutional. The glasswing (#F7F5EE) and throxy (#F2EFE9) both use warmer creams that feel editorial and inviting. Shift toward #F5F3EC.
- **Primary accent:** #0082EB (azure) — already in the token system, already aligns with the electric blue from maze (#29B6F6) and joby (#007BE0). Keep it. This is the interactive/navigational accent — TOC indicator, progress bar, links.
- **Secondary accent (NEW):** #C87B60 — warm copper from glasswing. This doesn't exist in the current tokens. It provides warmth and educational character. Use sparingly: eyebrow labels on conceptual sections, pull-quote marks, the occasional divider on palette-break surfaces. Not a button color. Not a hover state.
- **Text on dark:** #FAFAF8 (headlines) / #E8E6DC (body) — already correct in tokens. The warm cream body text is the right call for long-form reading on dark backgrounds.
- **Text on break:** #242426 — already correct. Dark enough for contrast on cream.
- **Glass surfaces:** rgba(255, 255, 255, 0.04) background with rgba(255, 255, 255, 0.08) border on dark. The current `--glass-bg: rgba(33, 33, 33, 0.35)` is too opaque — iyo uses almost-invisible glass with very subtle blur. Reduce opacity significantly.

### Token Delta Summary

| Token | Current | Recommended | Reason |
|---|---|---|---|
| `--bg-primary` | #242426 | #0F0F13 | Too gray/warm — iyo, maze, joby all use near-black |
| `--bg-secondary` | #3d3d40 | #1A1A1E | Should darken proportionally, subtle distinction |
| `--bg-break` | #e0e1e6 | #F5F3EC | Pearl-grey feels institutional — warm cream feels editorial |
| `--glass-bg` | rgba(33,33,33,0.35) | rgba(255,255,255,0.04) | Current is too opaque — iyo glass is barely visible |
| `--glass-border` | rgba(169,194,242,0.1) | rgba(255,255,255,0.08) | Neutral white edge, not blue-tinted |
| NEW: `--accent-warm` | — | #C87B60 | Educational warmth accent (copper) |
| `--text-on-break` | #242426 | #1A1A1E | Slightly deeper for better contrast on warmer cream |

---

## Typography

- **Families:** Inter (sans), Lora (serif), Space Grotesk (mono) — already in tokens. This trio is correct and shouldn't change.
- **Style:** The Inter/Lora pairing gives a humanist-editorial character. Inter for interface, structural text, and labels. Lora for headlines and conceptual body copy. Space Grotesk for code terms, technical identifiers, and eyebrow labels.
- **Weight character:** Light-heavy contrast. Lora at 400 for body, 600–700 for headlines. Inter at 400 for body, 500 for labels. The mantis.works reference proves that typographic confidence comes from generous size and spacing, not bold weight.
- **Density per content mode:**
  - **Conceptual sections:** `--leading-relaxed: 1.8` — generous line-height, wide measure (720px), breathing room. Typography carries the atmosphere here. No decoration needed.
  - **Technical sections:** `--leading-normal: 1.6` — tighter, more structured. Glass cards, monospace labels, proof diagrams share the column.
  - **Orientational sections:** Fullscreen. Typography goes large and spare. Think mantis.works — one line filling the viewport width.

---

## Surface & Material

### Glass Treatment

The iyo reference is the authority here. Their glass is:
- Almost invisible background (2–5% white opacity)
- Hair-thin border (1px, 5–8% white opacity)
- Subtle blur (8–12px, not the 15px+ frosted-glass trend)
- Small radius for cards (8–12px), larger for nav containers (16–20px)

The current `--glass-radius: 28.8px` is too large. iyo uses modest radii. Reduce to 12px for content cards, 16px for navigation containers. Not everything should be rounded — sharp corners communicate precision in technical sections.

### Particle / Motion Layer

The iyo and maze references both use GPGPU particles. For the masterclass:
- Particles are atmospheric, not narrative. They exist in the background of conceptual sections to create depth, not to morph between product shapes.
- Reduced to a subtle noise field or slow-drifting points on dark sections.
- Completely absent on palette-break (light) sections and technical sections — clarity over atmosphere.
- Must respect `prefers-reduced-motion`. The existing token system already collapses durations to 0ms. Particles should also freeze or disappear.

### Grain Texture

mantis.works uses film grain as a loading state and ambient texture. A very subtle grain overlay (2–3% opacity, static or slow-cycling) over dark sections adds analog warmth without competing with content. Not on every section — conceptual sections and the hero, not technical sections.

---

## Composition Character

- **Spatial rhythm:** Generous. The masterclass is for deep reading, not scanning. Section padding should be large (128–192px vertical). Body content at 720px max-width is correct. Diagrams and cards can extend to 960px.
- **Structural tendency:** Layered. Content floats over atmospheric backgrounds. Glass cards layer over particle fields. The TOC floats over the content. This is the iyo model — depth through layering, not flatness.
- **Visual weight:** Mostly minimal, with controlled moments of density. Conceptual sections are sparse. Technical sections increase density with cards, diagrams, and sub-section structures. The mode shift between sparse and dense is the joby pattern — it should feel like a deliberate gear change, not a gradual drift.

---

## Three Content Modes

This is the core structural insight from the brainstorm. The masterclass has three distinct visual modes, not one uniform treatment:

### Mode 1 — Conceptual / Philosophical

Sections: S01 Introduction, S03 Design Philosophy, S12 Complete Picture

- Near-black background (#0F0F13)
- Lora serif headlines, large and confident
- Body text at `--leading-relaxed` (1.8), generous spacing
- Subtle particle field or grain texture in background
- Minimal UI chrome — no glass cards, no diagrams
- The mantis.works feel: typography alone, building a case through words

### Mode 2 — Technical / Structural

Sections: S02 Architecture Map, S04 Kernel, S05 Module System, S06 Orchestrator, S07 Tools vs Hooks, S08 Sessions, S09 Bundles, S10 Foundation Bridge, S11 Agents & Recipes

- Alternating dark backgrounds (#0F0F13 / #1A1A1E) for rhythm
- Glass cards for sub-section containers
- Inter sans for structural labels and sub-headings
- Proof diagrams (throxy-style: single accent color, controlled vocabulary, show the mechanism)
- Tighter spacing, `--leading-normal` (1.6)
- NumberedRow components with hairline dividers

### Mode 3 — Orientational / Interactive

Components: Sidebar TOC, Progress Bar, UpNextTeaser, fullscreen architecture graph (future)

- Glasswing TOC pattern: floating text, dot indicator, no background, IntersectionObserver-synced
- Glass nav that recedes when not needed (iyo pattern)
- Fullscreen graph/map view for the architecture overview (future — the spark.thedigitalpanda reference for assembly visualization)
- These are tools, not decoration. They should feel precise and quiet until interacted with.

---

## Mood Keywords

Cinematic. Precise. Layered. Restrained. Deep. Educational. Glass.

---

## Reference Summary

The references converge on a specific territory: high-production-value dark interfaces that earn their complexity through restraint. iyo.ai provides the glass/particle/viewport language. mantis.works provides the typographic discipline. anthropic/glasswing provides the editorial navigation model. throxy.com proves that diagrams work when they explain, not when they decorate. joby.com proves you can shift between atmospheric and data-dense modes in the same scroll. The masterclass should feel like an iyo-quality cinematic experience that happens to be teaching you something — not a docs site with fancy CSS, and not a marketing page that borrowed some educational structure.

---

## Anti-Slop Notes

Specific patterns to actively avoid in storyboard and implementation:

- **No frosted-glass everything.** The glass treatment is subtle and selective (iyo model). Cards in technical sections get glass. Body text never sits on glass. The background particle field is never obscured by a giant frosted panel.
- **No decorative particle effects.** Particles are atmospheric depth, not content. They do NOT morph between shapes (that's the maze/iyo product storytelling pattern — wrong for education). They're a quiet noise field.
- **No gradient backgrounds.** The dark sections are flat near-black. No purple-to-blue, no radial glows behind headlines. Depth comes from layering and glass, not from gradients.
- **No icon grids.** The masterclass has no features to list. Every visual element earns its place by explaining a concept. Throxy's proof-diagram model is the standard: if you can't explain what the diagram proves, delete it.
- **No rounded-everything.** Technical sections should use sharp corners (2–4px radius) for precision. Glass cards get modest radius (8–12px). Only navigation containers get larger radius (16px). The current 28.8px radius is too soft for educational authority.
- **No filler imagery.** The mantis.works reference proves 11,000px of content can work with zero images. If a section doesn't need a visual, don't add one. Typography and structure are enough.
- **No uniform section treatment.** The whole point of the three-mode system is that conceptual and technical sections look and feel different. If S03 (philosophy) and S04 (kernel) look the same, the mode system has failed.
- **No sci-fi excess.** The spark reference is noted as "a little too sci-fi." The spaceship metaphor works for explaining modular assembly. The neon-on-black cyberpunk aesthetic does not. Keep the palette sophisticated, not themed.

---

## For /storyboard

> Dark cinematic educational scroll — iyo.ai glass/particle production value with mantis.works typographic confidence. Three visual modes: conceptual (atmospheric, serif, generous), technical (glass cards, diagrams, tight), orientational (quiet floating navigation). Near-black #0F0F13 dominant, warm cream #F5F3EC palette-break, azure #0082EB accent, copper #C87B60 warm accent. Lora/Inter/Space Grotesk. Educational authority through restraint, not decoration.
