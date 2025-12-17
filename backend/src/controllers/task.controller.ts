import { Request, Response } from "express";
import { TaskService } from "../services/task.service";

export const TaskController = {
  createTask: async (req: Request, res: Response) => {
    try {
      const userId = req.user!.id;
      const task = await TaskService.createTask(userId, req.body);
      res.status(201).json(task);
    } catch (error) {
      console.error(error);
      res.status(400).json({ message: "Task creation failed" });
    }
  },

  getTasks: async (_req: Request, res: Response) => {
    try {
      const tasks = await TaskService.getTasks();
      res.json(tasks);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch tasks" });
    }
  },

  updateTask: async (req: Request, res: Response) => {
    try {
      const task = await TaskService.updateTask(
        req.params.id,
        req.body
      );
      res.json(task);
    } catch (error) {
      res.status(400).json({ message: "Task update failed" });
    }
  },

  deleteTask: async (req: Request, res: Response) => {
    try {
      await TaskService.deleteTask(req.params.id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ message: "Task deletion failed" });
    }
  },
};
