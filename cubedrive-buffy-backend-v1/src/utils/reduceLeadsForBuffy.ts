import type { Lead, ReducedLead } from "../models/lead.js";

export function reduceLeadsForBuffy(leads: Lead[], limit = 25): ReducedLead[] {
  return leads.slice(0, limit).map((lead) => ({
    name: String(lead.name ?? lead.company ?? lead.id ?? "Unknown lead"),
    owner: lead.owner ? String(lead.owner) : undefined,
    age_days: typeof lead.ageDays === "number" ? lead.ageDays : undefined
  }));
}
