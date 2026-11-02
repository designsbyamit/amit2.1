#!/usr/bin/env node
/**
 * Token check. Counts hard-coded design values in the app source and fails the build
 * if any category goes UP from tools/tokens/baseline.json. The baseline only ever goes down:
 * run `npm run tokens:update` after a clean-up to lock in the lower number.
 *
 * Allowed to carry raw values: the token files themselves, illustrations and marks
 * (they are drawings), animated thumbnails, and the SAP-style prototypes in src/labs,
 * which imitate another product on purpose.
 */
import { readFileSync, readdirSync, statSync, writeFileSync, existsSync } from 'node:fs'
import { join, relative } from 'node:path'

const root = new URL('../../', import.meta.url).pathname
const SRC = join(root, 'src')
const BASE = join(root, 'tools/tokens/baseline.json')
const ALLOW = ['src/styles/tokens.css', 'src/labs/', 'src/film/', 'src/components/case/search-anatomy.css', 'src/components/case/SearchAnatomy', 'src/components/illustrations/', 'src/components/marks/', 'src/components/ds/anim/', 'src/components/ds/HubPictograms', 'src/components/ds/StoryPictogram', 'src/components/ds/AnimThumb', 'src/components/ds/FlowThumb', 'src/components/ds/ResourceCover', 'src/components/ds/MenuCover', 'src/components/ds/StoryCover', 'src/components/sections/DriveGrid']

const files = []
;(function walk(d) {
  for (const n of readdirSync(d)) {
    const p = join(d, n)
    if (statSync(p).isDirectory()) walk(p)
    else if (/\.(tsx|ts|css)$/.test(n)) files.push(p)
  }
})(SRC)

const rules = {
  'hex colour': /#[0-9a-fA-F]{6}\b|#[0-9a-fA-F]{3}\b(?![0-9a-zA-Z-])/g,
  'rgb() colour': /\brgba?\(\s*\d/g,
  'inline spacing or size (px/rem)': /\b(?:padding|margin|gap|width|height|top|left|right|bottom|minHeight|minWidth|maxWidth|maxHeight|fontSize|lineHeight|letterSpacing)\s*:\s*['"`]?-?\d*\.?\d+(?:px|rem|em)\b/g,
  'raw shadow': /\bboxShadow\s*:\s*['"`](?!var\()|\bbox-shadow\s*:\s*(?!var\(|none)/g,
  'arbitrary Tailwind value': /\b(?:text|w|h|min-w|min-h|max-w|max-h|p[xytblr]?|m[xytblr]?|gap|rounded|shadow|duration|tracking|leading|z|top|left|right|bottom|inset)-\[[^\]]+\]/g,
  'hard-coded duration': /\bduration-\d+\b|\btransition(?:Duration)?\s*:\s*['"`][^'"`]*\d+(?:ms|s)\b/g,
}

const counts = Object.fromEntries(Object.keys(rules).map(k => [k, 0]))
const where = {}
for (const f of files) {
  const rel = relative(root, f)
  if (ALLOW.some(a => rel.startsWith(a))) continue
  const text = readFileSync(f, 'utf8')
  for (const [k, re] of Object.entries(rules)) {
    const m = text.match(re)
    if (m) { counts[k] += m.length; (where[rel] ??= {})[k] = m.length }
  }
}

if (process.argv.includes('--update')) {
  writeFileSync(BASE, JSON.stringify(counts, null, 2) + '\n')
  console.log('tokens: baseline updated', counts)
  process.exit(0)
}
if (process.argv.includes('--report')) {
  const rows = Object.entries(where).map(([f, c]) => [f, Object.values(c).reduce((a, b) => a + b, 0)]).sort((a, b) => b[1] - a[1]).slice(0, 40)
  for (const [f, n] of rows) console.log(String(n).padStart(5), f)
}
const base = existsSync(BASE) ? JSON.parse(readFileSync(BASE, 'utf8')) : null
console.log('tokens: hard-coded values outside the token files')
let fail = false
for (const [k, n] of Object.entries(counts)) {
  const b = base?.[k]
  const flag = b == null ? '' : n > b ? `  UP from ${b}` : n < b ? `  (down from ${b})` : ''
  if (b != null && n > b) fail = true
  console.log(`  ${k.padEnd(34)} ${String(n).padStart(5)}${flag}`)
}
if (fail) { console.error('\ntokens: a count went up. Use a token instead of a raw value, or add the file to ALLOW if it is an illustration.'); process.exit(1) }
