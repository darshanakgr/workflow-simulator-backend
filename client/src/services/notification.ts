import { Dispatch } from "react-redux";
import axios from "axios";
import { showMessage } from "../actions/alert";
import { Notification } from "../models/notification";
import * as actions from "../actions/notification";

export const sendNotification = (notification: Notification) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("http://localhost:3001/api/notification", notification).then((res) => {
            dispatch(showMessage(false, "Permission requested successfully!"));
        }).catch( e => dispatch(showMessage(true, e.message)));
    };
};

export const getNotifications = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get("http://localhost:3001/api/notification").then((res) => {
            const notifications = res.data as Notification[];
            const userIds = notifications.map(n => n.userId);
            if (!userIds) {
                throw new Error("No new notifications found!");
            }
            dispatch(actions.getNotifications(notifications));
            return axios.post("http://localhost:3001/api/notification/users", {userIds});
        }).then((res) => {
            dispatch(actions.getUsers(res.data));
        }).catch( e => dispatch(showMessage(true, e.message)));
    };
};

export const replyNotification = (id: string, accepted: boolean) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("http://localhost:3001/api/notification/reply", {id, accepted}).then((res) => {
            dispatch(getNotifications());
        }).catch( e => dispatch(showMessage(true, e.message)));
    };
};

