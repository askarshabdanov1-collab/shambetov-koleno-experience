"use client";

import { useRef } from "react";
import type { TreatmentCategory, TreatmentTab } from "@/types/treatment";

type Props = {
  tabs: TreatmentTab[];
  activeCategory: TreatmentCategory;
  onChange: (category: TreatmentCategory) => void;
};

export function TreatmentTabs({ tabs, activeCategory, onChange }: Props) {
  const buttons = useRef<Array<HTMLButtonElement | null>>([]);

  const moveFocus = (currentIndex: number, direction: number) => {
    const nextIndex = (currentIndex + direction + tabs.length) % tabs.length;
    const next = tabs[nextIndex];
    onChange(next.id);
    buttons.current[nextIndex]?.focus();
  };

  return (
    <div className="treatment-tabs" role="tablist" aria-label="Область лечения">
      {tabs.map((tab, index) => (
        <button
          ref={(element) => { buttons.current[index] = element; }}
          type="button"
          role="tab"
          id={`treatment-tab-${tab.id}`}
          aria-controls="treatment-panel"
          aria-selected={activeCategory === tab.id}
          tabIndex={activeCategory === tab.id ? 0 : -1}
          className={activeCategory === tab.id ? "active" : ""}
          key={tab.id}
          onClick={() => onChange(tab.id)}
          onKeyDown={(event) => {
            if (event.key === "ArrowRight" || event.key === "ArrowDown") {
              event.preventDefault();
              moveFocus(index, 1);
            }
            if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
              event.preventDefault();
              moveFocus(index, -1);
            }
            if (event.key === "Home") {
              event.preventDefault();
              onChange(tabs[0].id);
              buttons.current[0]?.focus();
            }
            if (event.key === "End") {
              event.preventDefault();
              onChange(tabs[tabs.length - 1].id);
              buttons.current[tabs.length - 1]?.focus();
            }
          }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
