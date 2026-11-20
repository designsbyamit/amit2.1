/* Supplier Order Assistant, Tervana: an interactive prototype. One order, four people, three gates. */
const MARK=(s=28)=>`<svg width="${s}" height="${s}" viewBox="0 0 100 100" aria-hidden="true"><defs><linearGradient id="tv${s}" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#6B4CF0"/><stop offset="1" stop-color="#3D2AB8"/></linearGradient></defs><rect x="4" y="4" width="92" height="92" rx="26" fill="url(#tv${s})"/><path d="M27 33h46M50 33v38" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle cx="73" cy="70" r="7" fill="#9EF0DA"/></svg>`
const CO='Tervana',APP='Supplier Order Assistant'
const SP=`<svg class="spark" viewBox="0 0 16 16"><defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7C5CFF"/><stop offset="1" stop-color="#22C7E8"/></linearGradient></defs><path fill="url(#g)" d="M8 0l1.7 5.1L15 7l-5.3 1.9L8 14l-1.7-5.1L1 7l5.3-1.9z"/></svg>`
const I={bell:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 14V9a5 5 0 0110 0v5l1.5 1.5h-13zM8.5 17.5h3"/></svg>`,help:`<svg viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="7.5"/><path d="M8 8a2 2 0 113 1.7c-.7.4-1 .8-1 1.6M10 14v.2"/></svg>`,send:`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M14 2L7 9M14 2l-4.5 12-2.5-5-5-2.5z"/></svg>`,search:`<svg viewBox="0 0 16 16" width="15" height="15" fill="none" stroke="#666A74" stroke-width="1.5"><circle cx="7" cy="7" r="4.5"/><path d="M10.5 10.5L14 14"/></svg>`,check:`<svg viewBox="0 0 10 10" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.7"><path d="M2 5.2l2 2 4-4.4"/></svg>`,x:`<svg viewBox="0 0 16 16" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 4l8 8M12 4l-8 8"/></svg>`,xs:`<svg viewBox="0 0 16 16" width="11" height="11" fill="none" stroke="currentColor" stroke-width="2"><path d="M4 4l8 8M12 4l-8 8"/></svg>`,filter:`<svg viewBox="0 0 16 16" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M2.5 4h11M4.5 8h7M6.5 12h3"/></svg>`,cog:`<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="10" cy="10" r="2.6"/><path d="M10 2.5v2M10 15.5v2M17.5 10h-2M4.5 10h-2M15.3 4.7l-1.4 1.4M6.1 13.9l-1.4 1.4M15.3 15.3l-1.4-1.4M6.1 6.1L4.7 4.7"/></svg>`,out:`<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M8 4H4.5v12H8M12 6l4 4-4 4M16 10H8"/></svg>`,reset:`<svg viewBox="0 0 20 20" width="17" height="17" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M4 10a6 6 0 1 0 2-4.5M4 4v3h3"/></svg>`,chev:`<svg viewBox="0 0 12 12" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M3 4.5l3 3 3-3"/></svg>`,warn:`<svg viewBox="0 0 16 16" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.5" style="flex:none;margin-top:2px"><path d="M8 2l6.5 11.5h-13zM8 6.5v3.5M8 12v.3"/></svg>`}
const PEOPLE={ops:{n:'David Paul',r:'Procurement operations',i:'DP',c:'',mail:'david.paul@tervana.com',does:'Validates what the agent read'},buyer:{n:'Adrian Smith',r:'Buyer',i:'AS',c:'p2',mail:'adrian.smith@tervana.com',does:'Decides prices, terms and costs, and replies'},gr:{n:'Rajan Nair',r:'Goods recipient',i:'RN',c:'p3',mail:'rajan.nair@tervana.com',does:'Decides quantity and delivery'},admin:{n:'Emma Hudson',r:'Administrator',i:'EH',c:'p4',mail:'emma.hudson@tervana.com',does:'Connects systems and sets the agent'}}
const FIELDS=[['supplier','Supplier','294730',99],['sname','Supplier name','Helios Components AG',99],['purch','Purchaser','FR0L',97],['terms','Payment terms','GI15: Net 45 days after invoice date',79],['created','Created on','Jan 5, 2026',98],['inco','Incoterms','EXW',99],['total','Total net value','EUR 164,865',92],['items','Number of items','6',99],['delivery','Delivery (header)','Week 13, 2026 (estimated)',62],['costs','Additional costs','EUR 65.00',88]]
const LINES=[['1001','SKU-8821-B','Steuerungsmodul Rev.B','2,400','25.03','Jun 4, 2026'],['1002','SKU-4410-A','PCBC 40-pin','2,000','22.65','Jun 4, 2026'],['1003','SKU-4411-B','PCBC 40-pin -2','1,800','22.39','Jun 4, 2026'],['1004','SKU-4412-C','Widerstandsnetzwerk 4.7kΩ','1,500','12.80','Jul 14, 2026']]
const DIFFS1=()=>[
 {id:'total',g:'Order',f:'Total value',po:'€142,800',oc:'€164,865',d:'+€22,065 (15.4%)',sev:'High',why:'The unit price change on line 1001 times quantity. Approving overpays by €22,065.',own:'buyer',sug:'reject'},
 {id:'terms',g:'Order',f:'Payment terms',po:'Net 30',oc:'Net 45',d:'+15 days',sev:'High',why:'Read from “45 Tage netto”. More than 5 extra days needs finance approval.',own:'buyer',sug:'reject'},
 {id:'costs',g:'Order',f:'Additional costs',po:'None',oc:'€65.00',d:'New cost',sev:'Medium',why:'A freight charge that is not on the PO, within the usual range for this route.',own:'buyer',sug:'accept'},
 {id:'price',g:'Line items',f:'Line 1001 · Unit price',po:'€15.83',oc:'€25.03',d:'+58%',sev:'High',why:'No price change was agreed. This drives the €22,065 increase.',own:'buyer',sug:'reject'},
 {id:'desc',g:'Line items',f:'Line 1001 · Description',po:'Microcontroller Module Rev.B',oc:'Steuerungsmodul Rev.B',d:'German term',sev:'Low',why:'The same part, named in German. No functional difference.',own:'buyer',sug:'accept'},
 {id:'qty',g:'Line items',f:'Line 1002 · Quantity',po:'2,500',oc:'2,000',d:'500 fewer units',sev:'Medium',why:'Only 2,000 confirmed. 620 in stock may cover the gap; the store decides.',own:'gr',sug:null},
 {id:'date',g:'Line items',f:'Line 1004 · Delivery date',po:'Jun 4',oc:'Jul 14',d:'40 days later',sev:'High',why:'Six weeks late. Two production orders depend on this line.',own:'gr',sug:null}]
const DIFFS2=()=>[
 {id:'terms2',g:'Order',f:'Payment terms',po:'Net 30',oc:'Net 35',d:'+5 days',sev:'Medium',why:'Read from “35 Tage netto”. Within the 5 extra days a buyer can approve alone.',own:'buyer',sug:'accept'},
 {id:'price2',g:'Line items',f:'Line 1001 · Unit price',po:'€15.83',oc:'€25.03',d:'+58%',sev:'High',why:'Unchanged from version 1, where it was rejected. Escalation suggested.',own:'buyer',sug:'reject'}]
const OTHERS=[['4994546960','1505456','Orion Tech Ltd.','71,800','08.04.26','4 differences','High','In review'],['4994546960','1505982','Cascadia Polymers','25,450','07.04.26','3 differences','High','In review'],['4994546961','1505365','Nebula Systems','39,600','06.04.26','Price +8.4%, 7 days late','High','In review'],['4994546962','1505974','Quantum Electronics','26,300','31.03.26','Price +6.1%, 3 days late','High','In review'],['4994546963','1505683','Stellar Innovations','10,750','26.03.26','Price +2.3%, payment terms','Medium','In review'],['4994546964','1505246','Apollo Devices','56,900','23.03.26','Price +1.1%, incoterms','Medium','In review'],['4994546965','1505867','Cosmos Circuitry','70,500','05.04.26','Price +1.4%','Medium','In review'],['4994546966','1505795','Lunar Tech Solutions','37,200','02.04.26','Price +0.5%','Low','In review'],['4994546967','1505680','Solaris Works','14,600','11.03.26','Payment terms','Low','Resolved']]
const OPS_OTHERS=[['4994546960','1505900','Orion Tech Ltd.','2,800','08.04.26 10:15',95,'New'],['4994546960','1505901','Cascadia Polymers','5,450','07.04.26 11:18',92,'Validated'],['4994546961','1505902','Nebula Systems','9,600','06.04.26 12:11',90,'Validated'],['4994546962','1505903','Quantum Electronics','6,300','31.03.26 11:10',94,'Validated'],['4994546963','1505904','Stellar Innovations','10,750','26.03.26 16:21',89,'Validated'],['4994546967','1505907','Solaris Works','14,600','11.03.26 10:16',96,'Processed']]
const fresh=()=>({user:null,view:'login',tab:null,picked:'ops',conn:{mail:true,erp:true},autonomy:'guided',prefs:{sugg:true,email:true},
 o:{ver:1,stage:'read',lines:LINES.map(l=>[...l]),ledited:{},fields:Object.fromEntries(FIELDS.map(f=>[f[0],f[2]])),edited:{},editing:false,diffs:DIFFS1(),saved:{buyer:false,gr:false},sent:false,closed:false},
 events:[{d:'8 Apr 2026',t:'14:04',who:'agent',x:'Confirmation 1505899 received by email and read: 10 header fields and 4 lines, 87% average confidence.'},{d:'8 Apr 2026',t:'14:03',who:'sys',x:'Email from Helios Components AG with 2 attachments.'}],
 chat:[],menu:false,bell:false,help:false,filt:false,dialog:null,toast:null,coach:true,flash:null,view2:'All',q:'',fStatus:{'In review':true,'Resolved':true},tone:'Professional'})
let S=fresh()
const now=()=>{const d=new Date();return `${String(d.getHours()).padStart(2,'0')}:${String(d.getMinutes()).padStart(2,'0')}`}
const log=(who,x)=>S.events.unshift({d:'Today',t:now(),who,x})
const toast=(t)=>{S.toast=t;clearTimeout(window._tt);window._tt=setTimeout(()=>{S.toast=null;render()},2800)}
const role=()=>S.user,O=()=>S.o
const decided=(d)=>d.dec==='accept'||d.dec==='reject'
const allDone=(r)=>O().diffs.filter(d=>d.own===r).every(decided)
const chip=(s)=>`<span class="chip ${{High:'c-high',Medium:'c-med',Low:'c-low'}[s]}"><i></i>${s}</span>`
const avatar=(r,cls='')=>`<span class="av ${PEOPLE[r].c} ${cls}">${PEOPLE[r].i}</span>`
const cdot=(c)=>`<span class="cdot" title="Agent confidence"><i style="background:${c<70?'var(--high)':c<90?'var(--med)':'var(--low)'}"></i>${c}%</span>`
const node=(w,sm)=>w==='agent'?`<span class="av ${sm?'sm':''} ag">✦</span>`:w==='sys'?`<span class="av ${sm?'sm':''}" style="background:#fff;box-shadow:inset 0 0 0 1px var(--line-2);color:var(--ink-3)">${sm?'·':'Sys'}</span>`:avatar(w,sm?'sm':'')
const stageInfo=()=>{const o=O();if(o.closed)return['Closed','ok'];if(o.ver===2&&!o.sent)return['Version 2 to review','new'];if(o.sent)return['Reply sent','ok'];if(o.stage==='read')return['To validate','new'];if(!o.saved.buyer||!o.saved.gr)return['In review','wip'];return['Ready to reply','wip']}

/* ---------- shell ---------- */
function shell(inner){
  const u=PEOPLE[role()]
  return `<div class="top"><button class="brand" data-a="home" aria-label="${APP} home">${MARK(28)}<span class="co">${CO}</span><span class="sep"></span><span class="app">${APP}</span></button><span class="sp"></span>
  <button class="ic" data-a="bell" aria-label="Notifications">${I.bell}${S.events.length>2?'<span class="dot"></span>':''}</button>
  <button class="ic" data-a="help" aria-label="Help">${I.help}</button>
  <button class="me" data-a="menu" aria-label="Your profile">${avatar(role())}<span class="n">${u.n}</span>${I.chev}</button>
  ${S.menu?`<div class="menu"><div style="padding:10px 10px 8px;display:flex;gap:10px;align-items:center">${avatar(role())}<div><div class="b">${u.n}</div><div class="t-small">${u.r}</div></div></div><hr>
   <button data-a="settings">${I.cog}Settings</button><hr><div class="t-lab" style="padding:4px 10px">Switch user (prototype)</div>
   ${['ops','buyer','gr','admin'].filter(r=>r!==role()).map(r=>`<button data-a="switch" data-r="${r}">${avatar(r,'sm')}<span>${PEOPLE[r].n}<span class="t-small"> · ${PEOPLE[r].r}</span></span></button>`).join('')}
   <hr><button data-a="reset">${I.reset}Reset the prototype</button><button data-a="signout">${I.out}Sign out</button></div>`:''}
  ${S.bell?`<div class="menu" style="width:380px;right:170px;max-height:440px;overflow:auto"><div class="t-sub" style="padding:8px 10px">Notifications</div>${S.events.slice(0,7).map(e=>`<div style="display:flex;gap:10px;padding:10px;border-top:1px solid var(--line)">${node(e.who,true)}<div><div style="font-size:13.5px">${e.x}</div><div class="t-small">${e.d}, ${e.t}</div></div></div>`).join('')}</div>`:''}
  ${S.help?`<div class="menu" style="width:300px;right:130px"><div class="t-sub" style="padding:8px 10px">Help</div><button data-a="coach">${I.help}${S.coach?'Hide':'Show'} the guide</button><div class="t-small" style="padding:8px 10px;line-height:1.5">Three gates keep people in charge: operations validates the reading, each owner decides their differences, and the buyer sends the reply.</div></div>`:''}
  </div>${inner}${dialog()}${S.toast?`<div class="toast"><span style="width:18px;height:18px;border-radius:99px;background:var(--low);display:grid;place-items:center">${I.check}</span>${S.toast}</div>`:''}${coach()}`}

/* ---------- login ---------- */
function login(){
  const p=PEOPLE[S.picked]
  return `<div class="login"><div class="fade" style="display:grid;grid-template-columns:420px 380px;gap:20px;align-items:start">
  <div class="card" style="padding:40px">
   <div class="brand">${MARK(36)}<span class="co" style="font-size:18px">${CO}</span></div>
   <div class="t-page" style="margin-top:28px">Sign in</div><div class="muted" style="margin-top:4px">to ${APP}</div>
   <label class="t-lab" style="display:block;margin:26px 0 8px">Email</label><input class="input" value="${p.mail}" readonly>
   <label class="t-lab" style="display:block;margin:16px 0 8px">Password</label><input class="input" type="password" value="prototype" readonly>
   <button class="btn btn-p" data-a="login" style="width:100%;margin-top:24px;height:42px">Sign in as ${p.n.split(' ')[0]}</button>
   <div class="t-small" style="margin-top:14px">A prototype with sample data. Nothing is sent anywhere.</div>
  </div>
  <div class="card" style="padding:20px"><div class="t-sub">Choose who you are</div>
   <div style="display:flex;flex-direction:column;gap:8px;margin-top:12px">${['ops','buyer','gr','admin'].map(r=>`<button class="persona ${S.picked===r?'on':''}" data-a="pick" data-r="${r}">${avatar(r)}<span><span class="b" style="display:block">${PEOPLE[r].n}</span><span class="t-small">${PEOPLE[r].r} · ${PEOPLE[r].does}</span></span></button>`).join('')}</div>
   <div class="t-small" style="margin-top:14px;line-height:1.5">Start as David. The guide at the bottom left suggests each next step. Switch user any time from the profile menu.</div>
  </div></div></div>${coach()}`}

/* ---------- worklists ---------- */
function toolbar(views){
  const filtered=!Object.values(S.fStatus).every(Boolean)
  return `<div style="display:flex;justify-content:space-between;align-items:center;margin-top:24px;position:relative"><div class="tabsv" role="tablist">${views.map(x=>`<button role="tab" aria-selected="${S.view2===x[0]}" class="${S.view2===x[0]?'on':''}" data-a="view2" data-v="${x[0]}">${x[0]} <em>${x[1]}</em></button>`).join('')}</div>
  <div style="display:flex;gap:8px;align-items:center"><label class="input" style="width:290px">${I.search}<input data-a="q" value="${S.q}" placeholder="Search supplier, PO or document" style="border:0;outline:0;flex:1;background:none"></label><button class="btn btn-s" data-a="filt" aria-expanded="${S.filt}">${I.filter}Filter${filtered?' · 1':''}</button></div>
  ${S.filt?`<div class="pop" style="right:0;top:46px"><div class="t-sub" style="margin-bottom:6px">Status</div>${Object.keys(S.fStatus).map(k=>`<label class="check"><input type="checkbox" data-a="fst" data-k="${k}" ${S.fStatus[k]?'checked':''}>${k}</label>`).join('')}</div>`:''}</div>`}
const empty=(n)=>`<tr><td colspan="${n}" style="padding:44px;text-align:center"><div class="t-sub">No confirmations match</div><div class="t-small" style="margin-top:4px">Clear the search or the filter to see them all.</div><button class="btn btn-s btn-sm" style="margin-top:12px" data-a="clearf">Clear</button></td></tr>`
function worklist(){
  const r=role(),o=O(),[st,sc]=stageInfo()
  if(r==='admin')return admin()
  if(r==='ops'){
    const val=o.stage!=='read'
    let rows=[['4994546957','1505899','Helios Components AG','142,800','08.04.26 14:04',87,val?'Validated':'New',true],...OPS_OTHERS.map(x=>[...x,false])]
    const tv=rows.filter(x=>x[6]==='New').length,cnt={All:rows.length,'To validate':tv,Validated:rows.filter(x=>x[6]==='Validated').length,Processed:1}
    const map={'To validate':'New',Validated:'Validated',Processed:'Processed'}
    if(map[S.view2])rows=rows.filter(x=>x[6]===map[S.view2])
    if(S.q)rows=rows.filter(x=>x.join(' ').toLowerCase().includes(S.q.toLowerCase()))
    return `<div class="wrap fade" style="padding-top:32px;padding-bottom:120px"><div class="t-page">My worklist</div><div class="muted" style="margin-top:6px">${tv} confirmation${tv===1?' needs':'s need'} your validation before buyers can review ${tv===1?'it':'them'}. Amber and red values were read with less certainty.</div>
    ${toolbar(Object.entries(cnt))}
    <div class="card" style="overflow:hidden;margin-top:14px"><table><tr><th>Supplier</th><th>PO</th><th>Document</th><th class="r">Value (EUR)</th><th>Received</th><th>Status</th><th>Confidence</th><th></th></tr>
    ${rows.length?rows.map(x=>`<tr class="${x[7]?'click':'other'}" ${x[7]?'data-a="open"':''}><td class="${x[7]?'b':''}">${x[2]}</td><td class="idc">${x[0]}</td><td class="idc">${x[1]}</td><td class="r num">${x[3]}</td><td class="nw">${x[4]}</td><td>${x[6]==='New'?'<span class="st new"><i></i>To validate</span>':x[6]==='Validated'?'<span class="st ok"><i></i>Validated</span>':'<span class="st off"><i></i>Processed</span>'}</td><td>${cdot(x[5])}</td><td class="r">${x[7]?`<span class="link">${val?'View':'Validate'}</span>`:'<span class="muted">View</span>'}</td></tr>`).join(''):empty(8)}</table></div></div>`}
  const others=OTHERS.filter((x,i)=>r==='buyer'||[0,2,3].includes(i))
  const all=[{me:true,risk:o.ver===2?'Medium':'High',status:'In review'},...others.map(x=>({x,risk:x[6],status:x[7]}))]
  const cnt=(k)=>all.filter(a=>k==='All'||a.risk===k).length
  let list=all.filter(a=>S.view2==='All'||a.risk===S.view2).filter(a=>S.fStatus[a.status]!==false)
  if(S.q)list=list.filter(a=>(a.me?'helios components ag 4994546957 1505899':a.x.join(' ').toLowerCase()).includes(S.q.toLowerCase()))
  const mine=o.diffs.filter(d=>d.own===r).length
  const head=r==='gr'?(o.stage==='read'?'Nothing to decide yet. You see only quantity and delivery changes.':`${mine} difference${mine===1?'':'s'} on the Helios Components order need your decision. You see only quantity and delivery changes.`):(o.stage==='read'?`${others.filter(x=>x[7]==='In review').length} confirmations have differences to decide, highest risk first. One more is being validated.`:`${others.filter(x=>x[7]==='In review').length+1} confirmations have differences to decide, highest risk first.`)
  return `<div class="wrap fade" style="padding-top:32px;padding-bottom:120px"><div class="t-page">My worklist</div><div class="muted" style="margin-top:6px">${head}</div>
  ${toolbar(['All','High','Medium','Low'].map(k=>[k,cnt(k)]))}
  <div class="card" style="overflow:hidden;margin-top:14px"><table><tr><th>Supplier</th><th>PO</th><th>Document</th><th class="r">Value (EUR)</th><th>Received</th><th>Differences</th><th>Risk</th><th>Status</th><th></th></tr>
  ${list.length?list.map(a=>a.me?`<tr class="click ${S.flash==='row'?'flash':''}" data-a="open"><td class="b">Helios Components AG</td><td class="idc">4994546957</td><td class="idc">1505899${o.ver===2?'/2':''}</td><td class="r num">142,800</td><td class="nw">${o.ver===2?'Today':'08.04.26'}</td><td>${o.stage==='read'?'<span class="muted">Waiting for validation</span>':`${o.diffs.length} differences${r==='gr'?` · <b>${mine} yours</b>`:''}`}</td><td>${chip(a.risk)}</td><td><span class="st ${sc}"><i></i>${st}</span></td><td class="r"><span class="link">${o.stage==='read'?'View':'Review'}</span></td></tr>`
   :`<tr class="other"><td>${a.x[2]}</td><td class="idc">${a.x[0]}</td><td class="idc">${a.x[1]}</td><td class="r num">${a.x[3]}</td><td>${a.x[4]}</td><td>${a.x[5]}</td><td>${chip(a.x[6])}</td><td><span class="st ${a.x[7]==='Resolved'?'ok':'wip'}"><i></i>${a.x[7]}</span></td><td class="r"><span class="muted">Review</span></td></tr>`).join(''):empty(9)}</table></div>
  <div class="t-small" style="margin-top:10px">In this prototype, Helios Components AG is the order to open.</div></div>`}

/* ---------- order ---------- */
function order(){
  const r=role(),o=O(),[st,sc]=stageInfo()
  const tabs=r==='ops'?['Extraction','Activity']:['Overview','Differences','Extraction','Activity']
  if(!S.tab||!tabs.includes(S.tab))S.tab=tabs[0]
  let act=''
  if(r==='ops'&&o.stage==='read'&&!o.editing)act=`<button class="btn btn-s" data-a="edit">Edit</button><button class="btn btn-p" data-a="validate">${I.check}Confirm validation</button>`
  if(r==='buyer'&&o.saved.buyer&&o.saved.gr&&!o.sent)act=`<button class="btn btn-p" data-a="reply">${I.send}Review the reply</button>`
  if(r==='buyer'&&o.sent&&o.ver===1)act=`<button class="btn btn-s" data-a="revise">${SP}Simulate the supplier’s revision</button>`
  if(r==='buyer'&&o.sent&&o.ver===2&&!o.closed)act=`<button class="btn btn-p" data-a="close">Close order</button>`
  const id='1505899'+(o.ver===2?'/2':''),mine=o.diffs.filter(d=>d.own===r).length
  return `<div class="head"><div class="wrap" style="padding-top:20px"><div class="crumb"><button data-a="home">My worklist</button> &nbsp;/&nbsp; Helios Components AG</div>
   <div style="display:flex;justify-content:space-between;align-items:flex-start;margin-top:10px"><div style="display:flex;align-items:center;gap:12px;flex-wrap:wrap"><span class="t-page">Order confirmation ${id}</span>${chip(o.ver===2?'Medium':'High')}<span class="st ${sc}"><i></i>${st}</span></div><div style="display:flex;gap:8px">${act}</div></div>
   <div class="meta"><span>Helios Components AG</span><span>PO 4994546957</span><span>€164,865</span><span>Received ${o.ver===2?'today':'8 Apr 2026'}</span><span>Version ${o.ver}</span>${r==='ops'?`<span style="display:flex;align-items:center;gap:6px">${SP} Read with 87% confidence</span>`:''}</div>
   <div class="ptabs" role="tablist">${tabs.map(t=>`<button role="tab" aria-selected="${t===S.tab}" class="${t===S.tab?'on':''}" data-a="tab" data-t="${t}">${t}${t==='Differences'&&o.stage!=='read'?` <span class="cnt">${r==='gr'?mine+' yours':o.diffs.length}</span>`:''}</button>`).join('')}</div></div></div>
  <div class="fade">${S.tab==='Overview'?overview():S.tab==='Differences'?differences():S.tab==='Extraction'?extraction():activity()}</div>`}
const gate=()=>`<div class="card" style="padding:18px 20px;display:flex;align-items:center;gap:14px;margin-bottom:16px"><span class="chip c-p">Gate 1</span><div style="flex:1"><div class="t-sub">Waiting for operations to validate the reading</div><div class="t-small">Nothing is compared or routed until a person confirms what the agent read.</div></div><button class="btn btn-s btn-sm" data-a="switch" data-r="ops">Switch to David</button></div>`

function overview(){
  const o=O(),r=role(),v1=o.ver===1
  if(o.stage==='read')return `<div class="wrap" style="padding-top:24px;padding-bottom:120px">${gate()}</div>`
  const hi=o.diffs.filter(d=>d.sev==='High').length,me=o.diffs.filter(d=>d.sev==='Medium').length,lo=o.diffs.filter(d=>d.sev==='Low').length
  const tiles=r==='gr'?[['Yours to decide','2','Quantity and delivery'],['Shortfall','500 units','Line 1002'],['Stock on hand','620 units','Covers the shortfall'],['Delivery','40 days late','Line 1004'],['Production impact','2 orders','Start from Jun 10'],['Agent suggests','Your call','Depends on the store']]
   :v1?[['Differences',String(o.diffs.length),`${hi} high · ${me} medium · ${lo} low`],['Price exposure','+€22,065','Overpaid if approved'],['Payment terms','+15 days','Needs finance approval'],['Delivery','40 days late','Line 1004'],['Order risk','High','From the most severe difference'],['Agent suggests','Reject 3','Accept 2; two are Rajan’s']]
   :[['Differences','2','1 high · 1 medium'],['Price exposure','+€22,065','Unchanged from version 1'],['Payment terms','+5 days','Within your tolerance'],['Delivery','On time','Dates now match'],['Order risk','Medium','From the unit price'],['Agent suggests','Escalate','The unit price']]
  const steps=[['Received',1],['Read',1],['Validated',1],['Compared',1],['Buyer decides',o.saved.buyer],['Recipient decides',o.saved.gr],['Reply sent',o.sent],['Closed',o.closed]],nowIdx=steps.findIndex(s=>!s[1])
  const acts=r==='gr'?[['Decide the shortfall on line 1002','620 in stock covers the 500 short this month','Now'],['Decide the delivery on line 1004','Two production orders start before Jul 14','Now']]:v1?[['Reject the unit price on line 1001','€22,065 overpaid if approved','Now'],['Reject net 45, or send it to finance','Beyond your 5-day tolerance','Now'],['Accept the €65 freight charge','Usual range for this route','Today'],['Quantity and delivery are with Rajan','Routed to him automatically','Waiting']]:[['Accept net 35','Within your tolerance','Now'],['Escalate the unit price','Rejected once, unchanged in version 2','Now']]
  const red=(v)=>v==='High'||v.startsWith('+€')||v==='40 days late'
  return `<div class="wrap" style="padding-top:24px;padding-bottom:120px;display:flex;flex-direction:column;gap:18px">
  <div class="card"><div class="ch"><div class="t-sec" style="display:flex;gap:8px;align-items:center">${SP}What the agent found</div><span class="t-small">Compared with PO 4994546957</span></div><div class="tiles">${tiles.map((t,i)=>`<div class="tile"><div class="t-lab">${t[0]}</div><div class="v" style="${red(t[1])?'color:var(--high-ink)':i===5?'color:var(--primary-ink)':''}">${t[1]}</div><div class="s">${t[2]}</div></div>`).join('')}</div></div>
  <div style="display:grid;grid-template-columns:1.15fr 1fr;gap:18px">
   <div class="card" style="overflow:hidden"><div class="ch"><div class="t-sec">PO against the confirmation</div><span class="t-small">Matched in the ERP</span></div><table><tr><th>Field</th><th>Purchase order</th><th>Confirmation</th><th>Status</th></tr>
    ${[['Unit price, line 1001','€15.83','€25.03','High'],['Total value','€142,800','€164,865','High'],['Payment terms','Net 30',v1?'Net 45':'Net 35',v1?'High':'Medium'],['Delivery, line 1004','Jun 4',v1?'Jul 14':'Jun 4',v1?'High':'ok'],['Quantity, line 1002','2,500',v1?'2,000':'2,500',v1?'Medium':'ok'],['Incoterms','EXW','EXW','ok'],['Currency','EUR','EUR','ok']].map(x=>`<tr><td>${x[0]}</td><td class="num">${x[1]}</td><td class="num ${x[3]==='ok'?'':'b'}">${x[2]}</td><td>${x[3]==='ok'?'<span class="st ok"><i></i>Matches</span>':chip(x[3])}</td></tr>`).join('')}</table></div>
   <div class="card" style="padding:0 20px 20px"><div class="ch" style="padding:16px 0"><div class="t-sec">Where it stands</div></div>
    <div class="steps">${steps.map((s,i)=>`<div class="stp ${s[1]?'done':i===nowIdx?'now':''}"><b>${i+1}</b>${s[0]}</div>`).join('')}</div>
    <div class="t-sub" style="margin-top:22px">Who decides</div>
    <div style="margin-top:6px">${['buyer','gr'].map(x=>{const n=o.diffs.filter(d=>d.own===x).length;return `<div class="who">${avatar(x,'sm')}<span class="n">${PEOPLE[x].n} <span class="t-small">· ${PEOPLE[x].r.toLowerCase()}</span></span><span class="t-small">${o.saved[x]?'Done':n?`${n} to decide`:'Nothing to decide'}</span></div>`}).join('')}</div>
    <div class="t-small" style="margin-top:12px;display:flex;gap:6px;align-items:center">${SP} Read with 87% confidence${(()=>{const n=Object.keys(o.edited).length+Object.keys(o.ledited).length;return n?`; ${n} value${n>1?'s':''} corrected`:''})()}. Validated by David Paul.</div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:18px">
   <div class="card" style="padding:0 20px 20px"><div class="ch" style="padding:16px 0"><div class="t-sec">How the agent reasoned</div><span class="t-small">Each step traceable to the source</span></div><div style="display:grid;gap:10px">
    <div class="trace"><div class="t-sub">Unit price, from the German column “PREIS”</div><dl><dt>PO</dt><dd>€15.83</dd><dt>Confirmation</dt><dd style="color:var(--high-ink);font-weight:500">€25.03, up 58%</dd><dt>History</dt><dd>One agreed price change in 24 months, +4.2%</dd></dl></div>
    <div class="trace"><div class="t-sub">Payment terms, from “${v1?'45':'35'} Tage netto”</div><dl><dt>Source</dt><dd>Terms section, page 1, in German</dd><dt>Read as</dt><dd>Net ${v1?'45':'35'} days, 99% sure</dd><dt>Policy</dt><dd>${v1?'More than 5 extra days needs finance':'Within the buyer’s tolerance'}</dd></dl></div>
    <div class="trace"><div class="t-sub">Description, “Steuerungsmodul Rev.B”</div><dl><dt>Match</dt><dd>Same part number, German name</dd><dt>Verdict</dt><dd>Not a real difference, low severity</dd></dl></div></div></div>
   <div class="card" style="padding:0 20px 18px"><div class="ch" style="padding:16px 0"><div class="t-sec">Suggested next actions</div><span class="t-small">For you, in order</span></div>
    ${acts.map((a,i)=>`<div class="act"><span class="n">${i+1}</span><div style="flex:1"><div style="font-weight:500">${a[0]}</div><div class="t-small">${a[1]}</div></div><span class="chip ${a[2]==='Now'?'c-high':a[2]==='Waiting'?'c-n':'c-med'}">${a[2]}</span></div>`).join('')}
    <div style="padding-top:14px"><button class="btn btn-p" data-a="tab" data-t="Differences">Decide the differences</button></div></div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:18px">
   <div class="card" style="padding:0 20px 12px"><div class="ch" style="padding:16px 0"><div class="t-sec">Supplier</div></div><ul class="li"><li><span>Helios Components AG</span><span>294730</span></li><li><span>Contract</span><span>Active to Dec 2026</span></li><li><span>On-time delivery</span><span>84%</span></li><li><span>Price changes this year</span><span>2 of 6 orders</span></li><li><span>Price escalation clause</span><span>None</span></li></ul></div>
   <div class="card" style="padding:0 20px 12px"><div class="ch" style="padding:16px 0"><div class="t-sec">Supply impact</div></div><ul class="li"><li><span>SKU-4410-A in stock</span><span>620 units</span></li><li><span>Shortfall on line 1002</span><span>${v1?'500 units':'None'}</span></li><li><span>Orders that need line 1004</span><span>2, from Jun 10</span></li><li><span>Other suppliers for line 1004</span><span>2 qualified</span></li></ul></div>
   <div class="card" style="padding:0 20px 12px"><div class="ch" style="padding:16px 0"><div class="t-sec">Documents</div></div><ul class="li"><li><span>Order confirmation, PDF</span><span class="st ok"><i></i>Read</span></li><li><span>Terms and conditions, PDF</span><span class="st ok"><i></i>Read</span></li><li><span>Quality certificate</span><span class="st ok"><i></i>On file</span></li><li><span>Delivery schedule</span><span class="st bad"><i></i>Missing</span></li></ul></div>
  </div>
  <div class="card" style="padding:0 20px 18px"><div class="ch" style="padding:16px 0"><div class="t-sec" style="display:flex;gap:8px;align-items:center">${SP}Ask the agent about this order</div></div>
   ${S.chat.slice(-6).map(m=>`<div class="feed">${m.me?avatar(role(),'sm'):'<span class="av sm ag">✦</span>'}<div><div class="${m.me?'b':'ag-t'}" style="font-size:13px">${m.me?PEOPLE[role()].n:'Agent'}</div><div style="margin-top:2px">${m.t}</div></div></div>`).join('')}
   <div style="display:flex;gap:8px;flex-wrap:wrap;margin-top:${S.chat.length?12:0}px">${SUGG.map(s=>`<button class="chip c-p" style="height:30px;padding:0 12px" data-a="sugg" data-q="${s}">${s}</button>`).join('')}</div>
   <form data-a="chatform" style="display:flex;gap:8px;margin-top:12px"><input class="input" name="q" placeholder="Ask about price history, terms, stock or delivery" autocomplete="off"><button class="btn btn-p">Ask</button></form></div>
  </div>`}

/* ---------- differences ---------- */
function differences(){
  const o=O(),r=role()
  if(o.stage==='read')return `<div class="wrap" style="padding-top:24px;padding-bottom:120px">${gate()}</div>`
  const saved=o.saved[r],myDone=allDone(r)
  const row=(d)=>{const own=d.own===r,lock=o.saved[d.own]||o.sent,who=PEOPLE[d.own].n
    let cell
    if(lock&&d.dec)cell=`<span class="st ${d.dec==='accept'?'ok':'bad'}"><i></i>${d.dec==='accept'?'Accepted':'Rejected'}</span><div class="done-by">by ${who}</div>`
    else if(!own)cell=`<span class="st off"><i></i>Open</span><div class="done-by">With ${who}</div>`
    else cell=`<div class="dec" role="group" aria-label="Decision for ${d.f}"><button class="acc ${d.dec==='accept'?'on':''}" aria-pressed="${d.dec==='accept'}" data-a="dec" data-id="${d.id}" data-v="accept">${d.dec==='accept'?I.check:''}Accept</button><button class="rej ${d.dec==='reject'?'on':''}" aria-pressed="${d.dec==='reject'}" data-a="dec" data-id="${d.id}" data-v="reject">${d.dec==='reject'?I.xs:''}Reject</button></div>${d.sug&&S.prefs.sugg?`<div class="sug ${d.dec&&d.dec!==d.sug?'diff':''}">${d.dec&&d.dec!==d.sug?I.warn:SP} Agent suggests ${d.sug}</div>`:`<div class="sug">Your judgement</div>`}`
    return `<tr class="${own?'':'other'}"><td style="width:180px;font-weight:${own?500:400}">${d.f}</td><td style="width:200px"><div class="num"><span style="color:var(--ink-3);text-decoration:line-through">${d.po}</span> → <span style="font-weight:${own?600:400}">${d.oc}</span></div><div class="t-small">${d.d}</div></td><td style="width:100px">${chip(d.sev)}</td><td><div style="display:flex;gap:8px;line-height:1.4;color:${own?'var(--ink-2)':'inherit'}">${SP}<span>${d.why}</span></div></td><td style="width:200px">${cell}</td></tr>`}
  const groups=['Order','Line items'].map(g=>{const ds=o.diffs.filter(d=>d.g===g);return ds.length?`<tr class="grp"><td colspan="5">${g}</td></tr>${ds.map(row).join('')}`:''}).join('')
  const rec=recFor(r),n=(x)=>o.diffs.filter(d=>d.own===x).length,dn=(x)=>o.diffs.filter(d=>d.own===x&&decided(d)).length
  return `<div class="wrap" style="padding-top:24px;padding-bottom:140px"><div class="grid2"><div>
   <div class="card" style="overflow:hidden"><div class="ch"><div class="t-sec">Differences from the purchase order</div><span class="t-small">${n(r)?`${n(r)} of ${o.diffs.length} are yours to decide`:''}</span></div>
   <table><tr><th>Field</th><th>Purchase order → Confirmation</th><th>Severity</th><th>Agent’s reasoning</th><th>Decision</th></tr>${groups}</table></div>
   ${n(r)&&!saved&&!o.sent?`<div class="actionbar"><span style="flex:1"><b>${dn(r)} of ${n(r)}</b> <span class="muted">decided</span></span>${r==='buyer'&&S.prefs.sugg?`<button class="btn btn-g" data-a="acceptsug">${SP}Apply the agent’s suggestions</button>`:''}<button class="btn btn-p" data-a="savedec" ${myDone?'':'disabled'}>${r==='gr'?'Submit decisions':'Save decisions'}</button></div>`:''}
  </div>
  <div class="rail"><div class="card rec"><div class="t-lab" style="display:flex;gap:7px;align-items:center">${SP}Agent recommendation</div><div class="say">${rec.say}</div><div class="why">${rec.why}</div>
    <div class="next"><div class="t-lab">Next</div><div style="margin-top:6px;font-weight:600">${rec.next[0]}</div><div class="t-small" style="margin-top:2px">${rec.next[1]}</div>${rec.btn||''}</div></div>
   <div class="card" style="padding:16px 20px"><div class="t-sub">Who decides</div><div style="margin-top:6px">${['buyer','gr'].filter(x=>n(x)).map(x=>`<div class="who">${avatar(x,'sm')}<span class="n">${PEOPLE[x].n}<div class="t-small">${PEOPLE[x].r}</div></span><span class="t-small num">${o.saved[x]?'Done':`${dn(x)} of ${n(x)}`}</span><span class="prog"><i style="width:${o.saved[x]?100:n(x)?dn(x)/n(x)*100:0}%;${o.saved[x]?'background:var(--low)':''}"></i></span></div>`).join('')}</div></div>
  </div></div></div>`}
function recFor(r){
  const o=O()
  if(o.closed)return{say:'Order closed.',why:'Every decision, the replies and both versions are in Activity.',next:['Nothing left to do','The record stays for audit.']}
  if(r==='gr'){
    if(o.saved.gr)return{say:'Your decisions are submitted.',why:'Adrian replies to the supplier once his are in too.',next:['Nothing left for you','You will see the revision if the supplier changes your lines.']}
    return{say:'Two differences are yours: quantity and delivery date.',why:'The buyer decides the commercial ones. These depend on what the store needs.',next:['Decide quantity and delivery','620 in stock covers the shortfall. Line 1004 is six weeks late.']}}
  if(o.ver===2){
    if(o.sent)return{say:'Reply sent on version 2.',why:'Net 35 accepted, the unit price escalated.',next:['Close the order','Or keep it open for the supplier’s answer on price.']}
    return{say:'Accept net 35. Escalate the unit price.',why:'Version 2 moved the terms within your tolerance, but line 1001 still carries the 58% rise.',next:o.saved.buyer?['Review the reply','Drafted from your decisions.']:['Decide the revised differences','Then the agent drafts the reply again.'],btn:o.saved.buyer?`<button class="btn btn-p btn-sm" style="margin-top:12px" data-a="reply">${I.send}Review the reply</button>`:''}}
  if(o.sent)return{say:'Sent to the supplier.',why:'The agent is watching the mailbox for a revised confirmation.',next:['All set for now','Use “Simulate the supplier’s revision” to see what happens next.']}
  if(o.saved.buyer&&o.saved.gr)return{say:'Every decision is in. The reply is drafted.',why:'It lists what was rejected and why, with the differences attached.',next:['Review the reply and send it','Nothing leaves without you.'],btn:`<button class="btn btn-p btn-sm" style="margin-top:12px" data-a="reply">${I.send}Review the reply</button>`}
  if(o.saved.buyer)return{say:'Your decisions are saved.',why:'Quantity and delivery are with Rajan.',next:['Waiting for Rajan','Switch to Rajan from the profile menu to decide them.'],btn:`<button class="btn btn-s btn-sm" style="margin-top:12px" data-a="switch" data-r="gr">Switch to Rajan</button>`}
  return{say:'Reject the price and the longer payment terms. Accept the freight charge and the description.',why:'The unit price rose 58% on line 1001, which drives the €22,065 increase. Net 45 needs finance approval.',next:['Decide your five differences','Quantity and delivery go to Rajan.']}}

/* ---------- extraction ---------- */
function extraction(){
  const o=O(),ed=o.editing,can=role()==='ops'&&o.stage==='read'
  return `<div class="split"><div style="padding:24px 32px 140px">
   <div class="card"><div class="ch"><div><div class="t-sec">Header</div><div class="t-small" style="margin-top:2px">${o.stage==='read'?'What the agent read. Check the amber and red values against the document.':'Validated by David Paul.'}</div></div>${ed?'<span class="chip c-p">Editing</span>':''}</div>
    <div class="fields">${FIELDS.map(f=>{const v=o.fields[f[0]]
     return `<div class="fl"><div class="top2"><label class="t-lab" for="f-${f[0]}">${f[1]}</label>${o.edited[f[0]]?'<span class="cdot" style="color:var(--primary-ink)"><i style="background:var(--primary)"></i>Corrected</span>':cdot(f[3])}</div>
     ${ed?`<input id="f-${f[0]}" class="input ${o.edited[f[0]]?'changed':''}" data-f="${f[0]}" value="${v}">`:`<div class="v">${v}</div>`}</div>`}).join('')}</div></div>
   <div class="card" style="overflow:hidden;margin-top:18px"><div class="ch"><div><div class="t-sec">Line items</div><div class="t-small" style="margin-top:2px">${ed?'Edit any value in place. Material numbers come from the purchase order.':'4 lines, matched to the purchase order by material number.'}</div></div>${ed?'<span class="chip c-p">Editing</span>':''}</div><table><tr><th>Line</th><th>Material</th><th>Description</th><th class="r">Quantity</th><th class="r">Unit price (EUR)</th><th>Delivery</th><th class="r">Confidence</th></tr>${o.lines.map((l,i)=>{const cf=[96,94,97,71][i],cell=(c,w,al)=>ed?`<input class="input ${o.ledited[i+':'+c]?'changed':''}" style="height:34px;width:${w}px;${al?'text-align:right;':''}" data-l="${i}:${c}" value="${l[c]}" aria-label="Line ${l[0]} ${['','','description','quantity','unit price','delivery'][c]}">`:`<span class="${al?'num':''}">${l[c]}</span>`
     return `<tr><td class="idc">${l[0]}</td><td class="idc nw">${l[1]}</td><td>${cell(2,220)}</td><td class="r">${cell(3,90,1)}</td><td class="r">${cell(4,90,1)}</td><td>${cell(5,130)}</td><td class="r">${Object.keys(o.ledited).some(k=>k.startsWith(i+':'))?'<span class="cdot" style="color:var(--primary-ink)"><i style="background:var(--primary)"></i>Corrected</span>':cdot(cf)}</td></tr>`}).join('')}</table></div>
   ${ed?`<div class="actionbar"><span style="flex:1" class="muted">Changes to the header and line items are logged for audit. Try “GI15” to “GL15”, or the delivery on line 1004.</span><button class="btn btn-g" data-a="canceledit">Cancel</button><button class="btn btn-p" data-a="saveedit">Save changes</button></div>`:''}
  </div><div class="pdfpane"><div class="t-lab" style="margin-bottom:10px;display:flex;justify-content:space-between">Supplier’s document <span>Page 1 of 2</span></div>${pdf()}</div></div>`}
function pdf(){
  const ln=(w)=>`<div class="ln" style="width:${w}%"></div>`
  return `<div class="pdf"><div class="pbar"><span>HELIOS COMPONENTS AG</span><span style="font-weight:400;font-size:6.5px">Precision Electronic Components · Munich</span></div>
  <div style="display:flex;justify-content:space-between;margin-top:10px"><div style="width:40%">${ln(70)+ln(50)+ln(60)}</div><div style="text-align:right;font:700 10px Arial;color:#333">AUFTRAGSBESTÄTIGUNG<br><span style="font-weight:400;font-size:7px">Nr. 1505899 · Bestellung 4994546957</span></div></div>
  <div style="margin:10px 0;display:flex;gap:16px"><span>Zahlungsbedingungen: <span class="hl" style="color:#333">${O().ver===2?'35':'45'} Tage netto</span></span><span>Lieferung: <span class="hl" style="color:#333">voraussichtlich KW 13</span></span></div>
  <table><tr><th>Pos</th><th>Artikel-Nr.</th><th>Bezeichnung</th><th>Menge</th><th>PREIS (EUR)</th><th>Liefertermin</th></tr>${LINES.map(l=>`<tr><td>${l[0]}</td><td>${l[1]}</td><td>${l[2]}</td><td>${l[3].replace(',','.')}</td><td>${l[4].replace('.',',')}</td><td>${l[5]}</td></tr>`).join('')}</table>
  <div style="margin:12px 0 0 auto;width:50%"><div style="display:flex;justify-content:space-between;border-bottom:1px solid #ddd;padding:3px 0"><span>Nettobetrag</span><span>EUR 164.865,00</span></div><div style="display:flex;justify-content:space-between;border-bottom:1px solid #ddd;padding:3px 0"><span>Fracht</span><span>EUR 65,00</span></div></div>
  <div style="margin-top:14px;border:1px solid #ddd;padding:6px"><b style="color:#333">Hinweis:</b> Pos. 1002 Teillieferung, 2.000 Stück. ${ln(90)+ln(60)}</div>
  <div style="font:700 7.5px Arial;color:#333;margin:12px 0 4px">QUALITÄT UND KONFORMITÄT</div>${ln(92)+ln(70)+ln(85)+ln(55)}
  <div style="font:700 7.5px Arial;color:#333;margin:12px 0 4px">BESONDERE BEDINGUNGEN</div>${ln(88)+ln(76)+ln(90)+ln(48)+ln(80)}
  <div style="margin-top:14px">Wir freuen uns auf die weitere Zusammenarbeit.</div></div>`}

/* ---------- activity: a timeline grouped by day ---------- */
function activity(){
  const days=[...new Set(S.events.map(e=>e.d))],actor=(w)=>w==='agent'?'<span class="ag-t">Agent</span>':w==='sys'?'System':PEOPLE[w].n
  return `<div class="wrap" style="padding-top:24px;padding-bottom:120px"><div class="grid2"><div class="card"><div class="ch"><div class="t-sec">Timeline</div><span class="t-small">Newest first · ${S.events.length} entries</span></div><div class="tl">
   ${days.map((d,di)=>{const es=S.events.filter(e=>e.d===d);return `<div class="tl-day">${d}</div>${es.map((e,i)=>`<div class="tl-i ${di===days.length-1&&i===es.length-1?'last':''}"><span class="node">${node(e.who)}</span><div><div class="time">${e.t} · ${actor(e.who)}</div><div class="x">${e.x}</div></div></div>`).join('')}`}).join('')}</div></div>
  <div class="rail"><div class="card" style="padding:16px 20px"><div class="t-sub">On the record</div><div style="margin-top:6px">${['agent','ops','buyer','gr'].map(w=>{const c=S.events.filter(e=>e.who===w).length;return `<div class="who">${node(w,true)}<span class="n">${w==='agent'?'Agent':PEOPLE[w].n}</span><span class="t-small">${c} ${c===1?'entry':'entries'}</span></div>`}).join('')}</div></div></div></div></div>`}

/* ---------- admin ---------- */
function admin(){
  const row=(k,n)=>`<tr><td class="b">${n}</td><td>${S.conn[k]?'Emma Hudson':'–'}</td><td class="nw">${S.conn[k]?'26 Feb 2026, 07:52':'–'}</td><td>${S.conn[k]?'<span class="st ok"><i></i>Connected</span>':'<span class="st off"><i></i>Not connected</span>'}</td><td class="r"><button class="btn ${S.conn[k]?'btn-s':'btn-p'} btn-sm" data-a="conn" data-k="${k}">${S.conn[k]?'Disconnect':'Connect'}</button></td></tr>`
  const lv=[['assist','Assist','The agent recommends. People do the work.'],['guided','Guided','The agent prepares. People decide at three gates.'],['bounded','Bounded','Low risk, high confidence resolved inside policy. Not enabled yet.']]
  return `<div class="wrap fade" style="padding-top:32px;padding-bottom:120px;max-width:1040px;margin:0"><div class="t-page">Administration</div><div class="muted" style="margin-top:6px">Connect the systems the agent reads from, and set how far it may act.</div>
  <div class="card" style="overflow:hidden;margin-top:24px"><div class="ch"><div class="t-sec">Connections</div></div><table><tr><th>Connection</th><th>Changed by</th><th>Changed on</th><th>Status</th><th></th></tr>${row('mail','Microsoft Office 365 mailbox')}${row('erp','ERP system')}</table></div>
  <div class="card" style="margin-top:18px;padding:0 20px 20px"><div class="ch" style="padding:16px 0"><div class="t-sec" style="display:flex;gap:8px;align-items:center">${SP}Agent autonomy</div></div><div style="display:grid;grid-template-columns:repeat(3,1fr);gap:10px">${lv.map(l=>`<button class="persona ${S.autonomy===l[0]?'on':''}" ${l[0]==='bounded'?'disabled style="opacity:.55;cursor:not-allowed"':`data-a="auto" data-k="${l[0]}"`}><span><span class="b" style="display:block">${l[1]}</span><span class="t-small">${l[2]}</span></span></button>`).join('')}</div></div>
  <div class="card" style="margin-top:18px;overflow:hidden"><div class="ch"><div class="t-sec">Routing</div><span class="t-small">Fixed rules, not model judgement</span></div><table><tr><th>Difference</th><th>Owner</th><th>Escalates to</th></tr><tr><td>Price, total value, additional costs</td><td>Buyer</td><td>Category lead, above 10%</td></tr><tr><td>Payment terms</td><td>Buyer</td><td>Finance, beyond 5 extra days</td></tr><tr><td>Quantity, delivery date</td><td>Goods recipient</td><td>Planner, when production depends on it</td></tr><tr><td>Description, units</td><td>Buyer</td><td>None</td></tr></table></div></div>`}

/* ---------- chat ---------- */
const SUGG=['Has Helios changed prices before?','Why is net 45 high risk?','Does stock cover the shortfall?']
function answer(q){q=q.toLowerCase()
 if(/price|history|before|helios/.test(q))return 'One agreed price change in 24 months: +4.2% in Oct 2025. This +58% on line 1001 was not agreed, and the contract has no price escalation clause.'
 if(/45|terms|net|finance/.test(q))return 'A buyer can approve up to 5 extra days. Net 45 is 15 days beyond net 30, so it needs finance approval, or a rejection.'
 if(/short|quantity|stock|500|cover/.test(q))return '620 units of SKU-4410-A are in stock, so the 500 short is covered this month. The next order would need to be raised earlier.'
 if(/deliver|date|late|1004/.test(q))return 'Line 1004 moves from Jun 4 to Jul 14. Two production orders need it from Jun 10. Two other qualified suppliers carry this part.'
 return 'I answer from this order’s documents, the PO and the supplier’s history. Ask about price, terms, stock or delivery.'}

/* ---------- dialogs ---------- */
function emailText(){const o=O(),d=o.diffs,rej=d.filter(x=>x.dec==='reject'),acc=d.filter(x=>x.dec==='accept')
 const nm=(x)=>x.f.replace(/^Line (\d+) · (.*)$/,(m,a,b)=>`${b.toLowerCase()} on line ${a}`).replace(/^([A-Z])/,c=>c.toLowerCase())
 const fr=S.tone==='Friendly'
 return `${fr?'Hi Michael,':'Dear Michael,'}\n\nThank you for the order confirmation for PO 4994546957${o.ver===2?' (version 2)':''}. We have reviewed it against the purchase order.${acc.length?`\n\nWe accept the ${acc.map(nm).join(', ')}.`:''}${rej.length?`\n\nWe cannot accept the ${rej.map(x=>`${nm(x)} (${x.oc}; agreed ${x.po})`).join(', ')}.`:''}\n\nPlease send an updated confirmation. The full list of differences is attached.\n\n${fr?'Thanks,':'Kind regards,'}\nAdrian Smith\nProcurement, Tervana`}
function dialog(){const d=S.dialog,o=O();if(!d)return ''
 if(d==='validate'){const n=Object.keys(o.edited).length+Object.keys(o.ledited).length;return `<div class="scrim"><div class="dialog" role="dialog" aria-modal="true"><div class="dh">Confirm validation?</div><div class="db">${n?`${n} correction${n>1?'s are':' is'} saved and logged for audit.`:'You made no corrections.'} Once confirmed, the reading becomes the record. The agent then compares it with the purchase order and routes each difference to its owner.</div><div class="df"><button class="btn btn-g" data-a="close-d">Cancel</button><button class="btn btn-p" data-a="confirmval">Confirm validation</button></div></div></div>`}
 if(d==='save'){const r=role(),mine=o.diffs.filter(x=>x.own===r),over=mine.filter(x=>x.sug&&x.dec!==x.sug),acc=mine.filter(x=>x.dec==='accept').length,rej=mine.length-acc
  return `<div class="scrim"><div class="dialog" role="dialog" aria-modal="true" style="width:560px"><div class="dh">${over.length?`${over.length===1?'One decision differs':`${over.length} decisions differ`} from the agent’s suggestion`:`${r==='gr'?'Submit':'Save'} your decisions?`}</div><div class="db">
   ${over.length?`<div style="display:flex;flex-direction:column;gap:8px;margin:8px 0 14px">${over.map(x=>`<div style="display:flex;gap:10px;padding:12px 14px;border-radius:var(--r2);background:var(--med-t);color:var(--med-ink)">${I.warn}<div><b>${x.f}</b>: you chose to ${x.dec}; the agent suggested ${x.sug}.<div style="color:var(--ink-2);margin-top:2px;font-size:13px">${x.why}</div></div></div>`).join('')}</div>Are you sure? `:''}
   You are ${r==='gr'?'submitting':'saving'} <b>${acc} accepted</b> and <b>${rej} rejected</b>, recorded as decided by ${PEOPLE[r].n}.</div>
   <div class="df"><button class="btn btn-g" data-a="close-d">Go back</button><button class="btn btn-p" data-a="confirmsave">${over.length?'Yes, confirm':r==='gr'?'Submit':'Save'}</button></div></div></div>`}
 if(d==='settings')return `<div class="scrim"><div class="dialog" role="dialog" aria-modal="true"><div class="dh">Settings</div><div class="db" style="color:var(--ink)">
   ${[['sugg','Show the agent’s suggestion on each difference'],['email','Email me when a confirmation needs my decision']].map(x=>`<button style="display:flex;justify-content:space-between;align-items:center;gap:16px;width:100%;padding:14px 0;border-top:1px solid var(--line);text-align:left" role="switch" aria-checked="${S.prefs[x[0]]}" data-a="pref" data-k="${x[0]}">${x[1]}<span class="switch ${S.prefs[x[0]]?'on':''}"></span></button>`).join('')}
   <div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid var(--line)">Language<span class="muted">English</span></div><div style="display:flex;justify-content:space-between;align-items:center;padding:14px 0;border-top:1px solid var(--line)">Time zone<span class="muted">Europe/Berlin</span></div></div><div class="df"><button class="btn btn-p" data-a="close-d">Done</button></div></div></div>`
 if(d==='reply')return `<div class="scrim"><div class="dialog" role="dialog" aria-modal="true" style="width:660px"><div class="dh" style="display:flex;justify-content:space-between;align-items:center">Email the supplier <button class="ic" data-a="close-d" aria-label="Close">${I.x}</button></div><div class="db" style="color:var(--ink)">
  <div style="display:grid;grid-template-columns:72px 1fr;gap:10px;align-items:center;margin-top:6px"><span class="t-lab">To</span><div class="input"><span class="chip c-n">Michael Purdy</span><span class="chip c-n">Helios Components SCM</span></div>
  <span class="t-lab">Subject</span><input class="input" value="Re: Order confirmation for PO 4994546957"><span class="t-lab">Tone</span><select class="input" data-a="tone">${['Professional','Friendly'].map(t=>`<option ${S.tone===t?'selected':''}>${t}</option>`).join('')}</select></div>
  <div class="t-lab" style="display:flex;gap:6px;align-items:center;margin:16px 0 6px">${SP}Drafted by the agent from the decisions. Edit as you like.</div><textarea class="input" rows="13">${emailText()}</textarea>
  <div style="display:flex;align-items:center;gap:10px;margin-top:10px"><span class="chip c-high">PDF</span><span>Differences, version ${o.ver}.pdf</span></div></div>
  <div class="df"><button class="btn btn-g" data-a="close-d">Cancel</button><button class="btn btn-p" data-a="send">${I.send}Send</button></div></div></div>`
 return ''}

/* ---------- guide ---------- */
function next(){const o=O(),r=S.user
 if(!r)return['Sign in as David, in procurement operations. He checks what the agent read.',null]
 if(r==='admin')return['Emma connects the mailbox and the ERP, and sets how far the agent may act. Next, switch to David.',['switch','ops','Switch to David']]
 if(o.stage==='read'){if(r!=='ops')return['Nothing moves until operations validates the reading. Switch to David.',['switch','ops','Switch to David']]
  if(S.view==='worklist')return['Open the confirmation from Helios Components AG.',['open',null,'Open it']]
  if(o.editing)return['Correct values the agent was unsure of, in the header or the line items, then save.',null]
  return['Check the amber and red values against the supplier’s document. Edit if needed, then confirm validation.',null]}
 if(!o.saved.buyer){if(r!=='buyer')return['Gate 1 is done. Switch to Adrian, the buyer, to decide the commercial differences.',['switch','buyer','Switch to Adrian']]
  if(S.view==='worklist')return['The order now ranks high risk. Open it.',['open',null,'Open it']]
  if(S.tab==='Overview')return['The overview shows what the agent found and why. Then decide the differences that are yours.',['tab','Differences','Go to Differences']]
  return['Accept or reject your five differences. Try accepting one the agent suggests rejecting, then save.',null]}
 if(!o.saved.gr){if(r!=='gr')return['Quantity and delivery were routed to Rajan. Switch to him.',['switch','gr','Switch to Rajan']]
  if(S.view==='worklist')return['Rajan sees only what he can judge. Open the order.',['open',null,'Open it']]
  if(S.tab!=='Differences')return['Decide the two differences that are Rajan’s.',['tab','Differences','Go to Differences']]
  return['Accept or reject quantity and delivery against the store’s stock, then submit. Adrian’s decisions show who made them.',null]}
 if(!o.sent){if(r!=='buyer')return['Every decision is in. Switch back to Adrian to send the reply.',['switch','buyer','Switch to Adrian']]
  if(S.view==='worklist')return['Open the order. The reply is drafted.',['open',null,'Open it']]
  return['Gate 3: review the reply the agent drafted from the decisions, then send it.',['reply',null,'Review the reply']]}
 if(o.ver===1)return['The supplier answers. Simulate the revised confirmation.',r==='buyer'?['revise',null,'Simulate the revision']:['switch','buyer','Switch to Adrian']]
 if(!o.closed){if(!o.saved.buyer)return['Version 2 has two differences. Decide them, then save.',S.tab!=='Differences'?['tab','Differences','Go to Differences']:null]
  if(!o.sent)return['Send the reply on version 2.',['reply',null,'Review the reply']]
  return['Close the order. Everything stays on the record in Activity.',['close',null,'Close the order']]}
 return['That is the whole flow: three gates, three people, one record.',['reset',null,'Start again']]}
function coach(){if(!S.coach)return `<button class="coach-min btn btn-s" style="box-shadow:var(--e2)" data-a="coach">${I.help} Guide</button>`
 const [t,a]=next()
 return `<div class="coach fade" role="status"><div style="display:flex;justify-content:space-between;align-items:center"><span class="lbl">Guide</span><button style="color:#A7A9B2" data-a="coach" aria-label="Hide guide">${I.x}</button></div><p>${t}</p>${a?`<div style="margin-top:12px"><button class="btn btn-sm" style="background:#fff;color:var(--ink)" data-a="${a[0]}" ${a[0]==='switch'?`data-r="${a[1]}"`:a[0]==='tab'?`data-t="${a[1]}"`:''}>${a[2]}</button></div>`:''}</div>`}

/* ---------- render and events ---------- */
function render(){
  const app=document.getElementById('app'),ae=document.activeElement
  const keep=ae&&(ae.name==='q'||ae.dataset.a==='q')?{k:ae.dataset.a==='q'?'search':'chat',pos:ae.selectionStart}:null
  app.innerHTML=S.view==='login'?login():shell(S.view==='worklist'?worklist():order())
  if(keep){const el=keep.k==='search'?app.querySelector('[data-a=q]'):app.querySelector('input[name=q]');if(el){el.focus();try{el.setSelectionRange(keep.pos,keep.pos)}catch(e){}}}
}
function go(view){S.view=view;S.menu=S.bell=S.help=S.filt=false;render();window.scrollTo(0,0)}
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-a]')
  if(!el){if(e.target.closest('.pop'))return;if(S.menu||S.bell||S.help||S.filt){S.menu=S.bell=S.help=S.filt=false;render()}return}
  const a=el.dataset.a,o=O()
  if(['chatform','tone','q','fst'].includes(a))return
  const A={
   pick:()=>{S.picked=el.dataset.r;render()},
   login:()=>{S.user=S.picked;S.tab=null;S.view2='All';go('worklist')},
   home:()=>go('worklist'),
   open:()=>{S.tab=null;go('order')},
   tab:()=>{S.tab=el.dataset.t;S.view='order';S.menu=false;render();window.scrollTo(0,0)},
   menu:()=>{S.menu=!S.menu;S.bell=S.help=false;render()},
   bell:()=>{S.bell=!S.bell;S.menu=S.help=false;render()},
   help:()=>{S.help=!S.help;S.menu=S.bell=false;render()},
   coach:()=>{S.coach=!S.coach;S.help=false;render()},
   settings:()=>{S.menu=false;S.dialog='settings';render()},
   pref:()=>{S.prefs[el.dataset.k]=!S.prefs[el.dataset.k];render()},
   filt:()=>{S.filt=!S.filt;render()},
   view2:()=>{S.view2=el.dataset.v;render()},
   clearf:()=>{S.q='';S.view2='All';Object.keys(S.fStatus).forEach(k=>S.fStatus[k]=true);render()},
   switch:()=>{S.picked=el.dataset.r;S.user=el.dataset.r;S.tab=null;S.view2='All';S.q='';go('worklist');toast(`Signed in as ${PEOPLE[S.user].n}`)},
   signout:()=>{S.user=null;go('login')},
   reset:()=>{S=fresh();render()},
   edit:()=>{o.editing=true;S.tab='Extraction';render();setTimeout(()=>{const f=document.querySelector('[data-f=terms]');f&&f.focus()},50)},
   canceledit:()=>{o.editing=false;render()},
   saveedit:()=>{document.querySelectorAll('[data-f]').forEach(i=>{const k=i.dataset.f;if(i.value!==o.fields[k]){log('ops',`Corrected ${FIELDS.find(f=>f[0]===k)[1].toLowerCase()}: <s style="color:var(--ink-3)">${o.fields[k]}</s> → ${i.value}.`);o.fields[k]=i.value;o.edited[k]=true}});document.querySelectorAll('[data-l]').forEach(i=>{const [r,c]=i.dataset.l.split(':').map(Number),cur=o.lines[r][c];if(i.value!==cur){log('ops',`Corrected line ${o.lines[r][0]} ${['','','description','quantity','unit price','delivery date'][c]}: <s style="color:var(--ink-3)">${cur}</s> → ${i.value}.`);o.lines[r][c]=i.value;o.ledited[r+':'+c]=true}});o.editing=false;toast('Changes saved');render()},
   validate:()=>{S.dialog='validate';render()},
   'close-d':()=>{S.dialog=null;render()},
   confirmval:()=>{o.stage='validated';o.editing=false;S.dialog=null;log('ops','Validation confirmed. The reading is now the record.');log('agent','Compared with the PO: 7 differences, high risk. 5 routed to Adrian Smith, 2 to Rajan Nair.');toast('Validated. The agent has compared it with the PO.');render()},
   dec:()=>{const d=o.diffs.find(x=>x.id===el.dataset.id);d.dec=d.dec===el.dataset.v?null:el.dataset.v;render()},
   acceptsug:()=>{o.diffs.filter(d=>d.own===S.user&&d.sug).forEach(d=>d.dec=d.sug);toast('Suggestions applied. Check each before saving.');render()},
   savedec:()=>{S.dialog='save';render()},
   confirmsave:()=>{const r=S.user;o.saved[r]=true;S.dialog=null;const ds=o.diffs.filter(d=>d.own===r),ov=ds.filter(d=>d.sug&&d.dec!==d.sug)
     log(r,`${r==='gr'?'Submitted':'Saved'} decisions: ${ds.filter(d=>d.dec==='accept').length} accepted, ${ds.filter(d=>d.dec==='reject').length} rejected.${ov.length?` ${ov.length} differ${ov.length===1?'s':''} from the agent’s suggestion: ${ov.map(d=>d.f.toLowerCase()).join(', ')}.`:''}`)
     if(o.saved.buyer&&o.saved.gr)log('agent','Every decision is in. Reply to the supplier drafted.');toast(r==='gr'?'Decisions submitted':'Decisions saved');render()},
   reply:()=>{S.tab='Differences';S.view='order';S.dialog='reply';render()},
   send:()=>{o.sent=true;S.dialog=null;log('buyer',`Reply sent to Helios Components AG${o.ver===2?' on version 2':''}.`);if(o.ver===1)log('agent','Watching the mailbox for a revised confirmation.');toast('Email sent to the supplier');render()},
   revise:()=>{o.ver=2;o.sent=false;o.saved={buyer:false,gr:true};o.diffs=DIFFS2();log('agent','Revised confirmation 1505899/2 received and read. 2 differences remain; quantity and delivery now match the PO.');S.flash='row';setTimeout(()=>S.flash=null,1700);toast('Version 2 arrived');S.tab='Overview';render()},
   close:()=>{o.closed=true;log('buyer','Order closed.');log('sys','Confirmation archived with both versions.');toast('Order closed');render()},
   conn:()=>{const k=el.dataset.k;S.conn[k]=!S.conn[k];log('admin',`${k==='mail'?'Mailbox':'ERP system'} ${S.conn[k]?'connected':'disconnected'}.`);render()},
   auto:()=>{S.autonomy=el.dataset.k;toast('Autonomy updated');render()},
   sugg:()=>{const q=el.dataset.q;S.chat.push({me:true,t:q},{me:false,t:answer(q)});render()},
  }
  if(A[a]){e.preventDefault();A[a]()}
})
document.addEventListener('submit',e=>{const f=e.target;if(f.dataset.a==='chatform'){e.preventDefault();const q=f.q.value.trim();if(!q)return;S.chat.push({me:true,t:q},{me:false,t:answer(q)});render()}})
document.addEventListener('change',e=>{const t=e.target;if(t.dataset.a==='tone'){S.tone=t.value;render()}if(t.dataset.a==='fst'){S.fStatus[t.dataset.k]=t.checked;render()}})
document.addEventListener('input',e=>{const t=e.target;if(t.dataset.a==='q'){S.q=t.value;render()}if(t.dataset.f){t.classList.toggle('changed',t.value!==O().fields[t.dataset.f])}if(t.dataset.l){const [r,c]=t.dataset.l.split(':').map(Number);t.classList.toggle('changed',t.value!==O().lines[r][c])}})
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&(S.dialog||S.menu||S.bell||S.help||S.filt)){S.dialog=null;S.menu=S.bell=S.help=S.filt=false;render()}})
render()
