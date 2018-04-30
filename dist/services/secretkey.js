"use strict";
/**
 * A module that generate secret keys for authentication
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const sha256_1 = __importDefault(require("crypto-js/sha256"));
const generateKey = (userId, groupId) => {
    return sha256_1.default(userId + groupId + new Date().getTime().toString()).toString();
};
exports.default = generateKey;
//# sourceMappingURL=secretkey.js.map