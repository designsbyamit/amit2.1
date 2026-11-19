# Short stories v2: outlines for approval

Written 19 Nov 2026, step 2 of `docs/short-stories-v2-plan.md`. Nothing is built yet. Approve, edit or cut, then I build at `/craft/<id>/story`.

**How to read this.** Each case has a headline, one supporting line and one still for the first screen, then its beats. Every beat has a large statement, a body of at most about 40 words, and one visual. The nuance beat is marked **★ Nuance** and is set largest. Every fact carries its source in `[brackets]`. All copy below is drafted in your voice: **every line needs your read**. Questions are collected at the end of each case and again in one list at the bottom.

Source keys:
- `[AG-story]` `src/data/sapAgenticV2Story.ts` · `[AG-data]` `src/data/sapAgenticV2.ts` · `[AG-pb]` agentic entry in `src/data/playbacks.ts`
- `[SE-page]` `src/pages/SAPSearchStoryPage.tsx` · `[SE-data]` `src/data/sapSearch.ts` · `[SE-cap]` `CAPABILITIES` in `src/components/case/search/SearchDiagrams.tsx` · `[SE-pb]` search entry in playbacks
- `[EN-data]` `src/data/engaze.ts` · `[EN-film]` `src/film/scenesEngaze.tsx` and `src/film/loops/engaze.tsx` · `[EN-pb]` engaze entry in playbacks
- `[AI-data]` `src/data/airline.ts` · `[AI-pb]` airline entry in playbacks
- `[brief]` the plan itself (your words)
- `[FIG]` your Figma deck `CaseStudy`, page "Case Study 2023" (node 747:48567); `[FIG-UI]` its UI collage (node 2007:3332)
- `[CHAT]` your design conversation for the agentic project (claude.ai share `41a323b8…`, Mar to Apr 2026), pointed to by you on 19 Nov as the source for the agent's reasoning

**Shared grammar for all four:** first screen (headline, supporting line, one still cover, nothing else) → 4 to 6 beats, one screen tall on desktop → ending (where it stands, my role, Watch the film if one exists, Read the full case). A restrained word-by-word reveal on each statement, with a static fallback for reduced motion. No sticky "Following" bar, no crux columns, no tags, no metadata on top.

---

## 1. Supplier order confirmations (`sap-agentic`)

**Highlight:** how to build an agentic solution that is genuinely meaningful.

**Headline:** An agent is worth building only where judgement is needed.
**Supporting line:** How we decided what an agent should take on in supplier order confirmations, what it should never do, and where people stay in charge.
**Still:** `public/images/covers/sap-agentic-1600.webp` (static, not the live preview). You asked to eyeball the "acme" replacement on these screens; this cover is one of them.

### Beat 1 · Start from the business problem
**Statement:** Confirming one order meant six hand-offs, three roles and no single record.
**Body:** A supplier answers a purchase order with a PDF, in its own layout and often in German. Someone checks every price, term, quantity and date by eye, then chases the owner of each difference. Every hand-off adds waiting.
**Visual:** the six-step as-is strip (`AsIsFlowV2` with the `asis` steps), reused from the detailed case.
**Sources:** `[AG-story] chapters.problem`, `asis`.

### Beat 2 · Find where judgement sits
**Statement:** Most of the work needs no judgement. The decisions do.
**Body:** Reading, extracting, comparing and drafting are work. Deciding whether net 45 days is acceptable, or whether 500 fewer units still cover the store, is judgement. The agent takes the work. People keep the judgement.
**Visual:** new, simple two-column diagram in the site style: "The agent does" (extracts with a confidence score, finds and rates each difference, explains it, routes it, drafts the reply, logs it) and "The agent never" (accepts or rejects a difference, confirms its own extraction, writes to the supplier).
**Sources:** `[AG-story] agent` (Does / Never rows), `principles[0]`; examples from `[AG-data] risk.examples` (Net 30 → Net 45, 2,500 → 2,000).

