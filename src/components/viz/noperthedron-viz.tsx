"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Wireframe() {
  const objects = useMemo(() => {
    const gr = (1 + Math.sqrt(5)) / 2;
    const icoV: number[][] = [];
    for (const s1 of [-1, 1])
      for (const s2 of [-1, 1]) {
        icoV.push([0, s1, s2 * gr]); icoV.push([s1, s2 * gr, 0]); icoV.push([s2 * gr, 0, s1]);
      }
    const allV = [...icoV];
    for (let i = 0; i < icoV.length; i++)
      for (let j = i + 1; j < icoV.length; j++) {
        const d = Math.hypot(icoV[i][0] - icoV[j][0], icoV[i][1] - icoV[j][1], icoV[i][2] - icoV[j][2]);
        if (d < 2.5) {
          const mid = icoV[i].map((v, k) => (v + icoV[j][k]) / 2);
          const norm = Math.hypot(...mid);
          if (norm > 0) { const f = gr * (1 + 0.08 * Math.sin(3 * mid[0]) * Math.cos(2 * mid[1])) / norm; allV.push(mid.map(v => v * f)); }
        }
      }
    const raw = allV.slice(0, 90);
    const maxR = Math.max(...raw.map(v => Math.hypot(...v)));
    const nv = raw.map(v => v.map(c => c / maxR * 1.2) as [number, number, number]);

    const objs: THREE.Object3D[] = [];
    nv.forEach(v => {
      const dot = new THREE.Mesh(new THREE.SphereGeometry(0.02, 8, 8), new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.9 }));
      dot.position.set(...v);
      objs.push(dot);
    });
    for (let i = 0; i < nv.length; i++)
      for (let j = i + 1; j < nv.length; j++)
        if (Math.hypot(nv[i][0] - nv[j][0], nv[i][1] - nv[j][1], nv[i][2] - nv[j][2]) < 0.6) {
          const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...nv[i]), new THREE.Vector3(...nv[j])]);
          objs.push(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.15 })));
        }
    return objs;
  }, []);

  return <group>{objects.map((obj, i) => <primitive key={i} object={obj} />)}</group>;
}

export function NoperthedronViz({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-square overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <Canvas camera={{ position: [2.5, 2, 2.5], fov: 45 }}>
        <Wireframe />
        <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enableDamping dampingFactor={0.04} />
      </Canvas>
    </div>
  );
}
