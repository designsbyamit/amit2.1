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

/* ---------- Engaze: the leave chat from the HTML prototype (white workspace, violet accent) ---------- */
export function engaze(s = {}) {
  const K = { bg: '#F4F1FC', ink: '#17122B', mu: '#7C7796', ln: '#E4DFF2', v: '#6C4BF4', vS: '#EDE9FE', ok: '#15803D', okS: '#E3F5EC' };
  const n = s.n ?? 0, off = s.off ?? 0, steps = s.steps ?? 3, st2 = s.st2 ?? 2;
  const orb = (x, y, rad) => `<circle cx="${x}" cy="${y}" r="${rad}" fill="url(#eo)"/>`;
  const bub = (y, q) => { const w = q.length * 7.7 + 34; return r(1056 - w, y, w, 44, K.ink, 22) + t(1056 - w + 17, y + 28, q, 15, 500, '#fff'); };
  const tick = (x, y) => `<path d="M${x - 4} ${y} l3.5 3.5 l6-7" stroke="#22A06B" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  const fb = (y) => [0, 1, 2].map(i => `<rect x="${389 + i * 32}" y="${y - 7}" width="14" height="14" rx="3" fill="none" stroke="#8B86A8" stroke-width="1.6"/>`).join('');
  let o = `<defs><radialGradient id="eo" cx="35%" cy="30%"><stop offset="0" stop-color="#fff"/><stop offset=".4" stop-color="#9DB4FF"/><stop offset=".75" stop-color="#B26BFF"/><stop offset="1" stop-color="#FF8FB8"/></radialGradient><clipPath id="ec"><rect x="264" y="12" width="864" height="772"/></clipPath></defs><g transform="scale(.8889)">` + r(0, 0, 1440, 900, K.bg, 0);
  /* sidebar */
  if (n === 0) {
  o += `<g fill="none" stroke="${K.v}" stroke-width="2.4" stroke-linejoin="round"><path d="M37 26 l12 7 v13 l-12 7 l-12-7 v-13z"/><path d="M30 33 l14 -2 M29 40 l18 -4 M30 47 l14 -2"/></g>` + t(60, 46, 'engaze', 22, 650, K.ink) + r(16, 79, 232, 42, '#fff', 12, K.ln) + t(33, 106, '+', 20, 400, K.ink) + t(55, 105, 'New conversation', 15, 500, K.ink);
  o += t(26, 164, 'Today', 12.5, 600, '#8B86A8') + r(16, 179, 232, 38, K.vS, 10) + t(52, 203, n >= 1 ? 'Sick leave today' : 'New conversation', 14.5, 650, K.v) + t(26, 246, 'Earlier', 12.5, 600, '#8B86A8') + ['Cab reimbursement, Bengaluru', 'My Gen AI training plan', 'Update my address'].map((q, i) => t(52, 286 + i * 40, q, 14.5, 500, K.mu)).join('') + t(50, 806, 'Back to the case study', 14, 500, K.ink) + r(16, 826, 232, 56, '#fff', 14, K.ln) + ci(44, 854, 17, '#F0735A') + t(44, 860, 'E', 15, 700, '#fff', 'middle') + t(71, 851, 'Esha Sharma', 14, 650, K.ink) + t(71, 869, 'Senior Dev Lead', 12.5, 500, K.mu);
  /* right column */
  const sick = n >= 4 ? 4 : 5; o += r(1145, 13, 278, 188, '#fff', 18, K.ln) + t(1163, 48, 'Your time off', 16.5, 650, K.ink) + [['Sick leave', sick, 12], ['Casual leave', 4, 10], ['Earned leave', 11, 18]].map((q, i) => t(1163, 81 + i * 42, q[0], 13.5, 500, K.mu) + t(1405, 81 + i * 42, q[1] + ' of ' + q[2] + ' left', 13.5, 650, K.ink, 'end') + r(1163, 90 + i * 42, 242, 6, '#E8E4FA', 3) + r(1163, 90 + i * 42, 242 * q[1] / q[2], 6, K.v, 3)).join('');
  o += r(1145, 215, 278, 182, '#fff', 18, K.ln) + t(1163, 250, 'What Genie can see', 16.5, 650, K.ink) + ['Leave balances and history', 'Payslips and tax declarations', 'Company policies', 'Your calendar, today only'].map((q, i) => ci(1171, 276 + i * 30, 6, K.v) + t(1189, 283 + i * 30, q, 13.5, 500, K.mu)).join('') + r(1145, 411, 278, 210, '#fff', 18, K.ln) + t(1163, 446, 'What Genie remembers', 16.5, 650, K.ink) + ['You prefer short answers', 'You work from the Pune office', 'Your manager is Manoj Kumar'].map((q, i) => t(1163, 488 + i * 37, q, 13.5, 500, K.mu) + r(1369, 472 + i * 37, 36, 22, K.v, 11) + ci(1394, 483 + i * 37, 8, '#fff')).join('');
  }
  /* main */
  o += r(264, 12, 864, 876, '#fff', 28);
  let body = '';
  if (n === 0) {
    body += orb(696, 142, 48) + t(696, 254, 'Good morning, Esha.', 46, 650, K.ink, 'middle') + t(696, 294, 'Two things are worth a look today. Or ask me anything about your', 16.5, 500, K.mu, 'middle') + t(696, 318, 'leave, pay or policies.', 16.5, 500, K.mu, 'middle');
    [[336, 'You could save about ₹24,000 in tax', 'The new regime fits your declarations better.', 'Switching closes on 31 January.', 'Compare for me'], [702, 'One earned leave day lapses on 31 December', 'You have 11 earned days. Ten carry forward into', 'next year.', 'Show the rule']].forEach(([x, a, b, c, d], i) => { body += r(x, 357, 354, 184, '#FAF9FE', 20, K.ln) + r(x + 19, 377, 34, 34, i ? '#FFF1DB' : K.vS, 10) + t(x + 19, 438, a, 15.5, 650, K.ink) + t(x + 19, 464, b, 13.5, 500, K.mu) + t(x + 19, 484, c, 13.5, 500, K.mu) + t(x + 19, 517, d + '  →', 14, 650, K.v); });
    [['I’m down with a fever. Can I take today off?', 336, 690], ['Old or new tax regime: which is better for me?', 702, 690], ['Claim my Pune flight', 336, 742], ['Can I carry forward unused leave?', 702, 742]].forEach(([q, x, y], i) => { body += r(x, y, 356, 44, '#fff', 10, s.chip === i ? K.v : K.ln, s.chip === i ? 2.5 : 1.3) + ci(x + 24, y + 22, 6, K.v) + t(x + 40, y + 28, q, 14, 500, K.ink); });
  } else {
    body += `<g transform="translate(0 ${-off})">`;
    body += bub(46, 'I’m down with a fever. Can I take today off?') + orb(351, 126, 16);
    ['Checked your leave balance', 'Read the leave policy, section 3.2', 'Found who to tell: Manoj and the Platform team'].forEach((q, i) => { if (i < steps) body += tick(387, 125 + i * 24.5) + t(401, 129 + i * 24.5, q, 13.5, 500, '#9A96B3'); });
    if (n >= 3) {
      body += t(380, 212, 'Sorry you’re unwell, Esha. Rest up. I’ve got sick leave ready for today. Have a look before I', 16.5, 500, K.ink) + t(380, 237, 'apply it.', 16.5, 500, K.ink);
      if (n < 4) body += r(380, 256, 676, 257, '#fff', 16, K.ln) + r(397, 272, 78, 26, K.vS, 13) + t(436, 290, 'Sick leave', 12.5, 650, K.v, 'middle') + r(910, 273, 129, 26, '#fff', 13, K.ln) + t(974, 291, 'Leave policy §3.2', 12, 500, K.v, 'middle') + [['When', 'Today, 18 Oct', 397], ['Length', '1 day', 560], ['Balance after', '4 of 12 days', 724]].map(([a, b, x]) => t(x, 326, a, 12, 500, '#9A96B3') + t(x, 348, b, 14.5, 650, K.ink)).join('') + t(397, 383, 'I’ll tell', 12.5, 500, '#9A96B3') + ci(449, 378, 9, '#3B82F6') + t(449, 383, 'M', 10, 700, '#fff', 'middle') + t(465, 383, 'Manoj Kumar, your manager', 14, 650, K.ink) + ci(661, 378, 9, '#7C7BB0') + t(661, 383, '#', 10, 700, '#fff', 'middle') + t(677, 383, 'Platform team', 14, 650, K.ink) + r(397, 402, 642, 40, K.okS, 8) + t(432, 427, 'Within policy. One day doesn’t need a medical certificate.', 13.5, 550, K.ok) + r(397, 456, 142, 40, s.applyHot ? '#5A3AE0' : K.v, 10) + t(468, 481, 'Apply sick leave', 14.5, 600, '#fff', 'middle') + r(547, 456, 125, 40, '#fff', 10, K.ln) + t(609, 481, 'Change dates', 14.5, 500, K.ink, 'middle') + fb(539);
      else body += r(380, 256, 676, 75, '#F2FBF6', 16, '#BFE5CE') + ci(414, 293, 18, '#1B8F57') + `<path d="M406 293 l6 6 l10-12" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + t(443, 288, 'Sick leave applied for today', 16, 650, K.ink) + t(443, 310, 'Approved within policy. Manoj and the Platform team know you’re out.', 13.5, 500, K.mu) + t(1039, 298, '↺ Undo · 28s', 14, 600, K.v, 'end') + r(380, 343, 153, 40, s.oooHot ? K.vS : '#fff', 20, s.oooHot ? K.v : K.ln, s.oooHot ? 2 : 1.3) + t(456, 368, 'Set an out-of-office', 14, 600, K.ink, 'middle') + r(541, 343, 160, 40, '#fff', 20, K.ln) + t(621, 368, 'Claim my Pune flight', 14, 600, K.ink, 'middle') + fb(420);
    }
    if (n >= 5) {
      body += bub(446, 'Set an out-of-office for today') + orb(351, 526, 16);
      ['Looked at your calendar for today', 'Matched the tone of your last out-of-office'].forEach((q, i) => { if (i < st2) body += tick(387, 525 + i * 25) + t(401, 529 + i * 25, q, 13.5, 500, '#9A96B3'); });
    }
    if (n >= 7) {
      body += t(380, 582, 'Here’s one in your usual tone. Edit it if you like.', 16.5, 500, K.ink) + r(380, 606, 676, 258, '#fff', 16, K.ln) + r(397, 622, 98, 26, '#EFEDF5', 13) + t(446, 640, 'Out-of-office', 12.5, 650, K.mu, 'middle') + t(1039, 640, 'Today until tomorrow, 9 am', 13.5, 500, '#9A96B3', 'end') + r(397, 662, 642, 130, '#FAF9FD', 8, K.ln) + t(412, 692, 'Hi,', 14, 500, K.ink) + t(412, 737, 'I’m out sick today and back tomorrow. For anything urgent on the platform release, please reach', 14, 500, K.ink) + t(412, 759, 'Manoj.', 14, 500, K.ink);
      body += n >= 8 ? r(397, 806, 642, 40, K.okS, 10) + ck(424, 826, '#1B8F57', 10) + t(444, 832, 'Out-of-office is on until tomorrow, 9 am.', 14, 650, K.ok) : r(397, 806, 142, 40, s.onHot ? '#5A3AE0' : K.v, 10) + t(468, 831, 'Turn it on', 14.5, 600, '#fff', 'middle') + r(547, 806, 84, 40, '#fff', 10, K.ln) + t(589, 831, 'Discard', 14.5, 500, K.ink, 'middle');
    }
    body += '</g>';
  }
  o += `<g clip-path="url(#ec)" transform="scale(1.125)"><g transform="scale(.8889)">${body}</g></g>`.replace('<g clip-path="url(#ec)" transform="scale(1.125)"><g transform="scale(.8889)">', '<g clip-path="url(#ec)"><g>');
  o += r(336, 798, 720, 58, '#fff', 29, K.ln) + orb(362, 827, 15) + t(389, 833, 'Ask about leave, pay, tax, claims or policies', 15.5, 500, '#A9A5C2') + `<rect x="932" y="819" width="11" height="20" rx="5" fill="none" stroke="#6B6590" stroke-width="2"/><rect x="976" y="817" width="10" height="18" rx="5" fill="none" stroke="#6B6590" stroke-width="2"/>` + r(1007, 807, 40, 40, '#D5D3E0', 12) + t(1027, 833, '→', 18, 700, '#fff', 'middle') + t(696, 869, 'Only you can see this conversation. Genie confirms before it acts on your behalf.', 11.5, 500, '#9A96B3', 'middle') + '</g>';
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

