import { useState } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../../components/ui/PageHeader'
import Tabs from '../../components/ds/Tabs'
import Tag from '../../components/ds/Tag'
import { library, libraryCategories, readMinutes, type LibraryEntry } from '../../data/library'

const ALL = 'all'

function EntryCard({ e }: { e: LibraryEntry }) {
  return (
    <Link to={`/learn/library/${e.slug}`} className="group card flex flex-col gap-4 h-full hover:bg-surface-1 transition-colors">
      <div className="flex flex-wrap items-center gap-2">
        <Tag>{e.format}</Tag>
        {e.series && <span className="text-label text-ink-3">{e.series}</span>}
      </div>
      <h2 className="text-heading text-ink">{e.title}</h2>
      <p className="text-body text-ink-2 max-w-measure-m">{e.summary}</p>
      <p className="text-label text-ink-3 mt-auto pt-2">{e.category} · {readMinutes(e)} min read · {e.published}</p>
    </Link>
  )
}

export default function LibraryPage() {
  const [cat, setCat] = useState(ALL)
  const present = libraryCategories.filter(c => library.some(e => e.category === c))
  const tabs = [{ id: ALL, label: 'All' }, ...present.map(c => ({ id: c, label: c }))]
  const shown = [...library].filter(e => cat === ALL || e.category === cat).sort((a, b) => b.date.localeCompare(a.date))
  return (
    <>
      <PageHeader label="Grow · Library" title="Articles, frameworks and worksheets."
        subtitle="Everything I write for designers who are growing, kept in one place. New pieces are added as I publish them."
        breadcrumb={[{ label: 'Grow', to: '/learn' }, { label: 'Library' }]} mark="notes" />
      <section className="section-y hairline-top">
        <div className="container-site">
          <Tabs tabs={tabs} value={cat} onChange={setCat} label="Library categories" variant="chip">
            <ul className="grid md:grid-cols-2 gap-5 md:gap-6">
              {shown.map(e => <li key={e.slug}><EntryCard e={e} /></li>)}
            </ul>
          </Tabs>
        </div>
      </section>
    </>
  )
}
