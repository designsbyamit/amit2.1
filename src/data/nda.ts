// Case studies behind an NDA gate. The detailed page asks for an access code before it shows anything.
// This is a light gate: it keeps casual visitors out and is not a security boundary, because the page is still part of the site's code.
// Each gated case study has its own code. Only a salted hash is kept here. To change a code, hash the new one (uppercase, no spaces or dashes) as sha256('amit-nda-v1' + code) and replace that case's entry in ACCESS_HASHES.
// Gated detail pages are left out of the sitemap and the prerendered pages (src/seo/site.ts).

export const gatedCases: string[] = ['sap-search', 'sap-agentic', 'sap-collections', 'sap-signin', 'sap-compositional']

export const SALT = 'amit-nda-v1'
export const ACCESS_HASHES: Record<string, string> = {
  'sap-agentic': 'ac0212892d23073efde5900cb09c886d5ac9630365580c4c01eed27abab5f415',
  'sap-search': '9fb0bbac859269bc21e060fefbee7b53bcbf208e6dc7de20f17f2932118ce8d2',
  'sap-collections': 'fd3ef9aafde280c06c76b7562a2269df085791c2c69e8b6d2b04fc6d1b8b77cf',
  'sap-signin': 'cd988eb38f17fa83b376b93a46c70dd044e25a2bf04dd3f2073275f35b1001ee',
  'sap-compositional': '9ead915f00c34761bbf8dfbfbb0304a768283d91021707ee7c8d4804632ca942',
}

export const normaliseCode = (s: string) => s.toUpperCase().replace(/[^A-Z0-9]/g, '')

export async function checkCode(id: string, input: string): Promise<boolean> {
  const data = new TextEncoder().encode(SALT + normaliseCode(input))
  const buf = await crypto.subtle.digest('SHA-256', data)
  const hex = Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('')
  return hex === ACCESS_HASHES[id]
}

const key = (id: string) => `nda-unlocked:${id}`
export const isUnlocked = (id: string): boolean => { try { return sessionStorage.getItem(key(id)) === '1' } catch { return false } }
export const unlock = (id: string) => { try { sessionStorage.setItem(key(id), '1') } catch { /* the page stays open for this visit */ } }
