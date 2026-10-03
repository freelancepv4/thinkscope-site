import Image from "next/image";
import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA } from "@/lib/data";

const PATH = "/questions/why-is-the-odyssey-still-relevant";
const CHIPS = [{ t: "3 AI perspectives", h: "#ai" }, { t: "Evidence test", h: "#evidence" }, { t: "Relevance map", h: "#map" }, { t: "6-stage journey", h: "#journey" }];

export default function FeaturedQuestion() {
  const m = MEDIA.odyssey;
  return (
    <article className="fq">
      <Image className="fqbg" src="/assets/images/odyssey-ithaca.webp" alt="" fill sizes="100vw" loading="lazy" />
      <span className="fqsh" aria-hidden="true" />
      <div className="fqt">
        <div className="eyebrow">Featured question · Literature · Culture</div>
        <h3><Link href={PATH}>What does AI think makes The Odyssey still relevant?</Link></h3>
        <p>An epic composed roughly 2,700 years ago is still taught, retold and adapted. What keeps it current?</p>
        <div className="chp">{CHIPS.map((c) => <Link key={c.t} href={`${PATH}${c.h}`}>{c.t}</Link>)}</div>
        <div className="fql">
          <Link href={PATH}>Explore comparison <span aria-hidden="true">→</span></Link>
          <Link href={`${PATH}#ai`}>See the perspectives <span aria-hidden="true">→</span></Link>
        </div>
        <p className="meta">Gemini, ChatGPT and Claude compared · Updated Oct 2, 2026</p>
      </div>
      <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="9/16" mode="inview" />
    </article>
  );
}
