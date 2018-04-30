"use strict";
/**
 * A module that contained all the http route handlers for task-subroutines
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const task_controller_1 = __importDefault(require("../controllers/task-controller"));
const router = express_1.default.Router();
router.get("/", (req, res) => {
    task_controller_1.default.getAllTasks().then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/find/:taskId", (req, res) => {
    task_controller_1.default.findTask(req.params.taskId).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.get("/:groupId", (req, res) => {
    task_controller_1.default.findTasksByGroup(req.params.groupId).then((result) => {
        res.send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.post("/", (req, res) => {
    task_controller_1.default.createTask(req.body).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
router.delete("/:groupId/:taskId", (req, res) => {
    task_controller_1.default.deleteTask(req.params.groupId, req.params.taskId).then((result) => {
        res.status(200).send(result);
    }).catch((e) => {
        res.status(400).send(e);
    });
});
exports.default = router;
//# sourceMappingURL=task-routes.js.map