import React, { useState, useEffect } from 'react';
import {
  Compass,
  Radio,
  CheckCircle2,
  ChevronRight,
  Shield,
  Layers,
  ArrowRight,
  Sparkles
} from 'lucide-react';

interface Directive {
  id: string;
  step: string;
  title: string;
  code: string;
  heading: string;
  highlight: string;
  summary: string;
  statNumber: string;
  statLabel: string;
  telemetry: { label: string; value: string }[];
  tag: string;
}

const DIRECTIVES: Directive[] = [
  {
    id: 'research',
    step: '01',
    title: 'AUTONOMOUS RESEARCH',
    code: 'SYS-ORB // 01',
    heading: 'Beyond textbook formulas.',
    highlight: 'Real orbital challenges.',
    summary:
      'High school teams formulate original aerospace engineering theses. No rote memorization — students calculate orbital trajectories, payload delta-v budgets, and CubeSat telemetry.',
    statNumber: '48+',
    statLabel: 'Orbital Theses Formulated',
    telemetry: [
      { label: 'MODE', value: 'INDEPENDENT THESIS' },
      { label: 'SIMULATION', value: 'ORBITAL MECHANICS' },
      { label: 'DATASET', value: 'OPEN NASA & ESA FEEDS' },
      { label: 'CALCULATION', value: 'STK & PYTHON VERIFIED' },
    ],
    tag: 'Engineering Research',
  },
  {
    id: 'defense',
    step: '02',
    title: 'ENGLISH STAGE DEFENSE',
    code: 'DEF-VOX // 02',
    heading: 'Global scientific voice.',
    highlight: 'Live academic cross-examination.',
    summary:
      'Students defend calculations strictly in fluent English before academic juries and Uzcosmos engineers. Real questions, cross-examination, and direct academic debate.',
    statNumber: '100%',
    statLabel: 'English Stage Defense',
    telemetry: [
      { label: 'LANGUAGE', value: 'ENGLISH PROTOCOL' },
      { label: 'JURY', value: 'UZCOSMOS & ACADEMICS' },
      { label: 'FORMAT', value: '10-MIN PITCH + 5-MIN Q&A' },
      { label: 'EVALUATION', value: 'RIGOROUS PEER REVIEW' },
    ],
    tag: 'Public Defense',
  },
  {
    id: 'regions',
    step: '03',
    title: 'NATIONWIDE CONSTELLATION',
    code: 'NET-14R // 03',
    heading: '14 administrative regions.',
    highlight: 'One unified launchpad.',
    summary:
      'From Nukus to the Fergana Valley, Articular connects passionate youth and scientific mentors into a thriving nationwide aerospace innovation ecosystem.',
    statNumber: '14',
    statLabel: 'Regions Fully Synchronized',
    telemetry: [
      { label: 'COVERAGE', value: 'REPUBLIC-WIDE' },
      { label: 'CHAPTERS', value: '14 REGIONAL NODES' },
      { label: 'OPPORTUNITY', value: 'ZERO BARRIERS TO ENTRY' },
      { label: 'COMMUNITY', value: 'HIGH SCHOOL STEM NETWORK' },
    ],
    tag: 'National Orbit',
  },
  {
    id: 'uzcosmos',
    step: '04',
    title: 'STATE SPACE HONORS',
    code: 'GOV-UZS // 04',
    heading: 'Institutional validation.',
    highlight: 'Credentials co-signed by Uzcosmos.',
    summary:
      'Direct state recognition. Finalists receive official tournament certificates and honors co-signed by Uzcosmos Agency leadership, unlocking international scientific pathways.',
    statNumber: 'TOP 1%',
    statLabel: 'State Agency Endorsed',
    telemetry: [
      { label: 'PARTNER', value: 'UZCOSMOS AGENCY' },
      { label: 'CREDENTIAL', value: 'OFFICIAL CO-SIGNED AWARD' },
      { label: 'PATHWAY', value: 'AEROSPACE INTERNSHIPS' },
      { label: 'STATUS', value: 'STATE ACCREDITED' },
    ],
    tag: 'State Honors',
  },
];

