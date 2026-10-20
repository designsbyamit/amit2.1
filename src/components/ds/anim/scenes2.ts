// @ts-nocheck
// Second set of scenes: the agentic read-and-resolve flow, the Engaze chat widget, and the network-manager walkthrough.
import { r, t, bl, ci, ck, xx, sparkP } from './scenes'
const wrapL = (q, n) => { const out = []; let cur = ''; q.split(' ').forEach(w => { if ((cur + ' ' + w).trim().length > n) { out.push(cur); cur = w } else cur = (cur + ' ' + w).trim() }); out.push(cur); return out }
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v))

/* ---------- Agentic: the agent reads the PDF (scan beam, found fields, confidence bars) ---------- */
export function agRead(s = {}) {
  const K = { bg: '#F3F5F8', sf: '#FFFFFF', ink: '#1B2230', mu: '#6B7587', ln: '#DDE3EC', teal: '#0B9488', tealS: '#E7F4F2', amb: '#D9650F', ambS: '#FFF3E0' };
  const scan = s.scan ?? 0, found = s.found ?? 0, bars = s.bars ?? 0;
  let o = r(0, 0, 1280, 800, K.bg, 0) + r(60, 40, 520, 720, '#FFFFFF', 18, K.ln) + t(96, 104, 'HELIOS', 30, 700, '#E5701A') + t(206, 104, 'Components AG', 18, 500, K.mu) + t(96, 148, 'Auftragsbestätigung Nr. 1505899', 17, 650, K.ink) + t(96, 176, 'Ihre Bestellung 4994546957', 15, 500, K.mu);
  const F = [['Datum 17.10.2026', 212], ['Gesamtbetrag 164.865,00 €', 262], ['45 Tage netto', 312], ['Verpackungspauschale 65,00 €', 362], ['Steuerungsmodul Rev. B   2.500 Stk   25,04 €', 452], ['Sensorgehäuse   2.000 Stk   51,10 €', 502], ['Liefertermin KW 46', 600]];
  F.forEach(([q, y], i) => { o += t(96, y, q, 16, 550, K.ink); if (i < found) o += r(86, y - 24, q.length * 8.6 + 22, 36, 'none', 8, i === 6 ? K.amb : K.teal, 3); });
  [0, 1, 2, 3, 4].forEach(i => { o += bl(96, 650 + i * 18, i % 2 ? 260 : 380, '#D3DAE5', 8); });
  if (s.scan != null) o += `<rect x="60" y="${40 + scan}" width="520" height="70" fill="${K.teal}" opacity=".16"/><rect x="60" y="${40 + scan + 66}" width="520" height="4" fill="${K.teal}"/>`;
  o += r(620, 40, 600, 720, K.sf, 18, K.ln) + t(656, 96, 'Extraction', 26, 650, K.ink) + t(1190, 94, s.done ? 'Read' : 'Reading…', 15, 650, s.done ? K.teal : K.mu, 'end') + r(656, 114, 528, 8, K.ln, 4) + r(656, 114, 528 * clamp(bars), 8, K.teal, 4);
  const R7 = [['Supplier', 'Helios Components AG', 99], ['Purchase order', '4994546957', 99], ['Confirmation date', '17 Oct 2026', 98], ['Total (net)', '€164,865.00', 97], ['Payment terms', 'Net 45 days', 99], ['Quantity, line 1002', '2,000 pcs', 98], ['Delivery date, line 1002', '13 Nov 2026', 71]];
  R7.forEach((q, i) => { const y = 156 + i * 84, f = clamp(bars * 8 - i), hot = i === 6; o += `<line x1="656" x2="1184" y1="${y + 74}" y2="${y + 74}" stroke="${K.ln}"/>` + t(656, y + 26, q[0], 14.5, 500, K.mu) + (f > .25 ? t(656, y + 54, q[1], 19, 650, K.ink) : bl(656, y + 42, 200, K.ln, 12)) + r(1010, y + 38, 120, 9, K.ln, 5) + r(1010, y + 38, 120 * f * q[2] / 100, 9, hot ? K.amb : K.teal, 5) + (f >= 1 ? t(1184, y + 48, q[2] + '%', 14.5, 700, hot ? K.amb : K.teal, 'end') : ''); });
  return o;
}

