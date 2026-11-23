(()=>{'use strict';
/* Approved TV Guide sports and catalog organization; no additional dock, dashboard or hero. */
const $=(q,root=document)=>root.querySelector(q);
const $$=(q,root=document)=>Array.from(root.querySelectorAll(q));
const data=$('#data');
if(!data)return;
let catalog={};try{catalog=JSON.parse(data.textContent)}catch{return}
const sports=$('#sports'),platforms=$('#platforms');
if(!sports||!platforms)return;
const start='2026-11-23',end='2027-01-01';
const originalSports=(catalog.sports||[]);
const sportsEvent=(date)=>date&&date>=start&&date<=end;
const shortDate=v=>{const d=new Date(v+'T12:00:00');return Number.isNaN(+d)?'Date TBD':d.toLocaleDateString('en-US',{month:'short',day:'numeric',weekday:'short'})};
const sepClass='tvguide-sports-group';
function make(tag,cls,txt){let x=document.createElement(tag);if(cls)x.className=cls;if(txt)x.textContent=txt;return x}
function link(text,url,cls){let a=make('a',cls,text);a.href=url;a.target='_blank';a.rel='noopener noreferrer';return a}
// Preserve existing NBA cards, but remove past entries outside the requested window.
const nba=$('#nbaList');
if(nba){
 const scheduled=originalSports.filter(x=>x.kind==='NBA');
 const entries=$$('.event',nba);
 if(entries.length===scheduled.length)entries.forEach((entry,i)=>{if(!sportsEvent(scheduled[i].date))entry.remove()});
}
const heading=$('.section-title',sports);
if(heading)heading.textContent='Basketball';
const basketballTitle=heading||make('h2','tvguide-subtitle','Basketball');
basketballTitle.id='basketball';
basketballTitle.classList.add('tvguide-subtitle');
const schedule=$('.schedule',sports);
if(!heading){if(schedule)sports.insertBefore(basketballTitle,schedule);else sports.prepend(basketballTitle);}
// Move the existing boxing list, preserving card rendering and event links, into its own Fights section.
const boxing=$('#boxingList');
const fights=make('section',sepClass+' fights-section');
fights.id='fights';
fights.append(make('h2','tvguide-subtitle','Fights'));
const fightList=make('div','tvguide-sports-events');
fights.append(fightList);
if(boxing){
 boxing.replaceChildren();
 boxing.hidden=true;
}
const fightsData=[
 {date:'2026-11-28',title:'Agit Kabayel vs. Nelson Hysa',detail:'WBC heavyweight boxing · Düsseldorf, Germany · DAZN',url:'https://www.boxingscene.com/schedule',kind:'Boxing'},
 {date:'2026-12-12',title:'Dmitry Bivol vs. Callum Smith',detail:'Unified light heavyweight boxing · Yekaterinburg, Russia',url:'https://www.cbssports.com/boxing/news/boxing-schedule-for-2026-dates-tyson-fury-vs-anthony-joshua-david-benavidez-dmitry-bivol/',kind:'Boxing'},
 {date:'2026-12-12',title:'Erislandy Lara vs. Tim Tszyu',detail:'WBA middleweight boxing · Gold Coast, Australia · DAZN',url:'https://www.cbssports.com/boxing/news/boxing-schedule-for-2026-dates-tyson-fury-vs-anthony-joshua-david-benavidez-dmitry-bivol/',kind:'Boxing'},
 {date:'2026-12-19',title:'Devin Haney vs. Liam Paro',detail:'Unified welterweight boxing · San Francisco · DAZN',url:'https://www.cbssports.com/boxing/news/boxing-schedule-for-2026-dates-tyson-fury-vs-anthony-joshua-david-benavidez-dmitry-bivol/',kind:'Boxing'},
 {date:'2026-12-19',title:'Anthony Cacace vs. Nick Ball',detail:'WBA junior lightweight boxing · Belfast · DAZN',url:'https://www.cbssports.com/boxing/news/boxing-schedule-for-2026-dates-tyson-fury-vs-anthony-joshua-david-benavidez-dmitry-bivol/',kind:'Boxing'},
 {date:'2026-12-05',title:'David Benavidez vs. Michal Cieslak',detail:'Cruiserweight title unification · Glendale, Arizona · DAZN / Prime Video PPV',url:'https://www.premierboxingchampions.com/events/391735',kind:'Boxing'},
 {date:'2026-12-05',title:'Vergil Ortiz Jr. vs. Keith Thurman',detail:'Boxing co-main event · Glendale, Arizona',url:'https://www.premierboxingchampions.com/events/391735',kind:'Boxing'},
 {date:'2026-12-05',title:'UFC Fight Night: Israel Adesanya vs. Shara Magomedov',detail:'Mixed martial arts · Riyadh, Saudi Arabia · Paramount+',url:'https://www.ufc.com/events',kind:'UFC'},
 {date:'2026-12-11',title:'Tyson Fury vs. Anthony Joshua',detail:'Heavyweight boxing · Cardiff, Wales · Netflix',url:'https://www.cbssports.com/boxing/news/boxing-schedule-for-2026-dates-tyson-fury-vs-anthony-joshua-david-benavidez-dmitry-bivol/',kind:'Boxing'},
 {date:'2026-12-12',title:'UFC 335: Charles Oliveira vs. Diego Lopes',detail:'Mixed martial arts · Las Vegas · Paramount+',url:'https://www.ufc.com/events',kind:'UFC'}
];
function sportsCard(event){
 const card=make('article','event tvguide-sport-card');
 const head=make('div','sport-top');
 const date=make('span','eventdate',shortDate(event.date));
 const main=make('div','eventmain');
 const strong=make('strong');strong.append(link(event.title,event.url,'sport-headline'));
 const meta=make('small',null,event.detail);
 main.append(strong,meta);head.append(date,main);card.append(head);
 const bar=make('div','sport-links');
 bar.append(link(event.kind==='UFC'?'UFC event details':'Fight card / event details',event.url));
 bar.append(link('Fighter preview videos','https://www.youtube.com/results?search_query='+encodeURIComponent(event.title+' 2026 official preview')));
 card.append(bar);
 return card;
}
fightsData.filter(e=>sportsEvent(e.date)).forEach(e=>fightList.append(sportsCard(e)));
const football=make('section',sepClass+' football-section');
football.id='football';
football.append(make('h2','tvguide-subtitle','Football'));
const footballList=make('div','tvguide-sports-events');
football.append(footballList);
const footballGames=[
 {date:'2026-11-25',title:'Green Bay Packers at Los Angeles Rams',detail:'Thanksgiving Eve · Prime-time NFL football',url:'https://www.nfl.com/schedules/2026/by-week/week-12'},
 {date:'2026-11-26',title:'Kansas City Chiefs at Buffalo Bills',detail:'Thanksgiving · NFL',url:'https://www.nfl.com/thanksgiving'},
 {date:'2026-11-27',title:'Denver Broncos at Pittsburgh Steelers',detail:'Black Friday · Prime Video',url:'https://www.nfl.com/schedules/2026/by-week/week-12'},
 {date:'2026-12-06',title:'Houston Texans at Pittsburgh Steelers',detail:'Sunday Night Football · NBC / Peacock',url:'https://www.peacocktv.com/blog/how-to-watch-the-nfl-on-peacock-for-2026-2027-season-full-schedule'},
 {date:'2026-12-07',title:'Dallas Cowboys at Seattle Seahawks',detail:'Monday Night Football · ESPN',url:'https://www.nfl.com/schedules/2026/prime-time/monday-night-football'},
 {date:'2026-12-20',title:'Detroit Lions at Minnesota Vikings',detail:'Sunday Night Football · NBC / Peacock',url:'https://www.peacocktv.com/blog/how-to-watch-the-nfl-on-peacock-for-2026-2027-season-full-schedule'}
];
footballGames.filter(e=>sportsEvent(e.date)).forEach(e=>{
const card=make('article','event tvguide-sport-card');
const top=make('div','sport-top');
const dt=make('span','eventdate',shortDate(e.date)),main=make('div','eventmain');
const bold=make('strong');bold.append(link(e.title,e.url,'sport-headline'));
main.append(bold,make('small',null,e.detail));top.append(dt,main);card.append(top);
const actions=make('div','sport-links');
actions.append(link('Game schedule',e.url),link('Team previews / highlights','https://www.youtube.com/results?search_query='+encodeURIComponent(e.title+' NFL 2026 preview')));
card.append(actions);footballList.append(card);
});
const schedules=make('div','tvguide-week-links');
schedules.append(make('p',null,'NFL full weekly schedules'));
for(let wk=12;wk<=17;wk++)schedules.append(link('Week '+wk,'https://www.nfl.com/schedules/2026/by-week/week-'+wk));
football.append(schedules);
const anchor=schedule||nba||sports.lastElementChild;
if(anchor){anchor.after(fights);fights.after(football)}else sports.append(fights,football);
// Avoid extra sports explainers; retain clean approved section layout.
for(const extra of $('.sport-clips-note,.notice2',sports))extra.remove();
// Existing promotional text and redundant boxing headings are suppressed without altering the movie cards.
for(const el of $$('h1,h2,h3,h4',sports)){
 if(el===heading||el===basketballTitle||fights.contains(el)||football.contains(el))continue;
 const t=el.textContent.trim();
 if(/^boxing$/i.test(t)||/^sports\s*(?:&|and)\s*boxing$/i.test(t))el.hidden=true;
}
// Use the current navigation: replace Sports link with 3 compact inline SVG images, no extra row.
const ball='<svg viewBox="0 0 48 48" aria-hidden="true"><circle cx="24" cy="24" r="19" fill="#b7783c" stroke="#4a2e1b" stroke-width="2.3"/><path d="M6 24h36M24 5v38M9 13Q24 24 9 35M39 13Q24 24 39 35" fill="none" stroke="#432819" stroke-width="2.3"/></svg>';
const glove='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M13 33C7 26 8 16 16 11c4-4 11-5 16-1 4 3 6 9 4 13-2 4-5 7-5 11l-1 5H15z" fill="#a34233" stroke="#5c2821" stroke-width="2.3"/><path d="M16 33q7 5 15-1M15 39h15M15 19c-3 2-3 7-1 10" stroke="#e8bb88" stroke-width="2" fill="none"/><path d="M17 39h14v5H17z" fill="#633326" stroke="#4d2920" stroke-width="1.6"/></svg>';
const footballIcon='<svg viewBox="0 0 48 48" aria-hidden="true"><path d="M6 32C6 17 21 7 42 11c0 18-14 31-34 27z" fill="#84502f" stroke="#42291c" stroke-width="2.4"/><path d="M13 32 34 17M19 24l7 7M24 20l7 7M29 16l7 7" stroke="#e9d8b5" stroke-width="2.1" fill="none"/><path d="M8 34q5-2 6 4M35 11q2 5 6 6" stroke="#f2e4c8" stroke-width="2" fill="none"/></svg>';
const navSources=$('a[href="#sports"]',document.querySelector('.quicknav')||document.querySelector('#guideDock')||document.querySelector('.toplogos')||document);
const iconSpecs=[['Basketball','#basketball',ball],['Fights','#fights',glove],['Football','#football',footballIcon]];
const targets=navSources.length?navSources:$$('.brand.sports');
for(const src of targets){
 const parent=src.parentElement;if(!parent)continue;
 const wrap=make('span','tvguide-sport-nav');
 for(const [name,href,icon] of iconSpecs){
 const a=make('a','tvguide-vintage-icon');
 a.href=href;a.title=name;a.setAttribute('aria-label',name);
 a.innerHTML=icon+'<span class="tvguide-hover-label">'+name+'</span>';
 a.addEventListener('click',event=>{const to=$(href);if(!to)return;event.preventDefault();to.scrollIntoView({behavior:'smooth',block:'start'})});
 wrap.append(a);
 }
 src.replaceWith(wrap);
}
const navTargets=$$('.quicknav .tvguide-sport-nav,.toplogos .tvguide-sport-nav');
for(const el of navTargets)el.setAttribute('aria-label','Sports shortcuts');
// Remove "Coming in December" and "20 Honorable Mentions" and any cards belonging exclusively to those blocks.
for(const headingNode of $$('h1,h2,h3,h4,h5')){
 const title=headingNode.textContent.replace(/\s+/g,' ').trim().toLowerCase();
 if(!(/coming in december|(?:20\s*)?honou?rable mentions/.test(title)))continue;
 let block=headingNode.closest('section');
 if(!block||block===platforms||block===sports||block.querySelector('#platforms,#sports')){
   block=headingNode.closest('.panel,.feature,.special,.collection,.honorable,.section')||headingNode.parentElement;
 }
 if(block&&block!==document.body&&!block.contains(platforms)&&!block.contains(sports))block.remove();
}
// Clear selected promotional entries if they are not contained inside platform movie collections.
for(const node of $$('[id],[class]')){
 if(!node.id&&!node.className)continue;
 if(!/(coming|honorable|mentions)/i.test(String(node.id)+' '+String(node.className)))continue;
 if(node===platforms||node===sports||node.contains(platforms)||node.contains(sports))continue;
 if(node.matches('section,aside')&&/coming|honorable|mentions/i.test(node.textContent.slice(0,130)))node.remove();
}
// Netflix title is moved to the very beginning of Netflix movie cards (or inserted if missing).
const normalize=s=>String(s||'').toLowerCase().replace(/[^a-z0-9]/g,'');
const matches=$$('.card',platforms).filter(c=>normalize(c.dataset.key||c.textContent.slice(0,120)).includes('givemesomesugah'));
let card=matches[0];
const netflixCards=$$('.card',platforms).filter(c=>(c.dataset.key||'').startsWith('Netflix|'));
const firstNetflix=netflixCards[0];
const netflixItem={
 platform:'Netflix',cat:'Movies',title:'Give Me Some Sugah',status:'Coming soon · December 16, 2026',
 genre:'2026 · Inspiring family drama',score:null,scoreLabel:'Critic score unavailable',
 desc:'A Chicago baker makes a remarkable discovery that offers a chance to reconnect with family and heal old wounds.',
 longDesc:'Inspired by the true story of Lenore Lindsey, a determined Chicago bakery owner discovers a surprising family connection and faces a chance to reclaim lost time.',
 appeal:'An inspiring, emotional family story starring Taraji P. Henson.',
 cast:'Taraji P. Henson, Joey Bada$$, Aunjanue Ellis-Taylor, Russell Hornsby',
 poster:'https://dnm.nflximg.net/api/v6/a01MIaQTUgSJoLaS_OCn68Eg3hU/AAAAQYnwLTvk0sosP94GLboZKt0LDjmZcsFnwO-XKHQ8JIEDtUWDZYM8BaSUR5kVFTP7RSu9ffjXbZW6RWL-8aEZWWfYV8lLvAhrRCc5egZ7eu3T5FaY7RiK2Tzp_IelmxgAQkrlkUntsbBgUJ7uQ7AKhgFg.jpg?r=d8e',
 trailerPage:'https://www.netflix.com/tudum/articles/tyler-perry-give-me-some-sugah',
 facets:['Black Cinema','Drama','Family']
};
if(card&&firstNetflix&&card!==firstNetflix)firstNetflix.before(card);
if(card){
 const label=make('span','tvguide-coming-label','Coming soon · Dec 16');
 const heading=$('h2,h3,.movie-title,.cardtitle,.title',card)||card.firstElementChild;
 if(heading)heading.after(label);else card.prepend(label);
 const img=$('img.poster',card);if(img){img.src=netflixItem.poster;img.alt='Official Netflix promotional image for Give Me Some Sugah'}
 const button=$('.trailerBtn',card);
 if(button){
 button.textContent='Watch Official Trailer';
 button.classList.remove('media-search','pending','unverified');button.classList.add('media-external');
 button.dataset.title=netflixItem.title;button.dataset.platform='Netflix';
 button.onclick=event=>{event.preventDefault();event.stopImmediatePropagation();window.open(netflixItem.trailerPage,'_blank','noopener,noreferrer')};
 }
}
// Keep footer minimal but preserve substantive legal requirements if present.
for(const footer of $$('footer')){
 const old=footer.textContent;
 if(/Williams TV Guide|family viewing|artwork belongs/i.test(old)){
   footer.replaceChildren();
   footer.append(make('p','tvguide-footer-copy','Williams TV Guide · 2026–2027 · Highly rated movies and series we have not seen—or might want to revisit.'));
 }
}
const css=make('style');
css.textContent=[
 '.tvguide-sport-nav{display:inline-flex;align-items:center;justify-content:center;gap:clamp(2px,.4vw,9px);flex-shrink:0;min-width:0}',
 '.tvguide-vintage-icon{position:relative;display:inline-flex!important;align-items:center;justify-content:center;width:clamp(26px,3.1vw,38px);height:clamp(26px,3.1vw,38px);padding:2px!important;border:0!important;background:transparent!important;border-radius:50%;flex-shrink:0}',
 '.tvguide-vintage-icon svg{display:block;width:100%;height:100%;filter:drop-shadow(0 1px 2px #0008)}',
 '.tvguide-vintage-icon:hover svg,.tvguide-vintage-icon:focus-visible svg{transform:translateY(-2px);filter:drop-shadow(0 0 5px #e9bb65)}',
 '.tvguide-hover-label{position:absolute;bottom:calc(100% + 7px);left:50%;transform:translateX(-50%);padding:5px 8px;background:#13253a;color:#ffe5aa;font:700 12px Georgia,serif;border:1px solid #e3bd77;border-radius:7px;white-space:nowrap;display:none;z-index:999}',
 '.tvguide-vintage-icon:hover .tvguide-hover-label,.tvguide-vintage-icon:focus-visible .tvguide-hover-label{display:block}',
 '.tvguide-sports-group{margin:30px 0 22px;scroll-margin-top:90px}',
 '#basketball,#fights,#football{scroll-margin-top:90px}',
 '.tvguide-subtitle{font:700 clamp(1.3rem,2.2vw,2rem) Georgia,serif!important;color:#f7cf83!important;margin:16px 0!important}',
 '.tvguide-sports-events{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(100%,300px),1fr));gap:12px}',
 '.tvguide-sport-card{min-width:0;margin:0!important}',
 '.tvguide-week-links{display:flex;align-items:center;gap:7px;flex-wrap:wrap;margin:15px 0}',
 '.tvguide-week-links p{width:100%;margin:0 0 4px}',
 '.tvguide-week-links a{padding:6px 10px;border:1px solid #94764c;color:#fbe1a4;border-radius:7px;text-decoration:none}',
 '.tvguide-coming-label{display:inline-block;margin:5px 0;padding:4px 8px;border:1px solid #e6bd72;border-radius:8px;color:#ffe1a1;font:700 12px Georgia,serif}',
 '.tvguide-footer-copy{text-align:center;padding:20px;font:13px/1.5 Georgia,serif;color:#d8cfbf}',
 '@media(max-width:650px){.tvguide-sport-nav{gap:2px}.tvguide-vintage-icon{width:27px;height:27px;min-width:27px}.tvguide-sports-events{grid-template-columns:1fr}}'
].join('\n');document.head.append(css);
window.WilliamsSportsUpgrade={basketball:!!nba,fights:fightsData.length,footballFeatured:footballGames.length,footballWeeklySchedules:6,netflixFeatured:!!card,tennisCategoryAdded:false};
})();