"use client";
import { useEffect, useRef, useState } from "react";

interface Region { name: string; lat: number; lon: number }
const REGIONS: Region[] = [
  { name: "Europe", lat: 50, lon: 10 }, { name: "Asia", lat: 35, lon: 100 }, { name: "North America", lat: 40, lon: -100 },
  { name: "South America", lat: -15, lon: -60 }, { name: "Africa", lat: 5, lon: 20 }, { name: "Middle East", lat: 28, lon: 45 }, { name: "Oceania", lat: -25, lon: 135 },
];
// Simplified continent outlines [lon, lat]. Illustrative, not survey data.
const LAND: number[][][] = [
  [[-168,66],[-140,70],[-95,72],[-80,73],[-62,60],[-55,50],[-67,45],[-76,35],[-81,25],[-97,26],[-105,22],[-95,16],[-85,10],[-78,8],[-90,14],[-105,20],[-118,32],[-125,42],[-125,50],[-140,60],[-165,60]],
  [[-78,8],[-62,10],[-50,0],[-35,-6],[-40,-22],[-55,-35],[-65,-42],[-68,-55],[-75,-50],[-72,-30],[-70,-18],[-81,-5]],
  [[-10,36],[-9,43],[-2,48],[5,52],[10,57],[20,60],[28,70],[60,70],[100,76],[140,72],[170,68],[160,58],[142,50],[135,35],[122,30],[120,22],[108,10],[100,2],[98,16],[90,22],[78,8],[72,20],[58,24],[50,15],[43,12],[35,30],[28,36],[22,38],[12,38],[8,44],[0,38]],
  [[-17,21],[-10,32],[10,37],[32,31],[43,12],[51,11],[40,-5],[40,-15],[33,-26],[20,-35],[12,-18],[9,4],[-8,5],[-17,14]],
  [[114,-22],[130,-12],[142,-11],[153,-27],[146,-39],[135,-35],[115,-34]],
  [[-55,60],[-20,70],[-30,83],[-60,80]],
];
function inside(lo: number, la: number, poly: number[][]): boolean {
  let c = false;
  for (let i = 0, j = poly.length - 1; i < poly.length; j = i++) {
    const [xi, yi] = poly[i], [xj, yj] = poly[j];
    if (yi > la !== yj > la && lo < ((xj - xi) * (la - yi)) / (yj - yi) + xi) c = !c;
  }
  return c;
}
const DOTS: [number, number][] = (() => {
  const d: [number, number][] = [];
  for (let la = -58; la <= 80; la += 3) {
    const step = 3 / Math.max(Math.cos((la * Math.PI) / 180), 0.2);
    for (let lo = -180; lo < 180; lo += step) if (LAND.some((p) => inside(lo, la, p))) d.push([la, lo]);
  }
  return d;
})();
const TILT = 0.35;
function proj(la: number, lo: number, rot: number): [number, number, number] {
  const a = ((lo + rot) * Math.PI) / 180, b = (la * Math.PI) / 180;
  const x = Math.cos(b) * Math.sin(a), y = Math.sin(b), z = Math.cos(b) * Math.cos(a);
  return [x, y * Math.cos(TILT) - z * Math.sin(TILT), y * Math.sin(TILT) + z * Math.cos(TILT)];
}

