import { getLeadsByStage as fetchLeadsByStage } from "../clients/cubedriveClient.js";
import type { Lead } from "../models/lead.js";
import type { Stage } from "../utils/normalizeStage.js";

export async function getLeadsByStage(stage: Stage): Promise<Lead[]> {
  return fetchLeadsByStage(stage);
}
