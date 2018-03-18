import express from "express";
import TaskController from "../controllers/task-controller";

const router = express.Router();

router.get("/", (req, res) => {
    TaskController.getAllTasks().then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get("/find/:taskId", (req, res) => {
    TaskController.findTask(req.params.taskId).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.get("/:groupId", (req, res) => {
    TaskController.findTasksByGroup(req.params.groupId).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.post("/", (req, res) => {
    TaskController.createTask(req.body).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e.message);
    });
});

router.patch("/:groupId/:taskId", (req, res) => {
    TaskController.updateTask(req.params.groupId, req.params.taskId, req.body).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

export default router;
