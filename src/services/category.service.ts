import Category from "../models/category.model";

class CategoryService {
  async createCategory(name: string) {
    const category = new Category({ name });
    return category.save();
  }

  async getCategories() {
    return Category.find();
  }

  async getCategory(id: string) {
    return Category.findById(id);
  }

  async updateCategory(id: string, name: string) {
    return Category.findByIdAndUpdate(id, { name }, { new: true });
  }

  async deleteCategory(id: string) {
    return Category.findByIdAndDelete(id);
  }
}

export default CategoryService;
