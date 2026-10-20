import '@fontsource-variable/instrument-sans'
import './search.css'
import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { AnimatePresence, animate, motion, useMotionValue, useReducedMotion, useTransform } from 'framer-motion'
import Icon from '../Icon'
import { ariba, appHomes, apps, booking, goalDraft, home, recent, results, suggest, suggested, type AppId, type Result, type Row, type RouteKey, type Sug, type Tone } from './data'

const ease = [0.16, 1, 0.3, 1] as const

type View =
  | { k: 'home' }
  | { k: 'appHome'; key: 'travel' | 'buy' | 'goals' }
  | { k: 'results'; key: RouteKey; q: string }
  | { k: 'booking' } | { k: 'ariba' } | { k: 'goaldraft' }

const appOf = (v: View): AppId | null =>
  v.k === 'appHome' ? appHomes[v.key].app : v.k === 'results' ? results[v.key].app : v.k === 'booking' ? 'concur' : v.k === 'ariba' ? 'ariba' : v.k === 'goaldraft' ? 'sf' : null

/* ---------- small pieces ---------- */

function Money({ value }: { value: number }) {
  const reduced = useReducedMotion()
  const mv = useMotionValue(value)
  const txt = useTransform(mv, v => '$' + v.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }))
  useEffect(() => { if (reduced) { mv.set(value); return } const c = animate(mv, value, { duration: 0.5, ease }); return () => c.stop() }, [value, reduced, mv])
  return <motion.span>{txt}</motion.span>
}

function Hl({ text, q }: { text: string; q: string }) {
  const toks = q.trim().split(/\s+/).filter(t => t.length > 0).map(t => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
  if (!toks.length) return <>{text}</>
  const parts = text.split(new RegExp(`(${toks.join('|')})`, 'ig'))
  return <>{parts.map((p, i) => (i % 2 ? <mark key={i}>{p}</mark> : <span key={i}>{p}</span>))}</>
}

function AppDot({ app, size = 22 }: { app: AppId; size?: number }) {
  const a = apps[app]
  return <span className="ais-appdot" style={{ width: size, height: size, fontSize: size * 0.4, ['--h' as string]: a.hue }}>{a.short}</span>
}

function Tilt({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: () => void }) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLButtonElement>(null)
  const move = (e: React.MouseEvent) => {
    const el = ref.current; if (!el) return
    const r = el.getBoundingClientRect(); const x = (e.clientX - r.left) / r.width; const y = (e.clientY - r.top) / r.height
    el.style.setProperty('--mx', `${x * 100}%`); el.style.setProperty('--my', `${y * 100}%`)
    if (!reduced) el.style.transform = `perspective(800px) rotateX(${(0.5 - y) * 5}deg) rotateY(${(x - 0.5) * 6}deg) translateY(-2px)`
  }
  const leave = () => { if (ref.current) ref.current.style.transform = '' }
  return <button ref={ref} type="button" className={className} onMouseMove={move} onMouseLeave={leave} onClick={onClick}>{children}</button>
}

/* ---------- the AI search field (one component, used in the hero and in the shell bar) ---------- */

const tries = ['Pending POs', 'Flight to Bangalore', 'laptop', 'Draft goals for product design team', 'SOW status for CyberSecure Ltd']

