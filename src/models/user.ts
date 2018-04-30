/**
 * A module that exports a schema to User.
 */

import mongoose from "mongoose";
import bycrypt from "bcrypt-nodejs";

interface IUser extends mongoose.Document {
    email: string;
    password: string;
    hashPassword: (password: string) => string;
    comparePassword: (password: string) => boolean;
}

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String
    }
});

userSchema.methods.hashPassword = function(password: string) {
    return bycrypt.hashSync(password, bycrypt.genSaltSync(8));
};

userSchema.methods.comparePassword = function(password: string) {
    return bycrypt.compareSync(password, this.password);
};

const User = mongoose.model<IUser>("User", userSchema);

export { User };
