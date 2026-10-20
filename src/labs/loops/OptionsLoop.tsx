import '@fontsource-variable/instrument-sans'
import './loops.css'
import { useTimeline } from './useTimeline'

/** Self-serve networks: the entry-point decision, as a looped sequence.
 *  Six placements are tested against three criteria and set aside; the seventh is approved. */
const criteria = ['Easy to find', 'Not annoying for experts', 'Consistent with existing patterns']

const options: { n: string; title: string; why: string; sketch: React.ReactNode }[] = [
  { n: '1', title: 'Sticky button on the right edge', why: 'Not consistent with the existing pattern',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="18" width="70" height="30" rx="3" className="f" /><rect x="104" y="26" width="10" height="26" rx="3" className="hot" /></> },
  { n: '2', title: 'Product tools in a bento menu', why: 'May conflict with the global navigation',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="16" width="34" height="14" rx="3" className="hot" /><rect x="43" y="16" width="34" height="14" rx="3" className="hot" /><rect x="80" y="16" width="34" height="14" rx="3" className="hot" /><rect x="6" y="34" width="108" height="16" rx="3" className="f" /></> },
  { n: '3a', title: 'Functions in the welcome banner', why: 'Technical constraints; banner shows for a limited time',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="16" width="108" height="14" rx="3" className="hot" /><rect x="6" y="34" width="50" height="16" rx="3" className="f" /><rect x="62" y="34" width="52" height="16" rx="3" className="f" /></> },
  { n: '3b', title: 'Network tools banner', why: 'Takes space above the fold; steeper learning curve',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="16" width="108" height="22" rx="3" className="hot" /><rect x="6" y="42" width="108" height="8" rx="3" className="f" /></> },
  { n: '4', title: 'Recommendations below the banner', why: 'Needs behavioural analytics; redundant with alerts',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="16" width="108" height="10" rx="3" className="f" /><rect x="6" y="30" width="34" height="12" rx="6" className="hot" /><rect x="44" y="30" width="34" height="12" rx="6" className="hot" /><rect x="82" y="30" width="32" height="12" rx="6" className="hot" /></> },
  { n: '5', title: 'Floating “i” info button', why: 'A new pattern; placement issue',
    sketch: <><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="6" y="16" width="108" height="34" rx="3" className="f" /><circle cx="100" cy="42" r="8" className="hot" /></> },
]

const SLOT = 900 // ms per option review
const T0 = 1500 // first review starts
const TOTAL = T0 + SLOT * 6 + 3300

export default function OptionsLoop() {
  const s = useTimeline<{ shown: number; cur: number; done: number; win: boolean }>(
    { shown: 0, cur: -1, done: 0, win: false },
    [
      ...options.map((_, i): [number, (x: { shown: number; cur: number; done: number; win: boolean }) => { shown: number; cur: number; done: number; win: boolean }] => [150 + i * 110, x => ({ ...x, shown: i + 1 })]),
      ...options.flatMap((_, i): [number, (x: { shown: number; cur: number; done: number; win: boolean }) => { shown: number; cur: number; done: number; win: boolean }][] => [
        [T0 + i * SLOT, x => ({ ...x, cur: i })],
        [T0 + i * SLOT + 520, x => ({ ...x, done: i + 1 })],
      ]),
      [T0 + SLOT * 6 + 250, x => ({ ...x, cur: -1, win: true })],
    ],
    TOTAL,
  )
  return (
    <div className="lp lp-opt" data-lenis-prevent>
      <header>
        <p className="lp-eyebrow">Entry points · design decision</p>
        <h1>Where should the dNetWorX functions live?</h1>
        <ul className="lp-crit">
          {criteria.map((c, i) => <li key={c} className={s.cur >= 0 || s.win ? 'on' : ''} style={{ transitionDelay: `${i * 90}ms` }}><i />{c}</li>)}
        </ul>
      </header>
      <div className="lp-optgrid">
        {options.map((o, i) => {
          const rej = s.done > i, active = s.cur === i
          return (
            <article key={o.n} className={`lp-opt-card ${i < s.shown ? 'in' : ''} ${active ? 'active' : ''} ${rej ? 'rej' : ''} ${s.win ? 'fade' : ''}`}>
              <svg viewBox="0 0 120 56" aria-hidden="true">{o.sketch}</svg>
              <div className="lp-opt-t"><b>{o.n}</b><span>{o.title}</span></div>
              <p className="lp-opt-why"><i />{o.why}</p>
              <span className="lp-scan" />
              <span className="lp-stamp" aria-hidden="true">✕</span>
            </article>
          )
        })}
        <article className={`lp-opt-win ${s.win ? 'in' : ''}`}>
          <svg viewBox="0 0 120 56" aria-hidden="true"><rect x="6" y="6" width="108" height="6" rx="2" className="k" /><rect x="40" y="10" width="62" height="34" rx="4" className="win" /><rect x="46" y="16" width="22" height="4" rx="2" className="k" /><rect x="46" y="24" width="50" height="4" rx="2" className="f" /><rect x="46" y="32" width="40" height="4" rx="2" className="f" /><rect x="6" y="20" width="26" height="24" rx="3" className="f" /></svg>
          <div className="lp-opt-t"><b>6</b><span>Redesigned global navigation, with “What’s New”</span></div>
          <p className="lp-opt-yes"><i />Approved · no learning curve for existing users</p>
        </article>
      </div>
      <p className="lp-foot">Concept sequence · illustrative sketches</p>
    </div>
  )
}
