import { z } from "zod";
import { getEnv } from "../config/env.js";
import { ExternalServiceError } from "../utils/httpErrors.js";

export type BuffyPromptInput = {
  task: string;
  stage: string;
  lead_count: number;
  leads: Array<Record<string, unknown>>;
  output_type: "sales_ops_summary";
};

const buffyResponseSchema = z.union([
  z.object({ summary: z.string().min(1) }),
  z.object({ output: z.string().min(1) }),
  z.object({ output_text: z.string().min(1) }),
  z.object({ text: z.string().min(1) }),
  z.object({ result: z.object({ summary: z.string().min(1) }) })
]);

function parseSummary(payload: unknown): string {
  const parsed = buffyResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ExternalServiceError("buffy", "Buffy returned an unexpected response", 502);
  }

  if ("summary" in parsed.data) {
    return parsed.data.summary;
  }

  if ("output" in parsed.data) {
    return parsed.data.output;
  }

  if ("output_text" in parsed.data) {
    return parsed.data.output_text;
  }

  if ("text" in parsed.data) {
    return parsed.data.text;
  }

  return parsed.data.result.summary;
}

export async function runPrompt(input: BuffyPromptInput): Promise<string> {
  const env = getEnv();

  const response = await fetch(env.BUFFY_API_TRIGGER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.BUFFY_API_TOKEN}`,
      "Content-Type": "application/json",
      Accept: "application/json"
    },
    body: JSON.stringify(input),
    signal: AbortSignal.timeout(env.REQUEST_TIMEOUT_MS)
  });

  if (response.status === 401 || response.status === 403) {
    throw new ExternalServiceError("buffy", "Buffy authorization failed", 502);
  }

  if (!response.ok) {
    throw new ExternalServiceError("buffy", `Buffy request failed with status ${response.status}`, 502);
  }

  return parseSummary(await response.json());
}
