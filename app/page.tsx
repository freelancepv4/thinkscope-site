import Image from "next/image";
import Link from "next/link";
import VideoHero from "@/components/VideoHero";
import { QUESTIONS, TOPICS } from "@/lib/data";

export default function Home() {
  return (
    <main>
      <div className="hero"><div className="w">
        <div>
          <div className="eyebrow">Multiple AI models. One question. Different perspectives.</div>
          <h1>AI thinking, compared.</h1>
          <p>Explore important questions through the reasoning of multiple AI systems, and see where they agree, differ, and surprise you.</p>
          <div className="cta">
            <Link className="btn p" href="/questions/why-is-the-odyssey-still-relevant/">Read the featured question</Link>
            <a className="btn g" href="#topics">Explore topics</a>
          </div>
        </div>
        <VideoHero />
      </div></div>

      <section id="questions" aria-labelledby="qh"><div className="w">
        <h2 id="qh">Questions worth thinking about</h2>
        <p className="sub">Each question is explored by comparing how different AI systems reason about it.</p>
        <div className="grid g3">
          {QUESTIONS.map((q) => (
            <a key={q.href} className="card fc" href={q.href}>
              <Image src={q.image.src} width={q.image.w} height={q.image.h} alt={q.image.alt} sizes="(max-width: 800px) 100vw, 33vw" />
              {q.categories.map((c) => <span key={c} className="tag">{c} </span>)}
              <h3>{q.title}</h3><p>{q.blurb}</p><div className="meta">{q.meta}</div>
            </a>
          ))}
        </div>
      </div></section>

      <section id="topics" aria-labelledby="th"><div className="w">
        <h2 id="th">Explore by topic</h2>
        <p className="sub">Topic pages are coming as more questions are published.</p>
        <div className="cta">{TOPICS.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div></section>
    </main>
  );
}
