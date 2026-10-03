"use client";
import { useEffect, useRef, useState, type CSSProperties, type KeyboardEvent } from "react";
import { AI_LINES, ANCIENT, CHOICES, CONVERGENCE, CONVERGENCE_LEGEND, COUNTERS, COUNTER_Q, DIVERGENCE, EVIDENCE_CASES, EVIDENCE_STEPS, FILM_ROWS, FILM_SOURCES, MAP_NODES, MATRIX, MODERN, type EvidenceCase } from "@/lib/odyssey-compare";
import { Badge, Lab, SrcList } from "./Primitives";

/* ---------- Convergence bar chart (HTML/CSS, resizes natively) ---------- */
export function ConvergenceChart() {
  const ref = useRef<HTMLElement>(null);
  const [on, setOn] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    if (typeof IntersectionObserver === "undefined") { setOn(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setOn(true); io.disconnect(); } }, { threshold: 0.25 });
    io.observe(el); return () => io.disconnect();
  }, []);
  return (
    <figure className="od-chart" ref={ref} aria-labelledby="od-chart-t">
      <figcaption><h3 id="od-chart-t">AI Theme Convergence</h3></figcaption>
      <ul className="od-rows">
        {CONVERGENCE.map((r, i) => (
          <li key={r.theme} data-n={r.n}>
            <span className="od-cl">{r.theme}</span>
            <span className="od-cb" aria-hidden="true"><i style={{ transform: `scaleX(${on ? r.n / 3 : 0})`, transitionDelay: `${i * 45}ms` }} /></span>
            <span className="od-cv" aria-hidden="true">{r.n}</span>
            <span className="od-vh">{r.n} of 3: {CONVERGENCE_LEGEND[r.n]}</span>
          </li>
        ))}
      </ul>
      <ul className="od-legend" aria-label="Legend">{([3, 2, 1] as const).map((n) => <li key={n} data-n={n}><i aria-hidden="true" /><b>{n}</b> = {CONVERGENCE_LEGEND[n]}</li>)}</ul>
      <p className="od-disc">This is ThinkScope&apos;s coding of explicit themes in the three AI analyses. It is not a measure of importance, truth, popularity or quality.</p>
    </figure>
  );
}

/* ---------- Where the AIs differ ---------- */
export function Divergence() {
  const [on, setOn] = useState(0);
  return (
    <div className="od-div" style={{ "--c": DIVERGENCE.map((_, i) => (i === on ? "1.7fr" : "1fr")).join(" ") } as CSSProperties}>
      {DIVERGENCE.map((d, i) => {
        const open = i === on;
        return (
          <section key={d.id} className={`od-dc${open ? " on" : ""}`} data-ai={d.id}>
            <h3><button type="button" aria-expanded={open} aria-controls={`dv-${d.id}`} onClick={() => setOn(i)}>
              <span className="od-dm">{d.model}</span><span className="od-dt">{d.title}</span></button></h3>
            <div id={`dv-${d.id}`} className="od-db">
              <p>{d.short}</p>
              {open && <div className="od-dx"><p><b>The question it asks</b>{d.asks}</p><p><b>How it moves</b>{d.move}</p><p><b>Where it can fall short</b>{d.risk}</p><p className="od-labrow"><Lab kind="ai" /></p></div>}
            </div>
          </section>
        );
      })}
    </div>
  );
}

/* ---------- Evidence test: reusable for any EvidenceCase[] ---------- */
export function EvidenceTest({ cases = EVIDENCE_CASES, initial = "home" }: { cases?: EvidenceCase[]; initial?: string }) {
  const [id, setId] = useState(initial);
  const [open, setOpen] = useState<number | null>(0);
  const c = cases.find((x) => x.id === id) ?? cases[0];
  const steps = [c.anchor, c.uptake, c.resistance];
  const pick = (v: string) => { setId(v); setOpen(0); };
  return (
    <div className="od-ev">
      <div className="te" role="group" aria-label="Choose a theme to test">
        {cases.map((x) => <button key={x.id} type="button" aria-pressed={x.id === c.id} onClick={() => pick(x.id)}>{x.label}</button>)}
      </div>
      <ol className="od-steps">
        {EVIDENCE_STEPS.map((s, i) => {
          const st = steps[i]; const isOpen = open === i;
          return (
            <li key={s.n} className={isOpen ? "on" : ""} data-r={st.rating}>
              <button type="button" aria-expanded={isOpen} aria-controls={`ev-${i}`} onClick={() => setOpen(isOpen ? null : i)}>
                <span className="od-sn">Step {s.n}</span><span className="od-sname">{s.name}</span><span className="od-q">{s.q}</span><span className="od-rt">{st.rating}</span>
              </button>
              <div id={`ev-${i}`} className="od-sb" hidden={!isOpen}><p>{st.note}</p><p className="od-labrow"><Lab kind={i === 0 ? "fact" : i === 2 ? "inference" : ["mortality", "digital", "addiction"].includes(c.id) ? "uncertain" : "supported"} /></p></div>
            </li>
          );
        })}
      </ol>
      <div className="od-res" aria-live="polite">
        <p className="od-kicker">{c.label.toUpperCase()}</p>
        <dl><div><dt>Textual foundation</dt><dd data-r={c.textual}>{c.textual === "Weak" ? "Weak direct equivalence" : c.textual}</dd></div><div><dt>Modern parallel</dt><dd data-r={c.modern}>{c.modern}</dd></div></dl>
        <p><b>Reason.</b> {c.reason}</p>
        <p className="od-labrow"><Lab kind="inference">Conceptual rating</Lab> ThinkScope&apos;s judgement from the three steps, not a measurement.</p>
        {c.sources && <SrcList items={c.sources} />}
      </div>
    </div>
  );
}

