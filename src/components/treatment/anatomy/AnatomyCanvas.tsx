"use client";

import { Suspense, useEffect, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Html, OrbitControls, useProgress } from "@react-three/drei";
import { TOUCH, type Group } from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import type { TreatmentItem } from "@/types/treatment";
import { AnatomyModel } from "./AnatomyModel";
import { CameraController } from "./CameraController";

type Props = {
  item: TreatmentItem;
  previewed: boolean;
  reducedMotion: boolean;
  resetVersion: number;
  onInteraction: () => void;
};

function LoadingModel() {
  const { progress } = useProgress();
  return (
    <Html center className="anatomy-model-loading">
      <span />
      <strong>Загружаем анатомическую модель</strong>
      <small>{Math.round(progress)}%</small>
    </Html>
  );
}

function ModelRotation({ item, children }: { item: TreatmentItem; children: React.ReactNode }) {
  const group = useRef<Group>(null);
  const target = item.anatomyFocus.modelRotation ?? [0, -0.16, 0];

  useFrame((_, delta) => {
    if (!group.current) return;
    const amount = 1 - Math.exp(-delta * 5);
    group.current.rotation.x += (target[0] - group.current.rotation.x) * amount;
    group.current.rotation.y += (target[1] - group.current.rotation.y) * amount;
    group.current.rotation.z += (target[2] - group.current.rotation.z) * amount;
  });

  return <group ref={group}>{children}</group>;
}

function Scene({ item, previewed, reducedMotion, resetVersion, onInteraction }: Props) {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [mobile, setMobile] = useState(false);
  const modelUrl = process.env.NEXT_PUBLIC_ANATOMY_MODEL_URL?.trim() || "/models/human-anatomy.glb";

  useEffect(() => {
    const query = window.matchMedia("(max-width: 760px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return (
    <>
      <ambientLight intensity={1.4} />
      <directionalLight position={[4, 6, 5]} intensity={2.1} color="#fff6ee" castShadow={!mobile} />
      <directionalLight position={[-4, 2, 2]} intensity={1.3} color="#8fdcff" />
      <pointLight position={[0, 1, -4]} intensity={1.4} color="#46bde9" />
      <Suspense fallback={<LoadingModel />}>
        <ModelRotation item={item}>
          <AnatomyModel modelUrl={modelUrl} item={item} previewed={previewed} reducedMotion={reducedMotion} />
        </ModelRotation>
        {!mobile && <ContactShadows position={[0, -2.46, 0]} opacity={0.18} scale={5} blur={2.4} far={4} />}
      </Suspense>
      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableDamping
        dampingFactor={0.08}
        enableRotate={!mobile}
        minDistance={2.6}
        maxDistance={8.2}
        minPolarAngle={Math.PI * 0.28}
        maxPolarAngle={Math.PI * 0.68}
        touches={{ ONE: TOUCH.PAN, TWO: TOUCH.DOLLY_ROTATE }}
        onStart={onInteraction}
      />
      <CameraController controlsRef={controlsRef} focus={item.anatomyFocus} resetVersion={resetVersion} reducedMotion={reducedMotion} />
    </>
  );
}

export default function AnatomyCanvas(props: Props) {
  return (
    <Canvas
      className="anatomy-canvas"
      camera={{ position: [0, 0.05, 8.35], fov: 38, near: 0.1, far: 40 }}
      dpr={[1, 1.5]}
      gl={{ alpha: true, antialias: true, powerPreference: "high-performance" }}
      shadows="basic"
      aria-label={`Интерактивная анатомическая схема. Сейчас показана область: ${props.item.anatomyFocus.hotspotLabel}`}
    >
      <Scene {...props} />
    </Canvas>
  );
}
