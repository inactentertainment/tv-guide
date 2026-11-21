(()=>{'use strict';
const node=document.getElementById('data');if(!node)return;
const items=JSON.parse(node.textContent).items;
const mapped={"The Wild Robot":"67vbA5ZJdKQ","The Marvelous Mrs. Maisel":"fOmwkTrW4OQ","Mare of Easttown":"pwaLLEZO6FM","Fleabag":"I5Uv6cb9YRs","Jingle Jangle: A Christmas Journey":"aYPUYVgwLWY","The Holdovers":"AhKLpJmHhIg","Oppenheimer":"bK6ldnjE3Y0","Bosch":"vuVAP_4TQEY","Santa Claus Conquers the Martians":"PG1YxXE7fUw","The Knick":"VMXgWK0VmxA","Deadwood":"mFIojradr4Y","The Night Of":"556N5vojtp0","The Resort":"0DmeT1GLQn8","Bel-Air":"_-_P9DPMuy8","Watchmen":"FeFpwFo1osg","I May Destroy You":"DTjlurdbNnw","His Three Daughters":"K0jwAP2fS1E","Wake Up Dead Man: A Knives Out Mystery":"0hc8yz5-d5Y","Train Dreams":"_Nk8TrBHOrA","Wallace & Gromit: Vengeance Most Fowl":"kQqrBzJ5wIc","Unbelievable":"QTIkUzkbzQk","Baby Reindeer":"eafm1gB6SCM","The Diplomat":"lV6sJlBbhPs","The Boys":"M1bhOaLV4FU","The Underground Railroad":"_Pq5Usc_JDA","Companion":"Qr_kX0D3DNA","Chernobyl":"PMlwjCID3Io","Bring Her Back":"kBskrYZfhw8","Sorry, Baby":"Rc0jgWoZo9w","Good Omens":"gDoDy5ZWWcY","A Christmas Story":"etfV8MjPWXE","Marty Supreme":"s9gSuKaKcqM","d Kick You":"ywFDoT7LBbQ","Lurker":"876d5ZnyzzQ","We Own This City":"Ig9BcW7gXvE","Show Me a Hero":"0FPIflcWIOk","A Black Lady Sketch Show":"xVnNa7lc97M","South Side":"6tQ6TRC6LHA","Glass Onion: A Knives Out Mystery":"gj5ibYSz8C0","Supacell":"Frmk94Etedo","Hit Man":"UoVIxeXT7W0","The Wiz":"CGtnHaEK66s","When They See Us":"-6SHPSFkUGE"};
const validId=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const records=items.map((e,i)=>{
 const key=e.platform+'|'+e.cat+'|'+e.title;
 const card=[...document.querySelectorAll('#platforms .card')].find(c=>c.dataset.key===key);
 const button=card?.querySelector('.trailerBtn');
 const id=(validId(e.trailer)?e.trailer:null)||(validId(mapped[e.title])?mapped[e.title]:null);
 const hasPoster=!!(e.poster||e.altPoster);
 const hasScore=typeof e.score==='number'&&e.score>=0&&e.score<=100;
 const hasDescription=!!String(e.desc||'').trim();
 const hasCast=!!String(e.cast||'').trim();
 const hasReview=!!String(e.appeal||'').trim();
 const previewImage=card?.querySelector('img.poster');
 const loaded=!!(previewImage?.complete&&previewImage.naturalWidth>0);
 if(button){button.textContent='Watch Trailer';button.classList.toggle('verified',!!id);button.classList.toggle('pending',!id);button.dataset.mediaAudit=id?'connected':'not-connected';if(id)button.dataset.id=id;else button.dataset.id='';}
 return {number:i+1,key,platform:e.platform,category:e.cat,title:e.title,trailerId:id||'',trailerStatus:id?'ID connected · playback untested':'No direct trailer',posterRef:hasPoster?'Present':'Missing; auto-lookup required',posterLoaded:loaded?'Loaded':'Not confirmed',score:hasScore?e.score:'',review:hasReview?'Present':'Missing',summary:hasDescription?'Present':'Missing',cast:hasCast?'Present':'Missing'}
});
const summary=()=>({
 entries:records.length,
 trailerIDsConnected:records.filter(x=>x.trailerId).length,
 trailerIDsMissing:records.filter(x=>!x.trailerId).length,
 posterReferences:records.filter(x=>x.posterRef==='Present').length,
 posterReferencesMissing:records.filter(x=>x.posterRef!=='Present').length,
 criticScoresPresent:records.filter(x=>x.score!=='').length,
 criticScoresMissing:records.filter(x=>x.score==='').length,
 recommendationNotesPresent:records.filter(x=>x.review==='Present').length,
 recommendationNotesMissing:records.filter(x=>x.review!=='Present').length,
 synopsisMissing:records.filter(x=>x.summary!=='Present').length,
 castMissing:records.filter(x=>x.cast!=='Present').length
});
const checkLoaded=()=>{for(const row of records){let c=[...document.querySelectorAll('#platforms .card')].find(x=>x.dataset.key===row.key);let img=c?.querySelector('img.poster');row.posterLoaded=img?.complete&&img.naturalWidth>0?'Loaded':'Not confirmed'}return records.filter(x=>x.posterLoaded==='Loaded').length};
window.WilliamsMediaAudit={records,summary,checkLoaded,scope:'Catalog metadata and current page image state; does not independently verify YouTube playback or external image servers'};
if(!new URLSearchParams(location.search).has('audit'))return;
const css=document.createElement('style');css.textContent=`
#mediaAuditPanel{font:14px system-ui;position:relative;max-width:1308px;margin:25px auto 60px;background:#132139;color:#f5ead6;border:1px solid #eac98b;border-radius:18px;padding:20px;box-shadow:0 15px 45px #0007}
#mediaAuditPanel h2{font:700 24px Georgia,serif;color:#ffdd9b;margin:0 0 9px}
#mediaAuditPanel p{line-height:1.5;margin:8px 0 15px}
#mediaAuditPanel .audit-counts{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:12px 0}
#mediaAuditPanel .audit-counts>div{background:#ffffff0c;border-radius:10px;padding:12px}
#mediaAuditPanel .audit-counts strong{display:block;font-size:23px;color:#ffdd93}
#mediaAuditPanel .audit-actions{display:flex;gap:10px;flex-wrap:wrap;margin:12px 0}
#mediaAuditPanel button,#mediaAuditPanel select{border:1px solid #d9b678;background:#21334c;color:#fff1d5;border-radius:8px;padding:9px 11px}
#mediaAuditPanel .audit-list{max-height:530px;overflow:auto;border:1px solid #ffffff35;border-radius:9px}
#mediaAuditPanel table{width:100%;border-collapse:collapse;font-size:12px}
#mediaAuditPanel th{position:sticky;top:0;background:#283b55;color:#ffe5a3;text-align:left;padding:8px}
#mediaAuditPanel td{padding:8px;border-top:1px solid #ffffff19}
#mediaAuditPanel a{color:#ffda88}
`;document.head.append(css);
const panel=document.createElement('section');panel.id='mediaAuditPanel';
panel.innerHTML='<h2>Williams TV Guide · Full Catalog Media Audit</h2><p>Every movie/series card is checked for stored trailer ID, poster reference, score, synopsis, cast and recommendation. ID presence is <b>not proof of video playback</b>. Poster display is checked only when an image has loaded in the current session.</p><div class="audit-counts"></div><div class="audit-actions"><select aria-label="Audit issue filter"><option value="all">All catalog titles</option><option value="trailer">Missing direct trailers</option><option value="poster">Missing poster sources</option><option value="review">Missing critic score or review</option><option value="image">Image not yet loaded</option></select><button class="audit-refresh">Recheck loaded covers</button><button class="audit-download">Export all 170 rows (CSV)</button></div><div class="audit-list"><table><thead><tr><th>#</th><th>Platform</th><th>Title</th><th>Direct trailer</th><th>Cover</th><th>Critics</th><th>Commentary</th></tr></thead><tbody></tbody></table></div>';
(document.querySelector('#platforms')||document.body).insertAdjacentElement('beforebegin',panel);
const counts=panel.querySelector('.audit-counts'),body=panel.querySelector('tbody'),filter=panel.querySelector('select');
function paint(){const stat=summary();counts.innerHTML=[['Catalog',stat.entries],['Video IDs connected',stat.trailerIDsConnected],['No direct trailer',stat.trailerIDsMissing],['Poster sources',stat.posterReferences],['Poster source missing',stat.posterReferencesMissing],['Critic scores missing',stat.criticScoresMissing],['Why-watch notes missing',stat.recommendationNotesMissing],['Covers loaded now',records.filter(x=>x.posterLoaded==='Loaded').length]].map(([label,n])=>'<div><strong>'+n+'</strong>'+label+'</div>').join('');
 body.replaceChildren();
 let filtered=records.filter(r=>filter.value==='trailer'?!r.trailerId:filter.value==='poster'?r.posterRef!=='Present':filter.value==='review'?(r.score===''||r.review!=='Present'):filter.value==='image'?r.posterLoaded!=='Loaded':true);
 for(const r of filtered){const tr=document.createElement('tr');const vals=[r.number,r.platform,r.title,r.trailerId?'Connected / untested':'Missing',r.posterLoaded==='Loaded'?'Loaded':r.posterRef==='Present'?'Source / not confirmed':'Auto lookup',r.score===''?'Not provided':r.score+'%',r.review];for(const v of vals){let td=document.createElement('td');td.textContent=String(v);tr.append(td)}body.append(tr)}
}
filter.onchange=paint;panel.querySelector('.audit-refresh').onclick=()=>{checkLoaded();paint()};
panel.querySelector('.audit-download').onclick=()=>{const keys=['number','platform','category','title','trailerId','trailerStatus','posterRef','posterLoaded','score','review','summary','cast'];const cell=v=>'"'+String(v??'').replaceAll('"','""')+'"';const csv=[keys.join(','),...records.map(r=>keys.map(k=>cell(r[k])).join(','))].join('\r\n');const url=URL.createObjectURL(new Blob([csv],{type:'text/csv;charset=utf-8'}));const a=document.createElement('a');a.href=url;a.download='williams-tv-guide-170-title-audit.csv';a.click();setTimeout(()=>URL.revokeObjectURL(url),3000)};
paint();
})();