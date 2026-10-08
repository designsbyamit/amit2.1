const fs = require('fs');
const CFG = { sub: '' };
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
let MODE = 'tpl', PFX = '', FID = 0;
const ex = () => MODE === 'ex';
const fid = () => `${PFX}-f${++FID}`;
const area = (h, ph) => `<textarea class="area" id="${fid()}" data-save style="min-height:${h || 80}px" aria-label="${esc(ph || 'Your notes')}"${ph ? ` placeholder="${esc(ph)}"` : ''}></textarea>`;
const val = (v, h, ph) => ex() && v ? `<div class="value">${esc(v)}</div>` : area(h, ph);
const ov = s => `<p class="ov">${esc(s)}</p>`;
const card = (label, hint, v, h) => `<div class="card">${ov(label)}${hint ? `<p class="hint">${esc(hint)}</p>` : ''}${val(v, h)}</div>`;
const row = (items, min) => `<div class="row" style="--min:${min || 220}px">${items.join('')}</div>`;
const pill = (t, goal) => `<div class="pill"><b>${esc(t)}</b>${goal ? ` <span>${esc(goal)}</span>` : ''}</div>`;
const sec = (title, desc, body, goal) => `<section class="sec">${title ? pill(title, goal) : ''}${desc ? `<p class="desc">${esc(desc)}</p>` : ''}${body}</section>`;
function table(heads, n, exRows, widths, tplRows) {
  const rows = ex() && exRows ? exRows : (tplRows || Array.from({ length: n }, () => heads.map(() => '')));
  const w = widths || [];
  return `<div class="tw"><table><thead><tr>${heads.map((h, i) => `<th${w[i] ? ` style="width:${w[i]}px"` : ''}>${esc(h)}</th>`).join('')}</tr></thead><tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c ? esc(c) : (ex() ? '' : `<textarea class="cell" id="${fid()}" data-save rows="1" aria-label="Cell"></textarea>`)}</td>`).join('')}</tr>`).join('')}</tbody></table></div>`;
}
const check = (s, on) => { const id = fid(); return `<label class="chk" for="${id}"><input type="checkbox" id="${id}" ${ex() ? (on ? 'checked disabled' : 'disabled') : 'data-save'}><span>${esc(s)}</span></label>`; };
const LOGO = `<svg class="logo" viewBox="0 0 256 256" aria-hidden="true"><path fill="currentColor" d="M170.764 194 128 120.15l-19.112 34.08 43.382 15.365H98.255L84.948 193.79a73.273 73.273 0 0 1-21.782-25.347A72.513 72.513 0 0 1 55 134.907a73.363 73.363 0 0 1 1.483-14.694 72.455 72.455 0 0 1 10.984-26.07 73.193 73.193 0 0 1 32.118-26.416 72.695 72.695 0 0 1 13.703-4.246 73.805 73.805 0 0 1 29.424 0 72.64 72.64 0 0 1 26.103 10.97 73.134 73.134 0 0 1 26.448 32.077 72.452 72.452 0 0 1 4.254 13.686 73.46 73.46 0 0 1-.665 32.321 72.698 72.698 0 0 1-15.636 30.063A73.448 73.448 0 0 1 170.764 194z"/></svg>`;
const brand = () => `<div class="brand">${LOGO}<div><p class="bname">Amit Kumar Tiwari</p><p class="bsub">${esc(CFG.sub)}</p></div><span class="bsp"></span><p class="burl">designsbyamit.com</p></div>`;
let NS = { useCase: 'NorthStar GmbH · Accounts receivable: cutting DSO with an autonomous collections pilot', context: 'NorthStar makes food products for children, is headquartered in Germany and sells to retailers and distributors worldwide. The finance team wants to minimise days sales outstanding (DSO) and maximise collections. Users: collection executives. Figures are illustrative.' };
const banner = () => `<div class="banner"><p class="ov">Worked example · fictional company</p><p class="bt">${esc(NS.useCase)}</p><p class="bc">${esc(NS.context)}</p></div>`;
const anatomy = a => row([['Use it to', a[0]], ['Time', a[1]], ['Leads to', a[2]]].map(([l, t]) => `<div class="card">${ov(l)}<p class="strong">${esc(t)}</p></div>`), 240);
const footer = () => `<p class="foot">© 2026 Amit Kumar Tiwari · ${esc(CFG.sub)} · designsbyamit.com · Kit v1.0</p>`;
function frame(t, blocks) {
  return `<article class="frame">${brand()}<header class="hdr">${ov(t.ov)}<h1>${esc(t.title)}</h1><p class="sub">${esc(t.sub)}</p></header>${ex() && t.example !== false ? banner() : ''}${t.anatomy ? anatomy(t.anatomy) : ''}${blocks()}${footer()}</article>`;
}

const TOOLS = [];
function tool(id, label, t, blocks) { const out = { single: t.example === false }; for (const m of (t.example === false ? ['tpl'] : ['tpl', 'ex'])) { MODE = m; PFX = id + '-' + m; FID = 0; out[m] = frame(t, blocks); } TOOLS.push({ id, label, ...out }); }
function page(file, title, extraJs, storeKey) {
  const css = fs.readFileSync('/home/claude/df/style.css', 'utf8');
  const tabs = TOOLS.map(k => `<a class="tab" href="#${k.id}" data-kit="${k.id}">${esc(k.label)}</a>`).join('');
  const panels = TOOLS.map(k => k.single ? `<div class="panel" data-panel="${k.id}" hidden>${k.tpl}</div>` : `<div class="panel" data-panel="${k.id}" hidden><div data-mode="tpl">${k.tpl}</div><div data-mode="ex" hidden>${k.ex}</div></div>`).join('');
  const js = fs.readFileSync('/home/claude/df/kit.js', 'utf8').replace('__KITS__', JSON.stringify(TOOLS.map(k => k.id))).replace(/df:/g, storeKey + ':') + (extraJs || '');
  const html = `<meta charset="utf-8">\n<title>${esc(title)}</title>\n<link rel="preconnect" href="https://fonts.googleapis.com"><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap">\n<style>${css}</style>\n<div class="shell">\n<nav class="bar" aria-label="Kit tools"><div class="tabs">${tabs}</div><div class="modes" role="group" aria-label="View"><button type="button" data-set="tpl" aria-pressed="true">Template</button><button type="button" data-set="ex" aria-pressed="false">Example · NorthStar</button></div></nav>\n${panels}\n<p class="note">Your notes in the templates stay in this browser only.</p>\n</div>\n<script>${js}</script>`;
  fs.writeFileSync(file, html); return html.length;
}
const setNS = (u, c) => { NS = { useCase: u, context: c }; };
module.exports = { CFG, esc, ex, fid, area, val, ov, card, row, pill, sec, table, check, tool, page, setNS, TOOLS };
