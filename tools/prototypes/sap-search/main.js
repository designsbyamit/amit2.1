// AI-Powered Search prototype — built only with UI5 Web Components (Fiori, Horizon theme).
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
import '@ui5/webcomponents-icons/dist/paper-plane.js';
import '@ui5/webcomponents-icons/dist/cart.js';
import '@ui5/webcomponents-icons/dist/email.js';
import '@ui5/webcomponents-icons/dist/edit.js';
import '@ui5/webcomponents-icons/dist/goal.js';
import '@ui5/webcomponents-icons/dist/flight.js';
import '@ui5/webcomponents-icons/dist/sales-order.js';
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
// Same behaviour as the case-study animation: on focus, "Recent searches" + "Suggested for you";
// once typing starts, one "Suggestions" group across every product, matches in bold,
// source application on the right. Enter or click opens the unified results page.
function listFor(v) {
  v = v.trim().toLowerCase();
  if (!v) return null;
  let L;
  if (/^cu|current/.test(v)) return { items: D.current.filter(([t]) => t.toLowerCase().includes(v)).length ? D.current.filter(([t]) => t.toLowerCase().includes(v)) : D.current };
  if (/sow|cyber|fieldglass|supplier|end date/.test(v)) L = D.typeahead.sow;
  else if (/^pur/.test(v) && v.length < 5) L = D.typeahead.pur;
  else if (/^purch|po\b|invoice/.test(v)) L = D.typeahead.purchase;
  else if (/flight|trip|bangalore|palo|travel/.test(v)) L = D.typeahead.flight;
  else if (/laptop|iphone|device|compare|differ/.test(v)) L = D.typeahead.laptop;
  else if (/goal|okr|draft|team|performance/.test(v)) L = D.typeahead.goals;
  else L = D.typeahead.pur;
  return { items: L.items.map(t => [t, L.app, L.route]) };
}
let lastKey = '';
const sugItem = ([t, app, route]) => { const it = document.createElement('ui5-suggestion-item'); it.text = t; it.additionalText = app; it.dataset.route = route; return it; };
const sugGroup = (title, items) => { const g = document.createElement('ui5-suggestion-item-group'); g.headerText = title; items.forEach(i => g.appendChild(sugItem(i))); return g; };
function renderSuggestions() {
  const L = listFor(search.value || '');
  const key = L ? L.items.map(i => i[0]).join('|') : '__open';
  if (key === lastKey) return;
  lastKey = key;
  search.querySelectorAll('ui5-suggestion-item, ui5-suggestion-item-group').forEach(n => n.remove());
  if (L) search.appendChild(sugGroup('Suggestions', L.items));
  else { search.appendChild(sugGroup('Recent searches', D.recent)); search.appendChild(sugGroup('Suggested for you', D.suggested)); }
}
function pick(text, route) { search.value = text; search.open = false; search.blur?.(); go(routeAfterPick(route)); }
search.addEventListener('input', renderSuggestions);
search.addEventListener('focusin', () => { renderSuggestions(); if (!search.value) search.open = true; });
// selection-change fires while arrowing through the list (preview); only commit on change (click or Enter)
search.addEventListener('change', () => { const q = (search.value || '').trim(); const hit = [...search.querySelectorAll('ui5-suggestion-item')].find(i => i.text === q); if (hit) pick(q, hit.dataset.route); });
search.addEventListener('keydown', e => {
  if (e.key !== 'Enter') return;
  setTimeout(() => {
    const q = (search.value || '').trim(); if (!q) return;
    const hit = [...search.querySelectorAll('ui5-suggestion-item')].find(i => i.text === q);
    if (hit) return pick(q, hit.dataset.route);
    const L = listFor(q); pick(q, L ? L.items[0][2] : 'po');
  }, 0);
});
const routeAfterPick = r => ({ po: 'po', travel: 'flights', buy: 'compare', goals: 'teamgoals', sow: 'sow' }[r] || r);
// UI5 2.27: arrow-key preview can leave typedInValue undefined before onAfterRendering reads it
customElements.whenDefined('ui5-input').then(() => { const o = search.onAfterRendering; search.onAfterRendering = function (...a) { if (this.typedInValue == null) this.typedInValue = ''; return o.apply(this, a); }; });
renderSuggestions();

