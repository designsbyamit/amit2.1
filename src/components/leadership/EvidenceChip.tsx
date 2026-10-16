import type { Provenance, PracticeStatus } from '../../data/cases'

const rule = 'rgb(var(--ink-rgb) / 0.18)'

const provenance: Record<Provenance, { label: string; hint: string }> = {
  mine: { label: 'Mine', hint: 'My individual contribution' },
  team: { label: 'Team', hint: 'Delivered by the team' },
  influenced: { label: 'Influenced', hint: 'Outcome I influenced; my direct impact is not established' },
  established: { label: 'Established', hint: 'Outcome with direct impact established by evidence' },
}

const status: Record<PracticeStatus, { label: string; hint: string }> = {
  'field-tested': { label: 'Field-tested', hint: 'Used repeatedly in real work' },
  adapted: { label: 'Adapted from experience', hint: 'Drawn from real experience, not yet tested as a method' },
  experimental: { label: 'Experimental', hint: 'Proposed; to be tested' },
}

function Mark({ kind }: { kind: 'solid' | 'ring' | 'half' | 'check' }) {
  return (
    <svg width="10" height="10" viewBox="0 0 10 10" aria-hidden="true" className="flex-none">
      {kind === 'solid' && <circle cx="5" cy="5" r="4" fill="currentColor" />}
      {kind === 'ring' && <circle cx="5" cy="5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.3" />}
      {kind === 'half' && <><circle cx="5" cy="5" r="3.4" fill="none" stroke="currentColor" strokeWidth="1.3" /><path d="M5 1.6a3.4 3.4 0 0 0 0 6.8z" fill="currentColor" /></>}
      {kind === 'check' && <path d="M1.5 5.4l2.3 2.3 4.7-5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />}
    </svg>
  )
}

const base = 'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[0.75rem] leading-none text-ink-2 whitespace-nowrap'

export function ProvenanceChip({ who }: { who: Provenance }) {
  const p = provenance[who]
  const mark = who === 'mine' ? 'solid' : who === 'team' ? 'ring' : who === 'influenced' ? 'half' : 'check'
  return <span className={base} style={{ borderColor: rule }} title={p.hint}><Mark kind={mark} />{p.label}</span>
}

export function StatusChip({ status: s, onDark }: { status: PracticeStatus; onDark?: boolean }) {
  const t = status[s]
  return <span className={base} style={onDark ? { borderColor: 'rgb(255 255 255 / 0.4)', color: '#ECEDEF' } : { borderColor: rule }} title={t.hint}>{t.label}</span>
}
