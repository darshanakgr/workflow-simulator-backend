"use strict";
/**
 * A module, contains all the functions of handling permissions of task-groups
 * Uses the schema of Permission
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const permission_1 = require("../models/permission");
const secretkey_1 = __importDefault(require("../services/secretkey"));
const types_1 = require("../types");
const redis_1 = __importDefault(require("../db/redis"));
const user_1 = require("../models/user");
const generatePermission = (userId, groupId, accessLevel) => {
    return new permission_1.Permission({
        userId: userId,
        groupId: groupId,
        secretKey: secretkey_1.default(userId, groupId),
        accessLevel: accessLevel
    }).save();
};
const getSecretKeys = (userId, groupId) => {
    return permission_1.Permission.findOne({ userId, groupId });
};
const authenticate = (secretKey, groupId, requiredAccessLevel) => {
    return new Promise((resolve, reject) => {
        redis_1.default.hget(secretKey, groupId, (err, accessLevel) => {
            if (err) {
                return reject(err);
            }
            if (accessLevel) {
                return resolve(requiredAccessLevel === parseInt(accessLevel));
            }
            permission_1.Permission.findOne({ secretKey, groupId }).then((permission) => {
                if (permission) {
                    redis_1.default.hset(secretKey, groupId, permission.accessLevel.toString());
                    redis_1.default.expire(secretKey, 3600);
                    return resolve(requiredAccessLevel == permission.accessLevel);
                }
                return resolve(false);
            }).catch((e) => reject(e.message));
        });
    });
};
const shareGroup = (email, groupId) => {
    return new Promise((resolve, reject) => {
        user_1.User.findOne({ email }).then((user) => {
            if (!user) {
                return reject("No user found");
            }
            return generatePermission(user.id, groupId, types_1.FULL_ACCESS);
        }).then((permission) => {
            return resolve(permission);
        }).catch((e) => reject(e));
    });
};
const getGroupIds = (userId) => {
    return new Promise((resolve, reject) => {
        permission_1.Permission.find({ userId }).then((permissions) => {
            return resolve(permissions.map(p => p.groupId));
        }).catch((e) => reject(e));
    });
};
exports.default = { generatePermission, authenticate, getSecretKeys, shareGroup, getGroupIds };
//# sourceMappingURL=permission-controller.js.map