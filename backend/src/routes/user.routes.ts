import { Router } from "express";
import { getAllUsers } from "../controllers/user.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Get all users (for task assignment dropdown)
router.get("/", authMiddleware, getAllUsers);

export default router;
