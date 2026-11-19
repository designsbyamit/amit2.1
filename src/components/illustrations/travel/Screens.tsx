// The Travel booking app, redrawn from Amit's Figma (CaseStudy file: the "Edited" page frames for structure and sizes,
// the UI collage, node 2007:3332, for the green visual style). Every screen is 375 × 812 design points.
// Client hints are neutralised: no carrier name or logo, no loyalty programme, codes AAA and ZZZ, a neutral currency, fictional names.
// Raw values are fine here: this folder draws product UI, which does not follow the site theme.
import { useState, type CSSProperties, type ReactNode } from 'react'

export const C = {
  green: '#00843F', greenDark: '#006B33', greenLink: '#0B8A47', greenTint: '#DCEDE3', greenTintText: '#0B6B3A',
  ground: '#062214', groundDeep: '#04140C',
  dark: '#1B1B1D', darkCard: '#2A2A2D', darkLine: 'rgba(255,255,255,0.12)',
  light: '#F2F2F5', card: '#FFFFFF', line: 'rgba(0,0,0,0.1)',
  ink: '#000000', ink70: 'rgba(0,0,0,0.7)', ink55: 'rgba(0,0,0,0.55)', ink30: 'rgba(0,0,0,0.3)',
  w70: 'rgba(255,255,255,0.7)', w55: 'rgba(255,255,255,0.55)', w20: 'rgba(255,255,255,0.2)',
  blue: '#0A6EBD', yellow: '#F5C518', red: '#BB3225', ok: '#238525',
}
export const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"
const SF = "-apple-system, 'SF Pro Text', 'Helvetica Neue', Helvetica, Arial, sans-serif"

/* ───────── type, from the Figma text styles ───────── */
const T = {
  title: { fontSize: 32, lineHeight: '36px', letterSpacing: -0.64, fontWeight: 500 } as CSSProperties,
  h2: { fontSize: 24, lineHeight: '32px', letterSpacing: -0.24, fontWeight: 500 } as CSSProperties,
  btn: { fontSize: 18, lineHeight: '24px', fontWeight: 500 } as CSSProperties,
  body: { fontSize: 16, lineHeight: '24px', letterSpacing: 0.16 } as CSSProperties,
  small: { fontSize: 14, lineHeight: '20px', letterSpacing: 0.28 } as CSSProperties,
  tag: { fontSize: 12, lineHeight: '16px', letterSpacing: 0.48, fontWeight: 500 } as CSSProperties,
  tab: { fontSize: 11, lineHeight: '15px', letterSpacing: 0.55 } as CSSProperties,
}

