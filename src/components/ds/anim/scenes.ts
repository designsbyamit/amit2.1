// @ts-nocheck
// Scene drawings for the animated project thumbnails. Each function returns SVG markup for one UI state, on a 1280 x 800 canvas, in that project's own palette.
/* ---------- tiny SVG helpers (master coordinates are 1280 x 800) ---------- */
export const S = (a) => a.join('');
const R = (x, y, w, h, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${o.rx ?? 10}" fill="${o.f ?? 'var(--wf-surface)'}" ${o.s ? `stroke="${o.s}" stroke-width="${o.sw ?? 1.5}"` : ''} ${o.op ? `opacity="${o.op}"` : ''}/>`;
const B = (x, y, w, o = {}) => `<rect x="${x}" y="${y}" width="${w}" height="${o.h ?? 9}" rx="${(o.h ?? 9) / 2}" fill="${o.f ?? 'var(--wf-mute)'}" ${o.op ? `opacity="${o.op}"` : ''}/>`;
const C = (x, y, r, f = 'var(--wf-mute)') => `<circle cx="${x}" cy="${y}" r="${r}" fill="${f}"/>`;
const T = (x, y, s, o = {}) => `<text x="${x}" y="${y}" font-size="${o.z ?? 20}" font-weight="${o.w ?? 500}" ${o.a ? `text-anchor="${o.a}"` : ''} ${o.f ? `style="fill:${o.f}"` : ''}>${s}</text>`;
const HOT = 'var(--wf-hot)', SOFT = 'var(--wf-hot-soft)', OK = 'var(--good)', BAD = 'var(--bad)', WARN = 'var(--warn)';
const ring = (x, y, w, h) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="none" stroke="${HOT}" stroke-width="4"/>`;
const tick = (x, y, c = OK) => `${C(x, y, 13, c)}<path d="M${x - 6} ${y} l4.5 5 l8-9" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const cross = (x, y) => `${C(x, y, 14, BAD)}<path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
const cursor = (x, y) => `<path d="M${x} ${y} l0 30 l8-7 l6 13 l6-3 l-6-13 l11 0z" fill="var(--wf-ink)" stroke="var(--wf-bg)" stroke-width="2.5" stroke-linejoin="round"/>`;

/* ---------- project palettes + drawing helpers: every master below draws in its own project's colours ---------- */
const r = (x, y, w, h, f, rx = 10, s, sw = 1.5, op) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${rx}" fill="${f}" ${s ? `stroke="${s}" stroke-width="${sw}"` : ''} ${op != null ? `opacity="${op}"` : ''}/>`;
const t = (x, y, str, z = 18, w = 500, f = '#000', a, fam) => `<text x="${x}" y="${y}" font-size="${z}" font-weight="${w}" ${a ? `text-anchor="${a}"` : ''} style="fill:${f}${fam ? `;font-family:${fam}` : ''}">${str}</text>`;
const bl = (x, y, w, f, h = 9, op = 1) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${f}" opacity="${op}"/>`;
const ci = (x, y, rad, f) => `<circle cx="${x}" cy="${y}" r="${rad}" fill="${f}"/>`;
const ck = (x, y, f, rad = 13, c = '#fff') => ci(x, y, rad, f) + `<path d="M${x - rad * .45} ${y} l${rad * .35} ${rad * .4} l${rad * .6}-${rad * .75}" stroke="${c}" stroke-width="${rad * .24}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const xx = (x, y, f, rad = 14) => ci(x, y, rad, f) + `<path d="M${x - 5} ${y - 5} l10 10 M${x + 5} ${y - 5} l-10 10" stroke="#fff" stroke-width="3" stroke-linecap="round"/>`;
const cur = (x, y, f = '#111', e = '#fff') => `<path d="M${x} ${y} l0 30 l8-7 l6 13 l6-3 l-6-13 l11 0z" fill="${f}" stroke="${e}" stroke-width="2.5" stroke-linejoin="round"/>`;
const sparkP = (x, y, f, k = 1) => `<path d="M${x} ${y - 11 * k} l${3 * k} ${8 * k} l${8 * k} ${3 * k} l-${8 * k} ${3 * k} l-${3 * k} ${8 * k} l-${3 * k}-${8 * k} l-${8 * k}-${3 * k} l${8 * k}-${3 * k}z" fill="${f}"/>`;
const SERIF = "var(--font-serif), Georgia, serif";

/* ---------- 1. Agentic order confirmation (white, teal, amber; Helios Components AG) ---------- */
function agentic(s = {}) {
  const K = { bg: '#F3F5F8', sf: '#FFFFFF', ink: '#1B2230', mu: '#6B7587', ln: '#DDE3EC', teal: '#0B9488', tealS: '#E7F4F2', amb: '#D9650F', ambS: '#FFF3E0', ind: '#4C3FC4', indS: '#E9E7FB' };
  const st = s.step ?? 2, names = ['Received', 'Read', 'Validated', 'Decided', 'Replied', 'Revised', 'Confirmed'];
  let o = r(0, 0, 1280, 800, K.bg, 0) + r(0, 0, 1280, 54, K.sf, 0) + r(40, 15, 26, 24, K.ink, 7) + t(78, 34, 'Order confirmations', 17, 600, K.ink) + ci(1230, 27, 14, '#C9D1DD');
  o += r(40, 70, 1200, 190, K.sf, 18, K.ln) + t(70, 118, 'Order confirmation 1505899', 30, 650, K.ink) + t(70, 150, 'Purchase order 4994546957   ·   Helios Components AG   ·   Value €164,865.00', 15, 500, K.mu) + r(1048, 94, 164, 32, st >= 3 ? '#E2F3E8' : K.indS, 16) + t(1130, 116, st >= 3 ? 'Validated' : 'Pending validation', 13.5, 600, st >= 3 ? '#15803D' : K.ind, 'middle');
  names.forEach((n, i) => { const x = 120 + i * 156; if (i < 6) o += r(x, 207, 156, 3, i < st ? K.ink : K.ln, 0); o += i < st ? ck(x, 209, K.ink, 12) : (i === st ? ci(x, 209, 14, K.indS) + ci(x, 209, 7, K.ind) : ci(x, 209, 11, K.ln)); o += t(x, 240, n, 13.5, i <= st ? 600 : 500, i <= st ? K.ink : K.mu, 'middle'); });
  o += r(40, 276, 740, 504, K.sf, 18, K.ln) + t(70, 322, 'Extraction', 18, 650, K.ink) + `<rect x="70" y="332" width="104" height="3" fill="${K.teal}"/>` + t(200, 322, 'Activity', 18, 500, K.mu);
  o += r(66, 352, 688, 84, s.flag ? K.ambS : K.tealS, 14) + ci(100, 394, 18, s.flag ? K.amb : K.teal) + t(132, 385, s.flag ? 'Next: check one field, then confirm' : 'The agent is reading the order', 16, 650, K.ink) + t(132, 412, s.flag ? 'The delivery date came from a German line. Please check it.' : 'Comparing it with purchase order 4994546957.', 14, 500, K.mu);
  const rows = [['Supplier', 'Helios Components AG', 99], ['Purchase order', '4994546957', 99], ['Confirmation date', '17 Oct 2026', 98], ['Delivery date, line 1002', 'calendar week 46', 71]], on = s.fill ?? 4;
  rows.forEach((q, i) => { if (i >= on) return; const y = 452 + i * 58, hot = i === 3 && s.flag; o += (hot ? r(66, y - 2, 688, 54, K.ambS, 10) : '') + `<line x1="70" x2="750" y1="${y + 54}" y2="${y + 54}" stroke="${K.ln}"/>` + t(86, y + 32, q[0], 15, 500, K.mu) + t(300, y + 32, q[1], 16, 650, K.ink) + r(590, y + 24, 90, 8, K.ln, 4) + r(590, y + 24, 90 * q[2] / 100, 8, hot ? K.amb : K.teal, 4) + t(700, y + 33, q[2] + '%', 13, 650, hot ? K.amb : K.teal); });
  o += r(66, 716, 150, 46, K.sf, 12, K.ln) + t(141, 745, 'Edit fields', 14.5, 600, K.ink, 'middle') + r(530, 716, 224, 46, s.press ? '#000' : K.ink, 14) + t(642, 745, 'Confirm validation', 15, 650, '#fff', 'middle');
  o += r(800, 276, 440, 504, K.sf, 18, K.ln) + t(826, 320, 'Auftragsbestätigung.pdf', 14.5, 600, K.ink) + r(1074, 300, 144, 36, K.bg, 18) + r(1078, 304, 68, 28, K.sf, 14) + t(1112, 323, 'Original', 12.5, 600, K.ink, 'middle') + t(1182, 323, 'English', 12.5, 500, K.mu, 'middle') + r(826, 350, 388, 408, '#F8F9FB', 8, K.ln) + t(848, 388, 'HELIOS', 22, 700, '#E5701A') + t(940, 388, 'Components AG', 15, 500, K.mu) + t(848, 424, 'Auftragsbestätigung Nr. 1505899', 13.5, 600, K.ink);
  [0, 1, 2, 3, 4, 5].forEach(i => { o += bl(848, 452 + i * 30, i % 3 === 0 ? 150 : 300, '#C9D1DD', 8); });
  o += t(848, 640, 'Liefertermin Pos. 1002:  KW 46', 13.5, 600, K.ink) + t(848, 700, 'Gesamtwert  € 164.865,00', 14, 650, K.ink);
  if (s.scan != null) o += `<rect x="826" y="${350 + s.scan}" width="388" height="44" fill="${K.teal}" opacity=".18"/><rect x="826" y="${350 + s.scan}" width="388" height="3" fill="${K.teal}"/>`;
  if (s.hlpdf) o += r(838, 614, 360, 40, 'none', 8, K.amb, 3);
  if (s.dialog) o += r(0, 0, 1280, 800, '#1B2230', 0, null, 0, .4) + r(330, 220, 620, 340, K.sf, 22) + t(366, 280, 'Confirm the validation?', 26, 650, K.ink) + t(366, 322, 'The agent compares the confirmation with the purchase order and', 15.5, 500, K.mu) + t(366, 346, 'routes each difference to its owner: commercial ones to Adrian,', 15.5, 500, K.mu) + t(366, 370, 'quantity and delivery to Rajan.', 15.5, 500, K.mu) + r(366, 392, 548, 64, K.ambS, 12) + t(396, 430, 'You haven’t changed the delivery date the agent flagged. That’s fine if it’s right.', 14, 550, '#8A4B0F') + r(520, 484, 160, 52, K.sf, 14, K.ln) + t(600, 516, 'Keep checking', 15, 600, K.ink, 'middle') + r(696, 484, 218, 52, K.ink, 14) + t(805, 516, 'Confirm validation', 15, 650, '#fff', 'middle');
  if (s.toast) o += r(330, 84, 620, 46, K.ink, 23) + ck(362, 107, K.teal, 12) + t(388, 113, 'Validation confirmed. Differences sent to Adrian and Rajan.', 14.5, 550, '#fff');
  if (s.cursor) o += cur(...s.cursor, '#111', '#fff');
  return o;
}
function agenticFly() {
  return r(0, 0, 1280, 800, '#DCE3EA', 0) + r(390, 70, 500, 660, '#FFFFFF', 14) + t(430, 134, 'HELIOS', 34, 700, '#E5701A') + t(556, 134, 'Components AG', 20, 500, '#6B7587') + t(430, 184, 'Auftragsbestätigung Nr. 1505899', 19, 650, '#1B2230') + t(430, 214, 'Bestellung 4994546957', 15, 500, '#6B7587') + [0, 1, 2, 3, 4, 5, 6, 7].map(i => bl(430, 252 + i * 40, i % 3 === 0 ? 220 : 400, '#C9D1DD', 9)).join('') + t(430, 620, 'Liefertermin Pos. 1002:  KW 46', 16, 600, '#1B2230') + t(430, 690, 'Gesamtwert  € 164.865,00', 18, 700, '#1B2230') + r(930, 100, 290, 62, '#1B2230', 31) + ck(964, 131, '#0B9488', 12) + t(990, 137, 'Received 07:42 by email', 15, 600, '#fff');
}
function agenticSplit() {
  return agentic({ step: 3, flag: true }) + r(0, 0, 1280, 800, '#1B2230', 0, null, 0, .28) +
    r(210, 250, 400, 300, '#fff', 20, '#0B9488', 3) + ci(250, 300, 22, '#E7F4F2') + t(286, 296, 'Adrian', 22, 650, '#1B2230') + t(286, 322, 'Category buyer · commercial', 14, 500, '#6B7587') + r(240, 352, 340, 56, '#FFF3E0', 12) + t(260, 386, 'Price, terms and fees: +€22,065', 14.5, 600, '#8A4B0F') + r(240, 436, 200, 50, '#1B2230', 14) + t(340, 467, 'Review as Adrian', 14.5, 650, '#fff', 'middle') +
    r(670, 250, 400, 300, '#fff', 20, '#0B9488', 3) + ci(710, 300, 22, '#E7F4F2') + t(746, 296, 'Rajan', 22, 650, '#1B2230') + t(746, 322, 'Store executive · logistics', 14, 500, '#6B7587') + r(700, 352, 340, 56, '#FFF3E0', 12) + t(720, 386, 'Quantity and delivery date', 14.5, 600, '#8A4B0F') + r(700, 436, 200, 50, '#1B2230', 14) + t(800, 467, 'Review as Rajan', 14.5, 650, '#fff', 'middle');
}

/* ---------- 2. AI search (dark navy, blue-violet, serif headline; iSearch + connected apps) ---------- */
function search(s = {}) {
  const K = { bg: '#07080F', sf: '#0E1120', sf2: '#141830', ln: '#262C48', ink: '#EEF0F8', i2: '#A5ABC0', i3: '#6F768C', app: '#6C8BFF', vio: '#8B7CFF', pos: '#4ADE9A', neg: '#FF6B7A', warn: '#FFC15C' };
  const bar = s.results, bare = s.bare; let o = r(0, 0, 1280, 800, K.bg, 0) + `<circle cx="240" cy="90" r="380" fill="${K.app}" opacity=".14"/><circle cx="1070" cy="260" r="320" fill="${K.vio}" opacity=".12"/>`;
  const fx = bar ? 330 : 240, fy = bar ? 14 : bare ? 365 : 360, fw = bar ? 620 : 800, fh = bar ? 46 : 70;
  if (bar) o += r(0, 0, 1280, 74, '#0A0C18', 0) + r(40, 18, 34, 34, K.app, 11) + t(57, 41, 'iS', 14, 700, '#fff', 'middle') + t(90, 42, 'iSearch', 17, 600, K.ink) + ci(1240, 36, 16, '#2A3150');
  if (!bar && !bare) o += r(0, 0, 1280, 64, 'none', 0) + t(640, 218, 'Good morning, Alex', 88, 400, '#8FA5FF', 'middle', SERIF) + t(640, 276, 'What would you like to do today?', 22, 500, K.i2, 'middle');
  o += r(fx, fy, fw, fh, K.sf, bar ? 14 : 24, s.focus ? K.app : K.ln, s.focus ? 3.5 : 1.5) + (s.focus ? r(fx - 6, fy - 6, fw + 12, fh + 12, 'none', 28, K.app, 2, .35) : '') + (s.lit ? ci(fx + 40, fy + fh / 2, 20, K.app).replace('fill="' + K.app + '"', `fill="${K.app}" opacity=".22"`) : '') + sparkP(fx + 40, fy + fh / 2, s.lit ? '#9DB0FF' : K.i3, bar ? .85 : 1.1);
  o += s.typed ? t(fx + 76, fy + fh / 2 + 8, s.typed, bar ? 17 : 24, 500, K.ink) : (bar ? '' : t(fx + 76, fy + fh / 2 + 8, 'Search across all applications, try “Pending POs”', 20, 500, K.i3));
  if (!bar && !bare && !s.dd) { [['Pending POs', 250], ['Flight to Bangalore', 410], ['Draft goals for product design team', 640], ['SOWs expiring this month', 960]].forEach(([q, x], i) => { const w = q.length * 10 + 70; o += r(x - 22, 480, w, 40, K.sf, 20, K.ln) + r(x - 8, 490, 20, 20, K.app, 10) + t(x + 2, 505, 'iS', 8, 700, '#fff', 'middle') + t(x + 24, 506, q, 14.5, 500, K.i2); }); ['My Purchase Orders|12 active', 'Pending Invoices|3 need approval', 'Catalog|Browse products', 'Reports|Spend analytics'].forEach((c, i) => { const [a, b] = c.split('|'); o += r(130 + i * 280, 580, 256, 130, K.sf, 20, K.ln) + r(150 + i * 280, 600, 40, 40, K.sf2, 12) + t(150 + i * 280, 676, a, 17, 600, K.ink) + t(150 + i * 280, 698, b, 14, 500, K.i3); }); }
  if (s.dd) { o += r(fx, fy + fh + 12, fw, 330, K.sf, 22, K.ln) + t(fx + fw / 2, fy + fh + 44, s.ddHead, 12.5, 650, K.i3, 'middle'); s.ddItems.forEach((q, i) => { const y = fy + fh + 62 + i * 46; if (i === s.pick) o += r(fx + 10, y - 4, fw - 20, 42, '#1B2140', 12, K.ln); o += `<circle cx="${fx + 34}" cy="${y + 17}" r="6" fill="none" stroke="${K.i3}" stroke-width="2"/>` + t(fx + 56, y + 23, q, 17, 500, K.ink) + r(fx + fw - 116, y + 10, 18, 18, K.app, 9) + t(fx + fw - 107, y + 23, 'iS', 7, 700, '#fff', 'middle') + t(fx + fw - 90, y + 24, 'iSearch', 13, 500, K.i3); }); o += `<line x1="${fx}" x2="${fx + fw}" y1="${fy + fh + 300}" y2="${fy + fh + 300}" stroke="${K.ln}"/>` + t(fx + 28, fy + fh + 326, '↑↓ navigate     ↵ open     esc close', 13, 500, K.i3) + sparkP(fx + fw - 150, fy + fh + 320, K.app, .55) + t(fx + fw - 24, fy + fh + 326, 'Plain language works', 13, 600, K.app, 'end'); }
  if (bar) { o += r(120, 96, 1040, 290, K.sf, 26, K.vio, 2.5) + r(150, 124, 128, 34, K.vio, 17) + t(214, 147, 'AI overview', 14, 650, '#fff', 'middle') + t(298, 150, 'Pending purchase orders', 22, 650, K.ink);
    ['Searching iSearch', 'Ranking results', 'Writing the summary'].forEach((q, i) => { o += ((s.steps ?? 3) > i ? ck(168 + i * 230, 190, K.pos, 10, '#07080F') : ci(168 + i * 230, 190, 10, K.ln)) + t(188 + i * 230, 196, q, 13.5, 500, K.i3); });
    for (let i = 0; i < (s.lines ?? 3); i++) o += bl(150, 232 + i * 30, i === 2 ? 540 : 880, '#3A4266', 11, .9);
    o += r(120, 402, 480, 44, K.sf2, 14) + t(146, 430, 'All 14      Overdue 1      Awaiting approval 2', 14.5, 550, K.i2);
    const R3 = [['PO 4500012345  ·  ACME Office Supplies', 'Overdue', K.neg, 'Follow up'], ['PR 7800098765  ·  IT Equipment Request', 'Awaiting approval', K.warn, 'Approve'], ['Contract CNT-2026-001  ·  Facilities Mgmt', 'Active', K.pos, 'Open']];
    for (let i = 0; i < (s.rows ?? 3); i++) { const y = 464 + i * 108, h = s.hover === i; o += r(120, y, 1040, 96, K.sf, 18, h ? K.app : K.ln, h ? 3 : 1.5) + t(150, y + 42, R3[i][0], 19, 600, K.ink) + r(150, y + 56, 150, 26, R3[i][2], 13, null, 0, .16) + t(225, y + 74, R3[i][1], 13, 650, R3[i][2], 'middle') + r(988, y + 24, 144, 46, h ? K.app : K.sf2, 14, h ? null : K.ln) + t(1060, y + 54, R3[i][3], 15, 650, h ? '#fff' : K.ink, 'middle'); } }
  if (s.detail) o += r(0, 0, 1280, 800, '#02030A', 0, null, 0, .62) + r(700, 0, 580, 800, K.sf, 0, K.ln) + t(740, 70, 'PR 7800098765', 30, 650, K.ink) + t(740, 102, 'IT Equipment Request', 17, 500, K.i2) + r(740, 124, 160, 28, K.warn, 14, null, 0, .16) + t(820, 144, 'Awaiting approval', 13, 650, K.warn, 'middle') + (s.closeHot ? ci(1236, 60, 22, '#262C48') : ci(1236, 60, 20, '#1B2140')) + t(1236, 67, '✕', 18, 600, K.ink, 'middle') + [['Requester', 'Maria Keller'], ['Cost centre', 'Platform IT'], ['Items', '12 laptops, 12 docks'], ['Needed by', 'Next month']].map((q, i) => t(740, 220 + i * 54, q[0], 13.5, 500, K.i3) + t(740, 244 + i * 54, q[1], 17, 600, K.ink)).join('') + r(740, 470, 500, 150, K.sf2, 16, K.ln) + sparkP(768, 502, K.app, .7) + t(790, 508, 'iSearch summary', 14, 650, K.app) + bl(766, 536, 440, '#3A4266', 10) + bl(766, 562, 400, '#3A4266', 10) + bl(766, 588, 300, '#3A4266', 10) + r(740, 700, 240, 54, K.app, 16) + t(860, 734, 'Approve', 17, 650, '#fff', 'middle') + r(1000, 700, 240, 54, K.sf2, 16, K.ln) + t(1120, 734, 'Reject', 17, 650, K.ink, 'middle');
  if (s.cursor) o += cur(...s.cursor, '#fff', '#07080F');
  return o;
}

/* ---------- 3. Engaze (white, violet; Esha, Sr Dev Lead) ---------- */
function engaze(s = {}) {
  const K = { bg: '#F9F8FD', sf: '#FFFFFF', ink: '#1C1733', mu: '#7C7796', ln: '#E4DFF2', v: '#6A4BF4', v2: '#7B5CFF', vS: '#F0ECFF' };
  const orb = `<defs><radialGradient id="orb" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".45" stop-color="#A9B8FF"/><stop offset="1" stop-color="#8A5CFF"/></radialGradient><linearGradient id="vg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9A86FF"/><stop offset="1" stop-color="#6A4BF4"/></linearGradient></defs>`;
  let o = orb + r(0, 0, 1280, 800, K.bg, 0) + r(0, 0, 230, 800, K.sf, 0, K.ln, 1) + r(26, 34, 32, 32, K.v, 10) + t(72, 58, 'engaze', 23, 650, K.ink);
  ['Home', 'My pay', 'Time off', 'Benefits', 'Growth', 'Ask Engaze'].forEach((q, i) => { if (i === 0) o += r(14, 96, 202, 40, K.vS, 12); o += ci(36, 116 + i * 46, 4, i === 0 ? K.v : '#C9C2E3') + t(54, 122 + i * 46, q, 15.5, i === 0 ? 650 : 500, i === 0 ? K.v : K.mu); });
  o += r(14, 716, 202, 56, K.bg, 14, K.ln) + t(30, 740, 'SIGNED IN AS', 10.5, 650, K.mu) + t(30, 760, 'Esha · Sr Dev Lead', 14, 650, K.ink);
  if (!s.chat) {
    o += `<circle cx="740" cy="124" r="${s.orb ?? 46}" fill="url(#orb)"/>` + t(740, 262, 'Good morning, Esha.', 52, 650, K.ink, 'middle') + t(740, 304, 'Two things are worth a look today.', 18, 500, K.mu, 'middle');
    if (s.cards !== false) o += r(296, 338, 440, 176, K.sf, 22, K.ln) + r(322, 362, 36, 36, K.vS, 12) + t(322, 436, 'You could save about ₹24,000 in tax', 17, 650, K.ink) + t(322, 462, 'Old vs new regime, on your own numbers.', 14, 500, K.mu) + t(322, 496, 'Compare for me  →', 14.5, 650, K.v) + r(756, 338, 440, 176, K.sf, 22, K.ln) + r(782, 362, 36, 36, '#FFF3DE', 12) + t(782, 436, 'One earned leave day lapses on 31 Dec', 17, 650, K.ink) + t(782, 462, 'You have 11 of 18 earned days left.', 14, 500, K.mu) + t(782, 496, 'Show the rule  →', 14.5, 650, K.v);
    [['I’m down with a fever. Can I take today off?', 296, 560], ['Old or new tax regime: which is better for me?', 756, 560], ['Claim my Pune flight', 296, 612], ['Can I carry forward unused leave?', 756, 612]].forEach(([q, x, y], i) => { o += r(x, y, 440, 44, K.sf, 22, s.chip === i ? K.v : K.ln, s.chip === i ? 3 : 1.5) + t(x + 22, y + 28, q, 14.5, 500, K.ink); });
    o += r(296, 690, 900, 62, K.sf, 31, K.ln) + ci(334, 721, 15, 'url(#orb)') + t(364, 728, 'Ask about leave, pay, tax, claims or policies', 17, 500, K.mu);
  } else {
    o += r(660, 50, 536, 52, 'url(#vg)', 26) + t(688, 83, 'Old or new tax regime: which is better for me?', 15.5, 550, '#fff') + ci(330, 168, 17, 'url(#orb)');
    ['Read your payroll declarations for FY 2026-27', 'Ran both regimes on your numbers', 'Checked the switch deadline'].forEach((q, i) => { if (i < (s.steps ?? 3)) o += ck(372, 166 + i * 28, '#22A06B', 8) + t(390, 171 + i * 28, q, 13.5, 500, K.mu); });
    if (s.text) o += t(330, 292, 'The new regime saves you about ₹24,000 this year. Your 80C and HRA', 18, 500, K.ink) + t(330, 320, 'claims are low, so the deductions don’t make up for the higher rates.', 18, 500, K.ink);
    if (s.card) { const g = s.grow ?? 1, base = 576, H = 170; o += r(310, 348, 886, 288, K.sf, 24, K.ln) + r(342, base - H * .84 * g, 150, H * .84 * g, '#D8D0EE', 16) + r(512, base - H * g, 150, H * g, 'url(#vg)', 16) + r(534, base - H * g - 4, 106, 28, '#fff', 14) + t(587, base - H * g + 15, 'Best for you', 12, 700, K.v, 'middle') + t(342, base + 34, '₹1.42L', 24, 700, K.ink) + t(342, base + 56, 'Old regime', 13.5, 500, K.mu) + t(512, base + 34, '₹1.18L', 24, 700, K.ink) + t(512, base + 56, 'New regime', 13.5, 650, K.v) + `<line x1="700" x2="700" y1="372" y2="610" stroke="${K.ln}"/>` + t(730, 392, 'Based on', 14, 500, K.mu) + t(730, 426, '80C claims', 15.5, 500, K.ink) + t(1170, 426, '₹60,000', 15.5, 700, K.ink, 'end') + t(730, 462, 'HRA claimed', 15.5, 500, K.ink) + t(1170, 462, 'None', 15.5, 700, K.ink, 'end') + t(730, 498, 'Home loan interest', 15.5, 500, K.ink) + t(1170, 498, 'None', 15.5, 700, K.ink, 'end') + r(730, 522, 290, 30, K.vS, 15) + t(745, 543, 'Your declarations, FY 2026-27', 12.5, 550, K.v) + r(730, 562, 214, 30, K.vS, 15) + t(745, 583, 'Tax rules, FY 2026-27', 12.5, 550, K.v);
      o += r(342, 650, 280, 50, s.cta ? '#4F33D6' : K.v, 25) + (s.cta ? r(336, 644, 292, 62, 'none', 31, K.v, 2, .35) : '') + t(482, 682, 'Switch to the new regime', 15.5, 650, '#fff', 'middle') + r(640, 650, 220, 50, K.sf, 25, K.ln) + t(750, 682, 'See the full breakdown', 14.5, 600, K.ink, 'middle'); }
    o += r(296, 726, 900, 54, K.sf, 27, K.ln) + t(330, 759, 'Ask about leave, pay, tax, claims or policies', 16, 500, K.mu);
  }
  if (s.cursor) o += cur(...s.cursor, '#111', '#fff');
  return o;
}

/* ---------- master 4: Airline mobile check-in (dark green design system, same as the static cover) ---------- */
function travel(s = {}) {
  const px = 454, py = 20, pw = 372, ph = 760;
  const K = { bg: '#141617', sf: '#1E2122', sf2: '#272B2C', ln: '#2F3436', ink: '#F4F7F5', mu: '#8E9A96', g: '#22B573', g2: '#14804F', gs: '#163A2C', gt: '#4ADE9A' };
  const Tx = (x, y, str, z, w, f, a) => T(x, y, str, { z, w, f, a });
  const line = (x1, y1, x2, y2, c, sw = 2, d) => `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="${c}" stroke-width="${sw}" fill="none" stroke-linecap="round" ${d ? `stroke-dasharray="${d}"` : ''}/>`;
  const plane = (x, y, c) => `<path d="M${x - 9} ${y + 5} l7-5 l-9-14 l4-2 l13 11 l9-5 c3-1.5 5 .5 3 3 l-8 5 l-4 14 l-4 1 l1-11 z" fill="${c}" transform="rotate(90 ${x} ${y})"/>`;
  let o = `<defs><linearGradient id="bgG" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#0A6F6B"/><stop offset="1" stop-color="#19C46E"/></linearGradient><linearGradient id="gcard" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#1B8F47"/><stop offset="1" stop-color="#2DB866"/></linearGradient></defs><rect width="1280" height="800" fill="url(#bgG)"/>`;
  o += R(px - 12, py - 12, pw + 24, ph + 24, { f: '#1C1E20', rx: 66, s: '#3A3E40', sw: 2 }) + R(px, py, pw, ph, { f: K.bg, rx: 54 }) + R(px + 135, py + 12, 102, 28, { f: '#0A0B0B', rx: 14 });
  const scr = s.screen ?? 'home';
  const hdr = (l, r2) => Tx(px + 24, py + 100, '←', 18, 600, K.g) + (l ? Tx(px + 52, py + 100, l, 18, 600, K.ink) : '') + (r2 ? Tx(px + 348, py + 100, r2, 13, 500, K.g, 'end') : '');
  const n = s.ck ?? 0;
  if (scr === 'home') {
    o += Tx(px + 24, py + 100, 'Good morning', 14, 500, K.mu) + Tx(px + 24, py + 138, 'Hi, Ahmad.', 34, 600, K.ink) + R(px + 268, py + 76, 84, 30, { f: K.g, rx: 8 }) + Tx(px + 310, py + 96, 'Check-in', 12, 600, '#fff', 'middle');
    o += Tx(px + 24, py + 162, 'You have 47,500 Reward Miles', 13, 500, K.mu);
    o += R(px + 20, py + 184, 332, 52, { f: s.press ? K.gs : K.sf, rx: 14, s: s.press ? K.g : K.ln, sw: s.press ? 2 : 1.5 }) + Tx(px + 42, py + 216, 'Where to?', 15, 500, K.mu) + `<circle cx="${px + 322}" cy="${py + 208}" r="7" fill="none" stroke="${K.g}" stroke-width="2.2"/><path d="M${px + 327} ${py + 213} l6 6" stroke="${K.g}" stroke-width="2.2" stroke-linecap="round"/>`;
    o += Tx(px + 24, py + 272, 'Happening now', 14, 600, K.ink);
    o += R(px + 20, py + 288, 332, 214, { f: K.sf2, rx: 20, s: K.ln }) + R(px + 38, py + 304, 66, 26, { f: K.gs, rx: 8 }) + Tx(px + 71, py + 322, 'On time', 12, 600, K.gt, 'middle') + Tx(px + 334, py + 322, 'Boarding pass', 13, 600, K.g, 'end');
    o += Tx(px + 38, py + 372, 'RUH + DXB', 26, 600, K.ink) + Tx(px + 38, py + 398, 'Gate closes in 1h 05m', 13, 500, K.mu) + line(px + 38, py + 420, px + 334, py + 420, K.ln, 1.5);
    [['Terminal', '4'], ['Gate', '12A'], ['Departure', '22:45']].forEach(([a2, b2], i) => { const x = i === 2 ? px + 334 : px + 38 + i * 100, an = i === 2 ? 'end' : undefined; o += Tx(x, py + 446, a2, 12, 500, K.mu, an) + Tx(x, py + 474, b2, 18, 600, K.ink, an); });
    o += Tx(px + 24, py + 534, 'Special offers', 14, 600, K.ink) + R(px + 20, py + 548, 332, 120, { f: 'url(#gcard)', rx: 20 }) + R(px + 36, py + 564, 38, 22, { f: 'rgba(255,255,255,.22)', rx: 11 }) + Tx(px + 55, py + 580, 'New', 11, 600, '#fff', 'middle') + Tx(px + 36, py + 626, 'Weekend fares to Dubai', 18, 600, '#fff') + Tx(px + 36, py + 650, 'from SAR 299', 13, 500, 'rgba(255,255,255,.85)');
  } else if (scr === 'one') {
    o += hdr('', 'Add promo code') + Tx(px + 24, py + 168, 'Book a flight', 27, 600, K.ink);
    o += Tx(px + 24, py + 214, 'Round trip', 14, 600, K.ink) + Tx(px + 118, py + 214, 'One way', 14, 500, K.mu) + Tx(px + 196, py + 214, 'Multi city', 14, 500, K.mu) + R(px + 24, py + 226, 74, 3, { f: K.g, rx: 2 }) + R(px + 24, py + 229, 324, 1, { f: K.ln, rx: 0 });
    o += R(px + 20, py + 248, 160, 96, { f: K.sf, rx: 14, s: K.ln }) + R(px + 192, py + 248, 160, 96, { f: K.sf, rx: 14, s: K.ln }) + C(px + 186, py + 296, 16, K.sf2) + `<path d="M${px + 179} ${py + 296} h14 m-5 -5 l5 5 l-5 5" stroke="${K.g}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    o += Tx(px + 100, py + 274, 'From', 12, 500, K.mu, 'middle') + Tx(px + 100, py + 308, 'DXB', 26, 600, K.ink, 'middle') + Tx(px + 100, py + 330, 'Dubai', 12, 500, K.mu, 'middle') + Tx(px + 272, py + 274, 'To', 12, 500, K.mu, 'middle') + Tx(px + 272, py + 308, 'RUH', 26, 600, K.ink, 'middle') + Tx(px + 272, py + 330, 'Riyadh', 12, 500, K.mu, 'middle');
    const f2 = [['Travel dates', 'Tom, 24 Aug - Fri, 5 Sep', 'Select dates'], ['Passenger / Class', '1 Passenger, Economy', 'Select passengers']];
    f2.forEach(([l, v, ph2], i) => { const y = py + 364 + i * 84, on = n > i, act = n === i; o += R(px + 20, y, 332, 68, { f: K.sf, rx: 14, s: act ? K.g : K.ln, sw: act ? 2 : 1.5 }) + Tx(px + 40, y + 26, l, 12, 500, act || on ? K.gt : K.mu) + Tx(px + 40, y + 52, on ? v : ph2, 17, on ? 600 : 500, on ? K.ink : K.mu) + (on ? ck(px + 322, y + 34, K.g, 11) : ''); });
    o += R(px + 20, py + 678, 332, 56, { f: n > 1 ? K.g : K.sf2, rx: 14 }) + Tx(px + 186, py + 713, 'Search Flights', 17, 600, n > 1 ? '#fff' : K.mu, 'middle');
  } else {
    o += hdr('My trip', '') + ck(px + 40, py + 170, K.g, 14) + Tx(px + 66, py + 178, 'Trip to Dubai confirmed', 20, 600, K.ink);
    o += R(px + 20, py + 206, 332, 380, { f: 'url(#gcard)', rx: 26 }) + Tx(px + 40, py + 262, 'RUH', 32, 600, '#fff') + Tx(px + 332, py + 262, 'DXB', 32, 600, '#fff', 'end') + line(px + 128, py + 250, px + 244, py + 250, 'rgba(255,255,255,.6)', 2, '3 5') + plane(px + 186, py + 250, '#fff') + Tx(px + 40, py + 284, 'Riyadh', 12, 500, 'rgba(255,255,255,.75)') + Tx(px + 332, py + 284, 'Dubai', 12, 500, 'rgba(255,255,255,.75)', 'end');
    [['Seat', '14A'], ['Gate', '12A'], ['Departs', '22:45']].forEach(([a2, b2], i) => { const x = px + 40 + i * 104; o += Tx(x, py + 310, a2, 12, 500, 'rgba(255,255,255,.75)') + Tx(x, py + 334, b2, 20, 600, '#fff'); });
    o += R(px + 98, py + 350, 176, 176, { f: '#fff', rx: 16 });
    for (let a2 = 0; a2 < 9; a2++) for (let c2 = 0; c2 < 9; c2++) if ((a2 * 5 + c2 * 7 + (a2 * c2)) % 3 === 0 || (a2 < 3 && c2 < 3)) o += `<rect x="${px + 112 + c2 * 16}" y="${py + 364 + a2 * 16}" width="13" height="13" rx="2" fill="#0F2A1D"/>`;
    o += R(px + 20, py + 612, 332, 56, { f: s.wallet ? K.gs : K.sf, rx: 14, s: s.wallet ? K.g : K.ln, sw: s.wallet ? 3 : 1.5 }) + Tx(px + 186, py + 647, 'Add to Apple Wallet', 17, 600, s.wallet ? K.gt : K.ink, 'middle');
  }
  o += R(px + 136, py + ph - 14, 100, 5, { f: K.ink, rx: 3 });
  if (s.cursor) o += cur(...s.cursor, '#fff', '#0B1F18');
  return o;
}

/* ---------- 5. Data products marketplace (dark violet, magenta to violet, mint) ---------- */
function data(s = {}) {
  const K = { bg: '#120D22', sf: '#1B1434', sf2: '#241B45', ln: '#34295C', ink: '#F1ECFF', i2: '#B8B0D6', i3: '#8F86AD', pk: '#FF5C9D', vio: '#8B7CFF', mint: '#6DF0B0', mintS: '#123A2C', amb: '#FFC15C', ambS: '#3B2D12' };
  const grad = `<defs><linearGradient id="dg" x1="0" x2="1"><stop offset="0" stop-color="#FF5C9D"/><stop offset="1" stop-color="#8B7CFF"/></linearGradient></defs>`;
  let o = grad + r(0, 0, 1280, 800, K.bg, 0) + `<circle cx="1100" cy="80" r="360" fill="#8B7CFF" opacity=".14"/><circle cx="200" cy="760" r="300" fill="#FF5C9D" opacity=".10"/>` + r(0, 0, 236, 800, '#0F0A1E', 0) + r(22, 30, 28, 28, 'url(#dg)', 9) + t(62, 51, 'Data marketplace', 16, 650, K.ink);
  ['All products', 'Customer', 'Finance', 'Supply chain', 'Marketing', 'Product'].forEach((q, i) => { const on = (i === 0 && !s.dom) || (i === 1 && s.dom); if (on) o += r(14, 96 + i * 42, 208, 36, K.sf2, 10); o += t(30, 120 + i * 42, q, 15, on ? 650 : 500, on ? K.ink : K.i3); });
  o += t(22, 396, 'TRUST', 11, 700, K.i3) + r(22, 410, 38, 22, s.cert ? K.pk : K.ln, 11) + ci(s.cert ? 49 : 33, 421, 8, '#fff') + t(72, 427, 'Certified only', 14, 500, K.i2);
  o += t(276, 100, 'Find data you can trust', 38, 650, K.ink) + r(276, 126, 640, 54, K.sf, 16, s.typed ? K.pk : K.ln, s.typed ? 3 : 1.5) + (s.typed ? r(270, 120, 652, 66, 'none', 20, K.pk, 2, .3) : '') + t(318, 160, s.typed || 'Search data products, domains, owners', 18, 500, s.typed ? K.ink : K.i3);
  o += t(276, 224, (s.count ?? 6) + ' data products', 15, 650, K.i2) + (s.cert ? r(430, 206, 124, 28, K.sf2, 14, K.pk, 1.5) + t(492, 225, 'Certified  ✕', 12.5, 650, K.pk, 'middle') : '');
  const P = [['Customer 360', 'Customer · CRM Platform', 1, 1, 'Updated today'], ['Customer churn signals', 'Customer · Analytics CoE', 1, 1, 'Updated today'], ['Revenue by region', 'Finance · Finance Data', 0, 1, 'Updated daily'], ['Supplier master', 'Supply chain · Procurement', 0, 0, 'Updated weekly'], ['Marketing attribution', 'Marketing · Growth Data', 0, 0, 'Updated daily'], ['Product usage events', 'Product · Platform Data', 0, 1, 'Streaming']];
  P.forEach(([n, m, cu, ce, up], i) => { const x = 276 + (i % 3) * 330, y = 252 + Math.floor(i / 3) * 224, hit = (!s.typed || cu) && (!s.cert || ce); if (!hit) { o += r(x, y, 310, 200, K.sf, 20, K.ln, 1.5, .28); return; } const lift = s.hover === i; o += (lift ? r(x - 6, y - 6, 322, 212, 'none', 24, K.pk, 2, .35) : '') + r(x, y, 310, 200, K.sf, 20, lift ? K.pk : K.ln, lift ? 3 : 1.5) + r(x + 18, y + 18, 38, 38, K.sf2, 12) + (ce ? r(x + 190, y + 22, 102, 28, K.mintS, 14) + t(x + 241, y + 41, '✓ Certified', 12.5, 650, K.mint, 'middle') : r(x + 190, y + 22, 102, 28, K.ambS, 14) + t(x + 241, y + 41, 'In review', 12.5, 650, K.amb, 'middle')) + t(x + 18, y + 98, n, 19, 650, K.ink) + t(x + 18, y + 122, m, 13.5, 500, K.i3) + r(x + 18, y + 148, 274, 5, K.ln, 3) + r(x + 18, y + 148, ce ? 230 : 130, 5, 'url(#dg)', 3) + t(x + 18, y + 178, up, 13, 500, K.i3); });
  if (s.panel) { o += r(0, 0, 1280, 800, '#07040F', 0, null, 0, .55) + r(868, 18, 396, 764, '#17102E', 26, K.ln) + r(892, 44, 112, 28, K.mintS, 14) + t(948, 63, '✓ Certified', 12.5, 650, K.mint, 'middle') + t(892, 124, 'Customer 360', 30, 650, K.ink) + t(892, 154, 'Customer · owned by CRM Platform', 14, 500, K.i3);
    ['Owner verified', 'Quality checks passing', 'Lineage documented', 'Access policy applied'].forEach((q, i) => { const on = i < (s.chk ?? 0); o += (on ? ck(906, 212 + i * 46, K.mint, 11, '#0D2A1E') : ci(906, 212 + i * 46, 11, K.ln)) + t(932, 218 + i * 46, q, 16, 500, on ? K.ink : K.i3); });
    o += t(892, 430, 'LINEAGE', 11.5, 700, K.i3) + r(892, 446, 80, 36, K.sf2, 10) + t(932, 470, 'CRM', 13, 500, K.ink, 'middle') + r(1016, 446, 112, 36, K.sf2, 10) + t(1072, 470, 'Customer 360', 12.5, 500, K.ink, 'middle') + r(1170, 446, 84, 36, K.sf2, 10) + t(1212, 470, 'Dashboards', 12, 500, K.ink, 'middle'); const w = s.line ?? 0; o += `<line x1="972" x2="${972 + 44 * w}" y1="464" y2="464" stroke="url(#dg)" stroke-width="3"/><line x1="1128" x2="${1128 + 42 * w}" y1="464" y2="464" stroke="url(#dg)" stroke-width="3"/>`;
    o += s.done ? r(892, 700, 348, 54, K.mintS, 16, '#2E8A63', 1.5) + ck(1000, 727, K.mint, 10, '#0D2A1E') + t(1030, 733, 'Access requested', 17, 650, K.mint) : r(892, 700, 348, 54, 'url(#dg)', 16) + t(1066, 734, 'Request access', 17, 650, '#fff', 'middle'); }
  if (s.cursor) o += cur(...s.cursor, '#fff', '#120D22');
  return o;
}

/* ---------- 6. Self-serve networks: entry-point decision (monochrome, black nav; client-neutral) ---------- */
function options(s = {}) {
  const K = { bg: '#F2F2F0', sf: '#FFFFFF', ink: '#111111', mu: '#6E6E6E', ln: '#D8D8D4', bl: '#5B72E8', red: '#E0301E', ok: '#15803D' };
  let o = r(0, 0, 1280, 800, K.bg, 0) + r(0, 0, 1280, 40, '#000', 0) + t(40, 26, 'dNetWorX', 15, 700, '#fff') + ['Billing', 'Service', 'Orders', 'Repairs', 'Product Tools', 'Secure Messaging'].map((q, i) => t(430 + i * 110, 26, q, 12.5, 600, '#fff')).join('');
  o += t(64, 106, 'ENTRY POINTS  ·  DESIGN DECISION', 12.5, 700, K.mu) + t(64, 158, 'Where should the network functions live?', 42, 650, K.ink);
  [['Easy to find', 0, 130], ['Not annoying for experts', 150, 232], ['Consistent with existing patterns', 396, 300]].forEach(([q, dx, w]) => { o += r(64 + dx, 180, w, 34, 'none', 17, K.ink, 1.5) + ci(82 + dx, 197, 5, K.ink) + t(96 + dx, 203, q, 14, 550, K.ink); });
  const names = ['Sticky button on the right edge', 'Product tools in a bento menu', 'Functions in the welcome banner', 'Network tools banner', 'Recommendations below the banner', 'Floating “i” info button'];
  const why = ['Not consistent with the existing pattern', 'May conflict with the global navigation', 'Technical constraints', 'Steeper learning curve', 'Needs behavioural analytics', 'A new pattern; placement issue'];
  const sketch = (i, x, y) => { let z = r(x + 16, y + 16, 336, 128, '#fff', 10, K.ln) + r(x + 16, y + 16, 336, 18, '#000', 10) + r(x + 16, y + 26, 336, 8, '#000', 0) + r(x + 30, y + 46, 150, 14, '#222', 4, null, 0, .9) + bl(x + 30, y + 70, 200, '#C9C9C4', 8) + bl(x + 30, y + 88, 160, '#C9C9C4', 8) + r(x + 30, y + 108, 94, 24, '#EDEDEA', 4);
    if (i === 0) z += r(x + 338, y + 66, 14, 56, K.bl, 5); if (i === 1) z += r(x + 262, y + 22, 78, 76, '#fff', 6, K.bl, 2) + [0, 1, 2].map(a => [0, 1, 2].map(b => ci(x + 280 + a * 22, y + 40 + b * 22, 5, K.bl)).join('')).join(''); if (i === 2) z += r(x + 30, y + 44, 306, 34, '#E4E9FD', 6, K.bl, 1.5); if (i === 3) z += r(x + 196, y + 62, 140, 70, '#E4E9FD', 6, K.bl, 1.5); if (i === 4) z += r(x + 30, y + 104, 306, 30, '#E4E9FD', 6, K.bl, 1.5); if (i === 5) z += ci(x + 330, y + 124, 12, K.bl) + t(x + 330, y + 129, 'i', 14, 700, '#fff', 'middle'); return z; };
  names.forEach((n, i) => { if (s.shown !== undefined && i >= s.shown) return; const x = 64 + (i % 3) * 388, y = 246 + Math.floor(i / 3) * 270, rej = s.rej !== undefined && i < s.rej, act = s.act === i; o += `<g opacity="${s.dim ? .2 : 1}">` + r(x, y, 368, 250, K.sf, 20, act ? K.ink : K.ln, act ? 3.5 : 1.5) + sketch(i, x, y) + t(x + 20, y + 186, n, 17, 650, K.ink) + (rej || act ? t(x + 20, y + 218, why[i], 14, 500, K.mu) : '') + (rej ? xx(x + 336, y + 34, K.red) : '') + '</g>'; });
  if (s.win) o += r(260, 190, 760, 480, K.sf, 26, K.ink, 4) + r(288, 218, 704, 250, '#000', 12) + t(312, 248, 'dNetWorX', 14, 700, '#fff') + ['Billing', 'Service', 'Orders', 'Repairs', 'Product Tools', 'Secure Messaging'].map((q, i) => t(520 + i * 76 - (i > 3 ? 0 : 0), 248, i === 4 ? q : q.slice(0, 7), 10, i === 4 ? 700 : 500, '#fff')).join('') + t(312, 296, 'Product Tools', 12, 600, '#B9B9B9') + t(312, 324, 'Business Application  ›', 12.5, 650, '#fff') + t(312, 352, 'Product Reporting  ›', 12.5, 500, '#B9B9B9') + t(520, 296, 'Business Application', 12, 600, '#B9B9B9') + t(520, 324, 'Dynamic Network Manager  ›', 12.5, 650, '#fff') + t(520, 352, 'Hosted IVR Feature Manager  ›', 12.5, 500, '#B9B9B9') + t(780, 296, 'Dynamic Network Manager', 12, 600, '#B9B9B9') + t(780, 324, 'Service Activation', 12.5, 650, '#fff') + t(780, 352, 'View bandwidth utilization', 12.5, 500, '#B9B9B9') + t(780, 380, 'DNM Orders', 12.5, 500, '#B9B9B9') + r(780, 404, 190, 32, 'none', 3, '#fff', 1) + t(875, 425, 'Action required for 8 pending activations', 8.5, 500, '#fff', 'middle') + ci(960, 214, 40, K.bl) + t(960, 210, 'Mega Menu', 12, 650, '#fff', 'middle') + t(960, 226, 'showing DNM', 12, 650, '#fff', 'middle') + t(288, 522, 'Redesigned global navigation, with “What’s New”', 24, 650, K.ink) + (s.ok ? ck(300, 566, K.ok, 12) + t(324, 573, 'Approved · no learning curve for existing users', 17, 650, K.ok) : '') + (s.chips ? r(288, 596, 190, 36, '#DCFCE7', 18) + t(383, 620, 'Global nav: approved', 13, 650, K.ok, 'middle') + r(492, 596, 250, 36, '#FEF3C7', 18) + t(617, 620, '“What’s New”: to be reviewed', 13, 650, '#92400E', 'middle') : '');
  return o;
}


export { agentic, agenticFly, agenticSplit, search, engaze, travel, data, options }
export { r, t, bl, ci, ck, xx, cur, sparkP }
