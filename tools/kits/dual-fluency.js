const fs = require('fs');
const K = require('./content');
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let MODE = 'tpl', PFX = '', FID = 0;
const ex = () => MODE === 'ex';
const fid = () => `${PFX}-f${++FID}`;
const area = (h, ph) => `<textarea class="area" id="${fid()}" data-save style="min-height:${h || 80}px" aria-label="${esc(ph || 'Your notes')}"${ph ? ` placeholder="${esc(ph)}"` : ''}></textarea>`;
const val = (v, h, ph) => ex() && v ? `<div class="value">${esc(v)}</div>` : area(h, ph);
const ov = s => `<p class="ov">${esc(s)}</p>`;
const card = (label, hint, v, h) => `<div class="card">${ov(label)}${hint ? `<p class="hint">${esc(hint)}</p>` : ''}${val(v, h)}</div>`;
const row = (items, min) => `<div class="row" style="--min:${min || 220}px">${items.join('')}</div>`;
const pill = (t, goal) => `<div class="pill"><b>${esc(t)}</b>${goal ? ` <span>${esc(goal)}</span>` : ''}</div>`;
const sec = (title, desc, body, goal) => `<section class="sec">${title ? pill(title, goal) : ''}${desc ? `<p class="desc">${esc(desc)}</p>` : ''}${body}</section>`;
function table(heads, n, exRows, widths, tplRows) {
  const rows = ex() && exRows ? exRows : (tplRows || Array.from({ length: n }, () => heads.map(() => '')));
  const w = widths || [];
  return `<div class="tw"><table><thead><tr>${heads.map((h, i) => `<th${w[i] ? ` style="width:${w[i]}px"` : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c ? esc(c) : (ex() ? '' : `<textarea class="cell" id="${fid()}" data-save rows="1" aria-label="Cell"></textarea>`)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const check = (s, on) => { const id = fid(); return `<label class="chk" for="${id}"><input type="checkbox" id="${id}" ${ex() ? (on ? 'checked disabled' : 'disabled') : 'data-save'}><span>${esc(s)}</span></label>`; };
const LOGO = `<svg class="logo" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M170.764 194 128 120.15l-19.112 34.08 43.382 15.365H98.255L84.948 193.79a73.273 73.273 0 0 1-21.782-25.347A72.513 72.513 0 0 1 55 134.907a73.363 73.363 0 0 1 1.483-14.694 72.455 72.455 0 0 1 10.984-26.07 73.193 73.193 0 0 1 32.118-26.416 72.695 72.695 0 0 1 13.703-4.246 73.805 73.805 0 0 1 29.424 0 72.64 72.64 0 0 1 26.103 10.97 73.134 73.134 0 0 1 26.448 32.077 72.452 72.452 0 0 1 4.254 13.686 73.46 73.46 0 0 1-.665 32.321 72.698 72.698 0 0 1-15.636 30.063A73.448 73.448 0 0 1 170.764 194z"/></svg>`;
const brand = () => `<div class="brand">${LOGO}<div><p class="bname">Amit Kumar Tiwari</p><p class="bsub">Dual Fluency · Talk Business. Talk Design.</p></div><span class="bsp"></span><p class="burl">designsbyamit.com</p></div>`;
const NS = { useCase: 'NorthStar GmbH · Accounts receivable: cutting DSO with an autonomous collections pilot', context: 'NorthStar makes food products for children, is headquartered in Germany and sells to retailers and distributors worldwide. The finance team wants to minimise days sales outstanding (DSO) and maximise collections. Users: collection executives. Figures are illustrative.' };
const banner = () => `<div class="banner"><p class="ov">Worked example · fictional company</p><p class="bt">${esc(NS.useCase)}</p><p class="bc">${esc(NS.context)}</p></div>`;
const anatomy = a => row([['Use it to', a[0]], ['Time', a[1]], ['Leads to', a[2]]].map(([l, t]) => `<div class="card">${ov(l)}<p class="strong">${esc(t)}</p></div>`), 240);
const footer = () => `<p class="foot">© 2026 Amit Kumar Tiwari · Dual Fluency · Talk Business. Talk Design. · designsbyamit.com · Kit v1.0</p>`;
function frame(t, blocks) {
  return `<article class="frame">${brand()}<header class="hdr">${ov(t.ov)}<h1>${esc(t.title)}</h1><p class="sub">${esc(t.sub)}</p></header>${ex() && t.example !== false ? banner() : ''}${t.anatomy ? anatomy(t.anatomy) : ''}${blocks()}${footer()}</article>`;
}
const TOOLS = [];
function tool(id, label, t, blocks) { const out = { single: t.example === false }; for (const m of (t.example === false ? ['tpl'] : ['tpl', 'ex'])) { MODE = m; PFX = id + '-' + m; FID = 0; out[m] = frame(t, blocks); } TOOLS.push({ id, label, ...out }); }

// ── 0. Overview ──
tool('start', 'Start here', { ov: 'Dual Fluency kit', title: 'Talk business. Talk design.', sub: 'A kit for designers and design leaders to understand business and design together, connect KPIs across both, and make decisions you can defend in either language.', example: false }, () => {
  const steps = [['warmup', 'Warm up', 'Icebreakers and the one question that starts every Dual Fluency conversation.'], ['map', 'Dual Fluency Map', 'Translate business goals and design goals into one shared "why".'], ['ninebox', '9-Box Framework', 'Frame the problem and the possibility, each with business and design KPIs.'], ['kpimap', 'KPI Mapping Row', 'Connect business KPIs to user KPIs and design metrics, stage by stage.'], ['library', 'KPI Library & Correlations', 'Look up 40+ KPIs with targets, and see which ones move together.'], ['roadmap', 'Roadmap & Strategy Statement', 'Move from insight to action and write the one sentence that sells it.'], ['decide', 'Decision Check', 'Compare options on business impact, user impact, evidence and effort.'], ['practice', 'Practice Cases', 'Build the muscle on six real-world headlines.']];
  return sec('How the kit fits together', 'Work left to right. Each tool has a blank Template and a filled Example for NorthStar, a fictional food manufacturer. Switch with the toggle at the top.', `<ol class="flow">${steps.map(([id, n, d], i) => `<li><a href="#${id}"><span class="n">${i + 1}</span><b>${n}</b><span>${d}</span></a></li>`).join('')}</ol>`)
    + sec('The three metric layers', 'Every conversation in this kit moves between three layers. Business KPIs say what the company needs. User KPIs say what people achieve. Design metrics say what the experience does to make that happen.', row([['Business KPIs', 'Revenue, Retention, CAC, NPS'], ['User KPIs', 'Task Success Rate, Time on Task, DAU/MAU, Error Rate'], ['Design metrics', 'SUS, Findability, Cognitive Load, Accessibility Score']].map(([a, b]) => `<div class="card">${ov(a)}<p class="strong">${b}</p></div>`), 240))
    + sec('Who it is for', null, row([['Designers', 'Learn to explain the value of design work in terms a product manager or CFO acts on.'], ['Design leaders', 'Make prioritisation and investment cases that connect craft to company outcomes.'], ['Workshops', 'Run the tools in sequence as a half-day team session. Print-free: everything works on a laptop or phone.']].map(([a, b]) => `<div class="card">${ov(a)}<p class="strong">${b}</p></div>`), 240));
});

// ── 1. Warm up ──
tool('warmup', 'Warm up', { ov: 'Tool 1 · Warm up', title: 'Warm up', sub: 'Start the session in both languages. Half of these cards use everyday business jargon, half are about design and the people in the room.', anatomy: ['Open a workshop or team conversation and get everyone talking.', '10 minutes', 'The Dual Fluency Map.'], example: false }, () => {
  const all = [...K.icebreakers.jargon.map(([t, q]) => ({ t, q, k: 'Business jargon' })), ...K.icebreakers.design.map(q => ({ t: '', q, k: 'Design and you' }))];
  return sec('The question that starts every session', null, `<div class="why"><p class="ov">Why talk business?</p><p class="whyq">${esc(K.whyTalk)}</p></div>`)
    + sec('Draw a card', 'Each person draws one and answers in under a minute.', `<div class="draw"><div class="dcard" id="dcard" aria-live="polite"><p class="ov" id="dk">Business jargon</p><p class="dt" id="dt">Move the needle</p><p class="dq" id="dq">What's moving the needle for you right now?</p></div><button type="button" class="btn" id="drawbtn">Draw another card</button></div><script type="application/json" id="deck">${JSON.stringify(all).replace(/</g, '\\u003c')}</script>`)
    + sec('All 30 cards', null, `<div class="deck">${all.map(c => `<div class="mini ${c.k === 'Business jargon' ? 'j' : 'd'}"><p class="ov">${c.k}</p>${c.t ? `<b>${esc(c.t)}</b>` : ''}<p>${esc(c.q)}</p></div>`).join('')}</div>`);
});

// ── 2. Dual Fluency Map ──
tool('map', 'Dual Fluency Map', { ov: 'Tool 2 · Dual Fluency Map', title: 'Dual Fluency Map', sub: 'Put what the business wants and how design will deliver it side by side, then write the value translation that connects them.', anatomy: ['Agree what the business needs (What), what design will change (How), and the shared value (Why).', '20 minutes', 'The 9-Box Framework.'] }, () => {
  const ns = { what: 'Cut DSO from 52 to 45 days and raise collection effectiveness, without harming relationships with key retailers.', why: 'Cash arrives sooner and more predictably, which frees working capital for ingredient buying in a volatile commodity market.', how: 'Give collection executives a risk-ranked worklist and an agent that handles routine reminders and payment matching.' };
  const circles = `<div class="wwh"><div class="cw what">${ov('What?')}<p class="cl">Business</p>${val(ns.what, 90, 'What does the business need?')}</div><div class="arrow" aria-hidden="true">→</div><div class="cw why2">${ov('Why?')}<p class="cl">Value translation</p>${val(ns.why, 90, 'Why does it matter to both?')}</div><div class="arrow" aria-hidden="true">←</div><div class="cw how">${ov('How?')}<p class="cl">Design</p>${val(ns.how, 90, 'How will design deliver it?')}</div></div>`;
  const exRows = [['Reduce DSO', 'Make the next best action obvious for every overdue account'], ['Increase collection effectiveness', 'Cut the time executives spend on low-risk reminders'], ['Lower cost to collect', 'Automate routine reminders with clear, inline oversight'], ['Protect retailer relationships', 'Tune tone and timing of reminders for each customer segment'], ['Fewer disputes reaching legal', 'Surface dispute signals early, with the full context attached']];
  return sec('What · Why · How', null, circles)
    + sec('Business goals ↔ Design goals', 'Pair each business goal with the design goal that serves it. The Template starts with the reference pairs from the original kit.', table(['Business goals', 'Design goals'], 0, exRows, [null, null], K.mapGoals.map(r => [...r]).concat([['', ''], ['', '']])));
});

// ── 3. 9-Box ──
tool('ninebox', '9-Box Framework', { ov: 'Tool 3 · 9-Box Dual Fluency Framework', title: '9-Box Framework', sub: 'Frame the problem and the possibility in both languages. The left cross describes today; the right cross describes what design makes possible.', anatomy: ['Turn goals into a problem statement and a solution, each measured by business and design KPIs.', '30 minutes', 'The KPI Mapping Row.'] }, () => {
  const v = { bg: 'Reduce DSO; protect relationships with key retailers.', bk1: 'DSO 52 days. 18% of receivables more than 60 days overdue.', ps: 'Executives spend most of their day on routine reminders, so high-risk overdue accounts get attention too late.', dk1: '9 minutes per account. 40% of worklist items are routine reminders.', pv: 'Get cash in sooner without damaging retailer relationships.', ss: 'An agent handles routine reminders and payment matching; executives work a risk-ranked list of accounts that need a human.', bk2: 'DSO 45 days. Collection effectiveness index above 90%.', dk2: 'User override rate under 10%. Time to first trust under 3 sessions. Top task success above 80%.', dg: 'Make the next best action obvious, and keep executives in control of anything sensitive.' };
  const b = (cls, label, key, h) => `<div class="nb ${cls}">${ov(label)}${val(v[key], h || 70)}</div>`;
  return sec('The 9 boxes', 'Fill the centre row first, then the KPIs above (business) and below (design) each cross.', `<div class="tw"><div class="nine">${b('a', 'Business KPIs', 'bk1')}${b('b', 'Business KPIs', 'bk2')}${b('c', 'Business Goals', 'bg')}${b('d', 'Problem Statement', 'ps', 90)}${b('e', 'Purpose / Value', 'pv')}${b('f', 'Solution / Possibility', 'ss', 90)}${b('g', 'Design Goals', 'dg')}${b('h', 'Design KPIs', 'dk1')}${b('i', 'Design KPIs', 'dk2')}</div></div>`)
    + sec('Check your 9-Box', null, `<div class="card list">${['Every KPI has a current value and a target.', 'The problem statement names who is affected and what it costs.', 'The solution can be tested before it is fully built.', 'A finance or product leader would recognise the business KPIs.'].map(q => check(q, true)).join('')}</div>`);
});

// ── 4. KPI Mapping Row ──
tool('kpimap', 'KPI Mapping Row', { ov: 'Tool 4 · KPI Mapping Row', title: 'KPI Mapping Row', sub: 'Goal: connect business goals to user and design impact, one stage of the journey at a time.', anatomy: ['Show exactly where design changes a business number.', '30 minutes', 'Roadmap and Strategy Statement.'] }, () => {
  const exRows = [['Invoice issued', 'Invoices accepted first time', 'Customer queries per 100 invoices', 'Invoice clarity (comprehension test)', 'Clear invoices prevent the disputes that delay cash.'], ['Reminder', 'Overdue accounts contacted within 3 days', 'Executive time per reminder', 'Reminders sent without edits (%)', 'Early contact is the strongest lever on DSO.'], ['Commitment', 'Promise-to-pay rate', 'Promises logged per hour', 'Top task success: log a promise', 'A logged promise turns a chase into a forecast.'], ['Payment', 'DSO; cash collected vs forecast', 'Unmatched payments per day', 'AI response accuracy for payment matching', 'Cash only counts once it is matched to an invoice.'], ['Relationship', 'Disputes escalated to legal; retailer NPS', 'Complaints per 1,000 reminders', 'Perceived trustworthiness (customer survey)', 'Collections must not cost NorthStar its shelf space.']];
  return sec('KPI Mapping Row', ex() ? 'NorthStar adapted the funnel stages to its collections journey. Rename the stages to fit any journey.' : 'The default stages follow a customer funnel. Rename them to fit your journey.', table(['Funnel stage', 'Business KPIs', 'User KPIs', 'Design metrics', 'Why it matters'], 0, exRows, [150, null, null, null, null], K.funnel.map(s => [s, '', '', '', ''])), 'Goal: connect business goals to user and design impact.')
    + sec('Tips', null, row([['Pick from the library', 'Use the KPI Library tool for definitions, targets and levers.'], ['One number per cell', 'If a cell needs two KPIs, the stage is probably two stages.'], ['Say it out loud', '"If this design metric improves, this user KPI moves, and the business sees…"']].map(([a, b]) => `<div class="card">${ov(a)}<p class="strong">${b}</p></div>`), 240));
});

// ── 5. KPI library + correlations ──
tool('library', 'KPI Library', { ov: 'Tool 5 · KPI Library & Correlations', title: 'KPI Library & Correlations', sub: 'Every KPI from the kit in one place, plus a finder that shows which business, user, design and AI measures tend to move together.', anatomy: ['Choose the right measures, and see what else is likely to move when one does.', 'As needed', 'Any tool in the kit.'], example: false }, () => {
  const L = K.kpis;
  const finder = `<div class="finder"><div class="goals" role="tablist" aria-label="Business goal">${K.chains.map((c, i) => `<button type="button" role="tab" data-chain="${i}" aria-selected="${i === 0}">${esc(c.goal)}</button>`).join('')}</div><div id="chain" class="chain" aria-live="polite"></div><p class="hint">These links are starting hypotheses written for this kit, not proven correlations. Confirm each one with your own data before you commit to it.</p></div><script type="application/json" id="chains">${JSON.stringify(K.chains).replace(/</g, '\\u003c')}</script><script type="application/json" id="kpidefs">${JSON.stringify(Object.fromEntries([...L.business.map(k => [k[0], k[1]]), ...L.user.map(k => [k[0], k[1]]), ...L.design.map(k => [k[0], (k[1] ? 'Target ' + k[1] + '. ' : '') + k[3]]), ...L.ai.map(k => [k[0], 'Target ' + k[1] + '. ' + k[3]])])).replace(/</g, '\\u003c')}</script>`;
  const simple = (rows, src) => `<div class="tw"><table><thead><tr><th style="width:220px">KPI</th><th>Definition</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1])}</td></tr>`).join('')}</tbody></table></div>`;
  const full = rows => `<div class="tw"><table><thead><tr><th style="width:200px">KPI</th><th style="width:130px">Target</th><th>Context of use</th><th>Meaning</th><th>Levers to improve</th></tr></thead><tbody>${rows.map(r => `<tr><td>${esc(r[0])}</td><td>${esc(r[1] || '—')}</td><td>${esc(r[2] || '—')}</td><td>${esc(r[3])}</td><td>${esc(r[4] || '—')}</td></tr>`).join('')}</tbody></table></div>`;
  return sec('Correlation finder', 'Pick a business goal to see the chain of measures that usually move with it.', finder)
    + `<div class="filter"><label for="kq">Search the library</label><input id="kq" type="search" placeholder="Try trust, onboarding, churn…" autocomplete="off"></div>`
    + sec('Business KPIs', null, simple(L.business)) + sec('User KPIs', null, simple(L.user)) + sec('Design KPIs', null, full(L.design)) + sec('AI design KPIs', 'For AI, agentic and conversational experiences.', full(L.ai));
});

// ── 6. Roadmap + statement ──
tool('roadmap', 'Roadmap & Statement', { ov: 'Tool 6 · Roadmap & Design Strategy Statement', title: 'Roadmap & Strategy Statement', sub: 'Goal: move from insight to action. Define the change journey, then compress it into one sentence anyone can repeat.', anatomy: ['Plan the change and win support for it.', '30 minutes', 'The Decision Check.'] }, () => {
  const exRows = [['Executives work a flat list sorted by amount', 'Risk-ranked worklist with a next best action per account', 'Credit manager; data team', 'Highest-risk accounts are contacted first'], ['Reminders written by hand', 'Agent drafts reminders in the customer\'s language; executives approve until accuracy is proven', 'Legal (templates); sales account owners', 'Routine reminders run automatically'], ['Payments matched manually at month end', 'Agent matches daily; uncertain matches go to a review queue', 'AR accounting', 'Daily matching; faster month-end close'], ['Disputes discovered late', 'Dispute signals shown in the worklist with full context', 'Sales; customer service', 'Disputes resolved before 60 days']];
  const st = ex() ? `<p class="stmt">“By <b>giving collection executives a risk-ranked worklist and an agent for routine reminders</b>, we will <b>cut the time spent on low-risk accounts and reach high-risk ones first</b>, leading to <b>a DSO of 45 days without harming retailer relationships</b>.”</p>`
    : `<p class="stmt">“By <input id="${fid()}" data-save aria-label="By" placeholder="the change you will make">, we will <input id="${fid()}" data-save aria-label="we will" placeholder="what it will do">, leading to <input id="${fid()}" data-save aria-label="leading to" placeholder="the business outcome">.”</p>`;
  return sec('Roadmap', null, table(['As-is state', 'Design intervention', 'Allies', 'To-be state'], 5, exRows, [null, null, 200, null]), 'Goal: move from insight to action. Define the change journey.')
    + sec('Design Strategy Statement', null, `<div class="card">${st}</div>`);
});

// ── 7. Decision check ──
tool('decide', 'Decision Check', { ov: 'Tool 7 · Decision Check', title: 'Decision Check', sub: 'Compare options before you commit. Score each 1–5. The score rewards impact you can evidence and penalises effort.', anatomy: ['Choose between options with both business and design in view.', '20 minutes', 'A decision you can defend to any stakeholder.'] }, () => {
  const exOpts = [['Risk-ranked worklist', 5, 4, 4, 2], ['Agent for routine reminders', 4, 5, 3, 3], ['Customer self-service payment portal', 3, 3, 2, 5]];
  const head = `<thead><tr><th>Option</th><th>Business impact</th><th>User impact</th><th>Confidence in evidence</th><th>Effort</th><th>Score</th></tr></thead>`;
  const score = (b, u, c, e) => ((b + u) * c / e).toFixed(1);
  const body = ex() ? exOpts.map(o => `<tr><td>${esc(o[0])}</td><td>${o[1]}</td><td>${o[2]}</td><td>${o[3]}</td><td>${o[4]}</td><td><b>${score(o[1], o[2], o[3], o[4])}</b></td></tr>`).join('')
    : [1, 2, 3, 4].map(i => `<tr data-opt><td><input id="${fid()}" data-save aria-label="Option ${i}" placeholder="Option ${i}"></td>${['b', 'u', 'c', 'e'].map(k => `<td><input type="number" min="1" max="5" step="1" id="${fid()}" data-save data-k="${k}" aria-label="${k}" class="num"></td>`).join('')}<td><b data-score>—</b></td></tr>`).join('');
  return sec('Score the options', 'Score = (Business impact + User impact) × Confidence ÷ Effort.', `<div class="tw"><table class="dec">${head}<tbody>${body}</tbody></table></div>` + (ex() ? card('Decision', null, 'Start with the risk-ranked worklist: highest score and strongest evidence. Run the reminder agent as a pilot in one country in parallel. Revisit the payment portal once DSO data shows how many late payments are simply friction.') : ''))
    + sec('Before you decide', 'A decision is ready when you can answer yes to all five.', `<div class="card list">${['Can you state the business outcome in one sentence a CFO would accept?', 'Do you know which user KPI moves first, and how you will see it?', 'Is there evidence beyond opinion (data, research, a test)?', 'Do you know who must be an ally, and have you asked them?', 'Do you know what you will stop doing to make room for this?'].map(q => check(q, true)).join('')}</div>`);
});

// ── 8. Practice cases ──
tool('practice', 'Practice Cases', { ov: 'Tool 8 · Practice Cases', title: 'Build the muscle for Dual Fluency', sub: 'Six real headlines. For each, define the potential business impact and the design goals. Use of phones is allowed.', anatomy: ['Practise translation on problems outside your own product.', '10 minutes per case', 'Faster, sharper translation on your own work.'], example: false }, () =>
  sec('The cases', null, `<div class="cases">${K.cases.map(([h, tag]) => `<div class="case"><p class="ov">${esc(tag)}</p><p class="ch">${esc(h)}</p><p class="lbl">Define potential business impact</p>${area(70)}<p class="lbl">Define design goals</p>${area(70)}</div>`).join('')}</div>`)
  + sec('A worked answer', 'One way to answer the Apollo Hospitals case. Treat it as an illustration, not the right answer.', row([['Potential business impact', 'More patients seen per doctor-hour; higher satisfaction and repeat visits; fewer walk-outs; better use of expensive consultant time.'], ['Design goals', 'Make waiting visible and predictable; move registration and payment out of the queue; route patients by urgency; give staff a live view of bottlenecks.']].map(([a, b]) => `<div class="card">${ov(a)}<div class="value">${b}</div></div>`), 300)));

// ── page ──
const css = fs.readFileSync(__dirname + '/style.css', 'utf8');
const tabs = TOOLS.map(k => `<a class="tab" href="#${k.id}" data-kit="${k.id}">${esc(k.label)}</a>`).join('');
const panels = TOOLS.map(k => k.single ? `<div class="panel" data-panel="${k.id}" hidden>${k.tpl}</div>` : `<div class="panel" data-panel="${k.id}" hidden><div data-mode="tpl">${k.tpl}</div><div data-mode="ex" hidden>${k.ex}</div></div>`).join('');
const js = fs.readFileSync(__dirname + '/kit.js', 'utf8').replace('__KITS__', JSON.stringify(TOOLS.map(k => k.id)));
const html = `<meta charset="utf-8">
<title>Dual Fluency Kit</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<style>${css}</style>
<div class="shell">
<nav class="bar" aria-label="Kit tools"><div class="tabs">${tabs}</div><div class="modes" role="group" aria-label="View"><button type="button" data-set="tpl" aria-pressed="true">Template</button><button type="button" data-set="ex" aria-pressed="false">Example · NorthStar</button></div></nav>
${panels}
<p class="note">Your notes in the templates stay in this browser only.</p>
</div>
<script>${js}</script>`;
fs.writeFileSync(__dirname + '/dual-fluency-kit.html', html);
console.log('ok', html.length);
