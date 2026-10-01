import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/next";
import JsonLd from "@/components/JsonLd";
import { siteJsonLd } from "@/lib/seo";
import { DEFAULT_LOCALE, SITE_DESCRIPTION, SITE_NAME, SITE_TITLE, SITE_URL } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: SITE_TITLE, template: "%s | ThinkScope" },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  icons: { icon: "/favicon.svg", apple: "/apple-touch-icon.png" },
};
export const viewport: Viewport = { themeColor: "#0a0e1a", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang={DEFAULT_LOCALE}>
      <body>
        <JsonLd data={siteJsonLd()} />
        <header><div className="w"><nav aria-label="Primary">
          <Link className="logo" href="/">Think<i>Scope</i></Link>
          <div className="l">
            <a href="/#questions">Questions</a><a href="/#topics">Topics</a>
            <Link href="/questions/why-is-the-odyssey-still-relevant">Odyssey</Link>
            <a href="/questions/east-of-eden-relevance">East of Eden</a>
          </div></nav></div></header>
        {children}
        <footer className="qfoot"><div className="w">
          <ul className="ft" aria-label="Footer">
            <li><Link href="/about">About</Link></li><li><Link href="/methodology">AI &amp; Methodology</Link></li><li><Link href="/contact">Contact</Link></li>
            <li><Link href="/privacy">Privacy Policy</Link></li><li><Link href="/cookies">Cookie Policy</Link></li><li><Link href="/terms">Terms of Use</Link></li>
          </ul>
          © ThinkScope. Independent platform; not affiliated with any AI company, studio or streaming service. AI outputs are perspectives, not objective truth.</div></footer>
        <Analytics />
      </body>
    </html>
  );
}
