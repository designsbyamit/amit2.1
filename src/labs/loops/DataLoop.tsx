import '@fontsource-variable/instrument-sans'
import './loops.css'
import { useTimeline } from './useTimeline'
import Icon from '../Icon'

/** Data products: a governed marketplace listing, as a looped sequence. Illustrative data. */
const products = [
  { n: 'Customer 360', d: 'Customer', o: 'CRM Platform', cert: true, t: 'Certified', sub: 'Updated today' },
  { n: 'Customer churn signals', d: 'Customer', o: 'Analytics CoE', cert: true, t: 'Certified', sub: 'Updated today' },
  { n: 'Revenue by region', d: 'Finance', o: 'Finance Data', cert: true, t: 'Certified', sub: 'Updated daily' },
  { n: 'Supplier master', d: 'Supply chain', o: 'Procurement', cert: false, t: 'In review', sub: 'Updated weekly' },
  { n: 'Marketing attribution', d: 'Marketing', o: 'Growth Data', cert: false, t: 'In review', sub: 'Updated daily' },
  { n: 'Product usage events', d: 'Product', o: 'Platform Data', cert: true, t: 'Certified', sub: 'Streaming' },
]
const checks = ['Owner verified', 'Quality checks passing', 'Lineage documented', 'Access policy applied']
type S = { q: string; cert: boolean; open: boolean; chk: number; req: boolean; hov: number }
const init: S = { q: '', cert: false, open: false, chk: 0, req: false, hov: -1 }

export default function DataLoop() {
  const word = 'customer'
  const steps: [number, (x: S) => S][] = [
    ...word.split('').map((_, i): [number, (x: S) => S] => [900 + i * 90, x => ({ ...x, q: word.slice(0, i + 1) })]),
    [2300, x => ({ ...x, cert: true })],
    [3300, x => ({ ...x, hov: 0 })],
    [3900, x => ({ ...x, open: true, hov: 0 })],
    ...checks.map((_, i): [number, (x: S) => S] => [4500 + i * 380, x => ({ ...x, chk: i + 1 })]),
    [6700, x => ({ ...x, req: true })],
    [9300, x => ({ ...x, open: false, req: false })],
  ]
  const s = useTimeline<S>(init, steps, 10300)
  const list = products.filter(p => (!s.q || p.n.toLowerCase().includes(s.q.toLowerCase()) || p.d.toLowerCase().includes(s.q.toLowerCase())) && (!s.cert || p.cert))
  const sel = products[0]
  return (
    <div className="lp lp-dat" data-lenis-prevent>
      <aside>
        <div className="lp-dlogo"><i /><b>Data marketplace</b></div>
        <p className="lp-dcap">Domain</p>
        {['All products', 'Customer', 'Finance', 'Supply chain', 'Marketing', 'Product'].map((d, i) => <span key={d} className={i === 0 || (s.q && d.toLowerCase() === s.q.toLowerCase().slice(0, 8)) ? 'on' : ''}>{d}</span>)}
        <p className="lp-dcap">Trust</p>
        <span className={`lp-tg ${s.cert ? 'on' : ''}`}><i />Certified only</span>
      </aside>
      <main>
        <div className="lp-dtop">
          <h1>Find data you can trust</h1>
          <div className={`lp-dsb ${s.q ? 'f' : ''}`}><Icon name="search" size={18} />{s.q || <em>Search data products, domains, owners</em>}{s.q && <i className="lp-car" />}</div>
        </div>
        <div className="lp-dres"><b>{list.length}</b> data products{s.cert && <span className="lp-chip">Certified<Icon name="x" size={12} strokeWidth={2} /></span>}</div>
        <div className="lp-dgrid">
          {products.map((p, i) => {
            const vis = list.includes(p)
            return (
              <article key={p.n} className={`lp-dcard ${vis ? '' : 'out'} ${s.hov === i && vis ? 'hov' : ''}`}>
                <div className="lp-dc-top"><span className="lp-dc-i"><Icon name="layers" size={18} strokeWidth={1.6} /></span><span className={`lp-badge ${p.cert ? 'c' : 'r'}`}>{p.cert && <Icon name="check" size={11} strokeWidth={2.6} />}{p.t}</span></div>
                <h3>{p.n}</h3>
                <p>{p.d} · {p.o}</p>
                <div className="lp-dc-bar"><i style={{ width: p.cert ? '92%' : '58%' }} /></div>
                <small>{p.sub}</small>
              </article>
            )
          })}
        </div>
      </main>
      <div className={`lp-dpanel ${s.open ? 'on' : ''}`}>
        <div className="lp-dp-h"><span className="lp-badge c"><Icon name="check" size={11} strokeWidth={2.6} />Certified</span><i><Icon name="x" size={16} /></i></div>
        <h2>{sel.n}</h2><p>{sel.d} · owned by {sel.o}</p>
        <ul>{checks.map((c, i) => <li key={c} className={s.chk > i ? 'on' : ''}><i><Icon name="check" size={11} strokeWidth={2.8} /></i>{c}</li>)}</ul>
        <div className="lp-lin"><span>CRM</span><em /><span>Customer 360</span><em /><span>Dashboards</span></div>
        <button className={`lp-req ${s.req ? 'done' : ''}`}>{s.req ? <><Icon name="check" size={16} strokeWidth={2.4} />Access requested</> : 'Request access'}</button>
      </div>
      <p className="lp-foot">Concept prototype · illustrative data</p>
    </div>
  )
}
