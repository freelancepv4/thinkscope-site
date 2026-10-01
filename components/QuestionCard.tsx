import Image from "next/image";
import type { Question } from "@/lib/data";

export default function QuestionCard({ q }: { q: Question }) {
  return (
    <a className="qc2" href={q.href}>
      <Image className="qbg" src={q.image.src} alt="" fill sizes="100vw" loading="lazy" />
      <span className="qsh" aria-hidden="true" />
      <span className="qp"><Image src={q.image.src} width={q.image.w} height={q.image.h} alt={q.image.alt} sizes="(max-width: 600px) 150px, 200px" loading="lazy" /></span>
      <span className="qt">
        <span className="eyebrow">{q.categories.join(" · ")}</span>
        <h3>{q.title}</h3>
        <p>{q.blurb}</p>
        {q.chips && <span className="chp">{q.chips.map((c) => <span key={c}>{c}</span>)}</span>}
        <span className="qcc">{q.cta ?? "Explore question"} <span aria-hidden="true">→</span></span>
        <span className="meta">{q.meta}</span>
      </span>
    </a>
  );
}
