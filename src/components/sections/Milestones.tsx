import React from 'react';
import { siteData } from '../../data/site';
import { RevealWords } from '../ui/RevealWords';
import { Calendar, Rocket, Milestone as MilestoneIcon } from 'lucide-react';

export const Milestones: React.FC = () => {
  return (
    <section
      id="milestones"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] py-20 sm:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1140px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3.5 py-1 text-xs font-semibold text-[var(--accent)]">
            <MilestoneIcon className="h-3.5 w-3.5" />
            <span className="font-mono-tag tracking-wider uppercase">MILESTONES</span>
          </div>

          <h2 className="mt-3 text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            <RevealWords parts={[{ text: 'Our trajectory so far' }]} />
          </h2>

          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--ink-muted)]">
            Every step builds momentum towards an ambitious, youth-driven aerospace ecosystem in Uzbekistan.
          </p>
        </div>

        {/* Timeline Line & Items */}
        <div className="relative">
          {/* Vertical Track Line */}
          <div className="absolute left-4 top-4 bottom-4 w-[2px] bg-gradient-to-b from-sky-500 via-[var(--accent)] to-transparent sm:left-1/2 sm:-ml-[1px]" />

          <div className="space-y-10 sm:space-y-12">
            {siteData.milestones.map((item, idx) => {
              const isEven = idx % 2 === 0;
              return (
                <div
                  key={idx}
                  className={`relative flex flex-col sm:flex-row items-start ${
                    isEven ? 'sm:flex-row-reverse' : ''
                  }`}
                >
                  {/* Glowing Node at center */}
                  <div className="absolute left-4 -translate-x-1/2 sm:left-1/2 flex h-8 w-8 items-center justify-center rounded-full border-2 border-[var(--accent)] bg-[var(--bg)] shadow-[0_0_12px_rgba(56,189,248,0.5)] z-10">
                    <div className="h-2.5 w-2.5 rounded-full bg-[var(--accent)]" />
                  </div>

                  {/* Content Card (Left on odd, Right on even) */}
                  <div
                    className={`ml-10 sm:ml-0 w-full sm:w-[calc(50%-32px)] ${
                      isEven ? 'sm:mr-auto sm:text-right' : 'sm:ml-auto sm:text-left'
                    }`}
                  >
                    <div className="group rounded-[24px] border border-[var(--line)] bg-[var(--surface)] p-6 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-md">
                      {/* Date Badge */}
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3 py-0.5 text-xs font-semibold text-[var(--accent)] mb-3 ${
                          isEven ? 'sm:flex-row-reverse' : ''
                        }`}
                      >
                        <Calendar className="h-3 w-3" />
                        <span className="font-mono-tag">{item.date}</span>
                      </div>

                      <h3 className="text-lg font-bold tracking-tight text-[var(--ink)] sm:text-xl">
                        {item.title}
                      </h3>

                      <p className="mt-2 text-sm leading-relaxed text-[var(--ink-muted)]">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
