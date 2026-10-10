import { Link } from 'react-router-dom'
import type { LeadershipStory } from '../../data/leadership'
import { storySlug } from '../../data/leadership'
import StoryCover from './StoryCover'

/** Large card for a leadership story: visual, number, title, the lesson as a teaser. Whole card is one link. */
export default function StoryCard({ story, index, featured }: { story: LeadershipStory; index: number; featured?: boolean }) {
  const n = String(index + 1).padStart(2, '0')
  return (
    <Link to={`/leadership/stories/${storySlug(story)}`} className={`group card card-link !p-0 overflow-hidden flex flex-col ${featured ? 'md:flex-row' : ''}`}>
      <div className={featured ? 'md:w-[55%] shrink-0' : ''}>
        <StoryCover motif={story.motif ?? 'seat'} tone={story.tone} number={n} className="!rounded-none transition-transform duration-500 group-hover:scale-[1.015]" ratio={featured ? '4 / 3' : '16 / 10'} />
      </div>
      <div className="p-6 md:p-8 flex flex-col gap-4 flex-1">
        <p className="text-label text-ink-3">Story {n}</p>
        <h3 className={`${featured ? 'text-heading' : 'text-title'} text-ink group-hover:underline decoration-1 underline-offset-[0.18em]`}>{story.title}</h3>
        <p className="text-body-sm text-ink-2 line-clamp-3">{story.lesson}</p>
        <span className="btn btn-ghost self-start mt-auto" aria-hidden="true">Read the story
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </span>
      </div>
    </Link>
  )
}
