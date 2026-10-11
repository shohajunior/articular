import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { NewsGrid } from '../ui/NewsGrid';
import { RevealWords } from '../ui/RevealWords';
import { useNews } from '../../lib/useContent';

export const NewsPage: React.FC = () => {
  const { data: news, loading } = useNews();

  useEffect(() => {
    window.scrollTo({ top: 0 });
    const prev = document.title;
    document.title = 'News — ArticularUZ';
    return () => {
      document.title = prev;
    };
  }, []);

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--header-bg)] backdrop-blur-xl">
        <div className="mx-auto flex max-w-[1340px] items-center px-6 py-4 lg:px-8">
          <a
            href="#/"
            className="group flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-2 text-xs font-semibold text-[var(--ink)] transition-all hover:border-[var(--line-strong)] hover:bg-[var(--surface-elevated)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Tournament</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-[1340px] px-6 py-14 sm:py-20 lg:px-8">
        <h1 className="mb-10 text-4xl font-bold tracking-tight sm:text-5xl">
          <RevealWords parts={[{ text: 'All news' }]} />
        </h1>
        {!loading && news.length === 0 ? (
          <p className="text-[var(--ink-muted)]">No news yet — check back soon.</p>
        ) : (
          <NewsGrid items={news} loading={loading} skeletonCount={6} />
        )}
      </main>
    </div>
  );
};
