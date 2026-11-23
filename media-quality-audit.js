(()=>{'use strict';
/* Media QA build: official US Open clips in the EXISTING video modal;
   live diagnostics are available in console only; no audit panel on public page. */
const $=(s,ctx=document)=>ctx.querySelector(s),$$=(s,ctx=document)=>Array.from(ctx.querySelectorAll(s));
const clips={
'Coco Gauff':{id:'Uokrq2th_Ew',label:'Coco Gauff vs Elena Rybakina — 2026 US Open semifinal highlights',publisher:'US Open Tennis Championships'},
'Naomi Osaka':{id:'XrWhVZtc6C8',label:'Naomi Osaka vs Anastasia Zakharova — 2026 US Open first-round highlights',publisher:'US Open Tennis Championships'},
'Taylor Townsend':{id:'2xvJ-L--OiE',label:'Taylor Townsend vs Taylah Preston — 2026 US Open extended highlights',publisher:'US Open Tennis Championships'},
'Frances Tiafoe':{id:'mya1uUNdekU',label:'Martin Damm vs Frances Tiafoe — 2026 US Open extended highlights',publisher:'US Open Tennis Championships'},
'Ben Shelton':{id:'xbQh2JV5wug',label:'Ben Shelton vs Stefanos Tsitsipas — 2026 US Open featured point',publisher:'US Open Tennis Championships'}
};
function show(name){
 const c=clips[name],modal=$('#videoModal'),box=$('#videoBox');
 if(!c||!modal||!box)return false;
 const title=$('#videoTitle');if(title)title.textContent=c.label;
 box.replaceChildren();box.classList.add('media-picker');
 const embed=document.createElement('iframe');
 embed.src='https://www.youtube-nocookie.com/embed/'+c.id+'?autoplay=1&rel=0';
 embed.title=c.label;embed.allow='autoplay;encrypted-media;picture-in-picture';embed.allowFullscreen=true;
 embed.style.cssText='width:100%;min-height:240px;aspect-ratio:16/9;border:0;border-radius:9px;display:block';
 const context=document.createElement('p');context.className='playnote';
 context.textContent='Verified publisher: '+c.publisher+'. This is past-match footage, not an upcoming match or live broadcast.';
 const fallback=document.createElement('a');fallback.href='https://www.youtube.com/watch?v='+c.id;fallback.textContent='View official video if embedding is restricted';fallback.className='mini media-link';fallback.target='_blank';fallback.rel='noopener noreferrer';
 box.append(embed,context,fallback);modal.classList.add('open');document.body.classList.add('noscroll');
 return true;
}
let connected=0;
for(const card of $$('#tennis .tvtennis-player')){
 const title=$('strong',card)?.textContent.trim(),clip=clips[title];
 if(!clip)continue;
 const actions=$('.tvtennis-links',card),a=actions?.querySelector('a');
 if(!a)continue;
 a.textContent='▶ Watch Highlights';
 a.href='https://www.youtube.com/watch?v='+clip.id;
 a.title=clip.label+' · plays inside TV Guide';
 a.setAttribute('aria-label','Watch '+title+' highlights on Williams TV Guide');
 a.addEventListener('click',event=>{event.preventDefault();event.stopImmediatePropagation();show(title)},true);
 connected++;
}
// The existing guide presents movie artwork and trailers. Keep statistics separate from viewing UI.
function audit(){
 const items=$$('#platforms .card');
 const images=items.map(card=>card.querySelector('img.poster')).filter(Boolean);
 const missingPoster=items.filter(card=>!card.querySelector('img.poster'));
 const failedPoster=images.filter(img=>img.complete&&img.naturalWidth===0);
 const loadedPoster=images.filter(img=>img.complete&&img.naturalWidth>0);
 const trailers=$$('#platforms .trailerBtn');
 const byMode={connected:0,publisherLink:0,searchOnly:0,other:0};
 for(const b of trailers){
  const mode=b.dataset.build23Media;
  if(mode==='connected')byMode.connected++;
  else if(mode==='external')byMode.publisherLink++;
  else if(mode==='search')byMode.searchOnly++;
  else byMode.other++;
 }
 const sports=$$('#sports .tvguide-sport-card');
 const videoButtons=$$('#sports .tvguide-inline-video');
 return {
  totalFilmCards:items.length,posterTags:images.length,posterLoaded:loadedPoster.length,
  posterFailed:failedPoster.length,posterMissing:missingPoster.length,
  trailers:byMode, sportsCards:sports.length,
  sportsVideoButtons:videoButtons.length,
  sportsVideoIDs:videoButtons.filter(x=>x.dataset.status==='connected').length,
  sportsSearchOnly:videoButtons.filter(x=>x.dataset.status==='search').length,
  tennisPlayers:$$('#tennis .tvtennis-player').length,
  tennisOfficialVideos:connected,
  disclaimers:'Poster loaded does not establish edition correctness; a valid YouTube ID does not establish playable embedding or matching film. No live audio/broadcast certified.'
 }
}
window.WilliamsMediaQualityAudit=audit;
window.WilliamsOfficialTennisClips=Object.fromEntries(Object.entries(clips).map(([k,v])=>[k,{id:v.id,source:v.publisher,description:v.label}]));
})();