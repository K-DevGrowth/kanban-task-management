import { Router } from "express";
import { authorized } from "../middlewares/auth.middleware.ts";
import { createColumn, getColumns } from "../controllers/column.controller.ts";

const columnRouter = Router();

columnRouter.get("/", getColumns);
// columnRouter.get("/:id");
columnRouter.post("/board/:boardId", authorized, createColumn);
// columnRouter.put("/:id");
// columnRouter.delete("/:id");

export default columnRouter;
