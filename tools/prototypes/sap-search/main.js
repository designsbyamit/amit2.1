// SAP AI-Powered Search prototype — built only with SAP UI5 Web Components (Fiori, Horizon theme).
// Screens and content mirror the Figma frames 1.1–5.4 ("S-Projects › AI-Powered Search").
import { registerLocaleDataLoader } from '@ui5/webcomponents-base/dist/asset-registries/LocaleData.js';
import cldrEn from '@ui5/webcomponents-localization/dist/generated/assets/cldr/en.json';
registerLocaleDataLoader('en', async () => cldrEn);
import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarBranding.js';
import '@ui5/webcomponents-fiori/dist/ShellBarItem.js';
import '@ui5/webcomponents/dist/features/InputSuggestions.js';
import '@ui5/webcomponents/dist/SuggestionItem.js';
import '@ui5/webcomponents/dist/SuggestionItemGroup.js';
import { registerIcon } from '@ui5/webcomponents-base/dist/asset-registries/Icons.js';
registerIcon('ai-search', { collection: 'custom', packageName: 'proto', ltr: false, pathData: 'M200 130a150 150 0 1 1 0 300a150 150 0 1 1 0-300zM200 162a118 118 0 1 0 0 236a118 118 0 1 0 0-236zM300 392l24-24l150 132l-24 24zM400 16q8 62 70 70q-62 8-70 70q-8-62-70-70q62-8 70-70z' });
import '@ui5/webcomponents-fiori/dist/FlexibleColumnLayout.js';
import '@ui5/webcomponents/dist/Avatar.js';
import '@ui5/webcomponents/dist/Card.js';
import '@ui5/webcomponents/dist/CardHeader.js';
import '@ui5/webcomponents/dist/Title.js';
import '@ui5/webcomponents/dist/Text.js';
import '@ui5/webcomponents/dist/Label.js';
import '@ui5/webcomponents/dist/Button.js';
import '@ui5/webcomponents/dist/ToggleButton.js';
import '@ui5/webcomponents/dist/Tag.js';
import '@ui5/webcomponents/dist/TabContainer.js';
import '@ui5/webcomponents/dist/Tab.js';
import '@ui5/webcomponents/dist/List.js';
import '@ui5/webcomponents/dist/ListItemStandard.js';
import '@ui5/webcomponents/dist/ListItemCustom.js';
import '@ui5/webcomponents/dist/MessageStrip.js';
import '@ui5/webcomponents/dist/Dialog.js';
import '@ui5/webcomponents/dist/Popover.js';
import '@ui5/webcomponents/dist/Breadcrumbs.js';
import '@ui5/webcomponents/dist/BreadcrumbsItem.js';
import '@ui5/webcomponents/dist/ProgressIndicator.js';
import '@ui5/webcomponents/dist/StepInput.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/TextArea.js';
import '@ui5/webcomponents/dist/Select.js';
import '@ui5/webcomponents/dist/Option.js';
import '@ui5/webcomponents/dist/DatePicker.js';
import '@ui5/webcomponents/dist/Toast.js';
import '@ui5/webcomponents/dist/Icon.js';
import '@ui5/webcomponents/dist/Link.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import '@ui5/webcomponents-icons/dist/write-new.js';
import '@ui5/webcomponents-icons/dist/message-warning.js';
import '@ui5/webcomponents-icons/dist/sys-enter-2.js';
import '@ui5/webcomponents-icons/dist/error.js';
import '@ui5/webcomponents-icons/dist/employee-lookup.js';
import '@ui5/webcomponents-icons/dist/person-placeholder.js';
import '@ui5/webcomponents-icons/dist/sort.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-down.js';
import '@ui5/webcomponents-icons/dist/add.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/bookmark.js';
import '@ui5/webcomponents-icons/dist/bookmark-2.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-up.js';
import '@ui5/webcomponents-icons/dist/overflow.js';
import '@ui5/webcomponents-icons/dist/sys-help.js';
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/alert.js';
import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/nav-back.js';
import '@ui5/webcomponents-icons/dist/pdf-attachment.js';
import '@ui5/webcomponents-icons/dist/share.js';
import '@ui5/webcomponents-icons/dist/action.js';
import '@ui5/webcomponents-icons/dist/iphone.js';
import '@ui5/webcomponents-icons/dist/laptop.js';
import '@ui5/webcomponents-icons/dist/product.js';
import * as D from './data.js';

