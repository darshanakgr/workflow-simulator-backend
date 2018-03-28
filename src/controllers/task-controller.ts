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
            return TaskGroupController.updateTaskGroup(taskGroup);
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
            findTask(successor).then((task) => {
                if (task) {
                   task.successors.push(taskId);
                   console.log(task);
                   updateTask(task).then((r) => result.push(r));
                }
            }).catch((e) => {
                return reject(e);
            });
        });
        return resolve(result);
    });
};

const deleteSuccessors = (taskId: string, predecessors: Array<string>) => {
    return new Promise((resolve, reject) => {
        const result: Array<object> = [];
        predecessors.forEach((predecessor) => {
            findTask(predecessor).then((task) => {
                if (task) {
                   task.successors = task.successors.filter(successor => successor != taskId);
                   updateTask(task).then((r) => result.push(r));
                }
            }).catch((e) => {
                return reject(e);
            });
        });
        return resolve(result);
    });
};

const updateTask = (task: ITask) => {
    return Task.update({
        taskId: task.taskId,
        groupId: task.groupId
    }, {
        $set: task
    }, {
        new: true
    });
};

const deleteTask = (groupId: string, taskId: string) => {
    return new Promise((resolve, reject) => {
        findTask(taskId).then((task) => {
            if (!task) {
                return reject(new Error("No Task exists for that id"));
            }
            return deleteSuccessors(task.taskId, task.predecessors);
        }).then((result) => {
            return Task.deleteOne({taskId, groupId});
        }).then((result) => {
            return TaskGroupController.deleteTask(groupId, taskId);
        }).then((result) => {
            return resolve(result);
        }).catch((e) => {
            console.log(e);
            return reject(e);
        });
    });
};

const deleteAllTasks = (groupId: string) => {
    return Task.deleteMany({groupId});
};

const getAllTasks = () => {
    return Task.find({});
};

const findTask = (taskId: string) => {
    return Task.findOne({taskId});
};

const findTasksByGroup = (groupId: string) => {
    return Task.find({groupId});
};

export default { createTask, getAllTasks, updateTask, findTask, findTasksByGroup, deleteTask, deleteAllTasks };