function SearchBox({ variant, q, setQ, onPick, onSubmit, inputRef, bumpKey }: {
  variant: 'hero' | 'bar'; q: string; setQ: (v: string) => void; onPick: (s: Sug) => void; onSubmit: (text: string) => void
  inputRef: React.RefObject<HTMLInputElement | null>; bumpKey: number
}) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const [focus, setFocus] = useState(false)
  const [active, setActive] = useState(-1)
  const [ph, setPh] = useState(0)
  const [listening, setListening] = useState(false)
  const sugg = useMemo(() => suggest(q), [q])
  const groups = sugg ? [{ title: 'Suggestions', items: sugg }] : [{ title: 'Recent searches', items: recent }, { title: 'Suggested for you', items: suggested }]
  const flat = groups.flatMap(g => g.items)
  useEffect(() => { setActive(-1) }, [q])
  useEffect(() => { setOpen(false); setActive(-1) }, [bumpKey])
  useEffect(() => {
    if (q || focus || variant !== 'hero' || reduced) return
    const t = setInterval(() => setPh(i => (i + 1) % tries.length), 2600)
    return () => clearInterval(t)
  }, [q, focus, variant, reduced])

  const listen = () => {
    if (listening) return
    setListening(true); inputRef.current?.focus()
    const text = 'Flight to Bangalore'
    let i = 0
    const id = setInterval(() => { i++; setQ(text.slice(0, i)); if (i >= text.length) { clearInterval(id); setTimeout(() => { setListening(false); setOpen(true) }, 400) } }, reduced ? 1 : 55)
  }

  const submit = () => {
    const t = q.trim(); if (!t) return
    const exact = flat.find(s => s.text === t)
    if (exact) return onPick(exact)
    onSubmit(t)
  }
  const key = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setOpen(true); setActive(a => (a + 1) % flat.length) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setOpen(true); setActive(a => (a <= 0 ? flat.length - 1 : a - 1)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (open && active >= 0) onPick(flat[active]); else submit() }
    else if (e.key === 'Escape') { setOpen(false); inputRef.current?.blur() }
  }

  let idx = -1
  return (
    <div className={`ais-sb ais-sb-${variant} ${focus ? 'is-focus' : ''} ${listening ? 'is-listening' : ''} ${q ? 'is-typing' : ''}`} role="search">
      <div className="ais-sb-ring" aria-hidden="true" />
      <div className="ais-sb-field">
        <span className="ais-sb-ai" aria-hidden="true"><i className="ais-sb-halo" /><span key={q.length} className="ais-sb-spark"><Icon name="spark" size={variant === 'hero' ? 20 : 17} strokeWidth={q ? 1.9 : 1.5} /></span></span>
        <input ref={inputRef} value={q} onChange={e => { setQ(e.target.value); setOpen(true) }} onFocus={() => { setFocus(true); setOpen(true) }} onBlur={() => { setFocus(false); setTimeout(() => setOpen(false), 120) }} onKeyDown={key}
          placeholder={variant === 'bar' ? 'Search across all applications…' : ''} aria-label="AI search across all applications" aria-expanded={open} aria-autocomplete="list" role="combobox" spellCheck={false} autoComplete="off" />
        {variant === 'hero' && !q && (
          <span className="ais-sb-ph" aria-hidden="true">
            <span>Search across all applications — try </span>
            <AnimatePresence mode="wait" initial={false}>
              <motion.em key={ph} initial={{ opacity: 0, y: reduced ? 0 : 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.28 }}>“{tries[ph]}”</motion.em>
            </AnimatePresence>
          </span>
        )}
        <AnimatePresence>
          {q && <motion.button key="clr" type="button" className="ais-sb-btn" aria-label="Clear" initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }} onMouseDown={e => e.preventDefault()} onClick={() => { setQ(''); inputRef.current?.focus() }}><Icon name="x" size={15} /></motion.button>}
        </AnimatePresence>
        <button type="button" className={`ais-sb-btn ais-mic ${listening ? 'on' : ''}`} aria-label="Voice search" onMouseDown={e => e.preventDefault()} onClick={listen}>
          <Icon name="mic" size={17} />
          {listening && <span className="ais-mic-bars" aria-hidden="true"><i /><i /><i /><i /></span>}
        </button>
        <kbd className="ais-sb-kbd" aria-hidden="true">⌘K</kbd>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div className="ais-dd" role="listbox" initial={{ opacity: 0, y: -8, scale: 0.985 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6, scale: 0.99 }} transition={{ duration: 0.22, ease }}>
            {groups.map(g => (
              <div key={g.title} className="ais-dd-g">
                <p className="ais-dd-h">{g.title}</p>
                {g.items.map(s => {
                  idx++; const me = idx
                  return (
                    <button key={g.title + s.text} type="button" role="option" aria-selected={active === me} className={`ais-dd-i ${active === me ? 'on' : ''}`} onMouseEnter={() => setActive(me)} onMouseDown={e => { e.preventDefault(); onPick(s) }}>
                      {active === me && <motion.span layoutId={`dd-pill-${variant}`} className="ais-dd-pill" transition={{ type: 'spring', stiffness: 520, damping: 40 }} />}
                      <Icon name={g.title === 'Recent searches' ? 'clock' : g.title === 'Suggested for you' ? 'spark' : 'search'} size={16} />
                      <span className="ais-dd-t"><Hl text={s.text} q={sugg ? q : ''} /></span>
                      <span className="ais-dd-app"><AppDot app={s.app} size={16} />{apps[s.app].name}</span>
                    </button>
                  )
                })}
              </div>
            ))}
            <div className="ais-dd-f"><span><kbd>↑</kbd><kbd>↓</kbd> navigate</span><span><kbd>↵</kbd> open</span><span><kbd>esc</kbd> close</span><span className="ais-dd-ai"><Icon name="spark" size={13} /> Plain language works</span></div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

/* ---------- results ---------- */

const toneIcon: Record<Tone, string> = { pos: 'check', neg: 'alert', warn: 'clock', info: 'doc' }

function Tag({ tone, children, icon }: { tone: Tone; children: React.ReactNode; icon?: string }) {
  return <span className={`ais-tag t-${tone}`}><Icon name={icon ?? toneIcon[tone]} size={12} strokeWidth={1.8} />{children}</span>
}

