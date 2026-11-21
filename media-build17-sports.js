(()=>{'use strict';
const dataEl=document.getElementById('data');if(!dataEl)return;
const data=JSON.parse(dataEl.textContent);
const matches=[
['Brooklyn Nets at Minnesota Timberwolves','Vx53f1syfZU','NBA official highlights · Nets at Timberwolves, Dec 27, 2025'],
['Boston Celtics at Washington Wizards','YF4zAArzX2w','NBA official highlights · Celtics at Wizards, Dec 4, 2025'],
['Dallas Mavericks at Denver Nuggets','U31FrAT2KPE','NBA official highlights · Mavericks at Nuggets, Dec 1, 2025'],
['Utah Jazz at Golden State Warriors','IruzyinMb_c','NBA official highlights · Jazz at Warriors, Nov 24, 2025'],
['Dallas Mavericks at Golden State Warriors','P6e9d5jOwX8','NBA official highlights · Mavericks at Warriors, Dec 25, 2025'],
['Philadelphia 76ers at Orlando Magic','2IFgffaqgAQ','NBA official highlights · 76ers at Magic, Nov 17, 2026'],
['San Antonio Spurs at Cleveland Cavaliers','jLfVn8K8-f4','NBA official highlights · Spurs at Cavaliers, Dec 5, 2025'],
['New York Knicks at Cleveland Cavaliers','02FgnWZWwmU','NBA official highlights · Knicks at Cavaliers, Feb 24, 2026'],
['Minnesota Timberwolves at Denver Nuggets','prftZbHekVY','NBA official highlights · Timberwolves at Nuggets, Mar 1, 2026'],
['Detroit Pistons at Oklahoma City Thunder','EtlR54Whc4M','NBA official highlights · Pistons at Thunder, Mar 30, 2026'],
['Cleveland Cavaliers at Boston Celtics','Al3pDG23Vao','NBA official highlights · Cavaliers at Celtics, Feb 28, 2025'],
['Houston Rockets at Los Angeles Lakers','OFPR9zAVUlA','NBA official highlights · Rockets at Lakers, Mar 31, 2025'],
['Denver Nuggets at Portland Trail Blazers','G-7HK7-3j14','NBA official highlights · Nuggets at Trail Blazers, Mar 21, 2025'],
['New York Knicks at Chicago Bulls','kJ4yzvAqAQA','NBA official highlights · Knicks at Bulls, Jan 4, 2025'],
['Houston Rockets vs Denver Nuggets','5R5fQWrLtCg','NBA official highlights · Rockets at Nuggets, Mar 11, 2026'],
['Toronto Raptors vs Detroit Pistons','IRsNBdv2JcA','NBA official highlights · Raptors at Pistons, Mar 31, 2026'],
['Los Angeles Lakers at Houston Rockets','sruAMHYutvU','NBA official highlights · Lakers at Rockets, Jan 5, 2025'],
['Miami Heat at Dallas Mavericks','syY-6nN8tQg','NBA official highlights · Heat at Mavericks, Feb 13, 2025'],
['Miami Heat vs New York Knicks','z2lHG4Osjok','NBA official highlights · Heat at Knicks, Dec 21, 2025'],
['Denver vs Minnesota','Xxb6WaISx1g','NBA official highlights · Nuggets at Timberwolves, Nov 15, 2025'],
['Erislandy Lara vs Tim Tszyu','0gMfvq7z_Io','PBC fight highlights · Errol Spence vs Tim Tszyu, Jul 25, 2026; Lara matchup preview'],
['NBA Cup quarterfinals · teams TBD','5HVaM2cLX54','2025 NBA Cup final · Knicks vs Spurs; historical tournament context, not 2026 quarterfinals'],
['NBA Cup semifinals · teams TBD','5HVaM2cLX54','2025 NBA Cup final · Knicks vs Spurs; historical tournament context, not 2026 semifinals'],
['NBA Cup Championship · teams TBD','5HVaM2cLX54','2025 NBA Cup final · Knicks vs Spurs; historical tournament context, not 2026 championship'],
['Houston vs Philadelphia','rGZbTZYc90k','NBA official highlights · Rockets at 76ers, Jan 22, 2026'],
['Los Angeles vs San Antonio','8npj6HXy63Y','San Antonio team preview · Spurs at Jazz, Nov 15, 2026. Los Angeles team not specified in schedule.'],
['Los Angeles vs Miami','cnD8p6RBDsI','Miami team preview · Rockets at Heat, Nov 16, 2026. Los Angeles team not specified in schedule.'],
['Denver vs Los Angeles','HX-mNTYf4x8','Denver team preview · Celtics at Nuggets, Nov 18, 2026. Los Angeles team not specified in schedule.'],
['David Benavidez vs Michal Cieslak','e0aJReDWcMY','Benavidez vs. Gilberto Ramirez · May 2026 fight highlights'],
['Tyson Fury vs Anthony Joshua','3P4QeH0e2ps','Fury vs. Joshua · press conference, not fight highlights']
];
const sportsVideos=new Map(matches.map(([name,id,description])=>[name,{id,description}]));
const extraTrailers=new Map(Object.entries({
'The Resort':'0DmeT1GLQn8','Bel-Air':'_-_P9DPMuy8','Watchmen':'FeFpwFo1osg','I May Destroy You':'DTjlurdbNnw','His Three Daughters':'K0jwAP2fS1E','Wake Up Dead Man: A Knives Out Mystery':'0hc8yz5-d5Y','Train Dreams':'_Nk8TrBHOrA','Wallace & Gromit: Vengeance Most Fowl':'kQqrBzJ5wIc','Unbelievable':'QTIkUzkbzQk','Baby Reindeer':'eafm1gB6SCM','The Diplomat':'lV6sJlBbhPs','The Boys':'M1bhOaLV4FU','The Underground Railroad':'_Pq5Usc_JDA','Companion':'Qr_kX0D3DNA','Chernobyl':'PMlwjCID3Io','Bring Her Back':'kBskrYZfhw8','Sorry, Baby':'Rc0jgWoZo9w'
}));
const clean=t=>String(t||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/[^a-z0-9]/g,'');
const waitImg=url=>new Promise((ok,no)=>{let img=new Image();img.onload=()=>ok(url);img.onerror=no;img.src=url});
const modal=document.getElementById('videoModal'),box=document.getElementById('videoBox'),heading=document.getElementById('videoTitle');
const link=(url,label)=>{let a=document.createElement('a');a.href=url;a.target='_blank';a.rel='noopener noreferrer';a.textContent=label;a.className='mini media-link';return a};
function player(id,title,notes,links=[]){
 if(!modal||!box)return;
 heading.textContent=title;box.replaceChildren();box.classList.add('media-picker');
 let iframe=document.createElement('iframe');
 iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0';
 iframe.title=title;iframe.allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share';iframe.allowFullscreen=true;
 box.append(iframe);
 let info=document.createElement('div');info.className='media-panel';
 let p=document.createElement('p');p.className='playnote';p.textContent=notes+' · If YouTube blocks playback, use the direct link.';info.append(p);
 info.append(link('https://www.youtube.com/watch?v='+id,'Watch this video on YouTube ↗'));
 links.forEach(([name,url])=>info.append(link(url,name)));
 if(title.includes('Matchup Video')){
  const teams=['Nets','Timberwolves','Celtics','Wizards','Mavericks','Nuggets','Jazz','Warriors','76ers','Magic','Spurs','Cavaliers','Knicks','Thunder','Pistons','Rockets','Lakers','Trail Blazers','Bulls','Raptors','Heat','Clippers'];
  const current=title.replace(' — Matchup Video','');
  const relevant=teams.filter(team=>current.toLowerCase().includes(team.toLowerCase()));
  const second=[...sportsVideos.entries()].find(([name,v])=>v.id!==id&&relevant.some(t=>name.toLowerCase().includes(t.toLowerCase()))&&!/teams TBD/i.test(name));
  if(second){
   const [otherName,other]=second;
   const group=document.createElement('div');group.className='sport-two-videos';
   const label=document.createElement('p');label.textContent='Related team footage · a different game, not this scheduled matchup';group.append(label);
   const swap=document.createElement('button');swap.type='button';swap.className='mini sport-play';swap.textContent='▶ Watch second highlight: '+otherName;
   swap.onclick=()=>{iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(other.id)+'?autoplay=1&rel=0';p.textContent=other.description+' · Previous team highlights, not a prediction';};
   group.append(swap);group.append(link('https://www.youtube.com/watch?v='+other.id,'Second video on YouTube'));info.append(group);
  }
 }
 box.append(info);
 modal.classList.add('open');document.body.classList.add('noscroll');
}
window.addEventListener('click',evt=>{
 const trailer=evt.target.closest?.('#platforms .trailerBtn');
 if(trailer&&extraTrailers.has(trailer.dataset.title)){
 evt.preventDefault();evt.stopImmediatePropagation();
 const title=trailer.dataset.title;player(extraTrailers.get(title),title+' — Official Trailer','Official A24 trailer');return;
 }
 const anchor=evt.target.closest?.('#sports a');
 if(!anchor)return;
 const event=anchor.closest('.event');if(!event)return;
 const title=event.querySelector('.sport-headline')?.textContent?.trim()||event.querySelector('.eventmain strong')?.textContent?.trim();
 const video=sportsVideos.get(title);
 if(!video)return;
 evt.preventDefault();evt.stopImmediatePropagation();
 player(video.id,title+' — Matchup Video',video.description,[['Other clips and news',anchor.href]]);
},true);
for(const e of document.querySelectorAll('#sports .event')){
 const title=e.querySelector('.sport-headline')?.textContent?.trim()||e.querySelector('.eventmain strong')?.textContent?.trim();
 if(sportsVideos.has(title)){
  let button=document.createElement('button');button.type='button';button.className='mini sport-play';button.textContent='▶ Play highlight in guide';button.addEventListener('click',()=>{
   let v=sportsVideos.get(title);player(v.id,title+' — Matchup Video',v.description);
  });e.querySelector('.sport-links')?.prepend(button);
 }
}
const style=document.createElement('style');style.textContent=
'#sports .sport-play{border-color:#f9d98b;background:#e8bc67;color:#132035;font-weight:800}'+
'#sports .sport-play:hover{background:#ffda8e} .sport-two-videos{margin-top:13px;padding:10px;background:#ffffff12;border-radius:10px} .sport-two-videos p{font-size:.8rem;margin:4px 0 10px}'+
'.cover-loading{font-size:.7rem;letter-spacing:.06em;color:#e5e7e9}'+
'#platforms .poster{max-height:430px}';document.head.append(style);
const mediaStats={previews:sportsVideos.size,extraTrailers:extraTrailers.size};
function posterFor(item,url,card){
 if(!url||card.querySelector('.poster'))return;
 const target=card.querySelector('.posterwrap');if(!target)return;
 const img=document.createElement('img');img.className='poster';img.alt=item.title+' — cover artwork';img.loading='lazy';img.referrerPolicy='no-referrer';img.src=url;
 img.addEventListener('error',()=>{img.remove();}, {once:true});
 target.querySelector('.coverfallback')?.remove();target.append(img);
}
const tvcache=Object.create(null);
async function tvMaze(item){
 const isShow=item.cat==='Series'||(item.cat==='Black Cinema'&&/series|tv|mini/i.test(item.genre||''));
 if(!isShow)return null;
 let query=item.title.replace(/\s*\(.*?\)\s*$/,'');
 if(query in tvcache)return tvcache[query];
 try{
 const ctrl=new AbortController();const timeout=setTimeout(()=>ctrl.abort(),7000);
 const r=await fetch('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(query),{signal:ctrl.signal});clearTimeout(timeout);
 if(!r.ok)return null;
 const arr=await r.json();
 const exact=arr.find(o=>clean(o.show?.name)===clean(query));
 let url=exact?.show?.image?.original||exact?.show?.image?.medium||null;
 tvcache[query]=url;return url;
 }catch{return null}
}
async function wikiMedia(item){
 const q=item.title.replace(/\s*\((19|20)\d\d\)/,'');
 const type=item.cat==='Series'?'television series':'film';
 const queries=[q+' '+type+' poster',q+' movie poster'];
 for(const term of queries){
  try{
   let url='https://commons.wikimedia.org/w/api.php?'+new URLSearchParams({action:'query',generator:'search',gsrsearch:'filetype:bitmap '+term,gsrnamespace:'6',gsrlimit:'8',prop:'imageinfo',iiprop:'url|mime',iiurlwidth:'560',format:'json',origin:'*'});
   let r=await fetch(url);if(!r.ok)continue;let d=await r.json();let pages=Object.values(d.query?.pages||{});
   pages.sort((a,b)=>((clean(b.title).includes(clean(q))?2:0)-(clean(a.title).includes(clean(q))?2:0)));
   for(let p of pages){
    let source=p.imageinfo?.[0]?.thumburl||p.imageinfo?.[0]?.url;
    if(!source||!clean(p.title).includes(clean(q)))continue;
    try{await waitImg(source);return source}catch{}
   }
  }catch{}
 }
 return null;
}

const pinnedPosterURLs={
'Black Doves':'https://dnm.nflximg.net/api/v6/2DuQlx0fM4wd1nzqm5BFBi6ILa8/AAAAQQfMIYnZp-Hg5hV8DU4kQHvcQu85EhYvAWshSW_dBdE9yhM-i5JJQSkBgtscrfF-Ukfw6D-w8Ixpl3y0TLS02QkAkU3nN7oJOwQPIOlvBOwooJOBm83QNWYUl6GrmDHzfgk2aTa5xhBrTnhi0qDqBNSm.jpg?r=8d9',
'Blue Eye Samurai':'https://launchpad-backend-v2.onrender.com/api/v1/s3/image/assets/9576dc8e-4373-464f-94c3-3647252fd860/30-greatest-animated-tv-shows-made-for-adults_fef1770f/30-greatest-animated-tv-shows-made-for-adults_img_7_4b1c49ed.jpg',
'Scrooge':'https://m.media-amazon.com/images/M/MV5BNDA4NTVjNDQtNjJiZC00MTZhLTk5NTAtOGNlYjYzYjQwODkzXkEyXkFqcGc%40._V1_FMjpg_UX1000_.jpg',
'Beyond Tomorrow':'https://static.cinemagia.ro/img/resize/db/movie/57/78/94/beyond-tomorrow-195234l-600x0-w-f3e692c4.jpg',
'Santa Claus Conquers the Martians':'https://m.media-amazon.com/images/M/MV5BYThlZTY0Y2MtMTM5MS00OGEyLTlhNTYtODc2YzUxNGI3ODAyXkEyXkFqcGc%40._V1_.jpg'
};
for(const card of document.querySelectorAll('#platforms .card')){
 const item=data.items.find(e=>e.platform+'|'+e.cat+'|'+e.title===card.dataset.key);
 if(!item||!pinnedPosterURLs[item.title]||card.querySelector('.poster'))continue;
 waitImg(pinnedPosterURLs[item.title]).then(url=>posterFor(item,url,card)).catch(()=>{});
}

const queued=new Set();
const posterObserver=new IntersectionObserver(entries=>{
 for(const entry of entries){if(!entry.isIntersecting)continue;posterObserver.unobserve(entry.target);
 const card=entry.target;const key=card.dataset.key;
 if(queued.has(key))continue;queued.add(key);
 const item=data.items.find(e=>e.platform+'|'+e.cat+'|'+e.title===key);if(!item)return;
 setTimeout(async()=>{
  if(card.querySelector('.poster'))return;
  let tv=await tvMaze(item);
  if(tv){try{await waitImg(tv);posterFor(item,tv,card);return}catch{}}
  // Apple's movie catalog and title-matched Wikipedia covers run in the base page.
  // Commons is a final source for title-exact film artwork.
  let wiki=await wikiMedia(item);
  if(wiki&&!card.querySelector('.poster'))posterFor(item,wiki,card);
 },2300);
 }
},{rootMargin:'550px'});
/* poster loading handled by unified Build 11 queue */
document.querySelectorAll('#platforms .trailerBtn').forEach(b=>{
 if(extraTrailers.has(b.dataset.title)){b.textContent='▶ Play official trailer';}
});
window.WilliamsMediaStats=mediaStats;
})();