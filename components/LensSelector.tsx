"use client";
import { useState } from "react";
import { LENSES } from "@/lib/odyssey";

export default function LensSelector() {
  const [on, setOn] = useState<string | null>(null);
  const pick = (id: string) => {
    const next = on === id ? null : id; setOn(next);
    const a = document.querySelector("article");
    if (next) a?.setAttribute("data-lens", next); else a?.removeAttribute("data-lens");
  };
  const cur = LENSES.find((l) => l.id === on);
  return (
    <div>
      <div className="te" role="group" aria-label="Lenses">
        {LENSES.map((l) => <button key={l.id} type="button" aria-pressed={on === l.id} onClick={() => pick(l.id)}>{l.label}</button>)}
      </div>
      <p className="tep" aria-live="polite">{cur ? cur.note : "Choose a lens to highlight the related sections of the article."}</p>
    </div>
  );
}
