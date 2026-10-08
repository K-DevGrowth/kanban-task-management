import jwt, { type SignOptions } from "jsonwebtoken";
import z from "zod";
import { JWT_EXPIRESIN, JWT_SECRET } from "../config/env.ts";
import { AppError } from "./error.ts";

const payloadSchema = z.object({ userId: z.string() });

export const signToken = (userId: string): string =>
  jwt.sign({ userId }, JWT_SECRET, {
    algorithm: "HS256",
    expiresIn: JWT_EXPIRESIN as NonNullable<SignOptions["expiresIn"]>,
  });

export const verifyToken = (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET, {
      algorithms: ["HS256"],
    });
    return payloadSchema.parse(decoded);
  } catch {
    throw new AppError(401, "Invalid or expired token");
  }
};
