import { initSmoothScroll } from './components/smoothScroll.js';
import { renderIconlyIcons } from './components/icons.js';
import { initSpaceBackground } from './components/spaceScene.js';
import { initHeroEarth } from './components/heroEarth.js';
import { initRegionsMap } from './components/regionsMap.js';
import { initSoundToggle, playOrbitSelectTone } from './components/soundFx.js';
import { initModals, initCounters, initGalleryFilters } from './components/modals.js';
import { initTestimonialsCarousel } from './components/testimonialsCarousel.js';

document.addEventListener('DOMContentLoaded', () => {
  // 0. Initialize Antigravity-Style Smooth Momentum Scroll (Lenis Engine)
  const lenis = initSmoothScroll();
  // 1. Render all SVG icons
  renderIconlyIcons();

  // Testimonials Carousel
  initTestimonialsCarousel();

  // 2. Initialize 3D Space Background
  initSpaceBackground();

  // 3. Initialize Modals, Lightbox & Counters
  const modalControls = initModals();
  initCounters();
  initGalleryFilters();
  initSoundToggle();

  // 4. Initialize Photorealistic 3D Rotating Earth in Hero
  initHeroEarth();

// 6. Initialize Uzbekistan Interactive Regional Map
  initRegionsMap((regionData) => {
    playOrbitSelectTone();
  });

  // 7. Navbar scroll reaction
  const header = document.getElementById('site-header');
  if (lenis) {
    lenis.on('scroll', ({ scroll }) => {
      if (scroll > 50) {
        header.style.background = 'rgba(3, 5, 15, 0.92)';
        header.style.borderBottomColor = 'rgba(0, 240, 255, 0.2)';
      } else {
        header.style.background = 'rgba(5, 7, 19, 0.7)';
        header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
      }
    });
  }
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.style.background = 'rgba(3, 5, 15, 0.92)';
      header.style.borderBottomColor = 'rgba(0, 240, 255, 0.2)';
    } else {
      header.style.background = 'rgba(5, 7, 19, 0.7)';
      header.style.borderBottomColor = 'rgba(255, 255, 255, 0.06)';
    }
  });

  console.log('🚀 ArticularUZ Platform running with Iconly Curved Two-Tone SVGs & 3D WebGL!');
});
