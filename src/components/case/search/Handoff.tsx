// The search to assistant hand-over, drawn as the product: a result offers to continue in the assistant,
// and the assistant opens with the result already as context. Same visual language as the AI Summary.

const P = { ink: '#1D2D3E', ink2: '#475E75', mute: '#6A7D90', line: '#E5E9EE', bg: '#F5F6F7', blue: '#0064D9', blueS: '#EBF8FF', violet: '#5D36FF', violetS: '#F1ECFF' }
const F = "'72','Geist Variable','Geist',system-ui,sans-serif"
const d = {
  spark: 'M12 3.5l1.9 5.2 5.1 1.8-5.1 1.9L12 17.5l-1.9-5.1L5 10.5l5.1-1.8z',
  search: 'M10.5 17a6.5 6.5 0 1 0 0-13 6.5 6.5 0 0 0 0 13zM15.5 15.5L20 20',
  doc: 'M7 3.5h7l4 4V20.5H7zM14 3.5V8h4M9.5 12h6M9.5 15h6M9.5 18h3.5',
  close: 'M6 6l12 12M18 6L6 18', send: 'M4 12l16-7-6 16-3-6.5z', ext: 'M14 4.5h5.5V10M19.5 4.5L11 13M17 14v5.5H4.5V7H10',
}
const I = ({ n, s = 16, c = P.blue, w = 1.6 }: { n: keyof typeof d; s?: number; c?: string; w?: number }) =>
  <svg width={s} height={s} viewBox="0 0 24 24" aria-hidden style={{ flex: 'none', display: 'block' }}><path d={d[n]} fill="none" stroke={c} strokeWidth={w} strokeLinecap="round" strokeLinejoin="round" /></svg>

const shadow = '0 0 0 1px rgba(29,45,62,.07), 0 8px 24px -12px rgba(29,45,62,.18)'

function Results() {
  return (
    <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: shadow, overflow: 'hidden' }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 18px', borderBottom: `1px solid ${P.line}` }}>
        <div style={{ flex: 1, height: 34, borderRadius: 17, border: `1px solid ${P.line}`, background: P.bg, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', fontSize: 13.5, color: P.ink }}><I n="search" s={15} c={P.ink2} />education policy online course</div>
      </div>
      <div style={{ padding: '14px 18px 0', fontSize: 12.5, color: P.ink2 }}>3 results in Policies</div>
      <div style={{ margin: '12px 18px 0', borderRadius: 10, border: `1px solid ${P.blue}`, background: '#FBFDFF', padding: '16px 16px 14px', boxShadow: '0 0 0 3px rgba(0,100,217,.08)' }}>
        <div style={{ display: 'flex', gap: 12 }}>
          <span style={{ width: 36, height: 36, borderRadius: 8, background: P.blueS, display: 'grid', placeItems: 'center', flex: 'none' }}><I n="doc" s={18} /></span>
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><span style={{ fontSize: 15, fontWeight: 600, color: P.blue }}>Education policy</span><span style={{ fontSize: 11, fontWeight: 600, padding: '1px 6px', borderRadius: 4, background: P.bg, color: P.ink2 }}>Policy</span></div>
            <div style={{ fontSize: 12, color: P.ink2, marginTop: 2 }}>People · Updated this year</div>
            <p style={{ fontSize: 13, lineHeight: '19px', color: P.ink, margin: '10px 0 0' }}>Covers courses, certifications and how much of the cost is reimbursed, with the approval steps for each.</p>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14, paddingLeft: 48 }}>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, background: P.violet, color: '#fff', fontSize: 12.5, fontWeight: 600 }}><I n="spark" s={14} c="#fff" w={1.8} />Continue in the assistant</span>
          <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 12px', borderRadius: 8, border: `1px solid ${P.line}`, color: P.blue, fontSize: 12.5, fontWeight: 600 }}>Open<I n="ext" s={13} /></span>
        </div>
      </div>
      {[['Learning and development guidelines', 'People · Guideline'], ['Certification reimbursement form', 'People · Form']].map(([t, m]) => (
        <div key={t} style={{ display: 'flex', gap: 12, alignItems: 'center', padding: '14px 34px', borderTop: `1px solid ${P.line}`, marginTop: 12 }}>
          <span style={{ width: 28, height: 28, borderRadius: 7, background: P.bg, display: 'grid', placeItems: 'center', flex: 'none' }}><I n="doc" s={15} c={P.ink2} /></span>
          <div><div style={{ fontSize: 13.5, fontWeight: 600, color: P.ink }}>{t}</div><div style={{ fontSize: 12, color: P.ink2, marginTop: 1 }}>{m}</div></div>
        </div>
      ))}
    </div>
  )
}

