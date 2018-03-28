export type TaskGroup = {
    groupId: string;
    name: string;
    description: string;
    createdOn: Date;
    progress: number;
    childTasks: Array<string>;
    createdBy?: string;
};

export type TaskGroupState = {
    groups: TaskGroup[];
    error: string | undefined;
    message: string | undefined;
};