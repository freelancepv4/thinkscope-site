import PageShell from "@/components/PageShell";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({ title: "Cookie Policy", description: "Which cookies and browser storage the ThinkScope website uses.", path: "/cookies", index: false });

export default function Cookies() {
  return (
    <PageShell title="Cookie Policy" lede="Currently, none.">
      <p>The ThinkScope website does not set cookies and does not use localStorage, sessionStorage or similar browser storage. Because no non-essential technologies are used, there is no cookie banner.</p>
      <p>If analytics, advertising or embedded third-party services are added in the future, this page will be updated first and non-essential technologies will load only after consent is given.</p>
    </PageShell>
  );
}
