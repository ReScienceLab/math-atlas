"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { WebGLGuard } from "./webgl-guard";

const nodes = [
  [-1.15, 0.35, 0], [1.15, 0.35, 0], [0, -0.72, 0],
] as [number, number, number][];

const edges = [[0, 1], [0, 2], [1, 2]] as [number, number][];

const travelerSeeds = edges.map((_, i) => ({
  t: (i * 0.37 + 0.19) % 1,
  speed: 0.003 + ((i * 0.23 + 0.11) % 1) * 0.003,
}));

function Nodes() {
  const travelers = useRef(travelerSeeds.map((seed) => ({ ...seed })));
  const dotRefs = useRef<(THREE.Mesh | null)[]>([]);

  const objects = useMemo(() => {
    const objs: THREE.Object3D[] = [];
    nodes.forEach((pos, i) => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(i === 2 ? 0.2 : 0.34, i === 2 ? 0.23 : 0.38, 64),
        new THREE.MeshBasicMaterial({
          color: i === 2 ? 0x3b82f6 : 0xffffff,
          transparent: true,
          opacity: i === 2 ? 0.56 : 0.46,
          side: THREE.DoubleSide,
        })
      );
      ring.position.set(...pos);
      objs.push(ring);
    });
    edges.forEach(([a, b]) => {
      const g = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...nodes[a]), new THREE.Vector3(...nodes[b])]);
      objs.push(new THREE.Line(g, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 })));
    });
    return objs;
  }, []);

  useFrame(() => {
    travelers.current.forEach((tr, i) => {
      tr.t = (tr.t + tr.speed) % 1;
      const [a, b] = edges[i];
      const dot = dotRefs.current[i];
      if (dot) {
        dot.position.lerpVectors(new THREE.Vector3(...nodes[a]), new THREE.Vector3(...nodes[b]), tr.t);
      }
    });
  });

  return (
    <group>
      {objects.map((obj, i) => <primitive key={i} object={obj} />)}
      {edges.map((_, i) => (
        <mesh key={`dot-${i}`} ref={el => { dotRefs.current[i] = el; }}>
          <circleGeometry args={[0.035, 16]} />
          <meshBasicMaterial color="#0070f3" transparent opacity={0.9} side={THREE.DoubleSide} />
        </mesh>
      ))}
    </group>
  );
}

export function LanglandsViz({ className = "" }: { className?: string }) {
  return (
    <div className={`relative w-full h-full overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <WebGLGuard>
        <Canvas
          orthographic
          camera={{ zoom: 100, position: [0, 0, 5] }}
          gl={{ alpha: true }}
          onCreated={({ gl }) => gl.setClearColor(0x000000, 0)}
        >
          <Nodes />
        </Canvas>
      </WebGLGuard>
      <div className="viz-detail-labels pointer-events-none absolute inset-0 font-[var(--font-mono)] text-[10px] text-[var(--gray-500)]">
        <span className="absolute left-[17%] top-[28%]">Bun_G(X)</span>
        <span className="absolute right-[16%] top-[28%]">LocSys_G</span>
        <span className="absolute bottom-[23%] left-1/2 -translate-x-1/2 text-[var(--blue)]">Hecke</span>
        <span className="absolute bottom-4 left-4">D-mod(Bun_G) &lt;-&gt; QCoh(LocSys_G)</span>
      </div>
    </div>
  );
}
