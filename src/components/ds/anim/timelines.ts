// Beat timelines for the animated thumbnails. Each beat sets the UI state (a scene + parameters), where the camera looks
// (cx, cy on a 1280 x 800 canvas, plus zoom), an optional 3D turn, and where the cursor is. Loops stay under 10 seconds.

export type Scene = 'agentic' | 'fly' | 'split' | 'agRead' | 'agFlow' | 'agTable' | 'search' | 'engaze' | 'travel' | 'data' | 'options' | 'dnm'
export interface Beat {
  at: number
  k?: Scene
  s?: Record<string, unknown>
  cam?: [number, number, number]
  tilt?: [number, number]
  /** Cursor position; `null` hides it. `click` plays a tap ripple on arrival. */
  cur?: [number, number] | null
  click?: boolean
  /** Camera transition length in ms. */
  ms?: number
  /** Swap the picture without a cross-fade (for frame-by-frame motion such as scrolling). */
  snap?: boolean
  /** CSS easing for this camera move (default ease-in-out). Use 'linear' to chain moves into one continuous glide. */
  ease?: string
}
export interface Timeline { stage: string; /** Canvas size, default 1280 x 800. */ size?: [number, number]; /** Cross-fade between pictures in ms (default 140). */ fade?: number; duration: number; beats: Beat[]; /** Slows the whole loop down (1 = as authored). */ speed?: number; /** Soft drifting colour behind the UI, for stages with empty margins. */ drift?: string[] }

const typing = (text: string, from: number, step: number, base: Record<string, unknown>, extra: Partial<Beat> = {}): Beat[] =>
  Array.from({ length: text.length }, (_, i) => ({ at: from + i * step, s: { ...base, typed: text.slice(0, i + 1) }, ...extra }))

/** Carry the previous beat's scene and state forward, so a beat only states what changes. */
export function resolve(beats: Beat[]): Beat[] {
  let k: Scene = beats[0].k ?? 'agentic'
  let cam: [number, number, number] = beats[0].cam ?? [640, 400, 1]
  let tilt: [number, number] = [0, 0]
  let cur: [number, number] | null = null
  let s: Record<string, unknown> = {}
  return beats.map(b => {
    if (b.k && b.k !== k) { k = b.k; s = {} }
    if (b.s) s = b.s
    if (b.cam) cam = b.cam
    tilt = b.tilt ?? (b.cam || b.k ? [0, 0] : tilt)
    if (b.cur !== undefined) cur = b.cur
    return { ...b, k, s, cam, tilt, cur }
  })
}

const SUG = ['PO 4500012345 — ACME Office Supplies', 'PR 7800098765 — IT Equipment Request', 'Contract CNT-2026-001 — Facilities Mgmt', 'Invoice INV-884521 — Accenture Services', 'GR 5500045321 — Electronics Delivery']
const dd = (typed: string, pick?: number) => ({ focus: true, lit: true, typed, dd: true, ddHead: 'SUGGESTIONS', ddItems: SUG, pick })

