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

export type AnatomyHotspotPoint = {
  position: [number, number, number];
  label: string;
  detail?: string;
  side?: "left" | "right";
  variant?: "primary" | "secondary";
};

export type AnatomyFocus = {
  cameraPosition: [number, number, number];
  cameraTarget: [number, number, number];
  modelRotation?: [number, number, number];
  highlightedMeshes: string[];
  hotspotPosition: [number, number, number];
  hotspotLabel: string;
  hotspots?: AnatomyHotspotPoint[];
  view: "full" | "knee" | "shoulder";
};

export type TreatmentItem = {
  id: TreatmentId;
  category: TreatmentCategory;
  title: string;
  text: string;
  anatomyFocus: AnatomyFocus;
};

export type TreatmentTab = {
  id: TreatmentCategory;
  label: string;
  items: TreatmentItem[];
};
