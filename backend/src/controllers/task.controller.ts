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
    const { title, description, subtasks } = CreateTaskSchema.parse(req.body);
    const columnId = req.params.columnId;
    if (typeof columnId !== "string") {
      throw new AppError(400, "Column ID is required");
    }

    const column = await prisma.column.findFirst({
      where: {
        id: columnId,
        board: { is: { userId: req.user.id } },
      },
      select: { id: true },
    });
    if (!column) {
      throw new AppError(404, "Column not found");
    }

    const order = await prisma.task.count({ where: { columnId } });

    const task = await prisma.task.create({
      data: {
        title,
        ...(description !== undefined ? { description } : {}),
        columnId,
        order,
        subtasks: {
          create: subtasks.map((subtask) => ({ title: subtask.title })),
        },
      },
      include: { subtasks: true },
    });

    res.status(201).json({
      data: { task },
    });
  } catch (error) {
    next(error);
  }
};

export const moveTask: RequestHandler = async (req, res, next) => {
  try {
    const { tasks } = req.body;

    await prisma.$transaction(
      tasks.map(({ id, columnId, order }) =>
        prisma.task.update({ where: { id }, data: { columnId, order } }),
      ),
    );

    res.status(204).end();
  } catch (error) {
    next(error);
  }
};
