import { Router } from "express";
import {
  createBoard,
  deleteBoard,
  getBoard,
  getBoards,
  updateBoard,
} from "../controllers/board.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";
import { createBoardColumn } from "../controllers/column.controller.ts";

const boardRouter = Router();

boardRouter.get("/", getBoards);
boardRouter.get("/:id", getBoard);
boardRouter.post("/", authorized, createBoard);
boardRouter.put("/:id", authorized, updateBoard);
boardRouter.delete("/:id", authorized, deleteBoard);

boardRouter.post("/:boardId/columns", authorized, createBoardColumn);

export default boardRouter;