const BASE = import.meta.env.BASE_URL;
const app = document.getElementById('app');
const search = document.getElementById('search');
const shell = document.getElementById('shell');
const brandTitle = document.getElementById('brandTitle');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const avatar = `<ui5-avatar slot="avatar" size="S"><img src="${BASE}avatar.png" alt=""></ui5-avatar>`;
let ctx = 's4';

function setApp(a) { ctx = a; brandTitle.textContent = D.apps[a]; }
const page = (inner, cls = '') => { app.innerHTML = `<div class="page ${cls}">${inner}</div>`; window.scrollTo(0, 0); };
const card = ([title, sub, counter], go) => `<ui5-card class="tile" ${go ? `data-go="${go}"` : ''}><ui5-card-header slot="header" title-text="${esc(title)}" subtitle-text="${esc(sub)}" ${counter ? `additional-text="${esc(counter)}"` : ''} interactive>${avatar}</ui5-card-header></ui5-card>`;
const headBar = (title, meta, back) => `<div class="headbar">${back ? `<ui5-button design="Transparent" icon="nav-back" data-go="${back}" accessible-name="Back"></ui5-button>` : ''}<span class="dot" aria-hidden="true"></span><ui5-title level="H4" size="H5">${esc(title)}</ui5-title><span class="sp"></span>${meta ? `<ui5-label>${esc(meta)}</ui5-label>` : ''}</div>`;
const band = (cls, title, meta) => `<div class="band ${cls}"><ui5-title level="H3" size="H4" class="onband">${esc(title)}</ui5-title>${meta ? `<span class="bandmeta">${esc(meta)}</span>` : ''}</div>`;

// ── Search field (UI5 Input in the ShellBar, AI-search icon) ─────────────
function listFor(v) {
  v = v.trim().toLowerCase();
  if (!v) return { group: 'Suggestions', route: 'po', items: D.home.suggestions };
  if (/sow|status|cyber|end date|fieldglass|supplier|current/.test(v)) return { group: 'Suggestions', ...D.typeahead.sow };
  if (/^pur/.test(v) && v.length < 5) return { group: 'Suggestions', ...D.typeahead.pur };
  if (/^purch/.test(v)) return { group: 'Suggestions', ...D.typeahead.purchase };
  if (/flight|trip|bangalore|palo|travel/.test(v)) return { group: 'Suggestions', ...D.typeahead.flight };
  if (/laptop|iphone|device|compare|differ/.test(v)) return { group: 'Suggestions', ...D.typeahead.laptop };
  if (/goal|okr|draft|team|performance/.test(v)) return { group: 'Suggestions', ...D.typeahead.goals };
  return { group: 'Suggestions', ...D.typeahead.pur };
}
let lastKey = '';
function renderSuggestions() {
  const L = listFor(search.value || '');
  const key = L.items.join('|');
  if (key === lastKey) return;
  lastKey = key;
  search.querySelectorAll('ui5-suggestion-item, ui5-suggestion-item-group').forEach(n => n.remove());
  const g = document.createElement('ui5-suggestion-item-group'); g.headerText = L.group;
  L.items.forEach(t => { const it = document.createElement('ui5-suggestion-item'); it.text = t; it.dataset.route = L.route; g.appendChild(it); });
  search.appendChild(g);
}
function pick(text, route) { search.value = text; search.open = false; go(routeAfterPick(route)); }
search.addEventListener('input', renderSuggestions);
search.addEventListener('focusin', renderSuggestions);
search.addEventListener('selection-change', e => { const it = e.detail && e.detail.item; if (it) pick(it.text, it.dataset.route); });
search.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  setTimeout(() => {
    const q = (search.value || '').trim(); if (!q) return;
    const hit = [...search.querySelectorAll('ui5-suggestion-item')].find(i => i.text === q);
    if (hit) return pick(q, hit.dataset.route);
    search.open = false;
    if (/^purchase orders?$/i.test(q)) return go('capsules');
    go(routeAfterPick(listFor(q).route));
  }, 0);
});
const routeAfterPick = r => ({ po: 'results', travel: 'flights', buy: 'compare', goals: 'teamgoals', sow: 'sow' }[r] || r);
renderSuggestions();

