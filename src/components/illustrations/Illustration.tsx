import { SCENES, type IllustrationName } from './scenes'

/** Spot illustration, 4:3. Colours come from site tokens, so it follows light and dark. Decorative by default (the page text already says it). */
export default function Illustration({ name, className = '', label }: { name: IllustrationName; className?: string; label?: string }) {
  const Scene = SCENES[name]
  return (
    <svg viewBox="0 0 480 360" className={className} fill="none" role={label ? 'img' : undefined} aria-label={label} aria-hidden={label ? undefined : true} style={{ color: 'var(--color-ink)' }}>
      <Scene />
    </svg>
  )
}
export { SCENES }
export type { IllustrationName }
