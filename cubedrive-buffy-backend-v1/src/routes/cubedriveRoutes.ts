import { Router } from "express";
import { z } from "zod";
import { getLeadCountByStage } from "../workflows/getLeadCountByStage.js";
import { getLeadsByStage } from "../workflows/getLeadsByStage.js";
import { stageSchema } from "../utils/normalizeStage.js";

const querySchema = z.object({
  stage: stageSchema
});

export const cubedriveRoutes = Router();

cubedriveRoutes.get("/cubedrive/leads/count", async (request, response, next) => {
  try {
    const { stage } = querySchema.parse(request.query);
    const count = await getLeadCountByStage(stage);

    request.log.info({
      workflow: "getLeadCountByStage",
      stage,
      cubedrive_called: true,
      buffy_called: false,
      status: "ok"
    });

    response.json({
      status: "ok",
      data: {
        stage,
        count
      },
      source: "cubedrive"
    });
  } catch (error) {
    next(error);
  }
});

cubedriveRoutes.get("/cubedrive/leads", async (request, response, next) => {
  try {
    const { stage } = querySchema.parse(request.query);
    const leads = await getLeadsByStage(stage);

    request.log.info({
      workflow: "getLeadsByStage",
      stage,
      cubedrive_called: true,
      buffy_called: false,
      status: "ok"
    });

    response.json({
      status: "ok",
      data: {
        stage,
        leads
      },
      source: "cubedrive"
    });
  } catch (error) {
    next(error);
  }
});
