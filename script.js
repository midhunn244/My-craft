var WA_NUMBER=''; // e.g. '919XXXXXXXXX' (country code + number, no +)
var IMG={lamp1:'images/electric-lamp.jpg',dream:'images/dreamcatcher.jpg',lamp3:'images/iron-frame-lamp.jpg',keys:'images/valentine-keychains.jpg',wall:'images/wall-hanging.jpg',frame:'images/customised-wall-hanging.jpg'};
// [category,name,description,price(0=on request),image,tile1,tile2,focus]
var P=[
["lamp","Simple Tealight JarLuminaire","Portrait jar lamp lit by a tealight.",870,null,"#ffcf7a","#5a2a0e"],
["lamp","Table-top iron frame lamp","Electric JarLuminaire on an iron frame with crochet lid.",2000,IMG.lamp3,0,0,"50% 50%"],
["lamp","Electric lamp","Iron frame, crochet lid, flowers, clay and resin art. Portrait painted on glass.",3000,IMG.lamp1,0,0,"60% 50%"],
["lamp","Wall-hanging electric lamp","Ceiling or wall lamp for home décor.",3250,null,"#ffb85c","#2e1609"],
["wall","Wall hangings","Name and macrame hangings in your colours.",1100,IMG.wall,0,0,"50% 40%"],
["wall","Customised wall hanging","Textured, layered wall art around your photo.",1500,IMG.frame,0,0,"50% 50%"],
["wall","Photo imprinted clay frame","Clay frame with your photo and hanging.",860,null,"#9fc08a","#2c3d22"],
["wall","Crochet photo frame","Single crochet frame with hanging.",570,null,"#8fc7c0","#1f3d3a"],
["wall","Feather dreamcatcher","Handmade dreamcatcher with beads and feathers.",0,IMG.dream,0,0,"50% 45%"],
["key","Valentine's Day keychains","Crochet heart keychains.",150,IMG.keys,0,0,"45% 50%"],
["key","Customised keychains","Beaded macrame keychains.",350,null,"#e9d8b4","#3b3022"],
["gift","Clay art on coffee mug","A cute gift for your dear ones.",660,null,"#e07a6a","#3f1a15"],
["gift","Crochet headband","For baby girls, courier included.",250,null,"#8cb8e6","#1d2f45"],
["gift","Plant pot decorations","Pottery pot with handcrafted decoration.",375,null,"#d98a5a","#3d2012"]];
var ic='<svg viewBox="0 0 60 60" fill="none" stroke="#14100d" stroke-width="2.4" stroke-linecap="round"><path d="M30 8v8M18 22c0-5 24-5 24 0v26c0 6-24 6-24 0z"/><path d="M22 34h16"/></svg>';
var cart={},filter='all',q='',NEW=['Feather dreamcatcher',"Valentine's Day keychains"];
try{cart=JSON.parse(localStorage.getItem('mc_cart')||'{}')}catch(e){}
function save(){try{localStorage.setItem('mc_cart',JSON.stringify(cart))}catch(e){}}
function rs(n){return n?'₹'+n.toLocaleString('en-IN'):'On request'}
function draw(){document.getElementById('grid').innerHTML=P.map(function(p,i){return [p,i]}).filter(function(x){return (filter=='all'||x[0][0]==filter)&&(!q||(x[0][1]+' '+x[0][2]).toLowerCase().indexOf(q)>-1)}).map(function(x){var p=x[0],i=x[1];
var ph=p[4]?'<img src="'+p[4]+'" alt="'+p[1]+'" loading="lazy" style="object-position:'+p[7]+'">':ic;
return '<article class="card"><div class="ph" style="--c1:'+p[5]+';--c2:'+p[6]+'">'+ph+(NEW.indexOf(p[1])>-1?'<span class="nw">New</span>':'')+'</div><h3>'+p[1]+'</h3><p>'+p[2]+'</p><div class="row"><span class="price">'+(p[3]?rs(p[3]):'Ask price')+'</span><button class="btn add" data-i="'+i+'">Add to cart</button></div></article>'}).join('')||'<p class="nores">No pieces match your search. <button class="lnk" id="clr">Clear search</button></p>';after()}
function render(){var ids=Object.keys(cart),n=0,t=0,od=false,h='';
ids.forEach(function(i){var p=P[i],q=cart[i];n+=q;if(p[3])t+=p[3]*q;else od=true;
var th=p[4]?'<img class="th" src="'+p[4]+'" alt="" style="object-position:'+p[7]+'">':'<div class="th" style="background:radial-gradient(circle at 50% 60%,'+p[5]+','+p[6]+')"></div>';h+='<div class="it">'+th+'<div style="flex:1"><b>'+p[1]+'</b><small>'+rs(p[3])+'</small><div class="q"><button data-d="-1" data-i="'+i+'" aria-label="Fewer">−</button><span>'+q+'</span><button data-d="1" data-i="'+i+'" aria-label="More">+</button></div></div><span class="price" style="font-size:20px">'+(p[3]?rs(p[3]*q):'')+'</span></div>'});
document.getElementById('items').innerHTML=h||'<p class="empty">Your cart is empty. Add a piece you love.</p>';
document.getElementById('cnt').textContent=n;document.getElementById('tot').textContent=rs(t)==='On request'?'₹0':rs(t);
document.getElementById('note').textContent=od?'Items marked "On request" will be quoted on WhatsApp.':'';
document.getElementById('foot').style.display=n?'block':'none';
var m='Hello MYCraft! I would like to order:\n';ids.forEach(function(i){var p=P[i];m+='• '+p[1]+' × '+cart[i]+(p[3]?' — '+rs(p[3]*cart[i]):' — price on request')+'\n'});
m+='Total: '+rs(t)+(od?' + items on request':'')+'\n';var nm=document.getElementById('cn').value,nt=document.getElementById('cm').value;
if(nm)m+='Name: '+nm+'\n';if(nt)m+='Notes: '+nt+'\n';m+='I will share my photo here.';
document.getElementById('wa').href='https://wa.me/'+WA_NUMBER+'?text='+encodeURIComponent(m);save()}
function open_(o){document.getElementById('drawer').classList.toggle('open',o);document.getElementById('ov').classList.toggle('open',o)}
document.getElementById('cartOpen').onclick=function(){open_(true)};
document.getElementById('cartClose').onclick=document.getElementById('ov').onclick=function(){open_(false)};
document.getElementById('grid').onclick=function(e){var b=e.target.closest('.add');if(!b)return;var i=b.dataset.i;cart[i]=(cart[i]||0)+1;render();b.textContent='Added';setTimeout(function(){b.textContent='Add to cart'},1200)};
document.getElementById('items').onclick=function(e){var b=e.target.closest('button');if(!b)return;var i=b.dataset.i;cart[i]+=+b.dataset.d;if(cart[i]<1)delete cart[i];render()};
document.getElementById('cn').oninput=document.getElementById('cm').oninput=render;
document.querySelectorAll('.tab').forEach(function(b){b.onclick=function(){document.querySelectorAll('.tab').forEach(function(x){x.setAttribute('aria-pressed','false')});b.setAttribute('aria-pressed','true');filter=b.dataset.f;draw()}});
document.getElementById('waGen').href='https://wa.me/'+WA_NUMBER;

