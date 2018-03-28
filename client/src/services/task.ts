import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task";
import { showMessage } from "../actions/alert";
import { findTaskGroup } from "./task-group";

export const createTask = (task) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post("http://localhost:3001/api/task", task).then((res) => {
            dispatch(actions.createTask(res.data));
            dispatch(findTaskGroup(task.groupId));
        }).catch((e) => dispatch(showMessage(true, e.message)));
    };
};

export const findTasks = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/task/${groupId}`).then((res) => {
            dispatch(actions.findTasks(res.data));
        }).catch((e) => dispatch(showMessage(true, e.message)));
    };
};

export const deleteTask = (groupId: string, taskId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.delete(`http://localhost:3001/api/task/${groupId}/${taskId}`).then((res) => {
            dispatch(findTasks(groupId));
            dispatch(findTaskGroup(groupId));
            dispatch(showMessage(false, "Task Deleted Successfully"));
        }).catch((e) => {
            dispatch(showMessage(true, e.message));
        });
    };
};
