# Short stories v2: review and improvement areas (Nov 20, 2026)

Review of `/craft/<id>/story` for `sap-agentic`, `sap-search`, `engaze` and `airline-app` (commit `27a71a1`), against the highlights in `docs/short-stories-v2-plan.md`. Reviewed on a local build at 1440 wide, page by page.

## Across all four
1. **The first screen does not say what the problem is or what the story proves.** Headlines are aphorisms ("Between search and conversation, there is a bridge", "At this scale, keeping it one experience is the design problem"). The headline must state the problem and the highlight in plain words; the supporting line says what the reader will see.
2. **The flow wanders.** Every story should run: the problem, the insight (the highlight), how it works shown in the real interface, the proof, then the role. Every beat must move the highlight forward; anything else goes.
3. **Not enough real interface.** Agentic and the HR suite show no product screen at all. Travel shows a cropped collage with placeholder data. Search shows screens with data errors. Each story needs at least two crafted product screens that carry the highlight.
4. **Craft errors in the interfaces.** Zero tolerance: matching sample data (a title, its description, category and tags must agree), no repeated labels, no placeholder data (AAA to ZZZ, City Z, ABC Company), no skeleton bars, no clipped cards, no unreadable badges.
5. **Hedging and redundant disclaimers.** Remove: "Its KPIs will be tracked once it runs in production", "a design aim, not a result yet", "(public figure, for scale)", "Sample text.", "How far this goes is evolving", "The logic I proposed, refined with product. Tolerances are levers", "A programme result, delivered together with product, engineering and the client's teams". The reader assumes teamwork and sample data.
6. **No single visual language.** Diagrams look like wireframes and are invented per beat (outlined boxes, chip clouds, text-only card grids with empty slots). One illustration system across the four: the same card, line, colour and type treatment.
7. **Too long and too much scaffolding.** Agentic has 7 beats. Mono counters ("04 / 07"), the keyword-to-conversation scale on every Search beat, and duplicate captions add noise. At most five beats.
8. **Endings.** End on the highlight's takeaway and the role. Keep a status line only where it adds something (Search).

## Supplier order confirmations (`sap-agentic`)
Highlight: how to build a meaningful agentic solution, from a business problem to a pattern to value. Nuance: the non-deterministic logic behind a trustworthy recommendation.
- The method is only half there. Missing: the explicit start (the business problem, and the test for whether an agent is worth building at all) and the step of mapping it to a pattern. It reads as a feature tour.
- First screen shows a generic flow diagram, not the product.
- No interface anywhere. Show the operations worklist and the buyer's decision screen: each difference with its reason, risk and confidence, and the accept or reject.
- Nuance beat shows a risk formula with weights, cards with dead space and dim labels. Replace with one clear visual: signals in, risk, a recommendation with its reason in plain words, shown in the UI. Merge "The same 10% is not the same risk" into it.
- "The same 10%" beat: HIGH, MEDIUM and LOW badges are unreadable, and an "Order risk HIGH" row sits loose at the bottom.
- Gate 2 embed: cards are clipped at both edges ("Drafts th").
- Value beat contradicts itself ("a design aim, not a result yet") and is a dense list of six. State the value plainly for the business and for each role.
- "Often in German" appears twice. Ending: remove the KPI sentence.

## Enterprise search (`sap-search`)
Highlight: the bridge for customers on traditional search to a conversational experience. Not 0 or 1.
- The idea is clearest of the four, but the bridge itself (the hand-over from search to the assistant) is the weakest visual: a wireframe captioned "Sample text." It should be the climax, as a crafted screen: a search answer that continues in the assistant with its context.
- First screen shows a keyword query, "purchase", which argues against the story. Show a sentence and an answer.
- Try-it demo: the application name appears in the shell bar, as a chip, as the page title and in the breadcrumb (Expenses four times); Policies repeats the same way. The "You are in" chip row reads as product UI. Two captions under it. Audit every state of the demo.
- AI summary visual has grey skeleton bars and blue placeholder blobs.
- Row-actions image: "Bulk Iphone orders for Employees" is described as steel plates and aluminium sheets, categorised Electronics and tagged Raw Materials and Steel. "Iphone" is misspelt.
- One keyword-to-conversation scale that fills as you scroll, not a copy on every beat.

## HR suite (`engaze`)
Highlight: conversational design as the core of an AI product, and assistants with the right personality and tone of voice.
- First screen is not HR: "Show purchase requests waiting on me", "Book a trip to Palo Alto", "Hi! I'm Engaze, your workplace bestie!".
- No conversation interface. Show the real chat: Esha's request, what the assistant inferred, and the confirmation card before it applies the leave.
- "Not every question wants the same kind of answer" is a grid of text boxes. Show the five response types as real UI: a fact, an action, a chart, a draft, an analysis.
- Beat 1 is one bubble in an empty box. Principles and persona beats are text grids with an empty slot.
- Persona and tone of voice is the second highlight but has the least craft. Show the archetype cards properly and the same answer in two tones, before and after the persona.
- Portal image is a tilted tablet; nothing on it is readable.
- Sample data must agree across beats (leave balances differ between visuals).

## Travel booking (`airline-app`)
Highlight: designing at scale. A consumer mobile app for 30M+ guests a year, many complex use cases, many designers at once.
- Headline does not say what the problem is. State it: one app for 30M+ guests a year, covering a hundred use cases, built by five pods at once.
- First-screen collage: screens cropped at the edges, placeholder data (AAA to ZZZ, City Z, Trip to City Z). Looks unfinished.
- Nuance beat (a hundred use cases) is a cramped cloud of chips on a timeline. Show three or four hard cases as real screens (missing passport details, an infant on a lap, a delay that needs rebooking).
- Three stat rows in a row (scale, audit, results) make the story monotone. The audit needs its visual; the pods diagram repeats Design, Product, Engineering five times.
- Check the source of every result: 4 minutes to book, 30% less effort to choose a seat, an eVisa in 3 steps, app rating from about 3 to 4.7.
- Ending: drop the redundant teamwork sentence.

## Not yet reviewed
Phone layouts in detail (390 wide) after the fixes.
