import { initThemeToggle } from './components/themeToggle.js';
import { initHeaderFloating } from './components/headerFloating.js';
import { initRocketIntro } from './components/rocketIntro.js';
import { initRegionsHub } from './components/regionsHub.js';
import { initLegalModals } from './components/legalModals.js';

document.addEventListener('DOMContentLoaded', () => {
  // 1. Theme Engine (Dark & Light)
  initThemeToggle();

  // 2. Header Floating Capsule & Smooth Anchor Scroll
  initHeaderFloating();

  // 3. Minimalist Rocket Intro Micro-animation (1.2s, dismissible)
  initRocketIntro();

  // 4. 14 Regions Interactive Hub
  initRegionsHub();

  // 5. Legal Modals (Privacy Policy & Terms)
  initLegalModals();

  // 6. Inquiry Form Submission Simulation
  const form = document.getElementById('inquiry-form');
  const formSuccess = document.getElementById('form-success-msg');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = form.querySelector('button[type="submit"]');
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'Submitting...';
      }

      setTimeout(() => {
        form.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Request Sent';
        }
        if (formSuccess) {
          formSuccess.style.display = 'block';
          setTimeout(() => {
            formSuccess.style.display = 'none';
          }, 4000);
        }
      }, 700);
    });
  }

  console.log('ArticularUZ Minimalist Edition initialized successfully.');
});
