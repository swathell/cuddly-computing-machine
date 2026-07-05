import { z } from "zod";
import { getEnv } from "../config/env.js";
import type { Lead } from "../models/lead.js";
import type { Stage } from "../utils/normalizeStage.js";
import { ExternalServiceError } from "../utils/httpErrors.js";
import { buildUrl } from "../utils/buildUrl.js";

const leadArrayResponseSchema = z.union([
  z.array(z.record(z.unknown())),
  z.object({
    leads: z.array(z.record(z.unknown()))
  }),
  z.object({
    data: z.array(z.record(z.unknown()))
  })
]);

function extractLeads(payload: unknown): Lead[] {
  const parsed = leadArrayResponseSchema.safeParse(payload);
  if (!parsed.success) {
    throw new ExternalServiceError("cubedrive", "CubeDrive returned an unexpected leads response", 502);
  }

  if (Array.isArray(parsed.data)) {
    return parsed.data as Lead[];
  }

  return ("leads" in parsed.data ? parsed.data.leads : parsed.data.data) as Lead[];
}

export async function getLeadsByStage(stage: Stage): Promise<Lead[]> {
  const env = getEnv();
  const url = buildUrl(env.CUBEDRIVE_BASE_URL, "leads");
  url.searchParams.set("stage", stage);

  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${env.CUBEDRIVE_API_KEY}`,
      Accept: "application/json"
    },
    signal: AbortSignal.timeout(env.REQUEST_TIMEOUT_MS)
  });

  if (response.status === 401 || response.status === 403) {
    throw new ExternalServiceError("cubedrive", "CubeDrive authorization failed", 502);
  }

  if (!response.ok) {
    throw new ExternalServiceError("cubedrive", `CubeDrive request failed with status ${response.status}`, 502);
  }

  return extractLeads(await response.json());
}
