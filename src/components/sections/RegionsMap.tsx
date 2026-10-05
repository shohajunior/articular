import React, { useState } from 'react';
import { siteData, RegionEvent } from '../../data/site';
import { uzMapPaths } from '../../data/uzMap';
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

export const RegionsMap: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('tashkent');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);
  const [tilt, setTilt] = useState({ rotX: 14, rotY: -3 });
  const [isHoveredMap, setIsHoveredMap] = useState(false);

  const selectedRegion =
    siteData.regions.find((r) => r.id === selectedRegionId) || siteData.regions[0];

  // Helper to map SVG data-id to siteData region id
  const getMappedRegion = (svgId: string): RegionEvent | undefined => {
    if (svgId === 'tashkent-city') return siteData.regions.find((r) => r.id === 'tashkent');
    if (svgId === 'tashkent-reg') return siteData.regions.find((r) => r.id === 'tashkent-region');
    return siteData.regions.find((r) => r.id === svgId);
  };

  // Interactive 3D mouse parallax tilt
  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5
    setTilt({
      rotX: 14 - y * 8, // gentle pitch: 10deg to 18deg
      rotY: -3 + x * 6, // gentle roll: -6deg to 0deg
    });
  };

  const handleMapMouseLeave = () => {
    setIsHoveredMap(false);
    setTilt({ rotX: 14, rotY: -3 });
    setHoveredRegionId(null);
  };

  return (
    <section id="regions" className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-20 transition-colors">
      <div className="relative mx-auto max-w-[1340px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Regional Chapters // Nationwide Presence
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Tournament presence across{' '}
              <span className="font-serif-italic text-[var(--accent)]">Uzbekistan</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-muted)]">
              Explore verified event venues and active tournament chapters across all 14 administrative subdivisions.
            </p>
          </div>

          {/* Quick Legend */}
          <div className="flex flex-wrap items-center gap-4 rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--ink-muted)] shadow-sm">
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
              <span className="font-medium text-[var(--ink)]">5 Confirmed Rounds</span>
            </span>
            <span className="h-3 w-px bg-[var(--line)]" />
            <span className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full border border-[var(--line-strong)] bg-[var(--surface)]" />
              <span>9 Open Chapters</span>
            </span>
          </div>
        </div>

        {/* Anchored 3D Map Canvas: Completely free of box containers, mounted directly to website */}
        <div
          className="relative w-full py-4"
          style={{ perspective: '1400px' }}
          onMouseEnter={() => setIsHoveredMap(true)}
          onMouseMove={handleMapMouseMove}
          onMouseLeave={handleMapMouseLeave}
        >
          {/* Architectural Technical Anchor Crosshairs & Lat/Lng Coordinates */}
          <div className="pointer-events-none absolute -top-1 left-2 flex items-center gap-2 font-mono text-[11px] font-semibold text-[var(--ink-dim)] opacity-60">
            <span className="text-[var(--accent)] font-bold">+</span>
            <span>[ LAT 41°18&apos;N // LNG 69°16&apos;E ]</span>
          </div>
          <div className="pointer-events-none absolute -top-1 right-2 flex items-center gap-2 font-mono text-[11px] font-semibold text-[var(--ink-dim)] opacity-60">
            <span>[ RADAR GRID // 14 SECTORS ]</span>
            <span className="text-[var(--accent)] font-bold">+</span>
          </div>
          <div className="pointer-events-none absolute -bottom-1 left-2 flex items-center gap-2 font-mono text-[11px] font-semibold text-[var(--ink-dim)] opacity-60">
            <span className="text-[var(--accent)] font-bold">+</span>
            <span>[ TERRAIN RELIEF ANCHOR ]</span>
          </div>
          <div className="pointer-events-none absolute -bottom-1 right-2 flex items-center gap-2 font-mono text-[11px] font-semibold text-[var(--ink-dim)] opacity-60">
            <span>[ SEASON 2026 OFFICIAL ]</span>
            <span className="text-[var(--accent)] font-bold">+</span>
          </div>

          {/* 3D Tilted Map Stage */}
          <div
            className="relative mx-auto w-full max-w-[1240px] transition-transform duration-300 ease-out"
            style={{
              transformStyle: 'preserve-3d',
              transform: `rotateX(${tilt.rotX}deg) rotateY(${tilt.rotY}deg) rotateZ(0.5deg)`,
            }}
          >
            {/* Ground Bedrock Ambient Shadow beneath the 3D Map */}
            <div
              className="pointer-events-none absolute inset-0 -bottom-10 rounded-[48px] opacity-70 blur-2xl transition-opacity duration-300"
              style={{
                background: 'radial-gradient(ellipse at 50% 60%, rgba(31, 94, 234, 0.16) 0%, rgba(0, 0, 0, 0.12) 55%, transparent 75%)',
                transform: 'translateZ(-40px) scale(0.95)',
              }}
            />

            {/* Massive SVG Vector Map */}
            <div className="relative aspect-[1000/560] w-full">
              <svg
                viewBox="0 0 1000 652"
                className="h-full w-full select-none"
                xmlns="http://www.w3.org/2000/svg"
                style={{
                  filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.12)) drop-shadow(0 8px 12px rgba(31,94,234,0.14))',
                }}
              >
                <defs>
                  {/* Subtle 3D Depth Layer */}
                  <filter id="active-region-glow" x="-20%" y="-20%" width="140%" height="140%">
                    <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#1f5eea" floodOpacity="0.4" />
                  </filter>
                </defs>

                {uzMapPaths.map((p) => {
                  const reg = getMappedRegion(p.id);
                  const isConfirmed = reg?.isConfirmed ?? false;
                  const isSelected =
                    (p.id === 'tashkent-city' && selectedRegionId === 'tashkent') ||
                    (p.id === 'tashkent-reg' && selectedRegionId === 'tashkent-region') ||
                    p.id === selectedRegionId;
                  const isHovered = hoveredRegionId === p.id;

                  return (
                    <path
                      key={p.pathId}
                      id={p.pathId}
                      d={p.d}
                      onClick={() => {
                        if (reg) setSelectedRegionId(reg.id);
                      }}
                      onMouseEnter={() => setHoveredRegionId(p.id)}
                      onMouseLeave={() => setHoveredRegionId(null)}
                      className="cursor-pointer transition-all duration-200"
                      style={{
                        fill: isSelected
                          ? 'var(--accent)'
                          : isHovered
                          ? 'var(--accent-hover)'
                          : isConfirmed
                          ? 'var(--accent-tint)'
                          : 'var(--surface)',
                        stroke: isSelected
                          ? '#ffffff'
                          : isConfirmed
                          ? 'var(--accent)'
                          : 'var(--line-strong)',
                        strokeWidth: isSelected ? 2.5 : isHovered ? 2 : 1,
                        opacity: isSelected ? 1 : 0.95,
                        filter: isSelected ? 'url(#active-region-glow)' : 'none',
                        transformOrigin: 'center center',
                      }}
                    >
                      <title>{p.name} {isConfirmed ? '— Confirmed Round' : '— Open Chapter'}</title>
                    </path>
                  );
                })}
              </svg>
            </div>
          </div>
        </div>

        {/* Selected Region Technical HUD: Horizontal dock that doesn't box the map */}
        <div className="mt-8 rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-sm">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-center">
            {/* Left: Region identification */}
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-[var(--accent-tint)] text-[var(--accent)] font-bold">
                <ShieldCheck className="h-6 w-6" />
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-[var(--accent-tint)] px-3 py-0.5 text-[11px] font-semibold text-[var(--accent)]">
                    {selectedRegion.status}
                  </span>
                  {selectedRegion.isConfirmed && (
                    <span className="flex items-center gap-1 text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                      <CheckCircle2 className="h-3.5 w-3.5" />
                      <span>Round Verified</span>
                    </span>
                  )}
                </div>
                <h3 className="mt-1 text-2xl font-bold tracking-tight text-[var(--ink)]">
                  {selectedRegion.name}
                  <span className="ml-2 text-sm font-normal text-[var(--ink-dim)]">
                    ({selectedRegion.uzName})
                  </span>
                </h3>
              </div>
            </div>

            {/* Middle: Details or Description */}
            <div className="flex-1 lg:max-w-xl">
              {selectedRegion.isConfirmed ? (
                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-3 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-xs">
                  <div className="flex items-center gap-2 text-[var(--ink)]">
                    <MapPin className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span className="font-semibold truncate">{selectedRegion.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--ink-muted)]">
                    <Calendar className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{selectedRegion.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[var(--ink-muted)]">
                    <Clock className="h-4 w-4 shrink-0 text-[var(--accent)]" />
                    <span>{selectedRegion.time}</span>
                  </div>
                </div>
              ) : (
                <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-xs text-[var(--ink-muted)]">
                  Regional chapter active. Teams from <span className="font-semibold text-[var(--ink)]">{selectedRegion.name}</span> can register for upcoming tournament rounds via the official Telegram bot.
                </div>
              )}
            </div>

            {/* Right: CTA button */}
            <div className="shrink-0">
              <a
                href={siteData.links.bot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-6 py-3 text-xs font-semibold text-[var(--accent-contrast)] shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md"
              >
                <span>Register from {selectedRegion.name}</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
