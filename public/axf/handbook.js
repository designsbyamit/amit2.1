/* Handbook layer: depths, lenses, experience bar, non-negotiables, worksheets, briefs for the reframe studio. */
(function(){
const A=window.AXF;
A.LEVELS=[
 {id:1,name:"Essentials",time:"About 20 min a chapter",d:"The non-negotiables only: three must-dos, one worksheet and the check before you move on. Enough to build an agent responsibly."},
 {id:2,name:"Deep",time:"Reference depth",d:"Adds the full method, red flags, deeper questions, every decision tool and the AI skills. Only what genuinely changes the outcome."}
];
A.OBJECTIVE="People love an agent that is easy and worth using, and trust one that works and keeps them in control. This handbook gets you both, across four lenses at once, within the standards of a great enterprise experience.";
A.LENSES=[
 {id:"functional",name:"Functional",ask:"Does it work?",d:"Does the job correctly and reliably on real data, and fails safely.",
  c:["Does the job correctly on real data, not only demo data","Fails without losing work, and always offers a way out","Fast enough for the moment it is used in"]},
 {id:"viable",name:"Viable",ask:"Is it worth it?",d:"Moves a business outcome at a sustainable cost, on the platform you have.",
  c:["Moves the outcome metric against a recorded baseline","Cost per run is sustainable at real volume","Buildable and maintainable on the platform and data you have"]},
 {id:"usable",name:"Usable",ask:"Is it easy?",d:"Fits the work people already do, with fewer steps and no re-explaining.",
  c:["Lives inside the existing workflow; nobody re-explains context","Fewer steps than today for the most common case","Accessible: keyboard, screen reader and contrast (WCAG 2.2 AA)"]},
 {id:"desirable",name:"Desirable",ask:"Will they love it?",d:"Earns the right amount of trust, and feels calm, consistent and crafted.",
  c:["People see why, and trust it the right amount","Calm and consistent, built from the design system","Crafted: clear hierarchy, considered type, spacing and motion"]}
];
A.PERIMETER=["Role-based access: the agent never exceeds the user's rights","Audit trail of what the agent and each person did","Privacy and data residency respected end to end","Localisation: languages, currencies, dates and units","Works at enterprise scale: many records, dense data, many roles","Governed: prompts, models and policies versioned and owned"];

const X={
untangle:{name:"Untangle and reframe",lenses:["viable","desirable"],tool:"reframe",
 why:"Real briefs mix the struggle, the business goal, hard constraints and solution ideas in one breath. Separate them before anything else, or you will design for the constraint instead of the person.",
 must:["Sort the brief into struggles, outcomes, givens, ideas and assumptions. Nothing stays unsorted.","Write the reframe with no technology in it: who, the job, why it fails today, what it costs.","Keep the givens that change what people experience visible in the reframe, and park the solution ideas for Shape."],
 fields:[["who","Who struggles","One role, as specific as you can: \"maintenance coordinator\", not \"users\"."],["job","What they are trying to get done","A verb phrase: \"act on the riskiest defects first\"."],["fails","Why it fails today","The cause, in their world: scattered data, manual steps, missing signal."],["cost","What it costs today","Time, money, errors, risk, reputation. Numbers if you have them."],["outcome","What would be better","The result, not the feature."],["givens","Givens to design within","Laws, safety, contracts, data limits, systems. One per line."],["parked","Solution ideas, parked for Shape","Useful, but not the problem."],["assume","Assumptions to test","What you believe but have not checked."]]},
people:{lenses:["usable","desirable"],
 must:["Watch at least three real people do the task. Ask them to show the last time, not describe it.","Map today in five to eight steps and mark where judgment is needed.","Name everyone the agent's actions reach, including people who never use it."],
 fields:[["primary","Primary user: goal and pain",""],["affected","Everyone else the agent's actions reach","Approvers, customers, crews, auditors."],["steps","Today's steps, five to eight","One per line."],["judgment","Where judgment is needed","These steps stay with people or need approval."],["data","Data each step uses, and where it lives","This becomes the agent's context."],["trust","What they trust today, and why",""]]},
finish:{lenses:["viable","functional"],
 must:["Write one outcome sentence: [person] has [outcome] without [effort].","Record a baseline and a target for one outcome metric, or a dated plan to measure it.","Add one trust metric and write the non-goals."],
 fields:[["anchor","Done means","[person] has [outcome] without [effort]."],["metric","Outcome metric: baseline to target",""],["quality","Quality metric","Is the output right?"],["trustm","Trust metric","Accept, edit and override rates."],["nongoals","Non-goals","What this will deliberately not do."]]},
rightsize:{lenses:["viable","functional"],tool:"agentcheck",
 must:["Give every step the simplest approach: rule, prediction, generation or agent.","Use an agent only where the next action depends on what it finds.","Write the no-AI fallback: how the job still gets done if the model is down."],
 fields:[["approach","Step, approach and why","One step per line: step - approach - why."],["keeps","What the person keeps",""],["fallback","No-AI fallback",""]]},
autonomy:{lenses:["desirable","functional"],tool:"autonomy",
 must:["Give every action a level from 0 (inform) to 4 (act alone).","Anything external or irreversible needs a person's approval, enforced in code.","Write what earns an action more autonomy later."],
 fields:[["actions","Action, impact, undo, level","One action per line."],["enforce","Where approval is enforced","The tool layer, not the prompt."],["earn","What earns more autonomy","For example, 95% accepted without edits over four weeks."]]},
golden:{name:"Design the golden path",lenses:["usable","desirable"],tool:"bar",
 why:"Agentic experiences unfold over time inside real work. Design the ideal run first, in the surface people already use, and hold it to the experience bar before you build.",
 must:["Script the ideal run in five to seven beats: what the person sees, what the agent does, where it happens.","Mark the control moments where a person steers, pauses or approves.","Check the design against the four lenses and the enterprise perimeter, built from your design system."],
 fields:[["unit","Unit of work on screen","The thing people plan their day around: a customer, an asset, a case."],["beats","Beats: person sees, agent does, surface","One beat per line."],["control","Control moments",""],["craft","What must feel right","Hierarchy, density, tone, the one moment of delight or calm."]]},
failure:{lenses:["functional","desirable"],tool:"fails",
 must:["Give every likely failure a response: what the agent says, does, and how the person recovers.","Make sure every response has a way out: edit, reject, undo or hand over.","Make sure the job can be finished without AI, even if slower."],
 fields:[["fails","Failure, says, does, person can","One failure per line."],["wayout","Ways out","Edit, reject, retry, undo, hand over."],["noai","When AI is unavailable",""]]},
ground:{lenses:["functional","viable"],
 must:["Name the source of truth and freshness for every piece of context.","Give each tool the least access it needs, never wider than the user's.","Set limits for steps, retries, time and cost, and a tested stop switch."],
 fields:[["context","Context: source, owner, freshness",""],["tools","Tools: read or write, scope",""],["instructions","Instructions: role, goals, non-goals, tone",""],["limits","Limits and stop switch",""],["never","Data that never crosses a boundary",""]]},
slice:{lenses:["functional","viable"],
 must:["Build one path end to end, from signal to outcome, on real or realistic data.","Include the approval gate and one failure state in the slice.","Leave a trace of every run that you can replay."],
 fields:[["scenario","User and scenario",""],["path","Path: signal to outcome",""],["inout","In the slice, and not yet",""],["risk","Riskiest integration",""]]},
evals:{lenses:["functional","usable","desirable"],tool:"bar",
 must:["Keep 20 or more real cases with expected behaviour, rerun on every change.","Test with five real users on real tasks, with one planted error.","Score the four lenses and fix the weakest before launch."],
 fields:[["cases","Eval set: cases and pass target",""],["rubric","Rubric","Correct, helpful, safe, on tone."],["people","People test: tasks, planted error, findings",""],["barnote","Experience bar: weakest lens and the fix",""]]},
redteam:{lenses:["functional","viable"],
 must:["Try all four attacks: injection, escalation, runaway and leak.","Fix each finding at the right layer: permissions in code, filters in the pipeline, only tone in the prompt.","Add every finding to the eval set."],
 fields:[["injection","Injection: tried, result, fix",""],["escalation","Escalation: tried, result, fix",""],["runaway","Runaway: tried, result, fix",""],["leak","Leak or harm: tried, result, fix",""]]},
ship:{lenses:["viable","functional","desirable"],
 must:["Release to a small group with the old way still available.","Review outcome, quality and trust signals, and a sample of real runs, every week.","Make a dated decision: scale, tune or stop. Take the learning back to Frame."],
 fields:[["pilot","Pilot group",""],["signals","Signals: outcome, quality, trust",""],["stop","Stop if",""],["decision","Decision and date",""]]}
};
A.MOVES.forEach(m=>{const x=X[m.id];if(!x)return;Object.assign(m,x);m.fields=x.fields.map(f=>({k:f[0],label:f[1],hint:f[2]}))});

A.G.push(
 {n:11,grp:"Experience",name:"Designed in, not bolted on",rule:"The agent lives inside the work people already do, built from the design system, accessible to WCAG 2.2 AA.",chk:"Does it use your design system and pass an accessibility check?",m:"golden"},
 {n:12,grp:"Experience",name:"Calm by default",rule:"Show what a person needs to decide, with detail on demand. No surprise motion, noise or walls of AI text.",chk:"Can someone decide from the first screen without scrolling through AI output?",m:"golden"}
);
A.GRP.Experience="Make it worth using.";

A.BRIEFS={
 urban:{name:"Urban trees brief",lines:[
  ["Street trees (680,000+) are maintained reactively, triggered by citizen reports or near-failure conditions","s"],
  ["Field workers are dispatched without travel optimisation","s"],
  ["Physical site visits are required to verify completion before invoices can be approved","s"],
  ["No centralised, consistent process for creating work requests across asset classes","s"],
  ["Work orders are created inconsistently with incomplete data, leading to poor assignment quality","s"],
  ["A 70-vehicle waste fleet with cameras scans every street every 100 m; the feed goes unused","g"],
  ["Cameras classify defects and score severity","i"],
  ["Auto-create work orders pre-populated with defect type, severity, GPS, skills and images","i"],
  ["Before and after image comparison triggers completion and the invoice","i"],
  ["Faces and number plates must be removed before data leaves the camera system","g"],
  ["Coverage depends on waste collection fleet routes","g"],
  ["Integration required: camera platform, integration layer, asset management, field service","g"],
  ["The end-to-end cycle must complete without manual triage","g"],
  ["A human review step may be required before work-order creation for AI-flagged defects","g"],
  ["Shift from reactive to proactive maintenance across 680,000+ trees","o"],
  ["20 to 35% less field worker time lost to avoidable travel","o"],
  ["No physical site verification for invoice approval","o"],
  ["Less public liability from undetected safety risks","o"]]},
 rca:{name:"8D quality brief",lines:[
  ["8D problem-solving is handled manually through meetings and the audit system","s"],
  ["Searching for similar past issues requires manual effort","s"],
  ["Suppliers submit 8D reports as PDFs in inconsistent formats, evaluated by hand","s"],
  ["Corrective action effectiveness is not tracked systematically","s"],
  ["Some plants follow only 4D; the process must be standardised before AI is added","g"],
  ["The formalised 8D process must be digitised before the AI layer is added","g"],
  ["Requires 6 months of historical issues, root causes and corrective actions from all four plants","g"],
  ["Supplier 8D and quality records are required as input data","g"],
  ["Human approval is mandatory at each D-step; no full automation","g"],
  ["NDA approval is required for data sharing","g"],
  ["Find similar past cases with vector search","i"],
  ["Generate a fishbone diagram and 5-Why with a proposed root cause","i"],
  ["Map supplier 8D PDFs into the standard 8D format","i"],
  ["Significantly less time for 8D problem-solving across all plants","o"],
  ["Consistent root cause identification and corrective action management","o"],
  ["Standardised handling of supplier 8D submissions in all formats","o"],
  ["Systematic tracking of corrective action effectiveness","o"]]},
 own:{name:"Your own brief",lines:[]}
};
A.TAGS=[["s","Struggle","Someone feels this today"],["o","Outcome","A result the business wants"],["g","Given","A fact you cannot change"],["i","Idea","A solution in disguise"],["a","Assumption","Believed, not yet checked"]];

/* worked reframes (proposals: the framework applied) */
A.CASES.collections.e.untangle.push("~ Reframe: How might we help collection specialists decide whom to contact, about what and when, with the context already assembled, so that cash arrives sooner without contacting anyone twice. Within: one legal scope per action (Company Code), Segment isolation, strategy currency, the enterprise UI framework, and nothing reaching a customer without a person.");
A.CASES.urban.e.untangle.push("~ Reframe: How might we help maintenance coordinators act on the riskiest tree defects first, with evidence crews and finance can trust, so that maintenance becomes proactive and avoidable travel and verification visits fall. Within: privacy-safe images only, coverage limited to fleet routes, the existing camera, asset and field service systems, no manual triage, and a person reviewing AI-flagged defects where required.","~ Parked for Shape: auto-created work orders, before and after comparison, severity scoring. Good ideas, not the problem.");
A.CASES.rca.e.untangle.push("~ Reframe: How might we help quality engineers reach a sound root cause and corrective action faster and more consistently across four plants, so that problems do not repeat. Within: a person approves every D-step, the 8D process is digitised and standardised first, six months of history, supplier reports in any format, and data shared under NDA.","~ Parked for Shape: vector search, generated fishbone and 5-Why, PDF mapping.");
})();
