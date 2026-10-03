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
import { AICards, FaqList, FinalSynthesis, Continuum, Sources, Thesis, TwentySixTest } from "@/components/odyssey/Static";
import { AncientModern, ConvergenceChart, Counterarguments, Divergence, EvidenceTest, FilmVsPoem, QuestionMatrix, RelevanceMap, TimelessQuiz } from "@/components/odyssey/Interactive";
import { Head, Lab } from "@/components/odyssey/Primitives";
import { FAQ } from "@/lib/odyssey-compare";
import { REFLECTIONS } from "@/lib/odyssey";
import { QUESTION_PAGES, questionJsonLd, questionMetadata } from "@/lib/questions";

export const metadata = questionMetadata(QUESTION_PAGES[0]);

const NAV = [{ id: "overview", label: "Overview" }, { id: "themes", label: "Themes" }, { id: "journey", label: "Journey" }, { id: "ideas", label: "Ideas" }, { id: "ai", label: "Three AIs" }, { id: "agree", label: "Agreement" }, { id: "differ", label: "Differences" }, { id: "evidence", label: "Evidence" }, { id: "matrix", label: "Questions" }, { id: "ancient", label: "Ancient \u2260 Modern" }, { id: "test", label: "2026 Test" }, { id: "film", label: "Film vs Poem" }, { id: "map", label: "Map" }, { id: "choice", label: "Your view" }, { id: "universal", label: "Universal?" }, { id: "turn", label: "Your turn" }];
const img = (f: string, w: number, h: number, alt: string): Img => ({ src: `/assets/images/${f}`, w, h, alt });
const IMG = {
  voyage: img("odyssey-voyage.webp", 1376, 768, "A weathered traveler in a rough cloak stands at the rail of a wooden ship, looking toward distant mountains across calm water at sunrise"),
  disguise: img("odyssey-odysseus-disguise.webp", 1376, 768, "A weathered man in a patched cloak holding a wooden staff stands in a doorway while people feast at a long table behind him"),
  penelope: img("odyssey-penelope-loom.webp", 1200, 896, "A woman seated at a large wooden loom in a candlelit room, with an open door behind her showing the sea and islands at dusk"),
  ithaca: img("odyssey-ithaca.webp", 1376, 768, "A hillside village of stone houses above a small harbor with boats, under misty mountains and a sunset sky"),
  end: img("odyssey-ancient-and-modern.webp", 1376, 768, "Marble head and ruined temple on a Mediterranean shore, facing a modern lit town at dusk, with a reader standing on the rocks and an ancient scroll in the foreground"),
};

