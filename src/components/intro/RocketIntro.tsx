import React, { useState, useEffect, useRef } from 'react';

interface RocketIntroProps {
  onComplete?: () => void;
}

export const RocketIntro: React.FC<RocketIntroProps> = ({ onComplete }) => {
  const [active, setActive] = useState(true);
  const [rocketPos, setRocketPos] = useState({ x: -200, y: 0, angle: 8, progress: -0.15 });
  const [revealPct, setRevealPct] = useState(0);
  const [revealPctBottom, setRevealPctBottom] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animFrameRef = useRef<number | null>(null);
  const hasTriggeredReveal = useRef(false);

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

    // Detailed Volumetric Smoke Puff with multiple organic sub-lobes
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
      rotation: number;
      rotationSpeed: number;
      age: number;
      lobes: { dx: number; dy: number; r: number }[];
    }

    // High-energy Plasma Sparks & Embers
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
      // Starts just off left edge (-160px) and flies to off right edge (width + 200px)
      const curX = -160 + progress * (width + 360);
      const curY = height * 0.48 + Math.sin(progress * Math.PI) * -35;
      
      // Calculate instantaneous pitch angle
      const dY = Math.cos(progress * Math.PI) * -35 * (Math.PI / flightDuration);
      const dX = (width + 360) / flightDuration;
      const pitchAngle = Math.max(3, Math.min(16, (Math.atan2(dY, dX) * 180) / Math.PI + 7));

      setRocketPos({
        x: curX,
        y: curY,
        angle: pitchAngle,
        progress: curX / width
      });

      // Progressive curtain wipe: reveals the page immediately behind the rocket
      const topPct = Math.max(0, Math.min(100, (curX / width) * 100));
      const bottomPct = Math.max(0, Math.min(100, ((curX - 70) / width) * 100));
      setRevealPct(topPct);
      setRevealPctBottom(bottomPct);

      // Spawn Volumetric Smoke & Supersonic Sparks while rocket is active
      if (progress < 1.08) {
        // Emitter coordinate at rocket nozzle exhaust
        const nozzleX = curX - 35;
        const nozzleY = curY + 2;

        // 1. Multi-lobe Volumetric Smoke Clouds
        const spawnCount = 3;
        for (let i = 0; i < spawnCount; i++) {
          const spreadY = (Math.random() - 0.5) * 22;
          const initialRadius = 18 + Math.random() * 12;
          const maxR = Math.max(140, Math.min(260, height * 0.35)) + Math.random() * 50;

          // Generate 3-4 organic sub-lobes per cloud cluster
          const lobeCount = 3 + Math.floor(Math.random() * 2);
          const lobes = [];
          for (let l = 0; l < lobeCount; l++) {
            const angle = (l / lobeCount) * Math.PI * 2 + Math.random() * 0.5;
            const dist = 0.35 + Math.random() * 0.4;
            lobes.push({
              dx: Math.cos(angle) * dist,
              dy: Math.sin(angle) * dist,
              r: 0.65 + Math.random() * 0.35
            });
          }

          smokeClouds.push({
            x: nozzleX - Math.random() * 15,
            y: nozzleY + spreadY,
            vx: -3.5 - Math.random() * 3,
            vy: (Math.random() - 0.5) * 2.8 - 0.2, // slight buoyant rise
            radius: initialRadius,
            maxRadius: maxR,
            growthRate: 3.8 + Math.random() * 2.4,
            alpha: 0.92,
            decay: 0.0035 + Math.random() * 0.002,
            rotation: Math.random() * Math.PI * 2,
            rotationSpeed: (Math.random() - 0.5) * 0.03,
            age: 0,
            lobes
          });
        }

        // 2. High-speed Fiery Plasma Sparks & Embers
        for (let s = 0; s < 4; s++) {
          const colors = ['#ffffff', '#38bdf8', '#ffaa33', '#f59e0b', '#60a5fa'];
          sparks.push({
            x: nozzleX + (Math.random() - 0.5) * 8,
            y: nozzleY + (Math.random() - 0.5) * 12,
            vx: -9 - Math.random() * 12,
            vy: (Math.random() - 0.5) * 5,
            size: 1.5 + Math.random() * 2.5,
            alpha: 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 0,
            maxLife: 14 + Math.random() * 18
          });
        }
      }

      ctx.clearRect(0, 0, width, height);

      // Render & Update Smoke Clouds
      for (let i = smokeClouds.length - 1; i >= 0; i--) {
        const c = smokeClouds[i];
        c.age += 1;
        c.x += c.vx;
        c.y += c.vy;
        c.vx *= 0.95; // Atmospheric drag
        c.vy *= 0.97;
        c.rotation += c.rotationSpeed;

        if (c.radius < c.maxRadius) {
          c.radius += c.growthRate;
          c.growthRate *= 0.965; // Natural expansion deceleration
        }

        // Fade out
        if (elapsed > 1100 || c.age > 30) {
          c.alpha -= c.decay * 3.5;
        }

        if (c.alpha <= 0.01) {
          smokeClouds.splice(i, 1);
          continue;
        }

        // Draw multi-lobe cloud cluster
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(c.rotation);

        for (const lobe of c.lobes) {
          const lx = lobe.dx * c.radius;
          const ly = lobe.dy * c.radius;
          const lr = c.radius * lobe.r;

          const grad = ctx.createRadialGradient(lx, ly, 0, lx, ly, lr);

          // Hot ignition tint for very young puffs, transitioning to dense vapor
          if (c.age < 8) {
            grad.addColorStop(0, `rgba(255, 210, 140, ${c.alpha * 0.75})`);
            grad.addColorStop(0.35, `rgba(255, 160, 60, ${c.alpha * 0.45})`);
            grad.addColorStop(0.7, isDark ? `rgba(45, 52, 68, ${c.alpha * 0.3})` : `rgba(215, 225, 238, ${c.alpha * 0.3})`);
            grad.addColorStop(1, isDark ? `rgba(20, 24, 34, 0)` : `rgba(200, 212, 228, 0)`);
          } else {
            if (isDark) {
              grad.addColorStop(0, `rgba(48, 56, 74, ${c.alpha * 0.65})`);
              grad.addColorStop(0.45, `rgba(32, 38, 52, ${c.alpha * 0.4})`);
              grad.addColorStop(0.8, `rgba(20, 24, 34, ${c.alpha * 0.18})`);
              grad.addColorStop(1, `rgba(14, 17, 24, 0)`);
            } else {
              grad.addColorStop(0, `rgba(246, 248, 252, ${c.alpha * 0.8})`);
              grad.addColorStop(0.45, `rgba(224, 232, 244, ${c.alpha * 0.5})`);
              grad.addColorStop(0.8, `rgba(202, 214, 230, ${c.alpha * 0.22})`);
              grad.addColorStop(1, `rgba(188, 202, 220, 0)`);
            }
          }

          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(lx, ly, lr, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      }

      // Render & Update Fiery Sparks
      for (let s = sparks.length - 1; s >= 0; s--) {
        const sp = sparks[s];
        sp.life += 1;
        sp.x += sp.vx;
        sp.y += sp.vy;
        sp.vx *= 0.94;
        sp.alpha = Math.max(0, 1 - sp.life / sp.maxLife);

        if (sp.life >= sp.maxLife || sp.alpha <= 0.05) {
          sparks.splice(s, 1);
          continue;
        }

        ctx.beginPath();
        ctx.fillStyle = sp.color;
        ctx.globalAlpha = sp.alpha;
        ctx.arc(sp.x, sp.y, sp.size, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1;
      }

      // Continue animation until smoke naturally clears
      if (elapsed < 2100) {
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

  const isDark = document.documentElement.classList.contains('dark');

  return (
    <div
      onClick={handleSkip}
      className="fixed inset-0 z-50 cursor-pointer overflow-hidden select-none"
    >
      {/* Dynamic Screen Curtain Layer that unmasks behind the rocket in real-time */}
      <div
        className="absolute inset-0 pointer-events-none transition-[clip-path] duration-75 ease-linear"
        style={{
          backgroundColor: isDark ? '#090b10' : '#fafaf8',
          clipPath: `polygon(${revealPct}% 0%, 100% 0%, 100% 100%, ${revealPctBottom}% 100%)`
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

      {/* High-Detail Aerospace Rocket with Supersonic Plasma Exhaust & Mach Diamonds */}
      {rocketPos.progress < 1.15 && (
        <div
          className="absolute pointer-events-none z-30"
          style={{
            left: `${rocketPos.x}px`,
            top: `${rocketPos.y}px`,
            transform: `translate(-50%, -50%) rotate(${rocketPos.angle}deg)`,
            transformOrigin: '70% 50%'
          }}
        >
          {/* Supersonic Plasma Plume with Mach Shock Diamonds */}
          <div className="absolute -left-36 top-1/2 -translate-y-1/2 pointer-events-none flex items-center">
            {/* Outer Ionized Jet Trail */}
            <div className="relative h-10 w-36 flex items-center justify-end">
              {/* Atmospheric Blue Ion Halo */}
              <div className="absolute right-0 h-10 w-36 rounded-l-full bg-gradient-to-l from-blue-600/70 via-cyan-500/40 to-transparent blur-md animate-pulse" />
              
              {/* Ultra-hot Supersonic Core Flame */}
              <div className="absolute right-1 h-5 w-24 rounded-l-full bg-gradient-to-l from-white via-cyan-300 to-transparent blur-[1.5px]" />
              
              {/* Mach Shock Diamonds (Diamond wave nodes of supersonic gas expansion) */}
              <div className="absolute right-4 flex items-center space-x-2.5 z-10">
                <div className="h-3.5 w-2 rotate-45 bg-white shadow-[0_0_8px_#38bdf8] scale-y-125" />
                <div className="h-3 w-1.8 rotate-45 bg-cyan-100 shadow-[0_0_6px_#0284c7] scale-y-110 opacity-90" />
                <div className="h-2.5 w-1.5 rotate-45 bg-cyan-200 shadow-[0_0_5px_#1f5eea] scale-y-100 opacity-80" />
                <div className="h-2 w-1.2 rotate-45 bg-sky-300 opacity-70" />
              </div>

              {/* Glowing Ceramic Combustion Throat Flash */}
              <div className="absolute -right-2 h-7 w-6 rounded-full bg-amber-400/90 blur-[2.5px] animate-pulse" />
              <div className="absolute -right-1 h-4 w-4 rounded-full bg-white blur-[1px]" />
            </div>
          </div>

          {/* Detailed Aerospace Rocket Vector Craft */}
          <svg
            viewBox="0 0 220 70"
            className="h-16 w-48 drop-shadow-[0_4px_25px_rgba(31,94,234,0.45)] sm:h-20 sm:w-56"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Fuselage Metallic Body Gradient */}
              <linearGradient id="fuselageGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffffff" />
                <stop offset="35%" stopColor="#f1f5f9" />
                <stop offset="70%" stopColor="#cbd5e1" />
                <stop offset="100%" stopColor="#94a3b8" />
              </linearGradient>

              {/* Thermal Protection Heat Shield (Bottom) */}
              <linearGradient id="heatShieldGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#334155" />
                <stop offset="100%" stopColor="#0f172a" />
              </linearGradient>

              {/* Aerospace Accent Blue / Cyan Stripe */}
              <linearGradient id="accentStripeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#0284c7" />
                <stop offset="50%" stopColor="#1f5eea" />
                <stop offset="100%" stopColor="#38bdf8" />
              </linearGradient>

              {/* Canopy Visor Glass */}
              <linearGradient id="canopyGrad" x1="20%" y1="10%" x2="80%" y2="90%">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.9" />
                <stop offset="45%" stopColor="#0284c7" stopOpacity="0.95" />
                <stop offset="100%" stopColor="#0c4a6e" stopOpacity="1" />
              </linearGradient>

              {/* Wing Titanium Shading */}
              <linearGradient id="wingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e2e8f0" />
                <stop offset="50%" stopColor="#94a3b8" />
                <stop offset="100%" stopColor="#475569" />
              </linearGradient>

              {/* Engine Nozzle Machined Metal */}
              <linearGradient id="nozzleGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#1e293b" />
                <stop offset="50%" stopColor="#475569" />
                <stop offset="100%" stopColor="#ffedd5" />
              </linearGradient>
            </defs>

            {/* Machined Inconel Dual Nozzles */}
            <path d="M18 26 L36 28 L36 34 L18 36 Z" fill="url(#nozzleGrad)" stroke="#0f172a" strokeWidth="1" />
            <path d="M18 37 L36 39 L36 45 L18 47 Z" fill="url(#nozzleGrad)" stroke="#0f172a" strokeWidth="1" />
            <ellipse cx="19" cy="31" rx="2" ry="4" fill="#ff7a00" />
            <ellipse cx="19" cy="42" rx="2" ry="4" fill="#ff7a00" />

            {/* Top Stabilizer Fin */}
            <path d="M50 28 L72 10 L94 10 L84 28 Z" fill="url(#wingGrad)" stroke="#334155" strokeWidth="1" />
            <path d="M50 28 L72 10 L94 10" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" fill="none" />
            {/* Aviation Strobe Beacon */}
            <circle cx="92" cy="11" r="2.5" fill="#ef4444" className="animate-ping" />
            <circle cx="92" cy="11" r="1.8" fill="#f87171" />

            {/* Bottom Ventral Delta Fin */}
            <path d="M50 45 L72 63 L94 63 L84 45 Z" fill="url(#wingGrad)" stroke="#1e293b" strokeWidth="1" />
            <path d="M50 45 L72 63 L94 63" stroke="rgba(255,255,255,0.4)" strokeWidth="1.2" fill="none" />
            <circle cx="92" cy="62" r="1.8" fill="#22c55e" />

            {/* Main Aerodynamic Fuselage */}
            <path
              d="M34 27 C34 27, 100 24, 150 26 C180 27, 202 36.5, 202 36.5 C202 36.5, 180 46, 150 47 C100 49, 34 46, 34 46 Z"
              fill="url(#fuselageGrad)"
              stroke="#334155"
              strokeWidth="1.2"
            />

            {/* Lower Thermal Protection Tiles (Black Composite) */}
            <path
              d="M34 38 C70 39, 130 39, 158 38 C182 37.5, 202 36.5, 202 36.5 C202 36.5, 180 46, 150 47 C100 49, 34 46, 34 46 Z"
              fill="url(#heatShieldGrad)"
            />

            {/* Titanium Pitot Tube Probe */}
            <path d="M202 36.5 L218 36.5" stroke="#94a3b8" strokeWidth="1.5" strokeLinecap="round" />
            <circle cx="218" cy="36.5" r="1" fill="#38bdf8" />

            {/* Aerospace Cyan / Cobalt Livery Stripe */}
            <path
              d="M36 32.5 L158 32.5 C175 33.5, 188 35, 194 36 C188 37, 175 38.5, 158 39.5 L36 39.5 Z"
              fill="url(#accentStripeGrad)"
            />

            {/* Cockpit Canopy Visor */}
            <path
              d="M135 27 C148 27.5, 162 29, 172 33 L142 33 C138 30, 135 27, 135 27 Z"
              fill="url(#canopyGrad)"
              stroke="#0284c7"
              strokeWidth="0.8"
            />
            {/* Canopy Specular Glare */}
            <path
              d="M142 28 C150 28.5, 158 29.5, 164 31"
              stroke="rgba(255,255,255,0.85)"
              strokeWidth="1"
              strokeLinecap="round"
            />

            {/* Structural Seam Lines */}
            <line x1="72" y1="25.5" x2="72" y2="47.5" stroke="rgba(100,116,139,0.4)" strokeWidth="0.8" />
            <line x1="110" y1="25.5" x2="110" y2="47.5" stroke="rgba(100,116,139,0.4)" strokeWidth="0.8" />
            <line x1="145" y1="26" x2="145" y2="47" stroke="rgba(100,116,139,0.4)" strokeWidth="0.8" />

            {/* RCS Attitude Thrusters */}
            <rect x="180" y="32" width="2" height="1.5" rx="0.5" fill="#0f172a" />
            <rect x="180" y="40" width="2" height="1.5" rx="0.5" fill="#0f172a" />
            <rect x="76" y="24.5" width="2.5" height="1.5" rx="0.5" fill="#0f172a" />
            <rect x="76" y="47" width="2.5" height="1.5" rx="0.5" fill="#0f172a" />

            {/* Mission Markings */}
            <text x="78" y="37" fill="#ffffff" fontSize="5.5" fontWeight="bold" fontFamily="monospace" letterSpacing="0.8">
              ARTICULAR
            </text>
            <text x="122" y="37" fill="#38bdf8" fontSize="4.5" fontWeight="bold" fontFamily="sans-serif">
              UZ-01
            </text>

            {/* Swept Main Delta Wing (Foreground) */}
            <path
              d="M62 36 L40 48 L76 48 L104 36 Z"
              fill="url(#wingGrad)"
              stroke="#334155"
              strokeWidth="1"
            />
            <path d="M104 36 L76 48" stroke="rgba(255,255,255,0.7)" strokeWidth="1.2" />
          </svg>
        </div>
      )}

      {/* Subtle Skip Button */}
      <div className="absolute bottom-6 right-6 z-40 rounded-full border border-[var(--line)] bg-[var(--surface)]/90 px-3.5 py-1 text-[11px] font-medium text-[var(--ink-muted)] shadow-sm backdrop-blur-md transition-all hover:bg-[var(--surface-elevated)] hover:text-[var(--ink)]">
        Click anywhere to skip ✕
      </div>
    </div>
  );
};

