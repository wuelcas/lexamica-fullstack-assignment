import { Router, type Request, type Response } from "express";
import { categorySchema } from "../validation-schemas/category.schema";
import CategoryService from "../services/category.service";
import { StatusCodes } from "http-status-codes";
import formatZodErrors from "../utils/formatZodErrors";
import to from "../utils/await-to";

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
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Validation Error", details: formatZodErrors(error) });
      return;
    }
    const [createError, category] = await to(
      this.categoryService.createCategory(data),
    );

    if (createError) {
      req.statusMessage = "Could not create category";
      throw createError;
    }

    res.status(StatusCodes.CREATED).json(category);
  };

  private getCategories = async (req: Request, res: Response) => {
    const [error, categories] = await to(
      this.categoryService.getCategories(req.query),
    );

    if (error) {
      res.json({ message: "Could not get categories" });
      throw error;
    }

    res.status(StatusCodes.OK).json(categories);
  };

  private getCategory = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No id provided" });
      return;
    }

    const [error, category] = await to(
      this.categoryService.getCategory(req.params.id),
    );

    if (error) {
      req.statusMessage = "Could not get category";
      throw error;
    }

    if (!category) {
      res.status(StatusCodes.NOT_FOUND);
      return;
    }

    res.status(StatusCodes.OK).json(category);
  };

  private updateCategory = async (req: Request, res: Response) => {
    const { success, data, error } = categorySchema.safeParse(req.body);
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

    const [updateError, category] = await to(
      this.categoryService.updateCategory(req.params.id, data),
    );

    if (updateError) {
      req.statusMessage = "Could not update category";
      throw updateError;
    }

    res.status(StatusCodes.OK).json(category);
  };

  private deleteCategory = async (req: Request, res: Response) => {
    if (!req.params.id) {
      res.status(StatusCodes.BAD_REQUEST).json({ message: "No id provided" });
      return;
    }

    const [deleteError, category] = await to(
      this.categoryService.deleteCategory(req.params.id),
    );

    if (deleteError) {
      req.statusMessage = "Could not delete category";
      throw deleteError;
    }

    res.status(StatusCodes.OK).json(category);
  };
}
