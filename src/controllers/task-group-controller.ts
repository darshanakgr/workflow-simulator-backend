/**
 * A module, contains all the functions of handling task-groups
 * Uses the schema of TaskGroup
 */

import { TaskGroup, ITaskGroup } from "../models/task-group";
import PermissionController from "./permission-controller";
import { VIEW_ONLY, FULL_ACCESS } from "../types";
import { ITask } from "../models/task";
import taskController from "./task-controller";
import { Permission } from "../models/permission";

/**
 * Creates new task-group
 * @param {ITaskGroup} taskGroup - an object to save in database
 */
const createTaskGroup = (taskGroup: ITaskGroup, userId: string) => {
    taskGroup.createdBy = userId;
    return new Promise((resolve, reject) => {
        PermissionController.generatePermission(taskGroup.createdBy, taskGroup.groupId, FULL_ACCESS).then((res) => {
            return new TaskGroup(taskGroup).save();
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
const updateTaskGroup = (taskGroup: ITaskGroup) => {
    return TaskGroup.update({groupId: taskGroup.groupId}, {
        $set: taskGroup
    }, {
        new: true
    });
};

/**
 * Outputs all the task-groups available in the database.
 */
const getAllTasks = () => {
    return TaskGroup.find({});
};

/**
 * Finds a task-group for provided id.
 * @param {string} groupId - id of the task-group to be changed.
 */
const findTaskGroup = (groupId: string) => {
    return TaskGroup.findOne({groupId});
};

/**
 * Find all the task groups for provided user id
 * @param {string} userId - id of the user
 */
const findTaskGroupByUserId = (userId: string) => {
    return TaskGroup.find({createdBy: userId});
};

/**
 * Deletes a task-group for provided id.
 * @param {string} groupId - id of the task-group to be changed.
 */
const deleteTaskGroup = (groupId: string, createdBy: string) => {
    return new Promise<ITask>((resolve, reject) => {
        TaskGroup.findOne({groupId, createdBy}).then((taskGroup) => {
            if (!taskGroup) {
                return reject(new Error("No task group found for that id"));
            }
            return taskController.deleteAllTasks(groupId);
        }).then(() => {
            return Permission.deleteMany({groupId});
        }).then(() => {
            return TaskGroup.deleteOne({groupId});
        }).then(() => {
            return resolve();
        }).catch(e => reject(e));
    });
};

/**
 * Find whether there is a task group for provided id
 * @param {string} groupId -id of the task-group
 */
const isExist = (groupId: string) => {
    return new Promise<boolean>((resolve, reject) => {
        TaskGroup.findOne({groupId}).then((taskGroup) => {
            if (taskGroup) {
                return resolve(true);
            }
            return resolve(false);
        }).catch(e => reject(e));
    });
};

/**
 * Delete the subroutine with provided ids
 * @param {string} groupId - id of the task-group
 * @param {string} taskId - id of the subroutine
 */
const deleteTask = (groupId: string, taskId: string) => {
    return new Promise<ITask>((resolve, reject) => {
        TaskGroup.findOne({groupId}).then((taskGroup) => {
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

/**
 * Find the shared task with a particular user
 * @param {string} userId - user id
 */
const findTaskGroupShared = (userId: string) => {
    return new Promise<ITaskGroup[]>((resolve, reject) => {
        Permission.find({userId}).then((permissions) => {
            if (!permissions.length) {
                return resolve([]);
            }
            const groupIds = permissions.map(p => p.groupId);
            return TaskGroup.find({
                groupId: {$in : groupIds},
                createdBy: {$nin: userId}
            });
        }).then((groups) => {
            return resolve(groups);
        }).catch(e => reject(e));
    });
};



export default { createTaskGroup,  updateTaskGroup, getAllTasks, findTaskGroup, deleteTaskGroup, findTaskGroupByUserId, isExist, deleteTask, findTaskGroupShared };