/* ---------- Agentic: the discrepancy table with Accept / Reject dropdowns ---------- */
export function agTable(s = {}) {
  const K = { bg: '#F3F5F8', sf: '#FFFFFF', ink: '#1B2230', mu: '#6B7587', ln: '#DDE3EC', teal: '#0B9488', tealS: '#E7F4F2', amb: '#D9650F', ambS: '#FFF3E0', bad: '#A92A2F', badS: '#FBE7E8', ind: '#4C3FC4', indS: '#E9E7FB' };
  const st = s.step ?? 2, names = ['Received', 'Read', 'Validated', 'Decided', 'Replied', 'Revised', 'Confirmed'];
  let o = r(0, 0, 1280, 800, K.bg, 0) + r(0, 0, 1280, 54, K.sf, 0) + r(40, 15, 26, 24, K.ink, 7) + t(78, 34, 'Order confirmations', 17, 600, K.ink) + ci(1230, 27, 14, '#C9D1DD');
  o += r(40, 70, 1200, 150, K.sf, 18, K.ln) + t(70, 112, 'Order confirmation 1505899', 26, 650, K.ink) + t(70, 138, 'Purchase order 4994546957   ·   Helios Components AG   ·   Value €164,865.00', 14.5, 500, K.mu);
  names.forEach((n, i) => { const x = 120 + i * 156; if (i < 6) o += r(x, 183, 156, 3, i < st ? K.ink : K.ln, 0); o += i < st ? ck(x, 185, K.ink, 11) : (i === st ? ci(x, 185, 13, K.indS) + ci(x, 185, 6, K.ind) : ci(x, 185, 10, K.ln)); o += t(x, 212, n, 12.5, i <= st ? 600 : 500, i <= st ? K.ink : K.mu, 'middle'); });
  o += r(40, 236, 1200, 470, K.sf, 18, K.ln) + t(70, 280, 'Differences', 21, 650, K.ink) + t(1210, 280, '6 differences · 3 high severity', 14, 500, K.mu, 'end');
  const X = { f: 70, po: 258, oc: 398, d: 528, sv: 668, why: 764, res: 1040 };
  o += `<line x1="56" x2="1224" y1="304" y2="304" stroke="${K.ln}"/>` + [['Field', X.f], ['PO value', X.po], ['Confirmation', X.oc], ['Delta', X.d], ['Severity', X.sv], ['AI reasoning', X.why], ['Resolution', X.res]].map(([q, x]) => t(x, 330, q, 13, 650, K.mu)).join('');
  const D = [['Total value', '€142,800', '€164,865', '+€22,065 (15.4%)', 'High', 'Unit price on line 1001 rose', 'from €15.83 to €25.04.'], ['Payment terms', 'Net 30', 'Net 45', '+15 days', 'High', 'Translated from “45 Tage netto”.', 'Over 30 days needs Finance.'], ['Packaging fee', 'None', '€65.00', 'New cost', 'Med', 'A flat fee, under your €100', 'tolerance for added costs.'], ['Quantity, line 1002', '2,500', '2,000', '−500 units', 'Med', 'Supplier confirms 2,000 of', 'the 2,500 ordered.'], ['Delivery date, 1002', '6 Nov 2026', '13 Nov 2026', '+7 days', 'High', 'Read from “KW 46”. It misses', 'the 10 Nov promotion.'], ['Description, 1001', 'Microcontroller…', 'Steuerungsmodul…', 'Wording only', 'Low', 'Same part number, named', 'in German.']];
  const res = s.res ?? [];
  D.forEach((q, i) => {
    const y = 344 + i * 56, sv = q[4], sc = sv === 'High' ? [K.badS, K.bad] : sv === 'Med' ? [K.ambS, K.amb] : [K.tealS, K.teal];
    o += (i % 2 ? '' : r(48, y - 6, 1184, 56, '#FAFBFD', 0)) + t(X.f, y + 26, q[0], 15, 650, K.ink) + t(X.po, y + 26, q[1], 14.5, 500, K.ink) + t(X.oc, y + 26, q[2], 14.5, 500, K.ink) + t(X.d, y + 26, q[3], 14.5, 650, K.ink) + r(X.sv, y + 8, 64, 26, sc[0], 13) + t(X.sv + 32, y + 26, sv, 12.5, 700, sc[1], 'middle') + t(X.why, y + 20, q[5], 12.5, 500, K.mu) + t(X.why, y + 38, q[6], 12.5, 500, K.mu);
    const v = res[i], hot = s.hot === i || s.open === i;
    o += r(X.res, y + 4, 170, 38, K.sf, 8, hot ? K.teal : '#B9C2D0', hot ? 2.5 : 1.5) + t(X.res + 16, y + 29, v ? (v === 'accept' ? 'Accept' : 'Reject') : 'Select', 14.5, v ? 650 : 500, v === 'accept' ? K.teal : v === 'reject' ? K.bad : K.mu) + `<path d="M${X.res + 142} ${y + 20} l6 6 l6-6" stroke="${K.ink}" stroke-width="2" fill="none" stroke-linecap="round"/>`;
  });
  if (s.open != null) { const y = 344 + s.open * 56 + 46; o += r(X.res, y, 170, 92, K.sf, 10, '#B9C2D0', 1.5) + (s.hl === 'accept' ? r(X.res + 4, y + 4, 162, 40, K.tealS, 8) : '') + (s.hl === 'reject' ? r(X.res + 4, y + 46, 162, 40, K.badS, 8) : '') + t(X.res + 16, y + 30, 'Accept', 14.5, 650, K.teal) + t(X.res + 16, y + 72, 'Reject', 14.5, 650, K.bad); }
  const all = res.filter(Boolean).length === 6;
  o += r(40, 718, 1200, 62, K.sf, 16, K.ln) + (all ? ck(76, 749, K.teal, 12) + t(100, 755, 'All six resolved. Drafted replies are ready.', 15.5, 600, K.ink) : t(70, 755, res.filter(Boolean).length + ' of 6 resolved', 15.5, 550, K.mu)) + r(1060, 728, 160, 42, all ? (s.press ? '#000' : K.ink) : '#C9D1DD', 12) + t(1140, 755, 'Send replies', 15, 650, '#fff', 'middle');
  if (s.toast) o += r(330, 84, 620, 46, K.ink, 23) + ck(362, 107, K.teal, 12) + t(388, 113, 'Replies sent. Waiting for Helios to revise.', 14.5, 550, '#fff');
  return o;
}

