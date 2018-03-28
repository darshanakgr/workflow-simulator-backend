"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const task_group_controller_1 = __importDefault(require("./task-group-controller"));
const task_controller_1 = __importDefault(require("./task-controller"));
const task_group_observer_1 = require("../observer/task-group-observer");
const observers = {};
const addListener = (groupId, socket) => {
    return new Promise((resolve, reject) => {
        if (observers[groupId] == undefined) {
            task_group_controller_1.default.findTaskGroup(groupId).then((taskgroup) => {
                if (!taskgroup) {
                    return reject("No task-group found for this id");
                }
                observers[groupId] = new task_group_observer_1.TaskGroupObserver(groupId);
                observers[groupId].addObserver(socket);
                return resolve(observers[groupId]);
            }).catch((e) => {
                return reject(e.message);
            });
        }
        else {
            observers[groupId].addObserver(socket);
            return resolve(observers[groupId]);
        }
    });
};
const removeListener = (groupId, socket) => {
    return new Promise((resolve, reject) => {
        if (observers[groupId] == undefined) {
            return reject("No listener added before");
        }
        else {
            observers[groupId].removeObserver(socket);
            if (Object.keys(observers[groupId].sockets).length == 0) {
                delete observers[groupId];
                return resolve(observers);
            }
            return resolve(observers);
        }
    });
};
const notifyUpdate = (task) => {
    return new Promise((resolve, reject) => {
        task_controller_1.default.updateTask(task).then((result) => {
            if (result.n > 0) {
                if (observers[task.groupId] != undefined) {
                    const observer = observers[task.groupId];
                    observer.notifyObserver(undefined, {
                        timestamp: new Date().getTime(),
                        state: task
                    });
                    return resolve({ modified: result.n, notifiedObservers: Object.keys(observer.sockets) });
                }
                return resolve({ modified: result.n, notifiedObservers: 0 });
            }
            return reject("No Task found with that id");
        }).catch((e) => reject(e.message));
    });
};
const notifyError = (error) => {
    return new Promise((resolve, reject) => {
        if (observers[error.groupId] != undefined) {
            const observer = observers[error.groupId];
            observer.notifyObserver(error);
            return resolve({ notifiedObservers: Object.keys(observer.sockets) });
        }
        return resolve({ notifiedObservers: [] });
    });
};
exports.default = {
    addListener,
    removeListener,
    notifyUpdate,
    notifyError
};
//# sourceMappingURL=observer-controller.js.map