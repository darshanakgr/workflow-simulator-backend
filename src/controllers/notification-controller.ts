import { INotification, Notification } from "../models/notification";
import { User } from "../models/user";
import permissionController from "./permission-controller";
import { FULL_ACCESS } from "../types";


const sendNotification = (notification: INotification, userId: string) => {
    notification.userId = userId;
    return new Notification(notification).save();
};

const getNotifications = (userId: string) => {
    return Notification.find({to: userId}).where("state").equals(0);
};

const getUsers = (userId: string[]) => {
    return User.find({_id: {$in : userId}});
};

const acceptPermission = (id: string) => {
    return new Promise((resolve, reject) => {
        Notification.findById(id).then((notification) => {
            if (!notification) {
                return reject(new Error("Not found"));
            }
            return Notification.findByIdAndUpdate(id, {
                $set: {
                    state: 1
                }
            }, {
                new: true
            });
        }).then((notification) => {
            return permissionController.generatePermission(notification.userId, notification.groupId, FULL_ACCESS);
        }).then((permission) => {
            return resolve();
        }).catch((e: any) => reject(e));
    });
};

const ignorePermission = (id: string) => {
    return new Promise((resolve, reject) => {
        Notification.findById(id).then((notification) => {
            if (!notification) {
                return reject(new Error("Not found"));
            }
            return Notification.findByIdAndUpdate(id, {
                $set: {
                    state: 2
                }
            }, {
                new: true
            });
        }).then((notification) => {
            return resolve();
        }).catch((e: any) => reject(e));
    });
};

const replyNotification = (id: string, accepted: boolean) => {
    if (accepted) {
        return acceptPermission(id);
    }
    return ignorePermission(id);
};




export default { sendNotification, getNotifications, getUsers, replyNotification };