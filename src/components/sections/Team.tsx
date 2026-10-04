import React from 'react';
import { siteData } from '../../data/site';
import { TelegramIcon, InstagramIcon, LinkedinIcon } from '../ui/SocialIcons';

export const Team: React.FC = () => {
  return (
    <section id="team" className="py-20">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="mb-12">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Leadership
          </span>
          <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
            Meet the{' '}
            <span className="font-serif-italic text-[var(--accent)]">organizers</span>
          </h2>
          <p className="mt-2 text-sm text-[var(--ink-muted)]">
            Student leaders, academic mentors, and regional chapter coordinators.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {siteData.team.map((member) => (
            <div
              key={member.id}
              className="flex flex-col justify-between rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-6 shadow-sm transition-all duration-300 hover:border-[var(--line-strong)] hover:shadow-md"
            >
              <div>
                {/* Clean Circular Avatar Placeholder with Initials */}
                <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-[var(--accent-tint)] text-base font-bold text-[var(--accent)]">
                  {member.initials}
                </div>

                <h3 className="text-base font-bold text-[var(--ink)]">
                  {member.name}
                </h3>
                <div className="mt-0.5 text-xs font-semibold text-[var(--accent)]">
                  {member.role}
                </div>

                <p className="mt-3 text-xs leading-relaxed text-[var(--ink-muted)]">
                  {member.bio}
                </p>
              </div>

              {/* Social Connections */}
              <div className="mt-6 flex items-center gap-2 border-t border-[var(--line)] pt-4">
                {member.socials?.telegram && (
                  <a
                    href={member.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
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
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
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
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line)] text-[var(--ink-dim)] transition-colors hover:border-[var(--line-strong)] hover:text-[var(--ink)]"
                    title="LinkedIn"
                    aria-label={`${member.name} LinkedIn`}
                  >
                    <LinkedinIcon className="h-3.5 w-3.5" />
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