export const AboutUs: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const activeDirective = DIRECTIVES[activeIdx];

  // Auto-cycle through directives with smooth pause on hover
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActiveIdx((prev) => (prev + 1) % DIRECTIVES.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  return (
    <section
      id="about"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-24 sm:py-32 transition-colors duration-300 select-none"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="relative mx-auto max-w-[1240px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl">
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse" />
            <span className="font-mono text-xs font-semibold uppercase tracking-widest text-[var(--accent)]">
              MISSION MANIFESTO // ABOUT ARTICULAR
            </span>
          </div>

          <h2 className="mt-3 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl lg:text-6xl">
            We don&apos;t teach space from textbooks.{' '}
            <span className="font-serif-italic font-normal text-[var(--accent)]">
              We launch minds into orbit.
            </span>
          </h2>

          <p className="mt-4 text-base text-[var(--ink-muted)] sm:text-lg max-w-2xl leading-relaxed">
            Uzbekistan&apos;s premier aerospace tournament uniting school-age innovators with State Space Agency mentors to solve genuine orbital and engineering challenges.
          </p>
        </div>

        {/* Step Navigation Pill Selector */}
        <div className="mt-12 flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-4">
          {DIRECTIVES.map((d, idx) => (
            <button
              key={d.id}
              type="button"
              onClick={() => setActiveIdx(idx)}
              className={`flex items-center gap-2.5 rounded-full px-4 py-2 text-xs font-medium transition-all cursor-pointer ${
                activeIdx === idx
                  ? 'bg-[var(--accent)] text-white shadow-md'
                  : 'bg-[var(--bg)] text-[var(--ink-muted)] hover:text-[var(--ink)] hover:bg-[var(--surface-elevated)] border border-[var(--line)]'
              }`}
            >
              <span
                className={`font-mono text-[10px] font-bold ${
                  activeIdx === idx ? 'text-white/80' : 'text-[var(--accent)]'
                }`}
              >
                {d.step}
              </span>
              <span>{d.title}</span>
            </button>
          ))}
        </div>

        {/* Core Interactive Command Deck (Split Console: Dynamic SVG Telemetry + Mission Brief) */}
        <div className="mt-8 grid gap-8 lg:grid-cols-[1.1fr_1fr] items-stretch">
          {/* Left Console: Directive Narrative & Live Telemetry Metrics */}
          <div className="flex flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-10 shadow-sm relative overflow-hidden">
            {/* Ambient subtle telemetry watermark */}
            <div className="pointer-events-none absolute right-4 top-4 font-mono text-4xl font-extrabold text-[var(--ink)] opacity-[0.03]">
              {activeDirective.code}
            </div>

            <div>
              {/* Badge & Code */}
              <div className="flex items-center justify-between gap-4 border-b border-[var(--line)] pb-4 mb-6">
                <span className="rounded-full bg-[var(--accent-tint)] px-3 py-1 font-mono text-[11px] font-bold text-[var(--accent)]">
                  {activeDirective.tag}
                </span>
                <span className="font-mono text-xs font-semibold text-[var(--ink-dim)]">
                  {activeDirective.code}
                </span>
              </div>

              {/* Main Headline */}
              <h3 className="text-2xl sm:text-3xl font-bold tracking-tight text-[var(--ink)]">
                {activeDirective.heading}{' '}
                <span className="text-[var(--accent)] font-serif-italic font-normal block sm:inline">
                  {activeDirective.highlight}
                </span>
              </h3>

              {/* Summary Description */}
              <p className="mt-4 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
                {activeDirective.summary}
              </p>
            </div>

            {/* Live Telemetry Matrix Grid (Zero Photos, 100% High-Tech Data) */}
            <div className="mt-8 border-t border-[var(--line)] pt-6">
              <div className="grid grid-cols-2 gap-4">
                {activeDirective.telemetry.map((t) => (
                  <div
                    key={t.label}
                    className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 transition-colors"
                  >
                    <div className="font-mono text-[10px] uppercase tracking-wider text-[var(--ink-dim)]">
                      {t.label}
                    </div>
                    <div className="mt-1 font-mono text-xs font-bold text-[var(--ink)] truncate">
                      {t.value}
                    </div>
                  </div>
                ))}
              </div>

              {/* Big Impact Metric Counter */}
              <div className="mt-6 flex items-center justify-between rounded-2xl bg-[var(--accent-tint)] px-5 py-4 border border-[var(--accent)]/15">
                <div>
                  <div className="font-mono text-3xl font-extrabold text-[var(--accent)] tracking-tight">
                    {activeDirective.statNumber}
                  </div>
                  <div className="text-xs font-medium text-[var(--ink-muted)]">
                    {activeDirective.statLabel}
                  </div>
                </div>

                <div className="flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)]">
                  <span>Directive Verified</span>
                  <CheckCircle2 className="h-4 w-4" />
                </div>
              </div>
            </div>
          </div>

          {/* Right Console: Pure Generative Aerospace SVG Visualizer (NO Photos) */}
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 sm:p-8 flex flex-col items-center justify-center relative min-h-[380px] overflow-hidden shadow-sm">
            {/* Background Radar Rings */}
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-10">
              <div className="h-80 w-80 rounded-full border border-current animate-ping" style={{ animationDuration: '8s' }} />
              <div className="absolute h-60 w-60 rounded-full border border-current" />
              <div className="absolute h-40 w-40 rounded-full border border-current" />
              <div className="absolute h-20 w-20 rounded-full border border-dashed border-current" />
            </div>

            {/* Stage-Specific Vector Telemetry Art */}
            {activeIdx === 0 && (
              /* Step 01: Gyroscopic Orbital Transfer Ring */
              <div className="relative flex flex-col items-center justify-center">
                <svg viewBox="0 0 240 240" className="h-60 w-60 overflow-visible" fill="none">
                  {/* Outer Counter-Rotating Ring */}
                  <circle
                    cx="120"
                    cy="120"
                    r="90"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="4 6"
                    className="animate-spin"
                    style={{ animationDuration: '24s' }}
                  />
                  {/* Middle Gimbal Ring */}
                  <ellipse
                    cx="120"
                    cy="120"
                    rx="80"
                    ry="45"
                    stroke="var(--line-strong)"
                    strokeWidth="2"
                    transform="rotate(30 120 120)"
                  />
                  {/* Tilted Inclination Ellipse */}
                  <ellipse
                    cx="120"
                    cy="120"
                    rx="80"
                    ry="35"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    transform="rotate(-40 120 120)"
                  />
                  {/* Orbiting Satellite Node */}
                  <circle cx="175" cy="80" r="5" fill="var(--accent)" className="animate-pulse" />
                  <circle cx="175" cy="80" r="10" stroke="var(--accent)" strokeWidth="1" opacity="0.5" />
                  
                  {/* Center Core Earth/Orbital Target */}
                  <circle cx="120" cy="120" r="28" fill="var(--surface)" stroke="var(--accent)" strokeWidth="2.5" />
                  <circle cx="120" cy="120" r="12" fill="var(--accent)" />
                  <line x1="120" y1="20" x2="120" y2="220" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
                  <line x1="20" y1="120" x2="220" y2="120" stroke="var(--line)" strokeWidth="1" strokeDasharray="3 3" />
                </svg>
                <div className="mt-4 font-mono text-[11px] font-semibold text-[var(--accent)] tracking-wider">
                  [ SIMULATED ORBITAL TRAJECTORY // ΔV 3.42 KM/S ]
                </div>
              </div>
            )}

            {activeIdx === 1 && (
              /* Step 02: Audio Waveform & Speech Signal Radar */
              <div className="relative flex flex-col items-center justify-center w-full px-4">
                <div className="flex items-center justify-center gap-1.5 h-36 w-full max-w-xs">
                  {[20, 45, 75, 30, 90, 60, 100, 40, 85, 55, 95, 35, 80, 50, 70, 30, 88, 65, 45, 25].map((h, i) => (
                    <div
                      key={i}
                      className="w-2 rounded-full bg-[var(--accent)] transition-all duration-300"
                      style={{
                        height: `${h}%`,
                        opacity: 0.35 + (i % 3) * 0.3,
                        transform: `scaleY(${0.8 + ((i * 7) % 5) * 0.1})`,
                      }}
                    />
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1.5">
                  <Radio className="h-3.5 w-3.5 text-[var(--accent)] animate-pulse" />
                  <span className="font-mono text-[11px] font-bold text-[var(--ink)]">
                    DEFENSE CHANNEL: 1420.405 MHz (LIVE)
                  </span>
                </div>
              </div>
            )}

            {activeIdx === 2 && (
              /* Step 03: 14 Regions Star Constellation Vector */
              <div className="relative flex flex-col items-center justify-center">
                <svg viewBox="0 0 240 200" className="h-56 w-64 overflow-visible" fill="none">
                  {/* Interconnected Constellation Laser Vectors */}
                  <polyline
                    points="30,120 70,80 110,95 150,60 190,75 220,110 180,140 130,130 90,150 40,140"
                    stroke="var(--accent)"
                    strokeWidth="1.5"
                    strokeDasharray="3 3"
                  />
                  <line x1="70" y1="80" x2="130" y2="130" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
                  <line x1="110" y1="95" x2="180" y2="140" stroke="var(--accent)" strokeWidth="1" opacity="0.4" />
                  <line x1="150" y1="60" x2="110" y2="95" stroke="var(--accent)" strokeWidth="1" opacity="0.6" />

                  {/* 14 Star Nodes */}
                  {[
                    [30, 120, 'NUK'], [70, 80, 'URG'], [110, 95, 'BUK'], [90, 150, 'NAV'],
                    [130, 130, 'SAM'], [150, 60, 'TAS'], [180, 140, 'QSH'], [190, 75, 'FER'],
                    [220, 110, 'AND'], [165, 100, 'SIR'], [140, 160, 'SUR'], [120, 50, 'JIZ'],
                    [205, 90, 'NAM'], [40, 140, 'KRP']
                  ].map(([x, y, label]) => (
                    <g key={label as string} transform={`translate(${x}, ${y})`}>
                      <circle cx="0" cy="0" r="4.5" fill="var(--accent)" />
                      <circle cx="0" cy="0" r="8" stroke="var(--accent)" strokeWidth="1" opacity="0.5" className="animate-ping" />
                      <text x="0" y="-8" textAnchor="middle" fill="var(--ink-muted)" fontSize="7" fontFamily="monospace" fontWeight="bold">
                        {label}
                      </text>
                    </g>
                  ))}
                </svg>
                <div className="mt-2 font-mono text-[11px] font-semibold text-[var(--accent)] tracking-wider">
                  [ 14 SYNCHRONIZED REGIONAL GROUND STATIONS ]
                </div>
              </div>
            )}

            {activeIdx === 3 && (
              /* Step 04: Official Aerospace Seal & Thrust Chamber */
              <div className="relative flex flex-col items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-56 w-56 overflow-visible" fill="none">
                  {/* Outer Seal Gear / Compass */}
                  <circle cx="100" cy="100" r="78" stroke="var(--line-strong)" strokeWidth="2" strokeDasharray="6 4" />
                  <circle cx="100" cy="100" r="68" stroke="var(--accent)" strokeWidth="1.5" />
                  {/* Central Diamond Rocket Symbol */}
                  <polygon
                    points="100,45 135,100 100,155 65,100"
                    fill="var(--surface)"
                    stroke="var(--accent)"
                    strokeWidth="2.5"
                  />
                  {/* Supersonic Shock Node */}
                  <circle cx="100" cy="100" r="14" fill="var(--accent)" className="animate-pulse" />
                  {/* Star Rays */}
                  <line x1="100" y1="20" x2="100" y2="40" stroke="var(--accent)" strokeWidth="2" />
                  <line x1="100" y1="160" x2="100" y2="180" stroke="var(--accent)" strokeWidth="2" />
                  <line x1="20" y1="100" x2="40" y2="100" stroke="var(--accent)" strokeWidth="2" />
                  <line x1="160" y1="100" x2="180" y2="100" stroke="var(--accent)" strokeWidth="2" />
                </svg>
                <div className="mt-4 flex items-center gap-1.5 font-mono text-[11px] font-bold text-[var(--accent)] tracking-wider">
                  <Shield className="h-3.5 w-3.5" />
                  <span>UZCOSMOS STATE ACCREDITED VERIFICATION</span>
                </div>
              </div>
            )}

            {/* Interactive Timeline Stepper Buttons */}
            <div className="mt-8 flex items-center justify-between w-full max-w-xs pt-4 border-t border-[var(--line)]">
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev > 0 ? prev - 1 : DIRECTIVES.length - 1))}
                className="text-xs font-mono font-bold text-[var(--ink-muted)] hover:text-[var(--accent)] px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                ← PREV
              </button>
              <div className="flex items-center gap-1.5">
                {DIRECTIVES.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setActiveIdx(i)}
                    className={`h-2 rounded-full transition-all cursor-pointer ${
                      activeIdx === i ? 'w-6 bg-[var(--accent)]' : 'w-2 bg-[var(--line-strong)]'
                    }`}
                    aria-label={`Go to step ${i + 1}`}
                  />
                ))}
              </div>
              <button
                type="button"
                onClick={() => setActiveIdx((prev) => (prev + 1) % DIRECTIVES.length)}
                className="text-xs font-mono font-bold text-[var(--ink-muted)] hover:text-[var(--accent)] px-3 py-1 rounded-full transition-colors cursor-pointer"
              >
                NEXT →
              </button>
            </div>
          </div>
        </div>

        {/* Creative Comparison Matrix: Traditional Olympiads vs Articular Space Proving Ground */}
        <div className="mt-16 rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-10 shadow-sm">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 border-b border-[var(--line)] pb-6">
            <div>
              <div className="flex items-center gap-2 font-mono text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                <Layers className="h-4 w-4" />
                <span>THE ARCHITECTURAL DIFFERENCE</span>
              </div>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                How Articular breaks the traditional mold.
              </h3>
            </div>
            <span className="font-mono text-xs text-[var(--ink-muted)]">
              STANDARDS MATRIX // 2026 SEASON
            </span>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                feature: 'Research Focus',
                traditional: 'Multiple choice tests & memorized formulas',
                articular: 'Real orbital thesis & CubeSat hardware design',
              },
              {
                feature: 'Evaluation Standard',
                traditional: 'School teachers grading standard bubble sheets',
                articular: 'Active Uzcosmos engineers & aerospace jury',
              },
              {
                feature: 'Stage Language',
                traditional: 'Closed-door written paper tests',
                articular: '100% public stage defense in English',
              },
              {
                feature: 'Reach & Scope',
                traditional: 'Isolated school classrooms',
                articular: '14 regions connected in a national orbit',
              },
            ].map((col) => (
              <div
                key={col.feature}
                className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 flex flex-col justify-between"
              >
                <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-[var(--accent)] mb-3">
                  {col.feature}
                </div>

                <div className="space-y-3">
                  <div className="rounded-xl bg-[var(--surface-elevated)] p-3 border border-[var(--line)]">
                    <span className="block text-[10px] font-mono uppercase text-[var(--ink-dim)]">Traditional</span>
                    <span className="text-xs text-[var(--ink-muted)] line-through decoration-red-400/50">
                      {col.traditional}
                    </span>
                  </div>

                  <div className="rounded-xl bg-[var(--accent-tint)] p-3 border border-[var(--accent)]/20">
                    <span className="block text-[10px] font-mono uppercase font-bold text-[var(--accent)]">Articular Standard</span>
                    <span className="text-xs font-bold text-[var(--ink)]">
                      {col.articular}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
