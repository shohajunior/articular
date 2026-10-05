import React, { useState } from 'react';
import { siteData, RegionEvent } from '../../data/site';
import { uzMapPaths } from '../../data/uzMap';
import { MapPin, Calendar, Clock, ArrowRight, ShieldCheck, Compass, CheckCircle2 } from 'lucide-react';

interface CityBeacon {
  id: string;
  name: string;
  regionId: string;
  x: number;
  y: number;
  isConfirmed: boolean;
}

const CITY_BEACONS: CityBeacon[] = [
  { id: 'b-tashkent', name: 'Tashkent', regionId: 'tashkent', x: 748, y: 346, isConfirmed: true },
  { id: 'b-bukhara', name: 'Bukhara', regionId: 'bukhara', x: 530, y: 468, isConfirmed: true },
  { id: 'b-samarkand', name: 'Samarkand', regionId: 'samarkand', x: 652, y: 467, isConfirmed: true },
  { id: 'b-fergana', name: 'Fergana', regionId: 'fergana', x: 882, y: 434, isConfirmed: true },
  { id: 'b-andijan', name: 'Andijan', regionId: 'andijan', x: 905, y: 398, isConfirmed: true },
];

// Vertical step offsets for true 3D extruded volume (depth down to 18px)
const EXTRUSION_STEPS = [16, 8, 2];
const SELECTED_EXTRUSION_STEPS = [8, 4, 1];