/* ---------- Engaze: the chat widget (lavender, task-prompt cards that scroll sideways) ---------- */
export function engaze(s = {}) {
  const wx = 450, wy = 20, W = 380, H = 760, C = { navy: '#1E2A78', ind: '#5B5BD6', ink: '#1C1D2E', mu: '#8B8CA6', ln: '#DAD7F2' };
  const defs = `<defs><linearGradient id="eg-h" x1="0" x2="1"><stop offset="0" stop-color="#CBC4F4"/><stop offset="1" stop-color="#E4E0FB"/></linearGradient><linearGradient id="eg-b" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#DDD8F8"/><stop offset=".6" stop-color="#E6E1FA"/><stop offset="1" stop-color="#F1DDF1"/></linearGradient><linearGradient id="eg-bot" x1="0" x2="1"><stop offset="0" stop-color="#D4D9F7"/><stop offset="1" stop-color="#C7CEF3"/></linearGradient><linearGradient id="eg-c1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E1E6FF"/><stop offset="1" stop-color="#97A5DE"/></linearGradient><clipPath id="eg-clip"><rect x="${wx}" y="${wy + 76}" width="${W}" height="${H - 76 - 84}"/></clipPath><clipPath id="eg-win"><rect x="${wx}" y="${wy}" width="${W}" height="${H}" rx="38"/></clipPath><filter id="eg-sh" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="0" dy="24" stdDeviation="22" flood-color="#4B3FA0" flood-opacity=".28"/></filter></defs>`;
  const logo = (x, y, k = 1) => `<g transform="translate(${x} ${y}) scale(${k})" fill="none" stroke="${C.navy}" stroke-width="3.4" stroke-linecap="round" stroke-linejoin="round"><path d="M0-17 l15 8.5 v17 l-15 8.5 l-15-8.5 v-17z"/><path d="M-8-9 l16 -4 M-12 0 l22 -6 M-12 6 l22 -2 M-8 12 l16 -2"/></g>`;
  const av = (x, y) => ci(x, y, 17, '#C9C4F2') + logo(x, y, .5);
  const icons = (x, y) => [0, 1, 2, 3].map(i => `<rect x="${x + i * 36}" y="${y - 8}" width="16" height="16" rx="4" fill="none" stroke="${C.ind}" stroke-width="2"/>`).join('');
  let o = defs + `<rect width="1280" height="800" fill="url(#eg-bg)"/>`.replace('url(#eg-bg)', '#D9D3F3') + `<circle cx="260" cy="120" r="380" fill="#B8AEF0" opacity=".35"/><circle cx="1060" cy="700" r="360" fill="#F0C9EA" opacity=".4"/>`;
  o += `<g filter="url(#eg-sh)"><rect x="${wx}" y="${wy}" width="${W}" height="${H}" rx="38" fill="#fff"/></g><g clip-path="url(#eg-win)"><rect x="${wx}" y="${wy}" width="${W}" height="${H}" fill="url(#eg-b)"/>`;
  /* scrollable content */
  const chat = s.n > 0; let cy = wy + 96 - (s.off ?? 0), body = '';
  if (!chat) {
    const sc = s.scroll ?? 0, cards = [['Raise a reimbursement for my travel bills.', 0], ['Show my tasks for the day, and plan my to-dos.', 1], ['What’s my leave balance? Plan for a trip?', 2], ['Help me draft an email to my team.', 3]];
    cards.forEach(([q, k], i) => { const x = wx + 28 - sc + i * 172, y = cy; const ill = k === 0 ? r(x + 34, y + 120, 82, 70, '#F2F0FF', 8) + ci(x + 76, y + 110, 24, '#E8D4C8') + r(x + 42, y + 138, 66, 60, '#EFEAFB', 14) + `<circle cx="${x + 120}" cy="${y + 52}" r="18" fill="#fff"/>` + t(x + 120, y + 62, '!', 26, 800, '#7B5CFF', 'middle') : k === 1 ? r(x + 62, y + 70, 72, 54, '#fff', 6, '#2A2570', 3) + `<rect x="${x + 62}" y="${y + 70}" width="72" height="14" rx="5" fill="#2A2570"/>` + ci(x + 50, y + 118, 18, '#EAD7C8') + r(x + 24, y + 134, 62, 70, '#E0D2F5', 22) : k === 2 ? `<path d="M${x + 20} ${y + 70} l62 -6 l30 -22 l8 4 l-18 24 l34 2 l-4 8 l-46 4 l-24 22 l-8 -3 l10 -20 l-30 -2z" fill="#fff"/>` + r(x + 0, y + 150, 160, 40, '#EEF0FF', 20, null, 0, .8) : r(x + 40, y + 90, 80, 90, '#fff', 10) + bl(x + 54, y + 112, 52, '#C8CCEC', 8) + bl(x + 54, y + 132, 40, '#C8CCEC', 8) + bl(x + 54, y + 152, 50, '#C8CCEC', 8);
      body += r(x, y, 160, 264, '#F5F6FA', 34) + `<rect x="${x}" y="${y}" width="160" height="180" rx="34" fill="url(#eg-c1)"/><rect x="${x}" y="${y + 120}" width="160" height="60" fill="url(#eg-c1)"/>` + ill + r(x, y + 180, 160, 84, '#F5F6FA', 0) + r(x, y + 224, 160, 40, '#F5F6FA', 34) + wrapL(q, 17).map((ln, j) => t(x + 18, y + 206 + j * 20, ln, 14, 650, C.ink)).join(''); });
    body += t(wx + W / 2, cy + 306, 'Responses generated by AI, never share sensitive', 11.5, 500, C.mu, 'middle') + t(wx + W / 2, cy + 324, 'information, read privacy for more.', 11.5, 500, C.mu, 'middle');
    body += r(wx + 26, cy + 346, 330, 134, 'url(#eg-bot)', 28) + t(wx + 46, cy + 388, 'Hi! 👋 I’m Engaze, your workplace bestie!', 14.5, 500, C.ink) + t(wx + 46, cy + 412, 'Feel free to ask me anything, and also get', 14.5, 500, C.ink) + t(wx + 46, cy + 434, 'things done.', 14.5, 500, C.ink) + t(wx + 336, cy + 466, '12:00 pm', 12, 500, C.mu, 'end') + av(wx + 42, cy + 510) + icons(wx + 214, cy + 510);
  } else {
    let y = wy + 96 - (s.off ?? 0);
    const user = (q) => { const h = 58; body += r(wx + 26, y, 330, h, '#EAF3FF', 26) + t(wx + 46, y + 35, q, 14.5, 500, C.ink) + ci(wx + 340, y + h + 22, 16, '#B88F78') + ci(wx + 340, y + h + 17, 6, '#6B4A3A'); y += h + 52; };
    const dots = () => { body += r(wx + 26, y, 74, 50, 'url(#eg-bot)', 24) + ci(wx + 48, y + 25, 4, C.ind) + ci(wx + 63, y + 25, 4, C.ind) + ci(wx + 78, y + 25, 4, C.ind) + av(wx + 42, y + 74); y += 100; };
    const botH = (lines, extra, minimal) => { const h = 36 + lines.length * 24 + extra + 34; body += r(wx + 26, y, 330, h, 'url(#eg-bot)', 28) + lines.map((q, i) => t(wx + 46, y + 38 + i * 24, q, 14.5, 500, C.ink)).join(''); return [y + 38 + lines.length * 24 - 6, h]; };
    const botEnd = (yy, h) => { body += t(wx + 336, yy + h - 14, '12:10 pm', 12, 500, C.mu, 'end') + av(wx + 42, yy + h + 24) + icons(wx + 214, yy + h + 24); y = yy + h + 70; };
    const n = s.n;
    if (n >= 1) user('What’s my leave balance?');
    if (n === 2) dots();
    if (n >= 3) {
      const y0 = y, [by, h] = botH(['Here’s your leave balance, Esha.'], 192);
      body += r(wx + 42, by + 10, 298, 176, '#fff', 20) + [['Sick leave', s.sick ?? 5, 12], ['Casual leave', 4, 10], ['Earned leave', 11, 18]].map((q, i) => t(wx + 62, by + 44 + i * 54, q[0], 14, 500, C.mu) + t(wx + 320, by + 44 + i * 54, q[1] + ' of ' + q[2] + ' left', 14, 650, C.ink, 'end') + r(wx + 62, by + 54 + i * 54, 258, 8, '#E4E1F8', 4) + r(wx + 62, by + 54 + i * 54, 258 * q[1] / q[2] * clamp(s.grow ?? 1), 8, C.ind, 4)).join('');
      botEnd(y0, h);
    }
    if (n >= 4) user('Can you apply sick leave for today?');
    if (n === 5) dots();
    if (n >= 6) {
      const y0 = y, [by, h] = botH(['Sure. Here’s the email to your', 'team. Send it and I’ll apply the leave.'], 214);
      body += r(wx + 42, by + 8, 298, 142, '#fff', 20) + ['Team,', 'I’ll be on sick leave today. Urgent', 'tasks are covered and I’ll reply to', 'anything pressing.', 'Best, Esha'].map((q, i) => t(wx + 60, by + 34 + i * 22, q, 13, 500, C.ink)).join('') + (n >= 7 ? r(wx + 42, by + 162, 298, 38, '#DDF3E8', 19) + ck(wx + 66, by + 181, '#22A06B', 9) + t(wx + 84, by + 186, 'Sent to Manoj and the Platform team', 12.5, 650, '#15744D') : r(wx + 42, by + 164, 104, 40, s.sendHot ? '#4646B8' : C.ind, 20) + t(wx + 94, by + 190, 'Send', 14.5, 650, '#fff', 'middle') + r(wx + 158, by + 164, 104, 40, '#fff', 20, C.ind, 1.5) + t(wx + 210, by + 190, 'Discard', 14.5, 600, C.ind, 'middle'));
      botEnd(y0, h);
    }
    if (n >= 8) { const y0 = y, [by, h] = botH(['Done. Sick leave is applied for today.', 'Want me to set an out-of-office in', 'Outlook too?'], 56); body += r(wx + 42, by + 6, 150, 42, s.yesHot ? '#4646B8' : C.ind, 21) + t(wx + 117, by + 33, 'Yes, set it up', 14, 650, '#fff', 'middle') + r(wx + 204, by + 6, 118, 42, '#fff', 21, C.ind, 1.5) + t(wx + 263, by + 33, 'No thanks', 14, 600, C.ind, 'middle'); botEnd(y0, h); }
  }
  o += `<g clip-path="url(#eg-clip)">${body}</g>`;
  /* header + composer (sit above the scrolling content) */
  o += `<rect x="${wx}" y="${wy}" width="${W}" height="76" fill="url(#eg-h)"/>` + logo(wx + 50, wy + 38, 1.1) + t(wx + 82, wy + 46, 'Engaze', 22, 700, C.navy) + ci(wx + W - 44, wy + 38, 19, '#E8E5FB') + [0, 1, 2].map(i => ci(wx + W - 44, wy + 29 + i * 9, 2.6, C.ind)).join('');
  o += `<rect x="${wx}" y="${wy + H - 84}" width="${W}" height="84" fill="#fff"/><line x1="${wx}" x2="${wx + W}" y1="${wy + H - 84}" y2="${wy + H - 84}" stroke="${C.ln}"/>` + t(wx + 28, wy + H - 36, s.typed ? s.typed + (s.caret ? '|' : '') : 'Ask me anything', 16.5, 500, s.typed ? C.ink : '#B7B7CC') + `<rect x="${wx + 258}" y="${wy + H - 52}" width="14" height="24" rx="6" fill="none" stroke="${C.ind}" stroke-width="2.2"/><rect x="${wx + 298}" y="${wy + H - 54}" width="12" height="20" rx="6" fill="none" stroke="${C.ind}" stroke-width="2.2"/><path d="M${wx + 334} ${wy + H - 52} l26 12 l-26 12 l6 -12z" fill="none" stroke="${s.typed ? C.ind : '#C5C5D8'}" stroke-width="2.2" stroke-linejoin="round"/></g>`;
  return o;
}

