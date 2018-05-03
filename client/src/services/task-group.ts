import axios from "axios";
import { Dispatch } from "react-redux";
import * as actions from "../actions/task-group";
import { TaskGroup } from "../models/task-group";
import { showMessage } from "../actions/alert";

export const createNewTaskGroup = (taskgroup) => {
    return (dispatch: Dispatch<{}>) => {
        axios.post(`http://localhost:3001/api/taskgroup`, taskgroup).then((res) => {
            dispatch(actions.addTaskGroupSuccess(res.data as TaskGroup));
        }).catch(e => dispatch(showMessage(true, "Unable to create a Task-Group")));
    };
};

export const getAllTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/`).then((res) => {
            dispatch(actions.getTaskGroups(res.data as TaskGroup[]));
        }).catch(e => dispatch(showMessage(true, "Unable to fecth data")));
    };
};

export const findTaskGroup = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise<TaskGroup>((resolve, reject) => {
            axios.get(`http://localhost:3001/api/taskgroup/find/${groupId}`).then((res) => {
                dispatch(actions.findTaskGroup(res.data as TaskGroup));
                resolve(res.data);
            }).catch(e => dispatch(showMessage(true, "Unable to connect to the server")));
        });
    };
};

export const deleteTaskGroup = (groupId: string) => {
    return (dispatch: Dispatch<{}>) => {
        axios.delete(`http://localhost:3001/api/taskgroup/${groupId}`).then((res) => {
            dispatch(showMessage(false, "Task-Group Deleted Successfully!"));
            dispatch(getAllTaskGroups());
        }).catch(e => dispatch(showMessage(true, "Unable to delete Task-Group")));
    };
};

export const editTaskGroup = (taskgroup) => {
    return (dispatch: Dispatch<{}>) => {
        return new Promise<TaskGroup>((resolve, reject) => {
            axios.put(`http://localhost:3001/api/taskgroup/`, taskgroup).then((res) => {
            dispatch(showMessage(false, "Task Group Updated Successfully!"));
            resolve(taskgroup);
        }).catch(e => dispatch(showMessage(true, "Unable to delete the Task-Group")));
        });
    };
};

export const getAllSharedTaskGroups = () => {
    return (dispatch: Dispatch<{}>) => {
        axios.get(`http://localhost:3001/api/taskgroup/shared`).then((res) => {
            dispatch(actions.getTaskGroups(res.data as TaskGroup[]));
        }).catch(e => dispatch(showMessage(true, "Unable to connect to server")));
    };
};

