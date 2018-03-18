import TaskController from "./task-controller";
import TaskGroupController from "./task-group-controller";
import ObserverController from "./observer-controller";
import { ITask } from "../models/task";
import PermissionController from "./permission-controller";
import { FULL_ACCESS, WSError, VIEW_ONLY } from "../types";

const socketHandler = (socket: SocketIO.Socket) => {
    console.log(`Connection Created ${socket.id}`);

    socket.on("disconnect", () => {
        console.log("Connection terminated");
    });

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

    socket.on("updateProgress", (task, key, callback) => {
        if (task.taskId && task.groupId && key) {
            PermissionController.authenticate(key, task.groupId, FULL_ACCESS).then((authenticated) => {
                if (authenticated) {
                    return ObserverController.notifyUpdate(task);
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
};

export default socketHandler;