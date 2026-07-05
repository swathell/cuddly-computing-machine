import { describe, expect, it } from "vitest";
import { buildUrl } from "../src/utils/buildUrl.js";

describe("buildUrl", () => {
  it("preserves API version paths in base URLs", () => {
    expect(buildUrl("https://api.example.com/v1", "leads").toString()).toBe("https://api.example.com/v1/leads");
  });
});
