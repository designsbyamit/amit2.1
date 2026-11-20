# Travel booking short case study: content map and evidence gaps

Page: `/craft/airline-app/story` (`src/pages/TravelStoryPage.tsx`, copy in `src/data/travelStory.ts`). Built from the master prompt of 20 Nov 2026. Visuals reuse the rebuilt app screens (`src/components/illustrations/travel/*`) and the project's own artefacts in `public/images/case-studies/airline/`.

## B. Content and artefact mapping

| Section | Objective | Key message | Artefacts on the page | What the reader should take from them | Evidence still wanted |
|---|---|---|---|---|---|
| Hero and at a glance | Frame the project in one screen | A complex journey made to feel effortless | Collage of the rebuilt app screens; role, scope, team, platform, delivery | The breadth of the app, and who did what | Confirm the role wording |
| 01 The ambition | Make the scale tangible | Five areas, one journey | The five areas, each with what it covers | The areas are interdependent stages of one trip | None |
| 02 The starting point | Show understanding came before screens | A shared understanding first | Four inputs (research, current app, benchmarking, requirements); journey map (airline-07); experience evaluation with 54-competitor benchmark (airline-03) | The work started from evidence | Confirm the evaluation shown was part of the mobile track, not only the web |
| 03 Diagnosing | Turn a broad problem into priorities | The effort between screens was the problem | Pain points per stage, quoted from the journey maps, each with a design priority | Specific friction became specific priorities | Confirm the three priorities are how the team phrased them |
| 04 Breaking down | Show structure without fragmentation | Five areas, multiple teams, one direction | Five pods (design, product, engineering) inside client stakeholders, legal and marketing; 11+ designers; the sprint rhythm (airline-05) | Ownership per area, with the whole journey kept shared | How hand-offs between pods were actually reviewed (a ritual, artefact or forum) |
| 05 One coherent experience | Coherence is more than looks | Same behaviour for the same kind of choice | One screen per area in sequence; four coherence checks | One app across five areas, designed for the phone | A shared pattern library or conventions artefact, if one exists |
| 06 Inside the details | Show hands-on interaction craft | Real scenarios shaped check-in | Check-in scenario pairs; the three questions each branch answers; 9 to 2; four mobile decisions; three check-in screens | Complexity handled inside a shorter journey | A real scenario map or decision tree from the project, and before/after check-in flows |
| 07 The transformation | Outcomes, honestly attributed | Less effort, at scale | 9 → 2, 4 min, 100 million | Two journey results and one channel-scale figure | See gaps below |
| 08 The bigger idea | Close on a principle | See the whole, care for the smallest interaction | The closing quote | One clear thought to leave with | None |

## C. Evidence and content gaps

**Confirmed facts used** (from the prompt and the existing case): five areas; 11+ designers across multiple pods with different product and engineering partners; multiple sprints on an aggressive timeline; research reviewed with the research team, current app review, benchmarking (54 competitors), requirements; web redesigned first; check-in designed hands-on as the reference; check-in 9 → 2 steps; booking in about 4 minutes; 100 million total digital bookings; journey-map pain points; pod model and sprint rhythm.

**Narrative framing written for the page** (please check the wording):
- The three design priorities in chapter 03.
- "The points where one area hands over to the next were treated as shared work" (chapter 04) and the pod panel's caption.
- The four coherence checks and "one way to navigate between journeys, the same interaction for the same kind of choice" (chapter 05).
- The three questions each check-in branch had to answer (chapter 06).
- The role line at the end.

**Needs validation before publishing:**
1. **100 million.** The existing case says the goal was to grow digital bookings from a **$2M channel to a $100M revenue stream**. The prompt says **total digital booking volume reached 100 million**. These are different measures (revenue versus volume). Which is right?
2. **4 minutes.** The existing case says "4 min to book, for returning customers". The page now says "about four minutes" without the returning-customer qualifier, per the prompt. Keep the qualifier?
3. **Face ID** is shown in the rebuilt screens and named in chapter 05. Confirm it shipped.
4. **Gestures and touch interactions** (chapter 06) are stated generally, as in the prompt. A concrete example would strengthen it.
5. **Check-in scenarios:** the page lists the four from the prompt. If there is a real scenario map or decision tree, it should replace the drawn pairs.
6. **The experience evaluation image** (airline-03) shows a web homepage. If the mobile track had its own evaluation, use that instead, since the prompt asks to keep the web in the background.
7. **Other metrics** in the existing case (+16% bookings, +13% engagement, 30% less effort to choose a seat, eVisa in 3 steps) were left out because the prompt lists only three confirmed figures. Say if any should come back.
