export type PlatformId = "linkedin" | "instagram" | "x" | "blog";

export interface PlatformDefinition {
  id: PlatformId;
  label: string;
  description: string;
  format: string;
}

export interface MockOutput {
  id: PlatformId;
  title: string;
  eyebrow: string;
  content: string;
  notes: string;
}

export const platforms: PlatformDefinition[] = [
  { id: "linkedin", label: "LinkedIn", description: "Thought-leadership post", format: "Post" },
  { id: "instagram", label: "Instagram", description: "Educational carousel", format: "Carousel" },
  { id: "x", label: "X thread", description: "Point of view in 5 posts", format: "Thread" },
  { id: "blog", label: "Blog", description: "Outline and opening", format: "Article" },
];

const outputs: Record<PlatformId, MockOutput> = {
  linkedin: {
    id: "linkedin",
    eyebrow: "LinkedIn post · 187 words",
    title: "The workflow should feel quieter, not louder.",
    content: "The best creative systems do not ask teams to produce more. They make it easier to find the signal worth developing.\n\nAt OmniForge, we start with the source: a point of view, a customer tension, a useful observation. Then we shape it for the places people actually read.\n\nThat means less blank-page energy. More room for judgment.\n\nWhat would your team make if the first draft already sounded like you?",
    notes: "Built for a concise, thoughtful point of view.",
  },
  instagram: {
    id: "instagram",
    eyebrow: "Instagram carousel · 6 slides",
    title: "A carousel with one idea per slide.",
    content: "SLIDE 1 — Your content workflow should feel quieter.\n\nSLIDE 2 — Start with a real point of view.\n\nSLIDE 3 — Give one idea the space to land.\n\nSLIDE 4 — Adapt it to the channel, not the trend.\n\nSLIDE 5 — Protect the voice people recognize.\n\nSLIDE 6 — Less noise. More useful work.",
    notes: "Each slide is intentionally short for visual treatment.",
  },
  x: {
    id: "x",
    eyebrow: "X thread · 5 posts",
    title: "A five-post thread with a clean argument.",
    content: "1/ Content systems fail when they optimize for volume before clarity.\n\n2/ A strong source brief gives every channel a point of view to work from.\n\n3/ The goal is not to copy-paste. It is to preserve the idea while changing the shape.\n\n4/ The best automation creates more room for editorial judgment.\n\n5/ Make the system quieter. The work gets better.",
    notes: "Designed for a clear, quotable progression.",
  },
  blog: {
    id: "blog",
    eyebrow: "Blog opening · 420 words",
    title: "A quieter way to build a content system",
    content: "Most content systems begin with a calendar. The better place to begin is with a question: what do we believe that our audience needs to hear?\n\nA useful system does not flatten that answer into a dozen interchangeable posts. It carries the original idea into formats that fit the reader, the channel, and the moment.\n\nIn this guide, we outline a practical approach to building a content operation that protects voice while making the work easier to repeat.",
    notes: "Includes a headline and an opening ready for editorial review.",
  },
};

export function getMockOutputs(selectedPlatforms: PlatformId[]): MockOutput[] {
  return selectedPlatforms.map((platform) => outputs[platform]);
}

export function makeRegeneratedOutput(output: MockOutput): MockOutput {
  return {
    ...output,
    title: `${output.title.replace(/\.$/, "")} — alternate angle.`,
    content: `${output.content}\n\n[Alternative local mock variation: lead with the audience tension before introducing the workflow.]`,
    notes: "Local mock variation generated for prototype review.",
  };
}