function Overview({ res, q, onFeedback }: { res: Result; q: string; onFeedback: (up: boolean) => void }) {
  const reduced = useReducedMotion()
  const a = apps[res.app]
  const steps = [`Searching ${a.name}`, `Ranking ${res.total} results`, 'Writing the summary']
  const [stage, setStage] = useState(reduced ? 4 : 0)
  const words = useMemo(() => res.summary.split(' '), [res.summary])
  const [n, setN] = useState(reduced ? words.length : 0)
  const [more, setMore] = useState(false)
  const [how, setHow] = useState(false)
  const [vote, setVote] = useState<null | boolean>(null)
  useEffect(() => {
    if (reduced) return
    const ts = [380, 760, 1140, 1500].map((ms, i) => setTimeout(() => setStage(i + 1), ms))
    return () => ts.forEach(clearTimeout)
  }, [reduced])
  useEffect(() => {
    if (stage < 3 || n >= words.length) return
    const t = setTimeout(() => setN(v => Math.min(words.length, v + 2)), 26)
    return () => clearTimeout(t)
  }, [stage, n, words.length])
  const done = n >= words.length

  return (
    <section className="ais-ov" aria-label="AI overview">
      <div className="ais-ov-glow" aria-hidden="true" />
      <header className="ais-ov-h">
        <span className="ais-ov-badge"><Icon name="spark" size={14} strokeWidth={1.6} /> AI overview</span>
        <h2>{res.summaryTitle}</h2>
        <span className="ais-ov-q">for “{q}”</span>
      </header>
      <ol className={`ais-steps ${stage >= 4 ? 'done' : ''}`} aria-label="How the answer was prepared">
        {steps.map((t, i) => (
          <li key={t} className={stage > i ? 'on' : ''}>
            <span className="ais-step-dot">{stage > i + 1 ? <Icon name="check" size={11} strokeWidth={2.4} /> : <i />}</span>{t}
          </li>
        ))}
      </ol>
      {stage >= 3 && (
        <p className="ais-ov-text">
          {words.slice(0, n).join(' ')}{!done && <span className="ais-caret" aria-hidden="true" />}
          <AnimatePresence initial={false}>
            {done && more && <motion.span key="more" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5 }}> {res.more}</motion.span>}
          </AnimatePresence>
          {done && !more && <button type="button" className="ais-link" onClick={() => setMore(true)}> Show more</button>}
          {done && more && <button type="button" className="ais-link" onClick={() => setMore(false)}> Show less</button>}
        </p>
      )}
      <AnimatePresence>
        {done && (
          <motion.footer className="ais-ov-f" initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
            <div className="ais-src">{res.sources.map(s => <span key={s}><Icon name="layers" size={12} />{s}</span>)}</div>
            <button type="button" className={`ais-how ${how ? 'on' : ''}`} aria-expanded={how} onClick={() => setHow(h => !h)}><Icon name="shield" size={14} />How I got this<Icon name="down" size={13} /></button>
            <div className="ais-fb">
              <motion.button type="button" aria-label="Helpful" aria-pressed={vote === true} className={vote === true ? 'on' : ''} whileTap={{ scale: 0.8 }} onClick={() => { setVote(true); onFeedback(true) }}><Icon name="thumb" size={15} /></motion.button>
              <motion.button type="button" aria-label="Not helpful" aria-pressed={vote === false} className={`flip ${vote === false ? 'on' : ''}`} whileTap={{ scale: 0.8 }} onClick={() => { setVote(false); onFeedback(false) }}><Icon name="thumb" size={15} /></motion.button>
            </div>
          </motion.footer>
        )}
      </AnimatePresence>
      <AnimatePresence initial={false}>
        {how && (
          <motion.ol className="ais-howlist" initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3, ease }}>
            {res.how.map((h, i) => <li key={h}><span>{i + 1}</span>{h}</li>)}
          </motion.ol>
        )}
      </AnimatePresence>
    </section>
  )
}

function ResultRow({ row, i, state, onAction, onOpen }: { row: Row; i: number; state: RowState; onAction: (a: Row['actions'][number]) => void; onOpen: () => void }) {
  const ref = useRef<HTMLLIElement>(null)
  const move = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect(); if (!r || !ref.current) return
    ref.current.style.setProperty('--mx', `${e.clientX - r.left}px`); ref.current.style.setProperty('--my', `${e.clientY - r.top}px`)
  }
  const status = state.approved ? { label: 'Approved', tone: 'pos' as Tone } : row.status
  return (
    <motion.li ref={ref} className={`ais-row r-${status.tone}`} onMouseMove={move} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: i * 0.07, ease }} layout>
      <div className="ais-row-main" onClick={onOpen} role="button" tabIndex={0} onKeyDown={e => { if (e.key === 'Enter') onOpen() }} aria-label={`Open details for ${row.title}`}>
        <div className="ais-row-top">
          <h3>{row.title}</h3>
          <div className="ais-chips">{row.chips.map(c => <span key={c} className="ais-chip">{c}</span>)}</div>
        </div>
        <p className="ais-row-ref">{row.ref}</p>
        <p className="ais-row-desc">{row.desc}</p>
        <dl className="ais-row-kv">{row.kv.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{state.approved && k === 'Approval' ? 'Approved' : v}</dd></div>)}</dl>
        {row.progress !== undefined && <div className="ais-bar" aria-label={`${row.progress}% complete`}><motion.i initial={{ width: 0 }} animate={{ width: `${row.progress}%` }} transition={{ duration: 0.9, delay: 0.2 + i * 0.07, ease }} /></div>}
        <div className="ais-row-tags">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span key={status.label} initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }} transition={{ duration: 0.2 }}><Tag tone={status.tone}>{status.label}</Tag></motion.span>
          </AnimatePresence>
          {row.level && !state.approved && <Tag tone={row.level.tone} icon={row.level.tone === 'neg' ? 'alert' : row.level.tone === 'warn' ? 'flag' : 'check'}>{row.level.label}</Tag>}
          <span className="ais-note"><Icon name="spark" size={12} strokeWidth={1.7} />{state.approved ? 'Approved by you just now' : row.note}</span>
        </div>
      </div>
      <div className="ais-row-act">
        {row.actions.map(a => {
          const done = (a.does === 'approve' && state.approved) || (a.does === 'follow' && state.followed) || (a.does === 'request' && state.requested)
          const label = a.does === 'approve' && state.approved ? 'Approved' : a.does === 'follow' && state.followed ? 'Drafted' : a.does === 'request' && state.requested ? 'Requested' : a.label
          return (
            <motion.button key={a.label} type="button" className={`ais-btn ${a.kind === 'primary' ? 'p' : 'g'} ${done ? 'done' : ''}`} whileTap={{ scale: 0.95 }} disabled={done} onClick={() => onAction(a)}>
              <Icon name={done ? 'check' : a.icon} size={15} strokeWidth={1.7} />{label}
            </motion.button>
          )
        })}
      </div>
    </motion.li>
  )
}

