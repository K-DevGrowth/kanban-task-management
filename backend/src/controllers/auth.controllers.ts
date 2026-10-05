import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { prisma } from "../lib/prisma";
import { JWT_EXPIRESIN, JWT_SECRET } from "../config/env";

export const signUp = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    if (!email || !password) {
      throw new Error("Require these parameteres");
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        error: "User already exists",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await prisma.user.create({
      data: { name, email, password: hashedPassword },
    });

    const token = jwt.sign({ userId: user.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRESIN,
    });

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const newUser = await prisma.user.findUnique({ where: { email } });
    if (!newUser) {
      return res.status(404).json({
        success: false,
        error: "User not found",
      });
    }

    const validPassword = await bcrypt.compare(password, newUser.password);
    if (!validPassword) {
      return res.status(403).json({
        success: false,
        error: "Invalid password",
      });
    }

    const token = jwt.sign({ userId: newUser.id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRESIN,
    });

    const { password: _password, ...user } = newUser;

    res.status(201).json({
      success: true,
      data: { user, token },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res, next) => {};
