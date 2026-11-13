import { useEffect, useMemo, useRef, useState } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'
import { atlasYears, atlasRoles, atlasByYear, atlasTotal } from '../../data/atlasSummary'
import Button from '../ds/Button'

const HUES = ['--viz-des', '--viz-res', '--viz-lead', '--viz-mgr']
const hue = (i: number) => `rgb(var(${HUES[i]}))`
const EVENTS: Record<number, string> = { 2014: 'First Design Lead role', 2017: 'DesignOps, team of 15+', 2020: 'First Design Manager role', 2023: 'The busiest year' }

const W = 1100, H = 280, L = 20, R = 20, T = 16, B = 8
const N = atlasYears.length
const px = (i: number) => L + (i / (N - 1)) * (W - L - R)

/** Smooth path through points, same curve as the atlas. */
function curve(p: [number, number][]) {
  if (p.length < 2) return ''
  let d = `M${p[0][0]},${p[0][1]}`
  for (let i = 0; i < p.length - 1; i++) {
    const a = p[i - 1] || p[i], b = p[i], c = p[i + 1], e = p[i + 2] || c, t = 0.18
    d += ` C${b[0] + (c[0] - a[0]) * t},${b[1] + (c[1] - a[1]) * t} ${c[0] - (e[0] - b[0]) * t},${c[1] - (e[1] - b[1]) * t} ${c[0]},${c[1]}`
  }
  return d
}

/** A small, living version of the atlas: the river redraws on view, a scan line walks the years, and the dots below pop in. Click anywhere to open the atlas. */
export default function CareerAtlasPreview() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10%' })
  const reduce = useReducedMotion()
  const [scan, setScan] = useState(N - 1)
  const [hover, setHover] = useState<number | null>(null)
  const [role, setRole] = useState<number | null>(null)

  useEffect(() => {
    if (!inView || reduce || hover !== null) return
    const id = window.setInterval(() => setScan(s => (s + 1) % N), 1100)
    return () => window.clearInterval(id)
  }, [inView, reduce, hover])

  const bands = useMemo(() => {
    const totals = atlasByYear.map(r => r.reduce((a, b) => a + b, 0))
    const k = (H - T - B) / 2.1 / Math.max(...totals)
    const cy = T + (H - T - B) / 2
    const base = totals.map(t => -t / 2)
    return atlasRoles.map((_, r) => {
      const top: [number, number][] = [], bot: [number, number][] = []
      atlasYears.forEach((_, i) => { const c = atlasByYear[i][r]; top.push([px(i), cy + (base[i] + c) * k]); bot.push([px(i), cy + base[i] * k]); base[i] += c })
      const rev = curve(bot.slice().reverse()).replace(/^M[^ ]+ /, '')
      return `${curve(top)} L${bot[bot.length - 1][0]},${bot[bot.length - 1][1]} ${rev}`
    })
  }, [])

  const i = hover ?? scan
  const counts = atlasByYear[i]
  const total = counts.reduce((a, b) => a + b, 0)
  const caption = `${atlasYears[i]} · ${total ? `${total} project${total === 1 ? '' : 's'} · ${atlasRoles.map((r, j) => counts[j] ? `${r} ${counts[j]}` : '').filter(Boolean).join(', ')}` : 'no records'}${EVENTS[atlasYears[i]] ? ` · ${EVENTS[atlasYears[i]]}` : ''}`

  const yearAt = (e: React.PointerEvent<SVGSVGElement>) => {
    const bb = e.currentTarget.getBoundingClientRect()
    const vx = ((e.clientX - bb.left) / bb.width) * W
    return Math.max(0, Math.min(N - 1, Math.round(((vx - L) / (W - L - R)) * (N - 1))))
  }
  const open = () => window.location.assign('/career-atlas/')
  const dim = (r: number) => (role === null || role === r ? 1 : 0.15)

  return (
    <div ref={ref} className="mt-8 md:mt-10 rounded-3 border p-6 md:p-10" style={{ borderColor: 'var(--line-1)', background: 'rgb(var(--surface-1-rgb))' }}>
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-8">
        <div className="max-w-2xl">
          <p className="text-overline text-ink-3 mb-3">Career atlas</p>
          <p className="font-serif text-ink" style={{ fontSize: 'var(--fs-figure)', lineHeight: 1.2 }}>The numbers are the headline. The story is in the {atlasTotal} projects behind them.</p>
        </div>
        <Button href="/career-atlas/" variant="secondary" arrow className="shrink-0 self-start md:self-auto">Explore my Career Atlas</Button>
      </div>

      <div className="flex flex-wrap gap-2 mb-4" role="group" aria-label="Highlight a role">
        {atlasRoles.map((r, j) => (
          <button key={r} type="button" onPointerEnter={() => setRole(j)} onPointerLeave={() => setRole(null)} onFocus={() => setRole(j)} onBlur={() => setRole(null)} onClick={open}
            className="inline-flex items-center gap-2 rounded-full border px-4 py-1 text-body-sm text-ink-2 hover:text-ink transition-colors" style={{ borderColor: 'var(--line-2)' }}>
            <span className="inline-block rounded-full" style={{ width: 'var(--space-10)', height: 'var(--space-10)', background: hue(j) }} />{r}
          </button>
        ))}
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} ${H}`} className="w-full cursor-pointer min-w-[var(--viz-min)] md:min-w-0" role="img" aria-label="Career river: projects per year, split by role. Click to open the Career Atlas."
          onPointerMove={e => setHover(yearAt(e))} onPointerLeave={() => setHover(null)} onClick={open}>
          <motion.g initial={reduce ? false : { clipPath: 'inset(0 100% 0 0)' }} animate={inView ? { clipPath: 'inset(0 0% 0 0)' } : undefined} transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1] }}>
            {bands.map((d, r) => <path key={r} d={d} fill={hue(r)} opacity={0.85 * dim(r)} style={{ transition: 'opacity var(--dur-base)' }} />)}
          </motion.g>
          <line x1={px(i)} x2={px(i)} y1={T} y2={H - B} stroke="rgb(var(--ink-rgb))" strokeWidth="1.5" opacity="0.5" style={{ transition: hover === null ? 'all var(--dur-slow) var(--ease-out)' : 'none', pointerEvents: 'none' }} />
        </svg>
      </div>

      <div className="overflow-x-auto">
        <svg viewBox={`0 0 ${W} 150`} className="w-full min-w-[var(--viz-min)] md:min-w-0 mt-2" aria-hidden="true">
          {atlasYears.map((y, yi) => {
            let n = 0
            return (
              <g key={y} opacity={yi === i ? 1 : 0.55} style={{ transition: 'opacity var(--dur-base)' }}>
                {atlasByYear[yi].flatMap((c, r) => Array.from({ length: c }, (_, k) => {
                  const idx = n++
                  return (
                    <motion.circle key={`${r}-${k}`} cx={px(yi)} cy={118 - idx * 11} r={4.5} fill={hue(r)} opacity={dim(r)}
                      initial={reduce ? false : { scale: 0 }} animate={inView ? { scale: 1 } : undefined}
                      transition={{ type: 'spring', stiffness: 380, damping: 18, delay: 0.5 + yi * 0.05 + idx * 0.025 }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }} />
                  )
                }))}
                <text x={px(yi)} y={144} textAnchor="middle" fill="rgb(var(--ink-3-rgb))" fontFamily="var(--font-mono)" fontSize="11">{y}</text>
              </g>
            )
          })}
        </svg>
      </div>
      <p className="text-label text-ink-2 mt-4 min-h-6" aria-live="off">{caption}</p>
    </div>
  )
}
