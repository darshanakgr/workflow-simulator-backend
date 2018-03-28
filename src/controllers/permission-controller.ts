/**
 * A module, contains all the functions of handling permissions of task-groups
 * Uses the schema of Permission
 */

import { Permission, IPermission } from "../models/permission";
import generateKey from "../services/secretkey";
import { VIEW_ONLY, FULL_ACCESS } from "../types";
import redis from "../db/redis";
import { User } from "../models/user";

const generatePermission = (userId: string, groupId: string, accessLevel: number) => {
    return new Permission({
        userId: userId,
        groupId: groupId,
        secretKey: generateKey(userId, groupId),
        accessLevel: accessLevel
    }).save();
};

const getSecretKeys = (userId: string, groupId: string) => {
    return Permission.findOne({userId, groupId});
};

const authenticate = (secretKey: string, groupId: string, requiredAccessLevel: number) => {
    return new Promise<boolean>((resolve, reject) => {
        redis.hget(secretKey, groupId, (err, accessLevel) => {
            if (err) {
                return reject(err);
            }

            if (accessLevel) {
                return resolve(requiredAccessLevel === parseInt(accessLevel));
            }

            Permission.findOne({secretKey, groupId}).then((permission) => {
                if (permission) {
                    redis.hset(secretKey, groupId, permission.accessLevel.toString());
                    redis.expire(secretKey, 3600);
                    return resolve(requiredAccessLevel == permission.accessLevel);
                }
                return resolve(false);
            }).catch((e) => reject(e.message));
        });
    });
};

const shareGroup = (email: string, groupId: string ) => {
    return new Promise((resolve, reject) => {
        User.findOne({email}).then((user) => {
            if (!user) { return reject("No user found"); }
            return generatePermission(user.id, groupId, FULL_ACCESS);
        }).then((permission) => {
            return resolve(permission);
        }).catch((e) => reject(e));
    });
};

const getGroupIds = (userId: string) => {
    return new Promise((resolve, reject) => {
        Permission.find({userId}).then((permissions) => {
            return resolve(permissions.map(p => p.groupId));
        }).catch((e) => reject(e));
    });
};



export default { generatePermission, authenticate, getSecretKeys, shareGroup, getGroupIds };