/* ───────── icons (24 grid, outlined, as in the Material set the Figma uses) ───────── */
const P = {
  back: 'M15 5l-7 7 7 7', fwd: 'M9 5l7 7-7 7', down: 'M6 9l6 6 6-6', close: 'M6 6l12 12M18 6L6 18',
  search: 'M10.5 17a6.5 6.5 0 1 1 0-13 6.5 6.5 0 0 1 0 13zM15.5 15.5L20 20', cal: 'M4 6h16v14H4zM4 10h16M8 3v4M16 3v4',
  swap: 'M7 8h12l-3-3M17 16H5l3 3', menu: 'M4 7h16M4 12h16M4 17h16', check: 'M5 12.5l4.2 4.2L19 7', share: 'M12 15V4M8 8l4-4 4 4M5 13v7h14v-7',
  bag: 'M6 8h12v12H6zM9 8V5h6v3', seat: 'M7 4v9h9l2 7M7 13l-2 7M10 4h0', globe: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM3.5 12h17M12 3c2.5 2.6 3.5 5.6 3.5 9s-1 6.4-3.5 9c-2.5-2.6-3.5-5.6-3.5-9s1-6.4 3.5-9z',
  wifi: 'M3 9a14 14 0 0 1 18 0M6 12.5a9 9 0 0 1 12 0M9 16a4 4 0 0 1 6 0M12 19.5h0', user: 'M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM4.5 20.5c1.2-3.6 4-5.5 7.5-5.5s6.3 1.9 7.5 5.5',
  home: 'M4 11l8-7 8 7v9H4z', trips: 'M4 7h16v13H4zM9 7V4h6v3', err: 'M12 21a9 9 0 1 1 0-18 9 9 0 0 1 0 18zM12 7.5v5.5M12 16.5h0',
  card: 'M3 6h18v12H3zM3 10h18', del: 'M9 6h11v12H9l-6-6zM12 9.5l5 5M17 9.5l-5 5', filter: 'M4.5 6h15M7.5 12h9M10.5 18h3',
}
export const Icon = ({ d, s = 24, c = 'currentColor', w = 1.8, style }: { d: keyof typeof P; s?: number; c?: string; w?: number; style?: CSSProperties }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block', ...style }}><path d={P[d]} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>

/** The aircraft glyph used between airport codes. */
const Plane = ({ s = 16, c = 'currentColor' }: { s?: number; c?: string }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block' }}><path fill={c} d="M21 16v-2l-8-5V3.5a1.5 1.5 0 0 0-3 0V9l-8 5v2l8-2.5V19l-2 1.5V22l3.5-1 3.5 1v-1.5L13 19v-5.5z" transform="rotate(90 12 12)" /></svg>

/* ───────── shell ───────── */
function StatusBar({ dark }: { dark?: boolean }) {
  const c = dark ? '#fff' : '#000'
  return (
    <div style={{ height: 44, position: 'relative', flex: 'none' }}>
      <span style={{ position: 'absolute', left: 32, top: 13, fontFamily: SF, fontSize: 17, fontWeight: 600, letterSpacing: -0.41, color: c }}>9:41</span>
      <svg width="68" height="12" viewBox="0 0 68 12" style={{ position: 'absolute', right: 20, top: 18 }} aria-hidden>
        {[0, 1, 2, 3].map(i => <rect key={i} x={i * 4.5} y={9 - i * 2.6} width="3" height={3 + i * 2.6} rx="0.7" fill={c} />)}
        <path d="M24 4.5a9 9 0 0 1 12 0M26.5 7.2a5 5 0 0 1 7 0M29 9.8a1.5 1.5 0 0 1 2 0" stroke={c} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <rect x="42" y="0.5" width="22" height="11" rx="3" stroke={c} strokeOpacity="0.4" fill="none" />
        <rect x="44" y="2.5" width="18" height="7" rx="1.6" fill={c} />
        <rect x="65" y="4" width="1.6" height="4" rx="0.8" fill={c} fillOpacity="0.45" />
      </svg>
    </div>
  )
}
const HomeIndicator = ({ dark }: { dark?: boolean }) => <div style={{ position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)', width: 134, height: 5, borderRadius: 3, background: dark ? '#fff' : '#000' }} />

export function Phone({ children, bg = C.light, dark, label }: { children: ReactNode; bg?: string; dark?: boolean; label: string }) {
  return (
    <div role="img" aria-label={label} style={{ width: 375, height: 812, background: bg, position: 'relative', overflow: 'hidden', fontFamily: FONT, color: dark ? '#fff' : C.ink, display: 'flex', flexDirection: 'column', borderRadius: 4 }}>
      {children}
      <HomeIndicator dark={dark} />
    </div>
  )
}

/** Header row under the status bar: back on the left, an action on the right. */
const Bar = ({ right, dark, left = 'back' }: { right?: ReactNode; dark?: boolean; left?: 'back' | 'menu' | 'none' }) => (
  <div style={{ height: 44, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px', flex: 'none' }}>
    {left === 'none' ? <span /> : <Icon d={left} s={28} c={left === 'back' ? (dark ? '#3FBF7A' : C.green) : dark ? '#fff' : C.ink} />}
    {right}
  </div>
)
const Action = ({ children, dark }: { children: ReactNode; dark?: boolean }) => <span style={{ ...T.body, fontWeight: 500, color: dark ? '#3FBF7A' : C.greenLink }}>{children}</span>

const Btn = ({ children, kind = 'primary', style, onClick }: { children: ReactNode; kind?: 'primary' | 'ghost' | 'disabled' | 'darkGhost'; style?: CSSProperties; onClick?: () => void }) => {
  const k = { primary: { background: C.green, color: '#fff' }, ghost: { background: 'transparent', color: C.green, border: `1px solid ${C.green}` }, disabled: { background: 'rgba(0,0,0,0.1)', color: C.ink30 }, darkGhost: { background: C.w20, color: '#fff', border: `1px solid ${C.w20}` } }[kind]
  return <button type="button" tabIndex={-1} onClick={onClick} style={{ width: '100%', height: 48, borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, border: 'none', cursor: onClick ? 'pointer' : 'default', fontFamily: FONT, ...T.btn, ...k, ...style }}>{children}</button>
}
const Tag = ({ children, bg = C.blue, fg = '#fff', style }: { children: ReactNode; bg?: string; fg?: string; style?: CSSProperties }) =>
  <span style={{ display: 'inline-flex', alignItems: 'center', padding: '2px 6px', borderRadius: 2, background: bg, color: fg, ...T.tag, ...style }}>{children}</span>
const Link = ({ children, dark }: { children: ReactNode; dark?: boolean }) => <span style={{ ...T.small, color: dark ? '#3FBF7A' : C.greenLink, textDecoration: 'underline', textUnderlineOffset: 3 }}>{children}</span>
const Title = ({ children, sub, dark, style }: { children: ReactNode; sub?: string; dark?: boolean; style?: CSSProperties }) => (
  <div style={{ padding: '20px 20px 24px', ...style }}>
    <p style={{ ...T.title, margin: 0 }}>{children}</p>
    {sub && <p style={{ ...T.body, margin: '8px 0 0', color: dark ? C.w70 : C.ink70 }}>{sub}</p>}
  </div>
)
const Divider = ({ dark, style }: { dark?: boolean; style?: CSSProperties }) => <div style={{ height: 1, background: dark ? C.darkLine : C.line, ...style }} />

function Toggle({ on: initial = false, dark }: { on?: boolean; dark?: boolean }) {
  const [on, set] = useState(initial)
  return <button type="button" tabIndex={-1} aria-pressed={on} onClick={() => set(!on)} style={{ width: 51, height: 31, borderRadius: 16, border: 'none', padding: 2, cursor: 'pointer', background: on ? C.green : dark ? 'rgba(120,120,128,0.32)' : 'rgba(120,120,128,0.16)', transition: 'background .2s' }}>
    <span style={{ display: 'block', width: 27, height: 27, borderRadius: 14, background: '#fff', boxShadow: '0 3px 8px rgba(0,0,0,.15)', transform: `translateX(${on ? 20 : 0}px)`, transition: 'transform .2s' }} />
  </button>
}

function Tabs({ items, dark }: { items: string[]; dark?: boolean }) {
  const [at, set] = useState(0)
  return (
    <div style={{ display: 'flex', gap: 20, padding: '0 20px', boxShadow: `inset 0 -1px 0 ${dark ? C.darkLine : C.line}`, flex: 'none' }}>
      {items.map((t, i) => (
        <button key={t} type="button" tabIndex={-1} onClick={() => set(i)} style={{ height: 48, background: 'none', border: 'none', padding: 0, cursor: 'pointer', fontFamily: FONT, ...T.body, fontWeight: i === at ? 500 : 400, color: i === at ? (dark ? '#fff' : C.ink) : dark ? C.w55 : C.ink55, boxShadow: i === at ? `inset 0 -2px 0 ${C.green}` : 'none' }}>{t}</button>
      ))}
    </div>
  )
}

function Segmented({ items, sub }: { items: string[]; sub?: string[] }) {
  const [at, set] = useState(1)
  return (
    <div style={{ display: 'flex', margin: '0 20px', padding: 2, borderRadius: 4, background: '#E6E6EB' }}>
      {items.map((t, i) => (
        <button key={t} type="button" tabIndex={-1} onClick={() => set(i)} style={{ flex: 1, height: 44, border: 'none', borderRadius: 2, cursor: 'pointer', fontFamily: FONT, background: i === at ? C.greenDark : 'transparent', color: i === at ? '#fff' : C.ink70, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...T.small, fontWeight: 500 }}>{t}</span>
          {sub && <span style={{ fontSize: 10, lineHeight: '12px', opacity: 0.75 }}>{sub[i]}</span>}
        </button>
      ))}
    </div>
  )
}

const Field = ({ label, value, dark, right, focus, style }: { label: string; value?: ReactNode; dark?: boolean; right?: ReactNode; focus?: boolean; style?: CSSProperties }) => (
  <div style={{ background: dark ? C.darkCard : '#fff', border: focus ? `2px solid ${C.green}` : `1px solid ${dark ? 'transparent' : C.line}`, borderRadius: 2, padding: '8px 12px', display: 'flex', alignItems: 'center', gap: 8, minHeight: 56, ...style }}>
    <div style={{ flex: 1, minWidth: 0 }}>
      <p style={{ margin: 0, fontSize: 12, lineHeight: '16px', color: dark ? C.w55 : C.ink55 }}>{label}</p>
      {value !== undefined && <p style={{ margin: '2px 0 0', ...T.body, color: dark ? '#fff' : C.ink }}>{value}</p>}
    </div>
    {right}
  </div>
)

/* ───────── QR (drawn, encodes nothing) ───────── */
function QR({ size = 132 }: { size?: number }) {
  const n = 25, cells: ReactNode[] = []
  let s = 7
  const rnd = () => { s = (s * 9301 + 49297) % 233280; return s / 233280 }
  const finder = (x: number, y: number) => x >= 0 && x < 7 && y >= 0 && y < 7
  for (let y = 0; y < n; y++) for (let x = 0; x < n; x++) {
    const inF = finder(x, y) || finder(x - (n - 7), y) || finder(x, y - (n - 7))
    if (inF) continue
    if (rnd() > 0.52) cells.push(<rect key={`${x}-${y}`} x={x} y={y} width="1.02" height="1.02" />)
  }
  const F = ({ x, y }: { x: number; y: number }) => <g><rect x={x} y={y} width="7" height="7" /><rect x={x + 1} y={y + 1} width="5" height="5" fill="#fff" /><rect x={x + 2} y={y + 2} width="3" height="3" /></g>
  return <svg width={size} height={size} viewBox={`0 0 ${n} ${n}`} aria-hidden shapeRendering="crispEdges">{cells}<F x={0} y={0} /><F x={n - 7} y={0} /><F x={0} y={n - 7} /></svg>
}

/** A soft, photo-free sky for the screens that carry a destination image in the original. */
const Sky = ({ h, children, deep }: { h: number; children?: ReactNode; deep?: boolean }) => (
  <div style={{ height: h, position: 'relative', flex: 'none', background: deep ? `linear-gradient(180deg, ${C.groundDeep} 0%, ${C.ground} 60%, #0B3A22 100%)` : 'linear-gradient(180deg, #0D2E1E 0%, #1E4A33 45%, #5E7F68 100%)' }}>
    <svg viewBox="0 0 375 120" preserveAspectRatio="none" style={{ position: 'absolute', left: 0, right: 0, bottom: 0, width: '100%', height: 120, opacity: 0.35 }} aria-hidden>
      <path d="M0 120V84l28-10 22 8 30-30 26 22 18-12 36 26 28-40 24 30 30-14 34 24 28-18 26 14 25-8v66z" fill="#04140C" />
    </svg>
    <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,0) 30%)' }} />
    {children}
  </div>
)

/* ═════════════════ screens ═════════════════ */

export function FaceIdScreen() {
  return (
    <Phone label="Sign in with Face ID">
      <StatusBar />
      <Bar left="none" right={<Action>Skip</Action>} />
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '56px 28px 0' }}>
        <svg width="56" height="56" viewBox="0 0 56 56" fill="none" stroke={C.green} strokeWidth="2.6" strokeLinecap="round" aria-hidden><path d="M4 16V8a4 4 0 0 1 4-4h8M40 4h8a4 4 0 0 1 4 4v8M52 40v8a4 4 0 0 1-4 4h-8M16 52H8a4 4 0 0 1-4-4v-8M19 20v5M37 20v5M28 20v11h-3M20 38c5 4 11 4 16 0" /></svg>
        <p style={{ ...T.title, fontSize: 28, margin: '36px 0 0' }}>Login with Face ID</p>
        <p style={{ ...T.small, color: C.ink70, margin: '12px 0 0' }}>Your biometric information is not collected and is used only on this device to verify it is you.</p>
      </div>
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 56 }}>
        <p style={{ ...T.small, color: C.ink55, textAlign: 'center', margin: '0 0 20px' }}>You can turn off this feature at any time from your account settings.</p>
        <Btn>Enable Face ID</Btn>
      </div>
    </Phone>
  )
}

