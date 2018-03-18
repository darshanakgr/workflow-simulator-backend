/**
 * A module that exports a schema to Task.
 */

import mongoose from "mongoose";
interface ITask extends mongoose.Document {
    taskId: string;
    name: string;
    description: string;
    progress: number;
    groupId: string;
    predecessors: Array<string>;
    successors?: Array<string>;
}

const Task = mongoose.model<ITask>("Task", new mongoose.Schema({
    taskId: {
        type: String,
        unique: true
    },
    name: String,
    description: String,
    progress: Number,
    groupId: String,
    predecessors: Array,
    successors: {
        type: Array,
        default: []
    }
}));


export { Task, ITask };

