import { describe, expect, it } from "vitest";
import { reduceLeadsForBuffy } from "../src/utils/reduceLeadsForBuffy.js";

describe("reduceLeadsForBuffy", () => {
  it("keeps only summary-safe lead fields", () => {
    const result = reduceLeadsForBuffy([
      {
        id: "lead_1",
        name: "Acme",
        owner: "Ala",
        ageDays: 18,
        secretField: "do-not-send"
      }
    ]);

    expect(result).toEqual([{ name: "Acme", owner: "Ala", age_days: 18 }]);
  });
});