function Assistant() {
  return (
    <div style={{ width: '100%', background: '#fff', borderRadius: 12, boxShadow: shadow, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: 52, display: 'flex', alignItems: 'center', gap: 10, padding: '0 16px', borderBottom: `1px solid ${P.line}` }}>
        <span style={{ width: 28, height: 28, borderRadius: 14, background: `linear-gradient(135deg, ${P.violet}, #8E6BFF)`, display: 'grid', placeItems: 'center' }}><I n="spark" s={15} c="#fff" w={1.8} /></span>
        <span style={{ fontSize: 14, fontWeight: 600, color: P.ink }}>Assistant</span>
        <span style={{ marginLeft: 'auto' }}><I n="close" s={16} c={P.mute} /></span>
      </div>
      <div style={{ padding: 16, display: 'grid', gap: 12, flex: 1, alignContent: 'start', background: '#FCFCFD' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '8px 10px', borderRadius: 8, background: P.violetS, fontSize: 12, color: P.ink }}>
          <I n="doc" s={14} c={P.violet} /><span>From your search: <b style={{ fontWeight: 600 }}>Education policy</b></span>
        </div>
        <div style={{ justifySelf: 'end', maxWidth: 260, padding: '9px 13px', borderRadius: '14px 14px 4px 14px', background: P.ink, color: '#fff', fontSize: 13, lineHeight: '19px' }}>Does it cover an online course?</div>
        <div style={{ maxWidth: 320, padding: '11px 13px', borderRadius: '14px 14px 14px 4px', background: '#fff', boxShadow: `0 0 0 1px ${P.line}`, fontSize: 13, lineHeight: '19px', color: P.ink }}>
          Yes, if it relates to your role. Online courses are reimbursed up to the yearly limit, once your manager approves the request.
          <div style={{ display: 'flex', gap: 6, marginTop: 10 }}><span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, fontSize: 11.5, padding: '2px 8px', borderRadius: 10, background: P.bg, color: P.ink2 }}><I n="doc" s={12} c={P.ink2} />Education policy, section 3</span></div>
        </div>
      </div>
      <div style={{ padding: 12, borderTop: `1px solid ${P.line}` }}>
        <div style={{ height: 38, borderRadius: 19, border: `1px solid ${P.line}`, display: 'flex', alignItems: 'center', padding: '0 6px 0 14px', fontSize: 13, color: P.mute }}>Ask a follow-up<span style={{ marginLeft: 'auto', width: 28, height: 28, borderRadius: 14, background: P.violet, display: 'grid', placeItems: 'center' }}><I n="send" s={14} c="#fff" /></span></div>
      </div>
    </div>
  )
}

export default function Handoff() {
  return (
    <div className="ui-field">
      <div className="grid gap-3 md:gap-0 md:grid-cols-[1.4fr_auto_1fr] items-center" style={{ fontFamily: F }}>
        <Results />
        <svg width="64" height="40" viewBox="0 0 64 40" aria-hidden className="hidden md:block" style={{ flex: 'none' }}>
          <path d="M4 20 H58" fill="none" stroke={P.violet} strokeWidth="1.25" strokeDasharray="3 4" />
          <circle cx="4" cy="20" r="3" fill={P.violet} /><path d="M53 15l6 5-6 5" fill="none" stroke={P.violet} strokeWidth="1.25" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <Assistant />
      </div>
    </div>
  )
}
