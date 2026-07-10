"use client";

import dynamic from "next/dynamic";
import { RotateCcw } from "lucide-react";
import { useState } from "react";
import { useElementInView } from "@/hooks/useElementInView";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { useWebGLSupport } from "@/hooks/useWebGLSupport";
import type { TreatmentItem } from "@/types/treatment";
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
  const [resetVersion, setResetVersion] = useState(0);
  const [hintVisible, setHintVisible] = useState(true);

  const fallback = <ViewerUnavailable label={item.anatomyFocus.hotspotLabel} />;

  return (
    <div className="anatomy-viewer" ref={ref}>
      <div className="anatomy-viewer-topline">
        <div>
          <span className="anatomy-live-dot" aria-hidden="true" />
          Интерактивная схема
        </div>
        <button
          type="button"
          className="anatomy-reset"
          onClick={() => setResetVersion((value) => value + 1)}
          aria-label="Сбросить положение анатомической модели"
          title="Показать выбранную область заново"
        >
          <RotateCcw size={17} aria-hidden="true" />
        </button>
      </div>

      <div className="anatomy-canvas-shell">
        {webGLSupported === false ? fallback : !inView || webGLSupported === null ? (
          <ViewerLoading />
        ) : (
          <WebGLErrorBoundary fallback={fallback}>
            <AnatomyCanvas
              item={item}
              previewed={previewed}
              reducedMotion={reducedMotion}
              resetVersion={resetVersion}
              onInteraction={() => setHintVisible(false)}
            />
          </WebGLErrorBoundary>
        )}
        {hintVisible && webGLSupported !== false && (
          <div className="anatomy-drag-hint">Перетащите, чтобы повернуть</div>
        )}
      </div>

      <div className="anatomy-viewer-caption" aria-live="polite">
        <strong>{item.anatomyFocus.hotspotLabel}</strong>
        <span>Показана анатомическая проекция на поверхности. Схема не является хирургической навигацией и не заменяет консультацию врача.</span>
      </div>
    </div>
  );
}
