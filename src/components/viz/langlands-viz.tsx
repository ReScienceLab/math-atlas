"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Nodes() {
  const nodes = [
    [-1.1, 1, 0], [1.1, 1, 0], [0, -0.7, 0],
  ] as [number, number, number][];
  const edges = [[0, 1], [1, 2], [0, 2]] as [number, number][];

  const travelers = useRef(edges.map(() => ({ t: Math.random(), speed: 0.003 + Math.random() * 0.003 })));
  const dotRefs = useRef<(THREE.Mesh | null)[]>([]);

  const objects = useMemo(() => {
    const objs: THREE.Object3D[] = [];
    nodes.forEach(pos => {
      const ring = new THREE.Mesh(
        new THREE.RingGeometry(0.28, 0.32, 64),
        new THREE.MeshBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.5, side: THREE.DoubleSide })
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
          <meshBasicMaterial color="#0070f3" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

export function LanglandsViz({ className = "" }: { className?: string }) {
  return (
    <div className={`w-full aspect-square overflow-hidden bg-[var(--gray-950)] border border-white/[0.08] ${className}`}>
      <Canvas orthographic camera={{ zoom: 100, position: [0, 0, 5] }}>
        <Nodes />
      </Canvas>
    </div>
  );
}
