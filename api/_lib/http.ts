import { createHash } from 'node:crypto'

export const json = (body: unknown, status = 200, headers: Record<string, string> = {}) =>
  new Response(JSON.stringify(body), { status, headers: { 'content-type': 'application/json; charset=utf-8', 'cache-control': 'no-store', ...headers } })

/** A one-way hash of the visitor's address, so repeated abuse can be limited without storing the address itself. */
export function ipHash(req: Request) {
  const ip = (req.headers.get('x-forwarded-for') || '').split(',')[0].trim() || req.headers.get('x-real-ip') || 'unknown'
  return createHash('sha256').update('portfolio|' + ip).digest('hex').slice(0, 32)
}

export const esc = (s: string) => s.replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
