/* Three small line figures for the Grow portals. Strokes and fills come from theme tokens. */
const I = (a: number) => `rgb(var(--ink-rgb) / ${a})`
const L = 'var(--signal)'
const s = { fill: 'none', stroke: I(0.5), strokeWidth: 1 } as const

export function PracticeArt() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      {[0, 1, 2].map(i => (
        <g key={i} transform={`translate(${40 + i * 38} ${30 + i * 14})`}>
          <rect width="150" height="96" rx="10" fill={i === 2 ? I(0.08) : 'none'} stroke={I(0.18 + i * 0.22)} />
          {i === 2 && <><path d="M18 30h70M18 48h104M18 66h56" stroke={I(0.4)} /><circle cx="128" cy="24" r="5" fill={L} /></>}
        </g>
      ))}
      <path d="M232 62l10 10 22-24" fill="none" stroke={L} strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="248" cy="62" r="22" {...s} />
    </svg>
  )
}
export function PortfolioArt() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      <rect x="52" y="26" width="150" height="112" rx="8" {...s} />
      <rect x="66" y="40" width="64" height="48" rx="4" fill={I(0.14)} />
      <path d="M142 44h46M142 58h38M142 72h42M66 104h112M66 118h80" stroke={I(0.4)} />
      <rect x="178" y="70" width="90" height="66" rx="8" fill={I(0.06)} stroke={I(0.3)} />
      <path d="M190 90h56M190 104h40" stroke={I(0.4)} />
      <path d="M204 70 L224 44" stroke={L} strokeWidth="1.2" /><circle cx="226" cy="42" r="4" fill={L} />
    </svg>
  )
}
export function CuriousArt() {
  return (
    <svg viewBox="0 0 320 180" className="w-full h-full" aria-hidden>
      <circle cx="160" cy="90" r="54" {...s} /><circle cx="160" cy="90" r="78" fill="none" stroke={I(0.22)} strokeDasharray="1 5" />
      <path d="M142 80a18 18 0 1 1 26 16c-6 4-8 7-8 13" fill="none" stroke={I(0.85)} strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="160" cy="126" r="2.8" fill={I(0.85)} />
      <circle cx="238" cy="54" r="4" fill={L} /><circle cx="76" cy="120" r="3" fill={I(0.7)} /><circle cx="250" cy="130" r="2.4" fill={I(0.5)} />
    </svg>
  )
}
