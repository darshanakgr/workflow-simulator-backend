import { Action, handleActions } from "redux-actions";
import { ADD_TASK_GROUP_SUCCESS, GET_TASK_GROUPS, FIND_TASK_GROUP } from "../constants";
import { TaskGroup, TaskGroupState } from "../models/task-group";

const initialState: TaskGroupState = {
    groups: [],
    error: undefined,
    message: undefined
};

export default handleActions<TaskGroupState, any>({
    [ADD_TASK_GROUP_SUCCESS]: (state: TaskGroupState, action: Action<TaskGroup>): TaskGroupState => {
        return {
            groups: action.payload ? [...state.groups, action.payload] : [...state.groups],
            error: undefined,
            message: undefined
        };
    },
    [GET_TASK_GROUPS]: (state: TaskGroupState, action: Action<Array<TaskGroup>>): TaskGroupState => {
        return {
            groups: action.payload ? action.payload : [],
            error: undefined,
            message: undefined
        };
    },
    [FIND_TASK_GROUP]: (state: TaskGroupState, action: Action<TaskGroup>): TaskGroupState => {
        return {
            groups: action.payload ? [action.payload] : [],
            error: undefined,
            message: undefined
        };
    }
}, initialState);