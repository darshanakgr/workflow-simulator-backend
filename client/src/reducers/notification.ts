import { handleActions, Action } from "redux-actions";
import { NotificationState, Notification } from "../models/notification";
import { GET_NOTIFICATION, GET_USERS } from "../constants";
import { User } from "../models/notification";

const initialState: NotificationState = { notifications: [], users: []};

export default handleActions<NotificationState, Notification[] | User[]>({
    [GET_NOTIFICATION]: (state: NotificationState, action: Action<Notification[]>) => {
        return {
            notifications: action.payload ? action.payload : [],
            users: state.users
        };
    },
    [GET_USERS]: (state: NotificationState, action: Action<User[]>) => {
        return {
            notifications: state.notifications,
            users: action.payload ? action.payload : []
        };
    }
}, initialState);