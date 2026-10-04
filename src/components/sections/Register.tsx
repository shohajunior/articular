import React, { useState } from 'react';
import { siteData } from '../../data/site';
import { Send, CheckCircle2, ArrowRight } from 'lucide-react';

interface RegisterProps {
  onOpenLegal: (docKey: 'privacy' | 'terms') => void;
}

export const Register: React.FC<RegisterProps> = ({ onOpenLegal }) => {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    region: 'Tashkent City',
    note: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  return (
    <section id="register" className="border-t border-[var(--line)] bg-[var(--surface)] py-20">
      <div className="mx-auto max-w-[1140px] px-6">
        <div className="overflow-hidden rounded-3xl border border-[var(--line)] bg-[var(--bg)] p-8 sm:p-12 shadow-sm">
          <div className="grid gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
            {/* Left Box: Primary Telegram Bot CTA */}
            <div>
              <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                Season 2026 Registration
              </span>
              <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
                Register via official{' '}
                <span className="font-serif-italic text-[var(--accent)]">Telegram bot</span>
              </h2>
              <p className="mt-3 text-sm text-[var(--ink-muted)] sm:text-base">
                All team and individual registrations, rules verification, and schedule updates are handled through our dedicated Telegram bot.
              </p>

              {/* Tournament Perks */}
              <ul className="mt-6 space-y-2.5 text-xs text-[var(--ink-muted)] sm:text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>Teams of 2–5 students or individual competitors</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>Eligible for all 14 regions of Uzbekistan</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>Official Uzcosmos Agency credentials for finalists</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-4 w-4 text-[var(--accent)] shrink-0" />
                  <span>Free registration & participation</span>
                </li>
              </ul>

              {/* Primary Bot Button */}
              <div className="mt-8">
                <a
                  href={siteData.links.bot}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-3 rounded-full bg-[var(--accent)] px-8 py-3.5 text-sm font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
                >
                  <Send className="h-4 w-4" />
                  <span>Launch @articularuz_tgbot</span>
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </a>
              </div>
            </div>

            {/* Right Box: Quick School/Mentor Web Inquiry */}
            <div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 sm:p-8">
              <h3 className="text-base font-bold text-[var(--ink)]">
                School & Mentor Inquiries
              </h3>
              <p className="mt-1 text-xs text-[var(--ink-muted)]">
                Have questions regarding school partnership or regional participation? Leave a note.
              </p>

              {formSubmitted ? (
                <div className="mt-6 rounded-xl border border-[var(--line)] bg-[var(--accent-tint)] p-5 text-center">
                  <CheckCircle2 className="mx-auto h-7 w-7 text-[var(--accent)]" />
                  <div className="mt-2 text-sm font-bold text-[var(--ink)]">
                    Inquiry Received
                  </div>
                  <div className="mt-1 text-xs text-[var(--ink-muted)]">
                    Our team will contact you or you can message directly at{' '}
                    <a
                      href={siteData.links.channel}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold text-[var(--accent)] underline"
                    >
                      @articularuz
                    </a>.
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[var(--ink-muted)]">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Jasur Aliev"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[var(--ink-muted)]">
                      Telegram Username or Phone
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="@username or +998..."
                      value={formData.contact}
                      onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
                      className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
                    />
                  </div>

                  <div>
                    <label className="mb-1 block text-xs font-semibold text-[var(--ink-muted)]">
                      Region
                    </label>
                    <select
                      value={formData.region}
                      onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                      className="w-full rounded-full border border-[var(--line)] bg-[var(--bg)] px-4 py-2 text-xs text-[var(--ink)] outline-none transition-colors focus:border-[var(--accent)]"
                    >
                      {siteData.regions.map((r) => (
                        <option key={r.id} value={r.name}>
                          {r.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full rounded-full bg-[var(--accent)] py-2.5 text-xs font-semibold text-[var(--accent-contrast)] transition-colors hover:bg-[var(--accent-hover)]"
                  >
                    Submit Quick Inquiry
                  </button>

                  <div className="text-[11px] text-[var(--ink-dim)]">
                    By submitting, you agree to our{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal('privacy')}
                      className="text-[var(--accent)] underline"
                    >
                      Privacy Policy
                    </button>{' '}
                    and{' '}
                    <button
                      type="button"
                      onClick={() => onOpenLegal('terms')}
                      className="text-[var(--accent)] underline"
                    >
                      Terms of Participation
                    </button>.
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
