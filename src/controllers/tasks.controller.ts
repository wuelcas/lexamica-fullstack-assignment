import { Router, type Request, type Response } from "express";
import { taskSchema } from "../validation-schemas/task.schema";
import TaskService from "../services/task.service";
import { StatusCodes } from "http-status-codes";

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
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      return;
    }
    const task = await this.taskService.createTask(data.name);
    res.status(StatusCodes.CREATED).json(task);
  };

  private getTasks = async (req: Request, res: Response) => {
    const tasks = await this.taskService.getTasks();
    res.status(StatusCodes.OK).json(tasks);
  };

  private getTask = async (req: Request, res: Response) => {
    const task = await this.taskService.getTask(req.params.id || "");
    res.status(StatusCodes.OK).json(task);
  };

  private updateTask = async (req: Request, res: Response) => {
    const { success, data, error } = taskSchema.safeParse(req.body);
    if (!success) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      return;
    }
    const task = await this.taskService.updateTask(
      req.params.id || "",
      data.name,
    );
    res.status(StatusCodes.OK).json(task);
  };

  private deleteTask = async (req: Request, res: Response) => {
    const task = await this.taskService.deleteTask(req.params.id || "");
    res.status(StatusCodes.OK).json(task);
  };
}
