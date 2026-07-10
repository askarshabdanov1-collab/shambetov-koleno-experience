"use client";

import { Billboard, Html, Line } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";
import type { Group } from "three";

type Props = {
  position: [number, number, number];
  label: string;
  detail?: string;
  side?: "left" | "right";
  variant?: "primary" | "secondary";
  reducedMotion: boolean;
  previewed?: boolean;
};

export function AnatomyHotspot({
  position,
  label,
  detail = "Анатомическая проекция",
  side = "left",
  variant = "primary",
  reducedMotion,
  previewed = false,
}: Props) {
  const ring = useRef<Group>(null);
  const direction = side === "left" ? -1 : 1;
  const lineEnd = direction * (variant === "secondary" ? 0.3 : 0.36);

  useFrame(({ clock }) => {
    if (!ring.current || reducedMotion) return;
    const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.045;
    ring.current.scale.setScalar(scale);
  });

  return (
    <group position={position}>
      <Billboard follow>
        <group ref={ring}>
          <mesh>
            <circleGeometry args={[previewed ? 0.045 : 0.036, 32]} />
            <meshBasicMaterial color="#eafaff" transparent opacity={0.98} depthTest={false} />
          </mesh>
          <mesh position={[0, 0, -0.001]}>
            <ringGeometry args={[previewed ? 0.058 : 0.05, previewed ? 0.074 : 0.065, 40]} />
            <meshBasicMaterial color="#0a91c7" transparent opacity={0.92} depthTest={false} />
          </mesh>
        </group>
        <Line
          points={[[0, 0, 0], [direction * 0.1, 0.1, 0], [lineEnd, 0.1, 0]]}
          color="#0a84b7"
          lineWidth={1.15}
          transparent
          opacity={variant === "secondary" ? 0.64 : 0.86}
          depthTest={false}
        />
      </Billboard>
      <Html center distanceFactor={2.7} position={[lineEnd + direction * 0.08, 0.1, 0]}>
        <div
          className={`anatomy-hotspot-label ${variant === "secondary" ? "secondary" : ""}`}
          data-side={side}
          aria-hidden="true"
        >
          <small>{detail}</small>
          <strong>{label}</strong>
        </div>
      </Html>
    </group>
  );
}
