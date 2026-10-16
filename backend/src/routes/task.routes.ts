import { Router } from "express";
import { getTasks, moveTask } from "../controllers/task.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.patch("/reorder", authorized, moveTask);

export default taskRouter;
