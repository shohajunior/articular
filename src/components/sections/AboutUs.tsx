import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface StoryBlock {
  step: string;
  tag: string;
  word: string;
  desc: string;
  activeThreshold: number;
}

const STORY_BLOCKS: StoryBlock[] = [
  {
    step: '01',
    tag: 'THE HYPOTHESIS',
    word: 'CALCULATE.',
    desc: 'Autonomous orbital calculations. No textbook templates.',
    activeThreshold: 0.15,
  },
  {
    step: '02',
    tag: 'THE DEFENSE',
    word: 'DEFEND.',
    desc: '100% English defense before Uzcosmos space agency engineers.',
    activeThreshold: 0.48,
  },
  {
    step: '03',
    tag: 'THE APOGEE',
    word: 'LAUNCH.',
    desc: 'Uzcosmos co-signed credentials. Direct global academic trajectory.',
    activeThreshold: 0.80,
  },
];

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const trailPathRef = useRef<SVGPathElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const totalLengthRef = useRef(3000);

  const b1Ref = useRef<HTMLDivElement>(null);
  const b2Ref = useRef<HTMLDivElement>(null);
  const b3Ref = useRef<HTMLDivElement>(null);

  const [pathData, setPathData] = useState('');
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [activeStages, setActiveStages] = useState<[boolean, boolean, boolean]>([false, false, false]);
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([]);

  // Fast direct DOM positioning for the rocket along the SVG path
  const updateRocketDomAtProgress = (pathElement: SVGPathElement | null, progress: number) => {
    if (!pathElement || !rocketRef.current) return;
    try {
      const len = totalLengthRef.current;
      if (len <= 0) return;

      const currentLen = Math.max(0, Math.min(len, progress * len));
      const pt = pathElement.getPointAtLength(currentLen);

      let angleDeg = 45;
      if (currentLen < len - 4) {
        const nextPt = pathElement.getPointAtLength(currentLen + 4);
        angleDeg = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
      } else {
        const prevPt = pathElement.getPointAtLength(Math.max(0, currentLen - 4));
        angleDeg = Math.atan2(pt.y - prevPt.y, pt.x - prevPt.x) * (180 / Math.PI);
      }

      // Hardware-accelerated translate3d with zero layout invalidation
      rocketRef.current.style.transform = `translate3d(${pt.x}px, ${pt.y}px, 0) translate(-50%, -50%) rotate(${angleDeg}deg)`;
    } catch {
      // Ignored during unmount
    }
  };

  // 1. Recalculate zigzag flight path connecting the 3 centered blocks
  const updateTrajectory = () => {
    if (!containerRef.current || !b1Ref.current || !b2Ref.current || !b3Ref.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    if (cRect.width === 0) return;

    const r1 = b1Ref.current.getBoundingClientRect();
    const r2 = b2Ref.current.getBoundingClientRect();
    const r3 = b3Ref.current.getBoundingClientRect();

    // Exact center coordinates of the 3 centered text blocks relative to container
    const p1 = {
      x: r1.left - cRect.left + r1.width / 2,
      y: r1.top - cRect.top + r1.height * 0.42,
    };
    const p2 = {
      x: r2.left - cRect.left + r2.width / 2,
      y: r2.top - cRect.top + r2.height * 0.42,
    };
    const p3 = {
      x: r3.left - cRect.left + r3.width / 2,
      y: r3.top - cRect.top + r3.height * 0.42,
    };

    setWaypoints([p1, p2, p3]);

    const width = cRect.width;
    // Amplitude of the zigzag wing swoops (adapts to mobile and desktop)
    const amp = Math.max(90, Math.min(width * 0.38, 380));

    // Entry point: swoops in from upper left
    const startX = Math.max(20, p1.x - amp * 0.85);
    const startY = Math.max(10, p1.y - 160);

    // Right wing apex (between Block 1 and Block 2)
    const midY1 = (p1.y + p2.y) / 2;
    const rightApexX = p1.x + amp;
    const rightApexY = midY1;

    // Left wing apex (between Block 2 and Block 3)
    const midY2 = (p2.y + p3.y) / 2;
    const leftApexX = p2.x - amp;
    const leftApexY = midY2;

    // Exit point (accelerates downwards out of Block 3)
    const endX = p3.x + amp * 0.45;
    const endY = p3.y + 200;

    // Control points for smooth continuous S-curve zigzag
    const cp0x1 = startX + amp * 0.3;
    const cp0y1 = startY + 50;
    const cp0x2 = p1.x - amp * 0.25;
    const cp0y2 = p1.y - 50;

    const cp1x1 = p1.x + amp * 0.6;
    const cp1y1 = p1.y + 70;
    const cp1x2 = rightApexX;
    const cp1y2 = rightApexY - 90;

    const cp2x1 = rightApexX;
    const cp2y1 = rightApexY + 90;
    const cp2x2 = p2.x + amp * 0.55;
    const cp2y2 = p2.y - 70;

    const cp3x1 = p2.x - amp * 0.6;
    const cp3y1 = p2.y + 70;
    const cp3x2 = leftApexX;
    const cp3y2 = leftApexY - 90;

    const cp4x1 = leftApexX;
    const cp4y1 = leftApexY + 90;
    const cp4x2 = p3.x - amp * 0.55;
    const cp4y2 = p3.y - 70;

    const cp5x1 = p3.x + amp * 0.2;
    const cp5y1 = p3.y + 80;
    const cp5x2 = endX;
    const cp5y2 = endY - 60;

    const d = `M ${startX} ${startY} C ${cp0x1} ${cp0y1}, ${cp0x2} ${cp0y2}, ${p1.x} ${p1.y} C ${cp1x1} ${cp1y1}, ${cp1x2} ${cp1y2}, ${rightApexX} ${rightApexY} C ${cp2x1} ${cp2y1}, ${cp2x2} ${cp2y2}, ${p2.x} ${p2.y} C ${cp3x1} ${cp3y1}, ${cp3x2} ${cp3y2}, ${leftApexX} ${leftApexY} C ${cp4x1} ${cp4y1}, ${cp4x2} ${cp4y2}, ${p3.x} ${p3.y} C ${cp5x1} ${cp5y1}, ${cp5x2} ${cp5y2}, ${endX} ${endY}`;

    setPathData(d);

    // Calculate length immediately using a temporary SVG path to guarantee length is available instantly
    try {
      const tempPath = document.createElementNS('http://www.w3.org/2000/svg', 'path');
      tempPath.setAttribute('d', d);
      const len = tempPath.getTotalLength();
      if (len > 0) {
        totalLengthRef.current = len;
        setTotalPathLength(len);
        updateRocketDomAtProgress(tempPath, 0);
      }
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    updateTrajectory();
    const t1 = setTimeout(updateTrajectory, 80);
    const t2 = setTimeout(updateTrajectory, 300);
    const handleResize = () => updateTrajectory();
    window.addEventListener('resize', handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => updateTrajectory());
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, []);

  // Update total path length from real DOM path whenever mounted or updated
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          totalLengthRef.current = len;
          setTotalPathLength(len);
          updateRocketDomAtProgress(pathRef.current, 0);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathData]);

  // 2. High-performance direct-DOM scroll listener running at native display refresh rate
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!containerRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!containerRef.current) {
            ticking = false;
            return;
          }
          const rect = containerRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;

          // Flight spans seamlessly as the container traverses through the viewport
          const startTrigger = windowHeight * 0.75;
          const totalDistance = rect.height;
          const currentScrolled = startTrigger - rect.top;

          const p = Math.max(0, Math.min(1, currentScrolled / totalDistance));

          // 1. Direct GPU trail offset update
          if (trailPathRef.current) {
            const len = totalLengthRef.current || 3000;
            trailPathRef.current.style.strokeDashoffset = `${len * (1 - p)}`;
          }

          // 2. Direct GPU rocket position update
          if (pathRef.current) {
            updateRocketDomAtProgress(pathRef.current, p);
          }

          // 3. Threshold-only state update (0-3 re-renders per entire scroll, eliminating 99% overhead)
          const s0 = p >= STORY_BLOCKS[0].activeThreshold;
          const s1 = p >= STORY_BLOCKS[1].activeThreshold;
          const s2 = p >= STORY_BLOCKS[2].activeThreshold;

          setActiveStages((prev) => {
            if (prev[0] !== s0 || prev[1] !== s1 || prev[2] !== s2) {
              return [s0, s1, s2];
            }
            return prev;
          });

          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    if ((window as any).lenis) {
      (window as any).lenis.on('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      if ((window as any).lenis) {
        (window as any).lenis.off('scroll', handleScroll);
      }
    };
  }, [totalPathLength]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative bg-[#06080d] text-white border-t border-[var(--line)] overflow-visible transition-colors duration-300"
    >
      {/* ======================================================== */}
      {/* 1. STATIONARY FIXED BACKGROUND (Stands still while scrolling) */}
      {/* ======================================================== */}
      <div className="sticky top-0 h-screen w-full pointer-events-none overflow-hidden z-0">
        {/* Deep Space Radial Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,30,58,0.45)_0%,_#06080d_78%)]" />

        {/* Stationary Tactical Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-[0.14]"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Stationary Concentric Orbital Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-sky-500/15 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-sky-500/10 pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1240px] h-[1240px] rounded-full border border-sky-500/5 pointer-events-none" />

        {/* Crosshair Center Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-sky-500/10" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-sky-500/10" />

        {/* Static Aerospace HUD Telemetry (Pinned Corners) */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-sky-400/40 uppercase tracking-widest flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          SYS // FIXED REFERENCE FRAME
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-sky-400/40 uppercase tracking-widest">
          41.2995° N, 69.2401° E // UZCOSMOS
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-sky-400/30 uppercase tracking-widest">
          ORBITAL MATRIX: STATIONARY
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-sky-400/30 uppercase tracking-widest">
          ALT: 450 KM STABLE
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. SCROLLING MOVING CONTENT (Moves over stationary background) */}
      {/* ======================================================== */}
      <div className="relative z-10 -mt-[100vh]">
        {/* Section Intro Header */}
        <div className="mx-auto max-w-4xl px-6 pt-24 pb-14 text-center">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md mb-6">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-400">
              MISSION TRAJECTORY // ABOUT ARTICULAR
            </span>
          </div>

          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
            Where young minds{' '}
            <span className="font-serif-italic font-normal text-sky-400">
              articulate the future.
            </span>
          </h2>
          <p className="mt-4 text-sm sm:text-base text-slate-400 max-w-lg mx-auto leading-relaxed">
            Scroll down to pilot the spacecraft along the zigzag tournament trajectory.
          </p>
        </div>

        {/* ======================================================== */}
        {/* ZIGZAG FLIGHT ARENA (Interactive Scroll-Driven Trajectory) */}
        {/* ======================================================== */}
        <div
          ref={containerRef}
          className="relative w-full max-w-[1240px] mx-auto min-h-[1600px] sm:min-h-[1800px] select-none flex flex-col justify-around py-12"
        >
          {/* SVG Canvas with Zigzag Trajectory Lines */}
          <svg
            className="absolute inset-0 h-full w-full pointer-events-none overflow-visible z-10"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Glowing Rocket Trail Gradient */}
              <linearGradient id="rocketTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#1f5eea" stopOpacity="0.1" />
                <stop offset="60%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>

              {/* Waypoint Glow Filter */}
              <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Base Dashed Trajectory Flight Plan (Always rendered to guarantee path measurement) */}
            {pathData && (
              <path
                ref={pathRef}
                d={pathData}
                fill="none"
                stroke="rgba(56, 189, 248, 0.25)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
              />
            )}

            {/* Active Filled Flight Path (Fills in real-time behind the Rocket as you scroll) */}
            {pathData && (
              <path
                ref={trailPathRef}
                d={pathData}
                fill="none"
                stroke="url(#rocketTrailGrad)"
                strokeWidth="4"
                strokeDasharray={totalPathLength || 3000}
                strokeDashoffset={totalPathLength || 3000}
                strokeLinecap="round"
                className="drop-shadow-[0_0_8px_rgba(56,189,248,0.7)]"
              />
            )}

            {/* Waypoint docking beacons in the center */}
            {waypoints.map((pt, idx) => {
              const isActive = activeStages[idx];
              return (
                <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                  <circle
                    r={isActive ? "20" : "10"}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={isActive ? "2" : "1.5"}
                    opacity={isActive ? "0.9" : "0.3"}
                    className="transition-all duration-300"
                  />
                  {isActive && (
                    <circle
                      r="30"
                      fill="none"
                      stroke="#38bdf8"
                      strokeWidth="1"
                      opacity="0.3"
                      className="animate-ping"
                    />
                  )}
                  <circle
                    r="4.5"
                    fill={isActive ? "#38bdf8" : "rgba(56, 189, 248, 0.4)"}
                    className="transition-all duration-300"
                  />
                </g>
              );
            })}
          </svg>

          {/* ======================================================== */}
          {/* SCROLL-DRIVEN FLYING AEROSPACE ORBITAL ROCKET (VECTOR)   */}
          {/* ======================================================== */}
          {pathData && (
            <div
              ref={rocketRef}
              className="absolute left-0 top-0 pointer-events-none z-30 will-change-transform"
              style={{
                transform: 'translate3d(-200px, -200px, 0) translate(-50%, -50%) rotate(45deg)',
              }}
            >
              <OrbitalRocketVessel />
            </div>
          )}

          {/* ======================================================== */}
          {/* 3 CENTERED SHORT POWERFUL STAGES                         */}
          {/* ======================================================== */}

          {/* Block 01: Centered */}
          <div
            ref={b1Ref}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-6 py-16 sm:py-24"
          >
            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-950/40 px-3.5 py-1 backdrop-blur-md mb-4">
              <span className={`h-1.5 w-1.5 rounded-full ${
                activeStages[0] ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[0].step} // {STORY_BLOCKS[0].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-500 ${
                activeStages[0]
                  ? 'text-white scale-105 drop-shadow-[0_0_45px_rgba(56,189,248,0.65)]'
                  : 'text-slate-500 opacity-40 scale-100'
              }`}
            >
              {STORY_BLOCKS[0].word}
            </h3>

            {/* Short Punchy Statement */}
            <p className="mt-4 text-base sm:text-xl font-medium text-slate-300 max-w-md mx-auto leading-relaxed">
              {STORY_BLOCKS[0].desc}
            </p>
          </div>

          {/* Block 02: Centered */}
          <div
            ref={b2Ref}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-6 py-16 sm:py-24"
          >
            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-950/40 px-3.5 py-1 backdrop-blur-md mb-4">
              <span className={`h-1.5 w-1.5 rounded-full ${
                activeStages[1] ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[1].step} // {STORY_BLOCKS[1].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-500 ${
                activeStages[1]
                  ? 'text-white scale-105 drop-shadow-[0_0_45px_rgba(56,189,248,0.65)]'
                  : 'text-slate-500 opacity-40 scale-100'
              }`}
            >
              {STORY_BLOCKS[1].word}
            </h3>

            {/* Short Punchy Statement */}
            <p className="mt-4 text-base sm:text-xl font-medium text-slate-300 max-w-md mx-auto leading-relaxed">
              {STORY_BLOCKS[1].desc}
            </p>
          </div>

          {/* Block 03: Centered */}
          <div
            ref={b3Ref}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-6 py-16 sm:py-24"
          >
            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-950/40 px-3.5 py-1 backdrop-blur-md mb-4">
              <span className={`h-1.5 w-1.5 rounded-full ${
                activeStages[2] ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[2].step} // {STORY_BLOCKS[2].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-500 ${
                activeStages[2]
                  ? 'text-white scale-105 drop-shadow-[0_0_45px_rgba(56,189,248,0.65)]'
                  : 'text-slate-500 opacity-40 scale-100'
              }`}
            >
              {STORY_BLOCKS[2].word}
            </h3>

            {/* Short Punchy Statement */}
            <p className="mt-4 text-base sm:text-xl font-medium text-slate-300 max-w-md mx-auto leading-relaxed">
              {STORY_BLOCKS[2].desc}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
