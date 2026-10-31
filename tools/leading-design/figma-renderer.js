// Plugin API renderer for the chapter 1 worksheets. build-kit.mjs prepends `const DATA = {...}` and prints the whole script.
const hx = h => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
const fl = h => [{ type: 'SOLID', color: hx(h) }];
const K = { ink: '#16150F', ink2: '#4A4843', ink3: '#5F5D58', line: '#D9D5CC', paper: '#FBF9F4', card: '#FFFFFF', tint: '#F1EDE3', acc: '#8A5A2B', accbg: '#F4E9DB', ph: '#A9A59F' };
await Promise.all(['Regular', 'Medium', 'Semi Bold'].map(s => figma.loadFontAsync({ family: 'Inter', style: s })));
function tx(str, size, style, color, wrap, caps) {
  const t = figma.createText(); t.fontName = { family: 'Inter', style }; t.characters = str; t.fontSize = size; t.fills = fl(color);
  if (caps) { t.textCase = 'UPPER'; t.letterSpacing = { unit: 'PERCENT', value: 8 }; }
  if (wrap) t.textAutoResize = 'HEIGHT';
  return t;
}
function fr(dir, o) {
  o = o || {}; const f = figma.createAutoLayout(dir); f.fills = o.fill ? fl(o.fill) : [];
  f.itemSpacing = o.gap || 0; f.paddingTop = f.paddingBottom = o.py || 0; f.paddingLeft = f.paddingRight = o.px || 0;
  if (o.stroke) { f.strokes = fl(o.stroke); f.strokeWeight = 1; f.strokeAlign = 'INSIDE'; }
  if (o.r) f.cornerRadius = o.r; if (o.name) f.name = o.name; return f;
}
function put(p, n, fillW) { p.appendChild(n); if (fillW) n.layoutSizingHorizontal = 'FILL'; return n; }
function field(p, str, minH, ph) {
  const f = fr('VERTICAL', { fill: K.tint, px: 12, py: 10, r: 4, name: 'Field' }); put(p, f, true);
  put(f, tx(str || ph, 13, 'Regular', str ? K.ink : K.ph, true), true);
  try { f.minHeight = minH; } catch (e) {} return f;
}
function grid(p, items, cols, build) {
  for (let i = 0; i < items.length; i += cols) {
    const row = fr('HORIZONTAL', { gap: 12, name: 'Row' }); put(p, row, true);
    for (let j = 0; j < cols; j++) { const el = i + j < items.length ? build(items[i + j], i + j) : fr('VERTICAL', { name: 'Spacer' }); row.appendChild(el); el.layoutSizingHorizontal = 'FILL'; }
  }
}
function checkItem(label, on) {
  const r = fr('HORIZONTAL', { gap: 10, name: 'Check' }); const bx = figma.createFrame(); bx.resize(14, 14); bx.cornerRadius = 3;
  bx.fills = fl(on ? K.acc : K.card); bx.strokes = fl(on ? K.acc : K.ink); bx.strokeWeight = 1.5; r.appendChild(bx);
  r.appendChild(tx(label, 13, 'Regular', K.ink, true)); r.children[1].layoutSizingHorizontal = 'FILL'; return r;
}
function table(p, b, IW, mode, next) {
  const n = b.cols.length, lab = b.rows.some(r => r), wt = b.cols.map((c, i) => (i === 0 && lab ? 1.5 : 1)), sum = wt.reduce((a, c) => a + c, 0);
  const w = wt.map(x => Math.floor(IW * x / sum)); const tbl = fr('VERTICAL', { fill: K.card, stroke: K.line, r: 6, name: 'Table' }); put(p, tbl, true); tbl.clipsContent = true;
  const cell = (row, i, str, o) => {
    const c = fr('VERTICAL', { fill: o.fill, stroke: K.line, px: 10, py: 8, name: 'Cell' }); row.appendChild(c); c.resize(w[i], 30); c.primaryAxisSizingMode = 'AUTO';
    put(c, tx(str, o.size, o.style, o.color, true, o.caps), true); c.layoutAlign = 'STRETCH';
  };
  const head = fr('HORIZONTAL', { name: 'Header' }); put(tbl, head, true);
  b.cols.forEach((c, i) => cell(head, i, c || ' ', { fill: K.tint, size: 10, style: 'Medium', color: K.ink3, caps: true }));
  b.rows.forEach(r => {
    const row = fr('HORIZONTAL', { name: 'Row' }); put(tbl, row, true);
    b.cols.forEach((c, i) => {
      if (i === 0 && r) cell(row, i, r, { fill: K.paper, size: 12, style: 'Semi Bold', color: K.ink });
      else { const v = mode === 'ex' ? next() : ''; cell(row, i, v || ' ', { fill: K.card, size: 12, style: 'Regular', color: K.ink }); }
    });
  });
}
function sheet(d, mode, x, y) {
  const ex = mode === 'ex', IW = d.w - 112; let slot = 0, ci = 0, sec = null;
  const next = () => ex ? (d.ex[slot++] || '') : (slot++, '');
  const f = fr('VERTICAL', { fill: K.paper, px: 56, py: 56, gap: 28, name: (ex ? 'Example · ' : 'Template · ') + d.title });
  figma.currentPage.appendChild(f); f.resize(d.w, 100); f.primaryAxisSizingMode = 'AUTO'; f.x = x; f.y = y;
  put(f, tx('Amit Kumar Tiwari · Leading Design · designsbyamit.com', 12, 'Medium', K.ink3, true), true);
  const hd = fr('VERTICAL', { gap: 10, name: 'Header' }); put(f, hd, true);
  put(hd, tx((ex ? 'Worked example · ' : '') + DATA.kicker, 11, 'Medium', K.acc, true, true), true);
  put(hd, tx(d.title, 38, 'Medium', K.ink, true), true); put(hd, tx(d.sub, 16, 'Regular', K.ink2, true), true);
  if (ex) { const bn = fr('VERTICAL', { fill: K.ink, px: 24, py: 18, gap: 4, r: 8, name: 'Example banner' }); put(f, bn, true); put(bn, tx('Worked example · fictional company', 11, 'Medium', '#D9A66B', true, true), true); put(bn, tx(DATA.intro, 14, 'Regular', '#FBF9F4', true), true); }
  const use = fr('VERTICAL', { fill: K.accbg, px: 18, py: 14, r: 6, name: 'How to use it' }); put(f, use, true); put(use, tx('How to use it. ' + d.use, 13, 'Regular', K.ink, true), true);
  for (const b of d.blocks) {
    if (b.t === 'h') { sec = fr('VERTICAL', { gap: 14, name: b.text }); put(f, sec, true); put(sec, tx(b.text, 22, 'Semi Bold', K.ink, true), true); continue; }
    const g = sec || f;
    if (b.t === 'p') put(g, tx(b.text, 13, 'Regular', K.ink3, true), true);
    else if (b.t === 'n') { const c = fr('VERTICAL', { fill: K.tint, px: 16, py: 12, r: 6, name: 'Note' }); put(g, c, true); put(c, tx(b.text, 13, 'Regular', K.ink2, true), true); }
    else if (b.t === 'b') grid(g, b.items, b.cols, it => { const c = fr('VERTICAL', { fill: K.card, stroke: K.line, px: 14, py: 12, gap: 6, r: 6, name: it[0] }); put(c, tx(it[0], 13, 'Semi Bold', K.ink, true), true); if (it[1]) put(c, tx(it[1], 11, 'Regular', K.ink3, true), true); field(c, next(), it[2] * 26, 'Write here'); return c; });
    else if (b.t === 'l') { const c = fr('VERTICAL', { fill: K.card, stroke: K.line, px: 14, py: 12, gap: 8, r: 6, name: b.label }); put(g, c, true); put(c, tx(b.label, 13, 'Semi Bold', K.ink, true), true); field(c, next(), b.n * 26, 'Write here'); }
    else if (b.t === 'c') { const on = ex ? (d.checked[ci] || []) : []; ci++; grid(g, b.items.map((t, i) => [t, on.includes(i)]), b.cols, it => checkItem(it[0], it[1])); }
    else if (b.t === 't') table(g, b, IW, mode, next);
  }
  return f;
}
const done = [], errors = []; let x = 0; const xs = {};
for (const d of DATA.docs) { xs[d.slug] = x; x += d.w + 140; }
figma.currentPage.name = DATA.pageName;
let maxH = 0; const shots = [];
for (const d of DATA.docs) { try { const f = sheet(d, 'tpl', xs[d.slug], 0); maxH = Math.max(maxH, f.height); done.push(['tpl', d.slug, f.id, Math.round(f.height)]); if (!shots.length) shots.push(f); } catch (e) { errors.push(['tpl', d.slug, String(e && e.message || e)]); } }
const y2 = maxH + 260; let last = null;
for (const d of DATA.docs) { try { const f = sheet(d, 'ex', xs[d.slug], y2); done.push(['ex', d.slug, f.id, Math.round(f.height)]); last = f; } catch (e) { errors.push(['ex', d.slug, String(e && e.message || e)]); } }
const lab = (s, yy) => { const t = figma.createText(); t.fontName = { family: 'Inter', style: 'Semi Bold' }; t.characters = s; t.fontSize = 40; t.fills = fl(K.ink); t.x = 0; t.y = yy; };
lab('Templates: edit these', -90); lab('Filled examples: NorthStar GmbH', y2 - 90);
if (shots[0]) await shots[0].screenshot({ scale: 0.4 });
if (last) await last.screenshot({ scale: 0.4 });
return { done, errors, y2 };
