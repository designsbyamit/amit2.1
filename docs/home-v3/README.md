# Home v3: art direction (step 2)

Three directions for `/home-v3`. Each has still frames of keyframes 01, 03, 05 and 08 at 1440x900 and 390x844, plus an overview sheet (`a-overview.png`, `b-overview.png`, `c-overview.png`). These are quick prototypes: static HTML in `proto/` (open `proto/a.html?kf=03` with file access), not production code. Copy is the brief's exact copy.

## A. Signal Light (luminous, WebGL)
The lime point is a real light source. The three forces are coloured light (amber human behaviour, cobalt business, teal technology) arriving as streaks and dust, then locking into a glowing flower; overlaps add up to white heat at the centre. Bloom, grain, additive blending, depth by blur and size.
Motion: the point flickers on in silence; three streaks race in from off frame and settle into rings with a soft overshoot; headline words light up one at a time as each force lands. In 03 the rings unspool into three ribbons that trace into the frames; the hero work ignites with a lime rim and a floor reflection while the next two wait in perspective off the right edge. In 05 the light breaks into 200 particles that fall into eight orbiting pods, with depth of field; the count rises in a huge glowing numeral. In 08 all light collapses back to the point, which fires a single beam to the edge of the screen.
Build: react-three-fiber or OGL, instanced points, custom shaders, bloom. Heaviest of the three; needs a 2D canvas fallback.

## B. Full Stop (editorial, type-led)
Typography is the image. The lime point is the full stop of each headline. Three flat colour discs bloom from the full stop of "transformation." and the type knocks out where they overlap. In 03 the full stop of "practice." grows into a circular window that opens onto the work, full bleed, with an index list of the three works. In 05 the numeral "200" is built from a field of dots, each dot a person. In 08 the full stop of "shape." draws a line out of the frame.
Motion: SplitText line and word masks timed to the visual; type scales and tracks with the scene; circle mask reveals (clip-path); dots stagger into the numeral; the line draws with DrawSVG. Lightest to build (DOM, SVG, GSAP only), very fast, crisp on every screen. Less "wow" in depth, more confident in voice.

## C. Paper and Light (tactile depth)
A warm graphite ground with paper grain. The forces are three vellum discs at different heights, casting soft shadows from the lime bead at the centre, which pools light on the surface. Works are printed cards on a tabletop in perspective; the hero card lifts toward the camera. Teams are 200 paper tokens arranged in eight groups on a tilted plane. The ending is a lime thread pulled across the table from the gathered discs. Chapter folios in outlined Bodoni give a book-like rhythm.
Motion: slow, weighty, physical. Discs slide and stack with real shadow changes as they lift; cards are dealt onto the table and the hero rises with a camera push; tokens drop and settle in a staggered rain; the thread pulls taut. CSS 3D plus GSAP, optional light WebGL for shadows. Warmest and most human, slightly off the cool Signal palette.

## Shared across all three
- One continuous chain: point, forces, flower, paths, frames, points, pods, network, streams, point, line.
- Words reveal in rhythm with the visual (SplitText), every line has a readable resting state.
- Reduced motion: each direction renders its finished frames as a static story.

## Chosen: A, Signal Light. Vertical slice (keyframes 01 to 03)

Route `/home-v3`. Recordings: `slice/home-v3-slice-1440.mp4` and `slice/home-v3-slice-390.mp4` (about 34 s each, a steady scroll from top to the end of 03).

- `src/pages/HomeV3.tsx` picks the scene or the reduced-motion still.
- `src/components/home3/Signal.tsx`: the pinned scene, the text, the three work frames, and the intro and scroll timelines (GSAP ScrollTrigger and SplitText).
- `src/components/home3/SignalStill.tsx`: reduced motion. The same three keyframes as finished, still frames.
- `src/components/illustrations/signal/glField.ts`: a small additive WebGL2 light renderer, no new dependency, with a Canvas 2D fallback.
- `src/components/illustrations/signal/signalScene.ts`: all geometry and choreography, driven by one state object.
- New token `--fs-signal` for the opening line.