/* ---------- Agentic: the order-confirmation flow, in the look of the film's solution scene (graphite, lime agent, cobalt people) ---------- */
const FL = { bg: '#0F1013', panel: '#181A1F', line: '#2C3038', ink: '#ECEDEF', mu: '#A3A7B0', dim: '#6B7078', lime: '#C8F55A', cob: '#6E8BFF', cobS: '#1B2140' };
const MONO = "'Geist Mono Variable','Geist Mono',ui-monospace,monospace";
const NW = 210, NH = 100, CW = 2560;
const LY = { agent: 235, ops: 385, buyer: 535, goods: 685 };
const CX = [250, 590, 930, 1300, 1690, 2060, 2380];
const FN = [
  [0, 'agent', 0, ['Email and PDF', 'picked up'], 'a'],
  [1, 'agent', 1, ['Reads, scores', 'confidence'], 'a'],
  [2, 'ops', 1, ['Checks and', 'corrects'], 'h'],
  [3, 'ops', 2, ['Confirms', 'validation'], 'g', 'GATE 1'],
  [4, 'agent', 3, ['Compares to the PO,', 'rates and routes'], 'a'],
  [5, 'buyer', 4, ['Decides on', 'cost and terms'], 'g', 'GATE 2'],
  [5, 'goods', 4, ['Decides on', 'quantity and dates'], 'g', 'GATE 2'],
  [6, 'agent', 5, ['Drafts the', 'supplier reply'], 'a'],
  [7, 'buyer', 5, ['Reviews and', 'sends it'], 'g', 'GATE 3'],
  [8, 'agent', 6, ['Closes'], 'a'],
];
const FE = [[0, 1], [1, 2], [2, 3], [3, 4], [4, 5], [4, 6], [5, 7], [6, 7], [7, 8], [8, 9]];
export function agFlow(s = {}) {
  const step = s.step ?? 0, end = !!s.end, K = FL;
  let o = r(0, 0, CW, 800, K.bg, 0);
  o += t(60, 66, 'THE SOLUTION', 14, 400, K.dim, null, MONO).replace('<text', '<text letter-spacing="2.4"') + t(60, 124, 'The agent reads. <tspan style="fill:#C8F55A">People decide.</tspan>', 52, 200, K.ink);
  [['agent', 'AI AGENT'], ['ops', 'OPERATIONS'], ['buyer', 'BUYER'], ['goods', 'GOODS RECIPIENT']].forEach(([l, nm]) => {
    o += `<line x1="60" x2="${CW - 60}" y1="${LY[l] + 76}" y2="${LY[l] + 76}" stroke="${K.line}" stroke-width="1"/>` + t(60, LY[l] - 58, nm, 12, 400, K.dim, null, MONO).replace('<text', '<text letter-spacing="2"');
  });
  const P = (n) => ({ x: CX[n[2]], y: LY[n[1]] });
  FE.forEach(([a, b]) => {
    const A = FN[a], B = FN[b], pa = P(A), pb = P(B), on = step >= B[0], act = step === B[0];
    let d, x2, y2;
    if (pa.x === pb.x) { d = `M${pa.x} ${pa.y + NH / 2} V${pb.y - NH / 2}`; x2 = pb.x; y2 = pb.y - NH / 2; }
    else { const x1 = pa.x + NW / 2, y1 = pa.y; x2 = pb.x - NW / 2; y2 = pb.y; const mx = (x1 + x2) / 2; d = `M${x1} ${y1} C${mx} ${y1} ${mx} ${y2} ${x2} ${y2}`; }
    o += `<path d="${d}" fill="none" stroke="${on ? (act ? K.lime : '#7C818B') : K.line}" stroke-width="${act ? 1.6 : 1.1}" ${on ? '' : 'stroke-dasharray="2 6"'}/>`;
    if (act) o += `<circle cx="${x2}" cy="${y2}" r="11" fill="${K.lime}" opacity=".16"/><circle cx="${x2}" cy="${y2}" r="4" fill="${K.lime}"/>`;
  });
  FN.forEach((n) => {
    const [st, lane, col, lines, kind, tag] = n, x = CX[col] - NW / 2, y = LY[lane] - NH / 2, on = step >= st, act = step === st;
    if (st === 8) {
      const cx = CX[col], cy = LY[lane];
      o += on ? `<circle cx="${cx}" cy="${cy}" r="${act ? 60 : 50}" fill="${K.lime}" opacity="${act ? .09 : 0}"/><circle cx="${cx}" cy="${cy}" r="42" fill="${K.panel}" stroke="${K.lime}" stroke-width="1.2"/>` + ck(cx - 12, cy + 2, K.lime, 20) + t(cx, cy + 70, 'LOGGED', 12, 400, K.mu, 'middle', MONO).replace('<text', '<text letter-spacing="2"')
        : `<circle cx="${cx}" cy="${cy}" r="42" fill="none" stroke="${K.line}" stroke-width="1" stroke-dasharray="2 6"/>`;
      return;
    }
    if (!on) { o += r(x, y, NW, NH, 'none', 14, K.line, 1).replace('<rect', '<rect stroke-dasharray="2 6"'); return; }
    const c = kind === 'a' ? K.lime : K.cob;
    if (kind === 'a' && act) o += r(x - 18, y - 18, NW + 36, NH + 36, c, 30, null, 0, .07);
    if (kind !== 'a' && (act || (kind === 'g' && end))) o += r(x - 10, y - 10, NW + 20, NH + 20, 'none', 24, K.cob, 1, act ? .6 : .35);
    o += r(x, y, NW, NH, kind === 'g' ? K.cobS : K.panel, 14, c, 1.2);
    o += t(x + 22, y + 30, kind === 'a' ? 'AGENT' : 'PERSON', 11, 400, c, null, MONO).replace('<text', '<text letter-spacing="2"');
    lines.forEach((q, i) => { o += t(x + 22, y + 58 + i * 23, q, 17.5, 300, K.ink); });
    if (tag) o += r(x + NW - 84, y - 11, 92, 22, K.cobS, 11, K.cob, 1) + t(x + NW - 38, y + 4.5, tag, 11, 500, K.cob, 'middle', MONO).replace('<text', '<text letter-spacing="1.5"');
  });
  o += `<circle cx="64" cy="764" r="3.5" fill="${K.lime}"/>` + t(78, 768, 'THE AGENT ACTS', 11, 400, K.mu, null, MONO).replace('<text', '<text letter-spacing="2"') + `<circle cx="258" cy="764" r="3.5" fill="${K.cob}"/>` + t(272, 768, 'A PERSON DECIDES', 11, 400, K.mu, null, MONO).replace('<text', '<text letter-spacing="2"');
  if (end) o += t(CW / 2, 768, 'AGENT READS AND COMPARES  ·  PEOPLE DECIDE  ·  EVERY STEP LOGGED', 12, 400, K.lime, 'middle', MONO).replace('<text', '<text letter-spacing="2.4"');
  return o;
}
