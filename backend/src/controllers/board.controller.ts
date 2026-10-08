import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { CreateBoardSchema } from "../schema/board.chema.ts";

export const getBoards: RequestHandler = async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({ include: { columns: true } });
    res.status(200).json({ data: boards });
  } catch (error) {
    next(error);
  }
};

// export const getBoard: RequestHandler = async (req, res, next) => {};

export const createBoard: RequestHandler = async (req, res, next) => {
  try {
    const { title } = CreateBoardSchema.parse(req.body);

    const board = await prisma.board.create({
      data: { title, userId: req.user.id },
    });

    res.status(201).json({
      success: true,
      data: { board },
    });
  } catch (error) {
    next(error);
  }
};

// export const updateBoard: RequestHandler = async (req, res, next) => {};

// export const deleteBoard: RequestHandler = async (req, res, next) => {};
