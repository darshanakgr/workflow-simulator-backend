"use strict";
/**
 * A module, contains all the functions of handling task-groups
 * Uses the schema of TaskGroup
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const task_group_1 = require("../models/task-group");
const permission_controller_1 = __importDefault(require("./permission-controller"));
const types_1 = require("../types");
const task_controller_1 = __importDefault(require("./task-controller"));
const permission_1 = require("../models/permission");
/**
 * Creates new task-group
 * @param {ITaskGroup} taskGroup - an object to save in database
 */
const createTaskGroup = (taskGroup, userId) => {
    taskGroup.createdBy = userId;
    return new Promise((resolve, reject) => {
        permission_controller_1.default.generatePermission(taskGroup.createdBy, taskGroup.groupId, types_1.FULL_ACCESS).then((res) => {
            return new task_group_1.TaskGroup(taskGroup).save();
        }).then((r) => {
            return resolve(r);
        }).catch((e) => {
            return reject(e);
        });
    });
};
/**
 * Updates an existing task-group
 * @param {string} groupId - id of the task-group to be changed.
 * @param {object} taskGroup - an object consists of attributes to be changed.
 */
const updateTaskGroup = (taskGroup) => {
    return task_group_1.TaskGroup.update({ groupId: taskGroup.groupId }, {
        $set: taskGroup
    }, {
        new: true
    });
};
/**
 * Outputs all the task-groups available in the database.
 */
const getAllTasks = () => {
    return task_group_1.TaskGroup.find({});
};
/**
 * Finds a task-group for provided id.
 * @param {string} groupId - id of the task-group to be changed.
 */
const findTaskGroup = (groupId) => {
    return task_group_1.TaskGroup.findOne({ groupId });
};
const findTaskGroupByUserId = (userId) => {
    return task_group_1.TaskGroup.find({ createdBy: userId });
};
/**
 * Deletes a task-group for provided id.
 * @param {string} groupId - id of the task-group to be changed.
 */
const deleteTaskGroup = (groupId, createdBy) => {
    return new Promise((resolve, reject) => {
        task_group_1.TaskGroup.findOne({ groupId, createdBy }).then((taskGroup) => {
            if (!taskGroup) {
                return reject(new Error("No task group found for that id"));
            }
            return task_controller_1.default.deleteAllTasks(groupId);
        }).then(() => {
            return permission_1.Permission.deleteMany({ groupId });
        }).then(() => {
            return task_group_1.TaskGroup.deleteOne({ groupId });
        }).then(() => {
            return resolve();
        }).catch(e => reject(e));
    });
};
const isExist = (groupId) => {
    return new Promise((resolve, reject) => {
        task_group_1.TaskGroup.findOne({ groupId }).then((taskGroup) => {
            if (taskGroup) {
                return resolve(true);
            }
            return resolve(false);
        }).catch(e => reject(e));
    });
};
const deleteTask = (groupId, taskId) => {
    return new Promise((resolve, reject) => {
        task_group_1.TaskGroup.findOne({ groupId }).then((taskGroup) => {
            if (!taskGroup) {
                return reject(new Error("No task group found for that id"));
            }
            taskGroup.childTasks = taskGroup.childTasks.filter(task => task != taskId);
            return updateTaskGroup(taskGroup);
        }).then((taskgroup) => {
            return resolve(taskgroup);
        }).catch(e => reject(e));
    });
};
const findTaskGroupShared = (userId) => {
    return new Promise((resolve, reject) => {
        permission_1.Permission.find({ userId }).then((permissions) => {
            if (!permissions.length) {
                return resolve([]);
            }
            const groupIds = permissions.map(p => p.groupId);
            return task_group_1.TaskGroup.find({
                groupId: { $in: groupIds },
                createdBy: { $nin: userId }
            });
        }).then((groups) => {
            return resolve(groups);
        }).catch(e => reject(e));
    });
};
exports.default = { createTaskGroup, updateTaskGroup, getAllTasks, findTaskGroup, deleteTaskGroup, findTaskGroupByUserId, isExist, deleteTask, findTaskGroupShared };
//# sourceMappingURL=task-group-controller.js.map