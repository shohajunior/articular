import React, { useEffect, useState, useRef } from 'react';

interface MetricItem {
  value: string;
  numericTarget: number;
  suffix: string;
  prefix?: string;
  hasComma?: boolean;
  label: string;
}

const METRICS: MetricItem[] = [
  {
    value: '4,000+',
    numericTarget: 4000,
    suffix: '+',
    hasComma: true,
    label: 'Telegram community',
  },
  {
    value: '50+',
    numericTarget: 50,
    suffix: '+',
    hasComma: false,
    label: 'Events supplied with volunteers',
  },
  {
    value: '500+',
    numericTarget: 500,
    suffix: '+',
    hasComma: false,
    label: 'Applications for regional roles',
  },
  {
    value: '14',
    numericTarget: 14,
    suffix: '',
    hasComma: false,
    label: 'Regions we are expanding to',
  },
];

export const WhereWeAreNow: React.FC = () => {
  const [counts, setCounts] = useState<number[]>(METRICS.map(() => 0));
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const duration = 1600; // ms
          const startTimestamp = performance.now();

          const step = (timestamp: number) => {
            const elapsed = timestamp - startTimestamp;
            const progress = Math.min(elapsed / duration, 1);
            // Ease out cubic
            const easeOutProgress = 1 - Math.pow(1 - progress, 3);

            setCounts(
              METRICS.map((metric) =>
                Math.floor(easeOutProgress * metric.numericTarget)
              )
            );

            if (progress < 1) {
              requestAnimationFrame(step);
            } else {
              setCounts(METRICS.map((m) => m.numericTarget));
            }
          };

          requestAnimationFrame(step);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const formatNumber = (num: number, hasComma: boolean, suffix: string) => {
    const formatted = hasComma ? num.toLocaleString('en-US') : num.toString();
    return formatted + suffix;
  };

  return (
    <section
      ref={sectionRef}
      id="where-we-are-now"
      className="relative isolate scroll-mt-20 border-b border-slate-800 bg-[#071322] py-24 sm:py-28 lg:py-32 text-white overflow-hidden"
    >
      {/* Subtle Matrix Dot Pattern at the Top matching screenshot */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:24px_24px] opacity-70"
      />

      {/* Subtle ambient light glow in top corner */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -left-40 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-[1140px] px-6">
        {/* Header Tag with Leading Line matching screenshot */}
        <div>
          <p className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-slate-400">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-slate-500"
            />
            WHERE WE ARE NOW
          </p>
        </div>

        {/* 4 Metrics Grid with Thin Top Horizontal Border */}
        <dl className="mt-12 sm:mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-10 gap-y-12 lg:gap-x-12">
          {METRICS.map((metric, index) => {
            const displayedValue = hasAnimated
              ? formatNumber(counts[index], metric.hasComma ?? false, metric.suffix)
              : metric.value;

            return (
              <div
                key={metric.label}
                className="group relative pt-8 border-t border-slate-700/60 transition-colors duration-300 hover:border-blue-500/80"
              >
                {/* Thin accent line on top of the column */}
                <div
                  aria-hidden="true"
                  className="absolute top-0 left-0 h-0.5 w-0 bg-blue-500 transition-all duration-500 group-hover:w-full"
                />

                {/* Big Bold Serif Metric Display */}
                <dd className="font-serif text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white leading-none">
                  <span className="tabular-nums inline-block transition-transform duration-300 group-hover:translate-x-0.5">
                    {displayedValue}
                  </span>
                </dd>

                {/* Clear descriptive caption */}
                <dt className="mt-5 max-w-[20ch] text-sm sm:text-base leading-snug text-slate-300 font-normal">
                  {metric.label}
                </dt>
              </div>
            );
          })}
        </dl>
      </div>
    </section>
  );
};
