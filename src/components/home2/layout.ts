import { atlasByYear } from '../../data/atlasSummary'

/** Everything the story draws is placed from the viewport, in pixels. One function, so every scene can inherit from the last. */

export type Pt = { x: number; y: number }
export const N_ATLAS = 61, N_TEAM = 200, N_HUB = 252
export const UNDATED = N_ATLAS - atlasByYear.reduce((a, y) => a + y.reduce((b, c) => b + c, 0), 0)

// deterministic randomness so the picture is the same on every visit
function rng(seed: number) { return () => { seed = (seed * 16807) % 2147483647; return (seed - 1) / 2147483646 } }

/** Projects per industry, from the career atlas workbook. Unlabelled covers the rows without an industry. */
export const INDUSTRIES: [string, number][] = [
  ['BFSI', 7], ['Cross-industry', 5], ['Data and AI', 4], ['Cloud and DevOps', 4], ['CMT', 4], ['Education', 3], ['Travel and hospitality', 3], ['Healthcare', 3], ['EUS', 3],
  ['Social innovation', 2], ['Manufacturing', 2], ['HR', 2], ['Real estate and fire', 2], ['IT services', 2], ['Aerospace and mobility', 2], ['CPG', 2], ['Sustainability', 2],
  ['Entertainment', 1], ['Real estate', 1], ['Unlabelled', 7],
]

