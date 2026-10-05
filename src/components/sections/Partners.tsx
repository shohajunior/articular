import React from 'react';

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
            className="group relative flex h-16 sm:h-20 lg:h-24 w-auto items-center justify-center p-2 outline-none cursor-pointer"
          >
            {/* Light Mode Logo: ONLY the logo, no text */}
            <img
              src={item.logoLight}
              alt={item.name}
              loading="lazy"
              className="dark:hidden block h-12 sm:h-14 lg:h-16 w-auto max-w-[190px] object-contain transition-all duration-300 filter grayscale opacity-65 group-hover:grayscale-0 group-hover:opacity-100 group-hover:scale-110"
            />
            {/* Dark Mode Logo: Bright crisp white with high contrast & cyan hover glow */}
            <img
              src={item.logoDark}
              alt={item.name}
              loading="lazy"
              className="hidden dark:block h-12 sm:h-14 lg:h-16 w-auto max-w-[190px] object-contain transition-all duration-300 opacity-85 group-hover:opacity-100 group-hover:scale-110 drop-shadow-[0_0_8px_rgba(255,255,255,0.25)] group-hover:drop-shadow-[0_0_16px_rgba(56,189,248,0.7)]"
            />
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
            Where the opportunities come from
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

