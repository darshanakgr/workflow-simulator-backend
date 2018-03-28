import { createAction } from "redux-actions";
import { Notification } from "../models/notification";
import { GET_NOTIFICATION } from "../constants";

export const getNotifications = createAction<Notification[], Notification[]>(
    GET_NOTIFICATION,
    (notifications: Notification[]) => notifications
);