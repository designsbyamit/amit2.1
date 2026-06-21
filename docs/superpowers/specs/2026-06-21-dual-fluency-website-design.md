# Dual Fluency™ — Website Design Spec

**Date:** 2026-06-21  
**Status:** Approved

---

## Overview

A standalone public knowledge hub for the Dual Fluency™ framework — a methodology helping designers bridge design language and business language to create measurable impact. Built as a separate site from amit2.0 but sharing the same visual language. No auth, no backend, fully static.

---

## Stack

- **Framework:** Vite + React + TypeScript
- **Styling:** Tailwind CSS (same config pattern as amit2.0)
- **Animation:** Framer Motion
- **Routing:** React Router (HashRouter for static deployment)
- **Deployment:** Static — GitHub Pages or Vercel
- **Repo:** `Projects/dual-fluency/` (new standalone repo)

---

## Visual Language

Inherits amit2.0 foundation exactly:

| Token | Value |
|---|---|
| Background | `#0C0C0B` |
| Foreground | `#F5F2ED` |
| Font | Inter (Google Fonts) |
| Type scale | clamp-based fluid, same utilities as amit2.0 |
| Grain overlay | 3% opacity noise texture on sections |

**One addition — Dual Fluency accent:**

| Token | Value | Usage |
|---|---|---|
| `--color-purple` | `#7C3AED` | Framework labels, highlights, interactive focus states |
| `--color-purple-20` | `rgba(124,58,237,0.2)` | Subtle backgrounds on cards/callouts |

Purple appears sparingly — labels, highlights, hover states. Never as a background fill on large areas.

---

## Site Architecture

5 routes, all public, no auth.

```
/           → Home
/framework  → Framework
/worksheets → Worksheets
/kpi        → KPI Reference
/cases      → Case Studies
```

**Nav:** Minimal fixed top nav — wordmark "Dual Fluency™" left, 4 links right (Framework, Worksheets, KPI Reference, Case Studies). Same scroll-progress line as amit2.0. Mobile: hamburger.

