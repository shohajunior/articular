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
import { LegalModal } from './components/sections/LegalModal';
import { LightboxModal, LightboxItem } from './components/ui/LightboxModal';

export const App: React.FC = () => {
  const [heroRevealed, setHeroRevealed] = useState(false);
  const [activeLightbox, setActiveLightbox] = useState<LightboxItem | null>(null);

  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    docKey: 'privacy' | 'terms' | null;
  }>({
    isOpen: false,
    docKey: null,
  });

  useEffect(() => {
    // If intro was already seen in this session, reveal hero immediately
    if (sessionStorage.getItem('articular-rocket-played')) {
      setHeroRevealed(true);
    }
  }, []);

  const handleOpenLegal = (docKey: 'privacy' | 'terms') => {
    setLegalModalState({
      isOpen: true,
      docKey,
    });
  };

  const handleCloseLegal = () => {
    setLegalModalState({
      isOpen: false,
      docKey: null,
    });
  };

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
        <Register onOpenLegal={handleOpenLegal} />
      </main>

      {/* Modern Minimal Footer */}
      <Footer onOpenLegal={handleOpenLegal} />

      {/* Native Light-Dismiss Legal Modal */}
      <LegalModal
        isOpen={legalModalState.isOpen}
        docKey={legalModalState.docKey}
        onClose={handleCloseLegal}
      />

      {/* High-Res Photo Lightbox Modal */}
      <LightboxModal
        item={activeLightbox}
        onClose={() => setActiveLightbox(null)}
      />
    </div>
  );
};

export default App;
