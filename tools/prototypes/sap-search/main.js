// SAP AI-Powered Search prototype — built only with SAP UI5 Web Components (Fiori, Horizon theme).
import { registerLocaleDataLoader } from '@ui5/webcomponents-base/dist/asset-registries/LocaleData.js';
import cldrEn from '@ui5/webcomponents-localization/dist/generated/assets/cldr/en.json';
registerLocaleDataLoader('en', async () => cldrEn);
import '@ui5/webcomponents-fiori/dist/ShellBar.js';
import '@ui5/webcomponents-fiori/dist/ShellBarBranding.js';
import '@ui5/webcomponents-fiori/dist/ShellBarSearch.js';
import '@ui5/webcomponents-fiori/dist/SearchItem.js';
import '@ui5/webcomponents-fiori/dist/SearchItemGroup.js';
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
import '@ui5/webcomponents/dist/MessageStrip.js';
import '@ui5/webcomponents/dist/BusyIndicator.js';
import '@ui5/webcomponents/dist/Breadcrumbs.js';
import '@ui5/webcomponents/dist/BreadcrumbsItem.js';
import '@ui5/webcomponents/dist/ProgressIndicator.js';
import '@ui5/webcomponents/dist/StepInput.js';
import '@ui5/webcomponents/dist/Input.js';
import '@ui5/webcomponents/dist/TextArea.js';
import '@ui5/webcomponents/dist/Select.js';
import '@ui5/webcomponents/dist/Option.js';
import '@ui5/webcomponents/dist/DatePicker.js';
import '@ui5/webcomponents/dist/SegmentedButton.js';
import '@ui5/webcomponents/dist/SegmentedButtonItem.js';
import '@ui5/webcomponents/dist/Toast.js';
import '@ui5/webcomponents/dist/Icon.js';
import '@ui5/webcomponents/dist/Link.js';
import '@ui5/webcomponents-icons/dist/add-document.js';
import '@ui5/webcomponents-icons/dist/approvals.js';
import '@ui5/webcomponents-icons/dist/business-objects-experience.js';
import '@ui5/webcomponents-icons/dist/compare.js';
import '@ui5/webcomponents-icons/dist/sales-order.js';
import '@ui5/webcomponents-icons/dist/flight.js';
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/employee.js';
import '@ui5/webcomponents-icons/dist/building.js';
import '@ui5/webcomponents-icons/dist/iphone.js';
import '@ui5/webcomponents-icons/dist/goal.js';
import '@ui5/webcomponents-icons/dist/ai.js';
import '@ui5/webcomponents-icons/dist/search.js';
import '@ui5/webcomponents-icons/dist/bell.js';
import '@ui5/webcomponents-icons/dist/action.js';
import '@ui5/webcomponents-icons/dist/nav-back.js';
import '@ui5/webcomponents-icons/dist/list.js';
import '@ui5/webcomponents-icons/dist/grid.js';
import '@ui5/webcomponents-icons/dist/decline.js';
import '@ui5/webcomponents-icons/dist/accept.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/message-information.js';
import '@ui5/webcomponents-icons/dist/travel-request.js';
import '@ui5/webcomponents-icons/dist/home.js';
import '@ui5/webcomponents-icons/dist/slim-arrow-right.js';
import '@ui5/webcomponents-icons/dist/filter.js';
import '@ui5/webcomponents-icons/dist/sort.js';
import * as D from './data.js';

const app = document.getElementById('app');
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const search = document.getElementById('search');
let route = 'home';

