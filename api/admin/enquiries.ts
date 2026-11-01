import { isAuthed } from '../_lib/auth.js'
import { db, dbReady } from '../_lib/db.js'
import { json } from '../_lib/http.js'

const STATUSES = ['new', 'read', 'replied', 'archived']

export async function GET(req: Request) {
  if (!isAuthed(req)) return json({ error: 'Not signed in.' }, 401)
  if (!dbReady()) return json({ error: 'No database is connected yet.' }, 503)
  const u = new URL(req.url)
  const status = STATUSES.includes(u.searchParams.get('status') || '') ? u.searchParams.get('status')! : ''
  const q = (u.searchParams.get('q') || '').trim().slice(0, 100)
  const like = q ? `%${q}%` : ''
  const { sql, ready } = db(); await ready
  const rows = await sql`select id, created_at, name, email, organisation, role, topic, subject, message, source_path, status, notified, notify_error from enquiries
    where (${status} = '' or status = ${status}) and (${like} = '' or name ilike ${like} or email ilike ${like} or message ilike ${like} or organisation ilike ${like})
    order by created_at desc limit 300`
  const counts = await sql`select status, count(*)::int as n from enquiries group by status`
  return json({ rows, counts })
}

export async function PATCH(req: Request) {
  if (!isAuthed(req)) return json({ error: 'Not signed in.' }, 401)
  let b: { id?: number; status?: string }
  try { b = await req.json() } catch { return json({ error: 'Invalid request.' }, 400) }
  if (!Number.isInteger(b.id) || !STATUSES.includes(String(b.status))) return json({ error: 'Invalid request.' }, 400)
  const { sql, ready } = db(); await ready
  await sql`update enquiries set status = ${b.status!} where id = ${b.id!}`
  return json({ ok: true })
}

/** Quick check the page uses on load: are we signed in? */
export async function HEAD(req: Request) { return new Response(null, { status: isAuthed(req) ? 204 : 401 }) }