// ── Views ────────────────────────────────────────────────────────────────
const V = {};
V.home = () => { setApp('s4'); search.value = ''; page(`<div class="hero"><ui5-title level="H2" size="H2">${D.home.greeting}</ui5-title><ui5-text>${D.home.sub}</ui5-text></div><div class="cards">${D.home.cards.map(c => card(c, c[3] === 'buy' ? 'compare' : 'po')).join('')}</div>`); };

const appHome = (H, typeHint) => { setApp(H.app); search.value = ''; page(`<div class="hero"><ui5-title level="H3" size="H3">${H.title}</ui5-title><ui5-text>${H.sub}</ui5-text><ui5-label class="hint"><ui5-icon name="ai"></ui5-icon> Try searching: “${typeHint}”</ui5-label></div><div class="cards c3">${H.cards.map(c => card(c, null)).join('')}</div>`); };
V.travel = () => appHome(D.travel.home, 'flight to Bangalore');
V.buy = () => appHome(D.procurement.home, 'laptop');
V.goals = () => appHome(D.goals.home, 'Draft goals for product design team');

function handoff(name, text, next) {
  const d = document.getElementById('handoff');
  d.querySelector('.mk').textContent = name[0]; d.querySelector('.hn').textContent = name; d.querySelector('.ht').textContent = text;
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

// ── One results page for every product (structure of Figma 6-61420 / 6-61503) ──
V.res = (key, tab = 0, filter = 0) => {
  const S = D.resultSets[key]; setApp(S.app); search.value = S.query; lastKey = '';
  const lists = S.tabs.map((_, i) => i === 0 ? S.rows : S.rows.filter(r => r.tabs.includes(i)));
  const shown = lists[tab];
  const row = (r, ri) => `<li class="sowrow">
    <ui5-icon name="${S.icon}" class="sowic" aria-hidden="true"></ui5-icon>
    <div class="sowmain">
      <div class="sowhead"><ui5-link class="sowt" data-open="${ri}">${esc(r.title)}</ui5-link>${r.ids.map(t => `<ui5-tag design="Information" hide-state-icon>${esc(t)}</ui5-tag>`).join('')}</div>
      <ui5-label class="sowref">${esc(r.ref)}</ui5-label>
      <ui5-text>${esc(r.desc)}</ui5-text>
      <div class="sowkv">${r.kv.map(([l, v]) => `<div><ui5-label>${esc(l)}</ui5-label><ui5-text>${esc(v)}</ui5-text></div>`).join('')}</div>
      <div class="sowtags"><ui5-tag design="${r.status[1]}" hide-state-icon>Status - ${esc(r.status[0])}</ui5-tag>${r.level ? `<ui5-tag design="${r.level[1]}"><ui5-icon slot="icon" name="${r.level[2]}"></ui5-icon>${esc(r.level[0])}</ui5-tag>` : ''}<ui5-tag design="Information" class="ainote"><ui5-icon slot="icon" name="ai"></ui5-icon>${esc(r.note)}</ui5-tag></div>
    </div>
    <div class="sowact">
      ${r.actions.map(([t, design, icon, next], ai) => `<ui5-button design="${design}" ${icon ? `icon="${icon}"` : ''} data-act="${ri}:${ai}">${esc(t)}</ui5-button>`).join('')}
      <ui5-button design="Transparent" icon="bookmark-2" accessible-name="Bookmark" class="bm"></ui5-button>
      <ui5-button design="Transparent" icon="overflow" accessible-name="More actions"></ui5-button>
    </div></li>`;
  page(`<div class="sowtop"><div class="sowtopin"><ui5-title level="H2" size="H3" class="sowq">Search results for “${esc(S.question)}”</ui5-title>
    <div class="capsules sowfilters">${S.filters.map((f, i) => `<ui5-toggle-button class="pill" data-f="${i}" ${i === filter ? 'pressed' : ''}>${f}</ui5-toggle-button>`).join('')}</div></div></div>
    <div class="sowbody">
      <ui5-card class="aiov"><div class="cpad">
        <div class="row"><div class="aih"><ui5-icon name="ai" class="aiicon"></ui5-icon><ui5-title level="H3" size="H4">AI Overview</ui5-title></div><div class="aih"><ui5-link id="sources">Sources</ui5-link><ui5-button design="Transparent" icon="overflow" accessible-name="More"></ui5-button></div></div>
        <ui5-title level="H5" size="H5">${esc(S.summaryTitle)}</ui5-title>
        <ui5-text id="aisum" max-lines="2">${esc(S.summary)} ${esc(S.more)}</ui5-text>
        <div class="morewrap"><ui5-button design="Transparent" icon="slim-arrow-down" id="more">Show more</ui5-button></div>
      </div></ui5-card>
      <ui5-card class="sowres"><div class="sowreshead"><ui5-title level="H4" size="H5">Showing ${tab === 0 && S.total > shown.length ? `${shown.length} of ${S.total}` : shown.length} results</ui5-title><ui5-button end-icon="slim-arrow-down" id="sort">Sort by</ui5-button></div>
        <ui5-tabcontainer id="sowtabs" class="sowtabs" collapsed>${S.tabs.map((t, i) => `<ui5-tab text="${t.replace('{n}', lists[i].length)}" ${i === tab ? 'selected' : ''}></ui5-tab>`).join('')}</ui5-tabcontainer>
        <ul class="sowlist">${shown.map(r => row(r, S.rows.indexOf(r))).join('')}</ul></ui5-card>
    </div>`, 'flush');
  document.getElementById('sowtabs').addEventListener('tab-select', e => V.res(key, e.detail.tabIndex, filter));
  app.querySelectorAll('[data-f]').forEach(b => b.addEventListener('click', () => V.res(key, tab, +b.dataset.f)));
  const more = document.getElementById('more'), sum = document.getElementById('aisum');
  more.onclick = () => { const open = sum.maxLines === 2; sum.maxLines = open ? 0 : 2; more.textContent = open ? 'Show less' : 'Show more'; more.icon = open ? 'slim-arrow-up' : 'slim-arrow-down'; };
  document.getElementById('sources').onclick = () => toast(`Sources: ${D.apps[S.app]} · ${S.total} records`);
  app.querySelectorAll('.bm').forEach(b => b.onclick = () => { b.icon = b.icon === 'bookmark-2' ? 'bookmark' : 'bookmark-2'; });
  app.querySelectorAll('[data-open]').forEach(l => l.addEventListener('click', () => toast(`Opens in ${D.apps[S.app]}.`)));
  app.querySelectorAll('[data-act]').forEach(b => b.addEventListener('click', () => {
    const [ri, ai] = b.dataset.act.split(':').map(Number); const [t, , , next] = S.rows[ri].actions[ai];
    if (next === 'concur') handoff('Concur', 'Opening your booking...', 'booking');
    else if (next === 'ariba') handoff('Ariba', 'Opening procurement catalog...', 'ariba');
    else if (next) go(next);
    else toast(`${t}: opens in ${D.apps[S.app]}.`);
  }));
};
V.po = () => V.res('po');
V.results = V.po; V.capsules = V.po;
V.flights = () => V.res('travel');
V.compare = () => V.res('buy');
V.teamgoals = () => V.res('goals');
V.sow = () => V.res('sow');

function go(r) { search.open = false; (V[r] || V.home)(); }
function toast(t) { const el = document.getElementById('toast'); el.textContent = t; el.open = true; }

// navigation
app.addEventListener('click', e => { const el = e.target.closest('[data-go]'); if (el) go(el.dataset.go); });
document.getElementById('brand').addEventListener('click', () => go({ s4: 'home', ariba: 'home', concur: 'travel', sf: 'goals', fieldglass: 'sow' }[ctx]));
document.getElementById('shellMore').addEventListener('click', () => toast('More options'));
document.getElementById('help').addEventListener('click', () => toast('Try: “Current status & end date of SOW IDs for CyberSecure Ltd”'));
const routes = ['home', 'capsules', 'po', 'travel', 'buy', 'goals', 'sow', 'flights', 'compare', 'teamgoals'];
const fromHash = () => { const h = location.hash.slice(1); go(routes.includes(h) ? h : 'home'); };
window.addEventListener('hashchange', fromHash);
fromHash();