### Beat 3 · Map it to a pattern
**Statement:** Guided autonomy: the agent prepares, a person decides at three gates.
**Body:** Validate, decide, send. One human-agent contract, written before any screen, sets the line. More autonomy is earned later, only where confidence is high and risk is low, inside policy.
**Visual:** the autonomy ladder (`AutonomyLadder`, three rungs: Assist, Guided autonomy marked Today, Bounded autonomy).
**Sources:** `[AG-story] hitlIntro`, `contractIntro`, `chapters.contract`; `[AG-data] autonomy.levels`, `autonomy.intro`.

### Beat 4 · ★ Nuance: the non-deterministic core (revised 19 Nov after your answer)
Told in two screens, the only beat that gets two, because it carries the argument.

**4a · Statement:** Not a parser. Not a recommender. The design is in how it reasons.
**Body:** Parsers existed before. The hard part is judgement under uncertainty. The agent weighs three kinds of signal: how sure it is that it read the document, what actually differs, and what this supplier has done before. Uncertainty is itself a risk.
**Visual:** new diagram, "Three signals, one verdict", drawn in the site style:
- **Did I read it right?** Extraction signals, giving confidence. Example: "voraussichtlich Kalenderwoche 13" is an approximate week, not a date, so the agent infers it at low confidence and asks for a written date rather than trusting its own guess. A non-standard column header such as "PREIS" is mapped to unit price, and the mapping is shown.
- **What actually differs?** Deviation signals, giving severity.
- **Error or pattern?** Context signals from the supplier's history. A third price deviation from the same supplier in a year is a pattern, not a typo.
- All three flow into **order risk**, then a **recommendation with its reason in plain words**.
- A rail along the bottom: **Hard stops.** Some issues block approval whatever the score, such as a missing mandatory certificate, because a weighted score can hide one catastrophic input behind several good ones.

**4b · Statement:** The same 10% is not the same risk.
**Body:** Each field gets its own tolerance, set by what the difference does downstream. A 10% shortfall on a part with safety stock is an inconvenience. A 10% price rise on a high-value order is a financial problem. A wording change never raises risk.
**Visual:** the reasoning applied to the five real differences from one order in the prototype (`RiskVisual` with `risk.chain` and `risk.examples`): total value +15.4% High, payment terms +15 days High, a new €65 cost Medium, −500 units Medium, German wording Low. Order risk: High. Each row shows its plain reason.
**Sources:** three signal classes (extraction → confidence, deviation → severity, context → supplier history), "uncertainty is itself a risk", per-field tolerance "calibrated to the field's downstream consequence, not to a uniform percentage rule", the 10% example, and the hard override rules (missing mandatory document) `[CHAT]`; "voraussichtlich Kalenderwoche 13", "PREIS", date inferred at low confidence, "3 of 3 price deviations year to date" `[CHAT]`; real order rows and "Wording: never, if the meaning is the same" `[AG-story] riskRows`, `[AG-data] risk`.
**Honesty note shown on the page:** "The logic I proposed, refined with product. Tolerances are levers, not fixed thresholds." `[AG-story] riskNote`, settings "levers of the threshold and tolerance" `[CHAT]`
**Formula, shown (decided 19 Nov):** under the 4a diagram, set small in mono: **Risk = 0.55 × deviation + 0.25 × (1 − confidence) + 0.20 × history**, with one line beneath: "The weights we proposed as a starting point, to be tuned against real orders. Hard stops override the score." Each term is coloured to match its signal in the diagram, so the formula reads as the diagram written down. `[CHAT]`

### Beat 5 · Where people decide
**Statement:** Every recommendation stops at a person.
**Body:** Operations confirms the agent read the document right. The buyer decides on cost, the goods recipient on quantity and dates. The buyer reviews the reply before it goes back. Only a person can accept or reject.
**Visual:** the existing gates embed (`agentic-gates`), Gate 2 of three.
**Sources:** `[AG-pb] beats.users`, `visuals.decision` caption; `[AG-story] agent` ("Hands over to").

