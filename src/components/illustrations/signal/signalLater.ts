/**
 * Keyframes 04 to 08 of the Signal home: the career atlas, building teams, community, sharing, and the open line.
 * The same lime point leads the eye through all of it: it draws the career line, sits at the heart of the team and the
 * community, and at the end sets out on a new line. Every point here is born from something earlier: the last piece of
 * work dissolves into the 61 projects, the projects multiply into 200 designers, the team grows into a community of 252.
 */
import { atlasByYear } from '../../../data/atlasSummary'
import { INDUSTRIES } from '../../home2/layout'
import type { Layout, SceneState, Rect } from './signalScene'

type P = { x: number; y: number }
export const N_ATLAS = 61, N_TEAM = 200, N_HUB = 252

export const ROLE_RGB = [[255 / 255, 184 / 255, 107 / 255], [199 / 255, 155 / 255, 232 / 255], [79 / 255, 209 / 255, 188 / 255], [200 / 255, 245 / 255, 90 / 255]] as const
export const ROLE_CSS = ['#FFB86B', '#C79BE8', '#4FD1BC', '#C8F55A'] as const
export const CARD_RGB = [[125 / 255, 152 / 255, 255 / 255], [199 / 255, 155 / 255, 232 / 255], [79 / 255, 209 / 255, 188 / 255]] as const
const INK = [0.93, 0.93, 0.93] as const
const GREY = [0.55, 0.55, 0.55] as const

export interface Later {
  T0: P; T1: P; Ct: P; P8: P
  /** 05 and 06: the ring the point opens into, which holds the number */
  ringR: number
  /** 08: the primary call to action, measured from the page; the line wraps it */
  pill: Rect | null
  /** the button's corner radius, read from the page */
  pillR?: number
  /** corner radius of the work frames and shared cards, read from the page */
  radius?: number
  year: P[]; role: number[]; ind: P[]; team: P[]; comm: P[]
  edges: [number, number][]
  /** 04: industries as a ranked dot matrix, one row each; dots run from x0 in steps of `step` (negative runs leftward) */
  rows: { name: string; count: number; y: number; x0: number; step: number; lx: number }[]
  slots: number
  cards: Rect[]
  cloud: P; cloudR: number
}

/** The industries shown in 04: the nine largest by name, then the rest grouped, then the unlabelled ones. Data from the atlas workbook. */
export function industryRows(): { name: string; count: number }[] {
  const named = INDUSTRIES.filter(d => d[0] !== 'Unlabelled').sort((a, b) => b[1] - a[1])
  const top = named.slice(0, 9), rest = named.slice(9)
  const un = INDUSTRIES.find(d => d[0] === 'Unlabelled')?.[1] ?? 0
  return [
    ...top.map(([name, count]) => ({ name, count })),
    { name: `${rest.length} more industries`, count: rest.reduce((a, d) => a + d[1], 0) },
    ...(un ? [{ name: 'Not labelled', count: un }] : []),
  ]
}

function rng(seed: number) { return () => ((seed = (seed * 16807) % 2147483647) / 2147483647) }

