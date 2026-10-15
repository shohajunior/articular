import React, { useState, useEffect, Suspense, lazy } from 'react';
import { initSmoothScroll } from './lib/smoothScroll';
import { applyTheme, getInitialTheme } from './lib/theme';
import { RocketIntro } from './components/intro/RocketIntro';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { AboutUs } from './components/sections/AboutUs';
import { Events } from './components/sections/Events';
import { SpaceFest } from './components/sections/SpaceFest';
import { Milestones } from './components/sections/Milestones';
import { RegionsMap } from './components/sections/RegionsMap';
import { Partners } from './components/sections/Partners';
import { Certificates } from './components/sections/Certificates';
import { Team } from './components/sections/Team';
import { News } from './components/sections/News';
import { Register } from './components/sections/Register';
import { FAQ } from './components/sections/FAQ';
import { Footer } from './components/layout/Footer';
import { LegalPage } from './components/pages/LegalPage';
import { LightboxModal, LightboxItem } from './components/ui/LightboxModal';
import { BackToTop } from './components/ui/BackToTop';

const NewsPage = lazy(() => import('./components/pages/NewsPage').then((m) => ({ default: m.NewsPage })));
const AdminPage = lazy(() => import('./components/admin/AdminPage').then((m) => ({ default: m.AdminPage })));

type Route = 'home' | 'privacy' | 'terms' | 'news' | 'admin';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Route>('home');
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);

  // Apply persisted theme immediately (needed for direct loads of #/news and #/admin)
  useEffect(() => {
    applyTheme(getInitialTheme());
  }, []);

  // Initialize Lenis Buttery Smooth Momentum Scroll
  useEffect(() => {
    const lenis = initSmoothScroll();
    return () => {
      lenis?.destroy();
    };
  }, []);

  // Sync route with URL hash for standalone shareable pages (e.g. #/privacy, #/terms, #/news, #/admin)
  useEffect(() => {
    const syncPageFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#/privacy') {
        setCurrentPage('privacy');
      } else if (hash === '#/terms') {
        setCurrentPage('terms');
      } else if (hash === '#/news') {
        setCurrentPage('news');
      } else if (hash === '#/admin') {
        setCurrentPage('admin');
      } else {
        setCurrentPage('home');
      }
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);

    return () => window.removeEventListener('hashchange', syncPageFromHash);
  }, []);

  const handleNavigate = (page: 'home' | 'privacy' | 'terms') => {
    setCurrentPage(page);
    window.location.hash = page === 'home' ? '' : `#/${page}`;
  };

  // Render Dedicated Separate Page for Privacy Policy & Terms of Participation
  if (currentPage === 'privacy' || currentPage === 'terms') {
    return <LegalPage docKey={currentPage} onNavigate={handleNavigate} />;
  }

  // All news page & admin panel (lazy-loaded)
  if (currentPage === 'news' || currentPage === 'admin') {
    return (
      <Suspense fallback={<div className="min-h-screen bg-[var(--bg)]" />}>
        {currentPage === 'news' ? <NewsPage /> : <AdminPage />}
      </Suspense>
    );
  }

  // Render Main Tournament Landing Page
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
      {/* Horizontal Flight Rocket + Smoke Dissolve Intro */}
      <RocketIntro onComplete={() => setHeroRevealed(true)} />

      {/* Floating Pill Header */}
      <Header />

      {/* Main Page Content */}
      <main>
        {/* 1. Hero: Where young minds articulate the future. */}
        <Hero
          isRevealed={heroRevealed}
          onPhotoClick={(item) => setActiveLightbox(item)}
        />

        {/* 2. About Us: Mission, Perception, Values & The Method */}
        <AboutUs />

        {/* 3. Events: What we run (Workshops, Debates, Mentoring) */}
        <Events />

        {/* 4. Space Fest: Featured Event (Space Fest 2026 Mars Challenge) */}
        <SpaceFest onPhotoClick={(item) => setActiveLightbox(item)} />

        {/* 5. Milestones: Timeline of achievements */}
        <Milestones />

        {/* 6. Regions: 14 Regions of Uzbekistan (5 active chapters) */}
        <RegionsMap />

        {/* 7. Partners: Official Recognition (Uzcosmos Agency & Youth Volunteers Club) */}
        <Partners />

        {/* 8. Certificates: Earned, not handed out. */}
        <Certificates onPhotoClick={(item) => setActiveLightbox(item)} />

        {/* 9. Team: Meet our core team */}
        <Team />

        {/* 10. News: Latest updates & articles */}
        <News />

        {/* 11. Join: Telegram-First Registration */}
        <Register onNavigateLegal={handleNavigate} />

        {/* 12. FAQ: Frequently Asked Questions */}
        <FAQ />
      </main>

      {/* Modern Minimal Footer */}
      <Footer onNavigateLegal={handleNavigate} />

      {/* High-Res Photo Lightbox Modal */}
      <LightboxModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />

      {/* Floating Back to Top Button (Appears after scrolling past Hero) */}
      <BackToTop />
    </div>
  );
};

export default App;
