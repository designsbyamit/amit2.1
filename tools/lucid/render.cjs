const { chromium } = require('playwright');const path=require('path');const fs=require('fs');
const ids = process.argv.slice(2); const here=__dirname;
(async()=>{const b=await chromium.launch();const rings={};
for(const id of ids){
  const size = id==='buyer-email'?{width:638,height:1059}:{width:1440,height:899};
  const p=await b.newPage({viewport:size,deviceScaleFactor:2});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://'+path.join(here,'screens.html')+'#'+id);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
  await p.screenshot({path:path.join(here,'out',id+'.png')});
  rings[id]=await p.evaluate(()=>{const W=innerWidth,H=innerHeight,g={};document.querySelectorAll('[data-ring]').forEach(el=>{const r=el.getBoundingClientRect(),k=el.dataset.ring;const o=g[k]||(g[k]={l:1e9,t:1e9,r:-1e9,b:-1e9});o.l=Math.min(o.l,r.left);o.t=Math.min(o.t,r.top);o.r=Math.max(o.r,r.right);o.b=Math.max(o.b,r.bottom)});const pad=6;return Object.values(g).map(o=>[+((o.l-pad)/W).toFixed(3),+((o.t-pad)/H).toFixed(3),+((o.r-o.l+2*pad)/W).toFixed(3),+((o.b-o.t+2*pad)/H).toFixed(3)])});
  if(errs.length)console.log(id,errs);await p.close();}
fs.writeFileSync(path.join(here,'out','rings.json'),JSON.stringify(rings));
await b.close();})()
