/**
 * Small drawings for the five doorways at the end of the Signal home.
 * Each one is a shape from the story: frames for the work, a point with its pods,
 * a stack of shared artefacts, the point itself, and a line that keeps rising.
 */
export type NavGlyphKind = 'works' | 'leadership' | 'practice' | 'about' | 'grow'

const LIME = 'var(--on-field-accent)'
const INK = 'var(--on-field-strong)'

export default function NavGlyph({ kind }: { kind: NavGlyphKind }) {
  return (
    <svg viewBox="0 0 64 64" width="64" height="64" fill="none" aria-hidden="true" className="block">
      {kind === 'works' && (
        <g strokeWidth="1.4">
          <rect x="6" y="20" width="30" height="22" rx="3" stroke={INK} opacity="0.35" />
          <rect x="17" y="14" width="30" height="22" rx="3" stroke={INK} opacity="0.6" />
          <rect x="28" y="24" width="30" height="22" rx="3" stroke={LIME} fill="rgb(200 245 90 / 0.08)" />
          <circle cx="43" cy="35" r="2.2" fill={LIME} />
        </g>
      )}
      {kind === 'leadership' && (
        <g>
          <circle cx="32" cy="32" r="16" stroke={INK} strokeWidth="1" opacity="0.3" />
          {Array.from({ length: 8 }, (_, i) => {
            const a = (i / 8) * Math.PI * 2 - Math.PI / 2
            return <circle key={i} cx={32 + Math.cos(a) * 16} cy={32 + Math.sin(a) * 16} r="2.6" fill={INK} opacity="0.75" />
          })}
          <circle cx="32" cy="32" r="4" fill={LIME} />
        </g>
      )}
      {kind === 'practice' && (
        <g strokeWidth="1.4">
          <rect x="14" y="10" width="36" height="12" rx="3" stroke={INK} opacity="0.35" />
          <rect x="11" y="26" width="42" height="12" rx="3" stroke={INK} opacity="0.6" />
          <rect x="8" y="42" width="48" height="12" rx="3" stroke={LIME} fill="rgb(200 245 90 / 0.08)" />
        </g>
      )}
      {kind === 'about' && (
        <g>
          <circle cx="32" cy="32" r="20" stroke={INK} strokeWidth="1" opacity="0.18" />
          <circle cx="32" cy="32" r="12" stroke={INK} strokeWidth="1" opacity="0.35" />
          <circle cx="32" cy="32" r="9" fill="rgb(200 245 90 / 0.16)" />
          <circle cx="32" cy="32" r="4.5" fill={LIME} />
        </g>
      )}
      {kind === 'grow' && (
        <g strokeWidth="1.4" strokeLinecap="round">
          <path d="M8 52h48" stroke={INK} opacity="0.3" />
          <path d="M8 46 C 22 44, 28 36, 36 30 S 50 16, 54 12" stroke={LIME} />
          {[[14, 45], [24, 40], [34, 31]].map(([x, y]) => <circle key={x} cx={x} cy={y} r="2" fill={INK} opacity="0.7" />)}
          <circle cx="54" cy="12" r="3.6" fill={LIME} />
        </g>
      )}
    </svg>
  )
}
