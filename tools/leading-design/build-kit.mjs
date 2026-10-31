// Builds, from one data source:
//  1. public/templates/leading-design-chapter-1.html  (editable Template view and filled Example view, like the AI-native kit)
//  2. /tmp/figma-call.js  (the single use_figma script that builds the editable Figma worksheets)
// Run:  node tools/leading-design/build-kit.mjs
import fs from 'node:fs'
import { docs } from '../hiring/docs.mjs'
import { leadingDocs } from '../hiring/leading-docs.mjs'
import { examples, expectedSlots, intro } from './examples.mjs'

const order = [
  ['team', 'team-shape-and-capability-worksheet', 'Team shape'],
  ['alignment', 'hiring-experience-alignment-worksheet', 'Hiring alignment'],
  ['role', 'role-definition-worksheet', 'Role definition'],
  ['story', 'employer-story-and-outreach-worksheet', 'Team story and outreach'],
  ['hr', 'hr-partnership-worksheet', 'HR partnership'],
  ['journey', 'candidate-journey-map-worksheet', 'Candidate journey'],
]
const all = [...docs, ...leadingDocs]
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
const tableRows = b => [...b.rows, ...Array.from({ length: b.blank || 0 }, () => [])]
const sheets = order.map(([key, slug, tab]) => {
  const d = all.find(x => x.slug === slug), ex = examples[slug]
  let n = 0; for (const b of d.blocks) { if (b.t === 'boxes') n += b.items.length; else if (b.t === 'lines') n++; else if (b.t === 'table') tableRows(b).forEach(r => b.cols.forEach((c, i) => { if (!(i === 0 && r[0])) n++ })) }
  if (n !== expectedSlots[slug] || ex.slots.length !== n) throw new Error(`${slug}: slots ${n}, examples ${ex.slots.length}`)
  return { key, tab, d, ex }
})

