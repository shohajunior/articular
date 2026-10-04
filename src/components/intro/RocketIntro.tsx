import React, { useState, useEffect } from 'react';

export const RocketIntro: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [launching, setLaunching] = useState(false);

  useEffect(() => {
    const seen = sessionStorage.getItem('articular-rocket-played');
    if (seen) return;

    setVisible(true);

    const playChime = () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        const ctx = new AudioCtx();
        const now = ctx.currentTime;

        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'sine';
        osc.frequency.setValueAtTime(523.25, now);
        osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.25);

        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.05);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.0);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now);
        osc.stop(now + 1.0);
      } catch {
        // Silently handled
      }
    };

    const timer1 = setTimeout(() => {
      setLaunching(true);
      playChime();
    }, 200);

    const timer2 = setTimeout(() => {
      dismiss();
    }, 1250);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
    };
  }, []);

  const dismiss = () => {
    setVisible(false);
    sessionStorage.setItem('articular-rocket-played', 'true');
  };

  if (!visible) return null;

  return (
    <div
      onClick={dismiss}
      className="fixed inset-0 z-50 flex cursor-pointer flex-col items-center justify-center bg-[var(--bg)] transition-opacity duration-300"
    >
      <div className="relative text-center">
        <div
          className={`mx-auto mb-4 flex h-14 w-14 items-center justify-center text-[var(--accent)] transition-transform duration-700 ease-out ${
            launching ? '-translate-y-20 scale-90 opacity-90' : 'translate-y-0 scale-100'
          }`}
        >
          <svg
            className="h-10 w-10"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
        <div className="font-mono-tag text-xs tracking-widest text-[var(--ink-muted)]">
          ARTICULARUZ · 2026
        </div>
      </div>
      <div className="absolute bottom-6 text-[11px] text-[var(--ink-dim)]">
        Click to skip
      </div>
    </div>
  );
};
