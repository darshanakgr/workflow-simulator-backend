/**
 * A module, contains all the functions of handling task-subroutines
 * Uses the schema of Task
 */

import { mongoose } from "../db/db-connection";
import { Task, ITask } from "../models/task";
import TaskGroupController from "./task-group-controller";
import { ITaskGroup, TaskGroup } from "../models/task-group";

/**
 * Create a new record for provided subroutine
 * @param {ITask} task - an object of the task-subroutine
 */
const createTask = (task: ITask) => {
    return new Promise((resolve, reject) => {
        let taskGroup: any;
        TaskGroupController.findTaskGroup(task.groupId).then((group) => {
            if (!group) {
                return reject(new Error("No Task Group exists for that id"));
            }
            taskGroup = group;
            taskGroup.childTasks.push(task.taskId);
            return new Task(task).save();
        }).then((result) => {
            return TaskGroupController.updateTaskGroup(taskGroup);
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
const updateSuccessors = (taskId: string, successors: Array<string>) => {
    return new Promise((resolve, reject) => {
        const result: Array<object> = [];
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
const deleteSuccessors = (taskId: string, predecessors: Array<string>) => {
    return new Promise((resolve, reject) => {
        const result: Array<object> = [];
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
const updateTask = (task: ITask) => {
    return Task.update({
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
const deleteTask = (groupId: string, taskId: string) => {
    return new Promise((resolve, reject) => {
        findTask(taskId).then((task) => {
            if (!task) {
                return reject(new Error("No Task exists for that id"));
            }
            return deleteSuccessors(task.taskId, task.predecessors);
        }).then((result) => {
            return Task.deleteOne({taskId, groupId});
        }).then((result) => {
            return TaskGroupController.deleteTask(groupId, taskId);
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
const deleteAllTasks = (groupId: string) => {
    return Task.deleteMany({groupId});
};

/**
 * Get all the task-subroutines
 */
const getAllTasks = () => {
    return Task.find({});
};

/**
 * Find a task-subroutine
 * @param {string} taskId - id of the task-subroutine
 */
const findTask = (taskId: string) => {
    return Task.findOne({taskId});
};

/**
 * Find all the task-subroutines belongs to a task-group
 * @param {string} groupId - id of the task-group
 */
const findTasksByGroup = (groupId: string) => {
    return Task.find({groupId});
};

export default { createTask, getAllTasks, updateTask, findTask, findTasksByGroup, deleteTask, deleteAllTasks };