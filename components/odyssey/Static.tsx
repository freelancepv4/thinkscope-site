import { AI_CARDS, BUDGET, DATA_NOT, DATA_SHOWS, EVIDENCE_CASES, FAQ, FIGURES, SOURCES } from "@/lib/odyssey-compare";
import type { ReactNode } from "react";
import { Lab, SrcList } from "./Primitives";

export function Thesis() {
  return (
    <blockquote className="od-thesis">
      <p className="od-labrow"><Lab kind="inference">ThinkScope synthesis</Lab></p>
      <p className="od-big">The Odyssey may not be timeless. It may be renewable.</p>
      <p>Its world is ancient, its values can be difficult for modern readers, and many modern parallels are interpretations rather than facts. Yet the story keeps being translated, retold, challenged and rebuilt around new questions, from homecoming and identity to hospitality, violence and mortality.</p>
      <p>Its survival demonstrates cultural persistence. Whether that persistence becomes personal relevance is something each reader has to decide.</p>
      <p className="od-note">This is ThinkScope&apos;s synthesis of the three AI analyses. It is not presented as an objective fact.</p>
    </blockquote>
  );
}

export function AICards() {
  const rows: [string, keyof (typeof AI_CARDS)[number]][] = [["Core emphasis", "emphasis"], ["Main themes identified", "themes"], ["Distinctive insight", "insight"], ["Main caution", "caution"], ["Evidence style", "evidence"]];
  return (
    <div className="od-ai">
      {AI_CARDS.map((c) => (
        <article key={c.id} className="od-aic" data-ai={c.id} aria-labelledby={`aic-${c.id}`}>
          <h3 id={`aic-${c.id}`}>{c.model}</h3>
          <dl>{rows.map(([t, k]) => <div key={k}><dt>{t}</dt><dd>{c[k]}</dd></div>)}</dl>
        </article>
      ))}
    </div>
  );
}

export function TwentySixTest() {
  return (
    <>
      <div className="od-fig">
        {FIGURES.map((f) => (
          <div key={f.when} className="od-stat"><span>{f.when}</span><b>{f.value}</b><p>{f.text}</p><a href={f.src.href} target="_blank" rel="noopener noreferrer">{f.src.label}</a></div>
        ))}
      </div>
      <p className="od-budget"><Lab kind="fact" /> {BUDGET.text} <a href={BUDGET.src.href} target="_blank" rel="noopener noreferrer">{BUDGET.src.label}</a></p>
      <div className="od-two">
        <section className="od-panel" aria-labelledby="ds-h"><h3 id="ds-h">What the data shows</h3><p className="od-labrow"><Lab kind="inference" /></p><ul className="od-yes">{DATA_SHOWS.map((t) => <li key={t}>{t}</li>)}</ul></section>
        <section className="od-panel" aria-labelledby="dn-h"><h3 id="dn-h">What the data does not prove</h3><p className="od-labrow"><Lab kind="uncertain" /></p><ul className="od-no">{DATA_NOT.map((t) => <li key={t}>{t}</li>)}</ul></section>
      </div>
      <p className="od-divider" role="note"><span>Attention</span> <i aria-hidden="true">≠</i><span className="od-vh"> is not </span> <span>Understanding</span> <i aria-hidden="true">≠</i><span className="od-vh"> is not </span> <span>Long-term relevance</span></p>
    </>
  );
}

const SEG = { Strong: 3, Moderate: 2, Partial: 2, Weak: 1, "Strongly interpretive": 1 } as const;
function Seg({ r, interp }: { r: keyof typeof SEG; interp?: boolean }) {
  return <span className={`od-seg${interp ? " i" : ""}`} aria-hidden="true">{[1, 2, 3].map((n) => <i key={n} className={n <= SEG[r] ? "on" : ""} />)}</span>;
}

/** Conceptual evidence map. Ordinal segments only: no numbers, no percentages. */
export function Continuum() {
  const rows = EVIDENCE_CASES.filter((c) => ["home", "identity", "hospitality", "mortality", "digital", "addiction"].includes(c.id));
  return (
    <div className="od-cont">
      <div className="od-contax" aria-hidden="true"><span>Written in the text</span><i /><span>Brought by the reader</span></div>
      <ul>
        {rows.map((c) => (
          <li key={c.id} className={c.textual === "Weak" ? "interp" : ""}>
            <h3>{c.label}</h3>
            <div className="od-contr">
              <div><span className="od-conl">Textual foundation</span><Seg r={c.textual as keyof typeof SEG} /><b>{c.textual === "Weak" ? "Weak direct textual equivalence" : "Strong textual foundation"}</b></div>
              <div><span className="od-conl">Modern equivalence</span><Seg r={c.modern as keyof typeof SEG} interp={c.modern === "Strongly interpretive"} /><b>{c.modern === "Strongly interpretive" ? "Strongly interpretive modern parallel" : "Moderate modern equivalence"}</b></div>
            </div>
          </li>
        ))}
      </ul>
      <p className="od-note"><Lab kind="inference">Conceptual map</Lab> This is a conceptual evidence map, not numerical scientific data. Segments show ordinal strength only and carry no percentages.</p>
    </div>
  );
}

export function FinalSynthesis() {
  return (
    <div className="od-final">
      <p className="od-final-big">Maybe The Odyssey is not timeless.<br /><em>Maybe it is renewable.</em></p>
      <p className="od-final-list">Its world changes.<br />Its translators change.<br />Its audiences change.<br />Its adaptations change.<br />The questions change.</p>
      <p className="od-final-p">The story survives partly because each generation can argue with it again.</p>
      <p className="od-final-s">Whether that makes The Odyssey personally relevant to you is a different question.</p>
      <p className="od-labrow"><Lab kind="inference">ThinkScope synthesis</Lab></p>
    </div>
  );
}

export function FaqList() {
  return <div className="od-faq">{FAQ.map((f) => <details key={f.q} className="mo"><summary>{f.q}</summary><p>{f.a}</p></details>)}</div>;
}

export function Sources({ children }: { children?: ReactNode }) {
  return (
    <div className="od-sources">
      {SOURCES.map((g) => <SrcList key={g.group} items={g.items} label={g.group} />)}
      {children}
    </div>
  );
}
