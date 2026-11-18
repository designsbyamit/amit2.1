# CLAUDE.md: Amit Kumar Tiwari portfolio (amit2.1)

Handoff for Claude Code. Written 18 Nov 2026 (IST) when the project moved from claude.ai into Claude Code. Claude Code reads this file at the start of every session, so keep it current: update the status and open items whenever something ships.

---

## 1. What this is

The personal portfolio of **Amit Kumar Tiwari**, Design Leader, Core Design, SAP Labs, Bengaluru. Its audience is hiring managers for senior design leadership roles (Design Director, Head of Design, Group Manager). The mental model to land: **a leader obsessed with craft and realistic working solutions**. Four pillars: Design Leadership, Interaction Craft, Technical Acumen, People and Culture. Every claim is grounded in real evidence.

| Thing | Value |
|---|---|
| Repo | `github.com/designsbyamit/amit2.1`. Work on branch **`staging`** |
| Stack | React 19, TypeScript, Vite, Tailwind 3.4, react-router 7, framer-motion, **GSAP 3.13 (ScrollTrigger)**, Lenis (global smooth scroll) |
| Node | 22 |
| Staging | https://amit-portfolio-staging.vercel.app (Vercel project `amit-portfolio-staging`) |
| Beta production | https://neo.designsbyamit.com (Vercel project `amit-portfolio-production`) |
| Old site, source of truth for facts | https://www.designsbyamit.com (Framer). Production moves here at launch |
| Vercel team | `uxbyamit-8545s-projects` |
| Last commit at handoff | `dba275f` on `staging` (Home v2 rebuilt from the keyframe table) |

---

## 2. Setup and commands

```bash
git clone https://github.com/designsbyamit/amit2.1.git && cd amit2.1
git checkout staging
npm install
npm run dev          # local dev server
npm run build        # token check + tsc + vite build + SEO pages + 404 copy. Must pass before any push
npm run tokens       # design-token audit on its own
npm run lint
npm run preview      # serve dist on :4173 for screenshot checks
```

**Environment variables** (only the contact portal and admin under `api/` need them; the site builds without them). Set them in Vercel, never in the repo: `DATABASE_URL` / `POSTGRES_URL`, `RESEND_API_KEY`, `RESEND_FROM`, `NOTIFY_EMAIL`, `ADMIN_EMAIL`, `ADMIN_PASSWORD`, `VITE_FIGJAM_LINKS`, `VITE_LEADING_DESIGN_FIGMA*`. Pull them locally with `vercel env pull` if needed.

---

## 3. Deploy routine (staging)

1. `npm run build` passes. `npm run tokens` must report **0** for hex, rgb, inline px/rem, raw shadow and arbitrary Tailwind values. The "hard-coded duration" baseline is 32; do not raise it.
2. Commit and `git push origin staging`. Vercel builds automatically (about 3 to 5 minutes). Note: a push to `staging` also triggers a **preview** build on `amit-portfolio-production`; that does not change neo.
3. The staging push is a preview deployment, so the staging address must be pointed at it by hand:
   ```bash
   vercel ls amit-portfolio-staging            # wait for the newest one to be Ready
   vercel alias set <deployment-url> amit-portfolio-staging.vercel.app
   ```
   (In claude.ai this was done with the Vercel MCP: `list_deployments` then `assign_alias`.)
4. **Never** push or alias to neo or www without Amit's explicit go-ahead. Some older notes say "live on both staging and neo"; the explicit-confirmation rule wins.
5. Bundle changes into fewer deployments (Vercel storage has been tight).

**Local visual check** (do this before reporting work as done): build, `npm run preview`, then Playwright full-page or scroll-stop screenshots at **1440x900 and 390x844**. Check `document.documentElement.scrollWidth > clientWidth` for sideways scroll and watch the console for errors. NDA-gated case pages unlock with `sessionStorage['nda-unlocked:<id>'] = '1'`. For scroll-driven scenes, `window.scrollTo(0, y)` then wait about 1.8 s before each screenshot (Lenis and scrub need time to settle). Stop your own preview server by its PID, never with `pkill`.

---

## 4. Standing rules (apply to everything)

**Content and honesty**
- Never invent facts, numbers, research, decisions, team structures, outcomes or names. Headline numbers come from Amit or the career-atlas workbook. Fictional personas and sample data inside UIs are fine.
- No half-finished content on the site: no "draft", "coming soon", "in the works".
- **No em or en dashes anywhere on the site copy.**
- Do not name clients (the airline is "Airline App" / "Travel Booking"). Do not name people.
- Credit work as "together"; never "my part" or a mine/team split.
- On case pages, thumbnails, UIs and descriptions: no SAP logo, no SAP name, no SAP product names. SAP is fine on personal pages (About, career).
- No fake logos. Where one is unavoidable: a plain grey circle; in sign-in UIs a small dark blue rectangle with nothing on it.
- Anything written in Amit's voice must be flagged for his review.

