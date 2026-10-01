const $=id=>document.getElementById(id);
const C=$("cats");[["🎬","Movies","Films through multiple AI lenses"],["📺","TV & Drama","Series, K-dramas, anime"],["⚽","Sports","Context, analysis, tracked predictions"],["🎵","Music","Sound, genre, meaning"],["🎮","Games","Design, worlds, debates"],["🌍","Culture","Regional ecosystems"],["🔮","Predictions","Dated, tracked, reviewed"],["🧠","Everyday Life","Human behavior, trends"],["🧪","AI Experiments","Method-first research"],["⚖️","AI vs Humans","Against audiences and outcomes"]].forEach(c=>C.insertAdjacentHTML("beforeend",`<a class="card" href="#"><div class="ic" aria-hidden="true">${c[0]}</div><h3>${c[1]}</h3><p>${c[2]}</p></a>`));
[["Movies","What Does AI Think About [Movie Title]?","Template: consensus, disagreement, vs critics, vs audience."],["AI vs Humans","Who Understands Endings Better?","Template: model outputs compared with sourced audience data."],["Experiments","Do AI Models Agree on Great Villains?","Template: question, method, dataset, limits, conclusion."]].forEach(f=>$("feat").insertAdjacentHTML("beforeend",`<a class="card" href="#"><span class="tag demo">Demo</span> <span class="tag">${f[0]}</span><h3>${f[1]}</h3><p>${f[2]}</p><div class="meta">Models: — · Analyzed: — · Read: —</div></a>`));
const M=["GPT","Claude","Gemini"];M.forEach((m,i)=>$("tabs").insertAdjacentHTML("beforeend",`<button role="tab" aria-selected="${!i}">${m}</button>`));
const show=i=>{[...$("tabs").children].forEach((b,j)=>b.setAttribute("aria-selected",i===j));$("panel").innerHTML=`<p><b>${M[i]}</b> <span class="tag demo">placeholder</span></p><p style="color:var(--mut)">[Concise final-output summary from ${M[i]} appears here, with model version and date recorded per methodology.]</p>`};
[...$("tabs").children].forEach((b,i)=>b.onclick=()=>show(i));show(0);
// Globe
const R=[["Italy",12,42,"Italian cinema"],["Korea",127,37,"K-drama"],["India",78,21,"Bollywood & cricket"],["Japan",138,36,"Anime"],["USA",-98,39,"Hollywood & NBA"],["UK",-2,54,"Premier League"],["Spain",-3,40,"Football & Spanish cinema"]];
const cv=$("gl"),x=cv.getContext("2d");let lon=-10,sel=null,drag=null,tgt=null,S=440;
const rm=matchMedia("(prefers-reduced-motion:reduce)").matches;
R.forEach((r,i)=>{const b=document.createElement("button");b.textContent=r[0];b.setAttribute("aria-pressed","false");b.onclick=()=>pick(i);$("chips").appendChild(b)});
function pick(i){sel=i;tgt=-R[i][1];[...$("chips").children].forEach((b,j)=>b.setAttribute("aria-pressed",i===j));$("topic").innerHTML=`<b>${R[i][0]}</b> → ${R[i][3]}<br><span style="color:#9aa3b8">Sample region topic. Region pages will list real analyses once content exists.</span>`;if(rm){lon=tgt;draw()}}
function P(la,lo){const a=(lo+lon)*Math.PI/180,b=la*Math.PI/180;return[Math.sin(a)*Math.cos(b),Math.sin(b),Math.cos(a)*Math.cos(b)]}
function draw(){const d=devicePixelRatio||1,w=cv.clientWidth;if(cv.width!==w*d){cv.width=cv.height=w*d}S=w*d;x.clearRect(0,0,S,S);const r=S*.45,c=S/2;
x.strokeStyle="rgba(47,184,230,.25)";x.lineWidth=d;x.beginPath();x.arc(c,c,r,0,7);x.stroke();
for(let la=-60;la<=60;la+=30){x.beginPath();let f=1;for(let lo=-180;lo<=180;lo+=5){const p=P(la,lo);if(p[2]<0){f=1;continue}x[f?"moveTo":"lineTo"](c+p[0]*r,c-p[1]*r);f=0}x.stroke()}
for(let lo=-180;lo<180;lo+=30){x.beginPath();let f=1;for(let la=-90;la<=90;la+=5){const p=P(la,lo);if(p[2]<0){f=1;continue}x[f?"moveTo":"lineTo"](c+p[0]*r,c-p[1]*r);f=0}x.stroke()}
R.forEach((q,i)=>{const p=P(q[2],q[1]);if(p[2]<0)return;x.fillStyle=i===sel?"#e8a64a":"#2fb8e6";x.beginPath();x.arc(c+p[0]*r,c-p[1]*r,(i===sel?7:4)*d,0,7);x.fill()})}
function loop(){if(tgt!==null&&!drag){let dl=((tgt-lon+540)%360)-180;lon+=dl*.08;if(Math.abs(dl)<.3)tgt=null}else if(!drag&&sel===null)lon+=.15;draw();requestAnimationFrame(loop)}
cv.onpointerdown=e=>{drag=e.clientX;cv.setPointerCapture(e.pointerId)};cv.onpointermove=e=>{if(drag!==null){lon+=(e.clientX-drag)*.4;drag=e.clientX;tgt=null}};cv.onpointerup=()=>drag=null;
draw();if(!rm)loop();

