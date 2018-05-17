"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * A module, contains all the functions of handling users
 * Uses the schema of User
 */
const user_1 = require("../models/user");
/**
 * Create new record for user
 * @param email email of the user
 * @param password password of the user
 */
const createUser = (email, password) => {
    const user = new user_1.User();
    user.email = email;
    user.password = user.hashPassword(password);
    return user.save();
};
const updatePassword = (id, password, newPassword) => {
    return new Promise((resolve, reject) => {
        user_1.User.findById(id).then((user) => {
            if (!user.comparePassword(password)) {
                return reject(new Error("Old password is not matched"));
            }
            user.password = user.hashPassword(newPassword);
            return user_1.User.findByIdAndUpdate(user.id, {
                $set: user
            }, {
                new: true
            });
        }).then((user) => {
            return resolve(user);
        }).catch(e => reject(e));
    });
};
exports.default = { createUser, updatePassword };
//# sourceMappingURL=user-controller.js.map