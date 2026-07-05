import type { NextFunction, Request, Response } from "express";
import { getEnv } from "../config/env.js";

export function requireInternalAuth(request: Request, response: Response, next: NextFunction): void {
  const { INTERNAL_API_KEY } = getEnv();

  if (!INTERNAL_API_KEY) {
    next();
    return;
  }

  const expected = `Bearer ${INTERNAL_API_KEY}`;
  if (request.header("authorization") !== expected) {
    response.status(401).json({
      status: "error",
      error: {
        code: "unauthorized",
        message: "Unauthorized"
      }
    });
    return;
  }

  next();
}
