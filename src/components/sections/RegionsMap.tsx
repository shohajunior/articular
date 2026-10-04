import React, { useState } from 'react';
import { siteData, RegionEvent } from '../../data/site';
import { uzMapPaths } from '../../data/uzMap';
import { MapPin, Calendar, Clock, CheckCircle2 } from 'lucide-react';

export const RegionsMap: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('tashkent');

  const selectedRegion =
    siteData.regions.find((r) => r.id === selectedRegionId) || siteData.regions[0];

  // Helper to map SVG data-id to siteData region id
  const getMappedRegion = (svgId: string): RegionEvent | undefined => {
    if (svgId === 'tashkent-city') return siteData.regions.find((r) => r.id === 'tashkent');
    if (svgId === 'tashkent-reg') return siteData.regions.find((r) => r.id === 'tashkent-region');
    return siteData.regions.find((r) => r.id === svgId);
  };

  return (
    <section id="regions" className="border-t border-[var(--line)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Regional Chapters
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Tournament presence across{' '}
            <span className="font-serif-italic text-[var(--accent)]">Uzbekistan</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Explore verified event venues and chapters across all 14 administrative subdivisions.
          </p>
        </div>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-start">
          {/* Interactive Vector Map Container */}
          <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-[var(--ink-dim)]">
                Geographic Coverage Map
              </span>
              <div className="flex items-center gap-3 text-xs text-[var(--ink-muted)]">
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-[var(--accent)]" />
                  <span>Confirmed Rounds</span>
                </span>
                <span className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full border border-[var(--line-strong)] bg-transparent" />
                  <span>Open Chapters</span>
                </span>
              </div>
            </div>

            {/* SVG Map of Uzbekistan */}
            <div className="relative aspect-[1000/652] w-full">
              <svg
                viewBox="0 0 1000 652"
                className="h-full w-full select-none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {uzMapPaths.map((p) => {
                  const reg = getMappedRegion(p.id);
                  const isConfirmed = reg?.isConfirmed ?? false;
                  const isSelected =
                    (p.id === 'tashkent-city' && selectedRegionId === 'tashkent') ||
                    (p.id === 'tashkent-reg' && selectedRegionId === 'tashkent-region') ||
                    p.id === selectedRegionId;

                  return (
                    <path
                      key={p.pathId}
                      id={p.pathId}
                      d={p.d}
                      onClick={() => {
                        if (reg) setSelectedRegionId(reg.id);
                      }}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        fill: isSelected
                          ? 'var(--accent)'
                          : isConfirmed
                          ? 'var(--accent-tint)'
                          : 'var(--surface)',
                        stroke: isSelected
                          ? 'var(--accent)'
                          : isConfirmed
                          ? 'var(--accent)'
                          : 'var(--line-strong)',
                        strokeWidth: isSelected ? 2 : 1,
                        opacity: isSelected ? 1 : 0.9
                      }}
                    >
                      <title>{p.name}</title>
                    </path>
                  );
                })}
              </svg>
            </div>
          </div>

          {/* Region Details Card & Fast Selector */}
          <div className="flex flex-col gap-5">
            {/* Selected Region Card */}
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-sm">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <span className="rounded-full bg-[var(--accent-tint)] px-3 py-1 text-[11px] font-semibold text-[var(--accent)]">
                    {selectedRegion.status}
                  </span>
                  <h3 className="mt-2 text-2xl font-bold text-[var(--ink)]">
                    {selectedRegion.name}
                  </h3>
                  <div className="text-xs text-[var(--ink-dim)]">
                    {selectedRegion.uzName}
                  </div>
                </div>
              </div>

              {selectedRegion.isConfirmed ? (
                <div className="space-y-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-xs sm:text-sm">
                  <div className="flex items-center gap-2.5 text-[var(--ink)]">
                    <MapPin className="h-4 w-4 text-[var(--accent)]" />
                    <span className="font-semibold">{selectedRegion.venue}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[var(--ink-muted)]">
                    <Calendar className="h-4 w-4 text-[var(--accent)]" />
                    <span>{selectedRegion.date}</span>
                  </div>
                  <div className="flex items-center gap-2.5 text-[var(--ink-muted)]">
                    <Clock className="h-4 w-4 text-[var(--accent)]" />
                    <span>{selectedRegion.time}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-xs text-[var(--ink-muted)] sm:text-sm">
                  Teams from {selectedRegion.name} can register for upcoming regional rounds via the official Telegram bot.
                </div>
              )}

              <div className="mt-6 flex items-center gap-3">
                <a
                  href={siteData.links.bot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  Register from {selectedRegion.name}
                </a>
              </div>
            </div>

            {/* Quick Pill Filter for All 14 Regions */}
            <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-5 shadow-sm">
              <div className="mb-3 text-xs font-semibold text-[var(--ink-dim)]">
                Quick Select Region:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {siteData.regions.map((reg) => {
                  const isSelected = reg.id === selectedRegionId;
                  return (
                    <button
                      key={reg.id}
                      type="button"
                      onClick={() => setSelectedRegionId(reg.id)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-all ${
                        isSelected
                          ? 'bg-[var(--accent)] text-[var(--accent-contrast)] font-semibold'
                          : reg.isConfirmed
                          ? 'border border-[var(--accent)] text-[var(--accent)] hover:bg-[var(--accent-tint)]'
                          : 'border border-[var(--line)] text-[var(--ink-muted)] hover:border-[var(--line-strong)] hover:text-[var(--ink)]'
                      }`}
                    >
                      {reg.name}
                      {reg.isConfirmed && ' •'}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