**Design**
- Calm, clear, restrained. Dark "Signal" theme by default, light on request. Lime `signal` is the accent.
- Bodoni 72 / Bodoni Moda for headings (weight 200 to 300), Geist for body, Geist Mono for labels.
- Everything tokenised: colours, spacing, shadows, type, motion live in `src/styles/tokens.css`. Use `rgb(var(--ink-rgb) / a)`-style values, type tokens (`--fs-d-2xl`, `--fs-d-l`, `--fs-heading`, `--fs-title`, `--fs-mega`) and classes (`text-display-xl`, `text-heading`, `text-title`, `text-body-lg`, `text-body`, `text-body-sm`, `text-label`, `text-overline`). Raw values are allowed only in `src/components/illustrations/`, `src/film/` and `src/components/case/search/`.
- Respect `prefers-reduced-motion` everywhere: every animated scene has a finished, static fallback.

**Motion rules (from Amit, for the new home and anything like it)**
1. **Continuity over decoration.** Every animation inherits something from the previous one: a point becomes a line, a line becomes a connection, connections become a network, or a point changes shape.
2. **Typography is part of the animation.** Words appear in rhythm with the visual change, restrained and readable. No plain fades on headlines.
3. **The work takes centre stage.** Abstract motion introduces the thinking, then gives way to the evidence.
4. He wants an outstanding experience overall, not a literal reading of any brief. Use judgement.

**Working style**
- Stage first, then report what changed in plain words, then list what needs his decision.
- Reuse Amit's own music for films; never compose new music.

---

## 5. Site map

| Route | What |
|---|---|
| `/` | Current home (`src/pages/Home.tsx` + `components/sections/*`) |
| **`/home-v2`** | **New immersive home, in review** (section 6). Not yet the home page |
| `/craft` | Works index |
| `/craft/<id>` | Short case study ("playback", `PlaybackPage.tsx`, data in `src/data/playbacks.ts`) |
| `/craft/<id>/details` | Deep dive. Has a "Watch the video" button where a film exists (`components/case/StoryLinks.tsx`) |
| `/craft/<id>/film` | Case film (`src/film/*FilmPage.tsx`) |
| `/leadership`, `/leadership/stories`, `/leadership/cases/<slug>` | Leadership journey, stories, cases |
| `/resources`, `/resources/<kit>` | Practice toolkits (Dual Fluency, Leading Design and others) |
| `/community/design-hub` | Leading Design Hub India story |
| `/about`, `/learn` (Growth and Aspirations), `/mentoring`, `/contact` | |
| `/career-atlas/` | Standalone static page `public/career-atlas/index.html` (vanilla JS, data embedded as `window.__DATA__`, 60 records). Count shown everywhere is **61** |

**Case studies (9, ids in `src/data/work.ts`):** `sap-search` (AI-Powered Search), `sap-signin` (Unified Sign-in/Out), `sap-collections` (Agentic AR Collections), `sap-agentic` (Agentic Order Confirmations), `sap-compositional` (Compositional Design System), `engaze`, `airline-app` (Travel Booking), `data-ai` (Data Products Marketplace), `dnetworx` (Network Management). Gated by access code (`src/data/nda.ts`): `sap-search`, `sap-agentic`, `sap-collections`, `sap-signin`, `sap-compositional`. Films exist for Search, Sign-in, Collections, Agentic, Compositional, Engaze.

---

## 6. The new home (`/home-v2`): current state

Built from Amit's keyframe table: eight keyframes in **one continuous pinned scene**, scrubbed by scroll with a single GSAP timeline.

