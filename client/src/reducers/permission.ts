import { handleActions, Action } from "redux-actions";
import { PermissionState } from "../models/permission";
import { GET_PERMISSION, GET_SHARED_TASK_GROUPS } from "../constants";

const initialState: PermissionState = {
    secretKey: undefined,
    groups: []
};

export default handleActions<PermissionState, string | string[]>({
    [GET_PERMISSION]: (state: PermissionState, action: Action<string>) => {
        return {
            secretKey: action.payload,
            groups: state.groups
        };
    },
    [GET_SHARED_TASK_GROUPS]: (state: PermissionState, action: Action<string[]>) => {
        return {
            secretKey: undefined,
            groups: action.payload ? action.payload : []
        };
    }
}, initialState);