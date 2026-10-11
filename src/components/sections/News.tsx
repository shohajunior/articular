import React from 'react';
import { ArrowRight } from 'lucide-react';
import { RevealWords } from '../ui/RevealWords';
import { NewsGrid } from '../ui/NewsGrid';
import { useNews } from '../../lib/useContent';

export const News: React.FC = () => {
  const { data: news, loading } = useNews(3);

  return (
    <section id="news" className="relative border-t border-[var(--line)] bg-[var(--bg)] py-20 transition-colors">
      <div className="mx-auto max-w-[1340px] px-6 lg:px-8">
        <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
          <div>
            <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
              Latest Updates
            </span>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-[var(--ink)] sm:text-4xl">
              <RevealWords parts={[{ text: 'News from ArticularUZ' }]} />
            </h2>
          </div>
          <a
            href="#/news"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-[var(--line)] bg-[var(--surface)] px-5 py-2.5 text-sm font-semibold text-[var(--ink)] shadow-sm transition-all hover:border-[var(--line-strong)] hover:shadow-md sm:self-auto"
          >
            See all news
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </div>

        <NewsGrid items={news} loading={loading} />
      </div>
    </section>
  );
};
