/**
 * The lit card treatment shared by every card on the Signal home: the work frames, the shared artefacts and the doors at the end.
 * The edge is a hairline with a lime light that gathers where the pointer rests; cards also tilt towards it.
 */

/** Light only: move the edge light to the pointer (`.lumen-edge` and `.lumen`). Touch is ignored. */
export function lightAt(el: HTMLElement, e: PointerEvent | React.PointerEvent) {
  if (e.pointerType === 'touch') return
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height
  el.style.setProperty('--mx', `${(x * 100).toFixed(1)}%`)
  el.style.setProperty('--my', `${(y * 100).toFixed(1)}%`)
  el.dataset.lit = ''
  return { x, y }
}
export function lightOff(el: HTMLElement) { delete el.dataset.lit }

/** Light and tilt, for a `.lumen` card. */
export function track(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget, p = lightAt(el, e)
  if (!p) return
  el.style.setProperty('--ry', `${((p.x - 0.5) * 16).toFixed(2)}deg`)
  el.style.setProperty('--rx', `${((0.5 - p.y) * 14).toFixed(2)}deg`)
}
export function release(e: React.PointerEvent<HTMLElement>) {
  const el = e.currentTarget
  el.style.setProperty('--ry', '0deg')
  el.style.setProperty('--rx', '0deg')
  lightOff(el)
}
