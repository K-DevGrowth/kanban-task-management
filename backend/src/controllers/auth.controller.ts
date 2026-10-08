import bcrypt from "bcrypt";
import { prisma } from "../lib/prisma.ts";
import type { RequestHandler } from "express";
import { AppError } from "../utils/error.ts";
import { signToken } from "../utils/token.ts";
import { SignInSchema, SignUpSchema } from "../schema/auth.schema.ts";

export const signUp: RequestHandler = async (req, res, next) => {
  try {
    const { name, email, password } = SignUpSchema.parse(req.body);

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      throw new AppError(409, "User already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = signToken(user.id.toString());

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn: RequestHandler = async (req, res, next) => {
  try {
    const { email, password } = SignInSchema.parse(req.body);

    const newUser = await prisma.user.findUnique({ where: { email } });
    if (!newUser) {
      throw new AppError(404, "User not found");
    }

    const validPassword = await bcrypt.compare(password, newUser.password);
    if (!validPassword) {
      throw new AppError(403, "Invalid password");
    }

    const token = signToken(newUser.id.toString());

    const { password: _password, ...user } = newUser;

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut: RequestHandler = async (req, res, next) => {};
