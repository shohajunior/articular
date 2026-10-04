import React from 'react';
import { siteData } from '../../data/site';
import { ArrowRight, Maximize2 } from 'lucide-react';
import { LightboxItem } from '../ui/LightboxModal';
import { CountUp } from '../ui/CountUp';
import { CursorGrid } from '../ui/CursorGrid';

interface HeroProps {
  onPhotoClick: (item: LightboxItem) => void;
  isRevealed?: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onPhotoClick, isRevealed = true }) => {
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
      title: 'Team Jupiter — Deck Preparation',
      tag: 'Orbital Mechanics Track'
    },
    {
      src: './assets/certificates.jpg',
      alt: 'Uzcosmos Agency Certificates Awarding',
      title: 'Official Uzcosmos Agency Awards',
      tag: 'Gold & Silver Honors'
    },
    {
      src: './assets/workshop.jpg',
      alt: 'Aerospace Engineering Workshop',
      title: 'Aerospace Hardware Workshop',
      tag: 'Rocketry & CubeSat Track'
    },
    {
      src: './assets/mentoring.jpg',
      alt: 'Academic Mentors & Jury Consultation',
      title: 'Academic Jury Consultation',
      tag: 'Defense Preparation'
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
      {/* Ambient Interactive CursorGrid Background with Right-to-Left Laser Scanline */}
      <div className="pointer-events-none absolute inset-0 z-0">
        <CursorGrid
          cellSize={65}
          color="#1f5eea"
          radius={160}
          falloff="smooth"
          holdTime={400}
          fadeDuration={850}
          lineWidth={1.2}
          maxOpacity={0.45}
          fillOpacity={0.08}
          gridOpacity={0.05}
          cellRadius={3}
          clickPulse={true}
          pulseSpeed={550}
          sweepLine={true}
          sweepInterval={6500}
          sweepDuration={2600}
          className="h-full w-full"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-[1140px] px-6">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_1fr]">
          {/* Left Hero Content */}
          <div
            className={`transition-all duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
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
                className="group flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)] cursor-pointer"
              >
                <span>Register for Season</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
              </button>

              <button
                type="button"
                onClick={() => scrollTo('regions')}
                className="rounded-full border border-[var(--line)] bg-white dark:bg-[#0d1524] px-6 py-3 text-sm font-semibold text-[var(--ink)] shadow-sm transition-all hover:border-[var(--line-strong)] hover:shadow-md cursor-pointer"
              >
                Explore 14 Regions
              </button>
            </div>

            {/* Compact Stats with CountUp Animation */}
            <div className="grid grid-cols-3 gap-6 border-t border-[var(--line)] pt-6">
              {siteData.stats.slice(0, 3).map((stat) => (
                <div key={stat.label}>
                  <div className="font-mono-tag text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                    <CountUp value={stat.value} start={isRevealed} duration={1300} />
                  </div>
                  <div className="text-xs text-[var(--ink-muted)]">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Hero: Vericase-Style Scattered Overlapping Photo Collage (Edge-to-edge, zero margins) */}
          <div
            className={`relative min-h-[520px] select-none transition-all duration-1000 delay-150 ease-[cubic-bezier(0.16,1,0.3,1)] ${
              isRevealed ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-8 scale-95'
            }`}
          >
            {/* Visual container with 6 overlapping photos */}
            <div className="relative mx-auto h-[520px] w-full max-w-[540px]">

              {/* Card 1 (Base Anchor Left): Grand Final Tashkent */}
              <div
                onClick={() => onPhotoClick(galleryItems[0])}
                className="group absolute left-0 top-8 z-10 w-[68%] cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.03] hover:shadow-2xl hover:border-[var(--line-strong)] -rotate-3"
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden">
                  <img
                    src={galleryItems[0].src}
                    alt={galleryItems[0].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                    <span>Grand Final · Tashkent</span>
                  </div>
                  <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 2 (Top-Right): Team Jupiter Presentation */}
              <div
                onClick={() => onPhotoClick(galleryItems[1])}
                className="group absolute right-0 top-0 z-20 w-[58%] cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-lg transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] rotate-3"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={galleryItems[1].src}
                    alt={galleryItems[1].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md shadow-sm">
                    <span>Team Jupiter</span>
                  </div>
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Card 3 (Center-Right): Uzcosmos Awards */}
              <div
                onClick={() => onPhotoClick(galleryItems[2])}
                className="group absolute right-2 top-40 z-25 w-[62%] cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] -rotate-1"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={galleryItems[2].src}
                    alt={galleryItems[2].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2.5 left-2.5 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-[11px] font-semibold text-white backdrop-blur-md shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-amber-400" />
                    <span>Uzcosmos Awards</span>
                  </div>
                  <div className="absolute right-2.5 top-2.5 flex h-7 w-7 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3.5 w-3.5" />
                  </div>
                </div>
              </div>

              {/* Card 4 (Center-Left): Aerospace Workshop */}
              <div
                onClick={() => onPhotoClick(galleryItems[3])}
                className="group absolute left-2 top-52 z-22 w-[52%] cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-xl transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] rotate-4"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={galleryItems[3].src}
                    alt={galleryItems[3].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-sky-400" />
                    <span>Workshop Lab</span>
                  </div>
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Card 5 (Bottom-Right): Mentoring & Jury */}
              <div
                onClick={() => onPhotoClick(galleryItems[4])}
                className="group absolute right-4 bottom-2 z-30 w-[54%] cursor-pointer overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-[1.04] hover:shadow-2xl hover:border-[var(--line-strong)] -rotate-2"
              >
                <div className="relative aspect-[16/11] w-full overflow-hidden">
                  <img
                    src={galleryItems[4].src}
                    alt={galleryItems[4].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-2 left-2 flex items-center gap-1.5 rounded-full border border-white/20 bg-black/65 px-2.5 py-0.5 text-[10px] font-semibold text-white backdrop-blur-md shadow-sm">
                    <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                    <span>Jury Mentoring</span>
                  </div>
                  <div className="absolute right-2 top-2 flex h-6 w-6 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-3 w-3" />
                  </div>
                </div>
              </div>

              {/* Card 6 (Bottom-Left): Pitching Defense */}
              <div
                onClick={() => onPhotoClick(galleryItems[5])}
                className="group absolute -left-2 bottom-3 z-28 w-[45%] cursor-pointer overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-xl transition-all duration-300 ease-out hover:z-40 hover:-translate-y-2 hover:rotate-0 hover:scale-105 hover:shadow-2xl hover:border-[var(--line-strong)] rotate-2"
              >
                <div className="relative aspect-[4/3] w-full overflow-hidden">
                  <img
                    src={galleryItems[5].src}
                    alt={galleryItems[5].alt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute bottom-1.5 left-1.5 rounded-full border border-white/20 bg-black/65 px-2 py-0.5 text-[9px] font-medium text-white backdrop-blur-sm shadow-sm">
                    English Defense
                  </div>
                  <div className="absolute right-1.5 top-1.5 flex h-5 w-5 items-center justify-center rounded-full bg-black/40 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100">
                    <Maximize2 className="h-2.5 w-2.5" />
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

