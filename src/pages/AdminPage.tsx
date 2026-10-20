import { useCallback, useEffect, useMemo, useState } from 'react'
import Button from '../components/ds/Button'
import { TextField } from '../components/ds/Field'
import { topicLabel } from '../lib/contact'

interface Row { id: number; created_at: string; name: string; email: string; organisation: string | null; role: string | null; topic: string; subject: string | null; message: string; source_path: string | null; status: string; notified: boolean; notify_error: string | null }
const STATUSES = ['new', 'read', 'replied', 'archived'] as const
const when = (iso: string) => new Date(iso).toLocaleString(undefined, { day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })

async function api(path: string, init?: RequestInit) {
  const r = await fetch(path, { ...init, headers: { 'content-type': 'application/json', ...(init?.headers || {}) } })
  const ct = r.headers.get('content-type') || ''
  const body = ct.includes('json') ? await r.json() : null
  return { status: r.status, body }
}

/** The private portal: sign in, then read and triage every enquiry from the contact form. */
export default function AdminPage() {
  const [state, setState] = useState<'checking' | 'out' | 'in'>('checking')

  useEffect(() => {
    document.title = 'Portal · Amit Kumar Tiwari'
    const m = document.createElement('meta'); m.name = 'robots'; m.content = 'noindex,nofollow'; document.head.appendChild(m)
    api('/api/admin/enquiries?limit=1').then(r => setState(r.body && (r.status === 200 || r.status === 503) ? 'in' : 'out')).catch(() => setState('out'))
    return () => { m.remove() }
  }, [])

  return (
    <section className="container-site section-y">
      {state === 'checking' && <p className="text-body text-ink-3" aria-busy="true">Checking your session…</p>}
      {state === 'out' && <Login onIn={() => setState('in')} />}
      {state === 'in' && <Inbox onOut={() => setState('out')} />}
    </section>
  )
}

function Login({ onIn }: { onIn: () => void }) {
  const [email, setEmail] = useState(''), [password, setPassword] = useState('')
  const [busy, setBusy] = useState(false), [err, setErr] = useState('')
  const submit = async (e: React.FormEvent) => {
    e.preventDefault(); setBusy(true); setErr('')
    try {
      const r = await api('/api/admin/login', { method: 'POST', body: JSON.stringify({ email, password }) })
      if (r.status === 200) onIn(); else setErr(r.body?.error || 'The portal is not available on this site.')
    } catch { setErr('Could not reach the server.') }
    setBusy(false)
  }
  return (
    <div className="max-w-md">
      <p className="text-overline text-ink-3">Portal</p>
      <h1 className="text-display-l text-white mt-4">Sign in.</h1>
      <form onSubmit={submit} className="grid gap-5 mt-10">
        <TextField label="Email" type="email" autoComplete="username" required value={email} onChange={e => setEmail(e.target.value)} />
        <TextField label="Password" type="password" autoComplete="current-password" required value={password} onChange={e => setPassword(e.target.value)} />
        {err && <p role="alert" className="field-error">{err}</p>}
        <div><Button type="submit" disabled={busy} arrow>{busy ? 'Signing in…' : 'Sign in'}</Button></div>
      </form>
    </div>
  )
}

