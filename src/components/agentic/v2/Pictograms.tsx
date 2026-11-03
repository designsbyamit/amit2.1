import './v2.css'

/** Six small animated pictograms for "how it worked before". Decorative: the captions carry the meaning. */
function Svg({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <svg viewBox="0 0 120 90" className="pg" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" role="img" aria-label={label}>{children}</svg>
  )
}
const lines = (x: number, y: number, n: number, w = 24, gap = 7) => Array.from({ length: n }, (_, i) => <path key={i} d={`M${x} ${y + i * gap} h${i === n - 1 ? w * 0.6 : w}`} />)

const SUPPLIER = (
  <Svg label="A supplier's email arrives with a PDF attached">
    <g className="pg-rise"><rect x="42" y="14" width="36" height="44" rx="3" fill="var(--surface-1)" />{lines(49, 24, 4, 22, 7)}<text x="49" y="52" className="acc-fill" fontSize="7" fontFamily="var(--font-mono)" stroke="none">PDF</text></g>
    <rect x="20" y="40" width="80" height="40" rx="4" fill="var(--surface-1)" />
    <path d="M20 44 L60 66 L100 44" />
  </Svg>
)
const READS = (
  <Svg label="Someone reads the document by eye">
    <rect x="30" y="10" width="52" height="70" rx="3" />
    {lines(38, 22, 6, 36, 9)}
    <g className="pg-scan"><circle cx="86" cy="24" r="10" className="acc" fill="var(--surface-1)" /><path d="M93 31 L103 41" className="acc" /></g>
  </Svg>
)
const COMPARE = (
  <Svg label="The confirmation is compared with the purchase order, line by line">
    <rect x="10" y="12" width="40" height="64" rx="3" />{lines(17, 24, 5, 26, 10)}
    <rect x="70" y="12" width="40" height="64" rx="3" />{lines(77, 24, 5, 26, 10)}
    <path d="M52 34 H68 M52 44 H68 M52 54 H68" className="pg-flow" />
    <g className="pg-blink"><path d="M52 64 H68" className="acc" /><circle cx="60" cy="64" r="2.4" className="acc-fill" /></g>
  </Svg>
)
const RISK = (
  <Svg label="Risk is judged by hand, with no common structure">
    <path d="M60 30 V74 M44 74 H76" />
    <g className="pg-tilt"><path d="M24 30 H96" /><path d="M24 30 L16 52 H32 Z" fill="var(--surface-1)" /><path d="M96 30 L88 52 H104 Z" fill="var(--surface-1)" /></g>
    <circle cx="60" cy="30" r="3.2" className="acc-fill" />
  </Svg>
)
const CHASE = (
  <Svg label="Owners are chased by email">
    <circle cx="22" cy="34" r="8" /><path d="M8 66 C8 52 36 52 36 66" />
    <circle cx="98" cy="34" r="8" /><path d="M84 66 C84 52 112 52 112 66" />
    <g className="pg-ping"><rect x="30" y="22" width="20" height="14" rx="2" className="acc" fill="var(--surface-1)" /><path d="M30 24 L40 31 L50 24" className="acc" /></g>
    <path d="M30 78 H90" strokeDasharray="2 5" />
  </Svg>
)
const FIX = (
  <Svg label="The supplier is told what to fix, and the cycle repeats">
    <g className="pg-spin"><path d="M60 16 A29 29 0 0 1 89 45" /><path d="M84 40 L89 45 L94 40" /><path d="M60 74 A29 29 0 0 1 31 45" /><path d="M26 50 L31 45 L36 50" /></g>
    <rect x="48" y="36" width="24" height="18" rx="2" className="acc" /><path d="M48 38 L60 47 L72 38" className="acc" />
  </Svg>
)
export const PICTOGRAMS = [SUPPLIER, READS, COMPARE, RISK, CHASE, FIX]
