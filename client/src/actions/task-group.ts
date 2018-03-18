import { createAction } from "redux-actions";
import *  as Actions from "../constants";
import { TaskGroup } from "../models/task-group";

export const addTaskGroupSuccess = createAction<TaskGroup, TaskGroup>(
    Actions.ADD_TASK_GROUP_SUCCESS,
    (group: TaskGroup) =>  group
);

export const getTaskGroups = createAction<Array<TaskGroup>, Array<TaskGroup>>(
    Actions.GET_TASK_GROUPS,
    (groups: Array<TaskGroup>) => groups
);

export const findTaskGroup = createAction<TaskGroup, TaskGroup>(
    Actions.FIND_TASK_GROUP,
    (group: TaskGroup) =>  group
);