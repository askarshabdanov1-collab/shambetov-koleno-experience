"use client";

import { useEffect, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { AnatomyFocus } from "@/types/treatment";

type Props = {
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  focus: AnatomyFocus;
  resetVersion: number;
  reducedMotion: boolean;
};

export function CameraController({ controlsRef, focus, resetVersion, reducedMotion }: Props) {
  const { camera } = useThree();
  const startPosition = useRef(new Vector3());
  const startTarget = useRef(new Vector3());
  const endPosition = useRef(new Vector3());
  const endTarget = useRef(new Vector3());
  const startedAt = useRef(0);
  const animating = useRef(true);

  useEffect(() => {
    startPosition.current.copy(camera.position);
    startTarget.current.copy(controlsRef.current?.target ?? new Vector3());
    endPosition.current.set(...focus.cameraPosition);
    endTarget.current.set(...focus.cameraTarget);
    startedAt.current = performance.now();
    animating.current = true;
    if (controlsRef.current) controlsRef.current.enabled = false;
  }, [camera, controlsRef, focus, resetVersion]);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls || !animating.current) return;

    const duration = reducedMotion ? 180 : 1050;
    const progress = Math.min(1, (performance.now() - startedAt.current) / duration);
    const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
    camera.position.lerpVectors(startPosition.current, endPosition.current, eased);
    controls.target.lerpVectors(startTarget.current, endTarget.current, eased);
    controls.update();

    if (progress >= 1) {
      animating.current = false;
      controls.enabled = true;
    }
  });

  return null;
}
