// Case studies behind an NDA gate. The detailed page asks for an access code before it shows anything.
// This is a light gate: it keeps casual visitors out and is not a security boundary, because the page is still part of the site's code.
// Only a salted hash of the code is kept here. To change the code, hash the new one (uppercase, no spaces or dashes) as sha256('amit-nda-v1' + code) and replace ACCESS_HASH.
// Gated detail pages are left out of the sitemap and the prerendered pages (src/seo/site.ts).

export const gatedCases: string[] = ['sap-search']

export const SALT = 'amit-nda-v1'
export const ACCESS_HASH = '054a9b471fac5a2d8beb7f0b5abb084d162dd802abf823155d0a0bdbaa24e27a'

export const normaliseCode = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '')

export async function checkCode(input: string): Promise<boolean> {
  const data = new TextEncoder().encode(SALT + normaliseCode(input))
  const buf = await crypto.subtle.digest('SHA-256', data)
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hex === ACCESS_HASH
}

const KEY = 'nda-unlocked'
export const isUnlocked = (): boolean => { try { return sessionStorage.getItem(KEY) === '1' } catch { return false } }
export const unlock = () => { try { sessionStorage.setItem(KEY, '1') } catch { /* the page stays open for this visit */ } }
