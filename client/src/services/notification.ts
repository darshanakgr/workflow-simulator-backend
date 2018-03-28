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
            dispatch(actions.getNotifications(res.data));
        }).catch( e => dispatch(showMessage(true, e.message)));
    };
};
