/**
 * 14 Regions Interactive Hub
 * Volontyorlar.uz style clean regional chapter explorer.
 */
export const regionsData = [
  {
    id: "tashkent-city",
    name: "Tashkent City",
    uzName: "Toshkent shahri",
    participants: 184,
    teams: 32,
    schools: 18,
    coordinator: "Azizbek Rakhimov",
    role: "Central Hub Coordinator",
    focus: "CubeSat payload architectures & autonomous orbital robotics",
    status: "Active Chapter"
  },
  {
    id: "samarkand",
    name: "Samarkand",
    uzName: "Samarqand viloyati",
    participants: 94,
    teams: 16,
    schools: 11,
    coordinator: "Dilshod Mirzaev",
    role: "Regional STEM Lead",
    focus: "Astronomical observation systems & lunar rover chassis",
    status: "Active Chapter"
  },
  {
    id: "fergana",
    name: "Fergana",
    uzName: "Farg‘ona viloyati",
    participants: 112,
    teams: 19,
    schools: 14,
    coordinator: "Madina Karimova",
    role: "Valley Tech Lead",
    focus: "Telemetry sensors & high-altitude atmospheric probes",
    status: "Active Chapter"
  },
  {
    id: "bukhara",
    name: "Bukhara",
    uzName: "Buxoro viloyati",
    participants: 78,
    teams: 13,
    schools: 9,
    coordinator: "Farrukh Ibragimov",
    role: "Engineering Advisor",
    focus: "Micro-gravity test simulations & solar energy collectors",
    status: "Active Chapter"
  },
  {
    id: "andijan",
    name: "Andijan",
    uzName: "Andijon viloyati",
    participants: 86,
    teams: 15,
    schools: 10,
    coordinator: "Jasur Oripov",
    role: "Robotics Chapter Head",
    focus: "Propulsion mechanics & automated flight telemetry",
    status: "Active Chapter"
  },
  {
    id: "namangan",
    name: "Namangan",
    uzName: "Namangan viloyati",
    participants: 72,
    teams: 12,
    schools: 8,
    coordinator: "Kamola Umarova",
    role: "Regional Coordinator",
    focus: "Aerospace avionics coding & ground station antennas",
    status: "Active Chapter"
  },
  {
    id: "kashkadarya",
    name: "Kashkadarya",
    uzName: "Qashqadaryo viloyati",
    participants: 68,
    teams: 11,
    schools: 8,
    coordinator: "Sukhrob Ergashev",
    role: "Youth STEM Mentor",
    focus: "Remote sensing imagery & agricultural satellite data",
    status: "Active Chapter"
  },
  {
    id: "surkhandarya",
    name: "Surkhandarya",
    uzName: "Surxondaryo viloyati",
    participants: 54,
    teams: 9,
    schools: 6,
    coordinator: "Bakhtiyor Kholov",
    role: "STEM Lead",
    focus: "Thermal control coatings & radiation shielding mockups",
    status: "Active Chapter"
  },
  {
    id: "jizzakh",
    name: "Jizzakh",
    uzName: "Jizzax viloyati",
    participants: 48,
    teams: 8,
    schools: 5,
    coordinator: "Nodir Bekmurodov",
    role: "Technical Coordinator",
    focus: "Radio-frequency ground communication circuits",
    status: "Active Chapter"
  },
  {
    id: "syrdarya",
    name: "Syrdarya",
    uzName: "Sirdaryo viloyati",
    participants: 42,
    teams: 7,
    schools: 5,
    coordinator: "Gulnora Saidova",
    role: "Academic Advisor",
    focus: "Micro-controllers and solid-state rocket telemetry",
    status: "Active Chapter"
  },
  {
    id: "navoi",
    name: "Navoi",
    uzName: "Navoiy viloyati",
    participants: 58,
    teams: 10,
    schools: 7,
    coordinator: "Alisher Tursunov",
    role: "Materials & Science Lead",
    focus: "Advanced composite structures & lightweight metallurgy",
    status: "Active Chapter"
  },
  {
    id: "khorezm",
    name: "Khorezm",
    uzName: "Xorazm viloyati",
    participants: 62,
    teams: 10,
    schools: 7,
    coordinator: "Sanjar Matkarimov",
    role: "Software & Systems Lead",
    focus: "Orbital trajectory mathematics & guidance algorithms",
    status: "Active Chapter"
  },
  {
    id: "karakalpakstan",
    name: "Karakalpakstan",
    uzName: "Qoraqalpog‘iston Respublikasi",
    participants: 50,
    teams: 8,
    schools: 6,
    coordinator: "Aydos Dauletov",
    role: "Regional Chapter Head",
    focus: "Aral eco-satellite monitoring & meteorological payloads",
    status: "Active Chapter"
  },
  {
    id: "tashkent-region",
    name: "Tashkent Region",
    uzName: "Toshkent viloyati",
    participants: 96,
    teams: 16,
    schools: 12,
    coordinator: "Shokhrukh Aliev",
    role: "Regional Coordinator",
    focus: "3D printing of aerodynamic scale models and test pods",
    status: "Active Chapter"
  }
];

