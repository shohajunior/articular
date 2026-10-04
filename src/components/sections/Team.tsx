import React, { useState } from 'react';
import { siteData } from '../../data/site';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';
import { User } from 'lucide-react';

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

        {/* Wider Cards Grid with Photo Slots Ready for Real Photos */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.team.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-[0_16px_36px_rgba(31,94,234,0.12)]"
            >
              {/* Top Photo Frame / Placeholder Slot: Preserves full geometry for new photos */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-[#07192e] flex items-center justify-center border-b border-white/10 transition-colors group-hover:bg-[#0a233f]">
                {member.photo ? (
                  <img
                    src={member.photo}
                    alt={member.name}
                    className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  />
                ) : (
                  <div className="flex flex-col items-center justify-center gap-3 text-slate-400/60 transition-colors group-hover:text-slate-300">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl border border-white/15 bg-white/5 transition-transform duration-300 group-hover:scale-105 group-hover:border-sky-400/30 group-hover:bg-sky-400/10">
                      <User className="h-8 w-8 text-slate-400 group-hover:text-sky-300 transition-colors" />
                    </div>
                    <span className="font-mono text-[10px] font-semibold uppercase tracking-wider text-slate-400/80">
                      Photo Slot
                    </span>
                  </div>
                )}
              </div>

              {/* Bottom Dark Navy Info Box */}
              <div className="flex flex-1 flex-col justify-between bg-[#0a233f] p-5 text-white">
                <div>
                  <h3 className="text-base font-bold tracking-tight text-white sm:text-lg">
                    {member.name}
                  </h3>
                  <div className="mt-0.5 text-xs font-semibold text-sky-300">
                    {member.role}
                  </div>
                </div>

                <div>
                  {/* Subtle Separator Line */}
                  <div className="my-3.5 border-t border-white/15" />

                  {/* Bottom Row: Department on left + Small Social Buttons on right */}
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-xs font-medium text-slate-300 truncate">
                      {member.department}
                    </span>

                    {/* Quick Social Redirect Buttons (Telegram, Instagram, LinkedIn) */}
                    <div className="flex shrink-0 items-center gap-1.5">
                      {member.socials?.telegram && (
                        <a
                          href={member.socials.telegram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                          title="Telegram"
                          aria-label={`${member.name} Telegram`}
                        >
                          <TelegramIcon className="h-3 w-3" />
                        </a>
                      )}
                      {member.socials?.instagram && (
                        <a
                          href={member.socials.instagram}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                          title="Instagram"
                          aria-label={`${member.name} Instagram`}
                        >
                          <InstagramIcon className="h-3 w-3" />
                        </a>
                      )}
                      {member.socials?.linkedin && (
                        <a
                          href={member.socials.linkedin}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex h-7 w-7 items-center justify-center rounded-full border border-white/15 bg-white/10 text-white transition-all hover:border-white/40 hover:bg-white/25 hover:scale-105"
                          title="LinkedIn"
                          aria-label={`${member.name} LinkedIn`}
                        >
                          <LinkedinIcon className="h-3 w-3" />
                        </a>
                      )}
                    </div>
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
