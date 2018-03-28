"use strict";
/**
 * A module that exports a schema to Permission.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const permissionSchema = new mongoose_1.default.Schema({
    groupId: {
        type: String,
        required: true
    },
    userId: {
        type: String,
        required: true
    },
    secretKey: {
        type: String,
        required: true
    },
    accessLevel: {
        type: Number,
        required: true
    }
});
permissionSchema.index({ groupId: 1, userId: 1 }, { unique: true });
const Permission = mongoose_1.default.model("Permission", permissionSchema);
exports.Permission = Permission;
//# sourceMappingURL=permission.1.js.map