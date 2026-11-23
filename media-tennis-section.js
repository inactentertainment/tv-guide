(()=>{'use strict';
/* Williams TV Guide: tennis extension for Nov 23, 2026–Jan 10, 2027.
   Source-first scheduling: don't invent radio coverage, match times, or video IDs.
   No additional subscriptions, dashboards, or external player libraries. */
const doc=document,root=doc.getElementById('sports'),football=doc.getElementById('football');
if(!root||!football)return;
const E=(tag,cls,content)=>{const n=doc.createElement(tag);if(cls)n.className=cls;if(content!==undefined)n.textContent=content;return n};
const link=(text,url,cls)=>{const a=E('a',cls,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a};
const scheduleURL='https://www.wtt.com/schedule';
const wttPress='https://www.versantmedia.com/usa-sports/press-releases/world-team-tennis-announces-broadcast-partnership-versants-usa-sports';
const unitedURL='https://www.unitedcup.com/en/scores/schedule';
const unitedLive='https://www.unitedcup.com/en/scores';
const players=[
 {name:'Coco Gauff',status:'World Team Tennis · Dec 14–15; United Cup · Jan 2 & 4',note:'United States singles; Florida Flamingos',wiki:'Coco_Gauff',highlight:'Coco Gauff WTA official highlights'},
 {name:'Naomi Osaka',status:'No confirmed match through Jan 10',note:'Player highlights and official schedule',wiki:'Naomi_Osaka',highlight:'Naomi Osaka WTA tennis official highlights'},
 {name:'Taylor Townsend',status:'No confirmed match through Jan 10',note:'Doubles specialist; follow new tournament entries',wiki:'Taylor_Townsend_(tennis)',highlight:'Taylor Townsend WTA doubles highlights'},
 {name:'Frances Tiafoe',status:'World Team Tennis · Dec 1–2 & 15',note:'New York Empire singles / mixed doubles',wiki:'Frances_Tiafoe',highlight:'Frances Tiafoe ATP official tennis highlights'},
 {name:'Ben Shelton',status:'United Cup · Jan 2 & 4',note:'United States singles; mixed-team tournament',wiki:'Ben_Shelton',highlight:'Ben Shelton ATP tennis highlights'}
];
const wttEvents=[
 {day:'Dec 1',date:'2026-12-01',at:'7:00 PM ET',title:'Frances Tiafoe vs Tommy Paul',sub:'Florida Flamingos at New York Empire · Barclays Center, Brooklyn',participants:['Frances Tiafoe'],status:'WTT published lineup · subject to change',channel:'CNBC · Free on Fandango',url:scheduleURL},
 {day:'Dec 2',date:'2026-12-02',at:'7:00 PM ET',title:'Frances Tiafoe vs Denis Shapovalov',sub:'Toronto North at New York Empire · Barclays Center, Brooklyn',participants:['Frances Tiafoe'],status:'WTT published lineup · subject to change',channel:'CNBC · Free on Fandango',url:scheduleURL},
 {day:'Dec 14',date:'2026-12-14',at:'7:00 PM ET',title:'Coco Gauff vs Leylah Fernandez',sub:'Toronto North at Florida Flamingos · Amerant Bank Arena, Sunrise',participants:['Coco Gauff'],status:'WTT published lineup · subject to change',channel:'CNBC · Free on Fandango',url:scheduleURL},
 {day:'Dec 15',date:'2026-12-15',at:'7:00 PM ET',title:'Coco Gauff vs Jessica Pegula; Frances Tiafoe vs Tommy Paul',sub:'New York Empire at Florida Flamingos · Amerant Bank Arena, Sunrise',participants:['Coco Gauff','Frances Tiafoe'],status:'WTT published lineup · subject to change',channel:'CNBC · Free on Fandango',url:scheduleURL}
];
const unitedEvents=[
 {day:'Jan 2',date:'2027-01-02',at:'4:00 AM ET session begins',title:'USA vs Kazakhstan',sub:'Coco Gauff vs Yulia Putintseva; then Ben Shelton vs Aleksandr Shevchenko · Perth',participants:['Coco Gauff','Ben Shelton'],status:'Official scheduled team session · individual match starts follow preceding match',channel:'Tennis Channel (USA)',url:unitedURL},
 {day:'Jan 4',date:'2027-01-04',at:'4:00 AM ET session begins',title:'USA vs Croatia',sub:'Ben Shelton vs Dino Prizmic; then Coco Gauff vs Donna Vekic · Perth',participants:['Coco Gauff','Ben Shelton'],status:'Official scheduled team session · individual match starts follow preceding match',channel:'Tennis Channel (USA)',url:unitedURL},
 {day:'Jan 6',date:'2027-01-06',at:'Match time TBD',title:'Perth quarterfinals',sub:'Only if Team USA advances · exact opponents not yet determined',participants:['Coco Gauff','Ben Shelton'],status:'Conditional: team must qualify',channel:'Tennis Channel (USA)',url:unitedURL},
 {day:'Jan 9',date:'2027-01-09',at:'Match time TBD',title:'United Cup semifinals',sub:'Sydney · only if Team USA advances',participants:['Coco Gauff','Ben Shelton'],status:'Conditional: team must qualify',channel:'Tennis Channel (USA)',url:unitedURL},
 {day:'Jan 10',date:'2027-01-10',at:'5:30 PM Sydney AEDT · 1:30 AM ET',title:'United Cup final',sub:'Sydney · only if Team USA advances',participants:['Coco Gauff','Ben Shelton'],status:'Conditional: team must qualify',channel:'Tennis Channel (USA)',url:unitedURL}
];
const css=E('style');css.textContent=[
 '#tennis{margin:30px 0 14px;scroll-margin-top:90px}',
 '#tennis .tvtennis-heading{display:flex;align-items:center;gap:12px;margin:15px 0 8px;color:#f2d18f;font:700 clamp(1.7rem,3vw,2.4rem) Georgia,serif}',
 '#tennis .tvtennis-heading svg{width:40px;height:40px;flex:none}',
 '#tennis .tvtennis-desc{margin:0 0 18px;color:#d6c9b7;font:15px/1.5 Georgia,serif}',
 '#tennis .tvtennis-miniheading{color:#f9d994;font:700 1.3rem Georgia,serif;margin:22px 0 12px}',
 '#tennis .tvtennis-player-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,180px),1fr));gap:12px;margin:0 0 20px}',
 '#tennis .tvtennis-player{background:#ffffff0b;border:1px solid #8d785a65;border-radius:13px;padding:12px;text-align:center;display:flex;align-items:center;flex-direction:column;gap:7px;min-width:0}',
 '#tennis .tvtennis-avatar{width:75px;height:75px;border-radius:50%;background:linear-gradient(145deg,#233a4c,#6c553b);border:1px solid #b89b6f;object-fit:cover;display:grid;place-items:center;font:700 20px Georgia,serif;color:#ffebc5}',
 '#tennis .tvtennis-player strong{font:700 16px Georgia,serif;color:#fff2d4}',
 '#tennis .tvtennis-player p{font:12px/1.5 Georgia,serif;color:#ded5c5;margin:0}',
 '#tennis .tvtennis-links{display:flex;flex-wrap:wrap;gap:8px;margin-top:auto;justify-content:center}',
 '#tennis .tvtennis-links a,#tennis .tvtennis-links button{font:700 12px Georgia,serif;border:1px solid #b69360;border-radius:8px;color:#f9e2b8;background:#62482c;padding:8px 11px;text-decoration:none;cursor:pointer}',
 '#tennis .tvtennis-links a:hover,#tennis .tvtennis-links button:hover{background:#9c7440}',
 '#tennis .tvtennis-event-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,305px),1fr));gap:12px}',
 '#tennis .tvtennis-event{background:#ffffff0b;border:1px solid #98836555;border-radius:12px;padding:15px;min-width:0}',
 '#tennis .tvtennis-event strong{display:block;color:#ffe4a6;font:700 17px/1.35 Georgia,serif;margin:7px 0}',
 '#tennis .tvtennis-event .tvtennis-meta{font:12px Georgia,serif;color:#f1c782}',
 '#tennis .tvtennis-event p{font:13px/1.5 Georgia,serif;color:#e3dbce;margin:7px 0}',
 '#tennis .tvtennis-status{color:#bfc9d3!important;font-style:italic}',
 '#tennis .tvtennis-official{padding:11px 13px;margin:14px 0;border-left:3px solid #c1a069;color:#e7dbc3;background:#ffffff09;font:13px/1.5 Georgia,serif}',
 '#tennis .tvtennis-player-badges{display:flex;gap:5px;margin:7px 0;flex-wrap:wrap}',
 '#tennis .tvtennis-player-badges img{width:30px;height:30px;border-radius:50%;object-fit:cover;border:1px solid #ba9565;background:#304453}',
 '.quicknav .williams-sport-icon.tvtennis-nav svg{filter:drop-shadow(0 1px 1px #0008)}',
 '.quicknav .williams-sports-three{gap:clamp(4px,.65vw,10px)!important}',
 '@media(max-width:700px){.quicknav .williams-sports-three{gap:3px!important}#tennis .tvtennis-player-grid{grid-template-columns:repeat(2,minmax(0,1fr))}#tennis .tvtennis-event-grid{grid-template-columns:1fr}#tennis .tvtennis-player{padding:9px}}',
 '@media(max-width:370px){#tennis .tvtennis-player-grid{grid-template-columns:1fr}.quicknav .williams-sports-three{gap:1px!important}}'
].join('\n');doc.head.append(css);
const racquetSVG='<path d="M28 31 41 44" stroke="#8c633b" stroke-width="5" stroke-linecap="round"/><ellipse cx="20" cy="19" rx="13" ry="17" transform="rotate(-35 20 19)" fill="none" stroke="#b99b73" stroke-width="4"/><path d="M8 12 28 31M7 20 24 8M14 33 31 19M11 7 31 29M5 15 24 34" stroke="#c9c8c2" stroke-width="1.1" opacity=".75"/><circle cx="37" cy="10" r="8" fill="#dbd35c" stroke="#a1a044" stroke-width="1.6"/><path d="M32 3Q39 10 32 17M42 4Q35 10 41 16" fill="none" stroke="#fff9bf" stroke-width="1.4"/>';
const svg=()=>'<svg viewBox="0 0 48 48" aria-hidden="true">'+racquetSVG+'</svg>';
const tennis=E('section','tvguide-sports-group');tennis.id='tennis';
const heading=E('h2','tvtennis-heading');heading.innerHTML=svg()+'<span>Tennis</span>';tennis.append(heading);
tennis.append(E('p','tvtennis-desc','Featured players, confirmed matchups, broadcast options and match highlights.'));
tennis.append(E('h3','tvtennis-miniheading','Players to Watch'));
const playerGrid=E('div','tvtennis-player-grid');tennis.append(playerGrid);
const avatarCache=new Map();
function initials(name){return name.split(' ').map(x=>x[0]).slice(0,2).join('')}
function renderAvatar(name,wiki,container){
 const avatar=E('span','tvtennis-avatar',initials(name));avatar.setAttribute('role','img');avatar.setAttribute('aria-label','Portrait pending: '+name);
 container.append(avatar);avatarCache.set(name,[]);
 // Wikipedia exact-title thumbnail, not a guessed filename or unrelated photograph.
 fetch('https://en.wikipedia.org/w/api.php?'+new URLSearchParams({action:'query',titles:wiki.replaceAll('_',' '),prop:'pageimages',piprop:'thumbnail',pithumbsize:'240',format:'json',origin:'*'})).then(r=>r.ok?r.json():null).then(obj=>{
  const page=Object.values(obj?.query?.pages||{})[0],url=page?.thumbnail?.source;
  if(!url||!page||page.missing!==undefined)return;
  const im=new Image();im.onload=()=>{avatarCache.set(name,[url]);const img=E('img','tvtennis-avatar');img.src=url;img.alt=name+' portrait';if(avatar.isConnected)avatar.replaceWith(img);
   for(const badge of doc.querySelectorAll('[data-tvtennis-badge="'+name+'"]')){badge.src=url;badge.alt=name;badge.hidden=false}
  };im.src=url;
 }).catch(()=>{});
}
function highlightURL(p){return 'https://www.youtube.com/results?search_query='+encodeURIComponent(p.highlight)}
for(const p of players){
 const card=E('article','tvtennis-player');
 renderAvatar(p.name,p.wiki,card);
 card.append(E('strong',null,p.name),E('p',null,p.status),E('p',null,p.note));
 const actions=E('div','tvtennis-links');
 actions.append(link('▶ Watch Highlights',highlightURL(p)),link('Official Schedule',p.name==='Coco Gauff'||p.name==='Ben Shelton'?unitedURL:p.name==='Frances Tiafoe'?scheduleURL:'https://www.wtatennis.com/'));
 card.append(actions);playerGrid.append(card);
}
function createEvent(e,type){
 const card=E('article','tvtennis-event');
 card.append(E('div','tvtennis-meta',e.day+' · '+e.at),E('strong',null,e.title),E('p',null,e.sub));
 const badges=E('div','tvtennis-player-badges');
 for(const n of e.participants){const img=E('img');img.dataset.tvtennisBadge=n;img.hidden=true;img.alt=n;badges.append(img)}
 card.append(badges);
 card.append(E('p',null,'Where to watch: '+e.channel));
 card.append(E('p','tvtennis-status',e.status));
 const actions=E('div','tvtennis-links');
 actions.append(link('Official match lineup',e.url),link(type==='WTT'?'Free live stream information':'Live scores / schedule',type==='WTT'?scheduleURL:unitedLive));
 // No fabricated radio station or stream. A real free stream is linked only where the broadcaster confirms one.
 const radios=E('p','tvtennis-video-disclosure',type==='WTT'?'Official free stream: Fandango via the WTT match page. No confirmed radio outlet.':'No verified free radio audio stream; official scores and schedule update on the tournament site.');
 card.append(actions,radios);
 return card;
}
tennis.append(E('h3','tvtennis-miniheading','World Team Tennis · December'));
const wttGrid=E('div','tvtennis-event-grid');wttEvents.forEach(e=>wttGrid.append(createEvent(e,'WTT')));tennis.append(wttGrid);
tennis.append(E('h3','tvtennis-miniheading','United Cup · January 1–10'));
tennis.append(E('p','tvtennis-official','Team USA features Coco Gauff and Ben Shelton. Perth group play is confirmed on January 2 and 4. Later rounds are listed as conditional until the team advances. U.S. television: Tennis Channel.'));
const cupGrid=E('div','tvtennis-event-grid');unitedEvents.forEach(e=>cupGrid.append(createEvent(e,'United Cup')));tennis.append(cupGrid);
const sources=E('p','tvtennis-official','Official schedules are linked on every card. Start times and lineups may change. Individual tennis match start times depend on preceding matches.');
tennis.append(sources);
football.after(tennis);
// Add icon to EXISTING sticky navigation group, never duplicate the header.
const nav=doc.querySelector('.quicknav')||doc.querySelector('#guideDock'),group=nav?.querySelector('.williams-sports-three');
if(group&&!group.querySelector('a[href="#tennis"]')){
 const a=link('', '#tennis','williams-sport-icon tvtennis-nav');
 a.removeAttribute('target');a.removeAttribute('rel');a.title='Tennis';a.setAttribute('aria-label','Tennis');
 a.innerHTML=svg()+'<span class="williams-sport-tip">Tennis</span>';
 a.addEventListener('click',ev=>{ev.preventDefault();navigate(tennis,'#tennis')});
 group.append(a);
}
// Gentle fade/brighten for in-page section navigation only; never interrupt external links or playback.
const overlay=E('div','tvguide-fade-overlay');overlay.setAttribute('aria-hidden','true');
const transitionCSS=E('style');transitionCSS.textContent='.tvguide-fade-overlay{position:fixed;inset:0;z-index:5000;pointer-events:none;opacity:0;background:radial-gradient(circle at 50% 38%,#fff7dc55,#0d15281c 72%);transition:opacity .2s ease;mix-blend-mode:screen}.tvguide-fade-overlay.is-on{opacity:1}@media(prefers-reduced-motion:reduce){.tvguide-fade-overlay{transition:none!important}}';
doc.head.append(transitionCSS);doc.body.append(overlay);
let busy=false;
function navigate(target,hash){
 if(!target||busy)return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){target.scrollIntoView({behavior:'auto',block:'start'});history.replaceState(null,'',hash);return}
 busy=true;overlay.classList.add('is-on');
 setTimeout(()=>{target.scrollIntoView({behavior:'smooth',block:'start'});history.replaceState(null,'',hash);overlay.classList.remove('is-on');setTimeout(()=>busy=false,230)},175);
}
if(nav){
 nav.addEventListener('click',event=>{
 const a=event.target.closest('a[href^="#"]');if(!a||!nav.contains(a))return;
 if(a.getAttribute('href')==='#tennis')return;
 const hash=a.getAttribute('href');
 const target=hash.length>1?doc.getElementById(hash.slice(1)):null;
 if(!target)return;
 event.preventDefault();event.stopImmediatePropagation();navigate(target,hash);
 },true);
}
window.WilliamsTennisQA={players:players.length,worldTeamTennisDates:wttEvents.map(x=>x.date),unitedCupCards:unitedEvents.length,navIcon:!!group?.querySelector('a[href="#tennis"]'),radio:'No official station verified; no invented links',freeStreaming:'CNBC/Fandango confirmed for WTT; Tennis Channel for United Cup'};
})();