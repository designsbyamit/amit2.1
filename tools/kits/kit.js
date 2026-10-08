(function(){
  var kits=__KITS__;
  function show(kit){if(kits.indexOf(kit)<0)kit=kits[0];document.querySelectorAll('[data-panel]').forEach(function(p){p.hidden=p.dataset.panel!==kit});document.querySelectorAll('[data-kit]').forEach(function(t){t.setAttribute('aria-current',t.dataset.kit===kit?'page':'false')});window.scrollTo(0,0)}
  function setMode(m){document.querySelectorAll('[data-mode]').forEach(function(d){d.hidden=d.dataset.mode!==m});document.querySelectorAll('[data-set]').forEach(function(b){b.setAttribute('aria-pressed',b.dataset.set===m?'true':'false')});try{localStorage.setItem('df:mode',m)}catch(e){}}
  window.addEventListener('hashchange',function(){show(location.hash.slice(1))});
  document.querySelectorAll('[data-set]').forEach(function(b){b.addEventListener('click',function(){setMode(b.dataset.set)})});
  var saved={};try{saved=JSON.parse(localStorage.getItem('df:notes')||'{}')}catch(e){}
  function persist(){try{localStorage.setItem('df:notes',JSON.stringify(saved))}catch(e){}}
  document.querySelectorAll('[data-save]').forEach(function(el){if(saved[el.id]!==undefined){if(el.type==='checkbox')el.checked=saved[el.id];else el.value=saved[el.id]}el.addEventListener('input',function(){saved[el.id]=el.type==='checkbox'?el.checked:el.value;persist();score()})});
  // decision scores
  function score(){document.querySelectorAll('[data-opt]').forEach(function(r){var v={};r.querySelectorAll('[data-k]').forEach(function(i){v[i.dataset.k]=parseFloat(i.value)});var out=r.querySelector('[data-score]');if(v.b&&v.u&&v.c&&v.e){out.textContent=((v.b+v.u)*v.c/v.e).toFixed(1)}else out.textContent='—'})}
  score();
  // draw a card (both panels share ids only once; deck lives in the template panel)
  var deckEl=document.getElementById('deck');
  if(deckEl){var deck=JSON.parse(deckEl.textContent);var last=-1;document.querySelectorAll('#drawbtn').forEach(function(btn){btn.addEventListener('click',function(){var i;do{i=Math.floor(Math.random()*deck.length)}while(i===last&&deck.length>1);last=i;var c=deck[i];var card=btn.parentNode;card.querySelector('#dk').textContent=c.k;card.querySelector('#dt').textContent=c.t||'';card.querySelector('#dt').hidden=!c.t;card.querySelector('#dq').textContent=c.q})})}
  // correlation finder
  var chEl=document.getElementById('chains'),dEl=document.getElementById('kpidefs');
  if(chEl){var chains=JSON.parse(chEl.textContent),defs=JSON.parse(dEl.textContent);
    function esc(s){return String(s).replace(/[&<>"]/g,function(c){return{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]})}
    function col(t,arr){return '<div class="link"><p class="ov">'+t+'</p>'+(arr.length?arr.map(function(k){return '<span class="k">'+esc(k)+'</span><p class="d">'+esc(defs[k]||'')+'</p>'}).join(''):'<p class="d">No standard measure yet. Define one for your context.</p>')+'</div>'}
    function render(root,i){var c=chains[i];root.querySelectorAll('[data-chain]').forEach(function(b){b.setAttribute('aria-selected',b.dataset.chain==i?'true':'false')});root.querySelector('.chain').innerHTML=col('Business KPIs',c.biz)+col('User KPIs',c.user)+col('Design KPIs',c.design)+col('AI design KPIs',c.ai)+'<p class="chainwhy"><b>Why they move together:</b> '+esc(c.why)+'</p>'}
    document.querySelectorAll('.finder').forEach(function(root){root.querySelectorAll('[data-chain]').forEach(function(b){b.addEventListener('click',function(){render(root,+b.dataset.chain)})});render(root,0)});
  }
  // library search
  document.querySelectorAll('#kq').forEach(function(q){q.addEventListener('input',function(){var t=q.value.toLowerCase();var panel=q.closest('article');panel.querySelectorAll('tbody tr').forEach(function(r){r.hidden=t&&r.textContent.toLowerCase().indexOf(t)<0})})});
  var m='tpl';try{m=localStorage.getItem('df:mode')||'tpl'}catch(e){}
  show(location.hash.slice(1));setMode(m);
})();
