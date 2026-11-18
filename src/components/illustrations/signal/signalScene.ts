/**
 * Geometry and choreography for the Signal home scene (keyframes 01 to 03).
 * One state object, written by the scroll timeline, read here every frame. Everything on screen is derived from it,
 * so one scene never ends and an unrelated one begins: the forces become the paths, the paths become the outcomes,
 * the outcomes become the light around each piece of work.
 */
import { STRIDE } from './glField'
import { laterGeometry, composeLater, pointAt, roundedPerim, CARD_RADIUS, type Later } from './signalLater'

export const COL = {
  lime: [200 / 255, 245 / 255, 90 / 255],
  white: [1, 1, 1],
  force: [
    [255 / 255, 184 / 255, 107 / 255], // human behaviour, amber
    [125 / 255, 152 / 255, 255 / 255], // business, cobalt
    [79 / 255, 209 / 255, 188 / 255], // technology, teal
  ],
} as const

/** The same three hues for DOM labels that travel with the forces. */
export const FORCE_CSS = ['#FFB86B', '#7D98FF', '#4FD1BC'] as const
/** The same hues deepened for the light ground, readable as text on paper. */
export const FORCE_INK = ['#9A5A12', '#3A55C8', '#167A6A'] as const

export interface SceneState {
  pt: number; ptR: number
  a0: number; a1: number; a2: number
  lock: number; echo: number
  move: number
  o0: number; o1: number; o2: number
  toFrame: number; reveal: number
  workIdx: number; dust: number
  /** 04 to 08 */
  at: number; drop: number; tl: number; ind: number; role: number; pm4: number
  team: number; pm5: number; comm: number; share: number; card: number; back: number; line8: number
  /** labels beside the three independent forces */
  lab: number
}

export const finalHero = (): SceneState => ({ pt: 1, ptR: 1, a0: 1, a1: 1, a2: 1, lock: 1, echo: 1, move: 0, o0: 0, o1: 0, o2: 0, toFrame: 0, reveal: 0, workIdx: 0, dust: 1, lab: 0, at: 0, drop: 0, tl: 0, ind: 0, role: 0, pm4: 0, team: 0, pm5: 0, comm: 0, share: 0, card: 0, back: 0, line8: 0 })
export const blank = (): SceneState => ({ ...finalHero(), pt: 0, a0: 0, a1: 0, a2: 0, lock: 0, echo: 0, dust: 0 })
/** After the opening: the three forces are here, each on its own course, not yet converged. */
export const opened = (): SceneState => ({ ...finalHero(), pt: 0, lock: 0, echo: 0, lab: 1 })

type P = { x: number; y: number }
export interface Rect { x: number; y: number; w: number; h: number; bright: number }

export interface Layout {
  W: number; H: number; top: number; mobile: boolean
  C1: P; C2: P; R: number; d: number
  dirs: P[]; origins: P[]
  E: P[]; oR: number
  hero: Rect; q1: Rect; q2: Rect; lp: Rect
  s: number
}

const DEG = Math.PI / 180
const PETAL = [-90, 30, 150]

