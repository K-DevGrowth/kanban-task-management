import { Router } from "express";
import { getTasks } from "../controllers/task.controller.ts";

const taskRouter = Router();

taskRouter.get("/", getTasks);


export default taskRouter;
