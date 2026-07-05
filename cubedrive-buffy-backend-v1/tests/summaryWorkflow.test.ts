import { beforeEach, describe, expect, it, vi } from "vitest";
import { summarizeStageLeads } from "../src/workflows/summarizeStageLeads.js";

vi.mock("../src/workflows/getLeadsByStage.js", () => ({
  getLeadsByStage: vi.fn(async () => [
    { name: "Acme", owner: "Ala", ageDays: 18 },
    { name: "BetaCo", owner: "Vin", ageDays: 9 }
  ])
}));

vi.mock("../src/clients/buffyClient.js", () => ({
  runPrompt: vi.fn(async () => "There are 2 cold leads ready for Sales Ops review.")
}));

describe("summarizeStageLeads", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns count and Buffy summary", async () => {
    await expect(summarizeStageLeads("cold")).resolves.toEqual({
      stage: "cold",
      count: 2,
      summary: "There are 2 cold leads ready for Sales Ops review."
    });
  });
});
