import { Link } from 'react-router-dom'
import SectionHeader from '../ds/SectionHeader'

const items = [
  { n: '01', title: 'Distinctive thinking', text: 'Why adopting AI tools is not the same as building AI capability, and what a leader does about it.', to: '/leadership/cases/ai-experimentation-to-capability', cta: 'Read the case' },
  { n: '02', title: 'Structured practices', text: 'Methods other leaders can adapt, each one drawn from work I have actually led.', to: '/resources', cta: 'See the practices' },
  { n: '03', title: 'Outcomes, not adjectives', text: 'Each case states what changed, in numbers where they exist, and what the team achieved together.', to: '/leadership', cta: 'See the cases' },
  { n: '04', title: 'People, craft and business together', text: 'One piece of work shows all three: designers who grew, design that was reviewed, and a use for it in the business.', to: '/leadership/cases/ai-experimentation-to-capability', cta: 'See it in one case' },
]

/** Four attributes, each pointing at the evidence for it. */
export default function WhyMe() {
  return (
    <section className="section-y" id="why">
      <div className="container-site">
        <SectionHeader label="What to look for" title="Four things I want you to be able to check." />
        <ul className="grid md:grid-cols-2 gap-4">
          {items.map(i => (
            <li key={i.n}>
              <Link to={i.to} className="group card !p-8 block h-full hover:bg-surface-1 transition-colors">
                <p className="text-label text-signal-ink mb-4">{i.n}</p>
                <h3 className="text-heading text-ink mb-3" style={{ fontWeight: 300 }}>{i.title}</h3>
                <p className="text-body text-ink-2 max-w-[44ch]">{i.text}</p>
                <p className="text-label text-ink-3 group-hover:text-ink mt-6">{i.cta} &rarr;</p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
