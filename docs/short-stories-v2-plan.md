# Short stories v2: plan and prompt for Claude Code

Written 18 Nov 2026 from Amit's brief. Section A is the plan for Amit to read. Section B is the prompt to paste into Claude Code, opened in the `amit2.1` repo on branch `staging`.

---

## A. The plan

### What is wrong today
The current short stories (`/craft/<id>`) and the first proposal (`/craft/<id>/story`, `src/pages/StoryPage.tsx`, `src/data/stories.ts`) try to say everything at once. The first screen alone has a headline, three crux columns, a moving preview and a block of metadata, so the reader does not know where to look and the point of each case gets lost. Every case also tells the same kind of story (problem, users, solution, decision, impact), so the nuance that makes each project worth reading never comes through.

### The new idea: each short story argues one highlight
A short story is not a summary of the project. It makes one point, and the project is the evidence for that point.

| Case | The highlight (what the story argues) | The story shape |
|---|---|---|
| **Supplier order confirmations** (`sap-agentic`) | **How to build an agentic solution that is genuinely meaningful.** Most teams build agents because they can, not because the business needs one. Start from the business problem, find where judgement is needed, map it to an agentic pattern, and show the value. The nuance: the agent is not a parser (parsers existed before) and not just a recommender. The hard part is designing the non-deterministic logic behind a recommendation people can trust. | A method, told through one example. Business problem, then where judgement sits, then the pattern, then the non-deterministic core, then where people decide, then the value. |
| **Enterprise search** (`sap-search`) | **The bridge from traditional search to a conversational experience.** Customers on established systems live with traditional search and its limits, while a modern AI assistant exists. It is not 0 or 1. Search becomes the middle ground: it understands plain language, answers with sources, and lets people get things done right from search, which makes the move to conversation smoother. | A transition, told as a spectrum: where people are today, the gap, the middle ground search creates, and where it leads. |
| **HR suite** (`engaze`) | **Conversational design as the core of an AI product.** The conversation was the experience. Anticipating needs from intent, reading what a prompt really asks, and behaving consistently beyond the happy path. | A conversation, taken apart: one real request, what the system infers, how it decides what to do, and the principles that make it behave. |
| **Travel booking** (`airline-app`) | **Designing at scale.** A consumer mobile app for millions of guests, many destinations, and a long list of complex use cases across the whole trip, delivered by many designers at once. | Scale, made visible: the size of the problem, the complexity of the journeys, how the work was organised to stay coherent, and what it achieved. |

### The new format: one idea per screen
- **First screen:** the highlight as one clear claim (the headline), one supporting line, one still image. Nothing else. No crux columns, no moving preview at the top, no metadata block, no tags.
- **Then four to six beats**, each one screen tall on desktop: a short statement set large, at most about 40 words beneath it, and one visual. A beat is either a step in the argument or a piece of evidence.
- **One beat is the nuance**, told largest: for Agentic the non-deterministic core, for Search the middle ground, for the HR suite inference from intent, for Travel the complexity of the journeys.
- **Ending:** where it stands (honest status), Amit's role in one line, then "Watch the film" (only where a film exists) and "Read the full case".
- **Reading time:** under two minutes. If a beat does not move the argument forward, cut it.
- **Consistency comes from the grammar, not a template:** the same type scale, spacing, visual treatment, beat rhythm and ending. Each case has its own beats, in its own order, and its own nuance moment.

### Facts and wording rules for these four
- Never invent. Every claim comes from the detailed case pages, `src/data/playbacks.ts` or Amit's own words in this brief.
- **Agentic:** no measured outcome yet. Status: "In implementation with a customer. Its KPIs will be tracked once it runs in production." The value beat states the value the design targets (time saved on reading and comparing, decisions routed to the right owner, nothing sent without a person), not a result.
- **Search:** no outcome numbers. Status: "Now evolving into a more conversational experience." Site rule: no SAP name or SAP product names on case pages, so the assistant is "a modern AI assistant", not Joule. **Decision for Amit:** whether to name Joule here, since the bridge to it is the heart of the story.
- **HR suite:** 90% satisfaction came from usability testing. Mention it at most once, quietly, labelled as usability testing.
- **Travel:** the programme met its goal of growing digital bookings from $2M to $100M and the partnership continues. Credit it to the programme, never to Amit alone. Remove client hints (Saudia branding, airport codes such as RUH and DXB) from every visual used.
- No em or en dashes. No client names. No people's names apart from the fictional personas already on the site.

### Process and approval stops
1. **Research:** mine the detailed case pages for the facts each argument needs.
2. **Outlines, stop for Amit:** one page per case with the headline, the beats (statement, body, visual) and the facts behind each, plus a list of anything that needs his confirmation. Amit approves or edits.
3. **Build:** the new format at `/craft/<id>/story`, replacing the first proposal.
4. **Review:** screenshots at 1440 and 390, then a read-through from a hiring manager's view. Is the highlight obvious in ten seconds, and is every beat earning its place?
5. **Stage, stop for Amit:** push to staging only after he has seen it locally or in screenshots. Old `/craft/<id>` pages stay untouched until he chooses to switch.

---

## B. The prompt (paste everything below into Claude Code)

Read `CLAUDE.md` first and follow all of its rules (tokens, content honesty, no em or en dashes, no client names, no SAP names on case pages, deploy routine, never touch neo or www).

