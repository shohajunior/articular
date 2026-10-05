import Lenis from 'lenis';

let lenisInstance: Lenis | null = null;
let rafId: number | null = null;

/**
 * Initializes buttery, weightless smooth scroll with momentum inertia (Lenis engine)
 * Giving an ultra-luxurious, responsive "antigravity" floating feel to wheel and anchor scrolls.
 */
export function initSmoothScroll(): Lenis | null {
  if (typeof window === 'undefined') return null;

  // Clean up any existing instance first
  if (lenisInstance) {
    lenisInstance.destroy();
    if (rafId) cancelAnimationFrame(rafId);
  }

  lenisInstance = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.4,
    infinite: false,
  });

  // Keep RAF loop running cleanly
  function raf(time: number) {
    lenisInstance?.raf(time);
    rafId = requestAnimationFrame(raf);
  }
  rafId = requestAnimationFrame(raf);

  // Attach to window for global access
  (window as unknown as { lenis: Lenis }).lenis = lenisInstance;

  // Intercept anchor link clicks
  const handleAnchorClick = (e: MouseEvent) => {
    const target = e.target as HTMLElement | null;
    const anchor = target?.closest('a[href^="#"]') as HTMLAnchorElement | null;
    if (anchor) {
      const href = anchor.getAttribute('href');
      if (href && href.startsWith('#') && href.length > 1) {
        const targetEl = document.querySelector(href);
        if (targetEl) {
          e.preventDefault();
          lenisInstance?.scrollTo(targetEl as HTMLElement, {
            offset: -65,
            duration: 1.35,
          });
        }
      }
    }
  };

  document.addEventListener('click', handleAnchorClick);

  return lenisInstance;
}

export function getLenis(): Lenis | null {
  return lenisInstance;
}

export function scrollToTarget(target: string | HTMLElement, offset: number = -65, duration: number = 1.35) {
  if (lenisInstance) {
    lenisInstance.scrollTo(target, { offset, duration });
  } else {
    const el = typeof target === 'string' ? document.querySelector(target) : target;
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  }
}
