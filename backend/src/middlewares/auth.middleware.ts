import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { AppError } from "../utils/error.ts";
import { verifyToken } from "../utils/token.ts";

export const authorized: RequestHandler = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    if (!token) throw new AppError(401, "Unauthorized");

    const { userId } = verifyToken(token);

    const user = await prisma.user.findUnique({
      where: { id: userId },
      omit: { password: true },
    });
    if (!user) {
      throw new AppError(401, "Unauthorized");
    }

    req.user = user;
    next();
  } catch (error) {
    next(error);
  }
};