export function laterGeometry(L: Layout): Later {
  const { W, H, top, mobile } = L
  const r = rng(61)
  // the career line
  const T0 = mobile ? { x: W * 0.07, y: top + H * 0.36 } : { x: W * 0.44, y: top + (H - top) * 0.72 }
  const T1 = mobile ? { x: W * 0.93, y: T0.y } : { x: W * 0.93, y: T0.y }
  const slots = atlasByYear.length + 1
  const dx = (T1.x - T0.x) / slots, gap = mobile ? 9 : 16
  const year: P[] = [], role: number[] = []
  atlasByYear.forEach((roles, yi) => {
    let k = 0
    roles.forEach((n, ri) => { for (let j = 0; j < n; j++) { year.push({ x: T0.x + dx * (yi + 0.5), y: T0.y - gap * (k + 1) }); role.push(ri); k++ } })
  })
  let u = 0
  while (year.length < N_ATLAS) { year.push({ x: T0.x + dx * (slots - 0.5), y: T0.y - gap * (u + 1) }); role.push(-1); u++ }

  // industries: a ranked dot matrix, one row per industry, every row on the same grid of slots
  const rowsData = industryRows()
  const nSlots = Math.max(...rowsData.map(d => d.count))
  const rowH = mobile ? 20 : 30
  const fy0 = mobile ? top + H * 0.06 : top + (H - top) * 0.14, fy1 = mobile ? top + H * 0.42 : top + (H - top) * 0.84
  // on phones the rows end above the career line, so the point never sits on a row
  const ry0 = mobile ? T0.y - 34 - rowH * (rowsData.length - 1) : (fy0 + fy1) / 2 - (rowH * (rowsData.length - 1)) / 2
  const step = mobile ? -9.5 : 17
  const lx = mobile ? W * 0.07 : W * 0.44 + 190
  const x0 = mobile ? W * 0.93 : lx + 22
  const rows: Later['rows'] = []
  const ind: P[] = new Array(N_ATLAS)
  let pi = 0
  rowsData.forEach((d, k) => {
    const y = ry0 + k * rowH
    rows.push({ name: d.name, count: d.count, y, x0, step, lx })
    for (let j = 0; j < d.count && pi < N_ATLAS; j++) ind[pi++] = { x: x0 + step * j, y }
  })
  // the team: a calm lattice around the point, grown ring by ring
  const Ct = mobile ? { x: W * 0.5, y: top + H * 0.21 } : { x: W * 0.69, y: top + (H - top) * 0.5 }
  const g = mobile ? 12.5 : 28
  const lat: P[] = []
  for (let q = -14; q <= 14; q++) for (let s = -14; s <= 14; s++) {
    const x = (q + s * 0.5) * g, y = s * g * 0.866
    lat.push({ x, y })
  }
  lat.sort((a, b) => a.x * a.x + a.y * a.y - (b.x * b.x + b.y * b.y))
  const ringR = mobile ? 54 : 108
  const hole = ringR * 1.22
  const ring = lat.filter(p => Math.hypot(p.x, p.y) > hole)
  lat.length = 0; lat.push(...ring)
  const team = lat.slice(0, N_TEAM).map(p => ({ x: Ct.x + p.x, y: Ct.y + p.y }))

  // the community: the lattice loosens and grows past its edge; newcomers settle at the rim
  const comm: P[] = []
  for (let i = 0; i < N_HUB; i++) {
    if (i < N_TEAM) {
      const p = lat[i], d = Math.hypot(p.x, p.y), a = Math.atan2(p.y, p.x) + (r() - 0.5) * 0.5
      const nd = d * 1.55 + (r() - 0.5) * g * 1.4
      comm.push({ x: Ct.x + Math.cos(a) * nd, y: Ct.y + Math.sin(a) * nd * (mobile ? 0.9 : 0.95) })
    } else {
      const a = r() * Math.PI * 2, nd = g * (11 + r() * 4)
      comm.push({ x: Ct.x + Math.cos(a) * nd * (mobile ? 1.1 : 1.15), y: Ct.y + Math.sin(a) * nd * 0.92 })
    }
  }
  const edges: [number, number][] = []
  for (let i = 0; i < N_HUB; i++) {
    const near: [number, number][] = []
    for (let j = 0; j < N_HUB; j++) if (j !== i) near.push([Math.hypot(comm[i].x - comm[j].x, comm[i].y - comm[j].y), j])
    near.sort((a, b) => a[0] - b[0])
    for (let k = 0; k < 2; k++) { const j = near[k][1]; if (i < j) edges.push([i, j]); else if (!edges.some(e => e[0] === j && e[1] === i)) edges.push([j, i]) }
    if (i % 9 === 0) { const j = near[5 + (i % 4)][1]; edges.push([Math.min(i, j), Math.max(i, j)]) }
  }

  // sharing: three cards
  const cards: Rect[] = mobile
    ? [0, 1, 2].map(k => ({ x: W * 0.06, y: top + H * 0.035 + k * (W * 0.3 + 10), w: W * 0.88, h: W * 0.3, bright: 1 }))
    : (() => { const w = W * 0.165, h = w * 1.18, gx = W * 0.018, x0 = W * 0.4, y = top + (H - top) * 0.5 - h / 2; return [0, 1, 2].map(k => ({ x: x0 + k * (w + gx), y: y + (k === 1 ? -h * 0.06 : h * 0.04), w, h, bright: 1 })) })()

  const P8 = mobile ? { x: W * 0.07, y: top + H * 0.62 } : { x: W * 0.075, y: top + (H - top) * 0.72 }
  const hero = L.hero
  return { T0, T1, Ct, P8, ringR, pill: null, year, role, ind, team, comm, edges, rows, slots: nSlots, cards, cloud: { x: hero.x + hero.w / 2, y: hero.y + hero.h / 2 }, cloudR: Math.min(hero.w, hero.h) * 0.42 }
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const stag = (v: number, r: number, k = 0.4) => clamp(v * (1 + k) - r * k)

/** Where the lime point is, across the whole story. */
export function pointAt(S: SceneState, G: Later, fc: P): P {
  let x = fc.x, y = fc.y
  const lead = { x: mix(G.T0.x, G.T1.x, ease(S.tl)), y: G.T0.y }
  const k4 = ease(S.pm4); x = mix(x, lead.x, k4); y = mix(y, lead.y, k4)
  const k5 = ease(S.pm5); x = mix(x, G.Ct.x, k5); y = mix(y, G.Ct.y, k5)
  const k8 = ease(S.back); x = mix(x, G.P8.x, k8); y = mix(y, G.P8.y, k8)
  return { x, y }
}

/** Fallback corner radius of the work frames and shared cards; the page passes the real one in as `radius`. */
export const CARD_RADIUS = 10

/** A point at fraction u along the outline of a rounded rectangle, clockwise from the top-left straight. */
export function roundedPerim(r: Rect, rad: number, u: number, o: P = { x: 0, y: 0 }): P {
  const k = Math.max(0, Math.min(rad, r.w / 2, r.h / 2))
  const sw = r.w - 2 * k, sh = r.h - 2 * k, arc = (Math.PI * k) / 2
  const per = 2 * (sw + sh) + 4 * arc
  let d = (((u % 1) + 1) % 1) * per
  const corner = (cx: number, cy: number, a0: number) => { const a = a0 + (arc > 0 ? (d / arc) * (Math.PI / 2) : 0); o.x = cx + Math.cos(a) * k; o.y = cy + Math.sin(a) * k; return o }
  if (d < sw) { o.x = r.x + k + d; o.y = r.y; return o } d -= sw
  if (d < arc) return corner(r.x + r.w - k, r.y + k, -Math.PI / 2); d -= arc
  if (d < sh) { o.x = r.x + r.w; o.y = r.y + k + d; return o } d -= sh
  if (d < arc) return corner(r.x + r.w - k, r.y + r.h - k, 0); d -= arc
  if (d < sw) { o.x = r.x + r.w - k - d; o.y = r.y + r.h; return o } d -= sw
  if (d < arc) return corner(r.x + k, r.y + r.h - k, Math.PI / 2); d -= arc
  if (d < sh) { o.x = r.x; o.y = r.y + r.h - k - d; return o } d -= sh
  return corner(r.x + k, r.y + k, Math.PI)
}

type Put = (x: number, y: number, size: number, c: readonly number[], a: number, hard: number) => void

export function composeLater(put: Put, S: SceneState, G: Later, L: Layout, t: number, rnd: (i: number) => number, pt: P, src: Rect) {
  if (S.at <= 0.001) return
  const sc = L.s
  const pos: P[] = new Array(N_HUB)

  // the career line, drawn by the point
  const lineA = clamp(S.tl) * (1 - ease(S.team)) * (1 - ease(S.ind) * 0.6 + ease(S.role) * 0.6)
  if (lineA > 0.01) {
    const x1 = mix(G.T0.x, G.T1.x, ease(S.tl)), n = Math.max(2, Math.round((x1 - G.T0.x) / 3))
    for (let k = 0; k <= n; k++) put(mix(G.T0.x, x1, k / n), G.T0.y, 3.6 * sc, [0.78, 0.96, 0.35], 0.75 * lineA, 0.8)
  }

  // the empty slots of the industry matrix, so every row reads against the same grid
  const gA = clamp(S.ind) * (1 - ease(S.role))
  if (gA > 0.01) {
    for (const rw of G.rows) for (let j = 0; j < G.slots; j++) put(rw.x0 + rw.step * j, rw.y, 3.2 * sc, INK, 0.16 * gA, 0.8)
  }

  for (let i = 0; i < N_HUB; i++) {
    const r1 = rnd(i * 3), r2 = rnd(i * 3 + 1), r3 = rnd(i * 3 + 2)
    const isAtlas = i < N_ATLAS, isTeam = i < N_TEAM
    let x: number, y: number, a: number
    let col: readonly number[] = INK
    let size = (isAtlas ? 8.5 : 6) * sc

    if (isAtlas) {
      // the last piece of work dissolves into the projects
      const sx = src.x + r1 * src.w, sy = src.y + r2 * src.h
      const pa = ease(stag(S.at, r3))
      const cx = G.cloud.x + (sx - G.cloud.x) * 0.55 + Math.sin(t * 0.6 + i) * 6, cy = G.cloud.y + (sy - G.cloud.y) * 0.55 + Math.cos(t * 0.5 + i) * 6
      x = mix(sx, cx, pa); y = mix(sy, cy, pa); a = pa
      const pd = ease(stag(S.drop, r1)); x = mix(x, G.year[i].x, pd); y = mix(y, G.year[i].y, pd) - Math.sin(pd * Math.PI) * 30 * sc
      const pi = ease(stag(S.ind, r2)); x = mix(x, G.ind[i].x, pi); y = mix(y, G.ind[i].y, pi)
      const pr = ease(stag(S.role, r3)); x = mix(x, G.year[i].x, pr); y = mix(y, G.year[i].y, pr)
      const rc = G.role[i] < 0 ? GREY : ROLE_RGB[G.role[i]]
      const k = clamp(S.role * 1.4) * (1 - ease(S.team))
      col = [mix(INK[0], rc[0], k), mix(INK[1], rc[1], k), mix(INK[2], rc[2], k)]
    } else {
      // newcomers are born beside an existing point
      const parent = pos[i % N_ATLAS] ?? G.year[i % N_ATLAS]
      x = parent.x; y = parent.y; a = 0
    }

    if (isTeam) {
      const pt5 = ease(stag(S.team, isAtlas ? r1 * 0.3 : 0.3 + (i / N_TEAM) * 0.7, 0.9))
      if (!isAtlas) a = clamp(pt5 * 3)
      x = mix(x, G.team[i].x, pt5); y = mix(y, G.team[i].y, pt5)
    } else {
      const pc = ease(stag(S.comm, 0.35 + r1 * 0.65, 0.8))
      const a0 = r2 * Math.PI * 2, far = Math.max(L.W, L.H) * 0.75
      x = mix(G.Ct.x + Math.cos(a0) * far, G.comm[i].x, pc); y = mix(G.Ct.y + Math.sin(a0) * far, G.comm[i].y, pc); a = pc
    }
    if (isTeam) { const pc = ease(stag(S.comm, r2 * 0.5)); x = mix(x, G.comm[i].x, pc); y = mix(y, G.comm[i].y, pc) }
    const breathe = S.team > 0.5 ? 1 : 0
    x += Math.sin(t * 0.7 + i * 1.7) * 1.6 * breathe; y += Math.cos(t * 0.6 + i * 1.3) * 1.6 * breathe
    const commTint = clamp(S.comm) * (1 - S.share)
    if (!isAtlas || S.team > 0) {
      const tint = i % 5 === 0 ? [0.78, 0.96, 0.35] : INK
      const kk = clamp(S.team)
      col = [mix(col[0], tint[0], kk), mix(col[1], tint[1], kk), mix(col[2], tint[2], kk)]
    }
    if (commTint > 0 && i % 3 === 0) { const c2 = CARD_RGB[i % 3 === 0 ? (i % 2) * 2 : 1]; col = [mix(col[0], c2[0], commTint * 0.6), mix(col[1], c2[1], commTint * 0.6), mix(col[2], c2[2], commTint * 0.6)] }

    // sharing: three streams, each tracing one card
    const ps = ease(stag(S.share, r3, 0.6))
    if (ps > 0) {
      const ci = i % 3, cr = G.cards[ci], tgt = roundedPerim(cr, G.radius ?? CARD_RADIUS, i / N_HUB * 3 + r1 * 0.02)
      const mx = mix(x, tgt.x, 0.5) + (r2 - 0.5) * 60 * sc, my = mix(y, tgt.y, 0.5) - 40 * sc
      const u = ps, w0 = (1 - u) * (1 - u), w1 = 2 * u * (1 - u), w2 = u * u
      x = w0 * x + w1 * mx + w2 * tgt.x; y = w0 * y + w1 * my + w2 * tgt.y
      const cc = CARD_RGB[ci]; col = [mix(col[0], cc[0], ps), mix(col[1], cc[1], ps), mix(col[2], cc[2], ps)]
      a *= mix(1, 0.55, clamp(S.card))
      size *= mix(1, 0.8, ps)
    }
    // the end: everything returns to the point
    const pb = ease(stag(S.back, r1, 0.7))
    if (pb > 0) { x = mix(x, pt.x, pb); y = mix(y, pt.y, pb); a *= 1 - pb * pb }
    pos[i] = { x, y }
    if (a < 0.01) continue
    put(x, y, size * 3.6, col, 0.09 * a, 0)
    put(x, y, size, col, 0.95 * a, 0.7)
  }

  // ties across the community
  const ea = clamp(S.comm * 1.3 - 0.3) * (1 - ease(S.share)) * (1 - ease(S.back))
  if (ea > 0.01) for (let e = 0; e < G.edges.length; e++) {
    const [p, q] = G.edges[e], A = pos[p], B = pos[q]
    if (!A || !B) continue
    const len = Math.hypot(B.x - A.x, B.y - A.y), n = Math.min(8, Math.max(2, Math.round(len / 9)))
    const ok = clamp(ea * 1.6 - (e / G.edges.length) * 0.6)
    for (let k = 1; k < n; k++) put(mix(A.x, B.x, k / n), mix(A.y, B.y, k / n), 2.2 * sc, [0.31, 0.82, 0.74], 0.2 * ok, 0.7)
  }

  // 05 and 06: the point opens into a ring with six nodes; the number lives inside it
  const ring = clamp(S.team * 2.2) * (1 - ease(S.share))
  if (ring > 0.01) {
    const R = G.ringR * ease(ring) * (1 + 0.1 * ease(S.comm)), n = Math.round(R * 0.9) + 24
    const spin = t * 0.12
    for (let k = 0; k < n; k++) {
      const a = (k / n) * Math.PI * 2 + spin, f = 0.5 + 0.5 * Math.sin(a * 1 + t * 0.4)
      const c = [mix(0.78, 0.31, f), mix(0.96, 0.82, f), mix(0.35, 0.74, f)]
      put(G.Ct.x + Math.cos(a) * R, G.Ct.y + Math.sin(a) * R, 4.4 * sc, c, 0.8 * ring, 0.75)
      if (k % 2 === 0) put(G.Ct.x + Math.cos(a) * R, G.Ct.y + Math.sin(a) * R, 22 * sc, c, 0.05 * ring, 0)
    }
    for (let k = 0; k < 6; k++) {
      const a = (k / 6) * Math.PI * 2 + spin * 1.6 + 0.4
      put(G.Ct.x + Math.cos(a) * R, G.Ct.y + Math.sin(a) * R, 11 * sc, INK, 0.95 * ring, 0.8)
      put(G.Ct.x + Math.cos(a) * R, G.Ct.y + Math.sin(a) * R, 40 * sc, [0.78, 0.96, 0.35], 0.12 * ring, 0)
    }
  }

  // 08: the line leaves the point, reaches the call to action and wraps it like a ring of light, then carries on
  if (S.line8 > 0.001) {
    const lime = [0.78, 0.96, 0.35] as const, teal = [0.31, 0.82, 0.74] as const
    const pill = G.pill ?? { x: L.W * 0.4, y: pt.y - 24, w: 220, h: 48, bright: 1 }
    const cy = pill.y + pill.h / 2, rad = Math.min(G.pillR ?? 6, pill.h / 2, pill.w / 2)
    const ax = pill.x
    const p1 = clamp(S.line8 / 0.4), p2 = clamp((S.line8 - 0.4) / 0.42), p3 = clamp((S.line8 - 0.82) / 0.18)
    // 1. to the button
    const x1 = mix(pt.x, ax - 2.5, ease(p1)), n1 = Math.max(2, Math.round((x1 - pt.x) / 3))
    for (let k = 0; k <= n1; k++) put(mix(pt.x, x1, k / n1), mix(pt.y, cy, ease(k / n1) * ease(p1)), 3.8 * sc, lime, 0.95, 0.8)
    // 2. along the button's own border, from the middle of its left edge, over the top and back round
    if (p2 > 0) {
      // hug the edge: the border grown by a hair, its corners grown to match
      const o = 2.5, bx = pill.x - o, by = pill.y - o, bw = pill.w + 2 * o, bh = pill.h + 2 * o, r = rad + o, q = (Math.PI * r) / 2
      const segs = [bh / 2 - r, q, bw - 2 * r, q, bh - 2 * r, q, bw - 2 * r, q, bh / 2 - r]
      const per = segs.reduce((m, v) => m + v, 0), n2 = Math.round((per * p2) / 2.6)
      const at = (d: number): P => {
        if ((d -= 0) < segs[0]) return { x: bx, y: cy - d }
        if ((d -= segs[0]) < q) { const an = Math.PI + d / r; return { x: bx + r + Math.cos(an) * r, y: by + r + Math.sin(an) * r } }
        if ((d -= q) < segs[2]) return { x: bx + r + d, y: by }
        if ((d -= segs[2]) < q) { const an = -Math.PI / 2 + d / r; return { x: bx + bw - r + Math.cos(an) * r, y: by + r + Math.sin(an) * r } }
        if ((d -= q) < segs[4]) return { x: bx + bw, y: by + r + d }
        if ((d -= segs[4]) < q) { const an = d / r; return { x: bx + bw - r + Math.cos(an) * r, y: by + bh - r + Math.sin(an) * r } }
        if ((d -= q) < segs[6]) return { x: bx + bw - r - d, y: by + bh }
        if ((d -= segs[6]) < q) { const an = Math.PI / 2 + d / r; return { x: bx + r + Math.cos(an) * r, y: by + bh - r + Math.sin(an) * r } }
        d -= q; return { x: bx, y: by + bh - r - d }
      }
      for (let k = 0; k <= n2; k++) {
        const pp = at((k / Math.max(1, n2)) * per * p2)
        const f = 0.5 + 0.5 * Math.sin(k * 0.05 + t * 1.2), c = [mix(lime[0], teal[0], f), mix(lime[1], teal[1], f), mix(lime[2], teal[2], f)]
        put(pp.x, pp.y, 3.6 * sc, c, 0.95, 0.8)
        if (k % 4 === 0) put(pp.x, pp.y, 22 * sc, c, 0.05, 0)
      }
    }
    // 3. and on, out of the frame
    if (p3 > 0) {
      const sx = ax + pill.w + 2.5, x3 = mix(sx, L.W + 40, ease(p3)), n3 = Math.max(2, Math.round((x3 - sx) / 3))
      for (let k = 0; k <= n3; k++) { const xx = mix(sx, x3, k / n3); put(xx, cy, 3.2 * sc, lime, 0.75 * (1 - Math.max(0, (xx - L.W * 0.8) / (L.W * 0.25))), 0.8) }
      put(x3, cy, 50 * sc, lime, 0.16 * (1 - p3 * 0.5), 0)
    }
  }
}
