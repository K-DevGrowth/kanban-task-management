import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { CreateColumnSchema } from "../schema/column.schema.ts";

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

    const column = await prisma.column.create({
      data: { title, boardId: req.params.boardId, order: 0 },
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
