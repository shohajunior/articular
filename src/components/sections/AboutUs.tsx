import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Globe, Award, Rocket, ArrowRight, ShieldCheck } from 'lucide-react';

interface StoryStep {
  number: string;
  tag: string;
  title: string;
  highlight: string;
  desc: string;
  badge: string;
  image: string;
  imageCaption: string;
  icon: React.ElementType;
}

const STORY_STEPS: StoryStep[] = [
  {
    number: '01',
    tag: 'RESEARCH & CREATIVITY',
    title: 'Beyond Textbooks',
    highlight: 'Real Space Challenges',
    desc: 'Student teams formulate engineering theses across orbital mechanics, satellite telemetry, and planetary exploration.',
    badge: 'Open to All 14 Regions',
    image: './assets/workshop.jpg',
    imageCaption: 'Engineering & orbital design lab session',
    icon: Rocket,
  },
  {
    number: '02',
    tag: 'ENGLISH DEFENSE',
    title: 'Global Scientific Voice',
    highlight: 'Rigorous Public Defense',
    desc: 'Teams present calculations and defend engineering choices strictly in fluent English before academic and agency jury panels.',
    badge: 'Uzcosmos Jury Evaluation',
    image: './assets/event-grand.jpg',
    imageCaption: 'Stage presentation & thesis defense',
    icon: Globe,
  },
  {
    number: '03',
    tag: 'NATIONWIDE ORBIT',
    title: '14 Administrative Regions',
    highlight: 'One Unified Network',
    desc: 'From Nukus to Fergana, connecting passionate youth and scientific mentors into a thriving national STEM community.',
    badge: '14 Regional Chapters',
    image: './assets/collaboration.jpg',
    imageCaption: 'Cross-regional student collaboration',
    icon: Sparkles,
  },
  {
    number: '04',
    tag: 'STATE RECOGNITION',
    title: 'Official Space Honors',
    highlight: 'Co-Signed Credentials',
    desc: 'Finalists receive official awards and certificates co-signed by Uzcosmos Agency leadership, unlocking international pathways.',
    badge: 'Co-Signed by Uzcosmos',
    image: './assets/certificates.jpg',
    imageCaption: 'Official Uzcosmos Agency awards ceremony',
    icon: Award,
  },
];

