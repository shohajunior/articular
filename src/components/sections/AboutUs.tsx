import React, { useState, useEffect, useRef } from 'react';

interface StoryBlock {
  step: string;
  tag: string;
  word: string;
  desc: string;
  metric: string;
  metricLabel: string;
}

const STORY_BLOCKS: StoryBlock[] = [
  {
    step: '01',
    tag: 'THE HYPOTHESIS',
    word: 'CALCULATE.',
    desc: 'Autonomous orbital calculations. No textbook templates.',
    metric: '48+',
    metricLabel: 'Orbital Theses',
  },
  {
    step: '02',
    tag: 'THE DEFENSE',
    word: 'DEFEND.',
    desc: '100% English defense before Uzcosmos space agency engineers.',
    metric: '100%',
    metricLabel: 'English Defense Format',
  },
  {
    step: '03',
    tag: 'THE APOGEE',
    word: 'LAUNCH.',
    desc: 'Uzcosmos co-signed credentials. Direct global academic trajectory.',
    metric: 'TOP 1%',
    metricLabel: 'State Space Honors',
  },
];

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const stageRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const [pathData, setPathData] = useState('');
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketPos, setRocketPos] = useState({ x: 0, y: 0, angle: 45 });

  // Real-time calculation of rocket position along the SVG path for a given progress (0.0 to 1.0)
  const calcRocketAtProgress = (pathElement: SVGPathElement | null, progress: number, fallbackLen = 0) => {
    if (!pathElement) return;
    try {
      const len = pathElement.getTotalLength() || fallbackLen;
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

      setRocketPos({ x: pt.x, y: pt.y, angle: angleDeg });
    } catch (e) {
      console.error(e);
    }
  };

  // 1. Recalculate zigzag flight path connecting left-wing, center, right-wing across the pinned stage
  const updateTrajectory = () => {
    if (!stageRef.current) return;
    const sRect = stageRef.current.getBoundingClientRect();
    const w = sRect.width;
    const h = sRect.height;
    if (w === 0 || h === 0) return;

    // Amplitude of the zigzag wing swoops
    const amp = Math.max(100, Math.min(w * 0.38, 440));
    const centerX = w * 0.5;
    const centerY = h * 0.5;

    // Waypoints for the zigzag across the pinned screen
    const startX = Math.max(30, centerX - amp * 0.85);
    const startY = h * 0.22;

    const p1 = { x: centerX, y: centerY - 10 };
    const rightApexX = centerX + amp;
    const rightApexY = centerY + 10;

    const p2 = { x: centerX, y: centerY };
    const leftApexX = centerX - amp;
    const leftApexY = centerY + 10;

    const p3 = { x: centerX, y: centerY + 10 };
    const endX = centerX + amp * 0.45;
    const endY = h * 0.92;

    // Smooth continuous S-curve zigzag Béziers
    const cp0x1 = startX + amp * 0.3;
    const cp0y1 = startY + 60;
    const cp0x2 = p1.x - amp * 0.3;
    const cp0y2 = p1.y - 70;

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
        setTotalPathLength(len);
        calcRocketAtProgress(tempPath, scrollProgress, len);
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
    if (typeof ResizeObserver !== 'undefined' && stageRef.current) {
      ro = new ResizeObserver(() => updateTrajectory());
      ro.observe(stageRef.current);
    }

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, []);

  // Sync length whenever DOM path is mounted
  useEffect(() => {
    if (pathRef.current) {
      try {
        const len = pathRef.current.getTotalLength();
        if (len > 0) {
          setTotalPathLength(len);
          calcRocketAtProgress(pathRef.current, scrollProgress, len);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathData]);

  // 2. High-performance scroll listener to scrub the pinned stage timeline
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!sectionRef.current) return;
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (!sectionRef.current) {
            ticking = false;
            return;
          }
          const rect = sectionRef.current.getBoundingClientRect();
          const windowHeight = window.innerHeight;
          const totalScrollable = rect.height - windowHeight;
          if (totalScrollable <= 0) {
            ticking = false;
            return;
          }

          // Progress increases continuously while scrolling through the pinned section
          const currentScroll = -rect.top;
          const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
          setScrollProgress(p);

          if (pathRef.current) {
            calcRocketAtProgress(pathRef.current, p);
          }

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

  // Dynamic style calculation for smooth stage cross-fade transitions in the exact center
  const getStageStyle = (stageIndex: number, p: number) => {
    let opacity = 0;
    let translateY = 30;
    let scale = 0.96;

    if (stageIndex === 0) {
      // Stage 1: Active 0.0 -> 0.35
      if (p < 0.24) {
        opacity = Math.min(1, p / 0.08);
        translateY = Math.max(0, 20 * (1 - p / 0.08));
        scale = 1 + 0.05 * Math.min(1, p / 0.12);
      } else if (p < 0.36) {
        const exitProgress = (p - 0.24) / 0.12;
        opacity = Math.max(0, 1 - exitProgress);
        translateY = -35 * exitProgress;
        scale = 1.05 - 0.05 * exitProgress;
      }
    } else if (stageIndex === 1) {
      // Stage 2: Active 0.34 -> 0.68
      if (p >= 0.32 && p < 0.44) {
        const enterProgress = (p - 0.32) / 0.12;
        opacity = Math.min(1, enterProgress);
        translateY = Math.max(0, 35 * (1 - enterProgress));
        scale = 0.96 + 0.09 * enterProgress;
      } else if (p >= 0.44 && p < 0.58) {
        opacity = 1;
        translateY = 0;
        scale = 1.05;
      } else if (p >= 0.58 && p < 0.70) {
        const exitProgress = (p - 0.58) / 0.12;
        opacity = Math.max(0, 1 - exitProgress);
        translateY = -35 * exitProgress;
        scale = 1.05 - 0.05 * exitProgress;
      }
    } else if (stageIndex === 2) {
      // Stage 3: Active 0.66 -> 1.0
      if (p >= 0.66 && p < 0.78) {
        const enterProgress = (p - 0.66) / 0.12;
        opacity = Math.min(1, enterProgress);
        translateY = Math.max(0, 35 * (1 - enterProgress));
        scale = 0.96 + 0.09 * enterProgress;
      } else if (p >= 0.78) {
        opacity = 1;
        translateY = 0;
        scale = 1.05;
      }
    }

    return {
      opacity,
      transform: `translate3d(0, ${translateY}px, 0) scale(${scale})`,
      pointerEvents: opacity > 0.5 ? ('auto' as const) : ('none' as const),
    };
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative h-[300vh] bg-[#06080d] text-white border-t border-[var(--line)]"
    >
      {/* ======================================================== */}
      {/* PINNED STAGE VIEWPORT (Fixed 100vh theatre while scrolling) */}
      {/* ======================================================== */}
      <div
        ref={stageRef}
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between select-none"
      >
        {/* Deep Space Background: 100% Stationary */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(14,30,58,0.5)_0%,_#06080d_80%)] pointer-events-none z-0" />

        {/* Stationary Tactical Space Coordinate Grid */}
        <div
          className="absolute inset-0 opacity-[0.15] pointer-events-none z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(56, 189, 248, 0.35) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(56, 189, 248, 0.35) 1px, transparent 1px)
            `,
            backgroundSize: '80px 80px',
          }}
        />

        {/* Stationary Concentric Orbital Radar Rings */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[460px] h-[460px] rounded-full border border-sky-500/15 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[820px] h-[820px] rounded-full border border-sky-500/10 pointer-events-none z-0" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1240px] h-[1240px] rounded-full border border-sky-500/5 pointer-events-none z-0" />

        {/* Crosshair Center Lines */}
        <div className="absolute top-1/2 left-0 right-0 h-[1px] bg-sky-500/10 pointer-events-none z-0" />
        <div className="absolute left-1/2 top-0 bottom-0 w-[1px] bg-sky-500/10 pointer-events-none z-0" />

        {/* Static HUD Telemetry (Pinned Corners) */}
        <div className="absolute top-6 left-6 font-mono text-[10px] text-sky-400/40 uppercase tracking-widest flex items-center gap-2 z-10 pointer-events-none">
          <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
          SYS // PINNED STAGE THEATRE
        </div>
        <div className="absolute top-6 right-6 font-mono text-[10px] text-sky-400/40 uppercase tracking-widest z-10 pointer-events-none">
          41.2995° N, 69.2401° E // UZCOSMOS
        </div>
        <div className="absolute bottom-6 left-6 font-mono text-[10px] text-sky-400/30 uppercase tracking-widest z-10 pointer-events-none">
          SCROLL TIMELINE: INTERACTIVE
        </div>
        <div className="absolute bottom-6 right-6 font-mono text-[10px] text-sky-400/30 uppercase tracking-widest z-10 pointer-events-none">
          ALT: 450 KM STABLE
        </div>

        {/* 1. Header (Pinned at Top) */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 pt-16 sm:pt-20 text-center pointer-events-none">
          <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-500/10 px-4 py-1.5 backdrop-blur-md mb-3">
            <span className="h-2 w-2 rounded-full bg-sky-400 animate-pulse" />
            <span className="font-mono text-xs font-bold uppercase tracking-widest text-sky-400">
              MISSION TRAJECTORY // ABOUT ARTICULAR
            </span>
          </div>

          <h2 className="text-2xl font-extrabold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Where young minds{' '}
            <span className="font-serif-italic font-normal text-sky-400">
              articulate the future.
            </span>
          </h2>
        </div>

        {/* 2. Interactive Center Theater with Cross-Fading Stages */}
        <div className="relative z-20 flex-1 flex items-center justify-center w-full px-6">
          {STORY_BLOCKS.map((block, idx) => {
            const style = getStageStyle(idx, scrollProgress);
            return (
              <div
                key={idx}
                style={style}
                className="absolute inset-0 flex flex-col items-center justify-center text-center max-w-4xl mx-auto px-6 will-change-transform"
              >
                {/* Stage Pill */}
                <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/25 bg-sky-950/60 px-4 py-1 backdrop-blur-md mb-4 shadow-sm">
                  <span className="h-1.5 w-1.5 rounded-full bg-sky-400 animate-pulse" />
                  <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                    {block.step} // {block.tag}
                  </span>
                </div>

                {/* Monumental Word */}
                <h3 className="text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase text-white drop-shadow-[0_0_45px_rgba(56,189,248,0.7)] select-none">
                  {block.word}
                </h3>

                {/* Short Statement */}
                <p className="mt-4 text-base sm:text-2xl font-medium text-slate-200 max-w-lg mx-auto leading-relaxed">
                  {block.desc}
                </p>

                {/* Metric Badge */}
                <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-sky-500/25 bg-slate-900/90 px-6 py-2.5 backdrop-blur-md shadow-md">
                  <span className="font-mono text-xl sm:text-2xl font-black text-sky-400">
                    {block.metric}
                  </span>
                  <span className="text-xs text-slate-300 uppercase tracking-wider font-semibold">
                    {block.metricLabel}
                  </span>
                </div>
              </div>
            );
          })}
        </div>

        {/* 3. Sleek Vertical Step Progress Track (Right Edge) */}
        <div className="absolute right-6 sm:right-10 top-1/2 -translate-y-1/2 z-30 flex flex-col gap-6 pointer-events-none">
          {STORY_BLOCKS.map((block, idx) => {
            const isCurrent =
              (idx === 0 && scrollProgress < 0.35) ||
              (idx === 1 && scrollProgress >= 0.35 && scrollProgress < 0.68) ||
              (idx === 2 && scrollProgress >= 0.68);
            return (
              <div key={idx} className="flex items-center gap-3 justify-end">
                <span
                  className={`font-mono text-[10px] tracking-widest transition-colors duration-300 hidden sm:block ${
                    isCurrent ? 'text-sky-400 font-bold' : 'text-slate-600'
                  }`}
                >
                  {block.step} {block.word}
                </span>
                <div
                  className={`h-2.5 w-2.5 rounded-full transition-all duration-300 ${
                    isCurrent
                      ? 'bg-sky-400 shadow-[0_0_14px_#38bdf8] scale-125'
                      : 'bg-slate-700'
                  }`}
                />
              </div>
            );
          })}
        </div>

        {/* 4. Full-Screen Zigzag Flight Trajectory SVG */}
        <svg
          className="absolute inset-0 h-full w-full pointer-events-none overflow-visible z-10"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Glowing Rocket Trail Gradient */}
            <linearGradient id="rocketTrailGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#1f5eea" stopOpacity="0.1" />
              <stop offset="60%" stopColor="#0284c7" stopOpacity="0.85" />
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
              d={pathData}
              fill="none"
              stroke="url(#rocketTrailGrad)"
              strokeWidth="4"
              strokeDasharray={totalPathLength || 3000}
              strokeDashoffset={(totalPathLength || 3000) * (1 - scrollProgress)}
              strokeLinecap="round"
              style={{
                filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.75))',
              }}
            />
          )}
        </svg>

        {/* 5. Scroll-Driven Flying Rocket Emoji (🚀) */}
        {pathData && (
          <div
            className="absolute pointer-events-none z-30 will-change-transform"
            style={{
              left: `${rocketPos.x}px`,
              top: `${rocketPos.y}px`,
              transform: `translate(-50%, -50%) rotate(${rocketPos.angle + 45}deg)`,
              transition: 'left 0.05s ease-out, top 0.05s ease-out, transform 0.05s ease-out',
            }}
          >
            <div className="relative flex items-center justify-center">
              {/* Supersonic Plasma Engine Exhaust Flame */}
              <div
                className="absolute -bottom-2 -left-2 h-5 w-5 rounded-full bg-cyan-400 blur-[3px] animate-pulse"
                style={{ transform: 'rotate(-45deg)' }}
              />
              <div
                className="absolute -bottom-3.5 -left-3.5 h-7 w-7 rounded-full bg-blue-600 blur-[6px] opacity-80"
              />

              {/* Rocket Emoji */}
              <span className="text-4xl sm:text-5xl filter drop-shadow-[0_0_18px_rgba(56,189,248,0.95)] select-none">
                🚀
              </span>
            </div>
          </div>
        )}

        {/* Bottom Hint */}
        <div className="relative z-20 pb-8 text-center pointer-events-none">
          <p className="font-mono text-xs uppercase tracking-widest text-slate-500">
            {scrollProgress < 0.95 ? '↓ SCROLL TO PILOT TRAJECTORY ↓' : '✓ TRAJECTORY COMPLETE'}
          </p>
        </div>
      </div>
    </section>
  );
};
