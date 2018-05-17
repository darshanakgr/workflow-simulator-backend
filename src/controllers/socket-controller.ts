/**
 * A module, contains all the functions of handling web-sockets
 * Uses the socket.io
 */

import TaskController from "./task-controller";
import TaskGroupController from "./task-group-controller";
import ObserverController from "./observer-controller";
import { ITask } from "../models/task";
import PermissionController from "./permission-controller";
import { FULL_ACCESS, WSError, VIEW_ONLY } from "../types";


/**
 * Manage all the functions with a live socket with the client
 * Uses redis to maximize the performance of database accessing
 * Each action needs to be authenticated before executing
 * @param {SocketIO.Socket} socket - socket object
 */
const socketHandler = (socket: SocketIO.Socket) => {
    console.log(`Connection Created ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("Connection terminated");
    });

    /**
     * Create a task-subroutine
     */
    socket.on("createTask", (task, key, callback) => {
        if (task.taskId && task.groupId && key) {
            PermissionController.authenticate(key, task.groupId, FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return TaskController.createTask(task);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("TaskID, GroupId, or Key cannot be empty");
        }
    });

    /**
     * Add new observer to a client
     */
    socket.on("addListener", (groupId, key, callback) => {
        if (groupId && key) {
            PermissionController.authenticate(key, groupId, FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return  ObserverController.addListener(groupId, socket);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback();
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("GroupId or Key cannot be empty");
        }
    });

    /**
     * Update the state of a task-subroutine
     */
    socket.on("updateProgress", (task, key, callback) => {
        if (task.taskId && task.groupId && key) {
            PermissionController.authenticate(key, task.groupId, FULL_ACCESS).then((authenticated) => {
                if (!authenticated) {
                    return callback("Required access level is not provided");
                }
                return ObserverController.notifyUpdate(task);
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("TaskID, GroupId, or Key cannot be empty");
        }
    });

    /**
     * Notify error messages to clients/observers
     */
    socket.on("notifyError", (error: WSError, key: string, callback: Function) => {
        if (error.groupId && key) {
            PermissionController.authenticate(key, error.groupId, FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return  ObserverController.notifyError(error);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("GroupId or Key cannot be empty");
        }
    });

    /**
     * Calls when the connection is initialized
     */
    socket.on("authenticate", (key: string, groupId: string, callback: Function) => {
        if (groupId && key) {
            PermissionController.authenticate(key, groupId, FULL_ACCESS).then((authenticated) => {
                if (!authenticated) {
                    return callback("Required access level is not provided");
                }
                return callback();
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("GroupId or Key cannot be empty");
        }
    });

    /**
     * Get all the tasks
     */
    socket.on("getTasks", (key: string, groupId: string, callback: Function) => {
        if (groupId && key) {
            PermissionController.authenticate(key, groupId, FULL_ACCESS).then((authenticated) => {
                if (!authenticated) {
                    return callback("Required access level is not provided");
                }
                return TaskController.findTasksByGroup(groupId);
            }).then((tasks) => {
                callback(undefined, tasks);
            }).catch((e) => {
                callback(e);
            });
        } else {
            callback("GroupId or Key cannot be empty");
        }
    });
};

export default socketHandler;