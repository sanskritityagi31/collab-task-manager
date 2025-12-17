import { Request, Response } from "express";
import prisma from "../prisma";

export const getNotifications = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;

  const notifications = await prisma.notification.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  res.json(notifications);
};

export const markAsRead = async (
  req: Request,
  res: Response
) => {
  const userId = (req as any).user.id;
  const { id } = req.params;

  await prisma.notification.updateMany({
    where: { id, userId },
    data: { read: true },
  });

  res.json({ success: true });
};
