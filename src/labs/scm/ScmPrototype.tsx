import '@fontsource-variable/instrument-sans'
import './scm.css'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from '../Icon'
import { asks, diffs, fields, handled, order, others, people, type Choice, type Diff, type PersonaId, type Sev, type Who } from './data'

const sevLabel: Record<Sev, string> = { high: 'High', med: 'Medium', low: 'Low' }
const ease = [0.16, 1, 0.3, 1] as const
const clock = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })

type Log = { who: Who; text: string; at: string }
type Tab = 'diffs' | 'extraction' | 'activity'

function Face({ who, size = 28 }: { who: Who; size?: number }) {
  if (who === 'agent') return <span className="scm-agent-face" style={{ width: size, height: size }}><Icon name="spark" size={size * 0.58} strokeWidth={1.5} /></span>
  if (who === 'supplier') return <span className="scm-sup-face" style={{ width: size, height: size, fontSize: size * 0.38 }}>HC</span>
  if (who === 'system') return <span className="scm-sys-face" style={{ width: size, height: size }}><Icon name="mail" size={size * 0.55} /></span>
  return <img className="scm-face" src={people[who].img} alt="" width={size} height={size} style={{ width: size, height: size }} />
}
const whoName = (w: Who) => (w === 'agent' ? 'Agent' : w === 'supplier' ? 'Helios Components' : w === 'system' ? 'System' : people[w].name)

function Typed({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => {
    if (reduced) { setN(text.length); return }
    setN(0)
    const id = setInterval(() => setN(v => (v >= text.length ? (clearInterval(id), v) : v + 3)), 16)
    return () => clearInterval(id)
  }, [text, reduced])
  return <>{text.slice(0, n)}</>
}

