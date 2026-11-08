import { useState } from 'react'
import Breadcrumb from '../components/ds/Breadcrumb'
import Button from '../components/ds/Button'
import { caseStudies } from '../data/work'
import { Section, Head, Fig, ScreenTabs, Numbered, Defs, Grid, Strip } from '../components/case/Chapter'

const cs = caseStudies.find(c => c.id === 'sap-collections')!
const B = import.meta.env.BASE_URL
const img = (n: string) => `${B}images/case-studies/sap-collections/${n}.webp`

const facts: [string, string][] = [
  ['Status', 'Phases 1 and 2 live with the customer'],
  ['Worked with', 'Customer, product, engineering'],
  ['Built on', 'Fiori and UI5'],
  ['Scope', '3 roles, 8-step prototype'],
]

const rounds = [
  { t: 'Stakeholder alignment', d: 'Finance and accounts receivable leaders, product owners and architects. We agreed the outcomes and the hard constraints: Segment isolation, strategy currency, auditability and human approval.' },
  { t: 'Collector interviews', d: 'Shadowing and walkthroughs of real days with collection specialists, including senior collectors who work across markets.' },
  { t: 'Administrator and manager sessions', d: 'Task walkthroughs of configuration and team oversight, with people who hold both an admin and a collector role.' },
  { t: 'Synthesis and playback', d: 'Affinity mapping, journey mapping and an insight playback with design, product and engineering, then principles and a solution structure.' },
]

const personas = [
  { n: 'Elena', ph: 'elena', r: 'Collection specialist', g: 'Clear today’s highest risk customers without contacting anyone twice.', f: 'Rebuilds context from ERP, email and spreadsheets. Cannot tell which balances she owns.' },
  { n: 'Marco', ph: 'marco', r: 'Customer administrator', g: 'Connect source systems and keep collector policies correct and auditable.', f: 'Policy changes have no validation before they go live. Connection failures are found by collectors.' },
  { n: 'Priya', ph: 'priya', r: 'Collections manager who also collects', g: 'See the team’s exposure and step in where risk is building.', f: 'Team totals are compiled by hand, and she cannot see whether AI output was accepted.' },
]

const insights: [string, string][] = [
  ['Collectors think in customers, the system thinks in Company Codes.', 'One worklist row per customer, with Company Codes listed inline and broken down in Customer 360.'],
  ['Priority is ignored when it cannot be explained.', 'Priority shows its drivers on demand and is marked as AI output.'],
  ['Most time goes into rebuilding context, not deciding.', 'Customer 360 opens with a summary and a Next Best Action grounded in open items.'],
  ['Contacting a customer twice damages the relationship.', 'A cooldown state replaces the recommended action until the window ends.'],
  ['Admins fear silent policy errors more than slow setup.', 'Bulk upload, a validation dialog and an explicit activation per group.'],
  ['Many people hold two roles.', 'One launchpad, tiles by role, one sign in.'],
  ['Finance cannot accept numbers it cannot trace.', 'Amounts stay in strategy currency with the original values kept. No currency conversion in the app.'],
]

const screens = [
  { id: 'worklist', label: 'Worklist', src: img('worklist'), alt: 'The collection worklist, action required', ratio: '1440 / 900', note: 'One row per customer, with Company Codes listed inline. The toolbar totals react to filters. Priority and predicted arrear days carry the AI icon, and the recommended action is one link per row.' },
  { id: 'c360', label: 'Customer 360', src: img('c360-all'), alt: 'Customer 360 with insights and a recommended action', ratio: '1440 / 1120', note: 'The reason comes before the action, and the action before any draft. Tabs answer how bad (overview), which invoices (open items) and what blocks payment (disputes).' },
  { id: 'email', label: 'Email for approval', src: img('c360-email'), alt: 'An editable email draft beside the recommendation', ratio: '1440 / 1120', note: 'The draft is editable and nothing is sent until a person approves. The email is written after approval, from fresh data.' },
  { id: 'disputes', label: 'Disputes', src: img('c360-disputes'), alt: 'The disputes tab of Customer 360', ratio: '1440 / 1120', note: 'Exceptions that block payment sit next to the balance, so nobody chases an amount that is already contested.' },
  { id: 'admin', label: 'Administration', src: img('admin'), alt: 'Administration, system configuration', ratio: '1440 / 900', note: 'Connections and agent configuration in one place, so an administrator sees a failure before collectors do.' },
  { id: 'upload', label: 'Policy upload', src: img('upload-groups'), alt: 'Policy files per collector group', ratio: '1440 / 900', note: 'Policy files are validated before activation, and activation is a separate, explicit step per group.' },
]

const pipeline = [
  { step: 'Validate scope', kind: 'Deterministic' },
  { step: 'Predict arrears', kind: 'Model' },
  { step: 'Investigate context', kind: 'Agent and tool work' },
  { step: 'Recommend', kind: 'Grounded in evidence' },
  { step: 'Decide', kind: 'Approve, edit, reject or escalate', human: true },
  { step: 'Communicate', kind: 'Within policy' },
  { step: 'Monitor outcome', kind: 'Event driven' },
]

