// Writes single UI states from the loop scenes as standalone SVG files (run with: node --experimental-strip-types tools/covers/frames/dump.mjs)
import * as sc from '../../../src/components/ds/anim/scenes.ts'
import { writeFileSync, mkdirSync } from 'node:fs'
const out = new URL('./svg/', import.meta.url); mkdirSync(out, { recursive: true })
const SUG = ['PO 4500012345 — ACME Office Supplies', 'PR 7800098765 — IT Equipment Request', 'Contract CNT-2026-001 — Facilities Mgmt', 'Invoice INV-884521 — Accenture Services', 'GR 5500045321 — Electronics Delivery']
const frames = {
  'search-dd': sc.search({ bare: true, focus: true, lit: true, typed: 'purchase', dd: true, ddHead: 'SUGGESTIONS', ddItems: SUG, pick: 1 }),
  'travel-home': sc.travel({ screen: 'home' }), 'travel-one': sc.travel({ screen: 'one', ck: 2 }), 'travel-two': sc.travel({ screen: 'two' }),
}
const css = `:root{--good:#16A34A;--bad:#DC2626;--warn:#D97706;--wf-bg:#FBFAFE;--wf-surface:#fff;--wf-line:#D9D6EA;--wf-ink:#2A2745;--wf-mute:#B9B5D3;--wf-fill:#EFEDFA;--wf-hot:#5B49D6;--wf-hot-soft:#DDD7FA}text{fill:var(--wf-ink);font-family:'Instrument Sans Variable','Instrument Sans',sans-serif}`
for (const [k, v] of Object.entries(frames)) {
  const phone = k.startsWith('travel')
  const body = phone ? v.replace('<rect width="1280" height="800" fill="url(#warm)"/>', '') : v
  const vb = phone ? '430 4 396 792' : '0 0 1280 800'
  const [, , w, h] = vb.split(' ')
  writeFileSync(new URL(k + '.svg', out), `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}"><style>${css}</style>${body}</svg>`)
}
console.log(Object.keys(frames))
