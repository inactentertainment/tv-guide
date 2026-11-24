(()=>{'use strict';
const films={'This Is Not a War Story':{id:'703067329',name:'This Is Not a War Story (2021) — original Vimeo trailer',source:'https://vimeo.com/703067329'}};
window.WilliamsVimeoMedia=films;
window.WilliamsPlayVimeoMedia=(title)=>{
 const item=films[title],modal=document.getElementById('videoModal'),box=document.getElementById('videoBox');
 if(!item||!modal||!box)return false;
 const heading=document.getElementById('videoTitle');if(heading)heading.textContent=item.name;
 box.replaceChildren();box.classList.add('media-picker');
 const frame=document.createElement('iframe');frame.src='https://player.vimeo.com/video/'+item.id+'?autoplay=1';frame.allow='autoplay;fullscreen;picture-in-picture';frame.allowFullscreen=true;frame.title=item.name;
 frame.style.cssText='width:100%;min-height:270px;aspect-ratio:16/9;display:block;border:0;border-radius:9px';
 const note=document.createElement('p');note.className='playnote';note.textContent='Original film trailer on Vimeo. Playback remains inside Williams TV Guide when the publisher permits embedding.';
 const fallback=document.createElement('a');fallback.className='mini media-link';fallback.href=item.source;fallback.textContent='Open the original Vimeo trailer if embedding is blocked';fallback.target='_blank';fallback.rel='noopener noreferrer';
 box.append(frame,note,fallback);modal.classList.add('open');document.body.classList.add('noscroll');return true;
};
})();