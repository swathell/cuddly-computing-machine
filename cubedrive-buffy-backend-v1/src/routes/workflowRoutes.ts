import { Router } from "express";
import { summarizeStageLeads } from "../workflows/summarizeStageLeads.js";

export const workflowRoutes = Router();

workflowRoutes.post("/workflow/cold-leads-summary", async (_request, response, next) => {
  try {
    const result = await summarizeStageLeads("cold");

    _request.log.info({
      workflow: "summarizeStageLeads",
      stage: result.stage,
      cubedrive_called: true,
      buffy_called: true,
      status: "ok"
    });

    response.json({
      status: "ok",
      data: {
        stage: result.stage,
        count: result.count
      },
      agent_output: {
        summary: result.summary
      },
      source: {
        data: "cubedrive",
        summary: "buffy"
      }
    });
  } catch (error) {
    next(error);
  }
});
