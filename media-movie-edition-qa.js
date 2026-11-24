(()=>{'use strict';
/* Movie Build 2: check the title/edition against known IMDb poster IDs.
   No public audit UI, no new provider, no card/layout changes. */
const data=document.getElementById('data'),root=document.getElementById('platforms');
if(!data||!root)return;
let items=[];try{items=JSON.parse(data.textContent).items||[]}catch{return}
const k=i=>[i.platform,i.cat,i.title].join('|');
const known=new Map(items.map(i=>[k(i),i]));
const ledger={cards:0,tagged:0,wrongImdbPosterIds:[],missingPosterElements:[],sourceUnconfirmed:[],fixed:0,unknownImages:0,notes:'The presence of a correct IMDb ID is not proof that image loads or depicts the correct poster. Browser and editorial verification remain necessary.'};
const idIn=url=>(String(url||'').match(/tt\d{7,9}/)||[])[0]||null;
function findCard(el){return el.closest('.card')}
for(const card of root.querySelectorAll('.card')){
 const item=known.get(card.dataset.key);
 ledger.cards++;
 if(!item)continue;
 const img=card.querySelector('img.poster');
 if(!img){ledger.missingPosterElements.push(item.title);continue}
 img.alt='Poster artwork for '+item.title;
 img.decoding='async';
 ledger.tagged++;
}
fetch('./media-build19-patches.json?v=9',{cache:'force-cache'}).then(r=>r.ok?r.json():null).then(patch=>{
 if(!patch||!patch.posterImdb)return;
 for(const card of root.querySelectorAll('.card')){
 const item=known.get(card.dataset.key);if(!item)continue;
 const wanted=patch.posterImdb[item.title];if(!wanted)continue;
 const image=card.querySelector('img.poster');
 if(!image)continue;
 const has=idIn(image.currentSrc||image.src);
 if(has&&has!==wanted){
  ledger.wrongImdbPosterIds.push({title:item.title,expected:wanted,received:has});
  const verified='https://images.metahub.space/poster/medium/'+wanted+'/img';
  const old=image.src;
  // Probe exact-catalog IMDb artwork before replacing any currently visible poster.
  const probe=new Image();
  probe.onload=()=>{if(!image.isConnected)return;image.src=verified;image.alt='IMDb-matched poster for '+item.title;ledger.fixed++};
  probe.onerror=()=>{ledger.sourceUnconfirmed.push(item.title)};
  probe.src=verified;
 }
 }
}).catch(()=>{});
function audit(){
 const cards=[...root.querySelectorAll('.card')];
 const images=cards.map(card=>card.querySelector('img.poster'));
 const missing=cards.filter((_,i)=>!images[i]).length;
 const loading=images.filter(img=>img&&!img.complete).length;
 const successful=images.filter(img=>img&&img.complete&&img.naturalWidth>0).length;
 const failed=images.filter(img=>img&&img.complete&&img.naturalWidth===0).length;
 const buttons=[...root.querySelectorAll('.trailerBtn')];
 return {...ledger,displayedCards:cards.length,posterSuccessful:successful,posterLoading:loading,posterFailed:failed,posterMissing:missing,trailerModes:{
 embedded:buttons.filter(b=>b.dataset.build23Media==='connected').length,
 publisher:buttons.filter(b=>b.dataset.build23Media==='external').length,
 unresolved:buttons.filter(b=>b.dataset.build23Media==='search').length
 }};
}
window.WilliamsMovieEditionAudit=audit;
})();