/** Mechanism diagram for the capability case: a learning loop with people growth running underneath it. */
export default function CapabilityLoop() {
  const nodes = [
    { x: 40, label: 'Learn', sub: 'library, research, peers' },
    { x: 270, label: 'Experiment', sub: 'sprints, OKRs, POCs' },
    { x: 500, label: 'Build assets', sub: 'portal, toolkit, cases' },
    { x: 730, label: 'Apply', sub: 'real problems, customers' },
  ]
  return (
    <figure className="rounded-3 p-5 md:p-8 bg-surface-1">
      <div className="overflow-x-auto" tabIndex={0} aria-label="Diagram, scrolls sideways on small screens"><svg viewBox="0 0 960 290" role="img" aria-labelledby="loop-t loop-d" className="w-full h-auto min-w-[640px]" style={{ color: 'rgb(var(--ink-rgb))' }}>
        <title id="loop-t">The capability loop</title>
        <desc id="loop-d">Four stages in a loop, Learn, Experiment, Build assets and Apply, with a return arrow from Apply back to Learn. Beneath them, a bar shows people growing through real work, coaching and regular reviews across all four stages.</desc>
        <defs><marker id="ar" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M1 1l8 4-8 4z" fill="currentColor" /></marker></defs>
        {nodes.map((n, i) => (
          <g key={n.label}>
            <rect x={n.x} y="30" width="190" height="96" rx="14" fill="none" stroke="currentColor" strokeWidth="1.6" strokeOpacity={i === 2 ? 1 : 0.55} />
            <text x={n.x + 95} y="70" textAnchor="middle" fontSize="26" fontWeight="500" fill="currentColor">{n.label}</text>
            <text x={n.x + 95} y="102" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.65">{n.sub}</text>
            {i < 3 && <line x1={n.x + 196} y1="78" x2={n.x + 224} y2="78" stroke="currentColor" strokeWidth="1.6" markerEnd="url(#ar)" />}
          </g>
        ))}
        <path d="M825 132 C825 178 135 178 135 134" fill="none" stroke="currentColor" strokeWidth="1.6" strokeDasharray="5 5" markerEnd="url(#ar)" />
        <text x="480" y="170" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.65">what is learned in application feeds the next round</text>
        <rect x="40" y="206" width="880" height="56" rx="14" fill="currentColor" fillOpacity="0.08" />
        <text x="480" y="230" textAnchor="middle" fontSize="20" fontWeight="500" fill="currentColor">People grow through real work</text>
        <text x="480" y="252" textAnchor="middle" fontSize="16" fill="currentColor" fillOpacity="0.65">coaching &middot; regular reviews &middot; owning their thinking and presentations</text>
      </svg></div>
      <figcaption className="text-label text-ink-3 mt-4">Diagram of the approach as described; not project data.</figcaption>
    </figure>
  )
}
