"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Bars() {
  const data = [
    { value: 64, color: 0x404040 },
    { value: 49, color: 0x525252 },
    { value: 48, color: 0x0070f3 },
  ];
  const maxV = 64, barW = 1.1, gap = 0.5;
  const totalW = 3 * barW + 2 * gap;
  const startX = -totalW / 2 + barW / 2;

  const objects = useMemo(() => {
    const objs: THREE.Object3D[] = [];
    // Baseline
    const g = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(-totalW / 2 - 0.3, -2.2, 0),
      new THREE.Vector3(totalW / 2 + 0.3, -2.2, 0),
    ]);
    objs.push(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0x262626 })));
    return objs;
  }, [totalW]);

  const barRefs = useRef<(THREE.Mesh | null)[]>([]);

  useFrame(() => {
    const alpha = barRefs.current[2];
    if (alpha?.material) {
      const t = performance.now() * 0.001;
      (alpha.material as THREE.MeshBasicMaterial).opacity = 0.7 + Math.sin(t * 3) * 0.15;
    }
  });

  return (
    <group>
      {objects.map((obj, i) => <primitive key={i} object={obj} />)}
      {data.map((d, i) => {
        const x = startX + i * (barW + gap);
        const h = (d.value / maxV) * 4;
        return (
          <mesh key={`bar-${i}`} ref={el => { barRefs.current[i] = el; }} position={[x, -2.2 + h / 2, 0]}>
            <planeGeometry args={[barW, h]} />
            <meshBasicMaterial color={d.color} transparent opacity={0.85} />
          </mesh>
        );
      })}
    </group>
  );
}

export function AlphaEvolveViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <Canvas orthographic camera={{ zoom: 80, position: [0, 0, 5] }}>
        <Bars />
      </Canvas>
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)]">
        <span className="absolute left-[20%] bottom-[18%]">64 naive</span>
        <span className="absolute left-[43%] bottom-[18%]">49 Strassen</span>
        <span className="absolute right-[18%] bottom-[18%] text-[var(--blue)]">48 AlphaEvolve</span>
        <span className="absolute left-4 top-4">4x4 matrix multiplication</span>
      </div>
    </div>
  );
}
