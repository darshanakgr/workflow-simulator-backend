/**
 * Contains all the routes that uses the controller of task-group.
 * Uses express router.
 */

import express from "express";
import TaskGroupController from "../controllers/task-group-controller";

const router = express.Router();

router.get("/", (req, res) => {
    TaskGroupController.getAllTasks().then((result: any) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/find/:groupId", (req, res) => {
    TaskGroupController.findTaskGroup(req.params.groupId).then((result) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/:userId", (req, res) => {
    TaskGroupController.findTaskGroupByUserId(req.params.userId).then((result) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.post("/", (req, res) => {
    TaskGroupController.createTaskGroup(req.body).then((result: any) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.patch("/:groupId", (req, res) => {
    TaskGroupController.updateTaskGroup(req.params.groupId, req.body).then((result: any) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.delete("/:groupId", (req, res) => {
    TaskGroupController.deleteTaskGroup(req.params.groupId).then((result: any) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

export default router;


