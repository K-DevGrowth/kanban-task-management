import { Router } from "express";
import {
  createBoard,
  getBoard,
  getBoards,
} from "../controllers/board.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";
import { createBoardColumn } from "../controllers/column.controller.ts";

const boardRouter = Router();

boardRouter.get("/", getBoards);
boardRouter.get("/:id", getBoard);
boardRouter.post("/", authorized, createBoard);
// boardRouter.put("/:id");
// boardRouter.delete("/:id");

boardRouter.post("/:boardId/columns", authorized, createBoardColumn);

export default boardRouter;