// ── Search field: type-ahead + AI suggestions ─────────────────────────────
function renderSuggestions(value) {
  const v = value.trim().toLowerCase();
  search.innerHTML = '';
  if (!v) {
    const g = document.createElement('ui5-search-item-group'); g.headerText = 'Suggestions';
    D.homeSuggestions.forEach(s => { const it = document.createElement('ui5-search-item'); it.text = s.text; it.icon = s.icon; it.dataset.route = 'po'; g.appendChild(it); });
    search.appendChild(g);
    const a = document.createElement('ui5-search-item-group'); a.headerText = '✦ Try AI search';
    D.scenarios.forEach(s => { const it = document.createElement('ui5-search-item'); it.text = s.query; it.description = s.title; it.icon = 'ai'; it.dataset.route = s.id; a.appendChild(it); });
    search.appendChild(a);
    return;
  }
  const hits = D.typeahead.filter(t => t.text.toLowerCase().includes(v) || v.split(/\s+/).some(w => w.length > 2 && t.text.toLowerCase().includes(w)));
  const g = document.createElement('ui5-search-item-group'); g.headerText = 'Suggestions';
  (hits.length ? hits : D.typeahead.slice(0, 3)).slice(0, 6).forEach(t => { const it = document.createElement('ui5-search-item'); it.text = t.text; it.description = t.description; it.icon = t.icon; it.highlightText = value; it.dataset.route = t.route; g.appendChild(it); });
  search.appendChild(g);
}
function routeFor(q) {
  const v = q.toLowerCase();
  if (/flight|travel|bangalore|blr|hotel|trip/.test(v)) return 'travel';
  if (/iphone|device|laptop|buy|catalog|ariba|compare/.test(v)) return 'buy';
  if (/goal|alex|team|performance|successfactors/.test(v)) return 'goals';
  return 'po';
}
search.addEventListener('input', () => renderSuggestions(search.value));
search.addEventListener('open', () => renderSuggestions(search.value || ''));
search.addEventListener('search', e => {
  const item = e.detail && e.detail.item;
  const q = item ? item.text : search.value;
  if (!q) return;
  search.value = q;
  go(item && item.dataset.route ? item.dataset.route : routeFor(q), q);
});
renderSuggestions('');

// ── Views ─────────────────────────────────────────────────────────────────
const Q = { po: 'purchase orders', travel: 'flight to Bangalore', buy: 'iPhone 17 Pro', goals: 'Alex Johnson goals' };
function go(r, q) { route = r; if (Q[r]) search.value = q || Q[r]; window.scrollTo(0, 0); ({ home, po, travel, buy, goals, concur, ariba, goalEdit, concurReady, aribaReady })[r](q); }
const backBtn = (to = 'home') => `<ui5-button design="Transparent" icon="nav-back" data-go="${to}" accessible-name="Back"></ui5-button>`;
const page = (inner) => { app.innerHTML = `<div class="page">${inner}</div>`; };

function home() {
  search.value = '';
  page(`<div class="hero"><ui5-title level="H2" size="H2">Good morning, ${esc(D.user.name)}</ui5-title><ui5-text>What would you like to do today? Use the search in the shell bar, or start from one of these.</ui5-text></div>
  <ui5-title level="H5" size="H5" class="sec">Quick Access</ui5-title>
  <div class="cards">${D.scenarios.map(s => `<ui5-card class="tile" data-go="${s.id}" data-q="${esc(s.query)}"><ui5-card-header slot="header" title-text="${esc(s.title)}" subtitle-text="${esc(s.subtitle)}" interactive><ui5-icon name="${s.icon}" slot="avatar"></ui5-icon></ui5-card-header><div class="tile-body"><ui5-icon name="ai" class="ai"></ui5-icon><ui5-text>“${esc(s.query)}”</ui5-text></div></ui5-card>`).join('')}</div>
  <ui5-title level="H5" size="H5" class="sec">Suggestions</ui5-title>
  <ui5-list class="box">${D.homeSuggestions.map(s => `<ui5-li icon="${s.icon}" type="Active" data-go="po">${esc(s.text)}</ui5-li>`).join('')}</ui5-list>`);
}

