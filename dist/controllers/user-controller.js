"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = require("../models/user");
const createUser = (email, password) => {
    const user = new user_1.User();
    user.email = email;
    user.password = user.hashPassword(password);
    return user.save();
};
exports.default = { createUser };
//# sourceMappingURL=user-controller.js.map