function Inbox({ onOut }: { onOut: () => void }) {
  const [rows, setRows] = useState<Row[]>([]), [counts, setCounts] = useState<Record<string, number>>({})
  const [status, setStatus] = useState<string>(''), [q, setQ] = useState(''), [qNow, setQNow] = useState('')
  const [open, setOpen] = useState<number | null>(null)
  const [msg, setMsg] = useState(''), [loading, setLoading] = useState(true)

  const load = useCallback(async () => {
    setLoading(true)
    const r = await api(`/api/admin/enquiries?status=${encodeURIComponent(status)}&q=${encodeURIComponent(qNow)}`)
    if (r.status === 401) { onOut(); return }
    if (r.status === 200 && r.body) { setRows(r.body.rows); setCounts(Object.fromEntries((r.body.counts as { status: string; n: number }[]).map(c => [c.status, c.n]))); setMsg('') }
    else setMsg(r.body?.error || 'Could not load enquiries.')
    setLoading(false)
  }, [status, qNow, onOut])
  useEffect(() => { load() }, [load])
  useEffect(() => { const t = setTimeout(() => setQNow(q), 300); return () => clearTimeout(t) }, [q])

  const total = useMemo(() => Object.values(counts).reduce((a, b) => a + b, 0), [counts])
  const setRowStatus = async (id: number, s: string) => {
    setRows(rs => rs.map(r => (r.id === id ? { ...r, status: s } : r)))
    const r = await api('/api/admin/enquiries', { method: 'PATCH', body: JSON.stringify({ id, status: s }) })
    if (r.status === 401) onOut(); else load()
  }
  const toggle = (r: Row) => { setOpen(open === r.id ? null : r.id); if (open !== r.id && r.status === 'new') setRowStatus(r.id, 'read') }
  const signOut = async () => { await api('/api/admin/logout', { method: 'POST' }); onOut() }
  const csv = () => {
    const cell = (v: unknown) => `"${String(v ?? '').replace(/"/g, '""')}"`
    const head = ['received', 'name', 'email', 'organisation', 'topic', 'about', 'page', 'status', 'message']
    const lines = rows.map(r => [r.created_at, r.name, r.email, r.organisation, topicLabel(r.topic), r.subject, r.source_path, r.status, r.message].map(cell).join(','))
    const url = URL.createObjectURL(new Blob([[head.join(','), ...lines].join('\n')], { type: 'text/csv' }))
    const a = document.createElement('a'); a.href = url; a.download = 'enquiries.csv'; a.click(); URL.revokeObjectURL(url)
  }

  return (
    <div>
      <div className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-overline text-ink-3">Portal</p>
          <h1 className="text-display-l text-white mt-4">Enquiries</h1>
          <p className="text-body text-ink-2 mt-3">{total} in total{counts.new ? ` · ${counts.new} new` : ''}</p>
        </div>
        <div className="flex gap-3">
          <Button small variant="secondary" onClick={csv} disabled={!rows.length}>Export CSV</Button>
          <Button small variant="secondary" onClick={signOut}>Sign out</Button>
        </div>
      </div>

      <div className="mt-10 flex flex-wrap items-center gap-3">
        {['', ...STATUSES].map(s => (
          <button key={s || 'all'} type="button" className="chip" aria-pressed={status === s} onClick={() => setStatus(s)}>
            {s ? s[0].toUpperCase() + s.slice(1) : 'All'}{s && counts[s] ? ` · ${counts[s]}` : ''}
          </button>
        ))}
        <input type="search" className="field !w-full sm:!w-72 sm:ml-auto" placeholder="Search name, email, message" aria-label="Search enquiries" value={q} onChange={e => setQ(e.target.value)} />
      </div>

      {msg && <p role="alert" className="field-error mt-8">{msg}</p>}
      {!msg && !loading && rows.length === 0 && <p className="text-body text-ink-3 mt-12">{total ? 'Nothing matches.' : 'No enquiries yet. They will appear here as soon as someone writes.'}</p>}

      <ul className="mt-8 hairline-top">
        {rows.map(r => {
          const isOpen = open === r.id
          return (
            <li key={r.id} className="border-b" style={{ borderColor: 'var(--line-1)' }}>
              <button type="button" onClick={() => toggle(r)} aria-expanded={isOpen} className="w-full text-left grid gap-1 md:grid-cols-[1.1fr_1.6fr_auto] md:items-center gap-x-8 py-5">
                <span className="flex items-center gap-3 min-w-0">
                  {r.status === 'new' && <span aria-label="New" className="w-2 h-2 rounded-full flex-none" style={{ background: 'var(--signal)' }} />}
                  <span className="text-title text-white truncate">{r.name}</span>
                </span>
                <span className="text-body-sm text-ink-3 truncate">{r.subject ? `${r.subject} · ` : ''}{r.message.replace(/\s+/g, ' ')}</span>
                <span className="text-label text-ink-3 md:text-right">{topicLabel(r.topic)} · {when(r.created_at)}</span>
              </button>
              {isOpen && (
                <div className="pb-8 grid gap-6 md:grid-cols-[1.1fr_2.2fr] md:gap-x-8">
                  <dl className="grid gap-3 text-body-sm content-start">
                    <div><dt className="text-overline text-ink-3">Email</dt><dd><a className="text-white underline" href={`mailto:${r.email}`} data-direct>{r.email}</a></dd></div>
                    {r.organisation && <div><dt className="text-overline text-ink-3">Organisation</dt><dd className="text-ink-2">{r.organisation}</dd></div>}
                    {r.source_path && <div><dt className="text-overline text-ink-3">Sent from</dt><dd className="text-ink-2">{r.source_path}</dd></div>}
                    <div><dt className="text-overline text-ink-3">Notification</dt><dd className="text-ink-2">{r.notified ? 'Email sent to you' : r.notify_error ? 'Email failed: ' + r.notify_error : 'No email sent'}</dd></div>
                  </dl>
                  <div>
                    <p className="text-body text-ink whitespace-pre-wrap max-w-2xl">{r.message}</p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Button small href={`mailto:${r.email}?subject=${encodeURIComponent('Re: ' + (r.subject || topicLabel(r.topic)))}`}>Reply by email</Button>
                      {STATUSES.filter(s => s !== r.status).map(s => <Button key={s} small variant="secondary" onClick={() => setRowStatus(r.id, s)}>Mark {s}</Button>)}
                    </div>
                  </div>
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}
