import React, { useEffect } from 'react';
import { ArrowLeft } from 'lucide-react';
import { Header } from '../layout/Header';
import { Footer } from '../layout/Footer';
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
    <div className="min-h-screen flex flex-col bg-[var(--bg)] text-[var(--ink)] transition-colors duration-300">
      {/* Floating Pill Navbar with Theme Toggle, Logo and Navigation */}
      <Header />

      <main className="mx-auto w-full max-w-[1340px] flex-1 px-6 pt-32 pb-20 sm:pt-40 sm:pb-28 lg:px-8">
        <div className="mb-4">
          <a
            href="#/"
            className="group inline-flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--surface)] px-4 py-1.5 text-xs font-semibold text-[var(--ink-muted)] transition-all hover:border-[var(--line-strong)] hover:text-[var(--accent)] hover:bg-[var(--surface-elevated)]"
          >
            <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
            <span>Back to Tournament</span>
          </a>
        </div>

        <div className="mb-12">
          <span className="font-mono-tag text-xs font-semibold uppercase tracking-wider text-[var(--accent)]">
            Tournament Press & Updates
          </span>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-[var(--ink)] sm:text-5xl">
            <RevealWords parts={[{ text: 'All news from ArticularUZ' }]} />
          </h1>
          <p className="mt-3 text-base text-[var(--ink-muted)] max-w-2xl">
            Official announcements, regional schedules, scientific patron updates, and defense guidelines.
          </p>
        </div>

        {!loading && news.length === 0 ? (
          <div className="rounded-3xl border border-[var(--line)] bg-[var(--surface)] p-12 text-center">
            <p className="text-base text-[var(--ink-muted)]">No news yet — check back soon.</p>
          </div>
        ) : (
          <NewsGrid items={news} loading={loading} skeletonCount={6} />
        )}
      </main>

      {/* Footer with legal navigation */}
      <Footer onNavigateLegal={(doc) => { window.location.hash = `#/${doc}`; }} />
    </div>
  );
};
