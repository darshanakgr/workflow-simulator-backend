"use strict";
/**
 * A module that exports a schema to Notification.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const notificationSchema = new mongoose_1.default.Schema({
    groupId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    to: {
        type: String,
        required: true
    },
    state: {
        type: Number,
        default: 0
    }
});
const Notification = mongoose_1.default.model("Notification", notificationSchema);
exports.Notification = Notification;
//# sourceMappingURL=notification.js.map