export function computeLayout(W: number, H: number, header: number) {
  const mobile = W < 768
  const textH = mobile ? H * 0.37 : H * 0.3
  const top = header + 12, bottom = H - textH
  const VH = bottom - top
  const C: Pt = { x: W / 2, y: top + VH / 2 }
  const S = Math.min(W * 0.92, VH)

  // 01 forces
  const fr = S * (mobile ? 0.15 : 0.16)
  const fd = S * 0.3
  const forces: Pt[] = [210, 330, 90].map(a => ({ x: C.x + Math.cos((a * Math.PI) / 180) * fd * (mobile ? 1 : 1.25), y: C.y + Math.sin((a * Math.PI) / 180) * fd }))

  // 03 frames: a row of three, and one big centre stage
  const gap = mobile ? 10 : 28
  const rowW = mobile ? W * 0.92 : Math.min(W * 0.84, 1180)
  const fw = (rowW - gap * 2) / 3
  const bigW = mobile ? W * 0.92 : Math.min(W * 0.66, VH * 0.98 * 1.8)
  const bigH = mobile ? Math.min(bigW, VH * 0.96) : bigW / 1.8
  const fh = fw * (bigH / bigW)
  const row: Pt[] = [-1, 0, 1].map(k => ({ x: C.x + k * (fw + gap), y: C.y }))
  const rowScale = fw / bigW

  // 02 outcome paths end just below where the frames will be
  const ends: Pt[] = row.map(p => ({ x: p.x, y: C.y + Math.min(VH * 0.3, fh * 0.5 + VH * 0.12) }))
  const g = Math.min(fw * 0.5, mobile ? 52 : 120)
  // the flower: three circles meeting around the point, and three echoes between them
  const rr = fr * 0.62
  const petals: Pt[] = [-90, 30, 150].map(a => ({ x: C.x + Math.cos((a * Math.PI) / 180) * rr, y: C.y + Math.sin((a * Math.PI) / 180) * rr }))
  const echoes: Pt[] = [90, 210, 330].map(a => ({ x: C.x + Math.cos((a * Math.PI) / 180) * rr, y: C.y + Math.sin((a * Math.PI) / 180) * rr }))
  // each path leaves its petal and lands on top of its outcome mark
  const outcomePaths = ends.map((e, i) => {
    const from = petals[i], to = { x: e.x, y: e.y - g * 0.62 }
    const c1 = { x: from.x + (to.x - from.x) * 0.1, y: from.y + (to.y - from.y) * 0.75 }
    return `M${from.x},${from.y} Q${c1.x},${to.y - (to.y - from.y) * 0.1} ${to.x},${to.y}`
  })
  // 04 atlas: one column per year, plus the undated projects; stacked dots coloured by role
  const cols = atlasByYear.length + 1
  const aw = mobile ? W * 0.9 : Math.min(W * 0.8, 1120)
  const colW = aw / cols
  const sp = Math.min(colW * 0.62, (VH * 0.66) / 11)
  const base = C.y + VH * 0.33
  const dotR = Math.max(2.2, Math.min(sp * 0.34, 7))
  const atlas: { p: Pt; role: number }[] = []
  atlasByYear.forEach((roles, k) => {
    let n = 0
    roles.forEach((count, role) => { for (let c = 0; c < count; c++) atlas.push({ p: { x: C.x - aw / 2 + (k + 0.5) * colW, y: base - n++ * sp - sp / 2 }, role }) })
  })
  for (let c = 0; c < UNDATED; c++) atlas.push({ p: { x: C.x - aw / 2 + (cols - 0.5) * colW, y: base - c * sp - sp / 2 }, role: -1 })
  const axis = { x1: C.x - aw / 2, x2: C.x + aw / 2 }
  const yearX = Array.from({ length: cols }, (_, k) => C.x - aw / 2 + (k + 0.5) * colW)
  const r1 = rng(7)
  const atlasStart: Pt[] = atlas.map((_, j) => {
    const f = row[j % 3]
    return { x: f.x + (r1() - 0.5) * fw * 0.9, y: f.y + (r1() - 0.5) * fh * 0.9 }
  })

  // 04b industries: the same points regrouped, one cluster per industry, largest first
  const cl = INDUSTRIES.length, gc = mobile ? 4 : 5, gr = Math.ceil(cl / gc)
  const gw = aw / gc, gh = (VH * 0.86) / gr
  const ir = Math.min(gw, gh) * (mobile ? 0.09 : 0.1)
  const industryC: Pt[] = INDUSTRIES.map((_, k) => ({ x: C.x - aw / 2 + ((k % gc) + 0.5) * gw, y: top + VH * 0.05 + (Math.floor(k / gc) + 0.42) * gh }))
  const industryPos: Pt[] = []
  INDUSTRIES.forEach(([, n], k) => { for (let m = 0; m < n; m++) { const r = ir * 1.05 * Math.sqrt(m + 0.5), a = m * 2.39996; industryPos.push({ x: industryC[k].x + Math.cos(a) * r, y: industryC[k].y + Math.sin(a) * r }) } })
  const industryLabelY = (k: number) => industryC[k].y + ir * 3.2 + 10

  // 05 teams: eight pods of twenty-five, in a ring around the centre, laid on a tidy grid
  const pods = 8
  const rx = mobile ? W * 0.32 : Math.min(W * 0.3, S * 0.62), ry = S * (mobile ? 0.3 : 0.33)
  const ps = Math.min(S * 0.03, mobile ? 9 : 15)
  const podC: Pt[] = Array.from({ length: pods }, (_, k) => { const a = (k / pods) * Math.PI * 2 - Math.PI / 2; return { x: C.x + Math.cos(a) * rx, y: C.y + Math.sin(a) * ry } })
  const team: Pt[] = Array.from({ length: N_TEAM }, (_, j) => {
    const pc = podC[j % pods], m = Math.floor(j / pods)
    return { x: pc.x + ((m % 5) - 2) * ps, y: pc.y + (Math.floor(m / 5) - 2) * ps }
  })

  // 06 community: the pods loosen and spread past their ring; new members appear in between; ties form across groups
  const r2 = rng(19)
  const hub: Pt[] = Array.from({ length: N_HUB }, (_, j) => {
    if (j < N_TEAM) {
      const pc = podC[j % pods], a = r2() * Math.PI * 2, d = Math.sqrt(r2()) * ps * 4.2
      return { x: C.x + (pc.x - C.x) * 1.22 + Math.cos(a) * d, y: C.y + (pc.y - C.y) * 1.12 + Math.sin(a) * d }
    }
    const a = r2() * Math.PI * 2, d = (0.35 + r2() * 0.75) * Math.min(rx, ry)
    return { x: C.x + Math.cos(a) * d * (rx / ry), y: C.y + Math.sin(a) * d }
  }).map(p => ({ x: Math.max(8, Math.min(W - 8, p.x)), y: Math.max(top, Math.min(bottom, p.y)) }))
  const podOf = (j: number) => (j < N_TEAM ? j % pods : -1)
  const links: [number, number][] = []
  for (let a = 0; a < N_HUB && links.length < 150; a += 2) {
    let best = -1, bd = Infinity
    for (let b = 0; b < N_HUB; b++) {
      if (b === a || podOf(b) === podOf(a)) continue
      const d = (hub[a].x - hub[b].x) ** 2 + (hub[a].y - hub[b].y) ** 2
      if (d < bd) { bd = d; best = b }
    }
    if (best >= 0 && bd < (S * 0.2) ** 2) links.push([a, best])
  }

  // 07 three streams, each landing where a card will open
  const cardW = mobile ? W * 0.9 : fw * 0.86
  const cardH = mobile ? VH * 0.29 : fw * 0.86 * 1.08
  const cards: Pt[] = mobile ? [0, 1, 2].map(k => ({ x: C.x, y: top + VH * (0.18 + k * 0.32) })) : row

  return { W, H, mobile, top, bottom, VH, C, S, fr, forces, petals, echoes, row, rowScale, fw, fh, bigW, bigH, ends, outcomePaths, g, atlas, atlasStart, yearX, axis, base, dotR, industryC, industryPos, industryLabelY, team, podC, hub, links, cards, cardW, cardH }
}
export type Layout = ReturnType<typeof computeLayout>