interface RowState { approved?: boolean; followed?: boolean; requested?: boolean }

function ResultsView({ res, q, onGo, toast, onFeedback }: { res: Result; q: string; onGo: (v: 'booking' | 'ariba' | 'goaldraft', row: Row) => void; toast: (t: string) => void; onFeedback: (up: boolean) => void }) {
  const reduced = useReducedMotion()
  const [tab, setTab] = useState(0)
  const [facet, setFacet] = useState<number | null>(null)
  const [rows, setRows] = useState<Record<string, RowState>>({})
  const [panel, setPanel] = useState<Row | null>(null)
  const [showRows, setShowRows] = useState(!!reduced)
  useEffect(() => { if (reduced) return; const t = setTimeout(() => setShowRows(true), 1500); return () => clearTimeout(t) }, [reduced])

  const tabsOf = (r: Row) => (rows[r.title]?.approved ? r.tabs.filter(t => t !== 2) : r.tabs)
  const inTab = (r: Row, t: number) => t === 0 || tabsOf(r).includes(t)
  const shown = res.rows.filter(r => inTab(r, tab) && (facet === null || res.facets[facet].test(r)))
  const act = (r: Row, a: Row['actions'][number]) => {
    if (a.go) return onGo(a.go, r)
    const set = (patch: RowState) => setRows(s => ({ ...s, [r.title]: { ...s[r.title], ...patch } }))
    if (a.does === 'approve') { set({ approved: true }); toast(`Approved ${r.title.split(' — ')[0]} (${r.chips[0]})`) }
    else if (a.does === 'follow') { set({ followed: true }); toast(`Follow-up to ${r.ref.replace('Requestor: ', '').split(' • ')[0]} drafted`) }
    else if (a.does === 'request') { set({ requested: true }); toast('Approval requested for this fare') }
    else if (a.does === 'file') toast(`Opening ${a.label}`)
    else if (a.does === 'worker') toast(`Opening the worker form for ${r.title.replace('CyberSecure – ', '')}`)
    else if (a.does === 'people') toast(`${a.label} on ${r.chips[0]}`)
    else if (a.does === 'items') setPanel(r)
  }
  const interpret = res.question

  return (
    <div className="ais-res">
      <motion.div className="ais-read" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
        <span className="ais-read-l"><Icon name={res.icon} size={15} />I read this as</span>
        <strong>{interpret}</strong>
        <span className="ais-read-app"><AppDot app={res.app} size={18} />{apps[res.app].name}</span>
      </motion.div>
      <Overview res={res} q={q} onFeedback={onFeedback} />

      <AnimatePresence>
        {showRows && (
          <motion.div key="body" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.3 }}>
            <div className="ais-bar2">
              <div className="ais-tabs" role="tablist">
                {res.tabs.map((t, i) => {
                  const n = res.rows.filter(r => inTab(r, i)).length
                  return (
                    <button key={t} type="button" role="tab" aria-selected={tab === i} className={tab === i ? 'on' : ''} onClick={() => setTab(i)}>
                      {tab === i && <motion.span layoutId="tab-pill" className="ais-tab-pill" transition={{ type: 'spring', stiffness: 500, damping: 38 }} />}
                      <span>{t}</span><b>{i === 0 && res.total > res.rows.length ? res.total : n}</b>
                    </button>
                  )
                })}
              </div>
              <div className="ais-facets" aria-label="Filters">
                <span className="ais-facets-l"><Icon name="sliders" size={14} />Filters</span>
                {res.facets.map((f, i) => (
                  <motion.button key={f.label} type="button" className={`ais-fchip ${facet === i ? 'on' : ''}`} whileTap={{ scale: 0.94 }} aria-pressed={facet === i} onClick={() => setFacet(facet === i ? null : i)}>
                    {facet === i && <Icon name="check" size={12} strokeWidth={2.2} />}{f.label}
                  </motion.button>
                ))}
              </div>
            </div>
            <ul className="ais-list" key={`${tab}-${facet}`}>
              {shown.map((r, i) => <ResultRow key={r.title} row={r} i={i} state={rows[r.title] ?? {}} onAction={a => act(r, a)} onOpen={() => setPanel(r)} />)}
              {!shown.length && <li className="ais-empty">Nothing matches that filter. Clear a filter to see all {res.rows.length}.</li>}
            </ul>
            {res.total > res.rows.length && <p className="ais-more">Showing {res.rows.length} of {res.total} · the rest open in {apps[res.app].name}</p>}
          </motion.div>
        )}
      </AnimatePresence>

      <Panel row={panel} res={res} state={panel ? rows[panel.title] ?? {} : {}} onClose={() => setPanel(null)} onAction={a => panel && act(panel, a)} />
    </div>
  )
}

