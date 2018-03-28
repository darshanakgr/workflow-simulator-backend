import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task-group";
import { TaskGroup } from "../models/task-group";
import { showMessage } from "../actions/alert";

export const createNewTaskGroup = (taskgroup) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post(`/api/taskgroup`, taskgroup).then((res) => {
            dispatch(actions.addTaskGroupSuccess(res.data as TaskGroup));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const getAllTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`/api/taskgroup/`).then((res) => {
            dispatch(actions.getTaskGroups(res.data as TaskGroup[]));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const findTaskGroup = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise<TaskGroup>((resolve, reject) => {
            axios.get(`/api/taskgroup/find/${groupId}`).then((res) => {
                dispatch(actions.findTaskGroup(res.data as TaskGroup));
                resolve(res.data);
            }).catch(e => dispatch(showMessage(true, e.message)));
        });
    };
};

export const deleteTaskGroup = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.delete(`/api/taskgroup/${groupId}`).then((res) => {
            dispatch(showMessage(false, "Task Group Deleted Successfully!"));
            dispatch(getAllTaskGroups());
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

export const editTaskGroup = (taskgroup) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise<TaskGroup>((resolve, reject) => {
            axios.put(`/api/taskgroup/`, taskgroup).then((res) => {
            dispatch(showMessage(false, "Task Group Updated Successfully!"));
            resolve(taskgroup);
        }).catch(e => dispatch(showMessage(true, e.message)));
        });
    };
};

export const getAllSharedTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`/api/taskgroup/shared`).then((res) => {
            dispatch(actions.getTaskGroups(res.data as TaskGroup[]));
        }).catch(e => dispatch(showMessage(true, e.message)));
    };
};