var rm=matchMedia('(prefers-reduced-motion:reduce)').matches;
var io=(window.IntersectionObserver&&!rm)?new IntersectionObserver(function(es){es.forEach(function(e){if(e.isIntersecting){e.target.classList.add('in');io.unobserve(e.target)}})},{threshold:.1}):{observe:function(e){e.classList.add('in')}};
function rv(e,i){e.classList.add('rv');e.style.setProperty('--d',((i||0)%4*80)+'ms');io.observe(e)}
function after(){var c=document.querySelectorAll('#grid .card');document.getElementById('rc').textContent=c.length+(c.length==1?' piece':' pieces');c.forEach(rv)}
document.querySelectorAll('.sec-h,.steps>div,.story>*,.contact h2,.contact p,.contact .btn').forEach(rv);
var qi=document.getElementById('q');
qi.oninput=function(){q=qi.value.trim().toLowerCase();filter='all';document.querySelectorAll('.tab').forEach(function(x){x.setAttribute('aria-pressed',x.dataset.f=='all'?'true':'false')});draw()};
document.addEventListener('click',function(e){if(e.target.id=='clr'){qi.value='';q='';draw()}if(e.target.closest('.add')){var c=document.getElementById('cnt');c.classList.remove('bump');void c.offsetWidth;c.classList.add('bump')}});
var em=document.getElementById('emb');
for(var k=0;k<18;k++){var s=document.createElement('span'),z=2+Math.random()*3;s.style.cssText='left:'+Math.random()*100+'%;width:'+z+'px;height:'+z+'px;animation-duration:'+(7+Math.random()*7)+'s;animation-delay:'+(-Math.random()*10)+'s;--x:'+(Math.random()*80-40)+'px';em.appendChild(s)}
window.addEventListener('scroll',function(){document.querySelector('nav').classList.toggle('sc',window.scrollY>20)},{passive:true});
draw();render();