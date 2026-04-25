"use client";

import { useRef, useEffect, useCallback } from "react";

interface Node {
  x: number;
  y: number;
  baseX: number;
  baseY: number;
  vx: number;
  vy: number;
  radius: number;
  phase: number;
  brightness: number;
}

interface Ripple {
  x: number;
  y: number;
  radius: number;
  maxRadius: number;
  speed: number;
  birth: number;
}

export function HeroBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);
  const nodesRef = useRef<Node[]>([]);
  const ripplesRef = useRef<Ripple[]>([]);
  const mouseRef = useRef({ x: -1, y: -1 });
  const sizeRef = useRef({ w: 0, h: 0 });

  const init = useCallback(() => {
    const { w, h } = sizeRef.current;
    if (!w || !h) return;

    // Langlands constellation nodes — scattered with purpose
    const nodes: Node[] = [];
    const count = Math.floor((w * h) / 18000);
    const n = Math.max(30, Math.min(count, 80));

    for (let i = 0; i < n; i++) {
      const x = Math.random() * w;
      const y = Math.random() * h;
      nodes.push({
        x, y, baseX: x, baseY: y,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        radius: 1 + Math.random() * 1.5,
        phase: Math.random() * Math.PI * 2,
        brightness: 0.15 + Math.random() * 0.25,
      });
    }
    nodesRef.current = nodes;

    // Seed a few initial ripples
    ripplesRef.current = [];
    for (let i = 0; i < 3; i++) {
      const node = nodes[Math.floor(Math.random() * nodes.length)];
      ripplesRef.current.push({
        x: node.x, y: node.y,
        radius: Math.random() * 100,
        maxRadius: 200 + Math.random() * 300,
        speed: 0.3 + Math.random() * 0.4,
        birth: performance.now() - Math.random() * 5000,
      });
    }
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const rect = canvas.parentElement!.getBoundingClientRect();
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = rect.width + "px";
      canvas.style.height = rect.height + "px";
      ctx.scale(dpr, dpr);
      sizeRef.current = { w: rect.width, h: rect.height };
      init();
    };

    resize();
    window.addEventListener("resize", resize);

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    canvas.addEventListener("mousemove", onMouse);

    let lastRippleTime = 0;

    const draw = () => {
      const { w, h } = sizeRef.current;
      const now = performance.now();
      const time = now * 0.001;

      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const ripples = ripplesRef.current;
      const mouse = mouseRef.current;

      // --- Update nodes ---
      for (const node of nodes) {
        // Gentle drift
        node.x += node.vx;
        node.y += node.vy;

        // Breathing oscillation
        const breathe = Math.sin(time * 0.5 + node.phase) * 8;
        const drawX = node.x + breathe * 0.3;
        const drawY = node.y + breathe * 0.2;

        // Soft boundary wrap
        if (node.x < -20) node.x = w + 20;
        if (node.x > w + 20) node.x = -20;
        if (node.y < -20) node.y = h + 20;
        if (node.y > h + 20) node.y = -20;

        // Mouse repulsion (subtle)
        if (mouse.x > 0) {
          const dx = drawX - mouse.x;
          const dy = drawY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 150 && dist > 0) {
            const force = (150 - dist) / 150 * 0.3;
            node.x += (dx / dist) * force;
            node.y += (dy / dist) * force;
          }
        }

        node.x = node.x;
        node.y = node.y;
      }

      // --- Draw Fourier ripples ---
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        const life = r.radius / r.maxRadius;
        if (life > 1) {
          ripples.splice(i, 1);
          continue;
        }

        // Multiple concentric rings per ripple
        for (let ring = 0; ring < 3; ring++) {
          const ringRadius = r.radius - ring * 30;
          if (ringRadius < 0) continue;
          const ringLife = ringRadius / r.maxRadius;
          const alpha = (1 - ringLife) * (1 - ringLife) * 0.06;

          ctx.beginPath();
          ctx.arc(r.x, r.y, ringRadius, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(0, 112, 243, ${alpha})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Spawn new ripples periodically from random nodes
      if (now - lastRippleTime > 2000 + Math.random() * 3000 && nodes.length > 0) {
        const node = nodes[Math.floor(Math.random() * nodes.length)];
        ripples.push({
          x: node.x, y: node.y,
          radius: 0,
          maxRadius: 150 + Math.random() * 250,
          speed: 0.3 + Math.random() * 0.5,
          birth: now,
        });
        lastRippleTime = now;
      }

      // --- Draw edges (Langlands connections) ---
      const connectionDist = 180;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < connectionDist) {
            const alpha = (1 - dist / connectionDist) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // --- Draw nodes ---
      for (const node of nodes) {
        const pulse = 1 + Math.sin(time * 1.5 + node.phase) * 0.3;
        const r = node.radius * pulse;

        // Glow
        const grad = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, r * 6);
        grad.addColorStop(0, `rgba(255, 255, 255, ${node.brightness * 0.4})`);
        grad.addColorStop(0.5, `rgba(255, 255, 255, ${node.brightness * 0.05})`);
        grad.addColorStop(1, "rgba(255, 255, 255, 0)");
        ctx.beginPath();
        ctx.arc(node.x, node.y, r * 6, 0, Math.PI * 2);
        ctx.fillStyle = grad;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${node.brightness})`;
        ctx.fill();
      }

      // --- Fourier wave overlay at bottom ---
      const waveY = h * 0.75;
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath();
        const freq = 0.008 + wave * 0.003;
        const amp = 15 + wave * 8;
        const speed = 0.4 + wave * 0.2;
        const yOffset = wave * 25;

        for (let x = 0; x <= w; x += 2) {
          const y = waveY + yOffset +
            Math.sin(x * freq + time * speed) * amp +
            Math.sin(x * freq * 2.3 + time * speed * 0.7) * amp * 0.3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.03 - wave * 0.008})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
      canvas.removeEventListener("mousemove", onMouse);
    };
  }, [init]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-auto"
      style={{ zIndex: 0 }}
    />
  );
}
