import type { CSSProperties, ReactNode } from 'react'
import { easeOut, easeOutBack, seg, lerp } from './engine'
import { In } from './ui'
import { Cursor } from './kit'

/** The short flows that play on the project covers and in the films. Each is a function of time on a 1920 x 1080 stage,
 *  in the project's own colours (the same mesh as the cover). Illustrative data only. */
const MESH = `${import.meta.env.BASE_URL}images/mesh/`
export const Mesh = ({ id }: { id: string }) => <div style={{ position: 'absolute', inset: 0, backgroundImage: `url(${MESH}${id}.webp)`, backgroundSize: 'cover', backgroundPosition: 'center' }} />

type Pal = { p: string; p2: string; pl: string; ink: string; mute: string; a: string; ai: string; red: string }
export const PAL: Record<string, Pal> = {
  'sap-signin': { p: '#062E29', p2: '#0A3C35', pl: '#1F6B5E', ink: '#F2F7F5', mute: '#9FD6C6', a: '#7CE3B8', ai: '#04231F', red: '#FF8A7A' },
  'sap-collections': { p: '#02223F', p2: '#0A3256', pl: '#1F5A8C', ink: '#F2F6FB', mute: '#A8CBEA', a: '#8CD0FF', ai: '#02223F', red: '#FF8A7A' },
  'sap-compositional': { p: '#240A45', p2: '#33105C', pl: '#7A3BB8', ink: '#F7F1FB', mute: '#DDB8F2', a: '#FFB3E6', ai: '#2A0B48', red: '#FF8A7A' },
}
const mono = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace"
const typed = (s: string, t: number, a: number, cps: number) => s.slice(0, Math.max(0, Math.min(s.length, Math.floor((t - a) * cps))))
const win = (t: number, a: number, b: number) => (t >= a && t < b ? 1 : 0)

const Lane = ({ t, a, o, children, pal }: { t: number; a: number; o: number; children: ReactNode; pal: Pal }) => (
  <In t={t} a={a} o={o} y={12} style={{ left: 0, width: 1920, top: 980, textAlign: 'center' }}>
    <span style={{ display: 'inline-block', padding: '16px 34px', borderRadius: 40, background: pal.p, border: `2px solid ${pal.pl}`, color: pal.ink, fontSize: 32, whiteSpace: 'nowrap' }}>{children}</span>
  </In>
)

