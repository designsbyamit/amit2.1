import { Link } from 'react-router-dom'

/** Shown at the top of every page deeper than one level. The last item is the current page. */
export default function Breadcrumb({ items }: { items: { label: string; to?: string }[] }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((it, i) => {
          const last = i === items.length - 1
          return (
            <li key={it.label} className="flex items-center gap-2">
              {last || !it.to ? <span aria-current={last ? 'page' : undefined}>{it.label}</span> : <Link to={it.to}>{it.label}</Link>}
              {!last && <span className="sep" aria-hidden="true">/</span>}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
