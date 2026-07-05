export class AppError extends Error {
  constructor(
    message: string,
    public readonly statusCode = 500,
    public readonly code = "internal_error",
    public readonly details?: unknown
  ) {
    super(message);
  }
}

export class ExternalServiceError extends AppError {
  constructor(service: "cubedrive" | "buffy", message: string, statusCode = 502, details?: unknown) {
    super(message, statusCode, `${service}_error`, details);
  }
}
