"use client";
/* eslint-disable react-hooks/immutability */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WebGLGuard } from "./webgl-guard";

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function Particles() {
  const pointsRef = useRef<THREE.Points>(null);
  const N = 300;

  const { geom, velocities } = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    const velocities: { vx: number; vy: number }[] = [];
    for (let i = 0; i < N; i++) {
      positions[i * 3] = (seeded(i * 5 + 1) - 0.5) * 5;
      positions[i * 3 + 1] = (seeded(i * 5 + 2) - 0.5) * 5;
      colors[i * 3] = 0.55 + seeded(i * 5 + 3) * 0.2;
      colors[i * 3 + 1] = 0.7 + seeded(i * 5 + 4) * 0.25;
      colors[i * 3 + 2] = 0.95;
      velocities.push({ vx: (seeded(i * 5 + 4) - 0.5) * 0.04, vy: (seeded(i * 5 + 5) - 0.5) * 0.04 });
    }
    const geom = new THREE.BufferGeometry();
    geom.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geom.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return { geom, velocities };
  }, [N]);

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
      col[ix] = 0.55 - p * 0.1;
      col[ix + 1] = 0.75 + p * 0.15;
      col[ix + 2] = 1;
    }
    geom.attributes.position.needsUpdate = true;
    geom.attributes.color.needsUpdate = true;
  });

  return <points ref={pointsRef} geometry={geom}>
    <pointsMaterial
      size={3.2}
      vertexColors
      transparent
      opacity={0.92}
      sizeAttenuation={false}
      depthWrite={false}
      blending={THREE.AdditiveBlending}
    />
  </points>;
}

export function HilbertViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <WebGLGuard>
        <Canvas
          orthographic
          camera={{ zoom: 80, position: [0, 0, 5] }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Particles />
        </Canvas>
      </WebGLGuard>
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-400)]">
        <span className="absolute left-4 top-4">Newtonian particles</span>
        <span className="absolute left-1/2 top-4 -translate-x-1/2">Boltzmann limit</span>
        <span className="absolute bottom-4 right-4 text-[var(--blue)]">Euler / Navier-Stokes</span>
        <span className="absolute left-[24%] top-1/2 h-px w-[52%] bg-white/[0.28]" />
        <span className="absolute right-[22%] top-[calc(50%-4px)] h-0 w-0 border-y-[5px] border-l-[8px] border-y-transparent border-l-white/45" />
      </div>
    </div>
  );
}
