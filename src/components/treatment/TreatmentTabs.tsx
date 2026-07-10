import type { TreatmentCategory, TreatmentTab } from "@/types/treatment";

type Props = {
  tabs: TreatmentTab[];
  activeCategory: TreatmentCategory;
  onChange: (category: TreatmentCategory) => void;
};

export function TreatmentTabs({ tabs, activeCategory, onChange }: Props) {
  return (
    <div className="treatment-tabs" role="tablist" aria-label="Область лечения">
      {tabs.map((tab) => (
        <button
          type="button"
          role="tab"
          aria-selected={activeCategory === tab.id}
          className={activeCategory === tab.id ? "active" : ""}
          key={tab.id}
          onClick={() => onChange(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
