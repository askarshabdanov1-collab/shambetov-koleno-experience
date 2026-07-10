"use client";

import { ChevronRight } from "lucide-react";
import type { TreatmentId, TreatmentItem } from "@/types/treatment";

type Props = {
  items: TreatmentItem[];
  activeId: TreatmentId;
  onSelect: (id: TreatmentId) => void;
  onPreview: (id: TreatmentId | null) => void;
};

export function TreatmentCards({ items, activeId, onSelect, onPreview }: Props) {
  return (
    <div className="treatment-grid" role="group" aria-label="Процедуры и направления лечения">
      {items.map((item) => (
        <button
          type="button"
          className={activeId === item.id ? "white-card treatment-card selected" : "white-card treatment-card"}
          aria-pressed={activeId === item.id}
          key={item.id}
          onClick={() => onSelect(item.id)}
          onMouseEnter={() => onPreview(item.id)}
          onMouseLeave={() => onPreview(null)}
          onFocus={() => onPreview(item.id)}
          onBlur={() => onPreview(null)}
        >
          <h3>{item.title}</h3>
          <ChevronRight size={22} aria-hidden="true" />
        </button>
      ))}
    </div>
  );
}
