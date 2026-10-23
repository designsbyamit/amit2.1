import { Link } from 'react-router-dom'
import { colleagueTestimonials } from '../../data/testimonials'

/** One voice on the home page, and a way to the rest. */
export default function HomeTestimonial() {
  const t = colleagueTestimonials[0]
  return (
    <section className="section-y hairline-top" aria-labelledby="home-voices-h">
      <div className="container-site">
        <div className="flex items-end justify-between gap-6 mb-10 md:mb-14">
          <h2 id="home-voices-h" className="text-display-l text-ink">What my clients and leads say</h2>
          <Link to="/about#testimonials" className="btn btn-ghost">View all</Link>
        </div>
        <figure className="card !p-8 md:!p-12 max-w-4xl">
          <blockquote className="text-body-lg text-ink-2" style={{ lineHeight: 1.55 }}>&ldquo;{t.quote}&rdquo;</blockquote>
          <figcaption className="mt-8">
            <p className="text-body-sm text-ink">{t.name}</p>
            <p className="text-caption text-ink-3">{t.role}</p>
          </figcaption>
        </figure>
      </div>
    </section>
  )
}