export function computeLayout(W: number, H: number, top: number): Layout {
  const mobile = W < 768
  const dirs = PETAL.map(a => ({ x: Math.cos(a * DEG), y: Math.sin(a * DEG) }))
  if (mobile) {
    const C1 = { x: W * 0.5, y: top + (H * 0.56 - top) * 0.5 }
    const R = Math.min(W * 0.22, H * 0.13)
    const C2 = { x: W * 0.5, y: top + H * 0.13 }
    const oR = W * 0.105
    const ey = top + H * 0.38
    const fw = W * 0.88, fh = fw / 1.8
    const hero = { x: W * 0.06, y: top + H * 0.17, w: fw, h: fh, bright: 1 }
    return {
      W, H, top, mobile, C1, C2, R, d: R * 0.6, dirs,
      origins: [{ x: -W * 0.3, y: -H * 0.15 }, { x: W * 1.35, y: H * 0.55 }, { x: -W * 0.4, y: H * 0.7 }],
      E: [{ x: W * 0.19, y: ey }, { x: W * 0.5, y: ey }, { x: W * 0.81, y: ey }], oR,
      hero, q1: { x: W * 0.96, y: hero.y + fh * 0.06, w: fw * 0.88, h: fh * 0.88, bright: 0.5 },
      q2: { x: W * 1.9, y: hero.y + fh * 0.1, w: fw * 0.8, h: fh * 0.8, bright: 0.3 },
      lp: { x: W * 0.3, y: hero.y - fh * 0.75, w: fw * 0.4, h: fh * 0.4, bright: 0 },
      s: 0.82,
    }
  }
  const C1 = { x: W * 0.69, y: top + (H - top) * 0.5 }
  const R = Math.min(H * 0.2, W * 0.13)
  const C2 = { x: W * 0.74, y: top + (H - top) * 0.2 }
  const oR = Math.min(H * 0.1, W * 0.065)
  const ey = top + (H - top) * 0.6
  const fw = Math.min(W * 0.5, (H - top) * 0.9 * 1.8 * 0.62), fh = fw / 1.8
  const hero = { x: W * 0.4, y: top + (H - top - fh) * 0.42, w: fw, h: fh, bright: 1 }
  return {
    W, H, top, mobile, C1, C2, R, d: R * 0.6, dirs,
    origins: [{ x: C1.x - W * 0.35, y: -H * 0.3 }, { x: W * 1.2, y: C1.y + H * 0.45 }, { x: C1.x - W * 0.8, y: H * 1.3 }],
    E: [{ x: W * 0.36, y: ey }, { x: W * 0.6, y: ey }, { x: W * 0.84, y: ey }], oR,
    hero, q1: { x: W * 0.925, y: hero.y + fh * 0.2, w: fw * 0.6, h: fh * 0.6, bright: 0.42 },
    q2: { x: W * 1.06, y: hero.y + fh * 0.26, w: fw * 0.48, h: fh * 0.48, bright: 0.22 },
    lp: { x: hero.x + fw * 0.3, y: hero.y - fh * 0.62, w: fw * 0.4, h: fh * 0.4, bright: 0 },
    s: 1,
  }
}

const mix = (a: number, b: number, t: number) => a + (b - a) * t
const clamp = (v: number) => (v < 0 ? 0 : v > 1 ? 1 : v)
const ease = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const lerpR = (a: Rect, b: Rect, t: number): Rect => ({ x: mix(a.x, b.x, t), y: mix(a.y, b.y, t), w: mix(a.w, b.w, t), h: mix(a.h, b.h, t), bright: mix(a.bright, b.bright, t) })

/** Where frame i sits when work `idx` (continuous) is at centre stage. */
export function frameRect(L: Layout, i: number, idx: number): Rect {
  const s = i - idx
  if (s <= 0) { const k = Math.min(1, -s); const r = lerpR(L.hero, L.lp, ease(k)); r.bright = Math.max(0, 1 - k * 1.6); return r }
  if (s <= 1) return lerpR(L.hero, L.q1, ease(s))
  return lerpR(L.q1, L.q2, ease(Math.min(1, s - 1)))
}

function bez(a: P, b: P, c: P, d: P, t: number, o: P) {
  const u = 1 - t
  o.x = u * u * u * a.x + 3 * u * u * t * b.x + 3 * u * t * t * c.x + t * t * t * d.x
  o.y = u * u * u * a.y + 3 * u * u * t * b.y + 3 * u * t * t * c.y + t * t * t * d.y
}


const HEX = [{ x: 0, y: 0 }, ...[0, 60, 120, 180, 240, 300].map(a => ({ x: Math.cos((a - 90) * DEG) * 0.9, y: Math.sin((a - 90) * DEG) * 0.9 }))]
const EDGES: [number, number][] = [[0, 1], [0, 2], [0, 3], [0, 4], [0, 5], [0, 6], [1, 2], [2, 3], [3, 4], [4, 5], [5, 6], [6, 1]]
const COLS = [[-0.78, 0.5], [-0.26, 0.85], [0.26, 1.25], [0.78, 1.7]]

