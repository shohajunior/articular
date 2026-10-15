import React from 'react';
import { siteData } from '../../data/site';
import { RevealWords } from '../ui/RevealWords';
import { Award, ShieldCheck, CheckCircle2, FileText, Expand } from 'lucide-react';
import { LightboxItem } from '../ui/LightboxModal';

interface CertificatesProps {
  onPhotoClick?: (item: LightboxItem) => void;
}

export const Certificates: React.FC<CertificatesProps> = ({ onPhotoClick }) => {
  const cert = siteData.certificates;

  const handleOpenPhoto = () => {
    if (onPhotoClick) {
      onPhotoClick({
        src: './assets/certificates.jpg',
        title: 'Official ArticularUZ Certificates',
        subtitle: 'Recognized by Uzcosmos Agency & Youth Volunteers Club',
        badge: cert.badge,
        category: 'Official Recognition',
      });
    }
  };

  return (
    <section
      id="certificates"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--surface)] py-20 sm:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Left Text Column */}
          <div className="lg:col-span-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3.5 py-1 text-xs font-semibold text-[var(--accent)]">
              <Award className="h-3.5 w-3.5" />
              <span className="font-mono-tag tracking-wider uppercase">{cert.badge}</span>
            </div>

            <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
              <RevealWords parts={[{ text: cert.heading }]} />
            </h2>

            <p className="mt-5 text-base sm:text-lg leading-relaxed text-[var(--ink-muted)]">
              {cert.desc}
            </p>

            {/* Highlights List */}
            <div className="mt-8 space-y-4">
              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-tint)] text-[var(--accent)]">
                  <CheckCircle2 className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">Podium Honors Only</h4>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                    Exclusively presented to the top three finalist teams of each competitive tournament round.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-tint)] text-[var(--accent)]">
                  <FileText className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">Specific Project Citation</h4>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                    Each credential details the actual engineering problem solved, from Martian surface transport to orbital orbital mechanics.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent-tint)] text-[var(--accent)]">
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[var(--ink)]">Double Agency Endorsement</h4>
                  <p className="text-xs sm:text-sm text-[var(--ink-muted)]">
                    Co-signed and officially recognized by Uzcosmos Space Agency and the Youth Volunteers Club of Uzbekistan.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Image Frame */}
          <div className="lg:col-span-6">
            <div
              onClick={handleOpenPhoto}
              className="group relative cursor-pointer overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--bg)] shadow-md transition-all duration-500 hover:-translate-y-2 hover:border-[var(--accent)] hover:shadow-[0_20px_40px_rgba(2,132,199,0.15)]"
            >
              <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100 dark:bg-slate-800">
                <img
                  src="./assets/certificates.jpg"
                  alt="Official ArticularUZ Certificates"
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-40" />

                <div className="absolute top-4 right-4 flex h-9 w-9 items-center justify-center rounded-full bg-black/60 text-white opacity-0 backdrop-blur-md transition-all duration-300 group-hover:opacity-100 group-hover:scale-110">
                  <Expand className="h-4 w-4" />
                </div>

                <div className="absolute bottom-4 left-4 right-4 rounded-2xl bg-black/70 p-4 backdrop-blur-md text-white">
                  <div className="font-mono-tag text-[10px] font-bold uppercase tracking-wider text-sky-300">
                    Official Recognition
                  </div>
                  <div className="text-sm font-bold mt-0.5">
                    Official ArticularUZ Winner Certificates
                  </div>
                  <div className="text-xs text-white/70 mt-0.5">
                    Co-signed with Uzcosmos Agency & Youth Volunteers Club
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
