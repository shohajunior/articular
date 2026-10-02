/**
 * Header Floating Dock & Smooth Anchor Navigation
 * Dynamically detaches header into a floating pill island when scrolled down.
 */
export function initHeaderFloating() {
  const header = document.getElementById('site-header');
  if (!header) return;

  function handleScroll() {
    const scrollY = window.scrollY || window.pageYOffset;
    if (scrollY > 30) {
      header.classList.add('is-floating');
    } else {
      header.classList.remove('is-floating');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll(); // run once on init

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
      const targetId = anchor.getAttribute('href');
      if (targetId && targetId !== '#') {
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
          e.preventDefault();
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // Mobile navigation drawer toggle
  const mobileToggle = document.getElementById('mobile-menu-btn');
  const navLinks = document.getElementById('header-nav');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      navLinks.classList.toggle('nav-open');
    });
    // Close nav when clicking a link
    navLinks.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        navLinks.classList.remove('nav-open');
      });
    });
  }
}
