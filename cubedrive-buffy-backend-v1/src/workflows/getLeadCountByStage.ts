import type { Stage } from "../utils/normalizeStage.js";
import { getLeadsByStage } from "./getLeadsByStage.js";

export async function getLeadCountByStage(stage: Stage): Promise<number> {
  const leads = await getLeadsByStage(stage);
  return leads.length;
}
