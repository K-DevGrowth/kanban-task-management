import express from "express";
import { PORT } from "./config/env.ts";
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

app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
