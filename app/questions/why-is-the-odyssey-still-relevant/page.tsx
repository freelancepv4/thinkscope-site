import type { Metadata } from "next";
import AIComparison from "@/components/AIComparison";
import ArticleSection from "@/components/ArticleSection";
import SectionNav from "@/components/SectionNav";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA, SITE_URL, type Img } from "@/lib/data";

const PATH = "/questions/why-is-the-odyssey-still-relevant/";
const TITLE = "Why Is the Odyssey Still Relevant?";
const DESC = "Homer's Odyssey is nearly three thousand years old. A ThinkScope look at the themes of homecoming, identity and patience that keep readers returning to it.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} | ThinkScope`, description: DESC, url: PATH, type: "article",
    images: [{ url: "/assets/images/og-odyssey.jpg", width: 1200, height: 630, alt: "Marble head and ruined temple on a Mediterranean shore facing a modern town at dusk" }] },
  twitter: { card: "summary_large_image" },
};

const NAV = [{ id: "overview", label: "Overview" }, { id: "t1", label: "Homecoming" }, { id: "t2", label: "Identity" }, { id: "t3", label: "Penelope" }, { id: "t4", label: "Ithaca" }, { id: "ai", label: "AI analysis" }];
const img = (f: string, w: number, h: number, alt: string): Img => ({ src: `/assets/images/${f}`, w, h, alt });
const IMG = {
  voyage: img("odyssey-voyage.webp", 1376, 768, "A weathered traveler in a rough cloak stands at the rail of a wooden ship, looking toward distant mountains across calm water at sunrise"),
  disguise: img("odyssey-odysseus-disguise.webp", 1376, 768, "A weathered man in a patched cloak holding a wooden staff stands in a doorway while people feast at a long table behind him"),
  penelope: img("odyssey-penelope-loom.webp", 1200, 896, "A woman seated at a large wooden loom in a candlelit room, with an open door behind her showing the sea and islands at dusk"),
  ithaca: img("odyssey-ithaca.webp", 1376, 768, "A hillside village of stone houses above a small harbor with boats, under misty mountains and a sunset sky"),
};

export default function OdysseyPage() {
  const m = MEDIA.odyssey;
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: TITLE, image: `${SITE_URL}/assets/images/og-odyssey.jpg`, datePublished: "2026-10-01", author: { "@type": "Organization", name: "ThinkScope" }, mainEntityOfPage: SITE_URL + PATH };
  return (
    <main><article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="qh" id="overview"><div className="w oh">
        <div>
          <div className="eyebrow">Literature · Culture</div>
          <h1>Why is the Odyssey still relevant?</h1>
          <p className="lede">An epic composed roughly 2,700 years ago is still taught, retold and adapted. Here is what keeps it current.</p>
          <p className="lede sm">The Odyssey is an ancient Greek epic poem traditionally attributed to Homer, usually dated to around the 8th century BCE. It follows Odysseus on his long journey home to Ithaca after the Trojan War, and his wife Penelope and son Telemachus at home, where suitors have taken over the household.</p>
        </div>
        <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="9/16" mode="sound" priority />
      </div></div>
      <SectionNav items={NAV} />
      <div className="w qb">
        <ArticleSection id="t1" tag="Interpretation" heading="Homecoming and the long way back" image={IMG.voyage} caption="The voyage: the poem is as much about the return as about the destination."
          more="In Greek, the word nostos means homecoming. One way to read the poem is as a question about what home asks of someone who has been changed by years away.">
          <p>Readers often see the poem as a story about what it takes to get home, and what home means after years away. This is an interpretation, not a settled reading.</p>
        </ArticleSection>
        <ArticleSection id="t2" tag="Interpretation" heading="Identity and disguise" image={IMG.disguise} caption="In the poem, Odysseus returns to his own hall disguised as a beggar."
          more="In the poem, the goddess Athena helps change his appearance. Readers often ask what recognition means when the people closest to you cannot see who you are.">
          <p>In the poem, Odysseus returns to Ithaca disguised and tests who is loyal before revealing himself. Questions of recognition, trust and who you are when no one knows you are a recurring reason people give for its relevance.</p>
        </ArticleSection>
        <ArticleSection id="t3" tag="Interpretation" heading="Penelope and patience" image={IMG.penelope} caption="Penelope is known in the poem for weaving, a delay tactic against the suitors."
          more="Late in the poem, Penelope tests her husband with a question about their bed. Readers often treat the scene as a counterpart to his disguise: she is testing him too.">
          <p>In the poem, Penelope delays the suitors by weaving a shroud by day and undoing it at night. Readers often cite her as an example of intelligence and endurance under pressure.</p>
        </ArticleSection>
        <ArticleSection id="t4" tag="Context" heading="Ithaca" image={IMG.ithaca} caption="Ithaca is the island Odysseus is trying to reach. The image is imagined, not a depiction of the real place." />
        <section id="ai" className="qa" aria-labelledby="ai-h">
          <span className="tag">AI analysis</span><h2 id="ai-h">How different AI systems answer</h2>
          <p>Three perspectives will appear here when they are published.</p>
          <AIComparison />
          <p><a className="btn g" href="/questions/east-of-eden-relevance/index.html">See a finished comparison: East of Eden</a></p>
        </section>
        <section aria-labelledby="rel"><h2 id="rel">Continue exploring</h2>
          <p><a href="/questions/east-of-eden-relevance/index.html">Can a 1952 novel still understand us in 2026?</a></p></section>
      </div>
    </article></main>
  );
}
