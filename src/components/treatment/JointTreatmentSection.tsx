"use client";

import { useMemo, useState } from "react";
import { treatmentTabs } from "@/data/treatments";
import type { TreatmentCategory, TreatmentId } from "@/types/treatment";
import { TreatmentCards } from "./TreatmentCards";
import { TreatmentInfoSheet } from "./TreatmentInfoSheet";
import { TreatmentTabs } from "./TreatmentTabs";

function RevealTitle({ children }: { children: React.ReactNode }) {
  return <span className="reveal-line"><span>{children}</span></span>;
}

export function JointTreatmentSection() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("knee");
  const [activeTreatmentId, setActiveTreatmentId] = useState<TreatmentId>("meniscus");
  const [isInfoOpen, setIsInfoOpen] = useState(false);

  const activeTab = useMemo(
    () => treatmentTabs.find((tab) => tab.id === activeCategory) ?? treatmentTabs[0],
    [activeCategory]
  );
  const activeTreatment = activeTab.items.find((item) => item.id === activeTreatmentId) ?? activeTab.items[0];

  const changeCategory = (category: TreatmentCategory) => {
    const nextTab = treatmentTabs.find((tab) => tab.id === category);
    if (!nextTab || category === activeCategory) return;
    setActiveCategory(category);
    setActiveTreatmentId(nextTab.items[0].id);
    setIsInfoOpen(false);
  };

  const openTreatment = (id: TreatmentId) => {
    setActiveTreatmentId(id);
    setIsInfoOpen(true);
  };

  return (
    <section className="treatments-section" id="services" data-rise>
      <div className="section-header treatment-heading">
        <span>Проводимые операции</span>
        <h2><RevealTitle>Лечение суставов</RevealTitle></h2>
      </div>
      <TreatmentTabs tabs={treatmentTabs} activeCategory={activeCategory} onChange={changeCategory} />

      <div
        className="treatment-experience"
        id="treatment-panel"
        role="tabpanel"
        aria-labelledby={`treatment-tab-${activeCategory}`}
      >
        <TreatmentCards
          items={activeTab.items}
          activeId={activeTreatment.id}
          openId={isInfoOpen ? activeTreatment.id : null}
          onSelect={openTreatment}
        />
      </div>

      <TreatmentInfoSheet
        item={isInfoOpen ? activeTreatment : null}
        categoryLabel={activeTab.label}
        onClose={() => setIsInfoOpen(false)}
      />
    </section>
  );
}
