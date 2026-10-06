import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface RocketIntroProps {
  onComplete?: () => void;
}

// Rapid, dramatic aerospace launch sequence timings (ms)
const T_IGN = 60;         // Instant kerolox engine ignition
const T_LIFT = 300;       // Hold-down clamp release & liftoff
const FLIGHT_TIME = 850;  // Supersonic climb off-screen
const T_FULL_SMOKE = 620; // 100% screen envelopment by deluge steam
const T_REVEAL = 850;     // Underlying page unlocks behind the wall of smoke
const FADE_START = 950;   // Massive smoke bank starts rolling & clearing
const TOTAL_DUR = 2100;   // Full cinematic sequence duration

// Rocket aspect ratio in SVG (viewBox: -48 0 148 40 -> 40 / 148)
const ASPECT = 40 / 148;

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
  shadeType: 'deluge' | 'fire' | 'depth' | 'mist';
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

    // Realistic rocket proportions
    let rocketLength = Math.max(300, Math.min(height * 0.6, width * 0.85, 460));
    let padY = height * 0.78;
    let cx = width / 2;
    let cy0 = padY - rocketLength * 0.13;
    let travel = padY + rocketLength * 0.55 + 160;

    const layout = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rocketLength = Math.max(300, Math.min(height * 0.6, width * 0.85, 460));
      padY = height * 0.78;
      cx = width / 2;
      cy0 = padY - rocketLength * 0.13;
      travel = padY + rocketLength * 0.55 + 160;

      rocket.style.width = `${rocketLength}px`;
      rocket.style.height = `${rocketLength * ASPECT}px`;
    };
    layout();
    window.addEventListener('resize', layout);

    const flameGroup = rocket.querySelector<SVGGElement>('[data-rocket-flame]');
    if (flameGroup) flameGroup.style.opacity = '0';

    const isDark = document.documentElement.classList.contains('dark');

    // =========================================================================
    // MULTI-LOBED ORGANIC VOLUMETRIC SMOKE SPRITES
    // Instead of simple blurry circles, real cumulus smoke has overlapping lobes,
    // top sunlit highlights, and deep underside ambient shadows.
    // =========================================================================
    const createOrganicCloudSprite = (
      baseRgb: [number, number, number],
      highlightRgb: [number, number, number],
      shadowRgb: [number, number, number],
      baseAlpha: number,
      size = 320
    ) => {
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      if (!octx) return oc;

      const center = size / 2;
      const maxR = size * 0.44;

      // 9 organic sub-lobes arranged in a billowy cumulus cauliflower formation
      const lobes = [
        { x: 0, y: 0, r: 0.82 },
        { x: -0.32, y: -0.16, r: 0.68 },
        { x: 0.3, y: -0.2, r: 0.65 },
        { x: -0.26, y: 0.26, r: 0.62 },
        { x: 0.32, y: 0.22, r: 0.7 },
        { x: 0.06, y: -0.38, r: 0.58 },
        { x: -0.4, y: 0.06, r: 0.54 },
        { x: 0.38, y: -0.04, r: 0.56 },
        { x: 0.02, y: 0.36, r: 0.6 },
      ];

      // 1. Underside ambient depth shadow
      for (const l of lobes) {
        const lx = center + l.x * maxR * 0.9;
        const ly = center + (l.y * 0.9 + 0.12) * maxR;
        const lr = l.r * maxR;
        const grad = octx.createRadialGradient(lx, ly, lr * 0.05, lx, ly, lr);
        grad.addColorStop(0, `rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, ${baseAlpha * 0.6})`);
        grad.addColorStop(0.55, `rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, ${baseAlpha * 0.35})`);
        grad.addColorStop(1, `rgba(${shadowRgb[0]}, ${shadowRgb[1]}, ${shadowRgb[2]}, 0)`);
        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(lx, ly, lr, 0, Math.PI * 2);
        octx.fill();
      }

      // 2. Main dense cloud body
      for (const l of lobes) {
        const lx = center + l.x * maxR * 0.85;
        const ly = center + l.y * maxR * 0.85;
        const lr = l.r * maxR;
        const grad = octx.createRadialGradient(lx, ly, lr * 0.05, lx, ly, lr);
        grad.addColorStop(0, `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${baseAlpha})`);
        grad.addColorStop(0.5, `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${baseAlpha * 0.85})`);
        grad.addColorStop(0.82, `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, ${baseAlpha * 0.3})`);
        grad.addColorStop(1, `rgba(${baseRgb[0]}, ${baseRgb[1]}, ${baseRgb[2]}, 0)`);
        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(lx, ly, lr, 0, Math.PI * 2);
        octx.fill();
      }

      // 3. Top sunlit highlight crests
      for (const l of lobes.slice(0, 5)) {
        const lx = center + (l.x * 0.8 - 0.1) * maxR;
        const ly = center + (l.y * 0.8 - 0.14) * maxR;
        const lr = l.r * maxR * 0.72;
        const grad = octx.createRadialGradient(lx, ly, lr * 0.05, lx, ly, lr);
        grad.addColorStop(0, `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, ${baseAlpha * 0.8})`);
        grad.addColorStop(0.65, `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, ${baseAlpha * 0.35})`);
        grad.addColorStop(1, `rgba(${highlightRgb[0]}, ${highlightRgb[1]}, ${highlightRgb[2]}, 0)`);
        octx.fillStyle = grad;
        octx.beginPath();
        octx.arc(lx, ly, lr, 0, Math.PI * 2);
        octx.fill();
      }

      return oc;
    };

    // 1. Ultra-dense deluge water vapor steam (massive white/slate cumulus bank)
    const spriteDelugeLight = createOrganicCloudSprite(
      [242, 246, 252], // body
      [255, 255, 255], // highlight
      [190, 205, 224], // shadow
      0.96
    );
    const spriteDelugeDark = createOrganicCloudSprite(
      [160, 175, 195], // body
      [225, 235, 248], // highlight
      [45, 55, 72],    // shadow
      0.95
    );
    const spriteDeluge = isDark ? spriteDelugeDark : spriteDelugeLight;

    // 2. Fiery ignition flame cloud (turbulent orange-yellow fire plume near pad)
    const spriteFire = createOrganicCloudSprite(
      [255, 175, 45],  // body
      [255, 255, 220], // highlight
      [150, 45, 12],   // shadow
      0.96
    );

    // 3. Deep volumetric shadow cloud (gives realistic 3D crevices in the smoke)
    const spriteDepth = createOrganicCloudSprite(
      isDark ? [35, 45, 60] : [165, 178, 195],
      isDark ? [60, 75, 95] : [200, 212, 228],
      isDark ? [15, 20, 30] : [130, 145, 165],
      0.85
    );

    // 4. Soft atmospheric rolling mist (wide outer blanket)
    const spriteMist = createOrganicCloudSprite(
      isDark ? [85, 100, 125] : [230, 238, 248],
      isDark ? [130, 150, 175] : [250, 252, 255],
      isDark ? [30, 40, 55] : [195, 208, 222],
      0.75
    );

    // Realistic Web Audio API engine roar
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
        filter.frequency.exponentialRampToValueAtTime(1250, now + 0.45);
        filter.frequency.exponentialRampToValueAtTime(180, now + 1.8);

        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.15, now + 0.2);
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

      // 2. Rocket Physics: Supersonic acceleration
      let lift = 0;
      if (elapsed > T_LIFT) {
        const progress = Math.min((elapsed - T_LIFT) / FLIGHT_TIME, 1.5);
        lift = travel * Math.pow(progress, 2.25);
      }

      // Ground vibration & liftoff rumble
      const shakeAmp =
        elapsed < T_IGN
          ? 0
          : elapsed < T_LIFT
          ? 2.2
          : elapsed < T_LIFT + 350
          ? 3.8
          : Math.max(0, 3.0 - (elapsed - T_LIFT) / 320);
      const shakeX = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;
      const shakeY = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;

      const rocketY = cy0 - lift;
      const nozzleY = rocketY + rocketLength * 0.13;

      if (lift > travel + 140) {
        rocket.style.display = 'none';
      } else {
        rocket.style.transform = `translate3d(${cx + shakeX}px, ${rocketY + shakeY}px, 0) translate(-50%, -50%) rotate(-90deg)`;
      }

      // Pad trench fiery illumination
      if (padGlowRef.current) {
        const padGlow =
          elapsed < T_IGN
            ? 0
            : elapsed < T_LIFT + 200
            ? 1
            : Math.max(0, 1 - (elapsed - T_LIFT) / 450);
        padGlowRef.current.style.opacity = `${padGlow}`;
      }

      // =========================================================================
      // 3. MASSIVE REALISTIC DELUGE SMOKE SYSTEM (100% FULL SCREEN COVERAGE)
      // High-pressure water deluge steam explodes laterally across the whole pad
      // and surges upward into huge billowing cumulus cloud banks.
      // =========================================================================
      if (elapsed >= T_IGN && elapsed < T_LIFT + FLIGHT_TIME + 150) {
        // High spawn density for solid screen-covering cloud bank
        const count = elapsed < T_LIFT ? 7 : 11;
        for (let i = 0; i < count; i++) {
          const isAtBase = nozzleY >= padY - 40;
          const side = Math.random() < 0.5 ? -1 : 1;

          // Lateral deluge explosion across the trench
          const spawnX = isAtBase
            ? cx + (Math.random() - 0.5) * width * 0.75 // Spreads wide across the launch deck!
            : cx + (Math.random() - 0.5) * (rocketLength * 0.5);

          const vx = isAtBase
            ? side * (5 + Math.random() * 12) + (Math.random() - 0.5) * 6
            : (Math.random() - 0.5) * 8;

          // Powerful upward billow
          const vy = isAtBase
            ? -1.8 - Math.random() * 4.2
            : 0.5 + Math.random() * 3.5;

          // Huge expanding radii to guarantee 100% viewport coverage
          const maxRadius = isAtBase
            ? 280 + Math.random() * 340 // Up to 620px per giant smoke billow!
            : 200 + Math.random() * 240;

          const isFirePuff = elapsed < T_LIFT + 220 && Math.random() < 0.3;
          const isDepthPuff = Math.random() < 0.25;

          smokeClouds.push({
            x: spawnX,
            y: nozzleY + (Math.random() - 0.5) * 24,
            vx,
            vy,
            radius: 45 + Math.random() * 35,
            maxRadius,
            growth: 5.5 + Math.random() * 4.5,
            age: 0,
            maxAge: 1300 + Math.random() * 800,
            alpha: 0.95,
            rotation: Math.random() * Math.PI * 2,
            vRot: (Math.random() - 0.5) * 0.025,
            shadeType: isFirePuff
              ? 'fire'
              : isDepthPuff
              ? 'depth'
              : Math.random() < 0.65
              ? 'deluge'
              : 'mist',
          });
        }

        // Exhaust sparks & burning embers
        for (let s = 0; s < 4; s++) {
          embers.push({
            x: cx + (Math.random() - 0.5) * 24,
            y: nozzleY + 8,
            vx: (Math.random() - 0.5) * 10,
            vy: 7 + Math.random() * 16,
            size: 2 + Math.random() * 3,
            life: 0,
            maxLife: 18 + Math.random() * 20,
            color: emberPalette[Math.floor(Math.random() * emberPalette.length)],
          });
        }
      }

      // 4. Reveal trigger: underlying page unlocks while enveloped in smoke
      if (elapsed >= T_REVEAL) {
        triggerReveal();
      }

      // Background curtain smoothly dissolves beneath the impenetrable smoke wall
      if (curtainRef.current) {
        const curtainFade =
          elapsed < T_LIFT
            ? 1
            : Math.max(0, 1 - (elapsed - T_LIFT) / 450);
        curtainRef.current.style.opacity = `${curtainFade}`;
      }

      // =========================================================================
      // 5. DRAW CANVAS: VOLUMETRIC SMOKE WITH 100% PEAK OPACITY COVERAGE
      // =========================================================================
      ctx.clearRect(0, 0, width, height);

      // Global dissipation factor as smoke clears after peak
      let globalSmokeAlpha = 1;
      if (elapsed > FADE_START) {
        const fadeFrac = Math.min(1, (elapsed - FADE_START) / (TOTAL_DUR - FADE_START));
        // Smooth ease-out dissipation
        globalSmokeAlpha = Math.max(0, 1 - Math.pow(fadeFrac, 1.35));
      }

      // -----------------------------------------------------------------------
      // SOLID VOLUMETRIC SMOKE BLANKET (GUARANTEES 100% COMPLETE SCREEN COVERAGE)
      // User requirement: "чтобы полностью все закрыло дым"
      // Reaches 1.0 (100% solid coverage) at peak liftoff!
      // -----------------------------------------------------------------------
      if (elapsed > T_LIFT && elapsed < TOTAL_DUR) {
        let blanketAlpha = 0;
        if (elapsed < T_FULL_SMOKE) {
          // Surges up to 100% solid opacity
          blanketAlpha = Math.min(1.0, (elapsed - T_LIFT) / (T_FULL_SMOKE - T_LIFT));
        } else if (elapsed <= FADE_START) {
          // Held at 100% solid opacity during peak liftoff
          blanketAlpha = 1.0;
        } else {
          // Smoothly clears away as the smoke parts
          const fadeProgress = (elapsed - FADE_START) / (TOTAL_DUR - FADE_START);
          blanketAlpha = Math.max(0, 1 - Math.pow(fadeProgress, 1.35));
        }

        if (blanketAlpha > 0.005) {
          ctx.fillStyle = isDark
            ? `rgba(13, 17, 24, ${blanketAlpha})`
            : `rgba(244, 247, 252, ${blanketAlpha})`;
          ctx.fillRect(0, 0, width, height);
        }
      }

      // -----------------------------------------------------------------------
      // RENDER ALL ORGANIC VOLUMETRIC SMOKE PUFFS
      // -----------------------------------------------------------------------
      for (let i = smokeClouds.length - 1; i >= 0; i--) {
        const p = smokeClouds[i];
        p.age += dt;
        if (p.age >= p.maxAge) {
          smokeClouds.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.965;
        p.vy *= 0.97;
        p.rotation += p.vRot;

        if (p.radius < p.maxRadius) {
          p.radius += p.growth;
          p.growth *= 0.95;
        }

        const lifeFrac = p.age / p.maxAge;
        const currentAlpha = p.alpha * Math.max(0, 1 - Math.pow(lifeFrac, 1.25)) * globalSmokeAlpha;
        if (currentAlpha <= 0.01) continue;

        let sprite = spriteDeluge;
        if (p.shadeType === 'fire') sprite = spriteFire;
        else if (p.shadeType === 'depth') sprite = spriteDepth;
        else if (p.shadeType === 'mist') sprite = spriteMist;

        ctx.globalAlpha = Math.max(0, Math.min(1, currentAlpha));
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rotation);
        ctx.drawImage(sprite, -p.radius, -p.radius, p.radius * 2, p.radius * 2);
        ctx.restore();
      }

      // -----------------------------------------------------------------------
      // RENDER EMBERS & EXHAUST SPARKS
      // -----------------------------------------------------------------------
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

      // Sequence completion
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
      {/* Background Stage Curtain (Fades smoothly beneath the heavy smoke) */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-none will-change-[opacity]"
        style={{ backgroundColor: isDark ? '#090b10' : '#fafaf8' }}
      >
        {/* Launch pad industrial flame trench glow (Warm incandescent fire, zero neon) */}
        <div
          ref={padGlowRef}
          className="absolute left-0 right-0 pointer-events-none transition-opacity duration-300"
          style={{ opacity: 0, top: '78%' }}
        >
          {/* Flame trench core reflection */}
          <div
            className="absolute left-1/2 h-48 w-[85%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-2xl"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,175,45,0.75) 0%, rgba(235,90,15,0.35) 45%, rgba(180,40,5,0.12) 70%, transparent 85%)',
            }}
          />
          {/* Industrial launch mount steel deck line */}
          <div
            className="absolute left-1/2 h-[2px] w-[85%] max-w-[980px] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(148,163,184,0.4) 25%, rgba(255,210,120,0.85) 50%, rgba(148,163,184,0.4) 75%, transparent)',
            }}
          />
        </div>
      </div>

      {/* Massive Volumetric Smoke & Flame Canvas (Completely covers entire screen) */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

      {/* Realistic Aerospace Orbital Rocket Vessel (No neon, pure aerospace detailing) */}
      <div
        ref={rocketRef}
        className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{
          transform: 'translate3d(50vw, 60vh, 0) translate(-50%, -50%) rotate(-90deg)',
        }}
      >
        <OrbitalRocketVessel className="h-full w-full overflow-visible select-none pointer-events-none filter drop-shadow-[0_12px_28px_rgba(0,0,0,0.75)]" />
      </div>

      {/* Subtle skip badge */}
      <div className="absolute bottom-5 right-5 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/75 px-3 py-0.5 text-[10px] font-medium text-[var(--ink-muted)] opacity-50 backdrop-blur-md transition-opacity hover:opacity-100">
        Skip ✕
      </div>
    </div>
  );
};
