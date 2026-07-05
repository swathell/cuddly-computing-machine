import "dotenv/config";
import { z } from "zod";

const envSchema = z.object({
  NODE_ENV: z.enum(["development", "test", "production"]).default("development"),
  PORT: z.coerce.number().int().positive().default(3000),
  LOG_LEVEL: z.string().default("info"),
  REQUEST_TIMEOUT_MS: z.coerce.number().int().positive().default(15000),
  INTERNAL_API_KEY: z.string().optional(),
  CUBEDRIVE_API_KEY: z.string().min(1, "CUBEDRIVE_API_KEY is required"),
  CUBEDRIVE_BASE_URL: z.string().url("CUBEDRIVE_BASE_URL must be a URL"),
  BUFFY_API_TRIGGER_URL: z.string().url("BUFFY_API_TRIGGER_URL must be a URL"),
  BUFFY_API_TOKEN: z.string().min(1, "BUFFY_API_TOKEN is required"),
  BUFFY_API_TRIGGER_ID: z.string().optional()
});

export type Env = z.infer<typeof envSchema>;

let cachedEnv: Env | undefined;

export function getEnv(): Env {
  if (cachedEnv) {
    return cachedEnv;
  }

  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const details = parsed.error.issues.map((issue) => `${issue.path.join(".")}: ${issue.message}`).join("; ");
    throw new Error(`Invalid environment configuration: ${details}`);
  }

  cachedEnv = parsed.data;
  return cachedEnv;
}

export function resetEnvForTests(): void {
  cachedEnv = undefined;
}
