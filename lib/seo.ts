import type { Metadata } from "next";
import { ORG_DESCRIPTION, LOGO_PATH, SAME_AS, SITE_NAME, SITE_URL, abs, alternatesFor } from "./site";

export const ORG_ID = `${SITE_URL}/#organization`;
export const WEB_ID = `${SITE_URL}/#website`;

export interface Crumb { name: string; href?: string }

export function siteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { "@type": "Organization", "@id": ORG_ID, name: SITE_NAME, url: `${SITE_URL}/`, description: ORG_DESCRIPTION,
        ...(LOGO_PATH ? { logo: abs(LOGO_PATH) } : {}), ...(SAME_AS.length ? { sameAs: SAME_AS } : {}) },
      { "@type": "WebSite", "@id": WEB_ID, name: SITE_NAME, url: `${SITE_URL}/`, publisher: { "@id": ORG_ID }, inLanguage: "en" },
    ],
  };
}

export function breadcrumbJsonLd(items: Crumb[]) {
  const real = items.filter((i) => i.href && !i.href.includes("#")).map((i) => ({ name: i.name, href: i.href as string }));
  const last = items[items.length - 1];
  const list = [...real, ...(last && !last.href ? [{ name: last.name, href: "" }] : [])];
  return { "@context": "https://schema.org", "@type": "BreadcrumbList",
    itemListElement: list.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, ...(c.href ? { item: abs(c.href) } : {}) })) };
}

export function pageMetadata(o: { title: string; description: string; path: string; index?: boolean; image?: { src: string; w: number; h: number; alt: string }; type?: "website" | "article" }): Metadata {
  const url = abs(o.path);
  const img = o.image ? [{ url: abs(o.image.src), width: o.image.w, height: o.image.h, alt: o.image.alt }] : undefined;
  return {
    title: o.title, description: o.description, alternates: alternatesFor(o.path),
    robots: o.index === false ? { index: false, follow: true } : { index: true, follow: true },
    openGraph: { title: o.title, description: o.description, url, siteName: SITE_NAME, type: o.type ?? "website", locale: "en_US", images: img },
    twitter: { card: "summary_large_image", title: o.title, description: o.description, images: img?.map((i) => i.url) },
  };
}
