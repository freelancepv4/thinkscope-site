import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/data";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/questions/why-is-the-odyssey-still-relevant/", "/questions/east-of-eden-relevance/index.html"]
    .map((p) => ({ url: SITE_URL + p, lastModified: new Date("2026-10-01") }));
}
