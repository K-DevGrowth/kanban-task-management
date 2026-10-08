import { Router } from "express";
import { createBoard, getBoards } from "../controllers/board.controller.ts";
import { authorized } from "../middlewares/auth.middleware.ts";

const boardRouter = Router();

boardRouter.get("/", getBoards);
// boardRouter.get("/:id");
boardRouter.post("/", authorized, createBoard);
// boardRouter.put("/:id");
// boardRouter.delete("/:id");

export default boardRouter;
