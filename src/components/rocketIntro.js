/**
 * Rocket Micro-Intro Animation
 * Brief 1.2s vector rocket launch with harmonic Web Audio chime.
 * Auto-dismisses and stores in sessionStorage.
 */
export function initRocketIntro() {
  const introEl = document.getElementById('rocket-intro-overlay');
  if (!introEl) return;

  const alreadyPlayed = sessionStorage.getItem('articular-rocket-played');
  if (alreadyPlayed) {
    introEl.remove();
    return;
  }

  // Play harmonic chime using Web Audio API
  function playChime() {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const now = ctx.currentTime;
      // Soft gentle chime: fundamental + harmonic
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.type = 'sine';
      osc1.frequency.setValueAtTime(523.25, now); // C5
      osc1.frequency.exponentialRampToValueAtTime(783.99, now + 0.3); // G5

      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(1046.5, now); // C6
      osc2.frequency.exponentialRampToValueAtTime(1567.98, now + 0.4); // G6

      gain.gain.setValueAtTime(0.001, now);
      gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.2);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start(now);
      osc2.start(now);
      osc1.stop(now + 1.2);
    } catch (e) {
      // Audio might be blocked by browser autoplay policy if no interaction yet
    }
  }

  // Trigger animation after slight delay
  setTimeout(() => {
    introEl.classList.add('animate-launch');
    playChime();
  }, 200);

  // Clean finish after 1.3s
  const finishTimeout = setTimeout(() => {
    dismiss();
  }, 1400);

  function dismiss() {
    clearTimeout(finishTimeout);
    introEl.classList.add('intro-fade-out');
    setTimeout(() => {
      introEl.remove();
    }, 400);
    sessionStorage.setItem('articular-rocket-played', 'true');
  }

  introEl.addEventListener('click', dismiss);
}
