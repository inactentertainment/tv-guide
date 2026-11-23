(()=>{'use strict';
const doc=document,$=s=>doc.querySelector(s),$$=s=>Array.from(doc.querySelectorAll(s));
const css=doc.createElement('style');
css.textContent=[
'.quicknav .williams-sports-three{gap:clamp(7px,1.1vw,17px)!important}',
'.quicknav .williams-sport-icon,.quicknav .williams-sports-three .williams-sport-icon,.quicknav .dock-jukebox,.quicknav .quickaction,.quicknav #quickSaved,.quicknav .quick-search-btn,.quicknav .quickactions a[href="#top"]{background:transparent!important;border:0!important;box-shadow:none!important;outline-offset:2px!important;transition:transform .18s ease,filter .18s ease!important}',
'.quicknav .williams-sport-icon:hover,.quicknav .williams-sport-icon:focus-visible,.quicknav .dock-jukebox:hover,.quicknav .dock-jukebox:focus-visible,.quicknav .quickaction:hover,.quicknav .quickaction:focus-visible,.quicknav #quickSaved:hover,.quicknav #quickSaved:focus-visible{transform:scale(1.16)!important;filter:drop-shadow(0 0 5px #efd49a88)!important}',
'.quicknav .williams-sport-icon .williams-sport-tip{bottom:calc(100% + 12px)!important;display:none!important}',
'.quicknav .williams-sport-icon:hover .williams-sport-tip,.quicknav .williams-sport-icon:focus-visible .williams-sport-tip{display:block!important}',
'.quicknav .williams-sports-three{overflow:visible!important}',
'.quicknav .quicklogos .brand:hover,.quicknav .quicklogos .brand:focus-visible{transform:scale(1.08)!important}',
'#sports .tvguide-heading{display:flex;align-items:center;gap:12px;font:700 clamp(1.7rem,3vw,2.4rem) Georgia,serif!important;color:#f2d18f!important;margin:24px 0 8px!important;line-height:1.15}',
'#sports .tvguide-heading svg{height:40px;width:40px;flex:none}',
'#sports .tvguide-section-desc{font:15px/1.5 Georgia,serif;color:#d8c9b2;margin:0 0 16px}',
'#sports .tvguide-match-visual{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 14px;margin:8px 0 12px;border-radius:12px;background:#ffffff0a}',
'#sports .tvguide-contender{min-width:0;display:flex;flex-direction:column;align-items:center;gap:5px;width:46%;text-align:center;font:12px Georgia,serif;color:#ece6df}',
'#sports .tvguide-contender img{width:66px;height:66px;object-fit:cover;border-radius:50%;background:#182b3d;border:1px solid #9c8363}',
'#sports .tvguide-contender .tvguide-photo-fallback{display:grid;place-items:center;width:66px;height:66px;border-radius:50%;background:linear-gradient(145deg,#253c4d,#71553b);color:#fff1cc;font:700 18px Georgia,serif;border:1px solid #9c8363}',
'#sports .tvguide-versus{font:700 15px Georgia,serif;color:#ffe3a5}',
'#sports .tvguide-sport-card{overflow:visible}',
'#sports .tvguide-inline-video{border:1px solid #c19c61;background:#5b4125;color:#fff4dd;padding:8px 12px;border-radius:8px;font:700 13px Georgia,serif;cursor:pointer}',
'#sports .tvguide-inline-video:hover{background:#9b7138}',
'#sports .tvguide-inline-video[data-status="search"]{background:#414b5b;border-color:#667688}',
'#sports .tvguide-video-disclosure{font:12px Georgia,serif;color:#c9c4b9;margin:6px 0}',
'#holidayJukebox .tvguide-jukebox-source{color:#f8dda8;font:13px Georgia,serif;padding:8px;background:#132537;display:block;text-align:center}',
'@media(max-width:650px){.quicknav .williams-sports-three{gap:7px!important}#sports .tvguide-match-visual{gap:6px;padding:10px 8px}#sports .tvguide-contender img,#sports .tvguide-contender .tvguide-photo-fallback{width:55px;height:55px}}',
'@media(prefers-reduced-motion:reduce){.quicknav .williams-sport-icon,.quicknav .dock-jukebox,.quicknav .quickaction{transition:none!important}}'
].join('\n');doc.head.append(css);
const icons={basketball:'<circle cx="24" cy="24" r="19" fill="#b27841" stroke="#462a1b" stroke-width="2"/><path d="M5 24h38M24 5v38M9 12Q24 24 9 36M39 12Q24 24 39 36" fill="none" stroke="#4a2a18" stroke-width="2.3"/>',fights:'<path d="M13 33C6 26 8 17 16 11c6-4 13-4 18 1 5 5 3 13-1 18l-3 7H15z" fill="#a34635" stroke="#4c2420" stroke-width="2"/><path d="M16 32q7 6 16-1M14 22q-2 6 3 9M15 38h16" stroke="#e5b58b" stroke-width="2" fill="none"/><rect x="15" y="39" width="16" height="5" rx="1" fill="#6c3b29"/>',football:'<path d="M6 32C7 16 23 6 42 11c0 19-17 30-34 27z" fill="#86502b" stroke="#482b1c" stroke-width="2.4"/><path d="M13 32 35 16M20 24l7 7M25 20l7 7M30 16l7 7" fill="none" stroke="#f2dcb8" stroke-width="2"/>'};
const descriptions={basketball:'NBA matchups, game highlights and current team previews.',fights:'Major boxing matches and UFC events, with fighter highlights and previews.',football:'Featured NFL matchups, team highlights and schedule links.'};
for(const [id,label] of [['basketball','Basketball'],['fights','Fights'],['football','Football']]){
 const target=$('#'+id);if(!target)continue;
 const header=target.matches('h1,h2,h3')?target:target.querySelector('h1,h2,h3');
 if(!header)continue;
 header.classList.add('tvguide-heading');
 header.textContent='';
 const icon=doc.createElementNS('http://www.w3.org/2000/svg','svg');
 icon.setAttribute('viewBox','0 0 48 48');icon.setAttribute('aria-hidden','true');icon.innerHTML=icons[id];
 const span=doc.createElement('span');span.textContent=label;header.append(icon,span);
 const next=header.nextElementSibling;if(!next||!next.classList.contains('tvguide-section-desc')){
 const sub=doc.createElement('p');sub.className='tvguide-section-desc';sub.textContent=descriptions[id];header.after(sub);
 }
}
const sports=$('#sports');
if(sports){
 const section=$('#fights');if(section){for(const e of sports.querySelectorAll('#boxingList,.boxing-list'))e.hidden=true}
}
// Two photographs/headshots where a trustworthy title-specific Wikipedia portrait exists.
// NFL cards use team crests. Missing images fall back to typographic badges (not mismatched portraits).
const nfl={ 'Arizona Cardinals':'ari','Atlanta Falcons':'atl','Baltimore Ravens':'bal','Buffalo Bills':'buf','Carolina Panthers':'car','Chicago Bears':'chi','Cincinnati Bengals':'cin','Cleveland Browns':'cle','Dallas Cowboys':'dal','Denver Broncos':'den','Detroit Lions':'det','Green Bay Packers':'gb','Houston Texans':'hou','Indianapolis Colts':'ind','Jacksonville Jaguars':'jax','Kansas City Chiefs':'kc','Las Vegas Raiders':'lv','Los Angeles Chargers':'lac','Los Angeles Rams':'lar','Miami Dolphins':'mia','Minnesota Vikings':'min','New England Patriots':'ne','New Orleans Saints':'no','New York Giants':'nyg','New York Jets':'nyj','Philadelphia Eagles':'phi','Pittsburgh Steelers':'pit','San Francisco 49ers':'sf','Seattle Seahawks':'sea','Tampa Bay Buccaneers':'tb','Tennessee Titans':'ten','Washington Commanders':'wsh'};
const teams=Object.keys(nfl).sort((a,b)=>b.length-a.length);
function clean(s){return String(s||'').replace(/\s+/g,' ').trim()}
function sides(title){
 for(const word of [' vs. ',' vs ',' at ']){if(title.includes(word)){const a=title.split(word);if(a.length===2)return a}}
 return null;
}
const portrayed=new Set();
function showBadge(box,name,kind){
 const slot=doc.createElement('div');slot.className='tvguide-contender';
 const label=doc.createElement('span');label.textContent=name;
 const alt=doc.createElement('div');alt.className='tvguide-photo-fallback';alt.textContent=name.split(/\s+/).slice(0,2).map(v=>v[0]).join('');
 const img=doc.createElement('img');img.alt=kind==='football'?'Team logo: '+name:'Portrait: '+name;img.loading='lazy';img.referrerPolicy='no-referrer';
 img.onerror=()=>{img.remove();if(!alt.isConnected)slot.insertBefore(alt,label)};
 if(kind==='football'){
 const code=nfl[name];
 if(code)img.src='https://a.espncdn.com/i/teamlogos/nfl/500/'+code+'.png';else img.src='';
 }else{
 img.src='';
 // Resolve exact-person Wikipedia summary for a verified portrait. Do not rely on the guessed URL.
 fetch('https://en.wikipedia.org/api/rest_v1/page/summary/'+encodeURIComponent(name)).then(r=>r.ok?r.json():null).then(p=>{
 if(!p?.thumbnail?.source||!p.title||clean(p.title).toLowerCase()!==clean(name).toLowerCase())throw Error('No exact portrait');
 img.src=p.thumbnail.source;if(alt.isConnected)alt.replaceWith(img);
 }).catch(()=>{img.remove();if(!alt.isConnected)slot.insertBefore(alt,label)});
 }
 if(kind==='football'&&img.src)slot.append(img);else slot.append(alt);
 slot.append(label);box.append(slot);
}
for(const kind of ['fights','football']){
 const section=$('#'+kind);if(!section)continue;
 for(const card of section.querySelectorAll('.tvguide-sport-card')){
 const headline=clean(card.querySelector('.sport-headline')?.textContent||'');
 const parts=sides(headline.replace(/^UFC \d+:\s*/,''));
 if(!parts||portrayed.has(headline))continue;portrayed.add(headline);
 const visual=doc.createElement('div');visual.className='tvguide-match-visual';
 const [a,b]=parts.map(clean);
 if(kind==='football'){
 const aa=teams.find(t=>a.includes(t))||a,bb=teams.find(t=>b.includes(t))||b;
 showBadge(visual,aa,kind);const versus=doc.createElement('span');versus.className='tvguide-versus';versus.textContent='VS';visual.append(versus);showBadge(visual,bb,kind);
 }else{
 showBadge(visual,a,kind);const versus=doc.createElement('span');versus.className='tvguide-versus';versus.textContent='VS';visual.append(versus);showBadge(visual,b,kind);
 }
 const header=card.querySelector('.sport-top');if(header)header.after(visual);else card.prepend(visual);
 }
}
const known=[
 {match:'David Benavidez',id:'e0aJReDWcMY',caption:'Benavidez vs. Gilberto Ramírez · May 2026 highlights (previous fight)'},
 {match:'Tyson Fury vs. Anthony Joshua',id:'MrPiIT23Jb8',caption:'Anthony Joshua vs. Kristian Prenga · July 2026 highlights (previous fight, DAZN)'},
 {match:'Erislandy Lara',id:'0gMfvq7z_Io',caption:'Related boxer footage — actual opponent and date may differ'}
];
function openInPage(title,video){
 const modal=$('#videoModal'),box=$('#videoBox');if(!modal||!box)return false;
 const heading=$('#videoTitle');if(heading)heading.textContent=title+' — '+video.caption;
 box.replaceChildren();box.classList.add('media-picker');
 const frame=doc.createElement('iframe');frame.title=title+' preview';frame.src='https://www.youtube-nocookie.com/embed/'+video.id+'?autoplay=1&rel=0';frame.allow='autoplay;encrypted-media;picture-in-picture';frame.allowFullscreen=true;
 frame.style.cssText='display:block;width:100%;aspect-ratio:16/9;min-height:240px;border:0;border-radius:8px';box.append(frame);
 const note=doc.createElement('p');note.className='playnote';note.textContent=video.caption+'. Related footage is not the scheduled match itself.';box.append(note);
 const a=doc.createElement('a');a.href='https://www.youtube.com/watch?v='+video.id;a.target='_blank';a.rel='noopener';a.textContent='Watch video on YouTube if embed is restricted';a.className='mini media-link';box.append(a);
 modal.classList.add('open');doc.body.classList.add('noscroll');return true;
}
for(const sectionId of ['fights','football']){
 for(const card of $$('#'+sectionId+' .tvguide-sport-card')){
 const title=clean(card.querySelector('.sport-headline')?.textContent||'');if(!title)continue;
 const controls=card.querySelector('.sport-links')||card;
 const candidate=known.find(v=>title.includes(v.match));
 const play=doc.createElement('button');play.type='button';play.className='tvguide-inline-video';
 if(candidate){
 play.textContent='▶ Watch fighter highlights';play.dataset.status='connected';
 play.onclick=()=>{openInPage(title,candidate)};
 }else{
 play.textContent='▶ Find video preview';play.dataset.status='search';
 play.onclick=()=>{
 const modal=$('#videoModal'),box=$('#videoBox');if(!modal||!box)return;
 const heading=$('#videoTitle');if(heading)heading.textContent=title+' — Related video previews';
 box.replaceChildren();box.classList.add('media-picker');
 const p=doc.createElement('p');p.className='playnote';p.textContent='A verified, embeddable video for this specific matchup is not yet connected. Choose title-specific previews below.';box.append(p);
 const a=doc.createElement('a');a.href='https://www.youtube.com/results?search_query='+encodeURIComponent(title+' official highlights preview');a.textContent='Browse previews for '+title;a.target='_blank';a.rel='noopener';a.className='mini media-link';box.append(a);
 modal.classList.add('open');doc.body.classList.add('noscroll');
 };
 }
 controls.prepend(play);
 }
}
// The 2026–27 guide's existing live music connection is the original IE jukebox.
// Add a direct open-source fallback in the same existing panel; no duplicate player.
const player=$('#holidayJukebox');if(player&&!player.querySelector('.tvguide-jukebox-source')){
 const link=doc.createElement('a');link.className='tvguide-jukebox-source';link.href='https://inactentertainment.github.io/ie/holiday-jukebox.html';link.textContent='Open original InAct Jukebox';link.target='_blank';link.rel='noopener';
 const head=player.querySelector('.holiday-top');if(head)head.after(link);else player.prepend(link);
}

// Keep the existing animated control, and reconnect it if an earlier navigation script detached its handler.
const jukeboxButton=$('.quicknav .dock-jukebox')||$('#guideDock .dock-jukebox');
if(jukeboxButton&&player){
 const original='https://inactentertainment.github.io/ie/holiday-jukebox.html';
 const frame=player.querySelector('iframe');
 if(frame){frame.dataset.src=original;frame.setAttribute('title','InAct Entertainment original jukebox');}
 if(typeof jukeboxButton.onclick!=='function'){
  jukeboxButton.addEventListener('click',()=>{
   const opening=!player.classList.contains('open');
   player.classList.toggle('open',opening);
   if(frame)frame.src=opening?original:'about:blank';
   jukeboxButton.setAttribute('aria-expanded',String(opening));
  });
 }
}
function removeBlockByTitle(pattern){
 for(const el of $$('h1,h2,h3,h4,h5,summary')){
 if(!pattern.test(clean(el.textContent)))continue;
 let box=el.closest('section,aside,.feature,.collection,.special,.panel,.honorable,.promo');
 if(!box||box.id==='platforms'||box.id==='sports'||box.contains($('#platforms'))||box.contains($('#sports'))){
 const next=el.parentElement;box=(next&&next!==doc.body)?next:null;
 }
 if(box&&box!==doc.body&&box!==$('#platforms')&&box!==$('#sports'))box.remove();
 }
}
removeBlockByTitle(/^coming in december\b/i);
removeBlockByTitle(/^(?:20\s+)?honou?rable mentions\b/i);
for(const el of $$('[id],[class]')){
 const id=String(el.id||'')+' '+String(el.className||'');
 if(!/coming[-_]?december|honou?rable[-_]?mentions/i.test(id))continue;
 if(el===doc.body||el===doc.documentElement||el.contains($('#platforms'))||el.contains($('#sports')))continue;
 if(el.matches('section,aside,.panel,.feature,.collection'))el.remove();
}
for(const foot of $$('footer')){
 if(!/williams tv guide/i.test(foot.textContent.toLowerCase()))continue;
 foot.replaceChildren();
 const p=doc.createElement('p');p.className='tvguide-footer-copy';p.textContent='Williams TV Guide · 2026–2027 · Highly rated movies and series we have not seen, might have missed, or might enjoy watching again.';
 foot.append(p);
}
window.WilliamsRefinementQA={sportsHeadings:['basketball','fights','football'].map(id=>({id,exists:!!$('#'+id),header:$('#'+id)?.textContent.slice(0,80)})),inPageMediaButtons:$$('.tvguide-inline-video[data-status="connected"]').length,videoSearchButtons:$$('.tvguide-inline-video[data-status="search"]').length,jukeboxSourceLink:!!$('#holidayJukebox .tvguide-jukebox-source')};
})();