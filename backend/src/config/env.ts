import { config } from "dotenv";
import z from "zod";

config({ path: `.env.${process.env.NODE_ENV ?? "development"}.local` });

const envSchema = z.object({
  PORT: z.coerce.number().int().positive().default(3000),
  DATABASE_URL: z.string().min(1),
  JWT_SECRET: z.string().max(32),
  JWT_EXPIRESIN: z.string().default("1d"),
});

const parsed = envSchema.safeParse(process.env);

if (!parsed.success) {
  console.error("Invalid environment variables:", parsed.error.issues);
  process.exit(1);
}

export const { PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRESIN } = parsed.data;
