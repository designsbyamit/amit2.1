import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

function Block({ n, title, sub, children, delay = 0 }: { n: number; title: string; sub: string; children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.section className="p-6 md:p-8 flex flex-col" style={{ background: 'var(--surface-0)' }} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5, delay }}>
      <header>
        <p className="text-overline text-signal-ink">{String(n).padStart(2, '0')}</p>
        <h3 className="text-title text-white mt-2">{title}</h3>
        <p className="text-body-sm text-ink-3 mt-1">{sub}</p>
      </header>
      <div className="mt-5 flex-1">{children}</div>
    </motion.section>
  )
}
const Field = ({ k, v }: { k: string; v: ReactNode }) => (
  <div className="hairline-top py-3 grid gap-1"><dt className="text-label text-ink-3">{k}</dt><dd className="text-body-sm text-ink-2">{v}</dd></div>
)
const Tick = ({ on }: { on: boolean }) => (
  <span className="mt-0.5 w-check h-check rounded-2 grid place-items-center shrink-0 border" style={{ borderColor: on ? 'var(--signal)' : 'var(--line-control)', background: on ? 'var(--signal)' : 'transparent' }} aria-hidden="true">
    {on && <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="var(--on-signal)" strokeWidth="1.8"><path d="M2 5.2l2 2L8 3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
  </span>
)

const CAPS: [string, boolean, string][] = [
  ['Read', true, 'Email, PDF, purchase order'],
  ['Analyse', true, 'Compare, rate, explain'],
  ['Recommend', true, 'Next action, drafted reply'],
  ['Update records', false, ''],
  ['Trigger workflows', true, 'Routes each difference to its owner'],
  ['Communicate', true, 'Names the next step on every page'],
]
const LEVELS = [
  { name: 'Assist', text: 'Agent recommends. Person executes.', when: 'Low confidence, high risk.', today: false },
  { name: 'Guided autonomy', text: 'Agent does the routine. People decide at three gates.', when: 'Reading, comparing, drafting.', today: true },
  { name: 'Bounded autonomy', text: 'Agent acts inside set limits.', when: 'High confidence, low risk.', today: false },
]
const ROLES: [string, string][] = [
  ['Agent', 'Reads, compares, rates, routes, drafts, logs.'],
  ['Operations', 'Validates the extraction.'],
  ['Buyer', 'Decides commercial differences. Replies to the supplier.'],
  ['Goods recipient', 'Decides quantity and delivery.'],
  ['Administrator', 'Connects mailbox and ERP.'],
]

/** The agent-human contract on one page, in the shortest words that still hold. */
export default function ContractV2() {
  return (
    <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-2)', background: 'var(--surface-0)', boxShadow: 'var(--shadow-3)' }}>
      <div className="px-6 md:px-8 py-7 md:py-9 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end">
        <div>
          <p className="text-overline text-ink-3">Template</p>
          <h3 className="text-heading text-white mt-3">Agent-Human Contract</h3>
          <p className="text-body text-ink-2 mt-3 max-w-measure-l">One page. What the agent does, what it never does, and when a person decides.</p>
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body-sm">
          <dt className="text-label text-ink-3">Use case</dt><dd className="text-white">Supplier order confirmation</dd>
          <dt className="text-label text-ink-3">Team</dt><dd className="text-white">Procurement, supply chain</dd>
        </dl>
      </div>
      <div className="grid lg:grid-cols-3 gap-px border-t" style={{ background: 'var(--line-1)', borderColor: 'var(--line-1)' }}>
        <Block n={1} title="Purpose and scope" sub="Why an agent, and what it covers.">
          <dl>
            <Field k="Goal" v="Order confirmation in hours, not weeks." />
            <Field k="Users" v="Operations, buyer, goods recipient." />
            <Field k="In scope" v="Read, compare, rate, route, draft, log." />
            <Field k="Out of scope" v="Deciding. Self-confirming. Answering the supplier." />
          </dl>
        </Block>
        <Block n={2} title="Capabilities" sub="What the agent can do." delay={0.06}>
          <ul>{CAPS.map(([t, on, note]) => (
            <li key={t} className="hairline-top flex gap-3 py-3"><Tick on={on} /><span className="text-body-sm"><span className={on ? 'text-white' : 'text-ink-3'}>{t}</span>{note && <span className="block text-ink-3 mt-0.5">{note}</span>}</span></li>
          ))}</ul>
        </Block>
        <Block n={3} title="Guardrails" sub="What it must not do." delay={0.12}>
          <dl>
            <Field k="Never" v="Accept or reject a difference. Confirm its own extraction. Write to the supplier." />
            <Field k="Access" v="Each role sees only what it can judge." />
            <Field k="Audit" v="Every action is logged." />
            <Field k="Systems" v="Mailbox and ERP only." />
          </dl>
        </Block>
        <Block n={4} title="Levels of autonomy" sub="How much freedom it has.">
          <ul className="space-y-3">{LEVELS.map(l => (
            <li key={l.name} className="rounded-3 p-4" style={{ border: l.today ? 'var(--space-2) solid var(--signal)' : 'var(--space-1) solid var(--line-2)', background: l.today ? 'var(--surface-1)' : 'transparent' }}>
              <p className="text-body text-white flex items-center gap-2">{l.name}{l.today && <span className="rounded-full px-2 py-0.5 text-overline" style={{ background: 'var(--signal)', color: 'var(--on-signal)' }}>Today</span>}</p>
              <p className="text-body-sm text-ink-2 mt-1.5">{l.text}</p>
              <p className="text-body-sm text-ink-3 mt-1.5">{l.when}</p>
            </li>
          ))}</ul>
        </Block>
        <Block n={5} title="Approval and escalation" sub="When a person steps in." delay={0.06}>
          <dl>
            <Field k="Needs a person" v="Validation. Every decision. Every message to the supplier." />
            <Field k="Escalate to" v="Procurement leadership." />
            <Field k="Trigger" v="A critical commercial risk." />
          </dl>
        </Block>
        <Block n={6} title="Roles" sub="Who owns what." delay={0.12}>
          <dl>{ROLES.map(([k, v]) => <Field key={k} k={k} v={v} />)}</dl>
        </Block>
        <Block n={7} title="Evidence and confidence" sub="What it shows before anyone acts.">
          <dl>
            <Field k="Shows" v="Order value, confirmed value, change, severity, reason." />
            <Field k="Confidence" v="A score on every extraction." />
            <Field k="Explains" v="Plain language on every difference." />
          </dl>
        </Block>
        <Block n={8} title="Monitoring" sub="How we know it works." delay={0.06}>
          <dl>
            <Field k="Watch" v="Pending validation. Average confidence. Time to confirm." />
            <Field k="Check" v="Operations validates every extraction." />
            <Field k="Aim" v="Hours, not weeks." />
          </dl>
        </Block>
        <Block n={9} title="Evolution" sub="How the contract changes." delay={0.12}>
          <dl><Field k="Rule" v="Autonomy rises only where confidence is high and risk is low. Every step stays logged." /></dl>
        </Block>
      </div>
    </div>
  )
}
