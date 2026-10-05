import React, { useState, useEffect, useMemo } from 'react';

interface SoftTypingTextProps {
  phrases: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  className?: string;
  caretClassName?: string;
}

export const SoftTypingText: React.FC<SoftTypingTextProps> = ({
  phrases,
  typingSpeed = 65,
  deletingSpeed = 32,
  pauseDuration = 2300,
  className = '',
  caretClassName = '',
}) => {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const currentPhrase = phrases[phraseIndex] || '';

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;

    if (!isDeleting) {
      // Typing mode
      if (charIndex < currentPhrase.length) {
        // Natural typing cadence: micro pause on punctuation
        const char = currentPhrase[charIndex];
        const extraDelay = char === '.' || char === ',' || char === '!' ? 140 : 0;

        timer = setTimeout(() => {
          setCharIndex((prev) => prev + 1);
        }, typingSpeed + extraDelay);
      } else {
        // Finished typing current phrase, pause before deleting
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, pauseDuration);
      }
    } else {
      // Deleting mode
      if (charIndex > 0) {
        timer = setTimeout(() => {
          setCharIndex((prev) => prev - 1);
        }, deletingSpeed);
      } else {
        // Finished deleting, transition smoothly to next phrase
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, phraseIndex, currentPhrase, typingSpeed, deletingSpeed, pauseDuration, phrases.length]);

  const displayedCharacters = useMemo(() => {
    return currentPhrase.slice(0, charIndex).split('');
  }, [currentPhrase, charIndex]);

  return (
    <span className={`inline-flex items-baseline ${className}`} aria-label={currentPhrase}>
      {/* Visual animated characters with soft entrance */}
      <span className="inline-block" aria-hidden="true">
        {displayedCharacters.map((char, idx) => (
          <span
            key={`${phraseIndex}-${idx}`}
            className="inline-block animate-soft-char-in"
          >
            {char === ' ' ? '\u00A0' : char}
          </span>
        ))}
      </span>

      {/* Soft blinking cursor */}
      <span
        aria-hidden="true"
        className={`inline-block w-[2.5px] h-[0.88em] ml-1.5 align-baseline rounded-full bg-[var(--accent)] shadow-[0_0_8px_var(--accent)] animate-soft-caret ${caretClassName}`}
      />
    </span>
  );
};
