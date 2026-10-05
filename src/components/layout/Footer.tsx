import React from 'react';
import { siteData } from '../../data/site';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

interface FooterProps {
  onNavigateLegal: (docKey: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateLegal }) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] py-14">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand info */}
          <div className="space-y-3 sm:col-span-2 lg:col-span-1">
            <a
              href="#"
              className="group inline-flex items-center gap-2.5 transition-opacity hover:opacity-95"
              aria-label="ArticularUZ Home"
            >
              <img
                src="./assets/logo.png"
                alt="ArticularUZ Logo"
                className="h-8 w-8 sm:h-9 sm:w-9 shrink-0 object-contain drop-shadow-[0_0_12px_rgba(0,229,255,0.45)] transition-transform duration-300 group-hover:scale-105"
              />
              <div className="flex flex-col text-left justify-center">
                <span className="text-base sm:text-lg font-extrabold tracking-tight leading-none text-[var(--ink)]">
                  ARTICULAR<span className="text-[#00e5ff] dark:text-[#38bdf8]">UZ</span>
                </span>
                <span className="font-mono text-[7.5px] sm:text-[8.5px] font-bold tracking-[0.22em] uppercase text-[var(--ink-muted)] leading-none mt-1">
                  LEARN · THINK · ARTICULATE
                </span>
              </div>
            </a>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              {siteData.shortDesc}
            </p>
          </div>

          {/* Tournament Navigation */}
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('about')}
                  className="cursor-pointer transition-colors hover:text-[var(--accent)]"
                >
                  Tournament Stages
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('partners')}
                  className="cursor-pointer transition-colors hover:text-[var(--accent)]"
                >
                  Official Partners
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('regions')}
                  className="cursor-pointer transition-colors hover:text-[var(--accent)]"
                >
                  14 Regional Chapters
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => scrollTo('team')}
                  className="cursor-pointer transition-colors hover:text-[var(--accent)]"
                >
                  Organizing Team
                </button>
              </li>
            </ul>
          </div>

          {/* Official Channels */}
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Connect
            </div>
            <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
              <li>
                <a
                  href={siteData.links.bot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <TelegramIcon className="h-3.5 w-3.5" />
                  <span>@articularuz_tgbot (Registration)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteData.links.channel}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <TelegramIcon className="h-3.5 w-3.5" />
                  <span>@articularuz (Announcements)</span>
                </a>
              </li>
              <li>
                <a
                  href={siteData.links.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <InstagramIcon className="h-3.5 w-3.5" />
                  <span>Instagram @articularuz</span>
                </a>
              </li>
              <li>
                <a
                  href={siteData.links.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 transition-colors hover:text-[var(--accent)]"
                >
                  <LinkedinIcon className="h-3.5 w-3.5" />
                  <span>LinkedIn Company</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Pages */}
          <div className="space-y-4">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                Regulations
              </div>
              <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
                <li>
                  <a
                    href="#/privacy"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLegal('privacy');
                    }}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a
                    href="#/terms"
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateLegal('terms');
                    }}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    Terms of Participation
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[var(--line)] pt-6 text-xs text-[var(--ink-dim)] sm:flex-row">
          <div>
            &copy; {new Date().getFullYear()} ArticularUZ. All rights reserved.
          </div>
          <div className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500" />
            <span>Season 2026 Active &bull; Uzbekistan</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
