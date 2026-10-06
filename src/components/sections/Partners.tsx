import React from 'react';
import { RevealWords } from '../ui/RevealWords';

interface Partner {
  id: string;
  name: string;
  url: string;
  logoLight: string;
  logoDark: string;
}

// ONLY the official partners provided by the user in the project root
const PARTNERS: Partner[] = [
  {
    id: 'uzcosmos',
    name: 'Uzcosmos Agency',
    url: 'https://uzspace.uz',
    logoLight: './assets/uzcosmos-dark.svg',
    logoDark: './assets/uzcosmos-white.svg',
  },
  {
    id: 'yvc',
    name: 'Youth Volunteering Club',
    url: 'https://t.me/yvc_uz',
    logoLight: './assets/yvc-png.png',
    logoDark: './assets/yvc-white.png',
  },
];

// Repeating alternating partners to create a smooth, continuous infinite stream
const REPEATED_ITEMS = Array.from({ length: 8 }).flatMap((_, cycleIdx) =>
  PARTNERS.map((partner) => ({
    ...partner,
    key: `${partner.id}-${cycleIdx}`,
  }))
);

export const Partners: React.FC = () => {
  const renderTrack = (trackId: string, ariaHidden = false) => (
    <ul
      role={ariaHidden ? undefined : 'group'}
      aria-label={ariaHidden ? undefined : 'Official Partners'}
      aria-hidden={ariaHidden || undefined}
      className="marquee-track flex flex-row flex-nowrap shrink-0 items-center gap-12 sm:gap-16 lg:gap-24 pr-12 sm:pr-16 lg:pr-24"
    >
      {REPEATED_ITEMS.map((item) => (
        <li
          key={`${trackId}-${item.key}`}
          className="marquee-logo-item flex shrink-0 items-center justify-center"
        >
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            title={item.name}
            aria-label={item.name}
            className="group relative flex flex-col h-20 sm:h-24 lg:h-28 w-auto items-center justify-center p-2 outline-none cursor-pointer"
          >
            {/* Light Mode Logo */}
            <img
              src={item.logoLight}
              alt={item.name}
              loading="lazy"
              className={`dark:hidden block w-auto object-contain transition-all duration-300 filter grayscale opacity-75 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110 ${
                item.id === 'uzcosmos'
                  ? 'h-[70px] sm:h-[88px] lg:h-[105px] max-w-[280px] sm:max-w-[350px]'
                  : 'h-9 sm:h-11 lg:h-12 max-w-[120px]'
              }`}
            />
            {/* Dark Mode Logo: Bright crisp white with high contrast & cyan hover glow */}
            <img
              src={item.logoDark}
              alt={item.name}
              loading="lazy"
              className={`hidden dark:block w-auto object-contain transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-110 drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] group-hover:drop-shadow-[0_0_18px_rgba(56,189,248,0.8)] ${
                item.id === 'uzcosmos'
                  ? 'h-[70px] sm:h-[88px] lg:h-[105px] max-w-[280px] sm:max-w-[350px]'
                  : 'h-9 sm:h-11 lg:h-12 max-w-[120px]'
              }`}
            />

            {/* Label under YVC logo */}
            {item.id === 'yvc' && (
              <span className="mt-1 font-mono text-xs sm:text-sm font-bold tracking-widest text-slate-700 dark:text-slate-200 uppercase transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-sky-400 group-hover:scale-105 select-none">
                YVC
              </span>
            )}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <section
      id="partners"
      className="relative isolate scroll-mt-20 border-b border-[var(--line)] bg-[#edf4f9] dark:bg-[#0c1422] py-20 sm:py-24 transition-colors duration-300 overflow-hidden"
    >
      <div className="mx-auto max-w-[1140px] px-6">
        {/* Header matching volontyorlar.uz Opportunity sources */}
        <div className="max-w-2xl">
          <p className="flex items-center gap-2.5 font-mono text-xs font-semibold uppercase tracking-[0.14em] text-blue-600 dark:text-blue-400">
            <span
              aria-hidden="true"
              className="h-px w-6 shrink-0 bg-blue-600 dark:bg-blue-400"
            />
            OPPORTUNITY SOURCES
          </p>
          <h2 className="mt-4 font-serif text-3xl font-normal tracking-tight text-slate-900 dark:text-white sm:text-4xl lg:text-5xl">
            <RevealWords parts={[{ text: 'Where the opportunities come from' }]} />
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-300 font-normal leading-relaxed">
            Official strategic partners collaborating to empower students in aerospace tournaments and youth volunteer initiatives across Uzbekistan.
          </p>
        </div>
      </div>

      {/* Infinite Looping Marquee Carousel: STRICTLY ONE SINGLE HORIZONTAL LINE */}
      <div className="marquee-container flex flex-row flex-nowrap overflow-hidden w-full whitespace-nowrap mt-12 sm:mt-16 py-6 select-none">
        {renderTrack('track1')}
        {renderTrack('track2', true)}
      </div>
    </section>
  );
};

