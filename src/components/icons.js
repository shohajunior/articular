// ==========================================================================
// 3D VOLUMETRIC ICONLY SVG ICON SYSTEM
// Rich multi-stop gradients, depth layers, 3D lighting, and glass speculars
// ==========================================================================

export const iconly = {
  // Clean Monochrome FontAwesome Telegram Icon (No Blue Ball/Color, Crisp Vector)
  telegram: (size = 20) => `
    <svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="currentColor" class="iconly-svg fa-icon fa-telegram" xmlns="http://www.w3.org/2000/svg">
      <path d="M498.1 5.6c10.1 7 15.4 19.1 13.5 31.2l-64 416c-1.5 9.7-7.4 18.2-16 23s-18.9 5.4-28 1.6L284 427.7l-68.5 74.1c-8.9 9.7-22.9 12.9-35.2 8.1S160 493.2 160 480V392l182.4-197.6c6.9-7.5 7.6-18.6 1.7-26.9s-17.4-10.4-26.6-4.9L108.9 307.6 16.6 261.4C6 256.1-0.3 245.2 0.1 233.3s7.4-22.4 18.4-26.8l432-172c11.3-4.5 24.3-2.6 33.7 4.1z"/>
    </svg>
  `,

  // Official Uzcosmos Space Agency Crest (Celestial Globe & Orbital Ring)
  uzcosmos: (size = 20) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="uzc-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00f2fe" />
          <stop offset="1" stop-color="#4facfe" />
        </linearGradient>
        <linearGradient id="uzc-gold" x1="0" y1="0" x2="24" y2="24" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f6d365" />
          <stop offset="1" stop-color="#fda085" />
        </linearGradient>
      </defs>
      <!-- Central globe -->
      <circle cx="12" cy="12" r="7" stroke="url(#uzc-grad)" stroke-width="1.8" fill="url(#uzc-grad)" fill-opacity="0.15" />
      <!-- Orbital inclined ring -->
      <ellipse cx="12" cy="12" rx="10" ry="3.5" transform="rotate(-30 12 12)" stroke="url(#uzc-gold)" stroke-width="1.6" />
      <!-- Orbiting satellite node -->
      <circle cx="19" cy="8" r="1.8" fill="#ffffff" />
      <circle cx="12" cy="12" r="2.5" fill="url(#uzc-grad)" />
    </svg>
  `,

  // 3D Telescope (Pillar 1: Science & Space)
  telescope: (size = 32) => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" class="iconly-svg iconly-3d">
      <defs>
        <linearGradient id="tele-body" x1="4" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00f2fe" />
          <stop offset="1" stop-color="#2563eb" />
        </linearGradient>
        <linearGradient id="tele-gold" x1="16" y1="4" x2="28" y2="16" gradientUnits="userSpaceOnUse">
          <stop stop-color="#facc15" />
          <stop offset="1" stop-color="#fb923c" />
        </linearGradient>
      </defs>
      <!-- Orbit trail background -->
      <ellipse cx="16" cy="16" rx="13" ry="5" transform="rotate(-25 16 16)" stroke="#00f2fe" stroke-width="1.2" stroke-dasharray="2 3" stroke-opacity="0.5" />
      <!-- Main Telescope Barrel (3D angled cylinder) -->
      <path d="M10 20L23 7L26 10L13 23L10 20Z" fill="url(#tele-body)" />
      <!-- Lens Hood with gold rim -->
      <path d="M22 6L27 11L28 10L23 5L22 6Z" fill="url(#tele-gold)" />
      <!-- Lens glass shine -->
      <circle cx="26" cy="7" r="3" fill="#ffffff" fill-opacity="0.3" />
      <!-- Eyepiece -->
      <rect x="7" y="21" width="4" height="3" rx="1" transform="rotate(-45 9 22.5)" fill="#60a5fa" />
      <!-- Heavy Tripod Base -->
      <circle cx="15" cy="18" r="2" fill="#93c5fd" />
      <path d="M15 19L9 29" stroke="#93c5fd" stroke-width="2.2" stroke-linecap="round" />
      <path d="M15 19L16 29" stroke="#60a5fa" stroke-width="2.2" stroke-linecap="round" />
      <path d="M15 19L23 28" stroke="#3b82f6" stroke-width="2.2" stroke-linecap="round" />
      <!-- Distant Star Sparkle -->
      <path d="M27 3L27.6 4.4L29 5L27.6 5.6L27 7L26.4 5.6L25 5L26.4 4.4L27 3Z" fill="#fef08a" />
    </svg>
  `,

  // 3D Brain / Critical Thinking (Pillar 2)
  brain: (size = 32) => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" class="iconly-svg iconly-3d">
      <defs>
        <linearGradient id="brain-grad-left" x1="4" y1="4" x2="16" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#a855f7" />
          <stop offset="1" stop-color="#6366f1" />
        </linearGradient>
        <linearGradient id="brain-grad-right" x1="16" y1="4" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#c084fc" />
          <stop offset="1" stop-color="#8b5cf6" />
        </linearGradient>
      </defs>
      <!-- Left Hemisphere (3D Lobes) -->
      <path d="M13 7C10.5 7 8 8.8 8 11.5C8 12.8 8.6 14 9.4 14.8C7.8 15.8 7 17.5 7 19.5C7 22.2 9 24.5 12 25C12.8 25.1 13 25.8 13 26.5V27.5" stroke="url(#brain-grad-left)" stroke-width="2.5" stroke-linecap="round" fill="url(#brain-grad-left)" fill-opacity="0.2" />
      <!-- Right Hemisphere (3D Lobes) -->
      <path d="M19 7C21.5 7 24 8.8 24 11.5C24 12.8 23.4 14 22.6 14.8C24.2 15.8 25 17.5 25 19.5C25 22.2 23 24.5 20 25C19.2 25.1 19 25.8 19 26.5V27.5" stroke="url(#brain-grad-right)" stroke-width="2.5" stroke-linecap="round" fill="url(#brain-grad-right)" fill-opacity="0.2" />
      <!-- Central Neural Spine -->
      <path d="M16 6V27" stroke="#e9d5ff" stroke-width="2" stroke-linecap="round" stroke-dasharray="2 2" />
      <!-- Synaptic Nodes with glow -->
      <circle cx="11" cy="13" r="2.2" fill="#38bdf8" />
      <circle cx="21" cy="13" r="2.2" fill="#38bdf8" />
      <circle cx="11" cy="20" r="2.2" fill="#f43f5e" />
      <circle cx="21" cy="20" r="2.2" fill="#f43f5e" />
      <!-- Synaptic Connection Rays -->
      <path d="M11 13L16 16L21 13M11 20L16 16L21 20" stroke="#ffffff" stroke-width="1.2" stroke-opacity="0.7" />
    </svg>
  `,

  // 3D Microphone / Public Speaking (Pillar 3)
  mic: (size = 32) => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" class="iconly-svg iconly-3d">
      <defs>
        <linearGradient id="mic-gold" x1="8" y1="4" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fbbf24" />
          <stop offset="1" stop-color="#d97706" />
        </linearGradient>
        <linearGradient id="mic-grill" x1="10" y1="4" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fef08a" />
          <stop offset="1" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <!-- Microphone Capsule (Volumetric) -->
      <rect x="11" y="4" width="10" height="15" rx="5" fill="url(#mic-grill)" />
      <!-- Specular shine on capsule -->
      <rect x="13" y="6" width="2" height="11" rx="1" fill="#ffffff" fill-opacity="0.6" />
      <line x1="11" y1="12" x2="21" y2="12" stroke="#b45309" stroke-width="1.2" />
      <!-- Suspension Cradle -->
      <path d="M7 13C7 18.5 11 22.5 16 22.5C21 22.5 25 18.5 25 13" stroke="url(#mic-gold)" stroke-width="2.5" stroke-linecap="round" />
      <!-- Stand Base -->
      <path d="M16 22.5V28M11 28H21" stroke="url(#mic-gold)" stroke-width="2.5" stroke-linecap="round" />
      <!-- Dynamic Broadcast Acoustic Waves -->
      <path d="M26 9C27.8 11.2 28.5 13.5 28 16" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" />
      <path d="M6 9C4.2 11.2 3.5 13.5 4 16" stroke="#fbbf24" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `,

  // 3D Teamwork / Synthesis (Pillar 4)
  users: (size = 32) => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" class="iconly-svg iconly-3d">
      <defs>
        <linearGradient id="user-primary" x1="8" y1="6" x2="24" y2="28" gradientUnits="userSpaceOnUse">
          <stop stop-color="#10b981" />
          <stop offset="1" stop-color="#047857" />
        </linearGradient>
        <linearGradient id="user-secondary" x1="16" y1="6" x2="30" y2="26" gradientUnits="userSpaceOnUse">
          <stop stop-color="#34d399" />
          <stop offset="1" stop-color="#059669" />
        </linearGradient>
      </defs>
      <!-- Center Leader Avatar -->
      <circle cx="16" cy="10" r="4.5" fill="url(#user-primary)" />
      <ellipse cx="15" cy="8" rx="2" ry="1.2" fill="#ffffff" fill-opacity="0.45" />
      <path d="M8 26C8 21.6 11.6 18 16 18C20.4 18 24 21.6 24 26" fill="url(#user-primary)" fill-opacity="0.85" />
      <!-- Supporting Right Member -->
      <circle cx="23.5" cy="11.5" r="3.2" fill="url(#user-secondary)" />
      <path d="M21 25.5C21.8 22.8 24.2 20.5 27 20.5C28.2 20.5 29 21.2 29.5 22.2" stroke="url(#user-secondary)" stroke-width="2" stroke-linecap="round" />
      <!-- Supporting Left Member -->
      <circle cx="8.5" cy="11.5" r="3.2" fill="url(#user-secondary)" />
      <path d="M11 25.5C10.2 22.8 7.8 20.5 5 20.5C3.8 20.5 3 21.2 2.5 22.2" stroke="url(#user-secondary)" stroke-width="2" stroke-linecap="round" />
      <!-- Collaborative Network Ring -->
      <circle cx="16" cy="17" r="1.5" fill="#fef08a" />
    </svg>
  `,

  // 3D Idea Communication / Cyber Chip (Pillar 5)
  cpu: (size = 32) => `
    <svg width="${size}" height="${size}" viewBox="0 0 32 32" fill="none" class="iconly-svg iconly-3d">
      <defs>
        <linearGradient id="chip-grad" x1="6" y1="6" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ec4899" />
          <stop offset="1" stop-color="#8b5cf6" />
        </linearGradient>
        <linearGradient id="chip-core" x1="11" y1="11" x2="21" y2="21" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00f2fe" />
          <stop offset="1" stop-color="#4facfe" />
        </linearGradient>
      </defs>
      <!-- Main Chip Body -->
      <rect x="7" y="7" width="18" height="18" rx="4" fill="url(#chip-grad)" />
      <!-- Holographic Central Die -->
      <rect x="11" y="11" width="10" height="10" rx="2" fill="url(#chip-core)" />
      <circle cx="16" cy="16" r="2.2" fill="#ffffff" />
      <!-- Specular Bevel -->
      <path d="M8 8H24" stroke="#ffffff" stroke-opacity="0.4" stroke-width="1.2" stroke-linecap="round" />
      <!-- Golden Connector Pins -->
      <!-- Top -->
      <path d="M11 3V6M16 3V6M21 3V6" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
      <!-- Bottom -->
      <path d="M11 26V29M16 26V29M21 26V29" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
      <!-- Left -->
      <path d="M3 11H6M3 16H6M3 21H6" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
      <!-- Right -->
      <path d="M26 11H29M26 16H29M26 21H29" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,

  // 3D Sparkles
  sparkles: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="sparkle-gold" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#00f2fe" />
          <stop offset="0.5" stop-color="#38bdf8" />
          <stop offset="1" stop-color="#818cf8" />
        </linearGradient>
      </defs>
      <path d="M12 2L14.2 8.8L21 11L14.2 13.2L12 20L9.8 13.2L3 11L9.8 8.8L12 2Z" fill="url(#sparkle-gold)" />
      <path d="M19 2L19.8 4.2L22 5L19.8 5.8L19 8L18.2 5.8L16 5L18.2 4.2L19 2Z" fill="#fbbf24" />
      <path d="M5 17L5.6 18.4L7 19L5.6 19.6L5 21L4.4 19.6L3 19L4.4 18.4L5 17Z" fill="#f43f5e" />
    </svg>
  `,

  // 3D Rocket
  rocket: (size = 20) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="rocket-hull" x1="8" y1="2" x2="22" y2="18" gradientUnits="userSpaceOnUse">
          <stop stop-color="#ffffff" />
          <stop offset="1" stop-color="#93c5fd" />
        </linearGradient>
        <linearGradient id="rocket-flame" x1="4" y1="16" x2="8" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f59e0b" />
          <stop offset="1" stop-color="#ef4444" />
        </linearGradient>
      </defs>
      <!-- Rocket Body -->
      <path d="M14.5 4C17.5 4 19.5 6 19.5 9C19.5 13 16 16.5 12 18.5L9.5 17C8 13.5 7.5 10.5 8.5 8C9.5 5.5 12 4 14.5 4Z" fill="url(#rocket-hull)" />
      <!-- Porthole Window -->
      <circle cx="14" cy="9" r="2.2" fill="#0284c7" stroke="#ffffff" stroke-width="1" />
      <!-- Wings -->
      <path d="M8 17L5 19.5V16L8 12" fill="#3b82f6" />
      <path d="M12 8L16 4H18.5L17 8" fill="#3b82f6" />
      <!-- Thruster Exhaust Flame -->
      <path d="M5 22L7.5 19.5L6 18L3.5 20.5L5 22Z" fill="url(#rocket-flame)" />
    </svg>
  `,

  // 3D Emerald Checkmark Pill
  checkCircle: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="chk-grad" x1="2" y1="2" x2="22" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#10b981" />
          <stop offset="1" stop-color="#059669" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="10" fill="url(#chk-grad)" />
      <ellipse cx="12" cy="5" rx="6" ry="2.2" fill="#ffffff" fill-opacity="0.3" />
      <path d="M8 12.2L10.8 15L16 9.5" stroke="#ffffff" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,

  // Simple Checkmark
  check: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 20 20" fill="none" class="iconly-svg">
      <path d="M4 10.5L7.5 14L16 5.5" stroke="#10b981" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,

  // Map Pin (3D Locator)
  mapPin: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="pin-grad" x1="4" y1="2" x2="20" y2="22" gradientUnits="userSpaceOnUse">
          <stop stop-color="#f43f5e" />
          <stop offset="1" stop-color="#be123c" />
        </linearGradient>
      </defs>
      <path d="M12 2C7.5 2 4 5.5 4 10C4 15.5 11 21.5 12 22C13 21.5 20 15.5 20 10C20 5.5 16.5 2 12 2Z" fill="url(#pin-grad)" />
      <circle cx="12" cy="9.5" r="3" fill="#ffffff" />
    </svg>
  `,

  // Calendar
  calendar: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <rect x="3" y="5" width="18" height="16" rx="4" fill="#3b82f6" fill-opacity="0.2" stroke="#38bdf8" stroke-width="1.8" />
      <path d="M3 10H21" stroke="#38bdf8" stroke-width="1.8" />
      <path d="M8 2V6M16 2V6" stroke="#00f2fe" stroke-width="2" stroke-linecap="round" />
      <circle cx="8" cy="14" r="1.2" fill="#ffffff" />
      <circle cx="12" cy="14" r="1.2" fill="#ffffff" />
      <circle cx="16" cy="14" r="1.2" fill="#ffffff" />
    </svg>
  `,

  // Compass / Gyroscope
  compass: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <circle cx="12" cy="12" r="9" stroke="#38bdf8" stroke-width="1.8" fill="#0284c7" fill-opacity="0.15" />
      <path d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z" fill="#f43f5e" stroke="#ffffff" stroke-width="0.8" />
      <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
    </svg>
  `,

  // Arrow Right
  arrowRight: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M5 12H19M19 12L13 6M19 12L13 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,

  // Lightbulb / Idea
  lightbulb: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" class="iconly-svg">
      <defs>
        <linearGradient id="bulb-gold" x1="6" y1="2" x2="22" y2="20" gradientUnits="userSpaceOnUse">
          <stop stop-color="#fef08a" />
          <stop offset="1" stop-color="#f59e0b" />
        </linearGradient>
      </defs>
      <path d="M9 11C9 7.7 11.2 5 14 5C16.8 5 19 7.7 19 11C19 13.5 17.5 15.5 16 17V20H12V17C10.5 15.5 9 13.5 9 11Z" fill="url(#bulb-gold)" />
      <path d="M11 23H17M12.5 25H15.5" stroke="#f59e0b" stroke-width="2" stroke-linecap="round" />
      <circle cx="14" cy="11" r="2.5" fill="#ffffff" />
    </svg>
  `,

  // Quote
  quote: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M6 15H9.5C10.3 15 11 14.3 11 13.5V10C11 9.2 10.3 8.5 9.5 8.5H7.5C6.7 8.5 6 9.2 6 10V15ZM6 15C6 17.5 7.5 19 10 19" stroke="#c084fc" stroke-width="2" stroke-linecap="round" />
      <path d="M15 15H18.5C19.3 15 20 14.3 20 13.5V10C20 9.2 19.3 8.5 18.5 8.5H16.5C15.7 8.5 15 9.2 15 10V15ZM15 15C15 17.5 16.5 19 19 19" stroke="#c084fc" stroke-width="2" stroke-linecap="round" />
    </svg>
  `,

  // Flag
  flag: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M5 21V4" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" />
      <path d="M5 5C9 3.5 11 6.5 15 5C18 3.8 19 4.5 19 4.5V13.5C19 13.5 18 12.8 15 14C11 15.5 9 12.5 5 14" fill="#fbbf24" fill-opacity="0.3" stroke="#fbbf24" stroke-width="2" stroke-linejoin="round" />
    </svg>
  `,

  // Official FontAwesome Classic Solid Volume (https://fontawesome.com/icons/classic/solid/volume)
  volume: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 512 512" fill="currentColor" class="iconly-svg fa-icon fa-volume" xmlns="http://www.w3.org/2000/svg">
      <path d="M48 352l48 0 134.1 119.2c6.4 5.7 14.6 8.8 23.1 8.8 19.2 0 34.8-15.6 34.8-34.8l0-378.4c0-19.2-15.6-34.8-34.8-34.8-8.5 0-16.7 3.1-23.1 8.8L96 160 48 160c-26.5 0-48 21.5-48 48l0 96c0 26.5 21.5 48 48 48zM441.1 107c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C443.3 170.7 464 210.9 464 256s-20.7 85.3-53.2 111.8c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5c43.2-35.2 70.9-88.9 70.9-149s-27.7-113.8-70.9-149zm-60.5 74.5c-10.3-8.4-25.4-6.8-33.8 3.5s-6.8 25.4 3.5 33.8C361.1 227.6 368 241 368 256s-6.9 28.4-17.7 37.3c-10.3 8.4-11.8 23.5-3.5 33.8s23.5 11.8 33.8 3.5C402.1 312.9 416 286.1 416 256s-13.9-56.9-35.5-74.5z"/>
    </svg>
  `,

  // Official FontAwesome Classic Solid Volume (Muted / Xmark)
  volumeMute: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 640 512" fill="currentColor" class="iconly-svg fa-icon fa-volume-mute" xmlns="http://www.w3.org/2000/svg">
      <path d="M380.9 21.1C392.6 26.9 400 38.9 400 52v408c0 13.1-7.4 25.1-19.1 30.9s-25.7 4.6-35.5-3.2L192 368H64c-35.3 0-64-28.7-64-64V208c0-35.3 28.7-64 64-64h128L345.4 24.3c9.8-7.8 23.8-9 35.5-3.2zm112.5 163.5c6.2-6.2 16.4-6.2 22.6 0l48 48 48-48c6.2-6.2 16.4-6.2 22.6 0s6.2 16.4 0 22.6l-48 48 48 48c6.2 6.2 6.2 16.4 0 22.6s-16.4 6.2-22.6 0l-48-48-48 48c-6.2 6.2-16.4 6.2-22.6 0s-6.2-16.4 0-22.6l48-48-48-48c-6.2-6.2-6.2-16.4 0-22.6z"/>
    </svg>
  `,

  // Close (X)
  close: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,

  // Maximize
  maximize: (size = 16) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M15 3H21V9M9 21H3V15M21 3L14 10M3 21L10 14" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `,

  // Menu Hamburger
  menu: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" />
    </svg>
  `,

  // Official FontAwesome Brands Instagram (Monochrome)
  instagram: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 448 512" fill="currentColor" class="iconly-svg fa-icon fa-instagram" xmlns="http://www.w3.org/2000/svg">
      <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1z"/>
    </svg>
  `,

  // Official FontAwesome Brands LinkedIn (Monochrome)
  linkedin: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 448 512" fill="currentColor" class="iconly-svg fa-icon fa-linkedin" xmlns="http://www.w3.org/2000/svg">
      <path d="M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"/>
    </svg>
  `,

  globe: (size = 18) => `
    <svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" class="iconly-svg">
      <circle cx="12" cy="12" r="9" stroke="currentColor" stroke-width="1.8" />
      <ellipse cx="12" cy="12" rx="4" ry="9" stroke="currentColor" stroke-width="1.8" />
      <path d="M3.5 12H20.5" stroke="currentColor" stroke-width="1.8" />
    </svg>
  `,

  satellite: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" class="iconly-svg">
      <rect x="10" y="10" width="8" height="8" rx="2" fill="#00f2fe" />
      <!-- Solar Panels Left & Right -->
      <rect x="2" y="11" width="6" height="6" rx="1" fill="#3b82f6" stroke="#93c5fd" stroke-width="1" />
      <rect x="20" y="11" width="6" height="6" rx="1" fill="#3b82f6" stroke="#93c5fd" stroke-width="1" />
      <line x1="8" y1="14" x2="10" y2="14" stroke="#ffffff" stroke-width="2" />
      <line x1="18" y1="14" x2="20" y2="14" stroke="#ffffff" stroke-width="2" />
      <!-- Antenna -->
      <path d="M14 10V4M12 4H16" stroke="#facc15" stroke-width="1.8" stroke-linecap="round" />
    </svg>
  `,

  stamp: (size = 24) => `
    <svg width="${size}" height="${size}" viewBox="0 0 28 28" fill="none" class="iconly-svg">
      <circle cx="14" cy="14" r="11" stroke="#f59e0b" stroke-width="2" stroke-dasharray="3 2" fill="#fef3c7" fill-opacity="0.15" />
      <circle cx="14" cy="14" r="8" stroke="#d97706" stroke-width="1.5" />
      <path d="M10 14L13 17L18 11" stroke="#fbbf24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" />
    </svg>
  `
};

