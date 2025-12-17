import { Request, Response } from "express";
import { CreateTaskDto, UpdateTaskDto } from "../dtos/task.dto";
import { TaskService } from "../services/task.service";

export const TaskController = {
  async create(req: any, res: Response) {
    const data = CreateTaskDto.parse(req.body);
    const task = await TaskService.createTask(req.userId, data);
    res.status(201).json(task);
  },

  async getAll(_req: Request, res: Response) {
    const tasks = await TaskService.getTasks();
    res.json(tasks);
  },

  async update(req: Request, res: Response) {
    const data = UpdateTaskDto.parse(req.body);
    const task = await TaskService.updateTask(req.params.id, data);
    res.json(task);
  },
};
