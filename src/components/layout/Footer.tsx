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
            <div className="flex items-center gap-2">
              <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--ink)]">
                ARTICULAR
              </span>
              <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
                UZ
              </span>
            </div>
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
                  onClick={() => scrollTo('stages')}
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