export const AboutUs: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const stepRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Scroll-based step detection
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight * 0.45;

      stepRefs.current.forEach((el, index) => {
        if (!el) return;
        const top = el.offsetTop;
        const height = el.offsetHeight;
        if (scrollPosition >= top && scrollPosition < top + height) {
          setActiveStep(index);
        }
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToStep = (index: number) => {
    const el = stepRefs.current[index];
    if (el) {
      if ((window as unknown as { lenis?: { scrollTo: (target: HTMLElement, opts: { offset: number; duration: number }) => void } }).lenis) {
        (window as unknown as { lenis: { scrollTo: (target: HTMLElement, opts: { offset: number; duration: number }) => void } }).lenis.scrollTo(el, { offset: -120, duration: 1.2 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }
  };

  return (
    <section id="about" className="relative scroll-mt-20 border-t border-[var(--line)] bg-[var(--surface)] py-20 sm:py-28 transition-colors duration-300">
      <div className="mx-auto max-w-[1140px] px-6">
        {/* Section Header */}
        <div className="mb-14 sm:mb-20 max-w-2xl">
          <p className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-[var(--accent)]">
            <span aria-hidden="true" className="h-px w-6 shrink-0 bg-[var(--accent)]" />
            ABOUT THE MOVEMENT
          </p>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            Where young minds{' '}
            <span className="font-serif italic text-[var(--accent)]">articulate the future</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[var(--ink-muted)] leading-relaxed">
            Uzbekistan&apos;s premier aerospace tournament connecting high school teams directly with state space agency mentors and official academic juries.
          </p>
        </div>

        {/* Scroll-Driven Two-Column Layout */}
        <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 items-start">
          {/* Left Column: Interactive Story Steps */}
          <div className="space-y-6 sm:space-y-8">
            {STORY_STEPS.map((step, idx) => {
              const isActive = activeStep === idx;
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  ref={(el) => {
                    stepRefs.current[idx] = el;
                  }}
                  onClick={() => scrollToStep(idx)}
                  className={`group relative cursor-pointer rounded-3xl border p-6 sm:p-8 transition-all duration-300 ${
                    isActive
                      ? 'border-[var(--accent)] bg-[var(--surface-elevated)] shadow-md translate-x-1 sm:translate-x-2'
                      : 'border-[var(--line)] bg-[var(--bg)] hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]'
                  }`}
                >
                  {/* Active Step Accent Indicator */}
                  {isActive && (
                    <div
                      aria-hidden="true"
                      className="absolute left-0 top-6 bottom-6 w-1 rounded-r-full bg-[var(--accent)]"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    {/* Top Tag & Number */}
                    <div className="flex items-center gap-3">
                      <span className="font-mono text-xs font-bold text-[var(--accent)]">
                        {step.number}
                      </span>
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-[var(--ink-dim)]">
                        {step.tag}
                      </span>
                    </div>

                    <div
                      className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full transition-colors ${
                        isActive
                          ? 'bg-[var(--accent)] text-white shadow-sm'
                          : 'bg-[var(--surface)] text-[var(--ink-dim)] group-hover:text-[var(--ink)]'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Title & Highlight */}
                  <h3 className="mt-3 font-serif text-2xl font-bold tracking-tight text-[var(--ink)] sm:text-3xl">
                    {step.title}
                  </h3>

                  {/* Concise 1-sentence description */}
                  <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)] max-w-lg">
                    {step.desc}
                  </p>

                  {/* Micro badge indicator */}
                  <div className="mt-4 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-[11px] font-semibold transition-colors ${
                        isActive
                          ? 'bg-[var(--accent)] text-white'
                          : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--ink-muted)]'
                      }`}
                    >
                      <ShieldCheck className="h-3 w-3" />
                      <span>{step.badge}</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Sticky Visual Stage with High-Res Photo & Glass Telemetry HUD */}
          <div className="sticky top-28 hidden lg:block">
            <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] shadow-xl aspect-[4/3] w-full">
              {/* Dynamic Photo Crossfade */}
              {STORY_STEPS.map((step, idx) => (
                <img
                  key={step.number}
                  src={step.image}
                  alt={step.imageCaption}
                  className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-in-out ${
                    activeStep === idx ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'
                  }`}
                />
              ))}

              {/* Gradient Vignette for Contrast & Readability */}
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#070b14]/90 via-[#070b14]/20 to-transparent"
              />

              {/* Top Telemetry Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="rounded-full border border-white/20 bg-black/40 px-3 py-1 font-mono text-[10px] font-semibold uppercase tracking-wider text-white backdrop-blur-md">
                  [ STEP {STORY_STEPS[activeStep].number} // 04 ]
                </span>
                <span className="rounded-full bg-blue-500/80 px-2.5 py-0.5 font-mono text-[10px] font-bold text-white backdrop-blur-md">
                  LIVE TRACK
                </span>
              </div>

              {/* Bottom Caption Overlay */}
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <p className="font-mono text-[11px] font-semibold tracking-wider text-blue-400 uppercase">
                  {STORY_STEPS[activeStep].tag}
                </p>
                <p className="mt-1 font-serif text-xl font-bold tracking-tight text-white sm:text-2xl">
                  {STORY_STEPS[activeStep].highlight}
                </p>
                <p className="mt-1 text-xs text-slate-300">
                  {STORY_STEPS[activeStep].imageCaption}
                </p>

                {/* Progress Dots */}
                <div className="mt-4 flex items-center gap-1.5">
                  {STORY_STEPS.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1.5 rounded-full transition-all duration-300 ${
                        activeStep === i ? 'w-8 bg-blue-400' : 'w-2 bg-white/30'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
