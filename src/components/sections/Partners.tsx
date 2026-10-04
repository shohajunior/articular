import React from 'react';
import { useTheme } from '../../lib/theme';

export const Partners: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="partners" className="border-t border-[var(--line)] bg-[var(--surface)] py-16">
      <div className="mx-auto max-w-[1040px] px-6">
        <div className="mb-8 text-center">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--ink-dim)]">
            Official Partners
          </span>
        </div>

        {/* Full Logos Only, Centered and Prominent */}
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
          {/* Uzcosmos Agency Full Logo */}
          <a
            href="https://uzspace.uz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-28 items-center justify-center rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-md"
            title="Uzcosmos Agency"
            aria-label="Uzcosmos Agency"
          >
            <img
              src={theme === 'dark' ? './assets/uzcosmos-white-logo.png' : './assets/uzcosmos-dark.png'}
              alt="Uzcosmos Agency Official Logo"
              className="max-h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </a>

          {/* Youth Volunteering Club Full Logo */}
          <a
            href="https://t.me/yvc_uz"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex h-28 items-center justify-center gap-4 rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-md"
            title="Youth Volunteering Club"
            aria-label="Youth Volunteering Club"
          >
            <img
              src="./assets/yvc.jpg"
              alt="Youth Volunteering Club Emblem"
              className="h-14 w-14 rounded-full object-cover shadow-sm transition-transform duration-300 group-hover:scale-105"
            />
            <div className="flex flex-col text-left">
              <span className="font-mono-tag text-[11px] font-bold tracking-wider text-[var(--ink-dim)]">
                YOUTH VOLUNTEERING
              </span>
              <span className="font-mono-tag text-base font-extrabold tracking-tight text-[var(--ink)]">
                CLUB UZ
              </span>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};
