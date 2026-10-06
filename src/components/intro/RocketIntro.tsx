import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface RocketIntroProps {
  onComplete?: () => void;
}

// Rapid, dramatic launch sequence (ms)
const T_IGN = 70;         // Quick ignition burst
const T_LIFT = 320;       // Powerful liftoff
const FLIGHT_TIME = 850;  // Rapid climb off-screen
const T_FULL_SMOKE = 650; // Screen becomes completely enveloped in smoke
const T_REVEAL = 850;     // Underlying page unlocks while shrouded in smoke
const FADE_START = 950;   // Smoke begins rolling away and clearing
const TOTAL_DUR = 2100;   // Complete cinematic intro duration

// Rocket aspect ratio in SVG (128 x 40)
const ASPECT = 40 / 128;

interface SmokePuff {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  maxRadius: number;
  growth: number;
  age: number;
  maxAge: number;
  alpha: number;
  rotation: number;
  vRot: number;
  shadeType: 'hot' | 'dense' | 'mist' | 'darkDepth';
}

interface Ember {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  life: number;
  maxLife: number;
  color: string;
}

export const RocketIntro: React.FC<RocketIntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const rocketRef = useRef<HTMLDivElement>(null);
  const padGlowRef = useRef<HTMLDivElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredReveal = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const triggerReveal = () => {
    if (hasTriggeredReveal.current) return;
    hasTriggeredReveal.current = true;
    onCompleteRef.current?.();
  };

  useEffect(() => {
    sessionStorage.removeItem('articular-rocket-played');

    const canvas = canvasRef.current;
    const rocket = rocketRef.current;
    if (!canvas || !rocket) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety fallback
    const safetyTimer = setTimeout(() => {
      triggerReveal();
      setActive(false);
    }, 4500);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Realistic scale: tall and commanding, but clean
    let rocketLength = Math.max(280, Math.min(height * 0.58, width * 0.85, 430));
    let padY = height * 0.78;
    let cx = width / 2;
    let cy0 = padY - rocketLength * 0.14;
    let travel = padY + rocketLength * 0.5 + 120;

    const layout = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rocketLength = Math.max(280, Math.min(height * 0.58, width * 0.85, 430));
      padY = height * 0.78;
      cx = width / 2;
      cy0 = padY - rocketLength * 0.14;
      travel = padY + rocketLength * 0.5 + 120;

      rocket.style.width = `${rocketLength}px`;
      rocket.style.height = `${rocketLength * ASPECT}px`;
    };
    layout();
    window.addEventListener('resize', layout);

    const flameGroup = rocket.querySelector<SVGGElement>('[data-rocket-flame]');
    if (flameGroup) flameGroup.style.opacity = '0';

    const isDark = document.documentElement.classList.contains('dark');

    // Pre-rendered realistic volumetric smoke sprites (multi-layered billowy texture)
    const createCloudSprite = (stops: [number, string][], size = 256) => {
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      if (!octx) return oc;
      const r = size / 2;
      const grad = octx.createRadialGradient(r, r, r * 0.05, r, r, r);
      for (const [pos, color] of stops) {
        grad.addColorStop(pos, color);
      }
      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(r, r, r, 0, Math.PI * 2);
      octx.fill();
      return oc;
    };

    // 1. Hot fiery ignition smoke (orange-yellow flame cloud)
    const spriteHot = createCloudSprite([
      [0, 'rgba(255, 255, 230, 0.98)'],
      [0.2, 'rgba(255, 190, 60, 0.9)'],
      [0.55, 'rgba(235, 95, 20, 0.55)'],
      [0.8, 'rgba(180, 45, 10, 0.2)'],
      [1, 'rgba(120, 30, 5, 0)'],
    ]);

    // 2. Ultra-dense white/grey steam avalanche (deluge water vapor)
    const spriteDenseLight = createCloudSprite([
      [0, 'rgba(255, 255, 255, 0.96)'],
      [0.3, 'rgba(240, 245, 252, 0.9)'],
      [0.65, 'rgba(215, 225, 238, 0.5)'],
      [0.85, 'rgba(195, 208, 222, 0.2)'],
      [1, 'rgba(180, 195, 210, 0)'],
    ]);
    const spriteDenseDark = createCloudSprite([
      [0, 'rgba(220, 230, 245, 0.9)'],
      [0.3, 'rgba(170, 185, 205, 0.8)'],
      [0.65, 'rgba(110, 125, 145, 0.55)'],
      [0.85, 'rgba(60, 72, 90, 0.25)'],
      [1, 'rgba(30, 38, 50, 0)'],
    ]);
    const spriteDense = isDark ? spriteDenseDark : spriteDenseLight;

    // 3. Ambient atmospheric mist (soft outer blanket to cover full screen)
    const spriteMistLight = createCloudSprite([
      [0, 'rgba(245, 248, 255, 0.85)'],
      [0.5, 'rgba(225, 235, 248, 0.55)'],
      [0.8, 'rgba(210, 222, 236, 0.2)'],
      [1, 'rgba(200, 215, 230, 0)'],
    ]);
    const spriteMistDark = createCloudSprite([
      [0, 'rgba(140, 155, 180, 0.85)'],
      [0.5, 'rgba(90, 105, 130, 0.55)'],
      [0.8, 'rgba(50, 62, 80, 0.25)'],
      [1, 'rgba(25, 32, 45, 0)'],
    ]);
    const spriteMist = isDark ? spriteMistDark : spriteMistLight;

    // 4. Dark volumetric depth shadow (gives real 3D cloud volume)
    const spriteDepth = createCloudSprite([
      [0, isDark ? 'rgba(20, 26, 38, 0.7)' : 'rgba(160, 175, 195, 0.55)'],
      [0.5, isDark ? 'rgba(30, 40, 58, 0.35)' : 'rgba(180, 192, 210, 0.25)'],
      [1, 'rgba(0, 0, 0, 0)'],
    ]);

    // Realistic Web Audio API roar
    let audioCtx: AudioContext | null = null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
        const now = audioCtx.currentTime;
        const dur = 2.2;
        const buf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * dur), audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

        const noise = audioCtx.createBufferSource();
        noise.buffer = buf;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, now);
        filter.frequency.exponentialRampToValueAtTime(1200, now + 0.45);
        filter.frequency.exponentialRampToValueAtTime(180, now + 1.8);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.14, now + 0.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.0);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start(now);
      }
    } catch {
      // Audio autoplay handled silently
    }

    const smokeClouds: SmokePuff[] = [];
    const embers: Ember[] = [];
    const emberPalette = ['#ffffff', '#fef08a', '#f59e0b', '#ea580c', '#ffffff'];

    const startTime = performance.now();
    let lastTime = startTime;
    let ignited = false;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const dt = Math.min(time - lastTime, 40);
      lastTime = time;

      // 1. Instant Ignition
      if (!ignited && elapsed >= T_IGN) {
        ignited = true;
        if (flameGroup) flameGroup.style.opacity = '1';
        if (padGlowRef.current) padGlowRef.current.style.opacity = '1';
      }

      // 2. Rocket Physics: Powerful supersonic acceleration
      let lift = 0;
      if (elapsed > T_LIFT) {
        const progress = Math.min((elapsed - T_LIFT) / FLIGHT_TIME, 1.5);
        lift = travel * Math.pow(progress, 2.2);
      }

      // Intense ground tremor / camera rumble
      const shakeAmp =
        elapsed < T_IGN
          ? 0
          : elapsed < T_LIFT
          ? 1.8
          : elapsed < T_LIFT + 350
          ? 3.2
          : Math.max(0, 2.5 - (elapsed - T_LIFT) / 350);
      const shakeX = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;
      const shakeY = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;

      const rocketY = cy0 - lift;
      const nozzleY = rocketY + rocketLength * 0.14;

      if (lift > travel + 140) {
        rocket.style.display = 'none';
      } else {
        rocket.style.transform = `translate3d(${cx + shakeX}px, ${rocketY + shakeY}px, 0) translate(-50%, -50%) rotate(-90deg)`;
      }

      // Launch pad fiery glow
      if (padGlowRef.current) {
        const padGlow =
          elapsed < T_IGN
            ? 0
            : elapsed < T_LIFT + 200
            ? 1
            : Math.max(0, 1 - (elapsed - T_LIFT) / 450);
        padGlowRef.current.style.opacity = `${padGlow}`;
      }

      // 3. Massive Deluge Smoke Generation (Covers entire screen)
      if (elapsed >= T_IGN && elapsed < T_LIFT + FLIGHT_TIME + 200) {
        // High spawn rate to build a solid, dense volumetric cloud bank
        const count = elapsed < T_LIFT ? 5 : 8;
        for (let i = 0; i < count; i++) {
          const side = Math.random() < 0.5 ? -1 : 1;
          const isAtBase = nozzleY >= padY - 30;

          // Lateral explosion of steam along the ground trench
          const vx = isAtBase
            ? side * (4 + Math.random() * 9) + (Math.random() - 0.5) * 4
            : (Math.random() - 0.5) * 6;
          const vy = isAtBase
            ? -1.2 - Math.random() * 3.5
            : 0.8 + Math.random() * 2.5;

          // Huge puffy radius to guarantee complete screen coverage
          const maxRadius = isAtBase
            ? 220 + Math.random() * 260 // Up to 480px per cloud puff!
            : 160 + Math.random() * 180;

          const isHot = elapsed < T_LIFT + 220 && Math.random() < 0.35;
          const isDepth = Math.random() < 0.25;

          smokeClouds.push({
            x: cx + (Math.random() - 0.5) * (rocketLength * 0.4),
            y: nozzleY + Math.random() * 16,
            vx,
            vy,
            radius: 35 + Math.random() * 30,
            maxRadius,
            growth: 4.5 + Math.random() * 3.5,
            age: 0,
            maxAge: 1200 + Math.random() * 700,
            alpha: 0.92,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.02,
            shadeType: isHot ? 'hot' : isDepth ? 'darkDepth' : Math.random() < 0.6 ? 'dense' : 'mist',
          });
        }

        // Fiery exhaust embers
        for (let s = 0; s < 3; s++) {
          embers.push({
            x: cx + (Math.random() - 0.5) * 20,
            y: nozzleY + 6,
            vx: (Math.random() - 0.5) * 8,
            vy: 6 + Math.random() * 14,
            size: 2 + Math.random() * 2.5,
            life: 0,
            maxLife: 16 + Math.random() * 18,
            color: emberPalette[Math.floor(Math.random() * emberPalette.length)],
          });
        }
      }

      // 4. Reveal trigger: as smoke peaks and covers screen, trigger underlying page
      if (elapsed >= T_REVEAL) {
        triggerReveal();
      }

      // Background stage curtain fade: dissolves under the heavy smoke layer
      if (curtainRef.current) {
        const curtainFade =
          elapsed < T_LIFT
            ? 1
            : Math.max(0, 1 - (elapsed - T_LIFT) / 450);
        curtainRef.current.style.opacity = `${curtainFade}`;
      }

      // 5. Draw Canvas: Full Volumetric Coverage & Dissipating Mist
      ctx.clearRect(0, 0, width, height);

      // Global smoke blanket dissipation factor
      let globalSmokeAlpha = 1;
      if (elapsed > FADE_START) {
        const fadeFrac = Math.min(1, (elapsed - FADE_START) / (TOTAL_DUR - FADE_START));
        // Smooth ease-out fade as the massive cloud thins and disperses
        globalSmokeAlpha = Math.max(0, 1 - Math.pow(fadeFrac, 1.3));
      }

      // Full-screen atmospheric fog blanket during peak liftoff (guarantees 100% coverage)
      if (elapsed > T_LIFT && elapsed < TOTAL_DUR) {
        const blanketPeak =
          elapsed < T_FULL_SMOKE
            ? (elapsed - T_LIFT) / (T_FULL_SMOKE - T_LIFT)
            : globalSmokeAlpha;

        const blanketAlpha = Math.min(0.85, blanketPeak * 0.85);
        if (blanketAlpha > 0.01) {
          ctx.fillStyle = isDark
            ? `rgba(18, 24, 34, ${blanketAlpha * 0.95})`
            : `rgba(240, 244, 250, ${blanketAlpha * 0.95})`;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // Render All Volumetric Smoke Puffs
      for (let i = smokeClouds.length - 1; i >= 0; i--) {
        const p = smokeClouds[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          smokeClouds.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.965;
        p.rotation += p.vRot;

        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
          p.growth *= 0.95;
        }

        const lifeFrac = p.age / p.maxAge;
        const currentAlpha = p.alpha * Math.max(0, 1 - Math.pow(lifeFrac, 1.2)) * globalSmokeAlpha;
        if (currentAlpha <= 0.01) continue;

        let sprite = spriteDense;
        if (p.shadeType === 'hot') sprite = spriteHot;
        else if (p.shadeType === 'mist') sprite = spriteMist;
        else if (p.shadeType === 'darkDepth') sprite = spriteDepth;

        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(sprite, -p.radius, -p.radius, p.radius * 2, p.radius * 2);
        ctx.restore();
      }

      // Render Embers
      ctx.globalAlpha = 1;
      for (let s = embers.length - 1; s >= 0; s--) {
        const em = embers[s];
        em.life += 1;
        em.x += em.vx;
        em.y += em.vy;
        em.vx *= 0.94;
        em.vy *= 0.95;

        if (em.life >= em.maxLife) {
          embers.splice(s, 1);
          continue;
        }

        const emAlpha = Math.max(0, 1 - em.life / em.maxLife) * globalSmokeAlpha;
        ctx.fillStyle = em.color;
        ctx.globalAlpha = emAlpha;
        ctx.fillRect(em.x, em.y, em.size, em.size);
      }
      ctx.globalAlpha = 1;

      // Completion check
      if (elapsed >= TOTAL_DUR) {
        triggerReveal();
        setActive(false);
        return;
      }

      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(safetyTimer);
      window.removeEventListener('resize', layout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      audioCtx?.close().catch(() => undefined);
    };
  }, []);

  const handleSkip = () => {
    setActive(false);
    triggerReveal();
  };

  if (!active) return null;

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden select-none"
      title="Click to skip"
    >
      {/* Background Stage Curtain (Smoothly dissolves under the dense smoke) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-none will-change-[opacity]"
        style={{ backgroundColor: isDark ? '#090b10' : '#fafaf8' }}
      >
        {/* Realistic Launch Pad Blast Trench Lighting (Pure warm incandescent fire, no neon) */}
        <div
          ref={padGlowRef}
          className="absolute left-0 right-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0, top: '78%' }}
        >
          {/* Flame trench ground glow */}
          <div
            className="absolute left-1/2 h-44 w-[75%] max-w-[850px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,170,40,0.7) 0%, rgba(235,90,15,0.3) 45%, rgba(180,40,5,0.1) 70%, transparent 85%)',
            }}
          />
          {/* Heavy industrial launch deck line */}
          <div
            className="absolute left-1/2 h-[1.5px] w-[80%] max-w-[950px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(148,163,184,0.4) 30%, rgba(255,210,120,0.8) 50%, rgba(148,163,184,0.4) 70%, transparent)',
            }}
          />
        </div>
      </div>

      {/* Massive Volumetric Smoke & Flame Canvas (Completely covers the screen) */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

      {/* Realistic Detailed Orbital Rocket (Clean aerospace materials, no neon) */}
      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{
          transform: 'translate3d(50vw, 60vh, 0) translate(-50%, -50%) rotate(-90deg)',
        }}
      >
        <OrbitalRocketVessel className="h-full w-full overflow-visible select-none pointer-events-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)]" />
      </div>

      {/* Minimal skip pill */}
      <div className="absolute bottom-5 right-5 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/75 px-3 py-0.5 text-[10px] font-medium text-[var(--ink-muted)] opacity-50 backdrop-blur-md transition-opacity hover:opacity-100">
        Skip ✕
      </div>
    </div>
  );
};
