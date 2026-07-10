export const anatomyMeshAliases: Record<string, string[]> = {
  importedBody: ["Group6403", "Group6403_1"],
  rightKnee: ["right_knee", "knee_r", "patella_r", "femur_r", "tibia_r"],
  meniscus: ["medial_meniscus_r", "lateral_meniscus_r", "meniscus_r"],
  acl: ["acl_r", "anterior_cruciate_ligament_r"],
  patella: ["patella_r", "right_patella"],
  cartilage: ["knee_cartilage_r", "articular_cartilage_r"],
  rightShoulder: ["shoulder_r", "humerus_r", "scapula_r", "clavicle_r"],
};

export function matchesAnatomyAlias(meshName: string, regions: string[]) {
  const normalized = meshName.toLowerCase();
  return regions.some((region) =>
    (anatomyMeshAliases[region] ?? []).some((alias) => normalized.includes(alias.toLowerCase()))
  );
}
