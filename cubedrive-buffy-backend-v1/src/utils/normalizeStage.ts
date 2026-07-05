import { z } from "zod";

export const supportedStages = ["cold", "warm", "hot", "qualified", "contract_sent", "closed"] as const;

export type Stage = (typeof supportedStages)[number];

const stageAliases: Record<string, Stage> = {
  cold: "cold",
  warm: "warm",
  hot: "hot",
  qualified: "qualified",
  "contract sent": "contract_sent",
  contract_sent: "contract_sent",
  contractsent: "contract_sent",
  closed: "closed"
};

export function normalizeStage(input: string): Stage {
  const key = input.trim().toLowerCase().replace(/[-_]+/g, " ").replace(/\s+/g, " ");
  const stage = stageAliases[key] ?? stageAliases[key.replace(/\s/g, "")];

  if (!stage) {
    throw new Error(`Unsupported stage: ${input}`);
  }

  return stage;
}

export const stageSchema = z
  .string()
  .min(1, "stage is required")
  .transform((value, ctx) => {
    try {
      return normalizeStage(value);
    } catch {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: `stage must be one of: ${supportedStages.join(", ")}`
      });
      return z.NEVER;
    }
  });
