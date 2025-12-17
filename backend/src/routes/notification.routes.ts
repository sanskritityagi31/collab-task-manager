import express from "express";
import { NotificationController } from "../controllers/notification.controller";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = express.Router();

router.get("/", authMiddleware, NotificationController.getNotifications);
router.put("/:id/read", authMiddleware, NotificationController.markAsRead);

export default router;
