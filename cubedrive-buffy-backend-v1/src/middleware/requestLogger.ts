import pino from "pino";
import pinoHttp from "pino-http";
import { randomUUID } from "node:crypto";
import { getEnv } from "../config/env.js";

export function createRequestLogger() {
  const env = getEnv();
  return pinoHttp({
    logger: pino({ level: env.LOG_LEVEL }),
    genReqId: (request) => request.headers["x-request-id"]?.toString() ?? `req_${randomUUID()}`,
    serializers: {
      req(request) {
        return {
          id: request.id,
          method: request.method,
          url: request.url
        };
      },
      res(response) {
        return {
          statusCode: response.statusCode
        };
      }
    }
  });
}
