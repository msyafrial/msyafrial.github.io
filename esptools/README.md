# The Last Outpost Workshop — Landing Site

Static, mobile-first landing page for https://thelastoutpostworkshop.github.io/ built with Vue 3 + TypeScript + Tailwind CSS.

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (GitHub Pages)

This repository is a GitHub Pages **user site** (deployed at the domain root), so Vite is configured with the default base path (`/`).

If you use the included GitHub Actions workflow:

1. In GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**
2. Push to `main` (or `master`) and the workflow will build and deploy `dist/`.

## Notes / decisions

- Icons: `lucide-vue-next` (small, tree-shakeable, consistent style).
- HUD styling: Tailwind utility-first with a subtle grid/scanline backdrop and reusable component classes in `src/style.css`.
- Motion: a tiny `v-reveal` directive using `IntersectionObserver`; animations are disabled under `prefers-reduced-motion`.