/* ───────── Sign-in: identity first, with errors (16 s) ───────── */
export const SIGNIN_LOOP = 16
export function LoopSignIn({ t }: { t: number }) {
  const P = PAL['sap-signin']
  const email = 'demo.user@example.com'
  const step2 = t >= 5.7
  const routing = t >= 4.6 && t < 5.7
  const emptyErr = t >= 1.5 && t < 2.5
  const typedEmail = t < 5.7 ? typed(email, t, 2.5, 13) : email
  const wrongDots = t < 8.1 ? '•'.repeat(Math.max(0, Math.floor((t - 6.4) * 9))) : '•'.repeat(8)
  const retype = t >= 9.6 ? '•'.repeat(Math.min(12, Math.floor((t - 9.6) * 9))) : wrongDots
  const banner = t >= 8.1 && t < 10.2
  const ok = t >= 11.8
  const field = (label: string, v: string, err = false, caret = false): ReactNode => (
    <div style={{ marginTop: 26 }}>
      <div style={{ fontSize: 26, color: P.mute, marginBottom: 10 }}>{label}</div>
      <div style={{ height: 76, borderRadius: 16, border: `2px solid ${err ? P.red : P.pl}`, background: P.p2, display: 'flex', alignItems: 'center', padding: '0 24px', fontSize: 32, color: P.ink }}>{v}{caret && <i style={{ width: 3, height: 38, background: P.a, marginLeft: 3 }} />}</div>
      {err && <div style={{ fontSize: 26, color: P.red, marginTop: 10 }}>Enter your email or username.</div>}
    </div>
  )
  const btn = (label: string, on: boolean, pressed = false): ReactNode => (
    <div style={{ marginTop: 34, height: 80, borderRadius: 18, background: on ? P.a : P.pl, color: on ? P.ai : P.mute, fontSize: 32, fontWeight: 600, display: 'grid', placeItems: 'center', transform: `scale(${pressed ? 0.985 : 1})` }}>{label}</div>
  )
  const cx = lerp(1180, 1180, 0), cy = step2 ? 760 : 700
  return <div style={{ position: 'absolute', inset: 0 }}>
    <Mesh id="sap-signin" />
    <div style={{ position: 'absolute', left: 560, top: 110, width: 800, padding: '52px 60px 56px', borderRadius: 30, background: P.p, border: `2px solid ${P.pl}`, boxShadow: '0 60px 120px -30px rgba(0,0,0,.55)', color: P.ink }}>
      <div style={{ width: 60, height: 60, borderRadius: 16, background: P.a }} />
      <div style={{ fontSize: 54, fontWeight: 600, marginTop: 26, letterSpacing: '-0.02em' }}>{ok ? 'Signed in' : 'Sign in'}</div>
      {banner && <div style={{ marginTop: 22, padding: '18px 22px', borderRadius: 14, border: `2px solid ${P.red}`, color: P.red, fontSize: 28, background: P.p2 }}>We couldn’t authenticate you. Check your details and try again.</div>}
      {!step2 && !routing && <>{field('Email or username', typedEmail, emptyErr, t >= 2.4)}{btn('Continue', typedEmail === email, t >= 4.3 && t < 4.6)}</>}
      {routing && <div style={{ marginTop: 40, fontSize: 32, color: P.mute }}>Checking how you sign in
        <div style={{ height: 8, borderRadius: 4, background: P.pl, marginTop: 24 }}><div style={{ height: 8, borderRadius: 4, width: `${seg(t, 4.6, 5.6) * 100}%`, background: P.a }} /></div></div>}
      {step2 && !ok && <>
        <div style={{ marginTop: 22, display: 'inline-flex', gap: 14, alignItems: 'center', padding: '10px 22px', borderRadius: 40, background: P.p2, border: `2px solid ${P.pl}`, fontSize: 28 }}>{email}<span style={{ color: P.a }}>Change</span></div>
        {field('Password', t < 9.6 ? wrongDots : retype, banner, t >= 6.4 && !banner)}
        {btn('Sign In', (t < 9.6 ? wrongDots : retype).length >= 8, (t >= 7.9 && t < 8.1) || (t >= 11.5 && t < 11.8))}
        <div style={{ marginTop: 26, fontSize: 28, color: P.a }}>Need sign in assistance?</div></>}
      {ok && <div style={{ marginTop: 30, fontSize: 34, color: P.mute, lineHeight: 1.4 }}>
        <span style={{ display: 'inline-grid', placeItems: 'center', width: 64, height: 64, borderRadius: 32, background: P.a, color: P.ai, fontSize: 38, marginRight: 18, transform: `scale(${easeOutBack(seg(t, 11.8, 12.4))})` }}>✓</span>You are in. One identity, the right method.</div>}
    </div>
    <Lane pal={P} t={t} a={0.4} o={1.4}>Identity first</Lane>
    <Lane pal={P} t={t} a={1.6} o={2.4}>Field errors stay in the field</Lane>
    <Lane pal={P} t={t} a={4.7} o={5.6}>Then the right method for that account</Lane>
    <Lane pal={P} t={t} a={8.2} o={10.1}>Account errors in a banner. Nothing is retyped.</Lane>
    <Lane pal={P} t={t} a={12.2} o={15.4}>Non blaming, consistent across every product</Lane>
    <Cursor x={cx} y={cy} show={win(t, 4.0, 4.7) + win(t, 7.6, 8.2) + win(t, 11.2, 11.8) > 0} />
  </div>
}

