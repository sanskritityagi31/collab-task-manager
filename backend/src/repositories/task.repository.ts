import prisma from "../prisma";

export class TaskRepository {
  static async create(userId: string, data: any) {
    return prisma.task.create({
      data: {
        ...data,
        creatorId: userId,
        status: "TODO"
      },
      include: {
        creator: true,
        assignedTo: true
      }
    });
  }

  static async update(taskId: string, data: any) {
    return prisma.task.update({
      where: { id: taskId },
      data,
      include: {
        creator: true,
        assignedTo: true
      }
    });
  }

  static async delete(taskId: string) {
    return prisma.task.delete({
      where: { id: taskId }
    });
  }

  static async findAll() {
    return prisma.task.findMany({
      include: {
        creator: true,
        assignedTo: true
      }
    });
  }
}
