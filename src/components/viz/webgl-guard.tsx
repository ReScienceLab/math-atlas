"use client";

import { useEffect, useState, type ReactNode } from "react";

function canCreateWebGLContext() {
  try {
    const canvas = document.createElement("canvas");
    const gl = canvas.getContext("webgl2") || canvas.getContext("webgl");
    gl?.getExtension("WEBGL_lose_context")?.loseContext();
    return Boolean(gl);
  } catch {
    return false;
  }
}

function WebGLFallback({ label }: { label: string }) {
  return (
    <div className="relative h-full w-full bg-[#0a0a0a]">
      <span className="sr-only">{label}</span>
      <span className="absolute left-1/2 top-1/2 h-20 w-20 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/[0.12]" />
      <span className="absolute left-1/2 top-1/2 h-px w-28 -translate-x-1/2 bg-white/[0.1]" />
      <span className="absolute left-1/2 top-1/2 h-28 w-px -translate-y-1/2 bg-white/[0.1]" />
    </div>
  );
}

export function WebGLGuard({
  children,
  label = "Static preview",
}: {
  children: ReactNode;
  label?: string;
}) {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => {
      setSupported(canCreateWebGLContext());
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  if (!supported) {
    return <WebGLFallback label={label} />;
  }

  return <>{children}</>;
}
