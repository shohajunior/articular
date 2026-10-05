import React from 'react';

export interface OrbitalRocketVesselProps {
  className?: string;
}

// High-detail aerospace orbital rocket vessel (Falcon / Starship inspired heavy launcher)
export const OrbitalRocketVessel: React.FC<OrbitalRocketVesselProps> = ({
  className = 'w-24 h-10 sm:w-32 sm:h-13 overflow-visible filter drop-shadow-[0_0_18px_rgba(56,189,248,0.85)] select-none pointer-events-none',
}) => (
  <svg
    viewBox="-38 0 128 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* 3D Cylindrical lighting for rocket body */}
      <linearGradient id="rocketBodyGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#0f172a" />
        <stop offset="18%" stopColor="#475569" />
        <stop offset="45%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#cbd5e1" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Aerodynamic fairing nosecone gradient */}
      <linearGradient id="rocketFairingGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="35%" stopColor="#f8fafc" />
        <stop offset="75%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#38bdf8" />
      </linearGradient>

      {/* Interstage and booster separation band */}
      <linearGradient id="interstageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#020617" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#090d16" />
      </linearGradient>

      {/* Titanium aerodynamic stabilizer fins */}
      <linearGradient id="rocketFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#0284c7" />
        <stop offset="40%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#1e293b" />
      </linearGradient>

      {/* Rocket flame: fiery hypergolic blast (outer plume) */}
      <linearGradient id="outerFlameGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="30%" stopColor="#f97316" stopOpacity="0.85" />
        <stop offset="70%" stopColor="#dc2626" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
      </linearGradient>

      {/* Rocket flame: supersonic core plasma (inner plume) */}
      <linearGradient id="plasmaCoreGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="25%" stopColor="#38bdf8" stopOpacity="0.95" />
        <stop offset="65%" stopColor="#2563eb" stopOpacity="0.7" />
        <stop offset="100%" stopColor="#1d4ed8" stopOpacity="0" />
      </linearGradient>

      {/* Thruster Engine Bloom filter */}
      <filter id="rocketBloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="3" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ========================================================= */}
    {/* 1. SUPERSONIC ROCKET EXHAUST PLUME & MACH SHOCK DIAMONDS   */}
    {/* ========================================================= */}
    <g filter="url(#rocketBloom)">
      {/* Outer expanding turbulent flame */}
      <path
        d="M 10 14.5 C -4 11, -22 8, -36 20 C -22 32, -4 29, 10 25.5 Z"
        fill="url(#outerFlameGrad)"
        className="animate-pulse"
      />

      {/* Concentrated high-velocity plasma jet */}
      <path
        d="M 10 16.5 C 0 16.5, -16 17.5, -28 20 C -16 22.5, 0 23.5, 10 23.5 Z"
        fill="url(#plasmaCoreGrad)"
      />

      {/* White-hot ignition spike */}
      <polygon points="10,18.5 -12,20 10,21.5" fill="#ffffff" opacity="0.95" />

      {/* Supersonic Mach Shock Diamonds */}
      <polygon points="5,20 2,18 -1,20 2,22" fill="#ffffff" opacity="0.95" />
      <polygon points="-4,20 -7,18.5 -10,20 -7,21.5" fill="#7dd3fc" opacity="0.9" />
      <polygon points="-13,20 -16,19 -19,20 -16,21" fill="#38bdf8" opacity="0.8" />

      {/* High-speed glowing particle sparks */}
      <circle cx="-25" cy="18" r="1" fill="#fde047" className="animate-ping" />
      <circle cx="-32" cy="22" r="0.8" fill="#38bdf8" />
      <circle cx="-18" cy="14" r="0.7" fill="#fb923c" />
    </g>

    {/* ========================================================= */}
    {/* 2. AERODYNAMIC ROCKET BASE STABILIZER FINS                 */}
    {/* ========================================================= */}
    {/* Upper Delta Fin */}
    <path
      d="M 28 14.5 L 12 5 L 16 14.5 Z"
      fill="url(#rocketFinGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="5" r="1.2" fill="#38bdf8" className="animate-ping" />

    {/* Lower Delta Fin */}
    <path
      d="M 28 25.5 L 12 35 L 16 25.5 Z"
      fill="url(#rocketFinGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.8"
    />
    <circle cx="12" cy="35" r="1.2" fill="#38bdf8" className="animate-ping" />

    {/* ========================================================= */}
    {/* 3. ROCKET ENGINE NOZZLE (BELL GIMBAL)                     */}
    {/* ========================================================= */}
    <path
      d="M 16 16.5 L 9 14.5 L 8 25.5 L 16 23.5 Z"
      fill="#0b0f19"
      stroke="#38bdf8"
      strokeWidth="0.9"
    />
    {/* Engine bell incandescent rim */}
    <ellipse cx="8.5" cy="20" rx="1" ry="5" fill="#ffffff" opacity="0.8" />

    {/* ========================================================= */}
    {/* 4. FIRST STAGE BOOSTER FUSELAGE (MAIN CYLINDER)           */}
    {/* ========================================================= */}
    {/* Main booster cylindrical body */}
    <rect
      x="16"
      y="14.5"
      width="30"
      height="11"
      rx="1"
      fill="url(#rocketBodyGrad)"
      stroke="rgba(56, 189, 248, 0.6)"
      strokeWidth="0.8"
    />

    {/* Aerospace Black-and-White Roll Pattern (Saturn V / Falcon style) */}
    <rect x="25" y="14.5" width="7" height="5.5" fill="#090d16" />
    <rect x="32" y="20" width="7" height="5.5" fill="#090d16" />

    {/* Longitudinal raceway line (cryogenic / cable feedline) */}
    <line
      x1="16"
      y1="17.5"
      x2="46"
      y2="17.5"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.75"
    />

    {/* Stage rings & weld seams */}
    <line x1="25" y1="14.5" x2="25" y2="25.5" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.6" />
    <line x1="39" y1="14.5" x2="39" y2="25.5" stroke="rgba(56, 189, 248, 0.4)" strokeWidth="0.6" />

    {/* Grid Fins (Titanium hypersonic grid steering fins) */}
    <rect
      x="43"
      y="11.5"
      width="3"
      height="3"
      fill="#0f172a"
      stroke="#38bdf8"
      strokeWidth="0.6"
    />
    <rect
      x="43"
      y="25.5"
      width="3"
      height="3"
      fill="#0f172a"
      stroke="#38bdf8"
      strokeWidth="0.6"
    />

    {/* ========================================================= */}
    {/* 5. INTERSTAGE SEPARATION RING                             */}
    {/* ========================================================= */}
    <rect
      x="46"
      y="15"
      width="5"
      height="10"
      fill="url(#interstageGrad)"
      stroke="rgba(56, 189, 248, 0.7)"
      strokeWidth="0.7"
    />
    <line x1="48.5" y1="15" x2="48.5" y2="25" stroke="#38bdf8" strokeWidth="0.7" strokeDasharray="1.5 1.5" />

    {/* ========================================================= */}
    {/* 6. SECOND STAGE FUSELAGE                                  */}
    {/* ========================================================= */}
    <rect
      x="51"
      y="15"
      width="14"
      height="10"
      fill="url(#rocketBodyGrad)"
      stroke="rgba(56, 189, 248, 0.6)"
      strokeWidth="0.8"
    />
    {/* Second stage telemetry beacon */}
    <circle cx="58" cy="18" r="0.9" fill="#38bdf8" />
    <circle cx="61" cy="18" r="0.9" fill="#22c55e" />

    {/* ========================================================= */}
    {/* 7. AERODYNAMIC PAYLOAD FAIRING (NOSECONE)                 */}
    {/* ========================================================= */}
    {/* Smooth aerodynamic ogive curve tapering to nosecone */}
    <path
      d="M 65 15 C 73 15.5, 78 18.5, 80 20 C 78 21.5, 73 24.5, 65 25 Z"
      fill="url(#rocketFairingGrad)"
      stroke="#38bdf8"
      strokeWidth="0.9"
    />

    {/* Payload Fairing Split Line (Clamshell separation seam) */}
    <line
      x1="65"
      y1="20"
      x2="79"
      y2="20"
      stroke="rgba(56, 189, 248, 0.75)"
      strokeWidth="0.6"
      strokeDasharray="3 1.5"
    />

    {/* Nosecone Specular Reflection Glint */}
    <path
      d="M 66 16.5 C 71 17, 75 18.8, 77 20 C 74 19, 70 18, 66 17.5 Z"
      fill="#ffffff"
      opacity="0.85"
    />

    {/* Launch Escape Probe / Pitot Sensor Needle */}
    <line
      x1="80"
      y1="20"
      x2="86"
      y2="20"
      stroke="#e0f2fe"
      strokeWidth="1.2"
      strokeLinecap="round"
    />
    <circle cx="86" cy="20" r="1.2" fill="#38bdf8" className="animate-ping" />
  </svg>
);
