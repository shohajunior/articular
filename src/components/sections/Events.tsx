import React from 'react';
import { RevealWords } from '../ui/RevealWords';
import { Wrench, MessageSquare, Users2, ArrowRight } from 'lucide-react';
import { siteData } from '../../data/site';

export const Events: React.FC = () => {
  const icons = [Wrench, MessageSquare, Users2];

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      if ((window as any).lenis) {
        (window as any).lenis.scrollTo(el, { offset: -65, duration: 1.35 });
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  };

  return (
    <section id="events" className="relative border-t border-[var(--line)] bg-[var(--surface)] py-20 sm:py-24 transition-colors">
      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12 sm:mb-16">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            {siteData.events.badge}
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            <RevealWords parts={[{ text: siteData.events.heading }]} />
          </h2>
          <p className="mt-4 text-base sm:text-lg leading-relaxed text-[var(--ink-muted)]">
            {siteData.events.desc}
          </p>
        </div>

        {/* 3 Events Grid */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {siteData.events.items.map((event, idx) => {
            const Icon = icons[idx] || Wrench;
            return (
              <div
                key={event.id}
                className="group flex flex-col overflow-hidden rounded-[26px] border border-[var(--line)] bg-[var(--bg)] shadow-xs transition-all duration-300 hover:-translate-y-2 hover:border-[var(--line-strong)] hover:shadow-lg"
              >
                {/* Photo Header */}
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                  <img
                    src={event.photo}
                    alt={event.title}
                    loading="lazy"
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3 flex h-9 w-9 items-center justify-center rounded-xl bg-black/60 text-white backdrop-blur-md">
                    <Icon className="h-4 w-4 text-sky-300" />
                  </div>
                </div>

                {/* Content */}
                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <span className="font-mono-tag text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                      {event.subtitle}
                    </span>
                    <h3 className="mt-1 text-xl font-bold tracking-tight text-[var(--ink)]">
                      {event.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-[var(--ink-muted)]">
                      {event.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-[var(--line)]">
                    <button
                      type="button"
                      onClick={() => scrollTo('register')}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--accent)] hover:underline cursor-pointer"
                    >
                      <span>Join an upcoming session</span>
                      <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
