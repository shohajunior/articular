import React, { useState, useEffect, useRef } from 'react';
import { OrbitalRocketVessel } from '../ui/OrbitalRocketVessel';

interface RocketIntroProps {
  onComplete?: () => void;
}

// Launch timeline (ms)
const T_IGN = 1000; // engine ignition
const T_LIFT = 1900; // liftoff
const FLIGHT = 2400; // time to leave the screen after liftoff
const T_REVEAL = T_LIFT + 1300; // page content starts to appear while rocket climbs
const FADE = 1500; // slow curtain fade (page info appears)

// Rocket SVG viewBox is 128x40 (flame to the left, nose to the right, rotated -90deg to point up)
const ASPECT = 40 / 128;

interface SmokeCloud {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r0: number;
  rMax: number;
  age: number;
  life: number;
  alpha0: number;
  hot: boolean;
}

export const RocketIntro: React.FC<RocketIntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const curtainRef = useRef<HTMLDivElement>(null);
  const rocketWrapperRef = useRef<HTMLDivElement>(null);
  const padRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
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
    // Welcome screen always plays on every page load
    sessionStorage.removeItem('articular-rocket-played');

    const canvas = canvasRef.current;
    const wrapper = rocketWrapperRef.current;
    if (!canvas || !wrapper) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Safety fallback if RAF is throttled (background tab): never leave the page hidden
    const safetyTimer = setTimeout(() => {
      triggerReveal();
      setActive(false);
    }, 9000);

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);
    let rocketW = 0;
    let padY = 0;
    let cx = 0;
    let cy0 = 0;
    let travel = 0;

    const layout = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      rocketW = Math.max(300, Math.min(height * 0.8, width * 0.95, 620));
      padY = height * 0.74;
      cx = width / 2;
      // nozzle sits at 0.14 * rocketW below the rocket's centre
      cy0 = padY - rocketW * 0.14;
      travel = padY + rocketW * 0.36 + 60;
      wrapper.style.width = `${rocketW}px`;
      wrapper.style.height = `${rocketW * ASPECT}px`;
      if (padRef.current) padRef.current.style.top = `${padY}px`;
    };
    layout();
    window.addEventListener('resize', layout);

    const flame = wrapper.querySelector<SVGGElement>('[data-rocket-flame]');
    if (flame) flame.style.opacity = '0';

    const isDark = document.documentElement.classList.contains('dark');

    // Pre-rendered soft sprites (cheap GPU blits)
    const createSprite = (inner: string, outer: string, size = 128) => {
      const oc = document.createElement('canvas');
      oc.width = size;
      oc.height = size;
      const octx = oc.getContext('2d');
      if (!octx) return oc;
      const r = size / 2;
      const grad = octx.createRadialGradient(r, r, 0, r, r, r);
      grad.addColorStop(0, inner);
      grad.addColorStop(0.5, outer);
      grad.addColorStop(1, 'rgba(0, 0, 0, 0)');
      octx.fillStyle = grad;
      octx.beginPath();
      octx.arc(r, r, r, 0, Math.PI * 2);
      octx.fill();
      return oc;
    };

    const spriteHot = createSprite('rgba(255, 200, 100, 0.8)', 'rgba(255, 110, 30, 0.35)');
    const spriteSmoke = isDark
      ? createSprite('rgba(150, 165, 190, 0.7)', 'rgba(95, 110, 135, 0.3)')
      : createSprite('rgba(170, 182, 200, 0.8)', 'rgba(205, 214, 228, 0.35)');

    // Engine rumble (silently ignored if autoplay is blocked)
    let audioCtx: AudioContext | null = null;
    const rumbleTimer = setTimeout(() => {
      try {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (!AudioCtx) return;
        audioCtx = new AudioCtx();
        const now = audioCtx.currentTime;
        const len = audioCtx.sampleRate * 3.6;
        const buf = audioCtx.createBuffer(1, len, audioCtx.sampleRate);
        const out = buf.getChannelData(0);
        for (let i = 0; i < len; i++) out[i] = Math.random() * 2 - 1;
        const src = audioCtx.createBufferSource();
        src.buffer = buf;
        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(140, now);
        filter.frequency.exponentialRampToValueAtTime(900, now + 1.8);
        filter.frequency.exponentialRampToValueAtTime(200, now + 3.4);
        const gain = audioCtx.createGain();
        gain.gain.setValueAtTime(0.001, now);
        gain.gain.linearRampToValueAtTime(0.1, now + 1.2);
        gain.gain.exponentialRampToValueAtTime(0.0001, now + 3.5);
        src.connect(filter);
        filter.connect(gain);
        gain.connect(audioCtx.destination);
        src.start(now);
      } catch {
        // ignore
      }
    }, T_IGN);

    const clouds: SmokeCloud[] = [];
    const start = performance.now();
    let last = start;
    let groundAcc = 0;
    let trailAcc = 0;
    let lastLabel = '';
    let ignited = false;

    const animate = () => {
      const nowMs = performance.now();
      const t = nowMs - start;
      const dtMs = Math.min(nowMs - last, 50);
      last = nowMs;
      const k = dtMs / 16.667;

      // Countdown label
      if (labelRef.current) {
        const label =
          t < 400 ? 'T−3' : t < 800 ? 'T−2' : t < T_IGN ? 'T−1' : t < T_LIFT ? 'IGNITION' : 'LIFTOFF';
        if (label !== lastLabel) {
          labelRef.current.textContent = label;
          lastLabel = label;
        }
      }

      // Ignition: flame on, pad glow on
      if (!ignited && t >= T_IGN) {
        ignited = true;
        if (flame) flame.style.opacity = '1';
        if (padRef.current) padRef.current.style.opacity = '1';
      }

      // Rocket motion: vibrates on the pad, then accelerates upward (slow start)
      let lift = 0;
      if (t > T_LIFT) {
        const p = (t - T_LIFT) / FLIGHT;
        lift = travel * Math.pow(p, 2.3);
      }
      const shakeAmp = t < T_IGN ? 0 : t < T_LIFT ? 1.4 : t < T_LIFT + 900 ? 2.2 : 0;
      const shake = shakeAmp ? (Math.random() - 0.5) * shakeAmp : 0;
      if (lift > travel + 160) {
        wrapper.style.display = 'none';
      } else {
        wrapper.style.transform = `translate3d(${cx + shake}px, ${cy0 - lift}px, 0) translate(-50%, -50%) rotate(-90deg)`;
      }
      const nozzleY = cy0 - lift + rocketW * 0.14;

      // Ground blast smoke: spreads sideways along the pad
      if (t > T_IGN && t < T_LIFT + 1500) {
        groundAcc += dtMs * (t < T_LIFT ? 0.022 : 0.04);
        while (groundAcc >= 1) {
          groundAcc -= 1;
          const side = Math.random() < 0.5 ? -1 : 1;
          clouds.push({
            x: cx + side * Math.random() * rocketW * 0.05,
            y: padY - 4 - Math.random() * 14,
            vx: side * (1.8 + Math.random() * 4.2),
            vy: -0.1 - Math.random() * 0.3,
            r0: 26 + Math.random() * 16,
            rMax: 90 + Math.random() * 60,
            age: 0,
            life: 2200 + Math.random() * 600,
            alpha0: 0.6,
            hot: Math.random() < 0.4,
          });
        }
      }

      // Exhaust trail: smoke left hanging behind the climbing rocket
      if (t > T_LIFT && nozzleY > -60 && nozzleY < height + 100) {
        trailAcc += dtMs * 0.032;
        while (trailAcc >= 1) {
          trailAcc -= 1;
          clouds.push({
            x: cx + (Math.random() - 0.5) * 14,
            y: nozzleY + 12,
            vx: (Math.random() - 0.5) * 1.2,
            vy: 0.15 + Math.random() * 0.3,
            r0: 20 + Math.random() * 10,
            rMax: 55 + Math.random() * 35,
            age: 0,
            life: 1800 + Math.random() * 500,
            alpha0: 0.5,
            hot: Math.random() < 0.25,
          });
        }
      }

      // Page info appears slowly while the rocket is already climbing
      if (t > T_REVEAL) triggerReveal();
      if (curtainRef.current) {
        const f = t > T_REVEAL ? Math.min(1, (t - T_REVEAL) / FADE) : 0;
        const eased = f * f * (3 - 2 * f);
        curtainRef.current.style.opacity = String(1 - eased);
      }

      // Draw smoke
      ctx.clearRect(0, 0, width, height);
      for (let i = clouds.length - 1; i >= 0; i--) {
        const c = clouds[i];
        c.age += dtMs;
        if (c.age >= c.life) {
          clouds.splice(i, 1);
          continue;
        }
        const drag = Math.pow(0.975, k);
        c.vx *= drag;
        c.x += c.vx * k;
        c.y += c.vy * k;

        const life = c.age / c.life;
        const grow = 1 - Math.pow(1 - Math.min(1, c.age / 1400), 2);
        const radius = c.r0 + (c.rMax - c.r0) * grow;
        const fadeIn = Math.min(1, c.age / 160);
        const alpha = c.alpha0 * fadeIn * Math.pow(1 - life, 1.3);

        const sprite = c.hot && c.age < 380 ? spriteHot : spriteSmoke;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite, c.x - radius, c.y - radius, radius * 2, radius * 2);
      }
      ctx.globalAlpha = 1;

      const rocketGone = lift > travel + 160;
      if ((t > T_LIFT + FLIGHT && rocketGone && clouds.length === 0) || t > 8000) {
        triggerReveal();
        setActive(false);
        return;
      }
      animFrameRef.current = requestAnimationFrame(animate);
    };

    animFrameRef.current = requestAnimationFrame(animate);

    return () => {
      clearTimeout(safetyTimer);
      clearTimeout(rumbleTimer);
      window.removeEventListener('resize', layout);
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      audioCtx?.close().catch(() => undefined);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
    >
      {/* Opaque stage: fades out slowly to reveal the page */}
      <div
        ref={curtainRef}
        className="absolute inset-0 pointer-events-none will-change-[opacity]"
        style={{ backgroundColor: isDark ? '#090b10' : '#fafaf8' }}
      >
        {/* Launch pad: ground line + ignition glow */}
        <div
          ref={padRef}
          className="absolute left-0 right-0 transition-opacity duration-700"
          style={{ opacity: 0, top: '74%' }}
        >
          <div
            className="absolute left-1/2 h-40 w-[70%] max-w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{
              background:
                'radial-gradient(ellipse at center, rgba(255,150,60,0.45) 0%, rgba(255,110,30,0.18) 40%, rgba(0,0,0,0) 70%)',
            }}
          />
          <div
            className="absolute left-1/2 h-px w-[80%] -translate-x-1/2"
            style={{
              background:
                'linear-gradient(to right, transparent, rgba(56,189,248,0.5), transparent)',
            }}
          />
        </div>

        {/* Countdown / status */}
        <div className="absolute left-1/2 top-8 flex -translate-x-1/2 items-center gap-2 opacity-60">
          <span className="h-2 w-2 animate-ping rounded-full bg-[var(--accent)]" />
          <span
            ref={labelRef}
            className="font-mono text-[11px] font-semibold uppercase tracking-[0.3em] text-[var(--ink)]"
          >
            T−3
          </span>
        </div>
      </div>

      {/* Smoke canvas */}
      <canvas ref={canvasRef} className="pointer-events-none absolute inset-0 z-20 h-full w-full" />

      {/* Big vertical rocket (SVG points right → rotated to point up) */}
      <div
        ref={rocketWrapperRef}
        className="pointer-events-none absolute left-0 top-0 z-30 will-change-transform"
        style={{ transform: 'translate3d(50vw, 60vh, 0) translate(-50%, -50%) rotate(-90deg)' }}
      >
        <OrbitalRocketVessel className="h-full w-full overflow-visible select-none pointer-events-none" />
      </div>

      {/* Subtle Skip Button */}
      <div className="absolute bottom-6 right-6 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 px-3.5 py-1 text-[11px] font-medium text-[var(--ink-muted)] shadow-sm backdrop-blur-md transition-all hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)]">
        Click anywhere to skip ✕
      </div>
    </div>
  );
};
