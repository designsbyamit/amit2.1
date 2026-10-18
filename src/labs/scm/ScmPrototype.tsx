import '@fontsource-variable/instrument-sans'
import './scm.css'
import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Icon from '../Icon'
import { asks, diffs, handled, order, people, queue, type Choice, type Diff, type Sev } from './data'

const sevLabel: Record<Sev, string> = { high: 'High', med: 'Medium', low: 'Low' }
const ease = [0.16, 1, 0.3, 1] as const

function Face({ who, size = 28 }: { who: 'david' | 'adrian' | 'rajan' | 'agent'; size?: number }) {
  if (who === 'agent') return <span className="scm-agent-face" style={{ width: size, height: size }}><Icon name="spark" size={size * 0.58} strokeWidth={1.5} /></span>
  const p = people[who]
  return <img className="scm-face" src={p.img} alt="" width={size} height={size} style={{ width: size, height: size }} />
}

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

type Log = { who: 'agent' | 'david' | 'adrian' | 'rajan'; text: string; at: string }

export default function ScmPrototype() {
  const [tab, setTab] = useState<'needs' | 'handled'>('needs')
  const [panel, setPanel] = useState<'decisions' | 'activity'>('decisions')
  const [lang, setLang] = useState<'en' | 'de'>('en')
  const [hover, setHover] = useState<string | null>(null)
  const [choices, setChoices] = useState<Record<string, Choice | undefined>>({})
  const [undone, setUndone] = useState<Record<string, boolean>>({})
  const [sheet, setSheet] = useState(false)
  const [sent, setSent] = useState(false)
  const [ask, setAsk] = useState(false)
  const [answer, setAnswer] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)
  const [log, setLog] = useState<Log[]>([
    { who: 'agent', text: 'Picked up the confirmation from orders@ and matched it to PO 4994546957.', at: '07:42' },
    { who: 'agent', text: 'Read the PDF in German. Average confidence 96%.', at: '07:43' },
    { who: 'agent', text: 'Resolved the line 1001 description inside policy: same part, German wording.', at: '07:43' },
    { who: 'david', text: 'Corrected the delivery date on line 1004 and confirmed the validation.', at: '08:10' },
    { who: 'agent', text: 'Found 5 differences. Sent 3 to Adrian, 1 to Rajan.', at: '08:10' },
    { who: 'rajan', text: 'Accepted the quantity on line 1002. “Stock covers it.”', at: '08:56' },
  ])
  const now = () => new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })
  const addLog = (l: Omit<Log, 'at'>) => setLog(v => [...v, { ...l, at: now() }])
  const mine = diffs.filter(d => d.owner === 'buyer')
  const decided = mine.filter(d => choices[d.id]).length
  const allDone = decided === mine.length
  const anyReject = mine.some(d => choices[d.id] === 'reject')
  const step = sent ? (anyReject ? 5 : 6) : allDone ? 4 : 3

  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(null), 3600); return () => clearTimeout(t) }, [toast])
  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); setAsk(a => !a) }
      if (e.key === 'Escape') { setAsk(false); setSheet(false) }
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [])

  const decide = (d: Diff, c: Choice) => {
    setChoices(v => ({ ...v, [d.id]: v[d.id] === c ? undefined : c }))
    if (choices[d.id] !== c) addLog({ who: 'adrian', text: `${c === 'accept' ? 'Accepted' : 'Rejected'} ${d.field.toLowerCase()} (${d.oc}).` })
  }

  const mail = useMemo(() => {
    const items = diffs.filter(d => d.owner !== 'agent')
    const choiceOf = (d: Diff): Choice | undefined => d.done ? d.done.choice : choices[d.id]
    const rej = items.filter(d => choiceOf(d) === 'reject')
    const acc = items.filter(d => choiceOf(d) === 'accept')
    if (lang === 'de') return [
      'Guten Tag,', '',
      `vielen Dank für die Auftragsbestätigung ${order.oc} zu unserer Bestellung ${order.po}. Bitte passen Sie Folgendes an:`, '',
      ...rej.map((d, i) => `${i + 1}. ${d.mail.de[0]}`), '',
      ...acc.map(d => d.mail.de[1]), '',
      'Mit freundlichen Grüßen', 'Adrian Smith',
    ].join('\n')
    return [
      'Hello Helios team,', '',
      `Thank you for confirmation ${order.oc} against our purchase order ${order.po}. Before we can accept it, please revise:`, '',
      ...rej.map((d, i) => `${i + 1}. ${d.mail.en[0]}`), '',
      ...acc.map(d => d.mail.en[1]), '',
      'Kind regards,', 'Adrian Smith',
    ].join('\n')
  }, [choices, lang])

  const send = () => {
    setSheet(false); setSent(true)
    addLog({ who: 'agent', text: `Sent your reply to Helios in ${lang === 'de' ? 'German' : 'English'}, with the list of differences attached.` })
    setToast('Sent to Helios Components. I’ll watch for the revised confirmation.')
  }
  const close = () => {
    setSent(true)
    addLog({ who: 'agent', text: 'Every difference was accepted. Approved and closed the confirmation.' })
    setToast('Approved and closed. Nothing left to resolve.')
  }

  const pipeline: { label: string; sub: string; who?: 'agent' | 'david' | 'adrian' | 'rajan' | 'mail'; gate?: boolean }[] = [
    { label: 'Received', sub: '07:42 by email', who: 'mail' },
    { label: 'Read', sub: '96% confidence', who: 'agent' },
    { label: 'Validated', sub: 'David, 08:10', who: 'david', gate: true },
    { label: 'Decide', sub: sent || allDone ? 'All decided' : `${decided + 1} of 4 decided`, who: 'adrian', gate: true },
    { label: anyReject || !allDone ? 'Reply' : 'Approve', sub: sent ? (anyReject ? 'Sent' : 'Closed') : 'Waiting on you', gate: true },
    { label: 'Close', sub: sent && !anyReject ? 'Closed' : 'When revised' },
  ]

  return (
    <div className="scm" data-lenis-prevent>
      {/* Suite rail */}
      <nav className="scm-rail" aria-label="Suite">
        <div className="scm-logo" aria-label="Keel Supply"><svg viewBox="0 0 24 24" width="22" height="22"><path d="M3 6h18L12 21 3 6Z" fill="currentColor" opacity=".9" /><path d="M7.5 6 12 13.5 16.5 6" fill="none" stroke="#fff" strokeWidth="1.6" /></svg></div>
        {[['home', 'Home'], ['cart', 'Sourcing'], ['doc', 'Confirmations'], ['box', 'Inventory'], ['truck', 'Logistics'], ['users', 'Suppliers']].map(([i, l]) => (
          <button key={l} className={`scm-rail-btn ${l === 'Confirmations' ? 'is-on' : ''}`} aria-label={l} aria-current={l === 'Confirmations' ? 'page' : undefined}>
            <Icon name={i} size={20} /><span className="scm-tip">{l}</span>
          </button>
        ))}
        <div className="flex-1" />
        <Link to="/craft/sap-agentic" className="scm-rail-btn" aria-label="Back to the case study"><Icon name="back" size={20} /><span className="scm-tip">Back to the case study</span></Link>
      </nav>

      {/* Queue */}
      <aside className="scm-queue" aria-label="Confirmations queue">
        <div className="scm-queue-head">
          <h1>Confirmations</h1>
          <p className="scm-muted">Wednesday, 18 October</p>
        </div>
        <div className="scm-brief">
          <Face who="agent" size={26} />
          <p>Overnight, 14 confirmations came in. I closed 11 inside your policy. <strong>3 need a person.</strong></p>
        </div>
        <div className="scm-seg" role="tablist">
          <button role="tab" aria-selected={tab === 'needs'} onClick={() => setTab('needs')}>Needs you <span>3</span></button>
          <button role="tab" aria-selected={tab === 'handled'} onClick={() => setTab('handled')}>By the agent <span>11</span></button>
        </div>
        {tab === 'needs' ? (
          <ul className="scm-list">
            {queue.map(q => (
              <li key={q.id}>
                <button className={`scm-qi ${q.open ? 'is-on' : ''}`} onClick={() => !q.open && setToast('This prototype walks through the Helios order. Open it to try a full review.')}>
                  <span className={`scm-dot sev-${q.sev}`} aria-hidden="true" />
                  <span className="scm-qi-main">
                    <span className="scm-qi-top"><strong>{q.supplier}</strong><span className="scm-muted">{q.at}</span></span>
                    <span className="scm-qi-sub">PO {q.po}</span>
                    <span className="scm-qi-foot"><span>{q.value}</span><span className="scm-pill">{q.diffs} {q.diffs === 1 ? 'difference' : 'differences'}</span></span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <ul className="scm-list scm-handled">
            {handled.map(([s, po, why, at]) => (
              <li key={po} className="scm-hi">
                <div><strong>{s}</strong><span className="scm-muted">PO {po}</span></div>
                <div className="scm-hi-r"><span className="scm-pill is-agent">{why}</span><span className="scm-muted">{at}</span></div>
              </li>
            ))}
            <li className="scm-handled-note"><Icon name="shield" size={16} /> Closed inside your policy: exact matches and price differences under 2%. Every one can be reopened.</li>
          </ul>
        )}
      </aside>

      {/* Main */}
      <main className="scm-main">
        <header className="scm-top">
          <button className="scm-search" onClick={() => setAsk(true)}>
            <Icon name="search" size={17} /><span>Search orders, suppliers and parts, or ask the agent</span><kbd>⌘K</kbd>
          </button>
          <div className="scm-top-r">
            <span className="scm-autonomy" title="Autonomy level"><span className="scm-autonomy-dot" />Guided autonomy</span>
            <button className="scm-icon-btn" aria-label="Notifications"><Icon name="bell" size={19} /><i /></button>
            <Face who="adrian" size={32} />
          </div>
        </header>

        <section className="scm-order">
          <div className="scm-order-head">
            <div className="scm-sup-mark" aria-hidden="true">HC</div>
            <div className="min-w-0">
              <h2>{order.supplier}</h2>
              <dl className="scm-meta">
                <div><dt>Confirmation</dt><dd>{order.oc}</dd></div>
                <div><dt>Purchase order</dt><dd>{order.po}</dd></div>
                <div><dt>Value</dt><dd>{order.value}</dd></div>
                <div><dt>Received</dt><dd>{order.received}</dd></div>
              </dl>
            </div>
            <div className="scm-order-r">
              <span className="scm-risk"><span className="scm-dot sev-high" />High risk</span>
              <button className="scm-btn-ghost" onClick={() => setAsk(true)}><Icon name="spark" size={16} />Ask about this order</button>
            </div>
          </div>

          <ol className="scm-pipe" aria-label="Progress">
            {pipeline.map((p, i) => {
              const state = i < step ? 'done' : i === step ? 'now' : 'next'
              return (
                <li key={p.label} className={`is-${state} ${p.gate ? 'is-gate' : ''}`}>
                  <span className="scm-pipe-node">
                    {state === 'done' ? <Icon name="check" size={13} strokeWidth={2.2} /> : p.gate ? <span className="scm-gate" /> : <span className="scm-pipe-dot" />}
                  </span>
                  <span className="scm-pipe-t">{p.label}</span>
                  <span className="scm-pipe-s">{p.sub}</span>
                </li>
              )
            })}
          </ol>
        </section>

        <div className="scm-body">
          {/* Source document */}
          <section className="scm-docwrap" aria-label="Supplier document">
            <div className="scm-doc-bar">
              <span className="scm-doc-file"><Icon name="doc" size={16} />Auftragsbestaetigung_1505899.pdf</span>
              <div className="scm-toggle" role="group" aria-label="Document language">
                <button aria-pressed={lang === 'de'} onClick={() => setLang('de')}>Original</button>
                <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
              </div>
            </div>
            <Doc hover={hover} en={lang === 'en'} />
          </section>

          {/* Decisions */}
          <section className="scm-side" aria-label="Decisions">
            <div className="scm-tabs" role="tablist">
              <button role="tab" aria-selected={panel === 'decisions'} onClick={() => setPanel('decisions')}>Decisions <span>{mine.length - decided}</span></button>
              <button role="tab" aria-selected={panel === 'activity'} onClick={() => setPanel('activity')}>Activity</button>
            </div>

            {panel === 'decisions' ? (
              <div className="scm-cards">
                {diffs.map((d, i) => (
                  <DiffCard key={d.id} d={d} n={i + 1} choice={choices[d.id]} undone={!!undone[d.id]} locked={sent}
                    onHover={setHover} onDecide={c => decide(d, c)}
                    onUndo={() => { setUndone(v => ({ ...v, [d.id]: true })); addLog({ who: 'adrian', text: 'Reopened the line 1001 description for review.' }); setToast('Reopened. The agent will ask before resolving similar cases again.') }} />
                ))}
              </div>
            ) : (
              <ol className="scm-log">
                {log.map((l, i) => (
                  <li key={i}><Face who={l.who} size={26} /><div><p><strong>{l.who === 'agent' ? 'Agent' : people[l.who].name}</strong> <span className="scm-muted">{l.at}</span></p><p>{l.text}</p></div></li>
                ))}
              </ol>
            )}

            <div className="scm-foot">
              <div className="scm-progress">
                <span>{sent ? (anyReject ? 'Reply sent. Waiting for a revised confirmation.' : 'Closed.') : `${decided} of ${mine.length} decisions made`}</span>
                <span className="scm-bar"><i style={{ width: `${(decided / mine.length) * 100}%` }} /></span>
              </div>
              {!sent && (anyReject || !allDone
                ? <button className="scm-btn" disabled={!allDone} onClick={() => setSheet(true)}>Reply to supplier<Icon name="arrow" size={16} /></button>
                : <button className="scm-btn" onClick={close}>Approve and close<Icon name="check" size={16} /></button>)}
            </div>
          </section>

          {/* Reply sheet */}
          <AnimatePresence>
            {sheet && (
              <motion.div className="scm-sheet" role="dialog" aria-label="Reply to supplier" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 40 }} transition={{ duration: 0.45, ease }}>
                <div className="scm-sheet-head">
                  <div><h3>Reply to Helios Components</h3><p className="scm-muted">Drafted by the agent from your decisions. Edit anything before sending.</p></div>
                  <button className="scm-icon-btn" aria-label="Close" onClick={() => setSheet(false)}><Icon name="x" size={18} /></button>
                </div>
                <div className="scm-mail-row"><span>To</span><strong>auftrag@helios-components.de</strong></div>
                <div className="scm-mail-row"><span>Subject</span><strong>{lang === 'de' ? `Auftragsbestätigung ${order.oc}: Änderungen erforderlich` : `Confirmation ${order.oc}: changes needed`}</strong></div>
                <div className="scm-mail-lang">
                  <Icon name="globe" size={16} />
                  <span>Written in</span>
                  <div className="scm-toggle" role="group" aria-label="Email language">
                    <button aria-pressed={lang === 'de'} onClick={() => setLang('de')}>German, the supplier’s language</button>
                    <button aria-pressed={lang === 'en'} onClick={() => setLang('en')}>English</button>
                  </div>
                </div>
                <textarea key={lang + mail} className="scm-mail" defaultValue={mail} aria-label="Email body" />
                <div className="scm-attach"><Icon name="paperclip" size={16} />Differences_{order.oc}.pdf<span className="scm-muted">4 items</span></div>
                <div className="scm-sheet-foot">
                  <button className="scm-btn-ghost" onClick={() => setSheet(false)}>Back to decisions</button>
                  <button className="scm-btn" onClick={send}><Icon name="send" size={16} />Send to Helios</button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>

      {/* Ask the agent */}
      <AnimatePresence>
        {ask && (
          <motion.div className="scm-scrim" onClick={() => setAsk(false)} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className="scm-ask" role="dialog" aria-label="Ask the agent" onClick={e => e.stopPropagation()} initial={{ opacity: 0, y: -12, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3, ease }}>
              <div className="scm-ask-input"><Icon name="spark" size={18} /><span>Ask about confirmation {order.oc}</span><kbd>esc</kbd></div>
              <ul>
                {asks.map((a, i) => (
                  <li key={a.q}>
                    <button className={answer === i ? 'is-on' : ''} onClick={() => setAnswer(i)}>{a.q}<Icon name="chevron" size={16} /></button>
                  </li>
                ))}
              </ul>
              {answer !== null && (
                <div className="scm-answer" aria-live="polite">
                  <Face who="agent" size={26} />
                  <p><Typed text={asks[answer].a} /></p>
                </div>
              )}
              <p className="scm-ask-foot"><Icon name="lock" size={14} />Answers use this order, its history and your procurement policy.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div className="scm-toast" role="status" initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }} transition={{ duration: 0.35, ease }}>
            <Face who="agent" size={22} />{toast}
          </motion.div>
        )}
      </AnimatePresence>
      <p className="scm-badge">Concept prototype · illustrative data</p>
    </div>
  )
}

