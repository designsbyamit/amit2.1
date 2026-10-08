# Staging changes (branch `staging`)

Changes made on top of `main` after a page-by-page review of the built site (desktop 1440px and mobile 390px).
Nothing here is deployed until `staging` is merged into `main`.

## A. Performance and foundations
- Hero photo 17.4 MB JPEG → 188 KB WebP (+ 62 KB mobile variant via `srcset`); original kept in `design-originals/`.
- Routes are code-split (`React.lazy`); main bundle 676 KB → 439 KB.
- Inter loads via `<link>` instead of a render-blocking CSS `@import`.
- Open Graph / Twitter / canonical tags and a 1200×630 share image (`public/og-image.jpg`).
- Removed dead code: `AINativePatternsPage`, `MeshBackground`, `RotatingTitle`, `Highlight`, unused three.js packages, duplicate `/craft/sap-search` route.
- Real README; package renamed `amit-portfolio`.

## B. Legibility and accessibility
- Text opacity lifted site-wide so secondary text meets WCAG AA (4.5:1) on the dark background.
  Measured on the rendered pages (about 1,300 text elements): below 4.5:1 went from 807 to about 81, below 3:1 from 478 to about 68.
  Roughly 49 of what remains are labels that are invisible until hover/active by design; the rest are inactive states inside the
  interactive SAP Search demos. Counts vary a few points between runs because of animation timing.
- Hero identity strip, proof points and links raised in size and brightness, with a clear hierarchy.
- Descriptive alt text on all case-study images; the Contact page now has an `h1`.

## C. Mobile layout
- Resource sub-pages no longer collide with the fixed nav; SAP Search "Scroll to begin" hidden on phones.
- Case-study and Leadership headers use full-width headlines on phones (image becomes a soft backdrop).

## D. Unfinished content hidden (nothing invented)
- Empty "Interactive Prototype" boxes (SAP Search) render nothing until a `src` is provided.
- "Coming soon" blocks removed from the SAP Search and Agentic Invoice case-study data; "Image coming soon" removed from Community.
- Three unwritten leadership stories are not rendered (drafts remain in `src/data/leadership.ts`).
- Five hotlinked Unsplash stock photos removed from Resources.

## E. Craft polish
- Click-to-enlarge lightbox on case-study images (keyboard accessible, Esc to close).
- Image grids no longer leave empty tiles; the impact grid's last tile fills its row.
- Home now features three case studies; image-less case studies get a typographic cover built from their own stats.
- Leadership is in the main navigation (it takes the "Home" slot — the logo already links home).

## Needs Amit (not done on purpose)
1. Write the three unfinished leadership stories (or decide the section stays at one).
2. Choose one career start date: About says 2011, Leadership says 2009, headline says 16+ years.
3. Provide cover images for SAP Search and Agentic Invoice, and prototype embed URLs for SAP Search.
4. Decide on remaining nav structure (6 items now) and whether to move off hash URLs for per-page link previews.

## Timeline reconciled with designsbyamit.com
- About and Journey now use the same employers, titles and dates as www.designsbyamit.com (Infosys 2011-14, Photon 2014-15, HPE 2015-18, Accenture Song 2018-24, SAP Labs 2024-now).
- Journey previously listed SAP from 2022 and an "Infosys UX Academy 2009-11"; replaced with a "College" foundations phase (leadership from college). Amit to confirm wording.
- SAP Design Hub India: Amit is Lead since Feb 2025 (not founder); Impulse India: Lead Curator. Founder claims, the 2022 start and the first-person founding story were removed. The story stays hidden until he writes it, and the Leadership Stories section is hidden until at least one story is written.

## Contrast and design system
- Text colour moved from opacity to tokens (ink, ink-2, ink-3). 420+ class and inline usages migrated; animated text no longer dims to 0.5.
- Measured on 1,734 visible text elements across all routes at 1440px: 96.5% at 7:1 or better, median 7.9:1 (before: 726 of 1,611 sat in the 4.5-6:1 band, barely AA).
- Remaining below AA: SAP Search demo internals and decorative glyphs.
- Text floor 12px, body weight 400, 44px tap targets, global focus ring.
- New: src/styles/tokens.css, src/components/ds/*, /design-system page, docs/design-system.md.

## Information architecture round
- New Mentoring & Coaching page (/mentoring): two ADPList session types, how I mentor, topics, three verbatim ADPList mentee reviews, booking links.
- Testimonials: colleague quotes (from designsbyamit.com) on Leadership; mixed colleague + mentee quotes on About.
- About: background (computer science, development) and "Beyond the work" section from the old site.
- Contact by intent: Work together / Get mentored / Invite me to speak, plus ADPList and Topmate links.
- Clean URLs: BrowserRouter, old /#/ links redirect, vercel.json rewrite, 404.html fallback for GitHub Pages, sitemap.xml and robots.txt.
- Consistency: one content width shared by nav, footer, headers and sections; section padding standardised (section-y) on 35 sections.
- Open: ADPList profile says 14+ years, the site says 16+. Resources restructure pending Amit approval of the proposed IA.
