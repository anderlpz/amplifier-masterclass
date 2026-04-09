/**
 * scroll-animations.ts
 *
 * GSAP ScrollTrigger reveal animations for all section content.
 * Imported as a <script> in MasterclassLayout.astro.
 * Runs after DOM is ready, finds elements by data attributes and classes.
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Wait for DOM + fonts to settle
function init() {
  // ── Section entry reveals ──────────────────────────────────────────
  // Each section entry zone: eyebrow, headline, lead paragraph stagger in
  document.querySelectorAll('.section__entry').forEach((entry) => {
    const children = entry.querySelectorAll(':scope > .entry-cluster > *');
    if (children.length === 0) return;

    gsap.set(children, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: entry,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        gsap.to(children, {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          stagger: 0.15,
        });
      },
    });
  });

  // ── Glass card reveals ──────────────────────────────────────────────
  document.querySelectorAll('.glass-card').forEach((card) => {
    gsap.set(card, { opacity: 0, y: 30, scale: 0.97 });

    ScrollTrigger.create({
      trigger: card,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(card, {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.7,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Numbered rows stagger ───────────────────────────────────────────
  // Find groups of numbered rows and stagger them
  document.querySelectorAll('.section__content').forEach((content) => {
    const rows = content.querySelectorAll('.numbered-row');
    if (rows.length === 0) return;

    gsap.set(rows, { opacity: 0, x: -20 });

    ScrollTrigger.create({
      trigger: rows[0],
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(rows, {
          opacity: 1,
          x: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        });
      },
    });
  });

  // ── Diagram reveals ─────────────────────────────────────────────────
  document.querySelectorAll('.diagram, .diagram-container').forEach((diagram) => {
    gsap.set(diagram, { opacity: 0, y: 40 });

    ScrollTrigger.create({
      trigger: diagram,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(diagram, {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Generic data-reveal elements ────────────────────────────────────
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    gsap.set(el, { opacity: 0, y: 30 });

    ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: 'power2.out',
        });
      },
    });
  });

  // ── Content block stagger (paragraphs, lists in section__content) ──
  document.querySelectorAll('.section__content').forEach((content) => {
    const blocks = content.querySelectorAll(':scope > .content-body > p, :scope > .content-body > h3, :scope > .content-body > ul, :scope > .content-body > .card-grid, :scope > .content-wide > p, :scope > .content-wide > h3');
    if (blocks.length === 0) return;

    gsap.set(blocks, { opacity: 0, y: 24 });

    ScrollTrigger.create({
      trigger: content,
      start: 'top 75%',
      once: true,
      onEnter: () => {
        gsap.to(blocks, {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: 'power2.out',
          stagger: 0.08,
        });
      },
    });
  });

  // ── Respect reduced motion ──────────────────────────────────────────
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    ScrollTrigger.getAll().forEach(st => st.kill());
    // Reset all animated elements to visible
    gsap.set('[data-reveal], .glass-card, .numbered-row, .diagram, .diagram-container, .section__entry .entry-cluster > *', {
      opacity: 1, y: 0, x: 0, scale: 1
    });
    document.querySelectorAll('.section__content').forEach(content => {
      gsap.set(content.querySelectorAll('p, h3, ul, .card-grid'), {
        opacity: 1, y: 0
      });
    });
  }
}

// Run when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  // Small delay to let React islands hydrate
  requestAnimationFrame(() => requestAnimationFrame(init));
}
