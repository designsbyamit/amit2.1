// Filled examples for the chapter 5 worksheets. Same fictional company (NorthStar GmbH). Arrays line up, in order, with the fillable
// fields in ch5-docs.mjs ('' = left blank). Figures are illustrations, not benchmarks.
const row = (...c) => c

export const intro = 'NorthStar GmbH · A design team of four (Priya, Jonas, Mei and Lars) has used AI tools for a year, mostly on their own. You are the design lead, and you want the team to use AI on purpose.'

export const examples = {
  'ai-maturity-assessment-worksheet': { checked: [[]], slots: [
    'NorthStar design team, four designers and a researcher, serving the procurement products.',
    'Three recent project files, two design reviews, the agent-assisted RFQ pilot, and a short written account from each person of one time AI got it wrong.',
    // 8 dimensions x (score, evidence, next)
    ...row('3', 'Everyone can explain what the tools do and where they fail. Two people have not tested their limits.', 'A shared test of failure cases, run by each person'),
    ...row('3', 'Four tools in regular use, chosen by individuals. No team list or review of what each is for.', 'One shared list, with a reason for each tool'),
    ...row('3', 'Used for research summaries and early concepts. Not yet in critique or in craft decisions.', 'Use AI output in critique, with the reasoning shown'),
    ...row('2', 'Each person has a private routine. No shared workflow, so the gains stay with individuals.', 'Redesign one team workflow with checkpoints'),
    ...row('2', 'We are designing the agent behaviour for the first time. Few patterns for trust or error recovery.', 'A pattern set for explanation and recovery'),
    ...row('1', 'Nobody judges AI output against a standard. Quality is “looks fine”.', 'A simple rubric, used in reviews'),
    ...row('2', 'We follow company policy but have nothing of our own for design work.', 'A short usage charter, agreed with legal'),
    ...row('3', 'Leadership is supportive. The team is curious but some worry about their roles.', 'Name the worry out loud and show how roles grow'),
    'Level 2 to 3. Tools and literacy are ahead of practice. Evaluation holds everything back, because we cannot tell good output from plausible output.',
    'Evaluation. Without a way to judge output, faster work is only faster, not better.',
    '1. Write a rubric for judging AI output. 2. Redesign the RFQ summary workflow with a human checkpoint. 3. Draft a usage charter and take it to legal.',
  ] },

  'ai-capability-matrix-worksheet': { checked: [[0, 1, 2, 4, 5]], slots: [
    ...row('Priya, senior designer', '3', 'AI-enabled design practice', 'Data and evaluation', '4', 'E: judging AI output'),
    ...row('Jonas, designer', '2', 'Tools and ecosystem', 'Responsible AI', '3', 'F: responsible AI'),
    ...row('Mei, designer', '2', 'AI literacy', 'Workflow intelligence', '3', 'C: workflows and agents'),
    ...row('Lars, researcher', '2', 'Data and evaluation', 'AI product expertise', '3', 'D: designing AI products'),
    'Priya: lead the rubric review each month. Jonas: write the case for one amber-zone decision. Mei: map a workflow and name the judgement calls. Lars: run a session on where users stop trusting the agent.',
  ] },

  'ai-usage-charter-worksheet': { checked: [[0, 1, 2, 3, 4, 7]], slots: [
    ...row('Research summaries, naming ideas, early layouts, writing drafts with no company data in them', 'Use freely. Say that AI was used. A person reviews before it is shared.'),
    ...row('Anything using customer data, supplier data or unreleased product details; any output shown to users', 'Use only approved tools. A second person checks. Record what was used.'),
    ...row('Personal data in public tools, replacing real user research with generated users, shipping unreviewed output', 'Do not do this. Raise it with the lead.'),
    ...row('What problem are we solving, and is AI the right tool for it?', 'Design lead', 'A line in the brief'),
    ...row('Whose data are we using, and may we use it?', 'Design lead and data owner', 'A note in the project file'),
    ...row('Did we choose this, or did the tool?', 'A peer in critique', 'Reasoning shown in the review'),
    ...row('Does the output work for people with different needs?', 'Accessibility partner', 'A test record'),
    ...row('How do we know it is good? Against what rubric?', 'Two people', 'The rubric result'),
    ...row('Is AI use disclosed, and can users correct it?', 'Product partner', 'The release checklist'),
    ...row('What went wrong, and what do we change in the charter?', 'The whole team', 'A line in the monthly review'),
    'Company AI policy, and the data protection rules that apply to our supplier and buyer data. Checked with legal in October. Legal will confirm what applies in each country we sell in.',
    'Priya owns it. We review it on the first Monday of each quarter.',
  ] },

  'ai-workflow-redesign-worksheet': { checked: [[0, 1, 2, 3]], slots: [
    'Turning supplier call notes into a clear RFQ summary for buyers.',
    'It takes about two hours each time, errors reach buyers, and it serves our goal to cut time to send an RFQ.',
    ...row('Capture notes from the supplier call', 'Designer', 'Designer, with an AI transcript', 'Designer checks the transcript against memory', 'The transcript misses a number or a name'),
    ...row('Draft the summary', 'Designer', 'AI drafts, designer edits', 'Designer reads every line against the notes', 'The draft sounds sure of something that was only discussed'),
    ...row('Check against the buyer’s requirements', 'Designer', 'Designer', 'Peer review for any change to price or quantity', 'A requirement is missed'),
    ...row('Send to the buyer', 'Designer', 'Designer', 'Designer signs it as theirs', 'The buyer thinks the supplier agreed to something they did not'),
    ...row('Learn from corrections', 'Nobody', 'Designer and AI, weekly', 'Lead reviews corrections monthly', 'The same error keeps happening'),
    ...row('Time to send a summary', '2 hours', '45 minutes', 'Timestamps in the RFQ tool'),
    ...row('Corrections after sending', '6 in 20 summaries', '1 in 20', 'Count from buyer replies'),
    ...row('Designer confidence in the summary', 'Not measured', '4 out of 5', 'A one-question check each week'),
    'Keep, with changes. Time fell to about an hour. Corrections fell, but the AI still overstates agreement, so the peer check on price and quantity stays.',
  ] },

  'ai-six-month-roadmap-tracker': { checked: [], slots: [
    '2, tools and literacy ahead of practice',
    '3. One level in six months is realistic for a team of four with a part-time lead. Two would mean cutting corners on evaluation.',
    ...row('Foundations and a clear baseline', 'Run the assessment. Agree the charter. Pick the one workflow.', 'Assessment, charter v1', 'Priya', 'Everyone has scored from evidence'),
    ...row('Build the habit', 'Weekly show-and-tell. Start the rubric.', 'Rubric v1, tool list', 'Jonas', 'Each person brings one example a week'),
    ...row('Redesign one workflow', 'Run the RFQ summary workflow with checkpoints.', 'Workflow map and first measures', 'Mei', 'Time down, corrections not up'),
    ...row('Design for AI', 'Patterns for explanation and error recovery in the agent flow.', 'Pattern set for the pilot', 'Lars', 'Users find the reason for an agent action'),
    ...row('Embed it', 'Use the rubric in every review. Second workflow.', 'Two workflows live', 'Priya', 'Reviews cite the rubric'),
    ...row('Review and decide', 'Reassess. Share what we learned. Plan the next six months.', 'Maturity review', 'Me', 'Scores up on evidence, not on feeling'),
    ...row('Show-and-tell', 'Whole team', 'Weekly', 'One example of AI done well or badly'),
    ...row('Rubric review', 'Priya', 'Monthly', 'Updated rubric and examples'),
    ...row('Charter review', 'Me and legal', 'Quarterly', 'Charter changes'),
    ...row('Maturity review', 'Me', 'At month 6', 'Scores, evidence and the next plan'),
    'Time: the pilot may take people away. Trust: some fear for their roles, so we talk about it in the open. Rules: legal may slow the charter, so we start early.',
  ] },

  'ai-scorecard-worksheet': { checked: [[0, 1, 2, 3]], slots: [
    ...row('People who use AI in their work every week', '3 of 5', '5 of 5', '4 of 5', 'Team check-in'),
    ...row('Time to send an RFQ summary', '2 hours', '45 minutes', '1 hour', 'RFQ tool timestamps'),
    ...row('Output passing the rubric at first review', 'Not measured', '80%', '65%', 'Review notes'),
    ...row('People who can explain the agent’s failure cases', '1 of 5', '4 of 5', '3 of 5', 'Short quiz in a team meeting'),
    ...row('Work with disclosure and checks recorded', 'Not measured', '100%', '90%', 'Project files'),
    ...row('Quality', 'Buyer corrections after sending', '6 in 20', '1 in 20', '3 in 20', 'Buyer replies'),
    ...row('Adoption', 'Designer confidence in AI-assisted work', 'Not measured', '4 out of 5', '3.5 out of 5', 'Weekly one-question check'),
    'Time fell and use rose. Quality at first review is below target. Confidence is rising slowly. Corrections fell but not to target.',
    'Add two examples to the rubric each month. Pair Jonas with Priya on reviews. Keep the peer check on price and quantity.',
  ] },
}
