import React, { useState, useEffect, useRef } from 'react';
import { CheckCircle2, Compass, ArrowDownRight, ArrowUpRight } from 'lucide-react';

interface StoryBlock {
  step: string;
  tag: string;
  title: string;
  subtitle: string;
  desc: string;
  metric: string;
  metricLabel: string;
  activeThreshold: number;
}

const STORY_BLOCKS: StoryBlock[] = [
  {
    step: '01',
    tag: 'RESEARCH & CREATIVITY',
    title: 'Calculate the Uncharted',
    subtitle: 'Autonomous Scientific Theses',
    desc: 'High school teams formulate original aerospace engineering theses across orbital mechanics, CubeSat telemetry, and deep-space trajectory calculations. No textbook templates.',
    metric: '48+',
    metricLabel: 'Orbital Theses Formulated',
    activeThreshold: 0.15,
  },
  {
    step: '02',
    tag: 'ENGLISH STAGE DEFENSE',
    title: 'Defend on the Global Stage',
    subtitle: '100% English Public Defense',
    desc: 'Students present calculations and defend engineering choices strictly in fluent English before academic juries and Uzcosmos Agency engineers. Real cross-examination and academic debate.',
    metric: '100%',
    metricLabel: 'English Defense Format',
    activeThreshold: 0.5,
  },
  {
    step: '03',
    tag: 'STATE SPACE HONORS',
    title: 'Launch Your Trajectory',
    subtitle: 'Co-Signed Uzcosmos Credentials',
    desc: 'Finalists receive official awards and certificates co-signed by Uzcosmos Agency leadership, unlocking international research pathways, internships, and university admissions.',
    metric: 'Top 1%',
    metricLabel: 'State Agency Endorsed',
    activeThreshold: 0.82,
  },
];

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const wp1Ref = useRef<HTMLDivElement>(null);
  const wp2Ref = useRef<HTMLDivElement>(null);
  const wp3Ref = useRef<HTMLDivElement>(null);

  const [pathData, setPathData] = useState('');
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketPos, setRocketPos] = useState({ x: 0, y: 0, angle: 45 });

  // 1. Recalculate zigzag flight path connecting the 3 waypoints
  const updateTrajectory = () => {
    if (!containerRef.current || !wp1Ref.current || !wp2Ref.current || !wp3Ref.current) return;

    const cRect = containerRef.current.getBoundingClientRect();
    const r1 = wp1Ref.current.getBoundingClientRect();
    const r2 = wp2Ref.current.getBoundingClientRect();
    const r3 = wp3Ref.current.getBoundingClientRect();

    // Center coordinates of the 3 waypoints relative to container
    const p1 = {
      x: r1.left - cRect.left + r1.width / 2,
      y: r1.top - cRect.top + r1.height / 2,
    };
    const p2 = {
      x: r2.left - cRect.left + r2.width / 2,
      y: r2.top - cRect.top + r2.height / 2,
    };
    const p3 = {
      x: r3.left - cRect.left + r3.width / 2,
      y: r3.top - cRect.top + r3.height / 2,
    };

    // Construct smooth flowing zigzag trajectory
    const startX = Math.max(20, p1.x - 70);
    const startY = Math.max(10, p1.y - 80);

    const dx1 = p2.x - p1.x;
    const dy1 = p2.y - p1.y;
    const cp1x = p1.x + dx1 * 0.45;
    const cp1y = p1.y + dy1 * 0.12;
    const cp2x = p1.x + dx1 * 0.55;
    const cp2y = p2.y - dy1 * 0.12;

    const dx2 = p3.x - p2.x;
    const dy2 = p3.y - p2.y;
    const cp3x = p2.x + dx2 * 0.45;
    const cp3y = p2.y + dy2 * 0.12;
    const cp4x = p2.x + dx2 * 0.55;
    const cp4y = p3.y - dy2 * 0.12;

    const endX = p3.x - 20;
    const endY = p3.y + 110;

    const d = `M ${startX} ${startY} Q ${p1.x - 20} ${p1.y} ${p1.x} ${p1.y} C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${p2.x} ${p2.y} C ${cp3x} ${cp3y}, ${cp4x} ${cp4y}, ${p3.x} ${p3.y} Q ${p3.x + 20} ${p3.y + 70} ${endX} ${endY}`;

    setPathData(d);
  };

  useEffect(() => {
    updateTrajectory();
    const timer = setTimeout(updateTrajectory, 100);
    const handleResize = () => updateTrajectory();
    window.addEventListener('resize', handleResize);

    let ro: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined' && containerRef.current) {
      ro = new ResizeObserver(() => updateTrajectory());
      ro.observe(containerRef.current);
    }

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', handleResize);
      if (ro) ro.disconnect();
    };
  }, []);

  // Update total length whenever pathData changes
  useEffect(() => {
    if (pathRef.current) {
      const len = pathRef.current.getTotalLength();
      setTotalPathLength(len);
    }
  }, [pathData]);

  // 2. Scroll listener to calculate scrollProgress (0.0 -> 1.0)
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Start animation smoothly as container approaches center of viewport
      const startTrigger = windowHeight * 0.75;
      const endTrigger = windowHeight * 0.25;
      const totalScrollable = rect.height + startTrigger - endTrigger;
      const currentScroll = startTrigger - rect.top;

      const p = Math.max(0, Math.min(1, currentScroll / totalScrollable));
      setScrollProgress(p);
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
  }, []);

  // 3. Update Rocket (x, y, angle) directly on the trajectory path
  useEffect(() => {
    const path = pathRef.current;
    if (!path || totalPathLength === 0) return;

    const currentLen = scrollProgress * totalPathLength;
    const pt = path.getPointAtLength(currentLen);

    // Tangent angle in degrees with boundary guard to prevent flipping at the very end
    let angleDeg = 45;
    if (currentLen < totalPathLength - 2) {
      const nextPt = path.getPointAtLength(currentLen + 2);
      angleDeg = Math.atan2(nextPt.y - pt.y, nextPt.x - pt.x) * (180 / Math.PI);
    } else {
      const prevPt = path.getPointAtLength(Math.max(0, currentLen - 2));
      angleDeg = Math.atan2(pt.y - prevPt.y, pt.x - prevPt.x) * (180 / Math.PI);
    }

    setRocketPos({
      x: pt.x,
      y: pt.y,
      angle: angleDeg,
    });
  }, [scrollProgress, totalPathLength]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-24 sm:py-32 transition-colors duration-300"
    >
      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 sm:mb-20">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
                MISSION TRAJECTORY // ABOUT ARTICULAR
              </span>
            </div>

            <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
              Where young minds{' '}
              <span className="font-serif-italic font-normal text-[var(--accent)]">
                articulate the future.
              </span>
            </h2>

            <p className="mt-4 text-base text-[var(--ink-muted)] sm:text-lg max-w-2xl leading-relaxed">
              Scroll down to navigate the tournament trajectory. From autonomous hypotheses to state space credentials with Uzcosmos Agency.
            </p>
          </div>

          {/* Real-time Trajectory Telemetry HUD */}
          <div className="shrink-0 flex items-center gap-3 self-start md:self-end rounded-2xl border border-[var(--line)] bg-[var(--bg)] px-4 py-2.5 shadow-sm font-mono text-xs">
            <span className="text-lg">🚀</span>
            <div>
              <div className="text-[10px] text-[var(--ink-dim)] uppercase tracking-wider font-semibold">
                Trajectory Flight Progress
              </div>
              <div className="flex items-center gap-2 font-bold text-[var(--ink)]">
                <span>{Math.round(scrollProgress * 100)}%</span>
                <span className="h-1.5 w-16 rounded-full bg-[var(--line)] overflow-hidden inline-block">
                  <span
                    className="h-full bg-[var(--accent)] block transition-all duration-150"
                    style={{ width: `${Math.round(scrollProgress * 100)}%` }}
                  />
                </span>
                <span className="text-[var(--accent)] text-[10px]">
                  {scrollProgress < 0.3 ? 'STAGE 01' : scrollProgress < 0.7 ? 'STAGE 02' : 'STAGE 03'}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* ======================================================== */}
        {/* ZIGZAG FLIGHT ARENA (Interactive Scroll-Driven Trajectory) */}
        {/* ======================================================== */}
        <div
          ref={containerRef}
          className="relative w-full min-h-[1420px] sm:min-h-[1360px] select-none"
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
                <stop offset="70%" stopColor="#0284c7" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#38bdf8" stopOpacity="1" />
              </linearGradient>

              {/* Glowing Waypoint Glow */}
              <filter id="beaconGlow" x="-50%" y="-50%" width="200%" height="200%">
                <feDropShadow dx="0" dy="0" stdDeviation="6" floodColor="#38bdf8" floodOpacity="0.8" />
              </filter>
            </defs>

            {/* Base Dashed Trajectory Flight Plan (The Roadmap Zigzag) */}
            {pathData && (
              <path
                d={pathData}
                fill="none"
                stroke="var(--line-strong)"
                strokeWidth="2.5"
                strokeDasharray="8 8"
                className="opacity-50 dark:opacity-40"
              />
            )}

            {/* Active Filled Flight Path (Fills in real-time behind the Rocket as you scroll) */}
            {pathData && totalPathLength > 0 && (
              <path
                ref={pathRef}
                d={pathData}
                fill="none"
                stroke="url(#rocketTrailGrad)"
                strokeWidth="3.5"
                strokeDasharray={totalPathLength}
                strokeDashoffset={totalPathLength * (1 - scrollProgress)}
                strokeLinecap="round"
                style={{
                  transition: 'stroke-dashoffset 0.05s linear',
                  filter: 'drop-shadow(0 0 6px rgba(56, 189, 248, 0.5))',
                }}
              />
            )}
          </svg>

          {/* ======================================================== */}
          {/* SCROLL-DRIVEN FLYING ROCKET EMOJI (🚀)                    */}
          {/* ======================================================== */}
          {pathData && (
            <div
              className="absolute pointer-events-none z-30 transition-transform ease-out will-change-transform"
              style={{
                left: `${rocketPos.x}px`,
                top: `${rocketPos.y}px`,
                // Rocket emoji naturally points at 45deg top-right, so rotate(angle + 45deg) aligns nose with flight path
                transform: `translate(-50%, -50%) rotate(${rocketPos.angle + 45}deg)`,
              }}
            >
              <div className="relative flex items-center justify-center">
                {/* Supersonic Plasma Engine Exhaust Flame */}
                <div
                  className="absolute -bottom-2 -left-2 h-4 w-4 rounded-full bg-cyan-400 blur-[3px] animate-pulse"
                  style={{ transform: 'rotate(-45deg)' }}
                />
                <div
                  className="absolute -bottom-3 -left-3 h-6 w-6 rounded-full bg-blue-600 blur-[6px] opacity-75"
                />

                {/* Rocket Emoji */}
                <span className="text-3xl sm:text-4xl filter drop-shadow-[0_0_12px_rgba(56,189,248,0.85)] select-none">
                  🚀
                </span>
              </div>
            </div>
          )}

          {/* ======================================================== */}
          {/* 3 ZIGZAG TEXT STAGES (Top Left, Mid Right, Bottom Left)  */}
          {/* ======================================================== */}

          {/* Stage 01: Top Left */}
          <div className="absolute top-4 sm:top-6 left-0 w-full sm:max-w-[480px] lg:max-w-[500px]">
            <div
              className={`rounded-3xl border p-7 sm:p-9 transition-all duration-500 relative backdrop-blur-sm ${
                scrollProgress >= STORY_BLOCKS[0].activeThreshold
                  ? 'border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_35px_rgba(56,189,248,0.12)] scale-[1.02]'
                  : 'border-[var(--line)] bg-[var(--bg)] shadow-sm'
              }`}
            >
              {/* Waypoint Docking Anchor (Connects directly to the zigzag trajectory) */}
              <div
                ref={wp1Ref}
                className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-20"
              >
                <div
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    scrollProgress >= STORY_BLOCKS[0].activeThreshold
                      ? 'border-[var(--accent)] bg-white dark:bg-[#090b10] shadow-[0_0_14px_#38bdf8] scale-110'
                      : 'border-[var(--line-strong)] bg-[var(--surface)]'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      scrollProgress >= STORY_BLOCKS[0].activeThreshold
                        ? 'bg-[var(--accent)] animate-ping'
                        : 'bg-[var(--line-strong)]'
                    }`}
                  />
                </div>
              </div>

              {/* Tag & Step */}
              <div className="flex items-center justify-between mb-4 border-b border-[var(--line)] pb-3">
                <span className="font-mono text-xs font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {STORY_BLOCKS[0].tag}
                </span>
                <span className="font-mono text-xs font-bold text-[var(--ink-dim)]">
                  {STORY_BLOCKS[0].step} // 03
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {STORY_BLOCKS[0].title}
              </h3>
              <p className="mt-1 font-serif-italic text-sm text-[var(--accent)]">
                {STORY_BLOCKS[0].subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                {STORY_BLOCKS[0].desc}
              </p>

              {/* Metric Badge */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--surface-elevated)] px-4 py-3 border border-[var(--line)]">
                <div className="font-mono text-xl font-extrabold text-[var(--ink)]">
                  {STORY_BLOCKS[0].metric}
                </div>
                <div className="text-[11px] font-medium text-[var(--ink-muted)]">
                  {STORY_BLOCKS[0].metricLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Stage 02: Middle Right (Zigzag Swoop to the Right) */}
          <div className="absolute top-[460px] sm:top-[440px] right-0 w-full sm:max-w-[480px] lg:max-w-[500px]">
            <div
              className={`rounded-3xl border p-7 sm:p-9 transition-all duration-500 relative backdrop-blur-sm ${
                scrollProgress >= STORY_BLOCKS[1].activeThreshold
                  ? 'border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_35px_rgba(56,189,248,0.12)] scale-[1.02]'
                  : 'border-[var(--line)] bg-[var(--bg)] shadow-sm'
              }`}
            >
              {/* Waypoint Docking Anchor on Left Edge */}
              <div
                ref={wp2Ref}
                className="absolute -left-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-20"
              >
                <div
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    scrollProgress >= STORY_BLOCKS[1].activeThreshold
                      ? 'border-[var(--accent)] bg-white dark:bg-[#090b10] shadow-[0_0_14px_#38bdf8] scale-110'
                      : 'border-[var(--line-strong)] bg-[var(--surface)]'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      scrollProgress >= STORY_BLOCKS[1].activeThreshold
                        ? 'bg-[var(--accent)] animate-ping'
                        : 'bg-[var(--line-strong)]'
                    }`}
                  />
                </div>
              </div>

              {/* Tag & Step */}
              <div className="flex items-center justify-between mb-4 border-b border-[var(--line)] pb-3">
                <span className="font-mono text-xs font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {STORY_BLOCKS[1].tag}
                </span>
                <span className="font-mono text-xs font-bold text-[var(--ink-dim)]">
                  {STORY_BLOCKS[1].step} // 03
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {STORY_BLOCKS[1].title}
              </h3>
              <p className="mt-1 font-serif-italic text-sm text-[var(--accent)]">
                {STORY_BLOCKS[1].subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                {STORY_BLOCKS[1].desc}
              </p>

              {/* Metric Badge */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--surface-elevated)] px-4 py-3 border border-[var(--line)]">
                <div className="font-mono text-xl font-extrabold text-[var(--ink)]">
                  {STORY_BLOCKS[1].metric}
                </div>
                <div className="text-[11px] font-medium text-[var(--ink-muted)]">
                  {STORY_BLOCKS[1].metricLabel}
                </div>
              </div>
            </div>
          </div>

          {/* Stage 03: Bottom Left (Zigzag Swoop back to the Left) */}
          <div className="absolute top-[920px] sm:top-[880px] left-0 w-full sm:max-w-[480px] lg:max-w-[500px]">
            <div
              className={`rounded-3xl border p-7 sm:p-9 transition-all duration-500 relative backdrop-blur-sm ${
                scrollProgress >= STORY_BLOCKS[2].activeThreshold
                  ? 'border-[var(--accent)] bg-[var(--surface)] shadow-[0_0_35px_rgba(56,189,248,0.12)] scale-[1.02]'
                  : 'border-[var(--line)] bg-[var(--bg)] shadow-sm'
              }`}
            >
              {/* Waypoint Docking Anchor on Right Edge */}
              <div
                ref={wp3Ref}
                className="absolute -right-3 top-1/2 -translate-y-1/2 flex items-center justify-center z-20"
              >
                <div
                  className={`h-7 w-7 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
                    scrollProgress >= STORY_BLOCKS[2].activeThreshold
                      ? 'border-[var(--accent)] bg-white dark:bg-[#090b10] shadow-[0_0_14px_#38bdf8] scale-110'
                      : 'border-[var(--line-strong)] bg-[var(--surface)]'
                  }`}
                >
                  <span
                    className={`h-2.5 w-2.5 rounded-full ${
                      scrollProgress >= STORY_BLOCKS[2].activeThreshold
                        ? 'bg-[var(--accent)] animate-ping'
                        : 'bg-[var(--line-strong)]'
                    }`}
                  />
                </div>
              </div>

              {/* Tag & Step */}
              <div className="flex items-center justify-between mb-4 border-b border-[var(--line)] pb-3">
                <span className="font-mono text-xs font-bold text-[var(--accent)] flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
                  {STORY_BLOCKS[2].tag}
                </span>
                <span className="font-mono text-xs font-bold text-[var(--ink-dim)]">
                  {STORY_BLOCKS[2].step} // 03
                </span>
              </div>

              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {STORY_BLOCKS[2].title}
              </h3>
              <p className="mt-1 font-serif-italic text-sm text-[var(--accent)]">
                {STORY_BLOCKS[2].subtitle}
              </p>

              <p className="mt-4 text-xs sm:text-sm text-[var(--ink-muted)] leading-relaxed">
                {STORY_BLOCKS[2].desc}
              </p>

              {/* Metric Badge */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--surface-elevated)] px-4 py-3 border border-[var(--line)]">
                <div className="font-mono text-xl font-extrabold text-[var(--ink)]">
                  {STORY_BLOCKS[2].metric}
                </div>
                <div className="text-[11px] font-medium text-[var(--ink-muted)]">
                  {STORY_BLOCKS[2].metricLabel}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
