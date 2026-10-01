"use client";
import { useState } from "react";

export interface ModelAnswer { model: string; text: string }
export interface Comparison { answers: ModelAnswer[]; agree: string[]; differ: string[]; analysis: string }

const PLACEHOLDERS = ["Model A", "Model B", "Model C"];

export default function AIComparison({ data }: { data?: Comparison }) {
  const [tab, setTab] = useState(0);
  if (!data || data.answers.length === 0) {
    return (
      <div>
        <div className="aic">{PLACEHOLDERS.map((m) => <div key={m} className="aip on aie"><b>{m}</b><span>Coming soon</span></div>)}</div>
        <p className="aino">No AI responses have been published for this question yet. Nothing here is generated or simulated.</p>
      </div>
    );
  }
  return (
    <div>
      <div className="ait" role="tablist" aria-label="AI models">
        {data.answers.map((a, i) => <button key={a.model} role="tab" type="button" aria-selected={tab === i} onClick={() => setTab(i)}>{a.model}</button>)}
      </div>
      <div className="aic">{data.answers.map((a, i) => <div key={a.model} role="tabpanel" className={`aip${tab === i ? " on" : ""}`}><span className="tag">AI response</span><b>{a.model}</b><p>{a.text}</p></div>)}</div>
      <h3>Where they agree</h3><ul>{data.agree.map((t) => <li key={t}>{t}</li>)}</ul>
      <h3>Where they differ</h3><ul>{data.differ.map((t) => <li key={t}>{t}</li>)}</ul>
      <h3>ThinkScope analysis</h3><p>{data.analysis}</p>
    </div>
  );
}
