/* Gallery: 3D coverflow (drag/swipe, arrow keys, filters, lightbox). Without JS the figures stay a swipeable strip. */
(()=>{const cf=document.getElementById('cf');if(!cf)return;const all=[...cf.children];let list=all,i=0,sx=null;cf.classList.remove('strip');
const cap=document.getElementById('cap'),lb=document.getElementById('lb');
function draw(){all.forEach(f=>f.style.display='none');list.forEach((f,k)=>{const o=k-i,a=Math.abs(o);f.style.display=a>3?'none':'';f.style.transform=`translateX(calc(-50% + ${o*46}%)) rotateY(${-Math.sign(o)*Math.min(a,2)*38}deg) scale(${1-a*.12})`;f.style.zIndex=10-a;f.style.opacity=a>2?.4:1});
 if(list[i])cap.textContent=`${list[i].querySelector('figcaption').textContent}  ·  ${i+1} / ${list.length}`}
const go=n=>{i=Math.max(0,Math.min(list.length-1,n));draw()};
all.forEach(f=>f.onclick=()=>{const k=list.indexOf(f);if(k===i){lb.querySelector('img').src=f.querySelector('img').src;lb.classList.add('on')}else go(k)});
lb.onclick=()=>lb.classList.remove('on');addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(i+1);if(e.key==='ArrowLeft')go(i-1);if(e.key==='Escape')lb.classList.remove('on')});
cf.onpointerdown=e=>sx=e.clientX;cf.onpointerup=e=>{if(sx!==null&&Math.abs(e.clientX-sx)>40)go(i+(e.clientX<sx?1:-1));sx=null};
document.querySelectorAll('[data-f]').forEach(b=>b.onclick=()=>{document.querySelectorAll('[data-f]').forEach(x=>x.classList.remove('on'));b.classList.add('on');list=b.dataset.f==='all'?all:all.filter(f=>f.dataset.c===b.dataset.f);i=0;draw()});
const v=document.getElementById('tour');if(v)v.onloadeddata=()=>v.parentElement.hidden=false;draw()})();
