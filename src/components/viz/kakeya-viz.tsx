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

  const { tubeGeometry, markerGeometry, tubes, markers } = useMemo(() => {
    const gr = (1 + Math.sqrt(5)) / 2;
    const yAxis = new THREE.Vector3(0, 1, 0);
    const segmentLength = 1;
    const tubeGeometry = new THREE.CylinderGeometry(0.009, 0.009, segmentLength, 8, 1, true);
    const markerGeometry = new THREE.SphereGeometry(0.026, 8, 8);
    const result: {
      position: THREE.Vector3;
      quaternion: THREE.Quaternion;
      color: THREE.Color;
      opacity: number;
      radiusScale: number;
    }[] = [];
    const markers: { position: THREE.Vector3; color: THREE.Color }[] = [];
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
      const parameter = i / n;
      const foldedAnchor = new THREE.Vector3(
        Math.sin(phi * 1.7) * Math.sin(theta) * 0.36,
        Math.cos(theta * 1.15) * 0.28,
        Math.cos(phi * 1.35) * Math.sin(theta) * 0.3,
      );
      const localJitter = tangent
        .clone()
        .multiplyScalar((seeded(i * 7 + 5) - 0.5) * 0.18)
        .add(bitangent.clone().multiplyScalar((seeded(i * 7 + 6) - 0.5) * 0.14));
      const anchor = foldedAnchor
        .add(localJitter)
        .multiplyScalar(0.72 + Math.sin(parameter * Math.PI * 2) * 0.12);
      const center = anchor.clone().add(direction.clone().multiplyScalar(segmentLength * 0.5));
      const highlight = i % 23 === 0;

      result.push({
        position: center,
        quaternion: new THREE.Quaternion().setFromUnitVectors(yAxis, direction),
        color: highlight ? new THREE.Color("#f5f5f5") : new THREE.Color("#93c5fd"),
        opacity: highlight ? 0.6 : 0.15 + seeded(i * 7 + 7) * 0.14,
        radiusScale: highlight ? 1.55 : 1,
      });

      if (highlight) {
        markers.push(
          { position: anchor, color: new THREE.Color("#60a5fa") },
          { position: center.clone().add(direction.clone().multiplyScalar(segmentLength * 0.5)), color: new THREE.Color("#f5f5f5") },
        );
      }
    }

    return { tubeGeometry, markerGeometry, tubes: result, markers };
  }, []);

  return (
    <group ref={groupRef}>
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
      {markers.map((marker, i) => (
        <mesh key={`marker-${i}`} geometry={markerGeometry} position={marker.position}>
          <meshBasicMaterial color={marker.color} transparent opacity={0.7} depthWrite={false} />
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
        <span className="absolute left-4 top-4">e ∈ S², a(e)+[0,1]e ⊂ K</span>
        <span className="absolute bottom-4 right-4 text-[var(--blue)]">K_δ tube union; dim_H = upper dim_M = 3</span>
      </div>
    </div>
  );
}
