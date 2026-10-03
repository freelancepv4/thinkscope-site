import type { Metadata } from "next";
import { ORG_ID, WEB_ID, pageMetadata } from "./seo";
import { abs } from "./site";

interface Pic { src: string; w: number; h: number; alt: string }
// One object per question drives its metadata, JSON-LD, sitemap entry and related links. Add only fields that really exist.
export interface QuestionSEO {
  slug: string; path: string; seoTitle: string; headline: string; description: string; category: string; topics: string[];
  heroImage: Pic; ogImage: Pic; publishedDate?: string; modifiedDate?: string; related: string[];
}

export const QUESTION_PAGES: QuestionSEO[] = [
  {
    slug: "why-is-the-odyssey-still-relevant", path: "/questions/why-is-the-odyssey-still-relevant",
    seoTitle: "The Odyssey: Why Is It Still Relevant?",
    headline: "What does AI think makes The Odyssey still relevant to audiences today?",
    description: "Three AIs analyze why Homer's The Odyssey still matters today \u2014 from homecoming and identity to hospitality, mortality, storytelling and modern adaptations.",
    category: "Literature", topics: ["Literature", "Culture", "Human nature"],
    heroImage: { src: "/assets/images/odyssey-video-poster.webp", w: 540, h: 960, alt: "A weathered traveler stands on the deck of a wooden ship looking out to sea at sunrise" },
    ogImage: { src: "/assets/images/og-odyssey.jpg", w: 1200, h: 630, alt: "Marble head and ruined temple on a Mediterranean shore facing a modern town at dusk" },
    related: ["east-of-eden-relevance"], modifiedDate: "2026-10-02",
  },
  {
    slug: "east-of-eden-relevance", path: "/questions/east-of-eden-relevance",
    seoTitle: "Is East of Eden Still Relevant in 2026?",
    headline: "Is East of Eden still relevant in 2026?",
    description: "How do three AI systems read Steinbeck's East of Eden in 2026, as a new Netflix adaptation arrives? Compare where their analyses agree and differ.",
    category: "Literature", topics: ["Literature", "Culture", "Human nature"],
    heroImage: { src: "/assets/images/east-of-eden-2026-netflix-poster.webp", w: 600, h: 889, alt: "Official poster for the 2026 Netflix adaptation of East of Eden" },
    ogImage: { src: "/assets/images/og-east-of-eden.jpg", w: 1200, h: 630, alt: "East of Eden" },
    related: ["why-is-the-odyssey-still-relevant"],
  },
];

export const questionMetadata = (q: QuestionSEO): Metadata =>
  pageMetadata({ title: q.seoTitle, description: q.description, path: q.path, image: q.ogImage, type: "article" });

export function questionJsonLd(q: QuestionSEO) {
  return {
    "@context": "https://schema.org", "@type": "Article", headline: q.seoTitle, description: q.description,
    image: abs(q.ogImage.src), url: abs(q.path), mainEntityOfPage: abs(q.path), articleSection: q.category, inLanguage: "en",
    author: { "@id": ORG_ID }, publisher: { "@id": ORG_ID }, isPartOf: { "@id": WEB_ID },
    ...(q.publishedDate ? { datePublished: q.publishedDate } : {}), ...(q.modifiedDate ? { dateModified: q.modifiedDate } : {}),
  };
}
