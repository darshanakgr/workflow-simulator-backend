import { createAction } from "redux-actions";
import { GET_PERMISSION, GET_SHARED_TASK_GROUPS } from "../constants";

export const getPermission = createAction<string, string>(
    GET_PERMISSION,
    (secretKey: string) => secretKey
);

export const getSharedTaskGroups = createAction<string[], string[]>(
    GET_SHARED_TASK_GROUPS,
    (groups: string[]) => groups
);