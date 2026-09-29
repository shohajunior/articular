import * as THREE from 'three';
import { iconly } from './icons.js';

export function initMoleculeScene(onSelectPillar) {
  const container = document.getElementById('molecule-canvas-container');
  const tooltip = document.getElementById('node-tooltip');
  if (!container) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    50,
    container.clientWidth / container.clientHeight,
    0.1,
    1000
  );
  camera.position.set(0, 30, 220);

  const renderer = new THREE.WebGLRenderer({
    alpha: true,
    antialias: true
  });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Group containing the entire 3D atom
  const atomGroup = new THREE.Group();
  scene.add(atomGroup);

  // 1. Central Nucleus (Articular Core)
  const nucleusGeo = new THREE.IcosahedronGeometry(22, 2);
  const nucleusMat = new THREE.MeshStandardMaterial({
    color: 0x00f0ff,
    emissive: 0x005577,
    roughness: 0.2,
    metalness: 0.8,
    wireframe: true
  });
  const nucleus = new THREE.Mesh(nucleusGeo, nucleusMat);
  atomGroup.add(nucleus);

  // Inner solid core
  const innerNucleus = new THREE.Mesh(
    new THREE.SphereGeometry(14, 32, 32),
    new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.85 })
  );
  atomGroup.add(innerNucleus);

  // Lights
  const pointLight1 = new THREE.PointLight(0x00f0ff, 3, 300);
  pointLight1.position.set(50, 50, 50);
  scene.add(pointLight1);

  const pointLight2 = new THREE.PointLight(0x8b5cf6, 3, 300);
  pointLight2.position.set(-50, -50, 50);
  scene.add(pointLight2);

  const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambientLight);

  // 2. Pillars Data & Nodes
  const pillars = [
    { id: 0, name: 'Science & Space', color: 0x00f0ff, radius: 65, speed: 0.9, tilt: { x: 0.2, y: 0.5, z: 0.1 } },
    { id: 1, name: 'Critical Thinking', color: 0x8b5cf6, radius: 80, speed: 0.7, tilt: { x: 1.1, y: 0.2, z: 0.8 } },
    { id: 2, name: 'Public Speaking', color: 0xfbbf24, radius: 95, speed: 0.8, tilt: { x: -0.7, y: 0.9, z: -0.3 } },
    { id: 3, name: 'Teamwork & Synthesis', color: 0x22c55e, radius: 110, speed: 0.6, tilt: { x: 0.5, y: -0.8, z: 0.4 } },
    { id: 4, name: 'Idea Communication', color: 0xec4899, radius: 125, speed: 0.5, tilt: { x: -1.2, y: -0.3, z: 0.7 } }
  ];

  const nodeMeshes = [];
  const orbitLines = [];

  pillars.forEach((p) => {
    // Orbit line geometry
    const orbitCurve = new THREE.EllipseCurve(
      0, 0,
      p.radius, p.radius,
      0, 2 * Math.PI,
      false, 0
    );
    const points = orbitCurve.getPoints(80);
    const lineGeo = new THREE.BufferGeometry().setFromPoints(points);
    const lineMat = new THREE.LineBasicMaterial({
      color: p.color,
      transparent: true,
      opacity: 0.25
    });
    const orbitLine = new THREE.Line(lineGeo, lineMat);
    orbitLine.rotation.set(p.tilt.x, p.tilt.y, p.tilt.z);
    atomGroup.add(orbitLine);
    orbitLines.push(orbitLine);

    // Orbiting Satellite Sphere
    const nodeGeo = new THREE.SphereGeometry(8, 24, 24);
    const nodeMat = new THREE.MeshStandardMaterial({
      color: p.color,
      emissive: p.color,
      emissiveIntensity: 0.6,
      roughness: 0.1,
      metalness: 0.9
    });
    const nodeMesh = new THREE.Mesh(nodeGeo, nodeMat);
    nodeMesh.userData = {
      id: p.id,
      name: p.name,
      radius: p.radius,
      speed: p.speed,
      tilt: p.tilt,
      baseColor: p.color
    };

    // Glow halo around node
    const haloGeo = new THREE.SphereGeometry(11, 16, 16);
    const haloMat = new THREE.MeshBasicMaterial({
      color: p.color,
      transparent: true,
      opacity: 0.25,
      wireframe: true
    });
    const halo = new THREE.Mesh(haloGeo, haloMat);
    nodeMesh.add(halo);

    atomGroup.add(nodeMesh);
    nodeMeshes.push(nodeMesh);
  });

  // 3. User Controls & Drag Physics
  let isDragging = false;
  let previousMousePosition = { x: 0, y: 0 };
  let autoRotate = true;
  let rotationVelocity = { x: 0.002, y: 0.005 };
  let dragDist = 0;

  const onPointerDown = (e) => {
    isDragging = true;
    dragDist = 0;
    previousMousePosition = { x: e.clientX, y: e.clientY };
  };

  const onPointerMove = (e) => {
    const rect = container.getBoundingClientRect();
    const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
    const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

    // Raycast for hovering
    const raycaster = new THREE.Raycaster();
    raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
    const intersects = raycaster.intersectObjects(nodeMeshes);

    if (intersects.length > 0) {
      container.style.cursor = 'pointer';
      const hitNode = intersects[0].object;
      if (tooltip) {
        tooltip.style.display = 'block';
        tooltip.style.left = `${e.clientX - rect.left + 15}px`;
        tooltip.style.top = `${e.clientY - rect.top - 15}px`;
        tooltip.innerHTML = `Pillar ${hitNode.userData.id + 1}: <strong>${hitNode.userData.name}</strong>`;
      }
    } else {
      container.style.cursor = isDragging ? 'grabbing' : 'grab';
      if (tooltip) tooltip.style.display = 'none';
    }

    if (isDragging) {
      const deltaX = e.clientX - previousMousePosition.x;
      const deltaY = e.clientY - previousMousePosition.y;
      dragDist += Math.hypot(deltaX, deltaY);

      atomGroup.rotation.y += deltaX * 0.008;
      atomGroup.rotation.x += deltaY * 0.008;

      rotationVelocity = { x: deltaY * 0.002, y: deltaX * 0.002 };
      previousMousePosition = { x: e.clientX, y: e.clientY };
    }
  };

  const onPointerUp = (e) => {
    if (isDragging && dragDist < 8) {
      const rect = container.getBoundingClientRect();
      const mouseX = ((e.clientX - rect.left) / container.clientWidth) * 2 - 1;
      const mouseY = -((e.clientY - rect.top) / container.clientHeight) * 2 + 1;

      const raycaster = new THREE.Raycaster();
      raycaster.setFromCamera(new THREE.Vector2(mouseX, mouseY), camera);
      const intersects = raycaster.intersectObjects(nodeMeshes);

      if (intersects.length > 0) {
        const selectedId = intersects[0].object.userData.id;
        if (onSelectPillar) onSelectPillar(selectedId);
      }
    }
    isDragging = false;
  };

  container.addEventListener('pointerdown', onPointerDown);
  window.addEventListener('pointermove', onPointerMove);
  window.addEventListener('pointerup', onPointerUp);

  // Wheel zoom
  container.addEventListener('wheel', (e) => {
    e.preventDefault();
    camera.position.z = Math.min(Math.max(camera.position.z + e.deltaY * 0.15, 120), 380);
  }, { passive: false });

  // External buttons
  const resetBtn = document.getElementById('reset-3d-btn');
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      atomGroup.rotation.set(0, 0, 0);
      camera.position.set(0, 30, 220);
    });
  }

  const toggleSpinBtn = document.getElementById('toggle-spin-btn');
  if (toggleSpinBtn) {
    toggleSpinBtn.addEventListener('click', () => {
      autoRotate = !autoRotate;
      toggleSpinBtn.innerHTML = autoRotate
        ? `${iconly.sparkles(14)} <span>Pause Orbit</span>`
        : `${iconly.rocket(14)} <span>Resume Orbit</span>`;
    });
  }

  // Resize handler
  window.addEventListener('resize', () => {
    if (!container.clientWidth || !container.clientHeight) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Highlight specific node from external card click
  function focusPillarNode(id) {
    const targetNode = nodeMeshes.find((m) => m.userData.id === id);
    if (!targetNode) return;

    nodeMeshes.forEach((n) => {
      n.scale.set(1, 1, 1);
      n.material.emissiveIntensity = 0.6;
    });

    targetNode.scale.set(1.5, 1.5, 1.5);
    targetNode.material.emissiveIntensity = 1.2;
  }

  // Animation Loop
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const elapsedTime = clock.getElapsedTime();

    // Pulse nucleus
    nucleus.rotation.y = elapsedTime * 0.4;
    nucleus.rotation.x = elapsedTime * 0.2;
    const pulseScale = 1 + Math.sin(elapsedTime * 2) * 0.05;
    innerNucleus.scale.set(pulseScale, pulseScale, pulseScale);

    // Orbit each pillar node along its tilted 3D plane
    nodeMeshes.forEach((node) => {
      const angle = elapsedTime * node.userData.speed;
      const r = node.userData.radius;
      const tilt = node.userData.tilt;

      // Base circle
      const rawX = Math.cos(angle) * r;
      const rawY = Math.sin(angle) * r;
      const rawZ = 0;

      // Apply 3D rotation transforms
      const v = new THREE.Vector3(rawX, rawY, rawZ);
      v.applyEuler(new THREE.Euler(tilt.x, tilt.y, tilt.z));

      node.position.copy(v);
      node.rotation.y = angle * 2;
    });

    // Auto rotate atom if not actively dragging
    if (autoRotate && !isDragging) {
      atomGroup.rotation.y += rotationVelocity.y;
      atomGroup.rotation.x += rotationVelocity.x * 0.5;
    }

    renderer.render(scene, camera);
  }

  animate();

  return {
    focusPillarNode
  };
}
