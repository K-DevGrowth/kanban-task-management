import { Router } from "express";
import { createTask, getTasks } from "../controllers/task.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";

const taskRouter = Router();

taskRouter.get("/", getTasks);
taskRouter.post("/column/:columnId", authorized, createTask);

export default taskRouter;