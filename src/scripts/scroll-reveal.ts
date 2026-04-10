/**
 * scroll-reveal.ts — Vanilla IntersectionObserver scroll-reveal animations
 *
 * Finds all [data-reveal] elements and applies a one-shot fade+translate
 * entrance animation using CSS custom properties from tokens.css.
 *
 * Respects prefers-reduced-motion: when enabled, all elements are made
 * immediately visible with no animation.
 */

function initScrollReveal(): void {
  const elements = document.querySelectorAll<HTMLElement>('[data-reveal]');

  if (elements.length === 0) return;

  // Check for prefers-reduced-motion
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    // Make all elements immediately visible — no animation
    elements.forEach((el) => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // Read timing values from CSS custom properties
  const styles = getComputedStyle(document.documentElement);
  const duration = styles.getPropertyValue('--duration-reveal').trim() || '600ms';
  const easing = styles.getPropertyValue('--ease-out').trim() || 'cubic-bezier(0.16, 1, 0.3, 1)';
  const transition = `opacity ${duration} ${easing}, transform ${duration} ${easing}`;

  // Apply initial hidden state to all [data-reveal] elements
  elements.forEach((el) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = transition;
  });

  // Set up IntersectionObserver with one-shot behaviour
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target as HTMLElement;
          el.style.opacity = '1';
          el.style.transform = 'translateY(0)';
          // One-shot: stop watching once the element has revealed
          observer.unobserve(el);
        }
      });
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
}

// Run on DOM ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initScrollReveal);
} else {
  initScrollReveal();
}
