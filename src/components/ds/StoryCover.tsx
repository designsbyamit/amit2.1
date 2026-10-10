import type { FieldTone } from './MediaFrame'

export type StoryMotif = 'seat' | 'team' | 'influence' | 'hub' | 'culture'

const L = '#C8F55A'
const I = '#ECEDEF'
const bg: Record<FieldTone, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' }

/** Abstract motif for each leadership story. Decorative: the title carries the meaning. */
function Motif({ motif }: { motif: StoryMotif }) {
  switch (motif) {
    case 'seat': // a table with seats; one seat is the signal
      return <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
        <rect x="50" y="50" width="100" height="20" rx="10" fill="none" stroke={I} strokeWidth="1.5" />
        {[60, 85, 115, 140].map(x => <circle key={x} cx={x} cy="34" r="8" fill="none" stroke={I} strokeWidth="1.5" />)}
        {[60, 85, 140].map(x => <circle key={x} cx={x} cy="86" r="8" fill="none" stroke={I} strokeWidth="1.5" />)}
        <circle cx="115" cy="86" r="8" fill={L} />
      </svg>
    case 'team': // a team forming around a first hire
      return <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
        <circle cx="100" cy="60" r="10" fill={L} />
        {[[70, 40], [130, 40], [60, 75], [140, 75], [100, 95], [100, 25]].map(([x, y], i) => <g key={i}><line x1="100" y1="60" x2={x} y2={y} stroke={I} strokeWidth="1" opacity="0.5" /><circle cx={x} cy={y} r="7" fill="none" stroke={I} strokeWidth="1.5" /></g>)}
      </svg>
    case 'influence': // ripples outward without a reporting line
      return <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
        {[14, 28, 42, 56].map((r, i) => <circle key={r} cx="70" cy="60" r={r} fill="none" stroke={I} strokeWidth="1.5" opacity={1 - i * 0.2} />)}
        <circle cx="70" cy="60" r="6" fill={L} />
        {[[150, 35], [165, 70], [140, 95]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="6" fill="none" stroke={L} strokeWidth="1.5" />)}
      </svg>
    case 'hub': // a community network around one hub
      return <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, i) => { const a = (i / 12) * Math.PI * 2; const x = 100 + Math.cos(a) * 48; const y = 60 + Math.sin(a) * 40; return <g key={i}><line x1="100" y1="60" x2={x} y2={y} stroke={I} strokeWidth="1" opacity="0.45" /><circle cx={x} cy={y} r="4" fill={I} /></g> })}
        <circle cx="100" cy="60" r="12" fill={L} />
      </svg>
    case 'culture': // layers building up from the inside
      return <svg viewBox="0 0 200 120" className="w-full h-full" aria-hidden="true">
        {[0, 1, 2, 3].map(i => <rect key={i} x={40 + i * 10} y={88 - i * 20} width={120 - i * 20} height="14" rx="3" fill={i === 3 ? L : 'none'} stroke={i === 3 ? L : I} strokeWidth="1.5" />)}
      </svg>
  }
}

/** Visual for a leadership story card and page. Same in both modes. */
export default function StoryCover({ motif, tone = 'cobalt', number, className = '', ratio = '16 / 10' }: { motif: StoryMotif; tone?: FieldTone; number?: string; className?: string; ratio?: string }) {
  return (
    <div className={`relative overflow-hidden rounded-2 ${className}`} style={{ aspectRatio: ratio, background: bg[tone] }} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.06]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '28px 28px' }} />
      <div className="absolute inset-[12%]"><Motif motif={motif} /></div>
      {number && <span className="absolute left-5 bottom-3 font-extralight leading-none tracking-[-0.05em] text-[clamp(3.5rem,7vw,6rem)]" style={{ color: I, opacity: 0.9 }}>{number}</span>}
    </div>
  )
}
