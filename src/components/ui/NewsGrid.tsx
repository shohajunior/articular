import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import type { NewsItem } from '../../types/content';

const fmtDate = (iso: string) =>
  new Date(iso).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });

interface NewsGridProps {
  items: NewsItem[];
  loading?: boolean;
  skeletonCount?: number;
}

/** Cards grid + click-to-read modal. Shared by the landing section and the /news page. */
export const NewsGrid: React.FC<NewsGridProps> = ({ items, loading, skeletonCount = 3 }) => {
  const [open, setOpen] = useState<NewsItem | null>(null);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open]);

  if (loading) {
    return (
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)]">
            <div className="aspect-[16/10] animate-pulse bg-[var(--surface-elevated)]" />
            <div className="space-y-3 p-5">
              <div className="h-4 w-3/4 animate-pulse rounded bg-[var(--surface-elevated)]" />
              <div className="h-3 w-full animate-pulse rounded bg-[var(--surface-elevated)]" />
              <div className="h-3 w-2/3 animate-pulse rounded bg-[var(--surface-elevated)]" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((n) => (
          <button
            key={n.id}
            type="button"
            onClick={() => setOpen(n)}
            className="group flex cursor-pointer flex-col overflow-hidden rounded-2xl border border-[var(--line)] bg-[var(--surface)] text-left transition-all duration-300 hover:-translate-y-1 hover:border-[var(--line-strong)] hover:shadow-[var(--shadow-lg)]"
          >
            <div className="aspect-[16/10] overflow-hidden bg-[var(--surface-elevated)]">
              {n.image_url && (
                <img
                  src={n.image_url}
                  alt={n.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              )}
            </div>
            <div className="flex flex-1 flex-col p-5">
              <time className="font-mono-tag text-[11px] font-semibold uppercase tracking-wider text-[var(--accent)]">
                {fmtDate(n.created_at)}
              </time>
              <h3 className="mt-2 text-lg font-bold leading-snug tracking-tight text-[var(--ink)]">{n.title}</h3>
              <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-[var(--ink-muted)]">{n.description}</p>
            </div>
          </button>
        ))}
      </div>

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          onClick={() => setOpen(null)}
          role="dialog"
          aria-modal="true"
          aria-label={open.title}
        >
          <article
            className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[var(--line)] bg-[var(--surface)] shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setOpen(null)}
              className="absolute right-3 top-3 z-10 flex h-9 w-9 cursor-pointer items-center justify-center rounded-full bg-black/55 text-white backdrop-blur transition-colors hover:bg-black/75"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
            {open.image_url && <img src={open.image_url} alt={open.title} className="max-h-[360px] w-full object-cover" />}
            <div className="p-6 sm:p-8">
              <time className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
                {fmtDate(open.created_at)}
              </time>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-[var(--ink)]">{open.title}</h3>
              <p className="mt-4 whitespace-pre-line text-base leading-relaxed text-[var(--ink-muted)]">{open.description}</p>
            </div>
          </article>
        </div>
      )}
    </>
  );
};
