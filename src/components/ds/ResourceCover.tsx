import type { FieldTone } from './MediaFrame'

type Motif = 'loop' | 'phases' | 'conversation' | 'books' | 'checklist' | 'spark'

const L = '#C8F55A' // signal on fields (same in both modes)
const I = '#ECEDEF'

function Diagram({ motif }: { motif: Motif }) {
  switch (motif) {
    case 'loop':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true"><circle cx="44" cy="35" r="27" fill="none" stroke={L} strokeWidth="2" /><circle cx="76" cy="35" r="27" fill="none" stroke={I} strokeWidth="2" /></svg>
    case 'phases':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true"><path d="M8 60 L32 47 L56 38 L80 22 L108 10" fill="none" stroke={L} strokeWidth="2" />{[[8, 60], [32, 47], [56, 38], [80, 22]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="4" fill={I} />)}<circle cx="108" cy="10" r="5" fill={L} /></svg>
    case 'conversation':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true"><rect x="6" y="6" width="74" height="16" rx="8" fill="none" stroke={I} strokeWidth="1.5" /><rect x="40" y="28" width="74" height="16" rx="8" fill={L} /><rect x="6" y="50" width="60" height="16" rx="8" fill="none" stroke={I} strokeWidth="1.5" /></svg>
    case 'books':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true">{[[10, 18, 50], [32, 14, 56], [50, 20, 46], [74, 12, 58]].map(([x, w, h], i) => <rect key={x} x={x} y={66 - h} width={w} height={h} rx="2" fill={i === 1 ? L : 'none'} stroke={I} strokeWidth="1.5" />)}<path d="M92 66 L106 18" stroke={I} strokeWidth="1.5" /></svg>
    case 'spark':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true"><path d="M52 4 C54 24 58 30 78 35 C58 40 54 46 52 66 C50 46 46 40 26 35 C46 30 50 24 52 4Z" fill={L} /><path d="M92 8 C93 16 95 18 103 20 C95 22 93 24 92 32 C91 24 89 22 81 20 C89 18 91 16 92 8Z" fill="none" stroke={I} strokeWidth="1.5" /><rect x="86" y="50" width="26" height="3" rx="1.5" fill={I} opacity="0.5" /><rect x="86" y="58" width="16" height="3" rx="1.5" fill={I} opacity="0.5" /></svg>
    case 'checklist':
      return <svg viewBox="0 0 120 70" className="w-full h-auto" aria-hidden="true">{[8, 28, 48].map((y, i) => <g key={y}><rect x="6" y={y} width="14" height="14" rx="3" fill={i < 2 ? L : 'none'} stroke={i < 2 ? L : I} strokeWidth="1.5" /><rect x="28" y={y + 5} width={i === 2 ? 50 : 80} height="4" rx="2" fill={I} opacity={i === 2 ? 0.5 : 1} /></g>)}</svg>
  }
}

const bg: Record<FieldTone, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' }

/** Sheet-style cover for a downloadable resource (3:4). Same in both modes. */
export default function ResourceCover({ title, kind, motif, tone = 'cobalt', index }: { title: string; kind: string; motif: Motif; tone?: FieldTone; index?: number }) {
  return (
    <div className="relative rounded-2 p-5 md:p-6 flex flex-col justify-between overflow-hidden shadow-[0_18px_40px_rgb(0_0_0/0.25)]" style={{ aspectRatio: '3 / 4', background: bg[tone], color: I }} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="relative flex justify-between font-mono text-[0.6875rem] tracking-[0.08em] uppercase" style={{ color: L }}>
        <span>{kind}</span>{index !== undefined && <span>{String(index).padStart(2, '0')}</span>}
      </div>
      <div className="relative w-3/4 self-center"><Diagram motif={motif} /></div>
      <p className="relative text-[1.375rem] md:text-[1.5rem] font-light tracking-[-0.02em] leading-[1.1]">{title}</p>
    </div>
  )
}
