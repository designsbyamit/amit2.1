// Agentic AI — Supplier Order Confirmation Experience (Autonomous Ordering)
// Content comes from the Figma frames "Autonomous Ordering": Cover, Personas, System Flow and the 33 screen frames.
// Screens are the original SVG exports, stored in public/images/case-studies/sap-agentic/<id>.svg
// (only the oversized embedded photos / document previews were recompressed; all vector content is untouched).

export interface AScreen { id: string; name: string; note?: string; img: string }
export interface AJourney { id: string; label: string; title: string; summary: string; screens: AScreen[] }

const B = import.meta.env.BASE_URL
const dir = `${B}images/case-studies/sap-agentic/`

export const sapAgentic = {
  title: 'Agentic AI: Supplier Order Confirmation Experience',
  kicker: 'Autonomous ordering',
  pillars: ['Agent reads and compares', 'People decide', 'Every step logged'],
  flowImg: `${dir}system-flow.svg`,

  problem: [
    { title: 'A supplier replies', body: "Order confirmations arrive by email as PDFs, in the supplier's own layout and often in German: “Tage netto”, “Auftragsbestätigung”." },
    { title: 'Someone has to check it', body: 'Every price, payment term, quantity and delivery date has to be read and compared with the purchase order, line by line.' },
    { title: 'Each difference needs an owner', body: 'Commercial differences belong to the buyer, quantities and dates to the goods recipient, and the supplier has to be told exactly what to fix.' },
  ],

  principles: [
    { n: '01', title: 'Extract first, then let a person confirm', body: 'The agent reads the email and the PDF and shows what it found next to the original, with a confidence score. The operations manager corrects anything, saves a draft and marks the validation complete. Nothing moves on until a person has said so.', shot: 'ops-read' },
    { n: '02', title: 'Show every difference, and why', body: 'Each discrepancy shows the PO value, the confirmed value, the delta, a severity and a plain-language AI reasoning. For example: “Translated from German ‘45 Tage netto’. Finance approval needed for extension.”', shot: 'buyer-review' },
    { n: '03', title: 'Route each decision to the right role', body: 'The discrepancy view is generated and routed. Buyers weigh cost and logistics impact; goods recipients validate quantities and delivery dates against what the business actually needs. Both just accept or reject.', shot: 'gr-review' },
    { n: '04', title: 'Always say what happens next', body: 'An Insights and Recommendations panel on every page names the next action: review, confirm, share with the supplier, or “all set for now”. The buyer’s email to the supplier is drafted by the agent, with the discrepancy list attached.', shot: 'buyer-email' },
    { n: '05', title: 'Log everything', body: 'Corrections, AI recommendations, decisions and emails land in one Activity timeline, labelled by who acted: AI Agent, the operations manager, the buyer, the goods recipient or the system.', shot: 'buyer-activity' },
  ],

  personas: [
    { id: 'david', role: 'Procurement Operations', name: 'David Paul', title: 'Procurement Operations Manager', img: `${dir}persona-david.jpg`, resp: ['Review the extracted data from the order confirmations and make corrections', 'Confirm validated to kick off the discrepancy routing as per the policy'] },
    { id: 'adrian', role: 'Buyer', name: 'Adrian Smith', title: 'Category Buyer', img: `${dir}persona-adrian.jpg`, resp: ['Evaluate and accept/reject deviations based on logistics and cost impact', 'Escalate critical commercial risks to procurement leadership'] },
    { id: 'rajan', role: 'Goods Recipient', name: 'Rajan Nair', title: 'Store Executive', img: `${dir}persona-rajan.jpg`, resp: ['Validate quantity deviations based on actual business requirements', 'Review delivery date changes and assess impact on operations and flag risks'] },
  ],

  flowSteps: [
    ['Order confirmation received via email', 'The supplier replies to the purchase order.'],
    ['Data extracted and corrected if required', 'The agent extracts the data. Procurement operations corrects it.'],
    ['Validation marked complete', 'Operations confirms, which kicks off discrepancy routing.'],
    ['Discrepancy view generated and routed', 'Two parallel reviews: each person accepts or rejects their discrepancies.'],
    ['Send back to supplier if revision required', 'The buyer emails the supplier what needs to change.'],
    ['Approve and close', 'When nothing is left to resolve, the confirmation is closed.'],
  ] as [string, string][],

  journeys: [
    { id: 'access', label: '01', title: 'Sign in, set-up and navigation',
      summary: 'Three personas sign in to the same Supplier Order Confirmation Assistant. An administrator connects Microsoft Office 365 (the mailbox the confirmations arrive in) and the SAP ECC system, and manages users through SAP Cloud Identity Service.',
      screens: [
        { id: 'signin-ops', name: 'Sign in: Procurement Operations' },
        { id: 'signin-buyer', name: 'Sign in: Buyer' },
        { id: 'signin-gr', name: 'Sign in: Goods Recipient' },
        { id: 'admin-setup', name: 'Administration: connections not yet made' },
        { id: 'admin-connected', name: 'Administration: connected' },
        { id: 'admin-menu', name: 'Navigation: queue, administration, archive' },
        { id: 'account-menu', name: 'Account menu with Sign Out' },
        { id: 'signed-out', name: 'Signed out' },
      ] },
    { id: 'ops', label: '02', title: 'Procurement Operations: validate the extraction',
      summary: 'David opens the worklist, sees what is waiting for validation and how confident the agent is, then checks the extraction against the supplier’s PDF, fixes what is wrong, saves and confirms. Every change is logged for audit.',
      screens: [
        { id: 'ops-worklist', name: 'My Worklist: pending validation and average confidence' },
        { id: 'ops-read', name: 'Extraction beside the supplier PDF (read)' },
        { id: 'ops-edit', name: 'Edit mode' },
        { id: 'ops-editing', name: 'Correcting a field, Save or Cancel' },
        { id: 'ops-confirm', name: 'Save Draft or Confirm Validation' },
        { id: 'ops-saved', name: 'Corrections saved' },
        { id: 'ops-validate', name: 'Mark validation as complete' },
        { id: 'ops-validated', name: 'Validation complete' },
      ] },
    { id: 'buyer', label: '03', title: 'Buyer: resolve discrepancies and answer the supplier',
      summary: 'Adrian sees every confirmation with its discrepancies, risk and status. He opens one, reads the AI reasoning, accepts or rejects each difference and lets the agent draft the email that goes back to the supplier. A revised confirmation comes back as a new version.',
      screens: [
        { id: 'buyer-worklist', name: 'My Worklist with discrepancies, risk and status' },
        { id: 'buyer-versions', name: 'Versions grouped under one purchase order' },
        { id: 'buyer-review', name: 'Review the discrepancies' },
        { id: 'buyer-decided', name: 'Confirm the discrepancy decisions' },
        { id: 'buyer-saved', name: 'Decisions saved, waiting for the others' },
        { id: 'buyer-share', name: 'Next action: share with the supplier' },
        { id: 'buyer-email', name: 'Email Supplier, drafted by the agent' },
        { id: 'buyer-sent', name: 'Sent to supplier, all set for now' },
        { id: 'buyer-extraction', name: 'Extraction tab: the data behind the discrepancies' },
        { id: 'buyer-activity', name: 'Activity: who did what, including the AI Agent' },
        { id: 'buyer-revised', name: 'Revised confirmation, new version to review' },
      ] },
    { id: 'gr', label: '04', title: 'Goods Recipient: validate quantity and delivery',
      summary: 'Rajan only sees what he can judge: quantity and delivery date. He accepts or rejects each one against what the store actually needs, and submits with an optional comment.',
      screens: [
        { id: 'gr-worklist', name: 'My Worklist, grouped by purchase order' },
        { id: 'gr-worklist-2', name: 'Worklist: first version resolved, revision waiting' },
        { id: 'gr-review', name: 'Review quantity and delivery discrepancies' },
        { id: 'gr-decided', name: 'Decisions made' },
        { id: 'gr-confirm', name: 'Confirm the decisions, Submit' },
        { id: 'gr-submit', name: 'Submit for further processing, with a comment' },
      ] },
  ].map(j => ({ ...j, screens: j.screens.map(s => ({ ...s, img: `${dir}${s.id}.svg` })) })) as AJourney[],
}
