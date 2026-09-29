import Lenis from 'lenis';

let lenisInstance = null;

/**
 * Initializes buttery, weightless smooth scroll with momentum inertia (Lenis engine)
 * Giving an ultra-luxurious, responsive "antigravity" floating feel to wheel and anchor scrolls.
 */
export function initSmoothScroll() {
  if (typeof window === 'undefined') return null;

  lenisInstance = new Lenis({
    duration: 1.25,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // exponential ease-out
    orientation: 'vertical',
    gestureOrientation: 'vertical',
    smoothWheel: true,
    wheelMultiplier: 0.95,
    touchMultiplier: 1.5,
    infinite: false,
  });

  // Keep RAF loop running cleanly
  function raf(time) {
    lenisInstance.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);

  // Smoothly intercept anchor links (#about, #uzcosmos, #join, etc.)
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetEl = document.querySelector(targetId);
        if (targetEl) {
          e.preventDefault();
          lenisInstance.scrollTo(targetEl, {
            offset: -65,
            duration: 1.35,
          });
        }
      }
    });
  });

  window.lenis = lenisInstance;
  return lenisInstance;
}

export function getLenis() {
  return lenisInstance;
}
