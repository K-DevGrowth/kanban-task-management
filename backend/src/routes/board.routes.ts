import { Router } from "express";
import {
  createBoard,
  getBoard,
  getBoardColumns,
  getBoards,
} from "../controllers/board.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";
import { createColumn } from "../controllers/column.controller.ts";

const boardRouter = Router();

boardRouter.get("/", getBoards);
boardRouter.get("/:id", getBoard);
boardRouter.post("/", authorized, createBoard);
boardRouter.get("/:boardId/columns", getBoardColumns);
boardRouter.post("/:boardId/columns", authorized, createColumn);
// boardRouter.put("/:id");
// boardRouter.delete("/:id");

export default boardRouter;