/* ---------- Ancient element -> modern question matrix ---------- */
export function QuestionMatrix() {
  const [open, setOpen] = useState<string | null>(null);
  return (
    <ul className="od-mx">
      <li className="od-mxh" aria-hidden="true"><span>Ancient element</span><span>Modern question</span></li>
      {MATRIX.map((m) => {
        const isOpen = open === m.id;
        const blocks = [["Textual foundation", m.text], ["Modern interpretation", m.interp], ["Limitation", m.limit], ["AI agreement", m.ai]] as const;
        return (
          <li key={m.id} className={isOpen ? "on" : ""}>
            <button type="button" aria-expanded={isOpen} aria-controls={`mx-${m.id}`} onClick={() => setOpen(isOpen ? null : m.id)}>
              <span className="od-ma">{m.ancient}</span><span className="od-ar" aria-hidden="true">→</span><span className="od-mq">{m.modern}</span><span className="od-pl" aria-hidden="true" />
            </button>
            <div id={`mx-${m.id}`} className="od-mb" hidden={!isOpen}>
              {blocks.map(([t, b]) => <div key={t}><h4>{t} <Badge kind={b.kind} /></h4><p>{b.text}</p></div>)}
            </div>
          </li>
        );
      })}
    </ul>
  );
}

/* ---------- Ancient vs modern world (two columns; tabs on mobile) ---------- */
export function AncientModern() {
  const [tab, setTab] = useState<"a" | "m">("a");
  return (
    <div className="od-am" data-tab={tab}>
      <div className="od-amt" role="group" aria-label="Show world"><button type="button" aria-pressed={tab === "a"} onClick={() => setTab("a")}>Ancient world</button><button type="button" aria-pressed={tab === "m"} onClick={() => setTab("m")}>Modern world</button></div>
      <section className="od-amc a" aria-labelledby="am-a"><h3 id="am-a">Ancient world</h3><ul>{ANCIENT.map((t) => <li key={t}>{t}</li>)}</ul></section>
      <div className="od-vs" aria-hidden="true">versus</div>
      <section className="od-amc m" aria-labelledby="am-m"><h3 id="am-m">Modern world</h3><ul>{MODERN.map((t) => <li key={t}>{t}</li>)}</ul></section>
    </div>
  );
}

/* ---------- Film vs poem ---------- */
export function FilmVsPoem() {
  const [id, setId] = useState("home");
  const [ok, setOk] = useState(false);
  const r = FILM_ROWS.find((x) => x.id === id) ?? FILM_ROWS[0];
  if (!ok) {
    return (
      <div className="od-spoil"><p>The film column contains plot details of the 2026 adaptation, as reported by the press.</p><button type="button" className="btn p" onClick={() => setOk(true)}>Show film details</button></div>
    );
  }
  return (
    <div className="od-fv">
      <div className="te" role="group" aria-label="Choose a category">{FILM_ROWS.map((x) => <button key={x.id} type="button" aria-pressed={x.id === r.id} onClick={() => setId(x.id)}>{x.label}</button>)}</div>
      <div className="od-fvs" key={r.id}>
        <section aria-labelledby="fv-p"><p className="od-kicker">The Odyssey: Homer</p><h3 id="fv-p">Ancient textual foundation</h3><p>{r.poem}</p><p className="od-labrow"><Lab kind="fact" /></p></section>
        <section aria-labelledby="fv-f"><p className="od-kicker">The Odyssey: 2026 adaptation</p><h3 id="fv-f">Modern cinematic interpretation</h3><p>{r.film}</p><p className="od-labrow">{r.filmChecked ? <Lab kind="fact">Fact (press-reported)</Lab> : <Lab kind="uncertain" />}</p></section>
      </div>
      <div className="od-fvd" key={`${r.id}d`}>
        <div><h4>What changes?</h4><p>{r.changes}</p></div>
        <div><h4>What remains?</h4><p>{r.remains}</p></div>
      </div>
      <p className="od-note">ThinkScope does not claim the film represents Homer faithfully, and has not reviewed the film scene by scene. Press accounts differ in detail.</p>
      <SrcList items={FILM_SOURCES} />
    </div>
  );
}

