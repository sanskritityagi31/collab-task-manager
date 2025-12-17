import { z } from "zod";

export const CreateTaskDto = z.object({
  title: z.string().min(1).max(100),
  description: z.string(),
  dueDate: z.string(), // ISO string from frontend
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
  assignedToId: z.string().optional(),
});

export const UpdateTaskDto = z.object({
  title: z.string().min(1).max(100).optional(),
  description: z.string().optional(),
  dueDate: z.string().optional(),
  priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]).optional(),
  status: z.enum(["TODO", "IN_PROGRESS", "REVIEW", "COMPLETED"]).optional(),
  assignedToId: z.string().nullable().optional(),
});
