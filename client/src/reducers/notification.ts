import { handleActions, Action } from "redux-actions";
import { NotificationState, Notification } from "../models/notification";
import { GET_NOTIFICATION } from "../constants";

const initialState: NotificationState = { notifications: [] };

export default handleActions<NotificationState, Notification[]>({
    [GET_NOTIFICATION]: (state: NotificationState, action: Action<Notification[]>) => {
        return {
            notifications: action.payload ? action.payload : []
        };
    }
}, initialState);