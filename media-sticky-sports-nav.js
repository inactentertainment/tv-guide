(()=>{'use strict';
const nav=document.querySelector('.quicknav')||document.querySelector('#guideDock');if(!nav)return;
const art=[
['Basketball','#basketball','<circle cx="24" cy="24" r="19" fill="#b27841" stroke="#462a1b" stroke-width="2"/><path d="M5 24h38M24 5v38M9 12Q24 24 9 36M39 12Q24 24 39 36" fill="none" stroke="#4a2a18" stroke-width="2.3"/>'],
['Fights','#fights','<path d="M13 33C6 26 8 17 16 11c6-4 13-4 18 1 5 5 3 13-1 18l-3 7H15z" fill="#a34635" stroke="#4c2420" stroke-width="2"/><path d="M16 32q7 6 16-1M14 22q-2 6 3 9M15 38h16" stroke="#e5b58b" stroke-width="2" fill="none"/><rect x="15" y="39" width="16" height="5" rx="1" fill="#6c3b29"/>'],
['Football','#football','<path d="M6 32C7 16 23 6 42 11c0 19-17 30-34 27z" fill="#86502b" stroke="#482b1c" stroke-width="2.4"/><path d="M13 32 35 16M20 24l7 7M25 20l7 7M30 16l7 7" fill="none" stroke="#f2dcb8" stroke-width="2"/>']
];
const style=document.createElement('style');
style.textContent='.quicknav .williams-sports-three,#guideDock .williams-sports-three{display:inline-flex!important;align-items:center!important;gap:3px!important;white-space:nowrap!important;flex:0 0 auto!important;overflow:visible!important}.quicknav .williams-sport-icon,#guideDock .williams-sport-icon{box-sizing:border-box!important;width:35px!important;height:35px!important;min-width:0!important;padding:3px!important;border:1px solid #ffffff44!important;border-radius:9px!important;background:#ffffff0c!important;display:inline-flex!important;align-items:center!important;justify-content:center!important;position:relative!important;flex:0 0 auto!important;overflow:visible!important}.williams-sport-icon svg{width:100%!important;height:100%!important;display:block!important;pointer-events:none}.williams-sport-icon .williams-sport-tip{position:absolute!important;bottom:calc(100% + 12px)!important;left:50%!important;transform:translateX(-50%)!important;display:none!important;white-space:nowrap!important;pointer-events:none!important;background:#16273c!important;color:#ffe2a4!important;border:1px solid #dbbb82!important;border-radius:7px!important;padding:5px 8px!important;z-index:99999!important;font:700 12px Georgia,serif!important;box-shadow:0 5px 16px #0009!important}.williams-sport-icon:hover .williams-sport-tip,.williams-sport-icon:focus-visible .williams-sport-tip{display:block!important}.williams-sport-icon:focus-visible{outline:2px solid #e8c16f!important}@media(max-width:700px){.quicknav .williams-sports-three,#guideDock .williams-sports-three{gap:2px!important}.quicknav .williams-sport-icon,#guideDock .williams-sport-icon{width:28px!important;height:29px!important;padding:2px!important;border-radius:6px!important}.quicknav .quicklogos{min-width:0!important;gap:3px!important}}';
document.head.append(style);
function target(el){
if(el.closest('.williams-sports-three'))return false;
const meta=[el.textContent,el.getAttribute('aria-label'),el.getAttribute('title'),el.className,el.getAttribute('href')].join(' ').toLowerCase();
return el.classList.contains('sports')||el.getAttribute('href')==='#sports'||/sports?\s*(&|and|\/)\s*boxing|sports\s*and\s*boxing/.test(meta)||(/^sports$/i.test(el.textContent.trim()));
}
const candidates=Array.from(nav.querySelectorAll('a,button,.brand'));
let matches=candidates.filter(target);
function build(){
const group=document.createElement('span');group.className='williams-sports-three';group.setAttribute('role','group');group.setAttribute('aria-label','Basketball, Fights and Football');
for(const [name,href,svg] of art){
const a=document.createElement('a');a.href=href;a.className='williams-sport-icon';a.setAttribute('aria-label',name);
a.innerHTML='<svg viewBox="0 0 48 48" aria-hidden="true">'+svg+'</svg><span class="williams-sport-tip">'+name+'</span>';
a.addEventListener('click',event=>{const dest=document.querySelector(href);if(dest){event.preventDefault();dest.scrollIntoView({behavior:'smooth',block:'start'})}});
group.append(a)}
return group;
}
if(matches.length){
matches[0].replaceWith(build());
matches.slice(1).forEach(el=>{if(el.isConnected)el.remove()});
}else{
const old=nav.querySelector('.tvguide-sport-nav');if(old)old.replaceWith(build());
}
for(const old of nav.querySelectorAll('.tvguide-sport-nav'))old.remove();
window.WilliamsStickySportsQA={replaced:matches.length,icons:nav.querySelectorAll('.williams-sports-three .williams-sport-icon').length,targets:art.map(x=>[x[0],!!document.querySelector(x[1])])};
})();