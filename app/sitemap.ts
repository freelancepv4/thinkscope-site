import type { MetadataRoute } from "next";
import { QUESTION_PAGES } from "@/lib/questions";
import { abs } from "@/lib/site";

// Only canonical, indexable pages. Legal pages are noindex and left out. New questions appear automatically.
export default function sitemap(): MetadataRoute.Sitemap {
  const questions = QUESTION_PAGES.map((q) => ({ url: abs(q.path), ...(q.modifiedDate ? { lastModified: q.modifiedDate } : {}) }));
  return [{ url: abs("/") }, ...questions, { url: abs("/methodology") }, { url: abs("/about") }, { url: abs("/contact") }];
}
