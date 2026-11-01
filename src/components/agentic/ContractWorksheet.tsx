import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface ContractData {
  useCase: string
  team: string
  capabilities: [string, boolean, string][]
  levels: { name: string; text: string; when: string; today: boolean }[]
  roles: [string, string][]
}

function Block({ n, title, sub, children, delay = 0 }: { n: number; title: string; sub: string; children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.section className="p-6 md:p-8 flex flex-col" style={{ background: 'var(--surface-0)' }} initial={reduce ? false : { opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>
      <header>
        <p className="text-overline text-signal-ink">{String(n).padStart(2, '0')}</p>
        <h3 className="text-title text-white mt-2">{title}</h3>
        <p className="text-body-sm text-ink-3 mt-1">{sub}</p>
      </header>
      <div className="mt-5 flex-1">{children}</div>
    </motion.section>
  )
}

function Field({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="hairline-top py-3 grid gap-1">
      <dt className="text-label text-ink-3">{k}</dt>
      <dd className="text-body-sm text-ink-2">{v}</dd>
    </div>
  )
}

/** The Agent-Human Contract worksheet, filled in for this use case, in the site's own type and colour. */
export default function ContractWorksheet({ d }: { d: ContractData }) {
  return (
    <div className="rounded-3 overflow-hidden border" style={{ borderColor: 'var(--line-2)', background: 'var(--surface-0)', boxShadow: '0 18px 40px rgb(0 0 0 / 0.10)' }}>
      <div className="relative px-6 md:px-8 py-7 md:py-9 grid md:grid-cols-[1fr_auto] gap-6 md:gap-12 items-end">
        <div aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0.05, backgroundImage: 'linear-gradient(rgb(var(--ink-rgb)) 1px, transparent 1px), linear-gradient(90deg, rgb(var(--ink-rgb)) 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
        <div className="relative">
          <p className="text-overline text-ink-3">Worksheet</p>
          <h3 className="text-heading text-white mt-3">Agent–Human Contract</h3>
          <p className="text-body text-ink-2 mt-3 max-w-[52ch]">A clear working agreement between people and the agent for one use case.</p>
        </div>
        <dl className="relative grid grid-cols-[auto_1fr] gap-x-6 gap-y-2 text-body-sm">
          <dt className="text-label text-ink-3">Use case</dt><dd className="text-white">{d.useCase}</dd>
          <dt className="text-label text-ink-3">Team</dt><dd className="text-white">{d.team}</dd>
        </dl>
      </div>
      <div className="grid lg:grid-cols-3 gap-px border-t" style={{ background: 'var(--line-1)', borderColor: 'var(--line-1)' }}>
        <Block n={1} title="Purpose and scope" sub="Why we use an agent and what it covers.">
          <dl>
            <Field k="Business goal" v="Bring order confirmation processing from weeks down to a few hours." />
            <Field k="Primary users" v="Procurement operations manager, category buyer, goods recipient. Administrators set up connections." />
            <Field k="In scope" v="Reading supplier order confirmations, comparing them with the purchase order, rating deviations, routing decisions, drafting the supplier email, logging every step." />
            <Field k="Out of scope" v="Deciding on a deviation, confirming its own extraction, answering the supplier." />
          </dl>
        </Block>
        <Block n={2} title="Agent capabilities" sub="What the agent can do here." delay={0.06}>
          <ul>
            {d.capabilities.map(([t, on, note]) => (
              <li key={t} className="hairline-top flex gap-3 py-3">
                <span className="mt-0.5 w-[18px] h-[18px] rounded-[5px] grid place-items-center shrink-0 border" style={{ borderColor: on ? 'var(--signal)' : 'var(--line-control)', background: on ? 'var(--signal)' : 'transparent' }} aria-hidden="true">
                  {on && <svg width="11" height="11" viewBox="0 0 10 10" fill="none" stroke="#10130a" strokeWidth="1.8"><path d="M2 5.2l2 2L8 3" strokeLinecap="round" strokeLinejoin="round" /></svg>}
                </span>
                <span className="text-body-sm"><span className={on ? 'text-white' : 'text-ink-3'}>{t}</span>{note && <span className="block text-ink-3 mt-0.5">{note}</span>}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block n={3} title="Guardrails and boundaries" sub="What the agent must not do." delay={0.12}>
          <dl>
            <Field k="Prohibited actions" v="Accept or reject a deviation. Confirm its own extraction. Send anything to the supplier." />
            <Field k="Data and access limits" v="Each role sees only what it can judge. Administrators connect the mailbox and ERP and manage users." />
            <Field k="Policy and compliance" v="Corrections, recommendations, decisions and emails are all logged for audit." />
            <Field k="Technical constraints" v="Connected to the Microsoft Office 365 mailbox and the ERP system." />
          </dl>
        </Block>

        <Block n={4} title="Levels of autonomy" sub="How much freedom the agent has.">
          <ul className="space-y-3">
            {d.levels.map(l => (
              <li key={l.name} className="rounded-3 p-4" style={{ border: l.today ? '2px solid var(--signal)' : '1px solid var(--line-2)', background: l.today ? 'rgb(200 245 90 / 0.14)' : 'transparent' }}>
                <p className="text-body text-white flex items-center gap-2">{l.name}{l.today && <span className="rounded-full px-2 py-0.5 text-overline" style={{ background: 'var(--signal)', color: 'var(--on-signal)' }}>Today</span>}</p>
                <p className="text-body-sm text-ink-2 mt-1.5">{l.text}</p>
                <p className="text-body-sm text-ink-3 mt-2"><span className="text-ink-2">When: </span>{l.when}</p>
              </li>
            ))}
          </ul>
        </Block>
        <Block n={5} title="Approval and escalation" sub="When a person is involved." delay={0.06}>
          <dl>
            <Field k="Requires approval" v="Validating the extraction. Every deviation decision. Sending anything to the supplier." />
            <Field k="Escalate to" v="Procurement leadership." />
            <Field k="Escalation trigger" v="A critical commercial risk." />
          </dl>
        </Block>
        <Block n={6} title="Roles and responsibilities" sub="Who owns what." delay={0.12}>
          <dl>{d.roles.map(([k, v]) => <Field key={k} k={k} v={v} />)}</dl>
        </Block>

        <Block n={7} title="Evidence and confidence" sub="What the agent shows before anyone acts.">
          <dl>
            <Field k="Show" v="The purchase order value beside the confirmed value, the delta, the severity and the reasoning. The extraction sits beside the original PDF." />
            <Field k="Confidence" v="A score on every extraction. Operations confirms before anything moves on." />
            <Field k="Uncertainty" v="Confidence is visible on the worklist, so attention goes where there is doubt." />
            <Field k="Explanation" v={'Plain language on every difference: “Translated from German ‘45 Tage netto’. Finance approval needed for extension.”'} />
          </dl>
        </Block>
        <Block n={8} title="Monitoring and success" sub="How we know it works." delay={0.06}>
          <dl>
            <Field k="Key metrics" v="Pending validation and average confidence on the worklist. Time to process an order confirmation." />
            <Field k="Quality check" v="Operations validates every extraction." />
            <Field k="Success" v="An order confirmation processed in a few hours, not weeks." />
          </dl>
        </Block>
        <Block n={9} title="Learning and evolution" sub="How the contract changes over time." delay={0.12}>
          <dl>
            <Field k="Evolution" v="Autonomy moves up a level only where confidence is high and risk is low, and every step stays in the activity log." />
          </dl>
        </Block>
      </div>
    </div>
  )
}