export const RegionsMap: React.FC = () => {
  const [selectedRegionId, setSelectedRegionId] = useState<string>('tashkent');
  const [hoveredRegionId, setHoveredRegionId] = useState<string | null>(null);

  // High-performance Direct-DOM 3D Tilt Stage with RAF Inertia (Zero React re-renders on mousemove)
  const mapStageRef = useRef<HTMLDivElement>(null);
  const targetRotRef = useRef({ rotX: 38, rotY: -4, rotZ: -3 });
  const currentRotRef = useRef({ rotX: 38, rotY: -4, rotZ: -3 });
  const animFrameRef = useRef<number | null>(null);
  const isAnimatingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const cachedRectRef = useRef<DOMRect | null>(null);

  const startTiltLoop = () => {
    if (isAnimatingRef.current) return;
    isAnimatingRef.current = true;

    const loop = () => {
      const cur = currentRotRef.current;
      const target = targetRotRef.current;
      const lerp = 0.12;

      cur.rotX += (target.rotX - cur.rotX) * lerp;
      cur.rotY += (target.rotY - cur.rotY) * lerp;
      cur.rotZ += (target.rotZ - cur.rotZ) * lerp;

      if (mapStageRef.current) {
        mapStageRef.current.style.transform = `rotateX(${cur.rotX.toFixed(2)}deg) rotateY(${cur.rotY.toFixed(2)}deg) rotateZ(${cur.rotZ.toFixed(2)}deg)`;
      }

      const diff =
        Math.abs(target.rotX - cur.rotX) +
        Math.abs(target.rotY - cur.rotY) +
        Math.abs(target.rotZ - cur.rotZ);

      if (diff > 0.02 || isHoveredRef.current) {
        animFrameRef.current = requestAnimationFrame(loop);
      } else {
        isAnimatingRef.current = false;
      }
    };

    animFrameRef.current = requestAnimationFrame(loop);
  };

  const handleMapMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    cachedRectRef.current = e.currentTarget.getBoundingClientRect();
    isHoveredRef.current = true;
    startTiltLoop();
  };

  const handleMapMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cachedRectRef.current || e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // -0.5 to 0.5

    targetRotRef.current = {
      rotX: 38 - y * 12, // 32deg to 44deg
      rotY: -4 + x * 10, // -9deg to 1deg
      rotZ: -3 + x * 2,
    };

    startTiltLoop();
  };

  const handleMapMouseLeave = () => {
    isHoveredRef.current = false;
    targetRotRef.current = { rotX: 38, rotY: -4, rotZ: -3 };
    startTiltLoop();
    setHoveredRegionId(null);
  };

  const selectedRegion =
    siteData.regions.find((r) => r.id === selectedRegionId) || siteData.regions[0];

  const getMappedRegion = (svgId: string): RegionEvent | undefined => {
    if (svgId === 'tashkent-city') return siteData.regions.find((r) => r.id === 'tashkent');
    if (svgId === 'tashkent-reg') return siteData.regions.find((r) => r.id === 'tashkent-region');
    return siteData.regions.find((r) => r.id === svgId);
  };

  return (
    <section id="regions" className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-20 transition-colors">
      <div className="relative mx-auto max-w-[1340px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end mb-8">
          <div>
            <div className="flex items-center gap-2">
              <Compass className="h-4 w-4 text-[var(--accent)]" />
              <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Regional Chapters // Nationwide Presence
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              Tournament presence across{' '}
              <span className="font-serif italic text-[var(--accent)]">Uzbekistan</span>
            </h2>
            <p className="mt-2 max-w-2xl text-sm text-[var(--ink-muted)]">
              Interactive 3D volumetric map. Explore verified aerospace event venues and active tournament chapters across all 14 regions.
            </p>
          </div>

          {/* Quick Legend */}
          <div className="flex items-center gap-3 rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--ink-muted)] shadow-sm">
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] shadow-sm" />
              <span className="font-medium text-[var(--ink)]">5 Confirmed Rounds</span>
            </span>
            <span className="h-3 w-px bg-[var(--line)]" />
            <span className="flex items-center gap-1.5">
              <span className="h-2 w-2 rounded-full border border-[var(--line-strong)] bg-[var(--surface)]" />
              <span>9 Open Chapters</span>
            </span>
          </div>
        </div>

        {/* Anchored 3D Map Canvas with High-Depth Perspective Container */}
        <div
          className="relative w-full py-8 sm:py-12 select-none"
          style={{ perspective: '1200px' }}
          onMouseEnter={handleMapMouseEnter}
          onMouseMove={handleMapMouseMove}
          onMouseLeave={handleMapMouseLeave}
        >
          {/* 3D Tilted Map Stage with Dynamic Inertial Pitch/Roll via RAF */}
          <div
            ref={mapStageRef}
            className="relative mx-auto w-full max-w-[1240px]"
            style={{
              transformStyle: 'preserve-3d',
              willChange: 'transform',
              transform: 'rotateX(38deg) rotateY(-4deg) rotateZ(-3deg)',
            }}
          >
            {/* Ground Bedrock Ambient Drop Shadow beneath the 3D Slab */}
            <div
              className="pointer-events-none absolute inset-x-8 -bottom-14 h-48 rounded-[64px] opacity-75 blur-3xl transition-opacity duration-300"
              style={{
                background: 'radial-gradient(ellipse at 50% 50%, rgba(31, 94, 234, 0.22) 0%, rgba(15, 23, 42, 0.35) 45%, transparent 75%)',
                transform: 'translateZ(-50px) scale(0.96)',
              }}
            />

            {/* Massive Volumetric SVG Vector Map */}
            <div className="relative aspect-[1000/580] w-full">
              <svg
                viewBox="0 0 1000 660"
                className="h-full w-full select-none overflow-visible"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  {/* Subtle 3D Surface Lighting Gradient */}
                  <linearGradient id="map-light-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
                    <stop offset="60%" stopColor="#f8fafc" stopOpacity="1" />
                    <stop offset="100%" stopColor="#eef4f9" stopOpacity="1" />
                  </linearGradient>

                  {/* Dark Mode Surface Lighting Gradient */}
                  <linearGradient id="map-dark-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#1e293b" stopOpacity="1" />
                    <stop offset="60%" stopColor="#151f2e" stopOpacity="1" />
                    <stop offset="100%" stopColor="#0f172a" stopOpacity="1" />
                  </linearGradient>

                  {/* Active Selected Region 3D Gradient */}
                  <linearGradient id="active-region-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity="1" />
                    <stop offset="100%" stopColor="#1d4ed8" stopOpacity="1" />
                  </linearGradient>

                  {/* Floating Pin Glow */}
                  <filter id="pin-glow" x="-50%" y="-50%" width="200%" height="200%">
                    <feDropShadow dx="0" dy="2" stdDeviation="4" floodColor="#1f5eea" floodOpacity="0.6" />
                  </filter>
                </defs>

                {/* ========================================================= */}
                {/* 1. PHYSICAL 3D EXTRUDED BEDROCK BASE (Volumetric Side Skirts) */}
                {/* ========================================================= */}
                <g id="extruded-bedrock">
                  {EXTRUSION_STEPS.map((stepY, idx) => {
                    // Darker gradient on the lowest layers creates photorealistic cliff depth
                    const darknessRatio = idx / (EXTRUSION_STEPS.length - 1);
                    return (
                      <g key={`bedrock-step-${stepY}`} transform={`translate(0, ${stepY})`}>
                        {uzMapPaths.map((p) => (
                          <path
                            key={`${p.pathId}-bedrock-${stepY}`}
                            d={p.d}
                            className="transition-colors duration-300 pointer-events-none"
                            style={{
                              fill: `color-mix(in srgb, var(--surface) ${Math.round(70 - darknessRatio * 35)}%, #64748b)`,
                              stroke: `color-mix(in srgb, var(--line-strong) 60%, #334155)`,
                              strokeWidth: 1,
                              opacity: 0.9,
                            }}
                          />
                        ))}
                      </g>
                    );
                  })}
                </g>

                {/* ========================================================= */}
                {/* 2. BASE TOP SURFACE WITH CRISP BORDERS (Elevation = 0)     */}
                {/* ========================================================= */}
                <g id="map-surface">
                  {uzMapPaths.map((p) => {
                    const reg = getMappedRegion(p.id);
                    const isConfirmed = reg?.isConfirmed ?? false;
                    const isSelected =
                      (p.id === 'tashkent-city' && selectedRegionId === 'tashkent') ||
                      (p.id === 'tashkent-reg' && selectedRegionId === 'tashkent-region') ||
                      p.id === selectedRegionId;
                    const isHovered = hoveredRegionId === p.id;

                    // If selected, we render it elevated in step 3 so it pops up in 3D!
                    if (isSelected) return null;

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
                          fill: isHovered
                            ? 'var(--accent-tint)'
                            : isConfirmed
                            ? 'rgba(31, 94, 234, 0.08)'
                            : 'var(--surface)',
                          stroke: isHovered
                            ? 'var(--accent)'
                            : isConfirmed
                            ? 'rgba(31, 94, 234, 0.5)'
                            : 'var(--line-strong)',
                          strokeWidth: isHovered ? 2 : isConfirmed ? 1.5 : 1,
                          opacity: 1,
                        }}
                      >
                        <title>{p.name} {isConfirmed ? '— Confirmed Round' : '— Open Chapter'}</title>
                      </path>
                    );
                  })}
                </g>

                {/* ========================================================= */}
                {/* 3. ELEVATED SELECTED REGION (Physically rises 12px in 3D!) */}
                {/* ========================================================= */}
                {uzMapPaths.map((p) => {
                  const reg = getMappedRegion(p.id);
                  const isSelected =
                    (p.id === 'tashkent-city' && selectedRegionId === 'tashkent') ||
                    (p.id === 'tashkent-reg' && selectedRegionId === 'tashkent-region') ||
                    p.id === selectedRegionId;

                  if (!isSelected) return null;

                  return (
                    <g key={`elevated-${p.pathId}`} className="transition-transform duration-300">
                      {/* 3.1 Drop shadow of the elevated 3D piece */}
                      <path
                        d={p.d}
                        transform="translate(0, 10)"
                        className="pointer-events-none"
                        style={{
                          fill: '#0f172a',
                          opacity: 0.35,
                          filter: 'blur(8px)',
                        }}
                      />

                      {/* 3.2 Extruded blue side-skirt thickness for the rising piece */}
                      {SELECTED_EXTRUSION_STEPS.map((offsetY) => (
                        <path
                          key={`selected-extrusion-${offsetY}`}
                          d={p.d}
                          transform={`translate(0, ${-offsetY})`}
                          className="pointer-events-none"
                          style={{
                            fill: `color-mix(in srgb, #1e40af ${offsetY * 10}%, #1d4ed8)`,
                            stroke: '#1e3a8a',
                            strokeWidth: 1,
                            opacity: 0.95,
                          }}
                        />
                      ))}

                      {/* 3.3 Top floating surface of the selected region */}
                      <path
                        id={`${p.pathId}-top`}
                        d={p.d}
                        transform="translate(0, -12)"
                        onClick={() => {
                          if (reg) setSelectedRegionId(reg.id);
                        }}
                        className="cursor-pointer transition-all duration-300"
                        style={{
                          fill: 'url(#active-region-grad)',
                          stroke: '#ffffff',
                          strokeWidth: 2.5,
                          filter: 'drop-shadow(0 4px 12px rgba(31, 94, 234, 0.5))',
                        }}
                      >
                        <title>{p.name} (Active Tournament Host)</title>
                      </path>
                    </g>
                  );
                })}

                {/* ========================================================= */}
                {/* 4. 3D FLOATING HOLOGRAPHIC BEACONS (Sticking into 3D Space) */}
                {/* ========================================================= */}
                <g id="holographic-beacons" className="pointer-events-auto">
                  {CITY_BEACONS.map((b) => {
                    const isCurrent = selectedRegionId === b.regionId;
                    const beaconElevationY = isCurrent ? b.y - 12 : b.y;

                    return (
                      <g
                        key={b.id}
                        transform={`translate(${b.x}, ${beaconElevationY})`}
                        className="cursor-pointer transition-transform duration-300"
                        onClick={() => setSelectedRegionId(b.regionId)}
                      >
                        {/* 4.1 Ground Ripple Wave */}
                        <circle
                          cx="0"
                          cy="0"
                          r="6"
                          className="text-blue-500 fill-blue-500/20 stroke-blue-500"
                          strokeWidth="1.5"
                        />
                        <circle
                          cx="0"
                          cy="0"
                          r="12"
                          className="animate-ping fill-none stroke-blue-400 opacity-60"
                          strokeWidth="1"
                        />

                        {/* 4.2 Vertical Neon 3D Stem Line pointing up into the air */}
                        <line
                          x1="0"
                          y1="0"
                          x2="0"
                          y2="-26"
                          stroke={isCurrent ? '#60a5fa' : '#3b82f6'}
                          strokeWidth="2"
                          strokeDasharray={isCurrent ? 'none' : '2 2'}
                        />

                        {/* 4.3 Floating 3D Badge Head at the top of the pin */}
                        <g transform="translate(0, -28)" filter="url(#pin-glow)">
                          {/* Diamond Head */}
                          <polygon
                            points="0,-6 6,0 0,6 -6,0"
                            fill={isCurrent ? '#ffffff' : '#3b82f6'}
                            stroke={isCurrent ? '#1d4ed8' : '#ffffff'}
                            strokeWidth="1.5"
                          />
                          {/* Floating Pill Label */}
                          <rect
                            x="-34"
                            y="-24"
                            width="68"
                            height="18"
                            rx="9"
                            fill={isCurrent ? '#1d4ed8' : 'var(--surface)'}
                            stroke={isCurrent ? '#ffffff' : 'var(--line-strong)'}
                            strokeWidth="1"
                            className="shadow-sm"
                          />
                          <text
                            x="0"
                            y="-11.5"
                            textAnchor="middle"
                            fill={isCurrent ? '#ffffff' : 'var(--ink)'}
                            fontSize="9"
                            fontWeight="700"
                            fontFamily="var(--font-mono, monospace)"
                            letterSpacing="0.02em"
                          >
                            {b.name}
                          </text>
                        </g>
                      </g>
                    );
                  })}
                </g>
              </svg>
            </div>
          </div>
        </div>

        {/* Selected Region Technical HUD */}
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
