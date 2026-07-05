import type pino from "pino";

declare global {
  namespace Express {
    interface Request {
      id?: string | number;
      log: pino.Logger;
    }
  }
}
