import prisma from "../prisma";
import { TaskRepository } from "../repositories/task.repository";
import { getIO } from "../server";
import { TaskStatus } from "@prisma/client";

export const TaskService = {
  async createTask(userId: string, data: any) {
    const task = await TaskRepository.create({
      title: data.title,
      description: data.description,
      dueDate: new Date(data.dueDate),
      priority: data.priority,
      status: TaskStatus.TODO,
      creatorId: userId,
      assignedToId: data.assignedToId ?? userId,
    });

    // 🔔 Notification
    if (data.assignedToId && data.assignedToId !== userId) {
      await prisma.notification.create({
        data: {
          userId: data.assignedToId,
          message: `You were assigned a task: ${task.title}`,
        },
      });

      // Emit only if socket exists
      try {
        getIO().emit("task:assigned", {
          userId: data.assignedToId,
          task,
        });
      } catch {}
    }

    try {
      getIO().emit("task:created", task);
    } catch {}

    return task;
  },

  async updateTask(taskId: string, data: any) {
    const task = await TaskRepository.update(taskId, {
      ...data,
      dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
    });

    try {
      getIO().emit("task:updated", task);
    } catch {}

    return task;
  },

  async getTasks() {
    return TaskRepository.findAll();
  },
};
