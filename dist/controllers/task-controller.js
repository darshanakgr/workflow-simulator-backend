"use strict";
/**
 * A module, contains all the functions of handling task-subroutines
 * Uses the schema of Task
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const task_1 = require("../models/task");
const task_group_controller_1 = __importDefault(require("./task-group-controller"));
/**
 * Create a new record for provided subroutine
 * @param {ITask} task - an object of the task-subroutine
 */
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
/**
 * Update the successor's parent array
 * @param {string} taskId - id of the subroutine
 * @param {Array<string>} successors - ids of the successor subroutines
 */
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
/**
 * Delete all the successor's reference of a task
 * @param {string} taskId - id of the task-subroutine
 * @param predecessors - ids of the predecessors subroutines
 */
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
/**
 * Update the record of a particular task-subroutine
 * @param task - task-subroutine object
 */
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
/**
 * Delete the record of a task-subroutine
 * @param {string} groupId - id of the task-group
 * @param {string} taskId - id of the task-subroutine
 */
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
/**
 * Delete all task-subroutines belongs to a task-group
 * @param {string} groupId - id of the task-group
 */
const deleteAllTasks = (groupId) => {
    return task_1.Task.deleteMany({ groupId });
};
/**
 * Get all the task-subroutines
 */
const getAllTasks = () => {
    return task_1.Task.find({});
};
/**
 * Find a task-subroutine
 * @param {string} taskId - id of the task-subroutine
 */
const findTask = (taskId) => {
    return task_1.Task.findOne({ taskId });
};
/**
 * Find all the task-subroutines belongs to a task-group
 * @param {string} groupId - id of the task-group
 */
const findTasksByGroup = (groupId) => {
    return task_1.Task.find({ groupId });
};
exports.default = { createTask, getAllTasks, updateTask, findTask, findTasksByGroup, deleteTask, deleteAllTasks };
//# sourceMappingURL=task-controller.js.map