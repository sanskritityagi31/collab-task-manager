import prisma from "../prisma";

export const TaskRepository = {
  create(data: any) {
    return prisma.task.create({
      data,
      include: {
        creator: true,
        assignedTo: true, // ✅ CORRECT
      },
    });
  },

  update(id: string, data: any) {
    return prisma.task.update({
      where: { id },
      data,
      include: {
        creator: true,
        assignedTo: true, // ✅ CORRECT
      },
    });
  },

  findAll() {
    return prisma.task.findMany({
      orderBy: { createdAt: "desc" },
      include: {
        creator: true,
        assignedTo: true, // ✅ CORRECT
      },
    });
  },
};
