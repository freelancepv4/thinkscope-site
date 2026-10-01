import Image from "next/image";
import type { Question } from "@/lib/data";

export default function QuestionCard({ q }: { q: Question }) {
  return (
    <a className="card fc qc" href={q.href}>
      <span className="qci"><Image src={q.image.src} width={q.image.w} height={q.image.h} alt={q.image.alt} sizes="(max-width: 800px) 100vw, 33vw" /></span>
      <div className="eyebrow">{q.categories.join(" · ")}</div>
      <h3>{q.title}</h3><p>{q.blurb}</p><div className="meta">{q.meta}</div>
      <span className="qcc">Explore question →</span>
    </a>
  );
}