export function initRegionsHub() {
  const tabsContainer = document.getElementById('regions-tabs');
  const detailsCard = document.getElementById('region-details-card');
  if (!tabsContainer || !detailsCard) return;

  let activeRegionId = 'tashkent-city';

  function renderTabs() {
    tabsContainer.innerHTML = regionsData.map((reg) => {
      const isActive = reg.id === activeRegionId;
      return `
        <button 
          class="region-tab ${isActive ? 'active' : ''}" 
          data-region-id="${reg.id}"
          type="button"
        >
          <span class="tab-name">${reg.name}</span>
          <span class="tab-count">${reg.participants}</span>
        </button>
      `;
    }).join('');

    tabsContainer.querySelectorAll('.region-tab').forEach((btn) => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-region-id');
        if (id && id !== activeRegionId) {
          activeRegionId = id;
          renderTabs();
          renderDetails();
        }
      });
    });
  }

  function renderDetails() {
    const data = regionsData.find((r) => r.id === activeRegionId) || regionsData[0];
    detailsCard.classList.remove('fade-enter');
    void detailsCard.offsetWidth; // trigger reflow
    detailsCard.classList.add('fade-enter');

    detailsCard.innerHTML = `
      <div class="region-detail-header">
        <div>
          <span class="region-badge">${data.status}</span>
          <h3 class="region-name">${data.name}</h3>
          <p class="region-local-title">${data.uzName}</p>
        </div>
        <div class="region-coordinator-pill">
          <div class="coord-avatar">${data.coordinator.charAt(0)}</div>
          <div>
            <div class="coord-name">${data.coordinator}</div>
            <div class="coord-role">${data.role}</div>
          </div>
        </div>
      </div>

      <div class="region-stats-grid">
        <div class="reg-stat-box">
          <div class="reg-stat-val">${data.participants}</div>
          <div class="reg-stat-lbl">Active Students</div>
        </div>
        <div class="reg-stat-box">
          <div class="reg-stat-val">${data.teams}</div>
          <div class="reg-stat-lbl">Registered Teams</div>
        </div>
        <div class="reg-stat-box">
          <div class="reg-stat-val">${data.schools}</div>
          <div class="reg-stat-lbl">Schools & Colleges</div>
        </div>
      </div>

      <div class="region-focus-box">
        <div class="focus-title">Primary Chapter Research Focus</div>
        <div class="focus-desc">${data.focus}</div>
      </div>

      <div class="region-card-actions">
        <a href="#register" class="btn btn-primary btn-sm">Join ${data.name} Chapter</a>
        <a href="https://t.me/yvc_uz" target="_blank" rel="noopener" class="btn btn-outline btn-sm">Chapter Telegram</a>
      </div>
    `;
  }

  renderTabs();
  renderDetails();
}
