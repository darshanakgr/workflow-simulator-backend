"use strict";
/**
 * A module, contains all the functions of handling web-sockets
 * Uses the socket.io
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const task_controller_1 = __importDefault(require("./task-controller"));
const observer_controller_1 = __importDefault(require("./observer-controller"));
const permission_controller_1 = __importDefault(require("./permission-controller"));
const types_1 = require("../types");
/**
 * Manage all the functions with a live socket with the client
 * Uses redis to maximize the performance of database accessing
 * Each action needs to be authenticated before executing
 * @param {SocketIO.Socket} socket - socket object
 */
const socketHandler = (socket) => {
    console.log(`Connection Created ${socket.id}`);
    socket.on("disconnect", () => {
        console.log("Connection terminated");
    });
    /**
     * Create a task-subroutine
     */
    socket.on("createTask", (task, key, callback) => {
        if (task.taskId && task.groupId && key) {
            permission_controller_1.default.authenticate(key, task.groupId, types_1.FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return task_controller_1.default.createTask(task);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        }
        else {
            callback("TaskID, GroupId, or Key cannot be empty");
        }
    });
    /**
     * Add new observer to a client
     */
    socket.on("addListener", (groupId, key, callback) => {
        if (groupId && key) {
            permission_controller_1.default.authenticate(key, groupId, types_1.FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return observer_controller_1.default.addListener(groupId, socket);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback();
            }).catch((e) => {
                callback(e);
            });
        }
        else {
            callback("GroupId or Key cannot be empty");
        }
    });
    /**
     * Update the state of a task-subroutine
     */
    socket.on("updateProgress", (task, key, callback) => {
        if (task.taskId && task.groupId && key) {
            permission_controller_1.default.authenticate(key, task.groupId, types_1.FULL_ACCESS).then((authenticated) => {
                if (!authenticated) {
                    return callback("Required access level is not provided");
                }
                return observer_controller_1.default.notifyUpdate(task);
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        }
        else {
            callback("TaskID, GroupId, or Key cannot be empty");
        }
    });
    /**
     * Notify error messages to clients/observers
     */
    socket.on("notifyError", (error, key, callback) => {
        if (error.groupId && key) {
            permission_controller_1.default.authenticate(key, error.groupId, types_1.FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return observer_controller_1.default.notifyError(error);
                }
                return callback("Required access level is not provided");
            }).then((res) => {
                callback(undefined, res);
            }).catch((e) => {
                callback(e);
            });
        }
        else {
            callback("GroupId or Key cannot be empty");
        }
    });
    /**
     * Calls when the connection is initialized
     */
    socket.on("authenticate", (key, groupId, callback) => {
        if (groupId && key) {
            permission_controller_1.default.authenticate(key, groupId, types_1.FULL_ACCESS).then((authenticated) => {
                if (!authenticated) {
                    return callback("Required access level is not provided");
                }
                return callback();
            }).catch((e) => {
                callback(e);
            });
        }
        else {
            callback("GroupId or Key cannot be empty");
        }
    });
};
exports.default = socketHandler;
//# sourceMappingURL=socket-controller.js.map