**Footer:** Simple — tagline "Talk Business. Talk Design." + link back to amit.design (Amit's portfolio).

---

## Page Designs

### 1. Home (`/`)

**Goal:** Establish what Dual Fluency is and create the desire to explore.

**Sections:**

1. **Hero** — Full-viewport. Large display type: "Talk Business. Talk Design." Subhead: one-liner on the Translation Gap. Subtle scroll hint. No image, pure typography.

2. **The Problem** — Two-column visual: "Design Says / Business Hears" vs "Business Says / Design Hears" — the translation gap made visceral. Animated reveal on scroll.

3. **The Principle** — Pull quotes from the content: "Business metrics tell you what's happening; design metrics help you understand why." Large editorial type, one quote per viewport height.

4. **What's Inside** — 4 cards linking to the 4 content sections (Framework, Worksheets, KPI Reference, Case Studies). Each card has a one-line description.

5. **CTA** — "Start with the Framework →"

---

### 2. Framework (`/framework`)

**Goal:** Walk the reader through the complete intellectual model as a visual essay.

**Sections (scroll-driven):**

1. **Section intro** — "The Dual Fluency Framework" overline + summary paragraph.

2. **Translation Gap** — Two-column split: Business Language vocabulary pills (Revenue, CAC, LTV, ROI...) vs Design Language vocabulary pills (Friction, Cognitive Load, Trust Signals...). Animated in on scroll.

3. **Two Languages Model** — Visual diagram of the 5-step flow: Translation Gap → Two Languages → Decipher Problem → Metric Mapping → Solution. Built in SVG/CSS, not an image.

4. **Without vs With Translation** — Table component: Business Says / Design Hears (broken) vs Business Goals / Design Goals (with translation). Real content from the PDFs.

5. **9-Box Framework** — The centerpiece. Interactive 9-box grid rendered in CSS Grid. Each cell is labeled (Business Goal, Problem Statement, Value/Purpose, Business KPI, Design KPI, Possible Solutions, Success Metrics, Design Goal). Hover on each cell reveals a tooltip/popover with explanation. A worked example (Increase ARR by 25%) shown below the grid.

6. **Key Principles** — 3 editorial cards: "Building dual fluency isn't about selling out, it's about buying in." / "Stop defending design, start directing strategy." / "Fluency in both transforms you from someone who makes things pretty into someone who makes things profitable."

---

### 3. Worksheets (`/worksheets`)

**Goal:** Provide the 3 workshop tools as browser-interactive, printable forms.

**Layout:** Tab switcher at top (Worksheet 1 / 2 / 3). Each worksheet is a full-page interactive form.

**Worksheet 1 — Translate Design ↔ Business Problems**
- Two columns: Business Problem input area + Design Translation output area
- Instructions above
- "Clear" button
- Print-friendly CSS (`@media print`)

**Worksheet 2 — KPI Mapping Canvas**
- Table with rows: Awareness / Acquisition / Decision / Engagement / Advocacy
- Columns: Business KPIs / User KPIs / Design Metrics / Why It Matters
- Each cell is a textarea
- Instructions: "Identify relevant KPIs across different stages of the customer experience funnel."

**Worksheet 3 — Strategy, Roadmap & OKRs**
- Design Strategy Statement fill-in: "By [doing X] we will [achieve Y] leading to [outcome Z]"
- Roadmap table: As-Is State / Roadmap Design Intervention / Allies / To-Be State
- Potential business impact matrix (5 rows, 2 columns)

**Print button** on each worksheet triggers `window.print()`. Print CSS hides nav/tabs/buttons and shows clean form.

No data persistence — browser only. Future: could add localStorage save.

---

### 4. KPI Reference (`/kpi`)

**Goal:** Searchable reference table for all KPIs from the workshop material.

**Layout:**

- Tab switcher: **Business KPIs** | **Design KPIs** | **AI Design KPIs**
- Search input filtering table rows live (client-side, no debounce needed)
- Table columns vary by tab:
  - Business KPIs: KPI Name / What It Measures / Why It Matters / Where Used
  - Design KPIs: KPI Name / Target/Benchmark / Context of Use / Meaning / Essential Levers to Improve
  - AI Design KPIs: KPI Name / Typical Target / What It Measures / Why It Matters

**Data:** Hardcoded in TypeScript data files (`src/data/kpis.ts`), populated from the PDF reference tables. No API.

**Empty state** when search returns nothing: "No KPIs match — try a different term."

---

### 5. Case Studies (`/cases`)

**Goal:** The 6 design challenges as explorable learning cards.

**Layout:** Grid of 6 cards on the listing page. Each card shows:
- Company name
- News headline / trigger
- "Define Business Impact + Design Goals →"

**Expanded view:** Clicking a card opens an inline expanded panel (accordion, not a new page) showing:
- The original headline/trigger
- Business Impact prompt
- Design Goals prompt
- A completed example using the 9-Box Framework canvas
- "Try it yourself" link to Worksheet 1

**Cases (from the PDFs):**
1. Meta — "Study finds 64% of Meta teen safety tools are ineffective"
2. Tesla — "Tesla stock drops 3% as Europe sales fall 36.6%"
3. End of Accents — "I sound Korean — because I am Korean. Can AI make me sound American?"
4. RangDe — "RangDe aims to increase loans to women above 70%"
5. Subways — "How to keep subways and trains cool in an ever hotter world"
6. Apollo Hospitals — "Battling to reduce patient average wait times from 18 minutes to less than 10"

---

## Component Architecture

```
src/
  components/
    layout/
      Nav.tsx          — fixed top nav, scroll progress
      Footer.tsx       — minimal footer
    ui/
      GrainOverlay.tsx — noise texture (copy from amit2.0)
      ScrollProgressLine.tsx
      RevealText.tsx   — scroll-triggered text animation
      PurpleLabel.tsx  — overline label with purple accent
    framework/
      NineBoxGrid.tsx  — interactive 9-box canvas
      TranslationTable.tsx
      VocabularyPills.tsx
      FlowDiagram.tsx
    worksheets/
      WorksheetTabs.tsx
      Worksheet1.tsx
      Worksheet2.tsx
      Worksheet3.tsx
    kpi/
      KpiTabs.tsx
      KpiTable.tsx
      KpiSearch.tsx
    cases/
      CaseCard.tsx
      CaseExpanded.tsx
  data/
    kpis.ts            — all KPI table data
    cases.ts           — 6 case study data
    framework.ts       — vocabulary, translation table data
  pages/
    Home.tsx
    Framework.tsx
    Worksheets.tsx
    KpiReference.tsx
    Cases.tsx
  App.tsx
  index.css            — same structure as amit2.0, adds purple tokens
```

---

## Data Strategy

All content is static TypeScript data files. No CMS, no API. Data files contain:

- `kpis.ts` — 3 arrays (businessKpis, designKpis, aiKpis), each typed with interfaces
- `cases.ts` — 6 case objects with fields: id, company, headline, businessImpact, designGoals, nineBoxExample
- `framework.ts` — vocabulary lists, translation table rows, flow steps, 9-box cell definitions, quotes

This makes content easy to update without touching components.

---

## Animation Strategy

Same Framer Motion patterns as amit2.0:
- `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}` for section reveals
- `viewport={{ once: true }}` always
- Easing: `[0.16, 1, 0.3, 1]` (spring-like ease-out)
- Page transitions: `AnimatePresence` with opacity + y

New for Dual Fluency:
- 9-Box grid cells: staggered reveal on scroll (`staggerChildren: 0.05`)
- Vocabulary pills: stagger in from left/right on the Two Languages section
- Case cards: hover lifts with `whileHover={{ y: -4 }}`

---

## Responsive Breakpoints

Matches amit2.0 — Tailwind defaults:
- Mobile: < 768px — single column, stacked nav
- Tablet: 768px–1024px — mostly same as desktop at reduced scale
- Desktop: > 1024px — full layouts

---

## Print Styles

For Worksheets page only. `@media print` CSS:
- Hide: nav, footer, tab switcher, print button
- Show: worksheet title, all form fields with visible borders
- Page breaks between worksheets
- White background, black text

---

## Deployment

Static build (`vite build`) → `dist/` folder. Deploy to:
- Vercel (preferred — zero config for Vite)
- Or GitHub Pages with `--base` flag

`index.html` at root. HashRouter for client-side routing compatibility with static hosts.

---

## What This Does NOT Include (deferred)

The following from the original 17-page Figma brief are out of scope for v1:
- Book chapters (no content exists yet)
- Certification program
- Assessment system with scoring
- Facilitator guide
- Multi-day workshop curriculum
- Case study library beyond the 6 workshop cases

These can be added as new pages/routes later without restructuring.