### Beat 6 · The value it is designed for (revised 19 Nov)
**Statement:** What the design is built to give back.
**Body:** Confirmation in hours, not weeks: a design aim, not a result yet. Beyond speed, six things change for the people doing the work.
**Visual:** a quiet list of six, each a short line (no numbers, nothing that reads as a measured result):
1. **Attention where it is needed.** The worklist is ordered by order risk, then order value, so the risky confirmations come first. `[AG-story] riskFormula` (Priority)
2. **Reading and comparing done.** No one checks a German PDF against the order line by line. `[brief]`, `[AG-story] asis`
3. **Uncertainty shown, not hidden.** A low-confidence field is flagged next to the source document, so no one acts on a guess. `[AG-story] scenarios[0]`, `[CHAT]`
4. **Each decision with its owner.** Cost to the buyer, quantity and dates to the goods recipient, and nothing sent without a person. `[AG-pb]`
5. **Every round tracked.** A revised confirmation comes back as a new version, so what was agreed in the last round is never lost. `[AG-data]` buyer summary, `[CHAT]` (PO, document and line states)
6. **One trail for every action.** The agent and each person are named on one timeline, so an escalation already carries its reasoning. `[AG-story] patterns 05`, `[CHAT]`
And one for the organisation: **five patterns built to be reused** in other agentic workflows across supply chain. `[AG-story] chapters.patterns`
**Sources:** `[brief]` value list; `[AG-data] outcome` ("from weeks down to hours… the intended improvement, not a measured result").

### Ending
- **Where it stands:** In implementation with a customer. Its KPIs will be tracked once it runs in production. `[brief]`
- **My role:** I framed it as a design pattern and led the agent, the human-in-the-loop model and the risk logic. `[AG-pb] roleNote`, `[AG-story] chapters.risk` ("the part I drove most closely")
- **Watch the film** (exists) · **Read the full case**

### Answered on 19 Nov
- Go deeper on the reasoning: done, from your design conversation `[CHAT]` (beat 4a and 4b).
- Keep "six hand-offs": yes.
- "Hours, not weeks": yes, as an aim, and not the only value (beat 6 now lists six more).
- What reached the customer build: all of it (confidence, severity, supplier history, hard stops, tolerance levers). Beat 4a keeps "how it reasons".
- The weights: show them, labelled as a proposed starting point (beat 4a).
- Auto-approve: only as the next rung (Bounded autonomy) on the ladder in beat 3, nowhere else.
- Examples: quote "voraussichtlich Kalenderwoche 13" and "PREIS" in beat 4a, without the fictional supplier's name.

### Still open for Agentic
1. **The detailed case is now behind the short story.** It shows only the severity logic, not supplier history, hard stops, tolerance levers or the weights. Add them to the risk chapter of `/craft/sap-agentic/details` later? (Out of scope for this job, so not done.)

---

## 2. Enterprise search (`sap-search`)

**Highlight:** the bridge from traditional search to a conversational experience.

**Headline:** Between search and conversation, there is a bridge.
**Supporting line:** People who live with traditional search will not leap to a modern AI assistant overnight. Search can carry them most of the way.
**Still:** `public/images/covers/sap-search-1600.webp`.

**Recurring device (new, drawn once):** a thin horizontal spectrum, "Keywords" on the left, "Conversation" on the right. A lime point moves along it beat by beat, so the reader always sees where on the bridge they are. It is the story's visual spine and replaces the old sticky "Following" bar.

### Beat 1 · Today
**Statement:** Every application had its own search box.
**Body:** Each with its own vocabulary and its own rules. A question that crossed applications, such as a trip, a supplier or a contract, had no place to start. People asked for plain language and got keywords.
**Visual:** the existing "fragmented" diagram (`Fragmented` in `SearchDiagrams.tsx`, added to the embeds). Spectrum point at the far left.
**Sources:** `[SE-pb] beats.challenge`; pain points "Lack of NLP integration", "Lack of search alternate modes" `[SE-data] challenges`.

