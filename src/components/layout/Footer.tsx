import React from 'react';
import { siteData } from '../../data/site';
import { ArrowUp } from 'lucide-react';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

interface FooterProps {
  onOpenLegal: (docKey: 'privacy' | 'terms') => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenLegal }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
            <div className="flex items-center gap-2.5">
              <img
                src="./assets/logo.png"
                alt="ArticularUZ Logo"
                className="h-7 w-7 object-contain"
              />
              <span className="font-mono-tag text-sm font-bold tracking-wider text-[var(--ink)]">
                ARTICULAR
              </span>
              <span className="rounded-full bg-[var(--accent)] px-2 py-0.5 text-[10px] font-bold text-[var(--accent-contrast)]">
                UZ
              </span>
            </div>
            <p className="text-xs text-[var(--ink-muted)] leading-relaxed">
              {siteData.shortDesc}
            </p>
            <div className="text-xs text-[var(--ink-dim)]">
              Official Partners: Uzcosmos Agency &amp; Youth Volunteering Club
            </div>
          </div>

          {/* Tournament Navigation */}
          <div>
            <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
              Navigation
            </div>
            <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
              <li>
                <button
                  onClick={() => scrollTo('stages')}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  Tournament Stages
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('regions')}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  14 Regional Chapters
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('partners')}
                  className="transition-colors hover:text-[var(--accent)]"
                >
                  Official Partners
                </button>
              </li>
              <li>
                <button
                  onClick={() => scrollTo('team')}
                  className="transition-colors hover:text-[var(--accent)]"
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

          {/* Legal and Top */}
          <div className="space-y-4">
            <div>
              <div className="mb-3 text-xs font-bold uppercase tracking-wider text-[var(--ink)]">
                Regulations
              </div>
              <ul className="space-y-2 text-xs text-[var(--ink-muted)]">
                <li>
                  <button
                    onClick={() => onOpenLegal('privacy')}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    Privacy Policy
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onOpenLegal('terms')}
                    className="transition-colors hover:text-[var(--accent)]"
                  >
                    Terms of Participation
                  </button>
                </li>
              </ul>
            </div>

            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs font-medium text-[var(--ink)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]"
              aria-label="Scroll to top"
            >
              <span>Back to Top</span>
              <ArrowUp className="h-3.5 w-3.5" />
            </button>
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
