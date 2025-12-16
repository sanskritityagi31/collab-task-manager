import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware";
import {
  createTask,
  getAllTasks,
  updateTask,
  deleteTask,
} from "../controllers/task.controller";

const router = Router();

router.get("/", authMiddleware, getAllTasks);
router.post("/", authMiddleware, createTask);
router.patch("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

export default router;
