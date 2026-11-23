import { useState } from 'react'
import { Link } from 'react-router-dom'
import { films } from '../../data/films'
import VideoModal from '../ui/VideoModal'
import { caseStudies } from '../../data/work'
import NextUp from './NextUp'
import { nextCase } from '../../data/sequence'

/** On a detailed case study: a way back to the short story, near the top of the page. */
export function BackToShort({ id }: { id: string }) {
  const cs = caseStudies.find(c => c.id === id)
  const [watching, setWatching] = useState(false)
  if (!cs) return null
  const film = films[id]
  return (
    <div className="absolute inset-x-0 z-20 pointer-events-none" style={{ top: 'calc(var(--header-h) + 6px)' }}>
      <div className="container-site flex flex-wrap items-center gap-2">
        <Link to={`/craft/${id}`} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-label text-ink-2 hover:text-white transition-colors bg-bg" style={{ borderColor: 'var(--line-2)' }} aria-label={`Back to the short story: ${cs.shortTitle}`}>
          <svg width="14" height="14" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M13 8H3M7 4 3 8l4 4" strokeLinecap="round" strokeLinejoin="round" /></svg>
          Read the short story
        </Link>
        {film && <button type="button" onClick={() => setWatching(true)} className="pointer-events-auto inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-label text-ink-2 hover:text-white transition-colors bg-bg" style={{ borderColor: 'var(--line-2)' }}>Watch the film</button>}
        {watching && film && <VideoModal src={film.to} title={film.title} onClose={() => setWatching(false)} />}
      </div>
    </div>
  )
}

/** At the end of a case study: the next project, so people keep exploring. */
export function NextCase({ id }: { id: string }) {
  return <NextUp link={nextCase(id)} />
}