const options = [
  { name: 'One row per Company Code', chosen: false, text: 'Action scope is explicit in every row, but the same customer appears several times and total exposure per customer is invisible.' },
  { name: 'Expandable customer rows', chosen: false, text: 'Aggregate and detail in one table, but priority on the parent row is ambiguous and selection is unclear for parent against child.' },
  { name: 'One row per customer, codes inline', chosen: true, text: 'Matches how collectors plan their day, with one priority and one action per customer. The per code breakdown moves to Customer 360.' },
]

const decisions = [
  { t: 'Totals sit in the table toolbar', d: 'Managers and collectors asked for the size of today’s work at a glance, without a separate dashboard. Totals only add up inside one Segment and one currency.' },
  { t: 'AI columns are marked, not hidden', d: 'People should know which values are model output. It adds a little visual weight to two column headers.' },
  { t: 'The recommendation comes before the draft', d: 'People approve the intent before any text is written. It is one extra step for routine follow ups.' },
  { t: 'Cooldown replaces the action', d: 'Contacting a customer again inside the window was a top complaint. A collector who wants to override must open the customer.' },
  { t: 'Policy changes are validated before activation', d: 'Administrators need to know a file is complete before it changes collector behaviour. Activation becomes a two step action.' },
  { t: 'Actions run per Company Code', d: 'Even when a recommendation is made per customer, the action is executed for one legal scope.' },
]

const phases = [
  { p: 'Phase 1', t: 'UK launch', s: 'Live', items: ['Prioritised worklist', 'Customer context', 'Next Best Action recommendations', 'Reviewable email drafts', 'Administration'] },
  { p: 'Phase 2', t: 'Control and communication depth', s: 'Live', items: ['Risk configuration and exclusions', 'Scheduled email and attachments', 'Aging buckets', 'Automatic document retrieval', 'Activity history', 'Approved domain controls'] },
  { p: 'Phase 3', t: 'Global expansion', s: 'Planned', items: ['Company Code aware worklist', 'Segment isolation and strategy currency', 'My and Group worklists', 'Consolidated Customer 360'] },
]

const steps = ['Sign in', 'Launchpad', 'Enable Collections', 'Administration', 'Launchpad, enabled', 'Worklist', 'Customer 360', 'Disputes']