export default function OdysseyPage() {
  const m = MEDIA.odyssey;
  const q = QUESTION_PAGES[0];
  const faqLd = { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: FAQ.map((f) => ({ "@type": "Question", name: f.q, acceptedAnswer: { "@type": "Answer", text: f.a } })) };
  return (
    <main><article>
      <JsonLd data={questionJsonLd(q)} />
      <JsonLd data={faqLd} />
      <div className="qh" id="overview">
        <Image className="qhbg" src={IMG.voyage.src} alt="" fill priority sizes="100vw" />
        <div className="qhs" aria-hidden="true" />
        <div className="w"><Breadcrumbs items={[{ name: "ThinkScope", href: "/" }, { name: "Questions", href: "/#questions" }, { name: "Literature" }, { name: "The Odyssey" }]} /></div>
        <div className="w oh">
        <div>
          <div className="eyebrow">Literature · Culture</div>
          <h1>What Does AI Think Makes <i>The Odyssey</i> Still Relevant?</h1>
          <p className="od-hook">Is The Odyssey timeless, or just endlessly renewable?</p>
          <p className="od-hook2">Three AIs. One ancient story. One modern question.</p>
          <p className="lede sm"><Lab kind="fact" /> The Odyssey is an ancient Greek epic poem traditionally attributed to Homer, usually dated to around the 8th century BCE. It follows Odysseus on his long journey home to Ithaca after the Trojan War, and his wife Penelope and son Telemachus at home, where suitors have taken over the household.</p>
          <ul className="od-legend5" aria-label="How claims are labelled on this page">
            <li><Lab kind="fact" /></li><li><Lab kind="supported" /></li><li><Lab kind="ai" /></li><li><Lab kind="inference" /></li><li><Lab kind="uncertain" /></li>
          </ul>
          <p className="leg">Hover or focus a label to see its meaning. AI responses are perspectives, not proof.</p>
          <a className="scr" href="#themes">Scroll to begin ↓</a>
        </div>
        <VideoPlayer src={m.video} poster={m.poster} posterW={m.w} posterH={m.h} alt={m.alt} label={m.label} ratio="9/16" mode="sound" priority />
      </div></div>
      <SectionNav items={NAV} />
      <div className="w qb">
        <section id="themes" className="as" aria-labelledby="themes-h"><h2 id="themes-h">Why does a story this old still feel familiar?</h2><ThemeExplorer /></section>
        <section id="journey" className="as" aria-labelledby="journey-h"><h2 id="journey-h">Odysseus&apos; journey</h2><LiteraryJourney /></section>
        <div id="ideas">
          <ArticleSection id="t1" lenses="homecoming" tag="Interpretation" heading="Homecoming and the long way back" image={IMG.ithaca} caption="Ithaca, the island Odysseus is trying to reach. The image is imagined, not a depiction of the real place."
            more="In Greek, the word nostos means homecoming. One way to read the poem is as a question about what home asks of someone who has been changed by years away.">
            <p>Readers often see the poem as a story about what it takes to get home, and what home means after years away. This is an interpretation, not a settled reading.</p>
          </ArticleSection>
          <ArticleSection id="t2" lenses="identity psychology" tag="Interpretation" heading="Identity and disguise" image={IMG.disguise} caption="In the poem, Odysseus returns to his own hall disguised as a beggar."
            more="In the poem, the goddess Athena helps change his appearance. Readers often ask what recognition means when the people closest to you cannot see who you are.">
            <p>In the poem, Odysseus returns to Ithaca disguised and tests who is loyal before revealing himself. Questions of recognition, trust and who you are when no one knows you are a recurring reason people give for its relevance.</p>
          </ArticleSection>
          <ArticleSection id="t3" lenses="relationships psychology" tag="Interpretation" heading="Penelope and belonging" image={IMG.penelope} caption="Penelope is known in the poem for weaving, a delay tactic against the suitors."
            more="Late in the poem, Penelope tests her husband with a question about their bed. Readers often treat the scene as a counterpart to his disguise: she is testing him too.">
            <p>In the poem, Penelope delays the suitors by weaving a shroud by day and undoing it at night. Readers often cite her as an example of intelligence and endurance under pressure, and the household she holds together as a picture of belonging kept alive through absence.</p>
          </ArticleSection>
        </div>
        <section id="lens" className="as" aria-labelledby="lens-h"><h2 id="lens-h">How do you want to explore <i>The Odyssey</i>?</h2><LensSelector /></section>
      </div>

      <div className="od-w od-s" id="ai" role="region" aria-labelledby="ai-h">
        <Head id="ai" kicker="AI comparison" title="Three AIs. One Odyssey." sub="We asked Gemini, ChatGPT and Claude the same question independently. The interesting part is not simply where they agree. It is where their reasoning diverges." kind="ai" />
        <AICards />
        <p className="od-note">The three cards have equal weight, and their order is not a ranking. There are no scores or winner. How ThinkScope compares AI responses: <Link href="/methodology">AI &amp; Methodology</Link>.</p>
        <Thesis />
      </div>

      <div className="od-w od-s" id="agree" role="region" aria-labelledby="agree-h">
        <Head id="agree" kicker="Convergence" title="Where Do the AIs Agree?" sub="Three independent analyses repeatedly returned to several of the same ideas." kind="ai" />
        <ConvergenceChart />
      </div>

      <div className="od-w od-s" id="differ" role="region" aria-labelledby="differ-h">
        <Head id="differ" kicker="Divergence" title="Where Do They Disagree?" sub="Agreement Is Not the Whole Story" kind="ai" />
        <Divergence />
      </div>

      <div className="od-w od-s" id="evidence" role="region" aria-labelledby="evidence-h">
        <Head id="evidence" kicker="The evidence test" title="How Strong Is the Evidence?" sub="A Claude-style three-part test for how strong a connection between the poem and modern life really is. Choose a theme to run it." />
        <h3 className="od-big sm">How Strong Is the Connection?</h3>
        <EvidenceTest />
      </div>

      <div className="od-w od-s" id="matrix" role="region" aria-labelledby="matrix-h">
        <Head id="matrix" kicker="Ancient world, modern questions" title="Ancient World, Modern Questions" sub="Select a row. Each answer separates what the text says, what readers have made of it, where it breaks down and what the AIs said." />
        <QuestionMatrix />
        <p className="od-note">Badges: TEXT is what the poem says. INTERPRETATION is a reading, not a fact. AI INFERENCE comes from comparing the three analyses. UNCERTAIN marks limits, disputes or missing evidence.</p>
      </div>

      <div className="od-band od-night" id="ancient" role="region" aria-labelledby="ancient-h">
        <div className="od-w od-s">
          <figure className="od-banner"><Image src={IMG.end.src} alt={IMG.end.alt} fill sizes="(max-width: 1120px) 100vw, 1080px" loading="lazy" /><figcaption>Illustrative image, not a historical depiction.</figcaption></figure>
          <Head id="ancient" kicker="The most important distinction" title="Ancient ≠ Modern" kind="fact" />
          <p className="od-state">The Odyssey does not become relevant because ancient Greek life was the same as ours.</p>
          <AncientModern />
          <div className="od-synth">
            <p className="od-labrow"><Lab kind="inference">ThinkScope synthesis</Lab></p>
            <p className="q">What may travel across time are not necessarily the institutions, but the questions readers choose to ask of the story.</p>
          </div>
        </div>
      </div>

      <div className="od-band od-night" id="test" role="region" aria-labelledby="test-h" style={{ borderTop: "1px solid var(--line)" }}>
        <div className="od-w od-s">
          <Head id="test" kicker="The 2026 test" title="The 2026 Test" sub="Can an ancient story still command a modern audience?" />
          <p className="od-sub" style={{ marginBottom: 28, maxWidth: 720 }}>Christopher Nolan&apos;s film The Odyssey is a contemporary case study in attention. Figures below are as reported; they are not a measure of how many people found Homer relevant.</p>
          <TwentySixTest />
        </div>
      </div>

      <div className="od-w od-s" id="film" role="region" aria-labelledby="film-h">
        <Head id="film" kicker="Poem and film" title="Film vs Poem" sub="Select a category to compare the ancient text with press-reported choices in the 2026 adaptation." />
        <FilmVsPoem />
      </div>

      <div className="od-w od-s" id="map" role="region" aria-labelledby="map-h">
        <Head id="map" kicker="Relevance map" title="Relevance Map" sub="Nine ideas orbit the poem. Choose one to see the text, the interpretation, how strong the evidence is, what the AIs said and the best objection." />
        <RelevanceMap />
      </div>

      <div className="od-w od-s" id="choice" role="region" aria-labelledby="choice-h">
        <Head id="choice" kicker="Your view" title="Timeless or Renewable?" sub="After seeing the evidence, what keeps The Odyssey alive?" />
        <TimelessQuiz />
      </div>

      <div className="od-w od-s" id="continuum" role="region" aria-labelledby="continuum-h">
        <Head id="continuum" kicker="Evidence map" title="From Text to Interpretation" sub="How firmly each idea is anchored in the poem, and how far the modern parallel is the reader's own step." />
        <Continuum />
      </div>

      <div className="od-w od-s" id="universal" role="region" aria-labelledby="universal-h">
        <Head id="universal" kicker="Counterarguments" title="But Is It Really Universal?" sub="Seven reasons to be careful. Open any of them." />
        <Counterarguments />
      </div>

      <div className="od-band od-night" id="synth" role="region" aria-labelledby="synth-h">
        <div className="od-w od-s">
          <h2 id="synth-h" className="od-vh">Final synthesis</h2>
          <FinalSynthesis />
          <div className="od-turn" id="turn">
            <h2 id="turn-h">Your Turn</h2>
            <p className="od-final-s">Where do you stand? Try the questions below, or return to the choice above.</p>
            {REFLECTIONS.map((r) => <details key={r.q} className="mo"><summary>{r.q}</summary><p>{r.a}</p></details>)}
            <p className="cta"><a className="btn p" href="#choice">Revisit your view →</a><Link className="btn g" href="/#questions">Explore all questions →</Link></p>
          </div>
        </div>
      </div>

      <div className="od-w od-s" id="faq" role="region" aria-labelledby="faq-h">
        <Head id="faq" kicker="FAQ" title="Frequently Asked Questions" />
        <FaqList />
      </div>

      <div className="od-w od-s" id="sources" role="region" aria-labelledby="sources-h">
        <Head id="sources" kicker="Sources" title="Sources and method" sub="Factual claims link to their sources. Everything labelled Inference, AI analysis or Uncertain is not a sourced fact. Chart values are ThinkScope's coding, not external statistics." />
        <Sources />
        <p className="meta">Related: <Link href="/questions/east-of-eden-relevance">Is East of Eden still relevant in 2026?</Link>, another literary question compared across AI systems.</p>
        <p className="cta"><a className="btn p" href="/questions/east-of-eden-relevance">Explore another question →</a></p>
      </div>
    </article></main>
  );
}