### Beat 2 · The gap
**Statement:** It is not keywords or conversation. It is not 0 or 1.
**Body:** A modern AI assistant exists. But people on established systems still live with traditional search and its limits. Asking them to jump straight to a conversation is a leap. The way across is a middle ground.
**Visual:** the spectrum on its own, large, with the gap between the two ends drawn open.
**Sources:** `[brief]`, kept as framing (decided 19 Nov: research showed it depended on the product or application, so the page makes no claim about how often people search). The detailed case lists "Conversational search agent" as one of the ten capabilities `[SE-cap]`.

### Beat 3 · ★ Nuance: the middle ground
**Statement:** Search becomes the middle ground.
**Body:** One field in the shell bar of every application. Ask in a sentence, the way you would ask a colleague. Get results from every application and an answer that names its sources. Then act, right from search.
**Visual:** the live `search-global` embed ("Try it", sample data). Spectrum point at the middle.
**Sources:** `[SE-pb] dek`, `beats.solution`; pillar "User friendly" `[SE-page] PILLARS`.

### Beat 4 · An answer you can check
**Statement:** An AI answer is only useful if you can check it.
**Body:** The summary stays collapsed, so the results stay in view. Every insight links to the results that produced it. That is what makes people willing to trust a sentence instead of a list.
**Visual:** the `search-summary` embed.
**Sources:** `[SE-pb] decision`. The last sentence is an interpretation of why it matters: confirm it.

### Beat 5 · Get things done from search
**Statement:** Search ends where the work begins.
**Body:** Approve or reject a requisition right on the result row. Or open the application with the question and the choice carried across, so nobody has to guess where to go next.
**Visual:** `public/images/case-studies/sap-search/row-actions.webp` (Approve and Reject become Approved).
**Sources:** `[SE-data] transition.intro`; `[SE-page]` row-actions caption; `[SE-pb] beats.solution`.

### Beat 6 · Where it leads next (softened 19 Nov)
**Statement:** The next step is conversation.
**Body:** One journey already shows the way: someone asks about the education policy, reads the results and wants to know more, and the result offers to continue in the AI assistant. How far that hand-over goes is what is evolving now.
**Visual:** the spectrum point moves past the middle toward "Conversation" but stops short of the end, with that one hand-off drawn as a result row opening a chat thread (new drawing, sample text). The unreached end stays faint.
**Sources:** `[SE-data] transition.items[1]`; the hand-over left as an open question `[SE-data] vision.why`; status `[brief]`.

### Ending
- **Where it stands:** Now evolving into a more conversational experience. `[brief]`
- **Delivered:** a validated direction, ten capability recommendations, a pattern library and a live prototype covering six journeys. `[SE-pb] beats.impact`
- **My role:** Design Lead for the search vision. I led eight designers in three workstreams, alongside engineering and product. `[SE-pb] roleNote`, `led`
- **Watch the film** (exists) · **Read the full case**

### Answered for Search (19 Nov)
- Name Joule: no. The page says "a modern AI assistant".
- The hand-over: soften. Beat 6 is now "where it leads next", with one designed journey and the rest evolving.
- Beat 2: framing, not a finding. Research said it depended on the product or application, so beat 2 no longer says "every day".

---

## 3. HR suite (`engaze`)

**Highlight:** conversational design as the core of an AI product, and assistants with the right personality and tone of voice.

**Headline:** In an AI product, the conversation is the design.
**Supporting line:** How an HR assistant learned to read what people mean, behave well beyond the happy path, and sound like one character every time.
**Still:** `public/images/covers/engaze-1600.webp`.

### Beat 1 · One real request
**Statement:** "I need a sick leave for today."
**Body:** Esha types one sentence. She names no module, no leave type, no form. Everything the product does next starts from what she meant, not what she clicked.
**Visual:** the sentence alone, set as a single chat bubble, very large (new drawing, the exact line from the film).
**Sources:** `[EN-film]` (`msg = 'I need a sick leave for today.'`); Esha `[EN-data] roles.employee`.

