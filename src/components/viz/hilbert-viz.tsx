"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const N = 300;

  const { geom, velocities } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const velocities: { vx: number; vy: number }[] = [];
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 5;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 5;
      colors[i * 3] = colors[i * 3 + 1] = colors[i * 3 + 2] = 0.5 + Math.random() * 0.5;
      velocities.push({ vx: (Math.random() - 0.5) * 0.04, vy: (Math.random() - 0.5) * 0.04 });
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geom, velocities };
  }, []);

  const transition = useRef(0);

  useFrame((_, delta) => {
    if (!pointsRef.current) return;
    transition.current = Math.min(1, transition.current + delta * 0.3);
    const p = transition.current;
    const pos = geom.attributes.position.array as Float32Array;
    const col = geom.attributes.color.array as Float32Array;
    const time = performance.now() * 0.001;
    for (let i = 0; i < N; i++) {
      const ix = i * 3, iy = i * 3 + 1;
      pos[ix] += velocities[i].vx * (1 - p); pos[iy] += velocities[i].vy * (1 - p);
      if (Math.abs(pos[ix]) > 2.5) velocities[i].vx *= -1;
      if (Math.abs(pos[iy]) > 2.5) velocities[i].vy *= -1;
      pos[ix] += 0.01 * Math.cos(pos[iy] * 1.5 + time) * p;
      pos[iy] += 0.005 * Math.sin(pos[ix] * 2 + time * 0.7) * p;
      if (pos[ix] > 3) pos[ix] = -3; if (pos[ix] < -3) pos[ix] = 3;
      if (pos[iy] > 3) pos[iy] = -3; if (pos[iy] < -3) pos[iy] = 3;
      col[ix] = 0.7 - p * 0.3; col[ix + 1] = 0.7 + p * 0.1; col[ix + 2] = 0.7 + p * 0.3;
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geom}>
    <pointsMaterial size={0.08} vertexColors transparent opacity={0.9} />
  </points>;
}

export function HilbertViz({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-square overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <Canvas orthographic camera={{ zoom: 80, position: [0, 0, 5] }}>
        <Particles />
      </Canvas>
    </div>
  );
}