**Files**
- `src/pages/HomeV2.tsx`: picks `Story` or `StoryStill` (reduced motion).
- `src/components/home2/Story.tsx`: the scene. Copy (the `BEATS` object, Amit's exact words), SVG drawing layer, HTML frames and cards, text beats, chapter rail, and `build()` with the whole choreography in timeline units (`VH_PER_UNIT = 42` vh of scroll per unit).
- `src/components/home2/layout.ts`: all geometry in pixels from the viewport (`computeLayout(W, H, headerH)`); rebuilt on resize. Holds the industry counts (`INDUSTRIES`, from the atlas workbook: 19 named plus 7 unlabelled = 61).
- `src/components/home2/scene.ts`: GSAP registration, `prefersReduced`.
- `src/components/home2/StoryStill.tsx`: static fallback.
- `src/index.css`: `.h2-ambient` background field.

**The chain** (each keyframe is made from the previous one):
1. **Convergence:** a lime point; three coloured circles drift independently, then lock into a three-petal flower, with three faint echo circles making a six-petal rosette.
2. **Outcomes:** the point of convergence grows; three paths leave the petals and land as marks: ripples (experiences), node network (products), rising bars (value). Each subtext phrase brightens as its path lands.
3. **Selected works:** each mark opens into a frame; a row of three (`sap-search`, `sap-agentic`, `airline-app`); each takes centre stage in turn with its playback headline.
4. **Career atlas:** frames dissolve into 61 points: timeline draws (16+ years), points drop into years (61 projects), regroup into industry clusters (multiple industries), return to the timeline coloured by role (an evolving body of work).
5. **Building teams:** points multiply into 8 pods of 25 around the lime point; 61 counts up to 200+ designers hired.
6. **Community:** pods loosen, 52 new points join, ties form across groups; 252+ members, Leading Design Hub India.
7. **Sharing:** the network splits into three streams that become cards: Dual Fluency (workshop), Leading Design (resource), From AI experiments to a capability (initiative).
8. **Collaborate:** everything returns to the point; a new line sets out to the edge of the screen; CTAs "Start a conversation" and "See all works".

**Known decisions:** scroll-snap was removed (it fought Lenis and caused jumps). Brands and the separate numbers section were dropped because the table does not include them. On phones the text sits in the bottom 37% of the screen and the visual above it.

**Next steps for the new home**
- Amit to review on staging. Likely polish: the pacing per keyframe, label legibility in the industry clusters on phones, the transition into the footer after keyframe 8.
- When he approves: make it the `/` route (replace `Home` in `src/App.tsx`), keep the old home reachable for a while if he wants, re-check SEO (`tools/seo`), then stage.
- Ideas he showed interest in (from a Ramp rebrand reel): a masonry pan of tiles, a gradient-sky ending.

---

## 7. Open items waiting on Amit

1. Approve `/home-v2` and decide when it replaces `/`.
2. **Launch**: promote to neo, then www, only on his explicit go-ahead.
3. **Agentic access gate**: an older handoff says Agentic is open; the code gates it with Collections. Open it or keep it?
4. **AlphaVector card copy** (Growth and Aspirations) was written without access to the site. Confirm or replace.
5. **Airline cover** still shows "Saudia" on the loyalty card (image edit). BASF has been removed from the Agentic screens (replaced with neutral "acme" text in a close typeface); he should eyeball those.
6. **61st atlas project**: the atlas data has 60 rows; counts say 61. Needs the missing project's name, year, role and industry.
7. **Films**: only Agentic meets his standard. Search is about 166 s (target about 2 min); Collections, Sign-in, Compositional are 50 to 56 s on older visuals; Engaze about 67 s.
8. Older open questions: the About timeline lines Claude wrote (Infosys, Photon), voice check on the About hero and principle names, the Collections deep-dive "what is a row" conflict.

## 8. Backlog after launch

Films to the Agentic standard (his music only); a leadership principles page that collects the named principles; Practice "start here" pages and worksheet completeness; Growth and Aspirations grouping, search and the hidden Curious Minds Q&A; dead-code cleanup (`HomeTestimonial`, `LeadershipChange`, unused `components/sections/*` once the new home ships); Design Hub photos; client and leadership logos when he shares them.

## 9. Key files

- Data: `src/data/{work,playbacks,cases,leadership,journey,ia,brands,impact,films,nda,atlasSummary,library}.ts`
- Home v2: `src/components/home2/*`, `src/pages/HomeV2.tsx`
- Old home: `src/pages/Home.tsx`, `src/components/sections/{Hero,Latest,ImpactSnapshot,CareerAtlasPreview,Brands}.tsx`
- Case pages: `src/pages/PlaybackPage.tsx`, `src/pages/SAP*StoryPage.tsx`, `src/components/case/*`
- Previews and covers: `src/film/loops/*`, `src/components/ds/{CaseThumb,AnimThumb,AnimThumbLoop,FlowThumb}.tsx`, `tools/covers/*`, `public/images/covers/<id>-{1600,640}.webp`
- Tokens and type: `src/styles/tokens.css`, `src/index.css`, `tailwind.config.ts`, `tools/tokens/check.mjs`
- Routes: `src/App.tsx`
- Repo docs: `docs/portfolio-backlog.md`, `docs/design-system.md`, `docs/contact-portal.md`, `docs/staging-changes.md`

## 10. First message to use in Claude Code

> Read CLAUDE.md. Open /home-v2 locally at 1440 and 390 wide, then tell me what you would polish first. Do not deploy until I say so.