### Beat 2 · ★ Nuance: reading intent
**Statement:** Behind one sentence, four things to work out.
**Body:** That it is sick leave, and for today. How many days she has left. What the policy allows. Who needs to know. The companion works it out, then asks before it applies anything.
**Visual:** new diagram: the sentence on the left, four inferred facts on the right, then the reply: "Sorry you're unwell, Esha. I've got sick leave ready for today. Have a look before I apply it." Option B: the existing 16-second Engaze loop (`src/film/loops/engaze.tsx`), which already shows this, played once inside the beat.
**Sources:** `[EN-film]` loop (balance 5 of 12, the reply line, "I can apply it and tell Manoj and your team. Shall I?"); the "checks her leave balance, reads the policy, finds who to tell" chapter in the first proposal. Confirmed 19 Nov: the shipped companion did this, so the beat says "works it out", not "designed to".

### Beat 3 · What a prompt really asks
**Statement:** Not every question wants the same kind of answer.
**Body:** "My leave balance" wants a fact. "Apply for leave" wants an action. "Show my CTC breakup" wants a chart. "Write a feedback" wants a draft. "Old versus new tax regime for me" wants an analysis. Each got its own response pattern.
**Visual:** five chips set large, each with its example.
**Sources:** `[EN-data] ex.steps` "Five kinds of question".

### Beat 4 · Beyond the happy path
**Statement:** Flows cover the happy path. Principles cover the rest.
**Body:** The generative layer handles everything a flow never wrote down. So we stopped writing more flows and wrote five principles that teach the system how to behave in any situation.
**Visual:** the five principles as large chips, each with its one-line meaning: Trust, sources on every answer · Guidance, never a dead end · Discoverability, capabilities in context · Cognitive simplicity, one decision per screen · Continuity, one thread, every device.
**Sources:** `[EN-pb] decision`; one-line meanings `[EN-film] scenesEngaze ps`.

### Beat 5 · Second highlight: personality and tone of voice
**Statement:** An assistant should sound like one character, from the first turn to the thousandth.
**Body:** We built a way to give assistants the right personality. Choose two brand archetypes. Adopt the traits that come with them. Define the tone of voice. Capture it all in a persona template before writing any dialog.
**Visual:** one example persona for an employee's assistant, built with the method on the page and labelled "An example, built with the method". Two archetype cards redrawn in the site style, name and traits as chips, no motto: **the Caregiver** (warm, caring, reassuring, supportive) and **the Sage** (knowledgeable, clear, calm, objective). Beneath them, the tone of voice it produces, shown with the companion's own reply: "Sorry you're unwell, Esha. Rest up." No logos, no photos of people, no mood board, no tool name. Then a link: "See the persona template" to `/craft/engaze/details#persona-template`.
**Sources:** `[brief]` (archetypes, Caregiver traits, the method); persona template `[EN-data] personaTemplate`, "A persona is what keeps an assistant consistent from the first turn to the thousandth" (`personaTemplate.intro`); the reply line `[EN-film]`. The Sage pairing and its four traits are an example built for this page, not Engaze's actual archetypes; approved 19 Nov.

### Beat 6 · Where it lives
**Statement:** One tap away, beside the portal people already use.
**Body:** The employee module shipped as a companion inside the workplace portal, so nobody had to learn a new place to go. In usability testing, it scored 90% satisfaction.
**Visual:** `public/images/short/engaze-portal.webp` (checked: no client hints).
**Sources:** `[EN-data] ex.steps` "In context"; 90% per `[brief]` (usability testing; the only mention on this page). The detailed case keeps its CSAT label (decided 19 Nov).

### Ending
- **Where it stands:** The employee module shipped as a companion beside the portal people already use. `[brief]`
- **My role:** I led a design team of 5 to 6, inside a larger team where the rest of the people came from other disciplines. `[EN-pb] led`
- **Watch the film** (exists) · **Read the full case**

### Answered for the HR suite (19 Nov)
- Archetypes: Engaze used different ones. The page shows an example pair built with the method for an employee's assistant (Caregiver and Sage), labelled as an example.
- Mottos: not available, so the cards show name and traits only.
- 90%: labelled as usability testing here; the detailed case is not relabelled.
- Beat 2: the shipped companion did this.
- Mood board: left out.
- The example persona: keep the Caregiver and the Sage, with the Sage's traits as drafted.

---

## 4. Travel booking (`airline-app`)

