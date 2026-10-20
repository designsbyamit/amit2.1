// Beat timelines for the animated thumbnails. Each beat sets the UI state (a scene + parameters), where the camera looks
// (cx, cy on a 1280 x 800 canvas, plus zoom), an optional 3D turn, and where the cursor is. Loops stay under 10 seconds.

export type Scene = 'agentic' | 'fly' | 'split' | 'search' | 'engaze' | 'travel' | 'data' | 'options'
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
}
export interface Timeline { stage: string; duration: number; beats: Beat[] }

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
const RECENT = ['Pending POs', 'Flight to Bangalore', 'Draft goals for product design team', 'SOWs expiring this month']
const dd = (typed: string, pick?: number) => ({ focus: true, lit: true, typed, dd: true, ddHead: 'SUGGESTIONS', ddItems: SUG, pick })

export const timelines: Record<string, Timeline> = {
  agentic: { stage: '#D5DDE6', duration: 9800, beats: [
    { at: 0, k: 'fly', cam: [640, 400, 1], tilt: [8, -22], ms: 0 },
    { at: 700, tilt: [0, 0], cam: [640, 400, 1.08], ms: 1100 },
    { at: 1900, k: 'agentic', s: { step: 1, scan: 0, fill: 0 }, cam: [1020, 560, 1.9], ms: 1000 },
    { at: 2200, s: { step: 1, scan: 110, fill: 0 } }, { at: 2500, s: { step: 1, scan: 220, fill: 0 } }, { at: 2800, s: { step: 1, scan: 330, fill: 0 } },
    { at: 3100, s: { step: 2, fill: 1 }, cam: [560, 540, 1.6], ms: 900 }, { at: 3400, s: { step: 2, fill: 2 } }, { at: 3700, s: { step: 2, fill: 3 } },
    { at: 4000, s: { step: 2, fill: 4, flag: true, hlpdf: true }, cam: [620, 560, 2.0], ms: 900 },
    { at: 4500, cam: [640, 690, 1.7], cur: [900, 600], ms: 800 },
    { at: 5000, cur: [642, 746], ms: 700 },
    { at: 5700, s: { step: 2, fill: 4, flag: true, press: true }, click: true },
    { at: 6000, s: { step: 2, fill: 4, flag: true, dialog: true }, cam: [640, 400, 1.4], cur: [805, 512], ms: 800 },
    { at: 6700, click: true },
    { at: 6900, s: { step: 3, fill: 4, flag: true, toast: true }, cam: [640, 160, 1.7], cur: null, ms: 800 },
    { at: 7700, k: 'split', cam: [640, 400, 1], tilt: [10, 14], ms: 1100 },
    { at: 8800, k: 'agentic', s: { step: 5, fill: 4, flag: true }, cam: [640, 235, 1.6], ms: 800 },
    { at: 9300, cam: [640, 400, 1], ms: 600 },
  ] },
  search: { stage: '#04050B', duration: 9600, beats: [
    { at: 0, k: 'search', s: {}, cam: [640, 380, 1.05], ms: 0 },
    { at: 800, cam: [640, 420, 1.6], cur: [900, 600], ms: 1000 },
    { at: 1500, cur: [640, 428], ms: 700 },
    { at: 2200, s: { focus: true, dd: true, ddHead: 'RECENT SEARCHES', ddItems: RECENT }, cam: [640, 500, 1.4], click: true },
    ...typing('purchase', 2800, 110, { focus: true, lit: true, dd: true, ddHead: 'SUGGESTIONS', ddItems: SUG }),
    { at: 3800, s: dd('purchase', 0), cam: [640, 520, 1.45] }, { at: 4000, s: dd('purchase', 1), cur: [560, 566], ms: 500 },
    { at: 4400, click: true },
    { at: 4600, s: { results: true, typed: 'PR 7800098765', steps: 1, lines: 0, rows: 0 }, cam: [640, 230, 1.2], cur: null, ms: 900 },
    { at: 5200, s: { results: true, typed: 'PR 7800098765', steps: 2, lines: 1, rows: 0 } },
    { at: 5600, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 2, rows: 0 } },
    { at: 6000, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 1 } },
    { at: 6300, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 2 }, cam: [640, 340, 1.12] },
    { at: 6600, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3, hover: 0 }, cam: [640, 400, 1], tilt: [14, 0], ms: 1000 },
    { at: 7800, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3, hover: 1 } },
    { at: 8600, s: { results: true, typed: 'PR 7800098765', steps: 3, lines: 3, rows: 3 }, tilt: [0, 0], cam: [640, 400, 1], ms: 900 },
  ] },
  engaze: { stage: '#E6E0F7', duration: 9800, beats: [
    { at: 0, k: 'engaze', s: { cards: false, orb: 40 }, cam: [740, 240, 1.4], ms: 0 },
    { at: 600, s: { cards: false, orb: 54 }, ms: 900 },
    { at: 1300, s: {}, cam: [740, 420, 1.4], ms: 900 },
    { at: 2300, cam: [740, 590, 1.6], cur: [940, 620], ms: 900 },
    { at: 3000, s: { chip: 1 }, cur: [900, 582], click: true, ms: 600 },
    { at: 3500, s: { chat: true, steps: 0 }, cam: [900, 110, 1.7], cur: null, ms: 900 },
    { at: 4000, s: { chat: true, steps: 1 }, cam: [640, 180, 1.6], ms: 900 }, { at: 4300, s: { chat: true, steps: 2 } }, { at: 4600, s: { chat: true, steps: 3 } },
    { at: 5100, s: { chat: true, steps: 3, text: true }, cam: [700, 300, 1.6], ms: 900 },
    { at: 5800, s: { chat: true, steps: 3, text: true, card: true, grow: .12 }, cam: [740, 470, 1.4], ms: 900 },
    { at: 6100, s: { chat: true, steps: 3, text: true, card: true, grow: .55 } }, { at: 6400, s: { chat: true, steps: 3, text: true, card: true, grow: 1 } },
    { at: 6900, tilt: [9, -12], cam: [740, 470, 1.2], ms: 1000 },
    { at: 7900, tilt: [0, 0], cam: [640, 600, 1.6], cur: [520, 690], ms: 1000 },
    { at: 8700, s: { chat: true, steps: 3, text: true, card: true, cta: true }, click: true },
    { at: 9200, s: { chat: true, steps: 3, text: true, card: true }, cam: [640, 400, 1], cur: null, ms: 600 },
  ] },
  travel: { stage: '#E6CFA6', duration: 9600, beats: [
    { at: 0, k: 'travel', s: { screen: 'home' }, cam: [640, 400, 1], tilt: [4, 32], ms: 0 },
    { at: 500, tilt: [0, 0], ms: 1100 },
    { at: 1800, cam: [640, 270, 1.7], cur: [820, 520], ms: 1000 },
    { at: 2700, cur: [640, 345], ms: 700 },
    { at: 3400, s: { screen: 'home', press: true }, click: true },
    { at: 3700, s: { screen: 'one' }, cam: [640, 290, 1.6], cur: null, ms: 800 },
    { at: 4300, s: { screen: 'one', ck: 1 }, cam: [640, 300, 1.8], ms: 600 }, { at: 4800, s: { screen: 'one', ck: 2 } },
    { at: 5400, cam: [640, 640, 1.7], cur: [700, 560], ms: 900 }, { at: 6000, cur: [640, 726], ms: 600 },
    { at: 6700, s: { screen: 'two' }, cam: [640, 340, 1.6], cur: null, click: true, ms: 900 },
    { at: 7400, tilt: [0, -26], cam: [640, 470, 1.8], ms: 1000 },
    { at: 8300, s: { screen: 'two', wallet: true }, tilt: [0, 0], cam: [640, 600, 1.6], ms: 900 },
    { at: 8900, s: { screen: 'home' }, cam: [640, 400, 1], tilt: [4, -32], ms: 700 },
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
  options: { stage: '#CFCFCA', duration: 9800, beats: [
    { at: 0, k: 'options', s: { shown: 0 }, cam: [380, 170, 1.6], ms: 0 },
    ...[1, 2, 3, 4, 5, 6].map((n, i): Beat => ({ at: 800 + i * 130, s: { shown: n }, ...(i === 0 ? { cam: [640, 400, 1], tilt: [14, -6] as [number, number], ms: 900 } : {}) })),
    ...[0, 1, 2, 3, 4, 5].flatMap((i): Beat[] => {
      const cx = 64 + (i % 3) * 388 + 184, cy = 246 + Math.floor(i / 3) * 270 + 125, t0 = 1900 + i * 650
      return [{ at: t0, s: { shown: 6, rej: i, act: i }, cam: [cx, cy, 1.9], tilt: [0, 0], ms: 600 }, { at: t0 + 330, s: { shown: 6, rej: i + 1, act: i } }]
    }),
    { at: 5800, s: { shown: 6, rej: 6, dim: true }, cam: [640, 400, 1], tilt: [10, 0], ms: 900 },
    { at: 6500, s: { shown: 6, rej: 6, dim: true, win: true }, cam: [640, 420, 1.15], tilt: [-6, 0], ms: 900 },
    { at: 7400, s: { shown: 6, rej: 6, dim: true, win: true, ok: true }, cam: [640, 560, 1.6], tilt: [0, 0], ms: 800 },
    { at: 8200, s: { shown: 6, rej: 6, dim: true, win: true, ok: true, chips: true }, cam: [640, 580, 1.5], ms: 700 },
    { at: 9000, cam: [640, 400, 1], ms: 700 },
  ] },
}
