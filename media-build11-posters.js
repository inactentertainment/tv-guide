(()=>{'use strict';
const node=document.getElementById('data');if(!node)return;const items=JSON.parse(node.textContent).items;
const normalize=s=>String(s||'').toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g,'').replace(/\s*\((?:19|20)\d{2}\)\s*$/,'').replace(/[^a-z0-9]/g,'');
const cacheKey='williams-media11-posters-v1';
let cache={};try{cache=JSON.parse(localStorage.getItem(cacheKey)||'{}')}catch{}
const saveCache=()=>{try{localStorage.setItem(cacheKey,JSON.stringify(cache))}catch{}};
const cards=new Map([...document.querySelectorAll('#platforms .card')].map(c=>[c.dataset.key,c]));
const requests=new Map(),queue=[];let active=0;const MAX_ACTIVE=3;
function imageOk(url){return new Promise((resolve,reject)=>{const img=new Image();let done=false;const tid=setTimeout(()=>{if(!done){done=true;reject(Error('image timeout'))}},6500);img.onload=()=>{if(!done){done=true;clearTimeout(tid);resolve(url)}};img.onerror=()=>{if(!done){done=true;clearTimeout(tid);reject(Error('invalid poster'))}};img.src=url})}
async function readJSON(url){const controller=new AbortController(),timer=setTimeout(()=>controller.abort(),7000);try{const r=await fetch(url,{signal:controller.signal});if(!r.ok)throw Error('HTTP '+r.status);return await r.json()}finally{clearTimeout(timer)}}
function exactMatch(a,b){return normalize(a)===normalize(b)}
function yearOf(item){return (String(item.genre||'').match(/\b(?:19|20)\d{2}\b/)||[])[0]||''}
function isSeries(item){return item.cat==='Series'||(item.cat==='Black Cinema'&&/series|miniseries|television/i.test(item.genre||''))}
async function apple(item){
const category=isSeries(item)?'tvShow':'movie';const url='https://itunes.apple.com/search?'+new URLSearchParams({country:'US',media:category,term:item.title,limit:'20'});
const results=(await readJSON(url)).results||[];
const match=results.find(e=>exactMatch(e.trackName||e.collectionName,item.title)&&(!yearOf(item)||!e.releaseDate||Math.abs(+e.releaseDate.slice(0,4)-(+yearOf(item)))<=1));
if(!match)return null;const src=match.artworkUrl100||match.artworkUrl60;if(!src)return null;
return src.replace(/100x100(?:bb)?/,'600x900bb').replace(/600x900bb/, '600x900bb');
}
async function tvmaze(item){if(!isSeries(item))return null;
const results=await readJSON('https://api.tvmaze.com/search/shows?q='+encodeURIComponent(item.title));
const match=results.find(e=>exactMatch(e.show?.name,item.title));
return match?.show?.image?.original||match?.show?.image?.medium||null;
}
async function cinemeta(item){const type=isSeries(item)?'series':'movie';const url='https://v3-cinemeta.strem.io/catalog/'+type+'/top/search='+encodeURIComponent(item.title)+'.json';const results=(await readJSON(url)).metas||[];const year=yearOf(item);const match=results.find(m=>exactMatch(m.name,item.title)&&(!year||!m.releaseInfo||String(m.releaseInfo).includes(year)));return match?.poster||null;}
async function wikipedia(item){
const title=item.title.replace(/\s*\((?:19|20)\d{2}\)\s*$/,'');
const year=yearOf(item),proposals=isSeries(item)?[title+' (TV series)',title+' (miniseries)',title]:[year?title+' ('+year+' film)':'',title+' (film)',title].filter(Boolean);
for(const q of proposals){try{const url='https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',format:'json',origin:'*',prop:'pageimages',piprop:'thumbnail',pithumbsize:'640',titles:q});
const result=await readJSON(url);const page=Object.values(result.query?.pages||{})[0];if(page?.thumbnail?.source)return page.thumbnail.source;}catch{}}
return null;
}
async function source(item){
const key=item.platform+'|'+item.cat+'|'+item.title;
if(cache[key])try{await imageOk(cache[key]);return cache[key]}catch{delete cache[key]}
const methods=isSeries(item)?[tvmaze,apple,cinemeta,wikipedia]:[apple,cinemeta,wikipedia];
for(const method of methods){try{const url=await method(item);if(!url)continue;await imageOk(url);cache[key]=url;saveCache();return url}catch{}}
return null;
}
function display(item,url){const key=item.platform+'|'+item.cat+'|'+item.title,card=cards.get(key);if(!card||!url)return;
const wrap=card.querySelector('.posterwrap');if(!wrap)return;
const existing=wrap.querySelector('img.poster');if(existing&&existing.complete&&existing.naturalWidth>0)return;
const img=document.createElement('img');img.className='poster';img.src=url;img.alt='Poster artwork for '+item.title;img.loading='lazy';img.decoding='async';img.referrerPolicy='no-referrer';
img.onload=()=>{if(!wrap.isConnected)return;wrap.querySelector('img.poster')?.remove();wrap.querySelector('.coverfallback')?.remove();wrap.append(img)};
img.onerror=()=>{if(cache[key]===url){delete cache[key];saveCache()}};
}
function pump(){while(active<MAX_ACTIVE&&queue.length){const item=queue.shift();active++;source(item).then(url=>{if(url)display(item,url)}).finally(()=>{active--;pump()})}}
function schedule(card){const key=card.dataset.key;if(requests.has(key))return;
const item=items.find(e=>e.platform+'|'+e.cat+'|'+e.title===key);if(!item)return;
const existing=card.querySelector('img.poster');if(existing&&existing.complete&&existing.naturalWidth)return;
requests.set(key,true);queue.push(item);pump();
}
const observer=new IntersectionObserver(entries=>{for(const entry of entries){if(entry.isIntersecting){observer.unobserve(entry.target);schedule(entry.target)}}},{rootMargin:'260px'});
for(const card of cards.values()){const img=card.querySelector('img.poster');if(img){img.loading='lazy';img.decoding='async';img.onerror=()=>{img.remove();schedule(card)};}else observer.observe(card)}
const css=document.createElement('style');
css.textContent='.posterback{display:none!important}.card{backdrop-filter:none!important}.posterwrap{contain:layout paint}.poster{content-visibility:auto}';
document.head.append(css);
window.WilliamsPosterStatus=()=>({total:items.length,withRealImage:[...cards.values()].filter(c=>{let im=c.querySelector('img.poster');return im&&im.complete&&im.naturalWidth>0}).length,queue:queue.length,active,cacheEntries:Object.keys(cache).length});
})();