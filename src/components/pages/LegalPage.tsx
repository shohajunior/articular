import React, { useEffect } from 'react';
import { legalContent } from '../../data/legal';
import { ArrowLeft, ShieldCheck, FileText } from 'lucide-react';
import { siteData } from '../../data/site';
import { TelegramIcon } from '../ui/SocialIcons';
import { RevealWords } from '../ui/RevealWords';

interface LegalPageProps {
  docKey: 'privacy' | 'terms';
  onNavigate: (page: 'home' | 'privacy' | 'terms') => void;
}

export const LegalPage: React.FC<LegalPageProps> = ({ docKey, onNavigate }) => {
  const content = legalContent[docKey];

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [docKey]);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300">
      {/* Top Header / Breadcrumb Bar */}
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1040px] items-center justify-between px-6 py-4">
          <button
            onClick={() => onNavigate('home')}
            className="group flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--ink)] transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Tournament</span>
          </button>

          {/* Quick Tab Switcher */}
          <div className="flex items-center gap-1 rounded-full border border-[var(--line)] bg-[var(--surface)] p-1">
            <button
              onClick={() => onNavigate('privacy')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                docKey === 'privacy'
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Privacy Policy
            </button>
            <button
              onClick={() => onNavigate('terms')}
              className={`rounded-full px-3.5 py-1 text-xs font-semibold transition-colors ${
                docKey === 'terms'
                  ? 'bg-[var(--accent)] text-[var(--accent-contrast)]'
                  : 'text-[var(--ink-muted)] hover:text-[var(--ink)]'
              }`}
            >
              Terms of Participation
            </button>
          </div>
        </div>
      </header>

      {/* Main Legal Content Container */}
      <main className="mx-auto max-w-[860px] px-6 py-14 sm:py-20">
        {/* Document Header */}
        <div className="mb-10 border-b border-[var(--line)] pb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full bg-[var(--accent-tint)] px-3.5 py-1 text-xs font-bold text-[var(--accent)]">
            {docKey === 'privacy' ? (
              <ShieldCheck className="h-4 w-4" />
            ) : (
              <FileText className="h-4 w-4" />
            )}
            <span>Official Regulation &bull; Republic of Uzbekistan</span>
          </div>

          <h1 className="text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            <RevealWords key={docKey} parts={[{ text: content.title }]} />
          </h1>

          <p className="mt-3 text-sm text-[var(--ink-muted)] sm:text-base">
            {content.subtitle}
          </p>

          <div className="mt-4 flex items-center gap-4 text-xs text-[var(--ink-dim)]">
            <span>Last reviewed: {content.updated}</span>
            <span>&bull;</span>
            <span>Applies to Season 2026</span>
          </div>
        </div>

        {/* Legal Sections */}
        <article className="space-y-6 text-[var(--ink)]">
          {content.sections.map((section, idx) => (
            <div
              key={idx}
              className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm transition-colors"
            >
              <h2 className="text-base font-bold tracking-tight text-[var(--ink)] sm:text-lg">
                {section.heading}
              </h2>
              <p className="mt-2.5 text-xs leading-relaxed text-[var(--ink-muted)] sm:text-sm">
                {section.body}
              </p>
            </div>
          ))}
        </article>

        {/* Contact and Telegram Bot Box */}
        <div className="mt-14 rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8 shadow-sm text-center sm:text-left">
          <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
            <div>
              <h3 className="text-base font-bold text-[var(--ink)]">
                Have questions regarding regulations?
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-muted)]">
                Contact the tournament organizing council directly via our official Telegram bot.
              </p>
            </div>

            <div className="flex items-center gap-3">
              <a
                href={siteData.links.bot}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[var(--accent)] px-5 py-2.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
              >
                <TelegramIcon className="h-3.5 w-3.5" />
                <span>Launch Bot</span>
              </a>

              <button
                onClick={() => onNavigate('home')}
                className="rounded-full border border-[var(--line)] bg-[var(--surface-elevated)] px-5 py-2.5 text-xs font-semibold text-[var(--ink)] transition-colors hover:border-[var(--line-strong)]"
              >
                Back to Site
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Clean Footer */}
      <footer className="border-t border-[var(--line)] py-10 text-center text-xs text-[var(--ink-dim)]">
        &copy; {new Date().getFullYear()} ArticularUZ. All rights reserved. Co-organized with Uzcosmos Agency &amp; Youth Volunteering Club.
      </footer>
    </div>
  );
};
