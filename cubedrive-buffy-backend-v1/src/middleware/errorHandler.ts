import type { NextFunction, Request, Response } from "express";
import { ZodError } from "zod";
import { AppError } from "../utils/httpErrors.js";

export function errorHandler(error: unknown, _request: Request, response: Response, _next: NextFunction): void {
  if (error instanceof ZodError) {
    response.status(400).json({
      status: "error",
      error: {
        code: "validation_error",
        message: "Invalid request",
        details: error.flatten()
      }
    });
    return;
  }

  if (error instanceof AppError) {
    response.status(error.statusCode).json({
      status: "error",
      error: {
        code: error.code,
        message: error.message,
        details: error.details
      }
    });
    return;
  }

  response.status(500).json({
    status: "error",
    error: {
      code: "internal_error",
      message: "Unexpected server error"
    }
  });
}
