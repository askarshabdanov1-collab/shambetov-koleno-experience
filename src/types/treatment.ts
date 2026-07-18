export type TreatmentCategory = "knee" | "shoulder" | "non-surgical" | "rehabilitation";

export type TreatmentId =
  | "meniscus"
  | "acl"
  | "patella"
  | "cartilage"
  | "arthrosis"
  | "prp"
  | "shoulder-joint"
  | "shoulder-dislocation"
  | "shoulder-pain"
  | "shoulder-arthroscopy"
  | "non-surgical-prp"
  | "rehabilitation-plan"
  | "mri-review"
  | "pain-control"
  | "post-arthroscopy"
  | "post-acl"
  | "sports-injury"
  | "home-program";

export type TreatmentItem = {
  id: TreatmentId;
  category: TreatmentCategory;
  title: string;
  description: string;
  symptoms: string[];
  diagnostics: string;
  text: string;
  urgentNote?: string;
};

export type TreatmentTab = {
  id: TreatmentCategory;
  label: string;
  items: TreatmentItem[];
};
