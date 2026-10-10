import { describe, expect, it } from "vitest";
import { createContentRequestSchema } from "./content-job";

describe("createContentRequestSchema", () => {
  it("accepts a supported platform and a substantive brief", () => {
    const request = createContentRequestSchema.parse({
      platform: "linkedin",
      brief: "Explain our approach to practical, privacy-conscious AI content workflows.",
      voice: "confident and concise",
    });

    expect(request.platform).toBe("linkedin");
  });

  it("rejects a platform that the API does not support", () => {
    expect(() => createContentRequestSchema.parse({ platform: "tiktok", brief: "a".repeat(30) })).toThrow();
  });
});