/** The three outcomes, in units of the outcome radius: experiences ripple, products connect, value rises. */
function outcome(i: number, k: number, n: number, r1: number, t: number, o: P) {
  if (i === 0) {
    const ring = k % 3, a = (Math.floor(k / 3) / (n / 3)) * Math.PI * 2
    const rad = [0.36, 0.68, 1][ring] * (1 + 0.035 * Math.sin(t * 1.4 - ring * 1.3))
    o.x = Math.cos(a) * rad; o.y = Math.sin(a) * rad; return
  }
  if (i === 1) {
    if (k < n * 0.3) { const nd = HEX[k % 7]; const a = r1 * 6.283, rr = 0.07 * Math.sqrt((k * 7.31) % 1); o.x = nd.x + Math.cos(a) * rr; o.y = nd.y + Math.sin(a) * rr; return }
    const [p, q] = EDGES[k % 12]; o.x = mix(HEX[p].x, HEX[q].x, r1); o.y = mix(HEX[p].y, HEX[q].y, r1); return
  }
  const [cx, hgt] = COLS[k % 4], wd = 0.28, base = 0.85
  const per = 2 * (wd + hgt), d = r1 * per
  let x: number, y: number
  if (d < hgt) { x = -wd / 2; y = -d } else if (d < hgt + wd) { x = -wd / 2 + (d - hgt); y = -hgt } else if (d < 2 * hgt + wd) { x = wd / 2; y = -hgt + (d - hgt - wd) } else { x = wd / 2 - (d - 2 * hgt - wd); y = 0 }
  o.x = cx + x; o.y = base + y
}

const NF = 760, NE = 150, ND = 520

/** While a force is still on its own it is an almost-circle that breathes a little, each on its own rhythm.
 *  w = how independent it still is (1 before convergence, 0 once locked). At w = 0 all three are perfect circles. */
function shapeR(i: number, ang: number, t: number, w: number) {
  if (w <= 0.001) return 1
  const r = 1 + 0.045 * Math.sin(3 * ang + t * 0.6 + i * 2.1) + 0.025 * Math.sin(5 * ang - t * 0.45 + i * 1.3)
  return 1 + (r - 1) * w
}

export class Field {
  buf = new Float32Array((3 * NF + 3 * NE + ND + 16 + 252 * 2 + 9000) * STRIDE)
  private rnd: Float32Array
  private n = 0
  /** Centre of each force on the last frame, for the labels that travel with them. */
  centers: P[] = [{ x: 0, y: 0 }, { x: 0, y: 0 }, { x: 0, y: 0 }]
  /** Where the lime point was on the last frame, for type that rides with it. */
  pt: P = { x: 0, y: 0 }
  private G?: Later
  private GL?: Layout
  /** Geometry for keyframes 04 to 08, built once per layout. */
  geom(L: Layout): Later { if (this.GL !== L || !this.G) { this.G = laterGeometry(L); this.GL = L } return this.G }
  private tmp: P = { x: 0, y: 0 }
  private a: P = { x: 0, y: 0 }; private b: P = { x: 0, y: 0 }; private c: P = { x: 0, y: 0 }; private d: P = { x: 0, y: 0 }
  constructor() {
    let s = 20261118
    const r = () => ((s = (s * 16807) % 2147483647) / 2147483647)
    this.rnd = new Float32Array(4 * (3 * NF + ND))
    for (let i = 0; i < this.rnd.length; i++) this.rnd[i] = r()
  }
  put(x: number, y: number, size: number, c: readonly number[], a: number, hard: number) {
    if (a <= 0.003) return
    const o = this.n * STRIDE
    if (o + STRIDE > this.buf.length) return
    const B = this.buf
    B[o] = x; B[o + 1] = y; B[o + 2] = size; B[o + 3] = c[0]; B[o + 4] = c[1]; B[o + 5] = c[2]; B[o + 6] = a > 1 ? 1 : a; B[o + 7] = hard
    this.n++
  }

