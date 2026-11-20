const { chromium } = require('playwright');
const ids = process.argv.slice(2);
(async()=>{const b=await chromium.launch();
for(const id of ids){
  const size = id.startsWith('admin')?{width:1444,height:975}: id==='buyer-email'?{width:638,height:1059}:{width:1440,height:899};
  const p=await b.newPage({viewport:size,deviceScaleFactor:2});
  const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto('file://./screens.html#'+id);await p.evaluate(()=>document.fonts.ready);await p.waitForTimeout(150);
  await p.screenshot({path:`./out/${id}.png`});
  if(errs.length)console.log(id,errs);await p.close();}
await b.close();})()
