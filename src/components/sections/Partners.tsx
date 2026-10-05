import React from 'react';

interface DualLogoPartner {
  name: string;
  url: string;
  greySrc: string;
  colorSrc: string;
  singleSrc?: never;
}

interface SingleLogoPartner {
  name: string;
  url: string;
  singleSrc: string;
  greySrc?: never;
  colorSrc?: never;
}

type PartnerItem = DualLogoPartner | SingleLogoPartner;

const PARTNER_LIST: PartnerItem[] = [
  // 1. Youth for Good (Official SVG from volontyorlar.uz)
  {
    name: 'Youth for Good',
    url: 'https://volontyorlar.uz',
    greySrc: './opportunity-sources/youth-for-good-grey.svg',
    colorSrc: './opportunity-sources/youth-for-good.svg',
  },
  // 2. Youth Grants (Official SVG from volontyorlar.uz)
  {
    name: 'Youth Grants',
    url: 'https://volontyorlar.uz',
    greySrc: './opportunity-sources/youth-grants-grey.svg',
    colorSrc: './opportunity-sources/youth-grants.svg',
  },
  // 3. ArticularUZ (Official SVG from volontyorlar.uz)
  {
    name: 'ArticularUZ',
    url: '#',
    greySrc: './opportunity-sources/articularuz-grey.svg',
    colorSrc: './opportunity-sources/articularuz.svg',
  },
  // 4. Youth Volunteer Club (Official SVG from volontyorlar.uz)
  {
    name: 'Youth Volunteer Club',
    url: 'https://t.me/yvc_uz',
    greySrc: './opportunity-sources/youth-volunteer-club-grey.svg',
    colorSrc: './opportunity-sources/youth-volunteer-club.svg',
  },
  // 5. Yashil Qo'llar (Green Hands)
  {
    name: "Yashil Qo'llar",
    url: 'https://volontyorlar.uz',
    greySrc: './opportunity-sources/yashil-qollar-grey.svg',
    colorSrc: './opportunity-sources/yashil-qollar.svg',
  },
  // 6. Youth Run Club
  {
    name: 'Youth Run Club',
    url: 'https://volontyorlar.uz',
    greySrc: './opportunity-sources/youth-run-club-grey.svg',
    colorSrc: './opportunity-sources/youth-run-club.svg',
  },
  // 7. Uzcosmos Agency (User uploaded logo)
  {
    name: 'Uzcosmos Agency',
    url: 'https://uzspace.uz',
    singleSrc: './assets/uzcosmoslogo.png',
  },
  // 8. Youth Volunteer Club Emblem (User uploaded YVC transparent PNG)
  {
    name: 'YVC Uzbekistan',
    url: 'https://t.me/yvc_uz',
    singleSrc: './assets/yvc-png.png',
  },
  // 9. Yoshlar Ishlari Agentligi
  {
    name: 'Yoshlar Ishlari Agentligi',
    url: 'https://yoshlar.gov.uz',
    singleSrc: './assets/yoshlar-ishlari-agentligi-logo-png_seeklogo-491676.png',
  },
  // 10. IT Park Uzbekistan
  {
    name: 'IT Park Uzbekistan',
    url: 'https://it-park.uz',
    singleSrc: './assets/Logo_IT_Park_Uzbekistan.svg.webp',
  },
  // 11. C-Space Coworking
  {
    name: 'C-Space Coworking',
    url: 'https://cspace.uz',
    singleSrc: './assets/cspace.png',
  },
  // 12. Ministry of Innovative Development
  {
    name: 'Innovatsiya Vazirligi',
    url: 'https://mininnovation.uz',
    singleSrc: './assets/innovatsiya.png',
  },
];

export const Partners: React.FC = () => {
  const renderTrackItems = (keyPrefix: string) => {
    return PARTNER_LIST.map((partner, index) => {
      const isDual = Boolean(partner.greySrc && partner.colorSrc);
      return (
        <li
          key={`${keyPrefix}-${index}`}
          className="marquee-logo-item h-12 sm:h-14 lg:h-16 px-4 sm:px-6"
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
            {isDual ? (
              <>
                <img
                  src={partner.greySrc}
                  alt={partner.name}
                  loading="lazy"
                  className="marquee-logo-grey block h-10 sm:h-12 lg:h-14 w-auto max-w-[210px] object-contain"
                />
                <img
                  src={partner.colorSrc}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="marquee-logo-color absolute inset-0 block h-10 sm:h-12 lg:h-14 w-auto max-w-[210px] object-contain"
                />
              </>
            ) : (
              <img
                src={partner.singleSrc}
                alt={partner.name}
                loading="lazy"
                className="marquee-logo-single block h-10 sm:h-12 lg:h-14 w-auto max-w-[180px] object-contain"
              />
            )}
          </a>
        </li>
      );
    });
  };

  return (
    <section
      id="partners"
      className="relative isolate scroll-mt-20 border-b border-[var(--line)] bg-[#edf4f9] dark:bg-[#0c1422] py-20 sm:py-24 lg:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1140px] px-6">
        {/* Header Tag with Leading Line matching volontyorlar.uz Opportunity Sources */}
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
            Leading youth volunteer networks, national agencies, and scientific partners connecting students to aerospace and STEM challenges.
          </p>
        </div>
      </div>

      {/* Infinite Looping Marquee Carousel with Fade Edge Masks */}
      <div className="marquee-container mt-12 sm:mt-16 py-4">
        {/* Track 1 */}
        <ul
          role="group"
          aria-label="Opportunity sources"
          className="marquee-track gap-10 sm:gap-14 lg:gap-18 pr-10 sm:pr-14 lg:pr-18"
        >
          {renderTrackItems('track1')}
        </ul>

        {/* Track 2 (Duplicate for Seamless Infinite Loop) */}
        <ul
          aria-hidden="true"
          className="marquee-track gap-10 sm:gap-14 lg:gap-18 pr-10 sm:pr-14 lg:pr-18"
        >
          {renderTrackItems('track2')}
        </ul>
      </div>
    </section>
  );
};
