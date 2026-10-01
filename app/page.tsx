import type { Metadata } from "next";
import Link from "next/link";
import FeaturedQuestion from "@/components/FeaturedQuestion";
import Globe from "@/components/Globe";
import QuestionCard from "@/components/QuestionCard";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA, QUESTIONS, TOPICS } from "@/lib/data";
import { pageMetadata } from "@/lib/seo";
import { SITE_DESCRIPTION, SITE_TITLE } from "@/lib/site";

export const metadata: Metadata = {
  ...pageMetadata({ title: SITE_TITLE, description: SITE_DESCRIPTION, path: "/", image: { src: "/assets/images/og-home.jpg", w: 1200, h: 630, alt: "ThinkScope: an open book, old notes and floating panels of AI analysis on a dark desk" } }),
  title: { absolute: SITE_TITLE },
};

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
            <Link className="btn p" href="/questions/why-is-the-odyssey-still-relevant">Read the featured question</Link>
            <a className="btn g" href="#global">See the global view</a>
          </div>
        </div>
        <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="16/9" mode="sound" priority />
      </div></div>

      <section aria-labelledby="what"><div className="w">
        <h2 id="what">What is ThinkScope?</h2>
        <p className="sub">ThinkScope puts one question to several AI systems and lays their answers side by side: where they agree, where they differ, and what that suggests. AI responses are perspectives, not objective truth. <Link href="/methodology">How the comparison works</Link> · <Link href="/about">About ThinkScope</Link></p>
      </div></section>

      <section id="global" className="dark" aria-labelledby="gt"><div className="w gw">
        <div><div className="eyebrow">Global thinking</div><h2 id="gt">Questions from across cultures, history and ideas</h2>
          <p className="sub">Drag the globe, or choose a region. Region pages will appear as questions are published.</p></div>
        <Globe />
      </div></section>

      <section id="questions" aria-labelledby="qh"><div className="w">
        <h2 id="qh">Questions worth thinking about</h2>
        <FeaturedQuestion />
        <div className="qcw">{others.map((q) => <QuestionCard key={q.href} q={q} />)}</div>
      </div></section>

      <section id="topics" aria-labelledby="th"><div className="w">
        <h2 id="th">Explore by topic</h2>
        <p className="sub">Topic pages are coming as more questions are published.</p>
        <div className="cta">{TOPICS.map((t) => <span key={t} className="tag">{t}</span>)}</div>
      </div></section>
    </main>
  );
}
