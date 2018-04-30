/**
 * A module, contains all the functions of handling notifications
 */

import { INotification, Notification } from "../models/notification";
import { User } from "../models/user";
import permissionController from "./permission-controller";
import { FULL_ACCESS } from "../types";

/**
 * Send notification
 * @param {INotification} notification - Notification object
 * @param {string} userId - id of the user
 */
const sendNotification = (notification: INotification, userId: string) => {
    notification.userId = userId;
    return new Notification(notification).save();
};

/**
 * Get all the notifcation of a user
 * @param {string} userId - id of the user
 */
const getNotifications = (userId: string) => {
    return Notification.find({to: userId}).where("state").equals(0);
};

/**
 * Get users
 * @param {string[]} userId - ids of the users
 */
const getUsers = (userId: string[]) => {
    return User.find({_id: {$in : userId}});
};

/**
 * A user clicked accept in a notification
 * @param {string} id - id of the notification
 */
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

/**
 * A user clicked ignore in a notification
 * @param {string} id - id of the notification
 */
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


/**
 * A user replies to a notification
 * @param {string} id - id of the notification
 */
const replyNotification = (id: string, accepted: boolean) => {
    if (accepted) {
        return acceptPermission(id);
    }
    return ignorePermission(id);
};

export default { sendNotification, getNotifications, getUsers, replyNotification };