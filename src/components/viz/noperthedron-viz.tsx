"use client";

import { useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { WebGLGuard } from "./webgl-guard";

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

    const hole = new THREE.Mesh(
      new THREE.RingGeometry(0.48, 0.52, 4),
      new THREE.MeshBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.38, side: THREE.DoubleSide })
    );
    hole.rotation.set(Math.PI / 2, 0, Math.PI / 4);
    hole.position.set(0, 0, 0.92);
    objs.push(hole);

    const xMat = new THREE.LineBasicMaterial({ color: 0xef4444, transparent: true, opacity: 0.62 });
    const x1 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.42, -0.42, 1.02), new THREE.Vector3(0.42, 0.42, 1.02)]);
    const x2 = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-0.42, 0.42, 1.02), new THREE.Vector3(0.42, -0.42, 1.02)]);
    objs.push(new THREE.Line(x1, xMat), new THREE.Line(x2, xMat.clone()));
    return objs;
  }, []);

  return <group>{objects.map((obj, i) => <primitive key={i} object={obj} />)}</group>;
}

export function NoperthedronViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <WebGLGuard label="3D preview">
        <Canvas
          camera={{ position: [2.5, 2, 2.5], fov: 45 }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Wireframe />
          <OrbitControls autoRotate autoRotateSpeed={2} enableZoom={false} enableDamping dampingFactor={0.04} />
        </Canvas>
      </WebGLGuard>
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)]">
        <span className="absolute left-4 top-4">90-vertex convex polyhedron</span>
        <span className="absolute bottom-4 left-4 text-[#f87171]">no Rupert passage</span>
      </div>
    </div>
  );
}
