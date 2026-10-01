import type { Metadata, Viewport } from "next";
import Link from "next/link";
import type { ReactNode } from "react";
import { SITE_URL } from "@/lib/data";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: "ThinkScope: AI thinking, compared", template: "%s | ThinkScope" },
  description: "ThinkScope explores important questions by comparing how different AI systems reason about them.",
  icons: { icon: "/favicon.svg" },
  openGraph: { siteName: "ThinkScope", type: "website" },
};
export const viewport: Viewport = { themeColor: "#0a0e1a", width: "device-width", initialScale: 1, viewportFit: "cover" };

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header><div className="w"><nav aria-label="Primary">
          <Link className="logo" href="/">Think<i>Scope</i></Link>
          <div className="l">
            <a href="/#questions">Questions</a><a href="/#topics">Topics</a>
            <Link href="/questions/why-is-the-odyssey-still-relevant/">Odyssey</Link>
            <a href="/questions/east-of-eden-relevance/index.html">East of Eden</a>
          </div></nav></div></header>
        {children}
        <footer className="qfoot"><div className="w">© ThinkScope. Independent platform; not affiliated with any AI company, studio or streaming service. AI outputs are perspectives, not objective truth.</div></footer>
      </body>
    </html>
  );
}
