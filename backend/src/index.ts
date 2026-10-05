import express from "express";
import { PORT } from "./config/env";
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json());

app.use("/api/v1/auth", authRouter);

app.get("/", (_req, res) => {
  res.send(`Welcome to the kanban task management!`);
});

app.listen(PORT, () => {
  console.log(`Server is running on the http://localhost:${PORT}`);
});
