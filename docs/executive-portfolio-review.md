# Executive Portfolio Review: Amit Kumar Tiwari
**Panel:** VP Design, Google · Head of Design, Apple · CDO, IDEO · Executive Design Director, Microsoft · Global Design Partner, Fjord

**Method:** Full codebase review. Every page. Every data file. Every word of copy.

**Date:** August 2025

---

## PRELIMINARY NOTE

Before we begin page-by-page: this portfolio was ported from Framer. All case study images are hosted on `framerusercontent.com` — an external CDN tied to your old Framer project. If that project is inactive or deleted, every image in every case study is broken. If a hiring manager opens this on a slow network, they see nothing. This is the single highest-risk infrastructure problem on the site. Fix it before anything else.

---

## PAGE 1: HOME

### 1. First Impression — Score: 5/10

The aesthetic registers in the right direction: black, editorial, serious. There is craft here. But in the first 10 seconds, a senior hiring manager reads:

> "Designing for Humans, Systems and Everything Between."

This is the design portfolio equivalent of a LinkedIn headline that says "Passionate problem solver." It says nothing. It differentiates nobody. It could be on the homepage of any one of ten thousand UX portfolios launched this year.

The rotating title — *Experience Strategist / Design Leader / Career Growth Coach / Product Designer / Conversational AI Designer* — is the single most damaging element on the entire site. Five rotating identities tell an executive one thing: **you don't know who you are**. At Principal / Director / VP level, positioning is everything. Versatility is not communicated by a spinning label. It is communicated by a body of work. The rotating title signals diffusion of focus, not range of capability.

Curiosity: moderate. The photo on stage is good — it signals someone who speaks, who leads, who commands rooms. But it is immediately undermined by the generic headline above it.

Differentiation: near zero at first impression.

---

### 2. Narrative

The page structure is: Hero → Impact metrics → About paragraph → 3 "Recent Milestones."

The story does not flow. It fragments. You go from a dramatic full-screen hero to a grid of numbers to a block of biography text to three teasers. There is no single thread pulling you through. Each section feels like it was designed in isolation.

The About copy is competent but passive: *"Amit has shaped design for 50+ global brands across startups and large enterprises."* This is résumé language, not narrative. A director-level portfolio should make you feel something. This makes you take notes.

The "Recent Milestones" section at the bottom is particularly weak. A full-day workshop, an article about a concept, and a case study headline — these are not milestones. They are content teasers. They do not build a story. They scatter attention.

---

### 3. Content Review

**Hero headline** — Remove. Rewrite from scratch. The headline should be your irreducible professional claim. Not a description. A claim.

**Rotating title** — Remove entirely. Replace with a single ownable title. If "Dual Fluency" is the idea that differentiates you — and it is — make that your identity signal here.

**Impact Snapshot section** — This section is doing serious damage. Metric by metric:

- *56 Success Stories* — What is a success story? Projects? Clients? Deliverables? Undefined.
- *25 Happy Customers* — Twenty-five. For 16 years of work at SAP, Accenture, HPE. This makes you sound like a boutique freelancer, not someone who shipped products to 300M+ users.
- *254 Months of Rigour* — 254 months is 21.2 years. You claim 16 years of experience. This number is mathematically inconsistent with your own portfolio and will be caught by any detail-oriented reader. It creates doubt about credibility on everything else.
- *17 Industries* — Plausible. Mildly interesting.
- *8+ Talks & Workshops* — For someone positioning at Director / VP level, 8 is low. Displaying it as a metric signals you think it is impressive. People who have given 50+ talks don't count from 8.
- *25+ Coach Stories* — Mentorship count used as a metric. Weak.
- *350+ Community Impact* — 350+ what? People? Events? Posts? Means nothing without a unit.

The entire Impact section needs to be rethought. Numbers like: *300M+ users reached through shipped SAP products. $5M in documented operational savings. 90% CSAT vs <60% industry baseline.* These are executive-grade metrics. Bury the count-up animation. Show the business stakes.

**About paragraph** — Move to About page. It belongs there, not interrupting the home page flow.