/* ---------- Network manager walkthrough (black header, white workspace) ---------- */
const smooth = (pts) => pts.map((p, i) => i ? `L${p[0].toFixed(1)} ${p[1].toFixed(1)}` : `M${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' ');
const wave = (seed, amp, base) => Array.from({ length: 62 }, (_, i) => { const x = i / 61; const v = Math.abs(Math.sin(x * 11 + seed) * .55 + Math.sin(x * 23 + seed * 2.1) * .3 + Math.sin(x * 5 + seed) * .35); return [x, base + amp * v]; });
export function dnm(s = {}) {
  const K = { ink: '#111', mu: '#6E6E6E', ln: '#E2E2E2', red: '#D52B1E', amb: '#E8890C', ok: '#2E9E4F', bg: '#fff', or: '#F07A0F', bl: '#1B79C8' };
  const view = s.view ?? 'dash';
  let o = r(0, 0, 1280, 800, K.bg, 0);
  /* header */
  o += r(0, 0, 1280, 30, '#000', 0) + t(40, 20, 'Wireless', 11, 500, '#fff') + t(110, 20, 'Wired', 11, 700, '#fff') + t(1000, 20, 'Support    |    Stores    |    Great Britain - EN', 11, 500, '#fff') + r(0, 30, 1280, 64, '#000', 0) + t(40, 72, 'dNetWorX', 22, 700, '#fff') + [['Billing', 400], ['Service', 478], ['Orders', 556], ['Repairs', 626], ['Product Tools', 706], ['Secure Messaging', 836]].map(([q, x]) => t(x, 68, q, 14, 650, '#fff')).join('') + (s.menu ? r(704, 86, 100, 3, '#fff', 0) : '') + ci(1180, 62, 9, '#fff') + ci(1214, 62, 9, '#fff') + ci(1246, 62, 9, '#fff');
  o += r(0, 94, 1280, 50, '#fff', 0) + `<line x1="0" x2="1280" y1="144" y2="144" stroke="${K.ln}"/>` + t(40, 125, 'Dynamic Network Manager', 15, 700, K.ink);
  [['Dashboard', 360, 'dash'], ['Network Products', 474, 'circuit'], ['DNM Orders', 640, ''], ['Reports', 748, ''], ['Help & Support', 830, '']].forEach(([q, x, v]) => { const on = v && (view === v || (view === 'bw' && v === 'circuit')); o += t(x, 125, q, 13.5, on ? 650 : 500, on ? K.ink : K.mu) + (on ? r(x, 138, q.length * 7.6, 3, K.red, 0) : ''); });
  if (view === 'dash') {
    o += t(40, 214, 'Service Activation', 32, 700, K.ink) + r(980, 182, 150, 40, '#fff', 4, K.ink, 1.2) + t(996, 208, 'Type here', 13.5, 500, K.ink) + r(1150, 182, 90, 40, '#fff', 20, K.ink, 1.5) + t(1195, 208, 'View All', 13.5, 700, K.ink, 'middle');
    o += r(40, 246, 1200, 330, '#fff', 0, K.ln) + t(64, 288, 'Circuit Status', 22, 700, K.ink);
    const d = clamp(s.donut ?? 1), C = 2 * Math.PI * 62, seg = [[7, K.ok], [3, '#F2B63A'], [4, '#333']]; let acc = 0;
    seg.forEach(([n, c]) => { const L = C * n / 14 * d; o += `<circle cx="200" cy="396" r="62" fill="none" stroke="${c}" stroke-width="16" stroke-dasharray="${L} ${C}" stroke-dashoffset="${-acc * C / 14 * d}" transform="rotate(-90 200 396)"/>`; acc += n; });
    o += t(200, 402, '14', 34, 700, K.ink, 'middle') + t(200, 424, 'Total', 13, 500, K.mu, 'middle') + [['7', 'Completed', K.ok, 64], ['3', 'Pending for', '#F2B63A', 148], ['4', 'Cancelled', '#333', 232]].map(([n, q, c, x]) => r(x, 490, 5, 34, c, 0) + t(x + 14, 504, n, 14, 700, K.ink) + t(x + 14, 522, q, 12, 500, K.mu)).join('') + t(162, 538, 'Activation', 12, 500, K.mu);
    [['C0008580', 340], ['C0002380', 615], ['C0001320', 890]].forEach(([id, x], i) => { const hot = s.hot === i; o += `<line x1="${x}" x2="${x}" y1="246" y2="576" stroke="${K.ln}"/>` + t(x + 22, 292, id, 20, 650, K.ink) + t(x + 250, 288, 'Activation overdue', 11.5, 500, K.mu, 'end') + ci(x + 28, 318, 4, '#F2B63A') + t(x + 38, 322, 'Pending Activation', 12, 500, K.ink) + r(x + 200, 300, 52, 24, '#FCE8E6', 3) + t(x + 226, 317, '5 days', 12, 600, K.red, 'middle') + t(x + 22, 366, 'VPN:', 12.5, 500, K.mu) + t(x + 22, 386, 'SPRINKLEDODLES215', 14, 500, K.ink) + t(x + 22, 430, 'VPN Address:', 12.5, 500, K.mu) + t(x + 22, 450, '180, Allen RD ATLANTA GA,', 14, 500, K.ink) + t(x + 22, 470, '30326-4862 USA', 14, 500, K.ink) + `<line x1="${x + 22}" x2="${x + 252}" y1="504" y2="504" stroke="${K.ln}"/>` + r(x + 22, 520, 76, 28, hot ? K.red : '#000', 14) + t(x + 60, 539, 'Activate', 12, 700, '#fff', 'middle'); });
    o += t(40, 640, 'Bandwidth Utilization', 28, 700, K.ink) + r(1150, 610, 90, 40, '#fff', 20, K.ink, 1.5);
  } else {
    o += `<path d="M44 196 l-14 8 l14 8 M30 204 h26" stroke="${K.ink}" stroke-width="2" fill="none"/>` + t(78, 214, 'Circuits', 30, 700, K.ink);
    o += r(40, 240, 220, 36, '#fff', 3, '#999', 1.2) + t(54, 264, 'Type here', 13, 500, K.ink);
    const L = view === 'bw' ? [['C0002972', 'Active'], ['C0001320', 'Active'], ['C0008621', 'Active'], ['C0002974', 'Active'], ['C0001244', 'Active'], ['C0001093', 'Active'], ['C0003871', 'Active']] : [['C0008580', 'Pending'], ['C0001320', 'Active'], ['C0008621', 'Pending'], ['C0002974', 'Active'], ['C0001244', 'Active'], ['C0001093', 'Pending'], ['C0003871', 'Pending']];
    const sel = view === 'bw' ? 1 : (s.sel ?? 0);
    L.forEach(([id, st2], i) => { const y = 292 + i * 52, pend = st2 === 'Pending'; o += (i === sel ? r(40, y, 220, 52, '#F3F3F3', 0) + r(40, y, 4, 52, K.red, 0) : '') + `<line x1="40" x2="260" y1="${y + 52}" y2="${y + 52}" stroke="${K.ln}"/>` + t(58, y + 31, id, 14, 700, K.ink) + t(244, y + 31, '• ' + st2, 12.5, 500, pend ? K.or : K.ok, 'end'); });
    const id = view === 'bw' ? 'C0001320' : (sel === 0 ? 'C0008580' : 'C0001320'), act = view === 'bw' || sel === 1;
    o += t(290, 262, 'Circuit ' + id, 22, 700, K.ink) + t(500, 262, '• ' + (act ? 'Active' : 'Activation Pending'), 13, 500, act ? K.ok : K.or) + t(900, 268, 'View details in DNM', 13.5, 500, K.ink) + r(1060, 240, 180, 44, s.pressBtn ? '#333' : '#000', 22) + t(1150, 268, view === 'bw' ? 'Modify bandwidth' : 'Start activation', 13.5, 700, '#fff', 'middle');
    const tabs = [['Overview', 290], ['Bandwidth utilization', 396], ['Orders', 576], ['Reports', 656]], tOn = view === 'bw' ? 1 : 0;
    tabs.forEach(([q, x], i) => { o += t(x, 326, q, 13.5, i === tOn ? 650 : 500, i === tOn ? K.ink : K.mu) + (i === tOn ? r(x, 340, q.length * 7.4, 3, K.red, 0) : ''); });
    if (view !== 'bw') {
      o += [['Activation Status', '● Pending  |  Overdue by 5 Days', 330, 400], ['Circuit type', 'Public IP/Internet', 330, 478], ['Service ID', '53327416', 330, 556], ['PVC', '5820282', 590, 400], ['VPN', 'TruGreenLtd', 590, 478], ['VRF Name', 'V457192:TrueGreen LTD', 590, 556], ['VPN Address', '2950 Ravenswood Rd', 860, 400]].map(([a, b, x, y]) => t(x, y, a, 13.5, 700, K.ink) + t(x, y + 22, b, 13.5, 500, K.ink)).join('') + t(860, 444, 'Marysville, MI 480405-1155', 13.5, 500, K.ink) + t(860, 464, 'USA', 13.5, 500, K.ink);
    } else {
      o += `<line x1="548" x2="548" y1="352" y2="800" stroke="${K.ln}"/>` + [['C0001320', '', 24], ['Service ID', '14612467', 0], ['Circuit Type', 'Private IP/Intern', 0], ['Port Speed', '9 Kbps', 0], ['Current Speed', '10 Kbps', 0], ['EF Real Time CAR', '64 kbps', 0]].map(([a, b], i) => i ? t(300, 424 + (i - 1) * 56, a, 12.5, 700, '#555') + t(300, 444 + (i - 1) * 56, b, 13.5, 500, K.ink) : t(300, 392, a, 20, 700, K.ink)).join('') + ['DC', 'DP', 'LG'].map((q, i) => r(300 + i * 30, 716, 26, 20, K.ok, 3) + t(313 + i * 30, 731, q, 11, 700, '#fff', 'middle')).join('');
      o += t(576, 392, 'Bandwidth Utilization', 20, 700, K.ink) + t(1220, 388, 'Export', 13, 500, K.ink, 'end') + r(576, 410, 98, 26, s.unit === 'Mbp' ? '#fff' : '#000', 0, '#000', 1) + t(612, 428, 'Kbp', 11.5, 700, s.unit === 'Mbp' ? '#000' : '#fff', 'middle') + r(625, 410, 49, 26, s.unit === 'Mbp' ? '#000' : '#fff', 0) + t(650, 428, 'Mbp', 11.5, 700, s.unit === 'Mbp' ? '#fff' : '#000', 'middle');
      o += t(900, 426, 'January 2022', 14, 500, K.ink) + `<line x1="900" x2="1050" y1="436" y2="436" stroke="#999"/>` + t(1100, 424, 'Monthly', 13, 500, K.ink) + `<line x1="1100" x2="1210" y1="436" y2="436" stroke="#999"/>`;
      const gx = 600, gw = 620, gy = 470, gh = 210, d = clamp(s.draw ?? 1), mk = (a, amp, base, seed) => smooth(wave(seed, amp, base).map(([x, v]) => [gx + x * gw, gy + gh - v * gh * (s.unit === 'Mbp' ? .62 : 1)]));
      for (let i = 0; i < 5; i++) o += `<line x1="${gx}" x2="${gx + gw}" y1="${gy + i * gh / 4}" y2="${gy + i * gh / 4}" stroke="#EEE"/>`;
      o += `<clipPath id="dn-c"><rect x="${gx}" y="${gy - 10}" width="${gw * d}" height="${gh + 20}"/></clipPath><g clip-path="url(#dn-c)"><path d="${mk(0, 1, 0, 1.2)}" fill="none" stroke="${K.or}" stroke-width="2.6"/><path d="${mk(0, .45, 0, 4.1)}" fill="none" stroke="${K.bl}" stroke-width="2.6"/></g>`;
      o += t(576, 740, 'Capacity: 64Kbps', 13, 600, '#555') + r(840, 726, 16, 16, '#fff', 2, '#000', 1.3) + t(862, 740, 'Ingress Speed', 13, 500, K.ink) + ci(962, 734, 5, K.or) + r(1000, 726, 16, 16, '#fff', 2, '#000', 1.3) + t(1022, 740, 'Egress Speed', 13, 500, K.ink) + ci(1112, 734, 5, K.bl);
    }
  }
  /* mega menu */
  if (s.menu) o += r(0, 94, 1280, 360, '#000', 0) + t(60, 150, 'Product Tools', 13, 600, '#aaa') + ['Business Application', 'Product Reporting', 'View All Product Tools'].map((q, i) => t(60, 196 + i * 44, q, 14.5, i === 0 ? 700 : 500, '#fff') + t(330, 196 + i * 44, '›', 16, 500, '#fff') + `<line x1="60" x2="340" y1="${210 + i * 44}" y2="${210 + i * 44}" stroke="#444"/>`).join('') + t(420, 150, 'Business Application', 13, 600, '#aaa') + ['Application Assurance - Internet', 'Application Assurance - PIP', 'Dynamic Network Manager', 'Hosted IVR Feature Manager', 'Manage Custom Notifications'].map((q, i) => t(420, 196 + i * 44, q, 14.5, i === 2 ? 700 : 500, '#fff') + t(740, 196 + i * 44, '›', 16, 500, '#fff') + `<line x1="420" x2="760" y1="${210 + i * 44}" y2="${210 + i * 44}" stroke="#444"/>`).join('') + t(860, 150, 'Dynamic Network Manager', 13, 600, '#aaa') + ['Service Activation', 'View bandwidth utilization', 'DNM Orders'].map((q, i) => (s.mhl === i ? r(850, 176 + i * 44, 300, 40, '#222', 6) : '') + t(870, 196 + i * 44, q, 14.5, s.mhl === i ? 700 : 500, '#fff')).join('') + r(860, 332, 290, 40, 'none', 4, '#fff', 1) + t(1005, 357, 'Action required for 8 pending activations  ›', 12, 500, '#fff', 'middle');
  if (s.dialog) o += r(0, 0, 1280, 800, '#000', 0, null, 0, .45) + r(430, 250, 420, 280, '#fff', 12) + t(460, 300, 'Modify bandwidth', 22, 700, K.ink) + t(460, 332, 'Circuit C0001320 · Current speed 10 Kbps', 14, 500, K.mu) + r(460, 356, 360, 44, '#fff', 4, '#999', 1.2) + t(476, 384, s.picked ? 'Higher speed selected' : 'Select new speed', 14, 500, s.picked ? K.ink : K.mu) + r(460, 440, 150, 46, s.pressSubmit ? '#333' : '#000', 23) + t(535, 470, 'Submit', 14, 700, '#fff', 'middle') + t(660, 470, 'Cancel', 14, 600, K.ink, 'middle');
  if (s.toast) o += r(380, 706, 520, 46, '#000', 23) + ck(412, 729, K.ok, 11) + t(438, 735, s.toast, 14, 550, '#fff');
  return o;
}
