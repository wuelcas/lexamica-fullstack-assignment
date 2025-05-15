import express from "express";
import logger from "morgan";
import cors from "cors";
import CategoryController from "./controllers/categories.controller";
import TaskController from "./controllers/tasks.controller";
import errorHandler from "./error-handler";

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

app.use(errorHandler);

export default app;
