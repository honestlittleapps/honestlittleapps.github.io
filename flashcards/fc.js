(function(){
const D=JSON.parse(document.getElementById('deck').textContent);const K='hla-fc-'+D.id;
let st={};try{st=JSON.parse(localStorage.getItem(K)||'{}')}catch(e){}
const save=()=>{try{localStorage.setItem(K,JSON.stringify(st))}catch(e){}};
const $=s=>document.querySelector(s);let group='All',queue=[],cur=null,known=0;
function pool(){return D.cards.map((c,i)=>({...c,i})).filter(c=>group==='All'||c.g===group)}
function build(){const p=pool();const due=p.filter(c=>!(st[c.i]>=2));queue=(due.length?due:p).sort(()=>Math.random()-.5);next();upd()}
function upd(){const p=pool();known=p.filter(c=>st[c.i]>=2).length;$('#prog i').style.width=(p.length?100*known/p.length:0)+'%';$('#count').textContent=known+' of '+p.length+' learned';
 if(known>=Math.min(10,p.length)&&!$('#nudge').dataset.seen){$('#nudge').classList.add('show')}}
function next(){const c=$('#card');c.classList.remove('flip');if(!queue.length){$('#done').classList.add('show');$('#sw').style.display='none';return}
 $('#done').classList.remove('show');$('#sw').style.display='';cur=queue.shift();setTimeout(()=>{$('#ff').innerHTML=cur.f+'<small>'+(D.hint||'Tap to flip')+'</small>';$('#fb').innerHTML=cur.b.replace(/ · /g,'<br>')},cur?120:0)}
function grade(ok){if(!cur)return;if(!$('#card').classList.contains('flip')){$('#card').classList.add('flip');return}
 st[cur.i]=ok?(st[cur.i]||0)+1:0;if(!ok)queue.splice(Math.min(3,queue.length),0,cur);else if(st[cur.i]<2)queue.push(cur);save();upd();next()}
$('#card').addEventListener('click',()=>$('#card').classList.toggle('flip'));
$('#again').onclick=()=>grade(false);$('#good').onclick=()=>grade(true);
$('#shuffle').onclick=build;$('#reset').onclick=()=>{st={};save();build()};
$('#restart').onclick=()=>{queue=pool().sort(()=>Math.random()-.5);next()};
document.addEventListener('keydown',e=>{if(e.target.tagName==='INPUT')return;if(e.code==='Space'){e.preventDefault();$('#card').classList.toggle('flip')}if(e.key==='1')grade(false);if(e.key==='2')grade(true)});
const f=$('#filters');if(f){f.addEventListener('click',e=>{const b=e.target.closest('button');if(!b)return;group=b.dataset.g;[...f.children].forEach(x=>x.classList.toggle('on',x===b));build()})}
$('#nudge').addEventListener('click',()=>{$('#nudge').dataset.seen=1});
build();})();
