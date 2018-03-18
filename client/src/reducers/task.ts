import { Action, handleActions } from "redux-actions";
import { CREATE_TASK, FIND_TASKS } from "../constants";
import { Task, TaskState } from "../models/task";

const initialState: TaskState = {
    tasks: [],
    error: undefined,
    message: undefined
};

export default handleActions<TaskState, any>({
    [CREATE_TASK]: (state: TaskState, action: Action<Task>): TaskState => {
        return {
            tasks: action.payload ? [...state.tasks, action.payload] : [...state.tasks],
            error: undefined,
            message: undefined
        };
    },
    [FIND_TASKS]: (state: TaskState, action: Action<Array<Task>>): TaskState => {
        return {
            tasks: action.payload ? [...action.payload] : [],
            error: undefined,
            message: undefined
        };
    }
}, initialState);