The chain: the point flickers on. Three streams arrive on their own courses and lock into the flower, and each subtext line brightens as its force lands. On scroll the flower rises and the point grows. The rings unspool into paths that land as ripples (experiences), a network (products) and rising columns (value), and each caption appears as its path lands. The outcomes then leave as light, trace the three work frames, and the work opens from the centre. Each work takes centre stage in turn: the last one recedes up into depth and the next comes in from the right.

## Full story (keyframes 04 to 08)

Recordings: `slice/home-v3-full-1440.mp4` and `slice/home-v3-full-390.mp4` (about 75 s each, top to bottom).

Benchmark: `slice/reference01.mov`. What we took from it is one focus at a time, continuous morphs, and a single guide that leads the eye. Here that guide is the lime point: it draws the career line, sits at the heart of the team and the community, and draws the open line at the end.

- 04: the last work dissolves into 61 points, and the point draws the career line. One measure at a time: 16+ years (the line), 61 projects (the points drop by year), multiple industries (the points regroup into clusters sized by the atlas counts), and an evolving body of work (they return, coloured by role, with a legend).
- 05: the projects multiply into a lattice around the point, grown ring by ring; the count rises from 61 to 200+.
- 06: the lattice loosens past its edge, 52 newcomers arrive from outside, and ties form between neighbours; 200 becomes 252+.
- 07: the network splits into three streams that trace and open three cards (workshop, resource, initiative), each a link.
- 08: everything returns to the point, which draws a new line out of the frame; then the CTAs.

Geometry and choreography live in `src/components/illustrations/signal/signalLater.ts`. The reduced-motion still covers all eight keyframes.

## Benchmark pass (from reference01.mov)

What the reference does, and how it now shows up here:
- **Words belong to the objects.** Each 04 measure ("16+ years.", "61 projects.", "Multiple industries.", "An evolving body of work.") now sits on the visual it describes: above the point, over the year stacks, over the clusters, with a role legend under the timeline.
- **Type moves like the visuals.** Every line enters with a blur and horizontal stretch that settles, and leaves upward with a blur, so the type and the field share one motion.
- **The point frames the number.** In 05 and 06 the point opens into a ring, and the counter (61 to 200+ to 252+) sits inside it, so attention lands on one place.
- **The thread becomes the action.** In 08 the point's line runs to "Start a conversation", traces around the button, and carries on out of the frame.
- **08 copy:** headline "Exploring new possibilities in design, business and AI.", subtext "Always open to meaningful collaborations and conversations."
- The reduced-motion version mirrors the same 08 layout.

## Second pass (18 Nov)
- **Industries as a ranked dot matrix.** "Multiple industries." is now one row per industry: the name and count, then one dot per project on a shared grid of faint slots, so the rows compare at a glance. It shows the nine largest by name, then "10 more industries" (18 projects), then "Not labelled" (7). The counts come from the atlas data. Desktop puts the labels right-aligned before the dots; phones put the labels on the left and the dots on the right, above the career line.
- **The 08 line follows the button.** It now traces the button's own border, 2.5px outside it, using the corner radius read from the button, instead of a separate stadium shape.

## Third pass (18 Nov): five doors at the end

- "See all works" is gone from 08. Below "Start a conversation", five cards rise one after another, one per main menu item: Works, Leadership, Practice, About, Growth and Aspirations (`src/components/home3/NavCards.tsx`, drawings in `illustrations/signal/NavGlyph.tsx`, styles under `.lumen` in `src/index.css`).
- Each card tilts towards the pointer and a lime light gathers where the pointer rests, catching the nearest edge. Phones get a swipeable row. Reduced motion shows the same cards with no tilt.
- The scene gained 1.2 units of rest at the end (`TOTAL = B + 25.8`) so the cards can be used while the stage is still pinned.
- The one-line descriptions on the cards are new copy and need Amit's review.