function po() {
  const R = D.poResults;
  app.innerHTML = `<ui5-flexible-column-layout id="fcl" layout="OneColumn">
    <div slot="startColumn" class="page">
      <div class="head">${backBtn()}<div><ui5-title level="H3" size="H3">${R.title}</ui5-title><ui5-label>${R.meta}</ui5-label></div></div>
      <div class="capsules"><ui5-tag design="Information" class="aitag"><ui5-icon name="ai" slot="icon"></ui5-icon>AI Suggested</ui5-tag>${D.aiCapsules.map((c, i) => `<ui5-toggle-button ${i === 2 ? 'pressed' : ''}>${c}</ui5-toggle-button>`).join('')}</div>
      <div class="toolbar"><ui5-tabcontainer id="tabs" class="tabs">${R.tabs.map(([t, n], i) => `<ui5-tab text="${t}" ${n !== null ? `additional-text="${n}"` : ''} ${i === 0 ? 'selected' : ''}></ui5-tab>`).join('')}</ui5-tabcontainer>
        <ui5-segmented-button id="view" accessible-name="View"><ui5-segmented-button-item icon="list" selected tooltip="List"></ui5-segmented-button-item><ui5-segmented-button-item icon="grid" tooltip="Cards"></ui5-segmented-button-item></ui5-segmented-button></div>
      <div id="results"></div>
    </div>
    <div slot="midColumn" id="detail" class="page"></div>
  </ui5-flexible-column-layout>`;
  const list = () => `<ui5-list class="box" id="rl">${R.rows.map((r, i) => `<ui5-li type="Active" icon="sales-order" description="${esc(r.vendor)} · ${esc(r.createdOn)}" additional-text="${esc(r.amount)}" additional-text-state="${r.status === 'Overdue' ? 'Negative' : r.status === 'Open' ? 'Information' : 'Critical'}" data-i="${i}">${esc(r.title)}</ui5-li>`).join('')}</ui5-list>`;
  const cards = () => `<div class="cards">${R.rows.map((r, i) => `<ui5-card class="tile" data-i="${i}"><ui5-card-header slot="header" title-text="${esc(r.title)}" subtitle-text="${esc(r.vendor)}" additional-text="${esc(r.status)}" interactive></ui5-card-header><div class="tile-body col"><ui5-title level="H4" size="H4">${esc(r.amount)}</ui5-title><ui5-label>Created ${esc(r.createdOn)} by ${esc(r.createdBy)}</ui5-label></div></ui5-card>`).join('')}</div>`;
  const res = document.getElementById('results'); res.innerHTML = list();
  document.getElementById('view').addEventListener('selection-change', e => { res.innerHTML = e.detail.selectedItems[0].icon === 'grid' ? cards() : list(); });
  res.addEventListener('click', e => { const el = e.target.closest('[data-i]'); if (el) showPO(R.rows[+el.dataset.i]); });
  res.addEventListener('item-click', e => { const el = e.detail.item; if (el && el.dataset.i) showPO(R.rows[+el.dataset.i]); });
}
function showPO(r) {
  const d = document.getElementById('detail');
  d.innerHTML = `<div class="head">${'<ui5-button design="Transparent" icon="decline" id="closeD" accessible-name="Close"></ui5-button>'}<div><ui5-title level="H4" size="H4">${esc(r.title)}</ui5-title><ui5-tag design="${r.status === 'Overdue' ? 'Negative' : r.status === 'Open' ? 'Information' : 'Critical'}">${esc(r.status)}</ui5-tag></div></div>
    <div class="form">${[['Vendor', r.vendor], ['Created By', r.createdBy], ['Created On', r.createdOn], ['Net Amount', r.amount], ['Currency', r.currency], ['Company Code', r.companyCode]].map(([l, v]) => `<div class="pair"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div>
    <div class="actions"><ui5-button design="Emphasized">Approve</ui5-button><ui5-button>Open in S/4HANA</ui5-button></div>`;
  document.getElementById('fcl').layout = 'TwoColumnsStartExpanded';
  document.getElementById('closeD').onclick = () => { document.getElementById('fcl').layout = 'OneColumn'; };
}

function travel() {
  const T = D.travel;
  page(`<div class="head">${backBtn()}<div><ui5-title level="H3" size="H3">Flights</ui5-title><ui5-label>${esc(T.meta)}</ui5-label></div></div>
  <ui5-message-strip design="Information" hide-close-button class="insight"><ui5-icon name="ai" slot="icon"></ui5-icon><b>AI Insight:</b> ${esc(T.insight)}</ui5-message-strip>
  <ui5-list class="box">${T.flights.map(f => `<ui5-li type="Active" icon="flight" description="${esc(f.airline)} · ${esc(f.stops)}" additional-text="${esc(f.fare)}" additional-text-state="${f.preferred ? 'Positive' : 'None'}" data-go="concur">${esc(f.code)} · ${esc(f.dep)} → ${esc(f.arr)}${f.preferred ? ' · Preferred' : ''}</ui5-li>`).join('')}</ui5-list>
  <div class="actions"><ui5-button design="Emphasized" icon="action" data-go="concur">Book EK237 in SAP Concur</ui5-button></div>`);
}
function handoff(product, text, next) {
  page(`<div class="handoff"><div class="mark">${product[0]}</div><ui5-title level="H4" size="H4">SAP ${product}</ui5-title><ui5-busy-indicator active size="M"></ui5-busy-indicator><ui5-label>${text}</ui5-label></div>`);
  setTimeout(() => go(next), 1400);
}
function concur(q) {
  if (!q || q !== 'ready') return handoff('Concur', 'Opening your booking...', 'concurReady');
}
function concurReady() {
  const B = D.travel.booking;
  page(`<div class="head">${backBtn('travel')}<div><ui5-title level="H3" size="H3">${esc(B.title)}</ui5-title></div></div>
  <ui5-breadcrumbs>${B.crumbs.map(c => `<ui5-breadcrumbs-item>${esc(c)}</ui5-breadcrumbs-item>`).join('')}</ui5-breadcrumbs>
  <div class="split"><ui5-card><ui5-card-header slot="header" title-text="${esc(B.flight)}"><ui5-icon name="flight" slot="avatar"></ui5-icon></ui5-card-header><div class="form pad">${B.details.map(([l, v]) => `<div class="pair"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}<ui5-tag design="Positive"><ui5-icon name="accept" slot="icon"></ui5-icon>Compliant with policy</ui5-tag></div></ui5-card>
  <ui5-card><ui5-card-header slot="header" title-text="Booking Summary"></ui5-card-header><div class="form pad">${B.summary.map(([l, v]) => `<div class="pair"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}<div class="pair total"><ui5-label>Total</ui5-label><ui5-title level="H4" size="H4">${B.total}</ui5-title></div><ui5-button design="Emphasized" id="bookBtn">Book flight</ui5-button></div></ui5-card></div>`);
  document.getElementById('bookBtn').onclick = () => toast('Flight booked. Confirmation sent to Maria Schmidt.');
}

function buy() {
  const P = D.procurement;
  page(`<div class="head">${backBtn()}<div><ui5-title level="H3" size="H3">${esc(P.title)}</ui5-title><ui5-label>${P.meta}</ui5-label></div></div>
  <ui5-card class="cmp"><ui5-card-header slot="header" title-text="${esc(P.aiTitle)}"><ui5-icon name="ai" slot="avatar"></ui5-icon></ui5-card-header>
    <div class="tw"><table class="spec"><thead><tr><th></th>${P.products.map(p => `<th>${esc(p)}</th>`).join('')}</tr></thead><tbody>${P.rows.map(r => `<tr><th scope="row">${esc(r[0])}</th>${r.slice(1).map(v => `<td>${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table></div></ui5-card>
  <div class="cards">${P.products.map((p, i) => `<ui5-card class="tile"><ui5-card-header slot="header" title-text="${esc(p)}" subtitle-text="Apple · Catalog item"><ui5-icon name="iphone" slot="avatar"></ui5-icon></ui5-card-header><div class="tile-body col">${i === 1 ? '<ui5-tag design="Positive">Preferred contract</ui5-tag><ui5-button design="Emphasized" data-go="ariba">Order via SAP Ariba</ui5-button>' : '<ui5-button data-go="ariba">Order via SAP Ariba</ui5-button>'}</div></ui5-card>`).join('')}</div>`);
}
function ariba(q) { if (q !== 'ready') return handoff('Ariba', 'Opening procurement catalog...', 'aribaReady'); }
function aribaReady() {
  const A = D.procurement.ariba;
  page(`<div class="head">${backBtn('buy')}<div><ui5-title level="H3" size="H3">${esc(A.title)}</ui5-title></div></div>
  <ui5-breadcrumbs>${A.crumbs.map(c => `<ui5-breadcrumbs-item>${esc(c)}</ui5-breadcrumbs-item>`).join('')}</ui5-breadcrumbs>
  <div class="split"><ui5-card><ui5-card-header slot="header" title-text="iPhone 17 Pro" subtitle-text="${esc(A.product)}"><ui5-icon name="iphone" slot="avatar"></ui5-icon></ui5-card-header><div class="form pad">${A.details.map(([l, v]) => `<div class="pair"><ui5-label>${l}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div></ui5-card>
  <ui5-card><ui5-card-header slot="header" title-text="Requisition"></ui5-card-header><div class="form pad"><div class="pair"><ui5-label for="qty">Quantity</ui5-label><ui5-step-input style="width:12rem" id="qty" value="${A.qty}" min="1" max="500"></ui5-step-input></div><div class="pair total"><ui5-label>Total</ui5-label><ui5-title level="H4" size="H4" id="tot">${A.price}</ui5-title></div><ui5-button design="Emphasized" id="addReq">Add to Requisition (${A.qty} units)</ui5-button></div></ui5-card></div>`);
  const qty = document.getElementById('qty');
  qty.addEventListener('change', () => { const n = qty.value; document.getElementById('tot').textContent = '$' + (n * A.unit).toLocaleString('en-US', { minimumFractionDigits: 2 }); document.getElementById('addReq').textContent = `Add to Requisition (${n} units)`; });
  document.getElementById('addReq').onclick = () => toast('Added to requisition. Sent for approval.');
}

function goals() {
  const G = D.goals;
  const st = s => s === 'On Track' ? 'Positive' : s === 'At Risk' ? 'Negative' : 'Information';
  page(`<div class="head">${backBtn()}<div><ui5-title level="H3" size="H3">${esc(G.title)}</ui5-title><ui5-label>${esc(G.meta)}</ui5-label></div></div>
  <ui5-title level="H5" size="H5" class="sec">Goals (${G.items.length})</ui5-title>
  <div class="goals">${G.items.map(([t, d, p, s], i) => `<ui5-card class="goal" data-go="goalEdit" data-i="${i}"><div class="pad col"><div class="row"><ui5-title level="H5" size="H5">${esc(t)}</ui5-title><ui5-tag design="${st(s)}">${s}</ui5-tag></div><ui5-text>${esc(d)}</ui5-text><ui5-progress-indicator value="${p}" value-state="${st(s)}"></ui5-progress-indicator></div></ui5-card>`).join('')}</div>`);
}
function goalEdit() {
  const g = D.goals.draft;
  page(`<div class="head">${backBtn('goals')}<div><ui5-title level="H3" size="H3">Edit Goal</ui5-title><ui5-label>Alex Johnson · Q2 2026</ui5-label></div></div>
  <ui5-card><ui5-card-header slot="header" title-text="Goal Details"></ui5-card-header><div class="form pad">
    <div class="pair"><ui5-label for="gn" required show-colon>Goal Name</ui5-label><ui5-input id="gn" value="${esc(g.name)}"></ui5-input></div>
    <div class="pair"><ui5-label for="gd" show-colon>Description</ui5-label><ui5-textarea id="gd" value="${esc(g.description)}" rows="3"></ui5-textarea></div>
    <div class="pair"><ui5-label for="gt" show-colon>Target Date</ui5-label><ui5-date-picker id="gt" value="2026-06-30" value-format="yyyy-MM-dd" display-format="long"></ui5-date-picker></div>
    <div class="pair"><ui5-label for="gc" show-colon>Category</ui5-label><ui5-select id="gc"><ui5-option selected>${esc(g.category)}</ui5-option><ui5-option>Customer Focus</ui5-option><ui5-option>People Development</ui5-option></ui5-select></div>
    <div class="pair"><ui5-label show-colon>Progress</ui5-label><ui5-progress-indicator value="${g.progress}"></ui5-progress-indicator></div>
    <div class="pair"><ui5-label for="gw" show-colon>Weight</ui5-label><ui5-input id="gw" value="${esc(g.weight)}"></ui5-input></div>
    <div class="actions"><ui5-button design="Emphasized" id="saveG">Save</ui5-button><ui5-button design="Transparent" data-go="goals">Cancel</ui5-button></div></div></ui5-card>`);
  document.getElementById('saveG').onclick = () => { toast('Goal saved.'); setTimeout(() => go('goals'), 600); };
}
function toast(t) { const el = document.getElementById('toast'); el.textContent = t; el.open = true; }

// delegated navigation
app.addEventListener('click', e => {
  const el = e.target.closest('[data-go]'); if (!el) return;
  if (el.dataset.q) search.value = el.dataset.q;
  go(el.dataset.go, el.dataset.q);
});
app.addEventListener('item-click', e => { const el = e.detail.item; if (el && el.dataset.go) go(el.dataset.go); });
document.getElementById('shell').addEventListener('logo-click', () => go('home'));
document.getElementById('brand').addEventListener('click', () => go('home'));

const start = (location.hash || '').slice(1);
go(['po', 'travel', 'buy', 'goals'].includes(start) ? start : 'home');
window.addEventListener('hashchange', () => { const h = location.hash.slice(1); if (['po', 'travel', 'buy', 'goals', 'home'].includes(h)) go(h); });