export default function Globe() {
  const cv = useRef<HTMLCanvasElement>(null);
  const st = useRef({ rot: -10, speed: 0, drag: null as number | null, last: 0, goto: null as number | null, hover: -1, visible: true });
  const [tip, setTip] = useState<{ name: string; x: number; y: number } | null>(null);

  useEffect(() => {
    const c = cv.current; if (!c) return;
    const ctx = c.getContext("2d"); if (!ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const s = st.current; let raf = 0;
    const draw = () => {
      const d = window.devicePixelRatio || 1, w = c.clientWidth; if (!w) return;
      if (c.width !== Math.round(w * d)) { c.width = c.height = Math.round(w * d); }
      const S = c.width, r = S * 0.44, m = S / 2;
      ctx.clearRect(0, 0, S, S);
      const glow = ctx.createRadialGradient(m, m, r * 0.97, m, m, r * 1.14);
      glow.addColorStop(0, "rgba(47,184,230,.20)"); glow.addColorStop(1, "rgba(47,184,230,0)");
      ctx.fillStyle = glow; ctx.beginPath(); ctx.arc(m, m, r * 1.14, 0, 7); ctx.fill();
      const body = ctx.createRadialGradient(m - r * 0.35, m - r * 0.4, r * 0.1, m, m, r);
      body.addColorStop(0, "#1a2340"); body.addColorStop(1, "#070a14");
      ctx.fillStyle = body; ctx.beginPath(); ctx.arc(m, m, r, 0, 7); ctx.fill();
      for (const [la, lo] of DOTS) {
        const [x, y, z] = proj(la, lo, s.rot); if (z <= 0) continue;
        ctx.fillStyle = `rgba(233,236,245,${0.12 + 0.55 * z})`;
        ctx.fillRect(m + x * r, m - y * r, 1.6 * d, 1.6 * d);
      }
      REGIONS.forEach((g, i) => {
        const [x, y, z] = proj(g.lat, g.lon, s.rot); if (z <= 0.05) return;
        ctx.fillStyle = i === s.hover ? "#e8a64a" : "rgba(232,166,74,.85)";
        ctx.beginPath(); ctx.arc(m + x * r, m - y * r, (i === s.hover ? 5.5 : 3.5) * d, 0, 7); ctx.fill();
      });
    };
    const loop = () => {
      if (s.visible) {
        const idle = performance.now() - s.last > 3000;
        if (s.goto !== null && s.drag === null) {
          const dl = ((s.goto - s.rot + 540) % 360) - 180; s.rot += dl * 0.08; if (Math.abs(dl) < 0.3) s.goto = null;
        } else {
          s.speed += ((s.drag === null && idle ? 0.07 : 0) - s.speed) * 0.04; s.rot += s.speed;
        }
        draw();
      }
      raf = requestAnimationFrame(loop);
    };
    draw();
    c.addEventListener("repaint", draw);
    if (!reduce) raf = requestAnimationFrame(loop);
    const io = new IntersectionObserver(([e]) => { s.visible = e.isIntersecting; }, { threshold: 0.05 });
    io.observe(c);
    const onResize = () => draw(); window.addEventListener("resize", onResize);
    return () => { cancelAnimationFrame(raf); c.removeEventListener("repaint", draw); io.disconnect(); window.removeEventListener("resize", onResize); };
  }, []);

  const nearest = (e: React.PointerEvent) => {
    const c = cv.current!, b = c.getBoundingClientRect(), r = b.width * 0.44, px = e.clientX - b.left - b.width / 2, py = e.clientY - b.top - b.height / 2;
    let best = -1, bd = 18;
    REGIONS.forEach((g, i) => { const [x, y, z] = proj(g.lat, g.lon, st.current.rot); if (z <= 0.05) return; const dd = Math.hypot(px - x * r, py + y * r); if (dd < bd) { bd = dd; best = i; } });
    st.current.hover = best;
    setTip(best >= 0 ? { name: REGIONS[best].name, x: e.clientX - b.left, y: e.clientY - b.top } : null);
  };
  const down = (e: React.PointerEvent) => { st.current.drag = e.clientX; st.current.last = performance.now(); cv.current?.setPointerCapture(e.pointerId); };
  const move = (e: React.PointerEvent) => {
    const s = st.current;
    if (s.drag !== null) { s.rot += (e.clientX - s.drag) * 0.35; s.drag = e.clientX; s.goto = null; s.last = performance.now(); setTip(null); if (matchMedia("(prefers-reduced-motion: reduce)").matches) paint(); }
    else nearest(e);
  };
  const paint = () => { const c = cv.current; if (c) c.dispatchEvent(new Event("repaint")); };
  const up = () => { st.current.drag = null; st.current.last = performance.now(); };
  const rotateTo = (i: number) => { st.current.goto = -REGIONS[i].lon; st.current.last = performance.now(); st.current.hover = i; if (matchMedia("(prefers-reduced-motion: reduce)").matches) { st.current.rot = -REGIONS[i].lon; paint(); } };

  return (
    <div className="gb">
      <canvas ref={cv} role="img" aria-label="Slowly rotating globe. Drag to rotate. Region buttons below turn it to a region." onPointerDown={down} onPointerMove={move} onPointerUp={up} onPointerCancel={up} onPointerLeave={() => { st.current.hover = -1; setTip(null); }} />
      {tip && <div className="gt" style={{ left: tip.x, top: tip.y }}>{tip.name}</div>}
      <div className="gr" role="group" aria-label="Regions">{REGIONS.map((g, i) => <button key={g.name} type="button" onClick={() => rotateTo(i)}>{g.name}</button>)}</div>
    </div>
  );
}
