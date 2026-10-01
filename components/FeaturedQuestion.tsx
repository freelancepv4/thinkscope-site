import Link from "next/link";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA } from "@/lib/data";

const PATH = "/questions/why-is-the-odyssey-still-relevant";

export default function FeaturedQuestion() {
  const m = MEDIA.odyssey;
  return (
    <article className="fq">
      <div className="fqt">
        <div className="eyebrow">Featured question · Literature · Culture</div>
        <h3><Link href={PATH}>What does AI think makes The Odyssey still relevant?</Link></h3>
        <p>An epic composed roughly 2,700 years ago is still taught, retold and adapted. What keeps it current?</p>
        <p className="meta">Context and interpretation published. AI comparison coming soon.</p>
        <div className="fql">
          <Link href={PATH}>Explore comparison →</Link>
          <Link href={`${PATH}#ai`}>See the perspectives →</Link>
          <Link href={`${PATH}#t1`}>Why this matters →</Link>
        </div>
      </div>
      <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="9/16" mode="inview" />
    </article>
  );
}
