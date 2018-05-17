"use strict";
/**
 * A module that exports a schema to Task.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Task = mongoose_1.default.model("Task", new mongoose_1.default.Schema({
    taskId: {
        type: String,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    description: String,
    progress: {
        type: Number,
        default: 0
    },
    groupId: {
        type: String,
        required: true
    },
    predecessors: Array,
    successors: {
        type: Array,
        default: []
    }
}));
exports.Task = Task;
//# sourceMappingURL=task.js.map