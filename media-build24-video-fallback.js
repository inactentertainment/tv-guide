(()=>{
'use strict';
// Build 21: never show a nonfunctional embedded player for a title with no usable video ID.
const valid=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const root=document.getElementById('platforms');
if(!root)return;
const dataEl=document.getElementById('data');
let items=[];try{items=JSON.parse(dataEl?.textContent||'{}').items||[]}catch{}
const byKey=new Map(items.map(i=>[i.platform+'|'+i.cat+'|'+i.title,i]));
let unresolved=0;
const normalized=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
for(const button of root.querySelectorAll('.trailerBtn')){
 const card=button.closest('.card');
 const item=byKey.get(card?.dataset.key)||items.find(i=>normalized(i.title)===normalized(button.dataset.title));
 if(!item)continue;
 // Build 16 audit and known preview scripts can set a playable ID after constructing the cards.
 const id=valid(button.dataset.id)?button.dataset.id:(valid(item.trailer)?item.trailer:'');
 if(id)continue;
 unresolved++;
 button.textContent='Find title preview';
 button.title='No verified direct video is linked. Search YouTube for this exact title; results are not automatically verified.';
 button.dataset.mediaAudit='external-search-required';
 button.setAttribute('aria-label','Search for a preview of '+item.title+' on YouTube');
}
root.addEventListener('click',event=>{
 const button=event.target.closest?.('.trailerBtn[data-media-audit="external-search-required"]');
 if(!button)return;
 const card=button.closest('.card');
 const item=byKey.get(card?.dataset.key)||items.find(i=>normalized(i.title)===normalized(button.dataset.title));
 if(!item)return;
 event.preventDefault();event.stopImmediatePropagation();
 const year=(String(item.genre||'').match(/\b(?:19|20)\d{2}\b/)||[])[0];
 const mediaType=item.cat==='Series'?'series':(String(item.genre||'').toLowerCase().includes('series')?'series':'film');
 const term=[item.title,year,mediaType,'official trailer'].filter(Boolean).join(' ');
 window.open('https://www.youtube.com/results?search_query='+encodeURIComponent(term),'_blank','noopener,noreferrer');
},true);
window.WilliamsBuild21Status={unresolvedDirectVideoReferences:unresolved,totalTitles:items.length,notes:'External search is a fallback, not a verified embedded trailer; source availability and playback remain untested.'};
})();