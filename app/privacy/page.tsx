import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Privacy Policy", description: "What personal data the ThinkScope website does and does not collect.", path: "/privacy", index: false });

export default function Privacy() {
  return (
    <PageShell title="Privacy Policy" lede="This page describes what the ThinkScope website does today. It will be updated if that changes.">
      <h2>What ThinkScope collects</h2>
      <p>The ThinkScope website does not use analytics, advertising or tracking tools, does not set cookies, does not store data in your browser, and has no accounts, forms or newsletter. Videos and images are served from the site itself.</p>
      <h2>Hosting</h2>
      <p>The site is hosted on Vercel. Like most web hosts, the hosting provider processes technical request data (such as IP address and browser type) to deliver the site and keep it secure. See Vercel&apos;s own privacy documentation for details.</p>
      <h2>Contact and controller details</h2>
      <p className="todo">[Name of the site operator and a contact email to be added by ThinkScope.]</p>
      <p>This page is a plain-language description of current practice, not legal advice.</p>
    </PageShell>
  );
}
