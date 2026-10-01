export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? "https://YOUR-DOMAIN.com";

// Media map: change paths here to swap assets.
export const MEDIA = {
  heroVideo: "/assets/video/odyssey-hero.mp4",
  heroPoster: "/assets/images/odyssey-video-poster.webp",
  heroPosterAlt: "A weathered traveler stands on the deck of a wooden ship looking out to sea at sunrise",
} as const;

export interface Img { src: string; w: number; h: number; alt: string }
export interface Question {
  title: string; href: string; categories: string[]; blurb: string; meta: string; image: Img;
}

export const QUESTIONS: Question[] = [
  {
    title: "Why Is the Odyssey Still Relevant?",
    href: "/questions/why-is-the-odyssey-still-relevant/",
    categories: ["Literature", "Culture"],
    blurb: "Homecoming, identity and patience: what keeps a nearly 3,000-year-old epic current. AI comparison coming soon.",
    meta: "Context and interpretation · Updated Oct 1, 2026",
    image: { src: "/assets/images/odyssey-ancient-and-modern.webp", w: 1376, h: 768, alt: "Marble head and ruined temple on a Mediterranean shore facing a modern town at dusk" },
  },
  {
    title: "Can a 1952 Novel Still Understand Us in 2026?",
    href: "/questions/east-of-eden-relevance/index.html",
    categories: ["Culture", "Books & adaptations"],
    blurb: "Three AIs analyze why Steinbeck's East of Eden may still matter, with the Netflix adaptation arriving October 1, 2026.",
    meta: "Models: 3 · Interactive analysis · Updated Sep 30, 2026",
    image: { src: "/assets/images/east-of-eden-2026-netflix-poster.webp", w: 600, h: 889, alt: "Official poster for the 2026 Netflix adaptation of East of Eden" },
  },
];

export const TOPICS = ["Culture", "Literature", "History", "Science", "Technology", "AI", "Philosophy", "Society", "Future", "Human behavior"];
