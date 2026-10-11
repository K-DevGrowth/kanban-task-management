import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { CreateBoardSchema } from "../schema/board.chema.ts";
import { AppError } from "../utils/error.ts";

export const getBoards: RequestHandler = async (req, res, next) => {
  try {
    const boards = await prisma.board.findMany({ include: { columns: true } });
    res.status(200).json({ data: boards });
  } catch (error) {
    next(error);
  }
};

export const getBoardColumns: RequestHandler = async (req, res, next) => {
  try {
    const boards = await prisma.board.findFirst({
      where: { id: req.params.boardId },
      include: { columns: true },
    });
    res.status(200).json({ data: boards });
  } catch (error) {
    next(error);
  }
};

export const getBoard: RequestHandler = async (req, res, next) => {
  try {
    const board = await prisma.board.findUnique({
      where: { id: req.params.id },
      include: { columns: true },
    });

    if (!board) {
      throw new AppError(404, "Invalid or missing id");
    }

    res.status(200).json({
      data: { board },
    });
  } catch (error) {
    next(error);
  }
};

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
