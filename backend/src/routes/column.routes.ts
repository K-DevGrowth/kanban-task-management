import { Router } from "express";
import { getColumns } from "../controllers/column.controller.ts";

const columnRouter = Router();

columnRouter.get("/", getColumns);
// columnRouter.put("/:id");
// columnRouter.delete("/:id");

export default columnRouter;
