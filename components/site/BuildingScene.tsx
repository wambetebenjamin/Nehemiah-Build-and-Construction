"use client";

import { useEffect, useRef, useState } from "react";

export function BuildingScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const [supported, setSupported] = useState(false);

  useEffect(() => {
    const host = hostRef.current;
    if (!host || window.matchMedia("(prefers-reduced-motion: reduce)").matches || window.innerWidth < 768) return;

    let cancelled = false;
    let dispose: (() => void) | undefined;
    void import("three").then((THREE) => {
      if (cancelled) return;
      dispose = mountBuilding(host, THREE, () => setSupported(true));
    }).catch(() => undefined);

    return () => {
      cancelled = true;
      dispose?.();
    };
  }, []);

  return (
    <div className={`building-scene${supported ? " is-ready" : ""}`} ref={hostRef} role={supported ? "group" : "img"} tabIndex={supported ? 0 : undefined} aria-label={supported ? "Interactive architectural model of a modern multi-storey building. Drag to rotate, or use the arrow keys when focused." : "Architectural model poster. The interactive model is unavailable or reduced motion is enabled."}>
      <img src="/images/residential-build.jpg" alt="" className="building-poster" />
      {supported && <p className="scene-hint" aria-hidden="true">Drag to explore <span>↗</span></p>}
    </div>
  );
}