const fontAwesomeMap = {
  volume: 'fa-solid fa-volume',
  volumeMute: 'fa-solid fa-volume-xmark',
  telegram: 'fa-brands fa-telegram',
  sparkles: 'fa-solid fa-wand-magic-sparkles',
  arrowRight: 'fa-solid fa-arrow-right',
  rocket: 'fa-solid fa-rocket',
  lightbulb: 'fa-solid fa-lightbulb',
  quote: 'fa-solid fa-quote-left',
  flag: 'fa-solid fa-flag',
  shieldCheck: 'fa-solid fa-shield-halved',
  satellite: 'fa-solid fa-satellite',
  stamp: 'fa-solid fa-award',
  check: 'fa-solid fa-check',
  checkCircle: 'fa-solid fa-circle-check',
  compass: 'fa-solid fa-compass',
  mapPin: 'fa-solid fa-location-dot',
  telescope: 'fa-solid fa-binoculars',
  brain: 'fa-solid fa-brain',
  target: 'fa-solid fa-bullseye',
  scale: 'fa-solid fa-scale-balanced',
  network: 'fa-solid fa-circle-nodes',
  cpu: 'fa-solid fa-microchip',
  chevronLeft: 'fa-solid fa-chevron-left',
  chevronRight: 'fa-solid fa-chevron-right',
  star: 'fa-solid fa-star',
  handshake: 'fa-solid fa-handshake',
  instagram: 'fa-brands fa-instagram',
  linkedin: 'fa-brands fa-linkedin',
  globe: 'fa-solid fa-globe',
  menu: 'fa-solid fa-bars',
  maximize: 'fa-solid fa-expand'
};

// Auto-injector for data-iconly elements with FontAwesome 6
export function renderIcons(container = document) {
  const elements = container.querySelectorAll('[data-iconly]');
  elements.forEach((el) => {
    const iconName = el.getAttribute('data-iconly');
    const size = parseInt(el.getAttribute('data-size')) || 20;

    if (fontAwesomeMap[iconName]) {
      el.innerHTML = `<i class="${fontAwesomeMap[iconName]}" style="font-size: ${size}px; line-height: 1; display: inline-flex; align-items: center; justify-content: center;"></i>`;
    } else if (iconly[iconName]) {
      el.innerHTML = iconly[iconName](size);
    }
  });
}

export const renderIconlyIcons = renderIcons;
