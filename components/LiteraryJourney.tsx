"use client";
import Image from "next/image";
import { useState } from "react";
import { JOURNEY } from "@/lib/odyssey";

export default function LiteraryJourney() {
  const [i, setI] = useState(0);
  const s = JOURNEY[i];
  return (
    <div className="lj">
      <ol className="ljs" aria-label="Stages of the journey">
        {JOURNEY.map((j, k) => <li key={j.id}><button type="button" aria-current={i === k ? "step" : undefined} onClick={() => setI(k)}><span>{k + 1}</span>{j.name}</button></li>)}
      </ol>
      <div className="ljp" aria-live="polite">
        {s.image && <Image src={s.image.src} width={s.image.w} height={s.image.h} alt={s.image.alt} sizes="(max-width: 800px) 100vw, 360px" />}
        <div><span className="tag">Story</span><h3>{s.name}</h3><p>{s.text}</p>
          <p><span className="tag">Interpretation</span> Theme: {s.theme}</p></div>
      </div>
      <p className="meta">A literary journey, not a geographic map.</p>
    </div>
  );
}
