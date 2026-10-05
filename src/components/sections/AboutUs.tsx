import React, { useState, useEffect, useRef } from 'react';

interface StoryBlock {
  step: string;
  tag: string;
  word: string;
  desc: string;
  metric: string;
  metricLabel: string;
  activeThreshold: number;
}

const STORY_BLOCKS: StoryBlock[] = [
  {
    step: '01',
    tag: 'THE HYPOTHESIS',
    word: 'CALCULATE.',
    desc: 'Autonomous orbital calculations. No textbook templates.',
    metric: '48+',
    metricLabel: 'Orbital Theses',
    activeThreshold: 0.15,
  },
  {
    step: '02',
    tag: 'THE DEFENSE',
    word: 'DEFEND.',
    desc: '100% English defense before Uzcosmos space agency engineers.',
    metric: '100%',
    metricLabel: 'English Defense Format',
    activeThreshold: 0.48,
  },
  {
    step: '03',
    tag: 'THE APOGEE',
    word: 'LAUNCH.',
    desc: 'Uzcosmos co-signed credentials. Direct global academic trajectory.',
    metric: 'TOP 1%',
    metricLabel: 'State Space Honors',
    activeThreshold: 0.80,
  },
];

// High-detail aerospace orbital rocket vessel (Falcon / Starship inspired heavy launcher)
const OrbitalRocketVessel: React.FC = () => (
  <svg
    viewBox="-38 0 128 40"
    className="w-24 h-10 sm:w-32 sm:h-13 overflow-visible filter drop-shadow-[0_0_18px_rgba(56,189,248,0.85)] select-none pointer-events-none"
  >
    <defs>
      {/* 3D Cylindrical lighting for rocket body */}
      <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="18%" stopColor="#475569" />
        <stop offset="45%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Aerodynamic fairing nosecone gradient */}
      <linearGradient id="rocketFairingGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="75%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>

      {/* Interstage and booster separation band */}
      <linearGradient id="interstageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#090d16" />
      </linearGradient>

      {/* Titanium aerodynamic stabilizer fins */}
      <linearGradient id="rocketFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="40%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Rocket flame: fiery hypergolic blast (outer plume) */}
      <linearGradient id="outerFlameGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="30%" stopColor="#f97316" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#dc2626" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
      </linearGradient>

      {/* Rocket flame: supersonic core plasma (inner plume) */}
      <linearGradient id="plasmaCoreGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.95" />
        <stop offset="65%" stopColor="#2563eb" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
      </linearGradient>

      {/* Thruster Engine Bloom filter */}
      <filter id="rocketBloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ========================================================= */}
    {/* 1. SUPERSONIC ROCKET EXHAUST PLUME & MACH SHOCK DIAMONDS   */}
    {/* ========================================================= */}
    <g filter="url(#rocketBloom)">
      {/* Outer expanding turbulent flame */}
      <path
        d="M 10 14.5 C -4 11, -22 8, -36 20 C -22 32, -4 29, 10 25.5 Z"
        fill="url(#outerFlameGrad)"
        className="animate-pulse"
      />

      {/* Concentrated high-velocity plasma jet */}
      <path
        d="M 10 16.5 C 0 16.5, -16 17.5, -28 20 C -16 22.5, 0 23.5, 10 23.5 Z"
        fill="url(#plasmaCoreGrad)"
      />

      {/* White-hot ignition spike */}
      <polygon points="10,18.5 -12,20 10,21.5" fill="#ffffff" opacity="0.95" />

      {/* Supersonic Mach Shock Diamonds */}
      <polygon points="5,20 2,18 -1,20 2,22" fill="#ffffff" opacity="0.95" />
      <polygon points="-4,20 -7,18.5 -10,20 -7,21.5" fill="#7dd3fc" opacity="0.9" />
      <polygon points="-13,20 -16,19 -19,20 -16,21" fill="#38bdf8" opacity="0.8" />

      {/* High-speed glowing particle sparks */}
      <circle cx="-25" cy="18" r="1" fill="#fde047" className="animate-ping" />
      <circle cx="-32" cy="22" r="0.8" fill="#38bdf8" />
      <circle cx="-18" cy="14" r="0.7" fill="#fb923c" />
    </g>

    {/* ========================================================= */}
    {/* 2. AERODYNAMIC ROCKET BASE STABILIZER FINS                 */}
    {/* ========================================================= */}
    {/* Upper Delta Fin */}
    <path
      d="M 28 14.5 L 12 5 L 16 14.5 Z"
      fill="url(#rocketFinGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="5" r="1.2" fill="#38bdf8" className="animate-ping" />

    {/* Lower Delta Fin */}
    <path
      d="M 28 25.5 L 12 35 L 16 25.5 Z"
      fill="url(#rocketFinGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="35" r="1.2" fill="#38bdf8" className="animate-ping" />

    {/* ========================================================= */}
    {/* 3. ROCKET ENGINE NOZZLE (BELL GIMBAL)                     */}
    {/* ========================================================= */}
    <path
      d="M 16 16.5 L 9 14.5 L 8 25.5 L 16 23.5 Z"
      fill="#0b0f19"
      stroke="#38bdf8"
      strokeWidth="0.9"
    />
    {/* Engine bell incandescent rim */}
    <ellipse cx="8.5" cy="20" rx="1" ry="5" fill="#ffffff" opacity="0.8" />

    {/* ========================================================= */}
    {/* 4. FIRST STAGE BOOSTER FUSELAGE (MAIN CYLINDER)           */}
    {/* ========================================================= */}
    {/* Main booster cylindrical body */}
    <rect
      x="16"
      y="14.5"
      width="30"
      height="11"
      rx="1"
      fill="url(#rocketBodyGrad)"
      stroke="rgba(56, 189, 248, 0.6)"
      strokeWidth="0.8"
    />

    {/* Aerospace Black-and-White Roll Pattern (Saturn V / Falcon style) */}
    <rect x="25" y="14.5" width="7" height="5.5" fill="#090d16" />
    <rect x="32" y="20" width="7" height="5.5" fill="#090d16" />

    {/* Longitudinal raceway line (cryogenic / cable feedline) */}
    <line
      x1="16"
      y1="17.5"
      x2="46"
      y2="17.5"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.75"
    />

    {/* Stage rings & weld seams */}
    <line x1="25" y1="14.5" x2="25" y2="25.5" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.6" />
    <line x1="39" y1="14.5" x2="39" y2="25.5" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.6" />

    {/* Grid Fins (Titanium hypersonic grid steering fins) */}
    <rect
      x="43"
      y="11.5"
      width="3"
      height="3"
      fill="#0f172a"
      stroke="#38bdf8"
      strokeWidth="0.6"
    />
    <rect
      x="43"
      y="25.5"
      width="3"
      height="3"
      fill="#0f172a"
      stroke="#38bdf8"
      strokeWidth="0.6"
    />

    {/* ========================================================= */}
    {/* 5. INTERSTAGE SEPARATION RING                             */}
    {/* ========================================================= */}
    <rect
      x="46"
      y="15"
      width="5"
      height="10"
      fill="url(#interstageGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.7"
    />
    <line x1="48.5" y1="15" x2="48.5" y2="25" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="1.5 1.5" />

    {/* ========================================================= */}
    {/* 6. SECOND STAGE FUSELAGE                                  */}
    {/* ========================================================= */}
    <rect
      x="51"
      y="15"
      width="14"
      height="10"
      fill="url(#rocketBodyGrad)"
      stroke="rgba(56, 189, 248, 0.6)"
      strokeWidth="0.8"
    />
    {/* Second stage telemetry beacon */}
    <circle cx="58" cy="18" r="0.9" fill="#38bdf8" />
    <circle cx="61" cy="18" r="0.9" fill="#22c55e" />

    {/* ========================================================= */}
    {/* 7. AERODYNAMIC PAYLOAD FAIRING (NOSECONE)                 */}
    {/* ========================================================= */}
    {/* Smooth aerodynamic ogive curve tapering to nosecone */}
    <path
      d="M 65 15 C 73 15.5, 78 18.5, 80 20 C 78 21.5, 73 24.5, 65 25 Z"
      fill="url(#rocketFairingGrad)"
      stroke="#38bdf8"
      strokeWidth="0.9"
    />

    {/* Payload Fairing Split Line (Clamshell separation seam) */}
    <line
      x1="65"
      y1="20"
      x2="79"
      y2="20"
      stroke="rgba(56, 189, 248, 0.75)"
      strokeWidth="0.6"
      strokeDasharray="3 1.5"
    />

    {/* Nosecone Specular Reflection Glint */}
    <path
      d="M 66 16.5 C 71 17, 75 18.8, 77 20 C 74 19, 70 18, 66 17.5 Z"
      fill="#ffffff"
      opacity="0.85"
    />

    {/* Launch Escape Probe / Pitot Sensor Needle */}
    <line
      x1="80"
      y1="20"
      x2="86"
      y2="20"
      stroke="#e0f2fe"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="86" cy="20" r="1.2" fill="#38bdf8" className="animate-ping" />
  </svg>
);

