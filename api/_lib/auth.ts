import { createHmac, timingSafeEqual, createHash } from 'node:crypto'

const COOKIE = 'portal_session'
const DAYS = 7

export const adminEmail = () => (process.env.ADMIN_EMAIL || 'uxbyamit@gmail.com').trim().toLowerCase()
const adminPassword = () => process.env.ADMIN_PASSWORD || ''
export const authConfigured = () => adminPassword().length >= 10

/** Signing key derived from values only the owner controls, so no extra secret is needed. Changing the password signs everyone out. */
const key = () => createHash('sha256').update(`portal|${adminPassword()}|${process.env.DATABASE_URL || process.env.POSTGRES_URL || ''}`).digest()
const sign = (data: string) => createHmac('sha256', key()).update(data).digest('base64url')

const same = (a: string, b: string) => {
  const x = createHash('sha256').update(a).digest(), y = createHash('sha256').update(b).digest()
  return timingSafeEqual(x, y)
}

export function checkLogin(email: string, password: string) {
  const okEmail = same(email.trim().toLowerCase(), adminEmail())
  const okPass = same(password, adminPassword())
  return authConfigured() && okEmail && okPass
}

export function sessionCookie() {
  const exp = Date.now() + DAYS * 86400_000
  const payload = Buffer.from(JSON.stringify({ e: adminEmail(), exp })).toString('base64url')
  return `${COOKIE}=${payload}.${sign(payload)}; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=${DAYS * 86400}`
}
export const clearCookie = () => `${COOKIE}=; HttpOnly; Secure; SameSite=Strict; Path=/; Max-Age=0`

export function isAuthed(req: Request) {
  if (!authConfigured()) return false
  const raw = (req.headers.get('cookie') || '').split(/;\s*/).find(c => c.startsWith(COOKIE + '='))
  if (!raw) return false
  const [payload, sig] = raw.slice(COOKIE.length + 1).split('.')
  if (!payload || !sig || !same(sig, sign(payload))) return false
  try { const p = JSON.parse(Buffer.from(payload, 'base64url').toString()); return p.e === adminEmail() && p.exp > Date.now() } catch { return false }
}
