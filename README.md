# Shambetov Koleno Experience

Landing page for traumatologist-orthopedist Zhantai Shambetov, built with Next.js.

## Getting Started

First, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

The page auto-updates while editing files in `src`.

## Anatomy model

The treatment section loads `public/models/human-anatomy.glb` by default and falls back to lightweight procedural geometry if WebGL or the model cannot be loaded. The visualization does not claim to be a diagnostic reconstruction.

To use a licensed GLB model:

1. Replace `public/models/human-anatomy.glb`.
2. Set `NEXT_PUBLIC_ANATOMY_MODEL_URL=/models/human-anatomy.glb`.
3. Add the real mesh names to `src/data/anatomyMeshAliases.ts` after inspecting the model scene graph.

Do not add third-party anatomy assets without a license that permits web distribution. When an expected mesh is missing, the viewer uses an explicitly approximate hotspot instead.

The current GLB was converted from the user-provided `male-body-muscular-system-anatomy-study.zip`. The archive contains one OBJ mesh (`Group6403_1`) without textures, materials, animation, or a license file. Keep proof of the asset license outside the repository before commercial distribution.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Verification

```bash
npx tsc --noEmit
npm run lint
npm run build
```
