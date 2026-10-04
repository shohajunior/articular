import React, { useState } from 'react';
import { siteData } from '../../data/site';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

export const Team: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  // Helper to extract initials (e.g. Temurbek Muslimov -> TM)
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map((n) => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  return (
    <section
      id="team"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-[var(--surface)] py-24 transition-colors"
    >
      {/* 1. Base Subtle Dotted Grid */}
      <div className="pointer-events-none absolute inset-0 bg-dotted-pattern opacity-70" />

      {/* 2. Interactive Glowing Dots: Only the dots themselves illuminate under the cursor */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: isHovered ? 1 : 0,
          backgroundImage: 'radial-gradient(var(--accent) 1.75px, transparent 1.75px)',
          backgroundSize: '24px 24px',
          WebkitMaskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 15%, transparent 100%)`,
          maskImage: `radial-gradient(200px circle at ${mousePos.x}px ${mousePos.y}px, black 15%, transparent 100%)`,
          filter: 'drop-shadow(0 0 2.5px var(--accent))',
        }}
      />

      <div className="relative mx-auto max-w-[1340px] px-6 lg:px-8">
        <div className="mb-12">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Leadership
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Meet the{' '}
            <span className="font-serif-italic text-[var(--accent)]">organizers</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Student directors, academic leaders, and regional chapter coordinators.
          </p>
        </div>

        {/* Clean Organizer Cards without Photos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.team.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col justify-between rounded-[28px] border border-[var(--line)] bg-[#0a233f] p-6 text-white shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_16px_36px_rgba(31,94,234,0.16)] min-h-[220px]"
            >
              {/* Card Top: Monogram Avatar & Organizer Info */}
              <div>
                <div className="mb-4 flex items-center justify-between">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/15 bg-white/10 font-mono text-sm font-bold tracking-wider text-sky-300 transition-colors group-hover:border-sky-400/40 group-hover:bg-sky-400/10">
                    {getInitials(member.name)}
                  </div>
                  <span className="rounded-full border border-white/15 bg-white/10 px-3 py-1 text-[11px] font-medium text-slate-300">
                    {member.department}
                  </span>
                </div>

                <h3 className="text-lg font-bold tracking-tight text-white group-hover:text-sky-200 transition-colors">
                  {member.name}
                </h3>
                <div className="mt-1 text-xs font-semibold text-sky-300">
                  {member.role}
                </div>
              </div>

              {/* Card Bottom: Separator & Social Quick Redirect Buttons */}
              <div className="mt-6">
                <div className="mb-4 border-t border-white/15" />
                <div className="flex items-center justify-between gap-2">
                  <span className="text-xs font-medium text-slate-400">
                    Connect:
                  </span>

                  <div className="flex shrink-0 items-center gap-2">
                    {member.socials?.telegram && (
                      <a
                        href={member.socials.telegram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                        title="Telegram"
                        aria-label={`${member.name} Telegram`}
                      >
                        <TelegramIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.instagram && (
                      <a
                        href={member.socials.instagram}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                        title="Instagram"
                        aria-label={`${member.name} Instagram`}
                      >
                        <InstagramIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                    {member.socials?.linkedin && (
                      <a
                        href={member.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                        title="LinkedIn"
                        aria-label={`${member.name} LinkedIn`}
                      >
                        <LinkedinIcon className="h-3.5 w-3.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
