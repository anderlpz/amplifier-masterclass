import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Always register ScrollTrigger — needed for scrub/pin even with native scroll
gsap.registerPlugin(ScrollTrigger);

/*
 * ScrollProvider — side-effect-only component.
 *
 * Initializes Lenis smooth scroll + GSAP ScrollTrigger sync.
 * Does NOT wrap children — rendered as <ScrollProvider client:only="react" />
 * alongside (not around) the <main> content.
 *
 * Why no children: with client:only="react", any children passed to a React
 * island are serialized into a <template> and are NOT in the live DOM until
 * React hydrates. Deferred module scripts (BlurReveal, TopNav, SidebarTOC)
 * run after DOM parse but BEFORE React hydrates — so they would query the DOM
 * and find zero elements, breaking every IntersectionObserver and section
 * tracker. Keeping <main> outside the island ensures it's in the live DOM at
 * parse time, and Lenis operates on window anyway (no wrapping needed).
 */
export default function ScrollProvider() {
  // Keep tickerCb in a ref so we can remove the exact same function reference
  // from the GSAP ticker during cleanup
  const tickerCbRef = useRef<((time: number) => void) | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (!prefersReducedMotion) {
      // autoRaf: false is required when driving Lenis via GSAP's ticker.
      // Without it Lenis also runs its own RAF loop, causing double-frame
      // stepping that makes scroll feel broken/doubled.
      const lenis = new Lenis({ autoRaf: false });
      lenisRef.current = lenis;

      // Keep ScrollTrigger's scroll position in sync with Lenis's interpolated value
      lenis.on('scroll', ScrollTrigger.update);

      // Drive Lenis from GSAP's unified ticker so scrub animations stay in sync.
      // GSAP time is in seconds; Lenis.raf expects DOMHighResTimeStamp (ms).
      const tickerCb = (time: number) => lenis.raf(time * 1000);
      tickerCbRef.current = tickerCb;
      gsap.ticker.add(tickerCb);

      // Disable GSAP lag-smoothing so Lenis never receives a jumpy time delta
      gsap.ticker.lagSmoothing(0);
    }

    return () => {
      if (tickerCbRef.current) {
        gsap.ticker.remove(tickerCbRef.current);
        tickerCbRef.current = null;
      }
      lenisRef.current?.destroy();
      lenisRef.current = null;
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, []);

  // No render output — pure side-effect component
  return null;
}
