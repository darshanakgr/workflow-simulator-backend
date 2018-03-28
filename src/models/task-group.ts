/**
 * A module that exports a schema to Task-Group.
 */

import { mongoose } from "../db/db-connection";

interface ITaskGroup extends mongoose.Document {
    groupId: string;
    name: string;
    description: string;
    createdOn: Date;
    progress: number;
    childTasks: Array<string>;
    createdBy: string;
}

const TaskGroup = mongoose.model<ITaskGroup>("TaskGroup", new mongoose.Schema({
    groupId: {
        type: String,
        required: true,
        index: {
            unique: true
        }
    },
    name: String,
    description: String,
    createdOn: {
        type: Date,
        default: Date.now
    },
    progress: {
        type: Number,
        default: 0
    },
    childTasks: {
        type: Array,
        default: []
    },
    createdBy: {
        type: String,
        required: true
    }
}));

export { TaskGroup, ITaskGroup};