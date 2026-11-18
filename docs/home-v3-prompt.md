# Prompt for Claude Code: rebuild the home as an immersive experience (Home v3)

Paste everything below the line into Claude Code, opened in the `amit2.1` repo on branch `staging`.

---

Read `CLAUDE.md` first. It has the stack, the deploy routine, the token rules and my standing rules. Follow all of them.

## The job

Rebuild my landing page as an **immersive, cinematic, scroll-choreographed experience** that tells one continuous story about how I work. It has to feel like an award-level site (think the best of Awwwards, Lusion, Active Theory, Locomotive, Linear and Stripe launch pages, and Ramp's 2025 rebrand reel), not a portfolio template and not an animated diagram.

Build it at a new route, `/home-v3`, so I can compare it with the current home. Do not touch `/` and do not deploy anywhere until I approve.

## Why the current attempt (`/home-v2`) failed, so you do not repeat it

Look at `src/components/home2/Story.tsx` and `layout.ts` only to understand what not to do:
- It reads like an **animated data diagram**: thin-stroke SVG circles, small dots and clip-art glyphs (ripples, bars, a node triangle) in a big dark void. Nothing has depth, light, material or scale.
- The **visuals are small** and centred while most of the screen is empty. Nothing ever fills the frame or breaks it.
- **Typography is static**: one text block parked at the bottom, words sliding up. Type never becomes the visual, never scales, never interacts with the imagery.
- **Pacing is flat**: every beat has the same tempo and weight, so there is no build, no hush, no payoff.
- The dot plots, pods and network look like a dashboard, not an emotional idea.
- The work (the most important evidence) appears as three thumbnails and a frame swap. It never feels like a reveal.

## The story (use this copy exactly; no em or en dashes anywhere)

Each row is a keyframe: the section, the exact main text and subtext, and what the visual should express. Treat the visual column as intent, not a literal spec. Use your judgement to make it outstanding.

| # | Keyframe | Main text / subtext | Visual intent |
|---|---|---|---|
| 01 | Hero / Identity | **Design is undergoing a profound transformation.** Evolving human behaviour. Changing business ambitions. And the technology enabling both. I work at their convergence. | A single lime-green point appears. Three distinct forces emerge around it, each moving independently: human behaviour, business, technology. They converge around the central point as the final statement appears. (Idea I like: three circles that come together into a beautiful floral form.) |
| 02 | Outcomes | **This convergence is changing what design can make possible.** More meaningful experiences. More intelligent products. Greater business value. | The point of convergence grows. The three forces extend into three distinct paths, each transforming into a visual of an outcome. The movement should feel like a consequence of the convergence, not a new animation. |
| 03 | Selected Works | **From possibility to practice.** A selection of experiences shaped across enterprise, AI and digital products. | The three paths transform into real product interfaces. Reveal three selected works (`sap-search`, `sap-agentic`, `airline-app`), each in a clean individual frame. Let the work take centre stage: large, crisp, generous. |
| 04 | Career Atlas | **Every experience adds to the perspective.** 16+ years. 61 projects. Multiple industries. An evolving body of work. | Interfaces dissolve into individual points that arrange themselves into a chronological career landscape: projects, industries, milestones. Show each measure (years, projects, industries, roles over time) with its own visual idea, all made from the same points. Data: `src/data/atlasSummary.ts` and `INDUSTRIES` in `src/components/home2/layout.ts` (19 named industries plus 7 unlabelled, 61 total). |
| 05 | Building Teams | **Because meaningful work takes collective effort.** Building teams. Developing talent. Creating the conditions for good design to thrive. | Individual points multiply and organise into a structured constellation that reveals the scale of team building. Show **200+ designers hired across organisations**. |
| 06 | Growing Community | **And good design grows beyond the team.** Creating spaces for designers to connect, exchange ideas and grow together. | The team constellation expands beyond its boundaries; connections form between groups into a larger, organic network. Show **252+ members in Leading Design Hub India**. |
| 07 | Knowledge sharing / Practice | **Experience becomes more valuable when it is shared.** Workshops. Mentoring. Resources. Ideas translated into practice. | The network branches into three streams, each becoming a tangible artefact: a workshop (Build Dual Fluency, `/resources/dual-fluency`), a resource (Leading Design, `/resources/leading-design`), a practical initiative (From AI experiments to a capability, `/leadership/cases/ai-experimentation-to-capability`). |
| 08 | Collaborate | **The next chapter is still taking shape.** Exploring new possibilities in design, business and AI. Always open to meaningful collaborations and conversations. | Everything from the earlier sections converges. A new line emerges from the central point, suggesting an open-ended journey. Reveal the contact CTA (`/contact`) and a link to all works (`/craft`). |

## My motion rules (non-negotiable)

1. **Continuity over decoration.** Every animation inherits something from the previous one. A point becomes a line, a line becomes a connection, connections become a network, or a point changes shape into something else. There must never be a moment where one scene ends and an unrelated one begins.
2. **Typography is part of the animation.** Do not just fade headlines in. Words appear in rhythm with the visual transformation. Restrained and readable, but alive: scale, weight, tracking, masking and position can all move with the scene.
3. **The work must take centre stage.** Abstract motion introduces my thinking, then gives way to the evidence. The three works must feel like the payoff of the opening.
4. I want an outstanding experience overall. Do not follow the table word by word if a better idea serves the same story.

## Craft bar: what "fantastic" means here

- **Depth, light and material.** The lime point and the forces should feel luminous and physical (glow, bloom, soft light, subtle grain, parallax depth), not like 1.5px SVG strokes. Consider WebGL for the point, forces and particles (react-three-fiber or OGL with custom shaders, instanced points, additive blending, bloom), with an SVG or CSS fallback.
- **Scale and composition.** Use the whole viewport. Visuals should fill and sometimes break the frame. Give each keyframe a deliberate composition; do not centre everything.
- **Cinematic pacing.** Vary tempo: a hush before a reveal, a fast cut after a build, holds where the reader needs to read. Each keyframe gets a clear moment of arrival.
- **Typography as image.** Large Bodoni display moments (`--fs-mega`, `--fs-d-2xl`) used sparingly; split-text choreography (GSAP SplitText) in sync with the visuals; a readable resting state for every line.
- **The work reveal.** Make it the emotional peak: the interfaces should emerge from the paths, arrive large and sharp, and be explorable (hover parallax, a short live loop where one exists via `CaseThumb live`, a clear link to each case).
- **Points that mean something.** In the atlas, teams and community scenes the points must read as people and projects, with hierarchy, rhythm and beauty, not as a chart.
- **Sound design is out of scope.** No audio.

## Tools and skills to use

- **GSAP 3.13** (already installed): ScrollTrigger, SplitText, MorphSVG, DrawSVG, Flip, CustomEase. These plugins are free now; import from `gsap/*`. **Lenis** is already global smooth scroll (`src/hooks/useLenis.ts`); keep ScrollTrigger in sync with it.
- **WebGL** if it earns its place: `three` with `@react-three/fiber` and `@react-three/drei`, or `ogl` for a lighter footprint. Keep the bundle lazy-loaded for this route only.
- **Motion design skills**: clone and read before designing:
  - `https://github.com/LottieFiles/motion-design-skill` (timing, easing, choreography, narrative structure)
  - `https://github.com/iart-ai/motion-design-skills` (timing, colour, composition)
- Use any installed skills that apply, for example frontend design, motion, reduced-motion, typography, spacing, design critique and accessibility review. Load each before the step it guides.
- Playwright (`require('playwright')`) for screenshots **and screen recordings** (`recordVideo`) so you can review motion, not just stills.

## Process (follow in order, and stop for my approval where marked)

1. **Study.** Read `CLAUDE.md`, the motion skills above, and the current tokens and type (`src/styles/tokens.css`, `src/index.css`). Note the brand: dark "Signal" theme, lime accent, Bodoni display, Geist body, Geist Mono labels.
2. **Art direction. Stop for approval.** Propose **three distinct directions** for the whole experience (for example: luminous particles in WebGL; editorial type-led with bold masks and morphs; tactile paper-and-light with depth). For each, render 3 or 4 still frames (keyframes 01, 03, 05 and 08) as quick prototypes at 1440x900 and 390x844, and describe the motion in a few lines. Save the frames to `docs/home-v3/` and show them to me. Do not build further until I pick one.
3. **Vertical slice. Stop for approval.** Build keyframes 01 to 03 in the chosen direction at full quality. Record a 1440 and a 390 screen capture of scrolling through them and show me.
4. **Full build.** Build 04 to 08, keeping the continuity chain unbroken.
5. **Critique rounds.** At least three rounds, each with fresh recordings at both sizes. Review as (a) a hiring manager for a Head of Design role, (b) an award-show jury member judging craft and motion, and (c) a designer looking to grow. Fix what each round finds before the next.
6. **Hard checks before showing me the result:**
   - 60 fps scrolling on a mid-range laptop; no long tasks over 50 ms during scroll; first meaningful paint under 2 s on staging.
   - No sideways scroll, no console errors, works in Chrome, Safari and Firefox, and on iPhone-size screens with touch scrolling.
   - `prefers-reduced-motion`: a finished, static, still-beautiful version of the same story.
   - Keyboard focus visible on every link and button; headings in a sensible order; the copy readable by screen readers.
   - `npm run build` passes and `npm run tokens` stays at 0 for hex, rgb, inline px/rem, raw shadow and arbitrary Tailwind values. Raw values are allowed only in `src/components/illustrations/` (put shader and canvas code there).
   - No invented facts or numbers. No client names. No em or en dashes.
7. **Stage. Only after I approve.** Push to `staging`, alias the staging URL as described in `CLAUDE.md`, and send me the `/home-v3` link with a short note on what to look at. Never touch neo or www.

## What to send me at each stop

A short message in plain words: what you made, the frames or recordings, and the one or two decisions you need from me. No long recaps.
