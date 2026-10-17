import { motion, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

export interface ContractData {
  useCase: string
  team: string
  capabilities: [string, boolean, string][]
  levels: { name: string; text: string; when: string; today: boolean }[]
  roles: [string, string][]
}

const INK = '#142033'
const MUTED = '#52607a'

function Block({ n, title, sub, tint, accent, children, delay = 0 }: { n: number; title: string; sub: string; tint: string; accent: string; children: ReactNode; delay?: number }) {
  const reduce = useReducedMotion()
  return (
    <motion.section className="rounded-2xl overflow-hidden flex flex-col" style={{ background: '#fff', border: '1px solid #dde3ee', color: INK }} initial={reduce ? false : { opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-6%' }} transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}>
      <header className="px-5 py-4 flex items-center gap-3" style={{ background: tint }}>
        <span className="w-9 h-9 rounded-full grid place-items-center text-white text-[15px] font-medium shrink-0" style={{ background: accent }}>{n}</span>
        <div><h3 className="text-[17px] leading-tight font-medium">{title}</h3><p className="text-[13px] leading-snug mt-0.5" style={{ color: MUTED }}>{sub}</p></div>
      </header>
      <div className="p-5 flex-1">{children}</div>
    </motion.section>
  )
}

function Field({ k, v }: { k: string; v: ReactNode }) {
  return (
    <div className="grid sm:grid-cols-[132px_1fr] gap-x-4 gap-y-1 py-2.5" style={{ borderTop: '1px solid #eef1f6' }}>
      <dt className="text-[13px] font-medium">{k}</dt>
      <dd className="text-[13.5px] leading-snug" style={{ color: '#2b3a55' }}>{v}</dd>
    </div>
  )
}

/** The Agent-Human Contract Worksheet, filled in for this use case. Only fields with real content are shown. */
export default function ContractWorksheet({ d }: { d: ContractData }) {
  return (
    <div className="rounded-3xl overflow-hidden" style={{ background: '#f3f6fb', border: '1px solid #dde3ee' }}>
      <div className="px-6 md:px-8 py-6 grid md:grid-cols-[1fr_auto] gap-4 items-end" style={{ background: '#12233f', color: '#fff' }}>
        <div><h3 className="text-[26px] md:text-[30px] font-semibold leading-tight">Agent–Human Contract</h3><p className="text-[14px] mt-1 opacity-80">A clear working agreement between people and the agent for one use case.</p></div>
        <dl className="text-[13px] grid grid-cols-[auto_1fr] gap-x-4 gap-y-1"><dt className="opacity-60">Use case</dt><dd>{d.useCase}</dd><dt className="opacity-60">Team</dt><dd>{d.team}</dd></dl>
      </div>
      <div className="p-4 md:p-6 grid lg:grid-cols-3 gap-4">
        <Block n={1} title="Purpose and scope" sub="Why we use an agent and what it covers." tint="#eaf2ff" accent="#2f6fdb" delay={0}>
          <dl>
            <Field k="Business goal" v="Bring order confirmation processing from weeks down to a few hours." />
            <Field k="Primary users" v="Procurement operations manager, category buyer, goods recipient. Administrators set up connections." />
            <Field k="In scope" v="Reading supplier order confirmations, comparing them with the purchase order, rating deviations, routing decisions, drafting the supplier email, logging every step." />
            <Field k="Out of scope" v="Deciding on a deviation, confirming its own extraction, answering the supplier." />
          </dl>
        </Block>
        <Block n={2} title="Agent capabilities" sub="What the agent can do here." tint="#e6f6ef" accent="#1f9d6b" delay={0.08}>
          <ul>
            {d.capabilities.map(([t, on, note]) => (
              <li key={t} className="flex gap-3 py-2" style={{ borderTop: '1px solid #eef1f6' }}>
                <span className="mt-0.5 w-4 h-4 rounded-[4px] grid place-items-center shrink-0" style={{ border: '1.5px solid ' + (on ? '#1f9d6b' : '#9aa6bd'), background: on ? '#1f9d6b' : 'transparent' }} aria-hidden="true">{on && <svg width="10" height="10" viewBox="0 0 10 10" fill="none" stroke="#fff" strokeWidth="1.8"><path d="M2 5.2l2 2L8 3" strokeLinecap="round" strokeLinejoin="round" /></svg>}</span>
                <span className="text-[13.5px] leading-snug"><span style={{ color: on ? INK : '#8592ab' }}>{t}</span>{note && <span className="block text-[12.5px]" style={{ color: MUTED }}>{note}</span>}</span>
              </li>
            ))}
          </ul>
        </Block>
        <Block n={3} title="Guardrails and boundaries" sub="What the agent must not do." tint="#fdf3de" accent="#c98a12" delay={0.16}>
          <dl>
            <Field k="Prohibited actions" v="Accept or reject a deviation. Confirm its own extraction. Send anything to the supplier." />
            <Field k="Data and access limits" v="Each role sees only what it can judge. Administrators connect the mailbox and ERP and manage users." />
            <Field k="Policy and compliance" v="Corrections, recommendations, decisions and emails are all logged for audit." />
            <Field k="Technical constraints" v="Connected to the Microsoft Office 365 mailbox and the ERP system." />
          </dl>
        </Block>
        <div className="lg:col-span-3 grid lg:grid-cols-3 gap-4">
          <div className="lg:col-span-1">
            <Block n={4} title="Levels of autonomy" sub="How much freedom the agent has." tint="#e6f6ef" accent="#1f9d6b" delay={0}>
              <ul className="space-y-3">
                {d.levels.map(l => (
                  <li key={l.name} className="rounded-xl p-3.5" style={{ border: l.today ? '2px solid #1f9d6b' : '1px solid #dde3ee', background: l.today ? '#f1faf6' : '#fafbfd' }}>
                    <p className="text-[14px] font-medium flex items-center gap-2">{l.name}{l.today && <span className="text-[10px] uppercase tracking-[0.08em] rounded-full px-2 py-0.5 text-white" style={{ background: '#1f9d6b' }}>Today</span>}</p>
                    <p className="text-[13px] mt-1" style={{ color: '#2b3a55' }}>{l.text}</p>
                    <p className="text-[12.5px] mt-2" style={{ color: MUTED }}><b className="font-medium" style={{ color: INK }}>When: </b>{l.when}</p>
                  </li>
                ))}
              </ul>
            </Block>
          </div>
          <div className="lg:col-span-2 grid md:grid-cols-2 gap-4">
            <Block n={5} title="Approval and escalation" sub="When a person is involved." tint="#e9f0ff" accent="#3b6fe0" delay={0.08}>
              <dl>
                <Field k="Requires approval" v="Validating the extraction. Every deviation decision. Sending anything to the supplier." />
                <Field k="Escalate to" v="Procurement leadership." />
                <Field k="Escalation trigger" v="A critical commercial risk." />
              </dl>
            </Block>
            <Block n={6} title="Roles and responsibilities" sub="Who owns what." tint="#e6f6ef" accent="#1f9d6b" delay={0.16}>
              <dl>{d.roles.map(([k, v]) => <Field key={k} k={k} v={v} />)}</dl>
            </Block>
          </div>
        </div>
        <Block n={7} title="Evidence and confidence" sub="What the agent shows before anyone acts." tint="#fdf3de" accent="#c98a12" delay={0}>
          <dl>
            <Field k="Show" v="The purchase order value beside the confirmed value, the delta, the severity and the reasoning. The extraction sits beside the original PDF." />
            <Field k="Confidence" v="A score on every extraction. Operations confirms before anything moves on." />
            <Field k="Uncertainty" v="Confidence is visible on the worklist, so attention goes where there is doubt." />
            <Field k="Explanation" v={'Plain language on every difference: “Translated from German ‘45 Tage netto’. Finance approval needed for extension.”'} />
          </dl>
        </Block>
        <Block n={8} title="Monitoring and success" sub="How we know it works." tint="#efeaff" accent="#6b4fd6" delay={0.08}>
          <dl>
            <Field k="Key metrics" v="Pending validation and average confidence on the worklist. Time to process an order confirmation." />
            <Field k="Quality check" v="Operations validates every extraction." />
            <Field k="Success" v="An order confirmation processed in a few hours, not weeks." />
          </dl>
        </Block>
        <Block n={9} title="Learning and evolution" sub="How the contract changes over time." tint="#fdebec" accent="#d6453d" delay={0.16}>
          <dl>
            <Field k="Evolution" v="Autonomy moves up a level only where confidence is high and risk is low, and every step stays in the activity log." />
          </dl>
        </Block>
      </div>
    </div>
  )
}