### The job
Rewrite the short stories for four case studies so each one argues **one highlight**, with the project as the evidence. Build them at `/craft/<id>/story`, replacing the first proposal (`src/pages/StoryPage.tsx`, `src/data/stories.ts`). Do not change the current short stories at `/craft/<id>` or the detailed cases.

The four cases and what each story must argue:

1. **`sap-agentic`, Supplier order confirmations: how to build an agentic solution that is genuinely meaningful.** Most teams build agents regardless of whether they add significant value to the business. This story shows the method, with this project as the worked example: start from the business problem; find where judgement is needed and where it is not; map the problem to an agentic pattern; design what the agent actually does; decide where people stay in control; show the value. **The nuance to make unmistakable:** the agent is not a parser (parsers existed before) and not just a recommender. The real design work is the non-deterministic logic behind a recommendation: how the agent reasons about differences, assesses risk, and explains a recommendation well enough that a person can trust it and act. Show that, with the gates where people decide.
2. **`sap-search`, Enterprise search: the bridge from traditional search to a conversational experience.** Customers on established enterprise systems use traditional search with real limits. A modern AI assistant exists. The transition is not 0 or 1. This search is the middle ground: one field everywhere, plain language, answers with sources, and actions that open the application, so people get things done right from search and the move to conversation becomes smoother. Tell it as a spectrum: today, the gap, the middle ground, where it leads. On the page the assistant is "a modern AI assistant" (no SAP product names). List naming Joule as a decision for me.
3. **`engaze`, HR suite: conversational design as the core of an AI product.** The conversation was the experience. Take one real request apart: what the person asked, what the system inferred from their intent, how it decided what to do, and the five principles (trust, guidance, discoverability, cognitive simplicity, continuity) that make it behave beyond the happy path. Include the team's research on a persona that keeps one consistent conversation pattern. The 90% satisfaction figure came from usability testing: use it at most once, quietly, labelled as such.
4. **`airline-app`, Travel booking: designing at scale.** A consumer mobile app for a carrier with 30M+ guests a year and 95+ destinations, with complex use cases across the whole trip (plan and book, fares, seats, extras, manage, check in and the rest), delivered by 11+ designers in five journey pods. Make the scale and complexity visible, then show how the work stayed coherent, then the results (check-in from 9 steps to 2, engagement up 92%, add-on sales up 50×). The programme met its goal of growing digital bookings from $2M to $100M and the partnership continues: credit it to the programme, not to me alone. Remove every client hint (Saudia branding, airport codes such as RUH and DXB) from the visuals you use, by choosing other visuals or by redrawing.

### Format: one idea per screen
- **First screen:** the highlight as a single claim (headline), one supporting line, one still image (a static cover, not the live preview). Nothing else on it: no crux columns, no moving preview, no tags, no metadata block. Role and dates move to the ending.
- **Four to six beats**, each about one screen tall on desktop: a statement set large (serif, `--fs-heading` or `--fs-d-l`), at most about 40 words of body, one visual (an existing diagram embed from `src/components/playback/Embeds.tsx`, an image already on the site, or a new simple diagram you draw in the site's style). One beat is the nuance, told largest.
- **Ending:** where it stands, my role in one line (and team size where I led a team), then "Watch the film" if one exists in `src/data/films.ts`, and "Read the full case" to `/craft/<id>/details`.
- Under two minutes to read. Cut any beat that does not move the argument.
- **Consistent grammar, no template:** shared building blocks (hero, beat, nuance beat, ending) with the same type, spacing and visual treatment, but each case has its own beats, order and nuance moment. Motion stays subtle: a restrained reveal of each statement as it enters, with a reduced-motion fallback. Nothing distracting at the top.

### Facts
- Every claim must come from the detailed case pages (`src/pages/SAPAgenticStoryV2Page.tsx`, `src/pages/SAPSearchStoryPage.tsx`, `src/pages/EngazeStoryPage.tsx`, `src/pages/AirlineStoryPage.tsx` and their components), from `src/data/playbacks.ts`, or from this brief. Never invent numbers, steps, research or outcomes. If the argument needs something the sources do not have (for example, how the agent's recommendation logic actually works), write the question down for me instead of filling the gap.
- Status lines: Agentic, "In implementation with a customer. Its KPIs will be tracked once it runs in production." Search, "Now evolving into a more conversational experience." HR suite, the employee module shipped as a companion beside the portal people already use. Travel, the programme result above.

### Steps and approval stops
1. Read the sources above and the current proposal.
2. **Stop for my approval:** write `docs/short-stories-v2-outlines.md`, with one section per case: the headline, the supporting line, each beat (statement, body, visual, and the source of every fact), the nuance beat marked, the ending, and a list of questions or anything written in my voice that I must confirm. Show it to me and wait.
3. Build the approved outlines at `/craft/<id>/story`. Reuse the existing embeds and images where they serve the argument; draw new diagrams only where none fits.
4. Check: `npm run build`, `npm run tokens` at 0, Playwright screenshots at 1440x900 and 390x844 for all four, no sideways scroll, no console errors, reduced motion works. Then review each page as a hiring manager for a Head of Design role: is the highlight clear in ten seconds, and does every beat earn its place? Fix what you find.
5. **Stop for my approval:** show me the screenshots. Push to `staging` and alias the staging URL (as in `CLAUDE.md`) only when I say so. Never touch neo or www.
