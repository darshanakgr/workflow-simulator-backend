export type Task = {
    taskId: string;
    name: string;
    description: string;
    progress: number;
    groupId: string;
    predecessors: Array<string>;
    successors: Array<string>;
};

export type TaskState = {
    tasks: Task[];
    error: string | undefined;
    message: string | undefined;
};