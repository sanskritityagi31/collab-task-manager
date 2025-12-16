import prisma from "../prisma";
import { Prisma, Task } from "@prisma/client";

export const createTask = async (
  data: Prisma.TaskCreateInput
): Promise<Task> => {
  return prisma.task.create({ data });
};

export const getTaskById = async (id: string): Promise<Task | null> => {
  return prisma.task.findUnique({
    where: { id },
  });
};

export const getAllTasks = async () => {
  return prisma.task.findMany({
    include: {
      creator: {
        select: { id: true, name: true, email: true },
      },
      assignee: {
        select: { id: true, name: true, email: true },
      },
    },
    orderBy: {
      dueDate: "asc",
    },
  });
};

export const updateTask = async (
  id: string,
  data: Prisma.TaskUpdateInput
): Promise<Task> => {
  return prisma.task.update({
    where: { id },
    data,
  });
};

export const deleteTask = async (id: string): Promise<Task> => {
  return prisma.task.delete({
    where: { id },
  });
};
