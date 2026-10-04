import React, { useState, useEffect } from 'react';
import { siteData } from '../../data/site';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { LightboxItem } from '../ui/LightboxModal';

interface HeroProps {
  onPhotoClick: (item: LightboxItem) => void;
  isRevealed?: boolean;
}

const confirmedRegions = [
  'Tashkent',
  'Bukhara',
  'Fergana',
  'Andijan',
  'Tashkent Region'
];

export const Hero: React.FC<HeroProps> = ({ onPhotoClick, isRevealed = true }) => {
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

  const galleryItems: LightboxItem[] = [
    {
      src: './assets/event-grand.jpg',
      alt: 'ArticularUZ Grand Final in Tashkent',
      title: 'Grand Final & Aerospace Defense',
      tag: 'Tashkent City Round'
    },
    {
      src: './assets/team-jupiter.jpg',
      alt: 'Team Jupiter Drafting Presentation',
      title: 'Team Jupiter  Deck Preparation',
      tag: 'Orbital Mechanics Track'
    },
    {
      src: './assets/certificates.jpg',
      alt: 'Uzcosmos Agency Certificates Awarding',
      title: 'Official Uzcosmos Agency Awards',
      tag: 'Gold & Silver Honors'
    },
    {
      src: './assets/pitching.jpg',
      alt: 'Student Stage Defense in English',
      title: 'Stage Defense in English',
      tag: 'Academic Mentors Jury'
    }
  ];

  return (
    <section className="relative overflow-hidden pt-28 pb-16 md:pt-36 md:pb-24">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left Hero Content */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            {/* Dynamic Region Rotating Chip (Volontyorlar Style) */}
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1 text-xs text-[var(--ink-muted)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
              <span>Events in</span>
              <span className="font-semibold text-[var(--ink)] transition-opacity duration-300">
                {confirmedRegions[currentRegionIndex]}
              </span>
            </div>

            {/* Headline with Original Slogan */}
            <h1 className="mb-4 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Where young minds{' '}
              <span className="font-serif-italic text-[var(--accent)]">
                articulate the future.
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

          {/* Right Hero: Vericase-Style Scattered Overlapping Photo Collage (No clips, clickable) */}
          <div
            className={`relative min-h-[460px] select-none transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Visual container with overlapping layers */}
            <div className="relative mx-auto h-[460px] w-full max-w-[500px]">
              {/* Card 1 (Base Anchor): Grand Final Tashkent */}
              <div
                onClick={() => onPhotoClick(galleryItems[0])}
                className="group absolute left-0 top-6 z-10 w-[78%] cursor-pointer rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-md transition-all duration-300 ease-out hover:z-30 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl hover:border-[var(--line-strong)] -rotate-2"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                  <img
                    src={galleryItems[0].src}
                    alt={galleryItems[0].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-3 py-1 text-[11px] font-semibold text-[var(--ink)] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Grand Final  Tashkent</span>
                  </div>
                  <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 2 (Overlapping Top-Right): Team Jupiter Presentation */}
              <div
                onClick={() => onPhotoClick(galleryItems[1])}
                className="group absolute right-0 top-0 z-20 w-[62%] cursor-pointer rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-2 shadow-lg transition-all duration-300 ease-out hover:z-30 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] rotate-3"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                  <img
                    src={galleryItems[1].src}
                    alt={galleryItems[1].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-2.5 py-0.5 text-[10px] font-semibold text-[var(--ink)] backdrop-blur-md">
                    <span>Team Jupiter</span>
                  </div>
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Card 3 (Overlapping Bottom-Right): Uzcosmos Awards */}
              <div
                onClick={() => onPhotoClick(galleryItems[2])}
                className="group absolute bottom-4 right-2 z-25 w-[66%] cursor-pointer rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-2.5 shadow-xl transition-all duration-300 ease-out hover:z-30 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] -rotate-1"
              >
                <div className="relative aspect-[16/11] overflow-hidden rounded-2xl">
                  <img
                    src={galleryItems[2].src}
                    alt={galleryItems[2].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-3 py-1 text-[11px] font-semibold text-[var(--ink)] backdrop-blur-md">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>Uzcosmos Awards</span>
                  </div>
                  <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 4 (Mini Floating Accent Card, Bottom-Left): Pitching Defense */}
              <div
                onClick={() => onPhotoClick(galleryItems[3])}
                className="group absolute -bottom-2 left-6 z-20 w-[42%] cursor-pointer rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-1.5 shadow-md transition-all duration-300 ease-out hover:z-30 hover:-translate-y-2 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:border-[var(--line-strong)] rotate-2"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-xl">
                  <img
                    src={galleryItems[3].src}
                    alt={galleryItems[3].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-1.5 left-1.5 rounded-full bg-black/60 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm">
                    English Defense
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
