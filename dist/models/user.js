"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
}
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const userSchema = new mongoose_1.default.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});
userSchema.methods.hashPassword = function (password) {
    return bcrypt_nodejs_1.default.hashSync(password, bcrypt_nodejs_1.default.genSaltSync(8));
};
userSchema.methods.comparePassword = function (password) {
    return bcrypt_nodejs_1.default.compareSync(password, this.password);
};
const User = mongoose_1.default.model("User", userSchema);
exports.User = User;
//# sourceMappingURL=user.js.map