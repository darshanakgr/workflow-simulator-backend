import TaskGroupController from "./task-group-controller";
import TaskController from "./task-controller";
import { TaskGroupObserver } from "../observer/task-group-observer";
import { ITask } from "../models/task";
import { WSError } from "../types";

const observers: {[groupId: string]: TaskGroupObserver} = {};

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