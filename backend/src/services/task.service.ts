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
    return Task.findByIdAndUpdate(id, task, { new: true });
  }

  async deleteTask(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export default TaskService;