function DiffCard({ d, n, choice, undone, locked, onHover, onDecide, onUndo }: {
  d: Diff; n: number; choice?: Choice; undone: boolean; locked: boolean
  onHover: (id: string | null) => void; onDecide: (c: Choice) => void; onUndo: () => void
}) {
  const ref = useRef<HTMLElement>(null)
  const done = d.done && !undone ? d.done : null
  const mineOpen = d.owner === 'buyer' || (d.owner === 'agent' && undone)
  return (
    <article ref={ref} className={`scm-card sev-${d.sev} ${done ? 'is-settled' : ''} ${choice ? 'is-decided' : ''}`}
      onMouseEnter={() => onHover(d.id)} onMouseLeave={() => onHover(null)} onFocus={() => onHover(d.id)} onBlur={() => onHover(null)}>
      <header>
        <span className="scm-num">{n}</span>
        <h4>{d.field}</h4>
        <span className={`scm-sev sev-${d.sev}`}>{sevLabel[d.sev]}</span>
      </header>
      <div className="scm-compare">
        <div><span>Purchase order</span><strong>{d.po}</strong></div>
        <Icon name="arrow" size={16} className="scm-compare-arrow" />
        <div><span>Confirmation</span><strong>{d.oc}</strong></div>
        <em className={`sev-${d.sev}`}>{d.delta}</em>
      </div>
      <div className="scm-why">
        <Icon name="spark" size={15} />
        <p>{d.why}</p>
        <span className="scm-conf" title="How sure the agent is that it read this correctly">{d.conf}%</span>
      </div>
      {done ? (
        <footer className="scm-settled">
          <Face who={done.by} size={22} />
          <p><strong>{done.by === 'agent' ? 'Resolved by the agent' : `${people[done.by].name} accepted`}</strong> {done.note}</p>
          {done.by === 'agent' && !locked && <button className="scm-link" onClick={onUndo}><Icon name="undo" size={14} />Reopen</button>}
        </footer>
      ) : mineOpen ? (
        <footer className="scm-decide">
          {(['reject', 'accept'] as Choice[]).map(c => (
            <button key={c} disabled={locked} aria-pressed={choice === c} className={`scm-choice is-${c}`} onClick={() => onDecide(c)}>
              <Icon name={c === 'accept' ? 'check' : 'x'} size={15} strokeWidth={2} />
              {c === 'accept' ? 'Accept' : 'Reject'}
              {d.rec === c && !choice && <span className="scm-sugg">Suggested</span>}
            </button>
          ))}
        </footer>
      ) : null}
    </article>
  )
}

