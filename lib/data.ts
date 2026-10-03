export { SITE_URL } from "./site";

// Media map: change paths here to swap assets.
export const MEDIA = {
  home: { video: "/assets/video/thinkscope-hero.mp4", poster: "/assets/images/thinkscope-hero-poster.webp", w: 1376, h: 768,
    alt: "A dark desk with old books, notes and a floating panel of translucent screens, beside the word ThinkScope", label: "ThinkScope introduction: an open book gains AI annotations" },
  odyssey: { video: "/assets/video/odyssey-hero.mp4", poster: "/assets/images/odyssey-video-poster.webp", w: 540, h: 960,
    alt: "A weathered traveler stands on the deck of a wooden ship looking out to sea at sunrise", label: "The Odyssey: a traveler on a ship at sea" },
} as const;

export interface Img { src: string; w: number; h: number; alt: string }
export interface Question {
  title: string; href: string; categories: string[]; blurb: string; meta: string; image: Img; chips?: string[]; cta?: string;
}

export const QUESTIONS: Question[] = [
  {
    title: "What Does AI Think Makes The Odyssey Still Relevant?",
    href: "/questions/why-is-the-odyssey-still-relevant",
    categories: ["Literature", "Culture"],
    blurb: "Three AIs compare why Homer's epic still matters, from homecoming and identity to hospitality and mortality. Is it timeless, or just endlessly renewable?",
    meta: "Updated Oct 2, 2026", chips: ["3 AI perspectives", "Interactive analysis"], cta: "Read the comparison",
    image: { src: "/assets/images/odyssey-ancient-and-modern.webp", w: 1376, h: 768, alt: "Marble head and ruined temple on a Mediterranean shore facing a modern town at dusk" },
  },
  {
    title: "Can a 1952 Novel Still Understand Us in 2026?",
    href: "/questions/east-of-eden-relevance",
    categories: ["Culture", "Books & adaptations"],
    blurb: "Three AIs analyze why Steinbeck's East of Eden may still matter, with the Netflix adaptation arriving October 1, 2026.",
    meta: "Updated Sep 30, 2026", chips: ["3 AI perspectives", "Interactive analysis"], cta: "Read the comparison",
    image: { src: "/assets/images/east-of-eden-2026-netflix-poster.webp", w: 600, h: 889, alt: "Official poster for the 2026 Netflix adaptation of East of Eden" },
  },
];

export const TOPICS = ["Culture", "Literature", "History", "Science", "Technology", "AI", "Philosophy", "Society", "Future", "Human behavior"];
