import express from "express";
import taskGroupRouter from "./task-group-routes";
import taskRouter from "./task-routes";
import authRouter from "./auth-routes";
import notificationRouter from "./notification-routes";
import { authenticate } from "../services/auth-service";

const router = express.Router();

router.use("/api/taskgroup", authenticate, taskGroupRouter);
router.use("/api/task", authenticate, taskRouter);
router.use("/api/notification", authenticate, notificationRouter);
router.use("/api", authRouter);

export default router;
