import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { CreateColumnSchema } from "../schema/column.schema.ts";
import { AppError } from "../utils/error.ts";

export const getColumns: RequestHandler = async (req, res, next) => {
  try {
    const columns = await prisma.column.findMany({ include: { tasks: true } });
    res.status(200).json({ data: columns });
  } catch (error) {
    next(error);
  }
};

// export const getColumn: RequestHandler = async (req, res, next) => {};

export const createColumn: RequestHandler = async (req, res, next) => {
  try {
    const { title } = CreateColumnSchema.parse(req.body);
    const boardId = req.params.boardId;
    if (typeof boardId !== "string") {
      throw new AppError(400, "Board ID is required");
    }

    const board = await prisma.board.findFirst({
      where: { id: boardId, userId: req.user.id },
      select: { id: true },
    });
    if (!board) {
      throw new AppError(404, "Board not found");
    }

    const column = await prisma.column.create({
      data: { title, boardId, order: 0 },
    });

    res.status(201).json({
      success: true,
      data: { column },
    });
  } catch (error) {
    next(error);
  }
};

// export const updateColumn: RequestHandler = async (req, res, next) => {};

// export const deleteColumn: RequestHandler = async (req, res, next) => {};
