const fs = require('fs');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let MODE = 'tpl', PFX = '', FID = 0;
const ex = () => MODE === 'ex';
const fid = () => `${PFX}-f${++FID}`;
const area = (h) => { const id = fid(); return `<textarea class="area" id="${id}" data-save style="min-height:${h || 80}px" aria-label="Your notes"></textarea>`; };
const val = (v, h) => ex() && v ? `<div class="value">${esc(v)}</div>` : area(h);
const ov = s => `<p class="ov">${esc(s)}</p>`;
const card = (label, hint, v, h) => `<div class="card">${ov(label)}${hint ? `<p class="hint">${esc(hint)}</p>` : ''}${val(v, h)}</div>`;
const row = (items, min) => `<div class="row" style="--min:${min || 220}px">${items.join('')}</div>`;
const sec = (title, desc, body) => `<section class="sec">${title ? `<h2>${esc(title)}</h2>` : ''}${desc ? `<p class="desc">${esc(desc)}</p>` : ''}${body}</section>`;
function table(heads, n, exRows, widths, tplRows) {
  const rows = ex() && exRows ? exRows : (tplRows || Array.from({ length: n }, () => heads.map(() => '')));
  const w = widths || [];
  return `<div class="tw"><table><thead><tr>${heads.map((h, i) => `<th${w[i] ? ` style="width:${w[i]}px"` : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c ? esc(c) : (ex() ? '' : `<textarea class="cell" id="${fid()}" data-save rows="1" aria-label="Cell"></textarea>`)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const check = (s, on) => { const id = fid(); return `<label class="chk" for="${id}"><input type="checkbox" id="${id}" ${ex() ? (on ? 'checked disabled' : 'disabled') : 'data-save'}><span>${esc(s)}</span></label>`; };
const LOGO = `<svg class="logo" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M170.764 194 128 120.15l-19.112 34.08 43.382 15.365H98.255L84.948 193.79a73.273 73.273 0 0 1-21.782-25.347A72.513 72.513 0 0 1 55 134.907a73.363 73.363 0 0 1 1.483-14.694 72.455 72.455 0 0 1 10.984-26.07 73.193 73.193 0 0 1 32.118-26.416 72.695 72.695 0 0 1 13.703-4.246 73.805 73.805 0 0 1 29.424 0 72.64 72.64 0 0 1 26.103 10.97 73.134 73.134 0 0 1 26.448 32.077 72.452 72.452 0 0 1 4.254 13.686 73.46 73.46 0 0 1-.665 32.321 72.698 72.698 0 0 1-15.636 30.063A73.448 73.448 0 0 1 170.764 194z"/></svg>`;
const brand = () => `<div class="brand">${LOGO}<div><p class="bname">Amit Kumar Tiwari</p><p class="bsub">AI-native Design Methodology</p></div><span class="bsp"></span><p class="burl">designsbyamit.com</p></div>`;
const header = s => `<header class="hdr">${ov(s.ov)}<h1>${esc(s.title)}</h1><p class="sub">${esc(s.sub)}</p></header>`;
const banner = s => `<div class="banner"><p class="ov">Worked example · fictional company</p><p class="bt">${esc(s.useCase)}</p><p class="bc">${esc(s.context)}</p></div>`;
const anatomy = a => row([['Purpose', a.purpose], ['Builds on', a.inputs], ['Feeds into', a.outputs]].map(([l, t]) => `<div class="card">${ov(l)}<p class="strong">${esc(t)}</p></div>`), 240);
const exitBlock = items => sec('Done when', "Use the framework's core questions as the exit check before moving on.", `<div class="card list">${items.map(q => check(q, true)).join('')}</div>`);
const footer = () => `<p class="foot">© 2026 Amit Kumar Tiwari · AI-native Design Methodology · designsbyamit.com · Template v2.0</p>`;
function frame(spec, blocks) {
  return `<article class="frame">${brand()}${header(spec)}${ex() ? banner(spec) : ''}${anatomy(spec.anatomy)}${blocks()}${exitBlock(spec.exit)}${footer()}</article>`;
}
const KITS = [];
function kit(id, label, figType, spec, blocks) {
  const out = {};
  for (const m of ['tpl', 'ex']) { MODE = m; PFX = id + '-' + m; FID = 0; out[m] = frame(spec, blocks); }
  KITS.push({ id, label, figType, ...out });
}
// ── boards (FigJam equivalents) ──
const sticky = (txt, kind) => kind === 'blank' ? (ex() ? '' : `<textarea class="sticky blank" id="${fid()}" data-save aria-label="Sticky note" placeholder="Your note"></textarea>`) : `<div class="sticky ${kind || ''}">${esc(txt)}</div>`;
const zone = (title, purpose, tint, prompts, exNotes, blanks) => `<div class="zone" style="--zt:var(--${tint})"><h3>${esc(title)}</h3><p class="desc">${esc(purpose)}</p><div class="stickies">${ex() ? exNotes.map(n => sticky(n, 'filled')).join('') : prompts.map(p => sticky(p, 'prompt')).join('') + Array.from({ length: blanks ?? 4 }, () => sticky('', 'blank')).join('')}</div></div>`;

// ═════════════ 1. Context Engineering Canvas (FigJam) ═════════════
kit('context', 'Context Engineering Canvas', 'FigJam board', {
  ov: 'Framework 01 · Context Engineering', title: 'Context Engineering Canvas',
  sub: 'Know before you design. Build shared understanding of the industry, business, ecosystem, users and intelligence opportunities before any solutioning.',
  useCase: 'NorthStar GmbH · Procurement: RFQ to purchase order',
  context: 'NorthStar makes food products for children, is headquartered in Germany and runs plants and serves customers worldwide. Pilot: raise RFQs to vendors, plan inventory and BoM, validate quality, map vendor responses to RFQ attributes, approve RFPs and close the quote as an order.',
  anatomy: { purpose: 'Create the five discovery artifacts that ground every later decision: industry brief, ecosystem map, personas, as-is journey and agent ecosystem map.', inputs: 'A business problem or brief. Nothing designed yet.', outputs: '02 · The Intelligence Opportunity Canvas, which walks this context through six modes of intelligence.' },
  exit: ['What business are we in?', 'How does work happen today?', 'Who performs the work and where are decisions made?', 'Where should intelligence exist in this system?']
}, () => `<div class="board">${[
  zone('1 · Industry Brief', 'What sector, competitive dynamics and regulatory limits shape this work?', 't1',
    ['Sector and competitive dynamics?', 'Regulatory and compliance constraints?', 'Forces reshaping how this work is done?', 'Which claims have you verified, and from what source?'],
    ['Children\'s food: strict composition, labelling and contaminant rules in every market NorthStar sells into.', 'Volatile commodity prices for dairy, grains, cocoa and fruit.', 'Retailer private labels squeeze margins; speed to shelf matters.', 'Traceability and sustainability evidence increasingly requested by retailers and regulators.', 'Sources: regulatory affairs team, category strategies, two retailer scorecards.']),
  zone('2 · Ecosystem Map', 'What systems exist, and how does data move between them?', 't2',
    ['Systems and tools involved?', 'Where does data move between them?', 'Where is data re-keyed, waiting or lost?', 'Who owns each system?'],
    ['ERP: materials, inventory, MRP, purchasing.', 'Supplier portal for RFQs, but most vendors reply by email or PDF.', 'Quality management system holds specifications and certificates.', 'Buyers compare quotes in spreadsheets; data re-keyed into the ERP.', 'Approvals happen in email threads with no audit trail.']),
  zone('3 · Personas', 'Who performs the work and what do they decide?', 't3',
    ['Who does the work?', 'What decisions do they make?', 'What consumes their time?', 'What do they distrust about automation?'],
    ['Category buyer at HQ: runs most RFQs, chases vendors, builds comparison sheets.', 'Plant quality lead: checks allergen declarations and certificates before any award.', 'Category manager: approves awards above a value threshold.', 'Distrust: "a tool that picks the cheapest vendor and ignores quality history".']),
  zone('4 · As-is Journey', 'How does the work happen today, end to end?', 't4',
    ['Trigger: what starts the work?', 'Steps today, in order', 'Waits and handoffs', 'Workarounds people invented', 'Outcome: what does done look like?'],
    ['Trigger: MRP shortfall or a new recipe changes the BoM.', 'Buyer drafts the RFQ and sends it to three to five vendors.', 'Wait: vendor replies take days; quality checks queue behind other work.', 'Workaround: spreadsheet comparison and email approvals.', 'Outcome: purchase order posted, often weeks after the trigger.'], 3),
  zone('5 · Agent Ecosystem Map', 'Where should intelligence exist in this system?', 't5',
    ['Where should AI observe, reason, decide or coordinate?', 'Which agents would collaborate?', 'Where does human authority begin?', 'What must never be automated?'],
    ['Sourcing agent: drafts RFQs from BoM lines and maps vendor responses to RFQ attributes.', 'Quality agent: pre-checks certificates and allergen data, flags gaps.', 'Order agent: converts the approved quote into a purchase order.', 'Human authority: vendor award, new-vendor approval, any food-safety exception.', 'Never automated: food-safety release and changes to vendor bank details.'])
].join('')}</div>${sec('Validate', 'List the assumptions this canvas depends on, rank them by risk if wrong, and decide the cheapest way to test each.', ex() ? table(['Assumption', 'Risk if wrong', 'Cheapest test'], 0, [['Most vendor responses can be mapped automatically', 'High', 'Run 50 past responses through mapping; measure accuracy'], ['Quality checks are the main source of delay', 'Medium', 'Time-stamp 20 recent RFQs end to end'], ['Buyers will accept an agent-drafted RFQ', 'Medium', 'Show 10 drafts to 3 buyers; count edits']]) : table(['Assumption', 'Risk if wrong', 'Cheapest test'], 4))}`);

// ═════════════ 2. Intelligence Opportunity Board (FigJam) ═════════════
const MODES = [['Observe', 'What data must the system perceive? What needs human observation today?'], ['Understand', 'What patterns, meanings or contexts need interpreting?'], ['Reason', 'What multi-step inference relies on expert judgment?'], ['Decide', 'Which decisions are high-volume, rule-bounded or time-sensitive?'], ['Execute', 'What actions could be automated once a decision is made?'], ['Coordinate', 'What orchestration between systems, agents or people could be automated?']];
const MODE_EX = [['Inventory shortfall signals across plants', 'Vendor replies arriving by email and PDF'], ['Map vendor responses to RFQ attributes', 'Read allergen and certificate data'], ['Check BoM changes against vendor specs', 'Quality document pre-check'], ['Shortlist vendors within category rules'], ['Draft and send RFQs from BoM', 'Convert approved quote to purchase order'], ['Route RFP approvals to category, quality and finance']];
kit('opportunity', 'Intelligence Opportunity Board', 'FigJam board', {
  ov: 'Framework 02 · Intelligence Opportunity Discovery', title: 'Intelligence Opportunity Board',
  sub: 'Find where AI creates value, not where it is impressive. Walk the workflow through six modes, list candidates, then score and place them on the matrix.',
  useCase: 'NorthStar GmbH · Procurement: RFQ to purchase order',
  context: 'A workshop board for the same pilot as the Intelligence Opportunity Canvas in Figma. Participants: category buyers, a plant quality lead, a category manager and the design team.',
  anatomy: { purpose: 'Run the opportunity workshop as a group: collect candidates per mode, score them, and agree what to pursue first.', inputs: '01 · The Context Engineering Canvas for this workflow.', outputs: '03 · The top opportunity becomes an Agent Mission Blueprint.' },
  exit: ['Where does work wait for human decision?', 'Where does knowledge exist but not flow?', 'Where does coordination fail at scale?', 'What decisions are routine but high-volume?']
}, () => {
  const wf = ex() ? row([card('Workflow', null, 'Source-to-order for ingredients and packaging'), card('Who performs it', null, 'Category buyers, plant quality leads, category managers'), card('Business outcome', null, 'Shorter sourcing cycle time and lower landed cost, with no compromise on food safety')], 240)
    : row([card('Workflow', null, null, 48), card('Who performs it', null, null, 48), card('Business outcome', null, null, 48)], 240);
  const tints = ['t1', 't2', 't3', 't4', 't5', 't6'];
  const modes = `<div class="board six">${MODES.map(([m, q], i) => zone(`0${i + 1} · ${m}`, q, tints[i], [], MODE_EX[i], 4)).join('')}</div>`;
  const quads = [['Plan next', 'High value · harder', ['Quality document pre-check']], ['Do first', 'High value · feasible', ['RFQ drafting from BoM', 'Vendor response mapping', 'Inventory-triggered RFQs']], ['Defer', 'Low value · harder', []], ['Quick wins', 'Low value · feasible', ['Quote-to-order conversion']]];
  const matrix = `<div class="matrix">${quads.map(([n, s, items], i) => `<div class="quad${i === 1 ? ' hot' : ''}"><p class="qn">${n}</p><p class="hint">${s}</p>${ex() ? items.map(t => `<span class="chip">${esc(t)}</span>`).join('') : ''}</div>`).join('')}</div><p class="axis">↑ Value &nbsp;&nbsp; Feasibility →</p>`;
  return sec('Workflow under review', null, wf) + sec('Six modes of intelligence', 'Add candidate opportunities under each mode.', modes)
    + sec('Score', 'Value, Feasibility and Trust cost on a 1–5 scale (higher trust cost = riskier). Priority = Value × Feasibility ÷ Trust cost.', table(['Opportunity', 'Value', 'Feasibility', 'Trust cost', 'Priority'], 6, [['RFQ drafting from BoM', '4', '5', '1', '20.0'], ['Vendor response mapping', '5', '4', '2', '10.0'], ['Quote-to-order conversion', '3', '5', '2', '7.5'], ['Inventory-triggered RFQs', '4', '4', '3', '5.3'], ['Quality document pre-check', '5', '3', '4', '3.8']], [null, 100, 110, 110, 100]))
    + sec('Prioritise', 'Move scored candidates onto the matrix. Start top-right. High-value ideas with high trust cost need more trust design, not less.', matrix);
});

// ═════════════ 3. Experience Blueprint Kit (Figma) ═════════════
kit('experience', 'Experience Blueprint Kit', 'Figma file', {
  ov: 'Framework 04 · AI-native Experience Blueprint', title: 'Experience Blueprint Kit',
  sub: 'Design the relationship between human judgment and AI autonomy. Complete after the Agent Mission Blueprint and before any screens.',
  useCase: 'NorthStar GmbH · Talent acquisition: job posting to onboarding',
  context: 'NorthStar hires food technologists, plant operators and office staff across its sites worldwide. Pilot: automate job posting, screening, recruitment and onboarding. Users: recruiters, hiring managers and new joiners.',
  anatomy: { purpose: 'Design the human-agent collaboration layer: checkpoints, trust, transparency, escalation and recovery.', inputs: '03 · The Agent Mission Blueprint, especially autonomy level and escalation triggers.', outputs: '05 · What the prototype must demonstrate and be tested against.' },
  exit: ['Where are the human checkpoints?', 'How does the system communicate uncertainty?', 'What does recovery look like when the agent is wrong?', 'How is escalation designed as a first-class interaction?']
}, () => {
  let h = sec('1 · Human checkpoints', 'For every agent action choose a tier by cost of error and reversibility. Tier 1 log, Tier 2 visible reasoning, Tier 3 interrupt.', table(['Workflow step', 'Agent action', 'Tier', 'Why this tier', 'What the human can do'], 6, [
    ['Job posting', 'Drafts the job description from the role brief and posts to job boards', '2', 'Public and brand-sensitive, but reversible', 'Hiring manager approves the text before it goes live'],
    ['Screening', 'Ranks applicants against must-have criteria, with reasons', '2', 'Fairness risk; every ranking must be explainable', 'Recruiter reviews the shortlist and can add back any candidate'],
    ['Rejection', 'Prepares rejection messages for unsuccessful applicants', '3', 'Irreversible for the candidate; hiring is a high-risk AI use in the EU', 'Recruiter confirms every rejection batch'],
    ['Interview scheduling', "Books slots across the panel's calendars", '1', 'Low risk and easy to change', 'Panel members reschedule in one click'],
    ['Offer', 'Drafts the offer within the approved salary band', '3', 'Contractual commitment', 'Recruiter and HR business partner approve'],
    ['Onboarding', 'Creates IT, payroll and induction tasks for the new joiner', '1', 'Routine and checked by the owning teams', 'HR operations sees the log and can reassign']], [150, null, 70, null, null]));
  const st = [['Stage 1', 'Low stakes · visible', 'Agent suggests, human acts.', 'Draft job descriptions and propose interview slots.', 'Hiring managers accept most drafts with light edits over one quarter.'], ['Stage 2', 'Medium stakes · explained', 'Agent acts with approval; reasoning shown first.', 'Produce ranked shortlists with reasons for recruiter confirmation.', 'Shortlists match recruiter picks; no adverse-impact flags in the fairness review.'], ['Stage 3', 'High stakes · autonomous', 'Agent acts and reports; human reviews exceptions.', 'Send interview invitations and create onboarding tasks without approval.', 'Near-zero scheduling conflicts and no missed onboarding tasks for two quarters.']];
  h += sec('2 · Trust ladder', 'Trust is built progressively. Define what the agent may do at each stage and the evidence needed to move up.', row(st.map(([a, b, c, d, e]) => `<div class="card">${ov(a)}<p class="h3">${b}</p><p class="hint">${c}</p><p class="lbl">Agent may</p>${val(d, 56)}<p class="lbl">Evidence to move up</p>${val(e, 56)}</div>`), 260));
  const lanes = [['Human', ['Approves job post (T2)', 'Reviews shortlist (T2)', 'Interviews candidates', 'Approves offer (T3)', 'Welcomes new joiner']], ['Agent', ['Drafts JD from role brief', 'Screens and ranks, with reasons', 'Schedules the panel (T1)', 'Drafts offer within band', 'Creates onboarding tasks (T1)']], ['Other systems and agents', ['Job boards', 'Applicant tracking system', 'Calendars', 'HR system and payroll', 'IT provisioning']]];
  h += sec('3 · Collaboration swimlane', 'Place each step in its lane. Mark checkpoints with their tier.', `<div class="tw"><div class="lanes">${lanes.map(([l, steps]) => `<div class="lane"><div class="lname">${l}</div>${steps.map(s => ex() ? `<div class="step">${esc(s)}</div>` : `<textarea class="step blank" id="${fid()}" data-save aria-label="${l} step"></textarea>`).join('')}</div>`).join('')}</div></div>`);
  h += sec('4 · Transparency, escalation and recovery', null, row([card('Transparency', 'What does the agent surface about its reasoning, and when? Disclosure is progressive by default.', 'Every shortlist shows the criteria each candidate met and missed. Full scoring opens on demand.', 110), card('Escalation', 'How are exceptions communicated and acted on? A first-class interaction, not a fallback.', 'Rejections, offers and any candidate flagged by the fairness check interrupt the recruiter with exactly what is needed.', 110), card('Recovery', 'When the agent is wrong: how the user notices, undoes and sees what will change.', 'A wrongly rejected candidate is restored in one step; the agent sends a corrected message and logs the reason.', 110), card('Feedback loop', 'How are corrections acknowledged, and how do they change future behaviour?', 'Recruiter overrides are reviewed weekly and adjust screening weights; the agent shows "updated from your edits".', 110)], 230));
  h += sec('5 · Interaction sequence', 'One row per moment. Prototype every row, including failure and recovery.', table(['#', 'Trigger', 'Agent does', 'User sees', 'User can', 'Tier'], 6, [
    ['1', 'Hiring manager submits role brief', 'Drafts JD in NorthStar tone', 'Draft with changes highlighted', 'Edit, approve or reject', '2'], ['2', 'Posting closes', 'Screens and ranks applicants', 'Shortlist with met and missed criteria', 'Add back, remove, ask why', '2'], ['3', 'Recruiter confirms shortlist', 'Proposes interview slots', 'Calendar holds per panel member', 'Move any slot', '1'], ['4', 'Unsuccessful applicants', 'Prepares rejection batch', 'Batch summary before sending', 'Confirm, hold or restore', '3'], ['5', 'Agent wrongly rejected a candidate', 'Restores the candidate and corrects the message', 'What changed and why', 'Undo the correction', '3'], ['6', 'Offer accepted', 'Creates onboarding tasks', 'Checklist with owners and dates', 'Reassign any task', '1']], [44, null, null, null, null, 60]));
  return h;
});

// ═════════════ 4. Prototype Review Kit (Figma) ═════════════
kit('review', 'Prototype Review Kit', 'Figma file', {
  ov: 'Framework 05 · Prototype & Validation', title: 'Prototype Review Kit',
  sub: 'At this level of maturity, the prototype is the argument. Review and test one human-agent interaction before any stakeholder sees it.',
  useCase: 'NorthStar GmbH · Talent acquisition: screening and shortlist prototype',
  context: 'Prototype under test: the recruiter shortlist and rejection flow from the Experience Blueprint, for a Food Technologist role at a European plant. Five recruiters from three countries took part.',
  anatomy: { purpose: 'Review and test one human-agent interaction, including failure and escalation states.', inputs: '04 · The Experience Blueprint the prototype should answer.', outputs: 'A ship, iterate or rethink decision, backed by evidence.' },
  exit: ["Does the prototype communicate the agent's reasoning?", 'Can a user understand what the agent did without explanation?', 'Is the override mechanism discoverable without prompting?', 'Does the failure state maintain trust?']
}, () => {
  const qs = ["Does the prototype communicate the agent's reasoning?", 'Can a user understand what the agent did without explanation?', 'Is the override mechanism discoverable without prompting?', 'Does the failure state maintain trust?'], ON = [1, 1, 0, 1];
  const cov = ['Success path', 'Low-confidence state', 'Escalation (Tier 3)', 'Wrong result and recovery', 'Empty or no-data state', 'Correction is acknowledged (feedback loop)'], COV = [1, 1, 1, 1, 0, 1];
  let h = sec('1 · Review checklist', 'Tick only what you have verified by using the prototype.', row([`<div class="card list">${ov('Framework questions')}${qs.map((q, i) => check(q, ON[i])).join('')}</div>`, `<div class="card list">${ov('Coverage')}${cov.map((q, i) => check(q, COV[i])).join('')}</div>`], 320) + (ex() ? card('Open items', null, 'Override not found unprompted by 2 of 5 participants. No empty state yet for a posting with zero qualified applicants.') : ''));
  const crit = [['Reasoning is legible', 'A user can say what the agent did and why without being told.'], ['Override is discoverable', 'Found without prompting, in under 10 seconds, from where the decision happens.'], ['Uncertainty is honest', 'Low confidence looks different from high confidence, in words and in form.'], ['Checkpoints are designed', 'Every Tier 3 moment interrupts clearly and says what is needed.'], ['Failure keeps trust', 'The wrong-result state names the error, offers undo, and shows what will change.'], ['Oversight is inline', 'No modal or settings page is required to supervise the agent.'], ['Disclosure is progressive', 'Detail is available on demand and absent by default.'], ['Matches the blueprint', 'Departures from the Experience Blueprint are noted and justified.']];
  const cx = [['3', '4 of 5 explained why a candidate was shortlisted'], ['2', 'Found by 3 of 5; median 14 seconds'], ['3', '"Partial match" label understood; colour alone was missed'], ['4', 'Rejection batch confirmation was clear to all 5'], ['3', 'Restore worked; 2 asked whether the candidate was notified'], ['3', 'One participant opened settings to find weights'], ['4', 'Nobody opened full scoring unless they disagreed'], ['3', 'Batch rejection differs from blueprint; improvement, keep']];
  h += sec('2 · Validation criteria', 'Score 1 to 4 after the sessions. No criterion below 3, and failure keeps trust at 3 or above.', table(['Criterion', 'Pass condition', 'Score', 'Evidence'], 8, crit.map((c, i) => [c[0], c[1], ...cx[i]]), [200, null, 70, null], crit.map(c => [c[0], c[1], '', ''])) + (ex() ? card('Decision', null, 'Iterate. Fix override discoverability (score 2) and add the notification status to the restore flow, then re-test with 5 recruiters.') : ''));
  const m = ['Time to produce a shortlist', 'Steps the recruiter performs', 'Decisions the recruiter makes', 'Errors reaching candidates', 'Time to recover from an error', 'Self-reported trust (1–5)', 'Can explain the outcome (1–5)'];
  const mx = [['About 6 hours', 'About 1.5 hours', '−75%'], ['22', '9', '−13'], ['~40 per posting', '~12 per posting', 'Focus on edge cases'], ['Inconsistent rejection reasons', 'Reasons attached to every decision', 'Consistent'], ['Next working day', 'Under 5 minutes', 'Same-day'], ['2.8', '3.9', '+1.1'], ['2.1', '4.0', '+1.9']];
  h += sec('3 · Before / after comparison', 'Compare the current experience with the agent-assisted one for the same task.', table(['Measure', 'Before', 'After', 'Change'], 7, m.map((x, i) => [x, ...mx[i]]), [260, null, null, null], m.map(x => [x, '', '', ''])) + row([card('Before: sketch or note', null, 'Recruiter exports applicants to a spreadsheet, reads every CV, and emails hiring managers a shortlist.', 160), card('After: sketch or note', null, 'Recruiter opens a ranked shortlist with met and missed criteria, adjusts it, and confirms rejections as one batch.', 160)], 300) + (ex() ? '<p class="hint">Figures are illustrative for the worked example.</p>' : ''));
  const tpl = [['0:00', 'Welcome', '"We are testing the design, not you. Please think aloud." Ask permission to record.'], ['0:02', 'Context', 'Role, how often they do this task today, what they trust or distrust about automation.'], ['0:05', 'Task 1 · success path', '"Handle this request." After: "Tell me what just happened."'], ['0:08', 'Task 2 · ambiguity', 'A low-confidence case. Watch how they read the uncertainty.'], ['0:11', 'Task 3 · override', '"Suppose you disagree. Show me what you would do." Do not hint. Record time to find it.'], ['0:14', 'Task 4 · failure', 'The agent is wrong. Do they notice, can they undo, do they keep using it?'], ['0:17', 'Debrief', '"How much would you trust this tomorrow? What would raise it?"'], ['0:20', 'Close', 'Thank them and stop recording.']];
  const exs = [['0:00', 'Welcome', 'As template. Confirm the participant recruits for plant or R&D roles.'], ['0:02', 'Context', 'How many applications per posting today; how they shortlist now.'], ['0:05', 'Task 1 · success path', '"Review the shortlist for the Food Technologist role and confirm it." Then: "Why is Candidate 3 ranked first?"'], ['0:08', 'Task 2 · ambiguity', 'A candidate with a two-year career break marked "partial match". Ask what they would do.'], ['0:11', 'Task 3 · override', '"You think Candidate 9 should be interviewed. Show me." Time to find "add back".'], ['0:14', 'Task 4 · failure', 'The agent rejected a candidate with an equivalent qualification from another country. Do they spot and restore it?'], ['0:17', 'Debrief', 'Trust tomorrow, and what would raise it.'], ['0:20', 'Close', 'Thank them and stop recording.']];
  h += sec('4 · Usability test script', '20 minutes per participant, five participants, one facilitator and one note-taker.', table(['Time', 'Step', 'Say / do'], 8, exs, [70, 190, null], tpl));
  h += sec('5 · Note-taker grid', null, table(['Participant', 'Understood agent', 'Found override (sec)', 'Noticed failure', 'Trust after failure', 'Notes'], 5, [['P1 · Germany', 'Yes', '9', 'Yes', '4', 'Wanted a notification status'], ['P2 · Poland', 'Yes', '22', 'Yes', '3', 'Looked in settings first'], ['P3 · Netherlands', 'Partly', 'Not found', 'No', '3', 'Missed the colour cue'], ['P4 · Germany', 'Yes', '7', 'Yes', '4', 'Liked batch confirmation'], ['P5 · Poland', 'Yes', 'Not found', 'Yes', '4', 'Asked for keyboard shortcut']], [150, null, null, null, null, null], [1, 2, 3, 4, 5].map(n => ['P' + n, '', '', '', '', ''])));
  return h;
});

// ═════════════ page ═════════════
const css = fs.readFileSync(__dirname + '/style.css', 'utf8');
const tabs = KITS.map(k => `<a class="tab" href="#${k.id}" data-kit="${k.id}">${esc(k.label)}<span>${k.figType}</span></a>`).join('');
const panels = KITS.map(k => `<div class="panel" data-panel="${k.id}" hidden><div data-mode="tpl">${k.tpl}</div><div data-mode="ex" hidden>${k.ex}</div></div>`).join('');
const html = `<title>AI-native Framework Templates</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<style>${css}</style>
<div class="shell">
<nav class="bar" aria-label="Templates"><div class="tabs">${tabs}</div><div class="modes" role="group" aria-label="View"><button type="button" data-set="tpl" aria-pressed="true">Template</button><button type="button" data-set="ex" aria-pressed="false">Example · NorthStar</button></div></nav>
<p class="note">Also in Figma: <a href="https://www.figma.com/design/1rT6bOv4dbNKXOTWW4D4p5" target="_blank" rel="noopener">Agent Mission Blueprint</a> · <a href="https://www.figma.com/design/c19zDukqz5VI341boIVf7O" target="_blank" rel="noopener">Intelligence Opportunity Canvas</a>. Your notes in the templates stay in this browser only.</p>
${panels}
</div>
<script>
(function(){
  var kits=${JSON.stringify(KITS.map(k => k.id))};var mode='tpl';
  function show(kit){if(kits.indexOf(kit)<0)kit=kits[0];document.querySelectorAll('[data-panel]').forEach(function(p){p.hidden=p.dataset.panel!==kit});document.querySelectorAll('[data-kit]').forEach(function(t){t.setAttribute('aria-current',t.dataset.kit===kit?'page':'false')});}
  function setMode(m){mode=m;document.querySelectorAll('[data-mode]').forEach(function(d){d.hidden=d.dataset.mode!==m});document.querySelectorAll('[data-set]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.set===m?'true':'false')});try{localStorage.setItem('aint:mode',m)}catch(e){}}
  window.addEventListener('hashchange',function(){show(location.hash.slice(1))});
  document.querySelectorAll('[data-set]').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.set)})});
  var saved={};try{saved=JSON.parse(localStorage.getItem('aint:notes')||'{}')}catch(e){}
  document.querySelectorAll('[data-save]').forEach(function(el){if(saved[el.id]!==undefined){if(el.type==='checkbox')el.checked=saved[el.id];else el.value=saved[el.id]}el.addEventListener('input',function(){saved[el.id]=el.type==='checkbox'?el.checked:el.value;try{localStorage.setItem('aint:notes',JSON.stringify(saved))}catch(e){}})});
  var m='tpl';try{m=localStorage.getItem('aint:mode')||'tpl'}catch(e){}
  show(location.hash.slice(1));setMode(m);
})();
</script>`;
fs.writeFileSync(__dirname + '/ai-native-templates.html', html);
console.log('ok', html.length);
