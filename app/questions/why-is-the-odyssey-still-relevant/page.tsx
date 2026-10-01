import AIComparison from "@/components/AIComparison";
import ArticleSection from "@/components/ArticleSection";
import Breadcrumbs from "@/components/Breadcrumbs";
import Image from "next/image";
import JsonLd from "@/components/JsonLd";
import LensSelector from "@/components/LensSelector";
import Link from "next/link";
import LiteraryJourney from "@/components/LiteraryJourney";
import SectionNav from "@/components/SectionNav";
import ThemeExplorer from "@/components/ThemeExplorer";
import VideoPlayer from "@/components/VideoPlayer";
import { MEDIA, type Img } from "@/lib/data";
import { REFLECTIONS } from "@/lib/odyssey";
import { QUESTION_PAGES, questionJsonLd, questionMetadata } from "@/lib/questions";

export const metadata = questionMetadata(QUESTION_PAGES[0]);

const NAV = [{ id: "overview", label: "Overview" }, { id: "themes", label: "Themes" }, { id: "journey", label: "Journey" }, { id: "ideas", label: "Ideas" }, { id: "ai", label: "AI comparison" }, { id: "agree", label: "Agreement" }, { id: "differ", label: "Differences" }, { id: "synth", label: "ThinkScope" }, { id: "explore", label: "Explore" }];
const img = (f: string, w: number, h: number, alt: string): Img => ({ src: `/assets/images/${f}`, w, h, alt });
const IMG = {
  voyage: img("odyssey-voyage.webp", 1376, 768, "A weathered traveler in a rough cloak stands at the rail of a wooden ship, looking toward distant mountains across calm water at sunrise"),
  disguise: img("odyssey-odysseus-disguise.webp", 1376, 768, "A weathered man in a patched cloak holding a wooden staff stands in a doorway while people feast at a long table behind him"),
  penelope: img("odyssey-penelope-loom.webp", 1200, 896, "A woman seated at a large wooden loom in a candlelit room, with an open door behind her showing the sea and islands at dusk"),
  ithaca: img("odyssey-ithaca.webp", 1376, 768, "A hillside village of stone houses above a small harbor with boats, under misty mountains and a sunset sky"),
  end: img("odyssey-ancient-and-modern.webp", 1376, 768, "Marble head and ruined temple on a Mediterranean shore, facing a modern lit town at dusk, with a reader standing on the rocks and an ancient scroll in the foreground"),
};

function Pending({ id, title, children }: { id: string; title: string; children: string }) {
  return (
    <section id={id} className="qa as" aria-labelledby={`${id}-h`}>
      <span className="tag">AI analysis</span><h2 id={`${id}-h`}>{title}</h2>
      <p className="aino">{children}</p>
    </section>
  );
}

