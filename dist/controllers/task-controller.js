"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../models/task");
const task_group_controller_1 = __importDefault(require("./task-group-controller"));
const createTask = (task) => {
    return new Promise((resolve, reject) => {
        let taskGroup;
        task_group_controller_1.default.findTaskGroup(task.groupId).then((group) => {
            if (!group) {
                return reject(new Error("No Task Group exists for that id"));
            }
            taskGroup = group;
            taskGroup.childTasks.push(task.taskId);
            return new task_1.Task(task).save();
        }).then((result) => {
            return task_group_controller_1.default.updateTaskGroup(taskGroup);
        }).then((result) => {
            return updateSuccessors(task.taskId, task.predecessors);
        }).then((result) => {
            return resolve(task);
        }).catch((e) => {
            return reject(e);
        });
    });
};
const updateSuccessors = (taskId, successors) => {
    return new Promise((resolve, reject) => {
        const result = [];
        successors.forEach((successor) => {
            findTask(successor).then((task) => {
                if (task) {
                    task.successors.push(taskId);
                    console.log(task);
                    updateTask(task).then((r) => result.push(r));
                }
            }).catch((e) => {
                return reject(e);
            });
        });
        return resolve(result);
    });
};
const deleteSuccessors = (taskId, predecessors) => {
    return new Promise((resolve, reject) => {
        const result = [];
        predecessors.forEach((predecessor) => {
            findTask(predecessor).then((task) => {
                if (task) {
                    task.successors = task.successors.filter(successor => successor != taskId);
                    updateTask(task).then((r) => result.push(r));
                }
            }).catch((e) => {
                return reject(e);
            });
        });
        return resolve(result);
    });
};
const updateTask = (task) => {
    return task_1.Task.update({
        taskId: task.taskId,
        groupId: task.groupId
    }, {
        $set: task
    }, {
        new: true
    });
};
const deleteTask = (groupId, taskId) => {
    return new Promise((resolve, reject) => {
        findTask(taskId).then((task) => {
            if (!task) {
                return reject(new Error("No Task exists for that id"));
            }
            return deleteSuccessors(task.taskId, task.predecessors);
        }).then((result) => {
            return task_1.Task.deleteOne({ taskId, groupId });
        }).then((result) => {
            return task_group_controller_1.default.deleteTask(groupId, taskId);
        }).then((result) => {
            return resolve(result);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    });
};
const deleteAllTasks = (groupId) => {
    return task_1.Task.deleteMany({ groupId });
};
const getAllTasks = () => {
    return task_1.Task.find({});
};
const findTask = (taskId) => {
    return task_1.Task.findOne({ taskId });
};
const findTasksByGroup = (groupId) => {
    return task_1.Task.find({ groupId });
};
exports.default = { createTask, getAllTasks, updateTask, findTask, findTasksByGroup, deleteTask, deleteAllTasks };
//# sourceMappingURL=task-controller.js.map