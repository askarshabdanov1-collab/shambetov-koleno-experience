"use client";

import { useEffect, useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { Box3, Color, Mesh, MeshStandardMaterial, Vector3, type Material, type Object3D } from "three";
import { matchesAnatomyAlias } from "@/data/anatomyMeshAliases";
import type { TreatmentItem } from "@/types/treatment";
import { AnatomyHotspot } from "./AnatomyHotspot";

type Props = {
  modelUrl: string;
  item: TreatmentItem;
  previewed: boolean;
  reducedMotion: boolean;
};

function cloneSceneWithMaterials(source: Object3D) {
  const clone = source.clone(true);
  clone.traverse((node) => {
    if (!(node instanceof Mesh)) return;
    if (!node.geometry.attributes.normal) node.geometry.computeVertexNormals();
    node.material = Array.isArray(node.material)
      ? node.material.map((material) => material.clone())
      : node.material.clone();
    const materials = Array.isArray(node.material) ? node.material : [node.material];
    materials.forEach((material) => {
      if (!(material instanceof MeshStandardMaterial)) return;
      material.color.set("#a9544d");
      material.roughness = 0.68;
      material.metalness = 0.02;
    });
  });
  return clone;
}

export function AnatomyModel({ modelUrl, item, previewed, reducedMotion }: Props) {
  const gltf = useGLTF(modelUrl);
  const scene = useMemo(() => cloneSceneWithMaterials(gltf.scene), [gltf.scene]);
  const transform = useMemo(() => {
    const bounds = new Box3().setFromObject(scene);
    const size = bounds.getSize(new Vector3());
    const center = bounds.getCenter(new Vector3());
    const scale = 5.35 / Math.max(size.y, 0.001);
    return {
      scale,
      position: [-center.x * scale, -center.y * scale, -center.z * scale] as [number, number, number],
    };
  }, [scene]);

  useEffect(() => {
    const found: string[] = [];
    scene.traverse((node) => {
      if (node instanceof Mesh && matchesAnatomyAlias(node.name, item.anatomyFocus.highlightedMeshes)) {
        found.push(node.name);
      }
    });

    scene.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      const highlighted = matchesAnatomyAlias(node.name, item.anatomyFocus.highlightedMeshes);
      const materials = (Array.isArray(node.material) ? node.material : [node.material]) as Material[];
      materials.forEach((material) => {
        if (!(material instanceof MeshStandardMaterial)) return;
        material.emissive = highlighted ? new Color("#078fca") : new Color("#000000");
        material.emissiveIntensity = highlighted ? 0.72 : 0;
        material.opacity = found.length > 0 && !highlighted ? 0.72 : 1;
        material.transparent = material.opacity < 1;
        material.needsUpdate = true;
      });
    });

    if (process.env.NODE_ENV === "development" && item.anatomyFocus.highlightedMeshes.length && !found.length) {
      console.warn(`Для ${item.title} не найден отдельный mesh; используется hotspot fallback.`);
    }
  }, [item, scene]);

  useEffect(() => () => {
    scene.traverse((node) => {
      if (!(node instanceof Mesh)) return;
      const materials = Array.isArray(node.material) ? node.material : [node.material];
      materials.forEach((material) => material.dispose());
    });
  }, [scene]);

  return (
    <group>
      <group scale={transform.scale} position={transform.position}>
        <primitive object={scene} />
      </group>
      {(item.anatomyFocus.hotspots ?? [{
        position: item.anatomyFocus.hotspotPosition,
        label: item.anatomyFocus.hotspotLabel,
      }]).map((hotspot) => (
        <AnatomyHotspot
          key={`${item.id}-${hotspot.label}`}
          {...hotspot}
          reducedMotion={reducedMotion}
          previewed={previewed}
        />
      ))}
    </group>
  );
}
