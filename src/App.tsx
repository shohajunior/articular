import React, { useState } from 'react';
import { RocketIntro } from './components/intro/RocketIntro';
import { Header } from './components/layout/Header';
import { Hero } from './components/sections/Hero';
import { Partners } from './components/sections/Partners';
import { Stages } from './components/sections/Stages';
import { RegionsMap } from './components/sections/RegionsMap';
import { Team } from './components/sections/Team';
import { Register } from './components/sections/Register';
import { Footer } from './components/layout/Footer';
import { LegalModal } from './components/sections/LegalModal';

export const App: React.FC = () => {
  const [legalModalState, setLegalModalState] = useState<{
    isOpen: boolean;
    docKey: 'privacy' | 'terms' | null;
  }>({
    isOpen: false,
    docKey: null,
  });

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
      {/* 1.2s Micro-takeoff Rocket Intro */}
      <RocketIntro />

      {/* Floating Pill Header */}
      <Header />

      {/* Main Page Content */}
      <main>
        <Hero />
        <Partners />
        <Stages />
        <RegionsMap />
        <Team />
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
    </div>
  );
};

export default App;
