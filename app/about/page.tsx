import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "About ThinkScope", description: "ThinkScope is an editorial platform that explores important questions by comparing how different AI systems interpret literature, culture, history, philosophy and modern life.", path: "/about" });

export default function About() {
  return (
    <PageShell title="About ThinkScope" lede="An editorial platform that explores important questions by comparing how different AI systems approach them.">
      <p>Each ThinkScope question starts with context, then shows how different AI systems reason about it, where their answers converge, where they diverge, and what that comparison makes visible. The goal is not to find one correct answer, but to help readers think.</p>
      <p>ThinkScope separates <b>fact</b>, <b>interpretation</b> and <b>AI analysis</b> so readers can see what kind of claim they are reading. See <a href="/methodology">AI &amp; Methodology</a> for details.</p>
      <h2>Who is behind ThinkScope</h2>
      <p className="todo">[Information about the team or publisher to be added by ThinkScope.]</p>
      <p>Questions or corrections: see <a href="/contact">Contact</a>.</p>
    </PageShell>
  );
}
