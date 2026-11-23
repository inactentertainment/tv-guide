(()=>{'use strict';
const source='./ie-jukebox.html',doc=document,nav=doc.querySelector('.quicknav')||doc.querySelector('#guideDock');
if(!nav)return;
let button=nav.querySelector('.dock-jukebox');
if(!button){
 button=doc.createElement('button');button.type='button';button.className='dock-jukebox';button.innerHTML='<i></i><i></i><i></i><i></i>';
 const actions=nav.querySelector('.quickactions')||nav.querySelector('.dock-trailing')||nav;
 const arrow=actions.querySelector('a[href="#top"],button.dock-top');
 if(arrow)arrow.before(button);else actions.append(button);
}
let panel=doc.getElementById('holidayJukebox');
if(!panel){
 panel=doc.createElement('aside');panel.id='holidayJukebox';panel.setAttribute('aria-label','InAct Entertainment Jukebox');
 panel.innerHTML='<div class="holiday-top"><span>InAct Entertainment Jukebox</span><div><button type="button" class="holiday-min" aria-label="Minimize jukebox">−</button><button type="button" class="holiday-close" aria-label="Close jukebox">×</button></div></div><iframe title="InAct Entertainment original jukebox" allow="autoplay;encrypted-media;picture-in-picture"></iframe>';
 doc.body.append(panel);
}
let iframe=panel.querySelector('iframe');if(!iframe){iframe=doc.createElement('iframe');panel.append(iframe)}
iframe.dataset.src=source;iframe.setAttribute('title','InAct original jukebox with music and video');iframe.setAttribute('allow','autoplay;encrypted-media;picture-in-picture');
button.setAttribute('aria-label','InAct Entertainment Jukebox');button.setAttribute('aria-controls','holidayJukebox');button.type='button';
let a=panel.querySelector('.tvguide-jukebox-source');
if(!a){a=doc.createElement('a');a.className='tvguide-jukebox-source';a.target='_blank';a.rel='noopener noreferrer';const h=panel.querySelector('.holiday-top');if(h)h.after(a);else panel.prepend(a)}
a.href=source;a.textContent='Open original IE jukebox in full view';
const css=doc.createElement('style');
css.textContent=[
'.quicknav .dock-jukebox{display:flex!important;min-width:30px!important;height:34px!important;align-items:center!important;justify-content:center!important;gap:2px!important;background:transparent!important;border:0!important;box-shadow:none!important;cursor:pointer!important}',
'.quicknav .dock-jukebox i{display:block;width:3px;height:14px;border-radius:2px;background:#ffe0a0;animation:holidayBars 1.1s ease-in-out infinite alternate}',
'.quicknav .dock-jukebox i:nth-child(2){height:21px;animation-delay:-.35s}.quicknav .dock-jukebox i:nth-child(3){height:10px;animation-delay:-.7s}.quicknav .dock-jukebox i:nth-child(4){height:17px;animation-delay:-.9s}',
'.quicknav .dock-jukebox:hover{transform:scale(1.15)!important;filter:drop-shadow(0 0 6px #ffd88a80)!important}',
'#holidayJukebox{display:none;position:fixed!important;top:64px!important;right:10px!important;width:min(530px,calc(100vw - 20px))!important;height:min(650px,calc(100dvh - 80px))!important;background:#0c1829!important;color:#fff2db!important;border:1px solid #a78b5d!important;border-radius:14px!important;z-index:19000!important;box-shadow:0 16px 40px #000b!important;overflow:hidden!important}',
'#holidayJukebox.open{display:flex!important;flex-direction:column!important}',
'#holidayJukebox .holiday-top{display:flex!important;align-items:center!important;justify-content:space-between!important;flex:0 0 auto!important;padding:9px 12px!important;background:#15283e!important;font:700 14px Georgia,serif!important}',
'#holidayJukebox .holiday-top button{color:#f7d994!important;background:transparent!important;border:0!important;font-size:21px!important;cursor:pointer!important;padding:2px 8px!important}',
'#holidayJukebox .tvguide-jukebox-source{display:block!important;flex:none!important;text-align:center!important;padding:6px!important;font:12px Georgia,serif!important;color:#f5ddae!important;background:#1a3049!important}',
'#holidayJukebox iframe{display:block!important;width:100%!important;min-height:0!important;flex:1 1 auto!important;border:0!important;background:#080d16!important}',
'#holidayJukebox.minimized{height:auto!important}#holidayJukebox.minimized iframe{display:none!important}',
'@media(max-width:650px){#holidayJukebox{top:49px!important;right:5px!important;width:calc(100vw - 10px)!important;height:min(710px,calc(100dvh - 58px))!important}.quicknav .dock-jukebox{height:29px!important;min-width:28px!important}}',
'@media(prefers-reduced-motion:reduce){.quicknav .dock-jukebox i{animation:none}}'
].join('\n');doc.head.append(css);
const setOpen=open=>{panel.classList.toggle('open',open);panel.classList.remove('minimized');button.setAttribute('aria-expanded',String(open));if(open){if(iframe.getAttribute('src')!==source)iframe.src=source}else iframe.src='about:blank'};
button.onclick=null;
doc.addEventListener('click',ev=>{
const t=ev.target;
if(t.closest?.('.quicknav .dock-jukebox,#guideDock .dock-jukebox')){ev.preventDefault();ev.stopImmediatePropagation();setOpen(!panel.classList.contains('open'));return}
if(t.closest?.('#holidayJukebox .holiday-close')){ev.preventDefault();ev.stopImmediatePropagation();setOpen(false);return}
if(t.closest?.('#holidayJukebox .holiday-min')){ev.preventDefault();ev.stopImmediatePropagation();panel.classList.toggle('minimized');return}
},true);
window.WilliamsJukeboxConnection={buttonConnected:true,localPlayerPage:source,frameConnected:!!iframe,sourceCopiedLocally:true};
})();