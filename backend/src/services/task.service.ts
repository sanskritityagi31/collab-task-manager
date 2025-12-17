import { TaskRepository } from "../repositories/task.repository";
import prisma from "../prisma";
import { getIO } from "../server";

export class TaskService {
  static async createTask(userId: string, data: any) {
    const task = await TaskRepository.create(userId, data);

    if (data.assignedToId && data.assignedToId !== userId) {
      await prisma.notification.create({
        data: {
          userId: data.assignedToId,
          message: `You have been assigned a new task: ${task.title}`
        }
      });

      getIO().emit("task-assigned", task);
    }

    return task;
  }

  static async updateTask(taskId: string, data: any) {
    const task = await TaskRepository.update(taskId, data);
    getIO().emit("task-updated", task);
    return task;
  }

  static async deleteTask(taskId: string) {
    return TaskRepository.delete(taskId);
  }

  static async getTasks() {
    return TaskRepository.findAll();
  }
}
