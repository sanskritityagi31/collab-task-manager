import { getIO, getUserSocket } from "../sockets";
import prisma from "../prisma";
import * as taskRepo from "../repositories/task.repository";
import { TaskPriority, TaskStatus } from "@prisma/client";

interface CreateTaskInput {
  title: string;
  description: string;
  dueDate: string;
  priority: TaskPriority;
  assignedToId: string;
}

export const createTaskService = async (
  creatorId: string,
  data: CreateTaskInput
) => {
  const assignee = await prisma.user.findUnique({
    where: { id: data.assignedToId },
  });

  if (!assignee) {
    throw new Error("Assigned user does not exist");
  }

  const task = await taskRepo.createTask({
    title: data.title,
    description: data.description,
    dueDate: new Date(data.dueDate),
    priority: data.priority,
    status: TaskStatus.TODO,
    creator: { connect: { id: creatorId } },
    assignee: { connect: { id: data.assignedToId } },
  });

  await prisma.notification.create({
    data: {
      userId: data.assignedToId,
      message: `You have been assigned a new task: ${task.title}`,
    },
  });

  const socketId = getUserSocket(data.assignedToId);

  if (socketId) {
    getIO().to(socketId).emit("task:assigned", {
      taskId: task.id,
      title: task.title,
      message: "You have been assigned a new task",
    });
  }

  return task;
};

export const updateTaskService = async (
  taskId: string,
  userId: string,
  data: any
) => {
  const task = await taskRepo.getTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new Error("You are not authorized to update this task");
  }

  if (data.assignedToId && data.assignedToId !== task.assignedToId) {
    const userExists = await prisma.user.findUnique({
      where: { id: data.assignedToId },
    });

    if (!userExists) {
      throw new Error("Assigned user does not exist");
    }

    await prisma.notification.create({
      data: {
        userId: data.assignedToId,
        message: `You have been assigned a task: ${task.title}`,
      },
    });
  }

  const updatedTask = await taskRepo.updateTask(taskId, {
    ...data,
    dueDate: data.dueDate ? new Date(data.dueDate) : undefined,
  });

  // broadcast update to all connected clients
  getIO().emit("task:updated", {
    taskId: updatedTask.id,
    status: updatedTask.status,
    priority: updatedTask.priority,
    assignedToId: updatedTask.assignedToId,
  });

  return updatedTask;
};

export const deleteTaskService = async (
  taskId: string,
  userId: string
) => {
  const task = await taskRepo.getTaskById(taskId);

  if (!task) {
    throw new Error("Task not found");
  }

  if (task.creatorId !== userId) {
    throw new Error("You are not authorized to delete this task");
  }

  return taskRepo.deleteTask(taskId);
};

export const getAllTasksService = async () => {
  return taskRepo.getAllTasks();
};