**Recent Milestones** — Remove the section entirely. Replace with a single, strong editorial statement about your current focus and a single CTA to the work.

---

### 4. UX Review

The navigation has 7 items: Home, Craft, Leadership, Community, Reflections, Resources, About. Seven navigation items is a decision fatigue problem. At Principal/Director level, your portfolio should have maximum 4–5 top-level destinations. The current nav forces a visitor to make 7 choices before they understand who you are.

The Craft dropdown (case studies on hover) is a good interaction — but most visitors won't discover it. It is hidden knowledge.

The "Get in touch →" CTA in the hero links to `/contact` which routes to `/about`. This is a broken user flow. A hiring manager who clicks "Get in touch" arrives at a biography page. There is no visible contact information above the fold on that page. This is a conversion failure.

The `ScrollProgressLine` at 25% opacity is invisible to most visitors. Either make it visible or remove it — a half-implemented detail signals incomplete thinking.

---

### 5. Visual Design Review

The typographic system is thoughtful: Inter at light weights, generous letter-spacing on display text, tight tracking on labels. The color system (warm black `#0C0C0B`, warm white `#F5F2ED`) is correct for the editorial register you are aiming for.

However: Inter is the single most overused typeface in design portfolios in 2024–2025. It is the design community's equivalent of Helvetica — everywhere, therefore invisible. A director-level portfolio for someone who thinks about design systems, editorial design, and thought leadership should have a more considered typographic identity. One serif for editorial moments, one grotesque for UI — the contrast creates visual hierarchy and signals typographic sophistication.

The grain overlay and sweep lines are subtle texture elements that work, but they are barely perceptible. If they don't register consciously, they add render cost without visual return.

The hero photo in grayscale with heavy gradient overlays reads as "contemporary design portfolio aesthetic," which is to say — it reads like fifty other portfolios. The photo itself (on stage, commanding a room) is the differentiating element. The treatment buries it.

---

### 6. Interaction Review

The page transition (opacity + y:20 → 0, 0.45s) is clean. The count-up on Impact metrics is appropriate. The parallax on the hero photo is subtle enough to not be distracting.

The custom cursor dot (6px dot + 28px ring) is a classic "this is a design portfolio" signal. It can backfire with non-designer visitors (executive stakeholders, recruiters, founders) who find it distracting or disorienting. It is a signal aimed at impressing designers, not hiring managers.

---

### 7. Design Leadership Signals

The home page communicates: someone who does design. It does not communicate: someone who leads design organizations, influences product strategy, or has a point of view on where design is going.

The stat about "250+ SAP Design Hub India" is buried in the Leadership section, not the home page. If you built a 250+ person community inside a Fortune 500, that is an *opening statement*, not a footnote.

---

### 8. Emotional Review

Mild curiosity. Mild respect. No inspiration. No distinctiveness. The home page creates the impression of competence without creating the impression of vision.

---

### 9. Executive Hiring Perspective

A hiring manager opening this homepage would feel: *promising, but not yet convinced.* The metrics confuse rather than impress. The headline doesn't land. The rotating title creates doubt. They would scroll to the work but with lowered expectations.

Questions remaining: Who is this person specifically? What is their signature idea? What do they believe that others don't?

---

### 10. Missed Opportunities

- The homepage never mentions Dual Fluency — the most ownable concept on the site — even once.
- There is no single sentence that states a point of view on design's future.
- The "on stage" photo communicates "speaker and thought leader" but no talk titles, no venues, no recordings are surfaced on this page.
- The hero could have been a statement of philosophy, not a description of services.

---

## PAGE 2: CRAFT

### 1. First Impression — Score: 7/10

"Work that matters at scale." — Better. This is a real claim. It implies stakes, implies scope, implies that small problems were not the priority.

The Philosophy section at the top of Craft is the best writing on the entire website:

> *"At this level of maturity, the prototype is the argument. The decision is the artefact."*

This is a director-level sentence. It communicates maturity. It differentiates. It should be on the homepage.

---

### 2. Narrative

The Craft page is attempting to do too many things simultaneously:

1. A philosophy statement
2. Four "Design Decisions – Micro Stories"
3. A case study list (WorksBento)
4. An accordion view (StrategicWork)

Items 3 and 4 appear to show the same six case studies in two different formats on the same page. This is redundant. Choose one. The accordion (StrategicWork) with expandable Challenge/Approach/Outcome is weaker — it forces the visitor to do work. The list with thumbnails (WorksBento) is the correct primary treatment.

---

### 3. Content Review

**Philosophy section** — Keep. Elevate. Move the closing line ("the prototype is the argument") to a more prominent position.

**Design Decisions – Micro Stories** — This is the most sophisticated section on the entire site. Four sharp, principled reflections on specific design decisions. These are NOT case study summaries. They are evidence of systems thinking. The Engaze story and the Agentic AI story are genuinely director-level thinking on display.

However: these micro-stories are buried mid-page with no visual hierarchy to make them stand out. They should be featured, not listed.

**Critical gap:** Where are the images? The case studies reference images from framerusercontent.com. If these don't load, the case studies are walls of text. A portfolio where the "Visual Evidence" section is blank is not a portfolio — it is a document.

---

### 4. Case Study Deep Dive

**Case Study 01 — Engaze**

The 90% CSAT vs. <60% industry baseline is the strongest single data point. Lead with it harder. The "five principles instead of flows" insight is genuinely good strategic thinking — but the case study buries it.

The testimonial from a Managing Director at Accenture Operations is strong. It should be more prominent.

Missing: What did the actual conversations look like? What principles did you almost get wrong? What did the client push back on?

**Case Study 02 — Saudia**

$2M → $100M revenue mandate is the most dramatic framing in the portfolio. "50× add-on sales" is extraordinary. If true and verifiable, this case study should be the opening case study — not second.

The pod structure insight (designers own journeys, not features) is a real organizational design contribution. This deserves more development.

Missing: The Saudia brand is recognizable globally. You are not using the name recognition. Why?

**Case Study 03 — dNetWorX**

$5M operational savings is concrete. The progressive disclosure narrative is a classic enterprise UX problem well-described. But "dNetWorX" is an unrecognizable brand name — context is missing. What industry? What kind of platform?

**Case Study 04 — SAP AI Search**

"300M+ users" is buried in a data field. This should be the headline of the case study. You designed search for more users than use most countries' entire internet infrastructure. Lead with that.

Missing: No outcome metrics beyond "task completion rates improved." For a 300M+ user platform, you need a number.

**Case Study 05 — SAP Sign-In**

The weakest case study. Authentication UX at enterprise scale is genuinely difficult work — but the outcome metrics are weak compared to the other cases. Consider whether this earns its place.

**Case Study 06 — Agentic AI Order Confirmation**

The reframe ("the UI is the mechanism for humans to trust and oversee the agent") is excellent. The 3-tier communication hierarchy is a sophisticated design system answer to a hard problem.

Missing: This is ongoing work ("2024–Ongoing") with no interim results. Ongoing work with no data reads as unfinished.

---

### 7. Design Leadership Signals

The Craft page has strong signals: systems thinking, business understanding, and organizational thinking. But leadership is invisible. Who was on the team? What did you direct vs. execute? At Director level, the work is 40% leading designers, 60% strategy. How many designers did these projects involve?

---

## PAGE 3: LEADERSHIP

### 1. First Impression — Score: 7.5/10

"Design is a leadership practice." — Strong, ownable, direct. This is a real thesis. This headline is better than the homepage headline.

---

### 2. Content Review

**Leadership Stories** — This is the strongest content section on the entire website. Full stop.

The four stories — the banking transformation, the HPE team-building failure, the mentee who surpassed the mentor, the SAP Design Hub — are unusually honest. The HPE story ("I had a resignation letter on my desk") is exactly the kind of candid self-reflection that distinguishes executive-level candidates. Most portfolios at this level are trophy cases. This section breaks that pattern.

The lessons are sharp:
- *"Design influence is earned through translation, not craft."*
- *"You can ship a great product and still fail at leadership if the people don't feel seen."*
- *"Mentorship succeeds when the mentee no longer needs you in that role."*
- *"Communities reveal what organizations suppress. Build both."*

