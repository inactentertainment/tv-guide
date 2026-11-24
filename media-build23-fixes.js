(()=>{'use strict';
const root=document.getElementById('platforms'),node=document.getElementById('data');if(!root||!node)return;
let items=[];try{items=JSON.parse(node.textContent).items||[]}catch{return}
const valid=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const clean=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const byKey=new Map(items.map(i=>[i.platform+'|'+i.cat+'|'+i.title,i]));
const byTitle=new Map(items.map(i=>[clean(i.title),i]));
const named={
'Watchmen':{id:'zymgtV99Rko',note:'HBO official teaser (2019)',label:'Watch HBO Teaser'},
'Scrooge':{url:'https://www.pbs.org/video/scrooge-1935-y64qdm/',note:'PBS presentation of Scrooge (1935), Seymour Hicks; feature, not a trailer',label:'Open 1935 Film'},
'The Man with the Bag':{id:'PEVkJHLq4rQ',note:'Prime Video official trailer',label:'Watch Trailer'},
'Bad Day':{id:'zHSYXDLH4io',note:'Netflix official trailer',label:'Watch Trailer'},
'The Family Stone':{url:'https://tubitv.com/movies/622727/the-family-stone-trailer',note:'Tubi trailer for the 2005 film',label:'Open Trailer'},
'Give Me Some Sugah':{url:'https://www.netflix.com/tudum/articles/tyler-perry-give-me-some-sugah',note:'Netflix Tudum official film trailer and artwork · arriving December 16, 2026',label:'Watch Official Trailer'},
'Beyond Tomorrow':{url:'https://www.tcm.com/watchtcm/titles/21556',note:'TCM film clips; not an original trailer',label:'Open Film Clips'},
'The Further Adventures of Cliff Booth':{id:'RjEZaUBbUvU',note:'Official Netflix trailer for The Further Mis-Adventures of Cliff Booth; 2026',label:'Watch Official Trailer'},
'The Further Mis-Adventures of Cliff Booth':{id:'RjEZaUBbUvU',note:'Official Netflix trailer; IMAX November 25 and Netflix December 23, 2026',label:'Watch Official Trailer'},
'Deadwood':{url:'https://www.hbomax.com/video/watch/dcb45403-7aea-4865-8e76-88cf834d5716',note:'Official HBO Max Deadwood series trailer page; standalone in-page embedding not confirmed',label:'Official Series Trailer'},
'A Christmas Story':{url:'https://www.tcm.com/watchtcm/titles/2099',note:'Turner Classic Movies original 1983 film trailer and clips; publisher-hosted playback',label:'Watch Original Trailer'},
'Columbo':{url:'https://www.peacocktv.com/watch-online/tv/columbo-new/6941257837221375112',note:'Official Peacock Columbo page lists a 38-second series trailer; playback may require account',label:'Watch Official Series Preview'},
'The Best Man':{url:'https://www.peacocktv.com/watch-online/movies/the-best-man/bc4f55f1-4a22-3fde-844d-f63a9a98c798',note:'Official Peacock listing contains a trailer for 1999 film; movie currently shown as STARZ add-on, not necessarily included',label:'Watch Official Film Preview'},
'The Dick Van Dyke Show':{url:'https://www.pbs.org/video/what-made-the-opening-credits-of-the-dick-van-dyke-show-special-vvlegk/',note:'PBS American Masters historical clip about original 1961 series opening; retrospective, not a contemporary trailer',label:'Watch PBS Retrospective'},
'Charade':{url:'https://www.criterion.com/films/603',note:'Criterion film page for original 1963 Audrey Hepburn / Cary Grant film, includes its trailer',label:'Watch 1963 Trailer'},
'The Stranger':{url:'https://www.tcm.com/watchtcm/titles/24149',note:'Turner Classic Movies original 1946 Orson Welles film trailer / movie clips',label:'Watch Original Trailer'},
'D.O.A.':{url:'https://www.tcm.com/watchtcm/titles/5855',note:'Turner Classic Movies clips for original 1950 film noir; no claim of original theatrical trailer',label:'Watch Historical Clips'},
'The Jackie Robinson Story':{url:'https://www.tcm.com/watchtcm/titles/19169',note:'Turner Classic Movies 1950 Jackie Robinson film introductory clip; not an original trailer',label:'Watch Film Introduction'},
'Carmen Jones':{url:'https://vidiotsfoundation.org/movies/carmen-jones/',note:'Vidiots cinema page displays trailer for 1954 Dorothy Dandridge film',label:'Watch 1954 Trailer'},
'The Blood of Jesus':{url:'https://www.rottentomatoes.com/m/blood_of_jesus',note:'Rotten Tomatoes title-specific 1941 Spencer Williams film page lists a trailer',label:'View Original-Film Preview'},
'Within Our Gates':{url:'https://www.rottentomatoes.com/m/within_our_gates',note:'Rotten Tomatoes title-specific 1920 Oscar Micheaux film page lists a trailer',label:'View Silent-Film Preview'},
'Santa Claus Conquers the Martians':{url:'https://www.americangenrefilm.com/home-videos/santa-claus-conquers-the-martians-other-holiday-hallucinations/',note:'American Genre Film Archive preservation page features trailer for original 1964 film',label:'Watch AGFA Trailer'},
'The Great Rupert':{url:'https://www.imdb.com/title/tt0042524/videogallery/',note:'IMDb video gallery for original 1950 Jimmy Durante film has a listed trailer',label:'View 1950 Trailer'},
'A Christmas Carol':{url:'https://www.primevideo.com/detail/0LPKRTRVW8X1G281M4J4C58C0N',note:'Prime Video title-specific trailer listing for 1984 George C. Scott adaptation; may require account to watch film',label:'Watch 1984 Film Trailer'},
'21 Jump Street':{url:'https://www.rottentomatoes.com/tv/21_jump_street/s01',note:'Rotten Tomatoes trailer for the original 1987 Johnny Depp television series, not the 2012 film',label:'Watch 1987 Series Preview'},
'Highway to Heaven':{url:'https://www.primevideo.com/detail/0PGH7X3W8Z3KZS7KLUI4QRKRGL',note:'Prime Video trailer listing for original 1984 Michael Landon series; viewing availability may vary',label:'Watch Original Series Preview'},
'The 39 Steps':{url:'https://www.criterion.com/films/234-the-39-steps',note:'Criterion page for the original 1935 Alfred Hitchcock film, not a later remake; availability of preview video unconfirmed',label:'View Original Film Preview'}};
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
if(mode==='connected'){button.dataset.id=id;button.textContent=override?.label||(item.videoKind==='episode'?'▶ Watch Episode':item.videoKind==='highlights'?'▶ Watch Highlights':item.videoKind==='preview'?'▶ Watch Preview':'▶ Watch Trailer');button.title=override?.note||item.videoSourceLabel||'Video linked; embedding depends on publisher permissions.'}
else if(mode==='external'){button.textContent=override.label;button.title=override.note+' (opens an in-guide publisher preview panel)'}
else{button.textContent='Find Title Preview';button.title='No confirmed direct video; opens title-specific search'}
records.push({title:item.title,platform:item.platform,mode,id:valid(id)?id:''});
}
function openPlayer(item,id,label){
const modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');if(!modal||!box)return;
const title=document.getElementById('videoTitle');if(title)title.textContent=item.title+' — '+label;
box.replaceChildren();box.classList.add('media-picker');
const iframe=document.createElement('iframe');iframe.src='https://www.youtube-nocookie.com/embed/'+encodeURIComponent(id)+'?autoplay=1&rel=0';iframe.title=item.title+' '+label;iframe.allow='autoplay;encrypted-media;picture-in-picture';iframe.allowFullscreen=true;iframe.style.cssText='width:100%;aspect-ratio:16/9;min-height:270px;border:0';box.append(iframe);
if(item.videoSourceLabel){const p=document.createElement('p');p.className='playnote';p.textContent='Source: '+item.videoSourceLabel+'. Playback within Williams TV Guide depends on video publisher permissions.';box.append(p)}
const a=document.createElement('a');a.className='mini media-link';a.textContent='Watch directly on YouTube if blocked';a.href='https://www.youtube.com/watch?v='+id;a.target='_blank';a.rel='noopener noreferrer';box.append(a);
modal.classList.add('open');document.body.classList.add('noscroll');
}
function publisherPanel(item,source){
const modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');
if(!modal||!box){window.open(source.url,'_blank','noopener,noreferrer');return}
const heading=document.getElementById('videoTitle');
if(heading)heading.textContent=item.title+' — Official Publisher Preview';
box.replaceChildren();box.classList.add('media-picker');
const wrap=document.createElement('section');wrap.style.cssText='padding:22px 18px;text-align:center;border:1px solid #bc9b62;border-radius:10px;background:#12223a';
const label=document.createElement('p');label.textContent=source.note||'Official publisher page';label.className='playnote';
const explanation=document.createElement('p');explanation.className='playnote';explanation.textContent=source.url.includes('youtube.com/results')?'This title needs a verified trailer. You can open an exact-title video search if you want, without leaving the guide automatically.':'The official preview is on its publisher’s site. It is not confirmed embeddable here, so this panel avoids showing an unrelated video.';
const action=document.createElement('a');action.className='mini media-link';action.textContent=source.url.includes('youtube.com/results')?'Search for this title’s preview':'Watch on official publisher site';action.href=source.url;action.target='_blank';action.rel='noopener noreferrer';
wrap.append(label,explanation,action);box.append(wrap);
modal.classList.add('open');document.body.classList.add('noscroll');
}
window.addEventListener('click',event=>{
const button=event.target.closest?.('#platforms .trailerBtn');if(!button)return;
const card=button.closest('.card'),item=byKey.get(card?.dataset.key)||byTitle.get(clean(button.dataset.title));if(!item)return;
const source=overrides.get(clean(item.title));
event.preventDefault();event.stopImmediatePropagation();
const mode=button.dataset.build23Media;
if(window.WilliamsClassicMedia?.[item.title]&&window.WilliamsPlayClassicMedia?.(item.title))return;
if(window.WilliamsVimeoMedia?.[item.title]&&window.WilliamsPlayVimeoMedia?.(item.title))return;
if(source?.id){openPlayer(item,source.id,source.label||'Trailer');return;}
if(source?.url){publisherPanel(item,source);return;}
if(mode==='connected'){
 const id=button.dataset.id;
 if(valid(id))openPlayer(item,id,button.textContent.trim()||'Trailer');
 return;
}
const year=(String(item.genre||'').match(/\b(?:19|20)\d{2}\b/)||[])[0]||'';
const search=[item.title,year,item.cat==='Series'?'series':'film','trailer'].filter(Boolean).join(' ');
publisherPanel(item,{url:'https://www.youtube.com/results?search_query='+encodeURIComponent(search),note:'No confirmed official trailer or embeddable preview has been identified for this exact title and edition.'});
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