import React, { useState, useEffect } from 'react';
import { siteData } from '../../data/site';
import { useTheme } from '../../lib/theme';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

export const Header: React.FC = () => {
  const [isFloating, setIsFloating] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 28) {
        setIsFloating(true);
      } else {
        setIsFloating(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
        isFloating ? 'pt-3 px-4' : 'pt-5 px-6'
      }`}
    >
      <div
        className={`mx-auto flex items-center justify-between transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          isFloating
            ? 'max-w-[920px] rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-5 py-2 shadow-md backdrop-blur-xl'
            : 'max-w-[1140px] bg-transparent py-1'
        }`}
      >
        {/* Brand Logo */}
        <a
          href="#"
          className="group flex items-center gap-2 transition-opacity hover:opacity-90"
          aria-label="ArticularUZ Home"
        >
          <span className="text-base sm:text-lg font-bold tracking-tight text-[var(--ink)]">
            ARTICULAR
          </span>
          <span className="rounded-full bg-[var(--accent)] px-2.5 py-0.5 text-[11px] font-bold text-white tracking-wide">
            UZ
          </span>
        </a>

        {/* Desktop Navigation with Color Change on Hover */}
        <nav className="hidden items-center gap-6 md:flex">
          <button
            type="button"
            onClick={() => scrollTo('stages')}
            className="cursor-pointer text-xs font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            Stages
          </button>
          <button
            type="button"
            onClick={() => scrollTo('regions')}
            className="cursor-pointer text-xs font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            14 Regions
          </button>
          <button
            type="button"
            onClick={() => scrollTo('partners')}
            className="cursor-pointer text-xs font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            Partners
          </button>
          <button
            type="button"
            onClick={() => scrollTo('team')}
            className="cursor-pointer text-xs font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
          >
            Team
          </button>
        </nav>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          {/* Social Links */}
          <div className="hidden items-center gap-1 sm:flex">
            <a
              href={siteData.links.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)]"
              title="Telegram Channel @articularuz"
              aria-label="Telegram"
            >
              <TelegramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={siteData.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)]"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon className="h-3.5 w-3.5" />
            </a>
            <a
              href={siteData.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="flex h-8 w-8 items-center justify-center rounded-full text-[var(--ink-dim)] transition-colors hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)]"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon className="h-3.5 w-3.5" />
            </a>
          </div>

          <div className="hidden h-4 w-[1px] bg-[var(--line)] sm:block" />

          {/* Theme Toggle Button */}
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)]"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            aria-label="Toggle Theme"
          >
            {theme === 'dark' ? (
              <Sun className="h-3.5 w-3.5 text-amber-400" />
            ) : (
              <Moon className="h-3.5 w-3.5 text-slate-700" />
            )}
          </button>

          {/* Register Pill Button (smooth scroll) */}
          <button
            type="button"
            onClick={() => scrollTo('register')}
            className="rounded-full bg-[var(--accent)] px-4 py-1.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
          >
            Register
          </button>

          {/* Mobile Menu Button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-[var(--line)] md:hidden"
            aria-label="Open navigation menu"
          >
            {mobileMenuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="mx-auto mt-2 max-w-[920px] rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-5 shadow-lg md:hidden">
          <nav className="flex flex-col gap-3">
            <button
              onClick={() => scrollTo('stages')}
              className="text-left text-sm font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              Stages
            </button>
            <button
              onClick={() => scrollTo('regions')}
              className="text-left text-sm font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              14 Regions
            </button>
            <button
              onClick={() => scrollTo('partners')}
              className="text-left text-sm font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              Partners
            </button>
            <button
              onClick={() => scrollTo('team')}
              className="text-left text-sm font-semibold text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
            >
              Team
            </button>
            <div className="mt-3 flex items-center gap-4 pt-3 border-t border-[var(--line)]">
              <a
                href={siteData.links.channel}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                Telegram
              </a>
              <a
                href={siteData.links.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                Instagram
              </a>
              <a
                href={siteData.links.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs text-[var(--ink-muted)] transition-colors duration-200 hover:text-[var(--accent)]"
              >
                LinkedIn
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
