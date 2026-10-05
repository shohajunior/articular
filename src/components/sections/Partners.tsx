import React from 'react';

interface PartnerConfig {
  id: string;
  name: string;
  url: string;
  type: 'yvc-full' | 'uzcosmos-full' | 'yvc-emblem' | 'uzcosmos-emblem';
}

// ONLY the user's official partners, repeating smoothly in the carousel
const PARTNERS: PartnerConfig[] = [
  {
    id: 'uzcosmos-1',
    name: 'Uzcosmos Agency',
    url: 'https://uzspace.uz',
    type: 'uzcosmos-full',
  },
  {
    id: 'yvc-1',
    name: 'Youth Volunteering Club',
    url: 'https://t.me/yvc_uz',
    type: 'yvc-full',
  },
  {
    id: 'uzcosmos-emblem-1',
    name: 'Uzcosmos Official Agency',
    url: 'https://uzspace.uz',
    type: 'uzcosmos-emblem',
  },
  {
    id: 'yvc-emblem-1',
    name: 'YVC Uzbekistan Emblem',
    url: 'https://t.me/yvc_uz',
    type: 'yvc-emblem',
  },
  {
    id: 'uzcosmos-2',
    name: 'Uzcosmos Agency',
    url: 'https://uzspace.uz',
    type: 'uzcosmos-full',
  },
  {
    id: 'yvc-2',
    name: 'Youth Volunteering Club',
    url: 'https://t.me/yvc_uz',
    type: 'yvc-full',
  },
  {
    id: 'uzcosmos-emblem-2',
    name: 'Uzcosmos Official Agency',
    url: 'https://uzspace.uz',
    type: 'uzcosmos-emblem',
  },
  {
    id: 'yvc-emblem-2',
    name: 'YVC Uzbekistan Emblem',
    url: 'https://t.me/yvc_uz',
    type: 'yvc-emblem',
  },
];

export const Partners: React.FC = () => {
  const renderPartnerLogo = (partner: PartnerConfig) => {
    switch (partner.type) {
      case 'yvc-full':
        return (
          <div className="relative flex items-center justify-center h-full">
            <img
              src="./opportunity-sources/youth-volunteer-club-grey.svg"
              alt={partner.name}
              loading="lazy"
              className="marquee-logo-grey block h-10 sm:h-12 lg:h-13 w-auto max-w-[220px] object-contain dark:brightness-200 dark:contrast-125 dark:opacity-75"
            />
            <img
              src="./opportunity-sources/youth-volunteer-club.svg"
              alt=""
              aria-hidden="true"
              loading="lazy"
              className="marquee-logo-color absolute inset-0 block h-10 sm:h-12 lg:h-13 w-auto max-w-[220px] object-contain dark:brightness-110"
            />
          </div>
        );

      case 'uzcosmos-full':
        return (
          <div className="relative flex items-center justify-center h-full">
            {/* Light Mode Uzcosmos */}
            <div className="dark:hidden relative flex items-center justify-center h-full">
              <img
                src="./assets/uzcosmos-dark.png"
                alt={partner.name}
                loading="lazy"
                className="marquee-logo-grey block h-9 sm:h-11 lg:h-12 w-auto max-w-[220px] object-contain"
              />
              <img
                src="./assets/uzcosmos-dark.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="marquee-logo-color absolute inset-0 block h-9 sm:h-11 lg:h-12 w-auto max-w-[220px] object-contain"
              />
            </div>
            {/* Dark Mode Uzcosmos with crisp white typography and glowing blue orbit */}
            <div className="hidden dark:flex relative items-center justify-center h-full">
              <img
                src="./assets/uzcosmos-white-logo.png"
                alt={partner.name}
                loading="lazy"
                className="marquee-logo-grey block h-9 sm:h-11 lg:h-12 w-auto max-w-[220px] object-contain opacity-65"
              />
              <img
                src="./assets/uzcosmos-white-logo.png"
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="marquee-logo-color absolute inset-0 block h-9 sm:h-11 lg:h-12 w-auto max-w-[220px] object-contain opacity-100"
              />
            </div>
          </div>
        );

      case 'yvc-emblem':
        return (
          <div className="relative flex items-center gap-3 h-full px-2">
            <img
              src="./assets/yvc-png.png"
              alt={partner.name}
              loading="lazy"
              className="marquee-logo-single block h-11 sm:h-13 lg:h-14 w-auto object-contain dark:brightness-150"
            />
            <div className="flex flex-col text-left transition-opacity duration-300">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Youth Volunteering
              </span>
              <span className="font-mono text-xs font-extrabold tracking-tight text-slate-800 dark:text-slate-200">
                Club UZ
              </span>
            </div>
          </div>
        );

      case 'uzcosmos-emblem':
        return (
          <div className="relative flex items-center gap-3 h-full px-2">
            <img
              src="./assets/uzcosmoslogo.png"
              alt={partner.name}
              loading="lazy"
              className="marquee-logo-single block h-11 sm:h-13 lg:h-14 w-auto object-contain dark:brightness-0 dark:invert dark:opacity-75"
            />
            <div className="flex flex-col text-left transition-opacity duration-300">
              <span className="font-mono text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Space Agency
              </span>
              <span className="font-mono text-xs font-extrabold tracking-tight text-slate-800 dark:text-slate-200">
                O'zkosmos
              </span>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTrackItems = (keyPrefix: string) => {
    return PARTNERS.map((partner, index) => (
      <li
        key={`${keyPrefix}-${partner.id}-${index}`}
        className="marquee-logo-item h-14 sm:h-16 lg:h-18 px-6 sm:px-8"
        tabIndex={0}
      >
        <a
          href={partner.url}
          target="_blank"
          rel="noopener noreferrer"
          className="relative flex h-full items-center justify-center transition-transform duration-300"
          title={partner.name}
          aria-label={partner.name}
        >
          {renderPartnerLogo(partner)}
        </a>
      </li>
    ));
  };

  return (
    <section
      id="partners"
      className="relative isolate scroll-mt-20 border-b border-[var(--line)] bg-[#edf4f9] dark:bg-[#0c1422] py-20 sm:py-24 transition-colors duration-300"
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

      {/* Infinite Looping Marquee Carousel with Fade Edge Masks */}
      <div className="marquee-container mt-12 sm:mt-16 py-4">
        {/* Track 1 */}
        <ul
          role="group"
          aria-label="Official Partners"
          className="marquee-track gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16"
        >
          {renderTrackItems('track1')}
        </ul>

        {/* Track 2 (Duplicate for Seamless Infinite Loop) */}
        <ul
          aria-hidden="true"
          className="marquee-track gap-8 sm:gap-12 lg:gap-16 pr-8 sm:pr-12 lg:pr-16"
        >
          {renderTrackItems('track2')}
        </ul>
      </div>
    </section>
  );
};
