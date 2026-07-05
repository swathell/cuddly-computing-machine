import { describe, expect, it } from "vitest";
import { normalizeStage } from "../src/utils/normalizeStage.js";

describe("normalizeStage", () => {
  it("normalizes case and spacing", () => {
    expect(normalizeStage("Cold")).toBe("cold");
    expect(normalizeStage(" COLD ")).toBe("cold");
    expect(normalizeStage("contract sent")).toBe("contract_sent");
  });

  it("rejects unsupported stages", () => {
    expect(() => normalizeStage("not-a-stage")).toThrow("Unsupported stage");
  });
});