**Highlight:** designing at scale.

Revised 19 Nov from your Figma case study deck (`CaseStudy`, page "Case Study 2023", node 747:48567), cited as `[FIG]` with the slide name. Visual style from the UI collage (node 2007:3332), cited as `[FIG-UI]`.

**Headline:** At this scale, keeping it one experience is the design problem.
**Supporting line:** A mobile app and responsive web for a carrier with 30M+ guests a year, with use cases across the whole trip, designed by many teams at once.
**Still:** a **redrawn UI collage** in the exact style of `[FIG-UI]`: a wide masonry of borderless phone screens in staggered columns, each column offset vertically, light and dark screens alternating, no device frames, on a flat ground. Screens shown: sign in with Face ID, home with the upcoming trip card, Where to?, Book a flight, flight results, fares, seat map, passenger details, add-ons, review and pay, trip confirmed, boarding pass. Neutral content only: no carrier name or logo, no loyalty name, made-up codes (AAA, ZZZ), a neutral currency, fictional names.

### How the screens will be built (your instruction, 19 Nov)
The redrawn screens must look, feel and behave exactly like the Figma designs, at component level. Before building, I read each screen's design context from Figma (`get_design_context` on the collage frames) and rebuild its components to spec: status bar, headers and back button, segmented trip type (Round trip, One way, Multi city), the From and To cards with the swap button, date and passenger fields, toggles, primary buttons, fare cards with their tag, the seat map with its legend, the boarding pass with QR, the bottom tab bar. Same spacing, radii, type sizes and weights, colour roles, states (selected, disabled, error) and interactions (tabs switch, toggles move, seats select). Only the brand, names, prices and codes change. Screens live in `src/components/case/` as raw-value components (the token rule does not apply to drawn UIs, as with the search screens).

**Colour (decided 19 Nov):** keep the green from the Figma screens, exactly as designed. Everything else that could identify the client (name, logo, loyalty programme, airport codes, currency) is still neutralised.

### Beat 1 · The size of it
**Statement:** 30M+ guests a year. 95+ destinations. One experience in their pocket.
**Body:** Part of a five-year digital transformation. The business goal was to grow digital bookings from a $2M channel into a $100M revenue stream. The guest and destination figures are public, for scale, not results of this work.
**Visual:** the three figures set large.
**Sources:** `[AI-data]` (30M+, 95+, "Public figures for scale", $2M to $100M); "5-year digital transformation" `[FIG]` slides 03, 124.

### Beat 2 · ★ Nuance: the complexity of the journeys
**Statement:** A trip is not one flow. It is a hundred use cases, end to end.
**Body:** Mixed cabins, an infant on a lap, multi-city trips, branded fares, a booking on hold, three passengers with missing passport details, a transit visa, a group check-in, a delay that needs rebooking. Each one had to feel like the same app.
**Visual:** the whole trip as one line across nine stages (discovery, booking, checkout, pre-trip, pre-flight, in-flight, post-flight, on trip, post trip), with the use cases as points along it, dense enough to feel like the real backlog. Neutral names only.
**Sources:** use cases from the feature backlog slide `[FIG]` 165 (Mix Cabin, Infant on seat, Multi-Destination Booking, Branded Fares, eVisa and Transit visa, Group check-in, Flight disruption management, Add/update passenger info, Complete missing APIS details); booking on hold and missing passenger details from the screens `[AI-data]`; journey stages `[AI-data]`. Client-specific items in that backlog (the loyalty programme, local payment and government integrations, pilgrimage bookings) are left out.

### Beat 3 · What scale does to a product
**Statement:** Built by function, it fell apart: 183 issues on one homepage.
**Body:** Functional teams each built on their own, and the whole never added up. The homepage alone had 183 issues, 21 of them major, against a benchmark of 54 competitors. A service problem, not a UI problem.
**Visual:** the three numbers as a quiet figure. The original audit image shows the client's logo and name, so it is not used.
**Sources:** `[AI-data]`; "the current state of affairs wasn't great… inconsistent use of UI components and brand assets" `[FIG]` 05.

