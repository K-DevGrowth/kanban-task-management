import { config } from "dotenv";

config({ path: `.env.${process.env.NODE_ENV || "development"}.local` });

export const { PORT, DATABASE_URL, JWT_SECRET, JWT_EXPIRESIN } = process.env;
