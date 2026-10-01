// Single source of truth for the production domain and brand identity.
export const SITE_URL = "https://thinkscope.media";
export const SITE_NAME = "ThinkScope";
export const SITE_TITLE = "ThinkScope — AI Thinking, Compared";
export const SITE_DESCRIPTION = "ThinkScope compares how different AI systems approach important questions across literature, culture, history, philosophy and modern life.";
export const ORG_DESCRIPTION = "An editorial platform exploring important questions by comparing how different AI systems interpret literature, culture, history, philosophy and modern life.";
export const SAME_AS: string[] = []; // add official profile URLs here only when they exist
export const LOGO_PATH: string | null = "/apple-touch-icon.png"; // replace with the final logo

// Localization: only English exists. Add locales here and serve them under /<locale>/... when translations exist.
export const LOCALES = ["en"] as const;
export const DEFAULT_LOCALE = "en";

export const abs = (path: string) => (path === "/" ? `${SITE_URL}/` : `${SITE_URL}${path.replace(/\/$/, "")}`);

/** Canonical plus hreflang alternates. hreflang is emitted only when more than one locale really exists. */
export function alternatesFor(path: string) {
  const canonical = abs(path);
  if (LOCALES.length < 2) return { canonical };
  return { canonical, languages: Object.fromEntries(LOCALES.map((l) => [l, abs(l === DEFAULT_LOCALE ? path : `/${l}${path}`)])) };
}
