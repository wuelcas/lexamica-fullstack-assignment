import { Router, type Request, type Response } from "express";
import { taskSchema } from "../validation-schemas/task.schema";
import TaskService from "../services/task.service";
import { StatusCodes } from "http-status-codes";
import formatZodErrors from "../utils/formatZodErrors";
import to from "../utils/await-to";

export default class TaskController {
  public router = Router();
  private path = "/tasks";
  private taskService = new TaskService();

  constructor() {
    this.router.post(`${this.path}`, this.createTask);
    this.router.get(`${this.path}`, this.getTasks);
    this.router.get(`${this.path}/:id`, this.getTask);
    this.router.put(`${this.path}/:id`, this.updateTask);
    this.router.delete(`${this.path}/:id`, this.deleteTask);
  }

  private createTask = async (req: Request, res: Response) => {
    const { success, data, error } = taskSchema.safeParse(req.body);

    if (!success) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error", details: formatZodErrors(error) });
      return;
    }

    const [creationError, task] = await to(this.taskService.createTask(data));

    if (creationError) {
      req.statusMessage = "Could not create task";
      throw creationError;
    }

    res.status(StatusCodes.CREATED).json(task);
  };

  private getTasks = async (req: Request, res: Response) => {
    const [error, tasks] = await to(this.taskService.getTasks(req.query));

    if (error) {
      res.json({ message: "Could not get tasks" });
      throw error;
    }

    res.status(StatusCodes.OK).json(tasks);
  };

  private getTask = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No id provided" });
      return;
    }

    const [error, task] = await to(this.taskService.getTask(req.params.id));

    if (error) {
      req.statusMessage = "Could not get task";
      throw error;
    }

    res.status(StatusCodes.OK).json(task);
  };

  private updateTask = async (req: Request, res: Response) => {
    const { success, data, error } = taskSchema.safeParse(req.body);

    if (!success) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error", details: formatZodErrors(error) });
      return;
    }

    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No id provided" });
      return;
    }

    const [updateError, task] = await to(
      this.taskService.updateTask(req.params.id, data)
    );

    if (updateError) {
      req.statusMessage = "Could not update task";
      throw updateError;
    }

    res.status(StatusCodes.OK).json(task);
  };

  private deleteTask = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No id provided" });
      return;
    }

    const [deleteError, task] = await to(
      this.taskService.deleteTask(req.params.id)
    );

    if (deleteError) {
      req.statusMessage = "Could not delete task";
      throw deleteError;
    }

    if (!task) {
      res.status(StatusCodes.NOT_FOUND).json({ message: "Task not found" });
      return;
    }

    res.status(StatusCodes.OK).json(task);
  };
}
