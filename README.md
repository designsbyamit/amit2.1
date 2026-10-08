# Amit Kumar Tiwari — Portfolio

Personal portfolio: design leadership, craft (case studies), community, writing and resources.
Live at **https://neo.designsbyamit.com** (GitHub Pages, custom domain via `public/CNAME`).

## Stack
React 19 · TypeScript · Vite · Tailwind CSS 3 · Framer Motion · Lenis (smooth scroll) · React Router (`HashRouter`)

## Run
```bash
npm ci
npm run dev        # local dev server
npm run build      # typecheck + production build to dist/
npm run preview    # serve the production build locally
```
Pushing to `main` builds and deploys through `.github/workflows/deploy.yml`.

## Where things live
| What | Where |
|---|---|
| Case studies (copy, stats, images) | `src/data/work.ts` — images in `public/images/case-studies/` |
| Leadership stories & articles | `src/data/leadership.ts` — a story only appears once its `narrative` is written |
| Community initiatives, reflections, journey, impact numbers | `src/data/*.ts` |
| Pages / sections / UI | `src/pages`, `src/components/{sections,ui,layout}` |
| Design specs and review notes | `docs/` |
| Full-resolution original photos (not bundled) | `design-originals/` |

## Conventions
- **Images:** export web-ready (WebP/AVIF, ≤ ~2400px wide) into `src/assets` or `public`; keep originals in `design-originals/`.
- **Text contrast:** secondary text should stay at or above `opacity-50` (Tailwind) / 0.5 alpha; the quiet editorial look is intentional, legibility is not optional.
- **Unfinished content stays out of public view:** drafts live in data files but are not rendered. `PrototypeSlot` (SAP Search story) renders nothing until you pass a `src` embed URL.
- **Case studies:** follow `docs/craft/case-study-writing-standard.md`.