export function HomeScreen() {
  return (
    <Phone label="Home, with the upcoming trip">
      <Sky h={340}>
        <div style={{ position: 'absolute', inset: 0, color: '#fff' }}>
          <StatusBar dark />
          <Bar dark left="menu" right={<Tag bg={C.green} style={{ ...T.small, fontWeight: 500, padding: '4px 8px' }}>Check-in</Tag>} />
          <div style={{ padding: '16px 20px 0' }}>
            <p style={{ ...T.title, fontSize: 36, lineHeight: '40px', margin: 0 }}>Hi, Alex.</p>
            <p style={{ ...T.small, margin: '6px 0 0', color: 'rgba(255,255,255,.9)' }}>You have 10,023 points</p>
            <div style={{ marginTop: 22, height: 48, background: '#fff', borderRadius: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', color: C.ink55, ...T.body }}>Where to? <Icon d="search" s={20} c={C.green} /></div>
          </div>
        </div>
      </Sky>
      <div style={{ margin: '-60px 20px 0', background: '#fff', borderRadius: 2, padding: 16, boxShadow: '0 8px 20px rgba(0,0,0,.08)', position: 'relative' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Tag>On time</Tag><Link>Boarding pass</Link></div>
        <p style={{ ...T.h2, margin: '10px 0 0', display: 'flex', alignItems: 'center', gap: 8 }}>AAA <Plane /> ZZZ</p>
        <p style={{ ...T.small, color: C.ink55, margin: '2px 0 12px' }}>Gate closes in 3h 55m</p>
        <Divider />
        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 12 }}>
          {[['Terminal', '4'], ['Gate', '37'], ['Departure', '22:45']].map(([k, v], i) => <div key={k} style={{ textAlign: i === 2 ? 'right' : 'left' }}><p style={{ ...T.tag, fontWeight: 400, color: C.ink55, margin: 0 }}>{k}</p><p style={{ ...T.body, fontWeight: 500, margin: '2px 0 0' }}>{v}</p></div>)}
        </div>
      </div>
      <p style={{ ...T.body, fontWeight: 500, margin: '28px 20px 12px' }}>Special offers</p>
      <div style={{ margin: '0 20px', height: 170, borderRadius: 2, background: 'linear-gradient(135deg, #2F7A4F 0%, #0E3B24 100%)', position: 'relative', overflow: 'hidden', color: '#fff' }}>
        <svg viewBox="0 0 120 60" style={{ position: 'absolute', right: -10, top: 10, width: 200, opacity: 0.25 }} aria-hidden><path d="M0 50c30-40 70-40 120-20" stroke="#fff" fill="none" strokeDasharray="3 4" /></svg>
        <div style={{ position: 'absolute', left: 14, top: 12 }}><Tag bg={C.yellow} fg="#000">New</Tag></div>
        <div style={{ position: 'absolute', left: 14, bottom: 14 }}><p style={{ ...T.h2, fontSize: 20, lineHeight: '24px', margin: 0 }}>Fly further this summer</p><p style={{ ...T.small, margin: '4px 0 0', opacity: 0.85 }}>Seasonal fares to 30 cities</p></div>
      </div>
      <TabBar at={0} />
    </Phone>
  )
}

function TabBar({ at }: { at: number }) {
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: 84, background: 'rgba(255,255,255,.96)', boxShadow: `inset 0 1px 0 ${C.line}`, display: 'flex', justifyContent: 'space-around', paddingTop: 8 }}>
      {([['home', 'Home'], ['trips', 'Trips'], ['user', 'Account']] as const).map(([d, l], i) => (
        <div key={l} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, color: i === at ? C.green : 'rgba(0,0,0,0.42)' }}><Icon d={d} s={24} /><span style={T.tab}>{l}</span></div>
      ))}
    </div>
  )
}

