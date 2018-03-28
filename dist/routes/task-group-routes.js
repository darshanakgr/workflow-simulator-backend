"use strict";
/**
 * Contains all the routes that uses the controller of task-group.
 * Uses express router.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_group_controller_1 = __importDefault(require("../controllers/task-group-controller"));
const permission_controller_1 = __importDefault(require("../controllers/permission-controller"));
const router = express_1.default.Router();
router.get("/find/:groupId", (req, res) => {
    task_group_controller_1.default.findTaskGroup(req.params.groupId).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/", (req, res) => {
    task_group_controller_1.default.findTaskGroupByUserId(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/shared", (req, res) => {
    task_group_controller_1.default.findTaskGroupShared(req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.post("/", (req, res) => {
    task_group_controller_1.default.createTaskGroup(req.body, req.user.toString()).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.delete("/:groupId", (req, res) => {
    task_group_controller_1.default.deleteTaskGroup(req.params.groupId, req.user.toString()).then((result) => {
        res.status(200).send();
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/secret/:groupId", (req, res) => {
    permission_controller_1.default.getSecretKeys(req.user.toString(), req.params.groupId).then((permission) => {
        if (!permission) {
            return res.status(400).end();
        }
        res.status(200).send(permission);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.post("/share/:email/:groupId", (req, res) => {
    permission_controller_1.default.shareGroup(req.params.email, req.params.groupId).then((permission) => {
        if (!permission) {
            return res.status(400).end();
        }
        res.status(200).send(permission);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/share/", (req, res) => {
    permission_controller_1.default.getGroupIds(req.user.toString()).then((groupIds) => {
        res.status(200).send(groupIds);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.put("/", (req, res) => {
    task_group_controller_1.default.updateTaskGroup(req.body).then((taskgroup) => {
        res.status(200).send(taskgroup);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
exports.default = router;
//# sourceMappingURL=task-group-routes.js.map