These are memorable. These are the sentences that someone quotes in a hiring committee meeting.

However: These stories are typed into a section of a portfolio that most visitors will never reach. They deserve to be published as essays, as LinkedIn articles, as conference talks. They are wasted here.

**Leadership Pillars section** — "Dual Fluency / Studio Operations / Strategic Influence / Mentorship" — right four pillars. But the descriptions are generic. The evidence is in the stories above. These two sections need to be architecturally linked.

**Journey section** — Duplicates the Journey section on the About page. Remove from one.

**LeadershipInitiatives section** — Also appears on the Community page. Content duplication across pages fragments the experience and makes the site feel assembled, not designed.

**Leadership Articles** — The Vedic Secrets article is the most differentiated piece of writing in this portfolio. It is the piece that no one else in your competitive set would write. It should be featured, not in a uniform grid.

---

### 8. Emotional Review

This page creates genuine respect and curiosity. The leadership stories land emotionally. This is the page where the site comes alive. The problem is structural: it is behind a navigation item that most recruiters and executive hiring managers will not click on their first visit. The best content is the hardest to find.

---

## PAGE 4: COMMUNITY

### 1. First Impression — Score: 5/10

"Building the design culture we want to work in." — Good thesis. Implies initiative, implies dissatisfaction with the status quo, implies a builder.

But the page immediately shows a grid of 6 initiatives that already appeared on the Leadership page. A visitor who has been to Leadership feels they have seen this already.

---

### 3. Content Review

The six initiatives are real. Building a 250+ person internal design community at SAP India is a genuine organizational leadership achievement. Co-founding UX2DAY is a genuine contribution to the design community. These deserve more than a card in a grid.

Missing entirely:
- Photos from events. Not a single event photo on this page.
- Video. Not a single conference talk recording linked.
- Attendance numbers beyond the 250+ SAP Hub figure.
- Names of co-conspirators, collaborators, or people who helped build these communities.
- The *impact* of these communities on participants' careers.

You claim "community building" as a core leadership signal but provide no evidence beyond a list. The Community page should feel like a movement. It currently feels like a résumé entry.

---

## PAGE 5: REFLECTIONS

### 1. First Impression — Score: 6/10

"Ideas at the edge of design thinking." — Fine. A bit self-congratulatory on the "edge" claim, but not offensive.

---

### 3. Content Review

Six reflection cards. The category filters are good information architecture.

The content range is wide but the depth signal is weak. "2025 Design Trends Every UX Designer Needs to Know" is content marketing. It belongs on a blog, not a portfolio for a Director candidate.

The Vedic series is different. It is original intellectual territory. Five articles distilling Vedic philosophy for designers — this is unusual, this is memorable, this is differentiating. It should not be a card in a grid of six. It should be a featured anchor of this page.

Missing: No dates on the cards. Freshness matters enormously for thought leadership positioning. If the most recent piece is from May 2024, that is over a year old. A director candidate's reflections page should show consistent, recent publishing.

---

## PAGE 6: RESOURCES

### 1. First Impression — Score: 3/10

"A mentor's toolkit. A knowledge vault." — The framing is good. The execution is a disaster. Four of five resources are "coming soon."

To be direct: if you are applying for a Principal Designer, Head of Design, or Design Director role, you cannot have a "Resources" page where the primary CTA on four of five items is "coming soon." This communicates: *I announced things I hadn't built yet.* It communicates unfinished thinking, optimistic positioning ahead of actual delivery, and lack of attention to the visitor experience. Every executive who lands here will draw exactly these conclusions.

Options:
1. Remove the page entirely until the resources are real.
2. Remove the "coming soon" items and feature only what exists (reading list + kick-off questionnaire).
3. Publish the resources, even in rough form.

Option 1 is safest. Option 3 is most valuable.

The reading list itself is excellent — Julie Zhuo, Marty Cagan, Don Norman, John Maeda. The curation shows taste and range. But it is hidden behind an expandable button. Surface it. It is one of the best things on the site.

---

## PAGE 7: ABOUT

