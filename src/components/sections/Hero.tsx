import React, { useState, useEffect } from 'react';
import { siteData } from '../../data/site';
import { ArrowRight, Sparkles } from 'lucide-react';

const confirmedRegions = [
  'Tashkent',
  'Bukhara',
  'Fergana',
  'Andijan',
  'Tashkent Region'
];

export const Hero: React.FC = () => {
  const [currentRegionIndex, setCurrentRegionIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRegionIndex((prev) => (prev + 1) % confirmedRegions.length);
    }, 2400);
    return () => clearInterval(interval);
  }, []);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1.08fr_0.92fr]">
          {/* Left Hero Content */}
          <div>
            {/* Dynamic Region Rotating Chip (Volontyorlar Style) */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1 text-xs text-[var(--ink-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>Events in</span>
              <span className="font-semibold text-[var(--ink)] transition-opacity duration-300">
                {confirmedRegions[currentRegionIndex]}
              </span>
            </div>

            {/* Headline with Elegant Serif Accent */}
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Science & space,{' '}
              <span className="font-serif-italic text-[var(--accent)]">
                explained by students.
              </span>
            </h1>

            {/* Short punchy subtext */}
            <p className="mb-7 max-w-xl text-base text-[var(--ink-muted)] sm:text-lg">
              {siteData.shortDesc}
            </p>

            {/* CTAs */}
            <div className="mb-10 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => scrollTo('register')}
                className="group flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <span>Register for Season</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('regions')}
                className="rounded-full border border-[var(--line)] bg-transparent px-6 py-3 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]"
              >
                Explore 14 Regions
              </button>
            </div>

            {/* Compact Stats */}
            <div className="grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
              {siteData.stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono-tag text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                    {stat.value}
                  </div>
                  <div className="text-xs text-[var(--ink-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero: Vericase-Style Multi-Photo Collage (Clean, No Drag) */}
          <div className="relative">
            <div className="grid grid-cols-2 gap-3.5">
              {/* Main Photo Card */}
              <div className="col-span-2 overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-sm transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-md">
                <div className="relative aspect-[16/10] overflow-hidden rounded-xl">
                  <img
                    src="./assets/event-grand.jpg"
                    alt="ArticularUZ Grand Final in Tashkent"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.02]"
                  />
                  <div className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-3 py-1 text-xs font-medium text-[var(--ink)] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Grand Final · Tashkent</span>
                  </div>
                </div>
              </div>

              {/* Sub Photo 1: Team Presentation */}
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-sm transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="./assets/team-jupiter.jpg"
                    alt="Team Jupiter Presentation"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-2 text-xs font-semibold text-[var(--ink)]">
                  Team Jupiter Presentation
                </div>
              </div>

              {/* Sub Photo 2: Uzcosmos Awards */}
              <div className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-sm transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-md">
                <div className="aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src="./assets/certificates.jpg"
                    alt="Uzcosmos Certificates Awarding"
                    className="h-full w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
                  />
                </div>
                <div className="p-2 text-xs font-semibold text-[var(--ink)]">
                  Uzcosmos Award Certificates
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
