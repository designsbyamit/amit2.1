import Mark, { markForStory } from '../marks/Marks'
import type { FieldTone } from './MediaFrame'

const bg: Record<FieldTone, string> = { cobalt: 'var(--field-cobalt)', teal: 'var(--field-teal)', plum: 'var(--field-plum)', graphite: 'var(--field-graphite)' }

/** Cover for a short story: a flat field with the same faint grid as the resource covers, and the story's pictogram. Same in both modes. */
export default function StoryField({ slug, tone, size = 84, aspect = '16 / 8', className = '' }: { slug: string; tone: FieldTone; size?: number; aspect?: string; className?: string }) {
  const name = markForStory(slug)
  return (
    <div className={`relative grid place-items-center overflow-hidden text-white ${className}`} style={{ background: bg[tone], aspectRatio: aspect, ['--mk-accent' as string]: '#C8F55A', ['--mk-bg' as string]: 'transparent' }} aria-hidden="true">
      <div className="absolute inset-0 opacity-[0.07]" style={{ backgroundImage: 'linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      {name && <div className="relative"><Mark name={name} size={size} /></div>}
    </div>
  )
}
