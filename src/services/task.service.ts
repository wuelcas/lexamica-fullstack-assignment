import Task from "../models/task.model";
import type { TaskSchema } from "../validation-schemas/task.schema";

class TaskService {
  async createTask(newTask: TaskSchema) {
    const task = new Task(newTask);
    return task.save();
  }

  async getTasks() {
    return Task.find().populate("category");
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
