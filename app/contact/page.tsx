import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Contact ThinkScope", description: "How to contact ThinkScope with questions, corrections or feedback about its AI comparison articles.", path: "/contact" });

export default function Contact() {
  return (
    <PageShell title="Contact" lede="Questions, corrections and feedback are welcome.">
      <p className="todo">[Contact email address to be added by ThinkScope. No contact details have been published yet.]</p>
      <p>ThinkScope does not currently provide a contact form, so nothing you type on this site is collected.</p>
    </PageShell>
  );
}
