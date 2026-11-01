/**
 * A hand-drawn note that marks a page as the short version of a case study: the words circled with an
 * uneven pen loop and an arrow curling up toward the headline. `compact` is the small inline version for phones.
 */
export default function ShortStoryTag({ compact = false }: { compact?: boolean }) {
  const font = "'Caveat Variable', 'Segoe Script', cursive"
  if (compact) {
    return (
      <span className="inline-block select-none text-signal-ink leading-none" style={{ transform: 'rotate(-3deg)', fontFamily: font, fontSize: '1.45rem', fontWeight: 500 }}>
        the short story
        <svg width="104" height="7" viewBox="0 0 104 7" fill="none" aria-hidden="true" className="block" style={{ marginTop: 1, opacity: 0.85 }}>
          <path d="M2 4.5C14 1.5 22 6 36 3.6S60 2 72 4.4 92 3 102 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        </svg>
      </span>
    )
  }
  return (
    <span className="relative inline-block select-none text-signal-ink" style={{ width: 220, height: 132 }} aria-label="the short story">
      <svg width="220" height="132" viewBox="0 0 220 132" fill="none" aria-hidden="true" className="absolute inset-0" style={{ overflow: 'visible' }}>
        {/* the loop: starts low, overshoots where it closes, as a pen would */}
        <path d="M44 96C14 82 14 44 66 36C124 27 204 40 205 72C206 104 134 118 80 111C50 107 30 94 30 78C30 62 52 52 74 49" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        {/* the arrow, from the loop up toward the headline */}
        <path d="M98 33C116 12 104 -12 86 -30" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        <path d="M76 -20L86 -32L99 -22" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span className="absolute inset-0 flex items-center justify-center text-center leading-[0.95]" style={{ fontFamily: font, fontSize: '1.75rem', fontWeight: 600, transform: 'rotate(-12deg) translate(4px, 6px)' }}>
        the short<br />story
      </span>
    </span>
  )
}
