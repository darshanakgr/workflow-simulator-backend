/**
 * A module that exports a schema to Permission.
 */

import mongoose from "mongoose";


interface INotification extends mongoose.Document {
    groupId: string;
    userId: string;
    to: string;
    state: number;
}

const notificationSchema = new mongoose.Schema({
    groupId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
});

const Notification = mongoose.model<INotification>("Notification", notificationSchema);


export { Notification, INotification };

