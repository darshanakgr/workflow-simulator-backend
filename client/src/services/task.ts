import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task";
import { showMessage } from "../actions/alert";
// import { Task } from "../models/task";

export const createTask = (task) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise((resolve, reject) => {
            axios.post("http://localhost:3001/api/task", task).then((res) => {
                dispatch(actions.createTask(res.data));
                return resolve(res.data);
            }).catch((e) => {
                dispatch(showMessage(true, e.message));
                return reject(e);
            });
        } );
    };
};

export const findTasks = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/task/${groupId}`).then((res) => {
            dispatch(actions.findTasks(res.data));
        }).catch((e) => dispatch(showMessage(true, e.message)));
    };
};
