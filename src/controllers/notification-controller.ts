import { INotification, Notification } from "../models/notification";


const sendNotification = (notification: INotification, userId: string) => {
    notification.userId = userId;
    return new Notification(notification).save();
};

const getNotifications = (userId: string) => {
    return Notification.find({to: userId}).where("state").equals(0);
};

export default { sendNotification, getNotifications };