export default function SAPCollectionsStoryPage() {
  const [open, setOpen] = useState(false)
  return (
    <div className="bg-surface-0 min-h-screen">
      <header style={{ paddingTop: 'var(--header-h)' }}>
        <div className="container-site relative pt-10 md:pt-14 pb-16 md:pb-24">
          <Breadcrumb items={[{ label: 'Works', to: '/craft' }, { label: 'Agentic AR Collections' }]} />
          <p className="text-label text-ink-3 mt-10">{cs.category}</p>
          <h1 className="text-display-xl text-white mt-5 max-w-5xl">{cs.title}</h1>
          <p className="text-body-lg text-ink-2 mt-6 max-w-measure-xl">An assistant for accounts receivable, built inside Fiori. The agent ranks the work and recommends the next action. A person approves everything that reaches a customer.</p>
          <dl className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-14 pt-8 hairline-top max-w-5xl">
            {facts.map(([k, v]) => <div key={k}><dt className="text-label text-ink-3">{k}</dt><dd className="v2-item text-white mt-2">{v}</dd></div>)}
          </dl>
        </div>
      </header>

      <Section id="context" raised>
        <p className="text-label text-ink-3">The context</p>
        <h2 className="text-display-l text-white mt-4 max-w-4xl">Collections turns an overdue invoice into cash.</h2>
        <div className="mt-8 flex flex-col gap-5 max-w-measure-xl">
          <p className="text-body-lg text-ink-2">A receivable is recorded, a signal says it needs attention, and someone resolves it. In between sit open items, disputes, deductions, promises to pay and a long email trail.</p>
          <p className="text-body-lg text-ink-2">For this customer, called NorthStar here, one business partner can exist in several Company Codes, Groups and Segments. Amounts, scores, currencies and permissions must never leak across a Segment boundary.</p>
          <p className="text-body-lg text-ink-2">The wider picture is public: in Western Europe, 47% of B2B invoices were overdue and 6% of invoice value was written off as bad debt (Atradius Payment Practices Barometer, 2025).</p>
        </div>
      </Section>

      <Section id="discovery">
        <Head n={1} title="Four rounds of discovery, three roles to design for." intro="We started with what the business would not compromise on, then spent time inside real working days." />
        <Numbered items={rounds} cols={2} />
        <h3 className="text-heading text-white mt-20 mb-8">Three people we designed for</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {personas.map(p => (
            <article key={p.n} className="card">
              <img src={img(`persona-${p.ph}`)} alt="" width={640} height={640} loading="lazy" decoding="async" className="w-full h-auto rounded-3 block mb-6" />
              <p className="text-label text-ink-3">{p.r}</p>
              <p className="v2-item text-white mt-2">{p.n}</p>
              <p className="text-label text-signal-ink mt-6">Goal</p>
              <p className="text-body text-ink-2 mt-2">{p.g}</p>
              <p className="text-label text-ink-3 mt-6">Struggle</p>
              <p className="text-body text-ink-2 mt-2">{p.f}</p>
            </article>
          ))}
        </div>
        <h3 className="text-heading text-white mt-20 mb-6">What we learned, and what it changed</h3>
        <Grid head={['Insight', 'What we did about it']} rows={insights.map(([a, b]) => [a, b])} />
      </Section>

      <Section id="solution" raised>
        <Head n={2} title="Worklist, Customer 360 and Administration, one screen at a time." intro="Real screens from the end to end prototype. Pick a screen to see what it is for." />
        <ScreenTabs label="Collections screens" screens={screens} />
      </Section>

      <Section id="agent">
        <Head n={3} title="The agent prepares. A person decides." intro="Reading and preparing can run on their own. Anything that contacts a customer or changes a financial record needs a person." />
        <Strip steps={pipeline} />
        <h3 className="text-heading text-white mt-16 mb-4">How much it does today</h3>
        <Defs rows={[
          ['Assist', 'Reads and summarises permitted context. A person performs every action.'],
          ['Supervised', 'Recommends and prepares, then stops before execution. Approval is required for any customer or financial action.'],
          ['Further up the ladder', 'Monitored and delegated autonomy are not part of this product today.'],
        ]} />
        <p className="text-body text-ink-3 mt-6 max-w-measure-xl">Two agent capabilities run in the product: a unified collections agent that validates configuration, runs the steps and keeps state, and an arrears prediction that informs priority and never acts.</p>
      </Section>

      <Section id="fiori" raised>
        <Head n={4} title="Working inside Fiori." intro="This is a Fiori application. Its menu, navigation, filters and worklist patterns are fixed points, and every decision here was made inside them." />
        <p className="text-body-lg text-ink-2 mb-16 max-w-measure-xl">Many of the patterns we designed were hard to build. Customised filters and the navigation menu options are two examples, and each was reshaped to what could be implemented.</p>
        <h3 className="text-heading text-white mb-6">One decision in detail: what is a row?</h3>
        <div className="grid md:grid-cols-3 gap-4">
          {options.map(o => (
            <article key={o.name} className="card" style={o.chosen ? { borderColor: 'var(--line-2)' } : undefined}>
              <p className="text-label text-ink-3">{o.chosen ? 'Chosen' : 'Considered'}</p>
              <p className="v2-item text-white mt-2">{o.name}</p>
              <p className="text-body text-ink-2 mt-3">{o.text}</p>
            </article>
          ))}
        </div>
        <h3 className="text-heading text-white mt-16 mb-2">Six more, each with its cost</h3>
        <Numbered items={decisions} cols={2} />
      </Section>

      <Section id="prototype">
        <Head n={5} title="An end to end prototype, from sign in to email." intro="Eight steps in UI5, with fictional customers and data. Open it and click through." />
        <ol className="flex flex-wrap gap-2 mb-8" aria-label="Prototype steps">
          {steps.map((s, i) => <li key={s} className="tag">{i + 1} · {s}</li>)}
        </ol>
        {!open ? (
          <Button onClick={() => setOpen(true)} arrow>Open the prototype</Button>
        ) : (
          <div className="rounded-3 overflow-hidden border bg-white" style={{ borderColor: 'var(--line-2)', aspectRatio: '16 / 10' }}>
            <iframe title="Collections prototype" src={`${B}prototypes/collections/Projects/col-e2e/login.html`} className="w-full h-full block" loading="lazy" />
          </div>
        )}
      </Section>

      <Section id="evolution" raised>
        <Head n={6} title="Three phases, one direction." intro="Phase 1 set the baseline. Phase 2 added control. Phase 3 widens it across markets." />
        <div className="grid md:grid-cols-3 gap-4">
          {phases.map(p => (
            <article key={p.p} className="card">
              <p className="text-label text-ink-3">{p.p} · {p.s}</p>
              <p className="v2-item text-white mt-2">{p.t}</p>
              <ul className="mt-5 space-y-2">{p.items.map(i => <li key={i} className="text-body text-ink-2 flex gap-3"><span aria-hidden className="text-ink-3">-</span>{i}</li>)}</ul>
            </article>
          ))}
        </div>
      </Section>

      <Section id="measure">
        <Head n={7} title="How success will be measured." intro="Outcome measurement is still to come, so no result is reported here. These are the measures we set a baseline for first." />
        <Grid head={['Measure', 'What it shows']} rows={[
          ['DSO', 'Invoice to cash speed'],
          ['Overdue exposure', 'Value past maturity'],
          ['Promise reliability', 'Commitments kept or missed'],
          ['Dispute cycle', 'Time to clear exceptions'],
          ['Collection effectiveness', 'Receivables converted'],
          ['Aging and risk', 'Exposure that needs attention'],
        ]} />
        <Fig className="mt-16 max-w-3xl" src={img('launchpad')} alt="The launchpad after Collections is enabled" ratio="1440 / 900" caption="The launchpad after an administrator enables Collections: the worklists appear by role." />
      </Section>
    </div>
  )
}