export function WhereToScreen() {
  const rows: [string, string, string][] = [['AAA', 'City A, Country', 'City A International Airport'], ['BBB', 'City B, Country', 'City B Airport'], ['CCC', 'City C, Country', 'City C International Airport']]
  const all: [string, string, string][] = [['DDD', 'City D, Country', 'City D Airport'], ['EEE', 'City E, Country', 'City E International Airport'], ['FFF', 'City F, Country', 'City F Airport'], ['ZZZ', 'City Z, Country', 'City Z International Airport']]
  const Row = ({ r, recent }: { r: [string, string, string]; recent?: boolean }) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '8px 20px' }}>
      <span style={{ width: 40, height: 40, borderRadius: 2, background: C.greenTint, color: C.greenTintText, display: 'grid', placeItems: 'center', ...T.small, fontWeight: 500 }}>{r[0]}</span>
      <div style={{ flex: 1 }}><p style={{ ...T.small, fontSize: 15, margin: 0 }}><b style={{ fontWeight: 500 }}>{r[1].split(',')[0]}</b>,{r[1].split(',')[1]}</p><p style={{ fontSize: 11, lineHeight: '15px', color: C.ink55, margin: '1px 0 0' }}>{r[2]}</p></div>
      {recent && <Icon d="search" s={20} c={C.ink30} />}
    </div>
  )
  return (
    <Phone label="Where to? Choose a destination">
      <StatusBar /><Bar />
      <Title style={{ paddingBottom: 12 }}>Where to?</Title>
      <div style={{ margin: '0 20px 20px', height: 36, borderRadius: 2, background: 'rgba(118,118,128,0.12)', display: 'flex', alignItems: 'center', gap: 8, padding: '0 10px', color: C.ink55, ...T.small }}><Icon d="search" s={16} c={C.ink55} /> City, country or airport</div>
      <p style={{ ...T.small, color: C.ink55, margin: '0 20px 6px' }}>Recent</p>
      {rows.map(r => <Row key={r[0]} r={r} recent />)}
      <p style={{ ...T.small, color: C.ink55, margin: '14px 20px 6px' }}>All destinations</p>
      {all.map(r => <Row key={r[0]} r={r} />)}
    </Phone>
  )
}

export function BookFlightScreen() {
  return (
    <Phone label="Book a flight" bg={C.dark} dark>
      <StatusBar dark />
      <Bar dark right={<Action dark>Add promo code</Action>} />
      <Title dark style={{ paddingBottom: 16 }}>Book a flight</Title>
      <Tabs dark items={['Round trip', 'One way', 'Multi city']} />
      <div style={{ padding: '20px 20px 0', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ display: 'flex', gap: 12, position: 'relative' }}>
          {[['From', 'AAA', 'City A'], ['To', 'ZZZ', 'City Z']].map(([k, c, n]) => (
            <div key={k} style={{ flex: 1, background: C.darkCard, borderRadius: 2, padding: '12px 0', textAlign: 'center' }}>
              <p style={{ fontSize: 12, lineHeight: '16px', color: C.w55, margin: 0 }}>{k}</p>
              <p style={{ ...T.h2, margin: '2px 0 0' }}>{c}</p>
              <p style={{ fontSize: 12, lineHeight: '16px', color: C.w55, margin: '2px 0 0' }}>{n}</p>
            </div>
          ))}
          <span style={{ position: 'absolute', left: '50%', top: '50%', transform: 'translate(-50%,-50%)', width: 36, height: 36, borderRadius: 18, background: C.dark, border: `1px solid ${C.darkLine}`, display: 'grid', placeItems: 'center' }}><Icon d="swap" s={18} c="#3FBF7A" /></span>
        </div>
        <Field dark label="Travel dates" value="Tue, 24 Aug to Fri, 5 Sep" right={<Icon d="cal" s={22} c="#3FBF7A" />} />
        <Field dark label="Passengers and class" value="1 Passenger, Economy" right={<Icon d="down" s={20} c={C.w70} />} />
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 34, padding: '0 20px' }}>
        <Divider dark style={{ margin: '0 -20px 16px' }} />
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}><span style={T.small}>Book with miles</span><Toggle dark /></div>
        <Btn><Icon d="search" s={20} c="#fff" />Search flights</Btn>
      </div>
    </Phone>
  )
}

