"use strict";
/**
 * A module that exports a class for Observer.
 */
Object.defineProperty(exports, "__esModule", { value: true });
class TaskGroupObserver {
    constructor(groupId) {
        this.groupId = groupId;
        this.sockets = {};
    }
    addObserver(socket) {
        this.sockets[socket.id] = socket;
    }
    removeObserver(socket) {
        delete this.sockets[socket.id];
    }
    notifyObserver(error, message) {
        for (const socketId in this.sockets) {
            if (this.sockets[socketId] && this.sockets[socketId].connected) {
                this.sockets[socketId].emit("notifyUpdate", error, message);
            }
            else {
                this.removeObserver(this.sockets[socketId]);
            }
        }
    }
}
exports.TaskGroupObserver = TaskGroupObserver;
//# sourceMappingURL=task-group-observer.js.map