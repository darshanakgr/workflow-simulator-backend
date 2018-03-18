import { mongoose } from "../db/db-connection";
import { Task, ITask } from "../models/task";
import TaskGroupController from "./task-group-controller";
import { ITaskGroup, TaskGroup } from "../models/task-group";

const createTask = (task: ITask) => {
    return new Promise((resolve, reject) => {
        let taskGroup: any;
        TaskGroupController.findTaskGroup(task.groupId).then((group) => {
            if (!group) {
                return reject(new Error("No Task Group exists for that id"));
            }
            taskGroup = group;
            taskGroup.childTasks.push(task.taskId);
            return new Task(task).save();
        }).then((result) => {
            return TaskGroupController.updateTaskGroup(task.groupId, taskGroup);
        }).then((result) => {
            return updateSuccessors(task.taskId, task.predecessors);
        }).then((result) => {
            return resolve(task);
        }).catch((e) => {
            return reject(e);
        });
    });
};

const updateSuccessors = (taskId: string, successors: Array<string>) => {
    return new Promise((resolve, reject) => {
        const result: Array<object> = [];
        successors.forEach((successor) => {
            findTask(successor).then((res) => {
                if (res.length != 0) {
                   const task: any = res[0];
                   task.successors.push(taskId);
                   updateTask(task.groupId, task.taskId, task).then((r) => result.push(r));
                }
            }).catch((e) => {
                return reject(e);
            });
        });
        return resolve(result);
    });
};

const updateTask = (groupId: string, taskId: string, task: any) => {
    return Task.update({taskId, groupId}, {
        $set: task
    }, {
        new: true
    });
};

const getAllTasks = () => {
    return Task.find({});
};

const findTask = (taskId: string) => {
    return Task.find({taskId});
};

const findTasksByGroup = (groupId: string) => {
    return Task.find({groupId});
};

export default { createTask, getAllTasks, updateTask, findTask, findTasksByGroup };