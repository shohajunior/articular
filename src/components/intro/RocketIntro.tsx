import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface RocketIntroProps {
  onComplete?: () => void;
}

export const RocketIntro: React.FC<RocketIntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const rocketWrapperRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredReveal = useRef(false);

  useEffect(() => {
    // Welcome screen always plays on every page load as requested
    sessionStorage.removeItem('articular-rocket-played');

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety fallback: guarantee Hero is revealed even if RAF is throttled in background tab
    const safetyTimer = setTimeout(() => {
      if (!hasTriggeredReveal.current) {
        hasTriggeredReveal.current = true;
        onComplete?.();
      }
    }, 150);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const isDark = document.documentElement.classList.contains('dark');

    // Pre-render soft volumetric smoke sprites onto offscreen canvases for 60-120fps GPU blitting
    const createSprite = (innerColor: string, outerColor: string, size = 128) => {
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      if (!octx) return oc;
      const r = size / 2;
      const grad = octx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, innerColor);
      grad.addColorStop(0.45, outerColor);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(r, r, r, 0, Math.PI * 2);
      octx.fill();
      return oc;
    };

    const spriteIgnition = createSprite(
      'rgba(255, 190, 80, 0.75)',
      'rgba(255, 110, 30, 0.35)',
      128
    );
    const spriteVapor = isDark
      ? createSprite('rgba(56, 68, 92, 0.6)', 'rgba(24, 32, 48, 0.2)', 128)
      : createSprite('rgba(235, 242, 252, 0.75)', 'rgba(205, 218, 236, 0.25)', 128);

    // Audio Thruster Swoosh with Web Audio API
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        const audio = new AudioCtx();
        const now = audio.currentTime;
        const bufferSize = audio.sampleRate * 1.8;
        const noiseBuffer = audio.createBuffer(1, bufferSize, audio.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        for (let i = 0; i < bufferSize; i++) {
          output[i] = Math.random() * 2 - 1;
        }

        const whiteNoise = audio.createBufferSource();
        whiteNoise.buffer = noiseBuffer;

        const filter = audio.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(180, now);
        filter.frequency.exponentialRampToValueAtTime(1600, now + 0.6);
        filter.frequency.exponentialRampToValueAtTime(250, now + 1.4);

        const gain = audio.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.09, now + 0.5);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);

        whiteNoise.connect(filter);
        filter.connect(gain);
        gain.connect(audio.destination);

        whiteNoise.start(now);
      }
    } catch {
      // Audio autoplay policy handled silently
    }

    interface SmokeCloud {
      x: number;
      y: number;
      vx: number;
      vy: number;
      radius: number;
      maxRadius: number;
      growthRate: number;
      alpha: number;
      decay: number;
      age: number;
      isHot: boolean;
    }

    interface Spark {
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      alpha: number;
      color: string;
      life: number;
      maxLife: number;
    }

    const smokeClouds: SmokeCloud[] = [];
    const sparks: Spark[] = [];
    const startTime = performance.now();
    const flightDuration = 1350; // rocket flight time across screen in ms

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const progress = Math.min(elapsed / flightDuration, 1.3);

      // Trigger underlying Hero reveal immediately as rocket takes off
      if (!hasTriggeredReveal.current && elapsed > 40) {
        hasTriggeredReveal.current = true;
        onComplete?.();
      }

      // Smooth supersonic trajectory across viewport
      const curX = -180 + progress * (width + 420);
      const curY = height * 0.48 + Math.sin(progress * Math.PI) * -35;

      const dY = Math.cos(progress * Math.PI) * -35 * (Math.PI / flightDuration);
      const dX = (width + 420) / flightDuration;
      const pitchAngle = Math.max(3, Math.min(16, (Math.atan2(dY, dX) * 180) / Math.PI + 7));

      // 1. Direct GPU updates: Zero React state re-renders during flight
      if (rocketWrapperRef.current) {
        if (curX < width + 280) {
          rocketWrapperRef.current.style.transform = `translate3d(${curX}px, ${curY}px, 0) translate(-50%, -50%) rotate(${pitchAngle}deg)`;
        } else {
          rocketWrapperRef.current.style.display = 'none';
        }
      }

      if (curtainRef.current) {
        const topPct = Math.max(0, Math.min(100, (curX / width) * 100));
        const bottomPct = Math.max(0, Math.min(100, ((curX - 70) / width) * 100));
        curtainRef.current.style.clipPath = `polygon(${topPct}% 0%, 100% 0%, 100% 100%, ${bottomPct}% 100%)`;
      }

      // 2. Spawn Volumetric Smoke & Supersonic Sparks while rocket is active
      if (progress < 1.08) {
        const nozzleX = curX - 55;
        const nozzleY = curY;

        // Smoke Cloud Puffs
        for (let i = 0; i < 2; i++) {
          smokeClouds.push({
            x: nozzleX - Math.random() * 12,
            y: nozzleY + (Math.random() - 0.5) * 18,
            vx: -3.5 - Math.random() * 3,
            vy: (Math.random() - 0.5) * 2 - 0.2,
            radius: 20 + Math.random() * 14,
            maxRadius: Math.max(140, Math.min(240, height * 0.32)),
            growthRate: 3.5 + Math.random() * 2,
            alpha: 0.9,
            decay: 0.005 + Math.random() * 0.003,
            age: 0,
            isHot: Math.random() < 0.35,
          });
        }

        // Plasma sparks
        for (let s = 0; s < 3; s++) {
          const colors = ['#ffffff', '#38bdf8', '#ffaa33', '#f59e0b', '#60a5fa'];
          sparks.push({
            x: nozzleX + (Math.random() - 0.5) * 8,
            y: nozzleY + (Math.random() - 0.5) * 12,
            vx: -8 - Math.random() * 10,
            vy: (Math.random() - 0.5) * 4,
            size: 1.5 + Math.random() * 2,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: 12 + Math.random() * 16,
          });
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Fast GPU-blitted Smoke Clouds using pre-rendered sprites
      for (let i = smokeClouds.length - 1; i >= 0; i--) {
        const c = smokeClouds[i];
        c.age += 1;
        c.x += c.vx;
        c.y += c.vy;
        c.vx *= 0.96;
        c.vy *= 0.97;

        if (c.radius < c.maxRadius) {
          c.radius += c.growthRate;
          c.growthRate *= 0.96;
        }

        if (elapsed > 1100 || c.age > 28) {
          c.alpha -= c.decay * 3;
        }

        if (c.alpha <= 0.01) {
          smokeClouds.splice(i, 1);
          continue;
        }

        const sprite = c.isHot && c.age < 9 ? spriteIgnition : spriteVapor;
        const dSize = c.radius * 2;
        ctx.globalAlpha = Math.max(0, Math.min(1, c.alpha));
        ctx.drawImage(sprite, c.x - c.radius, c.y - c.radius, dSize, dSize);
      }

      // Fast Fiery Sparks
      ctx.globalAlpha = 1;
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.life += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.95;
        sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);

        if (sp.life >= sp.maxLife || sp.alpha <= 0.05) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
      }
      ctx.globalAlpha = 1;

      // Continue animation until smoke naturally clears
      if (elapsed < 2000) {
        animFrameRef.current = requestAnimationFrame(animate);
      } else {
        setActive(false);
      }
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', handleResize);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [onComplete]);

  const handleSkip = () => {
    setActive(false);
    onComplete?.();
  };

  if (!active) return null;

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden select-none"
    >
      {/* Dynamic Screen Curtain Layer that unmasks behind the rocket in real-time */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundColor: isDark ? '#090b10' : '#fafaf8',
          clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)',
          willChange: 'clip-path',
        }}
      >
        {/* Subtle aerospace countdown indicator in the unrevealed section */}
        <div className="absolute right-8 top-8 flex items-center gap-2 opacity-40">
          <span className="h-2 w-2 rounded-full bg-[var(--accent)] animate-ping" />
          <span className="font-mono text-[10px] tracking-widest uppercase text-[var(--ink)]">
            AEROSPACE ORBITAL REVEAL
          </span>
        </div>
      </div>

      {/* Volumetric Smoke & Particle Canvas (drawn over the reveal boundary) */}
      <canvas ref={canvasRef} className="absolute inset-0 h-full w-full pointer-events-none z-20" />

      {/* High-Detail Aerospace Orbital Rocket (Identical to About Us vessel) */}
      <div
        ref={rocketWrapperRef}
        className="absolute pointer-events-none z-30 will-change-transform"
        style={{
          transform: 'translate3d(-250px, 50vh, 0) translate(-50%, -50%) rotate(8deg)',
        }}
      >
        <OrbitalRocketVessel className="h-20 w-52 drop-shadow-[0_0_24px_rgba(56,189,248,0.95)] sm:h-24 sm:w-64" />
      </div>

      {/* Subtle Skip Button */}
      <div className="absolute bottom-6 right-6 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 px-3.5 py-1 text-[11px] font-medium text-[var(--ink-muted)] shadow-sm backdrop-blur-md transition-all hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)]">
        Click anywhere to skip ✕
      </div>
    </div>
  );
};
