import '@fontsource-variable/instrument-sans'
import '@fontsource-variable/bricolage-grotesque'
import './engaze.css'
import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from '../Icon'
import { MARK_D, MARK_VB } from '../../film/engazeMark'

/* Illustrative data. Esha, Manoj, Genie, the tax numbers, the claim ticket and the
   7–8 working days come from the case study; everything else is invented for the demo. */

type Flow = 'leave' | 'ooo' | 'tax' | 'claim' | 'carry' | 'fallback'
type Msg =
  | { id: number; from: 'me'; text: string }
  | { id: number; from: 'genie'; flow: Flow; stage: 'thinking' | 'ready' }

const steps: Record<Flow, string[]> = {
  leave: ['Checked your leave balance', 'Read the leave policy, section 3.2', 'Found who to tell: Manoj and the Platform team'],
  ooo: ['Looked at your calendar for today', 'Matched the tone of your last out-of-office'],
  tax: ['Read your payroll declarations for FY 2026–27', 'Ran both regimes on your numbers', 'Checked the switch deadline'],
  claim: ['Read the ticket', 'Matched it to your Pune trip, project Atlas', 'Checked the travel policy'],
  carry: ['Searched the leave policy'],
  fallback: [],
}

const prompts: { flow: Flow; text: string; icon: string }[] = [
  { flow: 'leave', text: 'I’m down with a fever. Can I take today off?', icon: 'heart' },
  { flow: 'tax', text: 'Old or new tax regime: which is better for me?', icon: 'wallet' },
  { flow: 'claim', text: 'Claim my Pune flight', icon: 'plane' },
  { flow: 'carry', text: 'Can I carry forward unused leave?', icon: 'sun' },
]

function route(text: string): Flow {
  const t = text.toLowerCase()
  if (/fever|sick|unwell|leave today|day off|today off|ill\b/.test(t)) return 'leave'
  if (/tax|regime/.test(t)) return 'tax'
  if (/claim|flight|reimburs|ticket|expense/.test(t)) return 'claim'
  if (/carry|forward|lapse|policy/.test(t)) return 'carry'
  if (/out.of.office|ooo/.test(t)) return 'ooo'
  return 'fallback'
}

function Orb({ size = 28, state = 'idle' }: { size?: number; state?: 'idle' | 'think' }) {
  return <span className={`eg-orb is-${state}`} style={{ width: size, height: size }} aria-hidden="true"><i /><b /></span>
}

