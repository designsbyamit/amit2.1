// Filled examples for the chapter 5 worksheets. Same fictional company (NorthStar GmbH). Arrays line up, in order, with the fillable
// fields in ch5-docs.mjs ('' = left blank). Figures are illustrations, not benchmarks.
const row = (...c) => c

export const intro = 'NorthStar GmbH · A design team of four (Priya, Jonas, Mei and Lars) has used AI tools for a year, mostly on their own. You are the design lead, and you want the team to use AI on purpose.'

export const examples = {
  'ai-maturity-assessment-worksheet': { checked: [[], [1, 2]], slots: [
    'NorthStar design team, four designers and a researcher, serving the procurement products.',
    'Enterprise software for industrial buyers. Supplier prices and customer data are confidential. Only tools on the company list may be used, and customer data may not leave the region.',
    ...row('3', 'Everyone can use AI and name where it fails. Two people have not tested the limits.', 'A shared test of failure cases, run by each person'),
    ...row('2', 'Each person has a private routine with real gains. No shared, written workflow yet.', 'One written workflow, with a checkpoint, used by three people'),
    ...row('2', 'We are designing the agent behaviour for the first time. We critique, but have not shipped an AI feature.', 'Design one feature with engineering, including how it fails'),
    ...row('2', 'A one-page rule and a list of approved tools. Not yet reviewed with security and legal. No tool register.', 'A charter reviewed with security and legal, and a register'),
    ...row('Yes', 'Our security and data-protection partners, but we meet them only when something goes wrong', 'Set a monthly slot'),
    ...row('Borrowed', 'A data scientist in the analytics team, one day a month', 'Agree a named contact and a test set for the agent'),
    ...row('No', 'None in the design team', 'Not needed yet. Revisit when we design the second AI feature'),
    ...row('No', 'Nobody prototypes with models', 'Grow Mei into the role, with half a day a week'),
    ...row('Yes', 'Three approved tools. Customer data stays out.', 'Add a register with owners and costs'),
    ...row('Yes', 'The design director gives us time and covers the risk', 'Ask for a standing monthly review'),
    'Level 2. Ways of working, Product and Trust are all at 2, so those set the level. People and skills is ahead of practice.',
    'Trust: the charter has not been reviewed with security and legal, and without it we cannot safely use AI on more sensitive work.',
    '1. Redesign the RFQ summary workflow with a human checkpoint. 2. Write the charter and a tool register, and review them with security and legal. 3. Agree a named evaluation contact and a test set.',
  ] },

  'ai-capability-matrix-worksheet': { checked: [[0, 1, 2, 4, 5]], slots: [
    ...row('Priya, senior designer', '3', 'Ways of working', 'Product', 'Design the agent feature with engineering', 'D: designing AI products'),
    ...row('Jonas, designer', '2', 'People and skills', 'Trust', 'Co-write the charter with security', 'F: responsible AI'),
    ...row('Mei, designer', '2', 'People and skills', 'Ways of working', 'Map and redesign the summary workflow', 'C: workflows and agents'),
    ...row('Lars, researcher', '2', 'Product', 'Trust', 'Build the test set with the data scientist', 'E: data and evaluation'),
    ...row('None in design. Two engineers in the agent team', 'Borrow, then pair for the agent feature', 'Next quarter'),
    ...row('Borrowed, one day a month', 'Agree a named contact and a standing slot', 'This month'),
    ...row('None', 'Grow Mei, half a day a week', 'Next quarter'),
    'Priya: lead the monthly rubric review and say why a design is good. Jonas: make one case in the amber zone. Mei: do the first draft of a summary by hand, then compare. Lars: run a session on where users stop trusting the agent.',
  ] },

  'ai-usage-charter-worksheet': { checked: [[0, 1, 2, 3, 4, 7]], slots: [
    ...row('Supplier prices, buyer details and unreleased product plans', 'No customer or supplier data in any tool that is not approved and hosted in our region'),
    ...row('Only the three tools on the company list', 'Any other tool needs a request to security. Personal accounts are not used for work'),
    ...row('Decisions the agent takes or suggests must be explainable', 'Each AI-assisted decision shows its reason and is recorded'),
    ...row('Everyone can use what we ship', 'AI features are tested with assistive technology and in plain language'),
    ...row('A person decides on price, quantity and supplier changes', 'The person has the information and time to refuse, and may overrule the agent'),
    ...row('Research summaries, naming ideas, early layouts, writing drafts with no company data', 'Use freely. Say that AI was used. A person reviews before it is shared.'),
    ...row('Anything using customer data, supplier data or unreleased details; any output shown to users', 'Use only approved tools. A second person checks. Record what was used.'),
    ...row('Personal data in public tools, generated users in place of real research, shipping unreviewed output', 'Do not do this. Raise it with the lead.'),
    ...row('Is AI the right tool? Whose data? Is it approved?', 'Design lead and data owner', 'A line in the brief'),
    ...row('Did we choose this, or did the tool? Is it recorded?', 'A peer in critique', 'Reasoning shown in the review'),
    ...row('Does it pass the rubric? Does it work for different needs? Is the reasoning visible?', 'Two people, one from outside the project', 'The rubric result and a test record'),
    ...row('What went wrong? Did the model or tool version change? What do we change in the charter?', 'The whole team', 'A line in the monthly review'),
    ...row('Assistant in the supplier portal', 'Jonas', 'Supplier names and quotes', 'Trial', '€0, review in March'),
    ...row('Transcription tool', 'Priya', 'Call notes, no personal data', 'Yes', '€180 a month, renews in June'),
    ...row('AI feature inside the research tool', 'Lars', 'Interview recordings', 'No, until security has seen its data terms', ''),
    ...row('', '', '', '', ''),
    'Company AI policy, and the data protection rules for our supplier and buyer data. Checked with legal in October. Legal will confirm what applies in each country we sell in.',
    'Priya owns it. Reviewed with security and legal on the first Monday of each quarter.',
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
    ...row('Share of RFQ summaries made with the shared workflow', '0%', '80%', '60%', 'RFQ tool tags'),
    ...row('Time to send a summary, beside corrections after sending', '2 hours, 6 in 20 corrected', '45 minutes, 1 in 20', '1 hour, 3 in 20', 'RFQ timestamps and buyer replies'),
    ...row('Known failure cases listed for each AI feature, reviewed this quarter', 'None listed', 'All features', 'One of two', 'Team review'),
    ...row('Work with disclosure and checks recorded', 'Not measured', '100%', '90%', 'Project files'),
    ...row('Outcomes', 'Blind sample of ten pieces, passing the rubric at first review', 'Not measured', '80%', '65%', 'Two reviewers, monthly'),
    ...row('Trust and partners', 'Sessions with the evaluation partner', 'Ad hoc', 'Monthly', 'Monthly, twice missed', 'Calendar'),
    'Time fell and use rose. Quality at first review is below target, and two partner sessions were missed. Corrections fell but not to target.',
    'Add two examples to the rubric each month. Protect the partner slot. Keep the peer check on price and quantity.',
  ] },
}
