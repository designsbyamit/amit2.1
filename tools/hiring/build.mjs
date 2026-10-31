// Renders the hiring worksheets to PDF (A4) and a combined handbook. Re-run after editing docs.mjs:  NODE_PATH=$(npm root -g) node tools/hiring/build.mjs
import fs from 'node:fs'
import path from 'node:path'
import { execFileSync } from 'node:child_process'
import { createRequire } from 'node:module'
import { docs } from './docs.mjs'
import { leadingDocs } from './leading-docs.mjs'
const only = process.env.ONLY === 'leading'

const require = createRequire(import.meta.url)
const { chromium } = require('playwright')
const out = path.resolve('public/downloads/hiring')
const tmp = path.resolve('node_modules/.cache/hiring')
fs.mkdirSync(out, { recursive: true }); fs.mkdirSync(tmp, { recursive: true })
const font = f => 'file://' + path.resolve('node_modules/@fontsource-variable', f)
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const partName = { 1: 'Part 1 · Managing the hiring experience', 2: 'Part 2 · The candidate hiring experience', 3: 'Part 3 · Onboarding' }

const css = `
@font-face{font-family:Geist;src:url(${font('geist/files/geist-latin-wght-normal.woff2')});font-weight:100 900}
@font-face{font-family:Bodoni;src:url(${font('bodoni-moda/files/bodoni-moda-latin-wght-normal.woff2')});font-weight:400 900}
:root{--ink:#14161B;--ink2:#454A55;--ink3:#6B7180;--line:#C9CDD6;--tint:#F3F4F7;--acc:#2C3FA8;--accbg:#E8EBFA}
*{box-sizing:border-box}
html{-webkit-print-color-adjust:exact;print-color-adjust:exact}
body{margin:0;font:400 9.6pt/1.5 Geist,sans-serif;color:var(--ink)}
.page{padding:0;zoom:.86}
.head{border-bottom:1.5pt solid var(--ink);padding-bottom:10pt;margin-bottom:14pt}
.kind{font:500 7.5pt Geist;letter-spacing:.14em;text-transform:uppercase;color:var(--acc);margin:0 0 6pt}
h1{font:500 25pt/1.08 Bodoni,serif;margin:0 0 6pt;letter-spacing:-.01em;text-wrap:balance}
.sub{margin:0;font-size:11pt;color:var(--ink2);max-width:150mm}
.use{margin:10pt 0 0;padding:8pt 10pt;background:var(--accbg);border-radius:3pt;font-size:9pt;color:var(--ink)}
.use b{font-weight:600}
h2{font:500 14pt/1.2 Bodoni,serif;margin:16pt 0 6pt;break-after:avoid}
p{margin:0 0 7pt;color:var(--ink2)}
.boxes{display:grid;gap:8pt;margin:0 0 8pt}
.box{border:.6pt solid var(--line);border-radius:3pt;padding:8pt 9pt;break-inside:avoid}
.box b{display:block;font-weight:600;font-size:9.6pt}
.box i{display:block;font-style:normal;font-size:8pt;color:var(--ink3);margin-bottom:2pt}
.rule{height:15pt;border-bottom:.5pt dotted #9AA0AE}
.checks{display:grid;gap:3pt 16pt;margin:0 0 8pt}
.chk{display:flex;gap:8pt;align-items:flex-start;break-inside:avoid}
.chk:before{content:'';flex:none;width:9pt;height:9pt;border:.9pt solid var(--ink);border-radius:2pt;margin-top:2.4pt}
.lines{margin:0 0 8pt}.lines .lab{font-weight:600;font-size:9pt;margin-bottom:2pt}
table{width:100%;border-collapse:collapse;margin:0 0 8pt;font-size:8.6pt;table-layout:fixed}
th{background:var(--tint);text-align:left;font:600 7.4pt Geist;letter-spacing:.06em;text-transform:uppercase;color:var(--ink2);padding:5pt 6pt;border:.6pt solid var(--line)}
td{border:.6pt solid var(--line);padding:5pt 6pt;vertical-align:top;color:var(--ink)}
td.f{font-weight:600;background:#FAFAFC}
tr{break-inside:avoid}
.note{margin:10pt 0 0;padding:8pt 10pt;border-left:2.5pt solid var(--acc);background:var(--tint);font-size:9pt;color:var(--ink2)}
.msg{margin:0 0 8pt;border:.6pt solid var(--line);border-radius:3pt;break-inside:avoid}
.msg h3{margin:0;padding:5pt 9pt;background:var(--tint);font:600 8pt Geist;letter-spacing:.06em;text-transform:uppercase;color:var(--ink2)}
.msg p{margin:0;padding:8pt 9pt;color:var(--ink);font-size:9.2pt}
.pb{break-after:page}
.cover{height:297mm;padding:0;display:flex;flex-direction:column;justify-content:space-between;background:#0F1220;color:#ECEDF3}
.cover .in{padding:26mm 22mm}
.cover h1{font-size:44pt;color:#fff;max-width:150mm}
.cover .kind{color:#C8F55A}
.cover p{color:#B9BED0;font-size:12pt;max-width:140mm}
.toc{margin-top:16mm}.toc div{display:flex;gap:10pt;padding:7pt 0;border-top:.5pt solid #3A4160;font-size:10.5pt}.toc span{color:#C8F55A;width:60pt;font:500 8pt Geist;letter-spacing:.1em;text-transform:uppercase;padding-top:2pt}
`

