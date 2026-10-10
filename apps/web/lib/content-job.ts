import { z } from "zod";

export const contentPlatforms = ["linkedin", "x", "instagram", "blog"] as const;

export const createContentRequestSchema = z.object({
  platform: z.enum(contentPlatforms),
  brief: z.string().trim().min(20).max(10_000),
  voice: z.string().trim().min(2).max(80).default("clear and practical"),
});

export type CreateContentRequest = z.infer<typeof createContentRequestSchema>;