/* ---------- detail panel with a conversational follow-up ---------- */

function Panel({ row, res, state, onClose, onAction }: { row: Row | null; res: Result; state: RowState; onClose: () => void; onAction: (a: Row['actions'][number]) => void }) {
  const [chat, setChat] = useState<{ q: string; a: string }[]>([])
  useEffect(() => { setChat([]) }, [row?.title])
  useEffect(() => {
    if (!row) return
    const k = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [row, onClose])
  const asks = row ? [
    ['Why is this here?', `${row.note}. ${row.status.label}${row.level ? ' · ' + row.level.label : ''}. It matched “${res.query}” in ${apps[res.app].name}.`],
    ['What should I do next?', row.actions[0] ? `The quickest next step is “${row.actions[0].label}”, ${row.actions[0].go ? 'which opens the product with this already filled in.' : 'right from this panel.'}` : 'Nothing needs doing; it is on schedule.'],
    ['Show me similar', `There ${res.rows.length - 1 === 1 ? 'is 1 other result' : `are ${res.rows.length - 1} other results`} in this search. Close the panel to compare them.`],
  ] : []
  return (
    <AnimatePresence>
      {row && (
        <>
          <motion.div className="ais-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} />
          <motion.aside className="ais-panel" aria-label="Result details" initial={{ x: 60, opacity: 0 }} animate={{ x: 0, opacity: 1 }} exit={{ x: 60, opacity: 0 }} transition={{ duration: 0.38, ease }}>
            <header>
              <Tag tone={state.approved ? 'pos' : row.status.tone}>{state.approved ? 'Approved' : row.status.label}</Tag>
              <button type="button" className="ais-x" aria-label="Close details" onClick={onClose}><Icon name="x" size={16} /></button>
            </header>
            <h2>{row.title}</h2>
            <p className="ais-row-ref">{row.ref}</p>
            <div className="ais-chips">{row.chips.map(c => <span key={c} className="ais-chip">{c}</span>)}</div>
            <p className="ais-panel-desc">{row.desc}</p>
            <dl className="ais-panel-kv">{row.kv.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{state.approved && k === 'Approval' ? 'Approved' : v}</dd></div>)}{row.level && <div><dt>Risk</dt><dd>{row.level.label.replace('Risk Level · ', '')}</dd></div>}</dl>
            <div className="ais-panel-ai"><Icon name="spark" size={14} /><span>{row.note}</span></div>
            <div className="ais-panel-act">{row.actions.filter(a => a.does !== 'file').map(a => <button key={a.label} type="button" className={`ais-btn ${a.kind === 'primary' ? 'p' : 'g'}`} onClick={() => onAction(a)}><Icon name={a.icon} size={15} strokeWidth={1.7} />{a.label}</button>)}</div>
            <div className="ais-chat">
              <p className="ais-chat-h"><Icon name="chat" size={14} /> Ask a follow-up</p>
              <div className="ais-chat-log">
                {chat.map((c, i) => <div key={i}><p className="me">{c.q}</p><p className="ai"><Icon name="spark" size={12} /><Typed text={c.a} /></p></div>)}
              </div>
              <div className="ais-asks">{asks.map(([qq, aa]) => <button key={qq} type="button" onClick={() => setChat(c => [...c, { q: qq, a: aa }])}>{qq}</button>)}</div>
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}

function Typed({ text }: { text: string }) {
  const reduced = useReducedMotion()
  const [n, setN] = useState(reduced ? text.length : 0)
  useEffect(() => { if (reduced) return; const id = setInterval(() => setN(v => (v >= text.length ? (clearInterval(id), v) : v + 2)), 14); return () => clearInterval(id) }, [text, reduced])
  return <span>{text.slice(0, n)}</span>
}

/* ---------- the destination screens ---------- */

function Crumbs({ items }: { items: string[] }) {
  return <nav className="ais-crumbs" aria-label="Breadcrumb">{items.map((c, i) => <span key={c} className={i === items.length - 1 ? 'on' : ''}>{c}{i < items.length - 1 && <Icon name="chevron" size={12} />}</span>)}</nav>
}
const Back = ({ onBack }: { onBack: () => void }) => <button type="button" className="ais-btn g" onClick={onBack}><Icon name="back" size={15} />Back to results</button>

function Booking({ onBack, toast }: { onBack: () => void; toast: (t: string) => void }) {
  const [booked, setBooked] = useState(false)
  return (
    <div className="ais-app">
      <Crumbs items={booking.crumbs} />
      <h1 className="ais-h1">{booking.title}</h1>
      <div className="ais-split">
        <section className="ais-card">
          <h2 className="ais-h5"><Icon name="plane" size={16} /> {booking.flight}</h2>
          <dl className="ais-form">{booking.details.map(([k, v], i) => <motion.div key={k} initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.1 + i * 0.05 }}><dt>{k}</dt><dd>{v}</dd></motion.div>)}</dl>
          <Tag tone="pos">Compliant with policy</Tag>
          <div className="ais-actions"><Back onBack={onBack} /></div>
        </section>
        <section className="ais-card">
          <h2 className="ais-h5">Booking Summary</h2>
          <dl className="ais-form">{booking.summary.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
          <div className="ais-total"><span>Total</span><strong>{booking.total}</strong></div>
          <motion.button type="button" className={`ais-btn p wide ${booked ? 'done' : ''}`} whileTap={{ scale: 0.97 }} disabled={booked} onClick={() => { setBooked(true); toast('Flight booked. Confirmation sent to Maria Schmidt.') }}>
            <Icon name={booked ? 'check' : 'plane'} size={16} />{booked ? 'Booked' : booking.title}
          </motion.button>
        </section>
      </div>
    </div>
  )
}

function AribaPage({ onBack, toast }: { onBack: () => void; toast: (t: string) => void }) {
  const [qty, setQty] = useState(ariba.qty)
  const [added, setAdded] = useState(false)
  return (
    <div className="ais-app">
      <Crumbs items={ariba.crumbs} />
      <h1 className="ais-h1">{ariba.title} <span>(Qty: {qty})</span></h1>
      <div className="ais-split3">
        <div className="ais-imgph"><Icon name="box" size={56} strokeWidth={1} /><span>iPhone 17 Pro</span></div>
        <section className="ais-card">
          <h2 className="ais-h5">{ariba.product}</h2>
          <p className="ais-price"><Money value={ariba.unit * ariba.qty} /></p>
          <dl className="ais-form">{ariba.details.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}</dl>
        </section>
        <section className="ais-card">
          <h2 className="ais-h5">Add to Requisition ({qty} units)</h2>
          <div className="ais-step">
            <span>Quantity</span>
            <div><button type="button" aria-label="Fewer" onClick={() => setQty(q => Math.max(1, q - 5))}>−</button><b>{qty}</b><button type="button" aria-label="More" onClick={() => setQty(q => Math.min(500, q + 5))}>+</button></div>
          </div>
          <div className="ais-total"><span>Total</span><strong><Money value={ariba.unit * qty} /></strong></div>
          <motion.button type="button" className={`ais-btn p wide ${added ? 'done' : ''}`} whileTap={{ scale: 0.97 }} onClick={() => { setAdded(true); toast('Added to shopping cart.') }}><Icon name={added ? 'check' : 'cart'} size={16} />{added ? 'In your cart' : 'Add to Shopping Cart'}</motion.button>
          <button type="button" className="ais-btn g wide">Proceed to Checkout</button>
        </section>
      </div>
      <div className="ais-actions"><Back onBack={onBack} /></div>
    </div>
  )
}

function GoalPage({ onBack, toast }: { onBack: () => void; toast: (t: string) => void }) {
  const [name, setName] = useState(goalDraft.name)
  const [desc, setDesc] = useState(goalDraft.description)
  const [cat, setCat] = useState(goalDraft.category)
  const [p, setP] = useState(goalDraft.progress)
  return (
    <div className="ais-app narrow">
      <Crumbs items={['People', 'Goals', 'Edit Goal']} />
      <h1 className="ais-h1">Edit Goal <span>Alex Johnson · Q2 2026</span></h1>
      <section className="ais-card">
        <h2 className="ais-h5">Goal Details</h2>
        <label className="ais-fld"><span>Goal Name</span><input value={name} onChange={e => setName(e.target.value)} /></label>
        <label className="ais-fld"><span>Description</span><textarea rows={3} value={desc} onChange={e => setDesc(e.target.value)} /></label>
        <div className="ais-two">
          <label className="ais-fld"><span>Target Date</span><input defaultValue="30 June 2026" /></label>
          <label className="ais-fld"><span>Category</span><select value={cat} onChange={e => setCat(e.target.value)}>{goalDraft.categories.map(c => <option key={c}>{c}</option>)}</select></label>
        </div>
        <label className="ais-fld"><span>Progress · <b>{p}%</b></span>
          <input type="range" min={0} max={100} value={p} onChange={e => setP(+e.target.value)} className="ais-range" style={{ ['--v' as string]: `${p}%` }} />
        </label>
        <label className="ais-fld sm"><span>Weight</span><input defaultValue={goalDraft.weight} /></label>
        <div className="ais-actions"><button type="button" className="ais-btn p" onClick={() => toast('Draft saved.')}><Icon name="check" size={15} />Save Draft</button><button type="button" className="ais-btn p" onClick={() => toast('Submitted for approval.')}><Icon name="send" size={15} />Submit for Approval</button><Back onBack={onBack} /></div>
      </section>
    </div>
  )
}

/* ---------- hand-off between products ---------- */

function Handoff({ to, carry, onDone, onCancel }: { to: AppId; carry: string[]; onDone: () => void; onCancel: () => void }) {
  const reduced = useReducedMotion()
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const id = setInterval(() => setPct(p => Math.min(100, p + (reduced ? 50 : 6))), 80)
    return () => clearInterval(id)
  }, [reduced])
  useEffect(() => { if (pct >= 100) { const t = setTimeout(onDone, 260); return () => clearTimeout(t) } }, [pct, onDone])
  const a = apps[to]
  return (
    <motion.div className="ais-hand" role="dialog" aria-modal="true" aria-label={`Opening ${a.name}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
      <motion.div className="ais-hand-c" initial={{ scale: 0.92, y: 16 }} animate={{ scale: 1, y: 0 }} transition={{ duration: 0.4, ease }}>
        <div className="ais-hand-mk" style={{ ['--h' as string]: a.hue }}>
          <svg viewBox="0 0 64 64" aria-hidden="true"><circle cx="32" cy="32" r="29" fill="none" stroke="rgb(255 255 255 / .12)" strokeWidth="3" /><circle cx="32" cy="32" r="29" fill="none" stroke="var(--h)" strokeWidth="3" strokeLinecap="round" strokeDasharray={182} strokeDashoffset={182 - (182 * pct) / 100} transform="rotate(-90 32 32)" /></svg>
          <span>{a.short}</span>
        </div>
        <h2>Opening {a.name}</h2>
        <p>Carrying over what you found, so you do not start from scratch.</p>
        <div className="ais-carry">{carry.map((c, i) => <motion.span key={c} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 + i * 0.15 }}><Icon name="check" size={12} strokeWidth={2.2} />{c}</motion.span>)}</div>
        <button type="button" className="ais-btn g" onClick={onCancel}>Cancel</button>
      </motion.div>
    </motion.div>
  )
}

/* ---------- the prototype ---------- */

export default function SearchPrototype() {
  const reduced = useReducedMotion()
  const [view, setView] = useState<View>({ k: 'home' })
  const [ctx, setCtx] = useState<AppId>('s4')
  const [q, setQ] = useState('')
  const [bump, setBump] = useState(0)
  const [toastMsg, setToastMsg] = useState<{ t: string; id: number } | null>(null)
  const [hand, setHand] = useState<{ to: AppId; carry: string[]; next: View } | null>(null)
  const [menu, setMenu] = useState(false)
  const heroRef = useRef<HTMLInputElement>(null)
  const barRef = useRef<HTMLInputElement>(null)
  const prev = useRef<View>({ k: 'home' })

  const app = appOf(view) ?? ctx
  const toast = useCallback((t: string) => setToastMsg({ t, id: Date.now() }), [])
  useEffect(() => { if (!toastMsg) return; const t = setTimeout(() => setToastMsg(null), 2600); return () => clearTimeout(t) }, [toastMsg])

  const nav = (v: View) => { setView(v); const a = appOf(v); if (a) setCtx(a); setBump(b => b + 1); window.scrollTo(0, 0) }
  const pick = (s: Sug) => { setQ(s.text); nav({ k: 'results', key: s.route, q: s.text }) }
  const submit = (text: string) => { const first = suggest(text)?.[0]; nav({ k: 'results', key: first?.route ?? 'po', q: text }) }
  const resultsView = view.k === 'results' ? view : null

  useEffect(() => {
    const k = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); (view.k === 'home' ? heroRef : barRef).current?.focus() }
    }
    window.addEventListener('keydown', k); return () => window.removeEventListener('keydown', k)
  }, [view.k])

  const goApp = (to: 'booking' | 'ariba' | 'goaldraft', row: Row) => {
    const dest: Record<typeof to, { app: AppId; carry: string[] }> = {
      booking: { app: 'concur', carry: ['Trip SFO → BLR', 'Jun 10–17, 2026', row.title.split(' — ')[0]] },
      ariba: { app: 'ariba', carry: [row.title, row.ref.split(' • ')[0].replace('Supplier: ', 'Supplier '), 'Quantity ready for a requisition'] },
      goaldraft: { app: 'sf', carry: [row.title, 'Alex Johnson', 'Q2 2026'] },
    }
    prev.current = view
    setHand({ to: dest[to].app, carry: dest[to].carry, next: { k: to } as View })
  }

  const switchTo = (a: AppId) => {
    setMenu(false); setQ('')
    if (a === 'concur') nav({ k: 'appHome', key: 'travel' })
    else if (a === 'ariba') nav({ k: 'appHome', key: 'buy' })
    else if (a === 'sf') nav({ k: 'appHome', key: 'goals' })
    else { setCtx(a); nav({ k: 'home' }); setCtx(a) }
  }

  const isHero = view.k === 'home'
  const ah = view.k === 'appHome' ? appHomes[view.key] : null

  return (
    <div className="ais" style={{ ['--app' as string]: apps[app].hue }} data-lenis-prevent>
      <div className="ais-bg" aria-hidden="true">
        <span className="ais-blob b1" /><span className="ais-blob b2" /><span className="ais-blob b3" /><span className="ais-grid" />
      </div>

      <header className="ais-shell">
        <div className="ais-shell-l">
          <Link to="/craft/sap-search" className="ais-exit" aria-label="Back to the case study"><Icon name="back" size={16} /></Link>
          <button type="button" className="ais-brand" onClick={() => nav({ k: 'home' })} aria-label="Home"><span className="ais-logo"><Icon name="spark" size={16} strokeWidth={1.6} /></span></button>
          <div className="ais-switch">
            <button type="button" className="ais-appbtn" aria-expanded={menu} aria-haspopup="menu" onClick={() => setMenu(m => !m)}>
              <AppDot app={app} size={22} />
              <AnimatePresence mode="wait" initial={false}><motion.span key={app} initial={{ opacity: 0, y: reduced ? 0 : 6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -6 }} transition={{ duration: 0.2 }}>{apps[app].name}</motion.span></AnimatePresence>
              <Icon name="down" size={13} />
            </button>
            <AnimatePresence>
              {menu && (
                <motion.div className="ais-menu" role="menu" initial={{ opacity: 0, y: -6, scale: 0.98 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -4 }} transition={{ duration: 0.18, ease }}>
                  <p>Same search, any product</p>
                  {(Object.keys(apps) as AppId[]).map(a => (
                    <button key={a} type="button" role="menuitem" className={a === app ? 'on' : ''} onClick={() => switchTo(a)}><AppDot app={a} size={22} /><span>{apps[a].name}<small>{apps[a].role}</small></span>{a === app && <Icon name="check" size={14} />}</button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
        <div className="ais-shell-c">
          {!isHero && <SearchBox variant="bar" q={q} setQ={setQ} onPick={pick} onSubmit={submit} inputRef={barRef} bumpKey={bump} />}
        </div>
        <div className="ais-shell-r">
          <button type="button" className="ais-ic" aria-label="Notifications"><Icon name="bell" size={18} /><i /></button>
          <button type="button" className="ais-ic" aria-label="Help"><Icon name="chat" size={18} /></button>
          <span className="ais-me" aria-label="Alex">AJ</span>
        </div>
      </header>

      <main className="ais-main" onClick={() => menu && setMenu(false)}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div key={view.k + (resultsView ? resultsView.key + resultsView.q : ah ? view.k : '')} initial={{ opacity: 0, y: reduced ? 0 : 14 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: reduced ? 0 : -8 }} transition={{ duration: 0.34, ease }}>
            {view.k === 'home' && (
              <div className="ais-home">
                <p className="ais-eyebrow"><span /> {apps[ctx].name}</p>
                <h1 className="ais-hello">{home.greeting}</h1>
                <p className="ais-sub">{home.sub}</p>
                <div className="ais-hero-sb"><SearchBox variant="hero" q={q} setQ={setQ} onPick={pick} onSubmit={submit} inputRef={heroRef} bumpKey={bump} /></div>
                <div className="ais-quick" aria-label="Try one of these">
                  {recent.concat(suggested.slice(0, 1)).map((s, i) => (
                    <motion.button key={s.text} type="button" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 + i * 0.08, ease }} onClick={() => pick(s)}><AppDot app={s.app} size={16} />{s.text}</motion.button>
                  ))}
                </div>
                <div className="ais-cards">
                  {home.cards.map((c, i) => (
                    <motion.div key={c.t} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.08, duration: 0.55, ease }}>
                      <Tilt className="ais-tile" onClick={() => nav({ k: 'results', key: c.go, q: results[c.go].query })}>
                        <span className="ais-tile-ic"><Icon name={c.icon} size={20} strokeWidth={1.5} /></span>
                        <strong>{c.t}</strong><small>{c.s}</small>
                        <Icon name="arrow" size={16} />
                      </Tilt>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {ah && view.k === 'appHome' && (
              <div className="ais-home inner">
                <h1 className="ais-hello sm">{ah.title}</h1>
                <p className="ais-sub">{ah.sub}</p>
                <motion.button type="button" className="ais-hint" initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} onClick={() => { setQ(ah.hint); barRef.current?.focus() }}>
                  <Icon name="spark" size={15} /> Try searching: “{ah.hint}” <Icon name="arrow" size={14} />
                </motion.button>
                <div className="ais-cards c3">
                  {ah.cards.map(([t, s2, ic], i) => (
                    <motion.div key={t} initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.07, duration: 0.5, ease }}>
                      <Tilt className="ais-tile"><span className="ais-tile-ic"><Icon name={ic} size={20} strokeWidth={1.5} /></span><strong>{t}</strong><small>{s2}</small></Tilt>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
            {resultsView && <ResultsView key={resultsView.key + resultsView.q} res={results[resultsView.key]} q={resultsView.q} onGo={goApp} toast={toast} onFeedback={up => toast(up ? 'Thanks. Marked as helpful.' : 'Thanks. We will use this to improve the answer.')} />}
            {view.k === 'booking' && <Booking onBack={() => nav(prev.current.k === 'results' ? prev.current : { k: 'home' })} toast={toast} />}
            {view.k === 'ariba' && <AribaPage onBack={() => nav(prev.current.k === 'results' ? prev.current : { k: 'home' })} toast={toast} />}
            {view.k === 'goaldraft' && <GoalPage onBack={() => nav(prev.current.k === 'results' ? prev.current : { k: 'home' })} toast={toast} />}
          </motion.div>
        </AnimatePresence>
      </main>

      <AnimatePresence>{hand && <Handoff key="h" to={hand.to} carry={hand.carry} onCancel={() => setHand(null)} onDone={() => { const n = hand.next; setHand(null); nav(n) }} />}</AnimatePresence>
      <div className="ais-toast-wrap" aria-live="polite">
        <AnimatePresence>{toastMsg && <motion.div key={toastMsg.id} className="ais-toast" initial={{ opacity: 0, y: 16, scale: 0.96 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10 }} transition={{ duration: 0.3, ease }}><Icon name="check" size={15} strokeWidth={2} />{toastMsg.t}</motion.div>}</AnimatePresence>
      </div>
    </div>
  )
}
