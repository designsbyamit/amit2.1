import { Link } from 'react-router-dom'
import PageHeader from '../components/ui/PageHeader'

const items = [
  { to: '/mentoring', title: 'Mentoring', text: 'How I coach designers, and templates you can use with your own mentor or team.' },
  { to: '/resources', title: 'Practices and resources', text: 'Frameworks, toolkits and a reading list you can use with your own team.' },
  { to: '/community', title: 'Community', text: 'SAP Design Hub India and the events I help run.' },
  { to: '/reflections', title: 'Reflections', text: 'Essays on leadership, craft and AI.' },
  { to: '/learn/practice', title: 'Practice Toolkits', text: 'Practise designing with AI, from a conversational interface to multi-agent orchestration, with exercises and reflection prompts.' },
  { to: '/learn/portfolio', title: 'Portfolio Best Practices', text: 'Give your portfolio a character, then shape each project with a clear anatomy and a story.' },
  { to: '/learn/curious', title: 'Curious Minds', text: 'Questions from conversations with designers, answered through experience and a point of view.' },
]

export default function LearnPage() {
  return (
    <>
      <PageHeader label="Grow" title="For designers who are growing." subtitle="Mentoring, practices, community, writing, and places to practise, present your work and ask questions." />
      <section className="section-y hairline-top">
        <div className="container-site">
          <ul className="grid md:grid-cols-2 gap-4">
            {items.map(i => (
              <li key={i.to}>
                <Link to={i.to} className="group card !p-8 block h-full hover:bg-surface-1 transition-colors">
                  <h2 className="text-heading text-ink mb-3" style={{ fontWeight: 300 }}>{i.title}</h2>
                  <p className="text-body text-ink-2 max-w-[44ch]">{i.text}</p>
                  <p className="text-label text-ink-3 group-hover:text-ink mt-6">Open &rarr;</p>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  )
}
