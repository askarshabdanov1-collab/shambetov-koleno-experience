"use client";

import { ChevronRight, Info } from "lucide-react";
import type { TreatmentId, TreatmentItem } from "@/types/treatment";

type Props = {
  items: TreatmentItem[];
  activeId: TreatmentId;
  openId: TreatmentId | null;
  onSelect: (id: TreatmentId) => void;
};

export function TreatmentCards({ items, activeId, openId, onSelect }: Props) {
  return (
    <div className="treatment-grid" role="group" aria-label="Процедуры и направления лечения">
      {items.map((item) => (
        <button
          type="button"
          className={activeId === item.id ? "white-card treatment-card selected" : "white-card treatment-card"}
          aria-haspopup="dialog"
          aria-expanded={openId === item.id}
          key={item.id}
          onClick={() => onSelect(item.id)}
        >
          <span className="treatment-card-copy">
            <Info size={18} aria-hidden="true" />
            <h3>{item.title}</h3>
          </span>
          <span className="treatment-card-action">
            Подробнее
            <ChevronRight size={20} aria-hidden="true" />
          </span>
        </button>
      ))}
    </div>
  );
}
