import { Link } from 'react-router-dom'
import NavGlyph, { type NavGlyphKind } from '../illustrations/signal/NavGlyph'

/** The five doors out of the story, one per main menu item. */
const DOORS: { label: string; to: string; line: string; glyph: NavGlyphKind }[] = [
  { label: 'Works', to: '/craft', line: 'Case studies, deep dives and films.', glyph: 'works' },
  { label: 'Leadership', to: '/leadership', line: 'The journey, its stories and cases.', glyph: 'leadership' },
  { label: 'Practice', to: '/resources', line: 'Toolkits and playbooks to use.', glyph: 'practice' },
  { label: 'About', to: '/about', line: 'Background, path and principles.', glyph: 'about' },
  { label: 'Growth and Aspirations', to: '/learn', line: 'Learning, mentoring and guides.', glyph: 'grow' },
]

const Arrow = () => (
  <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
)

/** The card follows the pointer: it tilts towards it and a light gathers where it rests. */
function track(e: React.PointerEvent<HTMLAnchorElement>) {
  if (e.pointerType === 'touch') return
  const el = e.currentTarget, r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
  el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  el.style.setProperty('--ry', `${((x - 0.5) * 16).toFixed(2)}deg`)
  el.style.setProperty('--rx', `${((0.5 - y) * 14).toFixed(2)}deg`)
  el.dataset.lit = ''
}
function release(e: React.PointerEvent<HTMLAnchorElement>) {
  const el = e.currentTarget
  el.style.setProperty('--ry', '0deg')
  el.style.setProperty('--rx', '0deg')
  delete el.dataset.lit
}

/**
 * Five lit, tilting cards that let the visitor carry on into the site.
 * In the animated home each wrapper (`.sg-door`) is revealed by the scroll timeline;
 * the tilt and light live on the inner link, so the two never fight over transforms.
 */
export default function NavCards({ className = '' }: { className?: string }) {
  return (
    <nav aria-label="Explore the site" className={className}>
      <p className="sg-doors-over text-overline text-on-field-muted mb-3 md:mb-4">Keep exploring</p>
      <ul className="sg-doors flex md:grid md:grid-cols-5 gap-3 md:gap-4 overflow-x-auto md:overflow-visible snap-x snap-mandatory scroll-px-5 md:scroll-px-0 -mx-5 px-5 md:mx-0 md:px-0 pb-2 md:pb-0">
        {DOORS.map((d, i) => (
          <li key={d.to} className="sg-door shrink-0 snap-start w-[64%] md:w-auto">
            <Link to={d.to} onPointerMove={track} onPointerLeave={release} className="lumen group">
              <span className="lumen-depth flex items-start justify-between">
                <NavGlyph kind={d.glyph} />
                <span className="text-label text-on-field-muted tabular-nums">0{i + 1}</span>
              </span>
              <span className="lumen-depth mt-auto block">
                <span className="flex items-center justify-between gap-3">
                  <span className="font-serif text-title text-on-field-strong group-hover:text-on-field-accent" style={{ lineHeight: 1.15 }}>{d.label}</span>
                  <span className="lumen-arrow text-on-field-strong group-hover:text-on-field-accent"><Arrow /></span>
                </span>
                <span className="mt-2 block text-body-sm text-on-field-muted">{d.line}</span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
