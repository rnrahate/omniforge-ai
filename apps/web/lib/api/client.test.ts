import { afterEach, describe, expect, it, vi } from "vitest";
import { getHealth } from "./client";

describe("getHealth", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("calls the configured health endpoint", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ status: "ok", service: "omniforge-api" }), { status: 200 }),
    );
    vi.stubGlobal("fetch", fetchMock);

    await expect(getHealth()).resolves.toEqual({ status: "ok", service: "omniforge-api" });
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:8000/api/health",
      { headers: { Accept: "application/json" } },
    );
  });
});