function mountBuilding(host: HTMLDivElement, THREE: typeof import("three"), onReady: () => void): () => void {
  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try {
    renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
  } catch {
    return () => undefined;
  }

  onReady();
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.setSize(host.clientWidth, host.clientHeight, false);
  renderer.setClearColor(0x030f27, 0);
  host.appendChild(renderer.domElement);
  renderer.domElement.setAttribute("aria-hidden", "true");

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, host.clientWidth / host.clientHeight, 0.1, 100);
  camera.position.set(7.2, 6.3, 9.6);
  camera.lookAt(0, 1.7, 0);

  scene.add(new THREE.HemisphereLight(0xe8f2ff, 0x171b24, 2.2));
  const key = new THREE.DirectionalLight(0xffcf65, 3.1);
  key.position.set(5, 9, 6);
  scene.add(key);
  const fill = new THREE.DirectionalLight(0x5ea5c8, 1.7);
  fill.position.set(-5, 5, -4);
  scene.add(fill);

  const model = new THREE.Group();
  scene.add(model);
  const navy = new THREE.MeshStandardMaterial({ color: 0x10223b, metalness: 0.12, roughness: 0.54 });
  const concrete = new THREE.MeshStandardMaterial({ color: 0xd6d6cf, metalness: 0.02, roughness: 0.78 });
  const glass = new THREE.MeshStandardMaterial({ color: 0x69b2c9, metalness: 0.18, roughness: 0.28, transparent: true, opacity: 0.83 });
  const gold = new THREE.MeshStandardMaterial({ color: 0xfdbe33, metalness: 0.22, roughness: 0.45 });

  const base = new THREE.Mesh(new THREE.BoxGeometry(5.2, 0.22, 4.2), concrete);
  base.position.y = 0.11;
  model.add(base);

  const floors = 5;
  const floorHeight = 0.82;
  for (let floor = 0; floor < floors; floor += 1) {
    const y = 0.24 + floor * floorHeight;
    const slab = new THREE.Mesh(new THREE.BoxGeometry(4.35, 0.13, 3.35), floor % 2 ? concrete : navy);
    slab.position.set(0, y, 0);
    model.add(slab);

    const wall = new THREE.Mesh(new THREE.BoxGeometry(4.08, floorHeight - 0.13, 3.08), glass);
    wall.position.set(0, y + floorHeight / 2, 0);
    model.add(wall);

    for (let x = -1; x <= 1; x += 1) {
      for (const z of [-1, 1]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, floorHeight - 0.12, 0.1), gold);
        post.position.set(x * 1.92, y + floorHeight / 2, z * 1.52);
        model.add(post);
      }
    }
    for (let z = -1; z <= 1; z += 1) {
      for (const x of [-1, 1]) {
        const post = new THREE.Mesh(new THREE.BoxGeometry(0.1, floorHeight - 0.12, 0.1), gold);
        post.position.set(x * 2.02, y + floorHeight / 2, z * 1.45);
        model.add(post);
      }
    }
  }

  const roof = new THREE.Mesh(new THREE.BoxGeometry(4.75, 0.18, 3.8), gold);
  roof.position.set(0, 0.24 + floors * floorHeight, 0);
  model.add(roof);

  for (let floor = 0; floor < floors; floor += 1) {
    const y = 0.56 + floor * floorHeight;
    for (let col = -2; col <= 2; col += 1) {
      const window = new THREE.Mesh(new THREE.BoxGeometry(0.48, 0.4, 0.045), navy);
      window.position.set(col * 0.72, y, 1.57);
      model.add(window);
      const backWindow = window.clone();
      backWindow.position.z = -1.57;
      model.add(backWindow);
    }
  }

  const podium = new THREE.Mesh(new THREE.BoxGeometry(5.9, 0.2, 4.9), navy);
  podium.position.set(0, -0.04, 0);
  model.add(podium);

  const grid = new THREE.GridHelper(14, 20, 0xfdbe33, 0x2c4159);
  const gridMaterial = grid.material as InstanceType<typeof THREE.Material> & { opacity?: number; transparent?: boolean };
  gridMaterial.opacity = 0.18;
  gridMaterial.transparent = true;
  grid.position.y = -0.16;
  scene.add(grid);

  model.rotation.y = -0.52;
  model.rotation.x = 0.04;
  let frame = 0;
  let pointerDown = false;
  let previousX = 0;
  let previousY = 0;
  let paused = document.hidden || window.innerWidth < 768;

  const animate = () => {
    frame = window.requestAnimationFrame(animate);
    if (!paused) {
      if (!pointerDown) model.rotation.y += 0.0015;
      renderer.render(scene, camera);
    }
  };
  animate();

  const resize = () => {
    const width = host.clientWidth;
    const height = host.clientHeight;
    const smallScreen = window.innerWidth < 768;
    renderer.domElement.style.display = smallScreen ? "none" : "block";
    paused = document.hidden || smallScreen;
    if (!width || !height) return;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height, false);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  };
  const observer = new ResizeObserver(resize);
  observer.observe(host);
  window.addEventListener("resize", resize, { passive: true });
  const visibility = () => { paused = document.hidden || window.innerWidth < 768; };
  document.addEventListener("visibilitychange", visibility);

  const pointerStart = (event: PointerEvent) => {
    pointerDown = true;
    previousX = event.clientX;
    previousY = event.clientY;
    host.setPointerCapture?.(event.pointerId);
  };
  const pointerMove = (event: PointerEvent) => {
    if (!pointerDown) return;
    model.rotation.y += (event.clientX - previousX) * 0.008;
    model.rotation.x = THREE.MathUtils.clamp(model.rotation.x + (event.clientY - previousY) * 0.004, -0.28, 0.28);
    previousX = event.clientX;
    previousY = event.clientY;
  };
  const pointerEnd = () => { pointerDown = false; };
  const keyDown = (event: KeyboardEvent) => {
    const step = 0.12;
    if (event.key === "ArrowLeft") model.rotation.y -= step;
    else if (event.key === "ArrowRight") model.rotation.y += step;
    else if (event.key === "ArrowUp") model.rotation.x = THREE.MathUtils.clamp(model.rotation.x - step, -0.28, 0.28);
    else if (event.key === "ArrowDown") model.rotation.x = THREE.MathUtils.clamp(model.rotation.x + step, -0.28, 0.28);
    else return;
    event.preventDefault();
  };
  host.addEventListener("pointerdown", pointerStart);
  host.addEventListener("pointermove", pointerMove);
  host.addEventListener("pointerup", pointerEnd);
  host.addEventListener("pointercancel", pointerEnd);
  host.addEventListener("keydown", keyDown);

  return () => {
    window.cancelAnimationFrame(frame);
    observer.disconnect();
    window.removeEventListener("resize", resize);
    document.removeEventListener("visibilitychange", visibility);
    host.removeEventListener("pointerdown", pointerStart);
    host.removeEventListener("pointermove", pointerMove);
    host.removeEventListener("pointerup", pointerEnd);
    host.removeEventListener("pointercancel", pointerEnd);
    host.removeEventListener("keydown", keyDown);
    model.traverse((object) => {
      if (object instanceof THREE.Mesh) {
        object.geometry.dispose();
        if (Array.isArray(object.material)) object.material.forEach((material) => material.dispose());
        else object.material.dispose();
      }
    });
    scene.clear();
    renderer.dispose();
    renderer.domElement.remove();
  };
}
