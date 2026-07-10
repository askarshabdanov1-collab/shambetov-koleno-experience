"use client";

import dynamic from "next/dynamic";
import { useMemo, useState } from "react";
import { useElementInView } from "@/hooks/useElementInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import type { AnatomyFocus, TreatmentItem } from "@/types/treatment";
import { ModelControls } from "./ModelControls";
import { WebGLErrorBoundary } from "./WebGLErrorBoundary";

const AnatomyCanvas = dynamic(() => import("./AnatomyCanvas"), {
  ssr: false,
  loading: () => <ViewerLoading />,
});

function ViewerLoading() {
  return (
    <div className="anatomy-loading" role="status">
      <span className="anatomy-loader" aria-hidden="true" />
      <strong>Загружаем анатомическую модель</strong>
      <small>Подготавливаем интерактивную схему</small>
    </div>
  );
}

function ViewerUnavailable({ label }: { label: string }) {
  return (
    <div className="anatomy-unavailable" role="img" aria-label={`Анатомическая область: ${label}`}>
      <div className="anatomy-silhouette" aria-hidden="true"><span /><i /><b /></div>
      <strong>{label}</strong>
      <p>Интерактивная схема недоступна на этом устройстве. Описание лечения остается доступным рядом.</p>
    </div>
  );
}

type Props = { item: TreatmentItem; previewed: boolean };

export function AnatomyViewer({ item, previewed }: Props) {
  const { ref, inView } = useElementInView();
  const reducedMotion = useReducedMotion();
  const webGLSupported = useWebGLSupport();
  const [hintVisible, setHintVisible] = useState(true);
  const [rotationStep, setRotationStep] = useState(0);
  const [zoom, setZoom] = useState(1);
  const [showFullBody, setShowFullBody] = useState(false);
  const [cameraVersion, setCameraVersion] = useState(0);

  const displayFocus = useMemo<AnatomyFocus>(() => {
    const source = showFullBody
      ? { ...item.anatomyFocus, cameraPosition: [0, 0.05, 8.35] as [number, number, number], cameraTarget: [0, 0.05, 0] as [number, number, number], view: "full" as const }
      : item.anatomyFocus;
    const [tx, ty, tz] = source.cameraTarget;
    const [px, py, pz] = source.cameraPosition;
    const factor = showFullBody ? 1 : zoom;
    const rotation = source.modelRotation ?? [0, 0, 0];
    return {
      ...source,
      cameraPosition: [tx + (px - tx) * factor, ty + (py - ty) * factor, tz + (pz - tz) * factor],
      modelRotation: [rotation[0], rotation[1] + rotationStep * (Math.PI / 6), rotation[2]],
    };
  }, [item.anatomyFocus, rotationStep, showFullBody, zoom]);

  const updateView = (callback: () => void) => {
    callback();
    setHintVisible(false);
    setCameraVersion((value) => value + 1);
  };

  const fallback = <ViewerUnavailable label={item.anatomyFocus.hotspotLabel} />;

  return (
    <div className="anatomy-viewer" ref={ref}>
      <div className="anatomy-viewer-topline">
        <div>
          <span className="anatomy-live-dot" aria-hidden="true" />
          Интерактивная схема
        </div>
        <span>Выберите лечение, чтобы увидеть область</span>
      </div>

      <div className="anatomy-canvas-shell">
        {webGLSupported === false ? fallback : !inView || webGLSupported === null ? (
          <ViewerLoading />
        ) : (
          <WebGLErrorBoundary fallback={fallback}>
            <AnatomyCanvas
              item={item}
              focus={displayFocus}
              previewed={previewed}
              reducedMotion={reducedMotion}
              resetVersion={cameraVersion}
              onInteraction={() => setHintVisible(false)}
            />
          </WebGLErrorBoundary>
        )}
        {hintVisible && webGLSupported !== false && (
          <div className="anatomy-drag-hint">Перетащите, чтобы повернуть</div>
        )}
      </div>

      <ModelControls
        onRotate={() => updateView(() => setRotationStep((value) => value + 1))}
        onZoomIn={() => updateView(() => { setShowFullBody(false); setZoom((value) => Math.max(0.72, value - 0.14)); })}
        onZoomOut={() => updateView(() => { setShowFullBody(false); setZoom((value) => Math.min(1.45, value + 0.14)); })}
        onShowFull={() => updateView(() => setShowFullBody(true))}
        onReset={() => updateView(() => { setRotationStep(0); setZoom(1); setShowFullBody(false); })}
      />

      <div className="anatomy-viewer-caption" aria-live="polite">
        <strong>Сейчас показана область: {showFullBody ? "всё тело" : item.anatomyFocus.hotspotLabel}</strong>
        <span>Интерактивная схема показывает примерное расположение анатомической области и не заменяет консультацию врача.</span>
      </div>
    </div>
  );
}
