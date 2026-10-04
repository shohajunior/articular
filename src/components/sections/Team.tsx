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

  return (
    <section
      id="team"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden bg-dotted-pattern py-24 transition-colors"
    >
      {/* Interactive Subtle Blue Cursor Spotlight */}
      <div
        className="pointer-events-none absolute inset-0 transition-opacity duration-500 ease-out"
        style={{
          opacity: isHovered ? 1 : 0,
          background: `radial-gradient(650px circle at ${mousePos.x}px ${mousePos.y}px, rgba(31, 94, 234, 0.08), transparent 75%)`,
        }}
      />

      <div className="relative mx-auto max-w-[1140px] px-6">
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

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.team.map((member) => (
            <div
              key={member.id}
              className="group flex flex-col overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-md transition-all duration-300 hover:-translate-y-2 hover:border-[var(--accent)]/50 hover:shadow-[0_16px_36px_rgba(31,94,234,0.12)]"
            >
              {/* Top Photo Container */}
              <div className="relative aspect-[3/4] w-full overflow-hidden bg-slate-900">
                <img
                  src={member.photo}
                  alt={member.name}
                  className="h-full w-full object-cover object-top transition-transform duration-500 group-hover:scale-105"
                />

                {/* Floating Top-Right Pill Badge (Volontyorlar Style) */}
                <div className="absolute top-3.5 right-3.5 rounded-full border border-white/20 bg-black/65 px-3 py-1 text-xs font-semibold text-white backdrop-blur-md shadow-sm">
                  {member.badge}
                </div>
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

                    {/* Quick Social Redirect Buttons (Official Telegram, Instagram, LinkedIn) */}
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