### 1. First Impression — Score: 6/10

"16+ years. One throughline." — Strong title. But the page never tells you what the throughline is. The subtitle says *"I see design as a force of change — one that can spark growth, empower people, and reimagine futures."* This is identical to the elevator pitch of every design leader alive. The throughline should be specific to you.

---

### 3. Content Review

**"What I drive" section (5 items):** Written in the third person when everything else on the page is first person. The inconsistency is jarring.

**Timeline inconsistency:** The About page timeline starts from the present and goes backward. The Journey component starts from 2009 and goes forward. These two timelines tell different stories of the same career. One of them needs to go.

**Nine-year gap:** The About page starts the career at 2018 (Accenture) while the Journey starts at 2009 (Infosys UX Academy). Nine years simply disappear in the About page view. Nine years is not a gap — it is the foundation. If you claim 16 years, show all 16.

**Contact section on About page:** The contact info is reachable but architecturally awkward. If someone wants to hire you for a Director role, they should not have to navigate through biography to find an email address.

---

## HOLISTIC REVIEW

### What this portfolio is REALLY saying

This portfolio says: *I am a serious designer with real experience, genuine leadership capability, and strong opinions — but I am not yet sure how to present myself at the executive level.*

The craft is real. The thinking is real. The leadership stories prove genuine maturity and self-awareness. The AI positioning is legitimate, not borrowed. The Dual Fluency concept is ownable.

But the portfolio architecture works against you at every turn. The best content (leadership stories, Vedic article, Craft philosophy) is buried. The most damaging elements (rotating title, 254 Months of Rigour, four "coming soon" resources) are prominent.

### What it unintentionally communicates

1. **Diffusion of identity.** Five rotating titles = trying to appeal to everyone = appealing to no one.
2. **Quantification anxiety.** The Impact metrics section reveals a desire to impress with numbers but the numbers chosen reveal a freelancer mentality, not an enterprise leader's mentality.
3. **Ambition outrunning execution.** The Resources page announces four toolkits that don't exist.
4. **Platform over substance.** A lot of polish on the container, not enough on the content.

### What people will remember after one week

The leadership stories. Specifically: the banking boardroom story and the mentee-who-became-the-mirror story. These are the only things on this site that are genuinely memorable.

### Would we shortlist this person?

Three of five panelists: Yes, conditionally. The case studies need images. The Resources page needs to be fixed. The metrics need to be replaced.

Two of five: Not yet. The rotating title and diffusion of positioning would send this to a second review pile.

### Would we hire this person as Design Director?

Based on the portfolio alone: uncertain. The leadership stories suggest someone who has learned from failure. The AI positioning is credible, not opportunistic. The Dual Fluency concept shows original intellectual contribution.

But: a Design Director candidate needs to brief their portfolio pitch in thirty seconds with a single clear identity. This portfolio cannot do that yet.

### Would we invite this person to speak at a conference?

Yes. The Vedic × Design angle is genuinely unusual. The Dual Fluency workshop (sold out at DesignUp) is evidence. The leadership stories would make a compelling talk.

### Would we trust this person to lead a 50+ designer organization?

The HPE team-building failure story suggests someone who has made that mistake and learned from it. The SAP Design Hub story demonstrates building culture at scale. The SAP suite-wide AI work demonstrates systems thinking.

The concern is not capability. The concern is executive presence and positioning confidence. The portfolio currently projects slightly below the level it is claiming.

---

## OVERALL SCORECARD

| Dimension | Score |
|---|---|
| Storytelling | 6/10 |
| Visual Design | 7/10 |
| UX / Information Architecture | 5/10 |
| Design Maturity | 7.5/10 |
| Leadership Presence | 7/10 |
| Business Thinking | 7/10 |
| Originality | 6.5/10 |
| Craft | 7/10 |
| Interaction Design | 6.5/10 |
| Thought Leadership | 6/10 |
| Community Presence | 5.5/10 |
| AI Positioning | 7.5/10 |
| **Overall Portfolio** | **6.5/10** |

**Overall Recommendation:** Revise before sharing with senior hiring managers. The substance is there. The architecture is working against it.