export default function EngazePrototype() {
  const reduced = useReducedMotion()
  const [msgs, setMsgs] = useState<Msg[]>([])
  const [input, setInput] = useState('')
  const [sick, setSick] = useState(5)
  const [memory, setMemory] = useState({ short: true, pune: true, manager: true })
  const [thread, setThread] = useState('New conversation')
  const idRef = useRef(1)
  const endRef = useRef<HTMLDivElement>(null)
  const thinking = msgs.some(m => m.from === 'genie' && m.stage === 'thinking')

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth', block: 'end' }) }, [msgs, reduced])

  const ask = (text: string, flow: Flow = route(text)) => {
    if (thinking) return
    const me: Msg = { id: idRef.current++, from: 'me', text }
    const g: Msg = { id: idRef.current++, from: 'genie', flow, stage: 'thinking' }
    setMsgs(v => [...v, me, g])
    if (thread === 'New conversation') setThread(flow === 'leave' ? 'Sick leave today' : flow === 'tax' ? 'Tax regime for FY 2026–27' : flow === 'claim' ? 'Pune flight claim' : flow === 'carry' ? 'Carrying leave forward' : 'Getting started')
    const wait = reduced ? 200 : 700 + steps[flow].length * 650
    setTimeout(() => setMsgs(v => v.map(m => (m.id === g.id ? { ...m, stage: 'ready' } : m))), wait)
    setInput('')
  }
  const reset = () => { setMsgs([]); setThread('New conversation') }
  const empty = msgs.length === 0

  return (
    <div className="eg" data-lenis-prevent>
      {/* Threads */}
      <aside className="eg-left">
        <div className="eg-brand">
          <svg viewBox={MARK_VB} width="26" height="30" aria-hidden="true"><path d={MARK_D} fill="currentColor" fillRule="evenodd" /></svg>
          <span>engaze</span>
        </div>
        <button className="eg-new" onClick={reset}><Icon name="plus" size={16} />New conversation</button>
        <p className="eg-cap">Today</p>
        <ul className="eg-threads">
          <li className="is-on"><Icon name="chat" size={16} />{thread}</li>
        </ul>
        <p className="eg-cap">Earlier</p>
        <ul className="eg-threads">
          <li><Icon name="chat" size={16} />Cab reimbursement, Bengaluru</li>
          <li><Icon name="chat" size={16} />My Gen AI training plan</li>
          <li><Icon name="chat" size={16} />Update my address</li>
        </ul>
        <div className="flex-1" />
        <Link to="/craft/engaze" className="eg-back"><Icon name="back" size={16} />Back to the case study</Link>
        <div className="eg-me">
          <span className="eg-me-face">E</span>
          <div><strong>Esha Sharma</strong><span>Senior Dev Lead</span></div>
        </div>
      </aside>

      {/* Conversation */}
      <main className="eg-main">
        <div className="eg-scroll">
          <div className="eg-col">
            {empty ? (
              <motion.section className="eg-hello" initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}>
                <Orb size={96} />
                <h1>Good morning, Esha.</h1>
                <p>Two things are worth a look today. Or ask me anything about your leave, pay or policies.</p>
                <div className="eg-nudges">
                  <button className="eg-nudge" onClick={() => ask('Old or new tax regime: which is better for me?', 'tax')}>
                    <span className="eg-nudge-ic is-violet"><Icon name="wallet" size={18} /></span>
                    <strong>You could save about ₹24,000 in tax</strong>
                    <span>The new regime fits your declarations better. Switching closes on 31 January.</span>
                    <em>Compare for me<Icon name="arrow" size={15} /></em>
                  </button>
                  <button className="eg-nudge" onClick={() => ask('Can I carry forward unused leave?', 'carry')}>
                    <span className="eg-nudge-ic is-amber"><Icon name="sun" size={18} /></span>
                    <strong>One earned leave day lapses on 31 December</strong>
                    <span>You have 11 earned days. Ten carry forward into next year.</span>
                    <em>Show the rule<Icon name="arrow" size={15} /></em>
                  </button>
                </div>
              </motion.section>
            ) : (
              <div className="eg-thread" aria-live="polite">
                {msgs.map(m => m.from === 'me'
                  ? <motion.p key={m.id} className="eg-me-msg" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>{m.text}</motion.p>
                  : <GenieTurn key={m.id} flow={m.flow} stage={m.stage} onAsk={ask} onSick={() => setSick(4)} onUnsick={() => setSick(5)} memoryShort={memory.short} />)}
                <div ref={endRef} />
              </div>
            )}
          </div>
        </div>

        <div className="eg-dock">
          <div className="eg-col">
            {empty && (
              <div className="eg-prompts">
                {prompts.map(p => <button key={p.flow} onClick={() => ask(p.text, p.flow)}><Icon name={p.icon} size={16} />{p.text}</button>)}
              </div>
            )}
            <form className="eg-composer" onSubmit={e => { e.preventDefault(); if (input.trim()) ask(input.trim()) }}>
              <Orb size={30} state={thinking ? 'think' : 'idle'} />
              <input value={input} onChange={e => setInput(e.target.value)} placeholder={thinking ? 'Genie is working on it…' : 'Ask about leave, pay, tax, claims or policies'} aria-label="Message Genie" />
              <button type="button" className="eg-ic" aria-label="Attach a file"><Icon name="paperclip" size={18} /></button>
              <button type="button" className="eg-ic" aria-label="Speak"><Icon name="mic" size={18} /></button>
              <button type="submit" className="eg-send" aria-label="Send" disabled={!input.trim() || thinking}><Icon name="arrow" size={18} strokeWidth={2} /></button>
            </form>
            <p className="eg-fine"><Icon name="lock" size={13} />Only you can see this conversation. Genie confirms before it acts on your behalf.</p>
          </div>
        </div>
      </main>

      {/* Context */}
      <aside className="eg-right">
        <section className="eg-panel">
          <h2>Your time off</h2>
          {[['Sick leave', sick, 12], ['Casual leave', 4, 10], ['Earned leave', 11, 18]].map(([l, v, t]) => (
            <div key={l as string} className="eg-bal">
              <div><span>{l}</span><strong>{v} of {t} left</strong></div>
              <span className="eg-bar"><motion.i animate={{ width: `${((v as number) / (t as number)) * 100}%` }} transition={{ duration: 0.6 }} /></span>
            </div>
          ))}
        </section>
        <section className="eg-panel">
          <h2>What Genie can see</h2>
          <ul className="eg-sources">
            <li><Icon name="sun" size={16} />Leave balances and history</li>
            <li><Icon name="receipt" size={16} />Payslips and tax declarations</li>
            <li><Icon name="book" size={16} />Company policies</li>
            <li><Icon name="clock" size={16} />Your calendar, today only</li>
          </ul>
        </section>
        <section className="eg-panel">
          <h2>What Genie remembers</h2>
          {([['short', 'You prefer short answers'], ['pune', 'You work from the Pune office'], ['manager', 'Your manager is Manoj Kumar']] as const).map(([k, l]) => (
            <label key={k} className="eg-mem">
              <span>{l}</span>
              <input type="checkbox" checked={memory[k]} onChange={() => setMemory(m => ({ ...m, [k]: !m[k] }))} />
              <i aria-hidden="true" />
            </label>
          ))}
          <p className="eg-fine is-left">Turn anything off and Genie stops using it.</p>
        </section>
      </aside>
      <p className="eg-badge">Concept prototype · illustrative data</p>
    </div>
  )
}