/* ---------- Relevance map ---------- */
const CX = 340, CY = 300, RX = 255, RY = 215, PW = 132, PH = 40;
export function RelevanceMap() {
  const [id, setId] = useState<string | null>(null);
  const n = MAP_NODES.find((x) => x.id === id);
  const pos = MAP_NODES.map((_, i) => { const a = ((-90 + (360 / MAP_NODES.length) * i) * Math.PI) / 180; return { x: CX + RX * Math.cos(a), y: CY + RY * Math.sin(a) }; });
  const key = (v: string) => (e: KeyboardEvent) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setId(id === v ? null : v); } };
  const parts: [string, string | undefined, "text" | "interp" | "unc" | "aiinf"][] = n ? [["Ancient text", n.text, "text"], ["Modern interpretation", n.modern, "interp"], ["Evidence strength", n.strength, "unc"], ["AI agreement", n.ai, "aiinf"], ["Counterargument", n.counter, "unc"]] : [];
  return (
    <div className="od-map">
      <svg className="od-svg" viewBox="0 30 680 540" role="group" aria-label="Relevance map: choose a node">
        {pos.map((p, i) => <line key={i} x1={CX} y1={CY} x2={p.x} y2={p.y} className={`od-sp${MAP_NODES[i].id === id ? " on" : ""}`} style={{ animationDelay: `${i * 70}ms` }} />)}
        <circle cx={CX} cy={CY} r={70} className="od-core" />
        <text x={CX} y={CY - 4} className="od-ct" textAnchor="middle">THE</text>
        <text x={CX} y={CY + 20} className="od-ct" textAnchor="middle">ODYSSEY</text>
        {MAP_NODES.map((m, i) => (
          <g key={m.id} className={`od-node${m.id === id ? " on" : ""}`} role="button" tabIndex={0} aria-pressed={m.id === id} aria-label={m.label.toLowerCase()} onClick={() => setId(id === m.id ? null : m.id)} onKeyDown={key(m.id)} style={{ animationDelay: `${i * 70}ms` }}>
            <rect x={pos[i].x - PW / 2} y={pos[i].y - PH / 2} width={PW} height={PH} rx={PH / 2} />
            <text x={pos[i].x} y={pos[i].y + 5} textAnchor="middle">{m.label}</text>
          </g>
        ))}
      </svg>
      <div className="od-chips te" role="group" aria-label="Relevance map nodes">{MAP_NODES.map((m) => <button key={m.id} type="button" aria-pressed={m.id === id} onClick={() => setId(id === m.id ? null : m.id)}>{m.label}</button>)}</div>
      <div className="od-mp" aria-live="polite">
        {n ? <div key={n.id} className="od-mpi"><p className="od-kicker">{n.label}</p>{parts.map(([t, v, b]) => <div key={t}><h4>{t} <Badge kind={b} /></h4><p>{v}</p></div>)}</div>
          : <p className="od-note">Choose a node to see the ancient text, the modern interpretation, how strong the evidence is, where the AIs agree, and the strongest counterargument.</p>}
      </div>
    </div>
  );
}

/* ---------- Timeless or renewable ---------- */
export function TimelessQuiz() {
  const [c, setC] = useState<string | null>(null);
  const cur = CHOICES.find((x) => x.id === c);
  return (
    <div className="od-quiz">
      <div className="od-qo" role="group" aria-label="After seeing the evidence, what keeps The Odyssey alive?">
        {CHOICES.map((x) => <button key={x.id} type="button" aria-pressed={c === x.id} onClick={() => setC(x.id)}><b>{x.id}</b><span>{x.label}</span></button>)}
      </div>
      <div aria-live="polite" className="od-qr">
        {cur ? (
          <div key={cur.id} className="od-qri">
            <div className="od-yours"><p className="od-kicker">Your interpretation</p><p>{cur.yours}</p></div>
            <div className="od-ai od-ai2">
              {(["gemini", "chatgpt", "claude"] as const).map((m) => <article key={m} className="od-aic" data-ai={m}><h3>{AI_LINES[m]}</h3><p>{cur.ai[m]}</p></article>)}
            </div>
            <p className="od-note"><Lab kind="ai" /> ThinkScope&apos;s reading of each analysis in relation to your choice. This compares reasoning; it does not grade your answer.</p>
          </div>
        ) : <p className="od-note">Choose one. There is no correct answer here.</p>}
      </div>
    </div>
  );
}

/* ---------- Counterarguments ---------- */
export function Counterarguments() {
  const [a, setA] = useState<string | null>(null);
  const cur = COUNTER_Q.opts.find((o) => o.id === a);
  return (
    <div className="od-cn">
      <ol className="od-cl2">{COUNTERS.map((c, i) => <li key={c.text}><details className="mo"><summary><span className="od-num">{i + 1}</span>{c.text}</summary><p>{c.more}</p><p className="od-labrow"><Lab kind={c.kind} /></p></details></li>)}</ol>
      <div className="od-cq"><p className="od-big sm">{COUNTER_Q.q}</p>
        <div className="te" role="group" aria-label="Your view">{COUNTER_Q.opts.map((o) => <button key={o.id} type="button" aria-pressed={a === o.id} onClick={() => setA(o.id)}>{o.label}</button>)}</div>
        <p className="tep" aria-live="polite">{cur ? cur.note : "You decide. ThinkScope does not."}</p></div>
    </div>
  );
}
