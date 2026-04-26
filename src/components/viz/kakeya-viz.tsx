"use client";

import { useRef, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { WebGLGuard } from "./webgl-guard";

function seeded(index: number) {
  const value = Math.sin(index * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

function KakeyaLines() {
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const gr = (1 + Math.sqrt(5)) / 2;
    const result: { positions: Float32Array; brightness: number }[] = [];
    const n = 100;
    for (let i = 0; i < n; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / n);
      const phi = (2 * Math.PI * i) / gr;
      const dx = Math.sin(theta) * Math.cos(phi);
      const dy = Math.sin(theta) * Math.sin(phi);
      const dz = Math.cos(theta);
      const off = 0.08 * (seeded(i * 2 + 1) - 0.5);
      result.push({
        positions: new Float32Array([
          -dx * 0.5 + dx * off, -dy * 0.5 + dy * off, -dz * 0.5 + dz * off,
          dx * 0.5 + dx * off, dy * 0.5 + dy * off, dz * 0.5 + dz * off,
        ]),
        brightness: 0.3 + seeded(i * 2 + 2) * 0.7,
      });
    }
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((l, i) => {
        const geom = new THREE.BufferGeometry();
        geom.setAttribute("position", new THREE.BufferAttribute(l.positions, 3));
        return (
          <primitive key={i} object={new THREE.Line(
            geom,
            new THREE.LineBasicMaterial({ color: new THREE.Color(l.brightness, l.brightness, l.brightness), transparent: true, opacity: 0.7 })
          )} />
        );
      })}
    </group>
  );
}

export function KakeyaViz({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <WebGLGuard label="3D preview">
        <Canvas
          camera={{ position: [2, 1.5, 2], fov: 50 }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <KakeyaLines />
          <OrbitControls autoRotate autoRotateSpeed={1.2} enableZoom={false} enableDamping dampingFactor={0.04} />
        </Canvas>
      </WebGLGuard>
    </div>
  );
}
