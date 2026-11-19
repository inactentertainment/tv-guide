(()=>{'use strict';let node=document.getElementById('data');if(!node)return;let items=JSON.parse(node.textContent).items;let modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');if(!modal||!box)return;
const yr=e=>(String(e.genre||'').match(/\b(?:19|20)\d{2}\b/)||[])[0]||'',series=e=>e.cat==='Series'||/series|mini.?series|television/i.test(e.genre||'');
const search=e=>'https://www.youtube.com/results?search_query='+encodeURIComponent([e.title,yr(e),'official trailer',series(e)?'series':'film'].join(' '));
const additionalTrailers={'Bosch':'vuVAP_4TQEY','Santa Claus Conquers the Martians':'PG1YxXE7fUw','The Knick':'VMXgWK0VmxA','Deadwood':'mFIojradr4Y','The Night Of':'556N5vojtp0'};const direct={'Bosch':'https://www.primevideo.com/detail/0P0DV8Z9VVEL112BN1FL17DW9T','Scrooge':'https://www.pbs.org/video/scrooge-jxwae4/','The Knick':'https://www.cinemax.com/the-knick','Show Me a Hero':'https://www.hbomax.com/show/4d503ae2-f8c1-4a92-a5fd-b9497658a84b','Chernobyl':'https://www.hbomax.com/tv/en/show/396999a6-3fff-4af3-802b-10c46d10deff','Mare of Easttown':'https://www.hbomax.com/show/c1517b80-50ab-4733-8208-ae2c2765c0e7','We Own This City':'https://press.wbd.com/us/video/we-own-city-official-trailer','Deadwood':'https://www.hbomax.com/video/watch/dcb45403-7aea-4865-8e76-88cf834d5716','Blue Eye Samurai':'https://www.netflix.com/tudum/videos/blue-eye-samurai-season-1-trailer','We Own This City':'https://press.wbd.com/us/video/we-own-city-official-trailer','Train Dreams':'https://www.netflix.com/tudum/videos/watch-the-train-dreams-trailer'};
const make=(tag,cls,txt)=>{let v=document.createElement(tag);if(cls)v.className=cls;if(txt)v.textContent=txt;return v};
const anchor=(dest,text)=>{let a=make('a','mini media-link',text);a.href=dest;a.target='_blank';a.rel='noopener noreferrer';return a};
const clean=t=>String(t||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const css=make('style');css.textContent='#videoBox.media-picker{display:flex;flex-direction:column;gap:12px;aspect-ratio:auto;overflow:auto;max-height:80vh;padding:10px}#videoBox.media-picker iframe,#videoBox.media-picker video{width:100%;min-height:230px;aspect-ratio:16/9;max-height:58vh;flex-shrink:0;background:#000;border:0;border-radius:10px}.media-panel{width:100%;padding:12px;background:#122a40;border-radius:12px}.media-links{display:flex;flex-wrap:wrap;gap:8px;margin:12px 0}.media-link{display:inline-flex;text-decoration:none;background:#e8bc67!important;color:#14253c!important}';document.head.append(css);
function open(e){modal.dataset.mediaRequest='';document.getElementById('videoTitle').textContent=e.title+' — Trailer';box.replaceChildren();box.classList.add('media-picker');let panel=make('div','media-panel');panel.append(make('h3','',e.title));let status=make('p','playnote','Finding a playable preview…');panel.append(status);let links=make('div','media-links');if(e.trailerPage||direct[e.title])links.append(anchor(e.trailerPage||direct[e.title],'Publisher trailer ↗'));links.append(anchor(search(e),'Find official trailer on YouTube ↗'));panel.append(links);box.append(panel);modal.classList.add('open');document.body.classList.add('noscroll');
let id=e.trailer||additionalTrailers[e.title];if(id&&/^[\w-]{11}$/.test(id)){let f=make('iframe');f.title=e.title+' trailer';f.allow='autoplay; encrypted-media; picture-in-picture';f.allowFullscreen=true;f.src='https://www.youtube-nocookie.com/embed/'+id+'?autoplay=1&rel=0';box.prepend(f);status.textContent=e.title==='The Knick'?'Official Cinemax series teaser; publisher playback restrictions may apply.':'Embedded trailer; publisher playback restrictions may apply.';return}
if(series(e)){status.textContent='No verified in-page series trailer yet. Choose the publisher or official YouTube trailer from the links.';return}
let request=modal.dataset.mediaRequest=Math.random().toString(36);fetch('https://itunes.apple.com/search?'+new URLSearchParams({term:e.title,entity:'movie',country:'us',limit:'20'})).then(r=>r.json()).then(j=>{if(modal.dataset.mediaRequest!==request||!modal.classList.contains('open'))return;let found=(j.results||[]).find(x=>clean(x.trackName||x.collectionName)===clean(e.title)&&x.previewUrl);if(!found){status.textContent='No in-page preview found. Use the title-specific trailer links.';return}let video=make('video');video.controls=true;video.playsInline=true;video.autoplay=true;video.src=found.previewUrl;video.onerror=()=>{video.remove();status.textContent='Preview not available; use the trailer links.'};box.prepend(video);status.textContent='Apple movie preview (not necessarily the official trailer).'}).catch(()=>{if(modal.dataset.mediaRequest===request)status.textContent='Preview lookup failed; use the trailer links.'})}
for(const btn of document.querySelectorAll('#platforms .trailerBtn')){const e=items.find(x=>x.platform===btn.dataset.platform&&x.title===btn.dataset.title);if(!e)continue;const id=e.trailer||additionalTrailers[e.title];btn.textContent=id?'▶ Play video trailer':'▶ Open trailer preview';}
document.addEventListener('click',ev=>{let b=ev.target.closest?.('.trailerBtn');if(!b)return;let e=items.find(x=>x.platform===b.dataset.platform&&x.title===b.dataset.title);if(!e)return;ev.preventDefault();ev.stopImmediatePropagation();open(e)},true);

const yearLabel=e=>yr(e);
const checked=new Set();
async function retryPoster(card){
 const item=items.find(x=>card.dataset.key===x.platform+'|'+x.cat+'|'+x.title);
 if(!item)return;const wrap=card.querySelector('.posterwrap');if(!wrap||wrap.querySelector('img.poster'))return;
 let candidates=series(item)?[item.title+' (TV series)',item.title+' (miniseries)',item.title]:[yearLabel(item)?item.title+' ('+yearLabel(item)+' film)':'',item.title+' (film)',item.title].filter(Boolean);
 for(const t of candidates){try{
 const u='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',origin:'*',format:'json',prop:'pageimages',piprop:'thumbnail',pithumbsize:'650',titles:t});
 const resp=await fetch(u);if(!resp.ok)continue;const data=await resp.json(),page=Object.values(data.query?.pages||{})[0],src=page?.thumbnail?.source;if(!src)continue;
 await new Promise((resolve,reject)=>{const test=new Image();test.onload=resolve;test.onerror=reject;test.src=src});
 if(wrap.querySelector('img.poster'))return;const pic=make('img','poster');pic.src=src;pic.alt=item.title+' cover artwork';pic.loading='lazy';pic.referrerPolicy='no-referrer';wrap.querySelector('.coverfallback')?.remove();wrap.append(pic);return
 }catch(_){continue}}
}
const posterObserver=new IntersectionObserver(es=>es.forEach(z=>{if(!z.isIntersecting)return;posterObserver.unobserve(z.target);
const card=z.target;setTimeout(()=>{if(!card.querySelector('img.poster')&&!checked.has(card.dataset.key)){checked.add(card.dataset.key);improvedCover(card,items.find(x=>card.dataset.key===x.platform+'|'+x.cat+'|'+x.title)).then(()=>retryPoster(card))}},2100);
}),{rootMargin:'500px'});
for(const card of document.querySelectorAll('#platforms .card'))posterObserver.observe(card);


/* Williams media: muted watched pulse, all sports clickable, cover recovery */
const style=document.createElement('style');style.textContent=`
@keyframes williamsWatchedBlink{0%,36%,100%{opacity:1;box-shadow:0 0 7px rgba(109,232,187,.3)}46%,57%{opacity:.66;box-shadow:0 0 3px rgba(109,232,187,.08)}}
#platforms .seenBtn.seen{animation:williamsWatchedBlink 7.8s ease-in-out infinite}
#platforms .saveBtn.seen{box-shadow:0 0 13px rgba(246,208,105,.28)}
#sports .event{display:block;padding:16px 18px;margin:10px 0}
#sports .sport-top{display:flex;gap:14px;align-items:baseline;flex-wrap:wrap}
#sports .sport-preview{margin:10px 0 0;font-size:.85rem;color:#eee3d2}
#sports .sport-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:12px}
#sports .sport-links a{color:#ffdf9c;display:inline-flex;padding:8px 11px;background:#ffffff13;border:1px solid #ffffff40;border-radius:9px;text-decoration:none;font-size:.79rem;font-weight:750}
#sports .sport-links a:hover{background:#ffffff2d}
#sports .eventdate{color:#ffdf8e}
@media(prefers-reduced-motion:reduce){#platforms .seenBtn.seen{animation:none}}
`;document.head.append(style);
const sportData=JSON.parse(node.textContent).sports||[];
const leagueTeams=['Brooklyn Nets','Minnesota Timberwolves','Boston Celtics','Washington Wizards','Dallas Mavericks','Denver Nuggets','Los Angeles Lakers','Houston Rockets','New York Knicks','Chicago Bulls','Utah Jazz','Golden State Warriors','Philadelphia 76ers','Orlando Magic','San Antonio Spurs','Cleveland Cavaliers','Portland Trail Blazers','Detroit Pistons','Oklahoma City Thunder','Miami Heat','Toronto Raptors'];
const searchLink=q=>'https://www.youtube.com/results?search_query='+encodeURIComponent(q);
const newsLink=q=>'https://www.google.com/search?q='+encodeURIComponent(q);
const sportsNames=['Tyson Fury','Anthony Joshua','David Benavidez','Michal Cieslak','Erislandy Lara','Tim Tszyu'];
function splitMatch(e){let match=e.match||'';let parts=match.split(/\s+at\s+|\s+vs\.?\s+/i);return parts.length===2?parts:[match,'']}
function sportRow(e,i){let date=new Date(e.date+'T12:00:00');let fmt=date.toLocaleDateString('en-US',{month:'short',day:'numeric'});let isBox=e.kind==='Boxing',teams=splitMatch(e);
let prior=isBox?'Watch recent fight highlights and the fighters’ last performances before this matchup.':'Review each team’s latest game and, when available, the last head-to-head matchup.';
let links=[];
if(e.match==='Brooklyn Nets at Minnesota Timberwolves'){prior='Previous meeting · Dec 27, 2025: Brooklyn defeated Minnesota 123–107. Cam Thomas scored 30 points for Brooklyn. Latest-season team form may differ.';links.push(['Previous matchup · NBA recap','https://www.nba.com/game/0022500439']);}
if(/NBA Cup/.test(e.match)){prior='Tournament participants have not yet been determined. Follow the official NBA Cup bracket and latest previews.';links.push(['NBA Cup news','https://www.nba.com/nba-cup']);}
else if(!isBox&&teams[1]){links.push(['Previous matchup highlights',searchLink(teams.join(' vs ')+' last meeting NBA highlights 2025 2026')]);links.push([teams[0]+' latest game',searchLink(teams[0]+' latest game highlights November December 2026')]);links.push([teams[1]+' latest game',searchLink(teams[1]+' latest game highlights November December 2026')]);}
if(isBox){links.push([teams[0]+' latest highlights',searchLink(teams[0]+' boxing recent fight highlights')]);links.push([teams[1]+' latest highlights',searchLink(teams[1]+' boxing recent fight highlights')]);links.push(['Fight build-up & news',newsLink(e.match+' boxing fight 2026 latest preview')]);}
else if(!teams[1])links.push(['Latest NBA analysis',newsLink(e.match+' NBA 2026 tournament')]);
let d=document.createElement('div');d.className='event';let top=document.createElement('div');top.className='sport-top';let dt=document.createElement('span');dt.className='eventdate';dt.textContent=fmt;let main=document.createElement('div');main.className='eventmain';let title=document.createElement('strong');title.textContent=e.match;let info=document.createElement('small');info.textContent=(e.time||'Time TBD')+' ET · '+e.platform+(e.note?' · '+e.note:'');main.append(title,info);top.append(dt,main);d.append(top);
let preview=document.createElement('p');preview.className='sport-preview';preview.textContent=prior;d.append(preview);
let buttons=document.createElement('div');buttons.className='sport-links';for(const [label,url] of links){let a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;buttons.append(a)}d.append(buttons);return d}
for(const kind of ['NBA','Boxing']){let target=document.getElementById(kind==='NBA'?'nbaList':'boxingList');if(target)target.replaceChildren(...sportData.filter(x=>x.kind===kind).map(sportRow))}
let sportsTitle=document.querySelector('#sports .section-title');if(sportsTitle)sportsTitle.textContent='Sports & Boxing';
let navSports=document.querySelector('.toplogos .brand.sports');if(navSports)navSports.innerHTML='<b>SPORTS & BOXING</b>';
const mediaKnown={'Bosch':'vuVAP_4TQEY','Santa Claus Conquers the Martians':'PG1YxXE7fUw'};
const posterTitles={'Scrooge':['Scrooge (1935 film)','Scrooge (film)'],'Beyond Tomorrow':['Beyond Tomorrow (film)'],'Santa Claus Conquers the Martians':['Santa Claus Conquers the Martians'],'Bosch':['Bosch (TV series)']};
async function improvedCover(card,item){if(card.querySelector('.poster'))return;const wrap=card.querySelector('.posterwrap');if(!wrap)return;const list=posterTitles[item.title]||[];
let year=(item.genre||'').match(/\b(?:19|20)\d{2}\b/)?.[0];
list.push(item.title+(year?' ('+year+' film)':''),item.title+' (TV series)',item.title);
for(let t of [...new Set(list)]){try{let url='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',origin:'*',titles:t,prop:'pageimages',piprop:'thumbnail',pithumbsize:'650'});let resp=await fetch(url);if(!resp.ok)continue;let data=await resp.json(),p=Object.values(data.query?.pages||{})[0];if(!p?.thumbnail?.source)continue;const src=p.thumbnail.source;await new Promise((ok,fail)=>{let probe=new Image();probe.onload=ok;probe.onerror=fail;probe.src=src});if(card.querySelector('.poster'))return;let img=document.createElement('img');img.className='poster';img.alt='Cover artwork: '+item.title;img.loading='lazy';img.src=src;wrap.querySelector('.coverfallback')?.remove();wrap.append(img);return}catch{}}
}
const watchedNav=document.querySelector('#hideWatched');if(watchedNav)watchedNav.title='Watched indicators softly pulse when marked';
const sportsStats=document.createElement('p');sportsStats.className='notice2';sportsStats.textContent='Matchup links open previous highlights or each team’s recent games. Exact future results are not assumed; video search results and previews depend on their publishers.';document.querySelector('#sports .schedule')?.before(sportsStats);

})();