import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "AI & Methodology", description: "How ThinkScope compares AI systems: the difference between fact, interpretation and AI analysis, and the limits of AI-generated responses.", path: "/methodology" });

export default function Methodology() {
  return (
    <PageShell title="AI & Methodology" lede="What ThinkScope does, how to read it, and what it cannot tell you.">
      <h2>What ThinkScope does</h2>
      <p>ThinkScope puts the same question to several AI systems and shows their answers side by side, so readers can see where the systems agree, where they differ and how each frames the question.</p>
      <h2>How to read a ThinkScope page</h2>
      <ul>
        <li><b>Fact:</b> context that can be supported by reliable evidence, such as who is traditionally credited with a work.</li>
        <li><b>Interpretation:</b> a reasoned reading of that evidence. It is not settled fact.</li>
        <li><b>AI analysis:</b> what a specific AI system actually says in response to the question, or a comparison of those responses.</li>
      </ul>
      <h2>Limits of AI responses</h2>
      <p>AI-generated responses can be incomplete, biased or wrong, and they reflect how a question is framed. They are shown as perspectives. They should not be treated as factual authority, and they are not ranked or scored.</p>
      <h2>Which systems, which prompts, how responses are handled</h2>
      <p>The AI systems used for a question are named on that question&apos;s page. Where responses have not been published yet, the page says so and nothing is simulated.</p>
      <p className="todo">[To be completed by ThinkScope: whether identical prompts are used, how responses are collected and recorded, whether responses are edited, and how factual claims are checked.]</p>
    </PageShell>
  );
}
