// Content model for a ThinkScope question. AI-derived fields stay empty until real responses are added.
export interface Theme { id: string; label: string; text: string }
export interface Stage { id: string; name: string; theme: string; text: string; image?: { src: string; w: number; h: number; alt: string } }
export interface AIResponse { model: string; summary: string; arguments: string[]; reasoning: string[]; themes: string[]; fullText: string }
export type Emphasis = "emphasized" | "mentioned" | "light" | "none";
export interface MatrixRow { theme: string; byModel: Record<string, Emphasis> }
export interface Convergence { theme: string; synthesis: string; byModel: Record<string, string> }
export interface Difference { dimension: string; explanation: string; byModel: Record<string, string> }
export interface Lens { id: string; label: string; note: string }

export const THEMES: Theme[] = [
  { id: "home", label: "Home", text: "Home is the poem's destination and also its test: what has to be true for a place to feel like home again? This is an interpretation, not a settled reading." },
  { id: "identity", label: "Identity", text: "Disguise, names and recognition recur through the poem. Readers often take it as asking who someone is when the people around them cannot see it." },
  { id: "loyalty", label: "Loyalty", text: "Penelope's resistance to the suitors, and the loyalty of some of the household, are often read as counterpoints to those who betray the house." },
  { id: "temptation", label: "Temptation", text: "Episodes with Circe, the Sirens and Calypso are often read as temptations to abandon the journey home." },
  { id: "transformation", label: "Transformation", text: "After a very long absence, the man who returns is not the man who left. Many readings focus on how the journey changes him." },
];

const I = (f: string, w: number, h: number, alt: string) => ({ src: `/assets/images/${f}`, w, h, alt });
export const JOURNEY: Stage[] = [
  { id: "troy", name: "Troy", theme: "War and aftermath", text: "The story follows the Trojan War, and Odysseus is trying to return home from it." },
  { id: "sea", name: "The Sea", theme: "Uncertainty", text: "Much of the poem is set during his wanderings at sea.", image: I("odyssey-voyage.webp", 1376, 768, "A weathered traveler stands at the rail of a wooden ship looking toward distant mountains at sunrise") },
  { id: "encounters", name: "Encounters", theme: "Temptation and identity", text: "He meets figures such as the Cyclops Polyphemus, the Sirens and Circe." },
  { id: "calypso", name: "Calypso", theme: "Desire versus home", text: "He is held on Calypso's island for years before he is allowed to leave." },
  { id: "ithaca", name: "Ithaca", theme: "Belonging", text: "He reaches Ithaca, where his household has been overrun by suitors.", image: I("odyssey-ithaca.webp", 1376, 768, "A hillside village of stone houses above a small harbor under misty mountains at sunset") },
  { id: "home", name: "Homecoming", theme: "Recognition and transformation", text: "He reveals himself and is reunited with Penelope.", image: I("odyssey-odysseus-disguise.webp", 1376, 768, "A weathered man in a patched cloak holding a staff stands in a doorway while people feast behind him") },
];

export const LENSES: Lens[] = [
  { id: "psychology", label: "Psychology", note: "Highlights sections on identity and relationships." },
  { id: "relationships", label: "Relationships", note: "Highlights the section on Penelope." },
  { id: "identity", label: "Identity", note: "Highlights the section on disguise and recognition." },
  { id: "homecoming", label: "Homecoming", note: "Highlights the sections on the journey home and on Ithaca." },
  { id: "power", label: "Power", note: "No section of the current article focuses on this lens yet." },
  { id: "modern", label: "Modern life", note: "No section of the current article focuses on this lens yet. AI passages will be linked once published." },
];

export const REFLECTIONS = [
  { q: "Is home always a place, or can it be an identity?", a: "Consider what Odysseus is trying to return to: a house, a family, a role, or a version of himself. They may not all survive the years away." },
  { q: "How much of Odysseus' journey is about returning, and how much is about changing?", a: "Try separating the goal of the journey from what the journey does to him. Does the poem treat them as the same thing?" },
  { q: "Would The Odyssey tell a different story if written today?", a: "Think about which parts depend on its world (gods, sea travel, hospitality customs) and which depend only on being human." },
];

// Filled in only when real responses exist. Never simulated.
export const AI_RESPONSES: AIResponse[] = [];
export const MATRIX: MatrixRow[] = [];
export const CONVERGENCES: Convergence[] = [];
export const DIFFERENCES: Difference[] = [];
export const SYNTHESIS: string[] = [];
