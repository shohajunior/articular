import React, { useEffect, useRef, useState } from 'react';

export interface RevealPart {
  text: string;
  className?: string;
}

interface RevealWordsProps {
  parts: RevealPart[];
  /** Base delay before the first word, ms */
  delay?: number;
  /** Delay between words, ms */
  stagger?: number;
  /** Optional external trigger (e.g. after intro). If omitted, triggers when scrolled into view. */
  start?: boolean;
  className?: string;
}

/**
 * Each word smoothly rises from below (masked). Plays once, only when the
 * element enters the viewport — no work is done while offscreen or after playing.
 */
export const RevealWords: React.FC<RevealWordsProps> = ({
  parts,
  delay = 0,
  stagger = 70,
  start,
  className = '',
}) => {
  const ref = useRef<HTMLSpanElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          io.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const active = inView && start !== false;
  let index = 0;

  return (
    <span ref={ref} className={className}>
      {parts.map((part, pi) =>
        part.text
          .split(' ')
          .filter(Boolean)
          .map((word, wi) => {
            const i = index++;
            return (
              <React.Fragment key={`${pi}-${wi}`}>
                <span className="reveal-word-mask">
                  <span
                    className={`reveal-word ${active ? 'reveal-word-in' : ''} ${part.className ?? ''}`}
                    style={{ animationDelay: `${delay + i * stagger}ms` }}
                  >
                    {word}
                  </span>
                </span>{' '}
              </React.Fragment>
            );
          })
      )}
    </span>
  );
};
