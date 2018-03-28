import { createAction } from "redux-actions";
import { Notification } from "../models/notification";
import { GET_NOTIFICATION, GET_USERS } from "../constants";
import { User } from "../models/user";

export const getNotifications = createAction<Notification[], Notification[]>(
    GET_NOTIFICATION,
    (notifications: Notification[]) => notifications
);

export const getUsers = createAction<User[], User[]>(
    GET_USERS,
    (users: User[]) => users
);