import Category from "../models/category.model";
import type { CategorySchema } from "../validation-schemas/category.schema";

class CategoryService {
  async createCategory(newCategory: CategorySchema) {
    const category = new Category(newCategory);
    return category.save();
  }

  async getCategories() {
    return Category.find().populate("tasks");
  }

  async getCategory(id: string) {
    return Category.findById(id).populate("tasks");
  }

  async updateCategory(id: string, category: CategorySchema) {
    return Category.findByIdAndUpdate(id, category, { new: true });
  }

  async deleteCategory(id: string) {
    return Category.findByIdAndDelete(id);
  }
}

export default CategoryService;
