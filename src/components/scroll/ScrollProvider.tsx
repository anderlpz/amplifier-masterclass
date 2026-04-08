import { useEffect, useRef, type ReactNode } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';

// Always register ScrollTrigger — needed for scrub/pin even with native scroll
gsap.registerPlugin(ScrollTrigger);

interface ScrollProviderProps {
  children: ReactNode;
}

export default function ScrollProvider({ children }: ScrollProviderProps) {
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

  return <>{children}</>;
}