export const AboutUs: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);

  const b1Ref = useRef<HTMLDivElement>(null);
  const b2Ref = useRef<HTMLDivElement>(null);
  const b3Ref = useRef<HTMLDivElement>(null);

  const [pathData, setPathData] = useState('');
  const [totalPathLength, setTotalPathLength] = useState(0);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [rocketPos, setRocketPos] = useState({ x: 0, y: 0, angle: 45 });
  const [waypoints, setWaypoints] = useState<{ x: number; y: number }[]>([]);

  // Calculate rocket position along the SVG path for a given progress (0.0 to 1.0)
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
          setTotalPathLength(len);
          calcRocketAtProgress(pathRef.current, scrollProgress, len);
        }
      } catch (e) {
        console.error(e);
      }
    }
  }, [pathData]);

  // 2. High-performance scroll listener to calculate scrollProgress and drive the spacecraft
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
          setScrollProgress(p);

          // Update rocket position in real time
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
                d={pathData}
                fill="none"
                stroke="url(#rocketTrailGrad)"
                strokeWidth="4"
                strokeDasharray={totalPathLength || 3000}
                strokeDashoffset={(totalPathLength || 3000) * (1 - scrollProgress)}
                strokeLinecap="round"
                style={{
                  filter: 'drop-shadow(0 0 8px rgba(56, 189, 248, 0.7))',
                }}
              />
            )}

            {/* Waypoint docking beacons in the center */}
            {waypoints.map((pt, idx) => {
              const isActive = scrollProgress >= STORY_BLOCKS[idx].activeThreshold;
              return (
                <g key={idx} transform={`translate(${pt.x}, ${pt.y})`}>
                  <circle
                    r={isActive ? "20" : "10"}
                    fill="none"
                    stroke="#38bdf8"
                    strokeWidth={isActive ? "2" : "1.5"}
                    opacity={isActive ? "0.9" : "0.3"}
                    className="transition-all duration-500"
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
              className="absolute pointer-events-none z-30 will-change-transform"
              style={{
                left: `${rocketPos.x}px`,
                top: `${rocketPos.y}px`,
                // Rocket vector points forward horizontally (0 deg), so rotate(angle) aligns nose directly with flight path
                transform: `translate(-50%, -50%) rotate(${rocketPos.angle}deg)`,
                transition: 'left 0.05s ease-out, top 0.05s ease-out, transform 0.05s ease-out',
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
                scrollProgress >= STORY_BLOCKS[0].activeThreshold ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[0].step} // {STORY_BLOCKS[0].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-700 ${
                scrollProgress >= STORY_BLOCKS[0].activeThreshold
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

            {/* Metric Badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-slate-900/80 px-5 py-2 backdrop-blur-sm shadow-sm">
              <span className="font-mono text-lg sm:text-xl font-black text-sky-400">
                {STORY_BLOCKS[0].metric}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {STORY_BLOCKS[0].metricLabel}
              </span>
            </div>
          </div>

          {/* Block 02: Centered */}
          <div
            ref={b2Ref}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-6 py-16 sm:py-24"
          >
            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-950/40 px-3.5 py-1 backdrop-blur-md mb-4">
              <span className={`h-1.5 w-1.5 rounded-full ${
                scrollProgress >= STORY_BLOCKS[1].activeThreshold ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[1].step} // {STORY_BLOCKS[1].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-700 ${
                scrollProgress >= STORY_BLOCKS[1].activeThreshold
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

            {/* Metric Badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-slate-900/80 px-5 py-2 backdrop-blur-sm shadow-sm">
              <span className="font-mono text-lg sm:text-xl font-black text-sky-400">
                {STORY_BLOCKS[1].metric}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {STORY_BLOCKS[1].metricLabel}
              </span>
            </div>
          </div>

          {/* Block 03: Centered */}
          <div
            ref={b3Ref}
            className="relative z-20 flex flex-col items-center text-center max-w-3xl mx-auto px-6 py-16 sm:py-24"
          >
            {/* Stage Pill */}
            <div className="inline-flex items-center gap-2 rounded-full border border-sky-500/20 bg-sky-950/40 px-3.5 py-1 backdrop-blur-md mb-4">
              <span className={`h-1.5 w-1.5 rounded-full ${
                scrollProgress >= STORY_BLOCKS[2].activeThreshold ? 'bg-sky-400 animate-pulse' : 'bg-slate-500'
              }`} />
              <span className="font-mono text-xs font-bold text-sky-400 tracking-wider">
                {STORY_BLOCKS[2].step} // {STORY_BLOCKS[2].tag}
              </span>
            </div>

            {/* Monumental Punchy Word */}
            <h3
              className={`text-6xl sm:text-8xl lg:text-9xl font-black tracking-tighter uppercase transition-all duration-700 ${
                scrollProgress >= STORY_BLOCKS[2].activeThreshold
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

            {/* Metric Badge */}
            <div className="mt-6 inline-flex items-center gap-3 rounded-full border border-sky-500/20 bg-slate-900/80 px-5 py-2 backdrop-blur-sm shadow-sm">
              <span className="font-mono text-lg sm:text-xl font-black text-sky-400">
                {STORY_BLOCKS[2].metric}
              </span>
              <span className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                {STORY_BLOCKS[2].metricLabel}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
