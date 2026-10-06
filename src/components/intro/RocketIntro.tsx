import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface RocketIntroProps {
  onComplete?: () => void;
}

// Fast cinematic timeline (ms) — rapid, thrilling, no waiting
const T_IGN = 80;        // Near-instant engine ignition & flare
const T_LIFT = 350;      // Liftoff begins in ~1/3 second
const FLIGHT_TIME = 950; // Rapid supersonic climb off-screen
const T_REVEAL = 550;    // Page content starts fading in behind smoke
const FADE_DUR = 650;    // Silky smooth curtain dissolve
const TOTAL_DUR = 1850;  // Complete sequence finishes under 2 seconds

// Rocket SVG viewBox aspect (width/height when horizontal: 128x40)
const ASPECT = 40 / 128;

interface SmokeParticle {
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
  isHot: boolean;
}

interface SparkParticle {
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
  const flameGlowRef = useRef<HTMLDivElement>(null);
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
    }, 4000);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Responsive rocket scale
    let rocketLength = Math.max(280, Math.min(height * 0.6, width * 0.85, 420));
    let padY = height * 0.76;
    let cx = width / 2;
    // When rotated -90deg, the nozzle sits ~0.14 * rocketLength below the center
    let cy0 = padY - rocketLength * 0.14;
    let travel = padY + rocketLength * 0.5 + 100;

    const layout = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rocketLength = Math.max(280, Math.min(height * 0.6, width * 0.85, 420));
      padY = height * 0.76;
      cx = width / 2;
      cy0 = padY - rocketLength * 0.14;
      travel = padY + rocketLength * 0.5 + 100;

      rocket.style.width = `${rocketLength}px`;
      rocket.style.height = `${rocketLength * ASPECT}px`;
    };
    layout();
    window.addEventListener('resize', layout);

    const flameGroup = rocket.querySelector<SVGGElement>('[data-rocket-flame]');
    if (flameGroup) flameGroup.style.opacity = '0';

    const isDark = document.documentElement.classList.contains('dark');

    // Pre-rendered soft radial sprites for smooth 60-120fps GPU canvas rendering
    const createSprite = (inner: string, mid: string, outer: string, size = 128) => {
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      if (!octx) return oc;
      const r = size / 2;
      const grad = octx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, inner);
      grad.addColorStop(0.4, mid);
      grad.addColorStop(1, outer);
      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(r, r, r, 0, Math.PI * 2);
      octx.fill();
      return oc;
    };

    const spriteFlameCore = createSprite(
      'rgba(255, 245, 200, 0.95)',
      'rgba(255, 140, 30, 0.6)',
      'rgba(255, 60, 0, 0)'
    );
    const spriteSmokeDark = createSprite(
      'rgba(180, 195, 220, 0.65)',
      'rgba(100, 115, 140, 0.28)',
      'rgba(40, 50, 70, 0)'
    );
    const spriteSmokeLight = createSprite(
      'rgba(240, 245, 255, 0.85)',
      'rgba(200, 215, 235, 0.35)',
      'rgba(180, 195, 215, 0)'
    );
    const spriteSmoke = isDark ? spriteSmokeDark : spriteSmokeLight;

    // Realistic audio rumble synth (Web Audio API)
    let audioCtx: AudioContext | null = null;
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        audioCtx = new AudioCtx();
        const now = audioCtx.currentTime;
        const dur = 2.4;
        const buf = audioCtx.createBuffer(1, Math.floor(audioCtx.sampleRate * dur), audioCtx.sampleRate);
        const data = buf.getChannelData(0);
        for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;

        const noise = audioCtx.createBufferSource();
        noise.buffer = buf;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(160, now);
        filter.frequency.exponentialRampToValueAtTime(1400, now + 0.6);
        filter.frequency.exponentialRampToValueAtTime(220, now + 2.0);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.12, now + 0.25);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 2.2);

        noise.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        noise.start(now);
      }
    } catch {
      // Audio autoplay policy handled silently
    }

    const smokeList: SmokeParticle[] = [];
    const sparkList: SparkParticle[] = [];
    const sparkColors = ['#ffffff', '#fef08a', '#f97316', '#38bdf8', '#ffea70'];

    const startTime = performance.now();
    let lastTime = startTime;
    let ignited = false;

    const animate = (time: number) => {
      const elapsed = time - startTime;
      const dt = Math.min(time - lastTime, 40);
      lastTime = time;

      // 1. Engine Ignition: Instant flame on & ground flare
      if (!ignited && elapsed >= T_IGN) {
        ignited = true;
        if (flameGroup) flameGroup.style.opacity = '1';
        if (flameGlowRef.current) flameGlowRef.current.style.opacity = '1';
      }

      // 2. Rocket Physics: Smooth, rapid supersonic acceleration upwards
      let lift = 0;
      if (elapsed > T_LIFT) {
        const progress = Math.min((elapsed - T_LIFT) / FLIGHT_TIME, 1.4);
        // Realistic quadratic acceleration curve
        lift = travel * Math.pow(progress, 2.1);
      }

      // Earth Tremor / Camera shake
      const shakeAmp = elapsed < T_IGN ? 0 : elapsed < T_LIFT ? 1.2 : elapsed < T_LIFT + 400 ? 2.5 : Math.max(0, 2 - (elapsed - T_LIFT) / 400);
      const shakeX = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;
      const shakeY = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;

      const rocketY = cy0 - lift;
      const nozzleY = rocketY + rocketLength * 0.14;

      if (lift > travel + 100) {
        rocket.style.display = 'none';
      } else {
        rocket.style.transform = `translate3d(${cx + shakeX}px, ${rocketY + shakeY}px, 0) translate(-50%, -50%) rotate(-90deg)`;
      }

      // Ground launch pad glow tracking
      if (flameGlowRef.current) {
        const glowOpacity = elapsed < T_IGN ? 0 : elapsed < T_LIFT + 300 ? 1 : Math.max(0, 1 - (elapsed - T_LIFT) / 500);
        flameGlowRef.current.style.opacity = `${glowOpacity}`;
        flameGlowRef.current.style.transform = `translate3d(0, ${Math.min(0, nozzleY - padY)}px, 0)`;
      }

      // 3. Volumetric Smoke Spawning
      if (elapsed >= T_IGN && elapsed < T_LIFT + FLIGHT_TIME) {
        // Lateral flame-trench plume billowing outward
        const spawnCount = elapsed < T_LIFT ? 2 : 3;
        for (let i = 0; i < spawnCount; i++) {
          const side = Math.random() < 0.5 ? -1 : 1;
          const isAtPad = nozzleY >= padY - 20;

          smokeList.push({
            x: cx + (Math.random() - 0.5) * 16,
            y: nozzleY + Math.random() * 8,
            vx: isAtPad ? side * (2.5 + Math.random() * 4.5) : (Math.random() - 0.5) * 2,
            vy: isAtPad ? (Math.random() - 0.5) * 1.5 - 0.2 : 0.6 + Math.random() * 1.2,
            radius: 18 + Math.random() * 12,
            maxRadius: isAtPad ? 100 + Math.random() * 60 : 50 + Math.random() * 30,
            growth: 2.2 + Math.random() * 1.8,
            age: 0,
            maxAge: 700 + Math.random() * 400,
            alpha: 0.85,
            isHot: Math.random() < 0.45 && elapsed < T_LIFT + 200,
          });
        }

        // Fast Fiery Sparks
        for (let s = 0; s < 2; s++) {
          sparkList.push({
            x: cx + (Math.random() - 0.5) * 14,
            y: nozzleY + 4,
            vx: (Math.random() - 0.5) * 6,
            vy: 4 + Math.random() * 10,
            size: 1.5 + Math.random() * 2,
            life: 0,
            maxLife: 14 + Math.random() * 12,
            color: sparkColors[Math.floor(Math.random() * sparkColors.length)],
          });
        }
      }

      // 4. Smooth Page Reveal Trigger & Curtain Dissolve
      if (elapsed >= T_REVEAL) {
        triggerReveal();
      }

      if (curtainRef.current) {
        const fadeProgress = elapsed >= T_REVEAL ? Math.min(1, (elapsed - T_REVEAL) / FADE_DUR) : 0;
        const eased = fadeProgress * fadeProgress * (3 - 2 * fadeProgress); // smooth cubic ease
        curtainRef.current.style.opacity = `${1 - eased}`;
      }

      // 5. Draw Canvas Particles
      ctx.clearRect(0, 0, width, height);

      // Render Smoke Puffs
      for (let i = smokeList.length - 1; i >= 0; i--) {
        const p = smokeList[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          smokeList.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.96;
        p.vy *= 0.97;

        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
          p.growth *= 0.95;
        }

        const lifeFrac = p.age / p.maxAge;
        const currentAlpha = p.alpha * Math.max(0, 1 - Math.pow(lifeFrac, 1.4));

        const sprite = p.isHot && p.age < 220 ? spriteFlameCore : spriteSmoke;
        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.drawImage(sprite, p.x - p.radius, p.y - p.radius, p.radius * 2, p.radius * 2);
      }

      // Render Fiery Sparks
      ctx.globalAlpha = 1;
      for (let s = sparkList.length - 1; s >= 0; s--) {
        const sp = sparkList[s];
        sp.life += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.vy *= 0.96;

        if (sp.life >= sp.maxLife) {
          sparkList.splice(s, 1);
          continue;
        }

        const sparkAlpha = Math.max(0, 1 - sp.life / sp.maxLife);
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sparkAlpha;
        ctx.fillRect(sp.x, sp.y, sp.size, sp.size);
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
      {/* Background Curtain: Fades smoothly to reveal Hero directly underneath */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-none will-change-[opacity]"
        style={{ backgroundColor: isDark ? '#090b10' : '#fafaf8' }}
      >
        {/* Dynamic Launch Pad Illumination / Ground Flare */}
        <div
          ref={flameGlowRef}
          className="absolute left-0 right-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0, top: '76%' }}
        >
          {/* Intense hot plasma core glow */}
          <div
            className="absolute left-1/2 h-36 w-[60%] max-w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,160,40,0.65) 0%, rgba(255,80,10,0.25) 50%, transparent 75%)',
            }}
          />
          {/* Sleek horizontal launch line reflection */}
          <div
            className="absolute left-1/2 h-px w-[75%] max-w-[850px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(56,189,248,0.6) 50%, transparent)',
            }}
          />
        </div>
      </div>

      {/* Volumetric Smoke & Fiery Plasma Canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

      {/* Majestic Aerospace Rocket Vessel */}
      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{
          transform: 'translate3d(50vw, 60vh, 0) translate(-50%, -50%) rotate(-90deg)',
        }}
      >
        <OrbitalRocketVessel className="h-full w-full overflow-visible select-none pointer-events-none filter drop-shadow-[0_0_24px_rgba(56,189,248,0.7)]" />
      </div>

      {/* Minimal clean skip pill */}
      <div className="absolute bottom-5 right-5 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/80 px-3 py-0.5 text-[10px] font-medium text-[var(--ink-muted)] opacity-60 backdrop-blur-md transition-opacity hover:opacity-100">
        Skip ✕
      </div>
    </div>
  );
};
