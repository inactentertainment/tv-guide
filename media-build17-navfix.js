(()=>{'use strict';
const nav=document.querySelector('.quicknav'),duplicate=document.querySelector('#guideDock');if(!nav)return;
const hidden=document.getElementById('watchlist');
if(hidden){(document.querySelector('.hero .controlbar')||document.body).append(hidden);hidden.style.display='none'}
const links=nav.querySelector('#quickNetworkLinks'),actions=nav.querySelector('.quickactions');
const juke=duplicate?.querySelector('.dock-jukebox');
if(actions&&juke){actions.insertBefore(juke,actions.querySelector('a[href="#top"]'))}
const oldInput=document.getElementById('search');if(actions&&oldInput){
 let panel=document.createElement('div');panel.className='quick-search-pop';panel.hidden=true;panel.append(oldInput);
 let btn=document.createElement('button');btn.type='button';btn.className='quickaction quick-search-btn';btn.setAttribute('aria-label','Search titles');btn.textContent='⌕';btn.setAttribute('aria-expanded','false');
 btn.onclick=()=>{panel.hidden=!panel.hidden;btn.setAttribute('aria-expanded',String(!panel.hidden));if(!panel.hidden)oldInput.focus()};
 actions.insertBefore(btn,actions.querySelector('a[href="#top"]'));actions.append(panel)
}
if(duplicate)duplicate.remove();
const css=document.createElement('style');css.textContent=`
#guideDock{display:none!important}
html{scroll-padding-top:82px!important}
body{padding-top:0!important}
.quicknav{max-width:1308px;margin:0 auto;box-sizing:border-box;min-height:54px;padding:6px 12px;z-index:165;position:sticky;top:0}
.quicknav .quickactions{display:flex;gap:7px;align-items:center;flex:0 0 auto;position:relative}
.quicknav #quickSaved{display:flex!important;align-items:center;gap:5px;white-space:nowrap}
.quicknav .dock-jukebox{position:relative;flex:0 0 auto;height:35px;min-width:36px;display:flex;align-items:center;justify-content:center;gap:3px;border:1px solid #fff6;border-radius:10px;background:#ffffff12;color:#ffe0a0;padding:6px 8px}
.quicknav .dock-jukebox i{display:block;width:3px;height:13px;border-radius:2px;background:currentColor;animation:holidayBars 1.1s ease-in-out infinite alternate}
.quicknav .dock-jukebox i:nth-child(2){height:22px;animation-delay:-.35s}.quicknav .dock-jukebox i:nth-child(3){height:9px;animation-delay:-.65s}.quicknav .dock-jukebox i:nth-child(4){height:17px;animation-delay:-.9s}
.quicknav .quick-search-btn{font-size:23px;line-height:1}
.quicknav .quick-search-pop{position:absolute;right:0;top:100%;padding:9px;background:#10223e;border:1px solid #d4b477;border-radius:9px;min-width:min(340px,90vw);z-index:200}
.quicknav .quick-search-pop[hidden]{display:none!important}
.quicknav .quick-search-pop input{display:block!important;min-height:43px;width:100%;padding:9px;color:white;background:#07172c;border:1px solid #ffffff7a;border-radius:8px}
#guideHoverTip{z-index:9999!important}
#holidayJukebox{top:65px!important}
@media(max-width:650px){.quicknav{width:100%;padding:5px!important;gap:4px}.quicknav .quicklogos{gap:5px!important}.quicknav .quickactions{gap:2px}.quicknav #quickSaved{padding:4px!important;font-size:0!important;min-width:29px}.quicknav #quickSaved:before{content:'★';font-size:16px}.quicknav #quickSavedCount{font-size:10px!important}.quicknav .dock-jukebox{padding:3px 4px;min-width:28px;height:29px}.quicknav .dock-jukebox i{width:2px}.quicknav .quick-search-btn{padding:3px!important;min-width:28px!important}.quicknav .quickaction{min-height:29px!important}}
@media(prefers-reduced-motion:reduce){.quicknav .dock-jukebox i{animation:none}}
`;document.head.append(css);
for(const a of links?.querySelectorAll('a[href^="#"]')||[]){
a.addEventListener('click',e=>{
 const savedBtn=document.getElementById('quickSaved');
 if(savedBtn?.classList.contains('active'))hidden?.click();
 const search=document.getElementById('search');if(search?.value){search.value='';search.dispatchEvent(new Event('input',{bubbles:true}))}
 const section=document.querySelector(a.getAttribute('href'));if(section){e.preventDefault();requestAnimationFrame(()=>section.scrollIntoView({behavior:'smooth',block:'start'}))}
 },true);
}
const tip=document.getElementById('guideHoverTip')||document.createElement('div');tip.id='guideHoverTip';if(!tip.isConnected)document.body.append(tip);
const getTip=el=>el?.getAttribute('aria-label')||el?.getAttribute('title')||'';
nav.addEventListener('pointerover',e=>{const t=e.target.closest('button,a');if(!t)return;tip.textContent=getTip(t);if(!tip.textContent)return;const r=t.getBoundingClientRect();tip.style.display='block';tip.style.position='fixed';tip.style.pointerEvents='none';tip.style.zIndex='9999';tip.style.background='#14263d';tip.style.color='#ffe6af';tip.style.border='1px solid #dabb78';tip.style.borderRadius='8px';tip.style.padding='5px 8px';tip.style.fontSize='12px';tip.style.top=Math.max(0,r.top-31)+'px';tip.style.left=Math.max(2,Math.min(innerWidth-tip.offsetWidth-2,r.left+(r.width-tip.offsetWidth)/2))+'px'});
nav.addEventListener('pointerout',e=>{if(!nav.contains(e.relatedTarget))tip.style.display='none'});
window.WilliamsNavigationStatus=()=>({stickyBarCount:document.querySelectorAll('.quicknav').length,duplicateGuideDock:!!document.querySelector('#guideDock'),favoriteCounter:document.getElementById('quickSavedCount')?.textContent,jukeboxInBar:!!document.querySelector('.quicknav .dock-jukebox'),searchAvailable:!!document.getElementById('search')});
})();