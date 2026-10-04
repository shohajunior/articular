import React, { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export const BackToTop: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Show when scrolled past Hero section (approx 520px)
      const scrollY = window.scrollY || window.pageYOffset;
      if (scrollY > 520) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      className={`group fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full border border-[var(--line)] bg-[var(--header-bg)] px-4 py-2.5 text-xs font-semibold text-[var(--ink)] shadow-lg backdrop-blur-xl transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] hover:-translate-y-1 hover:border-[var(--accent)] hover:bg-[var(--surface-elevated)] hover:text-[var(--accent)] hover:shadow-xl ${
        isVisible
          ? 'translate-y-0 opacity-100 pointer-events-auto'
          : 'translate-y-5 opacity-0 pointer-events-none'
      }`}
    >
      <span className="hidden sm:inline">Back to top</span>
      <span className="sm:hidden font-mono text-[11px]">Top</span>
      <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[var(--accent-tint)] text-[var(--accent)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:bg-[var(--accent)] group-hover:text-white">
        <ArrowUp className="h-3 w-3" />
      </div>
    </button>
  );
};

export default BackToTop;