  compose(S: SceneState, L: Layout, t: number, px = 0, py = 0): number {
    this.n = 0
    const { R, d, s: sc } = L
    const par = 1 - S.move * 0.6
    const fc = { x: mix(L.C1.x, L.C2.x, ease(S.move)) + px * 14 * par, y: mix(L.C1.y, L.C2.y, ease(S.move)) + py * 10 * par }
    const Rc = R * mix(0.72, 1, easeOut(S.lock)) * mix(1, 0.42, ease(S.move))
    const dc = d * mix(1, 0.42, ease(S.move))
    const spin = t * 0.05
    const outAll = (S.o0 + S.o1 + S.o2) / 3
    const G = this.geom(L)
    const pp = pointAt(S, G, fc)
    this.pt.x = pp.x; this.pt.y = pp.y
    const forceA = 1 - ease(S.at)
    const arr = [S.a0, S.a1, S.a2], outs = [S.o0, S.o1, S.o2]

    // ambient bloom behind the flower
    this.put(fc.x, fc.y, Rc * 7, COL.force[1], 0.05 * S.pt * (1 - S.toFrame * 0.7), 0)
    this.put(fc.x, fc.y, Rc * 3.2, COL.white, 0.05 * S.lock * (1 - outAll * 0.6), 0)

    // dust: drifting motes, a third of them gathered around the point
    for (let i = 0; i < ND; i++) {
      const r = this.rnd, j = (3 * NF + i) * 4
      let x: number, y: number
      if (i < ND / 3) {
        const a = r[j] * 6.283 + t * 0.03 * (r[j + 1] - 0.5), rr = Math.pow(r[j + 2], 0.7) * R * 2.4
        x = pp.x + Math.cos(a) * rr; y = pp.y + Math.sin(a) * rr * 0.85
      } else {
        x = r[j] * L.W + Math.sin(t * 0.12 + r[j + 1] * 9) * 24
        y = (((r[j + 1] * L.H - t * (4 + r[j + 2] * 10)) % L.H) + L.H) % L.H
      }
      const tw = 0.55 + 0.45 * Math.sin(t * (0.6 + r[j + 3] * 1.4) + r[j] * 20)
      const c = r[j + 3] < 0.25 ? COL.white : COL.force[(i % 3)]
      this.put(x, y, (1.6 + r[j + 2] * 2.4) * sc, c, (0.06 + r[j + 1] * 0.24) * tw * S.dust, 0.85)
    }

    // echo petals: three faint rings between the forces, a six-petal rosette
    const echoA = S.echo * (1 - ease(S.move)) * 0.6
    if (echoA > 0.01) for (let e = 0; e < 3; e++) {
      const ang = (PETAL[e] + 60) * DEG, cx = fc.x + Math.cos(ang) * dc, cy = fc.y + Math.sin(ang) * dc
      for (let k = 0; k < NE; k++) { const a = (k / NE) * 6.283 + spin; this.put(cx + Math.cos(a) * Rc, cy + Math.sin(a) * Rc, 2.6 * sc, COL.white, 0.09 * echoA, 0.7) }
    }

    // the three forces
    for (let i = 0; i < 3; i++) {
      if (forceA <= 0.01) break
      const col = COL.force[i], dir = L.dirs[i]
      // apart, in a loose triangle around the point, drifting only a little
      const wob = { x: dir.x * R * 0.6 + Math.sin(t * (0.32 + i * 0.07) + i * 2.1) * R * 0.07, y: dir.y * R * 0.55 + Math.cos(t * (0.28 + i * 0.06) + i * 1.3) * R * 0.06 }
      const lk = easeOut(S.lock)
      const cx = fc.x + mix(dir.x * dc + wob.x, dir.x * dc, lk), cy = fc.y + mix(dir.y * dc + wob.y, dir.y * dc, lk)
      const E = L.E[i], oR = L.oR
      this.centers[i].x = cx; this.centers[i].y = cy
      const wInd = 1 - lk
      const rot = wInd * t * (i === 1 ? -0.06 : 0.06)
      const sz = mix(1.12, 1, lk)
      for (let k = 0; k < NF; k++) {
        const j = (i * NF + k) * 4, r = this.rnd
        const thin = k % 3 !== 0
        const u = k / NF, ang = u * 6.283 + spin * (i === 1 ? -1 : 1) + i + rot
        const Rk = Rc * sz * shapeR(i, ang - rot, t, wInd)
        // a crisp line with a soft glow hugging it: the core sits on the line, the glow spreads only a little either side
        const jit = thin ? (r[j + 1] - 0.5) * 0.5 : (r[j + 1] - 0.5) * 2.5 * sc
        const rx = cx + Math.cos(ang) * (Rk + jit), ry = cy + Math.sin(ang) * (Rk + jit)
        let x = rx, y = ry, alpha = thin ? 0.8 : 0.055, size = (thin ? 3 : 10) * sc
        const hard = thin ? 1 : 0

        // arrival: the ring traces itself in place, a bright head running round its circumference
        const pa = clamp(arr[i] * 1.4 - u * 0.4)
        if (pa < 1) {
          if (pa <= 0) continue
          const g = mix(0.86, 1, easeOut(pa))
          x = cx + (rx - cx) * g; y = cy + (ry - cy) * g
          alpha *= 0.6 + (1 - pa) * 1.4
        }

        // 02: the ring unspools into a path and lands as an outcome
        const po = clamp(outs[i] * 1.5 - r[j + 3] * 0.5)
        let ox = 0, oy = 0
        if (po > 0 || S.toFrame > 0) {
          outcome(i, k, NF, r[j + 1], t, this.tmp)
          ox = E.x + this.tmp.x * oR + (thin ? 0 : (r[j + 2] - 0.5) * 8 * sc); oy = E.y + this.tmp.y * oR + (thin ? 0 : (r[j + 3] - 0.5) * 8 * sc)
        }
        if (po > 0) {
          const pe = ease(po)
          this.a.x = rx; this.a.y = ry
          this.b.x = mix(rx, fc.x, 0.5) + (rx - fc.x) * 0.4; this.b.y = mix(ry, fc.y, 0.5) + (ry - fc.y) * 0.4
          this.c.x = mix(fc.x, ox, 0.55) + (r[j + 2] - 0.5) * oR * 0.8; this.c.y = mix(fc.y, oy, 0.55) - oR * 0.4
          this.d.x = ox; this.d.y = oy
          bez(this.a, this.b, this.c, this.d, pe, this.tmp); x = this.tmp.x; y = this.tmp.y
          if (po < 1) alpha *= 1 + Math.sin(po * Math.PI) * 0.8
        }

        // 03: the outcome becomes the light around a piece of work, then settles into a rim
        const pf = clamp(S.toFrame * 1.45 - r[j + 2] * 0.45)
        if (pf > 0) {
          const fr = frameRect(L, i, S.workIdx)
          roundedPerim(fr, (G.radius ?? CARD_RADIUS) * fr.w / L.hero.w, u + (thin ? 0 : r[j + 1] * 0.01), this.tmp)
          let fx = this.tmp.x, fy = this.tmp.y
          if (!thin) { fx += (r[j + 2] - 0.5) * 4 * sc; fy += (r[j + 3] - 0.5) * 4 * sc }
          const pe = ease(pf)
          this.a.x = ox; this.a.y = oy
          this.b.x = ox + (r[j + 1] - 0.5) * oR * 2; this.b.y = oy - oR * 1.2
          this.c.x = fx + (fr.x + fr.w / 2 - fx) * -0.25; this.c.y = fy + (fr.y + fr.h / 2 - fy) * -0.25
          this.d.x = fx; this.d.y = fy
          bez(this.a, this.b, this.c, this.d, pe, this.tmp); x = this.tmp.x; y = this.tmp.y
          const settle = S.reveal
          alpha *= mix(1, fr.bright * (thin ? 0.22 : 0.35), settle) * (pf < 1 ? 1 + Math.sin(pf * Math.PI) * 0.6 : 1)
          size *= mix(1, thin ? 0.8 : 1.3, settle)
          if (fr.bright < 0.02 && settle > 0.9) continue
        }
        this.put(x, y, size, col, alpha * forceA * (0.85 + 0.15 * Math.sin(t * 2 + k)), hard)
      }
    }

    composeLater((x, y, sz, c, a, h) => this.put(x, y, sz, c, a, h), S, G, L, t, i => this.rnd[i % this.rnd.length], pp, frameRect(L, 2, S.workIdx))

    // the point
    const inRing = clamp(S.team * 2.2) * (1 - ease(S.share))
    const ptA = S.pt * mix(mix(1, 0.45, ease(S.toFrame)), 1, ease(S.pm4)) * (1 - 0.92 * inRing)
    if (ptA > 0.01) {
      const g = S.ptR
      this.put(pp.x, pp.y, 260 * g * sc, COL.lime, 0.10 * ptA, 0)
      this.put(pp.x, pp.y, 90 * g * sc, COL.lime, 0.35 * ptA, 0)
      this.put(pp.x, pp.y, 30 * g * sc, COL.lime, 0.9 * ptA, 0.2)
      this.put(pp.x, pp.y, 12 * g * sc, COL.lime, 1 * ptA, 0.55)
    }
    return this.n
  }
}
