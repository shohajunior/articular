import * as THREE from 'three';

/**
 * Photorealistic 3D Rotating Earth for Hero Section
 * Includes:
 * - 2K Surface Diffuse Map with mountain bump & ocean specular reflection
 * - Dynamic Twilight City Lights (Tashkent, Central Asia, Europe & Asia illuminated on dark hemisphere)
 * - Semi-transparent Cloud Atmosphere Layer rotating independently
 * - Luminous Cyan/Blue Atmospheric Fresnel Rim Halo
 * - Interactive Mouse & Touch Dragging with Momentum Inertia
 */
export function initHeroEarth() {
  const canvas = document.getElementById('hero-earth-canvas');
  const stage = document.getElementById('hero-earth-stage');
  if (!canvas || !stage) return;

  const scene = new THREE.Scene();

  const width = stage.clientWidth || 520;
  const height = stage.clientHeight || 520;

  const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
  camera.position.set(0, 0, 5.8);

  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'high-performance'
  });
  renderer.setSize(width, height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;

  // Earth Group tilted on real planetary axial tilt (23.4 deg)
  const earthTiltGroup = new THREE.Group();
  earthTiltGroup.rotation.z = THREE.MathUtils.degToRad(23.4);
  earthTiltGroup.rotation.x = 0.32;
  scene.add(earthTiltGroup);

  const earthSpinGroup = new THREE.Group();
  earthTiltGroup.add(earthSpinGroup);

  // Initial spin offset so Uzbekistan and Central Asia are face-forward
  earthSpinGroup.rotation.y = -2.45;

  // Texture Loader
  const textureLoader = new THREE.TextureLoader();
  const dayMap = textureLoader.load('./assets/earth_atmos_2048.jpg', () => renderer.render(scene, camera));
  const normalMap = textureLoader.load('./assets/earth_normal_2048.jpg');
  const specMap = textureLoader.load('./assets/earth_specular_2048.jpg');
  const nightMap = textureLoader.load('./assets/earth_lights_2048.png', () => renderer.render(scene, camera));
  const cloudsMap = textureLoader.load('./assets/earth_clouds_1024.png', () => renderer.render(scene, camera));

  dayMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;

  // 1. Earth Surface (Realistic Day/Night/Specular Shader)
  const earthRadius = 2.0;
  const earthGeo = new THREE.SphereGeometry(earthRadius, 64, 64);

  const sunDirection = new THREE.Vector3(1.2, 0.7, 1.8).normalize();

  const earthMat = new THREE.ShaderMaterial({
    uniforms: {
      uDayMap: { value: dayMap },
      uNightMap: { value: nightMap },
      uSpecularMap: { value: specMap },
      uSunDir: { value: sunDirection }
    },
    vertexShader: `
      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPos;

      void main() {
        vUv = uv;
        vec4 worldPos = modelMatrix * vec4(position, 1.0);
        vWorldPos = worldPos.xyz;
        vNormal = normalize(mat3(modelMatrix) * normal);
        gl_Position = projectionMatrix * viewMatrix * worldPos;
      }
    `,
    fragmentShader: `
      uniform sampler2D uDayMap;
      uniform sampler2D uNightMap;
      uniform sampler2D uSpecularMap;
      uniform vec3 uSunDir;

      varying vec2 vUv;
      varying vec3 vNormal;
      varying vec3 vWorldPos;

      void main() {
        vec3 normal = normalize(vNormal);
        vec3 sunDir = normalize(uSunDir);
        float sunDot = dot(normal, sunDir);

        vec4 dayColor = texture2D(uDayMap, vUv);
        vec4 nightColor = texture2D(uNightMap, vUv);
        float spec = texture2D(uSpecularMap, vUv).r;

        // Smooth twilight terminator with broader illumination
        float dayFactor = smoothstep(-0.25, 0.15, sunDot);

        // Rich, crystal-clear daytime with vibrant ambient lighting
        vec3 dayLight = dayColor.rgb * (max(sunDot, 0.0) * 1.18 + 0.42);

        // Brilliant ocean specular reflection (sun glint)
        vec3 viewDir = normalize(cameraPosition - vWorldPos);
        vec3 halfVector = normalize(sunDir + viewDir);
        float specIntensity = pow(max(dot(normal, halfVector), 0.0), 30.0) * spec;
        dayLight += vec3(0.35, 0.85, 1.0) * specIntensity * 1.1;

        // Night side is never pitch black: clearly visible continents + vibrant gold city lights
        vec3 nightContinentAmbient = dayColor.rgb * 0.32 + vec3(0.04, 0.08, 0.15);
        vec3 nightCityLights = nightColor.rgb * 2.8;
        vec3 nightLight = nightCityLights + nightContinentAmbient;

        vec3 color = mix(nightLight, dayLight, dayFactor);
        gl_FragColor = vec4(color, 1.0);
      }
    `
  });

  const earthMesh = new THREE.Mesh(earthGeo, earthMat);
  earthSpinGroup.add(earthMesh);

  // 2. Cloud Layer (Semi-transparent, floating above surface)
  const cloudsGeo = new THREE.SphereGeometry(earthRadius + 0.022, 64, 64);
  const cloudsMat = new THREE.MeshStandardMaterial({
    map: cloudsMap,
    transparent: true,
    opacity: 0.85,
    blending: THREE.AdditiveBlending,
    depthWrite: false
  });
  const cloudsMesh = new THREE.Mesh(cloudsGeo, cloudsMat);
  earthSpinGroup.add(cloudsMesh);

  // 3. Atmosphere Limb Glow (ISS-style blue/cyan halo)
  const atmosGeo = new THREE.SphereGeometry(earthRadius + 0.09, 64, 64);
  const atmosMat = new THREE.ShaderMaterial({
    vertexShader: `
      varying vec3 vNormal;
      void main() {
        vNormal = normalize(normalMatrix * normal);
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
      }
    `,
    fragmentShader: `
      varying vec3 vNormal;
      void main() {
        float intensity = pow(0.65 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.2);
        gl_FragColor = vec4(0.05, 0.92, 1.0, 1.0) * intensity * 2.4;
      }
    `,
    blending: THREE.AdditiveBlending,
    side: THREE.BackSide,
    transparent: true,
    depthWrite: false
  });
  const atmosMesh = new THREE.Mesh(atmosGeo, atmosMat);
  earthTiltGroup.add(atmosMesh);

  // Lighting for clouds
  const sunLight = new THREE.DirectionalLight(0xffffff, 3.2);
  sunLight.position.copy(sunDirection.clone().multiplyScalar(10));
  scene.add(sunLight);

  const ambientLight = new THREE.AmbientLight(0x456288, 2.4);
  scene.add(ambientLight);

  // 4. Interactive Dragging & Momentum Physics
  let isDragging = false;
  let prevPointerX = 0;
  let prevPointerY = 0;
  let velocityX = 0;
  let velocityY = 0;
  const autoSpinSpeed = 0.0005;

  function onPointerDown(e) {
    isDragging = true;
    prevPointerX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    prevPointerY = e.clientY || (e.touches && e.touches[0].clientY) || 0;
    velocityX = 0;
    velocityY = 0;
    stage.style.cursor = 'grabbing';
  }

  function onPointerMove(e) {
    if (!isDragging) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const clientY = e.clientY || (e.touches && e.touches[0].clientY) || 0;

    const deltaX = clientX - prevPointerX;
    const deltaY = clientY - prevPointerY;

    prevPointerX = clientX;
    prevPointerY = clientY;

    velocityX = deltaX * 0.006;
    velocityY = deltaY * 0.006;

    earthSpinGroup.rotation.y += velocityX;
    earthTiltGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthTiltGroup.rotation.x + velocityY));
  }

  function onPointerUp() {
    if (isDragging) {
      isDragging = false;
      stage.style.cursor = 'grab';
    }
  }

  stage.style.cursor = 'grab';
  stage.addEventListener('mousedown', onPointerDown);
  window.addEventListener('mousemove', onPointerMove);
  window.addEventListener('mouseup', onPointerUp);

  stage.addEventListener('touchstart', onPointerDown, { passive: true });
  window.addEventListener('touchmove', onPointerMove, { passive: true });
  window.addEventListener('touchend', onPointerUp, { passive: true });

  // Resize handler
  function handleResize() {
    const curW = stage.clientWidth || 520;
    const curH = stage.clientHeight || 520;
    camera.aspect = curW / curH;
    camera.updateProjectionMatrix();
    renderer.setSize(curW, curH);
  }

  window.addEventListener('resize', handleResize);

  // 5. Render Loop with Silky Auto-Rotation & Inertia
  let animId;
  function animate() {
    animId = requestAnimationFrame(animate);

    if (!isDragging) {
      // Decay drag velocity
      if (Math.abs(velocityX) > 0.0001 || Math.abs(velocityY) > 0.0001) {
        earthSpinGroup.rotation.y += velocityX;
        earthTiltGroup.rotation.x = Math.max(-0.6, Math.min(0.6, earthTiltGroup.rotation.x + velocityY));
        velocityX *= 0.94;
        velocityY *= 0.94;
      } else {
        // Continuous calm celestial rotation
        earthSpinGroup.rotation.y += autoSpinSpeed;
      }
    }

    // Clouds rotate slightly faster for realistic dynamic weather movement
    cloudsMesh.rotation.y += 0.00018;

    renderer.render(scene, camera);
  }

  animate();

  return {
    destroy: () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onPointerMove);
      window.removeEventListener('mouseup', onPointerUp);
      renderer.dispose();
    }
  };
}
