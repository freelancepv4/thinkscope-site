"use client";
import { useState } from "react";
import { THEMES } from "@/lib/odyssey";

export default function ThemeExplorer() {
  const [open, setOpen] = useState<string | null>(null);
  const cur = THEMES.find((t) => t.id === open);
  return (
    <div>
      <div className="te" role="group" aria-label="Themes">
        {THEMES.map((t) => <button key={t.id} type="button" aria-expanded={open === t.id} aria-controls="te-p" onClick={() => setOpen(open === t.id ? null : t.id)}>{t.label}</button>)}
      </div>
      <div id="te-p" className="tep" aria-live="polite">{cur ? <><span className="tag">Interpretation</span><p>{cur.text}</p></> : <p className="meta">Choose a theme.</p>}</div>
    </div>
  );
}
