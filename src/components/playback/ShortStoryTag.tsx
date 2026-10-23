/** A small handwritten note that marks a page as the short version of a case study. Used on every short story. */
export default function ShortStoryTag() {
  return (
    <span className="inline-flex flex-col leading-none select-none text-signal-ink" style={{ transform: 'rotate(-2.5deg)' }}>
      <span style={{ fontFamily: "'Caveat Variable', 'Segoe Script', cursive", fontSize: '1.45rem', fontWeight: 500, letterSpacing: '0.01em' }}>the short story</span>
      <svg width="104" height="7" viewBox="0 0 104 7" fill="none" aria-hidden="true" style={{ marginTop: '1px', opacity: 0.85 }}>
        <path d="M2 4.5C14 1.5 22 6 36 3.6S60 2 72 4.4 92 3 102 3.2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </span>
  )
}