// ── Views ────────────────────────────────────────────────────────────────
const V = {};
V.home = () => { setApp('s4'); search.value = ''; page(`<div class="hero"><ui5-title level="H2" size="H2">${D.home.greeting}</ui5-title><ui5-text>${D.home.sub}</ui5-text></div><div class="cards">${D.home.cards.map(c => card(c, c[3] === 'buy' ? 'buy' : 'capsules')).join('')}</div>`); };

V.capsules = () => {
  setApp('ariba'); search.value = D.capsules.query;
  page(`${headBar(D.capsules.query, '', 'home')}<div class="pad"><div class="capsules"><span class="aisug">AI Suggested <ui5-icon name="ai"></ui5-icon></span>${D.capsules.chips.map(c => `<ui5-toggle-button class="pill" data-go="results">${c}</ui5-toggle-button>`).join('')}</div>
  <ui5-title level="H5" size="H5" class="sec">Quick Access</ui5-title><div class="cards">${D.capsules.cards.map(c => card([c[0], c[1], '14 pending POs'], 'results')).join('')}</div></div>`, 'flush');
};

V.results = (tab = 0) => {
  setApp('s4'); const R = D.results; search.value = search.value || 'purchase orders';
  const rows = (arr) => `<ui5-list class="rows" separators="None">${arr.map((r, i) => `<ui5-li type="Active" description="${esc(r[1])}" additional-text="${esc(r[2])}" data-i="${i}" ${r[3] === 'Negative' ? 'highlight="Negative"' : ''}>${esc(r[0])}</ui5-li>`).join('')}</ui5-list>`;
  const body = [() => rows(R.all), () => rows(R.documents), () => `<div class="cards">${R.products.map(p => card([p[0], p[1], '14 pending'], null)).join('')}</div>`, () => rows(R.all.slice(0, 3)), () => `<ui5-message-strip design="Information" hide-close-button>Analytics for pending POs open in the procurement dashboard.</ui5-message-strip>`][tab]();
  app.innerHTML = `<ui5-flexible-column-layout id="fcl" layout="OneColumn"><div slot="startColumn">${headBar(R.title, tab === 2 ? '63 results' : R.meta, 'capsules')}
    <ui5-tabcontainer id="tabs" class="tabs" collapsed>${R.tabs.map((t, i) => `<ui5-tab text="${t}" ${i === tab ? 'selected' : ''}></ui5-tab>`).join('')}</ui5-tabcontainer><div class="pad" id="res">${body}</div></div><div slot="midColumn" id="detail"></div></ui5-flexible-column-layout>`;
  window.scrollTo(0, 0);
  document.getElementById('tabs').addEventListener('tab-select', e => V.results(e.detail.tabIndex));
  document.getElementById('res').addEventListener('item-click', () => V.detail());
};
V.detail = () => {
  const R = D.results;
  const fcl = document.getElementById('fcl'); if (!fcl) return;
  fcl.querySelector('#res').innerHTML = `<ui5-list class="rows" separators="None">${R.panelList.map((r, i) => `<ui5-li type="Active" description="${esc(r[1])}" additional-text="${esc(r[2])}" ${i === 0 ? 'selected' : ''}>${esc(r[0])}</ui5-li>`).join('')}</ui5-list>`;
  document.getElementById('detail').innerHTML = `<div class="pad detail"><div class="row"><ui5-title level="H4" size="H4">${esc(R.detail.title)}</ui5-title><ui5-button design="Transparent" icon="decline" id="closeD" accessible-name="Close"></ui5-button></div><ui5-tag design="Positive">${R.detail.status}</ui5-tag>
    <div class="form">${R.detail.fields.map(([l, v]) => `<div class="kv"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div>
    <div class="actions"><ui5-button design="Emphasized" icon="action">Open in Ariba</ui5-button><ui5-button icon="share">Share</ui5-button></div></div>`;
  fcl.layout = 'TwoColumnsStartExpanded';
  document.getElementById('closeD').onclick = () => V.results(0);
};

const appHome = (H, typeHint) => { setApp(H.app); search.value = ''; page(`<div class="hero"><ui5-title level="H3" size="H3">${H.title}</ui5-title><ui5-text>${H.sub}</ui5-text><ui5-label class="hint"><ui5-icon name="ai"></ui5-icon> Try searching: “${typeHint}”</ui5-label></div><div class="cards c3">${H.cards.map(c => card(c, null)).join('')}</div>`); };
V.travel = () => appHome(D.travel.home, 'flight to Bangalore');
V.buy = () => appHome(D.procurement.home, 'laptop');
V.goals = () => appHome(D.goals.home, 'Draft goals for product design team');

V.flights = () => {
  setApp('concur'); const T = D.travel; search.value = T.query;
  page(`${headBar(T.meta, '', 'travel')}<div class="pad"><ui5-message-strip design="ColorSet2" color-scheme="7" hide-close-button class="insight"><ui5-icon name="ai" slot="icon"></ui5-icon>${esc(T.insight)}</ui5-message-strip>
  <ui5-list class="rows" separators="None" id="fl">${T.flights.map((f, i) => `<ui5-li type="Active" description="${esc(f[1])}" additional-text="${esc(f[2])}" ${f[3] === 'Negative' ? 'highlight="Negative"' : ''} data-i="${i}">${esc(f[0])}</ui5-li>`).join('')}</ui5-list></div>`, 'flush');
  document.getElementById('fl').addEventListener('item-click', () => handoff('Concur', 'Opening your booking...', 'booking'));
};
function handoff(name, text, next) {
  const d = document.getElementById('handoff');
  d.querySelector('.mk').textContent = name[0]; d.querySelector('.hn').textContent = `SAP ${name}`; d.querySelector('.ht').textContent = text;
  const p = d.querySelector('ui5-progress-indicator'); p.value = 0; d.open = true;
  let v = 0; const t = setInterval(() => { v += 8; p.value = Math.min(v, 100); if (v >= 100) { clearInterval(t); d.open = false; go(next); } }, 90);
  d.querySelector('#hcancel').onclick = () => { clearInterval(t); d.open = false; };
}
V.booking = () => {
  setApp('concur'); const B = D.travel.booking;
  page(`${band('concur', B.title)}<div class="pad"><ui5-breadcrumbs>${B.crumbs.map(c => `<ui5-breadcrumbs-item>${esc(c)}</ui5-breadcrumbs-item>`).join('')}</ui5-breadcrumbs>
  <div class="split"><ui5-card><div class="cpad"><ui5-title level="H5" size="H5">${esc(B.flight)}</ui5-title><div class="form">${B.details.map(([l, v]) => `<div class="kv h"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div><ui5-tag design="Positive"><ui5-icon name="accept" slot="icon"></ui5-icon>Compliant with policy</ui5-tag><div class="actions"><ui5-button data-go="flights">Back to Results</ui5-button></div></div></ui5-card>
  <ui5-card><div class="cpad"><ui5-title level="H5" size="H5">Booking Summary</ui5-title><div class="form">${B.summary.map(([l, v]) => `<div class="kv"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div><div class="total"><ui5-title level="H5" size="H5">Total</ui5-title><ui5-title level="H5" size="H5">${B.total}</ui5-title></div><ui5-button design="Emphasized" class="wide" id="bookBtn">${esc(B.title)}</ui5-button></div></ui5-card></div></div>`, 'flush');
  document.getElementById('bookBtn').onclick = () => toast('Flight booked. Confirmation sent to Maria Schmidt.');
};

V.compare = () => {
  setApp('s4'); const P = D.procurement; search.value = 'laptop';
  page(`${headBar(P.title, P.meta, 'buy')}<div class="aistrip"><ui5-link>${esc(P.aiTitle)}</ui5-link></div><div class="pad">
  <div class="cards three">${P.products.map((p, i) => `<ui5-card class="tile ${i === 0 ? 'sel' : ''}"><ui5-card-header slot="header" title-text="${esc(p[0])}" subtitle-text="${esc(p[1])}" additional-text="2 products compared">${avatar}</ui5-card-header></ui5-card>`).join('')}</div>
  <div class="tw"><table class="spec"><tbody>${P.rows.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody><tfoot><tr><th></th>${P.products.map(() => `<td><ui5-button design="Emphasized" class="wide" data-ariba>Add to Cart</ui5-button></td>`).join('')}</tr></tfoot></table></div></div>`, 'flush');
  app.querySelectorAll('[data-ariba]').forEach(b => b.addEventListener('click', () => handoff('Ariba', 'Opening procurement catalog...', 'ariba')));
};
V.ariba = () => {
  setApp('ariba'); const A = D.procurement.ariba;
  page(`${band('ariba', A.title)}<div class="pad"><ui5-breadcrumbs>${A.crumbs.map(c => `<ui5-breadcrumbs-item>${esc(c)}</ui5-breadcrumbs-item>`).join('')}</ui5-breadcrumbs>
  <div class="split3"><div class="imgph"><ui5-icon name="iphone"></ui5-icon><ui5-label>iPhone 17 Pro</ui5-label></div>
  <ui5-card><div class="cpad"><ui5-title level="H5" size="H5">${esc(A.product)}</ui5-title><ui5-title level="H4" size="H4" class="price">${A.price}</ui5-title><div class="form">${A.details.map(([l, v]) => `<div class="kv h"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div></div></ui5-card>
  <ui5-card><div class="cpad"><ui5-title level="H5" size="H5" id="reqT">Add to Requisition (${A.qty} units)</ui5-title><div class="kv"><ui5-label for="qty">Quantity</ui5-label><ui5-step-input id="qty" value="${A.qty}" min="1" max="500" style="width:9rem"></ui5-step-input></div><div class="kv"><ui5-label>Total</ui5-label><ui5-title level="H5" size="H5" id="tot">${A.price}</ui5-title></div><ui5-button design="Emphasized" class="wide" id="addCart">Add to Shopping Cart</ui5-button><ui5-button class="wide">Proceed to Checkout</ui5-button></div></ui5-card></div>
  <div class="actions"><ui5-button data-go="compare">Back to Results</ui5-button></div></div>`, 'flush');
  const qty = document.getElementById('qty');
  qty.addEventListener('change', () => { const n = qty.value; document.getElementById('tot').textContent = '$' + (n * A.unit).toLocaleString('en-US', { minimumFractionDigits: 2 }); document.getElementById('reqT').textContent = `Add to Requisition (${n} units)`; });
  document.getElementById('addCart').onclick = () => toast('Added to shopping cart.');
};

V.teamgoals = () => {
  setApp('sf'); const G = D.goals; search.value = 'Draft goals for product design team';
  const st = s => s === 'On Track' ? 'Positive' : s === 'At Risk' ? 'Negative' : 'Critical';
  page(`${band('sf', G.title, G.meta)}<div class="pad"><ui5-card><div class="cpad"><ui5-title level="H5" size="H5">Goals (${G.items.length})</ui5-title>
  <ui5-list separators="Inner" id="gl">${G.items.map(([t, d, p, s], i) => `<ui5-li-custom type="Active" data-i="${i}"><div class="goal"><div class="gtext"><ui5-title level="H6" size="H6">${esc(t)}</ui5-title><ui5-label>${esc(d)}</ui5-label><ui5-progress-indicator value="${p}" display-value="${p}%"></ui5-progress-indicator></div><ui5-tag design="${st(s)}">${s}</ui5-tag></div></ui5-li-custom>`).join('')}</ui5-list></div></ui5-card></div>`, 'flush');
  document.getElementById('gl').addEventListener('item-click', () => go('goaldraft'));
};
V.goaldraft = () => {
  setApp('sf'); const g = D.goals.draft;
  page(`${band('sf', 'Edit Goal', 'Alex Johnson · Q2 2026')}<div class="pad narrow"><ui5-card><div class="cpad"><ui5-title level="H5" size="H5">Goal Details</ui5-title>
    <div class="kv"><ui5-label for="gn" required>Goal Name</ui5-label><ui5-input id="gn" value="${esc(g.name)}"></ui5-input></div>
    <div class="kv"><ui5-label for="gd">Description</ui5-label><ui5-textarea id="gd" value="${esc(g.description)}" rows="3"></ui5-textarea></div>
    <div class="grid2"><div class="kv"><ui5-label for="gt">Target Date</ui5-label><ui5-date-picker id="gt" value="2026-06-30" value-format="yyyy-MM-dd" display-format="long"></ui5-date-picker></div><div class="kv"><ui5-label for="gc">Category</ui5-label><ui5-select id="gc"><ui5-option selected>${esc(g.category)}</ui5-option><ui5-option>Customer Focus</ui5-option><ui5-option>People Development</ui5-option></ui5-select></div></div>
    <div class="kv"><ui5-label>Progress</ui5-label><ui5-progress-indicator value="${g.progress}" display-value="${g.progress}%"></ui5-progress-indicator></div>
    <div class="kv"><ui5-label for="gw">Weight</ui5-label><ui5-input id="gw" value="${esc(g.weight)}" style="width:8rem"></ui5-input></div>
    <div class="actions"><ui5-button design="Emphasized" id="saveD">Save Draft</ui5-button><ui5-button design="Emphasized" id="submitG">Submit for Approval</ui5-button><ui5-button data-go="teamgoals">Cancel</ui5-button></div></div></ui5-card></div>`, 'flush');
  document.getElementById('saveD').onclick = () => toast('Draft saved.');
  document.getElementById('submitG').onclick = () => { toast('Goal submitted for approval.'); setTimeout(() => go('teamgoals'), 700); };
};

// Fieldglass: AI search results for a natural-language question (Figma 6-61420 / 6-61503)
V.sow = (tab = 0, filter = 0) => {
  setApp('fieldglass'); const S = D.sow; search.value = S.query;
  const lists = [S.rows, S.rows.filter(r => r.risk === 'High'), S.rows.filter(r => S.upcoming.includes(r.id))];
  const tagRisk = { Low: ['Positive', 'sys-enter-2'], Medium: ['Critical', 'alert'], High: ['Negative', 'error'] };
  const tagStatus = { 'In Progress': 'Positive', Delayed: 'Critical', Completed: 'Positive', 'In Review': 'Information' };
  const row = (r) => `<li class="sowrow">
    <ui5-icon name="employee-lookup" class="sowic" aria-hidden="true"></ui5-icon>
    <div class="sowmain">
      <div class="sowhead"><ui5-link class="sowt" href="#sow" data-sow="${r.id}">CyberSecure – ${esc(r.title)}</ui5-link><ui5-tag design="Information" hide-state-icon>SOW ID ${r.id}</ui5-tag><ui5-tag design="Information" hide-state-icon>${tab === 1 ? `${r.risk} (${r.progress}%)` : `${r.progress}%`}</ui5-tag></div>
      <ui5-label class="sowref">${r.ref} • ${esc(r.unit)}</ui5-label>
      <ui5-text>${esc(r.desc)}</ui5-text>
      <div class="sowkv"><div><ui5-label>Owner</ui5-label><ui5-text>${esc(r.owner)}</ui5-text></div><div><ui5-label>End Date</ui5-label><ui5-text>${esc(r.end)}</ui5-text></div></div>
      <div class="sowtags"><ui5-tag design="${tagStatus[r.status] || 'Information'}" hide-state-icon>Status - ${r.status}</ui5-tag><ui5-tag design="${tagRisk[r.risk][0]}"><ui5-icon slot="icon" name="${tagRisk[r.risk][1]}"></ui5-icon>Risk Level - ${r.risk}</ui5-tag><ui5-tag design="Information" class="ainote"><ui5-icon slot="icon" name="ai"></ui5-icon>${esc(r.note)}</ui5-tag></div>
    </div>
    <div class="sowact">
      <ui5-button design="Emphasized" icon="employee">${r.employees} Employees</ui5-button>
      ${r.status !== 'Completed' && r.status !== 'In Review' ? '<ui5-button icon="add" class="addw">Add Worker</ui5-button>' : ''}
      ${tab === 1 || r.pending ? '<ui5-button class="pend">Pending Items</ui5-button>' : ''}
      <ui5-button design="Transparent" icon="bookmark-2" accessible-name="Bookmark" class="bm"></ui5-button>
      <ui5-button design="Transparent" icon="overflow" accessible-name="More actions"></ui5-button>
    </div></li>`;
  page(`<div class="sowtop"><div class="sowtopin"><ui5-title level="H2" size="H3" class="sowq">Search results for “${esc(S.question)}”</ui5-title>
    <div class="capsules sowfilters">${S.filters.map((f, i) => `<ui5-toggle-button class="pill" data-f="${i}" ${i === filter ? 'pressed' : ''}>${f}</ui5-toggle-button>`).join('')}</div></div></div>
    <div class="sowbody">
      <ui5-card class="aiov"><div class="cpad">
        <div class="row"><div class="aih"><ui5-icon name="ai" class="aiicon"></ui5-icon><ui5-title level="H3" size="H4">AI Overview</ui5-title></div><div class="aih"><ui5-link id="sources">Sources</ui5-link><ui5-button design="Transparent" icon="overflow" accessible-name="More"></ui5-button></div></div>
        <ui5-title level="H5" size="H5">SOW Summary</ui5-title>
        <ui5-text id="aisum" max-lines="2">${esc(S.summary)} ${esc(S.summaryMore)}</ui5-text>
        <div class="morewrap"><ui5-button design="Transparent" icon="slim-arrow-down" id="more">Show more</ui5-button></div>
      </div></ui5-card>
      <ui5-card class="sowres"><div class="sowreshead"><ui5-title level="H4" size="H5">Showing ${lists[tab].length} results</ui5-title><ui5-button end-icon="slim-arrow-down" id="sort">Sort by</ui5-button></div>
        <ui5-tabcontainer id="sowtabs" class="sowtabs" collapsed>${S.tabs.map((t, i) => `<ui5-tab text="${t.replace('{n}', lists[i].length)}" ${i === tab ? 'selected' : ''}></ui5-tab>`).join('')}</ui5-tabcontainer>
        <ul class="sowlist">${lists[tab].map(row).join('')}</ul></ui5-card>
    </div>`, 'flush');
  document.getElementById('sowtabs').addEventListener('tab-select', e => V.sow(e.detail.tabIndex, filter));
  app.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => V.sow(tab, +b.dataset.f)));
  const more = document.getElementById('more'), sum = document.getElementById('aisum');
  more.onclick = () => { const open = sum.maxLines === 2; sum.maxLines = open ? 0 : 2; more.textContent = open ? 'Show less' : 'Show more'; more.icon = open ? 'slim-arrow-up' : 'slim-arrow-down'; };
  document.getElementById('sources').onclick = () => toast('Sources: SAP Fieldglass · SOW records 1023–1172 · Supplier: CyberSecure Ltd');
  app.querySelectorAll('.addw').forEach(b => b.onclick = () => toast('Add Worker opens in SAP Fieldglass.'));
  app.querySelectorAll('.pend').forEach(b => b.onclick = () => toast('2 pending items: budget approval, timesheet sign-off.'));
  app.querySelectorAll('.bm').forEach(b => b.onclick = () => { b.icon = b.icon === 'bookmark-2' ? 'bookmark' : 'bookmark-2'; });
  app.querySelectorAll('[data-sow]').forEach(l => l.addEventListener('click', e => { e.preventDefault(); toast(`SOW ${l.dataset.sow} opens in SAP Fieldglass.`); }));
};

function go(r) { search.open = false; (V[r] || V.home)(); }
function toast(t) { const el = document.getElementById('toast'); el.textContent = t; el.open = true; }

// navigation
app.addEventListener('click', e => { const el = e.target.closest('[data-go]'); if (el) go(el.dataset.go); });
document.getElementById('brand').addEventListener('click', () => go({ s4: 'home', ariba: 'home', concur: 'travel', sf: 'goals', fieldglass: 'sow' }[ctx]));
const pop = document.getElementById('apps');
// The overflow (…) item in the shell bar opens the application switcher
document.getElementById('shellMore').addEventListener('click', e => { pop.opener = e.detail.targetRef; pop.open = true; });
document.getElementById('help').addEventListener('click', () => toast('Try: “Current status & end date of SOW IDs for CyberSecure Ltd”'));
pop.addEventListener('item-click', e => { pop.open = false; go(e.detail.item.dataset.go); });
const routes = ['home', 'capsules', 'po', 'travel', 'buy', 'goals', 'sow'];
const fromHash = () => { const h = location.hash.slice(1); go(h === 'po' ? 'results' : (routes.includes(h) ? h : 'home')); };
window.addEventListener('hashchange', fromHash);
fromHash();
