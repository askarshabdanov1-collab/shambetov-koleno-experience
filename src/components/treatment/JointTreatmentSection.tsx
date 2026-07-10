"use client";

import { useMemo, useState } from "react";
import { treatmentTabs } from "@/data/treatments";
import type { TreatmentCategory, TreatmentId } from "@/types/treatment";
import { AnatomyViewer } from "./anatomy/AnatomyViewer";
import { TreatmentCards } from "./TreatmentCards";
import { TreatmentDetails } from "./TreatmentDetails";
import { TreatmentTabs } from "./TreatmentTabs";

function RevealTitle({ children }: { children: React.ReactNode }) {
  return <span className="reveal-line"><span>{children}</span></span>;
}

export function JointTreatmentSection() {
  const [activeCategory, setActiveCategory] = useState<TreatmentCategory>("knee");
  const [activeTreatmentId, setActiveTreatmentId] = useState<TreatmentId>("meniscus");
  const [previewId, setPreviewId] = useState<TreatmentId | null>(null);

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
    setPreviewId(null);
  };

  return (
    <section className="treatments-section" id="services" data-rise>
      <div className="section-header treatment-heading">
        <span>Проводимые операции</span>
        <h2><RevealTitle>Лечение суставов</RevealTitle></h2>
      </div>
      <TreatmentTabs tabs={treatmentTabs} activeCategory={activeCategory} onChange={changeCategory} />

      <div
        className="treatment-experience-grid"
        id="treatment-panel"
        role="tabpanel"
        aria-labelledby={`treatment-tab-${activeCategory}`}
      >
        <div className="treatment-content-column">
          <TreatmentCards
            items={activeTab.items}
            activeId={activeTreatment.id}
            onSelect={setActiveTreatmentId}
            onPreview={setPreviewId}
          />
          <TreatmentDetails item={activeTreatment} categoryLabel={activeTab.label} />
        </div>
        <AnatomyViewer key={activeTreatment.id} item={activeTreatment} previewed={previewId === activeTreatment.id} />
      </div>
    </section>
  );
}