// ── HTML ────────────────────────────────────────────────────────────────────
const kit = fs.readFileSync('public/templates/ai-native-frameworks.html', 'utf8')
const css = kit.match(/<style>([\s\S]*?)<\/style>/)[1]
const logo = kit.match(/<svg class="logo"[\s\S]*?<\/svg>/)[0]
const panel = (s, mode) => {
  const { key, d, ex } = s, isEx = mode === 'ex'; let slot = 0, ci = 0
  const val = () => (isEx ? ex.slots[slot++] : (slot++, ''))
  const id = () => `${key}-tpl-f${slot}`
  const area = (min, ph) => { const i = id(); const v = val(); return isEx ? `<div class="value">${esc(v) || '&nbsp;'}</div>` : `<textarea class="area" id="${i}" data-save style="min-height:${min}px" aria-label="Your notes" placeholder="${esc(ph || '')}"></textarea>` }
  const cellEl = () => { const i = id(); const v = val(); return isEx ? esc(v) : `<textarea class="cell" id="${i}" data-save rows="1" aria-label="Cell"></textarea>` }
  let out = '', open = false
  const close = () => { if (open) { out += '</section>'; open = false } }
  for (const b of d.blocks) {
    if (b.t === 'h') { close(); out += `<section class="sec"><h2>${esc(b.text)}</h2>`; open = true; continue }
    if (!open) { out += '<section class="sec">'; open = true }
    if (b.t === 'p') out += `<p class="desc">${esc(b.text)}</p>`
    else if (b.t === 'note') out += `<p class="note">${esc(b.text)}</p>`
    else if (b.t === 'boxes') out += `<div class="row" style="--min:${b.cols === 1 ? 520 : 240}px">${b.items.map(it => `<div class="card"><p class="lbl" style="margin:0">${esc(it.title)}</p><p class="hint">${esc(it.hint || '')}</p>${area(Math.max(48, (it.n || 2) * 28))}</div>`).join('')}</div>`
    else if (b.t === 'lines') out += `<div class="card"><p class="lbl" style="margin:0">${esc(b.label)}</p>${area(Math.max(64, b.n * 28))}</div>`
    else if (b.t === 'check') { const on = isEx ? (ex.checked[ci] || []) : []; ci++; const idp = `${key}-${mode}-c${ci}`; out += `<div class="card list">${b.items.map((t, i) => `<label class="chk" for="${idp}-${i}"><input type="checkbox" id="${idp}-${i}" ${isEx ? (on.includes(i) ? 'checked disabled' : 'disabled') : 'data-save'}><span>${esc(t)}</span></label>`).join('')}</div>` }
    else if (b.t === 'table') out += `<div class="tw"><table><thead><tr>${b.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${tableRows(b).map(r => `<tr>${b.cols.map((c, i) => i === 0 && r[0] ? `<td><strong>${esc(r[0])}</strong></td>` : `<td>${cellEl()}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`
  }
  close()
  const brand = `<div class="brand">${logo}<div><p class="bname">Amit Kumar Tiwari</p><p class="bsub">Leading Design · Building a design team</p></div><span class="bsp"></span><p class="burl">designsbyamit.com</p></div>`
  const header = `<header class="hdr"><p class="ov">Worksheet · Chapter 1</p><h1>${esc(d.title)}</h1><p class="sub">${esc(d.sub)}</p></header>`
  const banner = isEx ? `<div class="banner"><p class="ov">Worked example · fictional company</p><p class="bc">${esc(intro)}</p></div>` : ''
  const how = `<div class="card"><p class="ov" style="margin:0">How to use it</p><p class="strong">${esc(d.use)}</p></div>`
  return `<div data-mode="${mode}" ${mode === 'ex' ? 'hidden' : ''}><article class="frame">${brand}${header}${banner}${how}${out}<p class="foot">© 2026 Amit Kumar Tiwari · Leading Design · designsbyamit.com · Template v1.0</p></article></div>`
}
const tabs = sheets.map(s => `<a class="tab" href="#${s.key}" data-kit="${s.key}">${esc(s.d.title.replace(' Worksheet', ''))}<span>Worksheet</span></a>`).join('')
const panels = sheets.map(s => `<div class="panel" data-panel="${s.key}" hidden>${panel(s, 'tpl')}${panel(s, 'ex')}</div>`).join('\n')
const script = kit.match(/<script>([\s\S]*?)<\/script>/)[1].replace(/var kits=\[[^\]]*\]/, `var kits=${JSON.stringify(sheets.map(s => s.key))}`).replace(/aint:/g, 'ldc1:')
const html = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover">
<meta name="robots" content="noindex">
<link rel="icon" href="/favicon.svg">
<title>Leading Design: Building a design team, worksheets</title>
<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">
<style>${css}</style>
</head>
<body>
<div class="shell">
<nav class="bar" aria-label="Worksheets"><div class="tabs">${tabs}</div><div class="modes" role="group" aria-label="View"><button type="button" data-set="tpl" aria-pressed="true">Template</button><button type="button" data-set="ex" aria-pressed="false">Example · NorthStar</button></div></nav>
<p class="note">Type straight into the Template. Your notes stay in this browser only. The same worksheets are available as printable PDFs on the <a href="/resources/leading-design/building-a-design-team#worksheets">chapter page</a>.</p>
${panels}
</div>
<script>${script}</script>
</body>
</html>
`
fs.writeFileSync('public/templates/leading-design-chapter-1.html', html)

// ── Figma script ─────────────────────────────────────────────────────────────
const widths = { journey: 1480 }
const comp = s => ({ slug: s.d.slug, title: s.d.title, sub: s.d.sub, use: s.d.use, w: widths[s.key] || 960, ex: s.ex.slots, checked: s.ex.checked,
  blocks: s.d.blocks.filter(b => b.t !== 'pb').map(b => b.t === 'h' ? { t: 'h', text: b.text } : b.t === 'p' ? { t: 'p', text: b.text } : b.t === 'note' ? { t: 'n', text: b.text }
    : b.t === 'boxes' ? { t: 'b', cols: b.cols || 1, items: b.items.map(i => [i.title, i.hint || '', i.n || 2]) } : b.t === 'lines' ? { t: 'l', label: b.label, n: b.n }
    : b.t === 'check' ? { t: 'c', cols: b.cols || 1, items: b.items } : { t: 't', cols: b.cols, rows: tableRows(b).map(r => r[0] || '') }) })
const DATA = { intro, docs: sheets.map(comp) }
const data = JSON.stringify(DATA).replace(/(\},|\],)/g, '$1\n').replace(/","/g, '",\n"')
const code = `const DATA = ${data};\n` + fs.readFileSync('tools/leading-design/figma-renderer.js', 'utf8')
fs.writeFileSync('/tmp/figma-call.js', code)
console.log('html', (html.length / 1024).toFixed(0) + ' KB', '| figma script', code.length, 'chars (limit 50000)')
