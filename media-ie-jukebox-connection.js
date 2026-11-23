(()=>{'use strict';
/* Reconnect the existing icon + popover to the original IE full-featured jukebox. */
const src='https://inactentertainment.github.io/ie/holiday-jukebox.html';
const nav=document.querySelector('.quicknav')||document.querySelector('#guideDock');
const button=nav?.querySelector('.dock-jukebox');
const panel=document.getElementById('holidayJukebox');
if(!button||!panel)return;
const frame=panel.querySelector('iframe');
if(!frame)return;
button.setAttribute('aria-label','InAct Entertainment Jukebox');
button.setAttribute('aria-controls','holidayJukebox');
button.setAttribute('aria-expanded',String(panel.classList.contains('open')));
frame.setAttribute('title','InAct Entertainment original music, movies, motivation and meditation jukebox');
frame.setAttribute('allow','autoplay;encrypted-media;picture-in-picture');
frame.dataset.src=src;
const css=document.createElement('style');
css.textContent='.quicknav .dock-jukebox{border:0!important;background:transparent!important;box-shadow:none!important}.quicknav .dock-jukebox:hover{filter:drop-shadow(0 0 6px #e3c388aa)!important;transform:scale(1.13)!important}#holidayJukebox.open{display:flex!important;flex-direction:column!important}#holidayJukebox iframe{display:block!important;flex:1 1 auto!important;width:100%!important;min-height:270px!important}#holidayJukebox.minimized iframe{display:none!important}#holidayJukebox .holiday-top{flex:0 0 auto!important}';
document.head.append(css);
const direct=panel.querySelector('.tvguide-jukebox-source');
if(direct){direct.href=src;direct.textContent='Open full InAct jukebox in a new tab'}
function setOpen(shouldOpen){
 panel.classList.toggle('open',shouldOpen);
 panel.classList.remove('minimized');
 button.setAttribute('aria-expanded',String(shouldOpen));
 if(shouldOpen){if(frame.getAttribute('src')!==src)frame.src=src}
 else frame.src='about:blank';
}
document.addEventListener('click',event=>{
 const toggle=event.target.closest?.('.quicknav .dock-jukebox,#guideDock .dock-jukebox');
 const close=event.target.closest?.('#holidayJukebox .holiday-close');
 const min=event.target.closest?.('#holidayJukebox .holiday-min');
 if(toggle){event.preventDefault();event.stopImmediatePropagation();setOpen(!panel.classList.contains('open'));return}
 if(close){event.preventDefault();event.stopImmediatePropagation();setOpen(false);return}
 if(min){event.preventDefault();event.stopImmediatePropagation();panel.classList.toggle('minimized');return}
},true);
window.WilliamsJukeboxConnection={usesOriginalIESource:frame.dataset.src===src,buttonConnected:true,closeConnected:true,minimizeConnected:true,source:src};
})();