/* ---------- Genie's turns ---------- */

function Steps({ list, done }: { list: string[]; done: boolean }) {
  const [n, setN] = useState(0)
  useEffect(() => {
    if (done) { setN(list.length); return }
    const id = setInterval(() => setN(v => Math.min(v + 1, list.length)), 650)
    return () => clearInterval(id)
  }, [done, list.length])
  if (!list.length) return null
  return (
    <ul className={`eg-steps ${done ? 'is-done' : ''}`}>
      {list.slice(0, Math.max(n, 1)).map((s, i) => (
        <motion.li key={s} initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}>
          {i < n || done ? <Icon name="check" size={13} strokeWidth={2.2} /> : <span className="eg-spin" />}{s}
        </motion.li>
      ))}
    </ul>
  )
}

function Source({ children }: { children: React.ReactNode }) {
  return <span className="eg-src"><Icon name="book" size={13} />{children}</span>
}

function Feedback() {
  const [v, setV] = useState<'up' | null>(null)
  return (
    <div className="eg-fb">
      <button aria-label="Helpful" aria-pressed={v === 'up'} onClick={() => setV(v ? null : 'up')}><Icon name="thumb" size={15} /></button>
      <button aria-label="Copy"><Icon name="copy" size={15} /></button>
      <button aria-label="Try again"><Icon name="refresh" size={15} /></button>
    </div>
  )
}

