import { authConfigured, checkLogin, sessionCookie } from '../_lib/auth.js'
import { db, dbReady } from '../_lib/db.js'
import { ipHash, json } from '../_lib/http.js'

export async function POST(req: Request) {
  if (!authConfigured()) return json({ error: 'The portal is not set up yet. Add ADMIN_PASSWORD (10+ characters) in Vercel.' }, 503)
  let b: { email?: string; password?: string }
  try { b = await req.json() } catch { return json({ error: 'Invalid request.' }, 400) }
  const hash = ipHash(req)
  let sql: ReturnType<typeof db>['sql'] | null = null
  if (dbReady()) {
    const d = db(); await d.ready; sql = d.sql
    const [{ n }] = await sql`select count(*)::int as n from portal_login_attempts where ip_hash = ${hash} and ok = false and at > now() - interval '15 minutes'`
    if (n >= 8) return json({ error: 'Too many attempts. Try again in 15 minutes.' }, 429)
  }
  const ok = checkLogin(String(b.email || ''), String(b.password || ''))
  if (sql) await sql`insert into portal_login_attempts (ip_hash, ok) values (${hash}, ${ok})`
  if (!ok) { await new Promise(r => setTimeout(r, 700)); return json({ error: 'That email and password do not match.' }, 401) }
  return json({ ok: true }, 200, { 'set-cookie': sessionCookie() })
}
