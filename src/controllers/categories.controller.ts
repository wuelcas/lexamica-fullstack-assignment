import { Router, type Request, type Response } from "express";
import { categorySchema } from "../validation-schemas/category.schema";
import CategoryService from "../services/category.service";
import { StatusCodes } from "http-status-codes";

export default class CategoryController {
  public router = Router();
  private path = "/categories";
  private categoryService = new CategoryService();

  constructor() {
    this.router.post(`${this.path}`, this.createCategory);
    this.router.get(`${this.path}`, this.getCategories);
    this.router.get(`${this.path}/:id`, this.getCategory);
    this.router.put(`${this.path}/:id`, this.updateCategory);
    this.router.delete(`${this.path}/:id`, this.deleteCategory);
  }

  private createCategory = async (req: Request, res: Response) => {
    const { success, data, error } = categorySchema.safeParse(req.body);
    if (!success) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      return;
    }
    const category = await this.categoryService.createCategory(data.name);
    res.status(StatusCodes.CREATED).json(category);
  };

  private getCategories = async (req: Request, res: Response) => {
    const categories = await this.categoryService.getCategories();
    res.status(StatusCodes.OK).json(categories);
  };

  private getCategory = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "No id provided" });
      return;
    }

    const category = await this.categoryService.getCategory(req.params.id);
    res.status(StatusCodes.OK).json(category);
  };

  private updateCategory = async (req: Request, res: Response) => {
    const { success, data, error } = categorySchema.safeParse(req.body);
    if (!success) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: error.message });
      return;
    }

    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "No id provided" });
      return;
    }

    const category = await this.categoryService.updateCategory(
      req.params.id,
      data.name,
    );
    res.status(StatusCodes.OK).json(category);
  };

  private deleteCategory = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ error: "No id provided" });
      return;
    }

    const category = await this.categoryService.deleteCategory(req.params.id);
    res.status(StatusCodes.OK).json(category);
  };
}