// Forms and theme toggle (moved out of inline handlers so the site CSP can stay script-src 'self')
$("askF").addEventListener("submit",e=>{e.preventDefault();$("askM").textContent="Question builder is not connected yet. This is a UX prototype."});
$("nlF").addEventListener("submit",e=>{e.preventDefault();$("nlM").textContent="Newsletter is not connected yet."});
$("themeB").addEventListener("click",()=>{const r=document.documentElement;r.dataset.theme=r.dataset.theme==="dark"?"light":"dark"});

// Media map: edit paths here to swap assets
const MEDIA={heroVideo:"/assets/video/odyssey-hero.mp4",heroPoster:"/assets/images/odyssey-video-poster.webp",featured:"/assets/images/east-of-eden-2026-netflix-poster.webp"};
(function(){
const v=$("hv"),pp=$("hpp"),sn=$("hsn"),bp=$("hbp"),box=$("hvw"),fi=$("fci");
if(fi){fi.src=MEDIA.featured;fi.addEventListener("error",()=>fi.remove())}
if(!v)return;
v.poster=MEDIA.heroPoster;v.src=MEDIA.heroVideo;
const ui=()=>{
 pp.textContent=v.paused?"Play":"Pause";pp.setAttribute("aria-label",v.paused?"Play video":"Pause video");
 sn.textContent=v.muted?"Unmute":"Mute";sn.setAttribute("aria-label",v.muted?"Enable sound":"Mute video");
 bp.hidden=!(v.paused&&!v.ended&&!v.currentTime)};
["play","pause","volumechange","ended","playing"].forEach(e=>v.addEventListener(e,ui));
v.addEventListener("error",()=>box.classList.add("nov"));
pp.addEventListener("click",()=>v.paused?v.play().catch(ui):v.pause());
bp.addEventListener("click",()=>{v.muted=false;v.loop=false;v.play().catch(()=>{v.muted=true;v.play().catch(ui)})});
sn.addEventListener("click",()=>{v.muted=!v.muted;v.loop=v.muted;if(v.paused)v.play().catch(ui)});
// One attempt only: sound first, then muted, then show the play button
(async()=>{
 if(matchMedia("(prefers-reduced-motion:reduce)").matches){ui();return}
 v.muted=false;
 try{await v.play()}catch(e){v.muted=true;v.loop=true;try{await v.play()}catch(e2){}}
 ui()})();
})();
