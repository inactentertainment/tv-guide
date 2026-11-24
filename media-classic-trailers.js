(()=>{'use strict';
/* Original-release archival trailers that can run INSIDE the existing TV Guide player.
   Video originals are hosted by Wikimedia Commons. Sources checked by title/year. */
const archive={
 'Night of the Living Dead':{
  filename:'Night Of The Living Dead (1968) - trailer.webm',
  label:'Night of the Living Dead (1968) — original theatrical trailer',
  page:'https://commons.wikimedia.org/wiki/File:Night_Of_The_Living_Dead_(1968)_-_trailer.webm'
 },
 'His Girl Friday':{
  filename:'His Girl Friday (1940) by Howard Hawks, Trailer.webm',
  label:'His Girl Friday (1940) — original theatrical trailer',
  page:'https://commons.wikimedia.org/wiki/File:His_Girl_Friday_(1940)_by_Howard_Hawks,_Trailer.webm'
 },
 'Detour':{
  filename:'Detour (1945) by Edgar G. Ulmer, trailer.webm',
  label:'Detour (1945) — original theatrical trailer',
  page:'https://commons.wikimedia.org/wiki/File:Detour_(1945)_by_Edgar_G._Ulmer,_trailer.webm'
 }
};
window.WilliamsClassicMedia=archive;
window.WilliamsPlayClassicMedia=function(name){
 const v=archive[name],modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');
 if(!v||!modal||!box)return false;
 const header=document.getElementById('videoTitle');if(header)header.textContent=v.label;
 box.replaceChildren();box.classList.add('media-picker');
 const player=document.createElement('video');
 player.controls=true;player.playsInline=true;player.preload='metadata';player.autoplay=false;
 player.style.cssText='display:block;width:100%;aspect-ratio:16/9;max-height:65vh;object-fit:contain;background:#080e16;border-radius:8px';
 const source=document.createElement('source');source.src='https://commons.wikimedia.org/wiki/Special:Redirect/file/'+encodeURIComponent(v.filename);source.type='video/webm';player.append(source);
 const status=document.createElement('p');status.className='playnote';
 status.textContent='Archival original release trailer. Video remains inside Williams TV Guide. Source: Wikimedia Commons.';
 const page=document.createElement('a');page.href=v.page;page.target='_blank';page.rel='noopener noreferrer';page.textContent='Original source page (only if the embedded video is unavailable)';page.className='mini media-link';
 player.addEventListener('error',()=>{status.textContent='This browser could not load the archived trailer. You may open the source link below.'});
 box.append(player,status,page);modal.classList.add('open');document.body.classList.add('noscroll');
 return true;
};
window.WilliamsClassicMediaQA={total:Object.keys(archive).length,archives:Object.keys(archive),source:'Wikimedia Commons original trailers'};
})();