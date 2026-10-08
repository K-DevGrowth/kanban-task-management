import type { RequestHandler } from "express";
import { prisma } from "../lib/prisma.ts";
import { CreateTaskSchema } from "../schema/task.schema.ts";
import { AppError } from "../utils/error.ts";

export const getTasks: RequestHandler = async (req, res, next) => {
  try {
    const tasks = await prisma.task.findMany({ include: { subtasks: true } });
    res.status(200).json({ data: tasks });
  } catch (error) {
    next(error);
  }
};

export const createTask: RequestHandler = async (req, res, next) => {
  try {
    const { title, description } = CreateTaskSchema.parse(req.body);
    const columnId = req.params.columnId;
    if (typeof columnId !== "string") {
      throw new AppError(400, "Column ID is required");
    }

    const order = await prisma.task.count({ where: { columnId } });

    const task = await prisma.task.create({
      data: {
        title,
        ...(description !== undefined ? { description } : {}),
        columnId,
        order,
      },
    });

    res.status(201).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};