"use strict";
/**
 * A module that exports a schema to Task-Group.
 */
Object.defineProperty(exports, "__esModule", { value: true });
const db_connection_1 = require("../db/db-connection");
const TaskGroup = db_connection_1.mongoose.model("TaskGroup", new db_connection_1.mongoose.Schema({
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
exports.TaskGroup = TaskGroup;
//# sourceMappingURL=task-group.js.map