function GenieTurn({ flow, stage, onAsk, onSick, onUnsick, memoryShort }: { flow: Flow; stage: 'thinking' | 'ready'; onAsk: (t: string, f?: Flow) => void; onSick: () => void; onUnsick: () => void; memoryShort: boolean }) {
  const ready = stage === 'ready'
  return (
    <motion.div className="eg-genie" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
      <Orb size={30} state={ready ? 'idle' : 'think'} />
      <div className="eg-genie-body">
        <Steps list={steps[flow]} done={ready} />
        <AnimatePresence>
          {ready && (
            <motion.div initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}>
              {flow === 'leave' && <LeaveTurn onAsk={onAsk} onSick={onSick} onUnsick={onUnsick} />}
              {flow === 'ooo' && <OooTurn />}
              {flow === 'tax' && <TaxTurn short={memoryShort} />}
              {flow === 'claim' && <ClaimTurn />}
              {flow === 'carry' && <CarryTurn />}
              {flow === 'fallback' && (
                <>
                  <p className="eg-say">I can help with leave, pay, tax, claims and HR policies, and I’ll always check with you before I act. Try one of these:</p>
                  <div className="eg-chips">{prompts.map(p => <button key={p.flow} onClick={() => onAsk(p.text, p.flow)}>{p.text}</button>)}</div>
                </>
              )}
              {flow !== 'fallback' && <Feedback />}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

function useCountdown(active: boolean, from = 30) {
  const [s, setS] = useState(from)
  useEffect(() => {
    if (!active) { setS(from); return }
    const id = setInterval(() => setS(v => (v <= 1 ? (clearInterval(id), 0) : v - 1)), 1000)
    return () => clearInterval(id)
  }, [active, from])
  return s
}

function LeaveTurn({ onAsk, onSick, onUnsick }: { onAsk: (t: string, f?: Flow) => void; onSick: () => void; onUnsick: () => void }) {
  const [state, setState] = useState<'draft' | 'applied' | 'undone'>('draft')
  const left = useCountdown(state === 'applied')
  return (
    <>
      <p className="eg-say">Sorry you’re unwell, Esha. Rest up. I’ve got sick leave ready for today. Have a look before I apply it.</p>
      <div className={`eg-card ${state === 'applied' ? 'is-done' : ''}`}>
        {state === 'applied' ? (
          <div className="eg-done">
            <span className="eg-done-ic"><Icon name="check" size={18} strokeWidth={2.2} /></span>
            <div><strong>Sick leave applied for today</strong><p>Approved within policy. Manoj and the Platform team know you’re out.</p></div>
            {left > 0 && <button className="eg-link" onClick={() => { setState('undone'); onUnsick() }}><Icon name="undo" size={14} />Undo · {left}s</button>}
          </div>
        ) : (
          <>
            <div className="eg-card-head"><span className="eg-tag is-violet">Sick leave</span><Source>Leave policy §3.2</Source></div>
            <dl className="eg-grid">
              <div><dt>When</dt><dd>Today, 18 Oct</dd></div>
              <div><dt>Length</dt><dd>1 day</dd></div>
              <div><dt>Balance after</dt><dd>4 of 12 days</dd></div>
            </dl>
            <div className="eg-tell"><span>I’ll tell</span><span className="eg-who"><span className="eg-av">M</span>Manoj Kumar, your manager<span className="eg-av is-team">#</span>Platform team</span></div>
            <p className="eg-note"><Icon name="shield" size={15} />Within policy. One day doesn’t need a medical certificate.</p>
            <div className="eg-actions">
              <button className="eg-btn" onClick={() => { setState('applied'); onSick() }}>{state === 'undone' ? 'Apply again' : 'Apply sick leave'}</button>
              <button className="eg-btn-ghost">Change dates</button>
            </div>
          </>
        )}
      </div>
      {state === 'applied' && (
        <div className="eg-chips">
          <button onClick={() => onAsk('Set an out-of-office for today', 'ooo')}>Set an out-of-office</button>
          <button onClick={() => onAsk('Claim my Pune flight', 'claim')}>Claim my Pune flight</button>
        </div>
      )}
    </>
  )
}

function OooTurn() {
  const [state, setState] = useState<'draft' | 'on' | 'off'>('draft')
  if (state === 'off') return <p className="eg-say">Discarded. Your out-of-office stays off.</p>
  return (
    <>
      <p className="eg-say">{state === 'on' ? 'Done. Your out-of-office is on until tomorrow, 9 am.' : 'Here’s one in your usual tone. Edit it if you like.'}</p>
      {state === 'draft' && (
        <div className="eg-card">
          <div className="eg-card-head"><span className="eg-tag">Out-of-office</span><span className="eg-muted">Today until tomorrow, 9 am</span></div>
          <textarea className="eg-text" defaultValue={'Hi,\n\nI’m out sick today and back tomorrow. For anything urgent on the platform release, please reach Manoj.\n\nThanks,\nEsha'} aria-label="Out-of-office message" />
          <div className="eg-actions">
            <button className="eg-btn" onClick={() => setState('on')}>Turn it on</button>
            <button className="eg-btn-ghost" onClick={() => setState('off')}>Discard</button>
          </div>
        </div>
      )}
    </>
  )
}

function TaxTurn({ short }: { short: boolean }) {
  const [state, setState] = useState<'view' | 'confirm' | 'done'>('view')
  return (
    <>
      <p className="eg-say">
        The new regime saves you about <strong>₹24,000</strong> this year.
        {!short && ' Your 80C and HRA claims are low, so the old regime’s deductions don’t make up for its higher rates. Most people with your mix of claims come out ahead on the new regime.'}
        {short && ' Your 80C and HRA claims are low, so the deductions don’t make up for the higher rates.'}
      </p>
      <div className="eg-card">
        <div className="eg-tax">
          {[['Old regime', 142000, '₹1.42L'], ['New regime', 118000, '₹1.18L']].map(([l, v, s], i) => (
            <div key={l as string} className={`eg-tax-col ${i ? 'is-best' : ''}`}>
              <div className="eg-tax-bar">{i ? <em className="eg-best">Best for you</em> : null}<motion.i initial={{ height: 0 }} animate={{ height: `${((v as number) / 142000) * 100}%` }} transition={{ duration: 0.9, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }} /></div>
              <strong>{s}</strong><span>{l}</span>
            </div>
          ))}
          <div className="eg-tax-why">
            <p className="eg-muted">Based on</p>
            <dl>
              <div><dt>80C claims</dt><dd>₹60,000</dd></div>
              <div><dt>HRA claimed</dt><dd>None</dd></div>
              <div><dt>Home loan interest</dt><dd>None</dd></div>
            </dl>
            <div className="eg-srcs"><Source>Your declarations, FY 2026–27</Source><Source>Tax rules, FY 2026–27</Source></div>
          </div>
        </div>
        {state === 'view' && <div className="eg-actions"><button className="eg-btn" onClick={() => setState('confirm')}>Switch to the new regime</button><button className="eg-btn-ghost">See the full breakdown</button></div>}
        {state === 'confirm' && (
          <div className="eg-confirm">
            <p>Your tax deduction changes from the November payslip. You can switch back until 31 January.</p>
            <div className="eg-actions"><button className="eg-btn" onClick={() => setState('done')}>Confirm the switch</button><button className="eg-btn-ghost" onClick={() => setState('view')}>Not now</button></div>
          </div>
        )}
        {state === 'done' && <div className="eg-done is-inline"><span className="eg-done-ic"><Icon name="check" size={16} strokeWidth={2.2} /></span><div><strong>Switched to the new regime</strong><p>It shows on your November payslip.</p></div></div>}
      </div>
    </>
  )
}

function ClaimTurn() {
  const [state, setState] = useState<'ask' | 'reading' | 'review' | 'done'>('ask')
  useEffect(() => { if (state !== 'reading') return; const t = setTimeout(() => setState('review'), 1800); return () => clearTimeout(t) }, [state])
  return (
    <>
      {state === 'ask' && (
        <>
          <p className="eg-say">Sure. Drop the ticket here, or I can find it in your email.</p>
          <div className="eg-actions">
            <button className="eg-btn-ghost" onClick={() => setState('reading')}><Icon name="paperclip" size={16} />Upload the ticket</button>
            <button className="eg-btn-ghost" onClick={() => setState('reading')}><Icon name="mail" size={16} />Find it in my email</button>
          </div>
        </>
      )}
      {state !== 'ask' && <p className="eg-file"><Icon name="doc" size={16} />6E-2134_BLR-PNQ.pdf<span className="eg-muted">184 KB</span></p>}
      {state === 'reading' && <Steps list={['Reading the ticket', 'Matching it to your trip', 'Checking the travel policy']} done={false} />}
      {(state === 'review' || state === 'done') && (
        <>
          <p className="eg-say">{state === 'done' ? 'Submitted. Your service ticket is SR88129, and the money should reach you in 7 to 8 working days.' : 'Got it. This is within the travel policy, so you only need to check it and submit.'}</p>
          <div className={`eg-card ${state === 'done' ? 'is-done' : ''}`}>
            <div className="eg-flight">
              <div><strong>BLR</strong><span>Bengaluru</span></div>
              <span className="eg-flight-line"><Icon name="plane" size={18} /></span>
              <div className="is-r"><strong>PNQ</strong><span>Pune</span></div>
            </div>
            <dl className="eg-grid">
              <div><dt>Date</dt><dd>14 Oct</dd></div>
              <div><dt>Flight</dt><dd>IndiGo 6E 2134</dd></div>
              <div><dt>Amount</dt><dd>₹6,840</dd></div>
              <div><dt>Project</dt><dd>Atlas</dd></div>
            </dl>
            <p className="eg-note"><Icon name="shield" size={15} />Economy, under the ₹8,000 limit for this route.<Source>Travel policy §2.4</Source></p>
            {state === 'review'
              ? <div className="eg-actions"><button className="eg-btn" onClick={() => setState('done')}>Submit claim</button><button className="eg-btn-ghost">Edit details</button></div>
              : <div className="eg-done is-inline"><span className="eg-done-ic"><Icon name="check" size={16} strokeWidth={2.2} /></span><div><strong>Claim SR88129 submitted</strong><p>Track it any time by asking me.</p></div></div>}
          </div>
        </>
      )}
    </>
  )
}

function CarryTurn() {
  return (
    <>
      <p className="eg-say">Yes, for earned leave. Up to <strong>10 days</strong> carry forward into next year; casual and sick leave reset on 1 January. You have 11 earned days, so <strong>1 lapses</strong> unless you take it by 31 December.</p>
      <blockquote className="eg-quote">
        <p>“Unused earned leave of up to ten (10) days may be carried forward to the following calendar year. Balances above this limit lapse on 31 December.”</p>
        <footer><Source>Leave policy v4.2, §5.1 Carry forward</Source></footer>
      </blockquote>
      <p className="eg-handover">Need an exception? <button className="eg-link">Ask Ananya in HR</button> and I’ll pass this conversation along so you don’t repeat yourself.</p>
    </>
  )
}
