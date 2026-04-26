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

  const { tubeGeometry, packetGeometry, tubes } = useMemo(() => {
    const gr = (1 + Math.sqrt(5)) / 2;
    const yAxis = new THREE.Vector3(0, 1, 0);
    const tubeGeometry = new THREE.CylinderGeometry(0.01, 0.01, 1.02, 8, 1, true);
    const packetGeometry = new THREE.SphereGeometry(0.72, 32, 16);
    const result: {
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      color: THREE.Color;
      opacity: number;
      radiusScale: number;
    }[] = [];
    const n = 112;

    for (let i = 0; i < n; i++) {
      const theta = Math.acos(1 - 2 * (i + 0.5) / n);
      const phi = (2 * Math.PI * i) / gr;
      const direction = new THREE.Vector3(
        Math.sin(theta) * Math.cos(phi),
        Math.cos(theta),
        Math.sin(theta) * Math.sin(phi),
      ).normalize();
      const raw = new THREE.Vector3(
        seeded(i * 7 + 1) - 0.5,
        seeded(i * 7 + 2) - 0.5,
        seeded(i * 7 + 3) - 0.5,
      );
      let tangent = raw.sub(direction.clone().multiplyScalar(raw.dot(direction)));
      if (tangent.lengthSq() < 0.001) {
        tangent = new THREE.Vector3(1, 0, 0).cross(direction);
      }
      tangent.normalize();
      const bitangent = new THREE.Vector3().crossVectors(direction, tangent).normalize();
      const packet = 0.28 + Math.pow(seeded(i * 7 + 4), 1.35) * 0.72;
      const center = tangent
        .clone()
        .multiplyScalar((seeded(i * 7 + 5) - 0.5) * 0.82 * packet)
        .add(bitangent.clone().multiplyScalar((seeded(i * 7 + 6) - 0.5) * 0.58 * packet))
        .add(direction.clone().multiplyScalar((seeded(i * 7 + 8) - 0.5) * 0.1));
      const highlight = i % 29 === 0;

      result.push({
        position: center,
        quaternion: new THREE.Quaternion().setFromUnitVectors(yAxis, direction),
        color: highlight ? new THREE.Color("#f5f5f5") : new THREE.Color("#93c5fd"),
        opacity: highlight ? 0.5 : 0.14 + seeded(i * 7 + 7) * 0.16,
        radiusScale: highlight ? 1.65 : 1,
      });
    }

    return { tubeGeometry, packetGeometry, tubes: result };
  }, []);

  return (
    <group ref={groupRef}>
      <mesh geometry={packetGeometry}>
        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.035}
          wireframe
          depthWrite={false}
        />
      </mesh>
      {tubes.map((tube, i) => (
        <mesh
          key={i}
          geometry={tubeGeometry}
          position={tube.position}
          quaternion={tube.quaternion}
          scale={[tube.radiusScale, 1, tube.radiusScale]}
        >
          <meshBasicMaterial
            color={tube.color}
            transparent
            opacity={tube.opacity}
            depthWrite={false}
            blending={THREE.AdditiveBlending}
            side={THREE.DoubleSide}
          />
        </mesh>
      ))}
    </group>
  );
}

export function KakeyaViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
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
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)]">
        <span className="absolute left-4 top-4">δ-tubes in many directions</span>
        <span className="absolute bottom-4 right-4 text-[var(--blue)]">dim_H = upper dim_M = 3</span>
      </div>
    </div>
  );
}
