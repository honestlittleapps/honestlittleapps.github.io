(()=>{
const B=document.body,K=B.dataset.kind,A=B.dataset.arg,S=document.getElementById('sheet'),AC=getComputedStyle(B).getPropertyValue('--a').trim()||'#333';
const esc=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
function rng(seed){let s=2166136261;for(const c of seed){s^=c.charCodeAt(0);s=Math.imul(s,16777619)>>>0}return()=>{s^=s<<13;s>>>=0;s^=s>>>17;s^=s<<5;s>>>=0;return s/4294967296}}
function dl(name,blob){const a=document.createElement('a');a.href=URL.createObjectURL(blob);a.download=name;document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(a.href),5000)}
function png(svg,w,h,name,bg){const i=new Image();i.onload=()=>{const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');if(bg){x.fillStyle=bg;x.fillRect(0,0,w,h)}x.drawImage(i,0,0,w,h);c.toBlob(b=>dl(name,b),'image/png')};i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg)}
const btn=(t,f)=>{const b=document.createElement('button');b.textContent=t;b.onclick=f;return b};
const bar=document.querySelector('.actions');

/* ---------- COLORING: Fruit of the Spirit ---------- */
const FRUITS={love:'apple',joy:'grapes',peace:'pear',patience:'pomegranate',kindness:'strawberry',goodness:'orange',faithfulness:'cherries',gentleness:'peach','self-control':'pineapple'};
function leaf(x,y,r){return `<g transform="translate(${x} ${y}) rotate(${r})"><path d="M0,0 C20,-30 70,-30 90,0 C70,25 20,25 0,0Z"/><path d="M5,0 L80,0" fill="none"/></g>`}
function fruit(n){
 const R=rng(n);let s='';
 switch(n){
 case 'apple':s=`<path d="M0,-70 C-40,-112 -152,-95 -152,12 C-152,112 -62,162 0,132 C62,162 152,112 152,12 C152,-95 40,-112 0,-70Z"/><path d="M0,-72 C-4,-100 6,-125 18,-142" fill="none" stroke-width="7"/>${leaf(12,-112,-30)}<path d="M-100,-10 C-104,30 -90,62 -66,84" fill="none"/>`;break;
 case 'grapes':{const rows=[4,3,3,2,1];let y=-60;rows.forEach(k=>{for(let i=0;i<k;i++){s+=`<circle cx="${(i-(k-1)/2)*58}" cy="${y}" r="31"/><path d="M${(i-(k-1)/2)*58-14},${y-10} q6,-8 16,-8" fill="none"/>`}y+=50});s=`<path d="M0,-92 C4,-120 14,-140 30,-150" fill="none" stroke-width="7"/>${leaf(18,-128,-20)}`+s;break}
 case 'pear':s=`<path d="M0,-118 C-34,-118 -44,-78 -48,-44 C-54,-6 -122,22 -122,86 C-122,152 -62,172 0,172 C62,172 122,152 122,86 C122,22 54,-6 48,-44 C44,-78 34,-118 0,-118Z"/><path d="M0,-118 C-2,-138 4,-152 14,-162" fill="none" stroke-width="7"/>${leaf(10,-140,-40)}<path d="M-80,70 C-84,100 -70,128 -48,140" fill="none"/>`;break;
 case 'pomegranate':s=`<path d="M-38,-104 L-50,-150 L-22,-128 L0,-162 L22,-128 L50,-150 L38,-104Z"/><circle cy="20" r="128"/>`;s+=`<path d="M-88,10 C-60,-40 60,-40 88,10 C60,70 -60,70 -88,10Z"/>`;for(let i=0;i<14;i++){const x=-62+(i%7)*21,y=i<7?0:24;s+=`<ellipse cx="${x}" cy="${y}" rx="8" ry="10"/>`}break;
 case 'strawberry':s=`<path d="M0,166 C-92,126 -142,22 -132,-38 C-122,-98 -52,-106 0,-92 C52,-106 122,-98 132,-38 C142,22 92,126 0,166Z"/>`;for(let r=-60;r<140;r+=34)for(let c=-110;c<=110;c+=40){const w=110-Math.abs(r-20)*0.55;if(Math.abs(c+(r/34%2?20:0))<w)s+=`<ellipse cx="${c+(Math.round(r/34)%2?20:0)}" cy="${r}" rx="4" ry="8"/>`}s+=`<path d="M0,-96 L-60,-128 L-28,-104 L-46,-148 L-8,-110 L0,-156 L8,-110 L46,-148 L28,-104 L60,-128Z"/>`;break;
 case 'orange':s=`<circle r="150"/><circle r="128"/><circle r="16"/>`;for(let i=0;i<10;i++){const a=i*Math.PI/5,b=a+Math.PI/5,m=(a+b)/2,p=(t,r)=>`${(Math.cos(t)*r).toFixed(1)},${(Math.sin(t)*r).toFixed(1)}`;s+=`<path d="M${p(a+.05,26)} L${p(a+.04,116)} Q${p(m,128)} ${p(b-.04,116)} L${p(b-.05,26)} Q${p(m,20)} ${p(a+.05,26)}Z"/>`}break;
 case 'cherries':s=`<path d="M-62,64 C-50,-20 -10,-90 22,-132 M66,82 C60,0 40,-80 22,-132" fill="none" stroke-width="7"/>${leaf(22,-130,-15)}<circle cx="-64" cy="104" r="62"/><circle cx="70" cy="122" r="62"/><path d="M-96,84 q12,-18 30,-20 M38,102 q12,-18 30,-20" fill="none"/>`;break;
 case 'peach':s=`<path d="M0,-112 C-112,-124 -154,0 -132,72 C-112,152 -40,172 0,162 C40,172 112,152 132,72 C154,0 112,-124 0,-112Z"/><path d="M0,-112 C-34,-40 -28,64 0,162" fill="none"/>${leaf(-4,-114,-150)}${leaf(4,-114,-30)}`;break;
 case 'pineapple':s=`<defs><clipPath id="pc"><ellipse cy="50" rx="102" ry="132"/></clipPath></defs><path d="M0,-80 L-30,-170 L-8,-110 L0,-190 L8,-110 L30,-170Z M-10,-84 L-70,-150 L-26,-96 M10,-84 L70,-150 L26,-96"/><ellipse cy="50" rx="102" ry="132"/><g clip-path="url(#pc)" fill="none">`;for(let k=-300;k<=300;k+=42){s+=`<path d="M${k-150},-120 L${k+150},220 M${k+150},-120 L${k-150},220"/>`}s+='</g>';break;
 }
 return s;
}
function petals(cx,cy,r,n,rx,ry,off){let s='';for(let i=0;i<n;i++){const a=360/n*i+(off||0);s+=`<ellipse cx="${cx}" cy="${cy-r}" rx="${rx}" ry="${ry}" transform="rotate(${a} ${cx} ${cy})"/>`}return s}
function heart(x,y,k){return `<path transform="translate(${x} ${y}) scale(${k})" d="M0,10 C-14,-6 -30,4 -20,20 L0,38 L20,20 C30,4 14,-6 0,10Z"/>`}
function colorSVG(word,small){
 const f=FRUITS[word],cx=408,cy=575,W=word.toUpperCase().replace('-','‑'),fs=Math.min(108,540/(W.length*0.74));
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 816 1056" width="816" height="1056"><rect width="816" height="1056" fill="#fff"/><g fill="#fff" stroke="#111" stroke-width="3" stroke-linejoin="round" stroke-linecap="round">
<rect x="24" y="24" width="768" height="1008" rx="28" fill="none"/><rect x="38" y="38" width="740" height="980" rx="20" fill="none" stroke-dasharray="2 12"/>
${petals(cx,cy,300,18,34,62)}${petals(cx,cy,300,18,18,34)}${petals(cx,cy,252,36,10,22,5)}<circle cx="${cx}" cy="${cy}" r="226"/><circle cx="${cx}" cy="${cy}" r="214" fill="none"/>
<g transform="translate(${cx} ${cy}) scale(1.05)">${fruit(f)}</g>
${heart(74,70,1.3)}${heart(742,70,1.3)}${heart(74,970,1.3)}${heart(742,970,1.3)}
<text x="408" y="${118+fs*0.3}" text-anchor="middle" font-family="Arial Black,Arial Rounded MT Bold,Helvetica,sans-serif" font-weight="900" font-size="${fs}" stroke-width="4" letter-spacing="3">${W}</text>
</g><text x="408" y="960" text-anchor="middle" font-family="Georgia,serif" font-size="28" fill="#111">The Fruit of the Spirit</text><text x="408" y="992" text-anchor="middle" font-family="Georgia,serif" font-size="19" fill="#444">Galatians 5:22–23</text>${small?'':'<text x="408" y="1046" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Free printable · honestlittleapps.github.io/printables</text>'}</svg>`;
}

/* ---------- WORD SEARCH ---------- */
const WS={
 nativity:['MARY','JOSEPH','JESUS','MANGER','BETHLEHEM','SHEPHERDS','ANGEL','STAR','WISE MEN','GOLD','FRANKINCENSE','MYRRH','INN','GABRIEL','NAZARETH','EMMANUEL'],
 creation:['LIGHT','DARKNESS','WATERS','SKY','LAND','SEAS','PLANTS','TREES','SUN','MOON','STARS','FISH','BIRDS','ANIMALS','GARDEN','EDEN','REST','MAN'],
 noah:['NOAH','ARK','RAIN','FLOOD','DOVE','RAVEN','RAINBOW','OLIVE LEAF','SHEM','HAM','JAPHETH','ANIMALS','GOPHER WOOD','COVENANT','ARARAT','FORTY DAYS'],
 moses:['MOSES','EGYPT','PHARAOH','BASKET','BURNING BUSH','PLAGUES','PASSOVER','RED SEA','MANNA','SINAI','TABLETS','AARON','MIRIAM','WILDERNESS','STAFF','JORDAN'],
 david:['DAVID','GOLIATH','SLING','STONES','SHEPHERD','SAUL','PHILISTINES','ISRAEL','ELAH','GIANT','ARMOR','JONATHAN','COURAGE','HARP','JESSE','BETHLEHEM'],
 miracles:['WEDDING','CANA','WINE','LOAVES','FISHES','LAZARUS','STORM','BLIND','LEPERS','HEALED','JAIRUS','NETS','BARTIMAEUS','FAITH','WALKED','MIRACLE'],
 disciples:['PETER','ANDREW','JAMES','JOHN','PHILIP','BARTHOLOMEW','THOMAS','MATTHEW','THADDAEUS','SIMON','JUDAS','ALPHAEUS','ZEBEDEE','FISHERMEN','FOLLOW ME'],
 armor:['BELT','TRUTH','BREASTPLATE','RIGHTEOUSNESS','FEET','GOSPEL','PEACE','SHIELD','FAITH','HELMET','SALVATION','SWORD','SPIRIT','WORD','PRAYER','STAND'],
 fruit:['LOVE','JOY','PEACE','PATIENCE','KINDNESS','GOODNESS','FAITHFULNESS','GENTLENESS','SELF CONTROL','SPIRIT','FRUIT','GALATIANS']
};
function makeWS(key,n){
 const R=rng('ws-'+key),G=Array.from({length:n},()=>Array(n).fill('')),D=[[0,1],[1,0],[1,1],[-1,1],[0,-1],[-1,0],[-1,-1],[1,-1]],P=[];
 const words=[...WS[key]].sort((a,b)=>b.replace(/ /g,'').length-a.replace(/ /g,'').length);
 for(const w0 of words){const w=w0.replace(/[^A-Z]/g,'');let ok=0;
  for(let t=0;t<3000&&!ok;t++){const d=D[Math.floor(R()*(t<1500?4:8))],r=Math.floor(R()*n),c=Math.floor(R()*n),er=r+d[0]*(w.length-1),ec=c+d[1]*(w.length-1);
   if(er<0||er>=n||ec<0||ec>=n)continue;let fit=1;for(let i=0;i<w.length;i++){const x=G[r+d[0]*i][c+d[1]*i];if(x&&x!==w[i]){fit=0;break}}
   if(!fit)continue;for(let i=0;i<w.length;i++)G[r+d[0]*i][c+d[1]*i]=w[i];P.push([r,c,er,ec]);ok=1}
  if(!ok)throw Error('place '+w0)}
 const L='AABCDEEEFGHIILMNNOOPRRSSTTUWY';for(const row of G)for(let c=0;c<n;c++)if(!row[c])row[c]=L[Math.floor(R()*L.length)];
 return{G,P,words:WS[key]};
}
function wsSVG(key,title,ans){
 const n=15,{G,P,words}=makeWS(key,n),cs=42,x0=(816-n*cs)/2,y0=150;let s='';
 if(ans)for(const[r,c,er,ec]of P)s+=`<line x1="${x0+c*cs+cs/2}" y1="${y0+r*cs+cs/2}" x2="${x0+ec*cs+cs/2}" y2="${y0+er*cs+cs/2}" stroke="${AC}" stroke-opacity=".3" stroke-width="30" stroke-linecap="round"/>`;
 G.forEach((row,r)=>row.forEach((ch,c)=>{s+=`<text x="${x0+c*cs+cs/2}" y="${y0+r*cs+cs/2+9}">${ch}</text>`}));
 const sorted=[...words].sort(),cols=3,per=Math.ceil(sorted.length/cols);let b='';
 sorted.forEach((w,i)=>{b+=`<text x="${130+Math.floor(i/per)*220}" y="${y0+n*cs+62+(i%per)*30}" font-size="20">☐ ${esc(w)}</text>`});
 return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 816 1056" width="816" height="1056"><rect width="816" height="1056" fill="#fff"/><rect x="24" y="24" width="768" height="1008" rx="24" fill="none" stroke="${AC}" stroke-width="3"/><text x="408" y="96" text-anchor="middle" font-family="Georgia,serif" font-size="38" font-weight="700" fill="#111">${esc(title)}${ans?' — Answer Key':''}</text><text x="408" y="128" text-anchor="middle" font-family="Arial,sans-serif" font-size="15" fill="#555">Find every word. They run across, down, diagonally and backwards.</text><rect x="${x0-8}" y="${y0-8}" width="${n*cs+16}" height="${n*cs+16}" rx="12" fill="none" stroke="#222" stroke-width="2"/><g font-family="Courier New,monospace" font-weight="700" font-size="25" text-anchor="middle" fill="#111">${s}</g><g font-family="Arial,sans-serif" fill="#111">${b}</g><text x="408" y="1046" text-anchor="middle" font-family="Arial,sans-serif" font-size="12" fill="#888">Free printable · honestlittleapps.github.io/printables</text></svg>`;
}

/* ---------- WALLPAPERS (1290x2796) ---------- */
const WW=1290,WH=2796;
function wtxt(lines,y,size,fill,font,weight,ls){return `<text x="${WW/2}" text-anchor="middle" font-family="${font||'-apple-system,Helvetica Neue,Arial,sans-serif'}" font-weight="${weight||700}" font-size="${size}" fill="${fill}" letter-spacing="${ls||0}">${lines.split('|').map((l,i)=>`<tspan x="${WW/2}" y="${y+i*size*1.18}">${esc(l)}</tspan>`).join('')}</text>`}
function grad(id,a,b,v){return `<linearGradient id="${id}" x1="0" y1="0" x2="${v?0:1}" y2="1"><stop offset="0" stop-color="${a}"/><stop offset="1" stop-color="${b}"/></linearGradient>`}
function stars(seed,n,maxY){const R=rng(seed);let s='';for(let i=0;i<n;i++)s+=`<circle cx="${(R()*WW).toFixed(0)}" cy="${(R()*maxY).toFixed(0)}" r="${(1+R()*3.2).toFixed(1)}" fill="#fff" opacity="${(.3+R()*.7).toFixed(2)}"/>`;return s}
function wave(y,amp,fill,op,ph){let d=`M0,${y}`;for(let x=0;x<=WW;x+=30)d+=` L${x},${(y+Math.sin(x/180+ph)*amp).toFixed(1)}`;return `<path d="${d} L${WW},${WH} L0,${WH}Z" fill="${fill}" opacity="${op}"/>`}
const SANS='-apple-system,Helvetica Neue,Arial,sans-serif',SERIF='Georgia,Times New Roman,serif';
const WP={
 dropkin:[
  ['Sip first',()=>`<defs>${grad('g','#8EDBFA','#1670B8',1)}</defs><rect width="${WW}" height="${WH}" fill="url(#g)"/>${wave(1900,40,'#fff',.18,0)}${wave(2050,50,'#fff',.22,2)}${wave(2220,36,'#fff',.3,4)}${wtxt('Sip first.|Scroll second.',1500,118,'#fff',SANS,800)}`],
  ['Eight small wins',()=>{let g='';for(let i=0;i<8;i++){const x=205+(i%4)*293,y=1560+Math.floor(i/4)*330;g+=`<path d="M${x-70},${y} L${x-54},${y+230} Q${x},${y+250} ${x+54},${y+230} L${x+70},${y}Z" fill="none" stroke="#9FE3FF" stroke-width="10" stroke-linejoin="round"/><path d="M${x-62},${y+90} L${x-54},${y+230} Q${x},${y+250} ${x+54},${y+230} L${x+62},${y+90}Z" fill="#9FE3FF" opacity="${i<3?.85:.12}"/>`}return `<rect width="${WW}" height="${WH}" fill="#0B2A4A"/>${g}${wtxt('Eight small wins today.',1340,84,'#fff',SANS,700)}`}],
  ['Water before coffee',()=>`<rect width="${WW}" height="${WH}" fill="#E9F7FF"/><path d="M645,1180 C560,1340 440,1480 440,1640 A205,205 0 0 0 850,1640 C850,1480 730,1340 645,1180Z" fill="#7FD0F5" stroke="#0C4A7A" stroke-width="12"/><path d="M540,1650 Q545,1740 610,1780" fill="none" stroke="#fff" stroke-width="16" stroke-linecap="round"/>${wtxt('Water before coffee.',2080,92,'#0C4A7A',SERIF,700)}`]],
 focuspass:[
  ['What did you pick me up for',()=>`<rect width="${WW}" height="${WH}" fill="#0E0F13"/><circle cx="645" cy="1640" r="420" fill="none" stroke="#2C2F3A" stroke-width="6"/><circle cx="645" cy="1640" r="300" fill="none" stroke="#3A3F50" stroke-width="3"/>${wtxt('What did you|pick me up for?',1600,104,'#F2F2F5',SANS,800)}`],
  ['Phone down eyes up',()=>`<rect width="${WW}" height="${WH}" fill="#F4EFE6"/>${wtxt('Phone down.|Eyes up.',1560,140,'#111',SERIF,700)}<rect x="545" y="1960" width="200" height="8" rx="4" fill="#111"/>`],
  ['One thing first',()=>`<defs>${grad('g','#2B2D7A','#7A3BB8',1)}</defs><rect width="${WW}" height="${WH}" fill="url(#g)"/>${wtxt('One thing first.|Then this.',1580,118,'#fff',SANS,800)}${wtxt('— a note from you, to you',1960,46,'#fff',SANS,400)}`]],
 sleepward:[
  ['Screens off',()=>`<defs>${grad('g','#0B1230','#2B1F4F',1)}<mask id="m"><rect width="${WW}" height="${WH}" fill="#fff"/><circle cx="760" cy="1120" r="170" fill="#000"/></mask></defs><rect width="${WW}" height="${WH}" fill="url(#g)"/>${stars('sl1',140,WH)}<circle cx="680" cy="1180" r="190" fill="#F7E7B4" mask="url(#m)"/>${wtxt('Screens off.|Tomorrow-you|says thanks.',1720,104,'#fff',SANS,700)}`],
  ['Bedtime is a plan',()=>`<defs>${grad('g','#1B2A49','#4A3B6B',1)}</defs><rect width="${WW}" height="${WH}" fill="url(#g)"/>${stars('sl2',90,1600)}<path d="M0,2150 Q320,1960 640,2120 T1290,2050 L1290,2796 L0,2796Z" fill="#141C33"/><path d="M0,2350 Q400,2200 800,2330 T1290,2300 L1290,2796 L0,2796Z" fill="#0C1224"/>${wtxt('Bedtime is a plan,|not a mood.',1520,104,'#fff',SANS,700)}`],
  ['Wind down',()=>`<defs><radialGradient id="r" cx=".5" cy=".6" r=".5"><stop offset="0" stop-color="#FFB86B" stop-opacity=".55"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient></defs><rect width="${WW}" height="${WH}" fill="#07070A"/><rect width="${WW}" height="${WH}" fill="url(#r)"/>${wtxt('Wind down.',1640,140,'#FFE2BF',SERIF,700)}${wtxt('Lights low · screens away · breathe',1820,46,'#FFE2BF',SANS,400)}`]],
 forged:[
  ['Be strong and of a good courage',()=>`<defs><radialGradient id="r" cx=".5" cy="1" r=".8"><stop offset="0" stop-color="#E2591B" stop-opacity=".75"/><stop offset="1" stop-color="#15120F" stop-opacity="0"/></radialGradient></defs><rect width="${WW}" height="${WH}" fill="#15120F"/><rect width="${WW}" height="${WH}" fill="url(#r)"/>${wtxt('BE STRONG|AND OF A|GOOD COURAGE',1500,128,'#F3E9DD',SANS,900,6)}${wtxt('JOSHUA 1:9 · KJV',2000,44,'#E2591B',SANS,700,8)}`],
  ['Iron sharpeneth iron',()=>{let l='';for(let y=0;y<WH;y+=14)l+=`<rect y="${y}" width="${WW}" height="2" fill="#fff" opacity="${(0.015+(y%42?0:0.02)).toFixed(3)}"/>`;return `<rect width="${WW}" height="${WH}" fill="#24272B"/>${l}<rect x="245" y="1460" width="800" height="6" fill="#E2591B"/>${wtxt('Iron|sharpeneth|iron.',1650,150,'#EDEDED',SERIF,700)}${wtxt('PROVERBS 27:17 · KJV',2230,44,'#9AA0A6',SANS,700,8)}`}],
  ['Stand fast',()=>`<rect width="${WW}" height="${WH}" fill="#0F1A14"/><path d="M645,1180 L740,1240 L740,1380 Q740,1480 645,1530 Q550,1480 550,1380 L550,1240Z" fill="none" stroke="#C9A24A" stroke-width="10"/>${wtxt('Watch ye, stand fast|in the faith, quit you|like men, be strong.',1720,84,'#F0EAD6',SERIF,700)}${wtxt('1 CORINTHIANS 16:13 · KJV',2080,42,'#C9A24A',SANS,700,8)}`]],
 now:[
  ['Just start',()=>`<rect width="${WW}" height="${WH}" fill="#FFD84D"/><circle cx="645" cy="1250" r="110" fill="none" stroke="#111" stroke-width="14"/><path d="M645,1170 L645,1250 L705,1290" fill="none" stroke="#111" stroke-width="14" stroke-linecap="round"/>${wtxt('Just start.|Two minutes.',1620,130,'#111',SANS,900)}`],
  ['Next tiny step',()=>`<rect width="${WW}" height="${WH}" fill="#CFF5E7"/>${wtxt('Next tiny step?',1600,120,'#0E3B2E',SANS,800)}<rect x="295" y="1760" width="700" height="110" rx="55" fill="none" stroke="#0E3B2E" stroke-width="8"/>${wtxt('just that one',1838,52,'#0E3B2E',SANS,600)}`],
  ['Done is a direction',()=>`<defs>${grad('g','#FF8A70','#FF5E7E',1)}</defs><rect width="${WW}" height="${WH}" fill="url(#g)"/>${wtxt('Done is|a direction.',1600,140,'#fff',SANS,900)}`]]
};
function wpSVG(key,i){return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${WW} ${WH}" width="${WW}" height="${WH}">${WP[key][i][1]()}</svg>`}

/* ---------- COUPONS ---------- */
const CP={
 love:['A do-over|Restart one rough conversation, gently.','20 phone-free minutes|Just us. No screens.','I listen, no fixing|You talk. I just hear you.','Breakfast in bed|Served when you choose.','Movie pick, no vetoes|Your choice, zero complaints.','10-minute back rub|Redeem any evening.','One chore, gone|I take a task off your list.','Your-route walk|We walk wherever you want.','Date night, my plan|I organize everything.','Five thank-yous|Five things I appreciate, out loud.','The pause button|We break 20 min, then come back kind.','A yes day|Within reason. Mostly yes.'],
 kids:['Pick dinner|You choose tonight’s meal.','15 minutes later|Stay up a little past bedtime.','Skip one chore|Hand this in, chore is done.','Family game pick|You choose, everyone plays.','Extra bedtime story|One more chapter, please.','Car DJ|Your music on the next drive.','Breakfast for dinner|Pancakes at 6pm.','Library trip|Pick out new books.','Fort night|Build it, sleep in it.','One-on-one time|30 minutes with a grown-up, your plan.','Saturday plan|You choose the activity.','Dessert first|Just this once!']
};
function couponHTML(key){
 return `<div class="cp-names no-print"><label>To <input id="cto" placeholder="Name"></label><label>From <input id="cfrom" placeholder="Name"></label></div><div class="cp-grid">`+CP[key].map((c,i)=>{const[t,d]=c.split('|');return `<div class="cp"><div class="cp-n">No. ${String(i+1).padStart(2,'0')}</div><div class="cp-t">${esc(t)}</div><div class="cp-d">${esc(d)}</div><div class="cp-f"><span>To: <b class="to">________</b></span><span>From: <b class="from">________</b></span></div></div>`}).join('')+'</div>';
}

/* ---------- RENDER ---------- */
if(K==='color'){S.innerHTML=colorSVG(A);bar.append(btn('Download PNG',()=>png(colorSVG(A),1632,2112,`fruit-of-the-spirit-${A}-coloring-page.png`,'#fff')))}
if(K==='colorhub'){S.className='hub';S.innerHTML=Object.keys(FRUITS).map(w=>`<a href="fruit-of-the-spirit-coloring-page-${w}">${colorSVG(w,1)}<span>${w.replace('-',' ')}</span></a>`).join('')}
if(K==='ws'){const t=document.querySelector('h1').dataset.t;let ans=false;const draw=()=>S.innerHTML=wsSVG(A,t,ans);draw();const b=btn('Show answers',()=>{ans=!ans;b.textContent=ans?'Hide answers':'Show answers';draw()});bar.append(b,btn('Download PNG',()=>png(wsSVG(A,t,ans),1632,2112,`${A}-bible-word-search${ans?'-answers':''}.png`,'#fff')))}
if(K==='wp'){S.className='wps';S.innerHTML=WP[A].map((d,i)=>`<figure><div class="ph">${wpSVG(A,i)}</div><figcaption>${esc(d[0])}</figcaption><button data-i="${i}">Download for iPhone</button></figure>`).join('');S.querySelectorAll('button').forEach(b=>b.onclick=()=>{const i=+b.dataset.i;png(wpSVG(A,i),WW,WH,`${A}-${WP[A][i][0].toLowerCase().replace(/[^a-z]+/g,'-')}-iphone-wallpaper.png`)})}
if(K==='cp'){S.className='cps';S.innerHTML=couponHTML(A);const up=()=>{S.querySelectorAll('.to').forEach(e=>e.textContent=document.getElementById('cto').value||'________');S.querySelectorAll('.from').forEach(e=>e.textContent=document.getElementById('cfrom').value||'________')};S.querySelectorAll('input').forEach(i=>i.oninput=up)}
})();
