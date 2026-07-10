"use client";

import { useEffect, useState } from "react";

export function useWebGLSupport() {
  const [supported, setSupported] = useState<boolean | null>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => {
      try {
        const canvas = document.createElement("canvas");
        setSupported(Boolean(canvas.getContext("webgl2") || canvas.getContext("webgl")));
      } catch {
        setSupported(false);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  return supported;
}
