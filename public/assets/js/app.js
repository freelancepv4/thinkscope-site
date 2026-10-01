"use strict";
const {T,L,A,D,G,E,EL,Y,R,TM,VD,MX}=window.TS_DATA;
const $=id=>document.getElementById(id),st=(k,v)=>{try{if(v===undefined)return JSON.parse(localStorage.getItem(k));localStorage.setItem(k,JSON.stringify(v))}catch(e){return null}};
const pills=(el,items,on)=>items.forEach((t,i)=>{const b=document.createElement("button");b.className="pill";b.textContent=t;b.onclick=()=>on(i,b);el.appendChild(b)});
;
pills($("chips"),T.map(t=>t[0]),(i,b)=>{[...$("chips").children].forEach(x=>x.setAttribute("aria-pressed",x===b));$("chipP").innerHTML=`<span class="lab INT">INTERPRETATION</span> ${T[i][1]}`});
;let sel=new Set(st("lens")||[]);
const lensUp=()=>{const t=[...sel].map(i=>L[i]).join(" + ");$("lensR").innerHTML=sel.size?`<b>Your starting lens: ${t}</b>`:"";$("vL").textContent=sel.size?"Your starting lens: "+t:"Your starting lens appears here.";st("lens",[...sel])};
pills($("lens"),L,(i,b)=>{sel.has(i)?sel.delete(i):sel.add(i);b.setAttribute("aria-pressed",sel.has(i));lensUp()});[...$("lens").children].forEach((b,i)=>b.setAttribute("aria-pressed",sel.has(i)));lensUp();
;
pills($("aiT"),A.map(a=>a[0]),(i,b)=>{[...$("aiT").children].forEach(x=>x.setAttribute("aria-selected",x===b));$("aiP").innerHTML=`<span class="lab AI">AI ANALYSIS</span> <b>${A[i][0]}</b> emphasized: ${A[i][1]}.<p class="cap">Summary of observations. Claims about current popularity need evidence beyond this response.</p>`});
;
D.forEach(d=>{const n=d[1].reduce((a,b)=>a+b),r=document.createElement("div");r.innerHTML=`<button class="bar" aria-expanded="false"><span>${d[0]}</span><span class="seg">${d[1].map(v=>`<i class="${v?"on":""}"></i>`).join("")}</span><b>${n}/3</b></button><div class="cap" hidden>${["ChatGPT","Claude","Gemini"].filter((_,i)=>d[1][i]).join(", ")||"None"}. ${d[2]}</div>`;const b=r.firstChild;b.onclick=()=>{const o=b.getAttribute("aria-expanded")!=="true";b.setAttribute("aria-expanded",o);b.nextSibling.hidden=!o};$("chart").appendChild(r)});
;const LB={FACT:"FACT",INT:"INTERPRETATION",AI:"AI ANALYSIS",INF:"INFERENCE"};
G.forEach(g=>{const c=document.createElement("div");c.className="card";c.style.marginBottom="10px";c.innerHTML=`<p style="margin:0 0 8px">“${g[0]}”</p><div class="row">${Object.keys(LB).map(k=>`<button class="pill" data-k="${k}">${LB[k]}</button>`).join("")}</div><p class="cap" aria-live="polite"></p>`;c.querySelectorAll("button").forEach(b=>b.onclick=()=>{c.lastChild.innerHTML=b.dataset.k===g[1]?`Matches our label: <span class="lab ${g[1]}">${LB[g[1]]}</span>`:`We label it <span class="lab ${g[1]}">${LB[g[1]]}</span>. Reasonable readers can debate interpretation labels.`});$("game").appendChild(c)});
;
E.forEach(e=>$("ev").insertAdjacentHTML("beforeend",`<div style="margin:10px 0"><b>${e[0]}</b> — <span class="cap">${EL[e[1]]}</span><div class="ms" aria-hidden="true">${EL.map((_,i)=>`<i style="${i===e[1]?"background:var(--cy)":""}"></i>`).join("")}</div></div>`));
;
Y.forEach((y,i)=>{const b=document.createElement("button");b.className="pill";b.textContent=y[0];b.onclick=()=>{[...$("tl").children].forEach(x=>x.setAttribute("aria-pressed",x===b));$("tlP").innerHTML=`${y[2]?`<img loading="lazy" src="${y[2]}" width="90" height="135" alt="${y[0]} adaptation poster" style="width:90px;height:auto;border-radius:8px">`:""}<div><span class="lab FACT">FACT</span> <b>${y[0]}</b><p style="margin:4px 0 0">${y[1]}</p></div>`};$("tl").appendChild(b)});
;
R.forEach(r=>$("reads").insertAdjacentHTML("beforeend",`<div class="card" style="color:var(--ink)"><h3>${r[0]}</h3><p style="margin:0;color:var(--mut)">${r[1]}</p></div>`));
const sl=$("sl"),su=()=>{const v=+sl.value;$("slP").innerHTML=v<35?"Closer to the traditional moral reading: Cathy's actions stress cruelty.":v>65?"Closer to complexity: readers weigh context, constraint and unreliable narration.":"In between: many readers hold both views at once.";sl.setAttribute("aria-valuetext",v<35?"Toward monster":v>65?"Toward complex human":"Midpoint")};sl.oninput=su;su();
;
pills($("tmC"),TM,(i,b)=>{[...$("tmC").children].forEach(x=>x.setAttribute("aria-pressed",x===b));$("tmP").innerHTML=`<span class="lab USER">USER OPINION</span> You chose: <b>${TM[i]}</b>. The novel keeps returning to choice, inheritance and moral agency; that is a question, not a verdict.`});
MX.forEach(r=>$("mx").insertAdjacentHTML("beforeend",`<tr><td><b>${r[0]}</b></td><td>${r[1]}</td><td>${r[2]}</td></tr>`));
;
pills($("vd"),VD,(i,b)=>{[...$("vd").children].forEach(x=>x.setAttribute("aria-pressed",x===b));$("vR").textContent="Saved in your browser only. Insufficient visitor data to show aggregate responses."});
let mine=st("mine")||[];const mr=()=>{$("mine").innerHTML="";mine.forEach(m=>{const l=document.createElement("li");l.textContent=m;$("mine").appendChild(l)})};mr();
$("add").onclick=()=>{const v=$("ta").value.trim();if(v){mine.push(v);st("mine",mine);$("ta").value="";mr()}};
const vid=$("vid"),vb=$("vb");if(matchMedia("(prefers-reduced-motion:reduce)").matches){vid.pause();vid.removeAttribute("autoplay");vb.textContent="▶";vb.setAttribute("aria-label","Play video")}
vb.onclick=()=>{if(vid.paused){vid.play();vb.textContent="❚❚";vb.setAttribute("aria-label","Pause video")}else{vid.pause();vb.textContent="▶";vb.setAttribute("aria-label","Play video")}};
if("IntersectionObserver"in window){const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&e.target.classList.add("in")));document.querySelectorAll("section .card").forEach(c=>{c.classList.add("rv");io.observe(c)})}
if(vid.autoplay){const p=vid.play();p&&p.catch&&p.catch(()=>{vb.textContent="▶";vb.setAttribute("aria-label","Play video")})}
