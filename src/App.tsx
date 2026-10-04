import React, { useState, useEffect } from 'react';
import { RocketIntro } from './components/intro/RocketIntro';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Stages } from './components/sections/Stages';
import { Partners } from './components/sections/Partners';
import { RegionsMap } from './components/sections/RegionsMap';
import { Team } from './components/sections/Team';
import { Register } from './components/sections/Register';
import { Footer } from './components/layout/Footer';
import { LegalPage } from './components/pages/LegalPage';
import { LightboxModal, LightboxItem } from './components/ui/LightboxModal';

export const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<'home' | 'privacy' | 'terms'>('home');
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);

  // Sync route with URL hash for standalone shareable pages (e.g. #/privacy, #/terms)
  useEffect(() => {
    const syncPageFromHash = () => {
      const hash = window.location.hash;
      if (hash === '#/privacy') {
        setCurrentPage('privacy');
      } else if (hash === '#/terms') {
        setCurrentPage('terms');
      } else {
        setCurrentPage('home');
      }
    };

    syncPageFromHash();
    window.addEventListener('hashchange', syncPageFromHash);

    // If intro was already seen in this session, reveal hero immediately
    if (sessionStorage.getItem('articular-rocket-played')) {
      setHeroRevealed(true);
    }

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

  // Render Main Tournament Landing Page
  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] antialiased selection:bg-[var(--accent)] selection:text-white transition-colors duration-300">
      {/* Horizontal Flight Rocket + Smoke Dissolve Intro */}
      <RocketIntro onComplete={() => setHeroRevealed(true)} />

      {/* Floating Pill Header */}
      <Header />

      {/* Main Page Content */}
      <main>
        <Hero
          isRevealed={heroRevealed}
          onPhotoClick={(item) => setActiveLightbox(item)}
        />
        {/* 4 Stages to National Defense */}
        <Stages />

        {/* Partners Section placed after Stages */}
        <Partners />

        {/* 14 Regions of Uzbekistan */}
        <RegionsMap />

        {/* Leadership Team */}
        <Team />

        {/* Telegram-First Registration */}
        <Register onNavigateLegal={handleNavigate} />
      </main>

      {/* Modern Minimal Footer */}
      <Footer onNavigateLegal={handleNavigate} />

      {/* High-Res Photo Lightbox Modal */}
      <LightboxModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />
    </div>
  );
};

export default App;
