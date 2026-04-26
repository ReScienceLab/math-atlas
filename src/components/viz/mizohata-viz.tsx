"use client";
/* eslint-disable react-hooks/immutability */

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WebGLGuard } from "./webgl-guard";

function WaveGrid() {
  const pointsRef = useRef<THREE.Points>(null);
  const res = 70;
  const N = res * res;

  const geom = useMemo(() => {
    const positions = new Float32Array(N * 3);
    const colors = new Float32Array(N * 3);
    for (let i = 0; i < res; i++)
      for (let j = 0; j < res; j++) {
        const idx = (i * res + j) * 3;
        positions[idx] = (i / res - 0.5) * 6;
        positions[idx + 1] = (j / res - 0.5) * 6;
      }
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [N, res]);

  const xLines = useMemo(() => {
    const objs: THREE.Object3D[] = [];
    const mat = new THREE.LineBasicMaterial({ color: 0xee0000, transparent: true, opacity: 0.6 });
    const g1 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.2, -1.2, 0.1), new THREE.Vector3(1.2, 1.2, 0.1)]);
    const g2 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-1.2, 1.2, 0.1), new THREE.Vector3(1.2, -1.2, 0.1)]);
    const ring = new THREE.Mesh(
      new THREE.RingGeometry(1.42, 1.45, 96),
      new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.22, side: THREE.DoubleSide })
    );
    objs.push(ring, new THREE.Line(g1, mat.clone()), new THREE.Line(g2, mat.clone()));
    return objs;
  }, []);

  useFrame(() => {
    if (!pointsRef.current) return;
    const time = performance.now() * 0.001;
    const col = geom.attributes.color.array as Float32Array;
    for (let i = 0; i < res; i++)
      for (let j = 0; j < res; j++) {
        const idx = (i * res + j) * 3;
        const x = (i / res - 0.5) * 6, y = (j / res - 0.5) * 6;
        const r = Math.sqrt(x * x + y * y);
        const wave = Math.sin(r * 3 - time * 2) * Math.exp(-r * 0.3);
        const v = wave * 0.5 + 0.5;
        col[idx] = 0.15 + v * 0.25; col[idx + 1] = 0.15 + v * 0.25; col[idx + 2] = 0.2 + v * 0.4;
      }
    geom.attributes.color.needsUpdate = true;
  });

  return (
    <group>
      <points ref={pointsRef} geometry={geom}>
        <pointsMaterial size={0.04} vertexColors transparent opacity={0.85} />
      </points>
      {xLines.map((l, i) => <primitive key={i} object={l} />)}
    </group>
  );
}

export function MizohataViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <WebGLGuard>
        <Canvas
          orthographic
          camera={{ zoom: 80, position: [0, 0, 5] }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <WaveGrid />
        </Canvas>
      </WebGLGuard>
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)]">
        <span className="absolute right-4 top-4">weighted measure on sphere</span>
        <span className="absolute bottom-4 left-4 text-[#f87171]">restriction estimate fails</span>
      </div>
    </div>
  );
}
