import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import PageHeader from '../components/ui/PageHeader'
import { PracticeArt, PortfolioArt, CuriousArt } from './grow/GrowArt'
import { totalChallenges } from '../data/growPractice'
import { guide } from '../data/growPortfolio'
import { qas } from '../data/growCurious'

const portals = [
  { to: '/learn/practice', n: '01', tag: 'CHALLENGES · CRAFT · APPLICATION', title: 'Practice Toolkits',
    text: 'A ladder for designing with AI: a conversational interface, a conversational system, an agentic experience, then multi-agent orchestration. Each step pairs with the matching toolkit.',
    output: 'Completed exercises, reflection prompts, and a way to compare your approach with others.',
    asks: 'How do I get better at doing the work?', meta: `4 stages · ${totalChallenges} challenges`, art: <PracticeArt /> },
  { to: '/learn/portfolio', n: '02', tag: 'STORYTELLING · PRESENTATION · IMPACT', title: 'Portfolio Best Practices',
    text: 'Your portfolio is a reflection of you. Define its character, build your personal brand into it, then give every project a clear anatomy and a story.',
    output: 'A portfolio with a character, and projects that tell a story and show your thinking.',
    asks: 'How do I make my portfolio feel like me?', meta: `${guide.length} chapters + template`, art: <PortfolioArt /> },
  { to: '/learn/curious', n: '03', tag: 'QUESTIONS · PERSPECTIVES · EXPERIENCE', title: 'Curious Minds',
    text: 'Meaningful questions from conversations with designers, answered through experience and a point of view.',
    output: 'Honest, useful perspectives on careers, craft, leadership, intuition, business and AI.',
    asks: 'How should I think about the questions that shape my career?', meta: `${qas.length} questions`, art: <CuriousArt /> },
]

export default function LearnPage() {
  return (
    <>
      <PageHeader label="Grow" title="For designers who are growing." subtitle="Three independent places to build your craft, tell your work well and learn from experience. Use one, or all three." />
      <section className="section-y hairline-top">
        <div className="container-site">
          <ul className="grid lg:grid-cols-3 gap-4 md:gap-6">
            {portals.map((p, i) => (
              <motion.li key={p.to} initial={{ opacity: 0, y: 14 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-5%' }} transition={{ duration: 0.5, delay: i * 0.08 }}>
                <Link to={p.to} className="group card !p-0 flex flex-col h-full overflow-hidden hover:bg-surface-1 transition-colors">
                  <div className="aspect-[16/9] border-b border-[color:var(--line-1)] p-6 bg-surface-1">{p.art}</div>
                  <div className="p-7 md:p-8 flex flex-col gap-4 flex-1">
                    <p className="text-overline text-ink-3">{p.n} · {p.tag}</p>
                    <h2 className="text-heading text-ink" style={{ fontWeight: 300 }}>{p.title}</h2>
                    <p className="text-body text-ink-2">{p.text}</p>
                    <p className="text-body-sm text-ink-3"><span className="text-ink-2">You leave with:</span> {p.output}</p>
                    <div className="mt-auto pt-4 flex items-center justify-between gap-4">
                      <span className="text-label text-ink-3">{p.meta}</span>
                      <span className="text-label text-ink-3 group-hover:text-ink">Open &rarr;</span>
                    </div>
                  </div>
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section-y hairline-top">
        <div className="container-site">
          <p className="text-overline text-ink-3">How they fit together</p>
          <h2 className="text-display-l text-ink mt-4 max-w-3xl">Three questions, three places.</h2>
          <dl className="mt-12 grid md:grid-cols-3 gap-px bg-[color:var(--line-1)] border border-[color:var(--line-1)] rounded-3 overflow-hidden">
            {portals.map(p => (
              <div key={p.to} className="bg-surface-0 p-7 md:p-8">
                <dt className="text-label text-ink-3">{p.title}</dt>
                <dd className="text-heading text-ink mt-4" style={{ fontWeight: 300 }}>{p.asks}</dd>
              </div>
            ))}
          </dl>
          <p className="text-body text-ink-2 mt-8 max-w-[62ch]">Each one stands on its own and supports a different part of growth, so you never have to do them in order.</p>
          <p className="text-body-sm text-ink-3 mt-10">Also: <Link to="/mentoring" className="underline underline-offset-4 hover:text-ink">Mentoring</Link> · <Link to="/community" className="underline underline-offset-4 hover:text-ink">Community</Link> · <Link to="/reflections" className="underline underline-offset-4 hover:text-ink">Reflections</Link></p>
        </div>
      </section>
    </>
  )
}
