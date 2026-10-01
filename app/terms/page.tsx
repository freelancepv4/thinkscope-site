import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Terms of Use", description: "Terms for using the ThinkScope website.", path: "/terms", index: false });

export default function Terms() {
  return (
    <PageShell title="Terms of Use" lede="ThinkScope is an independent editorial publication.">
      <p>ThinkScope publishes articles that compare responses from AI systems. Content is provided for general information and reflection. AI-generated responses are perspectives, not professional, legal, medical or financial advice, and are not guaranteed to be accurate.</p>
      <p>ThinkScope is independent and not affiliated with any AI company, studio or streaming service named on the site. Names and works mentioned belong to their respective owners.</p>
      <p className="todo">[Further terms (ownership, permitted use, governing law) to be added by ThinkScope with appropriate advice.]</p>
    </PageShell>
  );
}
