import confetti from 'canvas-confetti';
import { playSuccessChime, playClickBeep } from './soundFx.js';
import { renderIconlyIcons } from './icons.js';

export function initModals() {
  // 1. Lightbox setup
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxCaption = document.getElementById('lightbox-caption');
  const lightboxClose = document.getElementById('lightbox-close');
  const lightboxOverlay = document.getElementById('lightbox-overlay');

  function openLightbox(src, caption) {
    if (!lightbox || !lightboxImg) return;
    lightboxImg.src = src;
    if (lightboxCaption) lightboxCaption.innerText = caption || '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    playClickBeep();
  }

  function closeLightbox() {
    if (!lightbox) return;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
  }

  if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
  if (lightboxOverlay) lightboxOverlay.addEventListener('click', closeLightbox);

  // Gallery items trigger
  const galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach((item) => {
    item.addEventListener('click', () => {
      const src = item.dataset.img;
      const caption = item.dataset.caption;
      if (src) openLightbox(src, caption);
    });
  });

  // 2. On-Page Registration Form Submission with Confetti
  const regForm = document.getElementById('reg-form');
  const successMsg = document.getElementById('form-success');
  const submitBtn = document.getElementById('form-submit-btn');

  if (regForm) {
    regForm.addEventListener('submit', (e) => {
      e.preventDefault();
      playSuccessChime();

      // Fire festive celebration confetti!
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.65 },
        colors: ['#00f2fe', '#8b5cf6', '#fbbf24', '#ec4899', '#10b981']
      });

      submitBtn.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'block';
        renderIconlyIcons();
      }
    });
  }

  // 3. Coordinator Button from Map Panel auto-scrolls and populates form
  const applyCoordinatorBtn = document.getElementById('apply-coordinator-btn');
  if (applyCoordinatorBtn) {
    applyCoordinatorBtn.addEventListener('click', () => {
      playClickBeep();
      const currentRegionName = document.getElementById('region-name')?.innerText || '';
      const regionSelect = document.getElementById('user-region');
      const roleSelect = document.getElementById('user-role');

      if (roleSelect) {
        roleSelect.value = 'Regional Coordinator';
      }

      if (regionSelect && currentRegionName) {
        for (let i = 0; i < regionSelect.options.length; i++) {
          if (currentRegionName.toLowerCase().includes(regionSelect.options[i].text.toLowerCase())) {
            regionSelect.selectedIndex = i;
            break;
          }
        }
      }

      const joinSection = document.getElementById('join');
      if (joinSection) {
        if (window.lenis) {
          window.lenis.scrollTo(joinSection, { offset: -65, duration: 1.35 });
        } else {
          joinSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });
  }

  // 4. Mobile Drawer
  const mobileToggle = document.getElementById('mobile-toggle');
  const mobileDrawer = document.getElementById('mobile-drawer');
  const closeDrawer = document.getElementById('close-drawer');
  const drawerLinks = document.querySelectorAll('.drawer-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.add('open');
    });
  }
  if (closeDrawer && mobileDrawer) {
    closeDrawer.addEventListener('click', () => {
      mobileDrawer.classList.remove('open');
    });
  }
  drawerLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    });
  });

  // ESC key closes any open lightbox or drawer
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeLightbox();
      if (mobileDrawer) mobileDrawer.classList.remove('open');
    }
  });

  return {
    openLightbox
  };
}

// 5. Animated Number Counter
export function initCounters() {
  const statNumbers = document.querySelectorAll('.stat-number[data-target]');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const el = entry.target;
        const target = parseInt(el.dataset.target, 10);
        const suffix = el.dataset.suffix || '';
        let current = 0;
        const duration = 1600;
        const stepTime = 20;
        const totalSteps = duration / stepTime;
        const increment = target / totalSteps;

        const timer = setInterval(() => {
          current += increment;
          if (current >= target) {
            current = target;
            clearInterval(timer);
          }
          el.innerText = `${Math.floor(current)}${suffix}`;
        }, stepTime);

        observer.unobserve(el);
      }
    });
  }, { threshold: 0.2 });

  statNumbers.forEach((el) => observer.observe(el));
}

// 6. Gallery Filters
export function initGalleryFilters() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const items = document.querySelectorAll('.gallery-item');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      items.forEach((item) => {
        if (filter === 'all' || item.dataset.category === filter) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      });
    });
  });
}
