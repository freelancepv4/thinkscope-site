import type { Metadata } from "next";
import Image from "next/image";
import { SITE_URL, type Img } from "@/lib/data";

const PATH = "/questions/why-is-the-odyssey-still-relevant/";
const TITLE = "Why Is the Odyssey Still Relevant?";
const DESC = "Homer's Odyssey is nearly three thousand years old. A ThinkScope look at the themes of homecoming, identity and patience that keep readers returning to it.";

export const metadata: Metadata = {
  title: TITLE, description: DESC, alternates: { canonical: PATH },
  openGraph: { title: `${TITLE} | ThinkScope`, description: DESC, url: PATH, type: "article",
    images: [{ url: "/assets/images/og-odyssey.jpg", width: 1200, height: 630, alt: "Marble head and ruined temple on a Mediterranean shore facing a modern town at dusk" }] },
  twitter: { card: "summary_large_image" },
};

interface Section { id: string; tag: "Context" | "Interpretation"; heading: string; image?: Img; caption?: string; body?: string }
const hero: Img = { src: "/assets/images/odyssey-ancient-and-modern.webp", w: 1376, h: 768, alt: "Marble head and ruined temple on a Mediterranean shore, facing a modern lit town at dusk, with a reader standing on the rocks and an ancient scroll in the foreground" };

const SECTIONS: Section[] = [
  { id: "ctx", tag: "Context", heading: "What the Odyssey is", body: "The Odyssey is an ancient Greek epic poem traditionally attributed to Homer, usually dated to around the 8th century BCE. It follows Odysseus on his long journey home to Ithaca after the Trojan War, and his wife Penelope and son Telemachus at home, where suitors have taken over the household." },
  { id: "t1", tag: "Interpretation", heading: "Homecoming and the long way back", image: { src: "/assets/images/odyssey-voyage.webp", w: 1376, h: 768, alt: "A weathered traveler in a rough cloak stands at the rail of a wooden ship, looking toward distant mountains across calm water at sunrise" }, caption: "The voyage: the poem is as much about the return as about the destination.", body: "Readers often see the poem as a story about what it takes to get home, and what home means after years away. This is an interpretation, not a settled reading." },
  { id: "t2", tag: "Interpretation", heading: "Identity and disguise", image: { src: "/assets/images/odyssey-odysseus-disguise.webp", w: 1376, h: 768, alt: "A weathered man in a patched cloak holding a wooden staff stands in a doorway while people feast at a long table behind him" }, caption: "In the poem, Odysseus returns to his own hall disguised as a beggar.", body: "In the poem, Odysseus returns to Ithaca disguised and tests who is loyal before revealing himself. Questions of recognition, trust and who you are when no one knows you are a recurring reason people give for its relevance." },
  { id: "t3", tag: "Interpretation", heading: "Penelope and patience", image: { src: "/assets/images/odyssey-penelope-loom.webp", w: 1200, h: 896, alt: "A woman seated at a large wooden loom in a candlelit room, with an open door behind her showing the sea and islands at dusk" }, caption: "Penelope is known in the poem for weaving, a delay tactic against the suitors.", body: "In the poem, Penelope delays the suitors by weaving a shroud by day and undoing it at night. Readers often cite her as an example of intelligence and endurance under pressure." },
  { id: "t4", tag: "Context", heading: "Ithaca", image: { src: "/assets/images/odyssey-ithaca.webp", w: 1376, h: 768, alt: "A hillside village of stone houses above a small harbor with boats, under misty mountains and a sunset sky" }, caption: "Ithaca is the island Odysseus is trying to reach. The image is imagined, not a depiction of the real place." },
];

function Fig({ img, caption, priority }: { img: Img; caption?: string; priority?: boolean }) {
  return (
    <figure className="qf">
      <Image src={img.src} width={img.w} height={img.h} alt={img.alt} priority={priority} sizes="(max-width: 800px) 100vw, 760px" />
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}

export default function OdysseyPage() {
  const jsonLd = { "@context": "https://schema.org", "@type": "Article", headline: TITLE, image: `${SITE_URL}/assets/images/og-odyssey.jpg`, datePublished: "2026-10-01", author: { "@type": "Organization", name: "ThinkScope" }, mainEntityOfPage: SITE_URL + PATH };
  return (
    <main><article>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <div className="qh"><div className="w">
        <div className="eyebrow">Literature · Culture</div>
        <h1>Why is the Odyssey still relevant?</h1>
        <p className="lede">An epic composed roughly 2,700 years ago is still taught, retold and adapted. Here is what keeps it current.</p>
      </div></div>
      <div className="w qb">
        <Fig img={hero} caption="Illustrative image, not a historical depiction." priority />
        {SECTIONS.map((s) => (
          <section key={s.id} aria-labelledby={s.id}>
            <span className="tag">{s.tag}</span><h2 id={s.id}>{s.heading}</h2>
            {s.image && <Fig img={s.image} caption={s.caption} />}
            {s.body && <p>{s.body}</p>}
          </section>
        ))}
        <section className="qa" aria-labelledby="ai">
          <span className="tag">AI analysis</span><h2 id="ai">How different AI systems answer</h2>
          <p>The side-by-side AI responses for this question have not been published yet. When they are, this section will show each model&apos;s answer, where they agree, where they differ, and a ThinkScope comparison. Nothing here is generated or simulated in the meantime.</p>
          <p><a className="btn g" href="/questions/east-of-eden-relevance/index.html">See a finished comparison: East of Eden</a></p>
        </section>
      </div>
    </article></main>
  );
}
