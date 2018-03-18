/**
 * A module, contains all the functions of handling task-groups
 * Uses the schema of TaskGroup
 */

import { TaskGroup, ITaskGroup } from "../models/task-group";
import PermissionController from "./permission-controller";
import { VIEW_ONLY, FULL_ACCESS } from "../types";

/**
 * Creates new task-group
 * @param {ITaskGroup} taskGroup - an object to save in database
 */
const createTaskGroup = (taskGroup: ITaskGroup) => {
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
const updateTaskGroup = (groupId: string, taskGroup: ITaskGroup) => {
    return TaskGroup.update({groupId}, {
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

const findTaskGroupByUserId = (userId: string) => {
    return TaskGroup.find({createdBy: userId});
};

/**
 * Deletes a task-group for provided id.
 * @param {string} groupId - id of the task-group to be changed.
 */
const deleteTaskGroup = (groupId: string) => {
    return TaskGroup.findOneAndRemove({groupId});
};

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

export default { createTaskGroup, updateTaskGroup, getAllTasks, findTaskGroup, deleteTaskGroup, findTaskGroupByUserId, isExist };