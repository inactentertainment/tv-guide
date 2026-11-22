(()=>{'use strict';
/* Build 22: production QA controls. Browser-tested image links and explicitly user-checked videos are tracked separately from stored metadata. */
const root=document.getElementById('platforms'),data=document.getElementById('data');
if(!root||!data)return;
let catalog;try{catalog=JSON.parse(data.textContent).items||[]}catch{return}
const valid=id=>typeof id==='string'&&/^[A-Za-z0-9_-]{11}$/.test(id);
const key=i=>i.platform+'|'+i.cat+'|'+i.title;
const cards=new Map([...root.querySelectorAll('.card')].map(c=>[c.dataset.key,c]));
const storage='williams-build22-media-reviewed-v1';
let reviewed={};try{reviewed=JSON.parse(localStorage.getItem(storage)||'{}')}catch{}
const save=()=>{try{localStorage.setItem(storage,JSON.stringify(reviewed))}catch{}};
const rows=catalog.map(item=>{
 const card=cards.get(key(item)),image=card?.querySelector('img.poster'),button=card?.querySelector('.trailerBtn');
 const video=valid(button?.dataset.id)?button.dataset.id:(valid(item.trailer)?item.trailer:'');
 return {item,card,image,button,video};
});
function imageLoaded(row){const img=row.card?.querySelector('img.poster');return !!(img?.complete&&img.naturalWidth>0)}
function summary(){
 const videos=rows.filter(r=>r.video).length;
 const loaded=rows.filter(imageLoaded).length;
 const vConfirmed=rows.filter(r=>reviewed[key(r.item)]?.video==='works').length;
 const vBroken=rows.filter(r=>reviewed[key(r.item)]?.video==='broken').length;
 return {total:rows.length,videoReferences:videos,videoReferencesMissing:rows.length-videos,postersLoadedInThisBrowser:loaded,postersNotLoadedOrNotRendered:rows.length-loaded,videosManuallyConfirmed:vConfirmed,videosManuallyReportedBroken:vBroken,scope:'Image loaded in this browser; video user-reviewed only; unvisited lazy images may appear unconfirmed'};
}
window.WilliamsBuild22MediaQA={summary,records:rows.map(r=>({title:r.item.title,platform:r.item.platform,key:key(r.item),videoId:r.video||'',posterReference:r.item.poster||r.item.altPoster||'',videoReview:reviewed[key(r.item)]?.video||'untested'}))};
const params=new URLSearchParams(location.search);
if(!params.has('audit'))return;
const style=document.createElement('style');style.textContent=`
#build22qa{max-width:1290px;margin:22px auto;padding:18px;background:#122c3c;border:1px solid #bfa56b;border-radius:14px;color:#eee7d7;font:14px system-ui}
#build22qa h2{font:700 24px Georgia,serif;color:#f8d77c;margin:0 0 9px}
#build22qa button,#build22qa select,#build22qa input{padding:8px 10px;margin:3px;background:#f6eedb;color:#152334;border:1px solid #c5a865;border-radius:7px}
#build22qa table{width:100%;border-collapse:collapse;font-size:12px}#build22qa th,#build22qa td{padding:7px;text-align:left;border-bottom:1px solid #597080}
#build22qa a{color:#ffe09a}#build22qa .scroll{max-height:520px;overflow:auto}
#build22qa .counts{display:flex;flex-wrap:wrap;gap:14px;margin:12px 0}#build22qa .counts strong{color:#ffdd94}
`;document.head.append(style);
const panel=document.createElement('section');panel.id='build22qa';panel.innerHTML='<h2>Build 22 · Actual Media Review</h2><p>Direct video IDs are inventory references, not certified playback. Mark a video Working or Broken only after opening it. Poster images may be lazy-loaded and initially show as untested. Review results are saved only on this browser.</p><div class="counts"></div><input type="search" aria-label="Search title" placeholder="Filter by title or platform"><select aria-label="Filter media status"><option value="all">All titles</option><option value="video">Missing direct video</option><option value="poster">Poster not loaded in browser</option><option value="broken">Marked broken video</option><option value="untested">Video not yet checked</option></select><button class="refresh">Refresh image check</button><button class="export">Export audit CSV</button><div class="scroll"><table><thead><tr><th>Title / platform</th><th>Direct video</th><th>Poster</th><th>Manual playback QA</th></tr></thead><tbody></tbody></table></div>';
const anchor=document.querySelector('#mediaAuditPanel')||document.querySelector('footer');
if(anchor)anchor.parentNode.insertBefore(panel,anchor.nextSibling);else document.body.append(panel);
const body=panel.querySelector('tbody'),input=panel.querySelector('input'),filter=panel.querySelector('select');
const safe=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;','\'':'&#39;'}[c]));
function filtered(){const q=input.value.trim().toLowerCase(),f=filter.value;return rows.filter(r=>{
const status=reviewed[key(r.item)]?.video||'untested';
return (r.item.title+' '+r.item.platform).toLowerCase().includes(q)&&
(f==='all'||f==='video'&&!r.video||f==='poster'&&!imageLoaded(r)||f==='broken'&&status==='broken'||f==='untested'&&status==='untested');
})}
function render(){
const s=summary();
panel.querySelector('.counts').innerHTML='<span>Total <strong>'+s.total+'</strong></span><span>Direct video IDs <strong>'+s.videoReferences+'</strong></span><span>Missing IDs <strong>'+s.videoReferencesMissing+'</strong></span><span>Posters loaded <strong>'+s.postersLoadedInThisBrowser+'</strong></span><span>Manually playable <strong>'+s.videosManuallyConfirmed+'</strong></span><span>Reported broken <strong>'+s.videosManuallyReportedBroken+'</strong></span>';
body.innerHTML=filtered().map(r=>{
const k=key(r.item),status=reviewed[k]?.video||'untested';
return '<tr><td><b>'+safe(r.item.title)+'</b><div>'+safe(r.item.platform)+'</div></td><td>'+(r.video?'<a target="_blank" rel="noopener" href="https://www.youtube.com/watch?v='+encodeURIComponent(r.video)+'">Open video</a>':'No video ID')+'</td><td>'+(imageLoaded(r)?'Loaded':'Not confirmed')+'</td><td><select data-key="'+safe(k)+'" aria-label="Playback review for '+safe(r.item.title)+'"><option value="untested"'+(status==='untested'?' selected':'')+'>Not tested</option><option value="works"'+(status==='works'?' selected':'')+'>Working</option><option value="broken"'+(status==='broken'?' selected':'')+'>Broken</option></select></td></tr>';
}).join('');
}
body.addEventListener('change',e=>{const select=e.target.closest('select[data-key]');if(!select)return;reviewed[select.dataset.key]={video:select.value,checked:new Date().toISOString()};save();render()});
panel.querySelector('.refresh').addEventListener('click',render);input.addEventListener('input',render);filter.addEventListener('change',render);
panel.querySelector('.export').addEventListener('click',()=>{
const output=[['Title','Platform','Video ID','Poster loaded in browser','Video review','Reviewed at'],...rows.map(r=>{const v=reviewed[key(r.item)]||{};return[r.item.title,r.item.platform,r.video,imageLoaded(r)?'yes':'not confirmed',v.video||'untested',v.checked||'']})];
const csv=output.map(cols=>cols.map(c=>'"'+String(c??'').replace(/"/g,'""')+'"').join(',')).join('\r\n');
const link=document.createElement('a');link.href=URL.createObjectURL(new Blob([csv],{type:'text/csv'}));link.download='williams-build22-live-media-qa.csv';link.click();setTimeout(()=>URL.revokeObjectURL(link.href),1000);
});
render();
})();