import React, { useState, useEffect, useRef } from 'react';

interface RocketIntroProps {
  onComplete?: () => void;
}

export const RocketIntro: React.FC<RocketIntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const [veilOpacity, setVeilOpacity] = useState(0);
  const [rocketProgress, setRocketProgress] = useState(-0.15); // -0.15 to 1.15
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if already played in this tab session
    const played = sessionStorage.getItem('articular-rocket-played');
    if (played) {
      setActive(false);
      onComplete?.();
      return;
    }

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isDark = document.documentElement.classList.contains('dark');
    const smokeBase = isDark ? [16, 20, 28] : [238, 241, 246];

    // Audio Swoosh
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const audio = new AudioCtx();
        const now = audio.currentTime;
        // White noise buffer for thruster swoosh
        const bufferSize = audio.sampleRate * 1.5;
        const noiseBuffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audio.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = audio.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(200, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.6);
        filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);

        const gain = audio.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.08, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.3);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(audio.destination);

        whiteNoise.start(now);
      }
    } catch {
      // Audio autoplay policy handled silently
    }

    // Particle simulation
    interface SmokeParticle {
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      growthRate: number;
      vx: number;
      vy: number;
      alpha: number;
      decay: number;
    }

    const particles: SmokeParticle[] = [];
    const startTime = performance.now();
    const duration = 1200; // rocket flight time in ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / duration, 1.25);
      
      // Rocket position (-0.15 -> 1.15 of width)
      const curX = -0.15 * width + progress * (1.3 * width);
      const curY = height * 0.5 + Math.sin(progress * Math.PI) * -30;
      setRocketProgress(curX / width);

      // Progressive screen veil to guarantee 100% coverage
      if (progress < 0.4) {
        setVeilOpacity(progress * 1.5);
      } else if (progress < 1.0) {
        setVeilOpacity(Math.min(1, 0.6 + (progress - 0.4) * 0.8));
      } else if (progress >= 1.0 && elapsed < 1850) {
        // Dissolving smoke
        const fadeProgress = (elapsed - 1200) / 650;
        setVeilOpacity(Math.max(0, 1 - fadeProgress));
      }

      // Spawn smoke puffs behind rocket
      if (progress < 1.1) {
        for (let i = 0; i < 4; i++) {
          particles.push({
            x: curX - 25 - Math.random() * 20,
            y: curY + (Math.random() - 0.5) * 45,
            radius: 25 + Math.random() * 15,
            maxRadius: Math.max(height * 0.6, 280) + Math.random() * 80,
            growthRate: 4 + Math.random() * 3,
            vx: -1.5 + (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 4,
            alpha: 0.85,
            decay: 0.003
          });
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Update and draw particles
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy;
        if (p.radius < p.maxRadius) {
          p.radius += p.growthRate;
        }
        
        if (elapsed > 1200) {
          p.alpha -= 0.035;
        }

        if (p.alpha <= 0) {
          particles.splice(i, 1);
          continue;
        }

        ctx.beginPath();
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius);
        grad.addColorStop(0, `rgba(${smokeBase[0]}, ${smokeBase[1]}, ${smokeBase[2]}, ${p.alpha * 0.6})`);
        grad.addColorStop(0.5, `rgba(${smokeBase[0]}, ${smokeBase[1]}, ${smokeBase[2]}, ${p.alpha * 0.3})`);
        grad.addColorStop(1, `rgba(${smokeBase[0]}, ${smokeBase[1]}, ${smokeBase[2]}, 0)`);
        ctx.fillStyle = grad;
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      if (elapsed < 1850) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        finish();
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    const finish = () => {
      setActive(false);
      sessionStorage.setItem('articular-rocket-played', 'true');
      onComplete?.();
    };

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setActive(false);
    sessionStorage.setItem('articular-rocket-played', 'true');
    onComplete?.();
  };

  if (!active) return null;

  const rocketX = rocketProgress * 100;
  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden transition-opacity duration-300"
      style={{
        backgroundColor: isDark ? `rgba(9, 11, 16, ${veilOpacity})` : `rgba(250, 250, 248, ${veilOpacity})`
      }}
    >
      {/* Particle Canvas */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none" />

      {/* Flying Rocket with Plasma Engine Trail */}
      {rocketProgress < 1.15 && (
        <div
          className="absolute pointer-events-none transition-transform duration-75"
          style={{
            left: `${rocketX}%`,
            top: '50%',
            transform: 'translate(-50%, -50%) rotate(10deg)'
          }}
        >
          {/* Flame & Plasma Jet */}
          <div className="absolute -left-12 top-1/2 -translate-y-1/2 flex items-center">
            <div className="h-4 w-12 rounded-full bg-cyan-400 blur-[2px] animate-pulse" />
            <div className="h-6 w-8 -ml-3 rounded-full bg-[var(--accent)] blur-[4px]" />
          </div>

          {/* Sleek Aerospace Rocket SVG */}
          <svg
            className="h-14 w-14 text-[var(--accent)] drop-shadow-[0_0_15px_rgba(31,94,234,0.6)]"
            viewBox="0 0 24 24"
            fill="currentColor"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" />
            <path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" />
            <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
            <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
          </svg>
        </div>
      )}

      {/* Subtle Skip Prompt */}
      <div className="absolute bottom-6 right-6 z-20 rounded-full border border-[var(--line)] bg-[var(--surface)] px-3.5 py-1 text-[11px] font-medium text-[var(--ink-muted)] shadow-sm backdrop-blur-md transition-opacity">
        Click anywhere to skip
      </div>
    </div>
  );
};
