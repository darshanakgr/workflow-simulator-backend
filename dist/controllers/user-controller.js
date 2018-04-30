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
exports.default = { createUser };
//# sourceMappingURL=user-controller.js.map