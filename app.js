/* Station India – shared script: menu data, header/footer, cart, open pill, "The Day", transitions */
const WA='97126329526';            // TODO: replace with the restaurant's WhatsApp number (international format, no +)
const ORDER_ENDPOINT='';           // optional backend URL; WhatsApp is used if empty or it fails
const REVIEW_URL='https://www.google.com/search?q=Station+india+Restaurant#lrd=0x3e5e671c5cef261f:0x58cc86a53b05bf9f,3,,,,';
const MAPS='https://www.google.com/maps/search/?api=1&query=Station+India+Restaurant+Electra+St+Al+Danah+Abu+Dhabi';
const $=(s,r=document)=>r.querySelector(s),$$=(s,r=document)=>[...r.querySelectorAll(s)];
/* ---------- MENU DATA (edit here): "Name=price" ; "?"= contact for price. Prices in AED ---------- */
const RAW={
'Breakfast':'Puri Bhaji=8|Aloo / Methi / Gobi Paratha=7|Paratha with Bhaji=9|Sada Paratha=5|Paneer / Cheese Paratha=9|Mix Paratha=8|Pongal=8|Upma=8|Pawa Bateta=8',
'Southern Delight':'Idli Sambar=6|Vada Sambar=6|Sada Dosa=6|Masala Dosa=7|Butter Masala Dosa=8|Mysore Masala Dosa=10|Paneer Masala Dosa=9|Rava Masala Dosa=10|Cheese Masala Dosa=9|Paper Masala Dosa=10|Ghee Paper Masala Dosa=10|Onion Uttapam=8',
'Chaat Corner':'Bhel Puri=8|Station India Special Bhel=10|Pani Puri=8|Sev Puri=8|Dahi Puri=8|Ragda Pattice=9|Dabeli=7|Vada Pav=7|Pav Bhaji=15|Cheese Pav Bhaji=15|Station India Special Pav Bhaji=17|Papdi Chaat=9|Dahi Vada=8|Mix Chaat=10|French Fries=6|Punjabi Samosa (2 pcs)=6',
'Thali & Combos':'Gujarati Thali (Full)=?|Special Thali (Weekend & Holiday)=?|Gujarati Thali (Mini)=12|Punjabi Combo=24|Chinese Combo=24',
"Chef's Special":'Navaratan Korma=20|Kaju Masala=22|Kaju Kari=22|Khoya Kaju=22|Cheese Angoori=21|Station India Special Paneer=21|Station India Special Veg=21|Cheese Butter Masala=21',
'Rice & Biryani':'Veg. Biryani=15|Veg. Hyderabadi Biryani=17|Palak Biryani=16|Handi Biryani=16|Veg. Pulao=15|Kashmiri Pulao=17|Jeera Rice=11|Curd Rice=14|Steamed Rice=8|Masala Rice=16|Lemon Rice=15|Veg. Fried Rice=16|Paneer Fried Rice=18|Dal Khichdi=16|Dal Chawal / Kadhi Khichdi=11',
'Tawa & Tandoor':'Plain Tawa Roti=2|Butter Tawa Roti=3|Plain Tandoori Roti=2|Butter Tandoori Roti=4|Missi Roti=5|Palak Naan=8|Plain Naan=4|Butter Naan=6|Garlic Naan=8|Stuffed Naan=8|Cheese / Paneer Naan=9|Chilli Garlic Naan=8|Lachha Tandoori Paratha=4|Plain Kulcha=6|Stuffed Kulcha=8',
'Tandoori Sabji':'Paneer Tikka (6 pcs)=20|Paneer Amritsari=20|Hara Bhara Kabab=22|Mushroom Tandoori=20|Tandoori Aloo=18',
'Chinese Cuisine':'Veg. Manchurian (Dry / Gravy)=19|Gobi Manchurian (Dry / Gravy)=19|Paneer Chili (Dry / Gravy)=19|Paneer Manchurian=20|Chatpata Paneer=20|Veg. Spring Roll=15|Gobi 65=18|Paneer 65=20|Idli Chili Dry=16|Baby Corn Chili Fry=18',
'Soups':'Veg. Sweet Corn Soup=10|Veg. Manchow Soup=10|Veg. Hot & Sour Soup=10|Tomato Soup=10',
'Noodles':'Veg. Hakka Noodles=17|Veg. Schezwan Noodles=18|Singapore Noodles=18|Paneer Chili Noodles=19|Veg. Chowmein=17|Chinese Bhel=15',
'Salad & Raita':'Green Salad=6|Boondi Raita=7|Mix Raita=8|Papad (Fried / Roasted)=2',
'Beverages':'Watermelon Juice=10|Orange Juice=10|Carrot Juice=10|Pineapple Juice=12|Mango Juice=10|Avocado Juice=12'};
const IMG={'Gujarati Thali (Full)':'gujarati-thali-platter','Special Thali (Weekend & Holiday)':'thali-platter-station-india','Gujarati Thali (Mini)':'gujarati-thali-bowls','Punjabi Combo':'thali-curries','Bhel Puri':'bhel-closeup','Station India Special Bhel':'bhel-and-shake','Mix Chaat':'sev-puri-chaat','Papdi Chaat':'green-chutney-chaat','Veg. Manchurian (Dry / Gravy)':'veg-manchurian','Paneer Chili (Dry / Gravy)':'chilli-vegetable','Station India Special Paneer':'paneer-kadai','Kaju Masala':'red-curry-bowl','Navaratan Korma':'mixed-veg-curry','Chinese Combo':'chilli-vegetable'};
const SIG=['Gujarati Thali (Full)','Punjabi Combo','Mix Chaat','Station India Special Paneer','Kaju Masala','Navaratan Korma'];
const MENU=[];let _i=0;for(const c in RAW)RAW[c].split('|').forEach(s=>{const[n,p]=s.split('=');MENU.push({id:++_i,cat:c,name:n,price:p==='?'?null:+p,img:IMG[n]?`images/${IMG[n]}.webp`:'',sig:SIG.includes(n)})});
const byId=i=>MENU.find(m=>m.id==i),money=v=>'AED '+v;
/* ---------- cart (localStorage guarded) ---------- */
let cart={};try{cart=JSON.parse(localStorage.getItem('si_cart')||'{}')||{}}catch(e){cart={}}
const save=()=>{try{localStorage.setItem('si_cart',JSON.stringify(cart))}catch(e){}};
const count=()=>Object.values(cart).reduce((a,b)=>a+b,0);
function add(id,n=1){cart[id]=(cart[id]||0)+n;if(cart[id]<=0)delete cart[id];save();paint()}
function paint(){const b=$('#cb');if(!b)return;b.textContent=`Your Order (${count()})`;const L=$('#cl');let t=0,ask=0;
 L.innerHTML=Object.keys(cart).map(id=>{const m=byId(id);if(!m)return'';m.price===null?ask++:t+=m.price*cart[id];return`<div class="ci"><span>${m.name}<br><small>${m.price===null?'Price on request':money(m.price)}</small></span><button data-d="${id}" aria-label="Less">−</button><b>${cart[id]}</b><button data-u="${id}" aria-label="More">+</button><button data-x="${id}" aria-label="Remove">✕</button></div>`}).join('')||'<p>Your order is empty. Add dishes from the menu.</p>';
 $('#ct').textContent='Total: '+money(t)+(ask?' + items priced on request':'')}
