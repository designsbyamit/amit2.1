import { useEffect, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

/** Types a word out, holds it, deletes it, then moves to the next, in a loop.
 *  With reduced motion the words simply swap on a slow timer. */
export default function TypedWord({ words, className }: { words: string[]; className?: string }) {
  const reduced = useReducedMotion()
  const [i, setI] = useState(0)
  const [n, setN] = useState(reduced ? words[0].length : 0)
  const [phase, setPhase] = useState<'type' | 'hold' | 'erase'>(reduced ? 'hold' : 'type')

  useEffect(() => {
    const w = words[i]
    let t: ReturnType<typeof setTimeout>
    if (reduced) {
      t = setTimeout(() => { const k = (i + 1) % words.length; setI(k); setN(words[k].length) }, 2600)
    } else if (phase === 'type') {
      t = n < w.length ? setTimeout(() => setN(n + 1), n === 0 ? 450 : 85) : setTimeout(() => setPhase('hold'), 0)
    } else if (phase === 'hold') {
      t = setTimeout(() => setPhase('erase'), 1700)
    } else {
      t = n > 0 ? setTimeout(() => setN(n - 1), 38) : setTimeout(() => { setI((i + 1) % words.length); setPhase('type') }, 220)
    }
    return () => clearTimeout(t)
  }, [i, n, phase, reduced, words])

  return (
    <span className={className} aria-hidden="true">
      {words[i].slice(0, n)}
      <span className="typed-caret" />
    </span>
  )
}
