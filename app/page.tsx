import Link from "next/link";
import FeaturedQuestion from "@/components/FeaturedQuestion";
import Globe from "@/components/Globe";
import QuestionCard from "@/components/QuestionCard";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA, QUESTIONS, TOPICS } from "@/lib/data";

export default function Home() {
  const m = MEDIA.home;
  const others = QUESTIONS.filter((q) => !q.href.includes("odyssey"));
  return (
    <main>
      <div className="hero hero2"><div className="w">
        <div>
          <div className="eyebrow">Multiple AI models. One question. Different perspectives.</div>
          <h1>AI thinking, compared.</h1>
          <p>Explore important questions through the reasoning of multiple AI systems, and see where they agree, differ, and surprise you.</p>
          <div className="cta">
            <Link className="btn p" href="/questions/why-is-the-odyssey-still-relevant/">Read the featured question</Link>
            <a className="btn g" href="#global">See the global view</a>
          </div>
        </div>
        <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="16/9" mode="sound" priority />
      </div></div>

      <section aria-labelledby="what"><div className="w">
        <h2 id="what">What is ThinkScope?</h2>
        <p className="sub">ThinkScope puts one question to several AI systems and lays their answers side by side: where they agree, where they differ, and what that suggests. AI responses are perspectives, not objective truth.</p>
      </div></section>

      <section id="global" className="dark" aria-labelledby="gt"><div className="w gw">
        <div><div className="eyebrow">Global thinking</div><h2 id="gt">Questions from across cultures, history and ideas</h2>
          <p className="sub">Drag the globe, or choose a region. Region pages will appear as questions are published.</p></div>
        <Globe />
      </div></section>

      <section id="questions" aria-labelledby="qh"><div className="w">
        <h2 id="qh">Questions worth thinking about</h2>
        <FeaturedQuestion />
        <div className="grid g3">{others.map((q) => <QuestionCard key={q.href} q={q} />)}</div>
      </div></section>

      <section id="topics" aria-labelledby="th"><div className="w">
        <h2 id="th">Explore by topic</h2>
        <p className="sub">Topic pages are coming as more questions are published.</p>
        <div className="cta">{TOPICS.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div></section>
    </main>
  );
}
