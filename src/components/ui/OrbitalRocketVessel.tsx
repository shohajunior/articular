import React from 'react';

export interface OrbitalRocketVesselProps {
  className?: string;
}

// Ultra-realistic aerospace orbital launcher (Falcon 9 / Saturn engineering details, no cartoon neon)
export const OrbitalRocketVessel: React.FC<OrbitalRocketVesselProps> = ({
  className = 'w-24 h-10 sm:w-32 sm:h-13 overflow-visible select-none pointer-events-none filter drop-shadow-[0_8px_16px_rgba(0,0,0,0.65)]',
}) => (
  <svg
    viewBox="-38 0 128 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* 3D Cylindrical lighting for white ceramic rocket fuselage */}
      <linearGradient id="fuselageCylinderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="12%" stopColor="#475569" />
        <stop offset="38%" stopColor="#ffffff" />
        <stop offset="68%" stopColor="#e2e8f0" />
        <stop offset="90%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* Aerodynamic fairing nosecone gradient (pure aerospace matte white) */}
      <linearGradient id="fairingNoseGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="30%" stopColor="#ffffff" />
        <stop offset="70%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      {/* Carbon composite interstage separation ring */}
      <linearGradient id="carbonInterstageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#0b0f17" />
        <stop offset="50%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#090d16" />
      </linearGradient>

      {/* Forged titanium aerodynamic stabilizer & grid fins */}
      <linearGradient id="titaniumFinGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="45%" stopColor="#1e293b" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* Niobium rocket engine bell gimbal (heat treated alloy) */}
      <linearGradient id="nozzleMetalGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#090d16" />
        <stop offset="40%" stopColor="#27272a" />
        <stop offset="75%" stopColor="#44403c" />
        <stop offset="100%" stopColor="#18181b" />
      </linearGradient>

      {/* Realistic kerolox turbulent flame plume (pure fire: white -> gold -> fiery orange) */}
      <linearGradient id="outerFireGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="18%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="45%" stopColor="#f59e0b" stopOpacity="0.85" />
        <stop offset="75%" stopColor="#ea580c" stopOpacity="0.5" />
        <stop offset="100%" stopColor="#991b1b" stopOpacity="0" />
      </linearGradient>

      {/* Hypergolic core plasma (superheated white-hot core) */}
      <linearGradient id="innerPlasmaGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="35%" stopColor="#fef3c7" stopOpacity="0.95" />
        <stop offset="75%" stopColor="#fbbf24" stopOpacity="0.65" />
        <stop offset="100%" stopColor="#f97316" stopOpacity="0" />
      </linearGradient>

      {/* Engine incandescent heat bloom */}
      <filter id="flameHeatGlow" x="-60%" y="-60%" width="220%" height="220%">
        <feGaussianBlur stdDeviation="2.5" result="blur" />
        <feMerge>
          <feMergeNode in="blur" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ========================================================= */}
    {/* 1. SUPERSONIC ROCKET EXHAUST PLUME & MACH SHOCK DIAMONDS   */}
    {/* ========================================================= */}
    <g filter="url(#flameHeatGlow)" data-rocket-flame="" style={{ transition: 'opacity 0.4s ease-out' }}>
      {/* Outer expanding turbulent flame */}
      <path
        d="M 9 14 C -5 10, -24 7, -37 20 C -24 33, -5 30, 9 26 Z"
        fill="url(#outerFireGrad)"
      />

      {/* Superheated core plasma jet */}
      <path
        d="M 9 16 C -2 16, -18 17, -29 20 C -18 23, -2 24, 9 24 Z"
        fill="url(#innerPlasmaGrad)"
      />

      {/* Incandescent white-hot throat spike */}
      <polygon points="9,18 -13,20 9,22" fill="#ffffff" opacity="0.98" />

      {/* Supersonic Mach Shock Diamonds (Realistic incandescent diamonds) */}
      <polygon points="4,20 1,18 -2,20 1,22" fill="#ffffff" opacity="0.95" />
      <polygon points="-5,20 -8,18.5 -11,20 -8,21.5" fill="#fef08a" opacity="0.9" />
      <polygon points="-14,20 -17,19 -20,20 -17,21" fill="#fde047" opacity="0.8" />
      <polygon points="-23,20 -25,19.2 -27,20 -25,20.8" fill="#f59e0b" opacity="0.65" />

      {/* Burning combustion embers */}
      <circle cx="-27" cy="18" r="0.9" fill="#fef08a" />
      <circle cx="-33" cy="22" r="0.8" fill="#f97316" />
      <circle cx="-19" cy="14" r="0.7" fill="#ffffff" />
      <circle cx="-22" cy="26" r="0.7" fill="#fbbf24" />
    </g>

    {/* ========================================================= */}
    {/* 2. AERODYNAMIC ROCKET BASE STABILIZER FINS                 */}
    {/* ========================================================= */}
    {/* Upper Titanium Delta Fin */}
    <path
      d="M 28 14.5 L 10 4 L 15 14.5 Z"
      fill="url(#titaniumFinGrad)"
      stroke="#475569"
      strokeWidth="0.6"
    />
    <line x1="16" y1="12" x2="25" y2="14.5" stroke="#64748b" strokeWidth="0.5" />

    {/* Lower Titanium Delta Fin */}
    <path
      d="M 28 25.5 L 10 36 L 15 25.5 Z"
      fill="url(#titaniumFinGrad)"
      stroke="#475569"
      strokeWidth="0.6"
    />
    <line x1="16" y1="28" x2="25" y2="25.5" stroke="#64748b" strokeWidth="0.5" />

    {/* ========================================================= */}
    {/* 3. ENGINE GIMBAL & MAIN NOZZLE BELL                       */}
    {/* ========================================================= */}
    {/* Engine mount gimbal dome */}
    <path
      d="M 16 16.5 L 8 14 L 7 26 L 16 23.5 Z"
      fill="url(#nozzleMetalGrad)"
      stroke="#27272a"
      strokeWidth="0.7"
    />
    {/* Nozzle throat stiffening rings */}
    <line x1="12" y1="15.2" x2="12" y2="24.8" stroke="#52525b" strokeWidth="0.6" />
    <line x1="10" y1="14.6" x2="10" y2="25.4" stroke="#52525b" strokeWidth="0.6" />
    {/* Incandescent white-hot nozzle exit rim */}
    <ellipse cx="7.5" cy="20" rx="1.2" ry="5.5" fill="#fef3c7" stroke="#ea580c" strokeWidth="0.4" />

    {/* ========================================================= */}
    {/* 4. FIRST STAGE BOOSTER FUSELAGE (MAIN CYLINDER)           */}
    {/* ========================================================= */}
    {/* Booster main cylinder */}
    <rect
      x="16"
      y="14.5"
      width="31"
      height="11"
      rx="0.8"
      fill="url(#fuselageCylinderGrad)"
      stroke="#475569"
      strokeWidth="0.6"
    />

    {/* Real Aerospace Roll-Pattern Markings (Saturn V / Falcon roll orientation) */}
    <rect x="25" y="14.5" width="7" height="5.5" fill="#18181b" />
    <rect x="32" y="20" width="7" height="5.5" fill="#18181b" />

    {/* Cryogenic fuel raceway / cable tray feedline */}
    <line
      x1="16"
      y1="17.2"
      x2="47"
      y2="17.2"
      stroke="#64748b"
      strokeWidth="0.8"
    />
    <line
      x1="16"
      y1="17.2"
      x2="47"
      y2="17.2"
      stroke="#ffffff"
      strokeWidth="0.4"
      opacity="0.7"
    />

    {/* Weld seams and staging ring collars */}
    <line x1="25" y1="14.5" x2="25" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="39" y1="14.5" x2="39" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />

    {/* Hold-down clamp attachment brackets */}
    <rect x="17" y="13.8" width="2" height="1.2" fill="#334155" />
    <rect x="17" y="25" width="2" height="1.2" fill="#334155" />

    {/* Titanium Hypersonic Grid Fins (Unfolded steering grid mesh) */}
    <g>
      <rect x="43" y="10.8" width="3.5" height="3.7" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" rx="0.4" />
      <line x1="44.2" y1="10.8" x2="44.2" y2="14.5" stroke="#94a3b8" strokeWidth="0.4" />
      <line x1="45.4" y1="10.8" x2="45.4" y2="14.5" stroke="#94a3b8" strokeWidth="0.4" />
      <line x1="43" y1="12.6" x2="46.5" y2="12.6" stroke="#94a3b8" strokeWidth="0.4" />

      <rect x="43" y="25.5" width="3.5" height="3.7" fill="#1e293b" stroke="#64748b" strokeWidth="0.5" rx="0.4" />
      <line x1="44.2" y1="25.5" x2="44.2" y2="29.2" stroke="#94a3b8" strokeWidth="0.4" />
      <line x1="45.4" y1="25.5" x2="45.4" y2="29.2" stroke="#94a3b8" strokeWidth="0.4" />
      <line x1="43" y1="27.3" x2="46.5" y2="27.3" stroke="#94a3b8" strokeWidth="0.4" />
    </g>

    {/* ========================================================= */}
    {/* 5. INTERSTAGE COMPOSITE SEPARATION RING                   */}
    {/* ========================================================= */}
    <rect
      x="47"
      y="14.8"
      width="4.5"
      height="10.4"
      fill="url(#carbonInterstageGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />
    {/* Vented stage separation seam & pushers */}
    <line x1="49.2" y1="14.8" x2="49.2" y2="25.2" stroke="#64748b" strokeWidth="0.6" strokeDasharray="1.2 1.2" />

    {/* ========================================================= */}
    {/* 6. SECOND STAGE FUSELAGE                                  */}
    {/* ========================================================= */}
    <rect
      x="51.5"
      y="14.8"
      width="13.5"
      height="10.4"
      fill="url(#fuselageCylinderGrad)"
      stroke="#475569"
      strokeWidth="0.6"
    />
    {/* Cold-gas nitrogen RCS attitude control thrusters */}
    <circle cx="53" cy="15.8" r="0.5" fill="#0f172a" stroke="#64748b" strokeWidth="0.3" />
    <circle cx="53" cy="24.2" r="0.5" fill="#0f172a" stroke="#64748b" strokeWidth="0.3" />

    {/* National Aerospace Marking / Serial stencil */}
    <line x1="56" y1="18.5" x2="62" y2="18.5" stroke="#0f172a" strokeWidth="0.8" />
    <line x1="56" y1="20" x2="60" y2="20" stroke="#64748b" strokeWidth="0.5" />

    {/* ========================================================= */}
    {/* 7. AERODYNAMIC PAYLOAD FAIRING (NOSECONE)                 */}
    {/* ========================================================= */}
    {/* Smooth aerodynamic ogive curve tapering to nosecone */}
    <path
      d="M 65 14.8 C 73.5 15.3, 78.5 18.2, 81 20 C 78.5 21.8, 73.5 24.7, 65 25.2 Z"
      fill="url(#fairingNoseGrad)"
      stroke="#475569"
      strokeWidth="0.6"
    />

    {/* Clamshell payload fairing split line */}
    <line
      x1="65"
      y1="20"
      x2="80"
      y2="20"
      stroke="#334155"
      strokeWidth="0.5"
      strokeDasharray="2 1"
    />

    {/* Specular sunlight highlight reflection along fairing */}
    <path
      d="M 66 16.5 C 71.5 17, 75.5 18.8, 77.5 20 C 74.5 19.2, 70.5 18, 66 17.5 Z"
      fill="#ffffff"
      opacity="0.8"
    />

    {/* Titanium Pitot probe / sensor needle */}
    <line
      x1="81"
      y1="20"
      x2="86.5"
      y2="20"
      stroke="#cbd5e1"
      strokeWidth="0.9"
      strokeLinecap="round"
    />
    <circle cx="86.5" cy="20" r="0.7" fill="#f8fafc" />
  </svg>
);