export default function ScmPrototype() {
  const [persona, setPersona] = useState<PersonaId | null>(null)
  const [signedOut, setSignedOut] = useState(false)
  const [view, setView] = useState<'worklist' | 'order'>('worklist')
  const [tab, setTab] = useState<Tab>('extraction')
  const [lang, setLang] = useState<'en' | 'de'>('en')
  const [hover, setHover] = useState<string | null>(null)
  const [editing, setEditing] = useState(false)
  const [edits, setEdits] = useState<Record<string, string>>({})
  const [validated, setValidated] = useState(false)
  const [choices, setChoices] = useState<Record<string, Choice | undefined>>({})
  const [buyerDone, setBuyerDone] = useState(false)
  const [grDone, setGrDone] = useState(false)
  const [grNote, setGrNote] = useState('The promotion starts on 10 Nov. We need the sensor housings before then.')
  const [replied, setReplied] = useState(false)
  const [revised, setRevised] = useState(false)
  const [closed, setClosed] = useState(false)
  const [version, setVersion] = useState<1 | 2>(1)
  const [modal, setModal] = useState<null | 'validate' | 'submit' | 'reply' | 'pdf' | 'ask' | 'menu'>(null)
  const [answer, setAnswer] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [guide, setGuide] = useState(false)
  const [log, setLog] = useState<Log[]>([
    { who: 'system', text: 'Order confirmation arrived at orders@ from auftrag@helios-components.de, with a PDF.', at: '07:42' },
    { who: 'agent', text: 'Matched it to PO 4994546957 and read the PDF in German. Average confidence 93%.', at: '07:43' },
    { who: 'agent', text: 'Flagged one field below 80%: the delivery date on line 1002 is given as “KW 46”.', at: '07:43' },
  ])
  const add = (who: Who, text: string) => setLog(v => [...v, { who, text, at: clock() }])
  const say = (t: string) => setToast(t)

  const buyerDiffs = diffs.filter(d => d.owner === 'buyer')
  const grDiffs = diffs.filter(d => d.owner === 'gr')
  const rejects = diffs.filter(d => d.owner !== 'agent' && choices[d.id] === 'reject')
  const needsReply = rejects.length > 0
  const bothDone = buyerDone && grDone
  const delivery = edits['f-2-del'] ?? fields.find(f => f.id === 'f-2-del')!.value

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3800); return () => clearTimeout(t) }, [toast])
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k' && persona) { e.preventDefault(); setModal(m => (m === 'ask' ? null : 'ask')) }
      if (e.key === 'Escape') setModal(null)
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [persona])

  /* ---------- Story guide ---------- */
  const steps: { who: Who; text: string; done: boolean; skip?: boolean }[] = [
    { who: 'agent', text: 'The agent reads the supplier’s PDF', done: true },
    { who: 'david', text: 'David validates the extraction', done: validated },
    { who: 'adrian', text: 'Adrian decides price, terms and fees', done: buyerDone },
    { who: 'rajan', text: 'Rajan decides quantity and delivery', done: grDone },
    { who: 'adrian', text: 'Adrian replies to Helios', done: replied, skip: bothDone && !needsReply },
    { who: 'supplier', text: 'Helios sends a revised confirmation', done: revised, skip: bothDone && !needsReply },
    { who: 'adrian', text: 'Adrian approves and confirms the order', done: closed },
  ]
  const open = steps.map((s, i) => ({ ...s, i })).filter(s => !s.done && !s.skip)
  const active = open.length ? (open[0].i === 2 || open[0].i === 3 ? open.filter(s => s.i === 2 || s.i === 3) : [open[0]]) : []

  const signIn = (p: PersonaId) => { setPersona(p); setSignedOut(false); setView('order'); setTab(p === 'david' ? 'extraction' : 'diffs'); setVersion(revised ? 2 : 1); setModal(null); setEditing(false) }
  const signOut = () => { setPersona(null); setSignedOut(true); setModal(null) }
  const simulateSupplier = () => {
    setRevised(true); setVersion(2)
    add('supplier', 'Sent a revised confirmation, version 2.')
    add('agent', 'Compared version 2 with every decision. All rejected items now match the purchase order. Nothing left to resolve.')
    say('Helios sent version 2. Every change you asked for is in it.')
  }

  /* ---------- Actions ---------- */
  const confirmValidation = () => {
    setValidated(true); setEditing(false); setModal(null)
    if (Object.keys(edits).length) add('david', `Corrected ${Object.keys(edits).length === 1 ? 'one field' : `${Object.keys(edits).length} fields`}: delivery date on line 1002.`)
    add('david', 'Confirmed the validation.')
    add('agent', 'Compared with PO 4994546957. Found 6 differences: 3 for Adrian, 2 for Rajan, 1 resolved inside policy. Rated the order high risk.')
    say('Validation confirmed. The differences went to Adrian and Rajan.')
  }
  const decide = (d: Diff, c: Choice) => {
    const next = choices[d.id] === c ? undefined : c
    setChoices(v => ({ ...v, [d.id]: next }))
    if (next) add(persona!, `${c === 'accept' ? 'Accepted' : 'Rejected'} ${d.field.toLowerCase()}${d.line ? ` on ${d.line.split(' · ')[0].toLowerCase()}` : ''}.`)
  }
  const confirmBuyer = () => { setBuyerDone(true); add('adrian', 'Confirmed his discrepancy decisions.'); say(grDone ? 'Saved. Every decision is in.' : 'Saved. Waiting for Rajan’s decisions.') }
  const submitGr = () => { setGrDone(true); setModal(null); add('rajan', `Submitted his decisions${grNote.trim() ? `: “${grNote.trim()}”` : '.'}`); say('Submitted. Adrian will handle the reply to Helios.') }
  const sendReply = () => {
    setReplied(true); setModal(null)
    add('adrian', `Sent the reply drafted by the agent, in ${lang === 'de' ? 'German' : 'English'}, with the list of differences attached.`)
    add('agent', 'Watching the inbox for a revised confirmation.')
    say('Sent to Helios. I’ll watch for the revised confirmation.')
  }
  const approve = () => {
    setClosed(true)
    add('adrian', revised ? 'Approved version 2.' : 'Approved the confirmation.')
    add('agent', 'Closed the confirmation. The order with Helios is confirmed.')
    say('Order confirmed. Nothing left to resolve.')
  }

  /* ---------- Statuses ---------- */
  const status: Record<PersonaId, { label: string; tone: 'todo' | 'wait' | 'done' }> = {
    david: validated ? { label: 'Validated', tone: 'done' } : { label: 'Pending validation', tone: 'todo' },
    adrian: !validated ? { label: 'Waiting for validation', tone: 'wait' }
      : !buyerDone ? { label: 'Review discrepancies', tone: 'todo' }
      : !grDone ? { label: 'Waiting for Rajan', tone: 'wait' }
      : closed ? { label: 'Confirmed', tone: 'done' }
      : needsReply && !replied ? { label: 'Share with supplier', tone: 'todo' }
      : needsReply && !revised ? { label: 'Sent to supplier', tone: 'wait' }
      : { label: revised ? 'Revised version to review' : 'Ready to close', tone: 'todo' },
    rajan: !validated ? { label: 'Waiting for validation', tone: 'wait' } : !grDone ? { label: 'Review discrepancies', tone: 'todo' } : closed ? { label: 'Confirmed', tone: 'done' } : { label: 'Submitted', tone: 'done' },
  }

  const insight = (): { title: string; text: string } => {
    if (closed) return { title: 'All set', text: 'The order is confirmed and every step is in the activity log.' }
    if (persona === 'david') return validated
      ? { title: 'All set for now', text: 'The differences are with Adrian and Rajan. Nothing else needs you on this order.' }
      : { title: 'Next: check one field, then confirm', text: 'Everything reads above 90% except the delivery date on line 1002, which the PDF gives as a calendar week. Check it against the PDF, then confirm the validation.' }
    if (persona === 'rajan') return !validated ? { title: 'Waiting for validation', text: 'David is checking the extraction. Your part arrives once he confirms it.' }
      : grDone ? { title: 'All set for now', text: 'Adrian will reply to Helios with your decisions.' }
      : { title: 'Next: two decisions for the store', text: 'The quantity is fine for stock. The delivery date is the risk: it misses the promotion start on 10 Nov.' }
    if (!validated) return { title: 'Waiting for validation', text: 'David is checking what I read. You’ll get the differences as soon as he confirms.' }
    if (!buyerDone) return { title: 'Next: review three commercial differences', text: 'Two are high severity. I suggest rejecting the price increase and the longer payment terms, and accepting the packaging fee.' }
    if (!grDone) return { title: 'Saved. Waiting for Rajan', text: 'Rajan is deciding quantity and delivery. I’ll prepare the supplier reply once he submits.' }
    if (needsReply && !replied) return { title: 'Next: share with the supplier', text: `${rejects.length} ${rejects.length === 1 ? 'change' : 'changes'} to request. I drafted the email from your and Rajan’s decisions.` }
    if (needsReply && !revised) return { title: 'Sent. Waiting for Helios', text: 'I’ll compare the revised confirmation as soon as it arrives.' }
    return { title: revised ? 'Version 2 matches every decision' : 'Nothing left to resolve', text: 'Approve to confirm the order and close it.' }
  }

  if (!persona) return <SignIn signedOut={signedOut} onPick={signIn} />

  const tabs: { id: Tab; label: string; count?: number }[] =
    persona === 'david' ? [{ id: 'extraction', label: 'Extraction' }, ...(validated ? [{ id: 'diffs' as Tab, label: 'Discrepancies' }] : []), { id: 'activity', label: 'Activity' }]
      : persona === 'rajan' ? [{ id: 'diffs', label: 'Discrepancies', count: validated && !grDone ? grDiffs.filter(d => !choices[d.id]).length : undefined }, { id: 'activity', label: 'Activity' }]
      : [{ id: 'diffs', label: 'Discrepancies', count: validated && !buyerDone ? buyerDiffs.filter(d => !choices[d.id]).length : undefined }, { id: 'extraction', label: 'Extraction' }, { id: 'activity', label: 'Activity' }]
  const curTab = tabs.some(t => t.id === tab) ? tab : tabs[0].id

  const pipe = [
    { label: 'Received', sub: '07:42 by email', done: true },
    { label: 'Read', sub: '93% confidence', done: true },
    { label: 'Validated', sub: validated ? 'David' : 'David checks', done: validated, gate: true },
    { label: 'Decided', sub: bothDone ? 'Adrian and Rajan' : validated ? `${[buyerDone, grDone].filter(Boolean).length} of 2 people` : 'Adrian and Rajan', done: bothDone, gate: true },
    { label: 'Replied', sub: bothDone && !needsReply ? 'Not needed' : replied ? 'Sent to Helios' : 'Adrian', done: replied || (bothDone && !needsReply), gate: true },
    { label: 'Revised', sub: bothDone && !needsReply ? 'Not needed' : revised ? 'Version 2' : 'Helios', done: revised || (bothDone && !needsReply) },
    { label: 'Confirmed', sub: closed ? 'Order confirmed' : 'Adrian approves', done: closed, gate: true },
  ]
  const nowIdx = pipe.findIndex(p => !p.done)
  const ins = insight()

  return (
    <div className="scm" data-lenis-prevent>
      <nav className="scm-side" aria-label="Suite">
        <div className="scm-ws">
          <span className="scm-logo"><KeelMark /></span>
          <span><em>Keel Supply</em><strong>Meridian Procurement</strong></span>
          <Icon name="down" size={14} />
        </div>
        <ul className="scm-nav">
          <li><button><Icon name="home" size={18} />Home</button></li>
          <li><button><Icon name="doc" size={18} />Tasks</button></li>
          <li><button><Icon name="cart" size={18} />Purchase orders</button></li>
          <li><button className="is-on" onClick={() => setView('worklist')}><Icon name="inbox" size={18} />Confirmations<Icon name="down" size={14} className="scm-nav-car" /></button>
            <ul className="scm-subnav">
              <li><button className={view === 'worklist' ? 'is-cur' : ''} onClick={() => setView('worklist')}>My worklist<span>{persona === 'david' ? 3 : validated && !closed ? 1 : 0}</span></button></li>
              <li><button>Closed by the agent<span>11</span></button></li>
              <li><button>Archive</button></li>
            </ul>
          </li>
          <li><button><Icon name="users" size={18} />Suppliers</button></li>
        </ul>
        <p className="scm-nav-cap">Workflows</p>
        <ul className="scm-nav">
          <li><button><Icon name="box" size={18} />Goods receipt</button></li>
          <li><button><Icon name="receipt" size={18} />Invoices</button></li>
          <li><button><Icon name="truck" size={18} />Deliveries</button></li>
        </ul>
        <div className="flex-1" />
        <div className="scm-auto-card">
          <div className="scm-auto-ladder" aria-hidden="true"><i className="is-on" /><i className="is-on" /><i /></div>
          <strong>Guided autonomy</strong>
          <p>The agent reads, compares and drafts. People decide at three gates.</p>
          <button className="scm-btn is-dark is-sm" onClick={() => setModal('ask')}>Ask the agent</button>
        </div>
        <Link to="/craft/sap-agentic" className="scm-backlink"><Icon name="back" size={16} />Back to the case study</Link>
      </nav>

      <div className="scm-app">
        <header className="scm-top">
          <div className="scm-topcrumb"><button onClick={() => setView('worklist')}>Confirmations</button><Icon name="chevron" size={14} /><span>{view === 'worklist' ? 'My worklist' : order.oc}</span></div>
          <button className="scm-search" onClick={() => setModal('ask')}>
            <Icon name="search" size={17} /><span>Search or ask the agent</span><kbd>⌘K</kbd>
          </button>
          <div className="scm-top-r">
            <button className="scm-icon-btn" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
            <div className="scm-menu-wrap">
              <button className="scm-me" onClick={() => setModal(modal === 'menu' ? null : 'menu')} aria-expanded={modal === 'menu'}>
                <Face who={persona} size={32} /><span><strong>{people[persona].name}</strong><em>{people[persona].role}</em></span><Icon name="down" size={16} />
              </button>
              <AnimatePresence>
                {modal === 'menu' && (
                  <motion.div className="scm-menu" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.2 }}>
                    <p className="scm-menu-cap">Switch account</p>
                    {(Object.keys(people) as PersonaId[]).filter(p => p !== persona).map(p => (
                      <button key={p} onClick={() => signIn(p)}><Face who={p} size={26} /><span><strong>{people[p].name}</strong><em>{people[p].role}</em></span></button>
                    ))}
                    <hr />
                    <button onClick={signOut}><Icon name="back" size={16} />Sign out</button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        {view === 'worklist' ? (
          <Worklist persona={persona} status={status[persona]} validated={validated} onOpen={() => { setView('order'); setTab(persona === 'david' ? 'extraction' : 'diffs') }} onOther={() => say('This prototype follows the Helios order. Open it to walk the full journey.')} />
        ) : (
          <div className="scm-order-page">
            <section className="scm-order">
              <div className="scm-order-head">
                <div className="scm-sup-mark" aria-hidden="true">HC</div>
                <div className="min-w-0">
                  <h2>{order.supplier}{revised && persona === 'adrian' && (
                    <span className="scm-versions" role="group" aria-label="Version">
                      {([1, 2] as const).map(v => <button key={v} aria-pressed={version === v} onClick={() => setVersion(v)}>Version {v}</button>)}
                    </span>
                  )}</h2>
                  <dl className="scm-meta">
                    <div><dt>Confirmation</dt><dd>{order.oc}</dd></div>
                    <div><dt>Purchase order</dt><dd>{order.po}</dd></div>
                    <div><dt>Value</dt><dd>{version === 2 && choices.total === 'reject' ? (choices.pack === 'reject' ? '€142,800.00' : order.revisedValue) : order.value}</dd></div>
                    <div><dt>Status</dt><dd><span className={`scm-status is-${status[persona].tone}`}>{status[persona].label}</span></dd></div>
                  </dl>
                </div>
                <div className="scm-order-r">
                  {validated ? <span className={`scm-risk ${closed ? 'is-ok' : ''}`}><span className={`scm-dot ${closed ? 'is-ok' : 'sev-high'}`} />{closed ? 'Resolved' : 'High risk'}</span>
                    : <span className="scm-risk is-none">Risk rated after validation</span>}
                  <button className="scm-btn-ghost" onClick={() => setModal('ask')}><Icon name="spark" size={16} />Ask about this order</button>
                </div>
              </div>
              <ol className="scm-pipe" aria-label="Progress">
                {pipe.map((p, i) => {
                  const state = p.done ? 'done' : i === nowIdx ? 'now' : 'next'
                  return (
                    <li key={p.label} className={`is-${state}`}>
                      <span className="scm-pipe-node">{state === 'done' ? <Icon name="check" size={13} strokeWidth={2.2} /> : p.gate ? <span className="scm-gate" /> : <span className="scm-pipe-dot" />}</span>
                      <span className="scm-pipe-t">{p.label}</span><span className="scm-pipe-s">{p.sub}</span>
                    </li>
                  )
                })}
              </ol>
            </section>

            <div className="scm-body">
              <section className="scm-work" aria-label="Order details">
                <div className="scm-tabs" role="tablist">
                  {tabs.map(t => <button key={t.id} role="tab" aria-selected={curTab === t.id} onClick={() => setTab(t.id)}>{t.label}{t.count ? <span>{t.count}</span> : null}</button>)}
                </div>
                <div className="scm-work-scroll" key={`${persona}-${curTab}-${version}`}>
                  <div className={`scm-insight ${closed ? 'is-done' : ''}`}>
                    <Face who="agent" size={30} />
                    <div><strong>{ins.title}</strong><p>{ins.text}</p></div>
                  </div>

                  {curTab === 'extraction' && (
                    <Extraction editable={persona === 'david' && !validated} editing={editing} edits={edits} onEdit={(id, v) => setEdits(e => ({ ...e, [id]: v }))} onHover={setHover} />
                  )}
                  {curTab === 'diffs' && (
                    <Discrepancies persona={persona} validated={validated} choices={choices} delivery={delivery} version={version} revised={revised}
                      locked={persona === 'adrian' ? buyerDone : persona === 'rajan' ? grDone : true} grDone={grDone} buyerDone={buyerDone}
                      onDecide={decide} onHover={setHover} />
                  )}
                  {curTab === 'activity' && (
                    <ol className="scm-log">
                      {log.map((l, i) => <li key={i}><Face who={l.who} size={28} /><div><p><strong>{whoName(l.who)}</strong> <span className="scm-muted">{l.at}</span></p><p>{l.text}</p></div></li>)}
                    </ol>
                  )}
                </div>

                <footer className="scm-actionbar">
                  <ActionBar persona={persona} {...{ validated, editing, buyerDone, grDone, needsReply, replied, revised, closed }}
                    decided={(persona === 'adrian' ? buyerDiffs : grDiffs).filter(d => choices[d.id]).length}
                    total={(persona === 'adrian' ? buyerDiffs : grDiffs).length}
                    onEdit={() => setEditing(e => !e)} onDraft={() => { add('david', 'Saved a draft of his corrections.'); say('Draft saved. Nothing has been routed yet.') }}
                    onValidate={() => setModal('validate')} onConfirmBuyer={confirmBuyer} onSubmitGr={() => setModal('submit')}
                    onReply={() => setModal('reply')} onApprove={approve} />
                </footer>
              </section>

              <aside className="scm-pdf" aria-label="Supplier PDF">
                <div className="scm-pdf-bar">
                  <span className="scm-doc-file"><Icon name="doc" size={16} />Auftragsbestätigung{version === 2 ? ' v2' : ''}.pdf</span>
                  <button className="scm-icon-btn" aria-label="Open full size" onClick={() => setModal('pdf')}><Icon name="grid" size={17} /></button>
                </div>
                <div className="scm-pdf-lang"><div className="scm-toggle" role="group" aria-label="Document language">
                  <button aria-pressed={lang === 'de'} onClick={() => setLang('de')}>Original</button>
                  <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
                </div></div>
                <div className="scm-pdf-scroll"><Doc hover={hover} en={lang === 'en'} v2={version === 2} rej={new Set(rejects.map(r => r.id))} compact /></div>
              </aside>
            </div>
          </div>
        )}
      </div>

      {/* Story guide */}
      <aside className={`scm-guide ${guide ? '' : 'is-min'}`} aria-label="Walkthrough">
        <button className="scm-guide-head" onClick={() => setGuide(g => !g)} aria-expanded={guide}>
          <span>Walk the journey</span><em>{steps.filter(s => s.done || s.skip).length} of {steps.length}</em><Icon name="down" size={16} />
        </button>
        {guide && (
          <ol className="scm-guide-list">
            {steps.map((s, i) => {
              const isActive = active.some(a => a.i === i)
              return (
                <li key={i} className={s.done ? 'is-done' : s.skip ? 'is-skip' : isActive ? 'is-now' : ''}>
                  <span className="scm-guide-mark">{s.done ? <Icon name="check" size={12} strokeWidth={2.4} /> : null}</span>
                  <Face who={s.who} size={20} />
                  <span>{s.text}{s.skip ? ' · not needed' : ''}</span>
                </li>
              )
            })}
          </ol>
        )}
        {!guide && active.length > 0 && <p className="scm-guide-now">{active.map(a => a.text).join(' · ')}</p>}
        <div className="scm-guide-cta">
          {active.length === 0 ? <p>That’s the whole journey. Sign in as anyone to look back.</p>
            : active.map(a => a.who === 'supplier'
              ? <button key={a.i} className="scm-btn is-sm" onClick={simulateSupplier}><Icon name="mail" size={15} />Simulate Helios’s reply</button>
              : a.who === persona
                ? <p key={a.i} className="scm-guide-you"><Face who={persona} size={18} />Your turn, {people[persona].first}.</p>
                : <button key={a.i} className="scm-btn-ghost is-sm" onClick={() => signIn(a.who as PersonaId)}><Face who={a.who} size={18} />Continue as {people[a.who as PersonaId].first}</button>)}
        </div>
      </aside>

      {/* Dialogs */}
      <AnimatePresence>
        {modal === 'validate' && (
          <Dialog title="Confirm the validation?" onClose={() => setModal(null)}>
            <p>The agent compares the confirmation with the purchase order and routes each difference to its owner: commercial ones to Adrian, quantity and delivery to Rajan.</p>
            {!edits['f-2-del'] && <p className="scm-warn"><Icon name="shield" size={15} />You haven’t changed the delivery date the agent flagged. That’s fine if it’s right.</p>}
            <div className="scm-dialog-foot"><button className="scm-btn-ghost" onClick={() => setModal(null)}>Keep checking</button><button className="scm-btn" onClick={confirmValidation}>Confirm validation</button></div>
          </Dialog>
        )}
        {modal === 'submit' && (
          <Dialog title="Submit your decisions" onClose={() => setModal(null)}>
            <ul className="scm-sumlist">{grDiffs.map(d => <li key={d.id}><span>{d.field}</span><strong className={choices[d.id] === 'reject' ? 'is-rej' : 'is-acc'}>{choices[d.id] === 'reject' ? 'Rejected' : 'Accepted'}</strong></li>)}</ul>
            <label className="scm-field"><span>Comment for Adrian (optional)</span><textarea value={grNote} onChange={e => setGrNote(e.target.value)} rows={3} /></label>
            <div className="scm-dialog-foot"><button className="scm-btn-ghost" onClick={() => setModal(null)}>Back</button><button className="scm-btn" onClick={submitGr}>Submit for processing</button></div>
          </Dialog>
        )}
        {modal === 'reply' && <ReplySheet lang={lang} setLang={setLang} choices={choices} onClose={() => setModal(null)} onSend={sendReply} />}
        {modal === 'pdf' && (
          <motion.div className="scm-scrim" onClick={() => setModal(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="scm-pdf-full" onClick={e => e.stopPropagation()} initial={{ scale: 0.97 }} animate={{ scale: 1 }}>
              <button className="scm-icon-btn scm-pdf-x" aria-label="Close" onClick={() => setModal(null)}><Icon name="x" size={18} /></button>
              <Doc hover={null} en={lang === 'en'} v2={version === 2} rej={new Set(rejects.map(r => r.id))} />
            </motion.div>
          </motion.div>
        )}
        {modal === 'ask' && (
          <motion.div className="scm-scrim is-top" onClick={() => setModal(null)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="scm-ask" role="dialog" aria-label="Ask the agent" onClick={e => e.stopPropagation()} initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
              <div className="scm-ask-input"><Icon name="spark" size={18} /><span>Ask about confirmation {order.oc}</span><kbd>esc</kbd></div>
              <ul>{asks.map((a, i) => <li key={a.q}><button className={answer === i ? 'is-on' : ''} onClick={() => setAnswer(i)}>{a.q}<Icon name="chevron" size={16} /></button></li>)}</ul>
              {answer !== null && <div className="scm-answer" aria-live="polite"><Face who="agent" size={26} /><p><Typed text={asks[answer].a} /></p></div>}
              <p className="scm-ask-foot"><Icon name="lock" size={14} />Answers use this order, its history and your procurement policy.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <div className="scm-toast-wrap"><motion.div className="scm-toast" role="status" initial={{ opacity: 0, y: -12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -12 }} transition={{ duration: 0.35, ease }}>
            <Face who="agent" size={22} />{toast}
          </motion.div></div>
        )}
      </AnimatePresence>
      <p className="scm-badge">Concept prototype · illustrative data</p>
    </div>
  )
}

/* ================= Sign in ================= */

function KeelMark() {
  return <svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true"><path d="M3 6h18L12 21 3 6Z" fill="currentColor" opacity=".9" /><path d="M7.5 6 12 13.5 16.5 6" fill="none" stroke="#fff" strokeWidth="1.6" /></svg>
}

function SignIn({ signedOut, onPick }: { signedOut: boolean; onPick: (p: PersonaId) => void }) {
  return (
    <div className="scm scm-signin" data-lenis-prevent>
      <section className="scm-signin-art">
        <div className="scm-signin-brand"><span className="scm-logo"><KeelMark /></span>Keel Supply</div>
        <div>
          <h1>Order confirmations, read and prepared by an agent. Decided by people.</h1>
          <p>Suppliers reply in their own layout, often in German. The agent reads each one, compares it with the purchase order and routes every difference to the person who owns it.</p>
        </div>
        <ol className="scm-signin-flow">
          {['Received', 'Read', 'Validated', 'Decided', 'Replied', 'Confirmed'].map((s, i) => <li key={s}><span>{i + 1}</span>{s}</li>)}
        </ol>
        <Link to="/craft/sap-agentic" className="scm-signin-back"><Icon name="back" size={16} />Back to the case study</Link>
      </section>
      <section className="scm-signin-form">
        <div className="scm-signin-box">
          {signedOut && <p className="scm-signedout"><Icon name="check" size={15} />You’re signed out.</p>}
          <h2>Sign in</h2>
          <p className="scm-muted">Choose an account. Each one sees the same order from its own step.</p>
          <ul>
            {(Object.keys(people) as PersonaId[]).map(p => (
              <li key={p}>
                <button className="scm-account" onClick={() => onPick(p)}>
                  <Face who={p} size={44} />
                  <span className="scm-account-t"><strong>{people[p].name}</strong><em>{people[p].title}</em><span>{people[p].job}</span></span>
                  <Icon name="chevron" size={18} />
                </button>
              </li>
            ))}
          </ul>
          <p className="scm-signin-sso"><Icon name="lock" size={14} />Single sign-on through your company identity service.</p>
        </div>
      </section>
    </div>
  )
}

/* ================= Worklist ================= */

function Worklist({ persona, status, validated, onOpen, onOther }: { persona: PersonaId; status: { label: string; tone: string }; validated: boolean; onOpen: () => void; onOther: () => void }) {
  const isOps = persona === 'david'
  const brief = isOps
    ? <>14 confirmations came in overnight. I closed 11 inside your policy. <strong>3 are waiting for your validation.</strong></>
    : persona === 'adrian'
      ? <>{validated ? <strong>One order needs your decisions.</strong> : <strong>Nothing to decide yet.</strong>} Helios Components is still {validated ? 'high risk with three commercial differences' : 'with David for validation'}.</>
      : <>{validated ? <strong>One order needs your call on quantity and delivery.</strong> : <strong>Nothing for you yet.</strong>} I only show you what affects the store.</>
  return (
    <div className="scm-worklist">
      <div className="scm-wl-head">
        <div><h1>My worklist</h1><p className="scm-muted">{people[persona].role} · Wednesday, 18 October</p></div>
        <div className="scm-wl-stats">
          {isOps ? <><div><strong>3</strong><span>Pending validation</span></div><div><strong>93%</strong><span>Average confidence</span></div></>
            : <><div><strong>{validated ? 1 : 0}</strong><span>To review</span></div><div><strong>11</strong><span>Closed by the agent</span></div></>}
        </div>
      </div>
      <div className="scm-brief"><Face who="agent" size={28} /><p>{brief}</p></div>
      <div className="scm-table-wrap">
        <table className="scm-table">
          <thead><tr>
            <th>Supplier</th><th>PO no.</th><th>Document no.</th><th>Order value</th><th>Received</th>
            {isOps ? <th>Confidence</th> : <><th>Discrepancies</th><th>Risk</th></>}
            <th>Status</th><th><span className="sr-only">Action</span></th>
          </tr></thead>
          <tbody>
            <tr className="is-live" onClick={onOpen}>
              <td><span className="scm-sup-cell"><span className="scm-sup-mini">HC</span>{order.supplier}</span></td><td>{order.po}</td><td>{order.oc}</td><td>{order.value}</td><td>Today, 07:42</td>
              {isOps ? <td><span className="scm-confcell"><i style={{ width: '93%' }} />93%</span></td>
                : <><td>{validated ? (persona === 'adrian' ? '3 yours, 2 Rajan’s' : '2') : '-'}</td><td>{validated ? (status.tone === 'done' && status.label === 'Confirmed' ? <span className="scm-sev sev-low">Resolved</span> : <span className="scm-sev sev-high">High</span>) : <span className="scm-muted">Not rated</span>}</td></>}
              <td><span className={`scm-status is-${status.tone}`}>{status.label}</span></td>
              <td><button className="scm-btn is-sm" onClick={e => { e.stopPropagation(); onOpen() }}>Open<Icon name="arrow" size={14} /></button></td>
            </tr>
            {others.map(o => (
              <tr key={o.po} onClick={onOther}>
                <td><span className="scm-sup-cell"><span className="scm-sup-mini is-grey">{o.supplier.slice(0, 2).toUpperCase()}</span>{o.supplier}</span></td><td>{o.po}</td><td>{o.doc}</td><td>{o.value}</td><td>Today, {o.at}</td>
                {isOps ? <td><span className="scm-confcell"><i style={{ width: `${o.conf}%` }} />{o.conf}%</span></td>
                  : <><td>{o.diffs || 'None'}</td><td><span className={`scm-sev sev-${o.sev}`}>{sevLabel[o.sev]}</span></td></>}
                <td><span className="scm-status is-wait">{isOps ? 'Pending validation' : 'Waiting for validation'}</span></td>
                <td><button className="scm-btn-ghost is-sm" onClick={e => { e.stopPropagation(); onOther() }}>Open</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {!isOps && (
        <details className="scm-handled">
          <summary><Icon name="shield" size={16} />11 closed by the agent inside your policy<Icon name="down" size={16} /></summary>
          <ul>{handled.map(([s, why]) => <li key={s}><span>{s}</span><span className="scm-pill is-agent">{why}</span></li>)}</ul>
        </details>
      )}
    </div>
  )
}

/* ================= Extraction ================= */

function Extraction({ editable, editing, edits, onEdit, onHover }: { editable: boolean; editing: boolean; edits: Record<string, string>; onEdit: (id: string, v: string) => void; onHover: (m: string | null) => void }) {
  const groups = ['Header', 'Line 1001', 'Line 1002'] as const
  return (
    <div className="scm-extract">
      {groups.map(g => (
        <section key={g}>
          <h3>{g === 'Header' ? 'Header' : g === 'Line 1001' ? 'Line 1001 · Control module' : 'Line 1002 · Sensor housing'}</h3>
          <div className="scm-xrows">
            {fields.filter(f => f.group === g).map(f => {
              const low = f.conf < 80
              const val = edits[f.id] ?? f.value
              const changed = edits[f.id] !== undefined && edits[f.id] !== f.value
              return (
                <div key={f.id} className={`scm-xrow ${low ? 'is-low' : ''}`} onMouseEnter={() => onHover(f.mark ?? null)} onMouseLeave={() => onHover(null)}>
                  <span className="scm-x-label">{f.label}</span>
                  <span className="scm-x-val">
                    {editing && editable
                      ? <input value={val} onChange={e => onEdit(f.id, e.target.value)} aria-label={f.label} />
                      : <strong>{val}</strong>}
                    {changed && !editing && <em className="scm-x-changed">Corrected</em>}
                  </span>
                  <span className="scm-x-quote" lang="de">{f.quote}</span>
                  <span className={`scm-x-conf ${low ? 'is-low' : ''}`}><i><b style={{ width: `${f.conf}%` }} /></i>{f.conf}%</span>
                  {low && f.note && <p className="scm-x-note"><Icon name="spark" size={14} />{f.note}</p>}
                </div>
              )
            })}
          </div>
        </section>
      ))}
    </div>
  )
}

/* ================= Discrepancies ================= */

function Discrepancies({ persona, validated, choices, delivery, version, revised, locked, grDone, buyerDone, onDecide, onHover }: {
  persona: PersonaId; validated: boolean; choices: Record<string, Choice | undefined>; delivery: string; version: 1 | 2; revised: boolean
  locked: boolean; grDone: boolean; buyerDone: boolean; onDecide: (d: Diff, c: Choice) => void; onHover: (m: string | null) => void
}) {
  if (!validated) return (
    <div className="scm-empty"><Icon name="clock" size={22} /><strong>Waiting for David’s validation</strong><p>The agent compares the confirmation with the purchase order once David confirms what it read. Then your part appears here.</p></div>
  )
  const fix = (d: Diff) => (d.id === 'delivery' ? { ...d, oc: delivery } : d)
  const mine = (persona === 'adrian' ? diffs.filter(d => d.owner === 'buyer') : persona === 'rajan' ? diffs.filter(d => d.owner === 'gr') : diffs.filter(d => d.owner !== 'agent')).map(fix)
  const theirs = persona === 'adrian' ? diffs.filter(d => d.owner === 'gr').map(fix) : []
  const agentOnes = persona !== 'rajan' ? diffs.filter(d => d.owner === 'agent') : []

  if (version === 2 && revised) return (
    <div className="scm-v2">
      <h3>Version 2 against your decisions</h3>
      {diffs.filter(d => d.owner !== 'agent').map(fix).map(d => {
        const rej = choices[d.id] === 'reject'
        return (
          <div key={d.id} className="scm-v2row">
            <span className="scm-v2-ic"><Icon name="check" size={14} strokeWidth={2.4} /></span>
            <div><strong>{d.field}</strong>{d.line && <span className="scm-muted"> · {d.line.split(' · ')[0]}</span>}</div>
            <span>{rej ? <>Now <strong>{d.po}</strong>, as on the purchase order</> : <>Unchanged at <strong>{d.oc}</strong>, as agreed</>}</span>
            <span className={`scm-pill ${rej ? 'is-agent' : ''}`}>{rej ? 'Fixed by Helios' : 'Accepted'}</span>
          </div>
        )
      })}
    </div>
  )

  return (
    <div className="scm-diffs">
      <h3>{persona === 'adrian' ? 'Commercial · yours to decide' : persona === 'rajan' ? 'Quantity and delivery · yours to decide' : 'Routed differences'}</h3>
      {mine.map((d, i) => (
        <DiffRow key={d.id} d={d} n={i + 1} choice={choices[d.id]} readOnly={persona === 'david'} locked={locked} onDecide={c => onDecide(d, c)} onHover={onHover}
          ownerNote={persona === 'david' ? (d.owner === 'buyer' ? 'Adrian' : 'Rajan') : undefined} />
      ))}
      {theirs.length > 0 && (
        <>
          <h3>Quantity and delivery · Rajan</h3>
          {theirs.map((d, i) => (
            <div key={d.id} className="scm-other" onMouseEnter={() => onHover(d.id)} onMouseLeave={() => onHover(null)}>
              <span className="scm-num is-muted">{mine.length + i + 1}</span>
              <div><strong>{d.field}</strong><span className="scm-muted"> · {d.line}</span><p className="scm-muted">{d.po} → {d.oc}</p></div>
              {grDone ? <span className={`scm-decided is-${choices[d.id]}`}><Face who="rajan" size={20} />{choices[d.id] === 'reject' ? 'Rejected' : 'Accepted'}</span>
                : <span className="scm-decided is-wait"><Face who="rajan" size={20} />Rajan is deciding</span>}
            </div>
          ))}
        </>
      )}
      {agentOnes.length > 0 && (
        <>
          <h3>Resolved by the agent</h3>
          {agentOnes.map(d => (
            <div key={d.id} className="scm-other is-agent" onMouseEnter={() => onHover(d.id)} onMouseLeave={() => onHover(null)}>
              <Face who="agent" size={24} />
              <div><strong>{d.field}</strong><span className="scm-muted"> · {d.line}</span><p className="scm-muted">{d.impact}</p></div>
              <span className="scm-pill is-agent">Within policy</span>
            </div>
          ))}
        </>
      )}
      {persona === 'adrian' && buyerDone && !grDone && <p className="scm-hint"><Icon name="clock" size={15} />Your decisions are saved. The reply waits for Rajan.</p>}
    </div>
  )
}

function DiffRow({ d, n, choice, readOnly, locked, ownerNote, onDecide, onHover }: { d: Diff; n: number; choice?: Choice; readOnly: boolean; locked: boolean; ownerNote?: string; onDecide: (c: Choice) => void; onHover: (m: string | null) => void }) {
  return (
    <article className={`scm-drow sev-${d.sev} ${choice ? `is-${choice}` : ''}`} onMouseEnter={() => onHover(d.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(d.id)} onBlur={() => onHover(null)}>
      <header>
        <span className="scm-num">{n}</span>
        <h4>{d.field}{d.line && <span> · {d.line}</span>}</h4>
        <span className={`scm-sev sev-${d.sev}`}>{sevLabel[d.sev]}</span>
      </header>
      <div className="scm-drow-body">
        <div className="scm-compare">
          <div><span>Purchase order</span><strong>{d.po}</strong></div>
          <Icon name="arrow" size={16} className="scm-compare-arrow" />
          <div><span>Confirmation</span><strong>{d.oc}</strong></div>
          <em className={`sev-${d.sev}`}>{d.delta}</em>
        </div>
        <div className="scm-why">
          <Icon name="spark" size={15} />
          <p><strong>{d.why}</strong> {d.impact}</p>
          <span className="scm-conf" title="How sure the agent is that it read this correctly">{d.conf}%</span>
        </div>
      </div>
      <footer>
        {readOnly ? <span className="scm-muted">Routed to {ownerNote}</span> : (
          <>
            {!choice && <span className="scm-rec"><Face who="agent" size={18} />Suggests: <strong>{d.rec === 'accept' ? 'Accept' : 'Reject'}</strong></span>}
            {choice && <span className="scm-rec is-chosen">{choice === d.rec ? 'Matches the agent’s suggestion' : 'You overrode the suggestion'}</span>}
            <div className="scm-decide">
              {(['reject', 'accept'] as Choice[]).map(c => (
                <button key={c} disabled={locked} aria-pressed={choice === c} className={`scm-choice is-${c}`} onClick={() => onDecide(c)}>
                  <Icon name={c === 'accept' ? 'check' : 'x'} size={15} strokeWidth={2} />{c === 'accept' ? 'Accept' : 'Reject'}
                </button>
              ))}
            </div>
          </>
        )}
      </footer>
    </article>
  )
}

/* ================= Action bar ================= */

function ActionBar(p: {
  persona: PersonaId; validated: boolean; editing: boolean; buyerDone: boolean; grDone: boolean; needsReply: boolean; replied: boolean; revised: boolean; closed: boolean
  decided: number; total: number
  onEdit: () => void; onDraft: () => void; onValidate: () => void; onConfirmBuyer: () => void; onSubmitGr: () => void; onReply: () => void; onApprove: () => void
}) {
  const Done = ({ text }: { text: string }) => <p className="scm-ab-done"><Icon name="check" size={16} strokeWidth={2.2} />{text}</p>
  const Progress = () => <div className="scm-progress"><span>{p.decided} of {p.total} decided</span><span className="scm-bar"><i style={{ width: `${(p.decided / p.total) * 100}%` }} /></span></div>
  if (p.closed) return <Done text="Order confirmed with Helios Components." />
  if (p.persona === 'david') return p.validated ? <Done text="Validated. The differences are with Adrian and Rajan." /> : (
    <>
      <button className="scm-btn-ghost" onClick={p.onEdit}><Icon name={p.editing ? 'check' : 'doc'} size={16} />{p.editing ? 'Done editing' : 'Edit fields'}</button>
      <div className="flex-1" />
      <button className="scm-btn-ghost" onClick={p.onDraft}>Save draft</button>
      <button className="scm-btn" onClick={p.onValidate}>Confirm validation<Icon name="arrow" size={16} /></button>
    </>
  )
  if (p.persona === 'rajan') return !p.validated ? <p className="scm-ab-wait">Waiting for validation</p> : p.grDone ? <Done text="Submitted. Adrian replies to Helios." /> : (
    <><Progress /><button className="scm-btn" disabled={p.decided < p.total} onClick={p.onSubmitGr}>Submit decisions<Icon name="arrow" size={16} /></button></>
  )
  if (!p.validated) return <p className="scm-ab-wait">Waiting for validation</p>
  if (!p.buyerDone) return <><Progress /><button className="scm-btn" disabled={p.decided < p.total} onClick={p.onConfirmBuyer}>Confirm decisions<Icon name="arrow" size={16} /></button></>
  if (!p.grDone) return <p className="scm-ab-wait"><Icon name="clock" size={16} />Saved. Waiting for Rajan’s decisions.</p>
  if (p.needsReply && !p.replied) return <><p className="scm-ab-wait">Every decision is in.</p><button className="scm-btn" onClick={p.onReply}><Icon name="mail" size={16} />Reply to Helios</button></>
  if (p.needsReply && !p.revised) return <p className="scm-ab-wait"><Icon name="clock" size={16} />Sent. Waiting for the revised confirmation.</p>
  return <><p className="scm-ab-wait">{p.revised ? 'Version 2 matches every decision.' : 'Nothing left to resolve.'}</p><button className="scm-btn" onClick={p.onApprove}><Icon name="check" size={16} />Approve and confirm order</button></>
}

/* ================= Dialogs ================= */

function Dialog({ title, children, onClose }: { title: string; children: React.ReactNode; onClose: () => void }) {
  return (
    <motion.div className="scm-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="scm-dialog" role="dialog" aria-label={title} onClick={e => e.stopPropagation()} initial={{ opacity: 0, y: 10, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 6 }} transition={{ duration: 0.28, ease }}>
        <div className="scm-dialog-head"><h3>{title}</h3><button className="scm-icon-btn" aria-label="Close" onClick={onClose}><Icon name="x" size={18} /></button></div>
        {children}
      </motion.div>
    </motion.div>
  )
}

function ReplySheet({ lang, setLang, choices, onClose, onSend }: { lang: 'en' | 'de'; setLang: (l: 'en' | 'de') => void; choices: Record<string, Choice | undefined>; onClose: () => void; onSend: () => void }) {
  const mail = useMemo(() => {
    const items = diffs.filter(d => d.owner !== 'agent')
    const rej = items.filter(d => choices[d.id] === 'reject')
    const acc = items.filter(d => choices[d.id] === 'accept')
    const k = lang === 'de' ? 'de' : 'en'
    const lines = lang === 'de'
      ? ['Guten Tag,', '', `vielen Dank für die Auftragsbestätigung ${order.oc} zu unserer Bestellung ${order.po}. Bitte passen Sie Folgendes an:`, '']
      : ['Hello Helios team,', '', `Thank you for confirmation ${order.oc} against our purchase order ${order.po}. Before we can accept it, please revise:`, '']
    return [...lines, ...rej.map((d, i) => `${i + 1}. ${d.mail[k][0]}`), '', ...acc.map(d => d.mail[k][1]), '', lang === 'de' ? 'Mit freundlichen Grüßen' : 'Kind regards,', 'Adrian Smith'].join('\n')
  }, [choices, lang])
  return (
    <motion.div className="scm-scrim" onClick={onClose} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="scm-sheet" role="dialog" aria-label="Reply to Helios" onClick={e => e.stopPropagation()} initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ duration: 0.4, ease }}>
        <div className="scm-sheet-head">
          <div><h3>Reply to Helios Components</h3><p className="scm-muted">Drafted by the agent from your and Rajan’s decisions. Edit anything before sending.</p></div>
          <button className="scm-icon-btn" aria-label="Close" onClick={onClose}><Icon name="x" size={18} /></button>
        </div>
        <div className="scm-mail-row"><span>To</span><strong>{order.email}</strong></div>
        <div className="scm-mail-row"><span>Subject</span><strong>{lang === 'de' ? `Auftragsbestätigung ${order.oc}: Änderungen erforderlich` : `Confirmation ${order.oc}: changes needed`}</strong></div>
        <div className="scm-mail-lang">
          <Icon name="globe" size={16} /><span>Written in</span>
          <div className="scm-toggle" role="group" aria-label="Email language">
            <button aria-pressed={lang === 'de'} onClick={() => setLang('de')}>German, the supplier’s language</button>
            <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
          </div>
        </div>
        <textarea key={mail} className="scm-mail" defaultValue={mail} aria-label="Email body" />
        <div className="scm-attach"><Icon name="paperclip" size={16} />Differences_{order.oc}.pdf<span className="scm-muted">5 items</span></div>
        <div className="scm-sheet-foot"><button className="scm-btn-ghost" onClick={onClose}>Back</button><button className="scm-btn" onClick={onSend}><Icon name="send" size={16} />Send to Helios</button></div>
      </motion.div>
    </motion.div>
  )
}

/* ================= The supplier's PDF ================= */

function Doc({ hover, en, v2, compact, rej = new Set() }: { hover: string | null; en: boolean; v2: boolean; compact?: boolean; rej?: Set<string> }) {
  const fx = (id: string) => v2 && rej.has(id)
  const M = ({ id, n, children }: { id: string; n?: number; children: React.ReactNode }) => (
    <mark className={`scm-hl ${hover === id ? 'is-on' : ''}`}>{children}{n ? <sup>{n}</sup> : null}</mark>
  )
  const t = (de: string, e: string) => (en ? e : de)
  return (
    <article className={`scm-paper ${compact ? 'is-compact' : ''}`}>
      <div className="scm-paper-head">
        <div><div className="scm-paper-logo">HELIOS<span>components</span></div><p>Industriestraße 14 · 70565 Stuttgart</p></div>
        <div className="scm-paper-ref">
          <h5>{t('Auftragsbestätigung', 'Order confirmation')}</h5>
          <p>{t('Nr.', 'No.')} 1505899{v2 ? ` · ${t('Version', 'Version')} 2` : ''}</p>
          <p>{t('Datum', 'Date')} {v2 ? '19.10.2026' : '17.10.2026'}</p>
        </div>
      </div>
      <p className="scm-paper-to">Meridian Retail Group · Procurement<br />Am Hafen 2, 20457 Hamburg</p>
      <p className="scm-paper-p">{t('Ihre Bestellung', 'Your order')} 4994546957 {t('vom', 'of')} 09.10.2026</p>
      <table className="scm-paper-t">
        <thead><tr><th>{t('Pos.', 'Line')}</th><th>{t('Bezeichnung', 'Description')}</th><th>{t('Menge', 'Qty')}</th><th>{t('Preis', 'Price')}</th></tr></thead>
        <tbody>
          <tr><td>1001</td><td><M id="desc">{t('Steuerungsmodul Rev. B', 'Control module Rev. B')}</M><br /><span>SKU-8821-B</span></td><td>2.500</td><td>{fx('total') ? '15,83 €' : '25,04 €'}</td></tr>
          <tr><td>1002</td><td>{t('Sensorgehäuse', 'Sensor housing')}<br /><span>SKU-4410-A · {t('Liefertermin', 'Delivery')} <M id="delivery">{fx('delivery') ? '06.11.2026' : t('KW 46', 'week 46')}</M></span></td><td><M id="qty">{fx('qty') ? '2.500' : '2.000'}</M></td><td>51,10 €</td></tr>
          {!fx('pack') && <tr><td></td><td><M id="pack">{t('Verpackungspauschale', 'Packaging fee')}</M></td><td></td><td>65,00 €</td></tr>}
        </tbody>
      </table>
      <div className="scm-paper-sum"><span>{t('Gesamtbetrag (netto)', 'Total (net)')}</span><M id="total">{fx('total') ? (fx('pack') ? '142.800,00 €' : '142.865,00 €') : '164.865,00 €'}</M></div>
      <p className="scm-paper-p">{t('Zahlungsbedingungen', 'Payment terms')}: <M id="terms">{fx('terms') ? t('30 Tage netto', '30 days net') : t('45 Tage netto', '45 days net')}</M></p>
      <p className="scm-paper-p">{t('Lieferung frei Haus', 'Delivered free')}</p>
      <p className="scm-paper-p">{t('Mit freundlichen Grüßen', 'Kind regards')}<br />Helios Components AG</p>
      <div className="scm-paper-lines" aria-hidden="true"><i /><i /><i /></div>
    </article>
  )
}
