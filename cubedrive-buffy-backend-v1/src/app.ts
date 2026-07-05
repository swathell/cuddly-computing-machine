import express from "express";
import { cubedriveRoutes } from "./routes/cubedriveRoutes.js";
import { healthRoutes } from "./routes/healthRoutes.js";
import { workflowRoutes } from "./routes/workflowRoutes.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { requireInternalAuth } from "./middleware/internalAuth.js";
import { createRequestLogger } from "./middleware/requestLogger.js";

export function createApp() {
  const app = express();

  app.use(express.json({ limit: "1mb" }));
  app.use(createRequestLogger());
  app.use((request, response, next) => {
    response.setHeader("x-request-id", String(request.id));
    next();
  });
  app.use(healthRoutes);
  app.use(requireInternalAuth);
  app.use(cubedriveRoutes);
  app.use(workflowRoutes);
  app.use(errorHandler);

  return app;
}
