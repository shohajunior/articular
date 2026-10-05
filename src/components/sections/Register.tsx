import React from 'react';
import { siteData } from '../../data/site';
import { ArrowRight, ShieldCheck, Users, MapPin, Award } from 'lucide-react';
import { TelegramIcon } from '../ui/SocialIcons';

interface RegisterProps {
  onNavigateLegal: (docKey: 'privacy' | 'terms') => void;
}

export const Register: React.FC<RegisterProps> = ({ onNavigateLegal }) => {
  const perks = [
    {
      icon: Users,
      title: "Teams of 2–5",
      desc: "Or solo student competitors"
    },
    {
      icon: MapPin,
      title: "All 14 Regions",
      desc: "Open across Uzbekistan"
    },
    {
      icon: Award,
      title: "Uzcosmos Credentials",
      desc: "Gold, Silver & Bronze honors"
    },
    {
      icon: ShieldCheck,
      title: "100% Free",
      desc: "Zero registration fees"
    }
  ];

  return (
    <section id="register" className="border-t border-[var(--line)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-[1040px] px-6">
        <div className="relative overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-14 text-center shadow-sm">
          {/* Top Label */}
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1 text-xs text-[var(--ink-muted)]">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]" />
            <span className="font-mono-tag font-semibold uppercase tracking-wider text-[var(--accent)]">
              Season 2026 Registration
            </span>
          </div>

          {/* Heading with Telegram bot cleanly on the second line */}
          <h2 className="mx-auto max-w-2xl text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            Register exclusively via <br />
            <span className="inline-block whitespace-nowrap font-serif-italic text-[var(--accent)]">
              Telegram bot
            </span>
          </h2>

          {/* Subtitle */}
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed text-[var(--ink-muted)] sm:text-base">
            All team rosters, engineering track selection, rules verification, and schedule updates are conducted strictly through our official Telegram service bot.
          </p>

          {/* 4 Feature Badges in Balanced Grid */}
          <div className="mx-auto mt-10 grid max-w-3xl grid-cols-2 gap-3.5 sm:grid-cols-4">
            {perks.map((perk, i) => {
              const Icon = perk.icon;
              return (
                <div
                  key={i}
                  className="flex flex-col items-center rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-4 text-center transition-colors hover:border-[var(--line-strong)]"
                >
                  <div className="mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)]">
                    <Icon className="h-4 w-4" />
                  </div>
                  <div className="text-xs font-bold text-[var(--ink)]">
                    {perk.title}
                  </div>
                  <div className="mt-0.5 text-[11px] text-[var(--ink-muted)]">
                    {perk.desc}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Primary Action Button */}
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a
              href={siteData.links.bot}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-4 text-sm font-semibold text-[var(--accent-contrast)] shadow-sm transition-all hover:bg-[var(--accent-hover)] hover:shadow-md"
            >
              <TelegramIcon className="h-4 w-4" />
              <span>Register Now</span>
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </a>

            <a
              href={siteData.links.channel}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-6 py-4 text-sm font-semibold text-[var(--ink)] transition-colors hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]"
            >
              <TelegramIcon className="h-4 w-4 text-[var(--ink-muted)]" />
              <span>Telegram Channel</span>
            </a>
          </div>

          {/* Legal notes linking to separate pages */}
          <div className="mt-8 border-t border-[var(--line)] pt-6 text-xs text-[var(--ink-dim)]">
            By participating, you agree to our{' '}
            <a
              href="#/privacy"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLegal('privacy');
              }}
              className="font-medium text-[var(--accent)] underline underline-offset-2 transition-colors hover:text-[var(--accent-hover)]"
            >
              Privacy Policy
            </a>{' '}
            and{' '}
            <a
              href="#/terms"
              onClick={(e) => {
                e.preventDefault();
                onNavigateLegal('terms');
              }}
              className="font-medium text-[var(--accent)] underline underline-offset-2 transition-colors hover:text-[var(--accent-hover)]"
            >
              Terms of Participation
            </a>.
          </div>
        </div>
      </div>
    </section>
  );
};
