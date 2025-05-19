import _ from "lodash";
import Task from "../models/task.model";
import type { TaskSchema } from "../validation-schemas/task.schema";

class TaskService {
  async createTask(newTask: TaskSchema) {
    const task = new Task(newTask);
    return task.save();
  }

  async getTasks(params: any) {
    const total = await Task.aggregate([
      {
        $count: "count",
      },
    ]);

    let { count, page, sort = "position,asc" } = params;

    count = _.isFinite(parseInt(count)) ? parseInt(count) : 100;
    page = _.isFinite(parseInt(page)) ? parseInt(page) : 1;
    sort = sort.split(",");

    const tasks = await Task.find()
      .populate("category")
      .skip((page - 1) * count)
      .limit(count)
      .sort([sort]);

    return {
      total: total[0].count,
      tasks,
    };
  }

  async getTask(id: string) {
    return Task.findById(id).populate("category");
  }

  async updateTask(id: string, task: TaskSchema) {
    const oldTask = await Task.findById(id);

    if (!oldTask) {
      return null;
    }

    if (
      oldTask.position !== task.position &&
      oldTask.category.toString() !== task.category
    ) {
      await this.shiftTasksInNewCategory(task.position, task.category);
      await this.reorderTaskInOldCategory(
        oldTask.position,
        oldTask.category.toString()
      );
    }

    if (
      oldTask.position !== task.position &&
      oldTask.category.toString() === task.category
    ) {
      await this.shiftTasksInSameCategory(oldTask.position, task.position);
    }

    return Task.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string) {
    return Task.findByIdAndDelete(id);
  }

  private async shiftTasksInSameCategory(
    oldPosition: number,
    newPosition: number
  ) {
    const movedUp = oldPosition < newPosition;
    let tasks = [];

    if (movedUp) {
      tasks = await Task.find({
        position: { $gte: oldPosition, $lte: newPosition },
      });
      for (const task of tasks) {
        task.position -= 1;
        await task.save();
      }
      return;
    }

    tasks = await Task.find({
      position: { $gte: newPosition, $lte: oldPosition },
    });

    for (const task of tasks) {
      task.position += 1;
      await task.save();
    }
  }

  private async shiftTasksInNewCategory(
    newPosition: number,
    newCategoryId: string
  ) {
    const tasks = await Task.find({
      position: { $gte: newPosition },
      category: newCategoryId,
    });

    for (const task of tasks) {
      task.position += 1;
      await task.save();
    }
    return;
  }

  private async reorderTaskInOldCategory(
    oldPosition: number,
    oldCategoryId: string
  ) {
    const tasks = await Task.find({
      position: { $gte: oldPosition },
      category: oldCategoryId,
    });

    for (const task of tasks) {
      task.position -= 1;
      await task.save();
    }
    return;
  }
}

export default TaskService;
