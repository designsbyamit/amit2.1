// The HR companion, drawn as the product rather than as boxes: a chat panel inside the workplace portal.
// Two moments from the story: the request as she types it, and the companion working it out before it acts.
import { motion, useReducedMotion } from 'framer-motion'

const C = { ink: '#16212E', ink2: '#4A5A6C', mute: '#7A8898', line: '#E6E9EE', bg: '#F6F7F9', accent: '#6A4CE8', accentS: '#F1EDFF', ok: '#1F8A4C', okS: '#E8F6EE' }
const F = "'Geist Variable','Geist',system-ui,sans-serif"
const ease = [0.16, 1, 0.3, 1] as const
const d = {
  spark: 'M12 3.5l1.9 5.2 5.1 1.8-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.8z',
  check: 'M5 12.5l4.5 4.5L19 7.5', send: 'M4 12l16-7-6 16-3-6.5z', cal: 'M4.5 6.5h15v13h-15zM4.5 10.5h15M8.5 4v4M15.5 4v4',
  min: 'M6 12h12', clip: 'M15.5 7.5l-6.8 6.8a2 2 0 0 0 2.8 2.8l7-7a3.5 3.5 0 0 0-5-5l-7 7a5 5 0 0 0 7.1 7.1l6-6',
  leaf: 'M5 19c0-8 5-13 14-14-1 9-6 14-14 14zM5 19l6-6',
}
const I = ({ n, s = 16, c = C.accent, w = 1.6 }: { n: keyof typeof d; s?: number; c?: string; w?: number }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block' }}><path d={d[n]} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>

const shadow = '0 0 0 1px rgba(22,33,46,.07), 0 12px 32px -16px rgba(22,33,46,.22)'

function Head() {
  return (
    <div style={{ height: 56, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderBottom: `1px solid ${C.line}` }}>
      <span style={{ width: 30, height: 30, borderRadius: 15, background: `linear-gradient(135deg, ${C.accent}, #A08BFA)`, display: 'grid', placeItems: 'center' }}><I n="spark" s={16} c="#fff" w={1.8} /></span>
      <div><div style={{ fontSize: 14, fontWeight: 600, color: C.ink }}>Engaze</div><div style={{ fontSize: 11.5, color: C.mute, display: 'flex', alignItems: 'center', gap: 5 }}><span style={{ width: 6, height: 6, borderRadius: 3, background: C.ok }} />Available</div></div>
      <span style={{ marginLeft: 'auto' }}><I n="min" s={16} c={C.mute} /></span>
    </div>
  )
}

const You = ({ children, big = false }: { children: string; big?: boolean }) => (
  <div style={{ justifySelf: 'end', maxWidth: big ? 520 : 300, padding: big ? '16px 22px' : '10px 14px', borderRadius: big ? '22px 22px 6px 22px' : '16px 16px 4px 16px', background: C.accent, color: '#fff', fontSize: big ? 'clamp(18px, 2.6vw, 26px)' : 13.5, lineHeight: big ? 1.3 : '20px', letterSpacing: big ? -0.3 : 0 }}>{children}</div>
)

/** The request, the way she types it. */
export function CompanionAsk() {
  return (
    <div className="rounded-3" style={{ padding: 'clamp(12px, 3vw, 40px)', background: 'linear-gradient(135deg, #EDE7FF 0%, #F7F4FF 55%, #E9E3FF 100%)' }}>
      <div style={{ fontFamily: F, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 760, background: '#fff', borderRadius: 14, boxShadow: shadow, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Head />
            <div style={{ flex: 1, padding: '22px 24px', display: 'grid', gap: 16, alignContent: 'start', background: '#FCFCFD' }}>
              <div style={{ fontSize: 14, lineHeight: '21px', color: C.ink, maxWidth: 420 }}>Good morning, Esha. What can I help you with?</div>
              <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>{['My leave balance', 'Latest payslip', 'Holidays this month'].map(t => <span key={t} style={{ fontSize: 12.5, padding: '6px 12px', borderRadius: 16, border: `1px solid ${C.line}`, color: C.ink2, background: '#fff' }}>{t}</span>)}</div>
              <You big>I need a sick leave for today.</You>
            </div>
            <div style={{ padding: 14, borderTop: `1px solid ${C.line}` }}>
              <div style={{ height: 44, borderRadius: 22, border: `1px solid ${C.line}`, display: 'flex', alignItems: 'center', gap: 10, padding: '0 6px 0 16px', fontSize: 13.5, color: C.mute }}><I n="clip" s={16} c={C.mute} />Ask anything about work<span style={{ marginLeft: 'auto', width: 32, height: 32, borderRadius: 16, background: C.accent, display: 'grid', placeItems: 'center' }}><I n="send" s={15} c="#fff" /></span></div>
            </div>
          </div>
      </div>
    </div>
  )
}

/** Four things worked out before it asks to apply anything. */
export function CompanionWorks() {
  const reduce = useReducedMotion()
  const steps: [string, string][] = [['Sick leave, for today', 'The leave type and the date'], ['5 of 12 days left', 'Her balance'], ['What the policy allows', 'Read before anything is applied'], ['Her manager and team', 'Who needs to know']]
  const rise = (i: number) => reduce ? {} : { initial: { opacity: 0, y: 8 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, margin: '-10%' }, transition: { duration: 0.5, delay: 0.2 + i * 0.18, ease } }
  return (
    <div className="rounded-3" style={{ padding: 'clamp(12px, 3vw, 40px)', background: 'linear-gradient(135deg, #EDE7FF 0%, #F7F4FF 55%, #E9E3FF 100%)' }}>
      <div style={{ fontFamily: F, display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: '100%', maxWidth: 640, background: '#fff', borderRadius: 14, boxShadow: shadow, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <Head />
            <div style={{ flex: 1, padding: '20px 22px', display: 'grid', gap: 14, alignContent: 'start', background: '#FCFCFD' }}>
              <You>I need a sick leave for today.</You>
              <motion.div {...rise(0)} style={{ borderRadius: 12, border: `1px solid ${C.line}`, background: '#fff', padding: '12px 14px' }}>
                <div style={{ fontSize: 11.5, fontWeight: 600, color: C.mute, letterSpacing: 0.3, textTransform: 'uppercase' }}>Working it out</div>
                <div style={{ display: 'grid', gap: 9, marginTop: 10 }}>
                  {steps.map(([t, s], i) => (
                    <motion.div key={t} {...rise(i + 1)} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ width: 20, height: 20, borderRadius: 10, background: C.okS, display: 'grid', placeItems: 'center', flex: 'none' }}><I n="check" s={12} c={C.ok} w={2.2} /></span>
                      <span style={{ fontSize: 13.5, color: C.ink, fontWeight: 500 }}>{t}<span style={{ fontSize: 12.5, color: C.mute, fontWeight: 400, marginLeft: 8 }}>{s}</span></span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
              <motion.div {...rise(5)} style={{ display: 'grid', gap: 10, maxWidth: 470 }}>
                <div style={{ fontSize: 13.5, lineHeight: '20px', color: C.ink }}>Sorry you’re unwell, Esha. I’ve got sick leave ready for today. Have a look before I apply it.</div>
                <div style={{ borderRadius: 12, background: '#fff', boxShadow: `0 0 0 1px ${C.line}, 0 2px 6px rgba(22,33,46,.05)`, overflow: 'hidden' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 14px', borderBottom: `1px solid ${C.line}` }}>
                    <span style={{ width: 30, height: 30, borderRadius: 8, background: C.accentS, display: 'grid', placeItems: 'center' }}><I n="leaf" s={16} /></span>
                    <div><div style={{ fontSize: 13.5, fontWeight: 600, color: C.ink }}>Sick leave</div><div style={{ fontSize: 12, color: C.mute }}>Today · Full day</div></div>
                    <span style={{ marginLeft: 'auto', fontSize: 11.5, fontWeight: 600, padding: '2px 8px', borderRadius: 10, background: C.bg, color: C.ink2 }}>Ready</span>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', padding: '10px 14px', gap: 4, fontSize: 12.5 }}>
                    <span style={{ color: C.mute }}>Balance after</span><span style={{ color: C.ink, textAlign: 'right' }}>4 of 12 days</span>
                    <span style={{ color: C.mute }}>Notifies</span><span style={{ color: C.ink, textAlign: 'right' }}>Your manager and team</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, padding: '0 14px 14px' }}>
                    <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 8, background: C.accent, color: '#fff', fontSize: 13, fontWeight: 600 }}>Apply</span>
                    <span style={{ flex: 1, textAlign: 'center', padding: '8px 0', borderRadius: 8, border: `1px solid ${C.line}`, color: C.ink, fontSize: 13, fontWeight: 600 }}>Change</span>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
      </div>
    </div>
  )
}
