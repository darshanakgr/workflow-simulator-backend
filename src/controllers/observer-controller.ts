/**
 * A module, contains all the functions of handling clients/observers
 */

import TaskGroupController from "./task-group-controller";
import TaskController from "./task-controller";
import { TaskGroupObserver } from "../observer/task-group-observer";
import { ITask } from "../models/task";
import { WSError } from "../types";

/**
 * Live connections with the clients
 */
const observers: {[groupId: string]: TaskGroupObserver} = {};

/**
 * Add a listener from a clinet
 * @param {string} groupId - id of the task-group
 * @param {SocketIO.Socket} socket - socket
 */
const addListener = (groupId: string, socket: SocketIO.Socket) => {
    return new Promise((resolve, reject) => {
        if (observers[groupId] == undefined) {
            TaskGroupController.findTaskGroup(groupId).then((taskgroup) => {
                if (!taskgroup) {
                    return reject("No task-group found for this id");
                }
                observers[groupId] = new TaskGroupObserver(groupId);
                observers[groupId].addObserver(socket);
                return resolve(observers[groupId]);
            }).catch((e) => {
                return reject(e.message);
            });
        } else {
            observers[groupId].addObserver(socket);
            return resolve(observers[groupId]);
        }
    });
};

/**
 * When the connection is dead it will be removed from the clients-collection
 * @param {string} groupId - id of the task-group
 * @param {SocketIO.Socket} socket - socket
 */
const removeListener = (groupId: string, socket: SocketIO.Socket) => {
    return new Promise((resolve, reject) => {
        if (observers[groupId] == undefined) {
            return reject("No listener added before");
        } else {
            observers[groupId].removeObserver(socket);
            if (Object.keys(observers[groupId].sockets).length == 0) {
                delete observers[groupId];
                return resolve(observers);
            }
            return resolve(observers);
        }
    });
};

/**
 * When a state change occurred clients will be notified
 * @param {ITask} task - task-subroutine object
 */
const notifyUpdate = (task: ITask) => {
    return new Promise((resolve, reject) => {
        TaskController.updateTask(task).then((result) => {
            if (result.n > 0) {
                if (observers[task.groupId] != undefined) {
                    const observer = observers[task.groupId];
                    observer.notifyObserver(undefined, {
                        timestamp: new Date().getTime(),
                        state: task
                    });
                    return resolve({modified: result.n, notifiedObservers: Object.keys(observer.sockets)});
                }
                return resolve({modified: result.n, notifiedObservers: 0});
            }
            return reject("No Task found with that id");
        }).catch((e) => reject(e.message));
    });
};

/**
 * When an error occurred all the clients will be notified
 * @param {WSError} error - error object
 */
const notifyError = (error: WSError) => {
    return new Promise((resolve, reject) => {
        if (observers[error.groupId] != undefined) {
            const observer = observers[error.groupId];
            observer.notifyObserver(error);
            return resolve({notifiedObservers: Object.keys(observer.sockets)});
        }
        return resolve({notifiedObservers: []});
    });
};

export default {
    addListener,
    removeListener,
    notifyUpdate,
    notifyError
};