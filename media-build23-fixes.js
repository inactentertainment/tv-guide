(()=>{'use strict';
const root=document.getElementById('platforms'),node=document.getElementById('data');if(!root||!node)return;
let items=[];try{items=JSON.parse(node.textContent).items||[]}catch{return}
const valid=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const clean=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const byKey=new Map(items.map(i=>[i.platform+'|'+i.cat+'|'+i.title,i]));
const byTitle=new Map(items.map(i=>[clean(i.title),i]));
const named={
'Watchmen':{id:'zymgtV99Rko',note:'HBO official teaser (2019)',label:'Watch HBO Teaser'},
'Scrooge':{id:'eNIQyoIeYeM',note:'Filmzie: Scrooge (1951) trailer',label:'Watch 1951 Trailer'},
'The Man with the Bag':{id:'PEVkJHLq4rQ',note:'Prime Video official trailer',label:'Watch Trailer'},
'Bad Day':{id:'zHSYXDLH4io',note:'Netflix official trailer',label:'Watch Trailer'},
'The Family Stone':{url:'https://tubitv.com/movies/622727/the-family-stone-trailer',note:'Tubi trailer for the 2005 film',label:'Open Trailer'},
'Give Me Some Sugah':{url:'https://www.netflix.com/tudum/articles/tyler-perry-give-me-some-sugah',note:'Netflix official trailer page',label:'Open Netflix Trailer'},
'Beyond Tomorrow':{url:'https://www.tcm.com/watchtcm/titles/21556',note:'TCM film clips; not an original trailer',label:'Open Film Clips'},
'The Further Adventures of Cliff Booth':{url:'https://www.youtube.com/results?search_query=The+Further+Mis-Adventures+of+Cliff+Booth+Netflix+official+trailer',note:'No confirmed direct trailer yet'},
'The Further Mis-Adventures of Cliff Booth':{url:'https://www.youtube.com/results?search_query=The+Further+Mis-Adventures+of+Cliff+Booth+Netflix+official+trailer',note:'No confirmed direct trailer yet'}};
const overrides=new Map(Object.entries(named).map(([k,v])=>[clean(k),v]));
const css=document.createElement('style');css.textContent='#platforms .trailerBtn.media-connected,#platforms .trailerBtn.media-external{background:#e9bd62!important;color:#162334!important;border:1px solid #f9d783!important;opacity:1!important;filter:none!important;font-weight:750!important}#platforms .trailerBtn.media-search{background:#485363!important;color:#f1f2f4!important;border:1px solid #718090!important;opacity:1!important;filter:none!important}#sports .sport-category-label{font:700 12px system-ui;color:#ffe2a4;display:block;margin:6px 0}#sports .sport-clips-note{font:13px system-ui;color:#e9d9b7;padding:12px;border-left:3px solid #e9bd62;background:#ffffff0b;margin:16px 0}';document.head.append(css);
const records=[];
for(const button of root.querySelectorAll('.trailerBtn')){
const card=button.closest('.card'),item=byKey.get(card?.dataset.key)||byTitle.get(clean(button.dataset.title));if(!item)continue;
const override=overrides.get(clean(item.title));
const id=override?.id||(valid(item.trailer)?item.trailer:valid(button.dataset.id)?button.dataset.id:'');
const mode=override?.url&&!override.url.includes('youtube.com/results')?'external':valid(id)?'connected':'search';
button.classList.remove('media-connected','media-external','media-search','pending','unverified');
button.classList.add('media-'+mode);
button.dataset.build23Media=mode;button.style.opacity='1';
if(mode==='connected'){button.dataset.id=id;button.textContent=override?.label||(button.textContent.toLowerCase().includes('preview')?'Watch Preview':'Watch Trailer');button.title=override?.note||'Video linked; embedding depends on publisher permissions.'}
else if(mode==='external'){button.textContent=override.label;button.title=override.note+' (opens publisher page)'}
else{button.textContent='Find Title Preview';button.title='No confirmed direct video; opens title-specific search'}
records.push({title:item.title,platform:item.platform,mode,id:valid(id)?id:''});
}
function openPlayer(item,id,label){
const modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');if(!modal||!box)return;
const title=document.getElementById('videoTitle');if(title)title.textContent=item.title+' — '+label;
box.replaceChildren();box.classList.add('media-picker');
const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0';iframe.title=item.title+' '+label;iframe.allow='autoplay;encrypted-media;picture-in-picture';iframe.allowFullscreen=true;iframe.style.cssText='width:100%;aspect-ratio:16/9;min-height:270px;border:0';box.append(iframe);
const a=document.createElement('a');a.className='mini media-link';a.textContent='Watch directly on YouTube if blocked';a.href='https://www.youtube.com/watch?v='+id;a.target='_blank';a.rel='noopener noreferrer';box.append(a);
modal.classList.add('open');document.body.classList.add('noscroll');
}
window.addEventListener('click',event=>{
const button=event.target.closest?.('#platforms .trailerBtn');if(!button)return;
const card=button.closest('.card'),item=byKey.get(card?.dataset.key)||byTitle.get(clean(button.dataset.title));if(!item)return;
const source=overrides.get(clean(item.title));if(!source)return;
event.preventDefault();event.stopImmediatePropagation();
if(source.id)openPlayer(item,source.id,source.label);else if(source.url)window.open(source.url,'_blank','noopener,noreferrer');
},true);
const sports=document.getElementById('sports');
if(sports){
const note=document.createElement('p');note.className='sport-clips-note';note.textContent='Sports clips are labeled as NBA highlights, boxing fight footage, vintage clips, press conferences, or matchup previews. Footage from a different date is not the result of a scheduled event.';
(sports.querySelector('.schedule')||sports.firstElementChild)?.before(note);
for(const event of sports.querySelectorAll('.event')){
const name=event.querySelector('.sport-headline')?.textContent?.trim()||event.querySelector('.eventmain strong')?.textContent?.trim()||'';
const boxing=/boxing|benavidez|fury|joshua|lara|tszyu|cieslak|fight|vintage/i.test(name)||!!event.closest('#boxingList');
const uncertain=/teams TBD|quarterfinal|semifinal|championship|Los Angeles vs|Denver vs Los Angeles/i.test(name);
const category=boxing?(/fury vs anthony joshua/i.test(name)?'Boxing press conference / preview':'Boxing fight highlights / matchup preview'):uncertain?'NBA matchup preview / historical context':'NBA highlights / game footage';
const el=document.createElement('span');el.className='sport-category-label';el.textContent=category;
(event.querySelector('.sport-links')||event).prepend(el);
for(const b of event.querySelectorAll('button.sport-play'))b.title=category+' — confirm event/date before treating as exact game footage';
}
}
window.WilliamsBuild23Audit={total:items.length,records,counts:{connected:records.filter(r=>r.mode==='connected').length,publisherLinks:records.filter(r=>r.mode==='external').length,searchOnly:records.filter(r=>r.mode==='search').length},limitations:'Video ID connected does not certify embedding or playback'};
})();