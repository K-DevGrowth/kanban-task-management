import express from "express";
import z from "zod";
import { PORT } from "./config/env.ts";
import { AppError } from "./utils/error.ts";
import authRouter from "./routes/auth.routes.ts";
import boardRouter from "./routes/board.routes.ts";
import columnRouter from "./routes/column.routes.ts";
import taskRouter from "./routes/task.routes.ts";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/boards", boardRouter);
app.use("/api/v1/columns", columnRouter);
app.use("/api/v1/tasks", taskRouter);
// app.use("/api/v1/subtasks");

app.get("/", (_req, res) => {
  res.send(`Welcome to the kanban task management!`);
});

app.use(
  (
    err: unknown,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    if (err instanceof AppError)
      return res
        .status(err.statusCode)
        .json({ success: false, message: err.message });
    if (err instanceof z.ZodError)
      return res.status(400).json({ success: false, issues: err.issues });
    res.status(500).json({ success: false, message: "Internal server error" });
  },
);

app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
