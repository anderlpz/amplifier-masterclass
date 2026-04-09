# Navigation Shell

## Navigation Model
sidebar (scroll-position-based, not route-based — single-page scroll with 13 sections)

## Route Screens (chrome applies)
All 13 sections are part of one continuous scroll. The sidebar TOC, top nav, and progress bar are persistent across the entire page.

- S01 Introduction
- S02 Architecture Map
- S03 Design Philosophy
- S04 The Kernel
- S05 Module System
- S06 The Orchestrator
- S07 Tools vs Hooks
- S08 Sessions
- S09 Bundles
- S10 Foundation Bridge
- S11 Agents & Recipes
- S12 Complete Picture
- S13 Appendix

## Exempt Screens (no chrome)
None — all sections share the persistent navigation chrome. However, the chrome *recedes* contextually:
- Top nav hides on scroll-down, reappears on scroll-up (iyo pattern)
- Sidebar TOC fades when the reader is in a palette-break section (S03, S12) to reduce visual noise on light backgrounds

## Persistent Elements

### Progress Bar
- **Position:** fixed top, full width, z-index above everything
- **Dimensions:** full-width × 2px
- **Content:** Solid azure (#0082EB) bar that fills left-to-right as the reader scrolls
- **Background:** transparent (sits on top of whatever section is beneath)
- **Behavior:** Continuous fill from 0% (top of page) to 100% (bottom of page)

### Top Nav Bar
- **Position:** fixed top, full width, below progress bar
- **Dimensions:** full-width × 48px
- **Left:** "AMPLIFIER" wordmark in Space Grotesk 500, small caps, letter-spaced
- **Center:** Current section name in Inter 400, fades in/out on section change
- **Right:** Mobile TOC toggle (hamburger icon, visible only on mobile)
- **Background:** glass — rgba(255,255,255,0.04) with 1px bottom border rgba(255,255,255,0.07), backdrop-blur 10px
- **Behavior:** Hides on scroll-down (translate-Y off-screen), reappears on scroll-up. On palette-break sections (S03, S12), glass inverts to rgba(0,0,0,0.04) with rgba(0,0,0,0.07) border
- **Border / Separator:** 1px bottom border (glass edge)

### Sidebar TOC
- **Position:** fixed left, vertically centered in viewport
- **Dimensions:** 200px wide × auto height (content-driven)
- **Items:** 13 section names in Inter 400, 13px, stacked vertically with 8px gaps
- **Active State:** Active section name in azure (#0082EB) with a small dot indicator (4px circle) to the left. Text transitions to 500 weight.
- **Inactive State:** Section names in rgba(255,255,255,0.4) — muted, receding
- **Background:** none — floating text directly on the page, no glass container, no background fill (Glasswing pattern)
- **Behavior:** IntersectionObserver-synced — active section updates as the reader scrolls. Click any section name to smooth-scroll to it. Fades to reduced opacity on palette-break sections. Hidden on mobile (replaced by hamburger TOC in top nav).
- **Border / Separator:** none