export const timelines: Record<string, Timeline> = {
  /* The order-confirmation flow: the camera follows the work from inbox to close; lime = agent, indigo ring = a person decides. */
  agentic: { stage: '#0F1013', size: [2560, 800], fade: 450, duration: 21500, beats: [
    { at: 0, k: 'agFlow', s: { step: -1 }, cam: [1280, 400, 0.5], ms: 0 },
    { at: 1800, cam: [430, 300, 1.4], ms: 2800 },
    { at: 3400, s: { step: 0 } },
    { at: 4600, cam: [720, 360, 1.4], ms: 2400, ease: 'linear' },
    { at: 5200, s: { step: 1 } }, { at: 6000, s: { step: 2 } }, { at: 6800, s: { step: 3 } },
    { at: 7000, cam: [1150, 380, 1.4], ms: 2600, ease: 'linear' },
    { at: 8200, s: { step: 4 } },
    { at: 9600, cam: [1700, 500, 1.35], ms: 2600, ease: 'linear' },
    { at: 10600, s: { step: 5 } },
    { at: 12200, cam: [2060, 420, 1.35], ms: 2400, ease: 'linear' },
    { at: 12800, s: { step: 6 } }, { at: 13800, s: { step: 7 } },
    { at: 14600, cam: [2380, 300, 1.4], ms: 2000, ease: 'linear' },
    { at: 15600, s: { step: 8 } },
    { at: 17000, s: { step: 8, end: true }, cam: [1280, 400, 0.5], ms: 2600 },
  ] },
  agenticDemo: { stage: '#DDE3EA', duration: 14200, beats: [
    ...[0, 100, 200, 260, 350, 420, 500, 600].map((sc, i): Beat => ({ at: i * 300, k: 'agRead', s: { scan: sc, found: [106, 156, 206, 256, 346, 396, 494].filter(v => v < sc).length, bars: 0 }, ...(i === 0 ? { cam: [320, 300, 1.5] as [number, number, number], ms: 0 } : { snap: true }) })),
    { at: 2700, s: { bars: 0, found: 7 }, cam: [900, 300, 1.4], ms: 1000 },
    ...[0.14, 0.28, 0.43, 0.57, 0.71, 0.86, 1].map((b, i): Beat => ({ at: 3300 + i * 330, s: { bars: b, found: 7, done: b === 1 }, snap: true })),
    { at: 5800, k: 'agTable', s: { step: 2, res: [] }, cam: [330, 440, 1.55], ms: 0 },
    { at: 6000, cam: [880, 440, 1.55], ms: 2000 },
    ...[0, 1, 2, 3, 4, 5].flatMap((i): Beat[] => {
      const pick = ['reject', 'reject', 'accept', 'accept', 'reject', 'accept'][i], t0 = 8300 + i * 760, y = 367 + 56 * i
      const res = (n: number) => ['reject', 'reject', 'accept', 'accept', 'reject', 'accept'].slice(0, n)
      return [
        { at: t0, s: { step: 2, res: res(i), hot: i }, cam: [1000, 400 + i * 28, 1.6], cur: [1125, y], ms: 550 },
        { at: t0 + 230, s: { step: 2, res: res(i), open: i, hl: pick }, click: true },
        { at: t0 + 520, s: { step: 2, res: res(i), open: i, hl: pick }, cur: [1110, y + 40 + (pick === 'accept' ? 26 : 70)], ms: 220 },
        { at: t0 + 680, s: { step: 2, res: res(i + 1) }, click: true },
      ]
    }),
    { at: 12950, s: { step: 2, res: ['reject', 'reject', 'accept', 'accept', 'reject', 'accept'] }, cam: [900, 640, 1.5], cur: [1140, 749], ms: 800 },
    { at: 13650, s: { step: 2, res: ['reject', 'reject', 'accept', 'accept', 'reject', 'accept'], press: true }, click: true },
    { at: 13950, s: { step: 4, res: ['reject', 'reject', 'accept', 'accept', 'reject', 'accept'], toast: true }, cam: [640, 400, 1], cur: null, ms: 800 },
  ] },
  search: { stage: '#04050B', duration: 13400, beats: [
    { at: 0, k: 'search', s: { bare: true }, cam: [640, 400, 1.55], ms: 0 },
    { at: 800, cur: [940, 560], ms: 0 },
    { at: 1000, cur: [650, 400], ms: 900 },
    { at: 2100, s: { bare: true, focus: true, lit: true }, click: true },
    ...typing('purchase', 2800, 170, { bare: true, focus: true, lit: true, dd: true, ddHead: 'SUGGESTIONS', ddItems: SUG }, { cam: [640, 480, 1.45] }).map((b, i) => (i === 0 ? { ...b, ms: 900 } : { ...b, cam: undefined })),
    { at: 4500, s: { bare: true, ...dd('purchase', 0) } }, { at: 4800, s: { bare: true, ...dd('purchase', 1) }, cur: [560, 566], ms: 600 },
    { at: 5500, click: true },
    { at: 5800, s: { results: true, typed: 'PR 7800098765', steps: 1, lines: 0, rows: 0 }, cam: [640, 230, 1.2], cur: null, ms: 1000 },
    { at: 6700, s: { results: true, typed: 'PR 7800098765', steps: 2, lines: 1, rows: 0 } },
    { at: 7400, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 2, rows: 0 } },
    { at: 8000, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 1 } },
    { at: 8500, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 2 }, cam: [640, 340, 1.12], ms: 900 },
    { at: 9000, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3 } },
    { at: 9500, cam: [640, 450, 1.25], cur: [900, 700], ms: 0 },
    { at: 9700, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3, hover: 1 }, cur: [520, 620], ms: 900 },
    { at: 10700, click: true },
    { at: 11000, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3, hover: 1, detail: true }, cam: [900, 300, 1.3], ms: 900 },
    { at: 11900, cur: [1236, 60], ms: 700 }, { at: 12500, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3, hover: 1, detail: true, closeHot: true }, click: true },
    { at: 12800, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3 }, cam: [640, 400, 1], cur: null, ms: 600 },
  ] },
  engaze: { stage: '#F4F1FC', drift: ['#C9BDFB', '#FBC9E0', '#BFD3FF'], duration: 17000, beats: [
    { at: 0, k: 'engaze', s: { n: 0 }, cam: [640, 420, 1], ms: 0 },
    { at: 1400, cam: [640, 560, 1.45], ms: 1000 },
    { at: 1500, cur: [900, 560], ms: 0 },
    { at: 2000, s: { n: 0, chip: 0 }, cur: [457, 633], ms: 900 },
    { at: 3100, click: true },
    { at: 3300, s: { n: 1, steps: 0 }, cam: [700, 160, 1.5], cur: null, ms: 900 },
    { at: 3800, s: { n: 2, steps: 1 }, cam: [640, 220, 1.5], ms: 700 }, { at: 4200, s: { n: 2, steps: 2 } }, { at: 4600, s: { n: 2, steps: 3 } },
    { at: 5200, s: { n: 3 }, cam: [640, 330, 1.45], ms: 900 },
    { at: 6400, cur: [700, 520], ms: 0 },
    { at: 6500, s: { n: 3, applyHot: true }, cur: [416, 423], ms: 800 },
    { at: 7500, click: true },
    { at: 7800, s: { n: 4 }, cam: [640, 300, 1.45], cur: null, ms: 900 },
    { at: 9300, cur: [700, 300], ms: 0 },
    { at: 9400, cur: [405, 323], ms: 800 },
    { at: 10100, s: { n: 4, oooHot: true }, click: true },
    { at: 10400, s: { n: 5, off: 0, st2: 0 }, cur: null, snap: true },
    { at: 10600, s: { n: 5, off: 60, st2: 0 }, snap: true },
    { at: 10800, s: { n: 5, off: 142, st2: 0 }, cam: [640, 400, 1.3], ms: 800, snap: true },
    { at: 11300, s: { n: 5, off: 142, st2: 1 } }, { at: 11700, s: { n: 5, off: 142, st2: 2 } },
    { at: 12100, s: { n: 7, off: 142 }, cam: [640, 430, 1.35], ms: 900 },
    { at: 13300, cur: [700, 560], ms: 0 },
    { at: 13400, cur: [416, 608], ms: 900 },
    { at: 14400, s: { n: 7, off: 142, onHot: true }, click: true },
    { at: 14700, s: { n: 8, off: 142 }, ms: 600 },
    { at: 15700, cam: [640, 400, 1], cur: null, ms: 900 },
  ] },
  travel: { stage: '#E6CFA6', duration: 9600, speed: 1.4, beats: [
    { at: 0, k: 'travel', s: { screen: 'home' }, cam: [640, 400, 1], tilt: [0, 18], ms: 0 },
    { at: 500, tilt: [0, 0], ms: 1100 },
    { at: 1800, cam: [640, 270, 1.7], cur: [820, 520], ms: 1000 },
    { at: 2700, cur: [640, 345], ms: 700 },
    { at: 3400, s: { screen: 'home', press: true }, click: true },
    { at: 3700, s: { screen: 'one' }, cam: [640, 290, 1.6], cur: null, ms: 800 },
    { at: 4300, s: { screen: 'one', ck: 1 }, cam: [640, 300, 1.8], ms: 600 }, { at: 4800, s: { screen: 'one', ck: 2 } },
    { at: 5400, cam: [640, 640, 1.7], cur: [700, 560], ms: 900 }, { at: 6000, cur: [640, 726], ms: 600 },
    { at: 6700, s: { screen: 'two' }, cam: [640, 340, 1.6], cur: null, click: true, ms: 900 },
    { at: 7400, tilt: [0, -14], cam: [640, 470, 1.8], ms: 1000 },
    { at: 8300, s: { screen: 'two', wallet: true }, tilt: [0, 0], cam: [640, 600, 1.6], ms: 900 },
    { at: 8900, s: { screen: 'home' }, cam: [640, 400, 1], tilt: [0, -18], ms: 700 },
  ] },
  data: { stage: '#0A0617', duration: 9800, beats: [
    { at: 0, k: 'data', s: {}, cam: [640, 400, 1], ms: 0 },
    { at: 700, cam: [560, 170, 1.7], cur: [700, 190], ms: 900 },
    { at: 1400, cur: [560, 154], ms: 500 },
    ...typing('customer', 1900, 100, { focus: true }),
    { at: 2900, s: { typed: 'customer', dom: true, count: 2 }, cam: [640, 330, 1.3], cur: null, ms: 900 },
    { at: 3700, cam: [320, 330, 1.7], cur: [41, 421], ms: 900 },
    { at: 4300, s: { typed: 'customer', dom: true, cert: true, count: 2 }, click: true },
    { at: 4800, s: { typed: 'customer', dom: true, cert: true, count: 2, hover: 0 }, cam: [460, 360, 1.4], tilt: [8, -10], cur: [430, 400], ms: 900 },
    { at: 5700, s: { typed: 'customer', dom: true, cert: true, count: 2, hover: 0, panel: true, chk: 0 }, cam: [1000, 380, 1.4], tilt: [0, 0], click: true, cur: null, ms: 900 },
    { at: 6300, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 1 }, cam: [1070, 290, 1.8], ms: 800 }, { at: 6600, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 2 } },
    { at: 6900, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 3 } }, { at: 7200, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 4 } },
    { at: 7600, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 4, line: .5 }, cam: [1070, 450, 1.9], ms: 800 }, { at: 7900, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 4, line: 1 } },
    { at: 8400, cam: [1070, 700, 1.9], cur: [1066, 730], ms: 800 },
    { at: 9000, s: { typed: 'customer', dom: true, cert: true, count: 2, panel: true, chk: 4, line: 1, done: true }, click: true },
    { at: 9500, s: { typed: 'customer', dom: true, cert: true, count: 2 }, cam: [640, 400, 1], cur: null, ms: 400 },
  ] },
  options: { stage: '#FFFFFF', duration: 24500, beats: [
    { at: 0, k: 'dnm', s: { view: 'dash', donut: 0 }, cam: [640, 400, 1], ms: 0 },
    { at: 800, cur: [930, 70], ms: 0 }, { at: 900, cur: [740, 64], ms: 800 },
    { at: 1900, s: { view: 'dash', donut: 0, menu: true }, cam: [700, 250, 1.5], click: true, ms: 900 },
    { at: 2900, cur: [180, 198], ms: 800 }, { at: 3800, cur: [560, 286], ms: 800 },
    { at: 4800, s: { view: 'dash', donut: 0, menu: true, mhl: 0 }, cur: [940, 198], ms: 800 },
    { at: 5700, click: true },
    { at: 6000, s: { view: 'dash', donut: 0 }, cam: [260, 400, 1.6], cur: null, ms: 900 },
    ...[0.2, 0.4, 0.6, 0.8, 1].map((d, i): Beat => ({ at: 6300 + i * 220, s: { view: 'dash', donut: d }, snap: true })),
    { at: 7800, cam: [800, 400, 1.5], cur: [330, 380], ms: 1400 },
    { at: 8900, s: { view: 'dash', hot: 0 }, cur: [400, 540], ms: 700 }, { at: 9700, click: true },
    { at: 10000, s: { view: 'circuit', sel: 0 }, cam: [760, 330, 1.35], cur: [1150, 262], ms: 900 },
    { at: 11000, s: { view: 'circuit', sel: 0, pressBtn: true }, click: true },
    { at: 11300, s: { view: 'circuit', sel: 0, toast: 'Activation started for C0008580' }, cam: [640, 440, 1.2], ms: 800 },
    { at: 12800, s: { view: 'circuit', sel: 0 }, cam: [300, 400, 1.5], cur: [150, 344], ms: 900 },
    { at: 13700, click: true }, { at: 13900, s: { view: 'circuit', sel: 1 } },
    { at: 14400, cam: [640, 330, 1.35], cur: [440, 326], ms: 800 }, { at: 15200, click: true },
    ...[0.12, 0.25, 0.4, 0.55, 0.7, 0.85, 1].map((d, i): Beat => ({ at: 15500 + i * 220, s: { view: 'bw', draw: d }, ...(i === 0 ? { cam: [900, 560, 1.4] as [number, number, number], cur: null, ms: 900 } : { snap: true }) })),
    { at: 17300, s: { view: 'bw', draw: 1, unit: 'Mbp' }, cur: [650, 423], ms: 700 }, { at: 18000, click: true },
    { at: 18400, s: { view: 'bw', draw: 1, unit: 'Mbp' }, cam: [900, 320, 1.4], cur: [1150, 262], ms: 900 },
    { at: 19400, s: { view: 'bw', draw: 1, unit: 'Mbp', pressBtn: true }, click: true },
    { at: 19700, s: { view: 'bw', draw: 1, unit: 'Mbp', dialog: true }, cam: [640, 400, 1.5], cur: [640, 378], ms: 800 },
    { at: 20800, click: true }, { at: 21000, s: { view: 'bw', draw: 1, unit: 'Mbp', dialog: true, picked: true }, cur: [535, 463], ms: 700 },
    { at: 21900, s: { view: 'bw', draw: 1, unit: 'Mbp', dialog: true, picked: true, pressSubmit: true }, click: true },
    { at: 22200, s: { view: 'bw', draw: 1, unit: 'Mbp', toast: 'Bandwidth change submitted' }, cam: [640, 600, 1.2], cur: null, ms: 800 },
    { at: 23600, cam: [640, 400, 1], ms: 800 },
  ] },
}
