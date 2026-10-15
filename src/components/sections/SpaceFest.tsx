import React from 'react';
import { siteData } from '../../data/site';
import { RevealWords } from '../ui/RevealWords';
import { Calendar, MapPin, Users, Sparkles, Trophy, ArrowRight, Expand } from 'lucide-react';
import { LightboxItem } from '../ui/LightboxModal';

interface SpaceFestProps {
  onPhotoClick?: (item: LightboxItem) => void;
}

export const SpaceFest: React.FC<SpaceFestProps> = ({ onPhotoClick }) => {
  const sf = siteData.spaceFest;

  const handleOpenPhoto = (photo: { src: string; title: string; tag: string }) => {
    if (onPhotoClick) {
      onPhotoClick({
        src: photo.src,
        title: photo.title,
        subtitle: photo.tag,
        badge: sf.badge,
        category: 'Space Fest 2026',
      });
    }
  };

  return (
    <section
      id="space-fest"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-20 sm:py-28 transition-colors duration-300"
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none absolute -top-40 right-0 h-96 w-96 rounded-full opacity-20 blur-3xl"
        style={{
          background: 'radial-gradient(circle, #38bdf8 0%, rgba(3,105,161,0) 70%)',
        }}
      />

      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3.5 py-1 text-xs font-semibold text-[var(--accent)]">
            <Sparkles className="h-3.5 w-3.5" />
            <span className="font-mono-tag tracking-wider uppercase">{sf.badge}</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            <RevealWords parts={[{ text: sf.title }]} />
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--ink-muted)]">
            {sf.subtitle}
          </p>

          {/* Key Metrics Chips */}
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2 text-xs font-medium text-[var(--ink)] shadow-xs">
              <Calendar className="h-4 w-4 text-[var(--accent)]" />
              <span>{sf.date}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2 text-xs font-medium text-[var(--ink)] shadow-xs">
              <MapPin className="h-4 w-4 text-[var(--accent)]" />
              <span>{sf.venue}</span>
            </div>
            <div className="inline-flex items-center gap-2 rounded-xl border border-[var(--line)] bg-[var(--bg)] px-3.5 py-2 text-xs font-medium text-[var(--ink)] shadow-xs">
              <Users className="h-4 w-4 text-[var(--accent)]" />
              <span>{sf.participants}</span>
            </div>
          </div>
        </div>

        {/* Results Highlight Banner */}
        <div className="mt-10 overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-8 shadow-xs">
          <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 text-amber-500 dark:bg-amber-400/15 dark:text-amber-400">
                <Trophy className="h-6 w-6" />
              </div>
              <div>
                <span className="font-mono-tag text-xs font-bold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  Challenge Results
                </span>
                <p className="mt-1 text-sm sm:text-base leading-relaxed text-[var(--ink)]">
                  {sf.results}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => handleOpenPhoto(sf.photos[0])}
              className="group inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-[var(--accent-contrast)] shadow-xs transition-all hover:bg-[var(--accent-hover)] cursor-pointer"
            >
              <span>View the Highlights</span>
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>

        {/* Photo Gallery Grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {sf.photos.map((photo, index) => (
            <div
              key={index}
              onClick={() => handleOpenPhoto(photo)}
              className="group relative cursor-pointer overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--bg)] shadow-xs transition-all duration-300 hover:-translate-y-1.5 hover:border-[var(--line-strong)] hover:shadow-lg"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src={photo.src}
                  alt={photo.alt}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

                {/* Top Badge */}
                <div className="absolute top-3 left-3">
                  <span className="font-mono-tag rounded-full bg-black/60 px-2.5 py-1 text-[10px] font-semibold tracking-wider text-white backdrop-blur-md">
                    {photo.tag}
                  </span>
                </div>

                {/* Lightbox hint icon */}
                <div className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                  <Expand className="h-3.5 w-3.5" />
                </div>

                {/* Bottom Title */}
                <div className="absolute inset-x-0 bottom-0 p-4">
                  <h4 className="text-sm font-bold text-white drop-shadow-sm">
                    {photo.title}
                  </h4>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
