import { createContentRequestSchema, type CreateContentRequest } from "@/lib/content-job";

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8000";

export async function generateContent(input: CreateContentRequest, accessToken: string) {
  const body = createContentRequestSchema.parse(input);
  const response = await fetch(`${apiBaseUrl}/v1/content/generate`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    throw new Error("Content generation request failed. Please try again.");
  }

  return response.json() as Promise<{ content: string; model: string }>;
}
