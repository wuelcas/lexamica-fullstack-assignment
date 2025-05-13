import express from "express";
import logger from "morgan";
import cors from "cors";
import CategoryController from "./controllers/categories.controller";
import TaskController from "./controllers/tasks.controller";

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  }),
);

app.use(new CategoryController().router);
app.use(new TaskController().router);

export default app;