/* ───────── Collections: worklist to Customer 360 to an email with attachments (20 s) ───────── */
export const COLLECTIONS_LOOP = 20
export function LoopCollections({ t }: { t: number }) {
  const P = PAL['sap-collections']
  const view = t < 4.4 ? 0 : t < 9.4 ? 1 : 2
  const rows: [string, string, string, string][] = [['NorthStar', '1000 · 2000 · 3000', 'High', 'Send a reminder'], ['Customer B', '1000', 'Medium', 'Wait for the cooldown'], ['Customer C', '1000 · 4000', 'Medium', 'Review the dispute']]
  const att: [string, number][] = [['Invoice copies.pdf', 12.2], ['Account statement.pdf', 13.0]]
  const approved = t >= 16.2, sent = t >= 17
  const cx = t < 2.6 ? lerp(1500, 700, easeOut(seg(t, 0.8, 2.4))) : t < 7.6 ? lerp(700, 480, easeOut(seg(t, 6.2, 7.4))) : lerp(480, 1180, easeOut(seg(t, 14.2, 15.8)))
  const cy = t < 2.6 ? lerp(800, 330, easeOut(seg(t, 0.8, 2.4))) : t < 7.6 ? lerp(330, 640, easeOut(seg(t, 6.2, 7.4))) : lerp(640, 800, easeOut(seg(t, 14.2, 15.8)))
  const chip = (txt: string, color: string, filled = false): ReactNode => <span style={{ padding: '8px 20px', borderRadius: 30, border: `2px solid ${color}`, background: filled ? color : 'transparent', color: filled ? P.ai : color, fontSize: 26, fontWeight: 600 }}>{txt}</span>
  const tab = (label: string, on: boolean): ReactNode => <span style={{ color: on ? P.ink : P.mute, fontWeight: on ? 600 : 400, borderBottom: on ? `4px solid ${P.a}` : '4px solid transparent', paddingBottom: 14 }}>{label}</span>
  return <div style={{ position: 'absolute', inset: 0 }}>
    <Mesh id="sap-collections" />
    <div style={{ position: 'absolute', left: 150, top: 90, width: 1620, height: 820, borderRadius: 30, background: P.p, border: `2px solid ${P.pl}`, boxShadow: '0 60px 120px -30px rgba(0,10,30,.6)', color: P.ink, overflow: 'hidden' }}>
      <div style={{ height: 84, display: 'flex', alignItems: 'center', padding: '0 44px', gap: 40, borderBottom: `2px solid ${P.pl}`, fontSize: 30 }}>
        <b style={{ fontWeight: 600 }}>Collections</b>{tab('Worklist', view === 0)}{tab('Customer 360', view >= 1)}
      </div>
      {view === 0 && <div style={{ padding: '34px 44px' }}>
        <div style={{ display: 'flex', fontFamily: mono, fontSize: 22, color: P.mute, padding: '0 30px 16px' }}><span style={{ width: 420 }}>CUSTOMER</span><span style={{ width: 460 }}>COMPANY CODES</span><span style={{ width: 280 }}>PRIORITY</span><span>RECOMMENDED ACTION</span></div>
        {rows.map(([n, cc, pr, ac], i) => <div key={n} style={{ display: 'flex', alignItems: 'center', padding: '0 30px', height: 118, marginBottom: 16, borderRadius: 20, border: `2px solid ${i === 0 && t > 2.7 ? P.a : P.pl}`, background: i === 0 && t > 2.7 ? P.p2 : 'transparent', fontSize: 34, opacity: easeOut(seg(t, 0.2 + i * 0.25, 0.8 + i * 0.25)) }}>
          <span style={{ width: 420, fontWeight: 600 }}>{n}</span><span style={{ width: 460, color: P.mute, fontFamily: mono, fontSize: 28 }}>{cc}</span>
          <span style={{ width: 280, display: 'flex', alignItems: 'center', gap: 14 }}>{pr}<span style={{ fontFamily: mono, fontSize: 18, color: P.a, border: `2px solid ${P.a}`, borderRadius: 8, padding: '2px 8px' }}>AI</span></span><span style={{ color: P.a, fontSize: 30 }}>{ac}</span></div>)}
        <In t={t} a={1.6} y={10} style={{ left: 44, top: 560, width: 1300 }}><div style={{ fontSize: 32, color: P.mute }}>One row per customer. Priority is marked as AI and can be explained.</div></In>
      </div>}
      {view >= 1 && <div style={{ padding: '36px 44px', position: 'relative', height: 730 }}>
        <In t={t} a={4.6} y={14} style={{ left: 44, top: 30, width: 720 }}><div style={{ fontFamily: mono, fontSize: 22, color: P.mute }}>SUMMARY</div><div style={{ fontSize: 36, marginTop: 14, lineHeight: 1.3 }}>NorthStar has open items in three company codes. One reminder was sent before. No open dispute.</div></In>
        <In t={t} a={5.6} y={14} style={{ left: 44, top: 330, width: 720 }}>
          <div style={{ padding: '28px 32px', borderRadius: 22, border: `2px solid ${P.a}`, background: P.p2 }}>
            <div style={{ fontFamily: mono, fontSize: 22, color: P.a }}>NEXT BEST ACTION</div>
            <div style={{ fontSize: 42, fontWeight: 600, marginTop: 12 }}>Send a reminder</div>
            <div style={{ fontSize: 28, color: P.mute, marginTop: 8 }}>The open items are past due and no dispute is logged.</div></div></In>
        {view === 2 && <In t={t} a={9.6} x={50} y={0} style={{ left: 820, top: 30, width: 700 }}>
          <div style={{ padding: '28px 32px', borderRadius: 22, border: `2px solid ${P.pl}`, background: P.p2 }}>
            <div style={{ fontFamily: mono, fontSize: 22, color: P.mute }}>EMAIL DRAFT · EDITABLE</div>
            <div style={{ fontSize: 30, marginTop: 16, lineHeight: 1.4 }}>{typed('Hello, this is a friendly reminder about the open items on your account. Please let us know if anything is unclear.', t, 10, 46)}</div>
            <div style={{ marginTop: 24, fontFamily: mono, fontSize: 20, color: P.mute }}>ATTACHMENTS · FETCHED AUTOMATICALLY</div>
            <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
              {att.map(([n, a]) => { const p = seg(t, a - 0.7, a); return <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '12px 18px', borderRadius: 14, border: `2px solid ${P.pl}`, background: P.p, fontSize: 28, opacity: seg(t, a - 1.2, a - 0.7) }}>
                <span style={{ width: 36, height: 44, borderRadius: 6, background: P.a }} /><span style={{ flex: 1 }}>{n}</span>
                <span style={{ fontFamily: mono, fontSize: 20, color: p >= 1 ? P.a : P.mute }}>{p >= 1 ? '✓ ADDED' : 'FETCHING'}</span></div> })}
            </div>
            <div style={{ marginTop: 26, display: 'flex', gap: 14, alignItems: 'center' }}>{chip(approved ? 'Approved' : 'Approve', P.a, approved)}{chip('Edit', P.mute)}{chip('Reject', P.mute)}</div>
            {sent && <div style={{ marginTop: 22, fontSize: 30, color: P.a }}>✓ Sent after approval</div>}
          </div></In>}
      </div>}
    </div>
    <Lane pal={P} t={t} a={0.6} o={4} >From the worklist, pick a customer</Lane>
    <Lane pal={P} t={t} a={4.8} o={9} >Customer 360: the reason before the action</Lane>
    <Lane pal={P} t={t} a={10.4} o={15.8}>The draft is written, and the attachments are fetched for you</Lane>
    <Lane pal={P} t={t} a={16.3} o={19.6}>A person approves before anything is sent</Lane>
    <Cursor x={cx} y={cy} show={win(t, 0.8, 3.2) + win(t, 6.2, 8) + win(t, 14.2, 16.4) > 0} />
  </div>
}

