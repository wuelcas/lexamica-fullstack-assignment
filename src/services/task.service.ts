import Task from "../models/task.model";

class TaskService {
  async createTask(name: string) {
    const task = new Task({ name });
    return task.save();
  }

  async getTasks() {
    return Task.find();
  }

  async getTask(id: string) {
    return Task.findById(id);
  }

  async updateTask(id: string, name: string) {
    return Task.findByIdAndUpdate(id, { name }, { new: true });
  }

  async deleteTask(id: string) {
    return Task.findByIdAndDelete(id);
  }
}

export default TaskService;