### Beat 4 · How it stayed coherent
**Statement:** Five journeys, five pods, one design language.
**Body:** Each pod owned one journey end to end, with design, product and engineering together. A design language of 400+ components kept web and app consistent across 6,000+ screens, while designers worked from eight cities in four time zones.
**Visual:** the pod model (`airline-04`, clean), redrawn in the site's tokens, with a small row of three facts beneath: 400+ components · 6,000+ screens · 4 time zones.
**Sources:** pods `[AI-data]`; "Established DLS with over 400+ Web & App atomic components" `[FIG]` Final frame 2022; "6,000+ screens delivered so far", "4 different time zones", eight cities `[FIG]` 172.

### Beat 5 · What it achieved
**Statement:** Check-in, from nine steps to two.
**Body:** Measured after release. Booking a flight in 4 minutes for returning customers. 30% less effort to choose a seat. An eVisa in 3 steps. App store rating up from about 3 to 4.7.
**Visual:** four figures large: 9 → 2 steps to check in · 4 min to book · 30% less effort to pick a seat · 4.7 app rating.
**Sources:** "Check in has gone from 9 steps to 2 steps", "Book a flight in just 4 mins for returning customers", "30% less effort required to select a seat", "Apply for an eVisa in just 3 steps" `[FIG]` Final frame 2022; "Our app has grown from 2.5-3 to 4.7 for both the iOS and Android" `[FIG]` 111. Confirmed 19 Nov: the deck's numbers are right.

### Ending
- **The result:** The programme met its goal of growing digital bookings from $2M to $100M, and the partnership continues. A programme result, delivered together with product, engineering and the client's teams. `[brief]`
- **My role:** I led experience strategy across 11+ designers in five journey pods, and the whole mobile experience with an 8 to 9 person team for almost a year. `[AI-data]` (the deck's "9 months of work" `[FIG]` 172 matches)
- No film · **Read the full case**

### Answered from Figma (19 Nov)
- **The still:** redrawn as a UI collage in the `[FIG-UI]` style, screens rebuilt component by component from Figma.
- **The programme diagram:** its teams add up to 32 plus the DesignOps leads, which matches the deck's "36 design team members" `[FIG]` 172. So "11+" is the part you led, inside a 36-person design team. I use the pod model, not the programme diagram, so the page never contrasts the two numbers.
- **The Accenture ME line:** not in the deck. It stays out of this story.
- **The collage colour:** keep the green, as designed.
- **Team size:** only "11+ designers" on the page; the 36-person team is not mentioned.
- **The numbers:** the deck is right. +92% engagement and 50× add-on sales are dropped from this story. Beat 5 uses the deck's figures; the deck's engagement figures (+13% engagement, +6% returning users, +38% visits, +16% bookings) are available if a beat needs them. The detailed case (`src/data/airline.ts`, `work.ts`), the current short story (`playbacks.ts`) and the first proposal (`stories.ts`) still carry +92% and 50×: see question 3.

### Still open for Travel
1. **Existing pages: partly fixed on 19 Nov (not committed).** You confirmed +92% and 50× were goals, not results. They are replaced everywhere with the deck's measured figures (9 → 2 check-in, 4 min to book for returning customers, 30% less effort to pick a seat, +13% engagement, +16% bookings, +38% visits), measured across the releases after launch. The audit image (`airline-03`) has the client's logo, name and city names masked. The old-site image (`airline-11`, the brand on every surface and your name in the app) is removed from the detailed page. **Still carrying client hints, to be swapped for the redrawn collage screens during the build:** `airline-13`, `airline-14`, `airline-15`, the hero and the cover (airport codes, loyalty name, SAR prices), and `airline-06` (home cities).

---


## All decisions in one list

1. **Agentic:** update the detailed case later.
2. **Search:** all answered.
3. **HR suite:** all answered.
4. **Travel:** remaining client-hint screen images, swapped during the build.
5. **All four:** every statement and body above is in your voice and needs your read.

Once you approve (with edits), I build all four at `/craft/<id>/story`, check them at 1440 and 390, and show you screenshots before anything is staged.
