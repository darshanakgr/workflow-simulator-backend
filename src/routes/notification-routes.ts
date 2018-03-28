import express from "express";
import NotificationController from "../controllers/notification-controller";
const router = express.Router();

router.post("/", (req, res) => {
    NotificationController.sendNotification(req.body, req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get("/", (req, res) => {
    NotificationController.getNotifications(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});


export default router;
