// Captures the story and film screens from the live prototype (public/prototypes/order-confirmations). Serve public/ on :4180, then run with NODE_PATH=$(npm root -g) node tools/lucid/capture.cjs; output goes to /tmp/cap.
const { chromium } = require('playwright');const fs=require('fs');
const BASE=`S=fresh();S.coach=false;`
const P=(u,view,tab)=>BASE+`S.user='${u}';S.picked='${u}';S.view='${view}';S.tab=${tab?`'${tab}'`:'null'};`
const VAL=`S.o.stage='validated';`, BD=`S.o.diffs.forEach(d=>{if(d.own==='buyer')d.dec=d.sug});`, GD=`S.o.diffs.find(d=>d.id==='qty').dec='accept';S.o.diffs.find(d=>d.id==='date').dec='reject';`
const SAVEB=`S.o.saved.buyer=true;`,SAVEG=`S.o.saved.gr=true;`
const T=(t)=>`S.toast='${t}';`
const SHOTS=[
 ['admin-setup',P('admin','worklist')+`S.conn={mail:false,erp:false};`,['.card']],
 ['admin-connected',P('admin','worklist'),['.card']],
 ['signin-ops',BASE+`S.view='login';S.picked='ops';`,['.login .card']],
 ['ops-worklist',P('ops','worklist'),['tr.click']],
 ['ops-read',P('ops','order','Extraction'),['.meta span:last-child','.split']],
 ['ops-edit',P('ops','order','Extraction')+`S.o.editing=true;`,['.split .card']],
 ['ops-editing',P('ops','order','Extraction')+`S.o.editing=true;`,['[data-f=terms]'],async p=>{await p.fill('[data-f=terms]','GL15: Net 45 days');await p.focus('[data-f=terms]')}],
 ['ops-confirm',P('ops','order','Extraction')+`S.o.fields.terms='GL15: Net 45 days';S.o.edited.terms=true;S.dialog='validate';`,['.dialog']],
 ['ops-saved',P('ops','order','Extraction')+`S.o.fields.terms='GL15: Net 45 days';S.o.edited.terms=true;`+T('Changes saved'),['.toast']],
 ['ops-validate',P('ops','order','Extraction')+`S.o.fields.terms='GL15: Net 45 days';S.o.edited.terms=true;S.dialog='validate';`,['.dialog']],
 ['ops-validated',P('ops','order','Extraction')+VAL+`S.o.fields.terms='GL15: Net 45 days';S.o.edited.terms=true;`+T('Validated. The agent has compared it with the PO.'),['.toast']],
 ['buyer-worklist',P('buyer','worklist')+VAL,['.card']],
 ['buyer-review',P('buyer','order','Differences')+VAL,['.grid2 > div > .card']],
 ['buyer-extraction',P('buyer','order','Extraction')+VAL,['.ptabs button.on','.split']],
 ['buyer-decided',P('buyer','order','Differences')+VAL+BD,['.grid2 > div > .card']],
 ['buyer-saved',P('buyer','order','Differences')+VAL+BD+SAVEB+T('Decisions saved'),['.toast']],
 ['gr-worklist',P('gr','worklist')+VAL+BD+SAVEB,['tr.click']],
 ['gr-review',P('gr','order','Differences')+VAL+BD+SAVEB,['MINE']],
 ['gr-decided',P('gr','order','Differences')+VAL+BD+SAVEB+GD,['MINE']],
 ['gr-confirm',P('gr','order','Differences')+VAL+BD+SAVEB+GD,['[data-a=savedec]']],
 ['gr-submit',P('gr','order','Differences')+VAL+BD+SAVEB+GD+`S.dialog='save';`,['.dialog']],
 ['buyer-share',P('buyer','order','Differences')+VAL+BD+GD+SAVEB+SAVEG,['.rec .next']],
 ['buyer-sent',P('buyer','order','Differences')+VAL+BD+GD+SAVEB+SAVEG+`S.o.sent=true;`+T('Email sent to the supplier'),['.rec .next']],
 ['buyer-versions',P('buyer','worklist')+VAL+`S.o.ver=2;S.o.sent=false;S.o.saved={buyer:false,gr:true};S.o.diffs=DIFFS2();S.flash='row';`,['tr.click']],
 ['gr-worklist-2',P('gr','worklist')+VAL+`S.o.ver=2;S.o.sent=false;S.o.saved={buyer:false,gr:true};S.o.diffs=DIFFS2();`,['tr.click']],
 ['buyer-revised',P('buyer','order','Differences')+VAL+`S.o.ver=2;S.o.sent=false;S.o.saved={buyer:false,gr:true};S.o.diffs=DIFFS2();`,['.head .t-page','.head .meta']],
 ['buyer-activity',P('buyer','order','Activity')+VAL,['.grid2 > .card'],null,`
   S.events=[{d:'31 Mar 2026',t:'17:30',who:'sys',x:'Confirmation archived with both versions.'},{d:'31 Mar 2026',t:'17:29',who:'buyer',x:'Order closed.'},{d:'27 Mar 2026',t:'20:30',who:'buyer',x:'Reply sent to Helios Components AG on version 2.'},{d:'27 Mar 2026',t:'09:12',who:'agent',x:'Revised confirmation 1505899/2 received and read. 2 differences remain.'},{d:'26 Mar 2026',t:'17:30',who:'buyer',x:'Reply sent to Helios Components AG.'},{d:'26 Mar 2026',t:'17:02',who:'gr',x:'Submitted decisions: 1 accepted, 1 rejected.'},{d:'23 Mar 2026',t:'16:30',who:'buyer',x:'Saved decisions: 2 accepted, 3 rejected.'},{d:'22 Mar 2026',t:'14:27',who:'agent',x:'Compared with the PO: 7 differences, high risk. 5 routed to Adrian Smith, 2 to Rajan Nair.'},{d:'22 Mar 2026',t:'14:20',who:'ops',x:'Corrected payment terms: GI15 → GL15. Validation confirmed.'},{d:'19 Mar 2026',t:'00:47',who:'agent',x:'Confirmation 1505899 received by email and read, 87% average confidence.'}];`],
];
(async()=>{const b=await chromium.launch();const rings={};
for(const [id,setup,sels,act,extra] of SHOTS){
  const p=await b.newPage({viewport:{width:1440,height:899},deviceScaleFactor:2});const errs=[];p.on('pageerror',e=>errs.push(e.message))
  await p.goto('http://localhost:4180/prototypes/order-confirmations/');await p.evaluate(()=>document.fonts.ready)
  await p.addStyleTag({content:'.coach,.coach-min{display:none!important}'+(id==='signin-ops'?'.login>div{grid-template-columns:420px!important}.login>div>.card:nth-child(2){display:none}':'')});await p.evaluate(setup+(extra||'')+'render();window.scrollTo(0,0)');await p.waitForTimeout(300);if(id.startsWith('gr-')&&!id.includes('worklist')){await p.evaluate(()=>window.scrollTo(0,330));}await p.waitForTimeout(300)
  if(act)await act(p);await p.waitForTimeout(150)
  rings[id]=await p.evaluate((sels)=>{const W=innerWidth,H=innerHeight;return sels.map(s=>{let els=s==='MINE'?[...document.querySelectorAll('[data-a=dec]')].map(e=>e.closest('tr')):[...document.querySelectorAll(s)].slice(0,s==='.card'?1:99);
    if(s==='tr.click')els=els.slice(0,1);const rs=els.map(e=>e.getBoundingClientRect());const l=Math.min(...rs.map(r=>r.left)),t=Math.min(...rs.map(r=>r.top)),r=Math.max(...rs.map(r=>r.right)),bt=Math.max(...rs.map(r=>r.bottom));const pad=6;
    const x0=Math.max(0,l-pad),y0=Math.max(0,t-pad),x1=Math.min(W,r+pad),y1=Math.min(H,bt+pad);return [+(x0/W).toFixed(3),+(y0/H).toFixed(3),+((x1-x0)/W).toFixed(3),+((y1-y0)/H).toFixed(3)]})},sels)
  await p.screenshot({path:`/tmp/cap/${id}.png`});if(errs.length)console.log(id,errs);await p.close()}
// email overlay: the dialog alone, in the tall window the player crops to
const p=await b.newPage({viewport:{width:638,height:1059},deviceScaleFactor:2})
await p.goto('http://localhost:4180/prototypes/order-confirmations/');await p.evaluate(()=>document.fonts.ready)
await p.evaluate(P('buyer','order','Differences')+VAL+BD+GD+SAVEB+SAVEG+`S.dialog='reply';render();`)
await p.addStyleTag({content:`body{min-width:0!important}.top,.head,.wrap{visibility:hidden}.scrim{background:#F6F6F4!important;display:block!important}.dialog{position:absolute;left:80px;top:60px;width:478px!important;height:897px;max-height:none!important;display:flex;flex-direction:column;animation:none!important}.dialog .db{flex:1;display:flex;flex-direction:column}.dialog textarea{flex:1;resize:none}.dialog .dh{padding-top:20px}`})
await p.waitForTimeout(300);await p.screenshot({path:'/tmp/cap/buyer-email.png'});await p.close()
fs.writeFileSync('/tmp/cap/rings.json',JSON.stringify(rings));console.log(JSON.stringify(rings).slice(0,600));await b.close()})()
