/**
 * A module that exports a schema to Permission.
 */

import mongoose from "mongoose";


interface IPermission extends mongoose.Document {
    groupId: string;
    userId: string;
    secretKey: string;
    accessLevel: number;
}

const Permission = mongoose.model<IPermission>("Permission", new mongoose.Schema({
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
}));


export { Permission, IPermission };

