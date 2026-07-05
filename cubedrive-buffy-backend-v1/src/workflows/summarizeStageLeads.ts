import { runPrompt } from "../clients/buffyClient.js";
import type { Stage } from "../utils/normalizeStage.js";
import { reduceLeadsForBuffy } from "../utils/reduceLeadsForBuffy.js";
import { getLeadsByStage } from "./getLeadsByStage.js";

export async function summarizeStageLeads(stage: Stage): Promise<{
  stage: Stage;
  count: number;
  summary: string;
}> {
  const leads = await getLeadsByStage(stage);
  const reducedLeads = reduceLeadsForBuffy(leads);
  const summary = await runPrompt({
    task: `Summarize CubeDrive ${stage}-stage leads for Sales Ops`,
    stage,
    lead_count: leads.length,
    leads: reducedLeads,
    output_type: "sales_ops_summary"
  });

  return {
    stage,
    count: leads.length,
    summary
  };
}
