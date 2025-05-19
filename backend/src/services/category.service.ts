import _ from "lodash";
import Category from "../models/category.model";
import type { CategorySchema } from "../validation-schemas/category.schema";
import Task from "../models/task.model";
import transformAgregateToJSON from "../utils/transformAgregateToJSON";

class CategoryService {
  async createCategory(newCategory: CategorySchema) {
    const category = new Category(newCategory);
    return category.save();
  }

  async getCategories(params: any) {
    const total = await Category.aggregate([
      {
        $count: "count",
      },
    ]);

    if (!total || total.length === 0) {
      return { total: 0, categories: [] };
    }

    let { count, page, sort = "position,asc" } = params;

    count = _.isFinite(parseInt(count)) ? parseInt(count) : 100;
    page = _.isFinite(parseInt(page)) ? parseInt(page) : 1;
    sort = sort.split(",");

    const categories = await Category.aggregate([
      {
        $lookup: {
          from: "tasks",
          localField: "_id",
          foreignField: "category",
          as: "tasks",
          pipeline: [
            {
              $sort: {
                position: 1,
              },
            },
          ],
        },
      },
      {
        $skip: (page - 1) * count,
      },
      {
        $limit: count,
      },
      {
        $sort: {
          [sort[0]]: sort[1] === "asc" ? 1 : -1,
        },
      },
    ]);

    return {
      total: total[0].count,
      categories: categories.map((category) => {
        category = transformAgregateToJSON(category);
        category.tasks = category.tasks.map((task: any) =>
          transformAgregateToJSON(task)
        );
        return category;
      }),
    };
  }

  async getCategory(id: string) {
    const category = await Category.findById(id);

    if (!category) {
      return null;
    }

    const tasks = await Task.find({ category: id }).sort({ position: 1 });

    return {
      ...category.toJSON(),
      tasks,
    };
  }

  async updateCategory(id: string, category: CategorySchema) {
    const session = await Category.startSession();
    let updatedCategory = null;
    try {
      await session.withTransaction(async () => {
        const oldCategory = await Category.findByIdAndUpdate(id, category, {
          session,
        });

        if (!oldCategory) {
          updatedCategory = null;
          await session.abortTransaction();
          return;
        }

        if (oldCategory.position !== category.position) {
          const categories = await Category.find(
            { position: { $gte: category.position } },
            null,
            { session }
          );

          for (const cat of categories) {
            cat.position += 1;
            await cat.save({ session });
          }
        }

        updatedCategory = await Category.findById(id, null, { session });
      });
    } finally {
      session.endSession();
    }
    return updatedCategory;
  }

  async deleteCategory(id: string) {
    return Category.findByIdAndDelete(id);
  }
}

export default CategoryService;
