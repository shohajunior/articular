import * as THREE from 'three';

export function initSolarSystem() {
  const container = document.getElementById('molecule-canvas-container');
  if (!container) return;

  // Clear any existing children
  container.innerHTML = '';
  container.style.pointerEvents = 'none'; // Absolutely zero mouse capture / dragging
  container.style.userSelect = 'none';

  const scene = new THREE.Scene();

  const width = container.clientWidth || 900;
  const height = container.clientHeight || 450;

  const camera = new THREE.PerspectiveCamera(45, width / height, 1, 2000);
  // Cinematic top-angle view looking down into the planetary plane
  camera.position.set(0, 190, 270);
  camera.lookAt(0, -10, 0);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group containing the entire Solar System
  const solarGroup = new THREE.Group();
  scene.add(solarGroup);

  // 1. Central Star: The Sun
  const sunGeo = new THREE.SphereGeometry(18, 32, 32);
  const sunMat = new THREE.MeshBasicMaterial({
    color: 0xffaa00
  });
  const sun = new THREE.Mesh(sunGeo, sunMat);
  solarGroup.add(sun);

  // Sun Corona Glow
  const coronaCanvas = document.createElement('canvas');
  coronaCanvas.width = 64;
  coronaCanvas.height = 64;
  const cctx = coronaCanvas.getContext('2d');
  const cgrad = cctx.createRadialGradient(32, 32, 8, 32, 32, 32);
  cgrad.addColorStop(0, 'rgba(255, 200, 50, 0.9)');
  cgrad.addColorStop(0.3, 'rgba(255, 120, 0, 0.4)');
  cgrad.addColorStop(0.7, 'rgba(255, 60, 0, 0.1)');
  cgrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
  cctx.fillStyle = cgrad;
  cctx.fillRect(0, 0, 64, 64);

  const coronaTexture = new THREE.CanvasTexture(coronaCanvas);
  const coronaMat = new THREE.SpriteMaterial({
    map: coronaTexture,
    blending: THREE.AdditiveBlending,
    transparent: true,
    opacity: 0.95
  });
  const coronaSprite = new THREE.Sprite(coronaMat);
  coronaSprite.scale.set(65, 65, 1);
  solarGroup.add(coronaSprite);

  // Sunlight
  const sunLight = new THREE.PointLight(0xfff7ed, 3.5, 900);
  sunLight.position.set(0, 0, 0);
  solarGroup.add(sunLight);

  const ambientLight = new THREE.AmbientLight(0x334155, 0.85);
  scene.add(ambientLight);

  // 2. Planets Data (Proportional speeds and distances for cinematic clarity)
  const planetsConfig = [
    { name: 'Mercury', size: 3.2, dist: 36, speed: 1.8, color: 0x94a3b8, emissive: 0x334155 },
    { name: 'Venus', size: 5.0, dist: 52, speed: 1.3, color: 0xf59e0b, emissive: 0x78350f },
    { name: 'Earth', size: 5.5, dist: 72, speed: 1.0, color: 0x0284c7, emissive: 0x0369a1, hasMoon: true },
    { name: 'Mars', size: 4.2, dist: 94, speed: 0.8, color: 0xef4444, emissive: 0x7f1d1d },
    { name: 'Jupiter', size: 11.5, dist: 128, speed: 0.5, color: 0xd97706, emissive: 0x451a03 },
    { name: 'Saturn', size: 9.5, dist: 165, speed: 0.38, color: 0xfbbf24, emissive: 0x78350f, hasRings: true },
    { name: 'Uranus', size: 6.5, dist: 200, speed: 0.28, color: 0x22d3ee, emissive: 0x0e7490 },
    { name: 'Neptune', size: 6.2, dist: 232, speed: 0.22, color: 0x3b82f6, emissive: 0x1e3a8a }
  ];

  const planets = [];

  planetsConfig.forEach((cfg, idx) => {
    // Planetary Orbit Ring Line
    const orbitPoints = [];
    const segments = 120;
    for (let i = 0; i <= segments; i++) {
      const theta = (i / segments) * Math.PI * 2;
      orbitPoints.push(new THREE.Vector3(Math.cos(theta) * cfg.dist, 0, Math.sin(theta) * cfg.dist));
    }
    const orbitGeo = new THREE.BufferGeometry().setFromPoints(orbitPoints);
    const orbitMat = new THREE.LineBasicMaterial({
      color: 0x00f0ff,
      transparent: true,
      opacity: 0.15
    });
    const orbitLine = new THREE.Line(orbitGeo, orbitMat);
    solarGroup.add(orbitLine);

    // Planet Pivot and Mesh
    const planetPivot = new THREE.Group();
    solarGroup.add(planetPivot);

    const planetGeo = new THREE.SphereGeometry(cfg.size, 24, 24);
    const planetMat = new THREE.MeshStandardMaterial({
      color: cfg.color,
      roughness: 0.4,
      metalness: 0.2,
      emissive: cfg.emissive,
      emissiveIntensity: 0.25
    });
    const planetMesh = new THREE.Mesh(planetGeo, planetMat);
    planetMesh.position.x = cfg.dist;
    planetPivot.add(planetMesh);

    // Saturn's Iconic Rings
    if (cfg.hasRings) {
      const ringGeo = new THREE.RingGeometry(cfg.size * 1.4, cfg.size * 2.3, 40);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfde68a,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.55
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.rotation.x = Math.PI / 2.3;
      planetMesh.add(ring);
    }

    // Earth's Moon
    let moonPivot = null;
    if (cfg.hasMoon) {
      moonPivot = new THREE.Group();
      planetMesh.add(moonPivot);

      const moonGeo = new THREE.SphereGeometry(1.4, 16, 16);
      const moonMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, roughness: 0.8 });
      const moonMesh = new THREE.Mesh(moonGeo, moonMat);
      moonMesh.position.x = 9.5;
      moonPivot.add(moonMesh);
    }

    // Stagger initial orbital positions
    planetPivot.rotation.y = (idx * Math.PI) / 3.5;

    planets.push({
      pivot: planetPivot,
      mesh: planetMesh,
      moonPivot,
      speed: cfg.speed * 0.15,
      selfRotationSpeed: (0.01 + Math.random() * 0.02)
    });
  });

  // 3. Asteroid Belt (Subtle micro particles between Mars and Jupiter)
  const asteroidCount = 180;
  const asteroidGeo = new THREE.BufferGeometry();
  const asteroidPos = new Float32Array(asteroidCount * 3);
  for (let i = 0; i < asteroidCount; i++) {
    const angle = Math.random() * Math.PI * 2;
    const dist = 105 + (Math.random() - 0.5) * 14;
    asteroidPos[i * 3] = Math.cos(angle) * dist;
    asteroidPos[i * 3 + 1] = (Math.random() - 0.5) * 4;
    asteroidPos[i * 3 + 2] = Math.sin(angle) * dist;
  }
  asteroidGeo.setAttribute('position', new THREE.BufferAttribute(asteroidPos, 3));
  const asteroidMat = new THREE.PointsMaterial({
    color: 0x94a3b8,
    size: 1.5,
    transparent: true,
    opacity: 0.4
  });
  const asteroidBelt = new THREE.Points(asteroidGeo, asteroidMat);
  solarGroup.add(asteroidBelt);

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container) return;
    const w = container.clientWidth;
    const h = container.clientHeight;
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h);
  });

  // Animation Loop (Zero drag, zero interaction, completely smooth and slow cinematic revolution)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();

    // Rotate Sun slowly
    sun.rotation.y += delta * 0.15;
    coronaSprite.rotation.z += delta * 0.05;

    // Rotate Asteroid Belt
    asteroidBelt.rotation.y += delta * 0.04;

    // Revolve each planet around the Sun
    planets.forEach((p) => {
      p.pivot.rotation.y += delta * p.speed;
      p.mesh.rotation.y += delta * p.selfRotationSpeed;

      if (p.moonPivot) {
        p.moonPivot.rotation.y += delta * 1.5;
      }
    });

    renderer.render(scene, camera);
  }

  animate();
}
