import Link from "next/link";
import JsonLd from "@/components/JsonLd";
import { breadcrumbJsonLd, type Crumb } from "@/lib/seo";

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  return (
    <nav className="bc" aria-label="Breadcrumb">
      <ol>{items.map((c, i) => <li key={c.name}>{c.href ? (c.href.includes("#") ? <a href={c.href}>{c.name}</a> : <Link href={c.href}>{c.name}</Link>) : <span aria-current="page">{c.name}</span>}{i < items.length - 1 && <span aria-hidden="true"> / </span>}</li>)}</ol>
      <JsonLd data={breadcrumbJsonLd(items)} />
    </nav>
  );
}