/* ───────── CDS: from intent to output, with IXO as a parallel layer (22 s) ───────── */
export const CDS_LOOP = 22
const COLS = ['Intent', 'Context', 'Plan', 'Govern', 'Specify', 'Compose']
export function LoopCds({ t }: { t: number }) {
  const P = PAL['sap-compositional']
  const step = Math.min(5, Math.max(-1, Math.floor((t - 2) / 2.3)))
  const x0 = 270, cw = 245, rowY = [330, 460, 590, 720]
  const lanes: [string, (string | null)[], boolean?][] = [
    ['LLM', ['Reads the request', 'Reads the context', 'Reasons and plans', null, 'Writes the spec', null]],
    ['IXO', ['Infer', 'Contextualise', 'Plan the experience', 'Govern', 'Specify', 'Evaluate'], true],
    ['CDS', [null, null, null, null, null, 'Compose from approved parts']],
    ['Guardrails', [null, null, null, 'Policies and permissions', null, 'Validate']],
  ]
  const out = easeOut(seg(t, 14.6, 15.8))
  return <div style={{ position: 'absolute', inset: 0 }}>
    <Mesh id="sap-compositional" />
    <In t={t} a={0.2} y={14} style={{ left: 140, top: 70 }}><div style={{ display: 'inline-block', padding: '18px 34px', borderRadius: 40, background: P.p, border: `2px solid ${P.pl}`, fontSize: 36, color: P.ink }}><span style={{ fontFamily: mono, fontSize: 22, color: P.mute, marginRight: 20 }}>INTENT</span>“Help me understand why attrition is rising.”</div></In>
    {COLS.map((c, i) => <div key={c} style={{ position: 'absolute', left: x0 + i * cw, top: 250, width: cw - 14, textAlign: 'center', fontFamily: mono, fontSize: 22, letterSpacing: '0.12em', textTransform: 'uppercase', color: step >= i ? P.a : P.mute, opacity: easeOut(seg(t, 0.8 + i * 0.12, 1.4 + i * 0.12)) }}>{c}</div>)}
    {lanes.map(([name, cells, hot], li) => <div key={name}>
      <div style={{ position: 'absolute', left: 120, top: rowY[li], width: 130, height: 100, display: 'flex', alignItems: 'center', fontSize: hot ? 40 : 30, fontWeight: 600, color: hot ? P.a : P.ink, opacity: easeOut(seg(t, 0.6 + li * 0.2, 1.2 + li * 0.2)) }}>{name}</div>
      {hot && <div style={{ position: 'absolute', left: 250, top: rowY[li] - 8, width: cw * 6 - 4, height: 116, borderRadius: 26, background: P.p2, border: `2px solid ${P.a}`, opacity: easeOut(seg(t, 1, 1.8)) }} />}
      {cells.map((c, i) => c && <div key={i} style={{ position: 'absolute', left: x0 + i * cw, top: rowY[li], width: cw - 14, height: 100, borderRadius: 20, display: 'grid', placeItems: 'center', textAlign: 'center', padding: '0 12px', fontSize: 26, lineHeight: 1.15, fontWeight: hot ? 600 : 400, background: step === i ? P.a : P.p, color: step === i ? P.ai : P.ink, border: `2px solid ${step === i ? P.a : P.pl}`, opacity: easeOut(seg(t, 1.2 + li * 0.15 + i * 0.1, 1.8 + li * 0.15 + i * 0.1)) * (step >= i || t < 2 ? 1 : 0.7) }}>{c}</div>)}
    </div>)}
    <In t={t} a={2.4} y={0} style={{ left: 250, top: 850, width: cw * 6 }}><div style={{ fontSize: 28, color: P.mute }}>IXO, Intelligent Experience Optimisation, runs beside the pipeline and decides what experience should exist.</div></In>
    {out > 0.01 && <div style={{ position: 'absolute', left: 1130, top: 840, width: 640, height: 190, borderRadius: 24, background: P.p, border: `2px solid ${P.a}`, padding: '22px 28px', opacity: out, transform: `translateY(${(1 - out) * 20}px)`, color: P.ink }}>
      <div style={{ fontFamily: mono, fontSize: 20, color: P.a }}>GENERATED EXPERIENCE</div>
      <div style={{ display: 'flex', alignItems: 'flex-end', gap: 14, height: 80, marginTop: 14 }}>{[0.9, 0.7, 0.5, 0.35, 0.25].map((h, k) => <div key={k} style={{ flex: 1, height: 80 * h * easeOut(seg(t, 15 + k * 0.15, 16.2 + k * 0.15)), borderRadius: '8px 8px 2px 2px', background: k === 0 ? P.a : P.pl }} />)}</div>
      <div style={{ fontSize: 24, color: P.mute, marginTop: 10 }}>Summary, trend and drivers. A person approves any action.</div></div>}
    <In t={t} a={17.2} o={21.2} y={10} style={{ left: 250, top: 930, width: 800 }}><div style={{ fontSize: 30, color: P.a }}>↺ Evaluated against the original intent, then refined</div></In>
  </div>
}
export const loopStyle: CSSProperties = {}
