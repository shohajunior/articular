import React from 'react';

export interface OrbitalRocketVesselProps {
  className?: string;
  showFlame?: boolean;
}

/**
 * Ultra-realistic aerospace orbital launch vessel.
 * Authentic engineering details: Falcon 9 / Saturn class multi-stage launcher.
 * - Cylindrical 3D lighting with friction-stir weld seams
 * - High-contrast roll telemetry checkerboard markings & stencils
 * - Cryogenic liquid oxygen frost band on booster tank
 * - Dual avionics raceways with mounting clamp brackets
 * - Deployed titanium hypersonic grid fins with interior lattice mesh
 * - Carbon-composite interstage with stage pushers and vent louvers
 * - Cold-gas nitrogen RCS attitude thruster quads
 * - Ogive payload fairing with clamshell separation seams and pitot sensor probe
 * - Regeneratively cooled nozzle bell with gimbal pushrods
 * - Authentic supersonic Kerolox exhaust plume with incandescent Mach shock diamonds (zero neon)
 */
export const OrbitalRocketVessel: React.FC<OrbitalRocketVesselProps> = ({
  className = 'w-24 h-10 sm:w-32 sm:h-13 overflow-visible select-none pointer-events-none filter drop-shadow-[0_8px_18px_rgba(0,0,0,0.65)]',
  showFlame = true,
}) => (
  <svg
    viewBox="-48 0 148 40"
    className={className}
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <defs>
      {/* 1. Cylindrical 3D lighting for matte ceramic white booster fuselage */}
      <linearGradient id="fuselageCylinderGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="#1e293b" />
        <stop offset="8%" stopColor="#475569" />
        <stop offset="28%" stopColor="#f8fafc" />
        <stop offset="46%" stopColor="#ffffff" />
        <stop offset="72%" stopColor="#e2e8f0" />
        <stop offset="90%" stopColor="#94a3b8" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* 2. Aerodynamic nosecone fairing gradient */}
      <linearGradient id="fairingNoseGrad" x1="0%" y1="0%" x2="100%" y2="45%">
        <stop offset="0%" stopColor="#334155" />
        <stop offset="22%" stopColor="#ffffff" />
        <stop offset="65%" stopColor="#e2e8f0" />
        <stop offset="100%" stopColor="#64748b" />
      </linearGradient>

      {/* 3. Cryogenic LOX tank frost sheen (sub-cooled oxygen frost band) */}
      <linearGradient id="loxFrostGrad" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" stopColor="rgba(255,255,255,0.4)" />
        <stop offset="35%" stopColor="rgba(255,255,255,0.85)" />
        <stop offset="70%" stopColor="rgba(241,245,249,0.5)" />
        <stop offset="100%" stopColor="rgba(203,213,225,0.2)" />
      </linearGradient>

      {/* 4. Carbon-composite interstage separation ring */}
      <linearGradient id="carbonInterstageGrad" x1="0%" y1="0%" x2="100%" y2="0%">
        <stop offset="0%" stopColor="#090d16" />
        <stop offset="30%" stopColor="#1e293b" />
        <stop offset="70%" stopColor="#0f172a" />
        <stop offset="100%" stopColor="#070a10" />
      </linearGradient>

      {/* 5. Titanium grid fins and base delta fins */}
      <linearGradient id="titaniumMetalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#475569" />
        <stop offset="50%" stopColor="#334155" />
        <stop offset="100%" stopColor="#0f172a" />
      </linearGradient>

      {/* 6. Heat-treated niobium nozzle bell with high-temperature oxidation */}
      <linearGradient id="nozzleAlloyGrad" x1="0%" y1="0%" x2="100%" y2="50%">
        <stop offset="0%" stopColor="#0a0a0c" />
        <stop offset="35%" stopColor="#27272a" />
        <stop offset="70%" stopColor="#3f3f46" />
        <stop offset="90%" stopColor="#52525b" />
        <stop offset="100%" stopColor="#18181b" />
      </linearGradient>

      {/* 7. Realistic Kerolox supersonic exhaust plume (Pure fire: white -> gold -> amber -> deep red) */}
      <linearGradient id="keroloxOuterPlumeGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="0.98" />
        <stop offset="15%" stopColor="#fef08a" stopOpacity="0.95" />
        <stop offset="38%" stopColor="#f59e0b" stopOpacity="0.88" />
        <stop offset="68%" stopColor="#ea580c" stopOpacity="0.55" />
        <stop offset="90%" stopColor="#b91c1c" stopOpacity="0.22" />
        <stop offset="100%" stopColor="#7f1d1d" stopOpacity="0" />
      </linearGradient>

      {/* 8. Superheated core plasma stream */}
      <linearGradient id="plasmaCoreGrad" x1="100%" y1="0%" x2="0%" y2="0%">
        <stop offset="0%" stopColor="#ffffff" stopOpacity="1" />
        <stop offset="30%" stopColor="#fef9c3" stopOpacity="0.98" />
        <stop offset="65%" stopColor="#fde047" stopOpacity="0.75" />
        <stop offset="92%" stopColor="#fb923c" stopOpacity="0.3" />
        <stop offset="100%" stopColor="#ea580c" stopOpacity="0" />
      </linearGradient>

      {/* 9. Incandescent heat bloom filter */}
      <filter id="exhaustHeatBloom" x="-50%" y="-50%" width="200%" height="200%">
        <feGaussianBlur stdDeviation="2.2" result="glow" />
        <feMerge>
          <feMergeNode in="glow" />
          <feMergeNode in="SourceGraphic" />
        </feMerge>
      </filter>
    </defs>

    {/* ========================================================================= */}
    {/* 1. SUPERSONIC EXHAUST PLUME & MACH SHOCK DIAMONDS (NO NEON, PURE FIRE)    */}
    {/* ========================================================================= */}
    {showFlame && (
      <g
        filter="url(#exhaustHeatBloom)"
        data-rocket-flame=""
        style={{ transition: 'opacity 0.35s ease-out' }}
      >
        {/* Outer expanding turbulent flame envelope */}
        <path
          d="M 8 13.8 C -6 9, -28 5, -46 20 C -28 35, -6 31, 8 26.2 Z"
          fill="url(#keroloxOuterPlumeGrad)"
        />

        {/* Superheated core plasma jet */}
        <path
          d="M 8 16 C -4 15.5, -22 16.5, -36 20 C -22 23.5, -4 24.5, 8 24 Z"
          fill="url(#plasmaCoreGrad)"
        />

        {/* Incandescent white-hot throat needle */}
        <polygon points="8,17.5 -16,20 8,22.5" fill="#ffffff" opacity="0.98" />

        {/* Supersonic Mach Shock Diamonds (Realistic physical compression disks) */}
        {/* Diamond 1 (Closest to throat - pure blinding white) */}
        <polygon points="4,20 0.5,17.8 -3,20 0.5,22.2" fill="#ffffff" opacity="0.98" />
        <line x1="-3" y1="18.5" x2="-3" y2="21.5" stroke="#ffffff" strokeWidth="0.6" opacity="0.9" />

        {/* Diamond 2 (Solar gold) */}
        <polygon points="-7,20 -10.5,18.3 -14,20 -10.5,21.7" fill="#fef08a" opacity="0.95" />
        <line x1="-14" y1="18.8" x2="-14" y2="21.2" stroke="#fef08a" strokeWidth="0.5" opacity="0.85" />

        {/* Diamond 3 (Amber) */}
        <polygon points="-18,20 -21,18.7 -24,20 -21,21.3" fill="#fde047" opacity="0.85" />

        {/* Diamond 4 (Deep orange-gold) */}
        <polygon points="-28,20 -30.5,19.1 -33,20 -30.5,20.9" fill="#f59e0b" opacity="0.7" />

        {/* Incandescent carbon soot embers */}
        <circle cx="-32" cy="17.2" r="1.1" fill="#fef08a" />
        <circle cx="-39" cy="22.8" r="0.9" fill="#f97316" />
        <circle cx="-23" cy="13.5" r="0.8" fill="#ffffff" />
        <circle cx="-27" cy="26.5" r="0.8" fill="#fbbf24" />
        <circle cx="-42" cy="19.4" r="0.7" fill="#ea580c" />
      </g>
    )}

    {/* ========================================================================= */}
    {/* 2. AERODYNAMIC BASE STABILIZATION FINS (TITANIUM DELTA STRUCTURE)          */}
    {/* ========================================================================= */}
    {/* Upper Delta Fin */}
    <path
      d="M 28 14.5 L 9 3.5 L 14.5 14.5 Z"
      fill="url(#titaniumMetalGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />
    <line x1="15" y1="11.5" x2="25" y2="14.5" stroke="#64748b" strokeWidth="0.5" />
    <circle cx="16" cy="12" r="0.4" fill="#94a3b8" />

    {/* Lower Delta Fin */}
    <path
      d="M 28 25.5 L 9 36.5 L 14.5 25.5 Z"
      fill="url(#titaniumMetalGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />
    <line x1="15" y1="28.5" x2="25" y2="25.5" stroke="#64748b" strokeWidth="0.5" />
    <circle cx="16" cy="28" r="0.4" fill="#94a3b8" />

    {/* ========================================================================= */}
    {/* 3. MAIN ROCKET ENGINE GIMBAL & REGENERATIVELY COOLED NOZZLE BELL           */}
    {/* ========================================================================= */}
    {/* Thrust puck & octaweb base mount */}
    <rect x="15" y="14" width="2.5" height="12" fill="#18181b" stroke="#27272a" strokeWidth="0.5" />

    {/* Dual hydraulic gimbal pushrod actuators */}
    <line x1="16" y1="16" x2="11.5" y2="16.8" stroke="#71717a" strokeWidth="0.9" />
    <line x1="16" y1="24" x2="11.5" y2="23.2" stroke="#71717a" strokeWidth="0.9" />
    <circle cx="16" cy="16" r="0.6" fill="#a1a1aa" />
    <circle cx="16" cy="24" r="0.6" fill="#a1a1aa" />

    {/* Main Nozzle Bell (Niobium heat-treated alloy contour) */}
    <path
      d="M 15.5 16.8 L 7.5 13.8 L 6.5 26.2 L 15.5 23.2 Z"
      fill="url(#nozzleAlloyGrad)"
      stroke="#27272a"
      strokeWidth="0.7"
    />

    {/* Vertical regenerative cooling channels (corrugations along the nozzle skirt) */}
    <line x1="13.5" y1="16.2" x2="13.5" y2="23.8" stroke="#52525b" strokeWidth="0.5" />
    <line x1="11.5" y1="15.5" x2="11.5" y2="24.5" stroke="#52525b" strokeWidth="0.5" />
    <line x1="9.5" y1="14.8" x2="9.5" y2="25.2" stroke="#52525b" strokeWidth="0.5" />

    {/* Circumferential stiffening hat-bands */}
    <path d="M 13.5 16.2 C 12 18, 12 22, 13.5 23.8" stroke="#3f3f46" strokeWidth="0.5" fill="none" />
    <path d="M 10 15 C 8.5 17.5, 8.5 22.5, 10 25" stroke="#3f3f46" strokeWidth="0.5" fill="none" />

    {/* Incandescent white-hot interior nozzle throat exit rim */}
    <ellipse cx="7" cy="20" rx="1.2" ry="6" fill="#fef3c7" stroke="#ea580c" strokeWidth="0.5" />

    {/* ========================================================================= */}
    {/* 4. FIRST STAGE BOOSTER FUSELAGE (MAIN ALUMINUM-LITHIUM BARREL)             */}
    {/* ========================================================================= */}
    {/* Main Cylindrical Fuselage */}
    <rect
      x="16"
      y="14.5"
      width="36"
      height="11"
      rx="0.5"
      fill="url(#fuselageCylinderGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />

    {/* Friction-stir weld circumferential station seams */}
    <line x1="23" y1="14.5" x2="23" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="30" y1="14.5" x2="30" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="37" y1="14.5" x2="37" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />
    <line x1="44" y1="14.5" x2="44" y2="25.5" stroke="#94a3b8" strokeWidth="0.5" />

    {/* Cryogenic Liquid Oxygen Frost Band (Mid-body sub-cooled frost zone) */}
    <rect
      x="31"
      y="14.8"
      width="12.5"
      height="10.4"
      fill="url(#loxFrostGrad)"
      opacity="0.85"
    />

    {/* Real Aerospace Roll-Pattern Telemetry Markings (Black/white orientation targets) */}
    <rect x="24" y="14.5" width="6" height="5.5" fill="#0f172a" />
    <rect x="30" y="20" width="6" height="5.5" fill="#0f172a" />

    {/* Base hold-down clamp attachment brackets */}
    <rect x="17" y="13.6" width="2.4" height="1.4" fill="#1e293b" stroke="#475569" strokeWidth="0.4" rx="0.3" />
    <rect x="17" y="25" width="2.4" height="1.4" fill="#1e293b" stroke="#475569" strokeWidth="0.4" rx="0.3" />

    {/* Aerodynamic Systems & Cable Raceway (Spine conduit) */}
    {/* Dark raceway shadow line */}
    <line x1="16" y1="17.2" x2="52" y2="17.2" stroke="#475569" strokeWidth="0.9" />
    {/* Bright raceway specular highlight line */}
    <line x1="16" y1="16.7" x2="52" y2="16.7" stroke="#ffffff" strokeWidth="0.45" opacity="0.8" />
    {/* Raceway mounting brackets */}
    <line x1="20" y1="16.3" x2="20" y2="17.6" stroke="#0f172a" strokeWidth="0.6" />
    <line x1="27" y1="16.3" x2="27" y2="17.6" stroke="#0f172a" strokeWidth="0.6" />
    <line x1="34" y1="16.3" x2="34" y2="17.6" stroke="#0f172a" strokeWidth="0.6" />
    <line x1="41" y1="16.3" x2="41" y2="17.6" stroke="#0f172a" strokeWidth="0.6" />
    <line x1="48" y1="16.3" x2="48" y2="17.6" stroke="#0f172a" strokeWidth="0.6" />

    {/* Hazardous cryogenic warning band (Fine orange/black stripe) */}
    <line x1="43.5" y1="14.5" x2="43.5" y2="25.5" stroke="#ea580c" strokeWidth="0.7" />
    <line x1="44" y1="14.5" x2="44" y2="25.5" stroke="#18181b" strokeWidth="0.3" strokeDasharray="0.8 0.8" />

    {/* ========================================================================= */}
    {/* 5. TITANIUM HYPERSONIC GRID FINS WITH REAL INTERNAL LATTICE MESH          */}
    {/* ========================================================================= */}
    {/* Upper Grid Fin */}
    <g>
      {/* Fin frame */}
      <rect
        x="47"
        y="10.2"
        width="4"
        height="4.3"
        fill="url(#titaniumMetalGrad)"
        stroke="#475569"
        strokeWidth="0.5"
        rx="0.3"
      />
      {/* Internal titanium lattice mesh */}
      <line x1="48.3" y1="10.2" x2="48.3" y2="14.5" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="49.7" y1="10.2" x2="49.7" y2="14.5" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="47" y1="11.6" x2="51" y2="11.6" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="47" y1="13.1" x2="51" y2="13.1" stroke="#94a3b8" strokeWidth="0.35" />
      {/* Heavy gimbal drive hinge */}
      <rect x="48" y="14.2" width="2" height="0.6" fill="#0f172a" />
    </g>

    {/* Lower Grid Fin */}
    <g>
      {/* Fin frame */}
      <rect
        x="47"
        y="25.5"
        width="4"
        height="4.3"
        fill="url(#titaniumMetalGrad)"
        stroke="#475569"
        strokeWidth="0.5"
        rx="0.3"
      />
      {/* Internal titanium lattice mesh */}
      <line x1="48.3" y1="25.5" x2="48.3" y2="29.8" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="49.7" y1="25.5" x2="49.7" y2="29.8" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="47" y1="26.9" x2="51" y2="26.9" stroke="#94a3b8" strokeWidth="0.35" />
      <line x1="47" y1="28.4" x2="51" y2="28.4" stroke="#94a3b8" strokeWidth="0.35" />
      {/* Heavy gimbal drive hinge */}
      <rect x="48" y="25.2" width="2" height="0.6" fill="#0f172a" />
    </g>

    {/* ========================================================================= */}
    {/* 6. CARBON-COMPOSITE INTERSTAGE SEPARATION RING                            */}
    {/* ========================================================================= */}
    <rect
      x="52"
      y="14.7"
      width="5.2"
      height="10.6"
      fill="url(#carbonInterstageGrad)"
      stroke="#1e293b"
      strokeWidth="0.6"
    />

    {/* Interstage purge vent louvers (Mesh grill) */}
    <line x1="53.5" y1="16.5" x2="55.5" y2="16.5" stroke="#475569" strokeWidth="0.5" />
    <line x1="53.5" y1="18" x2="55.5" y2="18" stroke="#475569" strokeWidth="0.5" />
    <line x1="53.5" y1="22" x2="55.5" y2="22" stroke="#475569" strokeWidth="0.5" />
    <line x1="53.5" y1="23.5" x2="55.5" y2="23.5" stroke="#475569" strokeWidth="0.5" />

    {/* Pneumatic stage separation pushers & frangible seam */}
    <line
      x1="54.5"
      y1="14.7"
      x2="54.5"
      y2="25.3"
      stroke="#94a3b8"
      strokeWidth="0.5"
      strokeDasharray="1.2 1"
    />
    <circle cx="54.5" cy="17.2" r="0.4" fill="#ffffff" />
    <circle cx="54.5" cy="22.8" r="0.4" fill="#ffffff" />

    {/* ========================================================================= */}
    {/* 7. SECOND STAGE (UPPER STAGE) & RCS REACTION CONTROL JETS                  */}
    {/* ========================================================================= */}
    <rect
      x="57.2"
      y="14.7"
      width="14.3"
      height="10.6"
      fill="url(#fuselageCylinderGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />

    {/* Cold-gas nitrogen attitude control (RCS) thruster quads */}
    <circle cx="59" cy="15.8" r="0.6" fill="#0f172a" stroke="#64748b" strokeWidth="0.35" />
    <circle cx="59" cy="24.2" r="0.6" fill="#0f172a" stroke="#64748b" strokeWidth="0.35" />

    {/* Clean aerospace stencil branding (Realistic black military lettering) */}
    <line x1="62" y1="18.5" x2="68.5" y2="18.5" stroke="#0f172a" strokeWidth="0.85" />
    <line x1="62" y1="20" x2="66.5" y2="20" stroke="#475569" strokeWidth="0.5" />

    {/* Second stage raceway extension */}
    <line x1="57.2" y1="17.2" x2="71.5" y2="17.2" stroke="#475569" strokeWidth="0.8" />
    <line x1="57.2" y1="16.8" x2="71.5" y2="16.8" stroke="#ffffff" strokeWidth="0.4" opacity="0.75" />

    {/* Second stage weld station */}
    <line x1="66" y1="14.7" x2="66" y2="25.3" stroke="#cbd5e1" strokeWidth="0.5" />

    {/* ========================================================================= */}
    {/* 8. AERODYNAMIC PAYLOAD FAIRING (NOSECONE) & PITOT SENSOR PROBE             */}
    {/* ========================================================================= */}
    {/* Ogive aerodynamic fairing body */}
    <path
      d="M 71.5 14.7 C 80.5 15.2, 85.5 18.2, 88.5 20 C 85.5 21.8, 80.5 24.8, 71.5 25.3 Z"
      fill="url(#fairingNoseGrad)"
      stroke="#334155"
      strokeWidth="0.6"
    />

    {/* Clamshell split seam line */}
    <line
      x1="71.5"
      y1="20"
      x2="87.5"
      y2="20"
      stroke="#1e293b"
      strokeWidth="0.5"
      strokeDasharray="2 1"
    />

    {/* Specular sunlight glint highlight across the ogive curve */}
    <path
      d="M 72.5 16.5 C 78 17, 82.5 18.7, 84.8 20 C 81.8 19.3, 77.5 18.1, 72.5 17.6 Z"
      fill="#ffffff"
      opacity="0.85"
    />

    {/* Fairing acoustic protection blanket purge port */}
    <circle cx="74.5" cy="18.2" r="0.5" fill="#334155" />

    {/* Titanium Pitot-static air data sensor probe needle */}
    <line
      x1="88.5"
      y1="20"
      x2="94"
      y2="20"
      stroke="#cbd5e1"
      strokeWidth="0.85"
      strokeLinecap="round"
    />
    <circle cx="94" cy="20" r="0.65" fill="#f8fafc" />
  </svg>
);
