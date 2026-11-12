(function(){const W=window.WR,cv=document.getElementById('cv'),x=cv.getContext('2d'),f=document.getElementById('form');
const TH=W.themes;let th=0;
W.fields.forEach(d=>{const l=document.createElement('label');l.textContent=d.l;const i=document.createElement(d.opts?'select':'input');i.id='f_'+d.k;
 if(d.opts){d.opts.forEach(o=>{const op=document.createElement('option');op.textContent=o;i.appendChild(op)})}else{i.type=d.t||'text';if(d.t==='number'){i.min=d.min??0;i.step=d.step||'any'}if(d.max)i.maxLength=d.max;i.placeholder=d.ph||''}
 i.value=d.v;i.addEventListener('input',draw);l.appendChild(i);f.appendChild(l)});
const tb=document.getElementById('themes');TH.forEach((t,k)=>{const b=document.createElement('button');b.style.background='linear-gradient(135deg,'+t[0]+','+t[1]+')';b.title='Color '+(k+1);b.setAttribute('aria-label','Color '+(k+1));if(!k)b.className='on';b.onclick=()=>{th=k;[...tb.children].forEach(c=>c.classList.toggle('on',c===b));draw()};tb.appendChild(b)});
function V(){const o={};W.fields.forEach(d=>{const v=document.getElementById('f_'+d.k).value;o[d.k]=d.t==='number'?(parseFloat(v)||0):v.trim()});return o}
function wrap(t,mx){const w=String(t).split(/\s+/),L=[];let s='';w.forEach(q=>{const z=s?s+' '+q:q;if(x.measureText(z).width>mx&&s){L.push(s);s=q}else s=z});if(s)L.push(s);return L}
function fit(t,size,weight,mx){let s=size;do{x.font=weight+' '+s+'px -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';s-=4}while(x.measureText(t).width>mx&&s>30);return s+4}
function draw(){const v=V(),o=W.build(v),t=TH[th];const G=x.createLinearGradient(0,0,1080,1920);G.addColorStop(0,t[0]);G.addColorStop(1,t[1]);x.fillStyle=G;x.fillRect(0,0,1080,1920);
 x.globalAlpha=.12;x.fillStyle='#fff';[[900,260,330],[140,1500,420],[980,1650,200]].forEach(c=>{x.beginPath();x.arc(c[0],c[1],c[2],0,7);x.fill()});x.globalAlpha=1;
 const F='-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Helvetica,Arial,sans-serif';x.fillStyle=t[2]||'#fff';x.textAlign='left';
 x.font='700 40px '+F;x.globalAlpha=.85;x.fillText(o.kicker.toUpperCase(),90,190);x.globalAlpha=1;
 x.font='800 104px '+F;let y=320;wrap(o.title,900).forEach(l=>{x.fillText(l,90,y);y+=108});y+=30;
 o.stats.forEach((s,k)=>{const sz=fit(String(s.n),130,'800',900);x.fillText(String(s.n),90,y+sz*.8);x.font='600 38px '+F;x.globalAlpha=.85;wrap(s.l,900).forEach((l,j)=>x.fillText(l,90,y+sz*.8+56+j*46));x.globalAlpha=1;y+=sz*.8+70+ (wrap(s.l,900).length-1)*46+50});
 if(o.quote&&o.quote.t){x.font='italic 600 46px '+F;const QL=wrap('“'+o.quote.t+'”',840).slice(0,5);x.globalAlpha=.16;x.fillStyle='#fff';x.beginPath();x.roundRect(70,y,940,Math.min(1780-y,QL.length*58+(o.quote.s?70:0)+80),40);x.fill();x.globalAlpha=1;x.fillStyle=t[2]||'#fff';x.font='italic 600 46px '+F;let yy=y+80;wrap('“'+o.quote.t+'”',840).slice(0,5).forEach(l=>{x.fillText(l,110,yy);yy+=58});if(o.quote.s){x.font='700 34px '+F;x.globalAlpha=.85;x.fillText(o.quote.s,110,yy+10);x.globalAlpha=1}}
 x.font='600 30px '+F;x.globalAlpha=.75;x.fillText(o.foot||'honestlittleapps.github.io/wrapped',90,1850);x.globalAlpha=1}
async function blob(){return await new Promise(r=>cv.toBlob(r,'image/png'))}
document.getElementById('dl').onclick=async()=>{const b=await blob(),a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=W.file+'.png';a.click()};
const sh=document.getElementById('share');sh.onclick=async()=>{const b=await blob(),fl=new File([b],W.file+'.png',{type:'image/png'});if(navigator.canShare&&navigator.canShare({files:[fl]})){try{await navigator.share({files:[fl],title:W.shareTitle})}catch(e){}}else{document.getElementById('dl').click()}};
draw();})();