export default function OdysseyPage() {
  const m = MEDIA.odyssey;
  const q = QUESTION_PAGES[0];
  return (
    <main><article>
      <JsonLd data={questionJsonLd(q)} />
      <div className="qh" id="overview">
        <Image className="qhbg" src={IMG.ithaca.src} alt="" fill priority sizes="100vw" />
        <div className="qhs" aria-hidden="true" />
        <div className="w"><Breadcrumbs items={[{ name: "ThinkScope", href: "/" }, { name: "Questions", href: "/#questions" }, { name: "Literature" }, { name: "The Odyssey" }]} /></div>
        <div className="w oh">
        <div>
          <div className="eyebrow">Literature · Culture</div>
          <h1>What does AI think makes <i>The Odyssey</i> still relevant to audiences today?</h1>
          <p className="lede">One ancient story. Multiple AI perspectives. One question about why it still matters.</p>
          <p className="lede sm"><span className="tag">Fact</span> The Odyssey is an ancient Greek epic poem traditionally attributed to Homer, usually dated to around the 8th century BCE. It follows Odysseus on his long journey home to Ithaca after the Trojan War, and his wife Penelope and son Telemachus at home, where suitors have taken over the household.</p>
          <p className="leg"><b>Fact</b> established context · <b>Interpretation</b> a reading, not settled · <b>AI analysis</b> what a specific AI system says. AI responses are perspectives, not proof.</p>
          <a className="scr" href="#themes">Scroll to begin ↓</a>
        </div>
        <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="9/16" mode="sound" priority />
      </div></div>
      <SectionNav items={NAV} />
      <div className="w qb">
        <section id="themes" className="as" aria-labelledby="themes-h"><h2 id="themes-h">Why does a story this old still feel familiar?</h2><ThemeExplorer /></section>
        <section id="journey" className="as" aria-labelledby="journey-h"><h2 id="journey-h">Odysseus&apos; journey</h2><LiteraryJourney /></section>
        <div id="ideas">
          <ArticleSection id="t1" lenses="homecoming" tag="Interpretation" heading="Homecoming and the long way back" image={IMG.voyage} caption="The voyage: the poem is as much about the return as about the destination."
            more="In Greek, the word nostos means homecoming. One way to read the poem is as a question about what home asks of someone who has been changed by years away.">
            <p>Readers often see the poem as a story about what it takes to get home, and what home means after years away. This is an interpretation, not a settled reading.</p>
          </ArticleSection>
          <ArticleSection id="t2" lenses="identity psychology" tag="Interpretation" heading="Identity and disguise" image={IMG.disguise} caption="In the poem, Odysseus returns to his own hall disguised as a beggar."
            more="In the poem, the goddess Athena helps change his appearance. Readers often ask what recognition means when the people closest to you cannot see who you are.">
            <p>In the poem, Odysseus returns to Ithaca disguised and tests who is loyal before revealing himself. Questions of recognition, trust and who you are when no one knows you are a recurring reason people give for its relevance.</p>
          </ArticleSection>
          <ArticleSection id="t3" lenses="relationships psychology" tag="Interpretation" heading="Penelope and patience" image={IMG.penelope} caption="Penelope is known in the poem for weaving, a delay tactic against the suitors."
            more="Late in the poem, Penelope tests her husband with a question about their bed. Readers often treat the scene as a counterpart to his disguise: she is testing him too.">
            <p>In the poem, Penelope delays the suitors by weaving a shroud by day and undoing it at night. Readers often cite her as an example of intelligence and endurance under pressure.</p>
          </ArticleSection>
          <ArticleSection id="t4" lenses="homecoming" tag="Fact" heading="Ithaca" image={IMG.ithaca} caption="Ithaca is the island Odysseus is trying to reach. The image is imagined, not a depiction of the real place." />
        </div>
        <section id="ai" className="qa as" aria-labelledby="ai-h">
          <span className="tag">AI analysis</span><h2 id="ai-h">Three AI systems. One question.</h2>
          <p>Each system is given the same question and its answer is shown as written. No ranking, no scores.</p>
          <AIComparison />
          <p className="meta">How ThinkScope compares AI responses: <Link href="/methodology">AI &amp; Methodology</Link>.</p>
        </section>
        <Pending id="agree" title="Where the AI responses converge">This map of shared themes is built only from the published responses, so it appears once they are added.</Pending>
        <Pending id="differ" title="Where the AI responses diverge">Differences are shown only where the published responses actually differ, so this section appears once they are added.</Pending>
        <Pending id="synth" title="What the comparison reveals">A neutral synthesis of what becomes visible when the same question is given to several AI systems will be written from the real responses.</Pending>
        <section id="lens" className="as" aria-labelledby="lens-h"><h2 id="lens-h">How do you want to explore <i>The Odyssey</i>?</h2><LensSelector /></section>
        <section id="explore" className="as" aria-labelledby="ask-h"><h2 id="ask-h">Now ask yourself</h2>
          {REFLECTIONS.map((r) => <details key={r.q} className="mo"><summary>{r.q}</summary><p>{r.a}</p></details>)}
        </section>
        <figure className="qf"><Image src={IMG.end.src} width={IMG.end.w} height={IMG.end.h} alt={IMG.end.alt} sizes="(max-width: 800px) 100vw, 760px" loading="lazy" /><figcaption>Illustrative image, not a historical depiction.</figcaption></figure>
        <section aria-labelledby="end-h"><h2 id="end-h">One ancient story. Many interpretations.</h2>
          <p className="lede">The value of comparing AI responses isn&apos;t finding one &ldquo;correct&rdquo; answer. It&apos;s seeing how different systems frame the same question, and deciding what those differences make us notice.</p>
          <p className="meta">Related: <Link href="/questions/east-of-eden-relevance">Is East of Eden still relevant in 2026?</Link>, another literary question compared across AI systems.</p>
          <p className="cta"><a className="btn p" href="/questions/east-of-eden-relevance">Explore another question →</a><Link className="btn g" href="/#questions">Explore all questions →</Link></p></section>
      </div>
    </article></main>
  );
}
