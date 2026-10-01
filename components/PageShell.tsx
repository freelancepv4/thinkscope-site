import type { ReactNode } from "react";
import Breadcrumbs from "@/components/Breadcrumbs";

export default function PageShell({ title, lede, children }: { title: string; lede?: string; children: ReactNode }) {
  return (
    <main>
      <div className="qh"><div className="w"><Breadcrumbs items={[{ name: "ThinkScope", href: "/" }, { name: title }]} />
        <h1>{title}</h1>{lede && <p className="lede">{lede}</p>}</div></div>
      <div className="w qb prose">{children}</div>
    </main>
  );
}