function render(block) {
  switch (block.t) {
    case 'h': return `<h2>${esc(block.text)}</h2>`
    case 'p': return `<p>${esc(block.text)}</p>`
    case 'note': return `<div class="note">${esc(block.text)}</div>`
    case 'pb': return `<div class="pb"></div>`
    case 'lines': return `<div class="lines"><div class="lab">${esc(block.label)}</div>${'<div class="rule"></div>'.repeat(block.n)}</div>`
    case 'check': return `<div class="checks" style="grid-template-columns:repeat(${block.cols || 1},1fr)">${block.items.map(i => `<div class="chk"><span>${esc(i)}</span></div>`).join('')}</div>`
    case 'msg': return `<div class="msg"><h3>${esc(block.title)}</h3><p>${esc(block.text)}</p></div>`
    case 'boxes': return `<div class="boxes" style="grid-template-columns:repeat(${block.cols || 1},1fr)">${block.items.map(b => `<div class="box"><b>${esc(b.title)}</b><i>${esc(b.hint || '')}</i>${'<div class="rule"></div>'.repeat(b.n || 2)}</div>`).join('')}</div>`
    case 'table': {
      const rows = [...block.rows, ...Array.from({ length: block.blank || 0 }, () => [])]
      return `<table><thead><tr>${block.cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr style="height:${block.rowH || 34}pt">${block.cols.map((_, i) => `<td${i === 0 && (r[0] || block.first) ? ' class="f"' : ''}>${esc(r[i] ?? '')}</td>`).join('')}</tr>`).join('')}</tbody></table>`
    }
  }
  return ''
}

const docHtml = d => `<!doctype html><html lang="en"><head><meta charset="utf-8"><title>${esc(d.title)}</title><style>${css}@page{size:A4${d.landscape ? ' landscape' : ''};margin:16mm 16mm 18mm}</style></head><body><div class="page">
<div class="head"><p class="kind">${d.kind} · ${esc(d.partLabel || partName[d.part])}</p><h1>${esc(d.title)}</h1><p class="sub">${esc(d.sub)}</p><div class="use"><b>How to use it.</b> ${esc(d.use)}</div></div>
${d.blocks.map(render).join('\n')}</div></body></html>`

const coverHtml = (title, blurb, list) => `<!doctype html><html><head><meta charset="utf-8"><style>${css}@page{size:A4;margin:0}</style></head><body>
<div class="cover"><div class="in"><p class="kind">Hiring playbook</p><h1>The hiring handbook for design teams</h1><p>Eight worksheets, handbooks and playbooks for building a hiring experience from the first job description to a new designer’s first ninety days.</p></div>
<div class="in" style="padding-top:0"><div class="toc">${list.map((d, i) => `<div><span>${String(i + 1).padStart(2, '0')} · ${d.kind}</span><b style="font-weight:500">${esc(d.title)}</b></div>`).join('')}</div><p style="margin-top:14mm;font-size:9.5pt">Amit Kumar Tiwari · Design leadership</p></div></div></body></html>`

const browser = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium', args: ['--no-sandbox', '--allow-file-access-from-files'] })
const page = await browser.newPage()
const footer = t => `<div style="font:400 7pt Geist,Arial,sans-serif;color:#6B7180;width:100%;padding:0 16mm;display:flex;justify-content:space-between"><span>${t}</span><span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span></div>`
async function pdf(html, name, d) {
  const f = path.join(tmp, name + '.html'); fs.writeFileSync(f, html)
  await page.goto('file://' + f); await page.evaluate(() => document.fonts.ready)
  const cover = name.startsWith('cover')
  await page.pdf({ path: path.join(cover ? tmp : out, name + '.pdf'), printBackground: true, preferCSSPageSize: true, displayHeaderFooter: !cover, headerTemplate: '<span></span>', footerTemplate: footer(d ? esc(d.title) + ' · Amit Kumar Tiwari' : '') })
}
for (const d of (only ? leadingDocs : [...docs, ...leadingDocs])) { await pdf(docHtml(d), d.slug, d); console.log('built', d.slug) }
if (only) { await browser.close(); console.log('leading docs done'); process.exit(0) }
const classic = docs.filter(d => !d.exp)
await pdf(coverHtml('The hiring handbook for design teams', 'Eight worksheets, handbooks and playbooks for building a hiring experience from the first job description to a new designer\u2019s first ninety days.', classic), 'cover')
execFileSync('pdfunite', [path.join(tmp, 'cover.pdf'), ...classic.map(d => path.join(out, d.slug + '.pdf')), path.join(out, 'hiring-handbook-complete.pdf')])
await pdf(coverHtml('Hiring is an experience problem: the handbook', 'Eleven worksheets, handbooks and playbooks for redefining a design hiring experience, including how to design the on-site assignment, define the signals and ask candidates how it felt.', docs), 'cover-exp')
await browser.close()
execFileSync('pdfunite', [path.join(tmp, 'cover-exp.pdf'), ...docs.map(d => path.join(out, d.slug + '.pdf')), path.join(out, 'hiring-experience-handbook-complete.pdf')])
console.log('bundle done')
