/**
 * A module that contained all the http route handlers for Task-groups
 */

import express from "express";
import TaskGroupController from "../controllers/task-group-controller";
import permissionController from "../controllers/permission-controller";

const router = express.Router();

router.get("/find/:groupId", (req, res) => {
    TaskGroupController.findTaskGroup(req.params.groupId).then((result) => {
        res.send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/", (req, res) => {
    TaskGroupController.findTaskGroupByUserId(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/shared", (req, res) => {
    TaskGroupController.findTaskGroupShared(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.post("/", (req, res) => {
    TaskGroupController.createTaskGroup(req.body, req.user.toString()).then((result: any) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

router.delete("/:groupId", (req, res) => {
    TaskGroupController.deleteTaskGroup(req.params.groupId, req.user.toString()).then((result: any) => {
        res.status(200).send();
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/secret/:groupId", (req, res) => {
    permissionController.getSecretKeys(req.user.toString(), req.params.groupId).then((permission) => {
        if (!permission) { return res.status(400).end(); }
        res.status(200).send(permission);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.post("/share/:email/:groupId", (req, res) => {
    permissionController.shareGroup(req.params.email, req.params.groupId).then((permission) => {
        if (!permission) { return res.status(400).end(); }
        res.status(200).send(permission);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.get("/share/", (req, res) => {
    permissionController.getGroupIds(req.user.toString()).then((groupIds) => {
        res.status(200).send(groupIds);
    }).catch((e: any) => {
        res.status(400).send(e);
    });
});

router.put("/", (req, res) => {
    TaskGroupController.updateTaskGroup(req.body).then((taskgroup) => {
        res.status(200).send(taskgroup);
    }).catch((e) => {
        res.status(400).send(e);
    });
});

export default router;

