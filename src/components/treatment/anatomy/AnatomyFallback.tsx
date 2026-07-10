"use client";

import type { TreatmentItem } from "@/types/treatment";
import { AnatomyHotspot } from "./AnatomyHotspot";

type Props = {
  item: TreatmentItem;
  previewed: boolean;
  reducedMotion: boolean;
};

const skin = "#c87a63";
const muscle = "#a94f4f";
const bone = "#ecdbc3";
const joint = "#8dd7ef";

function Limb({ position, rotation = [0, 0, 0], length = 1, radius = 0.15, color = muscle }: {
  position: [number, number, number];
  rotation?: [number, number, number];
  length?: number;
  radius?: number;
  color?: string;
}) {
  return (
    <mesh position={position} rotation={rotation} castShadow receiveShadow>
      <capsuleGeometry args={[radius, length, 8, 18]} />
      <meshStandardMaterial color={color} roughness={0.58} metalness={0.02} />
    </mesh>
  );
}

export function AnatomyFallback({ item, previewed, reducedMotion }: Props) {
  const focus = item.anatomyFocus;
  const isKnee = focus.view === "knee";
  const isShoulder = focus.view === "shoulder";

  return (
    <group>
      <mesh position={[0, 2.42, 0]} castShadow>
        <sphereGeometry args={[0.36, 32, 32]} />
        <meshStandardMaterial color={skin} roughness={0.7} />
      </mesh>
      <mesh position={[0, 1.52, 0]} scale={[0.82, 1.18, 0.46]} castShadow>
        <capsuleGeometry args={[0.48, 0.78, 12, 24]} />
        <meshStandardMaterial color={muscle} roughness={0.56} />
      </mesh>
      <mesh position={[0, 0.7, 0]} scale={[0.68, 0.48, 0.42]} castShadow>
        <sphereGeometry args={[0.55, 28, 24]} />
        <meshStandardMaterial color="#b96358" roughness={0.6} />
      </mesh>

      <Limb position={[-0.78, 1.25, 0]} rotation={[0, 0, -0.12]} length={1.15} radius={0.14} />
      <Limb position={[0.78, 1.25, 0]} rotation={[0, 0, 0.12]} length={1.15} radius={0.14} />
      <Limb position={[-0.88, 0.1, 0]} rotation={[0, 0, -0.02]} length={0.92} radius={0.12} color={skin} />
      <Limb position={[0.88, 0.1, 0]} rotation={[0, 0, 0.02]} length={0.92} radius={0.12} color={skin} />

      <Limb position={[-0.38, -0.35, 0]} length={1.08} radius={0.19} />
      <Limb position={[0.38, -0.35, 0]} length={1.08} radius={0.19} />
      <Limb position={[-0.38, -1.82, 0]} length={1.05} radius={0.15} color="#b65b52" />
      <Limb position={[0.38, -1.82, 0]} length={1.05} radius={0.15} color="#b65b52" />

      {[-0.38, 0.38].map((x) => (
        <group key={x} position={[x, -1.25, 0.02]}>
          <mesh castShadow>
            <sphereGeometry args={[0.2, 24, 24]} />
            <meshStandardMaterial color={isKnee && x < 0 ? "#22b8ee" : joint} emissive={isKnee && x < 0 ? "#087eb8" : "#000000"} emissiveIntensity={isKnee && x < 0 ? 0.72 : 0} roughness={0.35} />
          </mesh>
          <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, 0.13]}>
            <torusGeometry args={[0.14, 0.026, 12, 36]} />
            <meshStandardMaterial color={bone} roughness={0.45} />
          </mesh>
        </group>
      ))}

      {[-0.72, 0.72].map((x) => (
        <mesh key={x} position={[x, 1.44, 0]} castShadow>
          <sphereGeometry args={[0.2, 24, 24]} />
          <meshStandardMaterial color={isShoulder && x < 0 ? "#22b8ee" : joint} emissive={isShoulder && x < 0 ? "#087eb8" : "#000000"} emissiveIntensity={isShoulder && x < 0 ? 0.72 : 0} roughness={0.35} />
        </mesh>
      ))}

      {(focus.hotspots ?? [{ position: focus.hotspotPosition, label: focus.hotspotLabel }]).map((hotspot) => (
        <AnatomyHotspot key={hotspot.label} {...hotspot} reducedMotion={reducedMotion} previewed={previewed} />
      ))}
    </group>
  );
}