export function ResultsScreen() {
  const flights = [
    { tag: 'Lowest price', dep: '06:30', arr: '09:50', note: '3h 15m · Non-stop', price: '700' },
    { dep: '22:40', arr: '02:35', plus: true, note: '17h 30m · 1 stop', price: '1,050' },
    { dep: '10:20', arr: '13:40', note: '3h 20m · Non-stop', price: '820' },
  ]
  return (
    <Phone label="Flight results">
      <div style={{ background: '#fff' }}>
        <StatusBar /><Bar right={<Tag bg={C.green} style={{ ...T.small, fontWeight: 500, padding: '4px 8px' }}>Login</Tag>} />
        <div style={{ textAlign: 'center', padding: '12px 0 16px' }}><p style={{ ...T.small, color: C.ink70, margin: 0 }}>Departing flight</p><p style={{ ...T.title, fontSize: 30, margin: '6px 0 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10 }}>AAA <Icon d="fwd" s={22} c={C.ink} w={2.2} /> ZZZ</p></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 12px', boxShadow: `inset 0 1px 0 ${C.line}` }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: C.green }}><Icon d="back" s={16} /><span><span style={{ ...T.small, display: 'block' }}>24 Aug</span><span style={{ fontSize: 10, color: C.ink55 }}>No flights</span></span></span>
          <span style={{ ...T.small, fontWeight: 500 }}>Tomorrow, 25 Aug</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: 2, color: C.green, textAlign: 'right' }}><span><span style={{ ...T.small, display: 'block' }}>26 Aug</span><span style={{ fontSize: 10, color: C.ink55 }}>USD 640</span></span><Icon d="fwd" s={16} /></span>
        </div>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, paddingTop: 8 }}>
        {flights.map(f => (
          <div key={f.dep} style={{ background: '#fff', padding: 16 }}>
            {f.tag && <Tag style={{ marginBottom: 8 }}>{f.tag}</Tag>}
            <p style={{ ...T.btn, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>{f.dep} <Plane s={14} /> {f.arr} {f.plus && <Tag bg={C.yellow} fg="#000">+1 Day</Tag>}</p>
            <p style={{ ...T.small, color: C.ink70, margin: '4px 0 0' }}>City A to City Z</p>
            <p style={{ ...T.small, color: f.plus ? C.red : C.ink55, margin: 0 }}>{f.note}</p>
            <Divider style={{ margin: '12px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Link>Flight details</Link><span style={{ display: 'flex', alignItems: 'baseline', gap: 4 }}><span style={{ ...T.small, color: C.ink55 }}>from USD</span><span style={{ ...T.h2, fontSize: 20 }}>{f.price}</span><Icon d="fwd" s={16} style={{ alignSelf: 'center' }} /></span></div>
          </div>
        ))}
      </div>
      <span style={{ position: 'absolute', left: '50%', bottom: 48, transform: 'translateX(-50%)', display: 'flex', alignItems: 'center', gap: 8, background: '#161624', color: '#fff', padding: '10px 16px', borderRadius: 2, ...T.small, fontWeight: 500 }}><Icon d="filter" s={18} c="#fff" />Filter · Sort</span>
    </Phone>
  )
}

export function FaresScreen() {
  const rows: [string, string][] = [['Baggage', '1 × 32 kg'], ['Flight change fee', 'USD 275'], ['Cancellation fee', 'USD 500'], ['No-show fee', 'USD 200'], ['Miles earned', '+2,357'], ['Lounge access', 'Included']]
  return (
    <Phone label="Select fares">
      <div style={{ background: '#fff', paddingBottom: 10 }}>
        <StatusBar />
        <div style={{ height: 44, display: 'flex', alignItems: 'center', padding: '0 16px', position: 'relative' }}><Icon d="back" s={28} c={C.green} /><span style={{ position: 'absolute', left: 0, right: 0, textAlign: 'center', ...T.body, fontWeight: 500, pointerEvents: 'none' }}>Select fares</span></div>
        <Segmented items={['Economy', 'Business', 'First']} sub={['USD 999', 'USD 5,500', 'USD 9,999']} />
      </div>
      <div style={{ padding: '8px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        <div style={{ background: '#fff', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><p style={{ ...T.body, color: C.ink70, margin: 0 }}>Business Semi-Flex</p><p style={{ ...T.h2, margin: '2px 0 0' }}>USD 5,500</p></div><span style={{ width: 24, height: 24, borderRadius: 12, background: C.green, display: 'grid', placeItems: 'center' }}><Icon d="check" s={16} c="#fff" w={2.4} /></span></div>
          <Divider style={{ margin: '14px 0 6px' }} />
          {rows.map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', padding: '6px 0', ...T.small }}><span style={{ color: C.ink70 }}>{k}</span><span>{v}</span></div>)}
        </div>
        <div style={{ background: '#fff', padding: 16 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><div><p style={{ ...T.body, color: C.ink70, margin: 0 }}>Business Flex</p><p style={{ ...T.h2, margin: '2px 0 0' }}>USD 5,950</p></div><span style={{ width: 24, height: 24, borderRadius: 12, border: `1.5px solid ${C.ink30}` }} /></div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 16 }}><span style={{ ...T.small, color: C.ink55 }}>Free changes, full refund</span><Btn style={{ height: 40, padding: '0 20px', fontSize: 16 }}>Confirm</Btn></div>
        </div>
      </div>
    </Phone>
  )
}

export function SeatScreen() {
  const taken = new Set(['27C', '28A', '28B', '29H', '30D', '30E', '31J', '32A', '33F'])
  const [mine, setMine] = useState('29E')
  const cols = [['A', 'B', 'C'], ['D', 'E', 'F'], ['G', 'H', 'J']]
  return (
    <Phone label="Seat map, with a seat chosen">
      <div style={{ background: '#fff' }}>
        <StatusBar />
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}><span style={{ width: 52 }} /><span style={{ textAlign: 'center' }}><span style={{ ...T.body, fontWeight: 500, display: 'block' }}>City A → City Z</span><span style={{ fontSize: 11, color: C.ink55 }}>Wide-body, 9 abreast</span></span><Action>Cancel</Action></div>
        <div style={{ display: 'flex', gap: 8, padding: '6px 12px 10px', overflow: 'hidden' }}>
          {[['Standard', 'Free', '#fff'], ['Comfort', 'USD 99', '#E5EEF8'], ['Extra legroom', 'USD 149', C.greenTint]].map(([n, p, bg]) => (
            <span key={n} style={{ flex: 'none', display: 'flex', alignItems: 'center', gap: 6, border: `1px solid ${C.line}`, borderRadius: 2, padding: '4px 8px' }}><span style={{ width: 14, height: 14, borderRadius: 3, border: `1.5px solid ${C.green}`, background: bg }} /><span><span style={{ fontSize: 11, fontWeight: 500, display: 'block' }}>{n}</span><span style={{ fontSize: 10, color: C.ink55 }}>{p}</span></span></span>
          ))}
        </div>
      </div>
      <div style={{ padding: '14px 14px 0', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {Array.from({ length: 8 }, (_, r) => 26 + r).map(row => (
          <div key={row} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            {cols.map((g, gi) => (
              <div key={gi} style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
                {gi === 1 && <span style={{ width: 16, fontSize: 10, color: C.ink55, textAlign: 'center', marginRight: 2 }}>{row}</span>}
                {g.map(col => {
                  const id = `${row}${col}`, t = taken.has(id), m = id === mine, comfort = row === 26
                  return <button key={col} type="button" tabIndex={-1} onClick={() => !t && setMine(id)} aria-label={`Seat ${id}`}
                    style={{ width: 30, height: 32, borderRadius: '6px 6px 3px 3px', border: t ? 'none' : `1.5px solid ${C.green}`, background: m ? C.ground : t ? '#DADADF' : comfort ? '#E5EEF8' : C.greenTint, color: m ? '#fff' : C.ink30, display: 'grid', placeItems: 'center', fontSize: 11, fontWeight: 600, cursor: t ? 'default' : 'pointer', padding: 0 }}>
                    {m ? 'P1' : t ? '×' : ''}
                  </button>
                })}
                {gi === 1 && <span style={{ width: 16, fontSize: 10, color: C.ink55, textAlign: 'center', marginLeft: 2 }}>{row}</span>}
              </div>
            ))}
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, background: '#fff', boxShadow: `inset 0 1px 0 ${C.line}`, padding: '12px 20px 34px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}><Icon d="back" s={18} c={C.ink30} /><span style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ background: C.ground, color: '#fff', borderRadius: 2, fontSize: 11, padding: '2px 5px', fontWeight: 600 }}>P1</span><span><span style={{ ...T.small, fontWeight: 500, display: 'block' }}>Maya Hart</span><span style={{ fontSize: 11, color: C.ink55 }}>{mine}, Standard · USD 0</span></span></span><Icon d="fwd" s={18} c={C.green} /></div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}><span><span style={{ fontSize: 11, color: C.ink55, display: 'block' }}>Subtotal</span><span style={{ ...T.body, fontWeight: 500 }}>USD 0.00</span></span><Btn style={{ width: 150 }}>Add 1 seat</Btn></div>
      </div>
    </Phone>
  )
}

export function PassengerFormScreen() {
  const keys = [['1', ''], ['2', 'ABC'], ['3', 'DEF'], ['4', 'GHI'], ['5', 'JKL'], ['6', 'MNO'], ['7', 'PQRS'], ['8', 'TUV'], ['9', 'WXYZ']]
  return (
    <Phone label="Passenger details, typing a date of birth" bg="#D1D3D9">
      <StatusBar />
      <div style={{ background: '#fff', borderRadius: '10px 10px 0 0', flex: 1, display: 'flex', flexDirection: 'column', marginTop: 6 }}>
        <div style={{ height: 52, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 16px' }}><Action>Cancel</Action><Action>Done</Action></div>
        <Title sub="Fill in your details as shown on your passport." style={{ paddingTop: 8, paddingBottom: 20 }}>Maya Hart</Title>
        <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', gap: 12 }}><Field label="Title" value="Ms." right={<Icon d="down" s={18} c={C.ink55} />} style={{ width: 92 }} /><Field label="First name" value="Maya" style={{ flex: 1 }} /></div>
          <Field focus label="Date of birth" value={<span>03<span style={{ display: 'inline-block', width: 1.5, height: 18, background: C.green, verticalAlign: -3, margin: '0 1px' }} /><span style={{ color: C.ink30 }}> / MM / YYYY</span></span>} right={<Icon d="cal" s={22} c={C.green} />} />
          <Field label="Nationality" right={<Icon d="down" s={18} c={C.ink55} />} style={{ background: '#F0F0F2', border: 'none' }} />
        </div>
        <div style={{ marginTop: 'auto', background: '#D1D3D9', padding: '6px 6px 40px' }}>
          <div style={{ textAlign: 'right', padding: '6px 10px 10px' }}><Action>Next</Action></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
            {keys.map(([n, l]) => <div key={n} style={{ height: 46, background: '#fff', borderRadius: 5, boxShadow: '0 1px 0 rgba(0,0,0,.3)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}><span style={{ fontSize: 24, lineHeight: '26px' }}>{n}</span>{l && <span style={{ fontSize: 9, letterSpacing: 2, fontWeight: 600 }}>{l}</span>}</div>)}
            <span />
            <div style={{ height: 46, background: '#fff', borderRadius: 5, boxShadow: '0 1px 0 rgba(0,0,0,.3)', display: 'grid', placeItems: 'center', fontSize: 24 }}>0</div>
            <div style={{ display: 'grid', placeItems: 'center' }}><Icon d="del" s={24} c={C.ink} w={1.5} /></div>
          </div>
        </div>
      </div>
    </Phone>
  )
}

/** From Figma frame "A4.1d.3 Passenger Missing Details" (7:64122), recoloured to the green rebrand. */
export function MissingDetailsScreen() {
  const ppl: [string, boolean][] = [['Sam Rivera', false], ['Noor Rivera', false], ['Maya Hart', true]]
  return (
    <Phone label="Passengers with missing details" bg="#fff">
      <StatusBar /><Bar right={<Action>Add it later</Action>} />
      <div style={{ padding: '32px 20px 40px' }}><p style={{ ...T.title, margin: 0 }}>Passengers</p><p style={{ ...T.body, color: C.ink70, margin: '8px 0 0' }}>2 passengers have missing information that is required to check in.</p></div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {ppl.map(([n, ok]) => (
          <div key={n} style={{ border: `1px solid ${C.line}`, borderRadius: 2, padding: 16, display: 'flex', gap: 16 }}>
            <div style={{ flex: 1 }}>
              <p style={{ ...T.body, fontWeight: 500, margin: 0 }}>{n}</p>
              <p style={{ ...T.small, margin: '4px 0 0', color: ok ? C.ok : C.red, display: 'flex', alignItems: 'center', gap: 4 }}>{ok ? <Icon d="check" s={16} c={C.ok} w={2.4} /> : <Icon d="err" s={16} c={C.red} />}{ok ? 'Completed' : 'Information missing'}</p>
            </div>
            <span style={{ ...T.body, color: C.greenLink, textDecoration: 'underline', textUnderlineOffset: 3 }}>{ok ? 'Edit' : 'Add'}</span>
          </div>
        ))}
      </div>
      <div style={{ position: 'absolute', left: 20, right: 20, top: 716 }}><Btn kind="disabled">Complete check-in</Btn></div>
    </Phone>
  )
}

export function AddOnsScreen() {
  const items: [keyof typeof P, string, string, boolean][] = [['bag', 'Extra baggage', 'From USD 45 per bag', false], ['seat', 'Seat selection', '1 seat added', true], ['globe', 'Transit eVisa', 'Apply in 3 steps', false], ['wifi', 'Wi-Fi vouchers', 'Stay connected on board', false]]
  return (
    <Phone label="Add-ons">
      <StatusBar /><Bar />
      <Title sub="This step is optional." style={{ paddingTop: 12 }}>Add-ons</Title>
      <div style={{ margin: '0 20px', background: '#fff', borderRadius: 2 }}>
        {items.map(([d, t, s, on], i) => (
          <div key={t} style={{ display: 'flex', alignItems: 'center', gap: 14, padding: 16, boxShadow: i ? `inset 0 1px 0 ${C.line}` : 'none' }}>
            <Icon d={d} s={24} c={C.green} />
            <div style={{ flex: 1 }}><p style={{ ...T.body, fontWeight: 500, margin: 0 }}>{t}</p><p style={{ ...T.small, color: on ? C.ok : C.ink55, margin: '2px 0 0' }}>{s}</p></div>
            {on ? <span style={{ width: 22, height: 22, borderRadius: 11, background: C.green, display: 'grid', placeItems: 'center' }}><Icon d="check" s={14} c="#fff" w={2.6} /></span> : <Icon d="fwd" s={20} c={C.ink30} />}
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', margin: '24px 20px 0', ...T.body }}><span style={{ color: C.ink70 }}>Trip total</span><span style={{ fontWeight: 500 }}>USD 5,500.00</span></div>
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 40 }}><Btn>Continue to payment</Btn></div>
    </Phone>
  )
}

export function ReviewPayScreen() {
  return (
    <Phone label="Review and pay">
      <Sky h={190}><div style={{ position: 'absolute', inset: 0, color: '#fff' }}><StatusBar dark /><Bar dark /><div style={{ padding: '6px 20px' }}><p style={{ ...T.title, margin: 0 }}>Review &amp; Pay</p><p style={{ ...T.small, margin: '4px 0 0', color: C.w70 }}>Roundtrip to City Z</p></div></div></Sky>
      <div style={{ padding: '16px 20px 0', display: 'flex', flexDirection: 'column', gap: 10 }}>
        <div style={{ background: '#fff', padding: 14, borderRadius: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ ...T.body, fontWeight: 500 }}>Flights</span><Link>View</Link></div>
          {[['Mon, Aug 24 · 18:55', 'City A to City Z · Non-stop'], ['Fri, Sep 3 · 06:40', 'City Z to City A · Non-stop']].map(([a, b]) => <div key={a} style={{ marginTop: 10, display: 'flex', gap: 10 }}><Plane s={16} c={C.green} /><span><span style={{ ...T.small, fontWeight: 500, display: 'block' }}>{a}</span><span style={{ fontSize: 12, color: C.ink55 }}>{b}</span></span></div>)}
        </div>
        <div style={{ background: '#fff', padding: 14, borderRadius: 2 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}><span style={{ ...T.body, fontWeight: 500 }}>4 Passengers</span><Link>Edit</Link></div>
          {['Maya Hart', 'Sam Rivera', 'Noor Rivera', 'Leo Rivera (infant)'].map(n => <p key={n} style={{ ...T.small, color: C.ink70, margin: '6px 0 0' }}>{n}</p>)}
        </div>
        <div style={{ background: '#fff', padding: 14, borderRadius: 2 }}>
          <p style={{ ...T.body, fontWeight: 500, margin: '0 0 6px' }}>Total fare</p>
          {[['Flights', 'USD 5,000.00'], ['Add-ons', 'USD 500.00'], ['Promo code', '−USD 0.00']].map(([k, v]) => <div key={k} style={{ display: 'flex', justifyContent: 'space-between', ...T.small, padding: '3px 0' }}><span style={{ color: C.ink70 }}>{k}</span><span>{v}</span></div>)}
          <Divider style={{ margin: '8px 0' }} />
          <div style={{ display: 'flex', justifyContent: 'space-between', ...T.body, fontWeight: 500 }}><span>Amount to pay</span><span>USD 5,500.00</span></div>
        </div>
        <div style={{ background: '#fff', padding: '4px 14px', borderRadius: 2 }}>
          {[['Card ending 4242', true], ['Pay later, hold for 24 h', false]].map(([k, on]) => <div key={String(k)} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', ...T.small }}><span style={{ width: 18, height: 18, borderRadius: 9, border: `1.5px solid ${on ? C.green : C.ink30}`, display: 'grid', placeItems: 'center' }}>{on && <span style={{ width: 9, height: 9, borderRadius: 5, background: C.green }} />}</span><Icon d="card" s={18} c={C.ink55} />{k}</div>)}
        </div>
      </div>
      <div style={{ position: 'absolute', left: 20, right: 20, bottom: 36 }}><Btn>Pay USD 5,500.00</Btn></div>
    </Phone>
  )
}

export function ConfirmedScreen() {
  return (
    <Phone label="Trip confirmed" bg={C.ground} dark>
      <Sky h={812} deep>
        <div style={{ position: 'absolute', inset: 0, color: '#fff', display: 'flex', flexDirection: 'column' }}>
          <StatusBar dark /><Bar dark left="none" right={<Icon d="share" s={24} c="#3FBF7A" />} />
          <div style={{ textAlign: 'center', padding: '56px 28px 0' }}>
            <Icon d="check" s={56} c="#3FBF7A" w={2} style={{ margin: '0 auto' }} />
            <p style={{ ...T.title, margin: '18px 0 0' }}>Trip to City Z confirmed</p>
            <p style={{ ...T.small, color: C.w70, margin: '10px 0 0' }}>A confirmation email was sent to maya.hart@example.com</p>
          </div>
          <div style={{ margin: '40px 20px 0', borderTop: `1px solid ${C.darkLine}` }}>
            {[['Roundtrip', '24 Aug to 5 Sep', 'Add to calendar'], ['Booking reference', 'K7Q2XM', 'Copy']].map(([k, v, a]) => <div key={k} style={{ padding: '14px 0', borderBottom: `1px solid ${C.darkLine}`, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}><span><span style={{ fontSize: 12, color: C.w55, display: 'block' }}>{k}</span><span style={{ ...T.body, fontWeight: 500 }}>{v}</span></span><Link dark>{a}</Link></div>)}
          </div>
          <div style={{ marginTop: 'auto', padding: '0 20px 40px' }}><Btn>Done</Btn></div>
        </div>
      </Sky>
    </Phone>
  )
}

export function BoardingPassScreen() {
  return (
    <Phone label="Boarding pass">
      <Sky h={250}><div style={{ position: 'absolute', inset: 0, color: '#fff', textAlign: 'center' }}><StatusBar dark /><Bar dark right={<span style={{ ...T.btn, color: '#fff' }}>···</span>} /><Tag bg="rgba(255,255,255,.18)" style={{ marginTop: 4 }}>XY 1580</Tag><p style={{ ...T.title, margin: '8px 0 0' }}>Trip to City Z</p><p style={{ ...T.small, color: C.w70, margin: '4px 0 0' }}>06 Sep</p></div></Sky>
      <div style={{ margin: '-60px 16px 0', background: '#fff', borderRadius: 4, overflow: 'hidden', boxShadow: '0 10px 24px rgba(0,0,0,.12)', position: 'relative' }}>
        <div style={{ height: 32, background: C.green, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', color: '#fff' }}><span style={{ ...T.tag }}>Boarding pass</span><span style={{ ...T.btn, lineHeight: '10px' }}>···</span></div>
        <div style={{ padding: 14 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><p style={{ ...T.h2, margin: 0, display: 'flex', alignItems: 'center', gap: 6 }}>AAA <Plane /> ZZZ</p><Tag>On time</Tag></div>
          <p style={{ fontSize: 12, color: C.ink55, margin: '2px 0 10px' }}>XY 1580 · <Link>Flight details</Link></p>
          <Divider />
          <p style={{ ...T.small, fontWeight: 500, margin: '10px 0 6px' }}>Ms. Maya Hart</p>
          <div style={{ display: 'flex', gap: 4 }}><Tag bg={C.green}>Economy</Tag><Tag bg="#fff" fg={C.ink} style={{ border: `1px solid ${C.ink30}` }}>Fast Track</Tag></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', rowGap: 8, marginTop: 12 }}>
            {[['Boarding', '21:00'], ['Gate closes', '21:25'], ['', ''], ['Departure', '21:45'], ['Terminal', '2'], ['Gate', '17'], ['Zone', 'B'], ['Seat', '35A']].map(([k, v], i) => <div key={i} style={{ textAlign: i % 4 === 3 ? 'right' : 'left' }}><p style={{ fontSize: 11, color: C.ink55, margin: 0 }}>{k}</p><p style={{ ...T.small, fontWeight: 500, margin: 0 }}>{v}</p></div>)}
          </div>
          <div style={{ display: 'grid', placeItems: 'center', margin: '14px 0 10px' }}><QR size={150} /></div>
          <div style={{ height: 40, background: '#000', color: '#fff', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, ...T.small, fontWeight: 500 }}><span style={{ width: 22, height: 15, borderRadius: 2, background: 'linear-gradient(180deg,#5CC1A4 0 33%,#F6C84B 33% 66%,#E9675C 66%)' }} />Add to Wallet</div>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', gap: 5, margin: '10px 0' }}>{[0, 1, 2, 3].map(i => <span key={i} style={{ width: 5, height: 5, borderRadius: 3, background: i ? C.ink30 : C.ink }} />)}</div>
    </Phone>
  )
}

export function SplashScreen() {
  return (
    <Phone label="Welcome" bg={C.ground} dark>
      <Sky h={812} deep>
        <div style={{ position: 'absolute', inset: 0, color: '#fff', display: 'flex', flexDirection: 'column' }}>
          <StatusBar dark />
          <div style={{ margin: '40px auto 0', width: 250, height: 330, borderRadius: 125, border: '14px solid #0F3D27', background: 'radial-gradient(circle at 50% 35%, #2F7A4F, #0B3A22 70%)', boxShadow: 'inset 0 0 30px rgba(0,0,0,.5)' }} />
          <div style={{ textAlign: 'center', padding: '32px 28px 0' }}>
            <p style={{ ...T.title, margin: 0 }}>Welcome aboard</p>
            <p style={{ ...T.small, color: C.w70, margin: '10px 0 0' }}>Plan, book and manage every trip in one place, from the first search to the flight home.</p>
          </div>
          <div style={{ marginTop: 'auto', padding: '0 20px 48px', display: 'flex', gap: 12 }}><Btn style={{ flex: 1 }}>Login</Btn><Btn kind="darkGhost" style={{ flex: 1 }}>Create account</Btn></div>
        </div>
      </Sky>
    </Phone>
  )
}

export const SCREENS = {
  faceid: FaceIdScreen, home: HomeScreen, where: WhereToScreen, book: BookFlightScreen, results: ResultsScreen, fares: FaresScreen,
  seat: SeatScreen, passenger: PassengerFormScreen, missing: MissingDetailsScreen, addons: AddOnsScreen, review: ReviewPayScreen,
  confirmed: ConfirmedScreen, pass: BoardingPassScreen, splash: SplashScreen,
}
export type ScreenId = keyof typeof SCREENS
