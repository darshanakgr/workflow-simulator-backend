import { createAction } from "redux-actions";
import *  as Actions from "../constants";
import { Task } from "../models/task";

export const createTask = createAction<Task, Task>(
    Actions.CREATE_TASK,
    (task: Task) => (task)
);

export const findTasks = createAction<Array<Task>, Array<Task>>(
    Actions.FIND_TASKS,
    (tasks: Task[]) => tasks
);
