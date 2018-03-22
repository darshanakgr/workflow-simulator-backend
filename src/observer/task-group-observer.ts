import { WSError, WSMessage } from "../types";

class TaskGroupObserver {
    public groupId: string;
    public sockets: {[socketId: string]: SocketIO.Socket};
    constructor(groupId: string) {
        this.groupId = groupId;
        this.sockets = {};
    }

    addObserver(socket: SocketIO.Socket) {
        this.sockets[socket.id] = socket;
    }

    removeObserver(socket: SocketIO.Socket) {
        delete this.sockets[socket.id];
    }

    notifyObserver(error: WSError, message?: WSMessage) {
        console.log(Object.keys(this.sockets).length);
        for (const socketId in this.sockets) {
            if (this.sockets[socketId] && this.sockets[socketId].connected) {
                this.sockets[socketId].emit("notifyUpdate", error, message);
            } else {
                this.removeObserver(this.sockets[socketId]);
            }
        }
    }
}

export { TaskGroupObserver };