import { useState } from 'react'
import Signal from '../components/home3/Signal'
import SignalStill from '../components/home3/SignalStill'

const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

/** Home v3, in review: the Signal direction. One continuous story told in light; keyframes 01 to 03 so far. */
export default function HomeV3() {
  const [still] = useState(reduced)
  return still ? <SignalStill /> : <Signal />
}
