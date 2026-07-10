"use client";

import { Maximize2, Rotate3D, RotateCcw, ZoomIn, ZoomOut } from "lucide-react";

type Props = {
  onRotate: () => void;
  onZoomIn: () => void;
  onZoomOut: () => void;
  onShowFull: () => void;
  onReset: () => void;
};

const controls = [
  { key: "rotate", label: "Повернуть модель", icon: Rotate3D },
  { key: "zoom-in", label: "Приблизить", icon: ZoomIn },
  { key: "zoom-out", label: "Отдалить", icon: ZoomOut },
  { key: "full", label: "Показать всё тело", icon: Maximize2 },
  { key: "reset", label: "Вернуть исходный вид", icon: RotateCcw },
] as const;

export function ModelControls({ onRotate, onZoomIn, onZoomOut, onShowFull, onReset }: Props) {
  const handlers = {
    rotate: onRotate,
    "zoom-in": onZoomIn,
    "zoom-out": onZoomOut,
    full: onShowFull,
    reset: onReset,
  };

  return (
    <div className="model-controls" aria-label="Управление анатомической моделью">
      {controls.map(({ key, label, icon: Icon }) => (
        <button type="button" key={key} onClick={handlers[key]}>
          <Icon size={18} aria-hidden="true" />
          <span>{label}</span>
        </button>
      ))}
    </div>
  );
}
