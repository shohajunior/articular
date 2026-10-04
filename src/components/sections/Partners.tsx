import React from 'react';
import { siteData } from '../../data/site';
import { useTheme } from '../../lib/theme';

export const Partners: React.FC = () => {
  const { theme } = useTheme();

  return (
    <section id="partners" className="border-y border-[var(--line)] bg-[var(--surface)] py-12">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-6 text-center">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--ink-dim)]">
            Official Tournament Partners
          </span>
        </div>

        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Uzcosmos Agency */}
          <div className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 transition-all duration-200 hover:border-[var(--line-strong)]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-2">
              <img
                src={theme === 'dark' ? './assets/uzcosmos-white-logo.png' : './assets/uzcosmos-dark.png'}
                alt="Uzcosmos Agency Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--ink)]">Uzcosmos Agency</div>
              <div className="text-xs text-[var(--ink-muted)]">
                Space Research & Technology Agency
              </div>
            </div>
          </div>

          {/* Youth Volunteering Club */}
          <div className="flex items-center gap-4 rounded-2xl border border-[var(--line)] bg-[var(--bg)] p-4 transition-all duration-200 hover:border-[var(--line-strong)]">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-white p-1.5 overflow-hidden">
              <img
                src="./assets/yvc.jpg"
                alt="Youth Volunteering Club Logo"
                className="max-h-full max-w-full object-contain"
              />
            </div>
            <div>
              <div className="text-sm font-bold text-[var(--ink)]">Youth Volunteering Club</div>
              <div className="text-xs text-[var(--ink-muted)]">
                Strategic Partner (@yvc_uz)
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
