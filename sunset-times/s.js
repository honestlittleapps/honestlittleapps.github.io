(function(){const D=JSON.parse(document.getElementById('sd').textContent);const tz=D.tz;
const fmt=new Intl.DateTimeFormat('en-CA',{timeZone:tz,year:'numeric',month:'2-digit',day:'2-digit'});const today=fmt.format(new Date());
const r=D.d[today];if(r){const nice=new Date(today+'T12:00:00').toLocaleDateString('en-US',{weekday:'long',month:'long',day:'numeric'});
document.getElementById('tdate').textContent='Today, '+nice;document.getElementById('tss').textContent='Sunset '+r[1];document.getElementById('tgh').textContent='Golden hour starts '+r[2]+' · Blue hour ends '+r[3];
['t0','t1','t2','t3','t4'].forEach((id,k)=>document.getElementById(id).textContent=r[k])}
const months=[...new Set(Object.keys(D.d).map(k=>k.slice(0,7)))];const sel=document.getElementById('m');
months.forEach(m=>{const o=document.createElement('option');o.value=m;o.textContent=new Date(m+'-15T12:00:00').toLocaleDateString('en-US',{month:'long',year:'numeric'});sel.appendChild(o)});
sel.value=months.includes(today.slice(0,7))?today.slice(0,7):months[0];
function show(){const m=sel.value;const tb=document.querySelector('#tb tbody');tb.innerHTML='';Object.keys(D.d).filter(k=>k.startsWith(m)).forEach(k=>{const v=D.d[k];const tr=document.createElement('tr');if(k===today)tr.className='now';
tr.innerHTML='<td>'+new Date(k+'T12:00:00').toLocaleDateString('en-US',{weekday:'short',month:'short',day:'numeric'})+'</td>'+v.map(x=>'<td>'+x+'</td>').join('');tb.appendChild(tr)})}
sel.addEventListener('change',show);show()})();
