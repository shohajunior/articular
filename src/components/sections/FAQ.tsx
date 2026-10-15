import React, { useState } from 'react';
import { siteData } from '../../data/site';
import { RevealWords } from '../ui/RevealWords';
import { HelpCircle, ChevronDown, MessageCircleQuestion } from 'lucide-react';

export const FAQ: React.FC = () => {
  // Support independent multi-expand in 2 columns, with first question open by default
  const [openIndices, setOpenIndices] = useState<Set<number>>(() => new Set([0]));

  const toggle = (idx: number) => {
    setOpenIndices((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) {
        next.delete(idx);
      } else {
        next.add(idx);
      }
      return next;
    });
  };

  const mid = Math.ceil(siteData.faq.length / 2);
  const col1 = siteData.faq.slice(0, mid);
  const col2 = siteData.faq.slice(mid);

  const renderCard = (item: { question: string; answer: string }, idx: number) => {
    const isOpen = openIndices.has(idx);

    return (
      <div
        key={idx}
        className={`group overflow-hidden rounded-2xl border bg-[var(--surface)] transition-all duration-300 hover:border-[var(--line-strong)] ${
          isOpen
            ? 'border-[var(--accent)]/40 shadow-sm'
            : 'border-[var(--line)]'
        }`}
      >
        <button
          type="button"
          onClick={() => toggle(idx)}
          className="flex w-full items-center justify-between gap-4 p-5 sm:p-6 text-left cursor-pointer transition-colors"
          aria-expanded={isOpen}
        >
          <span
            className={`text-base sm:text-lg font-bold transition-colors duration-200 ${
              isOpen ? 'text-[var(--accent)]' : 'text-[var(--ink)]'
            }`}
          >
            {item.question}
          </span>
          <div
            className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border bg-[var(--bg)] transition-all duration-300 ${
              isOpen
                ? 'rotate-180 text-[var(--accent)] border-[var(--accent)]/50 bg-[var(--accent-tint)]'
                : 'border-[var(--line)] text-[var(--ink-muted)] group-hover:border-[var(--line-strong)]'
            }`}
          >
            <ChevronDown className="h-4 w-4" />
          </div>
        </button>

        {/* CSS Grid Smooth Dynamic-Height Accordion Transition */}
        <div
          className={`grid transition-[grid-template-rows,opacity] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
          }`}
        >
          <div className="overflow-hidden">
            <div className="px-5 pb-6 pt-1 sm:px-6">
              <div className="h-px w-full bg-[var(--line)] mb-4 opacity-60" />
              <p className="text-sm sm:text-base leading-relaxed text-[var(--ink-muted)]">
                {item.answer}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="faq"
      className="relative overflow-hidden border-t border-[var(--line)] bg-[var(--bg)] py-20 sm:py-28 transition-colors duration-300"
    >
      <div className="mx-auto max-w-[1240px] px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full border border-[var(--accent)]/30 bg-[var(--accent-tint)] px-3.5 py-1 text-xs font-semibold text-[var(--accent)]">
            <HelpCircle className="h-3.5 w-3.5" />
            <span className="font-mono-tag tracking-wider uppercase">FAQ</span>
          </div>

          <h2 className="mt-4 text-3xl font-extrabold tracking-tight text-[var(--ink)] sm:text-4xl lg:text-5xl">
            <RevealWords parts={[{ text: 'Frequently asked questions' }]} />
          </h2>

          <p className="mt-4 text-base leading-relaxed text-[var(--ink-muted)]">
            Everything you need to know about participating in ArticularUZ events.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-start">
          {/* Column 1 */}
          <div className="space-y-4">
            {col1.map((item, i) => renderCard(item, i))}
          </div>

          {/* Column 2 */}
          <div className="space-y-4">
            {col2.map((item, i) => renderCard(item, mid + i))}
          </div>
        </div>

        {/* Telegram question prompt */}
        <div className="mt-12 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-6 text-center shadow-xs">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 text-sm text-[var(--ink)]">
            <MessageCircleQuestion className="h-5 w-5 text-[var(--accent)] shrink-0" />
            <span>Have a specific question not listed here?</span>
            <a
              href={siteData.links.bot}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-[var(--accent)] hover:underline inline-flex items-center gap-1"
            >
              Ask our team on Telegram &rarr;
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
