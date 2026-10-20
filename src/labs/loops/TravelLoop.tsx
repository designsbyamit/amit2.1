import '@fontsource-variable/instrument-sans'
import './loops.css'
import { useTimeline } from './useTimeline'
import Icon from '../Icon'

/** Airline app: home to check-in in two steps, as a looped mobile prototype. Illustrative data. */
type S = { screen: 'home' | 'one' | 'two'; tap: string; ck: number; ok: boolean }
const init: S = { screen: 'home', tap: '', ck: 0, ok: false }

export default function TravelLoop() {
  const s = useTimeline<S>(init, [
    [1100, x => ({ ...x, tap: 'checkin' })],
    [1500, x => ({ ...x, screen: 'one', tap: '' })],
    [2300, x => ({ ...x, ck: 1 })],
    [2750, x => ({ ...x, ck: 2 })],
    [3300, x => ({ ...x, tap: 'cta' })],
    [3700, x => ({ ...x, screen: 'two', tap: '' })],
    [4300, x => ({ ...x, ok: true })],
    [8200, x => ({ ...x, screen: 'home', ok: false, ck: 0 })],
  ], 9200)
  return (
    <div className="lp lp-trv" data-lenis-prevent>
      <div className="lp-phone">
        <div className="lp-notch" />
        <div className={`lp-scr lp-home ${s.screen === 'home' ? 'on' : s.screen === 'one' ? 'left' : 'left'}`}>
          <div className="lp-bar"><span>9:41</span><i /></div>
          <div className="lp-hi"><p>Good morning</p><h2>Sara</h2><span className="lp-av">S</span></div>
          <div className="lp-trip">
            <div className="lp-trip-h"><span className="lp-pill"><i />Check-in open</span><em>Tomorrow · 06:20</em></div>
            <div className="lp-route"><div><b>DXB</b><small>Dubai</small></div><div className="lp-line"><Icon name="plane" size={16} strokeWidth={1.6} /></div><div><b>LHR</b><small>London</small></div></div>
            <button className={`lp-cta ${s.tap === 'checkin' ? 'tap' : ''}`}>Check in<Icon name="arrow" size={16} strokeWidth={2} /></button>
          </div>
          <div className="lp-quick">{[['Book', 'plane'], ['Manage', 'sliders'], ['Status', 'clock'], ['Offers', 'heart']].map(([l, ic]) => <span key={l}><i><Icon name={ic as 'plane'} size={18} strokeWidth={1.6} /></i>{l}</span>)}</div>
          <p className="lp-cap">For your trip</p>
          <div className="lp-offers"><span className="o1"><b>Extra legroom</b><small>Add to your seat</small></span><span className="o2"><b>Lounge access</b><small>Before you fly</small></span></div>
        </div>
        <div className={`lp-scr lp-ci ${s.screen === 'one' ? 'on' : s.screen === 'two' ? 'left' : 'right'}`}>
          <div className="lp-bar"><span>9:41</span><i /></div>
          <div className="lp-nav"><Icon name="back" size={20} /><b>Check-in</b><span>Step 1 of 2</span></div>
          <div className="lp-prog"><i style={{ width: '50%' }} /></div>
          <h3>Confirm who’s flying</h3>
          <div className={`lp-pax ${s.ck >= 1 ? 'ok' : ''}`}><span className="lp-av a">S</span><div><b>Sara Khan</b><small>Seat 14A · Window</small></div><i className="lp-box"><Icon name="check" size={14} strokeWidth={2.6} /></i></div>
          <div className={`lp-pax ${s.ck >= 2 ? 'ok' : ''}`}><span className="lp-av b">A</span><div><b>Adam Khan</b><small>Seat 14B · Middle</small></div><i className="lp-box"><Icon name="check" size={14} strokeWidth={2.6} /></i></div>
          <div className="lp-note"><Icon name="shield" size={16} strokeWidth={1.6} />Passport details are already on file.</div>
          <button className={`lp-cta wide ${s.ck >= 2 ? 'ready' : ''} ${s.tap === 'cta' ? 'tap' : ''}`}>Check in 2 passengers</button>
        </div>
        <div className={`lp-scr lp-bp ${s.screen === 'two' ? 'on' : 'right'}`}>
          <div className="lp-bar"><span>9:41</span><i /></div>
          <div className="lp-nav"><Icon name="back" size={20} /><b>Boarding pass</b><span>Step 2 of 2</span></div>
          <div className="lp-prog"><i style={{ width: '100%' }} /></div>
          <div className={`lp-done ${s.ok ? 'on' : ''}`}><i><Icon name="check" size={20} strokeWidth={2.6} /></i>You’re checked in</div>
          <div className={`lp-pass ${s.ok ? 'on' : ''}`}>
            <div className="lp-route sm"><div><b>DXB</b></div><div className="lp-line"><Icon name="plane" size={14} strokeWidth={1.6} /></div><div><b>LHR</b></div></div>
            <dl><div><dt>Passenger</dt><dd>Sara Khan</dd></div><div><dt>Seat</dt><dd>14A</dd></div><div><dt>Gate</dt><dd>B12</dd></div><div><dt>Boards</dt><dd>05:35</dd></div></dl>
            <div className="lp-qr" aria-hidden="true">{Array.from({ length: 169 }, (_, i) => <i key={i} className={((i * 7 + (i >> 3) * 5) % 3 === 0 || [0, 1, 2, 12, 13, 14].includes(i % 13) && [0, 1, 2].includes(i / 13 | 0)) ? 'b' : ''} />)}</div>
          </div>
          <button className={`lp-cta wide ghost ${s.ok ? 'on' : ''}`}><Icon name="wallet" size={16} strokeWidth={1.7} />Add to Wallet</button>
        </div>
      </div>
      <p className="lp-foot">Concept prototype · illustrative data</p>
    </div>
  )
}
