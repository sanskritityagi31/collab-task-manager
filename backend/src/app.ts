import notificationRoutes from "./routes/notification.routes";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";

import authRoutes from "./routes/auth.routes";
import taskRoutes from "./routes/task.routes";
import userRoutes from "./routes/user.routes";

dotenv.config();

const app = express();

/* ---------------- MIDDLEWARES ---------------- */

app.use(
  cors({
    origin: "http://localhost:5174", // frontend URL
    credentials: true,               // allow cookies
  })
);

app.use(express.json());
app.use(cookieParser());

/* ---------------- HEALTH CHECK ---------------- */

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "OK" });
});

/* ---------------- ROUTES ---------------- */

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);
app.use("/api/notifications", notificationRoutes);


/* ---------------- FALLBACK ---------------- */

app.use((_req, res) => {
  res.status(404).json({ error: "Route not found" });
});

export default app;
