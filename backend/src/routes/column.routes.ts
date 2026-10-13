import { Router } from "express";
import { getColumns } from "../controllers/column.controller.ts";
import { createTask } from "../controllers/task.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";

const columnRouter = Router();

columnRouter.get("/", getColumns);
// columnRouter.put("/:id");
// columnRouter.delete("/:id");

columnRouter.post("/:columnId/tasks", authorized, createTask);

export default columnRouter;
