import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task-group";
import { TaskGroup } from "../models/task-group";

export const createNewTaskGroup = (taskgroup) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post(`http://localhost:3001/api/taskgroup`, taskgroup).then((res) => {
            dispatch(actions.addTaskGroupSuccess(res.data as TaskGroup));
        }).catch(e => alert(e.message));
    };
};

export const getAllTaskGroups = (userId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/${userId}`).then((res) => {
            dispatch(actions.getTaskGroups(res.data as TaskGroup[]));
        }).catch(e => alert(e.message));
    };
};

export const findTaskGroup = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/find/${groupId}`).then((res) => {
            dispatch(actions.findTaskGroup(res.data as TaskGroup));
        }).catch(e => alert(e.message));
    };
};
