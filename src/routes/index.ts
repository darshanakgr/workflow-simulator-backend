import express from "express";
import taskGroupRouter from "./task-group-routes";
import taskRouter from "./task-routes";
import authRouter from "./auth-routes";
import notificationRouter from "./notification-routes";

const router = express.Router();

router.use("/api/taskgroup", taskGroupRouter);
router.use("/api/task", taskRouter);
router.use("/api/notification", notificationRouter);
router.use("/api", authRouter);

export default router;
