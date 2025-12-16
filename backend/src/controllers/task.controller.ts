import { Request, Response } from "express";
import {
  createTaskSchema,
  updateTaskSchema,
} from "../dtos/task.dto";
import {
  createTaskService,
  updateTaskService,
  deleteTaskService,
  getAllTasksService,
} from "../services/task.service";

export const createTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const data = createTaskSchema.parse(req.body);

    const task = await createTaskService(userId, data);
    res.status(201).json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.id;
    const data = updateTaskSchema.parse(req.body);

    const task = await updateTaskService(taskId, userId, data);
    res.json(task);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).userId;
    const taskId = req.params.id;

    const task = await deleteTaskService(taskId, userId);
    res.json(task);
  } catch (error: any) {
    res.status(403).json({ error: error.message });
  }
};

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const tasks = await getAllTasksService();
    res.json(tasks);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