/** The supplier's PDF, rebuilt as a page. Fields the agent read are marked and light up with their decision card. */
function Doc({ hover, en }: { hover: string | null; en: boolean }) {
  const M = ({ id, n, children }: { id: string; n: number; children: React.ReactNode }) => (
    <mark className={`scm-hl ${hover === id ? 'is-on' : ''}`}>{children}<sup>{n}</sup></mark>
  )
  const t = (de: string, e: string) => (en ? e : de)
  return (
    <div className="scm-paper-scroll">
      <article className="scm-paper">
        <div className="scm-paper-head">
          <div>
            <div className="scm-paper-logo">HELIOS<span>components</span></div>
            <p>Helios Components AG · Industriestraße 14 · 70565 Stuttgart</p>
          </div>
          <div className="scm-paper-ref">
            <h5>{t('Auftragsbestätigung', 'Order confirmation')}</h5>
            <p>{t('Nr.', 'No.')} 1505899</p>
            <p>{t('Datum', 'Date')} 17.10.2026</p>
          </div>
        </div>
        <p className="scm-paper-to">Meridian Retail Group<br />Procurement<br />Am Hafen 2, 20457 Hamburg</p>
        <p className="scm-paper-p">{t('Ihre Bestellung', 'Your order')} 4994546957 {t('vom', 'of')} 09.10.2026</p>
        <p className="scm-paper-p">{t('Sehr geehrte Damen und Herren, wir bestätigen Ihre Bestellung wie folgt:', 'Dear Sir or Madam, we confirm your order as follows:')}</p>
        <table className="scm-paper-t">
          <thead><tr><th>{t('Pos.', 'Line')}</th><th>{t('Bezeichnung', 'Description')}</th><th>{t('Menge', 'Qty')}</th><th>{t('Preis', 'Price')}</th><th>{t('Betrag', 'Amount')}</th></tr></thead>
          <tbody>
            <tr><td>1001</td><td><M id="desc" n={5}>{t('Steuerungsmodul Rev. B', 'Control module Rev. B')}</M><br /><span>SKU-8821-B</span></td><td>2.500 {t('Stk', 'pcs')}</td><td>25,04 €</td><td>62.600,00 €</td></tr>
            <tr><td>1002</td><td>{t('Sensorgehäuse', 'Sensor housing')}<br /><span>SKU-4410-A</span></td><td><M id="qty" n={4}>2.000 {t('Stk', 'pcs')}</M></td><td>51,10 €</td><td>102.200,00 €</td></tr>
            <tr><td></td><td><M id="pack" n={3}>{t('Verpackungspauschale', 'Packaging fee')}</M></td><td></td><td></td><td>65,00 €</td></tr>
          </tbody>
        </table>
        <div className="scm-paper-sum">
          <span>{t('Gesamtbetrag (netto)', 'Total (net)')}</span><M id="total" n={1}>164.865,00 €</M>
        </div>
        <p className="scm-paper-p">{t('Zahlungsbedingungen', 'Payment terms')}: <M id="terms" n={2}>{t('45 Tage netto', '45 days net')}</M></p>
        <p className="scm-paper-p">{t('Liefertermin', 'Delivery')}: KW 46 · {t('Lieferung frei Haus', 'Delivered free')}</p>
        <p className="scm-paper-p">{t('Mit freundlichen Grüßen', 'Kind regards')}<br />Helios Components AG, {t('Vertrieb', 'Sales')}</p>
        <div className="scm-paper-lines" aria-hidden="true"><i /><i /><i /></div>
      </article>
    </div>
  )
}