/* ---------- chrome injected on every page ---------- */
const P=document.body.dataset.p,LINKS=[['index.html','Home','home'],['menu.html','Menu','menu'],['about-us.html','About','about'],['catering.html','Catering','cat'],['reserve.html','Reserve','res'],['gallery.html','Gallery','gal'],['locations.html','Locations','loc'],['contact-us.html','Contact','con']];
document.body.insertAdjacentHTML('afterbegin',`<div id="pre"><img src="images/logo-station-india.webp" alt=""></div>
<header><div class="wrap hb"><a class="brand" href="index.html"><img src="images/logo-station-india.webp" alt="Station India Restaurant logo"><span><b>Station India</b><small><i class="vm"></i>PURE VEGETARIAN</small></span></a>
<nav id="nv" aria-label="Main">${LINKS.map(l=>`<a href="${l[0]}"${l[2]===P?' class="on"':''}>${l[1]}</a>`).join('')}</nav><span class="pill" id="op"></span><button id="bg" aria-label="Menu">☰</button></div></header>`);
document.body.insertAdjacentHTML('beforeend',`<footer><div class="wrap"><div><h3>Station India Restaurant</h3><p>100% pure vegetarian Indian cuisine.<br>Electra St, Al Danah – Zone 1, Abu Dhabi<br>Open daily 7 AM – 11 PM<br>Tel <a href="tel:+97126329526">02 632 9526</a></p></div><div><h3>Explore</h3>${LINKS.map(l=>`<a href="${l[0]}">${l[1]}</a>`).join('')}</div><div><h3>Order</h3><a href="https://wa.me/${WA}">WhatsApp</a><a href="${MAPS}">Get directions</a><a href="${REVIEW_URL}">Review us on Google</a></div></div></footer>
<button class="btn" id="cb"></button>
<aside id="dr" aria-label="Your order"><button class="btn o" id="cx">Close</button><h2>Your Order</h2><div id="cl"></div><div class="tot" id="ct"></div>
<form id="of" novalidate><label>Name<input name="n" required autocomplete="name"></label><label>Phone<input name="p" type="tel" required autocomplete="tel" placeholder="05X XXX XXXX"></label>
<label>Order type<select name="t" id="ot"><option>Delivery</option><option>Collection</option></select></label>
<div id="da" style="display:grid;gap:14px"><label>Building<input name="b"></label><label>Floor<input name="f"></label><label>Flat<input name="fl"></label><label>How to reach<textarea name="h" rows="2"></textarea></label></div>
<div class="err" id="er" role="alert"></div><button class="btn" type="submit">Send order on WhatsApp</button></form></aside>
<aside id="day" class="min" aria-label="The Day: dishes for every hour"><div class="bd"><div class="sky" id="sk"><div id="orb"></div><div id="clk"></div></div><div style="padding:10px 12px 14px"><input type="range" id="hr" min="7" max="23" step="1" value="12" aria-label="Hour of the day"><div id="sg"></div><button class="sm" id="sp">Surprise me</button><div id="su"></div></div></div><button id="pk" aria-expanded="false"><span id="mo"></span><span id="pc"></span><span>The Day</span></button></aside>`);
/* open / closed pill – Abu Dhabi time, daily 7:00-23:00 */
function pill(){const d=new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Dubai'})),h=d.getHours()+d.getMinutes()/60,o=h>=7&&h<23,p=$('#op');p.className='pill '+(o?'open':'closed');p.innerHTML='<i></i>'+(o?'Open now · until 11 PM':'Closed · opens 7 AM')}pill();setInterval(pill,6e4);
$('#bg').onclick=()=>$('#nv').classList.toggle('show');
addEventListener('scroll',()=>$('header').classList.toggle('sc',scrollY>20),{passive:true});
/* page transition: logo appears centre, rolls anticlockwise off to the left, then page changes */
const pre=$('#pre'),still=matchMedia('(prefers-reduced-motion:reduce)').matches;
document.addEventListener('click',e=>{const a=e.target.closest('a[href]');if(!a||still||a.target||e.ctrlKey||e.metaKey)return;const u=a.getAttribute('href');if(!/^[\w-]+\.html(#.*)?$/.test(u)||u.split('#')[0]===location.pathname.split('/').pop())return;e.preventDefault();pre.classList.add('on');setTimeout(()=>location.href=u,1150)});
addEventListener('pageshow',()=>pre.classList.remove('on'));
/* cart events */
const dr=$('#dr');$('#cb').onclick=()=>dr.classList.add('show');$('#cx').onclick=()=>dr.classList.remove('show');
dr.addEventListener('click',e=>{const t=e.target,g=k=>t.dataset[k];if(g('u'))add(g('u'));if(g('d'))add(g('d'),-1);if(g('x')){delete cart[g('x')];save();paint()}});
$('#ot').onchange=e=>$('#da').style.display=e.target.value==='Delivery'?'grid':'none';
$('#of').onsubmit=async e=>{e.preventDefault();const f=e.target,v=n=>f.elements[n].value.trim(),er=$('#er'),del=v('t')==='Delivery';
 if(!count())return er.textContent='Add at least one item.';if(!v('n'))return er.textContent='Enter your name.';if(!/^\+?[\d\s-]{8,16}$/.test(v('p')))return er.textContent='Enter a valid phone number.';
 if(del&&!(v('b')&&v('f')&&v('fl')&&v('h')))return er.textContent='For delivery, fill building, floor, flat and how to reach.';er.textContent='';
 let t=0;const L=Object.keys(cart).map(i=>{const m=byId(i);if(m.price!==null)t+=m.price*cart[i];return`• ${cart[i]} x ${m.name} – ${m.price===null?'price on request':money(m.price*cart[i])}`});
 const msg=`*New order – Station India*\n\nName: ${v('n')}\nPhone: ${v('p')}\nType: ${v('t')}\n`+(del?`Address: Bldg ${v('b')}, Floor ${v('f')}, Flat ${v('fl')}\nHow to reach: ${v('h')}\n`:'')+`\n*Items*\n${L.join('\n')}\n\n*Total: ${money(t)}*`;
 if(ORDER_ENDPOINT){try{await fetch(ORDER_ENDPOINT,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({msg})})}catch(x){}}
 open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`,'_blank');cart={};save();paint();dr.classList.remove('show')};
document.addEventListener('click',e=>{const b=e.target.closest('[data-add]');if(b){add(b.dataset.add);dr.classList.add('show')}});
/* forms that open WhatsApp (reserve / catering / contact) */
$$('form[data-wa]').forEach(f=>f.onsubmit=e=>{e.preventDefault();const L=[...f.elements].filter(x=>x.name&&x.value.trim()).map(x=>`${x.dataset.l||x.name}: ${x.value.trim()}`);open(`https://wa.me/${WA}?text=${encodeURIComponent('*'+f.dataset.wa+' – Station India*\n'+L.join('\n'))}`,'_blank')});
/* ---------- The Day: always-visible side widget ---------- */
const day=$('#day'),hr=$('#hr'),fmt=h=>{const x=h%24;return(x%12||12)+':00 '+(x<12?'AM':'PM')};
const SETS=[[11,['Breakfast','Southern Delight']],[16,['Thali & Combos','Rice & Biryani',"Chef's Special"]],[20,['Chaat Corner','Chinese Cuisine']],[25,["Chef's Special",'Tandoori Sabji','Tawa & Tandoor']]];
const row=m=>`<div class="r"><span>${m.name}<br><small>${m.price===null?'ask price':money(m.price)}</small></span><button data-add="${m.id}" aria-label="Add ${m.name}">+</button></div>`;
function paintDay(){const h=+hr.value,p=(h-7)/16,a=Math.PI*p,sk=$('#sk'),o=$('#orb');$('#clk').textContent=$('#pc').textContent=fmt(h);$('#mo').className=h>=19||h<6?'m':'';o.style.left=`calc(${50-Math.cos(a)*42}% - 15px)`;o.style.top=`${58-Math.sin(a)*46}px`;o.className=h>=19||h<6?'m':'';
 sk.style.background=h<9?'linear-gradient(#FFD9A0,#FFF3D6)':h<17?'linear-gradient(#8FD0FF,#E8F6FF)':h<20?'linear-gradient(#FF9A5A,#FFD2A0)':'linear-gradient(#0B1F5C,#2B3E8C)';
 const cats=SETS.find(s=>h<s[0])[1];const pool=MENU.filter(m=>cats.includes(m.cat)&&m.price!==null).sort((x,y)=>y.sig-x.sig);const pick=[];cats.forEach((c,i)=>{const l=pool.filter(m=>m.cat===c);pick.push(l[(h+i)%l.length])});$('#sg').innerHTML=pick.filter(Boolean).slice(0,3).map(row).join('')}
hr.oninput=paintDay;hr.value=Math.min(23,Math.max(7,new Date(new Date().toLocaleString('en-US',{timeZone:'Asia/Dubai'})).getHours()));paintDay();
$('#pk').onclick=()=>{const m=day.classList.toggle('min');$('#pk').setAttribute('aria-expanded',String(!m))};
$('#sp').onclick=()=>{const r=c=>{const l=MENU.filter(m=>(Array.isArray(c)?c:[c]).includes(m.cat)&&m.price!==null);return l[Math.random()*l.length|0]},meal=[r(["Chef's Special",'Tandoori Sabji','Chinese Cuisine']),r(['Tawa & Tandoor','Rice & Biryani']),r('Beverages')];window._m=meal;$('#su').innerHTML=meal.map(row).join('')+`<button class="sm" id="aa">Add all · ${money(meal.reduce((a,m)=>a+m.price,0))}</button>`;$('#aa').onclick=()=>{window._m.forEach(m=>add(m.id));dr.classList.add('show')}};
/* ---------- scroll reveal + counters ---------- */
const io=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('v');io.unobserve(e.target)}}),{threshold:.1});$$('.rev').forEach(x=>still?x.classList.add('v'):io.observe(x));
$$('[data-n]').forEach(el=>{const n=+el.dataset.n;let t=0;const k=setInterval(()=>{t+=n/30;el.textContent=Math.min(n,Math.round(t))+(el.dataset.s||'');if(t>=n)clearInterval(k)},40)});
/* ---------- page renderers ---------- */
const sigBox=$('#sig');if(sigBox)sigBox.innerHTML=MENU.filter(m=>m.sig).map(m=>`<article class="card"><img src="${m.img}" alt="${m.name} at Station India Abu Dhabi" loading="lazy"><div><small>${m.cat}</small><h3>${m.name}</h3><span class="pr">${m.price===null?'Contact for price':money(m.price)}</span><button class="btn" data-add="${m.id}">Add to Cart</button></div></article>`).join('');
const mb=$('#menu');if(mb){const cats=Object.keys(RAW);$('#chips').innerHTML=cats.map(c=>`<a class="chip" href="#c${cats.indexOf(c)}">${c}</a>`).join('');
 mb.innerHTML=cats.map((c,i)=>`<section class="mc" id="c${i}"><h2>${c}</h2>${MENU.filter(m=>m.cat===c).map((m,j)=>`<div class="it" data-s="${m.name.toLowerCase()}"${j>7?' hidden data-x':''}>${m.img?`<img src="${m.img}" alt="${m.name}" loading="lazy">`:''}<span>${m.name}</span><b>${m.price===null?'Contact for price':money(m.price)}</b><button data-add="${m.id}" aria-label="Add ${m.name} to cart">+</button></div>`).join('')}${RAW[c].split('|').length>8?`<button class="btn o more" data-c="c${i}">Show all</button>`:''}</section>`).join('');
 mb.onclick=e=>{const b=e.target.closest('.more');if(!b)return;const s=$('#'+b.dataset.c),sh=b.textContent==='Show all';$$('[data-x]',s).forEach(x=>x.hidden=!sh);b.textContent=sh?'Show fewer':'Show all'};
 $('#q').oninput=e=>{const q=e.target.value.toLowerCase().trim();$$('.it').forEach(x=>x.hidden=q?!x.dataset.s.includes(q):x.hasAttribute('data-x'));$$('.mc').forEach(s=>s.hidden=!!q&&!$$('.it:not([hidden])',s).length);$$('.more').forEach(b=>b.hidden=!!q)}}
paint();
